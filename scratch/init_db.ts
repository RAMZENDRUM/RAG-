import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const sql = postgres(process.env.DATABASE_URL || '');

async function init() {
  console.log("🏗️ Initializing Knowledge Vault Architecture...");
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS knowledge_cache (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        query TEXT UNIQUE,
        answer TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      )
    `;
    console.log("✅ Knowledge Cache Table Created Successfully.");
  } catch (err) {
    console.error("❌ Initialization Failed:", err.message);
  } finally {
    process.exit(0);
  }
}

init();
