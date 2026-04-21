import fs from 'fs';
import path from 'path';

export function logTelemetry(engine: 'nvidia' | 'gemini', facts: number, tokens: number) {
    const filePath = path.join(process.cwd(), `lib/rag/engine/telemetry_${engine}.json`);
    let data = { facts: 0, tokens: 0 };
    
    try {
        if (fs.existsSync(filePath)) {
            data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
    } catch (e) {}

    data.facts += facts;
    data.tokens += tokens;

    console.log(`💾 TELEMETRY: Updating ${engine} sensor (${data.facts} facts)...`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function getTelemetry() {
    const nvPath = path.join(process.cwd(), `lib/rag/engine/telemetry_nvidia.json`);
    const gePath = path.join(process.cwd(), `lib/rag/engine/telemetry_gemini.json`);
    
    let nvidia = { facts: 0, tokens: 0 };
    let gemini = { facts: 0, tokens: 0 };

    try {
        if (fs.existsSync(nvPath)) nvidia = JSON.parse(fs.readFileSync(nvPath, 'utf-8'));
        if (fs.existsSync(gePath)) gemini = JSON.parse(fs.readFileSync(gePath, 'utf-8'));
    } catch (e) {}

    return { 
        nvidia, 
        gemini, 
        lastUpdate: new Date().toISOString() 
    };
}
