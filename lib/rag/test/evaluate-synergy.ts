import { performRetrieval } from '../engine/retrieve';
import fs from 'fs';

const TEST_QUESTIONS = [
  // LAYER 1: PRIORITY HIGH (ADMISSIONS/FEES/HOSTELS)
  "What are the hostel fees for the current academic year?",
  "How many rooms are available in the girls' hostel?",
  "What is the distance of the college from the Chennai airport?",
  "Can you provide the contact details for admission inquiries?",
  "Is there a transport facility available for day scholars?",
  
  // LAYER 2: ACADEMIC CORE (SYLLABI/REGULATIONS)
  "What are the total credits for the B.E. EEE program under Regulation 2021?",
  "List the core courses for Semester 4 Electrical and Electronics Engineering.",
  "What is the passing mark requirement as per Regulation 2021?",
  "How many credits are allocated for the final year project?",
  "What subjects are covered in the Semester 1 Information Technology curriculum?",

  // LAYER 3: SUBJECT MASTERY (LAB MANUALS/LESSON PLANS)
  "What are the objectives of the Power Electronics laboratory?",
  "Can you explain the experimental setup for the Strength of Materials lab?",
  "What is the lesson plan for 'Artificial Intelligence' in the CSE department?",
  "List the equipment available in the VLSI Design laboratory.",
  "Which software is used for the Computer Networks lab experiments?",

  // LAYER 4: INSTITUTIONAL LIFE (REPORTS/EVENTS/NSS)
  "When was the last NSS camp conducted and what were the activities?",
  "Provide a summary of the Cultural Fest 'Zest' from last year.",
  "What are the placement statistics for the Mechanical department for 2023?",
  "Can I see the report on the latest Industrial Visit to L&T?",
  "What social initiatives has the college taken through the YRC cell?",

  // STRESS TESTS (CROSS-DEPARTMENTAL/COMPLEX)
  "Is the syllabus for Semester 5 IT different between R2017 and R2021?",
  "Who is the current management authority mentioned in the Mandatory Disclosure?",
  "What is the student-to-faculty ratio according to the latest institutional records?",
  "Does the college provide separate Wi-Fi facilities for hostels?",
  "What are the rules regarding attendance for writing the end-semester exams?",

  // THE SUPREME 50 COMPLETIONS
  "What are the scholarship details for SC/ST students?",
  "List the faculty members in the Department of Computer Science.",
  "What are the rules for lateral entry admissions?",
  "Provide the list of sports facilities in the campus.",
  "What is the mission of the Department of Mechanical Engineering?",
  "How many credits are required for the AI&DS program?",
  "List the bus routes covering the Tambaram region.",
  "What are the timings for the college library?",
  "What is the vision of the SIIF incubation foundation?",
  "What are the eligibility criteria for the M.E. Structural Engineering program?",
  "Who is the lead for the Incubation Cell?",
  "When was the college established and who is the founder?"
];

async function runEvaluation() {
  console.log("🏁 STARTING GLOBAL INTELLIGENCE AUDIT (50-QUESTION GAUNTLET)...");
  const results = [];

  for (let i = 0; i < TEST_QUESTIONS.length; i++) {
    const query = TEST_QUESTIONS[i];
    console.log(`\n❓ [Q${i+1}/50]: ${query}`);
    
    try {
      const start = Date.now();
      const response = await performRetrieval(query);
      const duration = Date.now() - start;

      console.log(`✨ Aura Answered [${duration}ms] | Reliability: ${response.reliability}`);
      console.log(`🔗 Sources: ${response.sources.join(', ')}`);
      
      results.push({
        question: query,
        answer: response.answer,
        reliability: response.reliability,
        sources: response.sources,
        latency: duration,
        score: response.score
      });
      
      // GLACIAL COOLING: 30s delay to bypass cloud rate limits during self-healing
      console.log("❄️ Glacial cooling for 30 seconds...");
      await new Promise(r => setTimeout(r, 30000));
    } catch (err: any) {
      console.error(`❌ Evaluation Error: ${err.message}`);
    }
  }

  const reportPath = 'd:/.gemini/RAG college/tools_audit/intelligence_audit_report.json';
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n🏆 AUDIT COMPLETE! Final report saved to: ${reportPath}`);
}

runEvaluation();
