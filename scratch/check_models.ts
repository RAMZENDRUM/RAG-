import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

async function check() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const client = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // We'll use the fetch method to list models directly as the SDK might hide them
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await res.json();
    console.log("💎 AVAILABLE MODELS:", JSON.stringify(data, null, 2));
}

check();
