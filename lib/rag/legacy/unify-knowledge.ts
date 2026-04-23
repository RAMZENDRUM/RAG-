import fs from 'fs';
import path from 'path';

const RAW_WEBSITE_DIR = path.join(process.cwd(), 'extracted_data', '1_raw_website');
const RAW_DOCS_DIR = path.join(process.cwd(), 'extracted_data', '3_processed_docs');
const STRUCTURED_JSON_DIR = path.join(process.cwd(), 'extracted_data', '2_structured_json');
const OUTPUT_FILE = path.join(process.cwd(), 'extracted_data', '4_unified_output', 'aura_knowledge_v2.json');

interface Metadata {
  source_layer: 'core' | 'document' | 'metadata';
  data_type: 'timing' | 'numerical' | 'contact' | 'narrative' | 'academic';
  entity: string;
  source_file: string;
  source_refs: string[];
  exact?: {
    subject_code?: string;
    bus_route?: string;
    placement_percent?: number;
  };
}

interface Chunk {
  content: string;
  metadata: Metadata;
}

function cleanText(text: string): string {
  let cleaned = text
    .replace(/\s+/g, ' ')
    .replace(/[>•]/g, '-')
    .trim();

  if (!cleaned.toLowerCase().includes('mohamed sathak') && !cleaned.toLowerCase().includes('msajce')) {
    cleaned = `[MSAJCE] ${cleaned}`;
  }
  return cleaned;
}

function extractStructuredData(text: string): Metadata['exact'] {
  const exact: Metadata['exact'] = {};
  
  // Subject Codes (e.g. PH3151, CS8592)
  const codeMatch = text.match(/\b([A-Z]{2,3}\d{4})\b/);
  if (codeMatch) exact.subject_code = codeMatch[1];
  
  // Bus Routes (e.g. AR10, R22)
  const routeMatch = text.match(/\b(AR\d{1,2}|R\d{2})\b/);
  if (routeMatch) exact.bus_route = routeMatch[1];
  
  // Placement %
  const percentMatch = text.match(/Placement Percentage:?\s?(\d{1,3})%/i);
  if (percentMatch) exact.placement_percent = parseInt(percentMatch[1]);
  
  return Object.keys(exact).length > 0 ? exact : undefined;
}

function chunkContent(text: string, metadata: Metadata): Chunk[] {
  const chunks: Chunk[] = [];
  const chunkSize = 750; // Increased context for better semantic alignment
  const overlap = 150;

  let start = 0;
  while (start < text.length) {
    let end = start + chunkSize;
    if (end < text.length) {
      const lastPeriod = text.lastIndexOf('.', end);
      if (lastPeriod > start + 350) end = lastPeriod + 1;
    }

    const rawChunk = text.substring(start, end).trim();
    if (rawChunk.length > 80) {
      const exact = extractStructuredData(rawChunk);
      
      // Formatting enrichment for tables
      let dynamicContent = rawChunk;
      if (metadata.source_file.includes('AR')) {
           dynamicContent = `[Transport Data] ${rawChunk.replace(/(\b\d{1,2}\.\d{2}\b)/g, 'Time: $1 AM/PM')}`;
      }

      chunks.push({
        content: dynamicContent,
        metadata: { ...metadata, exact }
      });
    }

    start = end - overlap;
    if (start >= text.length - overlap) break;
  }
  return chunks;
}

async function unify() {
  const allChunks: Chunk[] = [];
  const seenHashes = new Set<string>();

  // 1. Core Pages (Always High Value)
  const coreFiles = fs.readdirSync(RAW_WEBSITE_DIR).filter(f => f.endsWith('.txt'));
  for (const file of coreFiles) {
    const raw = fs.readFileSync(path.join(RAW_WEBSITE_DIR, file), 'utf-8');
    allChunks.push(...chunkContent(cleanText(raw), {
      source_layer: 'core',
      data_type: 'narrative',
      entity: file.replace('.txt', ''),
      source_file: file,
      source_refs: [file]
    }));
  }

  // 2. High-Value Documents (Expanded List)
  const highValueKeywords = [
    'Placement', 'Staff', 'History', 'Prospectus', 'Mandatory', 'AQAR', 'NAAC', 
    'Flyer', 'Admission', 'Rules', 'Regulations', 'Policy', 'AnnualReport', 
    'Bus', 'AR', 'Syllabus', 'Curriculum', 'R22', 'R21', 'R24', 'PH3151'
  ];

  if (fs.existsSync(RAW_DOCS_DIR)) {
    const docFiles = fs.readdirSync(RAW_DOCS_DIR).filter(f => {
      return f.endsWith('.txt') && highValueKeywords.some(kw => f.toLowerCase().includes(kw.toLowerCase()));
    });

    console.log(`📑 Processing ${docFiles.length} production-critical documents...`);
    for (const file of docFiles) {
      const raw = fs.readFileSync(path.join(RAW_DOCS_DIR, file), 'utf-8');
      const contentOnly = raw.split('Markdown Content:').pop() || raw;
      
      allChunks.push(...chunkContent(cleanText(contentOnly), {
        source_layer: 'document',
        data_type: file.includes('Syllabus') ? 'academic' : 'narrative',
        entity: file.split('.')[0],
        source_file: file,
        source_refs: [file]
      }));
    }
  }

  // Deduplicate
  const finalChunks = allChunks.filter(chunk => {
    const hash = chunk.content.substring(0, 100);
    if (seenHashes.has(hash)) return false;
    seenHashes.add(hash);
    return true;
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalChunks, null, 2));
  console.log(`✅ Success! ${finalChunks.length} high-fidelity chunks exported to ${OUTPUT_FILE}`);
}

unify();
