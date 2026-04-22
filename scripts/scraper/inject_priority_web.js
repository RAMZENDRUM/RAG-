const { QdrantClient } = require('@qdrant/js-client-rest');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
});

const VERCEL_URL = "https://ai-gateway.vercel.sh/v1/embeddings";
const KEY = process.env.VERCEL_AI_KEY;

async function getEmbedding(text) {
    const response = await axios.post(VERCEL_URL, {
        input: text,
        model: "text-embedding-3-small"
    }, {
        headers: { "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" }
    });
    return response.data.data[0].embedding;
}

async function injectPriority() {
    const files = [
        { path: 'cleaning_zone/web_scrapes/about.md', title: 'About MSAJCE - General Overview' },
        { path: 'cleaning_zone/web_scrapes/departments.md', title: 'Department Overviews - All Branches' },
        { path: 'cleaning_zone/web_scrapes/admission.md', title: 'Admission 2024-25: Eligibility, Fees, and Contacts' },
        { path: 'cleaning_zone/web_scrapes/principal.md', title: 'Principal Profile - Dr. K.S. Srinivasan' },
        { path: 'cleaning_zone/web_scrapes/placement.md', title: 'Placement and Career Cell - Overviews' }
    ];

    for (const file of files) {
        console.log(`📡 Injecting Priority Node: ${file.title}`);
        const content = fs.readFileSync(file.path, 'utf8');
        const vector = await getEmbedding(content.substring(0, 8000)); // Ensure it fits

        await client.upsert('msajce_institutional_knowledge', {
            wait: true,
            points: [{
                id: require('crypto').createHash('md5').update(file.path).digest('hex'),
                vector: vector,
                payload: {
                    content: content,
                    metadata: {
                        source: file.path,
                        title: file.title,
                        type: 'MASTER_OVERVIEW',
                        priority: 'URGENT'
                    }
                }
            }]
        });
        console.log(`✅ Stabilized: ${file.path}`);
    }
}

injectPriority().catch(console.error);
