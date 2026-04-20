import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const sql = postgres(process.env.DATABASE_URL!);

async function run() {
  const res = await sql`
    SELECT content, similarity(content, 'Bus from Porur') as score
    FROM documents 
    WHERE content ILIKE '%Porur%' 
    ORDER BY score DESC 
    LIMIT 5
  `;
  console.log("Porur matches in DB:");
  console.table(res);
  process.exit(0);
}

run();
