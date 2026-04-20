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
  try {
    const body = await req.json();
    
    // Process the update via Telegraf logic
    // We wrap the handler to ensure it fits in a serverless window
    if (body.message?.text) {
      const text = body.message.text;
      const userId = body.message.from.id.toString();

      // 1. RAG Retrieval
      const { context, reliability, answer, score } = await performRetrieval(text);

      if (reliability === 'LOW') {
        await bot.telegram.sendMessage(body.message.chat.id, answer);
        return new Response('OK');
      }

      // 2. Generation
      const { text: responseText } = await generateText({
        model: ai.chat('openai/gpt-4.1-nano'),
        system: "You are the MSAJCE Aura Concierge. Use context only.",
        prompt: `Context: ${context}\n\nQuestion: ${text}`,
      });

      // 3. Persistence
      await sql`INSERT INTO chat_histories (user_id, role, content) VALUES (${userId}, 'assistant', ${responseText})`;

      // 4. Send back to Telegram
      await bot.telegram.sendMessage(body.message.chat.id, responseText, { parse_mode: 'Markdown' });
    }

    return new Response('OK');
  } catch (error) {
    console.error('Webhook Error:', error);
    return new Response('Error', { status: 500 });
  }
}
