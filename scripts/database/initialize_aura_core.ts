import postgres from 'postgres';
import dotenv from 'dotenv';
import fs from 'fs';

// Load Environment
const envPath = 'd:/.gemini/RAG college/.env';
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const CONNECTION_STRING = envConfig['DATABASE_URL'];

const sql = postgres(CONNECTION_STRING);

async function initialize() {
    console.log("--- AURA DATABASE INITIALIZATION ---");
    
    try {
        // 1. Enable pgvector
        console.log("📡 Enabling pgvector extension...");
        await sql`CREATE EXTENSION IF NOT EXISTS vector;`;
        
        // 2. Create Table
        console.log("📡 Creating institutional knowledge table...");
        await sql`
            CREATE TABLE IF NOT EXISTS msajce_knowledge (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                file_name TEXT UNIQUE,
                tier TEXT,
                content JSONB,
                embedding vector(1536),
                last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;
        
        // 3. Create Index
        console.log("📡 Creating HNSW index for high-speed retrieval...");
        await sql`
            CREATE INDEX IF NOT EXISTS msajce_knowledge_embedding_idx 
            ON msajce_knowledge 
            USING hnsw (embedding vector_cosine_ops);
        `;
        
        console.log("✅ Aura Core Initialized successfully.");
    } catch (e: any) {
        console.error("❌ Initialization Failed:", e.message);
    } finally {
        await sql.end();
    }
}

initialize();
