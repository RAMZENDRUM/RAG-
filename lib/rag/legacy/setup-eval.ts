import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const sql = postgres(process.env.DATABASE_URL!);

async function setupProductionSchema() {
    console.log("🏁 Building Elite RAG Evaluation Schema...");

    try {
        await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        
        await sql`
            CREATE TABLE IF NOT EXISTS query_logs (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                query text NOT NULL,
                enhanced_query text,
                retrieved_contexts text[],
                scores float[],
                answer text,
                reliability text,
                confidence float,
                feedback text,
                metadata jsonb DEFAULT '{}',
                created_at timestamptz DEFAULT now()
            )
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS system_tuning (
                id serial PRIMARY KEY,
                category text,
                keyword text,
                boost_value float,
                reason text,
                status text DEFAULT 'active',
                last_sync timestamptz DEFAULT now()
            )
        `;

        console.log("✅ Query Logs & System Tuning Tables Created.");

        // Add indices for auto-improvement analysis
        await sql`CREATE INDEX IF NOT EXISTS idx_query_logs_confidence ON query_logs (confidence)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_query_logs_created ON query_logs (created_at DESC)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_tuning_keyword ON system_tuning (keyword)`;

        console.log("🚀 Production Infrastructure Ready.");
    } catch (e) {
        console.error("❌ Schema Setup Failed:", e.message);
    } finally {
        process.exit(0);
    }
}

setupProductionSchema();
