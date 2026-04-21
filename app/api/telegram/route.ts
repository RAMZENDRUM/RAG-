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
const ADMIN_IDS = ['7770158141']; 

/**
 * PRODUCTION TELEGRAM WEBHOOK (NEURAL VARIANCE EDITION)
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

    const isGreeting = /^(hi|hello|hey|who are you|who r u|greet)$/i.test(cleanText); // Tightened regex
    if (!isAdmin && !isGreeting && rawText.length < 5) {
        await bot.telegram.sendMessage(chatId, "🤔 **A bit short, isn't it?**: I need at least 5 characters to help you properly. Try a full sentence!");
        return new Response('Too Short');
    }

    if (!isAdmin) {
        // Rate Limits
        const [speedCheck] = await sql`SELECT count(*) FROM chat_histories WHERE user_id = ${userId} AND created_at > now() - interval '10 seconds'`;
        if (parseInt(speedCheck.count) >= 3) {
            await bot.telegram.sendMessage(chatId, "⏲️ **Neural Pacing**: My circuits need 10 seconds to cool down between your high-speed queries.");
            return new Response('Rate Limited');
        }

        // Duplicate Check (Freshness for Admin)
        const [dupCheck] = await sql`SELECT count(*) FROM chat_histories WHERE user_id = ${userId} AND content = ${rawText} AND created_at > now() - interval '1 hour'`;
        if (parseInt(dupCheck.count) >= 3) {
            await bot.telegram.sendMessage(chatId, "🧐 **Stuck on Repeat?**: Copy-pasting won't yield a different answer. Let's try something new!");
            return new Response('Duplicate Spam');
        }
    }

    // GLOBAL CACHE BYPASS FOR ADMINS
    const prevAnswer = await sql`SELECT answer FROM knowledge_cache WHERE query = ${cleanText} LIMIT 1`.catch(() => []);
    if (!isAdmin && prevAnswer.length > 0) {
        await sleep(600);
        await bot.telegram.sendMessage(chatId, prevAnswer[0].answer, { parse_mode: 'Markdown' });
        return new Response('Cache Hit');
    }

    // ALWAYS FRESH HIT FOR ADMIN / NEW QUERIES
    const { answer } = await performRetrieval(rawText);
    if (!isAdmin) await sleep(600);

    await bot.telegram.sendMessage(chatId, answer, { parse_mode: 'Markdown' });

    try {
      await sql`INSERT INTO chat_histories (user_id, role, content) VALUES (${userId}, 'user', ${rawText}), (${userId}, 'assistant', ${answer})`;
      if (answer && answer.length > 10) { await sql`INSERT INTO knowledge_cache (query, answer) VALUES (${cleanText}, ${answer})`; }
    } catch {}

    return new Response('OK');
  } catch (error) {
    return new Response('Error', { status: 500 });
  }
}
