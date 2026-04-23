import { QdrantClient } from '@qdrant/js-client-rest';
import { createOpenAI } from '@ai-sdk/openai';
import { embedMany } from 'ai';
import dotenv from 'dotenv';
dotenv.config();

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

const ai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const COLLECTION_NAME = 'msajce_elite_knowledge';

// 💎 TRUTH DATA: Personal Profile & Heritage Facts
const PERSONAL_CHUNKS = [
  "This AI system, Aura Concierge, was developed by Ramanathan S, who is also known as Ram. He is a 2nd-year student pursuing a B.Tech in Information Technology at Mohamed Sathak A.J. College of Engineering (MSAJCE), Batch 2024–2028. He maintains an expected CGPA range of 7.8 to 8.8.",
  "Ram (Ramanathan S) is a multi-talented developer with expertise in Full-stack Web Development, Frontend technologies, and AI Chatbot development. He is a beginner in React and Java but has advanced skills in automation tools like n8n and Automation Anywhere.",
  "Beyond coding, Ram is a creative musician and artist who specializes in audio mixing and mashups. His toolkit includes professional audio workstations like FL Studio and Studio One, as well as development tools like VS Code, Unity, and Supabase.",
  "Ramanathan S has developed several notable projects including an Event Booking Management System, the SmartHostel Web App, and a Unity-based game titled 'Haunted Village'. He has also completed an internship in Java Full Stack and RPA automation.",
  "Ram is quadrilingual, speaking Tamil and English fluently, with beginner-level proficiency in German. His current career focus is improving his full-stack skills and preparing for an MSc in Germany.",
  "The Scope of this Aura Concierge AI is strictly limited to the Mohamed Sathak A.J. College of Engineering (Engineering College only). It does NOT cover the Architecture College, Nursing College, or other trust institutions. It provides precise information on courses, admissions, placements, bus routes, and faculty."
];

// 💎 TRUTH DATA: Transport & Placement High-Fidelity
const TRANSPORT_CHUNKS = [
  "The MSAJCE Institute provides extensive transportation facilities covering Chennai, Chengalpattu, Kanchipuram, and Thiruvallur. The fleet includes 22 buses, one Tata ACE, and one ambulance for student and staff safety.",
  "The Transport Contact for MSAJCE is Dr. K.P. Santhosh Nathan. He can be reached at mobile number 98408 86992 for any queries related to college buses.",
  "The nearest public transport stop for MSAJCE is the SIPCOT / Siruseri IT Park bus stop. Multiple MTC bus routes like 19, 519, 221H, 102X, 102S, 102, B19, 570, 570S, and 105 provide daily service to this location.",
  "College Bus Route AR-5 (also known as N-3) starts from MMDA School at 06:15 AM. Stops include Anna Nagar (06:20), Chinthamani (06:25), Skywalk (06:30), Choolaimadu (06:33), Loyola College (06:35), T. Nagar (06:40), CIT Nagar (06:43), Saidapet (06:45), Velachery Check Post (06:50), Vijaya Nagar Bus Stop (06:53), Baby Nagar (06:55), Tharamani (07:00), MGR Road (07:15), OMR (07:20), and Ladies Hostel (07:35), reaching MSAJCE College at 08:00 AM. Driver: Mr. Velu (+91-9940050685).",
  "College Bus Route R-21 starts from Porur at 06:25 AM. It passes through Boy Kadai (06:33), Kovoor (06:35), Kundrathur (06:38), Anagaputhur (06:40), Pammal (06:43), Pallavaram (06:45), Meenambakkam (06:48), West and East Tambaram (07:00), Camp Road (07:05), Saliyur (07:10), Medavakkam (07:25), Chithalapakkam (07:30), and Thalambur (07:35), reaching MSAJCE College at 08:00 AM. Driver: Mr. E. Sathish (+91-9677007583).",
  "College Bus Route R-22 starts from Nemilichery at 05:50 AM. It travels through Poonamallee (06:05), Kumanan Chavadi (06:00), Kattupakkam (06:05), Ramachandra Hospital (06:10), Porur (06:15), Valasaravakkam (06:20), Ramapuram (06:25), Nandhampakkam (06:30), Kathipara Junction (06:35), Thillai Ganga Subway (06:40), Velachery Bypass (06:45), Kaiveli (07:00), Madipakkam (07:05), Kilkattalai (07:10), Kovilambakkam (07:15), Medavakkam (07:20), and Sholinganallur (07:25), reaching MSAJCE College at 08:00 AM. Driver: Mr. Jaffar (+91-9566037890)."
];

async function ingestHeritageData() {
  console.log("💎 Ingesting Heritage Metadata & Perfect Ground Truth...");
  
  const allTruth = [...PERSONAL_CHUNKS, ...TRANSPORT_CHUNKS];
  
  const { embeddings } = await embedMany({
    model: ai.embedding('openai/text-embedding-3-small'),
    values: allTruth
  });

  await qdrant.upsert(COLLECTION_NAME, {
    wait: true,
    points: allTruth.map((c, idx) => ({
      id: crypto.randomUUID(),
      vector: embeddings[idx],
      payload: { 
         content: c, 
         metadata: { source: 'heritage_logic', priority: 'high', type: 'ground_truth' } 
      }
    }))
  });

  console.log("✅ Heritage Truth Injected.");
  process.exit(0);
}

ingestHeritageData();
