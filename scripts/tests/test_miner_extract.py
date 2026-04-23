from pdfminer.high_level import extract_text
import os

def miner_extract(pdf_path):
    print(f"?? Opening Heavy Asset (pdfminer): {pdf_path}")
    try:
        # Extract text from the whole file
        text = extract_text(pdf_path)
        
        output_name = os.path.basename(pdf_path).replace('.pdf', '_raw.md')
        output_path = os.path.join("organized_vault/scraper_debug", output_name)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write("--- ROBUST LOCAL EXTRACTION (PDFMINER) ---\n\n")
            f.write(text)
            
        print(f"? FINALIZED: {output_path} ({len(text)} chars)")
    except Exception as e:
        print(f"? Failed: {e}")

# Test on the Prospectus
miner_extract("organized_vault/pdfs/high/College-Prospectus.pdf")
miner_extract("organized_vault/pdfs/low/CE8501-LN.pdf")
miner_extract("organized_vault/pdfs/low/CE8591-QB.pdf")
