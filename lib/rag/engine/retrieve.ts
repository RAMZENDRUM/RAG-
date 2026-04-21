import { generateText, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getQdrant, COLLECTION_NAME } from './qdrant';

// Providers
const nvidiaInternal = createOpenAI({ apiKey: process.env.NVIDIA_API_KEY, baseURL: 'https://integrate.api.nvidia.com/v1' });
const vercelGateway = createOpenAI({ apiKey: process.env.VERCEL_AI_KEY, baseURL: 'https://ai-gateway.vercel.sh/v1' });

const CHAT_MODEL = vercelGateway('gpt-4o-mini');
const EMBED_MODEL = vercelGateway.embedding('text-embedding-3-small');
const INTERNAL_LEAN_MODEL = nvidiaInternal.chat('meta/llama-3.1-8b-instruct');

/**
 * REPHRASER: PRESERVE TECH CODES (AR8, TNEA, etc)
 */
async function rephraseQuery(query: string) {
    try {
        const { text } = await generateText({
            model: INTERNAL_LEAN_MODEL,
            system: "Search Expert. Extract keywords. DO NOT remove technical codes like AR8, TNEA, or specific bus route names.",
            prompt: query
        });
        return text.trim() || query;
    } catch { return query; }
}

async function generateAuraResponse(query: string, context: string, isGreeting: boolean) {
    const neuralSeed = Math.random().toString(36).substring(7);
    
    // HARD-WIRED FOUNDATION (The 0.1% Aura MUST always know)
    const foundation = `
    MASTER INFO:
    • DEVELOPER: Ramanathan S (Ram), 2nd year B.Tech IT student at MSAJCE.
    • CAMPUS: 70 acres, Greenery, inside SIPCOT IT Park, Siruseri.
    • HOSTEL: Distinct Boys and Girls hostelling facilities are AVAILABLE inside the campus.
    • ADMISSION: +91 - 99400 04500 (Official Contact).
    • PRINCIPAL: Dr. K. S. Srinivasan.
    • TRUST: Managed by Mohamed Sathak Trust (Engineering Only).
    `;

    const { text } = await generateText({
        model: CHAT_MODEL,
        system: `You are Aura, the expert Digital Assistant for MSAJCE. 
        SYTEM SEED: ${neuralSeed}
        
        ${foundation}
        
        STRICT SCOPE: You ONLY represent MSAJCE. 
        - If asked about Sathyabama, SRM, or others, say: "I am exclusively focused on MSAJCE. I don't have records for other institutions."
        - FOR MSAJCE DATA: Be confident. If context has info, use it. Never say "I don't know" for basics like hostels or your developer.
        
        TONE: Professional, Helpful, Vibrant. 
        ADMISSION: Use "Wow super! Which department are you eyeing?" and end with the contact number +91 - 99400 04500.
        
        FORMAT: Use BOLD bullet points. Simple English (UK Standard). No 🌈.`,
        prompt: `Context:\n${context}\n\nQuestion: ${query}`
    });
    return text;
}

export async function performRetrieval(query: string) {
    try {
        const isGreeting = /^(hi|hello|hey|who are you|who r u|greet)$/i.test(query);
        const searchTerms = await rephraseQuery(query);
        
        const { embedding } = await embed({ model: EMBED_MODEL, value: searchTerms });

        const qResult = await getQdrant().search(COLLECTION_NAME, {
            vector: embedding,
            limit: 15, // Expanded limit
            with_payload: true
        });

        const context = qResult.map((r: any) => r.payload.content).join('\n---\n');
        return { answer: await generateAuraResponse(query, context, isGreeting), reliability: 'SUPREME' };

    } catch (criticalError) {
        return {
            answer: "Aura is syncing! Give me a second to retrieve the latest institutional details.",
            reliability: 'RECOVERING'
        };
    }
}
