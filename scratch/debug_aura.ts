import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { generateText, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getQdrant, COLLECTION_NAME } from '../lib/rag/engine/qdrant';

// Providers
const nvidiaInternal = createOpenAI({ apiKey: process.env.NVIDIA_API_KEY, baseURL: 'https://integrate.api.nvidia.com/v1' });
const vercelGateway = createOpenAI({ apiKey: process.env.VERCEL_AI_KEY, baseURL: 'https://ai-gateway.vercel.sh/v1' });

const CHAT_MODEL = vercelGateway('google/gemini-2.0-flash-lite');
const EMBED_MODEL = vercelGateway.embedding('text-embedding-3-small');

async function debugRetrieval(query: string) {
    console.log(`\nDEBUG: Querying "${query}"...`);
    try {
        console.log("DEBUG: Creating embedding...");
        const { embedding } = await embed({ model: EMBED_MODEL, value: query });
        console.log("DEBUG: Embedding created. Size:", embedding.length);

        console.log("DEBUG: Searching Qdrant...");
        const qResult = await getQdrant().search(COLLECTION_NAME, {
            vector: embedding,
            limit: 5,
            with_payload: true
        });
        console.log("DEBUG: Qdrant results:", qResult.length);

        const context = qResult.map((r: any) => r.payload.content).join('\n---\n');
        
        console.log("DEBUG: Generating response...");
        const { text } = await generateText({
            model: CHAT_MODEL,
            prompt: `Context:\n${context}\n\nQuestion: ${query}`
        });
        console.log("DEBUG: Response generated.");
        return text;
    } catch (error: any) {
        console.error("DEBUG ERROR:", error);
        if (error.response) {
            console.error("DEBUG ERROR RESPONSE:", error.response.data);
        }
    }
}

debugRetrieval("What are the hostel fees?");
