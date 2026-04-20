import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();
const sql = postgres(process.env.DATABASE_URL!);
async function check() {
  const rows = await sql`SELECT content, metadata FROM documents WHERE content ILIKE '%principal%' LIMIT 5`;
  console.log(JSON.stringify(rows, null, 2));
  process.exit(0);
}
check();
