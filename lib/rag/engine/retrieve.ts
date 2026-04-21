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

export async function performRetrieval(query: string): Promise<RetrievalResult> {
  const lowerQuery = query.toLowerCase().trim();
  
  // 0. GREETING HANDLER (Social Layer)
  const greetings = ['hi', 'hello', 'hey', 'start', 'aura'];
  if (greetings.includes(lowerQuery) || lowerQuery.length < 3) {
    return {
      answer: "Hello! I am Aura, your MSAJCE Digital Concierge. I can help you with Admission details, Bus routes, and Placement records. What would you like to know today?",
      context: 'system_greeting',
      sources: ['Aura System'],
      reliability: 'HIGH',
      score: 1.0
    };
  }

  console.log(`--- [ELITE VERCEL SEARCH] Query: ${query} ---`);
  try {
    // 1. EMBEDDING (Using Vercel Gateway)
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
        return { context: '', sources: [], reliability: 'LOW', score: 0, answer: "No institutional records found." };
    }

    const context = qResult.map(r => r.payload?.content).join('\n---\n');
    const bestScore = qResult[0].score;
    const sources = [...new Set(qResult.map(r => r.payload?.metadata?.source || 'Institutional File'))];

    // 3. TELEGRAM-OPTIMIZED GENERATION (NVIDIA Llama 3.3 70B)
    const { text: answer } = await generateText({
        model: nvidia.chat(DEFAULT_CHAT_MODEL),
        system: `You are Aura, the vibrant Digital Concierge for MSAJCE. 
        
        FORMATTING RULES (IMPORTANT):
        1. Use **BOLD BULLET POINTS** for all details and lists (Seats, Features, Timings).
        2. Keep paragraphs very short (Maximum 2 lines per paragraph).
        3. Be conversational but **Concise**. No long stories.
        4. Use Telegram Markdown: **Bold** for emphasis.
        
        STYLE:
        - Instead of long paragraphs, use: 
          "The CSE department is excellent! Here are some key highlights:
          • **Intake**: 60 Seats available.
          • **Focus**: Innovative teaching & Tech-enabled business roles."
        - Always close with a friendly: "Would you like to know more about the faculty or curriculum?"`,
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
        answer: "I'm currently looking up those specific details for you! Why don't you try asking again in a moment, or reach out to our friendly office team at 044-27470025? I'm here to help!" 
    };
  }
}
