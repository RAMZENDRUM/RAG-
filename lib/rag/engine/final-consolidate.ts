import * as fs from 'fs-extra';
import * as path from 'path';
import { normalizeData } from './normalize';

const RAW_WEB_DIR = 'd:/.gemini/RAG college/extracted_data/1_raw_website';
const STRUCTURED_DIR = 'd:/.gemini/RAG college/extracted_data/2_structured_json';
const OUTPUT_DIR = 'd:/.gemini/RAG college/production_data/normalized_json';

async function consolidateAll() {
  console.log("🛠️ Starting Final Knowledge Consolidation...");
  
  const eliteUnits: any[] = [];

  // 1. Process Website TXT files
  const webFiles = await fs.readdir(RAW_WEB_DIR);
  for (const file of webFiles) {
    if (file.endsWith('.txt')) {
      const content = await fs.readFile(path.join(RAW_WEB_DIR, file), 'utf8');
      const units = await normalizeData(content, `Website: ${file}`);
      eliteUnits.push(...units);
      console.log(`✅ Normalized Website: ${file}`);
    }
  }

  // 2. Process Transport JSON
  const transportData = await fs.readJson(path.join(STRUCTURED_DIR, 'transport.json'));
  const transportUnits = await normalizeData(transportData.textContent, "Official Transport Schedule & Routes");
  eliteUnits.push(...transportUnits);
  console.log("✅ Normalized Transport Data");

  // 3. Process Admissions JSON
  const admissionData = await fs.readJson(path.join(STRUCTURED_DIR, 'admission.json'));
  const admissionUnits = await normalizeData(admissionData.textContent, "Official Admission Procedures");
  eliteUnits.push(...admissionUnits);
  console.log("✅ Normalized Admission Data");

  // 4. Save the Master Production JSON
  await fs.ensureDir(OUTPUT_DIR);
  const masterPath = path.join(OUTPUT_DIR, 'elite_knowledge_base.json');
  await fs.writeJson(masterPath, eliteUnits, { spaces: 2 });

  console.log(`\n🏆 MISSION COMPLETE: ${eliteUnits.length} Elite Units saved to ${masterPath}`);
}

consolidateAll().catch(console.error);
