const fs = require('fs');
const pdf = require('pdf-parse');

async function extractGiant(pdfPath) {
    console.log('?? [NODE] Opening Giant: ' + pdfPath);
    try {
        const dataBuffer = fs.readFileSync(pdfPath);
        // Correct usage of pdf-parse
        const data = await pdf(dataBuffer);
        
        console.log('? Pages: ' + data.numpages);
        console.log('?? Content Length: ' + data.text.length + ' chars');
        
        const outputName = pdfPath.split('/').pop().replace('.pdf', '_raw.md');
        const outputPath = 'organized_vault/scraper_debug/' + outputName;
        
        fs.writeFileSync(outputPath, data.text);
        console.log('? Finalized: ' + outputPath);
    } catch (e) {
        console.error('? Failed: ' + e.message);
    }
}

async function run() {
    await extractGiant('organized_vault/pdfs/high/College-Prospectus.pdf');
    await extractGiant('organized_vault/pdfs/low/CE8501-LN.pdf');
    await extractGiant('organized_vault/pdfs/low/CE8591-QB.pdf');
}
run();
