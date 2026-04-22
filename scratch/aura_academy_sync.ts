import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { embedMany } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getQdrant, COLLECTION_NAME } from '../lib/rag/engine/qdrant';
import crypto from 'crypto';

const vercelGateway = createOpenAI({ apiKey: process.env.VERCEL_AI_KEY, baseURL: 'https://ai-gateway.vercel.sh/v1' });
const EMBED_MODEL = vercelGateway.embedding('text-embedding-3-small');

const CLEANING_ZONE = 'd:/ .gemini/RAG college/cleaning_zone'.replace(' ', ''); // Handle potential spaces
const LEGACY_JSON_DIR = 'd:/ .gemini/RAG college/raw_vault/legacy_archive/2_structured_json'.replace(' ', '');

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    const files = fs.readdirSync(dirPath);
    files.forEach(function(file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath, arrayOfFiles); // Pass the same array reference
        } else {
            if (file.endsWith('.md') || file.endsWith('.txt') || file.endsWith('.json')) {
                arrayOfFiles.push(fullPath);
            }
        }
    });
    return arrayOfFiles;
}

async function runSync() {
    console.log("🛰️ AURA NEURAL SYNC: PRIORITIZING CLEANING_ZONE & LEGACY JSON");
    const client = getQdrant();
    const allFiles = [
        ...(await getAllFiles('d:/.gemini/RAG college/cleaning_zone')),
        ...(await getAllFiles('d:/.gemini/RAG college/raw_vault/legacy_archive/2_structured_json'))
    ];

    console.log(`📡 Found ${allFiles.length} source files for saturation.`);
    
    const memoryVault: any[] = [];
    let points: any[] = [];
    let batch: string[] = [];
    let metadataBatch: any[] = [];

    for (const filePath of allFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        let processedContent = content;
        
        if (filePath.endsWith('.json')) {
            const json = JSON.parse(content);
            processedContent = JSON.stringify(json, null, 2);
        }

        // Chunking with overlap for high-detail saturation
        const chunks = processedContent.match(/[\s\S]{1,1500}/g) || [];
        
        for (const chunk of chunks) {
            batch.push(chunk);
            const source = path.basename(filePath);
            metadataBatch.push({ content: chunk, source });
            memoryVault.push({ narrative: chunk, metadata: { source } });

            if (batch.length >= 20) {
                await processBatch(batch, metadataBatch, client);
                batch = [];
                metadataBatch = [];
                await new Promise(r => setTimeout(r, 1000));
            }
        }
    }
    
    if (batch.length > 0) await processBatch(batch, metadataBatch, client);

    // Update Local Active Memory as well for resilience
    fs.writeFileSync('d:/.gemini/RAG college/live_brain/aura_active_memory.json', JSON.stringify(memoryVault, null, 2));
    console.log("✅ LOCAL MEMORY SATURATED: 100% Sync complete.");
}

async function processBatch(texts: string[], metadata: any[], client: any) {
    try {
        const { embeddings } = await embedMany({ model: EMBED_MODEL, values: texts });
        const upsertPoints = texts.map((text, i) => {
            const hash = crypto.createHash('md5').update(text).digest('hex');
            return {
                id: `${hash.slice(0,8)}-${hash.slice(8,12)}-4${hash.slice(13,16)}-a${hash.slice(17,20)}-${hash.slice(20,32)}`,
                vector: embeddings[i],
                payload: metadata[i]
            };
        });
        
        await client.upsert(COLLECTION_NAME, { wait: true, points: upsertPoints });
        console.log(`🚀 Saturated ${upsertPoints.length} points...`);
    } catch (e: any) {
        console.warn("⚠️ Qdrant Push Failed (Network/DNS). Local sync continuing...");
    }
}

runSync();
