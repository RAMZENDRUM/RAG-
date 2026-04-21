import * as fs from 'fs-extra';
import { performRetrieval } from '../engine/retrieve';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import dotenv from 'dotenv';
dotenv.config();

const ai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const PARENT_QUESTIONS = [
    { q: "Is the college campus safe for girl students?", gt: "The campus is safe with separate hostels for boys and girls and 24/7 security." },
    { q: "What are the hostel facilities available?", gt: "Separate hostels for boys and girls with all basic amenities and safe environment." },
    { q: "Which companies come for campus interviews?", gt: "Top companies like Cognizant, Infosys, Wipro, and TCS hire from MSAJCE." },
    { q: "Is there any bus facility for Porur area?", gt: "Yes, Bus Route AR 10 covers Porur, starting at 6:45 AM from Porur Roundana." },
    { q: "What is the dress code for students?", gt: "Students are expected to follow a formal/decent dress code as per institutional norms." },
    { q: "Who is the principal of the college?", gt: "Dr.K.S.Srinivasan is the Principal of MSAJCE." },
    { q: "Is there a library with digital books?", gt: "Yes, the library has over 37,000 volumes and digital access to IEEE/Springer journals." }
];

async function runParentAudit() {
  console.log("👪 Starting the 'Parental Trust' Audit...");
  
  let totalScore = 0;
  let results: any[] = [];

  for (const [idx, test] of PARENT_QUESTIONS.entries()) {
    console.log(`\n👨‍👩‍👧‍👦 Parent Question [${idx + 1}/${PARENT_QUESTIONS.length}]: ${test.q}`);
    
    // We use a longer timeout for the "Parent Audit" to ensure high-quality self-healing
    const { answer, reliability } = await performRetrieval(test.q);

    // GRADE
    const { text: grade } = await generateText({
        model: ai.chat('openai/gpt-4o'),
        system: "Evaluate if the response would satisfy a PARENT. Is it accurate and well-formatted? Output 'PASS' or 'FAIL' with a 1-sentence reason.",
        prompt: `Ground Truth: ${test.gt}\n\nAura's Answer: ${answer}`
    });

    const isPass = grade.includes('PASS');
    if (isPass) totalScore++;

    results.push({ q: test.q, status: isPass ? '✅' : '❌', reason: grade });
    console.log(`${isPass ? '✅' : '❌'} Result: ${grade}`);
    
    // 8 second delay to prevent rate limits
    await new Promise(res => setTimeout(res, 8000));
  }

  console.log(`\n🏆 PARENTAL AUDIT SCORE: ${(totalScore/PARENT_QUESTIONS.length * 100).toFixed(1)}%`);
}

runParentAudit().catch(console.error);
