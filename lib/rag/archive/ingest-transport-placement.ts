import postgres from 'postgres';
import { embedMany } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL!);
const ai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const model = ai.embedding('openai/text-embedding-3-small');

const TRANSPORT_CHUNKS = [
  {
    content: "The MSAJCE Institute provides extensive transportation facilities covering Chennai, Chengalpattu, Kanchipuram, and Thiruvallur. The fleet includes 22 buses, one Tata ACE, and one ambulance for student and staff safety.",
    metadata: { type: "transport_overview", department: "transport" }
  },
  {
    content: "The Transport Contact for MSAJCE is Dr. K.P. Santhosh Nathan. He can be reached at mobile number 98408 86992 for any queries related to college buses.",
    metadata: { type: "transport_contact", department: "transport" }
  },
  {
    content: "The nearest public transport stop for MSAJCE is the SIPCOT / Siruseri IT Park bus stop. Multiple MTC bus routes like 19, 519, 221H, 102X, 102S, 102, B19, 570, 570S, and 105 provide daily service to this location.",
    metadata: { type: "mtc", department: "transport" }
  },
  {
    content: "MTC Bus Route 19 operates daily from T. Nagar to Thiruporur via OMR, Madhiya Kailash, and SRP. It stops at the SIPCOT / Siruseri IT Park stop near the college.",
    metadata: { type: "mtc", route_no: "19", department: "transport" }
  },
  {
    content: "MTC Bus Route 519 operates daily from T. Nagar to Thiruporur via Saidapet, Adyar, and SRP. It stops near the college at the SIPCOT / Siruseri IT Park bus stop.",
    metadata: { type: "mtc", route_no: "519", department: "transport" }
  },
  {
    content: "College Bus Route AR-3 starts from Uthiramerur at 05:50 AM. It stops at G.H Hospital (06:20), Paranur Tollgate (06:35), Mahindra City (06:40), S.P. Koil (06:45), Maraimalai Nagar (06:48), Guduvanchery (06:50), Ooraapakkam (06:52), Vandalur Zoo (06:55), Perungalathur (07:00), Kandigai (07:15), Mambakkam (07:25), Puthupakkam (07:30), Kelambakkam (07:40), SIPCOT (07:50) and reaches MSAJCE College at 08:00 AM. Driver: Mr. Sathish K (+91-9789970304).",
    metadata: { type: "transport_route", route_no: "AR-3", department: "transport" }
  },
  {
    content: "College Bus Route AR-4 starts from Moolakadai at 06:10 AM. It passes through Perambur Railway Station (06:15), Otteri Pattalam (06:18), Dowton (06:23), Vepery Police Station (06:25), Periyamed (06:30), Central (06:35), Parrys Corner (06:40), Marina Beach (06:45), Santhome (06:50), Adyar (07:00), Thiruvanmiyur (07:05), Palavakkam (07:10), Neelankarai (07:15), Akkarai Water Tank (07:20), Sholinganallur (07:25), and Ladies Hostel (07:30), arriving at MSAJCE College at 08:00 AM. Driver: Mr. M. Suresh (+91-9849265637).",
    metadata: { type: "transport_route", route_no: "AR-4", department: "transport" }
  },
  {
    content: "College Bus Route AR-5 (also known as N-3) starts from MMDA School at 06:15 AM. Stops include Anna Nagar (06:20), Chinthamani (06:25), Skywalk (06:30), Choolaimadu (06:33), Loyola College (06:35), T. Nagar (06:40), CIT Nagar (06:43), Saidapet (06:45), Velachery Check Post (06:50), Vijaya Nagar Bus Stop (06:53), Baby Nagar (06:55), Tharamani (07:00), MGR Road (07:15), OMR (07:20), and Ladies Hostel (07:35), reaching MSAJCE College at 08:00 AM. Driver: Mr. Velu (+91-9940050685).",
    metadata: { type: "transport_route", route_no: "AR-5", department: "transport" }
  },
  {
    content: "College Bus Route AR-6 starts from MMDA School at 06:15 AM. Its route includes Anna Nagar (06:20), Chinthamani (06:25), Skywalk (06:30), Choolaimadu (06:33), Loyola College (06:35), T. Nagar (06:40), CIT Nagar (06:43), Saidapet (06:45), Velachery Check Post (06:50), Vijaya Nagar Bus Stop (06:53), Baby Nagar (06:55), Tharamani (07:00), MGR Road (07:15), OMR (07:20), and Ladies Hostel (07:35), reaching MSAJCE College at 08:00 AM. Driver: Mr. Venkatachalam (+91-9025731746).",
    metadata: { type: "transport_route", route_no: "AR-6", department: "transport" }
  },
  {
    content: "College Bus Route AR-7 starts from Chunambedu at 05:25 AM. Routes include Kadapakkam (05:45), Elliyamman Koil (06:00), Koovathur (06:17), Kathan Kadai (06:22), Kalpakkam (06:30), Caturankappattinam (06:40), Venkampakkam (06:50), Thirukazukundram (07:00), Punceri (07:12), Paiyanur (07:15), Alathur (07:20), Thirupporur (07:30), Kalavakkam (07:36), Cenkanmal (07:41), Kelambakkam (07:45), Padur (07:50), and Aananth College (07:53), arriving at MSAJCE College at 08:00 AM. Driver: Mr. Suresh (+91-9789895025).",
    metadata: { type: "transport_route", route_no: "AR-7", department: "transport" }
  },
  {
    content: "College Bus Route AR-8 starts from Manjambakkam at 05:50 AM. It passes through Retteri (05:55), Senthil Nagar (06:00), Padi (06:05), Anna Nagar (06:10), Thirumangalam (06:12), Vijaykanth (06:15), CMBT (06:20), Vadapalani (06:25), Ashok Pillar (06:30), Kasi Theatre (06:35), Ekkattuthangal (06:40), Aadampakkam (06:50), Kaiveli (06:55), Pallikaranai (07:10), Medavakkam (07:20), Perumpakkam (07:25), Sholinganallur (07:30), and Ladies Hostel (07:35), reaching MSAJCE College at 08:00 AM. Driver: Mr. Raju (+91-9790750906).",
    metadata: { type: "transport_route", route_no: "AR-8", department: "transport" }
  },
  {
    content: "College Bus Route AR-9 starts from Ennore at 06:15 AM. It travels through Mint (06:20), Broadway (06:25), Central (06:30), Omandhoorar Hospital (06:40), Royapettah (06:45), Mylapore (06:50), Santhome (07:00), Adyar (07:10), Thiruvanmiyur (07:15), Palavakkam (07:20), Neelankarai (07:25), Akkarai Water Tank (07:30), Sholinganallur (07:35), and Ladies Hostel (07:40), reaching MSAJCE College at 08:00 AM. Driver: Mr. Kanagaraj (+91-9710209097).",
    metadata: { type: "transport_route", route_no: "AR-9", department: "transport" }
  },
  {
    content: "College Bus Route R-20 starts from Moolakadai at 05:55 AM. Stops include Perambur Railway (06:10), Otteri Pattalam (06:15), Dowton (06:20), Central (06:25), Parrys (06:30), Omandhoorar Hospital (06:40), Royapettah (06:45), Mylapore (06:50), Santhome (07:00), Adyar (07:05), Thiruvanmiyur (07:10), Palavakkam (07:15), Neelankarai (07:20), Akkarai Water Tank (07:25), Sholinganallur (07:30), and Ladies Hostel (07:35), reaching MSAJCE College at 08:00 AM. Driver: Mr. M. Suresh (+91-9849265637).",
    metadata: { type: "transport_route", route_no: "R-20", department: "transport" }
  },
  {
    content: "College Bus Route R-21 starts from Porur at 06:25 AM. It passes through Boy Kadai (06:33), Kovoor (06:35), Kundrathur (06:38), Anagaputhur (06:40), Pammal (06:43), Pallavaram (06:45), Meenambakkam (06:48), West and East Tambaram (07:00), Camp Road (07:05), Saliyur (07:10), Medavakkam (07:25), Chithalapakkam (07:30), and Thalambur (07:35), reaching MSAJCE College at 08:00 AM. Driver: Mr. E. Sathish (+91-9677007583).",
    metadata: { type: "transport_route", route_no: "R-21", department: "transport" }
  },
  {
    content: "College Bus Route R-22 starts from Nemilichery at 05:50 AM. It travels through Poonamallee (06:05), Kumanan Chavadi (06:00), Kattupakkam (06:05), Ramachandra Hospital (06:10), Porur (06:15), Valasaravakkam (06:20), Ramapuram (06:25), Nandhampakkam (06:30), Kathipara Junction (06:35), Thillai Ganga Subway (06:40), Velachery Bypass (06:45), Kaiveli (07:00), Madipakkam (07:05), Kilkattalai (07:10), Kovilambakkam (07:15), Medavakkam (07:20), and Sholinganallur (07:25), reaching MSAJCE College at 08:00 AM. Driver: Mr. Jaffar (+91-9566037890).",
    metadata: { type: "transport_route", route_no: "R-22", department: "transport" }
  },
  {
    content: "MSAJCE has a strong placement record with an 85–90% placement rate. The average salary package ranges from 3.0 to 3.3 LPA, while the highest salary package exceeds 8 LPA.",
    metadata: { type: "placement", category: "stats", department: "placement" }
  },
  {
    content: "The college invites numerous top-tier recruiters including TCS, Wipro, Infosys, CTS, and HCL to campus for student placements across all engineering departments.",
    metadata: { type: "placement", category: "recruiters", department: "placement" }
  }
];

async function ingestHighFidelityTransport() {
  console.log('--- Ingesting High-Fidelity Transport & Placement Data ---');
  
  const values = TRANSPORT_CHUNKS.map(c => c.content);

  try {
    const { embeddings } = await embedMany({
      model,
      values,
    });

    for (let i = 0; i < TRANSPORT_CHUNKS.length; i++) {
      const chunk = TRANSPORT_CHUNKS[i].content;
      const embedding = embeddings[i];
      const metadata = {
        ...TRANSPORT_CHUNKS[i].metadata,
        source: "structured_data",
        ingested_at: new Date().toISOString()
      };

      if (embedding) {
        const vectorStr = `[${embedding.join(',')}]`;
        await sql`
          INSERT INTO documents (content, embedding, metadata)
          VALUES (${chunk}, ${vectorStr}, ${sql.json(metadata)})
        `;
      }
    }
    console.log('Successfully stored structured transport and placement data.');
  } catch (error) {
    console.error('Ingestion Error:', error);
  } finally {
    process.exit(0);
  }
}

ingestHighFidelityTransport();
