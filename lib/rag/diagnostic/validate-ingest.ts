import postgres from 'postgres';
import { embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL!);
const ai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

async function validate() {
  console.log('--- VALIDATION STEP ---');
  const queries = [
    "Bus route AR-3 timing",
    "Who is transport contact?",
    "Placement percentage",
    "Bus from Porur"
  ];

  for (const q of queries) {
    const { embedding } = await embed({
      model: ai.embedding('openai/text-embedding-3-small'),
      value: q,
    });
    const vectorStr = `[${embedding.join(',')}]`;
    const hits = await sql`
      SELECT content, similarity
      FROM match_documents(${vectorStr}, 0.2, 3)
      ORDER BY similarity DESC
    `;
    console.log(`Query: "${q}"`);
    console.log(`Top Hit: "${hits[0]?.content.slice(0, 100)}..."`);
    console.log(`Similarity: ${hits[0]?.similarity}`);
    console.log('---');
  }
  process.exit(0);
}

validate();
