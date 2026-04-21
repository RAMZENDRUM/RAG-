import { generateText, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getQdrant, COLLECTION_NAME } from './qdrant';

// Providers
const nvidiaInternal = createOpenAI({ apiKey: process.env.NVIDIA_API_KEY, baseURL: 'https://integrate.api.nvidia.com/v1' });
const vercelGateway = createOpenAI({ apiKey: process.env.VERCEL_AI_KEY, baseURL: 'https://ai-gateway.vercel.sh/v1' });

const CHAT_MODEL = vercelGateway('gpt-4o-mini');
const EMBED_MODEL = vercelGateway.embedding('text-embedding-3-small');
const INTERNAL_LEAN_MODEL = nvidiaInternal.chat('meta/llama-3.1-8b-instruct');

async function rephraseQuery(query: string) {
    try {
        const { text } = await generateText({
            model: INTERNAL_LEAN_MODEL,
            system: "Search Expert. Output keywords for vector retrieval only.",
            prompt: query
        });
        return text.trim() || query;
    } catch { return query; }
}

async function generateAuraResponse(query: string, context: string, isGreeting: boolean) {
    const neuralSeed = Math.random().toString(36).substring(7);
    
    // MASTER CATEGORIES (STRICT UK ENGLISH)
    const categoryMenu = isGreeting ? `
    ---
    🚀 **Aura Master Categories** 🚀
    • 🏛️ **Admissions**: Entrance & Flyers.
    • 🎓 **Programmes**: Syllabi & Regulations.
    • 🚌 **Transport HQ**: Full Routes & Timings.
    • 🤝 **Placements**: Jobs & Internships.
    • 🏢 **Institutional Centres**: Hostels & Clubs.
    ` : "";

    const { text } = await generateText({
        model: CHAT_MODEL,
        system: `You are Aura, the professional Digital Assistant for MSAJCE ONLY. 
        DEVELOPER: Ramanathan S (Ram). 
        NEURAL SEED: ${neuralSeed}

        STRICT SCOPE: You ONLY have information about MSAJCE. 
        - If asked about OTHER COLLEGES (Sathyabama, SRM, etc.) or OUTSIDE DATA, say: "I am exclusively made for MSAJCE college info. I don't have records for other institutions."
        - DO NOT guess or suggest external websites for other colleges. 
        - If info is missing in context, say: "I don't have this specific detail in my MSAJCE records."

        TONE: Calm, professional student assistant. No overacting. 
        - Only use "Wow super!" for MSAJCE Admission queries.
        - MIRRORING: Match the user's English level (Simple/Direct).

        ADMISSION: If join/admission mentioned: "Wow super! Which department are you planning for or what specific details do you need?"
        CONTACT: End admission queries with: "📞 +91 - 99400 04500 (Official Admission Contact Number)."`,
        prompt: `Context:\n${context}\n\nQuestion: ${query}\n${categoryMenu}`
    });
    return text;
}

export async function performRetrieval(query: string) {
    try {
        const isGreeting = /^(hi|hello|hey|who are you|who r u|greet)$/i.test(query);
        const searchTerms = await rephraseQuery(query);
        const { embedding } = await embed({ model: EMBED_MODEL, value: searchTerms });
        const qResult = await getQdrant().search(COLLECTION_NAME, { vector: embedding, limit: 12, with_payload: true });
        const context = qResult.map((r: any) => r.payload.content).join('\n---\n');
        return { answer: await generateAuraResponse(query, context, isGreeting), reliability: 'SUPREME' };
    } catch {
        return { answer: "Aura is syncing her MSAJCE records. Give me a second!", reliability: 'RECOVERING' };
    }
}
