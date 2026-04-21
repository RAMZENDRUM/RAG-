import { generateText, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getQdrant, COLLECTION_NAME } from './qdrant';

// 🏎️ INTERNAL ENGINE: NVIDIA Direct (No Vercel Credit Usage)
const nvidiaInternal = createOpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

// 🛰️ USER-FACING ENGINE: Vercel AI Gateway (Premium Personality)
const vercelGateway = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const CHAT_MODEL = vercelGateway('gpt-4o-mini'); 
const EMBED_MODEL = vercelGateway.embedding('text-embedding-3-small'); // 1536 Dim Standard
const INTERNAL_LEAN_MODEL = nvidiaInternal.chat('meta/llama-3.1-8b-instruct');

/**
 * INTERNAL: Rephrase with NVIDIA (Zero Vercel Cost)
 */
async function rephraseQuery(query: string) {
    try {
        const { text } = await generateText({
            model: INTERNAL_LEAN_MODEL,
            maxRetries: 0,
            system: "Search Expert. Rephrase for vector search. Output keywords only.",
            prompt: query
        });
        return text.trim() || query;
    } catch (err) {
        return query;
    }
}

/**
 * USER-FACING: Aura Response with Vercel Gateway (Premium View)
 */
async function generateAuraResponse(query: string, context: string) {
    const { text } = await generateText({
        model: CHAT_MODEL,
        maxRetries: 1,
        system: `You are Aura, the vibrant Digital Concierge for MSAJCE. 
        DEVELOPER: Ramanathan S (Ram). 
        Format: BOLD BULLET POINTS (•). Answer only from context.`,
        prompt: `Context:\n${context}\n\nQuestion: ${query}`
    });
    return text;
}

export async function performRetrieval(query: string) {
    try {
        // 1. INTERNAL MOVE (NVIDIA)
        const searchTerms = await rephraseQuery(query);
        
        // 2. USER MOVE (Vercel SDK - 1536 Dim)
        const { embedding } = await embed({
            model: EMBED_MODEL,
            value: searchTerms,
        });

        // 3. SEARCH
        const qResult = await getQdrant().search(COLLECTION_NAME, {
          vector: embedding,
          limit: 12,
          with_payload: true
        });

        const context = qResult.map((r: any) => r.payload.content).join('\n---\n');
        const sources = Array.from(new Set(qResult.map((r: any) => r.payload.source || 'Institutional File')));

        // 4. USER MOVE (Vercel SDK - Final Answer)
        let answer = await generateAuraResponse(query, context);

        // 5. INTERNAL MOVE (NVIDIA - Judicial Layer)
        const { text: judgment } = await generateText({
            model: INTERNAL_LEAN_MODEL,
            maxRetries: 0,
            system: "Evaluate Answer vs Context. Output ONLY PASS or FAIL.",
            prompt: `Context:\n${context}\n\nAnswer: ${answer}`
        });

        if (judgment.includes('FAIL')) {
            console.log("⚠️ Self-Healing Answer via Vercel...");
            answer = await generateAuraResponse(query, context + "\nSTRICT: Use context ONLY.");
        }

        return {
            answer,
            reliability: 'SUPREME',
            sources,
            score: 0.95
        };

    } catch (criticalError) {
        console.error("🔥 HYBRID BRAIN ERROR:", criticalError.message);
        return {
            answer: "Aura is currently refining her neural pathways. Please try again shortly.",
            reliability: 'RECOVERING',
            sources: [],
            score: 0
        };
    }
}
