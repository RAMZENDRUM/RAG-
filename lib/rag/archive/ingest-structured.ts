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

const transportRoutes = [
  {
    no: "AR-3",
    driver: "Mr. Sathish K",
    phone: "+91-9789970304",
    path: "G.H Hospital (06:20) -> Paranur Tollgate (06:35) -> Mahindra City (06:40) -> S.P. Koil (06:45) -> Maraimalai Nagar (06:48) -> Guduvanchery (06:50) -> Ooraapakkam (06:52) -> Vandalur Zoo (06:55) -> Perungalathur (07:00) -> Kandigai (07:15) -> Mambakkam (07:25) -> Puthupakkam (07:30) -> Kelambakkam (07:40) -> SIPCOT (07:50) -> M.S.A.J.C.E – College (08:00)"
  },
  {
    no: "AR-4",
    driver: "Mr. M. Suresh",
    phone: "+91-9849265637",
    path: "Moolakadai (06:10) -> Perambur Railway Station (06:15) -> Otteri Pattalam (06:18) -> Dowton (06:23) -> Vepery Police Station (06:25) -> Periyamed (06:30) -> Central (06:35) -> Parrys Corner (06:40) -> Marina Beach (06:45) -> Santhome (06:50) -> Adyar (07:00) -> Thiruvanmiyur (07:05) -> Palavakkam (07:10) -> Neelankarai (07:15) -> Akkarai Water Tank (07:20) -> Sholinganallur (07:25) -> Ladies Hostel (07:30) -> M.S.A.J.C.E – College (08:00)"
  },
  {
    no: "AR-5 / N-3",
    driver: "Mr. Velu",
    phone: "+91-9940050685",
    path: "MMDA School (06:15) -> Anna Nagar (06:20) -> Chinthamani (06:25) -> Skywalk (06:30) -> Choolaimadu (06:33) -> Loyola College (06:35) -> T. Nagar (06:40) -> CIT Nagar (06:43) -> Saidapet (06:45) -> Velachery Check Post (06:50) -> Vijaya Nagar Bus Stop (06:53) -> Baby Nagar (06:55) -> Tharamani (07:00) -> MGR Road (07:15) -> OMR (07:20) -> Ladies Hostel (07:35) -> M.S.A.J.C.E – College (08:00)"
  },
  {
    no: "AR-6",
    driver: "Mr. Venkatachalam",
    phone: "+91-9025731746",
    path: "MMDA School (06:15) -> Anna Nagar (06:20) -> Chinthamani (06:25) -> Skywalk (06:30) -> Choolaimadu (06:33) -> Loyola College (06:35) -> T. Nagar (06:40) -> CIT Nagar (06:43) -> Saidapet (06:45) -> Velachery Check Post (06:50) -> Vijaya Nagar Bus Stop (06:53) -> Baby Nagar (06:55) -> Tharamani (07:00) -> MGR Road (07:15) -> OMR (07:20) -> Ladies Hostel (07:35) -> M.S.A.J.C.E – College (08:00)"
  },
  {
    no: "AR-7",
    driver: "Mr. Suresh",
    phone: "+91-9789895025",
    path: "Chunambedu (05:25) -> Kadapakkam (05:45) -> Elliyamman Koil (06:00) -> Koovathur (06:17) -> Kathan Kadai (06:22) -> Kalpakkam (06:30) -> Caturankappattinam (06:40) -> Venkampakkam (06:50) -> Thirukazukundram (07:00) -> Punceri (07:12) -> Paiyanur (07:15) -> Alathur (07:20) -> Thirupporur (07:30) -> Kalavakkam (07:36) -> Cenkanmal (07:41) -> Kelambakkam (07:45) -> Padur (07:50) -> Aananth College (07:53) -> M.S.A.J.C.E – College (08:00)"
  },
  {
    no: "AR-8",
    driver: "Mr. Raju",
    phone: "+91-9790750906",
    path: "Manjambakkam (05:50) -> Retteri (05:55) -> Senthil Nagar (06:00) -> Padi (06:05) -> Anna Nagar (06:10) -> Thirumangalam (06:12) -> Vijaykanth (06:15) -> CMBT (06:20) -> Vadapalani (06:25) -> Ashok Pillar (06:30) -> Kasi Theatre (06:35) -> Ekkattuthangal (06:40) -> Aadampakkam (06:50) -> Kaiveli (06:55) -> Pallikaranai (07:10) -> Medavakkam (07:20) -> Perumpakkam (07:25) -> Sholinganallur (07:30) -> Ladies Hostel (07:35) -> M.S.A.J.C.E – College (08:00)"
  },
  {
    no: "AR-9",
    driver: "Mr. Kanagaraj",
    phone: "+91-9710209097",
    path: "Ennore (06:15) -> Mint (06:20) -> Broadway (06:25) -> Central (06:30) -> Omandhoorar Hospital (06:40) -> Royapettah (06:45) -> Mylapore (06:50) -> Santhome (07:00) -> Adyar (07:10) -> Thiruvanmiyur (07:15) -> Palavakkam (07:20) -> Neelankarai (07:25) -> Akkarai Water Tank (07:30) -> Sholinganallur (07:35) -> Ladies Hostel (07:40) -> M.S.A.J.C.E – College (08:00)"
  },
  {
    no: "R-20",
    driver: "Mr. M. Suresh",
    phone: "+91-9849265637",
    path: "Moolakadai (05:55) -> Perambur Railway (06:10) -> Otteri Pattalam (06:15) -> Dowton (06:20) -> Central (06:25) -> Parrys (06:30) -> Omandhoorar Hospital (06:40) -> Royapettah (06:45) -> Mylapore (06:50) -> Santhome (07:00) -> Adyar (07:05) -> Thiruvanmiyur (07:10) -> Palavakkam (07:15) -> Neelankarai (07:20) -> Akkarai Water Tank (07:25) -> Sholinganallur (07:30) -> Ladies Hostel (07:35) -> M.S.A.J.C.E – College (08:00)"
  },
  {
    no: "R-21",
    driver: "Mr. E. Sathish",
    phone: "+91-9677007583",
    path: "Porur (06:25) -> Boy Kadai (06:33) -> Kovoor (06:35) -> Kundrathur (06:38) -> Anagaputhur (06:40) -> Pammal (06:43) -> Pallavaram (06:45) -> Meenambakkam (06:48) -> Pallavaram (06:50) -> Chrompet (06:55) -> Tambaram W & E (07:00) -> Camp Road (07:05) -> Saliyur (07:10) -> Medavakkam (07:25) -> Chithalapakkam (07:30) -> Thalambur (07:35) -> M.S.A.J.C.E – College (08:00)"
  },
  {
    no: "R-22",
    driver: "Mr. Jaffar",
    phone: "+91-9566037890",
    path: "Nemilichery (05:50) -> Poonamallee (06:05) -> Kumanan Chavadi (06:00) -> Kattupakkam (06:05) -> Ramachandra Hospital (06:10) -> Porur (06:15) -> Valasaravakkam (06:20) -> Ramapuram (06:25) -> Nandhampakkam (06:30) -> Kathipara Junction (06:35) -> Thillai Ganga Subway (06:40) -> Velachery Bypass (06:45) -> Kaiveli (07:00) -> Madipakkam (07:05) -> Kilkattalai (07:10) -> Kovilambakkam (07:15) -> Medavakkam (07:20) -> Sholinganallur (07:25) -> M.S.A.J.C.E – College (08:00)"
  }
];

