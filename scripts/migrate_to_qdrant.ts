import dotenv from 'dotenv';
dotenv.config();

import postgres from 'postgres';
import { QdrantClient } from '@qdrant/js-client-rest';

const sql = postgres(process.env.DATABASE_URL!);
const qdrant = new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
});

async function migrate() {
    console.log("🚀 MIRRORING SUPABASE -> QDRANT (Hydra Synchronization)...");

    // Get all docs from Supabase
    const docs = await sql`SELECT content, embedding, metadata FROM documents`;
    console.log(`📂 Found ${docs.length} documents in Supabase to sync.`);

    const collectionName = 'msajce_institutional_knowledge';

    // Batch upload to Qdrant
    const batchSize = 100;
    for (let i = 0; i < docs.length; i += batchSize) {
        const batch = docs.slice(i, i + batchSize);
        
        try {
            await qdrant.upsert(collectionName, {
                wait: true,
                points: batch.map((doc, idx) => ({
                    id: Buffer.from(`${doc.metadata.source_file}_${i + idx}`).toString('hex').substring(0, 32).padEnd(32, '0'), // Generate semi-stable UUID
                    vector: JSON.parse(doc.embedding), // embedding is stored as vector string in pg
                    payload: {
                        content: doc.content,
                        ...doc.metadata
                    }
                }))
            });
            console.log(`📡 Synced batch ${i / batchSize + 1} / ${Math.ceil(docs.length / batchSize)}`);
        } catch (e: any) {
            console.error(`❌ Batch failed: ${e.message}`);
        }
    }

    console.log("🏁 HYDRA SYNC COMPLETE! Both engines are now matched.");
    await sql.end();
}

migrate().catch(console.error);
