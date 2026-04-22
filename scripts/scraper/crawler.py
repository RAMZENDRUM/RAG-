import asyncio
import httpx
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright
import json
import os
from dotenv import load_dotenv

load_dotenv()

class AuraCrawler:
    def __init__(self, headless=True):
        self.headless = headless
        self.client = httpx.AsyncClient(timeout=30.0)
        self.visited_urls = set()
        self.queue = []

    async def fetch_static(self, url):
        """Fetch static HTML using httpx for speed."""
        try:
            response = await self.client.get(url)
            return response.text
        except Exception as e:
            print(f"❌ Static fetch failed for {url}: {e}")
            return None

    async def fetch_dynamic(self, url):
        """Fetch JS-rendered HTML using Playwright."""
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=self.headless)
            page = await browser.new_page()
            try:
                await page.goto(url, wait_until="networkidle")
                content = await page.content()
                await browser.close()
                return content
            except Exception as e:
                print(f"❌ Dynamic fetch failed for {url}: {e}")
                await browser.close()
                return None

    async def crawl_page(self, url, dynamic=False):
        """Process a single page."""
        if url in self.visited_urls:
            return None
        
        print(f"📡 Crawling: {url}")
        html = await self.fetch_dynamic(url) if dynamic else await self.fetch_static(url)
        
        if html:
            self.visited_urls.add(url)
            return html
        return None

async def main():
    # Test Run for AR7 Route Page if applicable
    crawler = AuraCrawler()
    # Placeholder for the 28 core links provided in the census
    test_url = "https://www.msajce-edu.in/admission.php"
    html = await crawler.crawl_page(test_url, dynamic=True)
    if html:
        with open("scripts/scraper/raw_test.html", "w", encoding="utf-8") as f:
            f.write(html)
        print(f"✅ Crawled {test_url} successfully. Length: {len(html)}")

if __name__ == "__main__":
    asyncio.run(main())
