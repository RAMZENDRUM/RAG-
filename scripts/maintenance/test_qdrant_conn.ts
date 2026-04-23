import dotenv from 'dotenv';
dotenv.config();
import { QdrantClient } from '@qdrant/js-client-rest';

async function testQdrant() {
    const client = new QdrantClient({
        url: process.env.QDRANT_URL,
        apiKey: process.env.QDRANT_API_KEY,
    });

    try {
        const collections = await client.getCollections();
        console.log("✅ Qdrant Reachable! Collections:", collections.collections.map(c => c.name));
    } catch (e: any) {
        console.error("❌ Qdrant Unreachable:", e.message);
    }
}

testQdrant();
