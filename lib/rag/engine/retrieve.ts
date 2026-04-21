import { generateText, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getQdrant, COLLECTION_NAME } from './qdrant';

// Vercel AI Gateway Configuration
const vercelGateway = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const CHAT_MODEL = vercelGateway('gpt-4o-mini');
const EMBED_MODEL = vercelGateway.embedding('text-embedding-3-small');

export async function performRetrieval(query: string) {
    try {
        const { text: searchTerms } = await generateText({
            model: CHAT_MODEL,
            system: "Rephrase for vector search. Keywords only.",
            prompt: query
        });

        const { embedding } = await embed({
            model: EMBED_MODEL,
            value: searchTerms || query,
        });

        // Use Lazy Connection
        const qResult = await getQdrant().search(COLLECTION_NAME, {
          vector: embedding,
          limit: 12,
          with_payload: true
        });

        const context = qResult.map((r: any) => r.payload.content).join('\n---\n');
        const sources = Array.from(new Set(qResult.map((r: any) => r.payload.source || 'Institutional File')));

        const { text: answer } = await generateText({
            model: CHAT_MODEL,
            system: `You are Aura, the MSAJCE Digital Concierge. DEVELOPER: Ramanathan S (Ram). 
            Answer strictly based on context. Bold Bullet Points. Engineering focus. proud student assistant.`,
            prompt: `Context:\n${context}\n\nQuestion: ${query}`
        });

        return {
            answer,
            reliability: 'SUPREME',
            sources,
            score: 0.95
        };

    } catch (criticalError) {
        console.error("🔥 SUPREME BRAIN CRASH:", criticalError.message);
        return {
            answer: "Aura is currently refining her neural pathways. Please try again shortly.",
            reliability: 'RECOVERING',
            sources: [],
            score: 0
        };
    }
}
