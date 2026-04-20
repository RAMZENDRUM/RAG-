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

async function extractComprehensive() {
  const outputDir = path.join(process.cwd(), 'extracted_data', 'comprehensive');
  const baseUrl = "https://www.msajce-edu.in/";

  for (const url of URLS) {
    try {
      const fileName = url.split('/').pop()?.replace('.php', '') || 'home';
      const targetJson = path.join(outputDir, `${fileName}.json`);

      console.log(`Deep Extracting: ${url}`);
      
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);

      // 1. Metadata
      const metadata = {
        title: $('title').text(),
        description: $('meta[name="description"]').attr('content') || "",
        keywords: $('meta[name="keywords"]').attr('content') || ""
      };

      // 2. Images
      const images: any[] = [];
      $('img').each((_, img) => {
        const src = $(img).attr('src');
        if (src) {
          images.push({
            url: src.startsWith('http') ? src : new URL(src, baseUrl).href,
            alt: $(img).attr('alt') || ""
          });
        }
      });

      // 3. Documents
      const documents: any[] = [];
      $('a').each((_, a) => {
        const href = $(a).attr('href');
        if (href && (href.endsWith('.pdf') || href.endsWith('.doc') || href.endsWith('.docx') || href.endsWith('.xls'))) {
          documents.push({
            url: href.startsWith('http') ? href : new URL(href, baseUrl).href,
            text: $(a).text().trim()
          });
        }
      });

      // 4. Detailed Text
      $('nav, header, footer, script, style').remove();
      let textContent = $('body').text().replace(/\s+/g, ' ').trim();

      const pageData = {
        source_url: url,
        metadata,
        textContent,
        images: [...new Set(images.map(i => JSON.stringify(i)))].map(i => JSON.parse(i)),
        documents: [...new Set(documents.map(d => JSON.stringify(d)))].map(d => JSON.parse(d))
      };

      fs.writeFileSync(targetJson, JSON.stringify(pageData, null, 2));
      console.log(`Saved comprehensive data for ${fileName}.json (${textContent.length} chars, ${images.length} imgs, ${documents.length} docs)`);

    } catch (error) {
      console.error(`Failed ${url}:`, error);
    }
  }
}

extractComprehensive();
