import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

// Providers
const vercelGateway = createOpenAI({ apiKey: process.env.VERCEL_AI_KEY, baseURL: 'https://ai-gateway.vercel.sh/v1' });
const CHAT_MODEL = vercelGateway('google/gemini-2.0-flash-lite');

// Load Local Memory
const MEMORY_PATH = path.resolve(__dirname, '../live_brain/aura_active_memory.json');
const activeMemory = JSON.parse(fs.readFileSync(MEMORY_PATH, 'utf-8'));

async function localRetrieve(query: string) {
    // Simple keyword search as fallback
    const keywords = query.toLowerCase().split(' ').filter(w => w.length > 3);
    const matches = activeMemory.filter((item: any) => {
        const text = (item.narrative || '').toLowerCase();
        return keywords.some(k => text.includes(k));
    });
    
    // Sort by number of keyword matches
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
    "What is the fee structure for the B.E. Computer Science department for this year?",
    "Are the hostels safe for my son? What kind of security do you have?",
    "What are the food facilities in the hostel mess?",
    "How far is the college from the nearest railway station?",
    "Can my son get a scholarship if he has good marks in his 12th exams?",
    "Is there a bus facility from Tambaram for students?",
    "What are the job placement chances for students? Which big companies come for recruitment?",
    "What is the total cost including hostel and tuition for a four-year engineering course?",
    "Are there any extracurricular activities like sports or music for the students?",
    "Who can we contact if there is an emergency with our child at the college?",
    "Does the college help with internships during the third year?",
    "What are the library timings? Can students stay late to study?",
    "What is the student-to-teacher ratio? Will my son get individual attention?",
    "Are there medical facilities or a doctor on campus for students?",
    "Can we pay the fees in installments or do we have to pay all at once?",
    "What are the rules regarding mobile phone usage in the campus and hostel?",
    "Is the campus strictly ragging-free? What measures are taken?",
    "Are there separate hostels for first-year students to prevent interaction with seniors?",
    "When do the admissions for the next academic year start?",
    "Does the college provide any training for competitive exams like GATE or GRE?"
];

async function runTest() {
    console.log("👨‍👩‍👦 AURA RESILIENT TEST GAUNTLET (LOCAL MEMORY MODE)");
    console.log("--------------------------------------------------");

    for (let i = 0; i < PARENT_QUESTIONS.length; i++) {
        const question = PARENT_QUESTIONS[i];
        console.log(`\nQuestion ${i+1}: ${question}`);
        
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
            await new Promise(r => setTimeout(r, 1000));
        } catch (error: any) {
            console.error(`Error:`, error.message);
        }
    }
}

runTest();
