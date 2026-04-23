import * as fs from 'fs-extra';
import * as path from 'path';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import dotenv from 'dotenv';
dotenv.config();

const PDF_DIR = 'd:/.gemini/RAG college/extracted_data/0_source_pdfs';
const MD_DIR = 'd:/.gemini/RAG college/extracted_data/llamaparse_output';
const ACTIVE_DIR = 'd:/.gemini/RAG college/extracted_data/active_rag';
const COLD_DIR = 'd:/.gemini/RAG college/extracted_data/cold_storage';

async function filterRepository() {
  console.log('🔍 Starting Physical Repository Filter...');
  
  await fs.ensureDir(ACTIVE_DIR);
  await fs.ensureDir(COLD_DIR);

  const files = await fs.readdir(PDF_DIR);
  const pdfs = files.filter(f => f.toLowerCase().endsWith('.pdf'));

  console.log(`📡 Auditing ${pdfs.length} institutional assets via NVIDIA Super-Brain...`);

  const ai = createOpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
    compatibility: 'strict'
  });

  // Process in batches of 50 to avoid context limits or parsing errors
  const BATCH_SIZE = 50;
  for (let i = 0; i < pdfs.length; i += BATCH_SIZE) {
    const batch = pdfs.slice(i, i + BATCH_SIZE);
    
    console.log(`   🔸 Processing batch ${Math.floor(i / BATCH_SIZE) + 1}...`);

    const { text: decisionMap } = await generateText({
      model: ai.chat('meta/llama-3.1-70b-instruct'),
      system: `You are a Production RAG Engineer. Filter filenames into ACTIVE or COLD.
      
      ACTIVE (Keep): Admissions, Fees, Bus Routes, Placement Reports, Academic Prospectus, Key Regulations, Department Summaries.
      COLD (Archive): Symposium Certificates, Posters, Awareness Campaigns, Lab Equipment lists, internal newsletters, redundant profiles.
      
      RETURN ONLY A JSON OBJECT: {"filename": "ACTIVE" | "COLD"}`,
      prompt: `Files:\n${batch.join('\n')}`
    });

    try {
      const cleanJson = decisionMap.substring(decisionMap.indexOf('{'), decisionMap.lastIndexOf('}') + 1);
      const decisions = JSON.parse(cleanJson);

      for (const [file, tier] of Object.entries(decisions)) {
        const targetFolder = tier === 'ACTIVE' ? ACTIVE_DIR : COLD_DIR;
        const sourcePath = path.join(PDF_DIR, file);
        
        if (await fs.pathExists(sourcePath)) {
            await fs.move(sourcePath, path.join(targetFolder, file), { overwrite: true });
            
            // Sync the markdown backup too
            const mdFile = file + '.md';
            const mdSource = path.join(MD_DIR, mdFile);
            if (await fs.pathExists(mdSource)) {
                await fs.move(mdSource, path.join(targetFolder, mdFile), { overwrite: true });
            }
        }
      }
    } catch (err) {
      console.error(`   ❌ Failed to parse decisions for batch ${i}:`, err.message);
    }
  }

  console.log('\n✅ REPOSITORY FILTERING COMPLETE.');
  console.log(`📍 Active RAG PDFs are now in: ${ACTIVE_DIR}`);
  console.log(`📍 Noisy PDFs moved to cold storage: ${COLD_DIR}`);
}

filterRepository().catch(console.error);
