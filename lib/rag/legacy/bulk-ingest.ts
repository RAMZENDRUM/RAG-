import dotenv from 'dotenv';
dotenv.config();

import { getQdrant, COLLECTION_NAME } from './qdrant';
import fs from 'fs';
import path from 'path';
import { createOpenAI } from '@ai-sdk/openai';
import { embedMany } from 'ai';
import crypto from 'crypto';

const BASE_DIR = 'd:/.gemini/RAG college/cleaning_zone';
const PRIORITY_FOLDERS = [
  'priority_high',
  'academic_core',
  'subject_mastery',
  'institutional_life'
];

const vercelGateway = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const EMBED_MODEL = vercelGateway.embedding('text-embedding-3-small');

// AGGRESSIVE-SENTRY CONCURRENCY (Fast & Relentless)
const CONCURRENCY_LIMIT = 3;

async function ingestFile(file: string, targetDir: string, client: any) {
  try {
    const content = fs.readFileSync(path.join(targetDir, file), 'utf-8');
    const chunks = content.split('\n---\n').filter(c => c.trim().length > 30);
    
    if (chunks.length === 0) return true;

    const pointsWithIds = chunks.map(chunk => {
        const hash = crypto.createHash('md5').update(chunk).digest('hex');
        const id = `${hash.slice(0,8)}-${hash.slice(8,12)}-4${hash.slice(13,16)}-a${hash.slice(17,20)}-${hash.slice(20,32)}`;
        return { id, content: chunk };
    });

    console.log(`🏎️🔥 Aggressive: [${file}] (${chunks.length} facts)`);

    const { embeddings } = await embedMany({
        model: EMBED_MODEL,
        values: chunks,
    });

    const points = pointsWithIds.map((p, i) => ({
      id: p.id,
      vector: embeddings[i],
      payload: { content: p.content, source: file }
    }));

    await client.upsert(COLLECTION_NAME, {
      wait: true,
      points: points
    });

    return true;
  } catch (err: any) {
    console.warn(`🛑 Throttled. Quick breath (2s)...`);
    await new Promise(r => setTimeout(r, 2000));
    return false;
  }
}

async function bulkIngest() {
  console.log("🏎️🔥🦅 IGNITING AGGRESSIVE SENTRY (MAX VELOCITY)...");
  const client = getQdrant();
  
  for (const folder of PRIORITY_FOLDERS) {
    const targetDir = path.join(BASE_DIR, folder);
    if (!fs.existsSync(targetDir)) continue;

    const allFiles = fs.readdirSync(targetDir).filter(f => f.endsWith('.txt') || f.endsWith('.md'));
    
    for (let i = 0; i < allFiles.length; i += CONCURRENCY_LIMIT) {
      const batch = allFiles.slice(i, i + CONCURRENCY_LIMIT);
      await Promise.all(batch.map(file => ingestFile(file, targetDir, client)));
      // ULTRA-SHORT PAUSE
      await new Promise(r => setTimeout(r, 500));
    }
  }
}

bulkIngest();
