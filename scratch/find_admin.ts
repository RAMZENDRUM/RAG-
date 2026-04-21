import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const sql = postgres(process.env.DATABASE_URL || '');

async function findAdmin() {
  try {
    const rows = await sql`
      SELECT user_id, content, created_at 
      FROM chat_histories 
      ORDER BY created_at DESC 
      LIMIT 1
    `;
    console.log("🎯 MASTER ARCHITECT LOCATED:");
    console.log(JSON.stringify(rows, null, 2));
  } catch (err) {
    console.error("❌ Search Failed:", err.message);
  } finally {
    process.exit(0);
  }
}

findAdmin();
