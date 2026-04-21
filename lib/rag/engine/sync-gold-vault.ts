import { QdrantClient } from '@qdrant/js-client-rest';
import { embedMany } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import * as fs from 'fs-extra';
import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

const ai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const COLLECTION_NAME = 'msajce_knowledge';
const MASTER_FILE = 'd:/.gemini/RAG college/production_data/normalized_json/elite_knowledge_base.json';

async function syncProductionVault() {
  console.log("🚀 Starting Final Brain Sync to Qdrant Cloud...");
  
  if (!await fs.pathExists(MASTER_FILE)) {
    console.error("❌ Master Knowledge file not found!");
    return;
  }

  const eliteUnits = await fs.readJson(MASTER_FILE);
  console.log(`📡 Loaded ${eliteUnits.length} Elite Units from local vault.`);

  // 1. EMBED EVERYTHING (Using the exact same model Aura uses for searching)
  const { embeddings } = await embedMany({
    model: ai.embedding('openai/text-embedding-3-small'),
    values: eliteUnits.map((u: any) => u.narrative)
  });

  // 2. UPSERT TO QDRANT
  const points = eliteUnits.map((unit: any, i: number) => ({
    id: i + 1000, // Safe offset to avoid overwriting old PDF data
    vector: embeddings[i],
    payload: {
      content: unit.narrative,
      metadata: unit.metadata,
      synced_at: new Date().toISOString()
    }
  }));

  // Batch upload (100 at a time)
  for (let i = 0; i < points.length; i += 100) {
    const batch = points.slice(i, i + 100);
    await qdrant.upsert(COLLECTION_NAME, {
      wait: true,
      points: batch
    });
    console.log(`✅ Uploaded batch ${Math.floor(i/100) + 1}...`);
  }

  console.log(`\n🏆 SYNC COMPLETE! Aura now knows everything in your PRODUCTION_DATA folder.`);
}

syncProductionVault().catch(console.error);
