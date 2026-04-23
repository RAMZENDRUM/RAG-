import { QdrantClient } from '@qdrant/js-client-rest';

let _client: QdrantClient | null = null;

// Lazy Loader to ensure ENV is loaded before initialization
export const getQdrant = () => {
  if (!_client) {
    if (!process.env.QDRANT_URL) {
      console.warn("⚠️ QDRANT_URL is missing! Falling back to localhost...");
    }
    _client = new QdrantClient({
      url: process.env.QDRANT_URL,
      apiKey: process.env.QDRANT_API_KEY,
      checkCompatibility: false, // Skip version check for speed/stability
    });
  }
  return _client;
};

export const COLLECTION_NAME = 'msajce_knowledge';

export async function initQdrant() {
  const client = getQdrant();
  const collections = await client.getCollections();
  const exists = collections.collections.some(c => c.name === COLLECTION_NAME);

  if (!exists) {
    console.log(`🌐 Creating Vercel-SDK Aligned Collection: ${COLLECTION_NAME} (1536 Dim)`);
    await client.createCollection(COLLECTION_NAME, {
      vectors: {
        size: 1536,
        distance: 'Cosine',
      }
    });

    await client.createPayloadIndex(COLLECTION_NAME, { field_name: 'category', field_schema: 'keyword' });
    await client.createPayloadIndex(COLLECTION_NAME, { field_name: 'content', field_schema: 'text' });
  }
}
