import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import { performRetrieval } from '../lib/rag/engine/retrieve';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { glob } from 'glob';

// Evaluation LLM (using Groq for speed)
const groq = createOpenAI({
    apiKey: (process.env.GROQ_API_KEY || '').trim(),
    baseURL: 'https://api.groq.com/openai/v1'
});
const EVAL_MODEL = groq('llama-3.3-70b-versatile');

async function massAudit() {
    console.log("🚀 INITIALIZING MASSIVE RAGAS-STYLE AUDIT (100+ QUESTIONS)...");

    const cleaningZone = path.resolve(process.cwd(), 'cleaning_zone');
    const files = await glob('**/*.md', { cwd: cleaningZone });
    
    console.log(`📝 Sampling from ${files.length} domain files...`);

    // 1. GENERATE TEST SET (100 Questions)
    const testSet: { question: string; source: string; category: string }[] = [];
    const sampleSize = 100;
    
    // Mix in some hardcoded critical questions
    const criticalBase = [
        "What is the AR7 bus driver mobile number?",
        "Who is the current Principal of MSAJCE?",
        "What is the IT department head name?",
        "Tell me about the 2024-2028 batch IT mentor Ram.",
        "What are the fees for management quota?",
        "How many buses are available in AR series?",
        "What are the library timings?",
        "Tell me about the chemical engineering lab equipments.",
        "What is the college vision statement?",
        "Who is the founder of Mohamed Sathak A.J. College?"
    ];
    
    criticalBase.forEach(q => testSet.push({ question: q, source: 'domain_manual', category: 'CRITICAL' }));

    // Generate remaining questions from random file samples
    for (let i = 0; i < sampleSize - criticalBase.length; i++) {
        const randomFile = files[Math.floor(Math.random() * files.length)];
        const content = fs.readFileSync(path.join(cleaningZone, randomFile), 'utf-8').substring(0, 1000);
        
        try {
            const { text } = await generateText({
                model: EVAL_MODEL,
                system: "Question Generator. Create a single factual question based on the provided text. Return ONLY the question string.",
                prompt: `Context:\n${content}`
            });
            testSet.push({ 
                question: text.trim(), 
                source: randomFile, 
                category: path.dirname(randomFile) 
            });
            if (i % 20 === 0) console.log(`✍️ Generated ${testSet.length} questions...`);
        } catch { /* skip failed generations */ }
    }

    console.log(`🏁 Test Set Ready (${testSet.length} questions). Starting Execution...`);

    // 2. RUN AUDIT & EVALUATE
    const results = [];
    let passCount = 0;
    let dataMissingCount = 0;

    for (let i = 0; i < testSet.length; i++) {
        const item = testSet[i];
        process.stdout.write(`[\r Query ${i+1}/${testSet.length}]: ${item.question.substring(0, 50)}...    `);
        
        const { answer, reliability, metadata } = await performRetrieval(item.question);
        
        // 3. RAGAS-STYLE EVALUATION (LLM as Judge)
        let evalResult = { score: 0, reasoning: "Pending" };
        try {
            const { text } = await generateText({
                model: EVAL_MODEL,
                system: "RAG Evaluation Judge. Rate the answer on Relevancy and Faithfulness. 0 = Failed/No Info, 1 = Partial, 2 = Correct but incomplete, 5 = Perfect and helpful. Return JSON with 'score' and 'reasoning'.",
                prompt: `Question: ${item.question}\nAnswer: ${answer}`
            });
            evalResult = JSON.parse(text.replace(/```json|```/g, '').trim());
        } catch { evalResult = { score: answer.includes("don't have") ? 0 : 3, reasoning: "LLM Judge Failed" }; }

        if (evalResult.score >= 4) passCount++;
        if (answer.toLowerCase().includes("don't have info") || answer.toLowerCase().includes("not mentioned")) {
            dataMissingCount++;
        }

        results.push({
            ...item,
            aura_answer: answer,
            reliability,
            metadata,
            eval_score: evalResult.score,
            eval_reasoning: evalResult.reasoning
        });
    }

    // 4. SAVE & REPORT
    const finalReport = {
        timestamp: new Date().toISOString(),
        total_questions: testSet.length,
        pass_rate: (passCount / testSet.length) * 100 + "%",
        data_missing_reports: dataMissingCount,
        results
    };

    if (!fs.existsSync('audit_reports')) fs.mkdirSync('audit_reports');
    fs.writeFileSync('audit_reports/massive_audit_100.json', JSON.stringify(finalReport, null, 2));

    console.log("\n\n✅ MASS AUDIT COMPLETED!");
    console.log(`📊 Pass Rate (Score 4-5): ${finalReport.pass_rate}`);
    console.log(`⚠️ Data Missing Queries: ${dataMissingCount}`);
    console.log(`📂 Report saved to audit_reports/massive_audit_100.json`);
}

massAudit().catch(console.error);
