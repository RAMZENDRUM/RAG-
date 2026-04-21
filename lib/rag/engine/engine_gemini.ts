import dotenv from 'dotenv';
dotenv.config();

import { getQdrant, COLLECTION_NAME } from './qdrant';
import fs from 'fs';
import path from 'path';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { embedMany } from 'ai';
import crypto from 'crypto';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY
});

const EMBED_MODEL = google.textEmbeddingModel('text-embedding-004', {
    outputDimensionality: 1536
});

const BASE_DIR = 'd:/.gemini/RAG college/cleaning_zone';
const TARGET_FOLDERS = ['subject_mastery', 'institutional_life'];

// 🏁 RECURSIVE FILE HUNTER
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.txt') || file.endsWith('.md')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

async function run() {
  console.log("🚀🚀 STARTING ENGINE B (Deep-Dive Gemini)...");
  const client = getQdrant();
  let bucket: { id: string, content: string, source: string }[] = [];

  for (const folder of TARGET_FOLDERS) {
    const parentDir = path.join(BASE_DIR, folder);
    if (!fs.existsSync(parentDir)) continue;

    const allFiles = getAllFiles(parentDir);
    console.log(`📡 Engine B found ${allFiles.length} files in [${folder}] tree.`);
    
    for (const filePath of allFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const chunks = content.split('\n---\n').filter(c => c.trim().length > 30);
        
        for (const chunk of chunks) {
            const hash = crypto.createHash('md5').update(chunk).digest('hex');
            const id = `${hash.slice(0,8)}-${hash.slice(8,12)}-4${hash.slice(13,16)}-a${hash.slice(17,20)}-${hash.slice(20,32)}`;
            bucket.push({ id, content: chunk, source: path.basename(filePath) });

            if (bucket.length >= 100) {
                await blast(bucket, client);
                bucket = [];
                await new Promise(r => setTimeout(r, 1000));
            }
        }
    }
  }
  if (bucket.length > 0) await blast(bucket, client);
  console.log("🏁 ENGINE B: FINISHED ALL SUB-FOLDERS.");
}

async function blast(batch: any[], client: any) {
    try {
        console.log(`📡 ENGINE B: Inhaling ${batch.length} facts (1536-D)...`);
        const { embeddings } = await embedMany({ model: EMBED_MODEL, values: batch.map(b => b.content) });
        const points = batch.map((b, i) => ({ id: b.id, vector: embeddings[i], payload: { content: b.content, source: b.source } }));
        await client.upsert(COLLECTION_NAME, { wait: true, points });
    } catch (err: any) {
        console.warn("🛑 Engine B Throttled. Waiting 10s...");
        await new Promise(r => setTimeout(r, 10000));
    }
}

run();
