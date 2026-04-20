import { generateText, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import postgres from 'postgres';
import dotenv from 'dotenv';
import { qdrant, COLLECTION_NAME } from './qdrant';
dotenv.config();

/**
 * ELITE AI GATEWAY CONFIG V5.0
 * Separating Providers to resolve the 404 Mismatch Error
 */

// PROVIDER 1: Standard OpenAI (For Embeddings)
const openai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY, // Standard OpenAI/Vercel Key
});

// PROVIDER 2: NVIDIA NIM (For Llama 3.3 70B Generation)
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
  console.log(`--- [ELITE SEARCH] Query: ${query} ---`);
  try {
    // 1. EMBEDDING (Using OpenAI Provider)
    const { embedding } = await embed({
      model: openai.embedding('text-embedding-3-small'),
      value: query,
    });

    // 2. QDRANT SEARCH
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
    const sources = [...new Set(qResult.map(r => r.payload?.metadata?.source || 'ELITE DOCUMENT'))];

    // 3. GENERATION (Using NVIDIA NIM Provider)
    const { text: answer } = await generateText({
        model: nvidia.chat(DEFAULT_CHAT_MODEL),
        system: "You are Aura, the MSAJCE Concierge. Answer ONLY using the provided context. If no info found, provide office contact: 044-27470025.",
        prompt: `Context:\n${context}\n\nQuestion: ${query}`
    });

    console.log(`✅ [ELITE SUCCESS] Score: ${bestScore.toFixed(3)}`);
    return { 
        context, 
        sources, 
        reliability: bestScore > RELIABILITY_THRESHOLD ? 'HIGH' : 'LOW', 
        score: bestScore, 
        answer 
    };

  } catch (err) {
    console.error("❌ ELITE ENGINE CRASH:", err.message);
    return { 
        context: '', 
        sources: [], 
        reliability: 'LOW', 
        score: 0, 
        answer: "Aura is currently refining her data. Please try again or call the office at 044-27470025." 
    };
  }
}
