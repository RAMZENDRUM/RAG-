import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const sql = postgres(process.env.DATABASE_URL!);

async function check() {
  try {
    const cols = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'documents'
    `;
    const count = await sql`SELECT count(*) FROM documents`;
    console.log("Documents Table Count:", count[0].count);
    
    console.log("Sample Metadata:");
    const sample = await sql`SELECT metadata FROM documents LIMIT 3`;
    console.table(sample);

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

check();
