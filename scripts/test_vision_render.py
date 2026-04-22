import fitz # PyMuPDF
import os

def render_test(pdf_path):
    print(f"?? Opening Scanned Giant: {pdf_path}")
    doc = fitz.open(pdf_path)
    page = doc.load_page(0) # First page
    
    # Render to image (PNG)
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2)) # 2x zoom for clarity
    output_path = os.path.join("organized_vault/scraper_debug", "PROSPECTUS_P1.png")
    pix.save(output_path)
    
    print(f"? RENDERED: {output_path} ({os.path.getsize(output_path)} bytes)")

render_test("organized_vault/pdfs/high/College-Prospectus.pdf")
