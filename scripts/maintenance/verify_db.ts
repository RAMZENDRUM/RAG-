import dotenv from 'dotenv';
dotenv.config();
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

async function verify() {
    const rows = await sql`SELECT content, metadata FROM documents WHERE metadata->>'category' = 'TRANSPORT' LIMIT 20`;
    console.log(`\n--- TRANSPORT NODES FOUND: ${rows.length} ---\n`);
    rows.forEach(r => {
        console.log(`[File: ${r.metadata.source_file}] -> ${r.content.substring(0, 100)}...`);
    });
    console.log("\n----------------------------\n");
    await sql.end();
}

verify().catch(console.error);
