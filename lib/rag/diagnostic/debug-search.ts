import postgres from 'postgres';
import dotenv from 'dotenv';
import { embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

dotenv.config();
const sql = postgres(process.env.DATABASE_URL!);
const ai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

async function debugSearch() {
    const query = "who is the principal";
    console.log(`🔎 Debugging Query: "${query}"`);

    const { embedding } = await embed({
      model: ai.embedding('openai/text-embedding-3-small'),
      value: query,
    });

    const matches = await sql`
        SELECT content, similarity
        FROM hybrid_search(${`[${embedding.join(',')}]`}, ${query}, 0.1, 5)
    `;

    console.log("📊 Top Matches in Supabase:");
    matches.forEach((m, i) => {
        console.log(`[${i+1}] Score: ${m.similarity.toFixed(4)} | Content: ${m.content.substring(0, 100)}...`);
    });
}

debugSearch();
