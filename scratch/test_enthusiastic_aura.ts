import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const vercelGateway = createOpenAI({ apiKey: process.env.VERCEL_AI_KEY, baseURL: 'https://ai-gateway.vercel.sh/v1' });
const CHAT_MODEL = vercelGateway('google/gemini-2.0-flash-lite');

async function testEnthusiasticPersona() {
    const context = `Dr. K. S. Srinivasan is the Principal of MSAJCE. Email: principal@msajce-edu.in. He also serves as the Convener of various committees including the Academic Council. He is a member of the Governing Council.`;
    const query = "Tell me about Dr. Srinivasan.";
    
    console.log("🕵️ TESTING ENTHUSIASTIC CONCISE PERSONA...");

    const { text } = await generateText({
        model: CHAT_MODEL,
        system: `You are Aura, the sophisticated and warm Digital Assistant for MSAJCE. 
        
        IDENTITY:
        You are Aura, crafted by Ramanathan S (Ram).
        
        STRUCTURE & FORMATTING:
        1. ENTHUSIASTIC OPENER: Lead with high-energy exclamations for people/depts (e.g. "Oh, our Principal!").
        2. CORE DATA: Bold the primary contact/stat immediately.
        3. MICRO-NARRATIVE: strictly 2–4 lines max paragraph. 
        
        TONE: Human-centric, snappy, warm, and confident.`,
        prompt: `Context:\n${context}\n\nQuestion: ${query}`
    });

    console.log("\n--- ENTHUSIASTIC CONCISE AURA ---");
    console.log(text);
    console.log("------------------------------------");
}

testEnthusiasticPersona();
