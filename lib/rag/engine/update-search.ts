import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const sql = postgres(process.env.DATABASE_URL!);

async function update() {
  console.log("🛠️ Re-weighting Hybrid Search for Elite Precision...");

  await sql`
    CREATE OR REPLACE FUNCTION hybrid_search (
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
        documents.id,
        documents.content,
        documents.metadata,
        (
          (0.75 * (1 - (documents.embedding <=> query_embedding))) +
          (0.25 * LEAST(1.0, ts_rank_cd(documents.fts_vector, plainto_tsquery('english', query_text)) * 10))
        ) AS similarity
      FROM documents
      WHERE (1 - (documents.embedding <=> query_embedding)) > 0.4
      OR documents.fts_vector @@ plainto_tsquery('english', query_text)
      ORDER BY similarity DESC
      LIMIT match_count;
    END;
    $$;
  `;

  console.log("✅ Hybrid Search Re-weighted: 0.75 Vector + 0.25 (Keyword * 10).");
  process.exit(0);
}

update();
