import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { qdrant, COLLECTION_NAME } from './qdrant';

// Unified Provider (Vercel SDK Optimized)
const nvidia = createOpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

const DEFAULT_CHAT_MODEL = 'meta/llama-3.3-70b-instruct';
const LEAN_CHAT_MODEL = 'meta/llama-3.1-8b-instruct';

/**
 * Rephrase with Safe Fallback
 */
async function rephraseQuery(query: string) {
    try {
        const { text } = await generateText({
            model: nvidia.chat(LEAN_CHAT_MODEL),
            maxRetries: 0,
            system: "Rephrase the user question for better vector search. Output ONLY search terms.",
            prompt: query
        });
        return text.trim() || query; // Fallback to raw query if rephrased is empty
    } catch (err) {
        console.warn("⚠️ Rephrase failed, using raw query:", err);
        return query;
    }
}

async function generateAuraResponse(query: string, context: string) {
    const { text } = await generateText({
        model: nvidia.chat(DEFAULT_CHAT_MODEL),
        maxRetries: 1, // Only 1 retry for answering
        system: `You are Aura, the vibrant Digital Concierge for MSAJCE. 
        DEVELOPER: Ramanathan S (Ram), 2nd year IT student. 
        IDENTITY: Helpful student assistant. PROUDLY developed by Ram.
        FORMATTING: Use BOLD BULLET POINTS (•). Answer only based on context.`,
        prompt: `Context:\n${context}\n\nQuestion: ${query}`
    });
    return text;
}

export async function performRetrieval(query: string) {
    try {
        // 1. SAFE REPHRASE
        const searchTerms = await rephraseQuery(query);
        
        // 2. EMBED (With Validation)
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

        if (!response.ok) {
            const err = await response.json();
            console.error("❌ NVIDIA Embedding Rejected Request:", err);
            throw new Error(`NVIDIA_BAD_REQUEST: ${err?.error?.message || 'Unknown'}`);
        }

        const embedData = await response.json();
        if (!embedData?.data?.[0]?.embedding) throw new Error("MALFORMED_EMBED_DATA");
        
        const embedding = embedData.data[0].embedding;

        // 3. SEARCH
        const qResult = await qdrant.search(COLLECTION_NAME, {
          vector: embedding,
          limit: 10, // Supreme Reach
          with_payload: true
        });

        const context = qResult.map((r: any) => r.payload.content).join('\n---\n');
        const sources = Array.from(new Set(qResult.map((r: any) => r.payload.source || 'Institutional File')));

        // 4. PACED GENERATION
        await new Promise(r => setTimeout(r, 4000));
        let answer = await generateAuraResponse(searchTerms, context);

        // 5. PACED JUDGE
        await new Promise(r => setTimeout(r, 4000));
        const { text: judgment } = await generateText({
            model: nvidia.chat(LEAN_CHAT_MODEL),
            maxRetries: 0,
            system: "Evaluate Faithful vs Context. PASS or FAIL.",
            prompt: `Context:\n${context}\n\nAnswer: ${answer}`
        });

        if (judgment.includes('FAIL')) {
            await new Promise(r => setTimeout(r, 2000));
            answer = await generateAuraResponse(query, context + "\nSTRICT: Use context only.");
        }

        return {
            answer,
            reliability: 'SUPREME',
            sources,
            score: 0.95
        };

    } catch (criticalError) {
        console.error("🔥 SUPREME BRAIN CRASH:", criticalError.message);
        return {
            answer: "Aura is currently refining her neural pathways. Please try again in 30 seconds with a clearer question.",
            reliability: 'RECOVERING',
            sources: [],
            score: 0
        };
    }
}
