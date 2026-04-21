import { Telegraf } from 'telegraf';
import { performRetrieval } from '../../../lib/rag/engine/retrieve';
import postgres from 'postgres';

let _bot: Telegraf | null = null;
let _sql: any = null;

const getBot = () => {
  if (!_bot) _bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || '');
  return _bot;
};

const getSql = () => {
  if (!_sql) _sql = postgres(process.env.DATABASE_URL || '');
  return _sql;
};

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * PRODUCTION TELEGRAM WEBHOOK (BRUTAL RESTRAINT EDITION)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.message?.text) return new Response('OK');

    const rawText = body.message.text.trim();
    const cleanText = rawText.toLowerCase();
    const chatId = body.message.chat.id;
    const userId = body.message.from.id.toString();
    const sql = getSql();
    const bot = getBot();

    // 1. MINIMUM LENGTH & INTENT FILTER
    const isGreeting = /hi|hello|hey|who are you|who r u|greet/i.test(cleanText);
    if (!isGreeting && rawText.length < 5) {
        await bot.telegram.sendMessage(chatId, "🤔 **Aura needs more context**: Please provide a clearer input or a full sentence so I can assist you accurately!");
        return new Response('Too Short');
    }

    // 2. RATE LIMIT (3 REQ / 10 SEC)
    const [speedCheck] = await sql`SELECT count(*) FROM chat_histories WHERE user_id = ${userId} AND created_at > now() - interval '10 seconds'`;
    if (parseInt(speedCheck.count) >= 3) {
        await bot.telegram.sendMessage(chatId, "⏲️ **Too many requests**: Please wait 10 seconds before your next query.");
        return new Response('Rate Limited');
    }

    // 3. DAILY SOFT LIMIT (30 REQ)
    const [dayCheck] = await sql`SELECT count(*) FROM chat_histories WHERE user_id = ${userId} AND created_at > now() - interval '1 day'`;
    if (parseInt(dayCheck.count) >= 30) {
        await bot.telegram.sendMessage(chatId, "🛑 **Daily Limit Reached**: You have reached the institutional limit of 30 chats for today. See you tomorrow!");
        return new Response('Daily Limit');
    }

    // 4. DUPLICATE SPAM BLOCK (Same user, same text, 3 times quickly)
    const [dupCheck] = await sql`SELECT count(*) FROM chat_histories WHERE user_id = ${userId} AND content = ${rawText} AND created_at > now() - interval '1 hour'`;
    if (parseInt(dupCheck.count) >= 3) {
        await bot.telegram.sendMessage(chatId, "🚫 **Spam Detected**: You have sent this exact same request multiple times recently. I've already answered this!");
        return new Response('Duplicate Spam');
    }

    // 5. RESPONSE CACHE (GLOBAL KNOWLEDGE SYNC)
    // We check if ANYONE has asked this exact same question in the last 6 hours
    const prevAnswer = await sql`
        SELECT answer FROM knowledge_cache 
        WHERE query = ${cleanText} AND created_at > now() - interval '6 hours' 
        LIMIT 1
    `.catch(() => []);

    if (prevAnswer.length > 0) {
        console.log("❄️ Serving from Knowledge Cache...");
        await sleep(600); // Artificial Friction
        await bot.telegram.sendMessage(chatId, prevAnswer[0].answer, { parse_mode: 'Markdown' });
        return new Response('Cache Hit');
    }

    // 6. RAG SYSTEM EXECUTION (Vercel/NVIDIA Hybrid)
    const { answer } = await performRetrieval(rawText);
    
    // 7. ARTIFICIAL FRICTION (Slow down spammers)
    await sleep(600);

    // 8. DELIVERY
    await bot.telegram.sendMessage(chatId, answer || "Aura is slightly distracted. Try again!", { parse_mode: 'Markdown' });

    // 9. PERSISTENCE (History + Cache)
    try {
      await sql`INSERT INTO chat_histories (user_id, role, content) VALUES (${userId}, 'user', ${rawText}), (${userId}, 'assistant', ${answer})`;
      
      // Store in Global Cache if successful
      if (answer && answer.length > 10) {
          await sql`INSERT INTO knowledge_cache (query, answer) VALUES (${cleanText}, ${answer})`;
      }
    } catch (dbError) {
      console.warn('DB Sync Error:', dbError.message);
    }

    return new Response('OK');
  } catch (error) {
    console.error('🔥 Webhook Crash:', error);
    return new Response('Error', { status: 500 });
  }
}

export async function GET() {
    return new Response(JSON.stringify({ status: 'Aura v4.3 Protected' }), { headers: { 'Content-Type': 'application/json' } });
}
