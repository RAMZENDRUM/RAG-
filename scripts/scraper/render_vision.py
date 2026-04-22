import fitz # PyMuPDF
import os

def render_vision(pdf_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    print(f"?? Opening Scanned Giant: {pdf_path}")
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    print(f"?? Total Pages: {total_pages}")
    
    # Render first 50 pages for the initial surge (usually covers all important sections)
    surge_limit = min(total_pages, 50)
    
    for i in range(surge_limit):
        page = doc.load_page(i)
        pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5)) # 1.5x zoom (balance quality/size)
        file_name = f"page_{i+1:03d}.png"
        output_path = os.path.join(output_dir, file_name)
        pix.save(output_path)
        if (i+1) % 10 == 0:
            print(f"?? Rendered {i+1}/{surge_limit}")
            
    print(f"? RENDERED {surge_limit} PAGES to {output_dir}")

# Task 1: Prospectus
render_vision("organized_vault/pdfs/high/College-Prospectus.pdf", "organized_vault/scraper_debug/vision/prospectus")
