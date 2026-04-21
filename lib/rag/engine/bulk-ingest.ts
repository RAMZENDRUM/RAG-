import { qdrant, COLLECTION_NAME } from './qdrant';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createOpenAI } from '@ai-sdk/openai';
import { embedMany } from 'ai';
import crypto from 'crypto';

dotenv.config();

const BASE_DIR = 'd:/.gemini/RAG college/cleaning_zone';
const PRIORITY_FOLDERS = [
  'priority_high',
  'academic_core',
  'subject_mastery',
  'institutional_life'
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const nvidiaProvider = createOpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
  compatibility: 'strict',
});

function chunkContent(text: string, size: number = 1000): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

async function bulkIngest() {
  console.log("🚀 STARTING STRATEGIC INGESTION: PRIORITY SEQUENCE...");
  
  for (const folder of PRIORITY_FOLDERS) {
    const targetDir = path.join(BASE_DIR, folder);
    if (!fs.existsSync(targetDir)) continue;

    console.log(`\n📂 INGESTING LAYER: [${folder.toUpperCase()}]`);
    const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.txt') || f.endsWith('.md'));
    console.log(`📡 Found ${files.length} documents in this layer.`);

    for (const file of files) {
      const content = fs.readFileSync(path.join(targetDir, file), 'utf-8');
      const chunks = chunkContent(content, 200); // Ultra-safe NVIDIA limit (200 words approx 320 tokens)
      
      console.log(`📦 Processing [${file}] (${chunks.length} chunks)...`);

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i].trim();
        if (!chunk) continue; // Skip empty fragments
        
        try {
          const response = await fetch('https://integrate.api.nvidia.com/v1/embeddings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`
            },
            body: JSON.stringify({
              input: [chunk],
              model: "nvidia/nv-embedqa-e5-v5",
              input_type: "passage",
              encoding_format: "float"
            })
          });

          if (!response.ok) {
              const errData = await response.json();
              console.error(`❌ NVIDIA API Error for ${file} [Chunk ${i}]:`, JSON.stringify(errData));
              continue;
          }

          const { data } = await response.json();
          const embedding = data[0].embedding;

          await qdrant.upsert(COLLECTION_NAME, {
            wait: true,
            points: [{
              id: crypto.randomUUID(),
              vector: embedding,
              payload: {
                content: chunk,
                metadata: {
                  source_file: file,
                  source_layer: folder,
                  chunk_index: i
                }
              }
            }],
          });
        } catch (err: any) {
          console.error(`❌ Failed ${file} [Chunk ${i}]: ${err.message}`);
        }
      }
      // Small breathe after each file
      await sleep(500);
    }
  }

  console.log("\n🎉 MISSION COMPLETE: Aura is now a Strategic Subject Matter Expert!");
}

bulkIngest();
