import postgres from 'postgres';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { createOpenAI } from '@ai-sdk/openai';
import { embedMany } from 'ai';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL!);

const hub = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const DATA_FILE = path.join(process.cwd(), 'extracted_data', '4_unified_output', 'aura_knowledge_v2.json');

async function restore() {
  console.log("🛠️ Restoring Core Institutional Knowledge...");

  const allChunks = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  
  // Sort by priority (Core -> Syllabus -> Others)
  const sortedChunks = allChunks.sort((a, b) => {
    const priority = (chunk) => {
       const file = chunk.metadata.source_file.toLowerCase();
       if (chunk.metadata.source_layer === 'core') return 0;
       if (file.includes('syllabus') || file.includes('ar')) return 1;
       return 2;
    };
    return priority(a) - priority(b);
  });

  const coreChunks = sortedChunks.slice(0, 600); // 10 batches of high-priority info
  console.log(`📡 Ingesting ${coreChunks.length} core chunks...`);

  const batchSize = 60;
  for (let i = 0; i < coreChunks.length; i += batchSize) {
    const batch = coreChunks.slice(i, i + batchSize);
    console.log(`Batch ${Math.floor(i / batchSize) + 1} / 10...`);

    const { embeddings } = await embedMany({
      model: hub.embedding('openai/text-embedding-3-small'),
      values: batch.map(c => c.content),
    });

    const rows = batch.map((chunk, j) => ({
      content: chunk.content,
      embedding: `[${embeddings[j].join(',')}]`,
      metadata: { ...chunk.metadata, source_url: chunk.metadata.source_refs?.[0] }
    }));

    await sql`INSERT INTO documents ${sql(rows, 'content', 'embedding', 'metadata')}`;
    await new Promise(r => setTimeout(r, 10000));
  }

  console.log("✅ Core Restoration Complete. Bot should be functional.");
  process.exit(0);
}

restore();
