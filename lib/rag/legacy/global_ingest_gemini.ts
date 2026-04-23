import dotenv from 'dotenv';
dotenv.config();

import { getQdrant, COLLECTION_NAME } from './qdrant'; // Using updated Qdrant helper
import fs from 'fs';
import path from 'path';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { embedMany } from 'ai';
import crypto from 'crypto';
import { logTelemetry } from './telemetry_logger';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY
});

const EMBED_MODEL = google.textEmbeddingModel('text-embedding-004');


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
  console.log("🚀🚀 STARTING GEMINI TASK (Head B)...");
  const client = getQdrant();
  const allFilesRaw = getAllFiles(BASE_DIR);
  
  // 🏁 TASK B ONLY PROCESSES THE SECOND HALF
  const allFiles = allFilesRaw.slice(Math.ceil(allFilesRaw.length / 2));
  
  console.log(`📡 TASK B: Processing ${allFiles.length} files (Second Half) with 5 Gemini Streams.`);
  
  const fileChunks = [];
  for (let i = 0; i < allFiles.length; i += Math.ceil(allFiles.length / CONCURRENCY)) {
      fileChunks.push(allFiles.slice(i, i + Math.ceil(allFiles.length / CONCURRENCY)));
  }

  await Promise.all(fileChunks.map(async (chunk, workerId) => {
      let localBucket: any[] = [];
      // 🧊 STAGGERED START (Prevent immediate throttle)
      await new Promise(r => setTimeout(r, workerId * 3000));
      
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
                      await blast(localBucket, client, workerId);
                      localBucket = [];
                      await new Promise(r => setTimeout(r, 1000));
                  }
              }
          } catch (e) {}
      }
      if (localBucket.length > 0) await blast(localBucket, client, workerId);
  }));
  console.log("🏁 TASK B: FINISHED SECOND HALF.");
}

async function blast(batch: any[], client: any, workerId: number) {
    try {
        console.log(`📡 [Gemini Worker ${workerId}] BLAST: Inhaling ${batch.length} facts...`);
        const { embeddings } = await embedMany({ model: EMBED_MODEL, values: batch.map(b => b.content) });
        const points = batch.map((b, i) => ({ id: b.id, vector: embeddings[i], payload: { content: b.content, source: b.source } }));
        await client.upsert(COLLECTION_NAME, { wait: true, points });

        // 📊 REPORT TELEMETRY
        logTelemetry('gemini', batch.length, batch.length * 300);
    } catch (err: any) {
        console.warn(`🛑 [Gemini ${workerId}] Throttled. Breathing...`);
        await new Promise(r => setTimeout(r, 10000));
    }
}

run();
