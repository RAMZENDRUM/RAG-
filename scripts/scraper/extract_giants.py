import os
import time
from llama_parse import LlamaParse
import dotenv

# Load environment variables
dotenv.load_dotenv('d:/.gemini/RAG college/.env')

# Multi-Key Pool for LlamaParse (from user turn 5)
KEY_POOL = [
    os.getenv('LLAMA_CLOUD_API_KEY'),
    "llx-tRfbR2GkY00ppw4GlBRDp0z8p3LoLs54LgINrkucOVnc1oVZ", # Key 2
    "llx-U3XjsjYCBANiuMYuZasZp7HDkxijeCw3VDC4twUFvMqDcrFv"  # Key 3
]

def extract_giant(file_path, key_index):
    file_name = os.path.basename(file_path)
    print(f"[KEY-{key_index}] Extracting GIANT: {file_name}...")
    
    parser = LlamaParse(
        api_key=KEY_POOL[key_index % len(KEY_POOL)],
        result_type="markdown",
        verbose=True,
        language="en",
        num_workers=4
    )
    
    try:
        documents = parser.load_data(file_path)
        content = "\n\n".join([doc.text for doc in documents])
        
        output_name = file_name.replace('.pdf', '') + "_raw.md"
        output_path = os.path.join("organized_vault/scraper_debug", output_name)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"DONE Extracted: {output_path} ({len(content)} chars)")
    except Exception as e:
        print(f"❌ Failed: {e}")

def run():
    giants = [
        "organized_vault/pdfs/high/College-Prospectus.pdf",
        "organized_vault/pdfs/low/CE8501-LN.pdf",
        "organized_vault/pdfs/low/CE8591-QB.pdf"
    ]
    
    for i, g in enumerate(giants):
        extract_giant(g, i)

if __name__ == "__main__":
    run()
