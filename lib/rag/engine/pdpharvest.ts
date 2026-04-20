import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { glob } from 'glob';

const SOURCE_PDF_DIR = path.join(process.cwd(), 'extracted_data', '0_source_pdfs');

async function harvestPDFs() {
    console.log("🚜 Starting The Great PDF Harvest...");
    
    if (!fs.existsSync(SOURCE_PDF_DIR)) {
        fs.mkdirSync(SOURCE_PDF_DIR, { recursive: true });
    }

    // 1. Find all .pdf.txt files that contain URL Source
    const files = await glob('extracted_data/**/*.pdf.txt');
    console.log(`🔎 Scanning ${files.length} metadata files for original links...`);

    const urls = new Set<string>();
    for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        const match = content.match(/URL Source: (https?:\/\/[^\s]+)/);
        if (match) {
            urls.add(match[1]);
        }
    }

    console.log(`🎯 Found ${urls.size} unique PDF URLs. Starting Download...`);

    let count = 0;
    for (const url of Array.from(urls)) {
        const filename = path.basename(url);
        const destPath = path.join(SOURCE_PDF_DIR, filename);

        if (fs.existsSync(destPath)) {
            // console.log(`⏭️ Skipping existing: ${filename}`);
            continue;
        }

        try {
            console.log(`📥 Downloading [${++count}/${urls.size}]: ${filename}`);
            const response = await axios({
                method: 'GET',
                url: url,
                responseType: 'stream',
                timeout: 30000
            });

            const writer = fs.createWriteStream(destPath);
            response.data.pipe(writer);

            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });
        } catch (e) {
            console.error(`❌ Failed to download ${filename}: ${e.message}`);
        }
    }

    console.log("✅ Harvest Complete. PDFs are ready for LlamaParse.");
}

harvestPDFs();
