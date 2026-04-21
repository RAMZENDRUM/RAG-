import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL || '');
const TRAINING_FILE = path.join(process.cwd(), 'scratch', 'aura_training_dataset.csv');
const INTELLIGENCE_FILE = path.join(process.cwd(), 'scratch', 'msajce_aura_report_premium.csv');

async function masterSync() {
  console.log("🚀 Starting Aura FULL SPECTRUM Sync...");

  try {
    // --- 1. TRAINING DATA ---
    const cacheRows = await sql`SELECT query, answer, created_at FROM knowledge_cache ORDER BY created_at DESC`;
    if (cacheRows.length > 0) {
        console.log(`📊 Refreshing Training Data (${cacheRows.length} variants)...`);
        const header = "Question_Variant,Verified_Answer,Date_Learned\n";
        const content = cacheRows.map(r => `"${r.query.replace(/"/g, '""')}","${r.answer.replace(/"/g, '""')}","${r.created_at}"`).join('\n');
        fs.writeFileSync(TRAINING_FILE, header + content);
    }

    // --- 2. PREMIUM STRATEGIC DASHBOARD ---
    const chatRows = await sql`
        SELECT user_id, content, metadata, created_at 
        FROM chat_histories 
        WHERE role = 'user' 
        ORDER BY created_at DESC
    `;

    if (chatRows.length > 0) {
        console.log(`📉 Generating Premium Strategic Dashboard (${chatRows.length} points)...`);
        // NEW COLUMNS: Mood, Urgency, RivalPulse
        const intelHeader = "User_ID,Message,Category,Mood,Urgency,Rival_Pulse,System_Efficiency,Date_Time\n";
        const intelContent = chatRows.map(r => {
            const meta = r.metadata || {};
            const cat = meta.category || 'GENERAL';
            const mood = meta.mood || 'NEUTRAL';
            const urgency = meta.critical || 'LOW';
            const rival = meta.rival ? 'MENTIONED' : 'CLEAN';
            const efficiency = meta.cached ? 'CACHE HIT ($0)' : 'RAG ANALYSED (TOKEN USED)';
            
            return `"${r.user_id}","${r.content.replace(/"/g, '""')}","${cat}","${mood}","${urgency}","${rival}","${efficiency}","${r.created_at}"`;
        }).join('\n');
        fs.writeFileSync(INTELLIGENCE_FILE, intelHeader + intelContent);
    }

    console.log("✅ FULL SPECTRUM SYNC COMPLETE!");
    console.log(`📁 1. AI Academy Base: ${TRAINING_FILE}`);
    console.log(`📁 2. PRINCIPAL'S DASHBOARD: ${INTELLIGENCE_FILE}`);

  } catch (err) {
    console.error("❌ Master Sync Failed:", err.message);
  } finally {
    process.exit(0);
  }
}

masterSync();
