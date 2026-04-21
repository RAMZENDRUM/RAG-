import dotenv from 'dotenv';
dotenv.config();

import { getQdrant, COLLECTION_NAME } from './qdrant';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { embedMany } from 'ai';
import crypto from 'crypto';
import fs from 'fs';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY
});

const EMBED_MODEL = google.textEmbeddingModel('text-embedding-004');

async function injectVault() {
    console.log("🚀 Accessing Raw Vault: Admissions...");
    const rawContent = fs.readFileSync('d:\\.gemini\\RAG college\\raw_vault\\web_scrapes\\admission.txt', 'utf-8');
    
    // Sentence-level Split for Maximum Density
    const facts = rawContent.split(/[.!?]\s+/).filter(f => f.trim().length > 30);
    
    console.log(`📡 Extracted ${facts.length} Atomic Facts from Vault.`);

    const client = getQdrant();
    
    // Batch processing to avoid rate limits
    const batchSize = 50;
    for (let i = 0; i < facts.length; i += batchSize) {
        const batch = facts.slice(i, i + batchSize);
        const { embeddings } = await embedMany({ model: EMBED_MODEL, values: batch });
        
        const points = batch.map((content, j) => {
            const hash = crypto.createHash('md5').update(content).digest('hex');
            const id = `${hash.slice(0,8)}-${hash.slice(8,12)}-4${hash.slice(13,16)}-a${hash.slice(17,20)}-${hash.slice(20,32)}`;
            return { id, vector: embeddings[j], payload: { content, source: "raw_vault_admission_recovery" } };
        });

        await client.upsert(COLLECTION_NAME, { wait: true, points });
        console.log(`🟢 Ingested Fact Batch: ${i + batch.length}/${facts.length}`);
    }

    console.log("🏁 Vault Recovery Complete. Aura is now 100% Saturated.");
}

injectVault();
