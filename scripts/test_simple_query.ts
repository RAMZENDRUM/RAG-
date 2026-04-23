import dotenv from 'dotenv';
dotenv.config();
import { performRetrieval } from '../lib/rag/engine/retrieve';

async function test() {
    console.log("🔍 Querying AR7 driver...");
    const res = await performRetrieval('need ar7 bus driver number');
    console.log("\n--- RESPONSE ---");
    console.log(res.answer);
    console.log("----------------\n");
}

test().catch(console.error);
