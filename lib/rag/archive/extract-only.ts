import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

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

async function extractFull() {
  const outputDir = path.join(process.cwd(), 'extracted_data');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  for (const url of URLS) {
    try {
      const fileName = url.split('/').pop()?.replace('.php', '') || 'index';
      const targetFile = path.join(outputDir, `${fileName}.txt`);

      console.log(`Extracting: ${url}`);
      
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);

      // 1. Remove ONLY non-content global elements
      $('script, style, link, noscript, iframe, .preloader, #preloader').remove();
      
      // 2. Remove standard navigation wrappers strictly
      $('nav, header, footer, #header, #footer, .header, .footer, .menuzord').remove();

      // 3. Target the core content area (usually in a specific section or div)
      // We look for common content classes but fallback if they are too small
      let candidates = $('.main-content, .content-area, article, main, section').filter((_, el) => $(el).text().trim().length > 100);
      
      let target;
      if (candidates.length > 0) {
        target = $(candidates.first());
      } else {
        // Fallback: Use the body but remove known navigation containers by class if they aren't the whole body
        $('#wrapper > header, #wrapper > footer, .nav-container').remove();
        target = $('body');
      }

      // Convert tables to readable text
      target.find('table').each((_, table) => {
        const rows: string[] = [];
        $(table).find('tr').each((_, tr) => {
          const cells = $(tr).find('td, th').map((_, td) => $(td).text().trim()).get();
          if (cells.length > 1) rows.push(cells.join(': '));
          else if (cells.length === 1) rows.push(cells[0]);
        });
        const tableText = rows.join('. ') + '.';
        $(table).replaceWith(`<span> ${tableText} </span>`);
      });

      let text = target.text().replace(/\s+/g, ' ').trim();
      
      // Post-extraction cleaning of repeated noise
      const repeatedPhrases = ["Home Academics Programmes Offered", "Mohamed Sathak A. J. College of Engineering", "MSAJCE"];
      repeatedPhrases.forEach(phrase => text = text.replace(new RegExp(phrase, 'gi'), ''));

      fs.writeFileSync(targetFile, text);
      console.log(`Saved ${text.length} characters to ${fileName}.txt`);
    } catch (error) {
      console.error(`Error with ${url}:`, error);
    }
  }
  process.exit(0);
}

extractFull();
