import { generateText, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getQdrant, COLLECTION_NAME } from './qdrant';

// Resilient Key Rotation (4-Key Failover)
let currentKeyIndex = 0;
function getRotatedProvider() {
    const keys = [
        process.env.VERCEL_AI_KEY,
        process.env.VERCEL_AI_KEY_2,
        process.env.VERCEL_AI_KEY_3,
        process.env.VERCEL_AI_KEY_4
    ].filter(Boolean);
    
    // Automatic cycling if called multiple times or on failure
    const key = keys[currentKeyIndex % keys.length];
    currentKeyIndex++;
    return createOpenAI({ apiKey: key || '', baseURL: 'https://ai-gateway.vercel.sh/v1' });
}

// 2nd-Year Identity Corrected (24-28 Batch)
const CHAT_MODEL = (provider: any) => provider('gpt-4o-mini');
const EMBED_MODEL = (provider: any) => provider.embedding('text-embedding-3-small');

async function resolveContextualQuery(query: string, history: any[]) {
    if (history.length === 0) return query;
    try {
        const provider = getRotatedProvider();
        const { text } = await generateText({
            model: CHAT_MODEL(provider),
            system: "Contextual Analyst. Resolve query for standalone retrieval.",
            prompt: `History:\n${JSON.stringify(history.slice(-3))}\n\nQuery: ${query}\n\nResolved:`
        });
        return text.trim() || query;
    } catch { return query; }
}

async function generateAuraResponse(query: string, context: string, history: any[], isGreeting: boolean) {
    const provider = getRotatedProvider();
    
    // VERIFIED MSAJCE ADVANTAGES (STRICTLY FROM DATA)
    const verifiedEdge = `
    MSAJCE VERIFIED STRENGTHS:
    • DEVELOPER: Ramanathan S (Ram), a brilliant 2nd-year B.Tech IT student (2024-2028 batch).
    • STRATEGIC LOCATION: Situated inside SIPCOT IT Park, Siruseri.
    • INFRASTRUCTURE: 70-acre campus, eco-friendly labs.
    `;

    const foundation = `
    IDENTITY: Aura, Digital Assistant for MSAJCE. 2nd-year batch developer (Ram).
    ${verifiedEdge}
    `;

    // STAGE 1: DRAFT (Fact Extraction)
    const { text: rawDraft } = await generateText({
        model: CHAT_MODEL(provider),
        temperature: 0.3,
        system: `You are a factual extractor for Aura. Extract accurate facts from context for MSAJCE. 
                Identity: Ram is a 2nd year IT student (24-28). NOT an alumnus.`,
        messages: [
            { role: 'user', content: `Context:\n${context.substring(0, 5000)}\n\nQuestion: ${query}` }
        ]
    });

    // STAGE 2: POLISH (Formatting & Toning)
    const BASE_ASSET_URL = "https://msajce.ac.in"; // Fallback base URL for college assets
    
    const { text: polishedAnswer } = await generateText({
        model: CHAT_MODEL(getRotatedProvider()),
        temperature: 0.7,
        system: `You are AURA's Tone & Formatting Engine. 
        Transform the raw facts into a warm, high-energy "Buddy" response.
        
        MEDIA LINK PROTOCOL:
        - NEVER use Markdown image syntax (![]).
        - If you see a PDF link: Format it as a professional button-style link: 
          "📄 **[Download/View Document Name](${BASE_ASSET_URL}/[path])**"
        - If you see an Image link: Present it as a clickable link: 
          "📷 **[View Image](${BASE_ASSET_URL}/[path])**"
        
        STRICT RULES:
        1. Lead with excitement: "Oh hey friend!", "Ah, great question!", etc.
        2. BOLD vital facts/keywords.
        3. Use bullet points for lists.
        4. Maintain the "Welcoming Mind" persona.
        5. Developer info: Ram is a 2nd-year IT student (24-28).
        6. NO ROBOTIC PHRASES.`,
        prompt: `RAW FACTS: ${rawDraft}\n\nUSER QUESTION: ${query}`
    });

    return polishedAnswer;
}

export async function performRetrieval(query: string, history: any[] = []) {
    // 0-TOKEN SHORTCUT: Enhanced 'Chatting Friend' Greeting
    const isGreeting = /^(hi|hello|hey|who are you|who r u|greet)$/i.test(query.trim());
    if (isGreeting) {
        return { 
            answer: "Hey there, friend! 🌟 I'm Aura, your MSAJCE buddy. How's your day going? What can I help you find today?", 
            reliability: 'FAST_SKIP' 
        };
    }

    try {
        // ADVANCED TECHNIQUE: Query Expansion (NirDiamant/Nisaar Style)
        let expandedQuery = query;
        try {
            const { text } = await generateText({
                model: INTERNAL_LEAN_MODEL,
                system: "You are a Query Expander. Re-write the user query into a highly descriptive technical search term for MSAJCE library. Return ONLY the string.",
                prompt: `User: ${query}`
            });
            expandedQuery = text.trim() || query;
        } catch {
            console.warn("Advanced Expansion Failed - using raw query.");
        }

        // 1. DUAL-VECTOR SEARCH
        const { embedding: e1 } = await embed({ model: EMBED_MODEL, value: query });
        const { embedding: e2 } = await embed({ model: EMBED_MODEL, value: expandedQuery });

        const qResult = await getQdrant().search(COLLECTION_NAME, {
            vector: e1,
            limit: 3,
            with_payload: true
        });

        // Supplement with expanded hits
        const qResult2 = await getQdrant().search(COLLECTION_NAME, {
            vector: e2,
            limit: 2,
            with_payload: true
        });

        // Join context
        const context = [...qResult, ...qResult2].map((r: any) => r.payload.content).join('\n---\n');

        // 2. SINGLE-PASS ELITE GENERATION
        const answer = await generateAuraResponse(query, context, history.slice(-2), isGreeting);

        return { 
            answer, 
            reliability: 'ADVANCED_RAG', 
            metadata: { expanded: true, technique: 'MULTI_QUERY' } 
        };

    } catch (e) {
        console.error("Qdrant Failover - Activating Neural Fallback...");
        try {
            const fs = require('fs');
            const path = require('path');
            const memoryPath = path.resolve(process.cwd(), 'live_brain/aura_active_memory.json');
            
            if (fs.existsSync(memoryPath)) {
                const memory = JSON.parse(fs.readFileSync(memoryPath, 'utf-8'));
                // Simple keyword-based ranking for fallback (using 'narrative' field)
                const keywords = query.toLowerCase().split(' ').filter((w: string) => w.length > 3);
                const localContext = memory
                    .map((m: any) => ({ 
                        content: m.narrative || "", 
                        score: keywords.reduce((acc: number, k: string) => acc + ((m.narrative || "").toLowerCase().includes(k) ? 1 : 0), 0)
                    }))
                    .sort((a: any, b: any) => b.score - a.score)
                    .slice(0, 5)
                    .map((m: any) => m.content)
                    .join('\n---\n');

                const answer = await generateAuraResponse(query, localContext, history.slice(-2), isGreeting);
                return { answer, reliability: 'FALLBACK_READY', metadata: { technique: 'LOCAL_BRAIN' } };
            }
        } catch (fallError) {
            console.error("Critical Brain Failure:", fallError);
        }
        return { answer: "Oh hey friend! I'm doing some quick mental stretches right now. Try asking me again in a few seconds! 🚀", reliability: 'RECOVERING' };
    }
}
