import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

// Using VERCEL_AI_KEY_4 for the final 30-question gauntlet
const vercelGateway = createOpenAI({ apiKey: process.env.VERCEL_AI_KEY_4, baseURL: 'https://ai-gateway.vercel.sh/v1' });
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
    return matches.slice(0, 15).map((m: any) => m.narrative).join('\n---\n');
}

const FINAL_BATCH_QUESTIONS = [
    "What is the specific address of the college for courier purposes?",
    "Is there a Women's Empowerment Cell? What are its recent activities?",
    "Tell me about the Governing Council. Who are the external members from the industry?",
    "What are the rules for lateral entry into the 2nd year of Engineering?",
    "Can I pay my semester fees online using an app like GPay or PhonePe?",
    "Is there a gym facility in the boys' hostel? What are the timings?",
    "What is the procedure for a student to join the NSS unit of the college?",
    "Are there any collaborative programs with industry leaders for the Chemical Engineering department?",
    "What is the mission of the Department of Civil Engineering?",
    "Tell me about the library's digital resources. Do you have access to IEEE or Springer journals?",
    "Who is in charge of the YRC (Youth Red Cross) cell?",
    "What are the first aid and medical facilities available for day scholars during college hours?",
    "Can students participate in hackathons organized by internal incubation cells?",
    "What is the intake for M.E. Structural Engineering?",
    "Are there any specific dress code rules for students inside the campus?",
    "Tell me about the lab facilities for the EEE department. What specialized equipment do you have?",
    "How many buses do we have for the Tambaram route?",
    "Is there a grievance redressal cell for students? How can they submit a complaint?",
    "Who is the point of contact for the Alumni association?",
    "Does the college have any tie-ups with banks for educational loans?",
    "What cultural events are conducted during the Ramadan season?",
    "Can students stay in the labs after 5:00 PM for project work?",
    "What are the software tools provided in the CSE department's AI lab?",
    "Is there a specific internal assessment schedule for the odd semester?",
    "What is the role of the IIC (Institution's Innovation Council)?",
    "How can I apply for a merit-based scholarship from the Mohamed Sathak Trust?",
    "Are mobile phones allowed inside the examination hall?",
    "Who is the Placement Director for the current academic year?",
    "What is the 'Silent Aggression' design system used by your developer for other projects?",
    "What is your final advice for a student joining MSAJCE this year?"
];

async function runFinalTest() {
    console.log("🏅 AURA SUPREME AUDIT - FINAL BATCH (30 QUESTIONS)");
    console.log("--------------------------------------------------");

    for (let i = 0; i < FINAL_BATCH_QUESTIONS.length; i++) {
        const question = FINAL_BATCH_QUESTIONS[i];
        console.log(`\nAudit Question ${i+1}: ${question}`);
        
        try {
            const context = await localRetrieve(question);
            const { text } = await generateText({
                model: CHAT_MODEL,
                system: "You are Aura, the supreme Digital Assistant for MSAJCE. Provide data-driven, elite, and factual answers.",
                prompt: `Context:\n${context}\n\nQuestion: ${question}`
            });
            
            console.log("--------------------------------------------------");
            console.log(text);
            console.log("--------------------------------------------------");
            // 2s delay for stability
            await new Promise(r => setTimeout(r, 2000));
        } catch (error: any) {
            console.error(`Error:`, error.message);
        }
    }
}

runFinalTest();
