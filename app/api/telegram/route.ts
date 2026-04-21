import { Telegraf } from 'telegraf';
import { performRetrieval } from '../../../lib/rag/engine/retrieve';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import postgres from 'postgres';

export async function GET() {
  return new Response(JSON.stringify({ 
    status: 'online', 
    engine: 'Aura Unified v4.0',
    webhook: 'https://rag-ye65.vercel.app/api/telegram'
  }), { headers: { 'Content-Type': 'application/json' } });
}


// Lazy Initializers to prevent top-level crashes if ENV is missing during build
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

const getAi = () => {
  return createOpenAI({
    apiKey: process.env.VERCEL_AI_KEY,
    baseURL: 'https://ai-gateway.vercel.sh/v1',
  });
};

/**
 * PRODUCTION TELEGRAM WEBHOOK HANDLER
 * Enables 24/7 Aura access via Vercel Serverless.
 */
export async function POST(req: Request) {
  console.log('--- 📡 Aura Webhook Received ---');
  try {
    const body = await req.json();
    console.log('Query from:', body.message?.from?.first_name);
    
    if (body.message?.text) {
      const text = body.message.text;
      const chatId = body.message.chat.id;

      // 1. FETCH CONTEXT (Memory)
      let history: any[] = [];
      try {
        const userId = body.message.from.id.toString();
        history = await getSql()`
          SELECT role, content 
          FROM chat_histories 
          WHERE user_id = ${userId} 
          ORDER BY created_at DESC 
          LIMIT 4
        `;
        history = history.reverse(); // Standard chron order for AI
      } catch (hErr) {
        console.warn("⚠️ Memory fetch failed:", hErr.message);
      }

      // 2. SUPREME RAG (Stability-First Pattern)
      const { answer, reliability, sources } = await performRetrieval(text);
      
      const response = reliability === 'HIGH' ? answer : "I'm refining my records. Try asking: 'bus route to porur' or 'prospectus'.";
      
      await getBot().telegram.sendMessage(chatId, response || "Aura is busy.", { parse_mode: 'Markdown' });
      console.log('✅ Sent fast response');

      // 4. Persistence (User and Assistant)
      try {
        const userId = body.message.from.id.toString();
        await getSql()`
          INSERT INTO chat_histories (user_id, role, content) 
          VALUES 
            (${userId}, 'user', ${text}),
            (${userId}, 'assistant', ${response || ''})
        `;
      } catch (dbError) {
        console.warn('⚠️ persistence failed but bot answered:', dbError.message);
      }
    }

    return new Response('OK');
  } catch (error) {
    console.error('🔥 CRITICAL Webhook Error:', error);
    return new Response('Error', { status: 500 });
  }
}
