import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import convert from 'heic-convert';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = 'c:\\Users\\dhanu\\Downloads\\drive-download-20260702T121514Z-3-001';
const destDir = path.join(__dirname, '..', 'public', 'images', 'inventory');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function run() {
  console.log(`Scanning source folder: ${srcDir}`);
  try {
    const files = fs.readdirSync(srcDir);
    console.log(`Found ${files.length} items. Starting conversion...`);
    
    for (const file of files) {
      if (file.toLowerCase().endsWith('.heic')) {
        const srcPath = path.join(srcDir, file);
        const destFile = file.slice(0, -5) + '.jpg';
        const destPath = path.join(destDir, destFile);
        
        if (fs.existsSync(destPath)) {
          console.log(`Skipping (already exists): ${destFile}`);
          continue;
        }
        
        console.log(`Converting ${file} -> ${destFile}...`);
        try {
          const inputBuffer = fs.readFileSync(srcPath);
          const outputBuffer = await convert({
            buffer: inputBuffer,
            format: 'JPEG',
            quality: 0.8
          });
          
          fs.writeFileSync(destPath, outputBuffer);
          console.log(`Saved: ${destFile}`);
        } catch (err) {
          console.error(`Error converting ${file}:`, err.message);
        }
      }
    }
    console.log('Conversion process complete!');
  } catch (globalErr) {
    console.error('Fatal error during scan:', globalErr.message);
  }
}

run();
