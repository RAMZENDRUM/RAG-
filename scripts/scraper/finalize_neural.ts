import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load Keys
const envPath = 'd:/.gemini/RAG college/.env';
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const KEYS = [
    envConfig['VERCEL_AI_KEY'],
    envConfig['VERCEL_AI_KEY_2']
].filter(k => k);

console.log(`📡 Hydra Engine initialized with ${KEYS.length} keys.`);

// Global state for rotation
let currentKeyIndex = 0;

function getHydraEngine() {
    const key = KEYS[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % KEYS.length;
    
    return createOpenAI({ 
        apiKey: key,
        baseURL: 'https://ai-gateway.vercel.sh/v1' 
    });
}

async function synthesize(priority: string, fileName: string, outputName: string) {
    const engine = getHydraEngine();
    
    const rawPath = path.join('organized_vault/scraper_debug', fileName);
    const rawContent = fs.readFileSync(rawPath, 'utf8');
    const fileSizeKb = Buffer.byteLength(rawContent, 'utf8') / 1024;

    // AURA GEMINI-X ROUTING
    // Use Gemini for large files, Syllabi, or identified "Giants"
    const isGiant = fileName.toLowerCase().includes('syllabus') || 
                   fileName.toLowerCase().includes('prospectus') || 
                   fileName.toLowerCase().includes('-ln') || 
                   fileName.toLowerCase().includes('-qb') ||
                   fileSizeKb > 150;

    const modelName = isGiant ? 'google/gemini-2.5-flash-lite' : 'gpt-4o-mini';
    const contextTag = isGiant ? 'HYPER-1M' : 'LITE';

    const systemPrompt = "You are an Elite Institutional Concierge. Normalize this input into the master JSON schema. PRESERVE EVERY ROW AND COLUMN OF TABLES EXACTLY. Do not summarize. Maintain all dates, names, and numerical values.";
    const userPrompt = `RAW_CONTENT:\n${rawContent}`;

    try {
        const { text } = await generateText({
            model: engine(modelName),
            system: systemPrompt,
            prompt: userPrompt,
        });

        const outputPath = path.join('organized_vault/cleaned', priority, outputName);
        fs.writeFileSync(outputPath, text);
        console.log(`✅ [CORE-${currentKeyIndex}][${contextTag}] Finalized: ${outputPath} (${fileSizeKb.toFixed(1)} KB)`);
    } catch (e: any) {
        console.error(`❌ [CORE-${currentKeyIndex}][${contextTag}] Failed for ${fileName}: ${e.message}`);
    }
}

async function run() {
    console.log('--- AURA NEURAL SYNTHESIS: HYDRA SURGE ---');
    
    // Build Tier Map
    const tiers = ['high', 'medium', 'low'];
    const tierMap: Record<string, string> = {};
    
    for (const tier of tiers) {
        const dir = path.join('organized_vault/pdfs', tier);
        if (fs.existsSync(dir)) {
            const files = fs.readdirSync(dir);
            for (const f of files) {
                tierMap[f.replace('.pdf', '')] = tier;
            }
        }
    }

    const debugDir = 'organized_vault/scraper_debug';
    const rawFiles = fs.readdirSync(debugDir).filter(f => f.endsWith('_raw.md'));

    for (const file of rawFiles) {
        const baseName = file.replace('_raw.md', '');
        const tier = tierMap[baseName] || 'unknown';
        
        const outputName = `${baseName}.json`;
        const outputPath = path.join('organized_vault/cleaned', tier, outputName);

        // Ensure subfolder exists
        if (!fs.existsSync(path.dirname(outputPath))) {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        }

        // Skip if already processed
        if (fs.existsSync(outputPath)) {
            continue;
        }

        console.log(`📡 Processing [${tier.toUpperCase()}]: ${file}...`);
        await synthesize(tier, file, outputName);
    }
    
    console.log('--- HYDRA BATCH COMPLETE ---');
}

run();
