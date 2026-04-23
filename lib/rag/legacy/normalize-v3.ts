import { generateText, embedMany } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { qdrant, COLLECTION_NAME, initQdrant } from './qdrant';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const ai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const DATA_FILE = path.join(process.cwd(), 'extracted_data', '4_unified_output', 'aura_knowledge_v2.json');

async function runEliteNormalization() {
  console.log("🔥 Starting Elite Normalization Pipeline (Production-Grade)...");
  await initQdrant();

  if (!fs.existsSync(DATA_FILE)) {
    console.error("❌ Source knowledge base not found.");
    return;
  }

  const chunks = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  console.log(`📦 Loaded ${chunks.length} chunks. Normalizing to high-fidelity sentences...`);

  const batchSize = 25;
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    console.log(`📡 Processing Production Batch ${Math.floor(i / batchSize) + 1} / ${Math.ceil(chunks.length / batchSize)}...`);

    // 1. Semantic Normalization (Harmonizing Data)
    const normalizedBatch = await Promise.all(batch.map(async (chunk : any) => {
      // Use LLM to turn raw structured data into a perfect RAG sentence
      const { text: semanticContent } = await generateText({
        model: ai.chat('openai/gpt-4.1-nano'),
        system: "Transform institutional data into exact, professional, and searchable sentences. NEVER change numbers, timings, or names. If it is already a sentence, polish it. Keep it under 600 characters.",
        prompt: `Normalize this data for an official college concierge:\n\n${chunk.content}`,
      });

      return {
        ...chunk,
        normalized_content: semanticContent
      };
    }));

    // 2. Elite Embedding
    const { embeddings } = await embedMany({
      model: ai.embedding('openai/text-embedding-3-small'),
      values: normalizedBatch.map(n => n.normalized_content),
    });

    // 3. Qdrant Upsert
    const points = normalizedBatch.map((n, j) => ({
      id: crypto.randomUUID(), // Or generate a stable seed
      vector: embeddings[j],
      payload: {
        content: n.normalized_content,
        raw_source: n.content,
        metadata: n.metadata,
        category: n.metadata.source_file.includes('transport') ? 'transport' : 
                  n.metadata.source_file.includes('Placement') ? 'placement' : 'general',
        importance: 'high'
      }
    }));

    await qdrant.upsert(COLLECTION_NAME, {
      wait: true,
      points
    });

    console.log(`✅ Batch ${Math.floor(i / batchSize) + 1} synced to Qdrant.`);
    
    // Safety delay to respect AI Gateway limits during total overhaul
    await new Promise(r => setTimeout(r, 5000));
  }

  console.log("🚀 Elite Knowledge System is indexed in Qdrant Cloud.");
  process.exit(0);
}

runEliteNormalization();
