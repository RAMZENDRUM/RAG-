const fs = require('fs');
const path = require('path');

async function extractAllDocs() {
  const comprehensiveDir = path.join(process.cwd(), 'extracted_data', 'comprehensive');
  const outputDir = path.join(process.cwd(), 'extracted_data', 'documents_text');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const files = fs.readdirSync(comprehensiveDir);
  const allDocs = new Set();

  files.forEach(f => {
    if (f.endsWith('.json')) {
      const data = JSON.parse(fs.readFileSync(path.join(comprehensiveDir, f), 'utf-8'));
      data.documents.forEach(d => allDocs.add(d.url));
    }
  });

  const urls = Array.from(allDocs);
  console.log(`Starting deep extraction for ${urls.length} unique documents...`);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      // Create a safe filament from the URL
      const fileName = url.split('/').pop().replace(/[^a-zA-Z0-9.-]/g, '_') + '.txt';
      const targetPath = path.join(outputDir, fileName);

      if (fs.existsSync(targetPath)) {
        console.log(`[${i+1}/${urls.length}] Skipping existing: ${fileName}`);
        continue;
      }

      console.log(`[${i+1}/${urls.length}] Extracting: ${url}`);
      const response = await fetch(`https://r.jina.ai/${url}`, {
        headers: { 'X-Timeout': '30000' }
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const text = await response.text();
      fs.writeFileSync(targetPath, text);
      console.log(`Done: ${fileName} (${text.length} chars)`);

      // Small delay to prevent aggressive bursts
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.error(`[${i+1}/${urls.length}] Failed ${url}: ${e.message}`);
    }
  }
}

extractAllDocs();
