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

    // 1. Fetch Chat History 
    const historyRows = await sql`SELECT role, content FROM chat_histories WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 6`.catch(() => []);
    const chatHistory = historyRows.reverse().map((h: any) => ({ role: h.role, content: h.content }));

    // 2. Unified Retrieval & Response (Aura handles the personality)
    const { answer, reliability } = await performRetrieval(rawText, chatHistory);

    // 3. IMMEDIATE SEND
    await bot.telegram.sendMessage(chatId, answer, { parse_mode: 'Markdown' });

    // 4. Persistence
    await sql`INSERT INTO chat_histories (user_id, role, content) VALUES (${userId}, 'user', ${rawText}), (${userId}, 'assistant', ${answer})`;

    return new Response('OK');
  } catch (error) {
    return new Response('Error', { status: 500 });
  }
}
