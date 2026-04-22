import fitz # PyMuPDF
import os

def stream_extract(pdf_path):
    print(f"?? Opening Heavy Asset: {pdf_path}")
    doc = fitz.open(pdf_path)
    text_content = []
    
    total_pages = len(doc)
    print(f"?? Total Pages: {total_pages}")
    
    for i in range(total_pages):
        page = doc.load_page(i)
        text_content.append(page.get_text("text"))
        if i % 50 == 0:
            print(f"?? Progress: {i}/{total_pages}")
            
    content = "\n\n".join(text_content)
    output_path = pdf_path.replace('.pdf', '_raw.md').replace('pdfs/high/', 'scraper_debug/').replace('pdfs/low/', 'scraper_debug/')
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"? FINALIZED: {output_path} ({len(content)} chars)")

# Test on the Prospectus
stream_extract("organized_vault/pdfs/high/College-Prospectus.pdf")
