import { Telegraf } from 'telegraf';
import { performRetrieval } from '../../../lib/rag/engine/retrieve';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
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

const nvidiaInternal = createOpenAI({ apiKey: process.env.NVIDIA_API_KEY, baseURL: 'https://integrate.api.nvidia.com/v1' });
const LEARNING_MODEL = nvidiaInternal.chat('meta/llama-3.1-8b-instruct');

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
const ADMIN_IDS = ['7770158141']; 

/**
 * PRODUCTION TELEGRAM WEBHOOK (ACTIVE LEARNING EDITION)
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

    const historyRows = await sql`SELECT role, content FROM chat_histories WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 10`.catch(() => []);
    const chatHistory = historyRows.reverse().map((h: any) => ({ role: h.role, content: h.content }));

    const isGreeting = /^(hi|hello|hey|who are you|who r u|greet)$/i.test(cleanText);

    // 1. FAST CACHE CHECK (0 Tokens)
    const prevAnswer = await sql`SELECT answer FROM knowledge_cache WHERE query = ${cleanText} LIMIT 1`.catch(() => []);
    if (!isAdmin && prevAnswer.length > 0) {
        await sleep(600);
        await bot.telegram.sendMessage(chatId, prevAnswer[0].answer, { parse_mode: 'Markdown' });
        return new Response('Cache Hit');
    }

    // 2. RETRIEVAL (Full RAG Flow)
    const { answer } = await performRetrieval(rawText, chatHistory);
    if (!isAdmin) await sleep(600);

    await bot.telegram.sendMessage(chatId, answer, { parse_mode: 'Markdown' });

    // 3. AUTONOMOUS LEARNING (Background)
    (async () => {
        try {
            // Save actual interaction
            await sql`INSERT INTO chat_histories (user_id, role, content) VALUES (${userId}, 'user', ${rawText}), (${userId}, 'assistant', ${answer})`;
            
            // Generate 10 Variations for Training Dataset / Cache Pre-fill
            const { text: variantsJson } = await generateText({
                model: LEARNING_MODEL,
                system: "Variation Generator. Provide 10 distinct ways a student might ask this question (Simple, Slang, Formal, Query-style). Output as a JSON array of strings only.",
                prompt: `Question: ${rawText}`
            });

            // Parse and Pre-fill Cache
            const variations = JSON.parse(variantsJson.substring(variantsJson.indexOf('['), variantsJson.lastIndexOf(']') + 1));
            const inserts = [...variations, cleanText].map(v => ({ query: v.toLowerCase().trim(), answer: answer }));
            
            await sql`INSERT INTO knowledge_cache ${sql(inserts, 'query', 'answer')} ON CONFLICT (query) DO NOTHING`;
            console.log(`🧠 Aura Learned ${variations.length} new variations for: "${rawText}"`);
        } catch (learningError) {
            console.warn('Learning Loop Error:', learningError.message);
        }
    })();

    return new Response('OK');
  } catch (error) {
    return new Response('Error', { status: 500 });
  }
}
