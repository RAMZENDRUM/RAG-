import asyncio
import json
from crawler import AuraCrawler
from parser import AuraParser
from extractor import AuraExtractor
from cleaner import AuraCleaner, update_credits

CORE_LINKS = [
    "https://www.msajce-edu.in/admission.php",
    "https://www.msajce-edu.in/transport.php",
    "https://www.msajce-edu.in/placement.php"
    # Additional links from the census to be added
]

async def process_site():
    crawler = AuraCrawler()
    cleaner = AuraCleaner()
    
    for url in CORE_LINKS:
        # 1. Check Credits
        with open("scripts/scraper/credit_guardian.json", "r") as f:
            status = json.load(f)
        if status["current_usage"] >= status["limit"]:
            print("🛑 CREDIT LIMIT REACHED. STOPPING.")
            break

        # 2. Crawl
        html = await crawler.crawl_page(url, dynamic=True)
        if not html: continue

        # 3. Parse & Extract
        parser = AuraParser(html)
        extractor = AuraExtractor(html, url)
        
        raw_payload = {
            "source": "web",
            "url": url,
            "raw_text": parser.extract_text(),
            "tables": parser.extract_tables(),
            "media": extractor.extract_media(),
            "links": extractor.extract_links()
        }

        # 4. Neural Clean
        print(f"🧠 Synthesizing Neural Record for {url}...")
        cleaned_json = await cleaner.clean_data(raw_payload)
        
        if cleaned_json:
            # 5. Store and Update
            filename = url.split("/")[-1].replace(".php", ".json")
            with open(f"organized_vault/cleaned/{filename}", "w") as f:
                f.write(cleaned_json)
            update_credits(1)
            print(f"✅ Successfully processed {url}")

if __name__ == "__main__":
    asyncio.run(process_site())
