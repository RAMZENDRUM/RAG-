import { createOpenAI } from '@ai-sdk/openai';
import { embed } from 'ai';
import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const hub = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const sql = postgres(process.env.DATABASE_URL!);

async function test() {
  console.log("🔍 Verifying Production Retrieval...");
  try {
    const { embedding } = await embed({
      model: hub.embedding('openai/text-embedding-3-small'),
      value: 'What is the seat intake for Civil Engineering?',
    });

    const vectorStr = `[${embedding.join(',')}]`;
    const res = await sql`
      SELECT content, similarity 
      FROM hybrid_search(${`[${embedding.join(',')}]`}, 'What is the seat intake for Civil Engineering?', 0.2, 2)
    `;
    
    console.log("Top Matches:");
    console.log(JSON.stringify(res, null, 2));
    
    if (res[0]?.content.includes('total intake of 30 seats')) {
      console.log("✅ Semantic Expansion Verified! Context is rich and readable.");
    } else {
      console.log("⚠️ Semantic Expansion not found in top match. Check logic.");
    }
    
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

test();
