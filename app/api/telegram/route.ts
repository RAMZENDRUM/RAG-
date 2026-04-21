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

// MASTER ADMIN LIST
const ADMIN_IDS = ['7770158141']; 

/**
 * PRODUCTION TELEGRAM WEBHOOK (ADMIN-BYPASS EDITION)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.message?.text) return new Response('OK');

    const rawText = body.message.text.trim();
    const cleanText = rawText.toLowerCase();
    const chatId = body.message.chat.id;
    const userId = body.message.from.id.toString();
    const isAdmin = ADMIN_IDS.includes(userId);
    const sql = getSql();
    const bot = getBot();

    // 1. MINIMUM LENGTH & INTENT FILTER
    const isGreeting = /hi|hello|hey|who are you|who r u|greet/i.test(cleanText);
    if (!isAdmin && !isGreeting && rawText.length < 5) {
        await bot.telegram.sendMessage(chatId, "🤔 **Aura needs more context**: Please provide a clearer input or a full sentence!");
        return new Response('Too Short');
    }

    // 2. GUARDIAN LAYER (BYPASSABLE BY ADMIN)
    if (!isAdmin) {
        // Rate Limit (3 REQ / 10 SEC)
        const [speedCheck] = await sql`SELECT count(*) FROM chat_histories WHERE user_id = ${userId} AND created_at > now() - interval '10 seconds'`;
        if (parseInt(speedCheck.count) >= 3) {
            await bot.telegram.sendMessage(chatId, "⏲️ **Too many requests**: Please wait 10 seconds.");
            return new Response('Rate Limited');
        }

        // Daily Soft Limit (30 REQ)
        const [dayCheck] = await sql`SELECT count(*) FROM chat_histories WHERE user_id = ${userId} AND created_at > now() - interval '1 day'`;
        if (parseInt(dayCheck.count) >= 30) {
            await bot.telegram.sendMessage(chatId, "🛑 **Daily Limit Reached**: You have reached the institutional limit of 30 chats for today.");
            return new Response('Daily Limit');
        }

        // Duplicate Spam Block
        const [dupCheck] = await sql`SELECT count(*) FROM chat_histories WHERE user_id = ${userId} AND content = ${rawText} AND created_at > now() - interval '1 hour'`;
        if (parseInt(dupCheck.count) >= 3) {
            await bot.telegram.sendMessage(chatId, "🚫 **Spam Detected**: You've sent this multiple times recently!");
            return new Response('Duplicate Spam');
        }
    }

    // 3. RESPONSE CACHE (GLOBAL)
    const prevAnswer = await sql`
        SELECT answer FROM knowledge_cache 
        WHERE query = ${cleanText} AND created_at > now() - interval '6 hours' 
        LIMIT 1
    `.catch(() => []);

    if (!isAdmin && prevAnswer.length > 0) {
        await sleep(600);
        await bot.telegram.sendMessage(chatId, prevAnswer[0].answer, { parse_mode: 'Markdown' });
        return new Response('Cache Hit');
    }

    // 4. SUPREME RETRIEVAL
    const { answer } = await performRetrieval(rawText);
    if (!isAdmin) await sleep(600); // Friction for users

    // 5. DELIVERY
    await bot.telegram.sendMessage(chatId, answer || "Aura is distracted. Try again!", { parse_mode: 'Markdown' });

    // 6. PERSISTENCE
    try {
      await sql`INSERT INTO chat_histories (user_id, role, content) VALUES (${userId}, 'user', ${rawText}), (${userId}, 'assistant', ${answer})`;
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
    return new Response(JSON.stringify({ status: 'Aura v4.3.1 Admin-Ready' }), { headers: { 'Content-Type': 'application/json' } });
}
