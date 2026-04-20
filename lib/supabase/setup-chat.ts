import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL!);

async function setup() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS chat_histories (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_chat_user ON chat_histories(user_id);`;
    console.log('Database setup complete.');
  } catch (error) {
    console.error('Setup error:', error);
  } finally {
    process.exit(0);
  }
}

setup();
