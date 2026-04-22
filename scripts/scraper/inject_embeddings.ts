import { createOpenAI } from '@ai-sdk/openai';
import { embed } from 'ai';
import { QdrantClient } from "@qdrant/js-client-rest";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load Environment
const envPath = 'd:/.gemini/RAG college/.env';
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const KEY = envConfig['VERCEL_AI_KEY'];

const qdrantClient = new QdrantClient({
    url: envConfig['QDRANT_URL'],
    apiKey: envConfig['QDRANT_API_KEY'],
});

const gateway = createOpenAI({ 
    apiKey: KEY,
    baseURL: 'https://ai-gateway.vercel.sh/v1' 
});

const embedModel = gateway.embedding('openai/text-embedding-3-small');

async function injectVault() {
    console.log("--- AURA SEARCH CORE: EMBEDDING INJECTION ---");
    
    const COLLECTION_NAME = "msajce_institutional_knowledge";
    const cleanedDir = "organized_vault/cleaned";
    
    // Ensure collection exists
    try {
        const collections = await qdrantClient.getCollections();
        if (!collections.collections.some(c => c.name === COLLECTION_NAME)) {
            await qdrantClient.createCollection(COLLECTION_NAME, {
                vectors: { size: 1536, distance: "Cosine" }
            });
            console.log(`✅ Created Collection: ${COLLECTION_NAME}`);
        }
    } catch (e) {
        console.error("❌ Qdrant Connection Failed:", e);
        return;
    }

    const tiers = ['high', 'medium', 'low'];
    let totalInjected = 0;

    for (const tier of tiers) {
        const tierDir = path.join(cleanedDir, tier);
        if (!fs.existsSync(tierDir)) continue;

        const files = fs.readdirSync(tierDir).filter(f => f.endsWith('.json'));
        console.log(`📡 Injecting Tier [${tier.toUpperCase()}]: ${files.length} files...`);

        for (const file of files) {
            const filePath = path.join(tierDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            
            try {
                // Generate vector using the AI SDK 'embed'
                const { embedding } = await embed({
                    model: embedModel,
                    value: content
                });
                
                await qdrantClient.upsert(COLLECTION_NAME, {
                    wait: true,
                    points: [{
                        id: Math.random().toString(36).substring(7),
                        vector: embedding,
                        payload: {
                            fileName: file,
                            tier: tier,
                            content: JSON.parse(content),
                            lastUpdated: new Date().toISOString()
                        }
                    }]
                });
                totalInjected++;
            } catch (e: any) {
                console.error(`❌ Failed to inject ${file}: ${e.message}`);
            }
        }
    }

    console.log(`--- INJECTION COMPLETE: ${totalInjected} Nodes Finalized ---`);
}

injectVault();
