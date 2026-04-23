import { LlamaParse } from 'llama-parse';
import { QdrantClient } from '@qdrant/js-client-rest';
import { embedMany } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import * as fs from 'fs-extra';
import * as path from 'path';
import dotenv from 'dotenv';
import { normalizeData } from './normalize';

dotenv.config();

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

const ai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const COLLECTION_NAME = 'msajce_knowledge';
const PDF_DIR = 'd:/.gemini/RAG college/extracted_data/organized';

/**
 * PRODUCTION MASS INGESTOR V3.2 (ORGANIZED & FILTERED)
 * Syncs the 'Elite' Signal Dataset while ignoring Academic_Syllabus noise.
 */
async function triggerPhasedIngestion() {
  console.log("🚀 Starting ELITE Organized Ingestion (Ignoring Syllabus Noise)...");

  // Helper for recursive file listing
  const getFiles = async (dir: string): Promise<string[]> => {
    const subdirs = await fs.readdir(dir);
    const files = await Promise.all(subdirs.map(async (subdir) => {
      const res = path.resolve(dir, subdir);
      return (await fs.stat(res)).isDirectory() ? getFiles(res) : res;
    }));
    return files.flat();
  };

  const allFiles = await getFiles(PDF_DIR);
  const goldFolders = ['Admissions', 'Transport', 'Placements'];
  
  const pdfs = allFiles
    .filter(f => f.toLowerCase().endsWith('.pdf'))
    .filter(f => goldFolders.some(folder => f.includes(folder)))
    .map(f => path.relative(PDF_DIR, f));

  console.log(`📡 Queued ${pdfs.length} 'Pure Concierge' documents from Organized hierarchy.`);

  // 🏛️ PHASE 1: Priority Sorting
  const priorityKeywords = ['admission', 'bus', 'route', 'fee', 'timing', 'placement', 'prospectus'];
  const prioritized = pdfs.sort((a, b) => {
    const aPriority = priorityKeywords.some(k => a.toLowerCase().includes(k)) ? 0 : 1;
    const bPriority = priorityKeywords.some(k => b.toLowerCase().includes(k)) ? 0 : 1;
    return aPriority - bPriority;
  });

  console.log(`📡 Queued ${prioritized.length} documents from Active RAG folder.`);

  const CONCURRENCY = 3;
  const parser = new LlamaParse({ apiKey: process.env.LLAMA_CLOUD_API_KEY! });
  
  // Track progress
  let completed = 0;

  async function processFile(fileName: string, index: number) {
    const filePath = path.join(PDF_DIR, fileName);
    const pdfAbsPath = path.join(PDF_DIR, fileName);
    const backupPath = pdfAbsPath + '.md';
    
    try {
      console.log(`\n📄 [${completed + 1}/${prioritized.length}] Starting: ${fileName}`);
      
      let rawMarkdown = "";

      // 💾 COST-SAVING CACHE CHECK
      if (await fs.pathExists(backupPath)) {
        console.log(`   💎 Found Local Backup. Skipping LlamaParse...`);
        rawMarkdown = await fs.readFile(backupPath, 'utf8');
      } else {
        const fileBuffer = await fs.readFile(pdfAbsPath);
        const fileBlob = new Blob([fileBuffer], { type: 'application/pdf' });
        const result = await parser.parseFile(fileBlob as any);
        rawMarkdown = result.markdown;
        
        // Save for future use
        await fs.writeFile(backupPath, rawMarkdown);
        console.log(`   💾 Backup Saved: ${fileName}.md`);
      }

      const normalizedUnits = await normalizeData(rawMarkdown, fileName);
      
      const { embeddings } = await embedMany({
        model: ai.embedding('openai/text-embedding-3-small'),
        values: normalizedUnits.map(u => u.narrative)
      });

      await qdrant.upsert(COLLECTION_NAME, {
        wait: true,
        points: normalizedUnits.map((unit, idx) => ({
          id: crypto.randomUUID(),
          vector: embeddings[idx],
          payload: {
            content: unit.narrative,
            metadata: {
              ...unit.exact,
              source: fileName,
              category: unit.category,
              importance: unit.importance,
              ingested_at: new Date().toISOString()
            }
          }
        }))
      });

      completed++;
      console.log(`   ✨ [${completed}/${prioritized.length}] COMPLETED: ${fileName} (${normalizedUnits.length} points)`);
    } catch (error) {
      console.error(`   ❌ Failed to ingest ${fileName}:`, error.message);
    }
  }

  // ⚡ Worker Pool Execution
  for (let i = 0; i < prioritized.length; i += CONCURRENCY) {
    const batch = prioritized.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map((file, j) => processFile(file, i + j)));
  }

  console.log("\n🏆 MASS PRODUCTION SYNC COMPLETE.");
  process.exit(0);
}

triggerPhasedIngestion();
