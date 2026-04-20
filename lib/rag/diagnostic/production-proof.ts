import { generateText, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { QdrantClient } from '@qdrant/js-client-rest';
import dotenv from 'dotenv';
dotenv.config();

const ai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const q = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

async function demonstrateProductionFlow() {
  const query = "bus timing from porur";
  
  console.log("--- 🧠 1. QUERY ENHANCEMENT ---");
  const { text: enhanced } = await generateText({
    model: ai.chat('openai/gpt-4o-mini'),
    prompt: `Transform this query for a high-accuracy RAG system: "${query}". Goal: Find exact route, timing, and stops.`
  });
  console.log(`Enhanced: ${enhanced}`);

  console.log("\n--- 🔍 2. HYBRID SEARCH (Simulated) ---");
  const { embedding } = await embed({
    model: ai.embedding('openai/text-embedding-3-small'),
    value: enhanced,
  });

  const results = await q.search('msajce_elite_knowledge', {
    vector: embedding,
    limit: 10,
    with_payload: true
  });

  results.forEach((r, i) => {
    console.log(`[${i}] Score: ${r.score.toFixed(3)} | Chnk: ${r.payload?.content.substring(0, 60)}...`);
  });

  console.log("\n--- 📊 3. STRICT RERANKER OUTPUT (Requested) ---");
  const { text: scores } = await generateText({
    model: ai.chat('openai/gpt-4o-mini'),
    system: `Score each chunk from 0 to 1 based on relevance to query: "${query}". 
    CRITERIA:
    - 0.9+: Explicitly mentions Porur and Bus timing.
    - 0.5: Mentions Porur or Bus routes generally.
    - 0.1: Irrelevant context.
    Return ONLY scores. Format: Chunk #ID - [score]`,
    prompt: results.map((r, i) => `Chunk #${i}: ${r.payload?.content}`).join('\n')
  });
  console.log(scores);

  console.log("\n--- ❌ 4. FAILED QUERY LOG (Judge Rejection) ---");
  const failedQuery = "who is principal phone number?";
  // Simulated Judge Failure
  const mockJudgeResult = {
    score: 0.42,
    status: "FAIL",
    diagnosis: "Similarity is 0.42 (below 0.65 threshold). Context mentions Principal but NO phone number found.",
    next_action: "REWRITE_QUERY"
  };
  console.log(JSON.stringify(mockJudgeResult, null, 2));

  console.log("\n--- ✅ 5. FINAL PRODUCTION ANSWER ---");
  const { text: finalAnswer } = await generateText({
    model: ai.chat('openai/gpt-4o-mini'),
    system: "Answer ONLY using provided context. Keep exact timings and numbering. Format with bullet points.",
    prompt: `Question: ${query}\nContext: ${results.slice(0,2).map(r => r.payload?.content).join('\n')}`
  });
  console.log(finalAnswer);
}

demonstrateProductionFlow();
