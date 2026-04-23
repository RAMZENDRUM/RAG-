import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import { createOpenAI } from '@ai-sdk/openai';
import { embedMany } from 'ai';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

const openai = createOpenAI({
    apiKey: (process.env.VERCEL_AI_KEY || '').trim(),
    baseURL: 'https://ai-gateway.vercel.sh/v1'
});

const EMBED_MODEL = openai.embedding('openai/text-embedding-3-small');

async function fixTransportSupabase() {
    console.log("🚀 Syncing Transport Details WITH ROUTE MAPPING (OpenAI 1536)...");

    const transportDir = path.resolve(process.cwd(), 'cleaning_zone/institutional_life');
    const files = fs.readdirSync(transportDir).filter(f => f.startsWith('AR') && f.endsWith('.pdf.md'));

    for (const file of files) {
        const routeName = file.split('.')[0]; // AR7, AR3, etc.
        console.log(`📡 Ingesting: ${file} (Mapping to ${routeName})`);
        
        const content = fs.readFileSync(path.join(transportDir, file), 'utf-8');
        const chunks = content.split('\n\n').filter(c => c.trim().length > 10);
        
        // Prepend Route Name to each chunk for better searchability
        const enrichedChunks = chunks.map(chunk => `[Route: ${routeName}] ${chunk}`);

        try {
            const { embeddings } = await embedMany({
                model: EMBED_MODEL,
                values: enrichedChunks
            });

            for (let i = 0; i < enrichedChunks.length; i++) {
                await sql`
                    INSERT INTO documents (content, embedding, metadata)
                    VALUES (
                        ${enrichedChunks[i]},
                        ${`[${embeddings[i].join(',')}]`}::vector,
                        ${JSON.stringify({
                            source_file: file,
                            routeName: routeName,
                            category: 'TRANSPORT',
                            source_layer: 'institutional_life'
                        })}::jsonb
                    )
                    ON CONFLICT DO NOTHING;
                `;
            }

            console.log(`✅ ${file} synced.`);
        } catch (e: any) {
            console.error(`❌ Failed ${file}: ${e.message}`);
        }
    }

    console.log("🏁 Transport details fixed with enriched mapping!");
    await sql.end();
}

fixTransportSupabase().catch(console.error);
