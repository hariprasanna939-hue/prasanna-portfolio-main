import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const framesDir = path.resolve(__dirname, '../public/hero-frames');

if (!fs.existsSync(framesDir)) {
  console.error(`Directory not found: ${framesDir}`);
  process.exit(1);
}

const files = fs.readdirSync(framesDir);
const frameFiles = files
  .filter((f) => /^frame_\d{4}\.webp$/.test(f))
  .sort();

if (frameFiles.length < 2) {
  console.error(
    `Error: Found ${frameFiles.length} frames in ${framesDir}. At least 2 frames (frame_0001.webp...) are required to create a turntable sequence.`
  );
  process.exit(1);
}

const manifestPath = path.join(framesDir, 'manifest.json');
const manifestData = { count: frameFiles.length };

fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2), 'utf-8');
console.log(`Success: Registered ${frameFiles.length} frames in ${manifestPath}`);
