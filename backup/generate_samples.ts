import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const openai = createOpenAI({ 
    apiKey: process.env.VERCEL_AI_KEY,
    baseURL: 'https://ai-gateway.vercel.sh/v1' 
});
const model = openai('gpt-4o-mini');

const ADMISSION_RAW = `
### Programmes Offered & Seats Available (UG)
* Civil Engineering: 30 Seats (15 Govt, 15 Mgmt)
* Computer Science & Engineering: 60 Seats (30 Govt, 30 Mgmt)
* Electronics & Communication: 60 Seats (30 Govt, 30 Mgmt)
* Artificial Intelligence & Data Science: 30 Seats (15 Govt, 15 Mgmt)
Placement Contact: Dr.K.S.Srinivasan (Principal) - 9150575066
`;

const AR7_RAW = `
SNo: 5 | Bus Route: AR 7 - CHUNAMBEDU | Time: 5.25 AM | Schedule: https://www.msajce-edu.in/images/transport/AR7.pdf
`;

async function generateSample(name: string, raw: string, category: string) {
    console.log(`📡 Re-Synthesizing ${name} with Indexable Layer...`);
    
    const { text } = await generateText({
        model,
        system: `You are a Tier-1 Data Architect for Aura.
        
        TASK: Convert RAW data into a strictly structured Markdown file optimized for Hybrid RAG.
        
        REQUIRED STRUCTURE:
        1. NARRATIVE PROSE: 500-700 characters of elite UK English. Warm, professional. NO tables.
        2. EXACT DATA BLOCK: JSON block containing all raw details.
        3. INDEXABLE METADATA BLOCK: JSON block for Qdrant payload filters. Must include "type", "category", and specific "keys" (e.g. route_id, intake_status).
        
        TONE: Concierge-grade. Professional.`,
        prompt: `RAW DATA:\n${raw}`
    });

    const path = `organized_vault/cleaned/high_priority/${category}/${name}.md`;
    fs.writeFileSync(path, text);
}

async function run() {
    await generateSample('AR7', AR7_RAW, 'transport');
    await generateSample('admission_cleaned', ADMISSION_RAW, 'admission');
    console.log('✅ Prototypes Ready.');
}

run();
