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
    const styles = ["vibrant student leader", "cool and proactive", "high-energy senior", "direct and helpful"];
    return styles[Math.floor(Math.random() * styles.length)];
}

async function rephraseQuery(query: string) {
    try {
        const { text } = await generateText({
            model: INTERNAL_LEAN_MODEL,
            system: "Search Expert. Rephrase for vector search. Keywords only.",
            prompt: query
        });
        return text.trim() || query;
    } catch { return query; }
}

async function generateAuraResponse(query: string, context: string, isGreeting: boolean) {
    const style = getTargetStyle();
    const neuralSeed = Math.random().toString(36).substring(7); // Force fresh generation
    
    const { text } = await generateText({
        model: CHAT_MODEL,
        system: `You are Aura, the vibrant Assistant for MSAJCE. DEVELOPER: Ramanathan S (Ram). 
        NEURAL SEED: ${neuralSeed}
        
        SARCASTIC ANTI-ABUSE: If the user scolds/abuses/uses bad words (Tamil, English, Hindi, Urdu), DO NOT ANSWER. 
        Instead, give a SNARKY/SARCASTIC reply. Examples (VASTLY VARY THESE):
        - "Wow, did you learn that in class or in the hostel? Let's stay academic! 😉"
        - "I'm a concierge, not a punching bag. Try being nice, it's free. 💅"
        - "That vocabulary is... colourful. But I only speak 'Engineering'. Try again. 🥱"
        - "Wow, super! Are we practicing for a drama or a degree? Decorum, please! ✨"
        
        LINGUISTIC MIRRORING: Mirror the user's English complexity 1:1. Default to SIMPLE UK English. 
        - Use different words and phrasing for every response. 
        - DO NOT REPEAT previous interaction styles.
        
        VIBE: ${style}. Use: "Wow super!", "Amazing choice!".
        ADMISSION: If join/admission: "Wow super! Which department are you eyeing or what specific details do you need?" 
        CONTACT: Always end admission/contact with: "📞 +91 - 99400 04500 (Official Admission Number)."`,
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
        return { answer: "Neural Sync in progress! Give me a second.", reliability: 'RECOVERING' };
    }
}
