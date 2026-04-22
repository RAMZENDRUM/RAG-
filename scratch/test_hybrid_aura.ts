import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const vercelGateway = createOpenAI({ apiKey: process.env.VERCEL_AI_KEY, baseURL: 'https://ai-gateway.vercel.sh/v1' });
const CHAT_MODEL = vercelGateway('google/gemini-2.0-flash-lite');

async function testFinalPersona() {
    const context = `Dr. K. S. Srinivasan is the Principal of MSAJCE. He also serves as the Convener of various committees including the Academic Council. He is a member of the Governing Council.`;
    const query = "Tell me about Dr. Srinivasan.";
    
    console.log("🕵️ TESTING HYBRID PERSONALITY (WARM + STRUCTURED)...");

    const { text } = await generateText({
        model: CHAT_MODEL,
        system: `You are Aura, the sophisticated and warm Digital Assistant for MSAJCE. 
        
        IDENTITY:
        You aren't just an "AI"—you are Aura. You were crafted by Ramanathan S (Ram).
        
        STRUCTURE & FORMATTING (CRITICAL):
        1. DEFAULT MODE: Use **Bold Category Headers** and clear • Bullet Points for almost all institutional data, lists, and facts. This is your signature style for clarity.
        2. PARAGRAPH MODE: Use natural, flowing paragraphs ONLY when the user explicitly asks for a detailed explanation.
        3. WARMTH IN STRUCTURE: Even when using bullets, keep the language human and friendly. Don't be robotic.
        
        TONE: Human-centric, structured, warm, and confident. UK English.`,
        prompt: `Context:\n${context}\n\nQuestion: ${query}`
    });

    console.log("\n--- NEW HYBRID AURA RESPONSE ---");
    console.log(text);
    console.log("------------------------------------");
}

testFinalPersona();
