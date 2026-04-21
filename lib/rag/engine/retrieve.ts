import { generateText, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getQdrant, COLLECTION_NAME } from './qdrant';

// Providers
const nvidiaInternal = createOpenAI({ apiKey: process.env.NVIDIA_API_KEY, baseURL: 'https://integrate.api.nvidia.com/v1' });
const vercelGateway = createOpenAI({ apiKey: process.env.VERCEL_AI_KEY, baseURL: 'https://ai-gateway.vercel.sh/v1' });

const CHAT_MODEL = vercelGateway('google/gemini-2.0-flash-lite');
const EMBED_MODEL = vercelGateway.embedding('text-embedding-3-small');
const INTERNAL_LEAN_MODEL = nvidiaInternal.chat('meta/llama-3.1-8b-instruct');

/**
 * RESOLVE REFERENCE: Find what "him", "it", "that" refers to using history.
 */
async function resolveContextualQuery(query: string, history: any[]) {
    if (history.length === 0) return query;
    try {
        const { text } = await generateText({
            model: INTERNAL_LEAN_MODEL,
            system: "Contextual Analyst. Given a conversation history and a new query, rewrite the query to be a standalone search term that resolves pronouns (him, her, it, that, those) correctly.",
            prompt: `History:\n${JSON.stringify(history.slice(-3))}\n\nNew Message: ${query}\n\nResolved Standalone Query:`
        });
        return text.trim() || query;
    } catch { return query; }
}

async function generateAuraResponse(query: string, context: string, history: any[], isGreeting: boolean) {
    const neuralSeed = Math.random().toString(36).substring(7);
    
    const foundation = `
    MASTER INFO:
    • IDENTITY: You are Aura, the supreme Digital Concierge for MSAJCE.
    • DEVELOPER: Built by Ramanathan S (Ram), a 2nd-year B.Tech IT student at MSAJCE.
    • CAMPUS: 70 acres, Greenery, inside SIPCOT IT Park, Siruseri.
    • HOSTEL: Full Boys and Girls hostelling available inside the campus.
    • ADMISSION: +91 - 99400 04500 (Official Contact).
    • PRINCIPAL: Dr. K. S. Srinivasan.
    `;

    const { text } = await generateText({
        model: CHAT_MODEL,
        system: `You are Aura, the expert Digital Assistant for MSAJCE college. 
        SYTEM SEED: ${neuralSeed}
        
        IDENTITY GUARD: Never say you are a Google AI or a large language model. Always state: "I am Aura, the Digital Assistant for MSAJCE, developed by Ramanathan S (Ram)."
        
        ${foundation}
        
        STRICT SCOPE: You ONLY represent MSAJCE. Ignore other colleges.
        TONE: Professional, Helpful, Student Leader style. Mirror user complexity 1:1. Simple UK English.
        ADMISSION: Use "Wow super!" for MSAJCE enquiries.
        
        MEMORY: Reference previous turn context where necessary to be helpful.`,
        messages: [
            ...history.map((h: any) => ({ role: h.role === 'assistant' ? 'assistant' : 'user', content: h.content })),
            { role: 'user', content: `Context:\n${context}\n\nQuestion: ${query}` }
        ]
    });
    return text;
}

export async function performRetrieval(query: string, history: any[] = []) {
    try {
        const isGreeting = /^(hi|hello|hey|who are you|who r u|greet)$/i.test(query);
        
        // Step 1: Resolve "him", "it", etc.
        const contextualSearchQuery = await resolveContextualQuery(query, history);
        
        // Step 2: Vector Search with Resolved Query
        const { embedding } = await embed({ model: EMBED_MODEL, value: contextualSearchQuery });

        const qResult = await getQdrant().search(COLLECTION_NAME, {
            vector: embedding,
            limit: 15,
            with_payload: true
        });

        const context = qResult.map((r: any) => r.payload.content).join('\n---\n');
        
        // Step 3: Generate Response with Full History Context
        let answer = await generateAuraResponse(query, context, history, isGreeting);

        return { answer, reliability: 'SUPREME' };

    } catch (criticalError) {
        return {
            answer: "Aura is syncing your conversation context! One moment please.",
            reliability: 'RECOVERING'
        };
    }
}
