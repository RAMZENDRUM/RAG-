import axios from 'axios';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import fs from 'fs';
import path from 'path';

const turndownService = new TurndownService();
const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

const OUTPUT_DIR = 'd:\\.gemini\\RAG college\\cleaning_zone\\web_scrapes';

async function materialize() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const urls = fs.readFileSync('d:\\.gemini\\RAG college\\scratch\\master_links.txt', 'utf-8').split('\n').filter(u => u.trim());

    console.log(`🚀 Materializing ${urls.length} Pages into Markdown...`);

    for (const url of urls) {
        try {
            console.log(`📡 Fetching: ${url}`);
            const { data } = await axios.get(url, { headers: HEADERS, timeout: 20000 });
            const $ = cheerio.load(data);
            
            // CLEANING
            $('script, style, nav, footer, header').remove(); 
            const html = $('main, article, .content, #content').html() || $('body').html();
            const markdown = turndownService.turndown(html || '');
            
            // MEDIA HARVEST
            const mediaContext: string[] = [];
            $('img').each((_, el) => {
                const alt = $(el).attr('alt') || 'Campus Image';
                const src = $(el).attr('src');
                if (src) mediaContext.push(`IMAGE: ${alt} available at ${new URL(src, url).href}`);
            });

            const fullContent = `# Source: ${url}\n\n${markdown}\n\n--- MEDIA RESOURCES ---\n${mediaContext.join('\n')}`;
            
            // GENERATE SAFE FILENAME
            let filename = url.split('/').pop() || 'index';
            if (!filename || filename === 'www.msajce-edu.in') filename = 'index';
            filename = filename.replace(/\.php$/i, '') + '.md';
            
            const filePath = path.join(OUTPUT_DIR, filename);
            fs.writeFileSync(filePath, fullContent);
            
            console.log(`✅ Saved: ${filename}`);
            await new Promise(r => setTimeout(r, 2000)); // Be polite to the server

        } catch (e: any) {
            console.error(`⚠️ Failed to materialize ${url}: ${e.message}`);
        }
    }
    console.log(`🏁 All Markdown files successfully rendered and saved to: ${OUTPUT_DIR}`);
}

materialize();
