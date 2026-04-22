import { createOpenAI } from '@ai-sdk/openai';
import { embed } from 'ai';
import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load Environment
const envPath = 'd:/.gemini/RAG college/.env';
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const KEY = envConfig['VERCEL_AI_KEY'];
const CONNECTION_STRING = envConfig['DATABASE_URL'];

const sql = postgres(CONNECTION_STRING);
const gateway = createOpenAI({ 
    apiKey: KEY,
    baseURL: 'https://ai-gateway.vercel.sh/v1' 
});
const embedModel = gateway.embedding('openai/text-embedding-3-small');

async function injectSupabase() {
    console.log("--- AURA SEARCH CORE: SUPABASE INJECTION ---");
    const cleanedDir = "organized_vault/cleaned";
    const tiers = ['high', 'medium', 'low'];
    let totalInjected = 0;

    for (const tier of tiers) {
        const tierDir = path.join(cleanedDir, tier);
        if (!fs.existsSync(tierDir)) continue;

        const files = fs.readdirSync(tierDir).filter(f => f.endsWith('.json'));
        console.log(`📡 Ingesting Tier [${tier.toUpperCase()}]: ${files.length} nodes...`);

        for (const file of files) {
            const filePath = path.join(tierDir, file);
            let content = fs.readFileSync(filePath, 'utf8').trim();
            
            // SANITIZE: Remove markdown fences if present
            if (content.startsWith('```json')) {
                content = content.replace(/^```json/, '').replace(/```$/, '').trim();
            } else if (content.startsWith('```')) {
                content = content.replace(/^```/, '').replace(/```$/, '').trim();
            }

            try {
                const jsonData = JSON.parse(content);
                
                // Generate vector using the AI SDK 'embed'
                const { embedding } = await embed({
                    model: embedModel,
                    value: content
                });
                
                // Upsert into Supabase (Use Postgres.js)
                await sql`
                    INSERT INTO msajce_knowledge (file_name, tier, content, embedding)
                    VALUES (${file}, ${tier}, ${jsonData}, ${embedding})
                    ON CONFLICT (file_name) 
                    DO UPDATE SET 
                        content = EXCLUDED.content,
                        embedding = EXCLUDED.embedding,
                        last_updated = CURRENT_TIMESTAMP;
                `;
                
                totalInjected++;
            } catch (e: any) {
                console.error(`❌ Failed to inject ${file}: ${e.message}`);
            }
        }
    }

    console.log(`--- INJECTION COMPLETE: ${totalInjected} Nodes Finalized ---`);
    await sql.end();
}

injectSupabase();
