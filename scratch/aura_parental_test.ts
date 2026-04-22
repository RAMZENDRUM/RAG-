import dotenv from 'dotenv';
import path from 'path';
// Load .env from the root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { performRetrieval } from '../lib/rag/engine/retrieve';

const PARENT_QUESTIONS = [
    "What is the fee structure for the B.E. Computer Science department for this academic year?",
    "Are the hostels safe for my son? What kind of security measures are in place?",
    "What are the food facilities and menu in the hostel mess?",
    "How far is the college located from the nearest railway station or airport?",
    "Can my son get a scholarship if he has achieved high marks in his 12th board exams?",
    "Is there a transport/bus facility available from Tambaram or other parts of Chennai?",
    "What are the placement opportunities? Which major companies recruited from MSAJCE last year?",
    "What is the total estimated cost including hostel, tuition, and other fees for a 4-year course?",
    "Are there any extracurricular activities, sports, or clubs for students to join?",
    "Who is the point of contact in case of an emergency regarding my son's health or safety?",
    "Does the college assist students in finding internships during their third year?",
    "What are the library timings? Is it accessible for students staying in the hostel at night?",
    "What is the student-to-faculty ratio? Will my son receive individual academic attention?",
    "Are there medical facilities or a qualified doctor available on the campus?",
    "What is the policy for fee payments? Can we pay in installments?",
    "What are the rules regarding the use of mobile phones on campus and in the hostels?",
    "How strict is the anti-ragging policy? What steps are taken to ensure a safe environment?",
    "Are first-year students housed in separate hostel blocks away from seniors?",
    "When do the admissions for the next academic session typically begin?",
    "Does the college provide any specialized training for competitive exams like GATE or GRE?"
];

async function runParentTest() {
    console.log("👨‍👩‍👦 AURA PARENTAL TEST GAUNTLET (20 QUESTIONS)");
    console.log("--------------------------------------------------");

    for (let i = 0; i < PARENT_QUESTIONS.length; i++) {
        const question = PARENT_QUESTIONS[i];
        console.log(`\nQuestion ${i+1}: ${question}`);
        
        try {
            const start = Date.now();
            const response = await performRetrieval(question);
            const duration = Date.now() - start;
            
            console.log("--------------------------------------------------");
            console.log(`Aura Answer [${duration}ms]:`);
            console.log(response.answer);
            console.log("--------------------------------------------------");
            
            // Short delay to avoid hitting rate limits too hard
            await new Promise(r => setTimeout(r, 2000));
        } catch (error: any) {
            console.error(`Error processing question ${i+1}:`, error.message);
        }
    }
    
    console.log("\n✅ Test Complete.");
}

runParentTest();
