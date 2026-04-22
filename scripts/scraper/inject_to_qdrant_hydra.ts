import { createOpenAI } from '@ai-sdk/openai';
import { embed } from 'ai';
import { QdrantClient } from "@qdrant/js-client-rest";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load Environment
const envPath = 'd:/.gemini/RAG college/.env';
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const QDRANT_URL = envConfig['QDRANT_URL'];
const QDRANT_API_KEY = envConfig['QDRANT_API_KEY'];
const KEYS = [envConfig['VERCEL_AI_KEY'], envConfig['VERCEL_AI_KEY_2']];

const qdrantClient = new QdrantClient({
    url: QDRANT_URL,
    apiKey: QDRANT_API_KEY,
    checkCompatibility: false,
});

// Global Gateway Client to avoid memory fragmentation
const gateway = createOpenAI({ 
    apiKey: KEYS[0], // Default
    baseURL: 'https://ai-gateway.vercel.sh/v1' 
});

async function getEmbedding(text: string, keyIndex: number) {
    const key = KEYS[keyIndex % KEYS.length];
    const model = gateway.embedding('openai/text-embedding-3-small', {
        headers: { "Authorization": `Bearer ${key}` } // Dynamic override if possible, else just use the provided gateway instance
    });
    
    try {
        const { embedding } = await embed({ model, value: text });
        return embedding;
    } catch (e: any) {
        if (e.message.includes('rate limit') || e.message.includes('429')) {
            console.warn(`⚠️ Key ${keyIndex % KEYS.length} Rate Limited. Waiting 30s...`);
            await new Promise(r => setTimeout(r, 30000));
            return getEmbedding(text, keyIndex + 1); // Try next key
        }
        throw e;
    }
}

async function injectHydra() {
    console.log("--- AURA SEARCH CORE: QDRANT HYDRA SURGE ---");
    const COLLECTION_NAME = "msajce_institutional_knowledge";
    const CHECKPOINT_PATH = "organized_vault/scraper_debug/qdrant_checkpoint.json";

    // 1. Ensure Collection
    try {
        const collections = await qdrantClient.getCollections();
        if (!collections.collections.some(c => c.name === COLLECTION_NAME)) {
            await qdrantClient.createCollection(COLLECTION_NAME, {
                vectors: { size: 1536, distance: "Cosine" },
                optimizers_config: { default_segment_number: 2 }
            });
            console.log(`✅ Created Collection: ${COLLECTION_NAME}`);
        }
    } catch (e) {
        console.error("❌ Qdrant Connection Failed:", e);
        return;
    }

    // 2. Load Checkpoint
    let finishedFiles: string[] = [];
    if (fs.existsSync(CHECKPOINT_PATH)) {
        finishedFiles = JSON.parse(fs.readFileSync(CHECKPOINT_PATH, 'utf8'));
        console.log(`📡 Resuming from Checkpoint: ${finishedFiles.length} nodes finished.`);
    }

    const cleanedDir = "organized_vault/cleaned";
    const tiers = ['high', 'medium', 'low'];
    let currentKeyIndex = 0;

    for (const tier of tiers) {
        const tierDir = path.join(cleanedDir, tier);
        if (!fs.existsSync(tierDir)) continue;

        const files = fs.readdirSync(tierDir).filter(f => f.endsWith('.json'));
        console.log(`📡 Ingesting Tier [${tier.toUpperCase()}]: ${files.length} nodes...`);

        for (const file of files) {
            if (finishedFiles.includes(file)) continue;

            const filePath = path.join(tierDir, file);
            let content = fs.readFileSync(filePath, 'utf8').trim();
            
            // Sanitize
            if (content.startsWith('```json')) content = content.replace(/^```json/, '').replace(/```$/, '').trim();
            
            try {
                const vector = await getEmbedding(content, currentKeyIndex);
                
                // RETRY LOOP: Handle Qdrant Jitter
                let success = false;
                let attempts = 0;
                while (!success && attempts < 3) {
                    try {
                        await qdrantClient.upsert(COLLECTION_NAME, {
                            wait: true,
                            points: [{
                                id: finishedFiles.length + 1,
                                vector: vector,
                                payload: {
                                    fileName: file,
                                    tier: tier,
                                    content: JSON.parse(content),
                                    lastUpdated: new Date().toISOString()
                                }
                            }]
                        });
                        success = true;
                    } catch (e: any) {
                        attempts++;
                        console.warn(`⚠️ Upsert attempt ${attempts} failed for ${file}. Retrying...`);
                        await new Promise(r => setTimeout(r, 1000 * attempts));
                    }
                }

                if (!success) throw new Error(`Failed after ${attempts} attempts.`);

                finishedFiles.push(file);
                fs.writeFileSync(CHECKPOINT_PATH, JSON.stringify(finishedFiles));
                currentKeyIndex++;
                
                if (finishedFiles.length % 10 === 0) {
                    console.log(`📈 Progress Pulse: ${finishedFiles.length} Nodes Neutralized.`);
                }
            } catch (e: any) {
                console.error(`❌ Failed Node ${file}: ${e.message}`);
            }
        }
    }

    console.log(`--- SURGE COMPLETE: 100% VAULT NEUTRALIZATION ---`);
}

injectHydra();
