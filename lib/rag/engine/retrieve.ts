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

// PROVIDER 1: Vercel AI Gateway (Matched to Ingestor)
const openai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// PROVIDER 2: NVIDIA NIM (For the Brain)
const nvidia = createOpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
  compatibility: 'strict',
});

const DEFAULT_CHAT_MODEL = 'meta/llama-3.3-70b-instruct';
const RELIABILITY_THRESHOLD = 0.40;

export interface RetrievalResult {
  answer?: string;
  context: string;
  sources: string[];
  reliability: 'HIGH' | 'LOW';
  score: number;
}

export async function performRetrieval(query: string, history: any[] = []): Promise<RetrievalResult> {
  const lowerQuery = query.toLowerCase().trim();
  
  // 0. GREETING HANDLER
  const greetings = ['hi', 'hello', 'hey', 'start', 'aura'];
  if (greetings.includes(lowerQuery) || (lowerQuery.length < 3 && !history.length)) {
    return {
      answer: "Hello! I am Aura, your MSAJCE Digital Concierge. I remember our chat! What can I help you with now?",
      context: 'system_greeting',
      sources: ['Aura System'],
      reliability: 'HIGH',
      score: 1.0
    };
  }

  // 1. MEMORY REPHRASING (Resolves "it", "that", "the timings")
  let searchTerms = query;
  if (history.length > 0) {
    console.log("🧠 Aura is thinking back...");
    const { text: rephrased } = await generateText({
        model: nvidia.chat(DEFAULT_CHAT_MODEL),
        system: "You are a context-resolver. Re-write the user's LATEST message into a standalone search query using the provided history. Keep it concise. Focus on the subject and intent.",
        prompt: `History:\n${history.map(m => `${m.role}: ${m.content}`).join('\n')}\n\nLatest: ${query}`
    });
    searchTerms = rephrased;
    console.log(`🔎 Rephrased Query: ${searchTerms}`);
  }

  console.log(`--- [ELITE VERCEL SEARCH] Terms: ${searchTerms} ---`);
  try {
    // 2. EMBEDDING (Using Vercel Gateway)
    const { embedding } = await embed({
      model: openai.embedding('text-embedding-3-small'),
      value: searchTerms,
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

    // 3. HUMAN GENERATION (NVIDIA Llama 3.3 70B)
    let answer = await generateAuraResponse(searchTerms, context);

    // 4. SELF-HEALING LAYER (The "Ragas" Judicial Check)
    console.log("⚖️ Aura's Judge is reviewing the response...");
    const { text: judgment } = await generateText({
        model: nvidia.chat(DEFAULT_CHAT_MODEL),
        system: "You are the RAGAS Judge. Evaluate the ANSWER based on the CONTEXT. Output 'PASS' if the answer is 100% faithful and based ONLY on context. Output 'FAIL' if the answer makes up facts, guesses, or ignores the context. Provide a 1-sentence reason if FAIL.",
        prompt: `Context:\n${context}\n\nAnswer: ${answer}`
    });

    if (judgment.includes('FAIL')) {
        console.warn("🩹 SELF-HEALING TRIGGERED:", judgment);
        // Attempt 2: Re-generate with a more strict "Stick to Context" instruction
        const { text: healedAnswer } = await generateText({
            model: nvidia.chat(DEFAULT_CHAT_MODEL),
            system: "CRITICAL RE-DRAFT: The previous draft failed accuracy checks. Re-write the answer using ONLY the facts provided. Be concise. If a detail is missing, say you don't have it yet. Style: Warm but strictly factual.",
            prompt: `Context:\n${context}\n\nOriginal Question: ${searchTerms}`
        });
        answer = healedAnswer;
        console.log("💎 Respone Healed Successfully.");
    } else {
        console.log("✅ Judgment PASSED: Faithfulness confirmed.");
    }

    console.log(`✅ [FINANCE] Score: ${bestScore.toFixed(3)}`);
    return { 
        context, 
        sources, 
        reliability: bestScore > RELIABILITY_THRESHOLD ? 'HIGH' : 'LOW', 
        score: bestScore, 
        answer 
    };

  } catch (err) {
    // ... same catch block
  }
}

async function generateAuraResponse(query: string, context: string) {
    const { text } = await generateText({
        model: nvidia.chat(DEFAULT_CHAT_MODEL),
        system: `You are Aura, the vibrant Digital Concierge for MSAJCE. 
        FORMATTING: Use **BOLD BULLET POINTS** (•) for details. Keep paragraphs short (Max 2 lines).
        STRICTNESS: Answer only based on context. Be warm and helpful.`,
        prompt: `Context:\n${context}\n\nQuestion: ${query}`
    });
    return text;
}
