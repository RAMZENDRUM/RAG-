const fs = require('fs');
const path = require('path');

const pdfs = [
  { name: 'prospectus.txt', url: 'https://www.msajce-edu.in/uploads/College-Prospectus.pdf' },
  { name: 'admission_flyer.txt', url: 'https://www.msajce-edu.in/uploads/Admission24-25Flyer.pdf' },
  { name: 'annual_report_23_24.txt', url: 'https://www.msajce-edu.in/uploads/aqar/AnnualReport2023-2024.pdf' }
];

async function extractDocs() {
  const outputDir = path.join(process.cwd(), 'extracted_data', 'documents_text');
  
  for (const pdf of pdfs) {
    try {
      console.log(`Deep extracting PDF: ${pdf.url}`);
      const response = await fetch(`https://r.jina.ai/${pdf.url}`);
      const text = await response.text();
      fs.writeFileSync(path.join(outputDir, pdf.name), text);
      console.log(`Saved ${pdf.name} (${text.length} chars)`);
    } catch (e) {
      console.error(`Failed ${pdf.name}:`, e.message);
    }
  }
}

extractDocs();
