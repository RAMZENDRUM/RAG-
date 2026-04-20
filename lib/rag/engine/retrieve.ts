import { generateText, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import postgres from 'postgres';
import dotenv from 'dotenv';
import { qdrant, COLLECTION_NAME } from './qdrant';
dotenv.config();

const sql = postgres(process.env.DATABASE_URL!);
const ai = createOpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
  compatibility: 'strict',
});

const DEFAULT_MODEL = 'meta/llama-3.3-70b-instruct';
const RELIABILITY_THRESHOLD = 0.65;

export interface RetrievalResult {
  answer?: string;
  context: string;
  sources: string[];
  reliability: 'HIGH' | 'LOW';
  score: number;
}

/**
 * PRODUCTION FAST RETRIEVAL ENGINE V4.0
 * Optimized for Vercel Serverless (Sub-3s Response)
 */
export async function performRetrieval(query: string): Promise<RetrievalResult> {
  console.log(`--- [SEARCH] Query: ${query} ---`);
  try {
    // 1. Vector Embedding (OpenAI is fast)
    const { embedding } = await embed({
      model: ai.embedding('openai/text-embedding-3-small'),
      value: query,
    });

    // 2. Direct Qdrant Search (Instant)
    const qResult = await qdrant.search(COLLECTION_NAME, {
      vector: embedding,
      limit: 5,
      with_payload: true
    });

    if (!qResult.length) {
        return { context: '', sources: [], reliability: 'LOW', score: 0, answer: "No matching institutional records found." };
    }

    const context = qResult.map(r => r.payload?.content).join('\n---\n');
    const bestScore = qResult[0].score;
    const sources = [...new Set(qResult.map(r => r.payload?.metadata?.source || 'Institutional File'))];

    // 3. Direct Generation (Llama 3.3 70B via NVIDIA NIM)
    const { text: answer } = await generateText({
        model: ai.chat(DEFAULT_MODEL),
        system: "You are Aura, the MSAJCE Concierge. Answer ONLY using the PROVIDED CONTEXT. If unsure or no info found, provide the office contact: 044-27470025.",
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
    console.error("❌ RETRIEVAL CRASH:", err.message);
    return { 
        context: '', 
        sources: [], 
        reliability: 'LOW', 
        score: 0, 
        answer: "Aura is currently refining her data. Please try again or call the office at 044-27470025." 
    };
  }
}
