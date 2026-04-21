import { performRetrieval } from '../../../lib/rag/engine/retrieve';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import postgres from 'postgres';

let _sql: any = null;
const getSql = () => {
  if (!_sql) _sql = postgres(process.env.DATABASE_URL || '');
  return _sql;
};

const nvidiaInternal = createOpenAI({ apiKey: process.env.NVIDIA_API_KEY, baseURL: 'https://integrate.api.nvidia.com/v1' });
const INTENT_MODEL = nvidiaInternal.chat('meta/llama-3.1-8b-instruct');

/**
 * AURA UNIVERSAL WEB API (v1)
 * Use this to connect your website's Chatbot UI to Aura's Brain.
 */
export async function POST(req: Request) {
  try {
    const { messages, userId = 'web_guest' } = await req.json();
    if (!messages || messages.length === 0) return new Response('Missing messages', { status: 400 });

    const latestMessage = messages[messages.length - 1].content;
    const cleanText = latestMessage.toLowerCase().trim();
    const sql = getSql();

    // 1. ANALYTICS (BACKGROUND TASK)
    let meta = { category: 'GENERAL', mood: 'NEUTRAL', persona: 'UNKNOWN' };
    (async () => {
        try {
            const { text: rawMeta } = await generateText({
                model: INTENT_MODEL,
                system: "Analyst. Provide JSON: { 'category': 'string', 'mood': 'string', 'persona': 'string' }",
                prompt: `Question: ${latestMessage}`
            });
            const parsed = JSON.parse(rawMeta.substring(rawMeta.indexOf('{'), rawMeta.lastIndexOf('}') + 1));
            // Success log if needed
        } catch {}
    })();

    // 2. CACHE CHECK (SPEED & COST)
    const prevAnswer = await sql`SELECT answer FROM knowledge_cache WHERE query = ${cleanText} LIMIT 1`.catch(() => []);
    if (prevAnswer.length > 0) {
        return Response.json({ answer: prevAnswer[0].answer, cached: true, ...meta });
    }

    // 3. RAG CORE (AURA'S KNOWLEDGE)
    const history = messages.slice(0, -1).map((m: any) => ({ role: m.role, content: m.content }));
    const { answer } = await performRetrieval(latestMessage, history);

    // 4. PERSISTENCE & LEARNING
    try {
        await sql`INSERT INTO chat_histories (user_id, role, content, metadata) VALUES (${userId}, 'web_user', ${latestMessage}, ${JSON.stringify({ ...meta, source: 'web' })})`;
    } catch {}

    // 5. RETURN WITH CORS HEADERS
    return new Response(JSON.stringify({ 
        answer, 
        cached: false,
        category: meta.category,
        mood: meta.mood,
        persona: meta.persona
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Allow all for now, can be restricted to college domain later
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });

  } catch (error) {
    console.error('Web API Error:', error);
    return new Response('Internal Aura Sync Error', { status: 500 });
  }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}

