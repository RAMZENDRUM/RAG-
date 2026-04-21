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
const INTENT_MODEL = nvidiaInternal.chat('meta/llama-3.1-8b-instruct');

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
const ADMIN_IDS = ['7770158141']; 

/**
 * PRODUCTION TELEGRAM WEBHOOK (NEURAL INTENT EDITION)
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

    // 1. NEURAL INTENT MAPPING (The Semantic Bridge)
    // We normalize the query to its CORE INTENT before checking the cache.
    let intentKey = cleanText;
    if (!isGreeting && !isAdmin) {
        try {
            const { text: resolvedIntent } = await generateText({
                model: INTENT_MODEL,
                system: "Intent Resolver. Reduce the question to its simplest semantic key (e.g. 'who is principal' -> 'principal_info', 'where is hostel' -> 'hostel_location'). Output the key only.",
                prompt: `Question: ${rawText}`
            });
            intentKey = resolvedIntent.toLowerCase().trim().replace(/ /g, '_');
        } catch { intentKey = cleanText; }
    }

    // 2. CACHE HIT CHECK (Using Intent Key)
    const prevAnswer = await sql`SELECT answer FROM knowledge_cache WHERE query = ${intentKey} OR query = ${cleanText} LIMIT 1`.catch(() => []);
    if (!isAdmin && prevAnswer.length > 0) {
        await sleep(600);
        await bot.telegram.sendMessage(chatId, prevAnswer[0].answer, { parse_mode: 'Markdown' });
        return new Response('Cache Hit');
    }

    // 3. RAG FLOW
    const { answer } = await performRetrieval(rawText, chatHistory);
    if (!isAdmin) await sleep(600);

    await bot.telegram.sendMessage(chatId, answer, { parse_mode: 'Markdown' });

    // 4. BEYOND-VARIATION LEARNING (Background)
    (async () => {
        try {
            await sql`INSERT INTO chat_histories (user_id, role, content) VALUES (${userId}, 'user', ${rawText}), (${userId}, 'assistant', ${answer})`;
            
            // Map the intent AND variations
            const { text: variantsJson } = await generateText({
                model: INTENT_MODEL,
                system: "Learning Engine. Provide 5 variants of the question AND one 3-word unique 'intent_key'. Output as JSON: { 'variants': [], 'intent': '' }",
                prompt: `Question: ${rawText}`
            });

            const data = JSON.parse(variantsJson.substring(variantsJson.indexOf('{'), variantsJson.lastIndexOf('}') + 1));
            const intent = data.intent.toLowerCase().trim().replace(/ /g, '_');
            const variations = data.variants.map((v: string) => v.toLowerCase().trim());

            // Save everything to the same answer pool
            const entries = [intent, ...variations, cleanText].map(v => ({ query: v, answer: answer }));
            await sql`INSERT INTO knowledge_cache ${sql(entries, 'query', 'answer')} ON CONFLICT (query) DO NOTHING`;
        } catch {}
    })();

    return new Response('OK');
  } catch (error) {
    return new Response('Error', { status: 500 });
  }
}
