import os
import json
import asyncio
import httpx
from pypdf import PdfReader
from llama_parse import LlamaParse
# Configuration
VAULT_ROOT = os.path.abspath('organized_vault/pdfs')
CLEANED_ROOT = os.path.abspath('organized_vault/cleaned')
GUARDIAN_PATH = os.path.abspath('scripts/scraper/credit_guardian.json')

# Configuration from Environment
LLAMA_CLOUD_API_KEY = os.getenv("LLAMA_CLOUD_API_KEY")
VERCEL_AI_KEY = os.getenv("VERCEL_AI_KEY")
VERCEL_GATEWAY = "https://ai-gateway.vercel.sh/v1/chat/completions"

class AuraIngestor:
    def __init__(self):
        self.parser = LlamaParse(result_type="markdown")

    async def update_credits(self, units=1):
        with open(GUARDIAN_PATH, 'r') as f:
            data = json.load(f)
        data['current_usage'] += units
        with open(GUARDIAN_PATH, 'w') as f:
            json.dump(data, f, indent=4)
        print(f"Usage Update: {data['current_usage']}/10000")

    def get_transport_meta(self, file_name):
        transport_path = os.path.abspath('d:/.gemini/RAG college/raw_vault/legacy_archive/2_structured_json/transport.json')
        with open(transport_path, 'r') as f:
            legacy = json.load(f)
        route_id = file_name.replace('.pdf', '').replace(' ', '')
        # Simple search for timing in legacy text
        import re
        pattern = rf"{route_id}.*?(\d+\.\d+\s*[APM]+)"
        match = re.search(pattern, legacy.get('textContent', ''), re.IGNORECASE)
        return {
            "route_id": route_id,
            "departure_time": match.group(1) if match else "Check Schedule"
        }

    async def neural_clean(self, raw_content, fusion_data={}):
        # Use the definitively verified VERCEL_AI_KEY
        ai_key = os.getenv("VERCEL_AI_KEY")
        headers = {
            "Authorization": f"Bearer {ai_key}",
            "Content-Type": "application/json"
        }
        system_prompt = "You are an Elite Institutional Concierge. Normalize this input into the master JSON schema. Preserve all tables exactly. Do not summarize data."
        user_prompt = f"FUSION_METADATA: {json.dumps(fusion_data)}\n\nRAW_CONTENT:\n{raw_content}"
        
        payload = {
            "model": "gpt-4o-mini",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ]
        }

        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(VERCEL_GATEWAY, headers=headers, json=payload)
            if response.status_code != 200:
                print(f"ERROR: Gateway Response Code {response.status_code}")
                print(f"BODY: {response.text}")
                response.raise_for_status()
            
            output = response.json()
            if 'choices' not in output:
                print(f"ERROR: Missing 'choices' key. Full Response: {output}")
                raise KeyError("choices")
                
            return output['choices'][0]['message']['content']

    async def process_file(self, priority, file_path):
        file_name = os.path.basename(file_path)
        output_dir = os.path.join(CLEANED_ROOT, priority)
        os.makedirs(output_dir, exist_ok=True)

        print(f"Processing [{priority.upper()}]: {file_name}")
        
        # 1. Extract
        if priority == "high":
            # LlamaParse for Tables
            docs = self.parser.load_data(file_path)
            raw_text = docs[0].text
        else:
            # Local PyPDF for Text-only
            reader = PdfReader(file_path)
            raw_text = "\n".join([page.extract_text() for page in reader.pages])

        # 2. Fusion Check
        fusion_data = {}
        if priority == "high" and (file_name.startswith('AR') or file_name.startswith('R')):
            fusion_data = self.get_transport_meta(file_name)

        # 3. Neural Clean
        cleaned = await self.neural_clean(raw_text, fusion_data)
        
        # 4. Save
        output_path = os.path.join(output_dir, file_name.replace('.pdf', '.json'))
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(cleaned)
        
        await self.update_credits(5 if priority == "high" else 1)
        print(f"Finalized: {output_path}")

async def main():
    ingestor = AuraIngestor()
    
    # Surge Configuration: Process 10 New High-Priority Files
    SURGE_LIMIT = 10
    processed_count = 0
    
    print("--- AURA MASS INGESTION: CLUSTER-10 SURGE ---")
    
    high_vault = os.path.join(VAULT_ROOT, "high")
    files = [f for f in os.listdir(high_vault) if f.endswith('.pdf')]
    
    for file_name in files:
        if processed_count >= SURGE_LIMIT:
            print("🛑 CHECKPOINT REACHED: 10 Files Processed.")
            break
            
        file_path = os.path.join(high_vault, file_name)
        output_name = file_name.replace('.pdf', '.json')
        output_path = os.path.join(CLEANED_ROOT, "high", output_name)
        
        # Deduplication: Skip if already cleaned
        if os.path.exists(output_path):
            print(f"Skipping (Already Cleaned): {file_name}")
            continue
            
        try:
            await ingestor.process_file("high", file_path)
            processed_count += 1
        except Exception as e:
            print(f"ERROR Processing {file_name}: {e}")
            
    print(f"--- SURGE COMPLETE: {processed_count} Nodes Neutralized ---")

if __name__ == "__main__":
    asyncio.run(main())
