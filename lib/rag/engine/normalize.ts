import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import dotenv from 'dotenv';
dotenv.config();

const ai = createOpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
  compatibility: 'strict',
});

const DEFAULT_MODEL = 'meta/llama-3.3-70b-instruct';

export interface NormalizedChunk {
  narrative: string;
  exact: any;
  category: 'transport' | 'placement' | 'admission' | 'academic' | 'general';
  importance: 'high' | 'normal';
}

/**
 * PRODUCTION NORMALIZER V2.1
 * Converts raw LlamaParse output (Markdown tables/Noise) into 'Semantic Narratives'
 * while preserving JSON-exact metadata for precision matching.
 */
export async function normalizeData(rawContent: string, fileName: string): Promise<NormalizedChunk[]> {
  console.log(`🧼 Normalizing: ${fileName} (${rawContent.length} chars)`);

  const { text: jsonOutput } = await generateText({
    model: ai.chat(DEFAULT_MODEL),
    system: `You are a Data Normalization Expert for a College RAG system.
    Goal: Transform raw PDF text/tables into a list of "Atomic Narrative Units".
    
    RULES:
    1. convert tables into full readable sentences (e.g. "Route AR5 starts at 06:15 AM from MMDA").
    2. Preserve EXACT numbers, contacts, and timings.
    3. Categorize each chunk.
    4. Detect 'importance'. Admission/Fees/Bus-Routes are 'high'.
    
    OUTPUT FORMAT (JSON ARRAY ONLY):
    [{
      "narrative": "A descriptive sentence containing all data",
      "exact": { "key": "value" },
      "category": "transport|placement|admission|academic|general",
      "importance": "high|normal"
    }]`,
    prompt: `File: ${fileName}\nRaw Content:\n${rawContent.substring(0, 4000)}`
  });

  try {
    // Basic extraction logic to strip markdown if LLM adds it
    const cleanJson = jsonOutput.includes('[') ? jsonOutput.substring(jsonOutput.indexOf('['), jsonOutput.lastIndexOf(']') + 1) : jsonOutput;
    return JSON.parse(cleanJson);
  } catch (e) {
    console.error("Normalizer Parse Error:", e);
    return [{ 
      narrative: rawContent, 
      exact: {}, 
      category: 'general', 
      importance: 'normal' 
    }];
  }
}
