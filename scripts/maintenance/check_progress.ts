import dotenv from 'dotenv';
dotenv.config();
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

async function check() {
    const total = await sql`SELECT count(*) FROM documents`;
    const categories = await sql`SELECT metadata->>'source_layer' as layer, count(*) as count FROM documents GROUP BY 1 ORDER BY 2 DESC`;
    
    console.log(`\n📊 AURA KNOWLEDGE PROGRESS REPORT`);
    console.log(`==================================`);
    console.log(`✅ Total Documents Indexed: ${total[0].count}`);
    console.log(`\n📂 Knowledge Layers:`);
    categories.forEach(c => {
        console.log(`- ${c.layer || 'Unknown'}: ${c.count} chunks`);
    });
    console.log(`\n----------------------------------`);
    await sql.end();
}

check().catch(console.error);
