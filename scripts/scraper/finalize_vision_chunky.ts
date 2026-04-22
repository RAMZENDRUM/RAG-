import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load Keys
const envPath = 'd:/.gemini/RAG college/.env';
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const KEY = envConfig['VERCEL_AI_KEY'];

const gateway = createOpenAI({ 
    apiKey: KEY,
    baseURL: 'https://ai-gateway.vercel.sh/v1' 
});

async function synthesizeChunk(imageFiles: string[], folderPath: string, chunkIndex: number, targetName: string) {
    console.log(`📡 Ingesting Chunk ${chunkIndex+1} for ${targetName}...`);

    const imageParts = imageFiles.map(f => {
        const fullPath = path.join(folderPath, f);
        const base64 = fs.readFileSync(fullPath).toString('base64');
        return {
            type: 'image' as const,
            image: base64,
        };
    });

    const systemPrompt = "You are an Elite Institutional Concierge. Normalize these pages into a JSON fragment. Preserve every row, column, and rule precisely. This is page chunk " + (chunkIndex+1);
    const userPrompt = "Analyze these pages and extract structured data. Focus on high fidelity.";

    try {
        const { text } = await generateText({
            model: gateway('xai/grok-4.1-fast-non-reasoning'),
            system: systemPrompt,
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: userPrompt },
                        ...imageParts
                    ]
                }
            ]
        });

        const fragmentPath = `organized_vault/scraper_debug/vision/fragments/${targetName}_chunk_${chunkIndex+1}.json`;
        if (!fs.existsSync(path.dirname(fragmentPath))) fs.mkdirSync(path.dirname(fragmentPath), { recursive: true });
        
        fs.writeFileSync(fragmentPath, text);
        console.log(`✅ Chunk ${chunkIndex+1} Stabilized: ${fragmentPath}`);
        return text;
    } catch (e: any) {
        console.error(`❌ Chunk ${chunkIndex+1} Failed: ${e.message}`);
        return null;
    }
}

async function processGiant(folderPath: string, targetName: string) {
    const finalPath = `organized_vault/cleaned/high/${targetName}.json`;
    if (fs.existsSync(finalPath)) {
        console.log(`⏩ Skipping ${targetName}: Already Finalized.`);
        return;
    }

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.png')).sort();
    const CHUNK_SIZE = 5;
    const fragments: string[] = [];

    for (let i = 0; i < files.length; i += CHUNK_SIZE) {
        const chunk = files.slice(i, i + CHUNK_SIZE);
        const result = await synthesizeChunk(chunk, folderPath, Math.floor(i/CHUNK_SIZE), targetName);
        if (result) fragments.push(result);
    }

    console.log(`📡 --- NEURAL FUSION: ${targetName} ---`);
    // Final Fusion of fragments into a master node
    const fusionPrompt = `Below are fragments extracted from a scanned institutional document. Merge them into a single, cohesive, high-fidelity JSON node. fragments:\n${fragments.join('\n\n')}`;
    
    try {
        const { text } = await generateText({
            model: gateway('google/gemini-2.5-flash-lite'), // High context for fusion
            prompt: fusionPrompt,
        });

        const finalPath = `organized_vault/cleaned/high/${targetName}.json`;
        fs.writeFileSync(finalPath, text);
        console.log(`🏆 FINALIZED GIANT: ${finalPath}`);
    } catch (e: any) {
        console.error(`❌ Fusion Failed for ${targetName}: ${e.message}`);
    }
}

async function run() {
    console.log('--- AURA SURGICAL VISION CHUNKS ---');
    
    // 1. Prospectus
    if (fs.existsSync('organized_vault/scraper_debug/vision/prospectus')) {
        await processGiant('organized_vault/scraper_debug/vision/prospectus', 'College-Prospectus');
    }
    
    // 2. CE Giants
    if (fs.existsSync('organized_vault/scraper_debug/vision/ce8501')) {
        await processGiant('organized_vault/scraper_debug/vision/ce8501', 'CE8501-LN');
    }
    
    if (fs.existsSync('organized_vault/scraper_debug/vision/ce8591')) {
        await processGiant('organized_vault/scraper_debug/vision/ce8591', 'CE8591-QB');
    }

    console.log('--- SURGE COMPLETE ---');
}

run();
