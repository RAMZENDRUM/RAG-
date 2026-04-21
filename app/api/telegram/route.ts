import { Telegraf } from 'telegraf';
import { performRetrieval } from '../../../lib/rag/engine/retrieve';
import postgres from 'postgres';

export async function GET() {
  return new Response(JSON.stringify({ status: 'online', version: 'Aura v4.2 Supreme' }), { headers: { 'Content-Type': 'application/json' } });
}

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

/**
 * PRODUCTION TELEGRAM WEBHOOK (GUARDIAN EDITION)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.message?.text) return new Response('OK');

    const text = body.message.text;
    const chatId = body.message.chat.id;
    const userId = body.message.from.id.toString();
    const sql = getSql();

    // 1. GUARDIAN LAYER (RATE LIMITING)
    try {
      // Check Minute Limit (10/min)
      const [minCheck] = await sql`SELECT count(*) FROM chat_histories WHERE user_id = ${userId} AND created_at > now() - interval '1 minute'`;
      if (parseInt(minCheck.count) >= 10) {
        await getBot().telegram.sendMessage(chatId, "⚠️ **Neural Cooldown**: You are sending messages too fast! Give me a minute to process.");
        return new Response('Rate Limited');
      }

      // Check Day Limit (30/day)
      const [dayCheck] = await sql`SELECT count(*) FROM chat_histories WHERE user_id = ${userId} AND created_at > now() - interval '1 day'`;
      if (parseInt(dayCheck.count) >= 30) {
        await getBot().telegram.sendMessage(chatId, "🛑 **Aura Resting**: You have reached the institutional limit of 30 chats for today. See you tomorrow!");
        return new Response('Daily Limit Reached');
      }
    } catch (guardErr) {
      console.warn("Guardian Layer Bypass (DB Error):", guardErr.message);
    }

    // 2. NEURAL RECALL (10 TRACES)
    let history: any[] = [];
    try {
      history = await sql`SELECT role, content FROM chat_histories WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 10`;
      history = history.reverse();
    } catch (hErr) {
      console.warn("Memory Bypass:", hErr.message);
    }

    // 3. SUPREME RETRIEVAL
    const { answer } = await performRetrieval(text);
    
    // 4. DELIVERY
    await getBot().telegram.sendMessage(chatId, answer || "Aura is slightly distracted. Try again!", { parse_mode: 'Markdown' });

    // 5. PERSISTENCE
    try {
      await sql`INSERT INTO chat_histories (user_id, role, content) VALUES (${userId}, 'user', ${text}), (${userId}, 'assistant', ${answer})`;
    } catch (dbError) {
      console.warn('Persistence Error:', dbError.message);
    }

    return new Response('OK');
  } catch (error) {
    console.error('🔥 Webhook Crash:', error);
    return new Response('Error', { status: 500 });
  }
}
