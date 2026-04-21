import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL || '');
const TRAINING_FILE = path.join(process.cwd(), 'scratch', 'aura_training_dataset.csv');
const INTELLIGENCE_FILE = path.join(process.cwd(), 'scratch', 'msajce_aura_report.csv');

async function masterSync() {
  console.log("🚀 Starting Aura Institutional Intelligence Sync...");

  try {
    // --- 1. EXPORT TRAINING DATA (THE GOLD VARIANTS) ---
    const cacheRows = await sql`SELECT query, answer, created_at FROM knowledge_cache ORDER BY created_at DESC`;
    if (cacheRows.length > 0) {
        console.log(`📊 Exporting Training Data (${cacheRows.length} variants)...`);
        const header = "Question_Variant,Verified_Answer,Date_Learned\n";
        const content = cacheRows.map(r => `"${r.query.replace(/"/g, '""')}","${r.answer.replace(/"/g, '""')}","${r.created_at}"`).join('\n');
        fs.writeFileSync(TRAINING_FILE, header + content);
    }

    // --- 2. EXPORT STRATEGIC INTELLIGENCE (STUDENT DEMAND) ---
    const chatRows = await sql`
        SELECT user_id, content, metadata, created_at 
        FROM chat_histories 
        WHERE role = 'user' 
        ORDER BY created_at DESC
    `;

    if (chatRows.length > 0) {
        console.log(`📉 Exporting Strategic Report (${chatRows.length} interactions)...`);
        const intelHeader = "User_ID,Student_Question,Category,Was_Cached,Date_Time\n";
        const intelContent = chatRows.map(r => {
            const meta = r.metadata || {};
            const cat = meta.category || 'UNKNOWN';
            const cacheStatus = meta.cached ? 'YES ($0 SAVED)' : 'NO (RAG HIT)';
            return `"${r.user_id}","${r.content.replace(/"/g, '""')}","${cat}","${cacheStatus}","${r.created_at}"`;
        }).join('\n');
        fs.writeFileSync(INTELLIGENCE_FILE, intelHeader + intelContent);
    }

    console.log("✅ SYSTEM SYNC COMPLETE!");
    console.log(`📁 1. Training Dataset: ${TRAINING_FILE}`);
    console.log(`📁 2. Institutional Report: ${INTELLIGENCE_FILE}`);

  } catch (err) {
    console.error("❌ Sync Failed:", err.message);
  } finally {
    process.exit(0);
  }
}

masterSync();
