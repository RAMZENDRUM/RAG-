import * as fs from 'fs-extra';
import * as path from 'path';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import dotenv from 'dotenv';
dotenv.config();

const BASE_DIR = 'd:/.gemini/RAG college/extracted_data';
const ORGANIZED_DIR = path.join(BASE_DIR, 'organized');

async function smartOrganize() {
  console.log('🧠 Starting Smart Institutional Organization via NVIDIA 70B (V2)...');

  const ai = createOpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
    compatibility: 'strict'
  });

  const miscDir = path.join(ORGANIZED_DIR, 'Miscellaneous');
  if (!(await fs.pathExists(miscDir))) {
      console.log('❌ Miscellaneous directory not found.');
      return;
  }

  const files = await fs.readdir(miscDir);
  const pdfs = files.filter(f => f.toLowerCase().endsWith('.pdf'));

  console.log(`📡 Re-auditing ${pdfs.length} institutional assets in batches...`);

  const BATCH_SIZE = 40;
  for (let i = 0; i < pdfs.length; i += BATCH_SIZE) {
    const batch = pdfs.slice(i, i + BATCH_SIZE);
    
    console.log(`   🔸 Processing batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(pdfs.length/BATCH_SIZE)}...`);

    try {
        const { text: decisionMap } = await generateText({
            model: ai.chat('meta/llama-3.1-70b-instruct'),
            system: `Sort filenames into exactly one: Admissions, Transport, Placements, Department_Records, Academic_Syllabus, or Miscellaneous.
            
            RETURN JSON: {"filename": "FOLDER"}`,
            prompt: `Files:\n${batch.join('\n')}`
        });

        const start = decisionMap.indexOf('{');
        const end = decisionMap.lastIndexOf('}');
        if (start === -1 || end === -1) {
            console.log('      ⚠️ Invalid JSON in response.');
            continue;
        }

        const cleanJson = decisionMap.substring(start, end + 1);
        const decisions = JSON.parse(cleanJson);

        let movedCount = 0;
        for (const [file, folder] of Object.entries(decisions)) {
            if (folder === 'Miscellaneous') continue;

            const targetFolder = path.join(ORGANIZED_DIR, folder as string);
            await fs.ensureDir(targetFolder);

            const sourcePath = path.join(miscDir, file);
            if (await fs.pathExists(sourcePath)) {
                await fs.move(sourcePath, path.join(targetFolder, file), { overwrite: true });
                
                // Sync MD
                const mdFile = file + '.md';
                const mdSource = path.join(miscDir, mdFile);
                if (await fs.pathExists(mdSource)) {
                    await fs.move(mdSource, path.join(targetFolder, mdFile), { overwrite: true });
                }
                movedCount++;
            }
        }
        console.log(`      ✅ Successfully relocated ${movedCount} documents.`);
    } catch (e) {
      console.log(`      ❌ Batch error: ${e.message}`);
    }
  }

  console.log('\n✨ SMART RESTRUCTURING COMPLETE.');
}

smartOrganize().catch(console.error);
