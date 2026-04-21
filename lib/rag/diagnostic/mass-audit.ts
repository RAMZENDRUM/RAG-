import * as fs from 'fs-extra';
import * as path from 'path';
import { performRetrieval } from '../engine/retrieve';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import dotenv from 'dotenv';
dotenv.config();

const MASTER_FILE = 'd:/.gemini/RAG college/production_data/normalized_json/elite_knowledge_base.json';
const REPORT_FILE = 'd:/.gemini/RAG college/production_data/mass_audit_report.json';

const ai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

async function runMassAudit() {
  console.log("🕵️ Starting 50-Question Mass Audit...");
  
  const eliteUnits = await fs.readJson(MASTER_FILE);
  
  // 1. GENERATE TEST BATTERY (Randomly sampling the vault)
  console.log("📝 Generating Synthetic Questions from Vault...");
  const samples = eliteUnits.sort(() => 0.5 - Math.random()).slice(0, 10); // Testing 10 high-impact ones
  
  const { text: batchJson } = await generateText({
    model: ai.chat('openai/gpt-4o'),
    system: "Generate a JSON array of 10 questions based on the provided context units. Each object should have 'question' and 'ground_truth'. Focus on specific facts.",
    prompt: JSON.stringify(samples)
  });

  const cleanedBatch = batchJson.replace(/```json|```/g, '').trim();
  const battery = JSON.parse(cleanedBatch);
  let totalScore = 0;
  let results: any[] = [];

  // 2. RUN TESTS
  for (const [idx, test] of battery.entries()) {
    console.log(`\n🧪 Test [${idx + 1}/${battery.length}]: ${test.question}`);
    
    const start = Date.now();
    const retrievalResult = await performRetrieval(test.question);
    
    if (!retrievalResult || !retrievalResult.answer) {
        console.error("⚠️ Retrieval crashed or returned null.");
        continue;
    }

    const { answer, reliability, score } = retrievalResult;
    const latency = Date.now() - start;

    // 3. GRADE FAITHFULNESS
    const { text: grade } = await generateText({
        model: ai.chat('openai/gpt-4o'),
        system: "Compare the ANSWER to the GROUND_TRUTH. Output 'CORRECT' if the core fact is present and accurate. Output 'INCORRECT' if the core fact is wrong or missing. (Helpful extra info is okay as long as the truth is there). Provide a 1-sentence reason.",
        prompt: `Ground Truth: ${test.ground_truth}\n\nAura's Answer: ${answer}`
    });

    const isCorrect = grade.includes('CORRECT');
    if (isCorrect) totalScore++;

    results.push({
        ...test,
        aura_answer: answer,
        status: isCorrect ? '✅ PASS' : '❌ FAIL',
        reason: grade,
        latency: `${latency}ms`,
        score
    });

    console.log(`${isCorrect ? '✅' : '❌'} Result: ${grade}`);
    
    // COOL DOWN to prevent NVIDIA Rate Limits (10S for safety)
    await new Promise(res => setTimeout(res, 10000));
  }

  const accuracy = (totalScore / battery.length) * 100;
  
  const report = {
    timestamp: new Date().toISOString(),
    total_tests: battery.length,
    passed: totalScore,
    accuracy: `${accuracy.toFixed(1)}%`,
    details: results
  };

  await fs.writeJson(REPORT_FILE, report, { spaces: 2 });
  
  console.log(`\n🏆 MASS AUDIT FINISHED!`);
  console.log(`📊 Accuracy: ${accuracy.toFixed(1)}%`);
  console.log(`📍 Report: ${REPORT_FILE}`);
}

runMassAudit().catch(console.error);
