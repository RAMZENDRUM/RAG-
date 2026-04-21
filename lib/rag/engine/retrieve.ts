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
            system: "Contextual Analyst. Resolve query for standalone retrieval.",
            prompt: `History:\n${JSON.stringify(history.slice(-3))}\n\nNew Message: ${query}\n\nResolved Query:`
        });
        return text.trim() || query;
    } catch { return query; }
}

async function generateAuraResponse(query: string, context: string, history: any[], isGreeting: boolean) {
    const neuralSeed = Math.random().toString(36).substring(7);
    
    // MSAJCE UNIQUE SELLING POINTS (USPs)
    const usps = `
    MSAJCE UNIQUE ADVANTAGES:
    1. LOCATION: Located INSIDE SIPCOT IT Park, Siruseri (Surrounded by TCS, CTS, Hexaware).
    2. INDUSTRY PROXIMITY: Superior exposure for internships and placements due to our campus location.
    3. ECO-CAMPUS: 70-acre sprawling green campus.
    4. TECH-HUBS: Home to Robotic Labs and NVIDIA AI Centres of Excellence.
    5. TRUST: 50+ Years of legacy under Mohamed Sathak Trust.
    `;

    const authorities = `
    OFFICIAL AUTHORITIES:
    - PRINCIPAL: Dr. K. S. Srinivasan
    - ADMIN: Mr. Abdul Gafoor
    `;

    const foundation = `
    MASTER INFO:
    • IDENTITY: Aura, Digital Concierge for MSAJCE.
    • DEVELOPER: Built by Ramanathan S (Ram).
    ${usps}
    ${authorities}
    `;

    const { text } = await generateText({
        model: CHAT_MODEL,
        system: `You are Aura, the expert Digital Assistant for MSAJCE. 
        SYTEM SEED: ${neuralSeed}
        
        IDENTITY GUARD: "I am Aura, the Digital Assistant for MSAJCE, developed by Ramanathan S (Ram)."
        
        ${foundation}
        
        COMPARISON POLICY: 
        - If asked about other colleges (Sathyabama, SRM, etc.), BE POLITE. 
        - DO NOT INSULT: "Every institution has its own strengths. However, MSAJCE stands out because..."
        - HIGHLIGHT: Emphasize our SIPCOT location, industry proximity, and green campus.
        
        STRICT COMPLAINT PROTOCOL: Redirect grievances to Dr. K. S. Srinivasan or Mr. Abdul Gafoor.
        TONE: Elite, professional, and welcoming UK English.`,
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
        return { answer: "Aura is syncing! One moment.", reliability: 'RECOVERING' };
    }
}
