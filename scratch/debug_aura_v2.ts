import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { generateText, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { QdrantClient } from '@qdrant/js-client-rest';

// Providers - Using Direct OpenAI as fallback if vercel gateway is also failing
const vercelGateway = createOpenAI({ apiKey: process.env.VERCEL_AI_KEY, baseURL: 'https://ai-gateway.vercel.sh/v1' });

const CHAT_MODEL = vercelGateway('google/gemini-2.0-flash-lite');
const EMBED_MODEL = vercelGateway.embedding('text-embedding-3-small');

// Using keys from the 'keys' file
const qClient = new QdrantClient({
    url: "https://15eba229-ab7e-4c32-8d1c-9cd616e19403.eu-central-1-0.aws.cloud.qdrant.io:6333",
    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIiwic3ViamVjdCI6ImFwaS1rZXk6OTkzOTg3YzAtZTIwMC00MTZlLTg2MDUtYmM2YWY2NzhhZWVkIn0.Gs_hSY-BUbFgb5sTjNPv3T2iaB4dXSP7cFvSJIVxnFk",
});

async function debugRetrieval(query: string) {
    console.log(`\nDEBUG: Querying "${query}"...`);
    try {
        console.log("DEBUG: Creating embedding...");
        const { embedding } = await embed({ model: EMBED_MODEL, value: query });
        console.log("DEBUG: Embedding created.");

        console.log("DEBUG: Searching Qdrant...");
        const qResult = await qClient.search('msajce_institutional_knowledge', {
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
        console.log("Response:", text);
    } catch (error: any) {
        console.error("DEBUG ERROR:", error.message);
    }
}

debugRetrieval("What are the hostel fees?");
