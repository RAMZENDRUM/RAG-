const { QdrantClient } = require('@qdrant/js-client-rest');
const axios = require('axios');
require('dotenv').config();

const client = new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
});

const VERCEL_URL = "https://ai-gateway.vercel.sh/v1/embeddings";
const KEY = process.env.VERCEL_AI_KEY;

async function auditQuery(query) {
    console.log(`\n🔍 AUDITING NEURAL LOOKUP: "${query}"`);
    
    // 1. Generate Embedding
    const response = await axios.post(VERCEL_URL, {
        input: query,
        model: "text-embedding-3-small"
    }, {
        headers: { "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" }
    });
    const vector = response.data.data[0].embedding;

    // 2. Search Qdrant
    const searchResult = await client.search('msajce_institutional_knowledge', {
        vector: vector,
        limit: 3,
        with_payload: true
    });

    console.log(`\nFound ${searchResult.length} matches:`);
    searchResult.forEach((res, i) => {
        console.log(`\n[${i+1}] Score: ${res.score.toFixed(4)}`);
        console.log(`Source: ${res.payload.metadata.source}`);
        console.log(`Title: ${res.payload.metadata.title}`);
        console.log(`Content Preview: ${res.payload.content.substring(0, 500)}...`);
    });
}

const query = process.argv[2] || "CSE Department HOD";
auditQuery(query);
