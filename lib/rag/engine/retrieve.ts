import { generateText, embed } from 'ai';
import { createVercel } from '@ai-sdk/vercel'; // Using the dedicated Vercel provider
import { createOpenAI } from '@ai-sdk/openai';
import postgres from 'postgres';
import dotenv from 'dotenv';
import { qdrant, COLLECTION_NAME } from './qdrant';
dotenv.config();

/**
 * ELITE AI GATEWAY CONFIG V6.0 (Vercel-NVIDIA Hybrid)
 */

// PROVIDER 1: Vercel AI (Optimized for your vck_ key)
const vercel = createVercel({
  apiKey: process.env.VERCEL_AI_KEY,
});

// PROVIDER 2: NVIDIA NIM (For the Brain)
const nvidia = createOpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
  compatibility: 'strict',
});

const DEFAULT_CHAT_MODEL = 'meta/llama-3.3-70b-instruct';
const RELIABILITY_THRESHOLD = 0.65;

export interface RetrievalResult {
  answer?: string;
  context: string;
  sources: string[];
  reliability: 'HIGH' | 'LOW';
  score: number;
}

export async function performRetrieval(query: string): Promise<RetrievalResult> {
  console.log(`--- [ELITE VERCEL SEARCH] Query: ${query} ---`);
  try {
    // 1. EMBEDDING (Using Vercel Provider)
    const { embedding } = await embed({
      model: vercel.embedding('text-embedding-3-small'),
      value: query,
    });

    // 2. QDRANT SEARCH
    const qResult = await qdrant.search(COLLECTION_NAME, {
      vector: embedding,
      limit: 5,
      with_payload: true
    });

    if (!qResult.length) {
        return { context: '', sources: [], reliability: 'LOW', score: 0, answer: "No institutional records found." };
    }

    const context = qResult.map(r => r.payload?.content).join('\n---\n');
    const bestScore = qResult[0].score;
    const sources = [...new Set(qResult.map(r => r.payload?.metadata?.source || 'Institutional File'))];

    // 3. GENERATION (Using NVIDIA NIM)
    const { text: answer } = await generateText({
        model: nvidia.chat(DEFAULT_CHAT_MODEL),
        system: "You are Aura, the MSAJCE Concierge. Answer ONLY using the provided context. No rambling. Office: 044-27470025.",
        prompt: `Context:\n${context}\n\nQuestion: ${query}`
    });

    console.log(`✅ [SUCCESS] Score: ${bestScore.toFixed(3)}`);
    return { 
        context, 
        sources, 
        reliability: bestScore > RELIABILITY_THRESHOLD ? 'HIGH' : 'LOW', 
        score: bestScore, 
        answer 
    };

  } catch (err) {
    console.error("❌ CLOUD ENGINE CRASH:", err.message);
    return { 
        context: '', 
        sources: [], 
        reliability: 'LOW', 
        score: 0, 
        answer: "Aura is refining her connection. Please try again or call the office at 044-27470025." 
    };
  }
}
