import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const groq = createOpenAI({
    apiKey: process.env.GROQ_API_KEY || '',
    baseURL: 'https://api.groq.com/openai/v1'
});

async function test() {
    try {
        const { text } = await generateText({
            model: groq('llama-3.1-70b-versatile'),
            prompt: 'Hi! Who are you?'
        });
        console.log('RESPONSE:', text);
    } catch (e: any) {
        console.error('ERROR:', e.message);
        if (e.data) console.error('DATA:', JSON.stringify(e.data, null, 2));
    }
}

test();
