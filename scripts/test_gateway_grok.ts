import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import fs from 'fs';
import dotenv from 'dotenv';

const envPath = 'd:/.gemini/RAG college/.env';
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const KEY = envConfig['VERCEL_AI_KEY'];

const gateway = createOpenAI({ 
    apiKey: KEY,
    baseURL: 'https://ai-gateway.vercel.sh/v1' 
});

async function test(modelName: string) {
    console.log('?? Testing Grok Gateway Route: ' + modelName);
    try {
        const { text } = await generateText({
            model: gateway(modelName),
            prompt: 'STATUS CHECK. Respond with: ' + modelName + '_ACTIVE.'
        });
        console.log('? ' + modelName + ' Success: ' + text);
    } catch (e: any) {
        console.log('? ' + modelName + ' Failed: ' + e.message);
    }
}

async function run() {
    await test('xai/grok-4.1-fast-non-reasoning');
    await test('xai/grok-4.1-fast-reasoning');
}
run();
