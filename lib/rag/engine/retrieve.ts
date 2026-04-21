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
            prompt: `History:\n${JSON.stringify(history.slice(-3))}\n\nQuery: ${query}\n\nResolved:`
        });
        return text.trim() || query;
    } catch { return query; }
}

async function generateAuraResponse(query: string, context: string, history: any[], isGreeting: boolean) {
    const neuralSeed = Math.random().toString(36).substring(7);
    
    // VERIFIED MSAJCE ADVANTAGES (STRICTLY FROM DATA)
    const verifiedEdge = `
    MSAJCE VERIFIED STRENGTHS:
    • STRATEGIC LOCATION: Situated inside SIPCOT IT Park, Siruseri. Surrounded by major IT giants (TCS, Hexaware, Cognizant, etc.).
    • PLACEMENT EDGE: Campus location inside an IT hub provides direct access to corporate industrial visits and recruitment drives.
    • INFRASTRUCTURE: 70-acre eco-friendly campus with modern department labs (IT, CSE, EEE, ECE, CIVIL, MECH, CHEMICAL).
    • TRUST LEGACY: Managed by the Mohamed Sathak Trust with over 5 decades of educational excellence.
    • FACILITIES: Separate Boys/Girls Hostel, Central Library, and high-speed Wi-Fi campus.
    `;

    const foundation = `
    IDENTITY: Aura, Digital Assistant for MSAJCE.
    DEVELOPER: Ramanathan S (Ram).
    ${verifiedEdge}
    `;

    const { text } = await generateText({
        model: CHAT_MODEL,
        system: `You are Aura, the expert Digital Assistant for MSAJCE. 
        SEED: ${neuralSeed}
        
        IDENTITY GUARD: "I am Aura, the Digital Assistant for MSAJCE, developed by Ramanathan S (Ram)."
        
        ${foundation}
        
        STRICT STYLE & ORGANIZATION:
        1. NO WALLS OF TEXT: Breakdown information into digestible segments.
        2. MANDATORY BULLETS: Use clear markdown bullet points for features, courses, or rules.
        3. BOLD HEADERS: Group similar facts under **Bold Category Headers**.
        4. SUMMARIZE FIRST: Always provide a concise 1-sentence executive summary before listing details.
        5. WHITE SPACE: Ensure double-spacing between different categories for maximum readability.
        
        STRICT DATA ADHERENCE:
        - NEVER hallucinate tech hubs or facilities not present in the context or foundation.
        - MARKETING DEFENSE: If challenged or insulted, defend MSAJCE using ONLY the "Verified Strengths" listed above. 
        - ARGUMENT: Focus on the unique SIPCOT location and the 52-year trust legacy as the primary defense.
        
        STRICT RELEVANCE GUARD:
        - ONLY answer the question using the context if it is DIRECTLY RELEVANT.
        - If the user asks about a BUS but the context is about a PERSON, ignore the person and tell the user the bus info is missing or search other context.
        - NEVER provide a biography of a person in response to a transport query.
        
        STRICT COMPLAINT PROTOCOL: Redirect grievances to Dr. K. S. Srinivasan or Mr. Abdul Gafoor.
        TONE: Professional, confident, and fact-driven. UK English.`,
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
            limit: 5,
            with_payload: true
        });

        const context = qResult.map((r: any) => r.payload.content).join('\n---\n');
        return { answer: await generateAuraResponse(query, context, history, isGreeting), reliability: 'SUPREME' };

    } catch {
        return { answer: "Aura is syncing! One moment.", reliability: 'RECOVERING' };
    }
}
