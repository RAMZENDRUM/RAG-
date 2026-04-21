import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL || '');
const OUTPUT_FILE = path.join(process.cwd(), 'scratch', 'aura_training_dataset.csv');

async function syncAndExport() {
  console.log("🚀 Starting Aura Academy Sync...");

  try {
    // 1. HARDEN DATABASE (Zero-Duplicate Shield)
    console.log("🛡️ Hardening Fast-Cache Constraints...");
    await sql`ALTER TABLE knowledge_cache ADD CONSTRAINT unique_query UNIQUE (query)`.catch(() => {
        console.log("ℹ️ Fast-Cache already hardened.");
    });

    // 2. FETCH ALL LEARNED KNOWLEDGE
    console.log("📊 Pulling Golden Dataset from Supabase...");
    const rows = await sql`
        SELECT query, answer, created_at 
        FROM knowledge_cache 
        ORDER BY created_at DESC
    `;

    if (rows.length === 0) {
        console.log("⚠️ No learned data found yet. Aura needs more student chats!");
        return;
    }

    // 3. CONVERT TO EXCEL-READY CSV
    console.log(`📂 Generating Dataset with ${rows.length} records...`);
    const header = "Question Variant,Predicted Answer,Discovery Date\n";
    const csvContent = rows.map(r => {
        // Sanitize for CSV (Escape quotes/newlines)
        const q = `"${r.query.replace(/"/g, '""')}"`;
        const a = `"${r.answer.replace(/"/g, '""')}"`;
        return `${q},${a},${r.created_at}`;
    }).join('\n');

    fs.writeFileSync(OUTPUT_FILE, header + csvContent);
    
    console.log("✅ SYNC COMPLETE!");
    console.log(`📁 Your Excel-ready file is at: ${OUTPUT_FILE}`);

  } catch (err) {
    console.error("❌ Sync Failed:", err.message);
  } finally {
    process.exit(0);
  }
}

syncAndExport();
