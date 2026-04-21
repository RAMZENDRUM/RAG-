import dotenv from 'dotenv';
dotenv.config();

import { getQdrant, COLLECTION_NAME } from './qdrant';
import fs from 'fs';
import path from 'path';
import { createOpenAI } from '@ai-sdk/openai';
import { embed } from 'ai';
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

async function bulkIngest() {
  console.log("🚀 STARTING PACED GATEWAY INGESTION (Free-Tier Standard)...");
  const client = getQdrant();
  
  for (const folder of PRIORITY_FOLDERS) {
    const targetDir = path.join(BASE_DIR, folder);
    if (!fs.existsSync(targetDir)) continue;

    const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.txt') || f.endsWith('.md'));

    for (const file of files) {
      const content = fs.readFileSync(path.join(targetDir, file), 'utf-8');
      const chunks = content.split('\n---\n').filter(c => c.trim().length > 30);
      
      console.log(`📦 Processing [${file}]...`);

      for (let i = 0; i < chunks.length; i++) {
        let attempts = 0;
        let success = false;

        while (attempts < 5 && !success) {
          try {
            const { embedding } = await embed({
              model: EMBED_MODEL,
              value: chunks[i],
            });

            await client.upsert(COLLECTION_NAME, {
              wait: true,
              points: [{
                id: crypto.randomUUID(),
                vector: embedding,
                payload: { content: chunks[i], source: file }
              }]
            });
            success = true;
          } catch (err: any) {
            attempts++;
            const isRateLimit = err.message.toLowerCase().includes('rate');
            const waitTime = isRateLimit ? 25000 : 5000; // Wait 25s if rate limited
            console.warn(`⏳ Rate limited on [${file}]. Deep breathing for ${waitTime/1000}s...`);
            await new Promise(r => setTimeout(r, waitTime));
          }
        }
      }
      console.log(`✅ Success: ${file}`);
    }
  }
}

bulkIngest();
