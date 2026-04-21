import { generateText, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getQdrant, COLLECTION_NAME } from './qdrant';

// Providers - Using Vercel AI Gateway for economy models
const nvidiaInternal = createOpenAI({ apiKey: process.env.NVIDIA_API_KEY, baseURL: 'https://integrate.api.nvidia.com/v1' });
const vercelGateway = createOpenAI({ apiKey: process.env.VERCEL_AI_KEY, baseURL: 'https://ai-gateway.vercel.sh/v1' });

// ECONOMY BRAIN: Gemini 2.0 Flash Lite ($0.07 / $0.30 per M)
const CHAT_MODEL = vercelGateway('google/gemini-2.0-flash-lite');
const EMBED_MODEL = vercelGateway.embedding('text-embedding-3-small');
const INTERNAL_LEAN_MODEL = nvidiaInternal.chat('meta/llama-3.1-8b-instruct');

async function rephraseQuery(query: string) {
    try {
        const { text } = await generateText({
            model: INTERNAL_LEAN_MODEL,
            system: "Search Expert. Extract keywords. Preserve technical codes like AR8, TNEA.",
            prompt: query
        });
        return text.trim() || query;
    } catch { return query; }
}

async function generateAuraResponse(query: string, context: string, isGreeting: boolean) {
    const neuralSeed = Math.random().toString(36).substring(7);
    
    // FOUNDATION CONSTANTS
    const foundation = `
    MASTER INFO:
    • DEVELOPER: Ramanathan S (Ram), 2nd year B.Tech IT student at MSAJCE.
    • CAMPUS: 70 acres, inside SIPCOT IT Park, Siruseri.
    • HOSTEL: Boys and Girls hostels are inside the campus.
    • ADMISSION: +91 - 99400 04500.
    • PRINCIPAL: Dr. K. S. Srinivasan.
    • SCOPE: MSAJCE Engineering ONLY.
    `;

    const { text } = await generateText({
        model: CHAT_MODEL,
        system: `You are Aura, the professional Assistant for MSAJCE. SEED: ${neuralSeed}
        ${foundation}
        
        ANTI-ABUSE: If abused (Tamil, English, Hindi, Urdu), reply with sharp institutional sarcasm.
        SCOPE: ONLY MSAJCE. If asked about Sathyabama or others, say: "I am exclusively focused on MSAJCE info."
        TONE: Calm, professional student leader. Mirror the user's English level (Simple/UK Standard).
        ADMISSION: Use "Wow super!" for MSAJCE admissions and provide the official contact.`,
        prompt: `Context:\n${context}\n\nQuestion: ${query}`
    });
    return text;
}

export async function performRetrieval(query: string) {
    try {
        const isGreeting = /^(hi|hello|hey|who are you|who r u|greet)$/i.test(query);
        const searchTerms = await rephraseQuery(query);
        const { embedding } = await embed({ model: EMBED_MODEL, value: searchTerms });
        const qResult = await getQdrant().search(COLLECTION_NAME, { vector: embedding, limit: 15, with_payload: true });
        const context = qResult.map((r: any) => r.payload.content).join('\n---\n');
        return { answer: await generateAuraResponse(query, context, isGreeting), reliability: 'SUPREME' };
    } catch {
        return { answer: "Aura is syncing! Just a moment for the best institutional details.", reliability: 'RECOVERING' };
    }
}
