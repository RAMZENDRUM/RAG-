import { Telegraf } from 'telegraf';
import { performRetrieval } from '../../../lib/rag/engine/retrieve';
import postgres from 'postgres';

export async function GET() {
  return new Response(JSON.stringify({ 
    status: 'online', 
    engine: 'Aura Supreme v4.1',
    webhook: 'https://rag-ye65.vercel.app/api/telegram'
  }), { headers: { 'Content-Type': 'application/json' } });
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
 * PRODUCTION TELEGRAM WEBHOOK HANDLER (SUPREME EDITION)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.message?.text) return new Response('No Text');

    const text = body.message.text;
    const chatId = body.message.chat.id;
    const userId = body.message.from.id.toString();

    // 1. SUPREME RAG (Stability-First)
    const { answer, reliability } = await performRetrieval(text);
    
    // 2. LOGIC FIX: Prioritize Answer if it exists, especially if status is SUPREME
    const finalAnswer = (reliability === 'SUPREME' || reliability === 'HIGH' || answer) 
      ? answer 
      : "I'm refining my records. Try asking specifically about 'hostel fees' or 'bus routes'.";
    
    // 3. SEND RESPONSE
    await getBot().telegram.sendMessage(chatId, finalAnswer, { parse_mode: 'Markdown' });

    // 4. PERSISTENCE
    try {
      await getSql()`
        INSERT INTO chat_histories (user_id, role, content) 
        VALUES 
          (${userId}, 'user', ${text}),
          (${userId}, 'assistant', ${finalAnswer})
      `;
    } catch (dbError) {
      console.warn('⚠️ Persistence failed:', dbError.message);
    }

    return new Response('OK');
  } catch (error) {
    console.error('🔥 Webhook Error:', error);
    return new Response('Error', { status: 500 });
  }
}
