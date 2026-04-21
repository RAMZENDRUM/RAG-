import fs from 'fs';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

const LLAMA_KEY = 'llx-AS3Ljc0HWMZoBDQEqiewSA5RdQRXDxH0UCAwd6fLrvEtwiH6';
const SOURCE_DIR = 'd:/.gemini/RAG college/raw_vault/source_pdfs';
const TARGET_DIR = 'd:/.gemini/RAG college/cleaning_zone/priority_high';

async function llamaparseJob(fileName: string) {
  console.log(`📡 Starting LlamaParse for [${fileName}]...`);
  
  const filePath = path.join(SOURCE_DIR, fileName);
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  try {
    // 1. UPLOAD
    const uploadRes = await axios.post('https://api.cloud.llamaindex.ai/api/parsing/upload', form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer ${LLAMA_KEY}`,
      },
    });

    const jobId = uploadRes.data.id;
    console.log(`✅ Uploaded. Job ID: ${jobId}. Waiting for result...`);

    // 2. WAIT FOR RESULT
    let status = 'PENDING';
    while (status !== 'SUCCESS') {
      await new Promise(r => setTimeout(r, 5000));
      const statusRes = await axios.get(`https://api.cloud.llamaindex.ai/api/parsing/job/${jobId}`, {
        headers: { 'Authorization': `Bearer ${LLAMA_KEY}` },
      });
      status = statusRes.data.status;
      process.stdout.write('.');
    }

    // 3. GET MARKDOWN
    const resultRes = await axios.get(`https://api.cloud.llamaindex.ai/api/parsing/job/${jobId}/result/markdown`, {
      headers: { 'Authorization': `Bearer ${LLAMA_KEY}` },
    });

    const mdContent = resultRes.data.markdown;
    const targetPath = path.join(TARGET_DIR, `${fileName}.md`);
    fs.writeFileSync(targetPath, mdContent);
    
    console.log(`\n🎉 SUPREME FIDELITY READY: [${fileName}.md]`);

  } catch (err) {
    console.error(`❌ LlamaParse Failed: ${err.response?.data?.detail || err.message}`);
  }
}

async function main() {
  const targets = [
    'MandatoryDisclosure.pdf',
    'Intership%20Report%202025.pdf',
    'MechInternship.pdf',
    'EEE2017Syllabus.pdf',
    'EEE2021Syllabus.pdf',
    'Mech-R2017-Syllabus.pdf',
    'Mech-R2021-Syllabus.pdf',
    'Syllabus_IT2017.pdf',
    'ECE-2017.pdf',
    'ME_CSE_Regulation_13.pdf',
    'ME_CSE_Regulation_17.pdf',
    'ME-CIVIL-R-2021.pdf',
    'R22.pdf'
  ];

  for (const t of targets) {
     await llamaparseJob(t);
  }
}

main();
