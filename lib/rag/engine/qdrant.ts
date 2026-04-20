import { QdrantClient } from '@qdrant/js-client-rest';
import dotenv from 'dotenv';
dotenv.config();

export const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

export const COLLECTION_NAME = 'msajce_elite_knowledge';

export async function initQdrant() {
  const collections = await qdrant.getCollections();
  const exists = collections.collections.some(c => c.name === COLLECTION_NAME);

  if (!exists) {
    console.log(`🌐 Creating Qdrant Collection: ${COLLECTION_NAME}`);
    await qdrant.createCollection(COLLECTION_NAME, {
      vectors: {
        size: 1536, // text-embedding-3-small
        distance: 'Cosine',
      },
      optimizers_config: {
        default_segment_number: 2,
      },
    });

    // Create Payload Indices for Hybrid filtering
    await qdrant.createPayloadIndex(COLLECTION_NAME, {
      field_name: 'category',
      field_schema: 'keyword',
    });
    await qdrant.createPayloadIndex(COLLECTION_NAME, {
      field_name: 'content',
      field_schema: 'text',
    });
  }
}
