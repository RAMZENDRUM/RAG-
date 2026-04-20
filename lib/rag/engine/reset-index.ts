import { QdrantClient } from '@qdrant/js-client-rest';
import dotenv from 'dotenv';
dotenv.config();

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

const COLLECTION_NAME = 'msajce_knowledge';

async function resetCollection() {
  console.log(`🗑️ Deleting collection: ${COLLECTION_NAME}...`);
  try {
    await qdrant.deleteCollection(COLLECTION_NAME);
    console.log('   ✅ Collection Deleted.');
  } catch (e) {
    console.log('   ℹ️ Collection did not exist or already deleted.');
  }

  console.log(`🏗️ Creating collection: ${COLLECTION_NAME} (Vector Size: 1536)...`);
  await qdrant.createCollection(COLLECTION_NAME, {
    vectors: {
      size: 1536, // text-embedding-3-small
      distance: 'Cosine',
    },
    optimizers_config: {
        default_segment_number: 2
    }
  });
  console.log('   ✨ Collection Reset Successfully.');
  process.exit(0);
}

resetCollection().catch(console.error);
