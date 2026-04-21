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
 * PRODUCTION TELEGRAM WEBHOOK (DEEP ORACLE EDITION)
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

    // 1. DEEP ORACLE ANALYST (Category, Mood, Urgency, Year, Facility)
    let meta = { category: 'GENERAL', mood: 'NEUTRAL', critical: 'LOW', rival: false, year: 'UNKNOWN', facility_issue: false };
    try {
        const { text: rawMeta } = await generateText({
            model: INTENT_MODEL,
            system: "Deep Analytics Analyst. Analyze query and provide JSON: { 'category': 'string', 'mood': 'string', 'critical': 'string', 'rival_mention': bool, 'inferred_year': '1st|2nd|3rd|4th|Unknown', 'is_facility_complaint': bool }",
            prompt: `Question: ${rawText}`
        });
        const parsed = JSON.parse(rawMeta.substring(rawMeta.indexOf('{'), rawMeta.lastIndexOf('}') + 1));
        meta = { 
            category: parsed.category || 'GENERAL', 
            mood: parsed.mood || 'NEUTRAL', 
            critical: parsed.critical || 'LOW', 
            rival: parsed.rival_mention || false,
            year: parsed.inferred_year || 'Unknown',
            facility_issue: parsed.is_facility_complaint || false
        };
    } catch {}

    // 2. CACHE PROXIMITY CHECK
    let isCached = false;
    const prevAnswer = await sql`SELECT answer FROM knowledge_cache WHERE query = ${cleanText} LIMIT 1`.catch(() => []);
    if (!isAdmin && prevAnswer.length > 0) {
        await bot.telegram.sendMessage(chatId, prevAnswer[0].answer, { parse_mode: 'Markdown' });
        await sql`INSERT INTO chat_histories (user_id, role, content, metadata) VALUES (${userId}, 'user', ${rawText}, ${JSON.stringify({ ...meta, cached: true })})`;
        return new Response('Cache Hit');
    }

    // 3. RAG FLOW
    const { answer } = await performRetrieval(rawText, chatHistory);
    if (!isAdmin) await sleep(600);

    await bot.telegram.sendMessage(chatId, answer, { parse_mode: 'Markdown' });

    // 4. PERSISTENCE & AUTO-LEARNING
    try {
      await sql`INSERT INTO chat_histories (user_id, role, content, metadata) VALUES (${userId}, 'user', ${rawText}, ${JSON.stringify({ ...meta, cached: false })}), (${userId}, 'assistant', ${answer}, ${JSON.stringify({ category: meta.category })})`;
      
      (async () => {
          const { text: variantsJson } = await generateText({
              model: INTENT_MODEL,
              system: "Learning Engine. Provide 10 distinct variations and a unique 'intent_key'. JSON: { 'variants': [], 'intent': '' }",
              prompt: `Question: ${rawText}`
          });
          const data = JSON.parse(variantsJson.substring(variantsJson.indexOf('{'), variantsJson.lastIndexOf('}') + 1));
          const entries = [data.intent.replace(/ /g, '_'), ...data.variants, cleanText].map(v => ({ query: v.toLowerCase().trim(), answer: answer }));
          await sql`INSERT INTO knowledge_cache ${sql(entries, 'query', 'answer')} ON CONFLICT (query) DO NOTHING`;
      })();
    } catch {}

    return new Response('OK');
  } catch (error) {
    return new Response('Error', { status: 500 });
  }
}
