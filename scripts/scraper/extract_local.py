import os
from pypdf import PdfReader

# Tier 2 Extraction Configuration
SOURCE_DIRS = [
    'organized_vault/pdfs/medium',
    'organized_vault/pdfs/low'
]
DEBUG_DIR = 'organized_vault/scraper_debug'
CLEANED_ROOT = 'organized_vault/cleaned'

def extract_local():
    print("--- AURA LOCAL EXTRACTION: TIER-2 SURGE (CLUSTER-50) ---")
    
    processed_count = 0
    SURGE_LIMIT = 50
    
    for s_dir in SOURCE_DIRS:
        if processed_count >= SURGE_LIMIT:
            break
            
        tier = os.path.basename(s_dir)
        files = [f for f in os.listdir(s_dir) if f.endswith('.pdf')]
        
        for f_name in files:
            if processed_count >= SURGE_LIMIT:
                break
                
            json_name = f_name.replace('.pdf', '.json')
            if os.path.exists(os.path.join(CLEANED_ROOT, tier, json_name)):
                continue
                
            input_path = os.path.join(s_dir, f_name)
            output_path = os.path.join(DEBUG_DIR, f_name.replace('.pdf', '_raw.md'))
            
            try:
                print(f"[{processed_count+1}/{SURGE_LIMIT}] Extracting {f_name}...")
                reader = PdfReader(input_path)
                text = ""
                for page in reader.pages:
                    text += page.extract_text() + "\n\n"
                
                with open(output_path, 'w', encoding='utf-8') as f:
                    # Mark as local extraction for the neural synthesizer to handle differently if needed
                    f.write(f"--- LOCAL EXTRACTION ---\n\n{text}")
                
                processed_count += 1
            except Exception as e:
                print(f"FAIL: {f_name} - {e}")

    print(f"--- EXTRACTION COMPLETE: {processed_count} Raw Files Stabilized ---")

if __name__ == "__main__":
    extract_local()
