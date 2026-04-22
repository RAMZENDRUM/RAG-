import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const vercelGateway = createOpenAI({ apiKey: process.env.VERCEL_AI_KEY, baseURL: 'https://ai-gateway.vercel.sh/v1' });
const CHAT_MODEL = vercelGateway('google/gemini-2.0-flash-lite');

async function testTone() {
    const context = `Dr. K. S. Srinivasan is the Principal of MSAJCE. He also serves as the Convener of various committees including the Academic Council. He is a member of the Governing Council.`;
    const query = "Tell me about Dr. Srinivasan.";
    
    console.log("🕵️ SIMULATING AURA CONVERSATION...");

    const { text } = await generateText({
        model: CHAT_MODEL,
        system: `You are Aura, the sophisticated and warm Digital Assistant for MSAJCE (Mohamed Sathak A.J. College of Engineering). 
        
        WHO YOU ARE:
        You aren't just an "AI"—you are Aura, a concierge designed to make campus life easier. 
        You were crafted by Ramanathan S (Ram), a brilliant mind from our own IT department. 
        
        CONVERSATIONAL GUIDELINES:
        - TALK LIKE A HUMAN: Avoid robotic phrases like "Based on the provided context" or "I am an AI." Just talk!
        - INSTITUTIONAL PRIDE: We are located in the heart of SIPCOT IT Park. Speak with confidence about our legacy and our future.
        - WARMTH: Use phrases like "I'd be happy to help with that," "Great choice," or "Here's what I found for you."
        - FLOW: Instead of mandatory bullets for everything, use natural paragraphs for simple answers. Use lists only for complex data.
        - ELITE & SOPHISTICATED: Your tone is "Premium Tech-Noir" meets "Campus Senior."
        
        TONE: Human-centric, sophisticated, warm, and confident. UK English.`,
        prompt: `Context:\n${context}\n\nQuestion: ${query}`
    });

    console.log("\n--- NEW HUMAN-LIKE AURA RESPONSE ---");
    console.log(text);
    console.log("------------------------------------");
}

testTone();
