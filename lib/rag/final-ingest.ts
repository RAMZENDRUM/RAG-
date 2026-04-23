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

async function finalIngest() {
  console.log("🚀 Syncing Production-Reliable Knowledge Graph...");

  await sql`CREATE EXTENSION IF NOT EXISTS vector`;
  
  await sql`
    CREATE TABLE IF NOT EXISTS aura_rag_documents (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      content text NOT NULL,
      embedding vector(1536),
      metadata jsonb NOT NULL,
      fts_vector tsvector GENERATED ALWAYS AS (to_tsvector('english', content)) STORED,
      created_at timestamp with time zone DEFAULT now()
    )
  `;

  await sql`
    CREATE OR REPLACE FUNCTION aura_hybrid_search (
      query_embedding vector(1536),
      query_text text,
      match_threshold float,
      match_count int
    )
    RETURNS TABLE (
      id uuid,
      content text,
      metadata jsonb,
      similarity float
    )
    LANGUAGE plpgsql
    AS $$
    BEGIN
      RETURN QUERY
      SELECT
        aura_rag_documents.id,
        aura_rag_documents.content,
        aura_rag_documents.metadata,
        (
          (0.75 * (1 - (aura_rag_documents.embedding <=> query_embedding))) +
          (0.25 * LEAST(1.0, ts_rank_cd(aura_rag_documents.fts_vector, plainto_tsquery('english', query_text)) * 10))
        ) AS similarity
      FROM aura_rag_documents
      WHERE (1 - (aura_rag_documents.embedding <=> query_embedding)) > 0.4
      OR aura_rag_documents.fts_vector @@ plainto_tsquery('english', query_text)
      ORDER BY similarity DESC
      LIMIT match_count;
    END;
    $$;
  `;

  if (!fs.existsSync(DATA_FILE)) {
    console.error("❌ unified_cleaned_data.json not found.");
    process.exit(1);
  }
  const allChunks = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  
  // 🎯 PRIORITY SORTING: Core -> Syllabus/Bus -> Others
  const sortedChunks = allChunks.sort((a, b) => {
    const priority = (chunk) => {
       const file = chunk.metadata.source_file.toLowerCase();
       if (chunk.metadata.source_layer === 'core') return 0;
       if (file.includes('syllabus') || file.includes('ar')) return 1;
       if (file.includes('report') || file.includes('prospectus')) return 2;
       return 3;
    };
    return priority(a) - priority(b);
  });

  const batchSize = 60;
  const existingCount = await sql`SELECT count(*) FROM aura_rag_documents`;
  const skipCount = parseInt(existingCount[0].count);
  console.log(`📦 Aura Knowledge Base already contains ${skipCount} documents.`);
  console.log(`📡 Resuming from Batch ${Math.floor(skipCount / batchSize) + 1}...`);

  const totalBatches = Math.ceil(sortedChunks.length / batchSize);
  
  for (let i = skipCount; i < sortedChunks.length; i += batchSize) {
    const batch = sortedChunks.slice(i, i + batchSize);
    console.log(`📡 Batch ${Math.floor(i / batchSize) + 1} / ${totalBatches}...`);

    try {
      const { embeddings } = await embedMany({
        model: hub.embedding('openai/text-embedding-3-small'),
        values: batch.map(c => c.content),
      });

      const rows = batch.map((chunk, j) => ({
        content: chunk.content,
        embedding: `[${embeddings[j].join(',')}]`,
        metadata: {
          ...chunk.metadata,
          source_url: chunk.metadata.source_refs?.[0] || 'https://www.msajce-edu.in'
        }
      }));

      await sql`
        INSERT INTO aura_rag_documents ${sql(rows, 'content', 'embedding', 'metadata')}
      `;

      await new Promise(r => setTimeout(r, 12000));
    } catch (e) {
      console.error(`❌ Batch failed: ${e.message}`);
      await new Promise(r => setTimeout(r, 60000));
      i -= batchSize; 
    }
  }

  if (skipCount < sortedChunks.length) {
    console.log("⚡ Building Optimized Indices for Aura...");
    await sql`CREATE INDEX IF NOT EXISTS idx_aura_embedding_hnsw ON aura_rag_documents USING hnsw (embedding vector_cosine_ops)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_aura_fts_gin ON aura_rag_documents USING gin (fts_vector)`;
  } else {
    console.log("💎 Aura Knowledge Base is already fully synchronized.");
  }

  console.log("🎉 Production Hybrid Knowledge Graph is LIVE!");
  process.exit(0);
}

finalIngest();
