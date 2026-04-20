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

  try {
    // 1. Unified Retrieval
    const { context, reliability, answer, sources, score } = await performRetrieval(text);

    if (reliability === 'LOW') {
      return ctx.reply(answer);
    }

    // 2. Chat History
    const history = await sql`
      SELECT role, content FROM chat_histories 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC 
      LIMIT 6
    `;
    const chatHistory = history.reverse().map(h => ({
      role: h.role as 'user' | 'assistant',
      content: h.content
    }));

    // 3. Response Generation
    const { text: response } = await generateText({
      model: ai.chat('openai/gpt-4.1-nano'),
      system: `You are the MSAJCE Aura Concierge. Use institutional precision.
      
      RULES:
      - Answer based ONLY on the context.
      - Never hallucinate.
      - Present data in bullet points.
      
      CONTEXT:
      ${context}`,
      messages: [...chatHistory, { role: 'user', content: text }],
    });

    // 4. Persistence
    await sql`INSERT INTO chat_histories (user_id, role, content) VALUES (${userId}, 'user', ${text})`;
    await sql`INSERT INTO chat_histories (user_id, role, content) VALUES (${userId}, 'assistant', ${response})`;

    console.log(`Bot Success: ${text.substring(0,20)}... Score: ${score.toFixed(3)}`);
    await ctx.reply(response);

  } catch (error) {
    const isRateLimit = error.message?.includes('rate_limit') || error.message?.includes('credits');
    
    // 🔥 GRACEFUL DEGRADATION: If LLM is busy but retrieval worked, send the raw facts!
    try {
        const { context, reliability } = await performRetrieval(text);
        if (reliability === 'HIGH' && context) {
            console.log('Falling back to raw context due to Rate Limit');
            return ctx.reply(`Fact Sheet (Aura): \n\n${context.substring(0, 4000)}...`);
        }
    } catch (e) {}

    if (isRateLimit) {
      console.error('Final Rate Limit hit in Bot');
      return ctx.reply('I am processing many requests. Please try again in 10 seconds.');
    }
    console.error('Unified Bot Error:', error);
    await ctx.reply('System is refining the knowledge base. Please try again shortly.');
  }
});

console.log("🤖 Unified Telegram Bot is waking up...");
bot.launch();
