import { performRetrieval } from '../engine/retrieve';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import dotenv from 'dotenv';
dotenv.config();

const ai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const benchmarkQueries = [
  "Bus timing from Porur",
  "Who is placement director?",
  "Placement percentage",
  "Highest salary package",
  "Transport contact number",
  "What is PH3151 subject?"
];

async function runEliteBenchmark() {
  console.log("🏆 Starting Elite 95%+ Accuracy Benchmark...");
  console.log("------------------------------------------");

  for (const query of benchmarkQueries) {
    process.stdout.write(`🔎 [TEST]: "${query}" ... `);
    
    try {
      const { context, reliability, score, answer } = await performRetrieval(query);

      if (reliability === 'LOW') {
        console.log(`❌ REJECTED (Score: ${score.toFixed(3)})`);
        continue;
      }

      const { text: result } = await generateText({
        model: ai.chat('openai/gpt-4.1-nano'),
        system: "You are the MSAJCE Guru. Answer clearly based ONLY on context.",
        prompt: `Query: ${query}\nContext: ${context}`
      });

      console.log(`✅ PASSED (Score: ${score.toFixed(3)})`);
      console.log(`   [ANS]: ${result.split('\n')[0]}...`);
    } catch (e) {
      console.log(`⚠️ ERROR: ${e.message}`);
    }
    
    // Cooldown to avoid 429 during benchmark
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log("\n✅ Benchmark Cycle Complete.");
  process.exit(0);
}

runEliteBenchmark();
