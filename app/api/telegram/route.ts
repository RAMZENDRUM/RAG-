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

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
const sql = postgres(process.env.DATABASE_URL!);
const ai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

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

      // 1. FAST RAG (Speed-First Pattern)
      // We do a direct search without the heavy expansion/judging for Telegram
      const { answer, reliability } = await performRetrieval(text);
      
      const response = reliability === 'HIGH' ? answer : "I'm refining my records. Try asking: 'bus route to porur' or 'prospectus'.";
      
      await bot.telegram.sendMessage(chatId, response || "Aura is busy.");
      console.log('✅ Sent fast response');

      // 3. Optional Persistence (Non-Blocking)
      try {
        await sql`INSERT INTO chat_histories (user_id, role, content) VALUES (${body.message.from.id.toString()}, 'assistant', ${response || ''})`;
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
