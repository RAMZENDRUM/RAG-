import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
    apiVersion: 'v1'
});

async function test() {
    try {
        const { text } = await generateText({
            model: google('gemini-pro'),
            prompt: 'Hi! Who are you?'
        });
        console.log('RESPONSE:', text);
    } catch (e: any) {
        console.error('ERROR:', e.message);
        if (e.data) console.error('DATA:', JSON.stringify(e.data, null, 2));
    }
}

test();
