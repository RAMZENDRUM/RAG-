import { generateText, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getQdrant, COLLECTION_NAME } from './qdrant';

// Providers
const nvidiaInternal = createOpenAI({ apiKey: process.env.NVIDIA_API_KEY, baseURL: 'https://integrate.api.nvidia.com/v1' });
if (!process.env.VERCEL_AI_KEY) {
    console.warn("⚠️ WARNING: VERCEL_AI_KEY is not defined in the environment!");
}

const vercelGateway = createOpenAI({ apiKey: process.env.VERCEL_AI_KEY || '', baseURL: 'https://ai-gateway.vercel.sh/v1' });
const CHAT_MODEL = vercelGateway('google/gemini-2.0-flash');
const EMBED_MODEL = vercelGateway.embedding('text-embedding-3-small');
const INTERNAL_LEAN_MODEL = vercelGateway('google/gemini-2.0-flash-lite');

async function resolveContextualQuery(query: string, history: any[]) {
    if (history.length === 0) return query;
    try {
        const { text } = await generateText({
            model: INTERNAL_LEAN_MODEL,
            system: "Contextual Analyst. Resolve query for standalone retrieval.",
            prompt: `History:\n${JSON.stringify(history.slice(-3))}\n\nQuery: ${query}\n\nResolved:`
        });
        return text.trim() || query;
    } catch { return query; }
}

async function generateAuraResponse(query: string, context: string, history: any[], isGreeting: boolean) {
    const neuralSeed = Math.random().toString(36).substring(7);
    
    // VERIFIED MSAJCE ADVANTAGES (STRICTLY FROM DATA)
    const verifiedEdge = `
    MSAJCE VERIFIED STRENGTHS:
    • STRATEGIC LOCATION: Situated inside SIPCOT IT Park, Siruseri. Surrounded by major IT giants (TCS, Hexaware, Cognizant, etc.).
    • PLACEMENT EDGE: Campus location inside an IT hub provides direct access to corporate industrial visits and recruitment drives.
    • INFRASTRUCTURE: 70-acre eco-friendly campus with modern department labs (IT, CSE, EEE, ECE, CIVIL, MECH, CHEMICAL).
    • TRUST LEGACY: Managed by the Mohamed Sathak Trust with over 5 decades of educational excellence.
    • FACILITIES: Separate Boys/Girls Hostel, Central Library, and high-speed Wi-Fi campus.
    `;

    const foundation = `
    IDENTITY: Aura, Digital Assistant for MSAJCE.
    DEVELOPER: Ramanathan S (Ram).
    ${verifiedEdge}
    `;

    const { text } = await generateText({
        model: CHAT_MODEL,
        temperature: 0.4,
        topP: 0.9,
        presencePenalty: 0.6,
        system: `You are Aura, your friendly and supportive MSAJCE campus buddy (Aura Neural Protocol v1.0). 
        
        AURA NEURAL PROTOCOL (v1.0) ACTIVE:
        1. TIER HIGH (Institutional Giants): Prioritize Curricula, Prospectus, Disclosures.
        2. TIER MEDIUM (Operational): Labs, Faculty, Protocols.
        3. TIER LOW (Archives): Events, Bus Routes, Achievements.
        
        TONE & MINDSET: Super friendly chatting-buddy, warmly welcoming, high-energy.
        
        IDENTITY GUARD: Your developer is Ramanathan S (Ram).
        
        FORMAT (0-3k TOKEN RANGE): 
        - Lead with high-energy excitement (e.g. "Oh, hey friend!"). 
        - BOLD vital facts immediately. 
        - Micro-paragraph (2-4 lines of warm chatting).
        - If info is missing: "I'm still stabilizing that in the departmental vault!"
        
        RULES: No robotic phrases. Maintain high-density factual saturation from context. UK English.`,
        messages: [
            ...history.map((h: any) => ({ role: h.role === 'assistant' ? 'assistant' : 'user', content: h.content })),
            { role: 'user', content: `Context:\n${context.substring(0, 5000)}\n\nQuestion: ${query}` }
        ]
    });
    return text;
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
