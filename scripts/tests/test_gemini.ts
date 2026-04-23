import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import fs from 'fs';
import dotenv from 'dotenv';

const envPath = 'd:/.gemini/RAG college/.env';
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const KEY = envConfig['GEMINI_API_KEY'];

async function test(modelName: string) {
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = KEY;
    try {
        const model = google(modelName);
        const { text } = await generateText({
            model: model,
            prompt: 'AURA GEMINI-X PULSE. Respond with: ' + modelName + '_SUCCESS.'
        });
        console.log('? ' + modelName + ': ' + text);
        return true;
    } catch (e: any) {
        console.log('? ' + modelName + ' Failed: ' + e.message);
        return false;
    }
}

async function run() {
    await test('gemini-1.5-flash');
    await test('gemini-1.5-pro');
    await test('gemini-1.5-flash-latest');
}
run();
