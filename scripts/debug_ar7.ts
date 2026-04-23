import dotenv from 'dotenv';
dotenv.config();
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

async function debug() {
    const rows = await sql`SELECT content, metadata FROM documents WHERE content ILIKE '%AR7%'`;
    console.log(`\n--- AR7 SEARCH RESULTS: ${rows.length} ---\n`);
    rows.forEach(r => {
        console.log(`[Source: ${r.metadata.source_file}] -> ${r.content}`);
    });
    console.log("\n----------------------------\n");
    await sql.end();
}

debug().catch(console.error);