const placementStatements = [
  "Mohamed Sathak A.J. College of Engineering (MSAJCE) maintains a consistent placement rate of approximately 85% to 90% for its graduating students.",
  "The average salary package for placed candidates at MSAJCE ranges between 3.0 LPA and 3.3 LPA, with top recruits receiving packages exceeding 8.0 LPA.",
  "Key recruiters for MSAJCE include top-tier national and international firms. The placement cell provides extensive training in aptitude, soft skills, and technical interviews.",
  "The college provides transport facilities using 22 buses, one Tata ACE, and one ambulance, covering Chennai, Chengalpattu, Kanchipuram, and Thiruvallur regions."
];

async function ingestStructured() {
  console.log('--- Starting Structured Data Ingestion ---');

  const chunks: { text: string; metadata: any }[] = [];

  // Convert routes
  transportRoutes.forEach(r => {
    chunks.push({
      text: `Transport Route ${r.no}: The bus is driven by ${r.driver} (Contact: ${r.phone}). The route path and timings are: ${r.path}. It reaches the MSAJCE College campus at 08:00 AM.`,
      metadata: { type: 'transport_route', route_no: r.no, department: 'transport', source: 'structured_data' }
    });
  });

  // Convert placement
  placementStatements.forEach(p => {
    chunks.push({
      text: p,
      metadata: { type: 'placement', category: p.includes('%') ? 'stats' : 'info', department: 'placement', source: 'structured_data' }
    });
  });

  try {
    const { embeddings } = await embedMany({
      model,
      values: chunks.map(c => c.text),
    });

    for (let i = 0; i < chunks.length; i++) {
      const { text, metadata } = chunks[i];
      const embedding = embeddings[i];

      if (embedding) {
        const vectorStr = `[${embedding.join(',')}]`;
        await sql`
          INSERT INTO documents (content, embedding, metadata)
          VALUES (${text}, ${vectorStr}, ${metadata})
        `;
      }
    }
    console.log('Successfully ingested structured transport and placement data.');
  } catch (error) {
    console.error('Ingestion Error:', error);
  } finally {
    process.exit(0);
  }
}

ingestStructured();
