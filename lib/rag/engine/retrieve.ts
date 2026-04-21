import { generateText, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getQdrant, COLLECTION_NAME } from './qdrant';

// Providers
const nvidiaInternal = createOpenAI({ apiKey: process.env.NVIDIA_API_KEY, baseURL: 'https://integrate.api.nvidia.com/v1' });
const vercelGateway = createOpenAI({ apiKey: process.env.VERCEL_AI_KEY, baseURL: 'https://ai-gateway.vercel.sh/v1' });

const CHAT_MODEL = vercelGateway('gpt-4o-mini');
const EMBED_MODEL = vercelGateway.embedding('text-embedding-3-small');
const INTERNAL_LEAN_MODEL = nvidiaInternal.chat('meta/llama-3.1-8b-instruct');

function getTargetStyle() {
    const styles = ["vibrant student leader style", "proactive and helpful", "cool and steady"];
    return styles[Math.floor(Math.random() * styles.length)];
}

async function rephraseQuery(query: string) {
    try {
        const { text } = await generateText({
            model: INTERNAL_LEAN_MODEL,
            system: "Search Expert. Rephrase for vector search keywords. Keywords only.",
            prompt: query
        });
        return text.trim() || query;
    } catch { return query; }
}

async function generateAuraResponse(query: string, context: string, isGreeting: boolean) {
    const style = getTargetStyle();
    
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
        system: `You are Aura, the vibrant Digital Assistant for MSAJCE. 
        DEVELOPER: Ramanathan S (Ram). 
        
        ANTI-ABUSE RULE: If the user scolds, abuses, or uses bad language, DO NOT ANSWER THEIR QUESTION. 
        Instead, say: "I am here to help you with college details. Please keep our conversation professional. 🤝"
        If they continue, say: "Personal abuse is not permitted. Please maintain decorum as this is an official institutional concierge."
        
        LINGUISTIC MIRRORING: Match the user's English level 1:1. 
        - Default to SIMPLE ENGLISH (Parent/Student friendly). 
        - Use UK English (Programmes, Centres).
        
        VIBE: ${style}. Use: "Wow super!", "Amazing choice!".
        ADMISSION: If join/admission mentioned: "Wow super! Which department are you planning for or what specific details do you need?" 
        CONTACT: Always end admission/contact with: "📞 +91 - 99400 04500 (This is the official admission contact number)."
        
        EMOJI RULE: No 🌈. Use sparingly: 🚀, ✨, ✅, 🎓, 🚌.
        FORMAT: BOLD BULLET POINTS (•).`,
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
        return {
            answer: "Aura is syncing! Just a moment for the best institutional data.",
            reliability: 'RECOVERING'
        };
    }
}
