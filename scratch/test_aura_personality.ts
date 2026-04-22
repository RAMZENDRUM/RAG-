import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { performRetrieval } from '../lib/rag/engine/retrieve';

async function testPersonality() {
    console.log("🕵️ TESTING AURA PERSONALITY UPDATE...");
    const query = "Tell me about Dr. Srinivasan.";
    
    try {
        const { answer } = await performRetrieval(query);
        console.log("\n--- AURA RESPONSE ---");
        console.log(answer);
        console.log("----------------------");
    } catch (error: any) {
        console.error("Test Error:", error.message);
    }
}

testPersonality();
