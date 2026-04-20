const fs = require('fs');
const path = require('path');

async function extractHighValueDocs() {
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
  
  // FILTERING LOGIC: Keep only "Useful" files
  const highValueUrls = urls.filter(url => {
    const junk = ['LessonPlan', 'QuestionBank', 'LectureNote', 'ICTTools', 'QuestionPaper', 'LP.pdf', 'QB.pdf', 'LN.pdf', 'ICT.pdf'];
    const isJunk = junk.some(j => url.includes(j));
    
    const usefulHints = ['Staff', 'Placement', 'AnnualReport', 'Mandatory', 'Disclosure', 'AQAR', 'NAAC', 'Flyer', 'Prospectus', 'History', 'About', 'Rules', 'Regulations', 'Policy'];
    const isUseful = usefulHints.some(h => url.toLowerCase().includes(h.toLowerCase()));
    
    return !isJunk || isUseful; 
  });

  console.log(`Starting targeted extraction for ${highValueUrls.length} high-value documents...`);

  for (let i = 0; i < highValueUrls.length; i++) {
    const url = highValueUrls[i];
    try {
      const fileName = url.split('/').pop().replace(/[^a-zA-Z0-9.-]/g, '_') + '.txt';
      const targetPath = path.join(outputDir, fileName);

      if (fs.existsSync(targetPath)) {
        console.log(`[${i+1}/${highValueUrls.length}] Already extracted: ${fileName}`);
        continue;
      }

      console.log(`[${i+1}/${highValueUrls.length}] High-Value Extraction: ${url}`);
      const response = await fetch(`https://r.jina.ai/${url}`);
      
      if (!response.ok) {
         if (response.status === 429) {
           console.log("Rate limited. Waiting 10 seconds...");
           await new Promise(r => setTimeout(r, 10000));
           i--; // Retry this one
           continue;
         }
         throw new Error(`HTTP ${response.status}`);
      }
      
      const text = await response.text();
      fs.writeFileSync(targetPath, text);
      console.log(`Saved: ${fileName}`);

      // Respectful delay
      await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
      console.error(`Failed ${url}: ${e.message}`);
    }
  }
}

extractHighValueDocs();
