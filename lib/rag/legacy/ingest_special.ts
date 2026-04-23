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

const ABSOLUTE_ADMISSION_DATA = [
  "MSAJCE Undergraduate (B.E./B.Tech) Programmes & Seats: CSE (60 seats), ECE (60 seats), IT (60 seats), AI & ML (60 seats), Civil (30 seats), EEE (30 seats), Mechanical (30 seats), AI & Data Science (30 seats), CSBS (30 seats), CSE Cyber Security (30 seats), VLSI Design & Technology (30 seats), Advanced Communication Technology (30 seats).",
  "Admission eligibility for other state students (AP, Telangana, Kerala, etc.): Selection based on Q-mark. Formula: Q = (Mathematics / 2) + ((Physics + Chemistry) / 4).",
  "NRI Category Admission: 5% of sanctioned seats are reserved for NRI candidates at MSAJCE.",
  "MSAJCE Postgraduate (M.E.) Programmes: M.E. Computer Science and Engineering (9 seats), M.E. Structural Engineering (18 seats).",
  "Research (Ph.D) Programs: MSAJCE offers Ph.D in Mechanical Engineering.",
  "Principal Admission Contact: Dr. K.S. Srinivasan (9150575066 | principal@msajce-edu.in).",
  "Administrative Officer Contact: Mr. A. Abdul Gafoor (9940319629 | abdulgafoor@msajce-edu.in).",
  "Head of Admission Contact: Dr. K.P. Santhosh Nathan (98408 86992 | ped.santhosh@msajce-edu.in).",
  "Other Contacts: Mr. S. Syed Abuthahir (9944127339), Mr. B. Rizha Ur Rahman (9790836981), Mrs. I.S. Suganthi (7299772958)."
];

async function inject() {
    console.log("🚀 Injecting ABSOLUTE ADMISSION TRUTH...");
    const client = getQdrant();
    const { embeddings } = await embedMany({ model: EMBED_MODEL, values: ABSOLUTE_ADMISSION_DATA });
    const points = ABSOLUTE_ADMISSION_DATA.map((content, i) => {
        const hash = crypto.createHash('md5').update(content).digest('hex');
        const id = `${hash.slice(0,8)}-${hash.slice(8,12)}-4${hash.slice(13,16)}-a${hash.slice(17,20)}-${hash.slice(20,32)}`;
        return { id, vector: embeddings[i], payload: { content, source: "absolute_website_sync_v30" } };
    });
    await client.upsert(COLLECTION_NAME, { wait: true, points });
    console.log("🏁 Absolute Truth Saturation Complete!");
}

inject();
