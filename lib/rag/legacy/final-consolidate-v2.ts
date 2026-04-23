import * as fs from 'fs-extra';
import * as path from 'path';
import { normalizeData } from './normalize';

const RAW_WEB_DIR = 'd:/.gemini/RAG college/extracted_data/1_raw_website';
const STRUCTURED_DIR = 'd:/.gemini/RAG college/extracted_data/2_structured_json';
const OUTPUT_DIR = 'd:/.gemini/RAG college/production_data/normalized_json';
const MASTER_FILE = path.join(OUTPUT_DIR, 'elite_knowledge_base.json');

const PERSONAL_CHUNKS = [
  "This AI system, Aura Concierge, was developed by Ramanathan S, also known as Ram. He is a 2nd-year B.Tech IT student at MSAJCE (2024-2028).",
  "The developer, Ramanathan S, specializes in Full-stack Web Development, AI Chatbots, and Automation. He has a CGPA range of 7.8 to 8.8.",
  "Ram is a creative musician/artist who uses tools like FL Studio, VS Code, and Supabase. He developed projects like SmartHostel and Haunted Village.",
  "Aura Concierge's scope is strictly Mohamed Sathak A.J. College of Engineering (Engineering Only). It does not cover other trust institutions like Nursing or Architecture.",
  "Aura provides official info on Admissions, Placements, Bus Routes, and Faculty details for MSAJCE Engineering students."
];

async function robustConsolidate() {
  console.log("🛠️ Starting Robust Knowledge Consolidation (V2)...");
  await fs.ensureDir(OUTPUT_DIR);
  
  let eliteUnits: any[] = [];
  
  // 1. ADD IDENTITY FIRST
  console.log("🆔 Injecting Primary Identity Profile...");
  for (const chunk of PERSONAL_CHUNKS) {
    eliteUnits.push({
      narrative: chunk,
      metadata: { source: 'Aura Developer Profile', type: 'identity' }
    });
  }

  // 2. PROCESS WEBSITE FILES (With Iterative Saving & Delays)
  const webFiles = (await fs.readdir(RAW_WEB_DIR)).filter(f => f.endsWith('.txt'));
  
  for (const [idx, file] of webFiles.entries()) {
    try {
      console.log(`🧼 [${idx + 1}/${webFiles.length}] Processing: ${file}...`);
      const content = await fs.readFile(path.join(RAW_WEB_DIR, file), 'utf8');
      
      const units = await normalizeData(content, `Website: ${file}`);
      eliteUnits.push(...units);

      // SAVE SNAPSHOT (In case of crash later)
      await fs.writeJson(MASTER_FILE, eliteUnits, { spaces: 2 });
      
      // COOL-DOWN (Prevent Gateway Timeout/Rate Limit)
      await new Promise(res => setTimeout(res, 500));
    } catch (e) {
      console.error(`❌ Failed on ${file}, skipping...`, e.message);
    }
  }

  // 3. ADD STRUCTURED JSONS
  const structured = ['transport.json', 'admission.json'];
  for (const sFile of structured) {
    try {
      console.log(`💎 Merging Structured File: ${sFile}...`);
      const data = await fs.readJson(path.join(STRUCTURED_DIR, sFile));
      const units = await normalizeData(data.textContent, `Official Table: ${sFile}`);
      eliteUnits.push(...units);
      await fs.writeJson(MASTER_FILE, eliteUnits, { spaces: 2 });
    } catch (e) {
       console.error(`❌ Structured Fail: ${sFile}`, e.message);
    }
  }

  console.log(`\n🏆 ELITE KNOWLEDGE BASE FINALIZED!`);
  console.log(`📍 Location: ${MASTER_FILE}`);
  console.log(`📑 Total Semantic Units: ${eliteUnits.length}`);
}

robustConsolidate().catch(console.error);
