import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { performRetrieval } from '../../../lib/rag/engine/retrieve';

const ai = createOpenAI({
  apiKey: process.env.VERCEL_AI_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content.trim();

  try {
    // 1. Unified Retrieval
    const { context, reliability, answer, sources, score } = await performRetrieval(lastMessage);

    // 2. Production Generation
    // CRITICAL FIX: Always use streamText to avoid "Cannot use 'in' operator" TypeError in @ai-sdk/react
    const result = await streamText({
      model: ai.chat('openai/gpt-4.1-nano'),
      system: `You are the MSAJCE Aura Concierge. 
      
      RULES:
      - If provided context is empty or reliability is LOW, use the FALLBACK_ANSWER.
      - Answer ONLY using the provided context.
      - Present technical data in bullet points.
      
      FALLBACK_ANSWER:
      ${answer || "I do not have specific institutional records for that exact query. Please contact the college office for official details."}
      
      CONTEXT:
      ${reliability === 'HIGH' ? context : ''}`,
      messages,
      onFinish({ usage }) {
        console.log('Production Metrics:', { score, sources: sources?.length, usage });
      }
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Production RAG Error:', error);
    // Even on error, we should ideally return a stream if possible, 
    // but for 500s the SDK usually handles it. 
    // To be safest, we stream the error message.
    return new Response('System maintenance in progress. Please try again in a few moments.', { status: 500 });
  }
}
