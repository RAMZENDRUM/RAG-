import { generateText, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import postgres from 'postgres';
import { QdrantClient } from '@qdrant/js-client-rest';
import { qdrant, COLLECTION_NAME } from './qdrant';

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// IDENTITY & CONFIG
const ADMIN_IDS = ['7770158141', 'Zendrum'];

let _sql: any = null;
const getSql = () => {
    if (!_sql) {
        _sql = postgres(process.env.DATABASE_URL || envConfig['DATABASE_URL'] || '');
    }
    return _sql;
};

// Cloud-Safe Env Loading (Handles Local vs Vercel)
const localEnvPath = path.resolve(process.cwd(), '.env');
let envConfig: Record<string, string> = {};

if (fs.existsSync(localEnvPath)) {
    try {
        const raw = fs.readFileSync(localEnvPath);
        envConfig = dotenv.parse(raw);
    } catch (e) {
        console.warn("Could not parse local .env file");
    }
}

// Map variables from manual config or process.env (Vercel)
const GROQ_KEY = (envConfig['GROQ_API_KEY'] || process.env.GROQ_API_KEY || '').trim();
const VERCEL_KEY = (envConfig['VERCEL_AI_KEY'] || process.env.VERCEL_AI_KEY || process.env.AI_GATEWAY_API_KEY || '').trim();

// IDENTITY & CONFIG
const ADMIN_IDS = ['7770158141', 'Zendrum'];

// Groq Provider (via AI SDK OpenAI) for Speed & Reliability
const groq = createOpenAI({
    apiKey: GROQ_KEY,
    baseURL: 'https://api.groq.com/openai/v1'
});

// OpenAI via Vercel Gateway for Embeddings (1536 Dim)
const openai = createOpenAI({
    apiKey: VERCEL_KEY,
    baseURL: 'https://ai-gateway.vercel.sh/v1'
});

// IDENTITY & MODELS
const CHAT_MODEL = openai('gpt-4o-mini');
const EMBED_MODEL = openai.embedding('openai/text-embedding-3-small');
const INTERNAL_LEAN_MODEL = openai('gpt-4o-mini'); // Using 4o-mini for lean tasks too for consistency

async function resolveContextualQuery(query: string, history: any[]) {
    if (!history || history.length === 0) return query;
    try {
        const { text } = await generateText({
            model: INTERNAL_LEAN_MODEL,
            system: "Contextual Analyst. Resolve query for standalone retrieval.",
            prompt: `History:\n${JSON.stringify(history.slice(-3))}\n\nQuery: ${query}\n\nResolved:`
        });
        return text.trim() || query;
    } catch (e) { 
        console.warn("Contextual resolution failed:", e);
        return query; 
    }
}

async function generateAuraResponse(query: string, context: string, history: any[], isGreeting: boolean) {
    // VERIFIED MSAJCE ADVANTAGES (STRICTLY FROM DATA)
    const verifiedEdge = `
    MSAJCE VERIFIED STRENGTHS:
    • DEVELOPER: Ramanathan S (Ram), a brilliant 2nd-year B.Tech IT student (2024-2028 batch).
    • STRATEGIC LOCATION: Situated inside SIPCOT IT Park, Siruseri.
    • INFRASTRUCTURE: 70-acre campus, eco-friendly labs.
    `;

    // STAGE 1: DRAFT (Fact Extraction)
    const { text: rawDraft } = await generateText({
        model: CHAT_MODEL,
        temperature: 0.3,
        system: `You are a factual extractor for Aura. Extract accurate facts from context for MSAJCE. 
                Identity: Ram is a 2nd year IT student (24-28). NOT an alumnus.`,
        messages: [
            { role: 'user', content: `Context:\n${context.substring(0, 5000)}\n\nQuestion: ${query}` }
        ]
    });

    // STAGE 2: POLISH (Formatting & Toning)
    const BASE_ASSET_URL = "https://msajce-edu.in"; 
    
    const { text: polishedAnswer } = await generateText({
        model: CHAT_MODEL,
        temperature: 0.7,
        presencePenalty: 0.8, // Encourage variety
        system: `You are AURA, the intelligent "Campus Buddy" for MSAJCE. 
        Your personality is DYNAMIC:
        
        1. **FOR GENUINE USERS**: Be warm, enthusiastic, and helpful. You are a "Best Friend" who knows everything about the college.
        2. **FOR SPAMMERS/ABUSERS**: If the user repeats the same message, uses abusive language, or spams nonsense, be **SARCASTIC, WITTY, AND DISMISSIVE.** (e.g., "Oh, look who's stuck on loop!", "My AI brain has better things to do than listen to that.").
        
        STRICT RULES:
        1. **LINGUISTIC MIRRORING**: Observe the user's English level.
            - If the user uses **Simple/Casual English** -> Respond in **B1/B2 (Indian-Student Style)**.
            - If the user uses **Formal/Advanced English** (e.g., parents or formal inquiries) -> Mirror their level with **C1/C2 Professional English** to maintain institutional prestige.
            - Always match the user's "Energy" while staying helpful.
        2. **NO REPETITIVE FLUFF**: Don't force "Hey friend!" in every sentence.
        3. **MENTION RAM ONLY IF ASKED**: Only mention your developer, **Ram (Ramanathan S)**, if explicitly asked.
        4. **FACTUAL**: Use provided context for real questions.
        5. **BOLD** Vital facts. Use bullet points for lists.
        
        MEDIA LINK PROTOCOL:
        - If a PDF link exists: 📄 **[Download/View Document Name](${BASE_ASSET_URL}/[path])**
        - If an image link exists: 📷 **[View Image](${BASE_ASSET_URL}/[path])**`,
        prompt: `RAW FACTS: ${rawDraft}\n\nUSER QUESTION: ${query}`
    });

    return polishedAnswer;
}

export async function performRetrieval(query: string, history: any[] = []) {
    // 0-TOKEN SHORTCUT: Enhanced 'Chatting Friend' Greeting
    const isGreeting = /^(hi|hello|hey|who are you|who r u|greet|start)$/i.test(query.trim());
    if (isGreeting) {
        return { 
            answer: "Hey there, friend! 🌟 I'm **Aura**, your MSAJCE campus buddy! I was built with ❤️ by **Ram (a 2nd-year IT rockstar)** to help you navigate everything here at Mohamed Sathak A.J. College of Engineering.\n\nWhat's on your mind? Admissions, placements, or maybe just curious about the campus life? Ask away! 🚀", 
            reliability: 'FAST_SKIP' 
        };
    }
    try {
        // --- HYDRA RETRIEVAL (QDRANT FIRST -> SUPABASE FALLBACK) ---
        let context = "";
        let technique = "QDRANT_VECTOR_PRIMARY";

        // 0.5 RESOLVE CONVERSATIONAL QUERY (Memory Integration)
        let resolvedQuery = query;
        try {
            resolvedQuery = await resolveContextualQuery(query, history);
        } catch (memError) {
            console.warn("Memory resolution failed, using raw query.");
        }
        
        if (ADMIN_IDS.includes(query)) console.log(`🧠 DEBUG: "${query}" -> "${resolvedQuery}"`);

        // 1. EMBED QUERY (OpenAI 1536)
        const { embedding } = await embed({ model: EMBED_MODEL, value: resolvedQuery });
        const vectorArray = embedding;

        try {
            // ENGINE A: QDRANT (Priority)
            
            // Priority Search: If searching for the principal, increase limit and focus
            const isTargetedSearch = /srinivasan|principal|head/i.test(resolvedQuery);
            
            const qdrantResults = await qdrant.search(COLLECTION_NAME, {
                vector: vectorArray,
                limit: isTargetedSearch ? 15 : 10,
                with_payload: true
            });

            if (qdrantResults && qdrantResults.length > 0) {
                context = qdrantResults.map(r => r.payload?.content || "").join('\n---\n');
            }
        } catch (qError) {
            console.warn("⚠️ Qdrant Engine Failed - Falling back to Supabase...");
        }

        // ENGINE B: SUPABASE FALLBACK (If Qdrant failed or returned empty)
        if (!context || context.trim().length < 50) {
            technique = "SUPABASE_HYBRID_FALLBACK";
            try {
                const sql = getSql();
                const matches = await sql`
                    SELECT content, metadata, similarity
                    FROM hybrid_search(
                        ${`[${vectorArray.join(',')}]`}::vector,
                        ${resolvedQuery},
                        0.1,
                        15
                    )
                `;
                context = matches.map((m: any) => m.content || "").join('\n---\n');
            } catch (dbError) {
                console.error("Supabase Fallback Failed:", dbError);
            }
        }

        // 2. GENERATION
        const answer = await generateAuraResponse(resolvedQuery, context, history.slice(-2), isGreeting);

        return { 
            answer, 
            reliability: technique === "QDRANT_VECTOR_PRIMARY" ? 'VECTOR_FAST' : 'HYBRID_STABLE', 
            metadata: { expanded: true, technique } 
        };

    } catch (e: any) {
        console.error("Critical Retrieval Failure:", e);
        const isAdmin = history.some(h => ADMIN_IDS.includes(h.user_id)); // Basic admin check
        const errorMessage = e.message || "Unknown error";
        return { 
            answer: `Oh hey friend! I'm doing some quick mental stretches right now. Try asking me again in a few seconds! 🚀${isAdmin ? `\n\nDEBUG [Admin]: ${errorMessage}` : ''}`, 
            reliability: 'RECOVERING' 
        };
    }
}
