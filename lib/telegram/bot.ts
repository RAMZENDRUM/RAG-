import { Telegraf } from 'telegraf';
import postgres from 'postgres';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import dotenv from 'dotenv';
import { performRetrieval } from '../rag/engine/retrieve';

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
const sql = postgres(process.env.DATABASE_URL!);

const ai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

bot.start((ctx) => ctx.reply('Welcome to the MSAJCE Aura Concierge! I am now running on the Unified Production Engine v2.0. How can I assist you?'));

bot.on('message', async (ctx) => {
  // @ts-ignore
  const text = ctx.message.text;
  if (!text) return;

  const userId = ctx.from.id.toString();
  
  // Show typing state for better UX
  await ctx.sendChatAction('typing');

  try {
    // 1. Fetch Chat History 
    const historyData = await sql`
      SELECT role, content FROM chat_histories 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC 
      LIMIT 6
    `;
    const chatHistory = historyData.reverse().map(h => ({
      role: h.role as 'user' | 'assistant',
      content: h.content
    }));

    // 2. Unified Retrieval & Response
    const retrievalResult = await performRetrieval(text, chatHistory);
    const { answer, reliability } = retrievalResult;

    // 3. Persistence
    await sql`INSERT INTO chat_histories (user_id, role, content) VALUES (${userId}, 'user', ${text})`;
    await sql`INSERT INTO chat_histories (user_id, role, content) VALUES (${userId}, 'assistant', ${answer})`;

    console.log(`Bot Response [${reliability}]: ${text.substring(0,20)}...`);
    await ctx.reply(answer, { parse_mode: 'Markdown' });

  } catch (error) {
    console.error('Unified Bot Error:', error);
    
    // 🔥 GRACEFUL DEGRADATION: Try one last time with fresh retrieval, no history
    try {
        const { answer, reliability } = await performRetrieval(text);
        if (reliability !== 'RECOVERING') {
            console.log('Falling back to stateless retrieval');
            return ctx.reply(answer, { parse_mode: 'Markdown' });
        }
    } catch (e) {
        console.error('Stateless fallback failed:', e);
    }

    const isRateLimit = error.message?.includes('rate_limit') || error.message?.includes('credits');
    if (isRateLimit) {
      return ctx.reply("I'm stretching my neural circuits a bit too thin! Give me 10 seconds to catch my breath and ask me again. 🚀");
    }
    
    await ctx.reply("I'm doing some quick mental stretches and refining my knowledge. Give me a moment and try your question again!");
  }
});

console.log("🤖 Unified Telegram Bot is waking up...");
bot.launch();
