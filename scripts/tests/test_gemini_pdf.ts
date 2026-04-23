import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import fs from 'fs';
import dotenv from 'dotenv';

const envPath = 'd:/.gemini/RAG college/.env';
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const KEY = envConfig['GEMINI_API_KEY'];

const model = google('models/gemini-1.5-flash');

async function testPdf() {
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = KEY;
    const pdfPath = 'organized_vault/pdfs/high/College-Prospectus.pdf';
    
    if (!fs.existsSync(pdfPath)) {
        console.error('? PDF not found: ' + pdfPath);
        return;
    }

    try {
        console.log('?? Testing Direct PDF Reading for ' + pdfPath + '...');
        const pdfContent = fs.readFileSync(pdfPath);
        
        const { text } = await generateText({
            model: model,
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: 'Please summarize this institutional prospectus in 3 sentences.' },
                        { type: 'file', data: pdfContent, mimeType: 'application/pdf' }
                    ]
                }
            ]
        });
        console.log('? Gemini PDF Response: ' + text);
    } catch (e: any) {
        console.error('? Gemini PDF Failed: ' + e.message);
    }
}
testPdf();
