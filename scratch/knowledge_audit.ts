import { getQdrant, COLLECTION_NAME } from '../lib/rag/engine/qdrant'; // Fixed Path
import dotenv from 'dotenv';
dotenv.config();

async function audit() {
  console.log("🏙️ Connecting to the Aura Knowledge Vault...");
  try {
    const info = await getQdrant().getCollection(COLLECTION_NAME);
    console.log(`📊 TOTAL_KNOWLEDGE_FACTS: ${info.points_count}`);
    console.log(`🧠 STATUS: ${info.status}`);
  } catch (err) {
    console.error("❌ VAULT LOCKED:", err.message);
  } finally {
    process.exit(0);
  }
}

audit();
