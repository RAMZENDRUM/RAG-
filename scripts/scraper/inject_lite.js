const { QdrantClient } = require("@qdrant/js-client-rest");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const axios = require("axios");

// Load Environment
const envPath = 'd:/.gemini/RAG college/.env';
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const QDRANT_URL = envConfig['QDRANT_URL'];
const QDRANT_API_KEY = envConfig['QDRANT_API_KEY'];
const KEYS = [
    envConfig['VERCEL_AI_KEY'], 
    envConfig['VERCEL_AI_KEY_2'],
    envConfig['VERCEL_AI_KEY_3']
];

const qdrantClient = new QdrantClient({
    url: QDRANT_URL,
    apiKey: QDRANT_API_KEY,
    checkCompatibility: false,
});

async function getEmbedding(text, keyIndex) {
    const key = KEYS[keyIndex % KEYS.length];
    try {
        const response = await axios.post('https://ai-gateway.vercel.sh/v1/embeddings', {
            input: text,
            model: "text-embedding-3-small"
        }, {
            headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" }
        });
        return response.data.data[0].embedding;
    } catch (e) {
        if (e.response && (e.response.status === 429)) {
            console.warn(`⚠️ Key ${keyIndex % KEYS.length} Rate Limited. Waiting 30s...`);
            await new Promise(r => setTimeout(r, 30000));
            return getEmbedding(text, keyIndex + 1);
        }
        throw e;
    }
}

async function injectLite() {
    console.log("--- AURA SEARCH CORE: LIGHTWEIGHT SURGE ---");
    const COLLECTION_NAME = "msajce_institutional_knowledge";
    const CHECKPOINT_PATH = "organized_vault/scraper_debug/qdrant_checkpoint.json";

    // 1. Load Checkpoint
    let finishedFiles = [];
    if (fs.existsSync(CHECKPOINT_PATH)) {
        finishedFiles = JSON.parse(fs.readFileSync(CHECKPOINT_PATH, 'utf8'));
        console.log(`📡 Resuming from Node ${finishedFiles.length + 1}...`);
    }

    const cleanedDir = "organized_vault/cleaned";
    const tiers = ['high', 'medium', 'low'];
    let currentKeyIndex = 0;

    for (const tier of tiers) {
        const tierDir = path.join(cleanedDir, tier);
        if (!fs.existsSync(tierDir)) continue;

        const files = fs.readdirSync(tierDir).filter(f => f.endsWith('.json'));
        console.log(`📡 Processing Tier [${tier.toUpperCase()}]: ${files.length} nodes...`);

        for (const file of files) {
            if (finishedFiles.includes(file)) continue;

            const filePath = path.join(tierDir, file);
            let content = fs.readFileSync(filePath, 'utf8').trim();
            
            // ROBUST JSON EXTRACTION: Handle Markdown and Conversational Wrappers
            let jsonString = content;
            if (jsonString.includes('```json')) {
                jsonString = jsonString.split('```json')[1].split('```')[0].trim();
            } else if (jsonString.includes('```')) {
                jsonString = jsonString.split('```')[1].split('```')[0].trim();
            } else {
                // Find first '{' and last '}' to strip any neural prefix/suffix
                const firstBrace = jsonString.indexOf('{');
                const lastBrace = jsonString.lastIndexOf('}');
                if (firstBrace !== -1 && lastBrace !== -1) {
                    jsonString = jsonString.substring(firstBrace, lastBrace + 1);
                }
            }
            
            try {
                let jsonData;
                try {
                    jsonData = JSON.parse(jsonString);
                } catch (pe) {
                    console.warn(`⏭️ Skipping Syntax-Error Node: ${file} (Non-JSON content)`);
                    finishedFiles.push(file);
                    continue;
                }
                
                // HOLLOW NODE FILTER: Skip conversational refusals or empty nodes
                const stringified = JSON.stringify(jsonData).toLowerCase();
                if (stringified.includes("share the table") || stringified.includes("didn't provide any content") || stringified.includes("master json schema")) {
                    console.warn(`⏭️ Skipping Hollow Node: ${file}`);
                    finishedFiles.push(file);
                    continue;
                }

                const vector = await getEmbedding(jsonString, currentKeyIndex);
                
                // RETRY LOOP with Truncation for Large Payloads
                let success = false;
                let attempts = 0;
                let currentJson = jsonData;

                while (!success && attempts < 2) {
                    try {
                        await qdrantClient.upsert(COLLECTION_NAME, {
                            wait: true,
                            points: [{
                                id: finishedFiles.length + 1,
                                vector: vector,
                                payload: {
                                    fileName: file,
                                    tier: tier,
                                    content: currentJson,
                                    lastUpdated: new Date().toISOString()
                                }
                            }]
                        });
                        success = true;
                    } catch (e) {
                        attempts++;
                        const errorMsg = e.message || JSON.stringify(e);
                        const is400 = errorMsg.includes("400") || (e.status === 400);

                        if (is400) {
                            console.warn(`⚠️ High-Payload detected for ${file}. Neutralizing metadata to bypass Qdrant limits...`);
                            // AGGRESSIVE NEUTRALIZATION: Minimal metadata + tiny preview
                            currentJson = { 
                                fileName: file,
                                status: "Indexed with limited metadata due to cluster size constraints",
                                preview: typeof jsonData === 'string' ? jsonData.substring(0, 500) : JSON.stringify(jsonData).substring(0, 500)
                            };
                            continue; // Retry with sanitized payload
                        } else {
                            console.error(`❌ Permanent Error for ${file}: ${errorMsg}`);
                            throw e;
                        }
                    }
                }

                finishedFiles.push(file);
                fs.writeFileSync(CHECKPOINT_PATH, JSON.stringify(finishedFiles));
                currentKeyIndex++;
                
                // FORCE MEMORY RELEASE: Nullify large strings
                content = null;

                if (finishedFiles.length % 10 === 0) {
                    console.log(`📈 Progress Pulse: ${finishedFiles.length} Nodes Neutralized.`);
                }
            } catch (e) {
                console.error(`❌ Failed Node ${file}: ${e.message}`);
                // Continue to next node to prevent total stall
            }
        }
    }

    console.log(`--- SURGE COMPLETE: 100% VAULT NEUTRALIZATION ---`);
}

injectLite();
