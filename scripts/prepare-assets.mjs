import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

async function main() {
  console.log('Generating & optimizing portfolio assets...');

  // 1. Portrait: images/portrait.webp and images/portrait.jpg (≥1200px wide, ~4:5 ratio)
  const founderSource = path.join(root, 'public/founder.jpeg');
  const portraitWebp = path.join(root, 'public/images/portrait.webp');
  const portraitJpg = path.join(root, 'public/images/portrait.jpg');

  if (fs.existsSync(founderSource)) {
    await sharp(founderSource)
      .resize({ width: 1200, height: 1500, fit: 'cover', position: 'top' })
      .webp({ quality: 90 })
      .toFile(portraitWebp);

    await sharp(founderSource)
      .resize({ width: 1200, height: 1500, fit: 'cover', position: 'top' })
      .jpeg({ quality: 90 })
      .toFile(portraitJpg);
    console.log('Created portrait.webp and portrait.jpg from founder.jpeg');
  }

  // 2. Hero Background: images/hero-bg.webp (1920x1080 dark atmosphere)
  const heroBgPath = path.join(root, 'public/images/hero-bg.webp');
  const heroBgSvg = Buffer.from(`
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="rg1" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#ff7448" stop-opacity="0.18" />
          <stop offset="60%" stop-color="#75d3c2" stop-opacity="0.05" />
          <stop offset="100%" stop-color="#0b0b0b" stop-opacity="1" />
        </radialGradient>
        <radialGradient id="rg2" cx="20%" cy="80%" r="45%">
          <stop offset="0%" stop-color="#75d3c2" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#0b0b0b" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="grid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#161616" />
          <stop offset="100%" stop-color="#0b0b0b" />
        </linearGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#grid)" />
      <rect width="1920" height="1080" fill="url(#rg1)" />
      <rect width="1920" height="1080" fill="url(#rg2)" />
    </svg>
  `);
  await sharp(heroBgSvg).webp({ quality: 90 }).toFile(heroBgPath);
  console.log('Created images/hero-bg.webp');

  // 3. Open Graph: og.jpg (1200x630)
  const ogPath = path.join(root, 'public/og.jpg');
  const ogSvg = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#0b0b0b" />
      <circle cx="950" cy="200" r="300" fill="#ff7448" opacity="0.15" />
      <circle cx="200" cy="500" r="250" fill="#75d3c2" opacity="0.1" />
      <text x="100" y="240" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#ff7448" letter-spacing="4">PORTFOLIO</text>
      <text x="100" y="320" font-family="system-ui, sans-serif" font-size="64" font-weight="900" fill="#f6f1e8">Prasanna Hari</text>
      <text x="100" y="390" font-family="system-ui, sans-serif" font-size="28" font-weight="500" fill="#9e9991">Product Architect &amp; Full-Stack Engineer</text>
      <rect x="100" y="440" width="80" height="4" rx="2" fill="#ff7448" />
    </svg>
  `);
  await sharp(ogSvg).jpeg({ quality: 90 }).toFile(ogPath);
  console.log('Created og.jpg');

  // 4. Projects: projects/dashboard.webp, projects/recipe.webp, projects/shop.webp
  const projectItems = [
    { name: 'dashboard.webp', title: 'Shree Andal AI', color: '#ff7448' },
    { name: 'recipe.webp', title: 'DPDP AI Compliance', color: '#75d3c2' },
    { name: 'shop.webp', title: 'SmartHealth Ecosystem', color: '#38bdf8' },
  ];

  for (const p of projectItems) {
    const outPath = path.join(root, 'public/projects', p.name);
    const svg = Buffer.from(`
      <svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="600" fill="#161616" />
        <rect x="30" y="30" width="740" height="540" rx="16" fill="#0b0b0b" stroke="#f6f1e8" stroke-opacity="0.1" stroke-width="1.5" />
        <circle cx="70" cy="65" r="6" fill="#f6f1e8" opacity="0.4" />
        <circle cx="90" cy="65" r="6" fill="#f6f1e8" opacity="0.4" />
        <circle cx="110" cy="65" r="6" fill="#f6f1e8" opacity="0.4" />
        <line x1="30" y1="95" x2="770" y2="95" stroke="#f6f1e8" stroke-opacity="0.08" stroke-width="1.5" />
        <circle cx="400" cy="300" r="140" fill="${p.color}" opacity="0.12" />
        <text x="400" y="295" text-anchor="middle" font-family="system-ui, sans-serif" font-size="34" font-weight="800" fill="#f6f1e8">${p.title}</text>
        <text x="400" y="335" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="${p.color}" letter-spacing="2">SYSTEM PREVIEW</text>
      </svg>
    `);
    await sharp(svg).webp({ quality: 90 }).toFile(outPath);
  }
  console.log('Created project preview webp files');

  // 5. Drawings: images/drawings/drawing-1..6.webp (800x1000)
  const drawingPalettes = ['#ff7448', '#75d3c2', '#eab308', '#ec4899', '#8b5cf6', '#3b82f6'];
  for (let i = 1; i <= 6; i++) {
    const outPath = path.join(root, 'public/images/drawings', `drawing-${i}.webp`);
    const color = drawingPalettes[i - 1];
    const svg = Buffer.from(`
      <svg width="800" height="1000" viewBox="0 0 800 1000" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="1000" fill="#141414" />
        <circle cx="400" cy="500" r="280" fill="${color}" opacity="0.15" />
        <polygon points="400,200 620,680 180,680" fill="none" stroke="${color}" stroke-width="2.5" stroke-opacity="0.7" />
        <circle cx="400" cy="460" r="140" fill="none" stroke="#f6f1e8" stroke-width="1.5" stroke-opacity="0.4" />
        <line x1="200" y1="500" x2="600" y2="500" stroke="#f6f1e8" stroke-opacity="0.2" stroke-width="1" />
        <line x1="400" y1="260" x2="400" y2="740" stroke="#f6f1e8" stroke-opacity="0.2" stroke-width="1" />
        <text x="400" y="860" text-anchor="middle" font-family="monospace" font-size="18" fill="#f6f1e8" opacity="0.7" letter-spacing="4">STUDY 0${i}</text>
      </svg>
    `);
    await sharp(svg).webp({ quality: 90 }).toFile(outPath);
  }
  console.log('Created drawing-1..6.webp');

  // 6. Sports: images/sports/sport-1..6.webp (1200x800)
  // Let's also check if existing hackathon/sports pictures exist to resize some of them!
  const existingImages = [
    'public/images/hackathon1.jpeg',
    'public/images/hackathon2.jpeg',
    'public/images/hackathon3.jpeg',
    'public/images/sih-1.jpeg',
    'public/images/sih-2.jpeg',
    'public/images/sih-team.jpeg',
  ];

  for (let i = 1; i <= 6; i++) {
    const outPath = path.join(root, 'public/images/sports', `sport-${i}.webp`);
    const sourceCandidate = path.join(root, existingImages[i - 1]);

    if (fs.existsSync(sourceCandidate)) {
      await sharp(sourceCandidate)
        .resize({ width: 1200, height: 800, fit: 'cover' })
        .webp({ quality: 85 })
        .toFile(outPath);
    } else {
      const color = drawingPalettes[6 - i];
      const svg = Buffer.from(`
        <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
          <rect width="1200" height="800" fill="#141414" />
          <circle cx="600" cy="400" r="260" fill="${color}" opacity="0.18" />
          <circle cx="600" cy="400" r="160" fill="none" stroke="${color}" stroke-width="3" stroke-opacity="0.6" />
          <text x="600" y="415" text-anchor="middle" font-family="system-ui, sans-serif" font-size="36" font-weight="800" fill="#f6f1e8">ATHLETIC DISCIPLINE 0${i}</text>
        </svg>
      `);
      await sharp(svg).webp({ quality: 90 }).toFile(outPath);
    }
  }
  console.log('Created sport-1..6.webp');
  console.log('All static assets generated successfully!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
