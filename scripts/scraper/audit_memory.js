

const { QdrantClient } = require("@qdrant/js-client-rest");
const dotenv = require("dotenv");
const fs = require("fs");

async function testSearch() {
    const envConfig = dotenv.parse(fs.readFileSync('d:/.gemini/RAG college/.env'));
    const QDRANT_URL = envConfig['QDRANT_URL'];
    const QDRANT_API_KEY = envConfig['QDRANT_API_KEY'];

    const client = new QdrantClient({
        url: QDRANT_URL,
        apiKey: QDRANT_API_KEY,
        checkCompatibility: false,
    });

    console.log("--- AURA NEURAL AUDIT: CURRENT MEMORY CHECK ---");
    try {
        const info = await client.getCollection("msajce_institutional_knowledge");
        console.log(`📡 Memory Stability: LIVE`);
        console.log(`🧠 Points in Core: ${info.points_count}`);
        
        // Peek at the first few payloads
        const scroll = await client.scroll("msajce_institutional_knowledge", {
            limit: 5,
            with_payload: true,
        });

        console.log("📚 Recently Stabilized Knowledge:");
        scroll.points.forEach(p => {
            console.log(` - [${p.payload.tier.toUpperCase()}] ${p.payload.fileName}`);
        });

    } catch (e) {
        console.error("❌ Search Core Audit Failed:", e.message);
    }
}

testSearch();
