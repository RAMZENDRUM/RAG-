from pypdf import PdfReader
import os

def stream_extract(pdf_path):
    print(f"?? Opening Heavy Asset (pypdf): {pdf_path}")
    reader = PdfReader(pdf_path)
    
    total_pages = len(reader.pages)
    print(f"?? Total Pages: {total_pages}")
    
    output_name = os.path.basename(pdf_path).replace('.pdf', '_raw.md')
    output_path = os.path.join("organized_vault/scraper_debug", output_name)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("--- HEAVY LOCAL EXTRACTION ---\n\n")
        for i in range(total_pages):
            f.write(reader.pages[i].extract_text() + "\n\n")
            if i % 100 == 0:
                print(f"?? Progress: {i}/{total_pages}")
            
    print(f"? FINALIZED: {output_path}")

# Test on the Prospectus
stream_extract("organized_vault/pdfs/high/College-Prospectus.pdf")
stream_extract("organized_vault/pdfs/low/CE8501-LN.pdf")
stream_extract("organized_vault/pdfs/low/CE8591-QB.pdf")
