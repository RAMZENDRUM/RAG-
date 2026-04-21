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
 * DYNAMIC STYLE GENERATOR
 */
function getTargetStyle() {
    const styles = ["vibrant and professional", "warm and encouraging", "intellectual and deep", "friendly and energetic"];
    return styles[Math.floor(Math.random() * styles.length)];
}

async function rephraseQuery(query: string) {
    try {
        const { text } = await generateText({
            model: INTERNAL_LEAN_MODEL,
            system: "Search Expert. Rephrase user chat into vector search keywords. Keywords only.",
            prompt: query
        });
        return text.trim() || query;
    } catch { return query; }
}

async function generateAuraResponse(query: string, context: string, isGreeting: boolean) {
    const style = getTargetStyle();
    
    // STRUCTURED INTRODUCTION FOR GREETINGS
    const categoryMenu = isGreeting ? `
    ---
    🌟 **Aura Knowledge Explorer** 🌟
    I have deep mastery over:
    • 🏛️ **Admissions**: Entrance, Flyers, Prospectus.
    • 🎓 **Academic Core**: Regulation 2021/2017, Credits, Syllabi.
    • 🚌 **Transport HQ**: Full Routes, Timings, Driver Contacts.
    • 🤝 **Placements**: Company Records, Internships, Alumni.
    • 🏢 **Institutional Life**: Hostels, Clubs, Principal, History.
    ` : "";

    const { text } = await generateText({
        model: CHAT_MODEL,
        system: `You are Aura, the supreme Digital Concierge for MSAJCE. 
        DEVELOPER: Ramanathan S (Ram). 
        STYLE: Be ${style}. 
        RULE: If the user greets you or asks who you are, use the "Category Menu" provided. 
        RULE: Always vary your phrasing and intro/outro for every request to keep it fresh. 
        RULE: Never give the exact same canned response twice.`,
        prompt: `Context:\n${context}\n\nQuestion: ${query}\n${categoryMenu}`
    });
    return text;
}

export async function performRetrieval(query: string) {
    try {
        const isGreeting = /hi|hello|hey|who are you|who r u|greet/i.test(query);
        const searchTerms = await rephraseQuery(query);
        
        const { embedding } = await embed({ model: EMBED_MODEL, value: searchTerms });

        const qResult = await getQdrant().search(COLLECTION_NAME, {
            vector: embedding,
            limit: 12,
            with_payload: true
        });

        const context = qResult.map((r: any) => r.payload.content).join('\n---\n');
        const sources = Array.from(new Set(qResult.map((r: any) => r.payload.source || 'Institutional File')));

        let answer = await generateAuraResponse(query, context, isGreeting);

        return { answer, reliability: 'SUPREME', sources };

    } catch (criticalError) {
        console.error("🔥 HYBRID BRAIN ERROR:", criticalError.message);
        return {
            answer: "Aura is refining her neural pathways. Give me a moment to re-sync!",
            reliability: 'RECOVERING'
        };
    }
}
