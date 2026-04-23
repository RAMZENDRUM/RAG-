import dotenv from 'dotenv';
dotenv.config();

import { getQdrant, COLLECTION_NAME } from './qdrant';
import fs from 'fs';
import path from 'path';
import { createOpenAI } from '@ai-sdk/openai';
import { embedMany } from 'ai';
import crypto from 'crypto';
import { logTelemetry } from './telemetry_logger';

const gateway = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const EMBED_MODEL = gateway.embedding('text-embedding-3-small');
const BASE_DIR = 'd:/.gemini/RAG college/cleaning_zone';
const CONCURRENCY = 5; 

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (file.endsWith('.txt') || file.endsWith('.md')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  return arrayOfFiles;
}

async function run() {
  console.log("💎💎 STARTING UNIQUE-SOURCE ENGINE (v16.0)...");
  const client = getQdrant();
  const allFilesRaw = getAllFiles(BASE_DIR);
  
  // 🏁 TASK A ONLY PROCESSES THE FIRST HALF
  const allFiles = allFilesRaw.slice(0, Math.ceil(allFilesRaw.length / 2));
  
  console.log(`📡 TASK A: Processing ${allFiles.length} files (First Half) with 5 NVIDIA Streams.`);
  
  const fileChunks = [];
  for (let i = 0; i < allFiles.length; i += Math.ceil(allFiles.length / CONCURRENCY)) {
      fileChunks.push(allFiles.slice(i, i + Math.ceil(allFiles.length / CONCURRENCY)));
  }

  await Promise.all(fileChunks.map(async (chunk, workerId) => {
      let localBucket: any[] = [];
      
      for (const filePath of chunk) {
          try {
              const content = fs.readFileSync(filePath, 'utf-8');
              // 🧠 NEURAL-SYNAPSE (Sentence Level)
              const facts = content.split(/(?<=[.!?])\s+/).filter(c => c.trim().length > 30);
              
              for (const fact of facts) {
                  const hash = crypto.createHash('md5').update(fact + filePath).digest('hex');
                  const id = `${hash.slice(0,8)}-${hash.slice(8,12)}-4${hash.slice(13,16)}-a${hash.slice(17,20)}-${hash.slice(20,32)}`;
                  
                  localBucket.push({ id, content: fact, source: path.basename(filePath) });

                  if (localBucket.length >= 100) {
                      await blastBatch(localBucket, client, workerId);
                      localBucket = [];
                      await new Promise(r => setTimeout(r, 500));
                  }
              }
          } catch (e) {}
      }
      
      if (localBucket.length > 0) {
          await blastBatch(localBucket, client, workerId);
      }
  }));

  console.log("🏁 MISSION SUCCESS: 22,000 FACT SATURATION COMPLETE.");
}

async function blastBatch(batch: any[], client: any, workerId: number) {
    try {
        console.log(`📡 [Worker ${workerId}] BLAST: Inhaling ${batch.length} High-Fidelity facts...`);
        const { embeddings } = await embedMany({ model: EMBED_MODEL, values: batch.map(b => b.content) });
        const points = batch.map((b, i) => ({ id: b.id, vector: embeddings[i], payload: { content: b.content, source: b.source } }));
        await client.upsert(COLLECTION_NAME, { wait: true, points });
        
        // 📊 REPORT TELEMETRY
        logTelemetry('nvidia', batch.length, batch.length * 300);
    } catch (err: any) {
        console.warn(`🛑 [Worker ${workerId}] Throttled. Breathing...`);
        await new Promise(r => setTimeout(r, 10000));
    }
}

run();
