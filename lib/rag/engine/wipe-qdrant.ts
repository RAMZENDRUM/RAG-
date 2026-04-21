import { QdrantClient } from '@qdrant/js-client-rest';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

const COLLECTION_NAME = 'msajce_knowledge';

async function main() {
  console.log(`🧹 Attempting to wipe collection: [${COLLECTION_NAME}]...`);
  
  try {
    const collections = await client.getCollections();
    const exists = collections.collections.find(c => c.name === COLLECTION_NAME);

    if (exists) {
      await client.deleteCollection(COLLECTION_NAME);
      console.log(`✅ Collection [${COLLECTION_NAME}] DELETED successfully.`);
    } else {
      console.log(`⚠️ Collection [${COLLECTION_NAME}] does not exist. Skipping wipe.`);
    }

    // Re-create the collection with proper dimensions (NVIDIA nv-embedqa-e5-v5 = 1024)
    console.log(`🏗️ Re-creating collection [${COLLECTION_NAME}] with 1024 dimensions...`);
    await client.createCollection(COLLECTION_NAME, {
      vectors: {
        size: 1024,
        distance: 'Cosine',
      }
    });
    console.log(`✨ Collection [${COLLECTION_NAME}] is now CLEAN and ready for Supreme Ingestion.`);

  } catch (error) {
    console.error(`❌ Wipe Failed:`, error);
  }
}

main();
