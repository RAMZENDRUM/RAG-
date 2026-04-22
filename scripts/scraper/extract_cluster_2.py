import os
import json
from llama_parse import LlamaParse

# Key Pool for rotation (Updated with your newest credentials)
KEYS = [
    'llx-yxoS4ueYGTvu0N6D3fUCIBPJQePJi0EBtmjanPtVd29bFqIk',
    'llx-tRfbR2GkY00ppw4GlBRDp0z8p3LoLs54LgINrkucOVnc1oVZ',
    'llx-U3XjsjYCBANiuMYuZasZp7HDkxijeCw3VDC4twUFvMqDcrFv'
]

VAULT = 'organized_vault/pdfs/high'
DEBUG = 'organized_vault/scraper_debug'
CLEANED = 'organized_vault/cleaned/high'

# Cluster Logic: Skip already processed
all_files = sorted([f for f in os.listdir(VAULT) if f.endswith('.pdf')])
cluster_target = []

for f_name in all_files:
    json_name = f_name.replace('.pdf', '.json')
    if not os.path.exists(os.path.join(CLEANED, json_name)):
        cluster_target.append(f_name)
    if len(cluster_target) >= 10:
        break

print(f"--- AURA EXTRACTION: CLUSTER-2 (Targeting {len(cluster_target)} files) ---")

for i, f_name in enumerate(cluster_target):
    # Rotate Key
    current_key = KEYS[i % len(KEYS)]
    os.environ['LLAMA_CLOUD_API_KEY'] = current_key
    
    # Check if raw already exists to avoid re-extraction
    raw_path = os.path.join(DEBUG, f_name.replace('.pdf', '_raw.md'))
    if os.path.exists(raw_path):
        print(f"Skipping (Raw Exists): {f_name}")
        continue

    try:
        f_path = os.path.join(VAULT, f_name)
        print(f"[{i+1}/10] Processing {f_name} (Key: {current_key[:8]}...)")
        
        parser = LlamaParse(result_type='markdown')
        docs = parser.load_data(f_path)
        
        with open(raw_path, 'w', encoding='utf-8') as f:
            f.write(docs[0].text)
        print(f"Success: {f_name}")
    except Exception as e:
        print(f"FAIL: {f_name} - {e}")

print("--- CLUSTER-2 EXTRACTION COMPLETE ---")
