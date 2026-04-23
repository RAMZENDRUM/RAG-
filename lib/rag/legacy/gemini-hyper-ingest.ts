import dotenv from 'dotenv';
dotenv.config();

import { getQdrant, COLLECTION_NAME } from './qdrant';
import fs from 'fs';
import path from 'path';
import { createOpenAI } from '@ai-sdk/openai';
import { embedMany } from 'ai';
import crypto from 'crypto';

const gateway = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const EMBED_MODEL = gateway.embedding('text-embedding-3-small'); // 🎯 PURE 1536-D

const BASE_DIR = 'd:/.gemini/RAG college/cleaning_zone';
const PRIORITY_FOLDERS = [
  'priority_high',
  'academic_core',
  'subject_mastery',
  'institutional_life'
];

async function finalIngest() {
  console.log("🚀📦 IGNITING THE BATCH-BLAST ENGINE (v9.0)...");
  const client = getQdrant();
  let globalChunkBucket: { id: string, content: string, source: string }[] = [];

  for (const folder of PRIORITY_FOLDERS) {
    const targetDir = path.join(BASE_DIR, folder);
    if (!fs.existsSync(targetDir)) continue;

    const allFiles = fs.readdirSync(targetDir).filter(f => f.endsWith('.txt') || f.endsWith('.md'));
    
    for (const file of allFiles) {
        const content = fs.readFileSync(path.join(targetDir, file), 'utf-8');
        const chunks = content.split('\n---\n').filter(c => c.trim().length > 30);
        
        for (const chunk of chunks) {
            const hash = crypto.createHash('md5').update(chunk).digest('hex');
            const id = `${hash.slice(0,8)}-${hash.slice(8,12)}-4${hash.slice(13,16)}-a${hash.slice(17,20)}-${hash.slice(20,32)}`;
            globalChunkBucket.push({ id, content: chunk, source: file });

            // 🚀 ONCE BUCKET HITS 100, BLAST!
            if (globalChunkBucket.length >= 100) {
                await blastBatch(globalChunkBucket, client);
                globalChunkBucket = []; // Reset bucket
                await new Promise(r => setTimeout(r, 1200)); // Safety Pause
            }
        }
    }
  }

  // Final dregs
  if (globalChunkBucket.length > 0) {
    await blastBatch(globalChunkBucket, client);
  }

  console.log("🏆 MISSION COMPLETE. AURA IS 100% SATURATED.");
}

async function blastBatch(batch: any[], client: any) {
    try {
        console.log(`📡 BLASTING BATCH: ${batch.length} facts into the 1536-D vault...`);
        
        const { embeddings } = await embedMany({
            model: EMBED_MODEL,
            values: batch.map(b => b.content),
        });

        const points = batch.map((b, i) => ({
            id: b.id,
            vector: embeddings[i],
            payload: { content: b.content, source: b.source }
        }));

        await client.upsert(COLLECTION_NAME, {
            wait: true,
            points: points
        });
    } catch (err: any) {
        console.warn(`🛑 Throttled. Breathing (10s)...`);
        await new Promise(r => setTimeout(r, 10000));
    }
}

finalIngest();
