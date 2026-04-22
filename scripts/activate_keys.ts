import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import fs from 'fs';
import dotenv from 'dotenv';

// Load env from the root directory
const envPath = 'd:/.gemini/RAG college/.env';
const envConfig = dotenv.parse(fs.readFileSync(envPath));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

async function checkKey(keyName: string, keyValue: string | undefined) {
    if (!keyValue) {
        console.log(`❌ ${keyName} is MISSING.`);
        return;
    }
    const masked = keyValue.substring(0, 8) + '...';
    console.log(`📡 Pinging ${keyName} (${masked})...`);
    
    // Explicitly using the Vercel AI Gateway as the user specified
    const openai = createOpenAI({ 
        apiKey: keyValue,
        baseURL: 'https://ai-gateway.vercel.sh/v1' 
    });

    try {
        const { text } = await generateText({
            model: openai('gpt-4o-mini'),
            prompt: `Aura Activation Pulse for ${keyName}. Respond with: ${keyName}_SUCCESS.`
        });
        console.log(`✅ ${keyName} RESPONSE: ${text}`);
    } catch (e: any) {
        console.log(`❌ ${keyName} FAILED: ${e.message}`);
    }
}

async function run() {
    console.log('--- AURA NEURAL SYNC INITIATED ---');
    await checkKey('VERCEL_AI_KEY', process.env.VERCEL_AI_KEY);
    await checkKey('VERCEL_AI_KEY_2', process.env.VERCEL_AI_KEY_2);
    console.log('--- SYNC COMPLETE ---');
}

run();
