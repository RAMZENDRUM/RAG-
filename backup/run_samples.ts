import { processFile } from './batch_ingest';
import path from 'path';

async function main() {
    try {
        console.log('🧪 STAGE 1: High Priority Sample (AR7)...');
        const highPath = path.resolve('organized_vault/pdfs/high/AR7.pdf');
        await processFile('high', highPath);

        console.log('🧪 STAGE 2: Medium Priority Sample (DrMuthumariM)...');
        const medPath = path.resolve('organized_vault/pdfs/medium/DrMuthumariM.pdf');
        await processFile('medium', medPath);

        console.log('✅ PROTOCOL SUCCESS. All samples finalized.');
    } catch (error: any) {
        console.error('❌ BATCH ERROR:', error.message);
        process.exit(1);
    }
}

main();
