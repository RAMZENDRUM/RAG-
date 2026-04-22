import os
import json
import httpx
from dotenv import load_dotenv

load_dotenv()

class AuraCleaner:
    def __init__(self, use_vercel=True):
        self.api_key = os.getenv("VERCEL_AI_KEY") if use_vercel else os.getenv("GROQ_API_KEY")
        self.base_url = "https://ai-gateway.vercel.sh/v1/chat/completions" if use_vercel else "https://api.groq.com/openai/v1/chat/completions"
        self.system_prompt = """You are an advanced data extraction and normalization engine.
Your task is to transform raw, messy input (from web scraping or PDF parsing) into clean, structured, and consistent JSON suitable for a production-grade knowledge base.

OUTPUT SCHEMA:
{
"source": "web | pdf",
"title": "",
"url": "",
"sections": [
{
"heading": "",
"content": "",
"tables": [{"headers": [], "rows": []}],
"media": [{"type": "image | video", "src": "", "alt": "", "context": ""}],
"links": [{"text": "", "url": "", "type": "internal | external"}]
}
],
"metadata": {"category": "", "department": "", "importance": "high | medium | low"}
}

STRICT RULES:
1. OUTPUT MUST BE VALID JSON ONLY.
2. NO HALLUCINATION.
3. REMOVE NOISE (MENUS, HEADERS, FOOTERS).
"""

    async def clean_data(self, raw_data):
        """Clean raw data using the Neural Engine."""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "gpt-4o-mini",
            "messages": [
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": f"PROCESS THIS INPUT:\n{json.dumps(raw_data)}"}
            ],
            "response_format": {"type": "json_object"}
        }

        async with httpx.AsyncClient(timeout=60.0) as client:
            try:
                response = await client.post(self.base_url, headers=headers, json=payload)
                response.raise_for_status()
                return response.json()["choices"][0]["message"]["content"]
            except Exception as e:
                print(f"❌ Neural Cleaning Failed: {e}")
                return None

# Credit Guardian Update Logic (Placeholder)
def update_credits(pages=1):
    path = "scripts/scraper/credit_guardian.json"
    with open(path, "r") as f:
        data = json.load(f)
    data["current_usage"] += pages
    with open(path, "w") as f:
        json.dump(data, f, indent=4)
    print(f"📈 Credits Updated: {data['current_usage']}/10000")
