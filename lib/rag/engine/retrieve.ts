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
 * AURA VIBE: ENERGETIC STUDENT ASSISTANT
 */
function getTargetStyle() {
    const styles = ["super energetic and helpful", "cool and proactive", "vibrant student leader style", "passionate and direct"];
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
    
    // STRUCTURED INTRODUCTION FOR GREETINGS
    const categoryMenu = isGreeting ? `
    ---
    🚀 **Aura Master Categories** 🚀
    • 🏛️ **Admissions**: Entrance & Flyers.
    • 🎓 **Academic Core**: Syllabi & Regulations.
    • 🚌 **Transport HQ**: Full Routes & Timings.
    • 🤝 **Placements**: Jobs & Internships.
    • 🏢 **Institutional Life**: Hostels & Clubs.
    ` : "";

    const { text } = await generateText({
        model: CHAT_MODEL,
        system: `You are Aura, the vibrant Digital Assistant for MSAJCE. 
        DEVELOPER: Ramanathan S (Ram). 
        STYLE: Be ${style}. Use phrases like "Wow super!", "Amazing choice!", "Great! I'm here to help!".
        
        ADMISSION RULE: If a user asks about joinng/admission, say: "Wow super! Which department are you planning for or what specific details do you need?" 
        CONTACT RULE: Always end admission/contact queries with: "📞 +91 - 99400 04500 (This is the official admission contact number)."
        
        EMOJI RULE: No 🌈. Use only 🚀, ✨, ✅, 🎓, 🚌. Use them sparingly.
        FORMAT: BOLD BULLET POINTS (•). Keep it student-friendly and energetic.`,
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
            answer: "Aura is syncing up! Give me a second to get the best info for you.",
            reliability: 'RECOVERING'
        };
    }
}
