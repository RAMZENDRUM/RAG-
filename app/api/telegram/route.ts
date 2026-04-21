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
 * PRODUCTION TELEGRAM WEBHOOK (PERSONA MAPPER EDITION)
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

    // 1. NEURAL PERSONA MAPPING (BACKGROUND TASK - FIRE AND FORGET)
    let meta = { category: 'GENERAL', mood: 'NEUTRAL', critical: 'LOW', rival: false, persona: 'UNKNOWN', facility_issue: false };
    (async () => {
        try {
            const { text: rawMeta } = await generateText({
                model: INTENT_MODEL,
                system: "Intelligence Analyst. Analyze the query and provide JSON: { 'category': 'string', 'mood': 'string', 'critical': 'string', 'rival_mention': bool, 'persona': 'PARENT|PROSPECTIVE_STUDENT|CURRENT_STUDENT_1YR|CURRENT_STUDENT_2YR|CURRENT_STUDENT_3YR|CURRENT_STUDENT_4YR|STAFF', 'is_facility_complaint': bool }",
                prompt: `Question: ${rawText}`
            });
            const parsed = JSON.parse(rawMeta.substring(rawMeta.indexOf('{'), rawMeta.lastIndexOf('}') + 1));
            // Log to telemetry or DB in background
            await sql`UPDATE chat_histories SET metadata = ${JSON.stringify(parsed)} WHERE user_id = ${userId} AND content = ${rawText} LIMIT 1`.catch(() => {});
        } catch {}
    })();

    // 2. RAG FLOW (LIVE & STREAMLINED)
    const { answer } = await performRetrieval(rawText, chatHistory);

    // 3. IMMEDIATE SEND
    await bot.telegram.sendMessage(chatId, answer, { parse_mode: 'Markdown' });

    // 4. BACKGROUND PERSISTENCE
    try {
      sql`INSERT INTO chat_histories (user_id, role, content, metadata) VALUES (${userId}, 'user', ${rawText}, ${JSON.stringify({ ...meta, cached: false })}), (${userId}, 'assistant', ${answer}, ${JSON.stringify({ category: meta.category })})`.catch(() => {});
    } catch {}

    return new Response('OK');
  } catch (error) {
    return new Response('Error', { status: 500 });
  }
}
