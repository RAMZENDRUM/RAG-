import * as fs from 'fs-extra';
import * as path from 'path';

const BASE_DIR = 'd:/.gemini/RAG college/extracted_data';
const ORGANIZED_DIR = path.join(BASE_DIR, 'organized');

const CATEGORIES = {
  Admissions: ['admission', 'prospectus', 'flyer', 'brochure', 'fees', 'scholarship'],
  Transport: ['bus', 'route', 'transport', 'driver', 'timing'],
  Placements: ['placement', 'internship', 'recruiter', 'salary', 'career'],
  Academic_Syllabus: ['syllabus', 'regulation', 'curriculum', 'course-code', 'units'],
  Department_Records: ['department', 'lab', 'objective', 'experiment', 'facility', 'faculty', 'profile']
};

/**
 * MISSION: Physical reorganization of 452 PDFs into the User-Defined Hierarchy.
 */
async function organizeRepository() {
    console.log("📂 Commencing Institutional Restructuring...");

    // 1. Create Folders
    for (const cat of Object.keys(CATEGORIES)) {
        await fs.ensureDir(path.join(ORGANIZED_DIR, cat));
    }
    const miscellaneousDir = path.join(ORGANIZED_DIR, 'Miscellaneous');
    await fs.ensureDir(miscellaneousDir);

    // 2. Identify all source files (searching active_rag, cold_storage, and root)
    const searchDirs = [
        path.join(BASE_DIR, '0_source_pdfs'),
        path.join(BASE_DIR, 'active_rag'),
        path.join(BASE_DIR, 'cold_storage')
    ];

    for (const dir of searchDirs) {
        if (!(await fs.pathExists(dir))) continue;

        const files = await fs.readdir(dir);
        for (const file of files) {
            if (!file.toLowerCase().endsWith('.pdf')) continue;

            let assigned = false;
            let targetCat = 'Miscellaneous';

            // Heuristic Assignment
            for (const [cat, keywords] of Object.entries(CATEGORIES)) {
                if (keywords.some(k => file.toLowerCase().includes(k))) {
                    targetCat = cat;
                    assigned = true;
                    break;
                }
            }

            // Special check for dept codes 101-107 as syllabus
            if (!assigned && /10[1-7]/.test(file)) {
                targetCat = 'Academic_Syllabus';
            }

            const sourcePath = path.join(dir, file);
            const destPath = path.join(ORGANIZED_DIR, targetCat, file);

            try {
                await fs.move(sourcePath, destPath, { overwrite: true });
                
                // Sync MD backup if it exists
                const mdFile = file + '.md';
                const mdSource = path.join(dir, mdFile);
                if (await fs.pathExists(mdSource)) {
                    await fs.move(mdSource, path.join(ORGANIZED_DIR, targetCat, mdFile), { overwrite: true });
                }
            } catch (err) {
                console.error(`   ❌ Failed to move ${file}: ${err.message}`);
            }
        }
    }

    console.log("\n✨ RESTRUCTURING COMPLETE.");
    console.log(`📍 Organized Hierarchy: ${ORGANIZED_DIR}`);
}

organizeRepository().catch(console.error);
