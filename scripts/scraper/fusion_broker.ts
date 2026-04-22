import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const openai = createOpenAI({
    apiKey: process.env.VERCEL_AI_KEY,
    baseURL: 'https://ai-gateway.vercel.sh/v1'
});

const legacy_meta = {
    "route_id": "AR 7",
    "route_name": "CHUNAMBEDU",
    "departure_time": "05:25 AM"
};

async function fuse() {
    const raw_extract = fs.readFileSync('organized_vault/cleaned/high_priority/transport/AR7.md', 'utf-8');
    
    console.log('🧠 BROKER: Fusing Meta + PDF into Normalization Schema...');
    const { text } = await generateText({
        model: openai('gpt-4o-mini'),
        system: `You are an advanced data extraction and normalization engine.
Your task is to transform raw, messy input (from web scraping or PDF parsing) into clean, structured, and consistent JSON suitable for a production-grade knowledge base.

STRICT RULES:
1. OUTPUT MUST BE VALID JSON ONLY (no explanation).
2. NO HALLUCINATION.
3. If data is unclear -> keep it as-is or omit.
4. Maintain original meaning — do not distort information.

OUTPUT SCHEMA:
{
"source": "pdf_json_fused",
"title": "",
"url": "",
"sections": [
{
"heading": "",
"content": "",
"tables": [{"headers": [], "rows": []}],
"media": [{"type": "image | video", "src": "", "alt": "", "context": ""}],
"links": [{"text": "", "url": "", "type": "internal | external"}]
}
],
"metadata": {"category": "transport", "department": "transport", "importance": "high"}
}`,
        prompt: `LEGACY META: ${JSON.stringify(legacy_meta)}\n\nRAW PDF EXTRACT: ${raw_extract}`
    });

    fs.writeFileSync('organized_vault/cleaned/AR7_fused.json', text);
    console.log('✅ AR7 Fusion Complete. Saved to organized_vault/cleaned/AR7_fused.json');
}

fuse();
