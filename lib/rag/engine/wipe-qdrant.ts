import { QdrantClient } from '@qdrant/js-client-rest';
import dotenv from 'dotenv';

dotenv.config();

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

const COLLECTION_NAME = 'msajce_knowledge';

async function main() {
  console.log(`🧹 Wiping collection: [${COLLECTION_NAME}]...`);
  
  try {
    const collections = await client.getCollections();
    const exists = collections.collections.find(c => c.name === COLLECTION_NAME);

    if (exists) {
      await client.deleteCollection(COLLECTION_NAME);
      console.log(`✅ DELETED successfully.`);
    }

    console.log(`🏗️ Re-creating [${COLLECTION_NAME}] with 1536 dimensions (Vercel SDK Standard)...`);
    await client.createCollection(COLLECTION_NAME, {
      vectors: {
        size: 1536, // OpenAI / AI SDK Standard
        distance: 'Cosine',
      }
    });

    // Add Payload Indexes
    await client.createPayloadIndex(COLLECTION_NAME, { field_name: 'category', field_schema: 'keyword' });
    await client.createPayloadIndex(COLLECTION_NAME, { field_name: 'content', field_schema: 'text' });

    console.log(`✨ DONE.`);
  } catch (error) {
    console.error(`❌ Wipe Failed:`, error);
  }
}

main();
