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

async function synthesizeVision(folderPath: string, outputName: string) {
    console.log(`📡 --- AURA VISION SYNTHESIS: GROK-X 2M ---`);
    console.log(`📡 Ingesting Folder: ${folderPath}`);

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.png')).sort();
    console.log(`📊 Number of Images: ${files.length}`);

    const imageParts = files.map(f => {
        const fullPath = path.join(folderPath, f);
        const base64 = fs.readFileSync(fullPath).toString('base64');
        return {
            type: 'image' as const,
            image: base64,
        };
    });

    const systemPrompt = "You are an Elite Institutional Concierge. Normalize these prospectus images into the master JSON schema. Capturing every Regulation, Fee structure, Faculty detail, and Admission rule. Preserve structural integrity.";
    const userPrompt = "Analyze all pages of this institutional prospectus in sequence. Extract all key data into the JSON schema.";

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

        const outputPath = path.join('organized_vault/cleaned/high', outputName);
        fs.writeFileSync(outputPath, text);
        console.log(`✅ [GROK-X] Finalized Vision Node: ${outputPath}`);
    } catch (e: any) {
        console.error(`❌ [GROK-X] Vision Synthesis Failed: ${e.message}`);
    }
}

async function run() {
    // 1. Prospectus
    await synthesizeVision('organized_vault/scraper_debug/vision/prospectus', 'College-Prospectus.json');
}

run();
