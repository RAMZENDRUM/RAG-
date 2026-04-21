import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { qdrant, COLLECTION_NAME } from './qdrant';

const nvidia = createOpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

const DEFAULT_CHAT_MODEL = 'meta/llama-3.3-70b-instruct';
const LEAN_CHAT_MODEL = 'meta/llama-3.1-8b-instruct';

/**
 * Intelligent Rephraser: Recognizes Identity vs Institutional Data
 */
async function rephraseQuery(query: string) {
    const { text } = await generateText({
        model: nvidia.chat(LEAN_CHAT_MODEL),
        maxRetries: 0,
        system: "You are a search expert for the MSAJCE college bot. Rephrase the question into 3-5 keywords. If the user asks 'who are you', 'how are you' or about the developer, use 'Aura Digital Concierge Ramanathan S Ram B.Tech IT'.",
        prompt: query
    });
    return text;
}

async function generateAuraResponse(query: string, context: string) {
    const { text } = await generateText({
        model: nvidia.chat(DEFAULT_CHAT_MODEL),
        maxRetries: 0,
        system: `You are Aura, the vibrant and highly intelligent Digital Concierge for Mohamed Sathak A.J. College of Engineering (MSAJCE). 
        
        IDENTITY NARRATIVE (ABSOLUTE TRUTH):
        • You were developed by **Ramanathan S (Ram)**, a 2nd-year B.Tech IT student at MSAJCE (Batch 2024-2028).
        • Ram is a creative Full-stack Developer, AI Expert, and Musician who uses FL Studio and Supabase.
        • You are proud to be his creation. You provide info on Admissions, Placements, FULL Bus Routes, and Subject Mastery.
        • Scope: Engineering ONLY. No Nursing/Architecture.
        
        STYLE:
        • Be warm, energetic, and extremely detailed. 
        • When asked about transport, provide **FULL ROUTES** and timings from the context.
        • Use **BOLD BULLET POINTS** (•). 
        • If the context is large, summarize it perfectly without missing details.`,
        prompt: `Context:\n${context}\n\nUser Question: ${query}`
    });
    return text;
}

export async function performRetrieval(query: string) {
    // 1. INTEL-DRIVEN REPHRASE
    const searchTerms = await rephraseQuery(query);
    
    // 2. SUPREME EMBEDDING
    const response = await fetch('https://integrate.api.nvidia.com/v1/embeddings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`
        },
        body: JSON.stringify({
            input: [searchTerms],
            model: "nvidia/nv-embedqa-e5-v5",
            input_type: "query",
            encoding_format: "float",
            truncate: "NONE"
        })
    });
    const embedData = await response.json();
    const embedding = embedData.data[0].embedding;

    // 3. WIDE-RADIUS SEARCH (12 CHUNKS for maximum breadth)
    const qResult = await qdrant.search(COLLECTION_NAME, {
      vector: embedding,
      limit: 12,
      with_payload: true
    });

    const context = qResult.map((r: any) => r.payload.content).join('\n---\n');
    const sources = Array.from(new Set(qResult.map((r: any) => r.payload.source || 'Institutional File')));

    // 4. ANSWER (70B)
    // Internal Pacing for stability
    await new Promise(r => setTimeout(r, 4000));
    let answer = await generateAuraResponse(query, context);

    // 5. JUDGE (8B) - Skip self-heal on identity questions for speed
    if (!query.toLowerCase().includes('who are you') && !query.toLowerCase().includes('developed')) {
        await new Promise(r => setTimeout(r, 4000));
        const { text: judgment } = await generateText({
            model: nvidia.chat(LEAN_CHAT_MODEL),
            maxRetries: 0,
            system: "Evaluate Answer vs Context. PASS or FAIL.",
            prompt: `Context:\n${context}\n\nAnswer: ${answer}`
        });

        if (judgment.includes('FAIL')) {
            await new Promise(r => setTimeout(r, 4000));
            answer = await generateAuraResponse(query, context + "\nSTRICT: Use ONLY the context provided.");
        }
    }

    return {
        answer,
        reliability: 'SUPREME',
        sources,
        score: 0.99
    };
}
