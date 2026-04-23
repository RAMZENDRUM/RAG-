import { createOpenAI } from '@ai-sdk/openai';
import { embed } from 'ai';
import fs from 'fs';
import dotenv from 'dotenv';

const envPath = 'd:/.gemini/RAG college/.env';
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const KEY = envConfig['VERCEL_AI_KEY'];

const gateway = createOpenAI({ 
    apiKey: KEY,
    baseURL: 'https://ai-gateway.vercel.sh/v1' 
});

async function testEmbed() {
    console.log('?? Testing Gateway Embedding: openai/text-embedding-3-small');
    try {
        const { embedding } = await embed({
            model: gateway.embedding('openai/text-embedding-3-small'),
            value: 'Aura Intelligence Core. Status: Finalizing.'
        });
        console.log('? Embedding Success. Vector Size: ' + embedding.length);
    } catch (e: any) {
        console.error('? Embedding Failed: ' + e.message);
    }
}
testEmbed();
