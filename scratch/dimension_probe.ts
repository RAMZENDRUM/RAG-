import dotenv from 'dotenv';
dotenv.config();
import { getQdrant, COLLECTION_NAME } from '../lib/rag/engine/qdrant';

async function probe() {
    const client = getQdrant();
    console.log("🔍 PROBING LATEST NEURAL DEPTH...");
    
    // Scroll to get the 5 most recent points
    const result = await client.scroll(COLLECTION_NAME, {
        limit: 5,
        with_vector: true
    });

    if (result.points.length === 0) {
        console.log("❌ NO POINTS FOUND IN VAULT.");
        return;
    }

    result.points.forEach((point, i) => {
        const vector = point.vector;
        if (Array.isArray(vector)) {
            console.log(`📦 SAMPLE [${i+1}]: Dim=${vector.length} | Source=${point.payload?.source || 'Unknown'}`);
        }
    });

    // Final verdict
    const dimensions = result.points.map(p => (p.vector as number[]).length);
    const all1536 = dimensions.every(d => d === 1536);

    if (all1536) {
        console.log("\n🎯 VERDICT: ALL SAMPLES ARE PERFECT 1536-D.");
    } else {
        console.log("\n⚠️ WARNING: ALIGNMENT SHIFT DETECTED.");
    }
}

probe();
