import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL || '');
const TRAINING_FILE = path.join(process.cwd(), 'scratch', 'aura_training_dataset.csv');
const INTELLIGENCE_FILE = path.join(process.cwd(), 'scratch', 'msajce_full_persona_report.csv');

async function masterSync() {
  console.log("🚀 Starting Aura PERSONA MAPPER Sync...");

  try {
    // --- 1. TRAINING DATA ---
    const cacheRows = await sql`SELECT query, answer, created_at FROM knowledge_cache ORDER BY created_at DESC`;
    if (cacheRows.length > 0) {
        const header = "Question_Variant,Verified_Answer,Date_Learned\n";
        const content = cacheRows.map(r => `"${r.query.replace(/"/g, '""')}","${r.answer.replace(/"/g, '""')}","${r.created_at}"`).join('\n');
        fs.writeFileSync(TRAINING_FILE, header + content);
    }

    // --- 2. FULL PERSONA DASHBOARD ---
    const chatRows = await sql`
        SELECT user_id, content, metadata, created_at 
        FROM chat_histories 
        WHERE role = 'user' 
        ORDER BY created_at DESC
    `;

    if (chatRows.length > 0) {
        console.log(`📉 Generating Full Persona Report (${chatRows.length} analytic points)...`);
        const intelHeader = "User_ID,User_Message,Category,Mood,Urgency,USER_PERSONA,Campus_Repair_Target,Rival_Mention,Efficiency,Date_Time\n";
        const intelContent = chatRows.map(r => {
            const meta = r.metadata || {};
            const cat = meta.category || 'GENERAL';
            const mood = meta.mood || 'NEUTRAL';
            const urgency = meta.critical || 'LOW';
            const persona = meta.persona || 'UNKNOWN';
            const repair = meta.facility_issue ? '⚠️ MAINTENANCE ALERT' : 'CLEAN';
            const rival = meta.rival ? 'MENTIONED' : 'CLEAN';
            const efficiency = meta.cached ? 'FREE (CACHE HIT)' : 'PAID (RAG FLOW)';
            
            return `"${r.user_id}","${r.content.replace(/"/g, '""')}","${cat}","${mood}","${urgency}","${persona}","${repair}","${rival}","${efficiency}","${r.created_at}"`;
        }).join('\n');
        fs.writeFileSync(INTELLIGENCE_FILE, intelHeader + intelContent);
    }

    console.log("✅ PERSONA SYNC COMPLETE!");
    console.log(`📁 Your Master Persona Report: ${INTELLIGENCE_FILE}`);

  } catch (err) {
    console.error("❌ Persona Sync Failed:", err.message);
  } finally {
    process.exit(0);
  }
}

masterSync();
