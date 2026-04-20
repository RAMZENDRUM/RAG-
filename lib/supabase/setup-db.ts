import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL!);

async function setup() {
  try {
    console.log('--- Setting up Database ---');

    console.log('1. Enabling pgvector extension...');
    await sql`CREATE EXTENSION IF NOT EXISTS vector;`;

    console.log('2. Creating documents table...');
    await sql`
      CREATE TABLE IF NOT EXISTS documents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        content TEXT NOT NULL,
        embedding VECTOR(1536),
        metadata JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    console.log('3. Creating similarity search function...');
    await sql`
      CREATE OR REPLACE FUNCTION match_documents (
        query_embedding VECTOR(1536),
        match_threshold FLOAT,
        match_count INT
      )
      RETURNS TABLE (
        id UUID,
        content TEXT,
        metadata JSONB,
        similarity FLOAT
      )
      LANGUAGE plpgsql
      AS $$
      BEGIN
        RETURN QUERY
        SELECT
          documents.id,
          documents.content,
          documents.metadata,
          1 - (documents.embedding <=> query_embedding) AS similarity
        FROM documents
        WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
        ORDER BY documents.embedding <=> query_embedding
        LIMIT match_count;
      END;
      $$;
    `;

    console.log('--- Database Setup Complete ---');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setup();
