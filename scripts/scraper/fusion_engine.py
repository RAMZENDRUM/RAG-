import json
import os
from cleaner import AuraCleaner

class AuraFusionEngine:
    def __init__(self):
        self.cleaner = AuraCleaner()
        with open("d:/.gemini/RAG college/raw_vault/legacy_archive/2_structured_json/transport.json", "r") as f:
            self.legacy_data = json.load(f)

    def get_legacy_meta(self, route_id):
        """Extract metadata for a specific route from the legacy JSON."""
        # Clean the search string (e.g., 'AR 7' -> 'AR7')
        search_id = route_id.strip().replace(" ", "")
        
        # In transport.json, the content is in 'textContent' string
        text = self.legacy_data.get("textContent", "")
        # Find the line relating to the route
        import re
        pattern = rf"{route_id}.*?(\d+\.\d+\s*[APM]+)"
        match = re.search(pattern, text)
        timing = match.group(1) if match else "N/A"
        
        return {
            "route_id": route_id,
            "starting_point": "Assumed from Route Name",  # Will be refined by AI
            "departure_time": timing
        }

    async def fuse_route(self, route_id, pdf_content):
        """Combine PDF schedule with JSON metadata."""
        meta = self.get_legacy_meta(route_id)
        
        raw_payload = {
            "source": "pdf_json_fused",
            "title": f"MSAJCE Bus Route {route_id}",
            "legacy_metadata": meta,
            "schedule_data": pdf_content
        }

        print(f"🧬 Fusing Intelligence for {route_id}...")
        return await self.cleaner.clean_data(raw_payload)

if __name__ == "__main__":
    # Test fusion logic with dummy data
    engine = AuraFusionEngine()
    print(f"✅ Fusion Engine initialized with {len(engine.legacy_data['documents'])} routes.")
