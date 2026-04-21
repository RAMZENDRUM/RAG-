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
 * PRODUCTION TELEGRAM WEBHOOK (NEURAL THREAD EDITION)
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

    // FETCH CONVERSATION THREAD (Last 10 turns)
    const historyRows = await sql`
        SELECT role, content FROM chat_histories 
        WHERE user_id = ${userId} 
        ORDER BY created_at DESC 
        LIMIT 10
    `.catch(() => []);
    
    // Format for the LLM (Reverse to chronological order)
    const chatHistory = historyRows.reverse().map((h: any) => ({
        role: h.role,
        content: h.content
    }));

    const isGreeting = /^(hi|hello|hey|who are you|who r u|greet)$/i.test(cleanText);
    if (!isAdmin && !isGreeting && rawText.length < 5) {
        await bot.telegram.sendMessage(chatId, "🤔 **Aura needs more context**: Please provide at least 5 characters!");
        return new Response('Too Short');
    }

    if (!isAdmin) {
        const [speedCheck] = await sql`SELECT count(*) FROM chat_histories WHERE user_id = ${userId} AND created_at > now() - interval '10 seconds'`;
        if (parseInt(speedCheck.count) >= 3) {
            await bot.telegram.sendMessage(chatId, "⏲️ **Neural Pacing**: My circuits need 10 seconds to cool down.");
            return new Response('Rate Limited');
        }
    }

    // BYPASS CACHE FOR ADMIN / DYNAMIC CONTEXT
    const prevAnswer = await sql`SELECT answer FROM knowledge_cache WHERE query = ${cleanText} LIMIT 1`.catch(() => []);
    if (!isAdmin && prevAnswer.length > 0) {
        await sleep(600);
        await bot.telegram.sendMessage(chatId, prevAnswer[0].answer, { parse_mode: 'Markdown' });
        return new Response('Cache Hit');
    }

    // EXECUTE RETRIEVAL WITH MEMORY THREAD
    const { answer } = await performRetrieval(rawText, chatHistory);
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
