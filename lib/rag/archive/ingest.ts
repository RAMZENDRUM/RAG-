import * as cheerio from 'cheerio';
import postgres from 'postgres';
import { embedMany } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL!);

// Configure Vercel AI Gateway
const ai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const model = ai.embedding('openai/text-embedding-3-small');

const URLS = [
  "https://www.msajce-edu.in/",
  "https://www.msajce-edu.in/about.php",
  "https://www.msajce-edu.in/visionmission.php",
  "https://www.msajce-edu.in/ourhistory.php",
  "https://www.msajce-edu.in/groupofinstitutions.php",
  "https://www.msajce-edu.in/principal.php",
  "https://www.msajce-edu.in/admission.php",
  "https://www.msajce-edu.in/curriculm.php",
  "https://www.msajce-edu.in/departments.php",
  "https://www.msajce-edu.in/research.php",
  "https://www.msajce-edu.in/technologycentre.php",
  "https://www.msajce-edu.in/library.php",
  "https://www.msajce-edu.in/hostel.php",
  "https://www.msajce-edu.in/transport.php",
  "https://www.msajce-edu.in/sports.php",
  "https://www.msajce-edu.in/socialservices.php",
  "https://www.msajce-edu.in/clubssocieties.php",
  "https://www.msajce-edu.in/professionalsocities.php",
  "https://www.msajce-edu.in/alumni.php",
  "https://www.msajce-edu.in/Incubation&Startup.php",
  "https://www.msajce-edu.in/civil.php",
  "https://www.msajce-edu.in/cse.php",
  "https://www.msajce-edu.in/eee.php",
  "https://www.msajce-edu.in/ece.php",
  "https://www.msajce-edu.in/mech.php",
  "https://www.msajce-edu.in/it.php",
  "https://www.msajce-edu.in/aids.php",
  "https://www.msajce-edu.in/csbs.php",
  "https://www.msajce-edu.in/cyber.php",
  "https://www.msajce-edu.in/aiml.php",
  "https://www.msajce-edu.in/ece-vlsi.php",
  "https://www.msajce-edu.in/ece-act.php",
  "https://www.msajce-edu.in/sh.php"
];

async function scrapePage(url: string) {
  try {
    console.log(`Scraping: ${url}`);
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // 1. HARD REMOVE NAVIGATION AND BOILERPLATE
    $('nav, header, footer, script, style, .sidebar, .menu, .ads, #header, #footer, .breadcrumb, [class*="nav"], [class*="menu"], [class*="header"], [class*="footer"]').remove();

    // 2. Target main content containers
    const mainContent = $('main, section, article, #content, .content, .container').first();
    const targetElement = mainContent.length > 0 ? mainContent : $('body');

    // 3. Convert tables to natural language
    targetElement.find('table').each((_, table) => {
      const rows: string[] = [];
      $(table).find('tr').each((_, tr) => {
        const cells = $(tr).find('td, th').map((_, td) => $(td).text().trim()).get();
        if (cells.length > 1) {
          rows.push(cells.join(': '));
        } else if (cells.length === 1) {
          rows.push(cells[0]);
        }
      });
      const tableText = rows.join('. ') + '.';
      $(table).replaceWith(`<span>${tableText}</span>`);
    });

    // 4. Repeated phrase removal
    let text = targetElement.text().replace(/\s+/g, ' ').trim();
    const repeatedPhrases = [
      "Home Academics Programmes Offered",
      "Mohamed Sathak A. J. College of Engineering",
      "MSAJCE",
      "Home Group of Institutions",
      "Home Admission"
    ];
    
    repeatedPhrases.forEach(phrase => {
      const regex = new RegExp(phrase, 'gi');
      text = text.replace(regex, '');
    });

    return text.trim();
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return null;
  }
}

function chunkText(text: string, size: number = 600, overlap: number = 120) {
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    let end = start + size;
    
    // Don't cut in the middle of a word
    if (end < text.length) {
      const lastSpace = text.lastIndexOf(' ', end);
      if (lastSpace > start) {
        end = lastSpace;
      }
    }

    const chunk = text.slice(start, end).trim();
    if (chunk.length >= 150) {
      chunks.push(chunk);
    }

    start = end - overlap;
    if (start < 0) start = 0;
    if (start >= text.length - 1) break;
    
    // Prevent infinite loop if end doesn't advance
    if (start === end - overlap && end === text.length) break;
  }

  return chunks;
}

async function ingest() {
  console.log('--- Starting Production-Grade Ingestion ---');
  
  await sql`DELETE FROM documents`;

  for (const url of URLS) {
    const content = await scrapePage(url);
    if (!content || content.length < 50) continue;

    // Failure case probe for transport
    if (url.includes('transport')) {
      console.log('--- TRANSPORT DEBUG ---');
      console.log('Length:', content.length);
      console.log('Preview:', content.slice(0, 500));
      if (!content.toLowerCase().includes('bus') && !content.toLowerCase().includes('route')) {
        console.warn('WARNING: Transport page seems empty or noise-only');
      }
    }

    const chunks = chunkText(content);
    if (chunks.length === 0) continue;

    console.log(`Processing ${chunks.length} clean chunks from ${url}`);

    try {
      const { embeddings } = await embedMany({
        model,
        values: chunks,
      });

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const embedding = embeddings[i];
        
        const metadata = {
          source_url: url,
          type: url.includes('transport') ? 'timing' : 'academic',
          scraped_at: new Date().toISOString()
        };

        if (embedding) {
          const vectorStr = `[${embedding.join(',')}]`;
          await sql`
            INSERT INTO documents (content, embedding, metadata)
            VALUES (${chunk}, ${vectorStr}, ${sql.json(metadata)})
          `;
        }
      }
    } catch (error) {
      console.error(`Error processing ${url}:`, error);
    }
  }
  
  console.log('--- Ingestion Complete ---');
  process.exit(0);
}

ingest();
