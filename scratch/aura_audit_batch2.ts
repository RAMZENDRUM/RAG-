import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

// Rotating to VERCEL_AI_KEY_3 for this new batch of 20
const vercelGateway = createOpenAI({ apiKey: process.env.VERCEL_AI_KEY_3, baseURL: 'https://ai-gateway.vercel.sh/v1' });
const CHAT_MODEL = vercelGateway('google/gemini-2.0-flash-lite');

// Load Local Memory
const MEMORY_PATH = path.resolve(__dirname, '../live_brain/aura_active_memory.json');
const activeMemory = JSON.parse(fs.readFileSync(MEMORY_PATH, 'utf-8'));

async function localRetrieve(query: string) {
    const keywords = query.toLowerCase().split(' ').filter(w => w.length > 3);
    const matches = activeMemory.filter((item: any) => {
        const text = (JSON.stringify(item)).toLowerCase();
        return keywords.some(k => text.includes(k));
    });
    matches.sort((a: any, b: any) => {
        const textA = (JSON.stringify(a)).toLowerCase();
        const textB = (JSON.stringify(b)).toLowerCase();
        const scoreA = keywords.filter(k => textA.includes(k)).length;
        const scoreB = keywords.filter(k => textB.includes(k)).length;
        return scoreB - scoreA;
    });
    return matches.slice(0, 10).map((m: any) => m.narrative).join('\n---\n');
}

const NEW_TEST_QUESTIONS = [
    "Who exactly developed you, Aura? And what tech stack are you running on?",
    "What are the specific subjects in the 5th semester for the B.E. AI & Data Science course?",
    "Is there an incubation center on campus for student startups? Tell me about its facilities.",
    "Does the college have a canteen for day scholars? What are its operating hours?",
    "Can you tell me about the vision and mission of the Computer Science department?",
    "How many faculty members are currently in the Mechanical Engineering department?",
    "What were the placement statistics and highest package for the B.Tech IT department last year?",
    "What are the rules for using the college library? Can we borrow books for the whole semester?",
    "Are there any research labs dedicated to Robotics, IoT, or AI on campus?",
    "Tell me about the 'Zest' cultural event. What activities are usually conducted?",
    "What is the procedure for a student to apply for a Bonafide certificate or TC?",
    "List all the active student clubs (like NSS, YRC, Sports) available at MSAJCE.",
    "What are the timings for the college buses from the Siruseri SIPCOT region?",
    "Is there a sports day conducted every year? What track and indoor games are included?",
    "Who is the current Chairman and Secretary of the Mohamed Sathak Trust?",
    "Can you provide the contact email and phone number for the Placement Officer?",
    "What are the key differences between the R2017 and R2021 regulations for the EEE department?",
    "Are there any international collaborations or MoUs signed for student exchange programs?",
    "What is the vision of the SIIF incubation foundation and how can I apply for a grant?",
    "Which department currently has the highest number of PhD holders among their faculty?"
];

async function runTest() {
    console.log("🕵️ AURA INTELLIGENCE AUDIT - BATCH 2 (TECH & ADMIN)");
    console.log("--------------------------------------------------");

    for (let i = 0; i < NEW_TEST_QUESTIONS.length; i++) {
        const question = NEW_TEST_QUESTIONS[i];
        console.log(`\nAudit Question ${i+1}: ${question}`);
        
        try {
            const context = await localRetrieve(question);
            const { text } = await generateText({
                model: CHAT_MODEL,
                system: "You are Aura, the elite Digital Assistant for MSAJCE. Provide data-backed, professional, and friendly answers.",
                prompt: `Context:\n${context}\n\nQuestion: ${question}`
            });
            
            console.log("--------------------------------------------------");
            console.log(text);
            console.log("--------------------------------------------------");
            // 3s delay to ensure stability
            await new Promise(r => setTimeout(r, 3000));
        } catch (error: any) {
            console.error(`Error:`, error.message);
        }
    }
}

runTest();
