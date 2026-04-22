import fs from 'fs';
import path from 'path';
import * as LlamaParse from 'llama-parse';
const LlamaParseReader = (LlamaParse as any).LlamaParseReader || LlamaParse;
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import dotenv from 'dotenv';

dotenv.config();

const VAULT_ROOT = path.resolve('organized_vault/pdfs');
const CLEANED_ROOT = path.resolve('organized_vault/cleaned');
const GUARDIAN_PATH = path.resolve('scripts/scraper/credit_guardian.json');

const openai = createOpenAI({
    apiKey: process.env.VERCEL_AI_KEY,
    baseURL: 'https://ai-gateway.vercel.sh/v1'
});

import pdf from 'pdf-parse';

async function updateCredits(pages: number) {
    const data = JSON.parse(fs.readFileSync(GUARDIAN_PATH, 'utf-8'));
    data.current_usage += pages;
    fs.writeFileSync(GUARDIAN_PATH, JSON.stringify(data, null, 4));
    console.log(`📈 Usage Update: ${data.current_usage}/10000`);
    if (data.current_usage >= data.limit) throw new Error("CREDIT_LIMIT_REACHED");
}

function getTransportMeta(fileName: string) {
    const transportPath = path.resolve('d:/.gemini/RAG college/raw_vault/legacy_archive/2_structured_json/transport.json');
    const legacy = JSON.parse(fs.readFileSync(transportPath, 'utf-8'));
    const routeId = fileName.replace('.pdf', '').replace(/ /g, '');
    const pattern = new RegExp(`${routeId}.*?(\\d+\\.\\d+\\s*[APM]+)`, 'i');
    const match = legacy.textContent.match(pattern);
    return {
        route_id: routeId,
        departure_time: match ? match[1] : "Check Full Schedule"
    };
}

export async function processFile(priority: string, filePath: string) {
    const fileName = path.basename(filePath);
    const outputDir = path.join(CLEANED_ROOT, priority);
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    let rawText = "";
    let fusionData = {};
    
    if (priority === 'high') {
        const reader = new LlamaParseReader({ resultType: 'markdown' });
        const docs = await reader.loadData(filePath);
        rawText = docs[0].text;
        if (fileName.startsWith('AR') || fileName.startsWith('R')) {
            fusionData = getTransportMeta(fileName);
        }
    } else {
        // Zero-Credit Local Parsing
        const buffer = fs.readFileSync(filePath);
        const data = await pdf(buffer);
        rawText = data.text;
    }

    const { text } = await generateText({
        model: openai('gpt-4o-mini'),
        system: "You are an Elite Institutional Concierge. Normalize this input into the master JSON schema. Preserve all tables exactly. Do not summarize data.",
        prompt: `FUSION_METADATA: ${JSON.stringify(fusionData)}\n\nRAW_CONTENT:\n${rawText}`
    });

    const outputPath = path.join(outputDir, fileName.replace('.pdf', '.json'));
    fs.writeFileSync(outputPath, text);
    await updateCredits(priority === 'high' ? 5 : 1); // Estimated credit weight
    console.log(`✅ Finalized Node: ${outputPath}`);
}

export async function runBatch() {
    const priorities = ['high', 'medium', 'low'];
    for (const p of priorities) {
        const dir = path.join(VAULT_ROOT, p);
        if (!fs.existsSync(dir)) continue;

        const files = fs.readdirSync(dir).filter(f => f.endsWith('.pdf'));
        for (const f of files) {
           await processFile(p, path.join(dir, f));
           // Basic credit update (Simplified for testing)
        }
    }
}

// Only run if called directly
if (process.argv[1] === path.resolve(__filename)) {
    runBatch().catch(console.error);
}
