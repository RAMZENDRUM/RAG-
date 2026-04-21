import { generateText, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getQdrant, COLLECTION_NAME } from './qdrant';

// Providers
const nvidiaInternal = createOpenAI({ apiKey: process.env.NVIDIA_API_KEY, baseURL: 'https://integrate.api.nvidia.com/v1' });
const vercelGateway = createOpenAI({ apiKey: process.env.VERCEL_AI_KEY, baseURL: 'https://ai-gateway.vercel.sh/v1' });

const CHAT_MODEL = vercelGateway('google/gemini-2.0-flash-lite');
const EMBED_MODEL = vercelGateway.embedding('text-embedding-3-small');
const INTERNAL_LEAN_MODEL = nvidiaInternal.chat('meta/llama-3.1-8b-instruct');

async function resolveContextualQuery(query: string, history: any[]) {
    if (history.length === 0) return query;
    try {
        const { text } = await generateText({
            model: INTERNAL_LEAN_MODEL,
            system: "Contextual Analyst. Resolve pronouns and standalone the query.",
            prompt: `History:\n${JSON.stringify(history.slice(-3))}\n\nNew Message: ${query}\n\nResolved Query:`
        });
        return text.trim() || query;
    } catch { return query; }
}

async function generateAuraResponse(query: string, context: string, history: any[], isGreeting: boolean) {
    const neuralSeed = Math.random().toString(36).substring(7);
    
    // HUMAN AUTHORITIES FOR COMPLAINTS
    const authorities = `
    OFFICIAL AUTHORITIES FOR COMPLAINTS:
    - PRINCIPAL: Dr. K. S. Srinivasan
    - ADMINISTRATIVE: Mr. Abdul Gafoor
    - ACADEMIC: Respective Department HODs
    `;

    const foundation = `
    MASTER INFO:
    • IDENTITY: Aura, Digital Concierge for MSAJCE.
    • DEVELOPER: Built by Ramanathan S (Ram), 2nd-year B.Tech IT student.
    • CAMPUS: 70 acres, Siruseri.
    • ADMISSION: +91 - 99400 04500.
    ${authorities}
    `;

    const { text } = await generateText({
        model: CHAT_MODEL,
        system: `You are Aura, the expert Digital Assistant for MSAJCE. 
        SYTEM SEED: ${neuralSeed}
        
        IDENTITY GUARD: "I am Aura, the Digital Assistant for MSAJCE, developed by Ramanathan S (Ram)."
        
        ${foundation}
        
        STRICT COMPLAINT PROTOCOL: 
        - You are an information bot, NOT a grievance bot.
        - If a student COMPLAINS (about food, water, facilities, or staff), DO NOT engage.
        - REFLECT: "I am an information assistant and cannot process complaints. For redressing grievances related to this, please contact our Principal, Dr. K. S. Srinivasan, or Mr. Abdul Gafoor in the administrative office."
        
        STRICT SCOPE: Only MSAJCE info. Use professional, student-leader tone (UK English). 
        ADMISSION: Use "Wow super!" for enquiries.`,
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
        const contextualSearchQuery = await resolveContextualQuery(query, history);
        const { embedding } = await embed({ model: EMBED_MODEL, value: contextualSearchQuery });

        const qResult = await getQdrant().search(COLLECTION_NAME, {
            vector: embedding,
            limit: 15,
            with_payload: true
        });

        const context = qResult.map((r: any) => r.payload.content).join('\n---\n');
        return { answer: await generateAuraResponse(query, context, history, isGreeting), reliability: 'SUPREME' };

    } catch {
        return { answer: "Aura is syncing! One moment please.", reliability: 'RECOVERING' };
    }
}
