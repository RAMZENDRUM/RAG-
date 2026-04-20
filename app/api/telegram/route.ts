import { Telegraf } from 'telegraf';
import { performRetrieval } from '../../../lib/rag/engine/retrieve';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import postgres from 'postgres';

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

      // 1. FAST RAG (Direct Qdrant Search for Speed)
      const { answer, reliability } = await performRetrieval(text);
      
      // 2. Immediate Reply
      const response = reliability === 'HIGH' ? answer : "I am refining my records for that specific query. Please check the portal or try simplified keywords like 'bus timing'.";
      
      await bot.telegram.sendMessage(chatId, response || "System is busy. Please try again.");
      console.log('✅ Response Sent to Telegram');

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
