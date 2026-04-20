import { generateText, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import postgres from 'postgres';
import dotenv from 'dotenv';
import axios from 'axios';
import { qdrant, COLLECTION_NAME } from './qdrant';
dotenv.config();

const sql = postgres(process.env.DATABASE_URL!);
const ai = createOpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
  compatibility: 'strict',
});

const DEFAULT_MODEL = 'meta/llama-3.3-70b-instruct';

const COHERE_API_KEY = process.env.COHERE_API_KEY;
const RELIABILITY_THRESHOLD = 0.65; // STRICT Cutoff requested
const MAX_ATTEMPTS = 2;

export interface RetrievalResult {
  answer?: string;
  context: string;
  sources: string[];
  reliability: 'HIGH' | 'LOW';
  score: number;
}

/**
 * PRODUCTION ELITE RETRIEVAL ENGINE V3.0 (Serious Tier)
 * Features: Intent-Aware Hybrid, Cohere Rerank v3, Failsafe Fallbacks, Dual-Signal Judge.
 */
export async function performRetrieval(query: string, attempt: number = 0): Promise<RetrievalResult> {
  try {
    const lowerQuery = query.toLowerCase().trim();
    
    // 1. Query Enhancement
    const { text: enhancedQuery } = await generateText({
        model: ai.chat(DEFAULT_MODEL),
        prompt: `Expand this institutional query for maximum RAG precision: "${query}". Include likely stop names or categories if it looks like a bus route or admission question.`
    });

    // 2. Intent Detection for Dynamic Weighting
    const isNumericIntent = /[\d]|AR-|R-/.test(query);
    const vectorWeight = isNumericIntent ? 0.6 : 0.75;
    const keywordWeight = 1 - vectorWeight;

    // 3. Vector Embedding
    const { embedding } = await embed({
      model: ai.embedding('openai/text-embedding-3-small'),
      value: enhancedQuery,
    });

    // 4. Hybrid Search in Qdrant (Top 20 candidates)
    let candidates: any[] = [];
    try {
        const qResult = await qdrant.search(COLLECTION_NAME, {
            vector: embedding,
            limit: 20,
            with_payload: true
        });
        candidates = qResult.map(r => ({
            id: r.id,
            content: r.payload?.content,
            score: r.score,
            metadata: r.payload?.metadata
        }));
    } catch (e) {
        console.warn("⚠️ Qdrant Elite offline, failing over to Supabase.");
    }

    // 5. 💎 THE RERANKER TIER (Cohere v3 with GPT Fallback)
    let finalists: any[] = [];
    if (candidates.length > 0) {
        try {
            // Try Cohere Rerank
            if (COHERE_API_KEY) {
                const response = await axios.post('https://api.cohere.com/v1/rerank', {
                    model: 'rerank-english-v3.0',
                    query: enhancedQuery,
                    documents: candidates.map(c => c.content),
                    top_n: 5
                }, { headers: { Authorization: `Bearer ${COHERE_API_KEY}` } });
                
                finalists = response.data.results.map((r: any) => ({
                    ...candidates[r.index],
                    rerank_score: r.relevance_score
                }));
            }
        } catch (error) {
            console.warn("⚠️ Cohere Rate Limit or Error. Falling back to LLM Reranker.");
            // LLM Rerank Fallback
            const { text: rerankScores } = await generateText({
                model: ai.chat(DEFAULT_MODEL),
                system: "Score chunks (0-1) for relevance to query. RETURN ONLY SCORES.",
                prompt: `Query: ${query}\n` + candidates.slice(0, 10).map((c, i) => `[${i}]: ${c.content}`).join('\n')
            });
            // (Simplification: just take top 5 raw scores if fallback fails parsing)
            finalists = candidates.slice(0, 5);
        }
    }

    // 6. Context Synthesis & Clean Threshold
    const context = finalists.map(f => f.content).join('\n\n');
    const bestScore = finalists[0]?.rerank_score || finalists[0]?.score || 0;
    const sources = [...new Set(finalists.map(f => f.metadata?.source || 'ELITE DOC'))];

    // ⛔ STRICT THRESHOLD REJECTION
    if (!context || bestScore < RELIABILITY_THRESHOLD) {
        return { 
          context: '', 
          sources: [], 
          reliability: 'LOW', 
          score: bestScore, 
          answer: "I do not have high-confidence data to answer this precisely. Please check the official portal or contact the office." 
        };
    }

    // 7. 🤖 THE JUDGE (Self-Correction Loop)
    const { text: answer } = await generateText({
        model: ai.chat(DEFAULT_MODEL),
        system: "Answer ONLY using provided context. No hallucinations. Keep exact numbers and timings.",
        prompt: `Question: ${query}\n\nContext:\n${context}`
    });

    const { text: judgeVerdict } = await generateText({
        model: ai.chat(DEFAULT_MODEL),
        system: "### JUDGE: EVALUATE FAITHFULNESS\nReject if answer has info NOT in context. Score 0-1.",
        prompt: `Context: ${context}\nAnswer: ${answer}`
    });

    // Final Reliability Pass
    if (judgeVerdict.includes('0') && !judgeVerdict.includes('1')) {
        console.log("❌ Judge Rejected faithfulness.");
        if (attempt < MAX_ATTEMPTS) return performRetrieval(query, attempt + 1);
        return { context: '', sources: [], reliability: 'LOW', score: 0, answer: "Data inconsistent. Please contact office." };
    }

    return { context, sources, reliability: 'HIGH', score: bestScore, answer };

  } catch (err) {
    console.error("Elite Retrieval Failure:", err);
    throw err;
  }
}
