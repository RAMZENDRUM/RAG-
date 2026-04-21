import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import dotenv from 'dotenv';
dotenv.config();

const gateway = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

async function test() {
  try {
    console.log("📡 Probing Gateway: https://ai-gateway.vercel.sh/v1");
    const { text } = await generateText({
      model: gateway('gpt-4o-mini'),
      prompt: "Hello",
    });
    console.log("✅ Success! Response:", text);
  } catch (err: any) {
    console.error("🔥 PROBE FAILED:", err.message);
    if (err.cause) console.error("CAUSE:", err.cause);
  }
}

test();
