import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

const ROOT_URL = 'https://www.msajce-edu.in/';
const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9'
};

const visited = new Set<string>();
const toVisit: string[] = [ROOT_URL];
const allLinks = new Set<string>();
const mediaLinks = new Set<string>();

async function discover() {
    console.log("🚀 Starting Core-Focus Discovery...");
    
    while (toVisit.length > 0) {
        const url = toVisit.shift()!;
        if (visited.has(url)) continue;
        visited.add(url);
        
        try {
            console.log(`📡 Scanning: ${url}`);
            const { data } = await axios.get(url, { headers: HEADERS, timeout: 20000 });
            const $ = cheerio.load(data);
            
            // 1. DISCOVER CORE PAGES
            $('a').each((_, el) => {
                const href = $(el).attr('href');
                if (href) {
                    try {
                        const fullUrl = new URL(href, ROOT_URL).href;
                        const isDoc = /\.(pdf|docx?|pptx?|xlsx?)$/i.test(fullUrl);
                        const isImage = /\/(uploads|news-events)\/.*\.(jpg|jpeg|png|gif)$/i.test(fullUrl);
                        
                        if (fullUrl.startsWith(ROOT_URL) && !visited.has(fullUrl) && !isDoc && !isImage) {
                            toVisit.push(fullUrl);
                            allLinks.add(fullUrl);
                        }
                    } catch {}
                }
            });
            
            // 2. DISCOVER MEDIA (Images/Videos)
            $('img, video, source, iframe').each((_, el) => {
                const src = $(el).attr('src') || $(el).attr('data-src');
                if (src) {
                    try {
                        const fullMediaUrl = new URL(src, ROOT_URL).href;
                        mediaLinks.add(fullMediaUrl);
                    } catch {}
                }
            });
            
        } catch (e) {
            console.error(`⚠️ Failed to scan ${url}`);
        }
    }
    
    if (!fs.existsSync('scratch')) fs.mkdirSync('scratch');
    fs.writeFileSync('scratch/master_links.txt', Array.from(allLinks).join('\n'));
    fs.writeFileSync('scratch/media_links.txt', Array.from(mediaLinks).join('\n'));
    console.log(`🏁 Discovery Complete! Found ${allLinks.size} pages and ${mediaLinks.size} media assets.`);
}

discover();
