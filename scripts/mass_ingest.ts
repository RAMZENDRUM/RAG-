import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import { createOpenAI } from '@ai-sdk/openai';
import { embedMany } from 'ai';
import postgres from 'postgres';
import { glob } from 'glob';

const sql = postgres(process.env.DATABASE_URL!);

// 🔑 API Key Rotation Logic
const keys = [
    process.env.VERCEL_AI_KEY,
    process.env.VERCEL_AI_KEY_2,
    process.env.VERCEL_AI_KEY_3,
    process.env.VERCEL_AI_KEY_4
].filter(k => !!k) as string[];

let currentKeyIndex = 0;

function getOpenAIClient() {
    return createOpenAI({
        apiKey: keys[currentKeyIndex].trim(),
        baseURL: 'https://ai-gateway.vercel.sh/v1'
    });
}

function rotateKey() {
    currentKeyIndex = (currentKeyIndex + 1) % keys.length;
    console.log(`🔄 Rotating to API Key Slot: ${currentKeyIndex + 1}`);
}

async function massIngest() {
    console.log("🚀 STARTING MASS INGESTION: Cleaning Zone -> Supabase (OpenAI 1536)...");

    const cleaningZone = path.resolve(process.cwd(), 'cleaning_zone');
    // Get all markdown files recursively
    const files = await glob('**/*.md', { cwd: cleaningZone });

    console.log(`📂 Found ${files.length} knowledge files to ingest.`);

    for (const file of files) {
        const fullPath = path.join(cleaningZone, file);
        const folderName = path.dirname(file);
        const fileName = path.basename(file);
        
        // 🛡️ Smart Skip: Check if this file already has chunks in the DB
        const existing = await sql`
            SELECT id FROM documents 
            WHERE metadata->>'source_file' = ${fileName} 
            AND metadata->>'source_layer' = ${folderName} 
            LIMIT 1
        `;

        if (existing.length > 0) {
            // Already synced, skip to next file
            continue;
        }

        console.log(`📡 Processing: [${folderName}] ${fileName}`);
        
        const content = fs.readFileSync(fullPath, 'utf-8');
        
        // Simple chunking: by double newline or specific size
        const chunks = content.split('\n\n')
            .filter(c => c.trim().length > 20)
            .map(c => c.trim());

        if (chunks.length === 0) continue;

        try {
            // Add context metadata to each chunk
            const enrichedChunks = chunks.map(c => `[Context: ${folderName}] ${c}`);

            // Use current rotated client
            const openaiClient = getOpenAIClient();
            const embedModel = openaiClient.embedding('openai/text-embedding-3-small');

            const { embeddings } = await embedMany({
                model: embedModel,
                values: enrichedChunks
            });

            const rows = enrichedChunks.map((chunk, i) => ({
                content: chunk,
                embedding: `[${embeddings[i].join(',')}]`,
                metadata: {
                    source_file: fileName,
                    source_layer: folderName,
                    ingested_at: new Date().toISOString()
                }
            }));

            // Row-by-row insert for stability (or small batches)
            for (const row of rows) {
                await sql`
                    INSERT INTO documents (content, embedding, metadata)
                    VALUES (${row.content}, ${row.embedding}::vector, ${sql.json(row.metadata)})
                    ON CONFLICT DO NOTHING
                `;
            }

            console.log(`✅ [${folderName}] ${fileName} synced.`);
        } catch (e: any) {
            console.error(`❌ Failed ${file}: ${e.message}`);
            if (e.message.includes('rate limit') || e.message.includes('429')) {
                rotateKey();
                // Optional: retry logic could go here, but for now we skip to next file to keep moving
            }
        }
    }

    console.log("🏁 MASS INGESTION COMPLETE! Aura is now fully loaded.");
    await sql.end();
}

massIngest().catch(console.error);
