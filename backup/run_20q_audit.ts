import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { performRetrieval } from '../lib/rag/engine/retrieve';
import fs from 'fs';

const testQuestions = [
    "Who is the principal of MSAJCE and what is his email?",
    "Tell me about the IT department intake and head of department.",
    "Which bus routes go to Tambaram?",
    "What are the mandatory disclosures for the college?",
    "Tell me about the library facilities.",
    "Who is Ramanathan S and what did he build?",
    "What is the address of the college?",
    "What are the courses offered in ME?",
    "Is there a hostel for girls?",
    "Tell me about the placement cell achievements.",
    "What is SIPCOT IT Park and how does it relate to the college?",
    "Tell me about the Computer Science engineering department.",
    "What are the events conducted by the EEE department?",
    "Who are the governing council members?",
    "What is the vision and mission of MSAJCE?",
    "Tell me about the laboratory facilities in the Chemical engineering department.",
    "How can I reach the college from Chennai Central?",
    "What are the scholarship options available?",
    "Tell me about the sports facilities.",
    "How do I apply for admission in 2026?"
];

async function run20QuestionAudit() {
    console.log("🚀 STARTING ADVANCED RAG 20-QUESTION AUDIT...");
    const results = [];

    for (const q of testQuestions) {
        console.log(`\n🔎 [Query]: ${q}`);
        const { answer, reliability, metadata } = await performRetrieval(q);
        console.log(`✨ [Aura]: ${answer.substring(0, 100)}...`);
        
        results.push({
            question: q,
            answer: answer,
            reliability: reliability,
            strategy: metadata?.technique || 'Basic'
        });
    }

    if (!fs.existsSync('production_data')) {
        fs.mkdirSync('production_data');
    }
    fs.writeFileSync('production_data/aura_20q_audit_results.json', JSON.stringify(results, null, 2));
    console.log("\n✅ Audit Complete. Results saved to production_data/aura_20q_audit_results.json");
}

run20QuestionAudit();
