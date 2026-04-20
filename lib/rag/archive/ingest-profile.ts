import postgres from 'postgres';
import { embedMany } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL!);
const ai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const model = ai.embedding('openai/text-embedding-3-small');

const personalChunks = [
  "This AI system, Aura Concierge, was developed by Ramanathan S, who is also known as Ram. He is a 2nd-year student pursuing a B.Tech in Information Technology at Mohamed Sathak A.J. College of Engineering (MSAJCE), Batch 2024–2028. He maintains an expected CGPA range of 7.8 to 8.8.",
  "Ram (Ramanathan S) is a multi-talented developer with expertise in Full-stack Web Development, Frontend technologies, and AI Chatbot development. He is a beginner in React and Java but has advanced skills in automation tools like n8n and Automation Anywhere.",
  "Beyond coding, Ram is a creative musician and artist who specializes in audio mixing and mashups. His toolkit includes professional audio workstations like FL Studio and Studio One, as well as development tools like VS Code, Unity, and Supabase.",
  "Ramanathan S has developed several notable projects including an Event Booking Management System, the SmartHostel Web App, and a Unity-based game titled 'Haunted Village'. He has also completed an internship in Java Full Stack and RPA automation.",
  "Ram is quadrilingual, speaking Tamil and English fluently, with beginner-level proficiency in German. His current career focus is improving his full-stack skills and preparing for an MSc in Germany.",
  "The Scope of this Aura Concierge AI is strictly limited to the Mohamed Sathak A.J. College of Engineering (Engineering College only). It does NOT cover the Architecture College, Nursing College, or other trust institutions. It provides precise information on courses, admissions, placements, bus routes, and faculty."
];

async function ingestProfile() {
  console.log('--- Ingesting Author Profile & System Scope ---');

  try {
    const { embeddings } = await embedMany({
      model,
      values: personalChunks,
    });

    for (let i = 0; i < personalChunks.length; i++) {
      const chunk = personalChunks[i];
      const embedding = embeddings[i];
      
      const metadata = {
        source_url: 'internal://author-profile',
        type: 'identity',
        scraped_at: new Date().toISOString()
      };

      if (embedding) {
        const vectorStr = `[${embedding.join(',')}]`;
        await sql`
          INSERT INTO documents (content, embedding, metadata)
          VALUES (${chunk}, ${vectorStr}, ${sql.json(metadata)})
        `;
      }
    }
    console.log('Successfully injected author profile into memory.');
  } catch (error) {
    console.error('Ingestion Error:', error);
  } finally {
    process.exit(0);
  }
}

ingestProfile();
