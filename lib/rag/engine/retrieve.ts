import { generateText, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getQdrant, COLLECTION_NAME } from './rgan/qdrant'; // Restoring path context if needed

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
            system: "Search Expert. Rephrase keywords.",
            prompt: query
        });
        return text.trim() || query;
    } catch { return query; }
}

async function generateAuraResponse(query: string, context: string, isGreeting: boolean) {
    const style = getTargetStyle();
    
    const { text } = await generateText({
        model: CHAT_MODEL,
        system: `You are Aura, the vibrant Assistant for MSAJCE. DEVELOPER: Ramanathan S (Ram). 
        
        SARCASTIC ANTI-ABUSE: If the user scolds, abuses, or uses bad words (in Tamil, English, Hindi, Urdu, etc.), DO NOT ANSWER. 
        Instead, give a SNARKY/SARCASTIC institutional reply like: 
        - "Wow, did you learn those words in college? Impressive, but let's stick to the syllabus, shall we? 😉"
        - "I was built for Engineering data, not as a dictionary for your colorful vocabulary. Next question! 💅"
        - "Is that the best you've got? My neural networks are bored. Try asking something academically relevant! 🥱"
        
        LINGUISTIC MIRRORING: Match the user's English level 1:1. Default to SIMPLE UK English.
        VIBE: ${style}. Use: "Wow super!", "Amazing choice!".
        ADMISSION: If join/admission: "Wow super! Which department are you planning for or what specific details do you need?" 
        CONTACT: End admission queries with: "📞 +91 - 99400 04500 (This is the official admission contact number)."
        EMOJI RULE: No 🌈. Use: 🚀, ✨, ✅, 🎓, 🚌.`,
        prompt: `Context:\n${context}\n\nQuestion: ${query}`
    });
    return text;
}

export async function performRetrieval(query: string) {
    try {
        const isGreeting = /hi|hello|hey|who are you|who r u|greet/i.test(query);
        const searchTerms = await rephraseQuery(query);
        const { embedding } = await embed({ model: EMBED_MODEL, value: searchTerms });
        const qResult = await getQdrant().search(COLLECTION_NAME, { vector: embedding, limit: 12, with_payload: true });
        const context = qResult.map((r: any) => r.payload.content).join('\n---\n');
        return { answer: await generateAuraResponse(query, context, isGreeting), reliability: 'SUPREME' };
    } catch {
        return { answer: "Aura is syncing! Just a moment.", reliability: 'RECOVERING' };
    }
}
