import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

// Rotate to VERCEL_AI_KEY_2 to bypass rate limits
const vercelGateway = createOpenAI({ apiKey: process.env.VERCEL_AI_KEY_2, baseURL: 'https://ai-gateway.vercel.sh/v1' });
const CHAT_MODEL = vercelGateway('google/gemini-2.0-flash-lite');

// Load Local Memory
const MEMORY_PATH = path.resolve(__dirname, '../live_brain/aura_active_memory.json');
const activeMemory = JSON.parse(fs.readFileSync(MEMORY_PATH, 'utf-8'));

async function localRetrieve(query: string) {
    const keywords = query.toLowerCase().split(' ').filter(w => w.length > 3);
    const matches = activeMemory.filter((item: any) => {
        const text = (item.narrative || '').toLowerCase();
        return keywords.some(k => text.includes(k));
    });
    matches.sort((a: any, b: any) => {
        const textA = (a.narrative || '').toLowerCase();
        const textB = (b.narrative || '').toLowerCase();
        const scoreA = keywords.filter(k => textA.includes(k)).length;
        const scoreB = keywords.filter(k => textB.includes(k)).length;
        return scoreB - scoreA;
    });
    return matches.slice(0, 10).map((m: any) => m.narrative).join('\n---\n');
}

const PARENT_QUESTIONS = [
    // Resuming from 15
    "Can we pay the fees in installments or do we have to pay all at once?",
    "What are the rules regarding mobile phone usage in the campus and hostel?",
    "Is the campus strictly ragging-free? What measures are taken?",
    "Are there separate hostels for first-year students to prevent interaction with seniors?",
    "When do the admissions for the next academic year start?",
    "Does the college provide any training for competitive exams like GATE or GRE?"
];

async function runTest() {
    console.log("👨‍👩‍👦 AURA RESILIENT TEST - PART 2 (RESUMPTION)");
    console.log("--------------------------------------------------");

    for (let i = 0; i < PARENT_QUESTIONS.length; i++) {
        const question = PARENT_QUESTIONS[i];
        console.log(`\nQuestion ${i+15}: ${question}`); // Offset by 14
        
        try {
            const context = await localRetrieve(question);
            const { text } = await generateText({
                model: CHAT_MODEL,
                system: "You are Aura, the expert Digital Assistant for MSAJCE. Answer as a parent's guide.",
                prompt: `Context:\n${context}\n\nQuestion: ${question}`
            });
            
            console.log("--------------------------------------------------");
            console.log(text);
            console.log("--------------------------------------------------");
            await new Promise(r => setTimeout(r, 2000));
        } catch (error: any) {
            console.error(`Error:`, error.message);
        }
    }
}

runTest();
