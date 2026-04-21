import dotenv from 'dotenv';
dotenv.config();

import { getQdrant, COLLECTION_NAME } from './qdrant';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { embedMany } from 'ai';
import crypto from 'crypto';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY
});

const EMBED_MODEL = google.textEmbeddingModel('text-embedding-004');

const COMPLETE_SPECIAL_DATA = [
  "MSAJCE provides 22 buses for transportation, covering Chennai, Chengalpattu, Kanchipuram, and Thiruvallur.",
  "Route AR-3 starts from Uthiramerur at 05:50 AM. Reaches MSAJCE at 08:00 AM. Driver: Mr. Sathish K (9789970304).",
  "Route AR-4 starts from Moolakadai at 06:10 AM. Reaches MSAJCE at 08:00 AM. Driver: Mr. M. Suresh (9849265637).",
  "Route AR-5 starts from MMDA School at 06:15 AM. Reaches MSAJCE at 08:00 AM. Driver: Mr. Velu (9940050685).",
  "Route AR-6 starts from MMDA School at 06:15 AM. Reaches MSAJCE at 08:00 AM. Driver: Mr. Venkatachalam (9025731746).",
  "Route AR-7 starts from Chunambedu at 05:25 AM. Reaches MSAJCE at 08:00 AM. Driver: Mr. Suresh (9789895025).",
  "Route AR-8 starts from Manjambakkam at 05:50 AM. Reaches MSAJCE at 08:00 AM. Driver: Mr. Raju (9790750906). Stops include Retteri, Anna Nagar, CMBT, Vadapalani, Ashok Pillar, and Medavakkam.",
  "Route AR-9 starts from Ennore at 06:15 AM. Reaches MSAJCE at 08:00 AM. Driver: Mr. Kanagaraj (9710209097).",
  "Route R-20 starts from Moolakadai at 05:55 AM. Reaches MSAJCE at 08:00 AM. Driver: Mr. M. Suresh (9849265637).",
  "Route R-21 starts from Porur at 06:25 AM. Reaches MSAJCE at 08:00 AM. Driver: Mr. E. Sathish (9677007583).",
  "Route R-22 starts from Nemilichery at 05:50 AM. Reaches MSAJCE at 08:00 AM. Driver: Mr. Jaffar (9566037890)."
];

async function inject() {
    console.log("🚀 Injecting COMPLETE Transport facts...");
    const client = getQdrant();
    const { embeddings } = await embedMany({ model: EMBED_MODEL, values: COMPLETE_SPECIAL_DATA });
    const points = COMPLETE_SPECIAL_DATA.map((content, i) => {
        const hash = crypto.createHash('md5').update(content).digest('hex');
        const id = `${hash.slice(0,8)}-${hash.slice(8,12)}-4${hash.slice(13,16)}-a${hash.slice(17,20)}-${hash.slice(20,32)}`;
        return { id, vector: embeddings[i], payload: { content, source: "transport_sync_v2" } };
    });
    await client.upsert(COLLECTION_NAME, { wait: true, points });
    console.log("🏁 Transport Sync v2 Complete!");
}

inject();
