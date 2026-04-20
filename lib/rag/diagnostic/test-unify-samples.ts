import fs from 'fs';
import path from 'path';

// Simplified sample generator to demonstrate Production-Grade Unification
async function generateSamples() {
  const samples = [
    {
      type: "Numerical with Conflict Handling",
      content: "The placement percentage for Mohamed Sathak A.J. College of Engineering is reported as 85–90% on the official website, while the formal Academic Annual Report (2023-2024) specificially records a graduate pass percentage of 78% and an average cut-off mark of 125.",
      metadata: {
        source_layer: "mixed",
        data_type: "numerical",
        entity: "placement",
        confidence: "conflict",
        source_refs: ["placement.txt", "AnnualReport2023-2024.pdf.txt"]
      }
    },
    {
      type: "Timing with Context",
      content: "The college bus route AR-3 reaches the SIPCOT / Siruseri IT Park bus stop at 07:50 AM daily. It departs from its origin point at Uthiramerur at 05:50 AM and arrives at the Mohamed Sathak A.J. College of Engineering campus at 08:00 AM.",
      metadata: {
        source_layer: "core",
        data_type: "timing",
        entity: "bus_route",
        confidence: "high",
        source_file: "transport.txt",
        source_refs: ["transport.txt"]
      }
    },
    {
      type: "Merged Entity Enrichment",
      content: "Dr. K. S. Srinivasan serves as the Principal of Mohamed Sathak A.J. College of Engineering. He oversees the 70-acre green campus located within the SIPCOT IT Park in Siruseri, Chennai.",
      metadata: {
        source_layer: "mixed",
        data_type: "narrative",
        entity: "faculty",
        confidence: "high",
        source_refs: ["about.txt", "principal.php.txt", "principal.json"]
      }
    }
  ];

  console.log(JSON.stringify(samples, null, 2));
}

generateSamples();
