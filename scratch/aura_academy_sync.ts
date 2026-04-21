import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL || '');
const TRAINING_FILE = path.join(process.cwd(), 'scratch', 'aura_training_dataset.csv');
const INTELLIGENCE_FILE = path.join(process.cwd(), 'scratch', 'msajce_sentinel_oracle_report.csv');

async function masterSync() {
  console.log("🚀 Starting Aura DEEP ORACLE Sync...");

  try {
    // --- 1. TRAINING DATA (ALL VARIANTS) ---
    const cacheRows = await sql`SELECT query, answer, created_at FROM knowledge_cache ORDER BY created_at DESC`;
    if (cacheRows.length > 0) {
        console.log(`📊 Exporting AI Academy Data (${cacheRows.length} variants)...`);
        const header = "Question_Variant,Verified_Answer,Date_Learned\n";
        const content = cacheRows.map(r => `"${r.query.replace(/"/g, '""')}","${r.answer.replace(/"/g, '""')}","${r.created_at}"`).join('\n');
        fs.writeFileSync(TRAINING_FILE, header + content);
    }

    // --- 2. DEEP ORACLE DASHBOARD (15 DATA POINTS) ---
    const chatRows = await sql`
        SELECT user_id, content, metadata, created_at 
        FROM chat_histories 
        WHERE role = 'user' 
        ORDER BY created_at DESC
    `;

    if (chatRows.length > 0) {
        console.log(`📉 Generating Deep Oracle Report (${chatRows.length} analytic points)...`);
        // NEW COLUMNS: Student_Year, Facility_Issue
        const intelHeader = "User_ID,Student_Question,Category,Mood,Urgency,Student_Year,Campus_Repair_Needed,Rival_Mention,Cost_Efficiency,Date_Time\n";
        const intelContent = chatRows.map(r => {
            const meta = r.metadata || {};
            const cat = meta.category || 'GENERAL';
            const mood = meta.mood || 'NEUTRAL';
            const urgency = meta.critical || 'LOW';
            const year = meta.year || 'Unknown';
            const repair = meta.facility_issue ? '⚠️ MAINTENANCE REQUIRED' : 'CLEAN';
            const rival = meta.rival ? 'MENTIONED' : 'CLEAN';
            const efficiency = meta.cached ? 'FREE (CACHE HIT)' : 'PAID (RAG HIT)';
            
            return `"${r.user_id}","${r.content.replace(/"/g, '""')}","${cat}","${mood}","${urgency}","${year}","${repair}","${rival}","${efficiency}","${r.created_at}"`;
        }).join('\n');
        fs.writeFileSync(INTELLIGENCE_FILE, intelHeader + intelContent);
    }

    console.log("✅ DEEP ORACLE SYNC COMPLETE!");
    console.log(`📁 Your Oracle Dashboard is at: ${INTELLIGENCE_FILE}`);

  } catch (err) {
    console.error("❌ Oracle Sync Failed:", err.message);
  } finally {
    process.exit(0);
  }
}

masterSync();
