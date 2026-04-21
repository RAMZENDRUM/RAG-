import dotenv from 'dotenv';
dotenv.config();

import { getQdrant, COLLECTION_NAME } from './qdrant';
import { createOpenAI } from '@ai-sdk/openai';
import { embedMany } from 'ai';
import crypto from 'crypto';

const openai = createOpenAI({
    apiKey: process.env.VERCEL_AI_KEY,
    baseURL: 'https://ai-gateway.vercel.sh/v1'
});

const EMBED_MODEL = openai.embedding('text-embedding-3-small');

const transportFacts = [
    "AR 3 - UTHIRAMERUR: Departs at 5.50 AM. Route Schedule: https://www.msajce-edu.in/images/transport/AR3.pdf",
    "AR 4 - MOOLAKADAI: Departs at 6.10 AM. Route Schedule: https://www.msajce-edu.in/images/transport/AR4.pdf",
    "AR 5 - MMDA SCHOOL: Departs at 6.15 AM. Route Schedule: https://www.msajce-edu.in/images/transport/AR5.pdf",
    "AR 6 - ICF: Departs at 6.15 AM. Route Schedule: https://www.msajce-edu.in/images/transport/AR6.pdf",
    "AR 7 - CHUNAMBEDU: Departs at 5.25 AM. Route Schedule: https://www.msajce-edu.in/images/transport/AR7.pdf",
    "AR 8 - MANJAMBAKKAM: Departs at 5.50 AM. Route Schedule: https://www.msajce-edu.in/images/transport/AR8.pdf",
    "AR 9 - ENNORE: Departs at 6.15 AM. Route Schedule: https://www.msajce-edu.in/images/transport/AR9.pdf",
    "AR 10 - PORUR: Departs at 6.25 AM. Route Schedule: https://www.msajce-edu.in/images/transport/AR10.pdf",
    "R 22 - NEMILICHERY: Departs at 6.00 AM. Route Schedule: https://www.msajce-edu.in/images/transport/R22.pdf",
    "Developer Bio: Ramanathan S (Ram) is the Chief Architect and Developer of Aura. He is an IT professional and alumnus dedicated to social impact through AI at MSAJCE.",
    "Aura's Purpose: Aura is the Digital Assistant for Mohamed Sathak A. J. College of Engineering (MSAJCE), designed to provide high-fidelity academic and campus intelligence."
];

async function reSaturate() {
    const client = getQdrant();
    console.log("🚀 Re-Saturating Core Transport & Identity Facts...");

    const { embeddings } = await embedMany({ model: EMBED_MODEL, values: transportFacts });

    const points = transportFacts.map((content, i) => {
        const hash = crypto.createHash('md5').update(content).digest('hex');
        const id = `${hash.slice(0,8)}-${hash.slice(8,12)}-4${hash.slice(13,16)}-a${hash.slice(17,20)}-${hash.slice(20,32)}`;
        return {
            id,
            vector: embeddings[i],
            payload: { content, source: "priority_fix_v35.2", category: "transport_identity" }
        };
    });

    await client.upsert(COLLECTION_NAME, { wait: true, points });
    console.log("🏁 Re-Saturation Complete. AR7 and Ram are now high-priority atomic facts.");
}

reSaturate();
