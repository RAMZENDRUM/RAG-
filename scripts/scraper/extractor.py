import json
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin

class AuraExtractor:
    def __init__(self, raw_html, base_url):
        self.soup = BeautifulSoup(raw_html, 'lxml')
        self.base_url = base_url
        self.domain = urlparse(base_url).netloc

    def extract_media(self):
        """Extract images and videos with context."""
        media = []
        # Images
        for img in self.soup.find_all('img'):
            src = img.get('src')
            if src:
                # Find surrounding text for context
                parent = img.find_parent()
                context = parent.get_text(separator=" ", strip=True) if parent else ""
                media.append({
                    "type": "image",
                    "src": urljoin(self.base_url, src),
                    "alt": img.get('alt', ''),
                    "context": context[:200]  # Limit context length
                })
        
        # Videos (iframes)
        for iframe in self.soup.find_all('iframe'):
            src = iframe.get('src')
            if src and any(x in src for x in ['youtube', 'vimeo', 'embed']):
                media.append({
                    "type": "video",
                    "src": src,
                    "alt": "Embedded Video",
                    "context": iframe.get('title', 'Institutional Video Content')
                })
        return media

    def extract_links(self):
        """Classify links as internal or external."""
        links = []
        for a in self.soup.find_all('a', href=True):
            href = a['href']
            url = urljoin(self.base_url, href)
            link_type = "internal" if self.domain in urlparse(url).netloc else "external"
            links.append({
                "text": a.get_text(strip=True),
                "url": url,
                "type": link_type
            })
        return links

    def run(self):
        return {
            "media": self.extract_media(),
            "links": self.extract_links()
        }

if __name__ == "__main__":
    with open("scripts/scraper/raw_test.html", "r", encoding="utf-8") as f:
        html = f.read()
    extractor = AuraExtractor(html, "https://www.msajce-edu.in/admission.php")
    result = extractor.run()
    with open("scripts/scraper/extracted_test.json", "w") as f:
        json.dump(result, f, indent=4)
    print(f"✅ Extracted successfully. Media items: {len(result['media'])}")
