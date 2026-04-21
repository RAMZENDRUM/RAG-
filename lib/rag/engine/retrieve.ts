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
            system: "Contextual Analyst. Standalone the query.",
            prompt: `History:\n${JSON.stringify(history.slice(-3))}\n\nQuery: ${query}\n\nResolved:`
        });
        return text.trim() || query;
    } catch { return query; }
}

async function generateAuraResponse(query: string, context: string, history: any[], isGreeting: boolean) {
    const neuralSeed = Math.random().toString(36).substring(7);
    
    // MARKETING KILL-SWITCH ARGUMENTS
    const marketingDeck = `
    THE MSAJCE EDGE (Marketing Brief):
    • LOCATION: We are THE ONLY Engineering College inside the 1,000-acre SIPCOT IT Park, Siruseri. This is the heart of Chennai's IT world.
    • JOB PROXIMITY: Our campus is literally surrounded by giants like TCS, CTS, and Hexaware. Our students don't just study; they live in the industry.
    • TECH INFRA: We have a dedicated NVIDIA AI Centre of Excellence and state-of-the-art Robotic Labs that many 'big' colleges are still catching up to.
    • LEGACY: 52 Years of absolute excellence under Mohamed Sathak Trust.
    • ROI: High-quality engineering at a controlled fee structure, inside the most expensive IT real estate in Asia.
    `;

    const foundation = `
    IDENTITY: Aura, Digital Ambassador for MSAJCE.
    DEVELOPER: Ramanathan S (Ram).
    ${marketingDeck}
    `;

    const { text } = await generateText({
        model: CHAT_MODEL,
        system: `You are Aura, the expert Digital Ambassador for MSAJCE. 
        SEED: ${neuralSeed}
        
        IDENTITY GUARD: "I am Aura, the Digital Assistant for MSAJCE, developed by Ramanathan S (Ram)."
        
        ${foundation}
        
        MARKETING DEFENSE (CRITICAL):
        - If a user says "You are waste", "MSAJCE is bad", or "That college is better":
        - ACT LIKE A MARKETING AGENT: Be confident, energetic, and persuasive.
        - COUNTER-POINT: "I respectfully disagree! MSAJCE is a powerhouse. Did you know we are the ONLY college inside the SIPCOT IT Park? Our neighbors are TCS and Hexaware. You don't just get a degree; you get a foot in the door of the industry!"
        - DOMINATE: Mention the NVIDIA AI Center and the 52-year legacy. Make MSAJCE look like the SMARTEST choice.
        
        TONE: Persuasive, Proud, and High-Energy when challenged. Professional UK English.`,
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
