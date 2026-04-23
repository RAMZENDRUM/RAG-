import { QdrantClient } from '@qdrant/js-client-rest';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load env if not already loaded
const localEnvPath = path.resolve(process.cwd(), '.env');
let envConfig: Record<string, string> = {};

if (fs.existsSync(localEnvPath)) {
    try {
        const raw = fs.readFileSync(localEnvPath);
        envConfig = dotenv.parse(raw);
    } catch {}
}

const url = envConfig['QDRANT_URL'] || process.env.QDRANT_URL;
const apiKey = envConfig['QDRANT_API_KEY'] || process.env.QDRANT_API_KEY;

export const qdrant = new QdrantClient({
    url,
    apiKey
});

export const getQdrant = () => qdrant;

export const COLLECTION_NAME = 'aura_rag_core';
