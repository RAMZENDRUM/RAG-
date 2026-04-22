import json
from bs4 import BeautifulSoup

class AuraParser:
    def __init__(self, raw_html):
        self.soup = BeautifulSoup(raw_html, 'lxml')

    def extract_text(self):
        """Extract all meaningful text, grouped by headings."""
        sections = []
        # Find all content-related tags
        for tag in self.soup.find_all(['h1', 'h2', 'h3', 'p']):
            if tag.name.startswith('h'):
                sections.append({"heading": tag.get_text(strip=True), "content": ""})
            elif tag.name == 'p' and sections:
                sections[-1]["content"] += tag.get_text(strip=True) + " "
            elif tag.name == 'p':
                sections.append({"heading": "Header Context", "content": tag.get_text(strip=True)})
        return sections

    def extract_tables(self):
        """Convert all HTML tables to structured JSON."""
        tables = []
        for table in self.soup.find_all('table'):
            headers = [th.get_text(strip=True) for th in table.find_all('th')]
            rows = []
            for tr in table.find_all('tr'):
                cells = [td.get_text(strip=True) for td in tr.find_all('td')]
                if cells:
                    rows.append(cells)
            
            if not headers and rows:
                headers = rows[0]
                rows = rows[1:]
            
            tables.append({"headers": headers, "rows": rows})
        return tables

    def parse_all(self):
        """Full data normalization."""
        return {
            "sections": self.extract_text(),
            "tables": self.extract_tables()
        }

if __name__ == "__main__":
    # Test with placeholder HTML
    with open("scripts/scraper/raw_test.html", "r", encoding="utf-8") as f:
        html = f.read()
    parser = AuraParser(html)
    result = parser.parse_all()
    with open("scripts/scraper/parsed_test.json", "w") as f:
        json.dump(result, f, indent=4)
    print(f"✅ Parsed successfully. Tables found: {len(result['tables'])}")
