import postgres from 'postgres';
import { embed, generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL!);
const ai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

async function runDiagnostics() {
  console.log('--- DIAGNOSTIC START ---');

  // PART 1: Sample Data
  const samples = await sql`
    SELECT content, metadata, vector_dims(embedding) as dims 
    FROM documents 
    ORDER BY random() 
    LIMIT 5
  `;
  
  // PART 3 & 4 Trace Helper
  async function traceQuery(query: string) {
    const { embedding } = await embed({
      model: ai.embedding('openai/text-embedding-3-small'),
      value: query,
    });
    const vectorStr = `[${embedding.join(',')}]`;
    const hits = await sql`
      SELECT content, metadata, similarity
      FROM match_documents(${vectorStr}, 0.1, 10)
    `;
    return { query, embedding, hits };
  }

  // PART 6: Stats
  const stats = await sql`
    SELECT 
      AVG(length(content)) as avg_len,
      MIN(length(content)) as min_len,
      MAX(length(content)) as max_len
    FROM documents
  `;

  // RUN TRACES
  const placementTrace = await traceQuery("Who is the placement officer?");
  const busTrace = await traceQuery("Bus timing");

  // Format and output everything
  const report = {
    samples,
    stats: stats[0],
    traces: {
      placement: placementTrace,
      bus: busTrace
    }
  };

  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

runDiagnostics();
