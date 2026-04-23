import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { getQdrant, COLLECTION_NAME } from './qdrant';
import { createOpenAI } from '@ai-sdk/openai';
import { embedMany } from 'ai';
import crypto from 'crypto';
import fs from 'fs';

// NVIDIA DIRECT BRIDGE (BYPASSING VERCEL GATEWAY)
const nvidia = createOpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1'
});

const EMBED_MODEL = nvidia.embedding('nvidia/nv-embed-v1');
const turndownService = new TurndownService();

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

async function hyperScrape() {
    const urls = fs.readFileSync('d:\\.gemini\\RAG college\\scratch\\master_links.txt', 'utf-8').split('\n').filter(u => u.trim());
    const client = getQdrant();

    console.log(`🚀 Starting NVIDIA-POWERED Hyper-Scrape of ${urls.length} Core Pages...`);

    for (const url of urls) {
        try {
            console.log(`📡 Ingesting: ${url}`);
            const { data } = await axios.get(url, { headers: HEADERS, timeout: 20000 });
            const $ = cheerio.load(data);
            
            $('script, style, nav, footer, header').remove(); 
            const html = $('main, article, .content, #content').html() || $('body').html();
            const markdown = turndownService.turndown(html || '');
            
            const mediaContext: string[] = [];
            $('img').each((_, el) => {
                const alt = $(el).attr('alt') || 'Campus Image';
                const src = $(el).attr('src');
                if (src) mediaContext.push(`IMAGE: ${alt} available at ${new URL(src, url).href}`);
            });

            const fullContent = `${markdown}\n\n--- MEDIA RESOURCES ---\n${mediaContext.join('\n')}`;
            const facts = fullContent.split(/[.!?]\s+/).filter(f => f.trim().length > 40);
            
            const batchSize = 25;
            for (let i = 0; i < facts.length; i += batchSize) {
                const batch = facts.slice(i, i + batchSize);
                
                // NVIDIA Professional Batch Embed
                const { embeddings } = await embedMany({ model: EMBED_MODEL, values: batch });
                
                const points = batch.map((content, j) => {
                    const hash = crypto.createHash('md5').update(content).digest('hex');
                    const id = `${hash.slice(0,8)}-${hash.slice(8,12)}-4${hash.slice(13,16)}-a${hash.slice(17,20)}-${hash.slice(20,32)}`;
                    return { 
                        id, 
                        vector: embeddings[j], 
                        payload: { content, source: "hyper_scrape_core_2026", url } 
                    };
                });

                await client.upsert(COLLECTION_NAME, { wait: true, points });
                process.stdout.write('.');
            }
            console.log(`\n✅ ${url} Ingested.`);
            await new Promise(r => setTimeout(r, 5000)); // Firewall Cooldown

        } catch (e: any) {
            console.error(`⚠️ Failed Hyper-Scrape for ${url}: ${e.message}`);
        }
    }
    console.log("🏁 missione compiuta. Aura is fully re-saturated via NVIDIA.");
}

hyperScrape();
