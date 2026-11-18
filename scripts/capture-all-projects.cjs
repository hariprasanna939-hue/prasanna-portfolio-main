const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PROJECTS = [
  {
    index: 1,
    id: '01',
    name: 'AIBASS – AI Accounting Software',
    filename: 'project-01-aibass.webp',
    url: 'https://software.saaiss.in/',
    category: 'AI Accounting / FinTech',
  },
  {
    index: 2,
    id: '02',
    name: 'Halal Medi',
    filename: 'project-02-halal-medi.webp',
    url: 'https://halal-website-main.vercel.app/login',
    category: 'Healthcare / Medical Platform',
  },
  {
    index: 3,
    id: '03',
    name: 'Halal Medical – Super Admin',
    filename: 'project-03-halal-super-admin.webp',
    url: 'https://halal-super-admin-main.vercel.app/',
    category: 'Healthcare / Admin Dashboard',
  },
  {
    index: 4,
    id: '04',
    name: 'AdvocateCaseOS',
    filename: 'project-04-advocatecaseos.webp',
    url: 'https://advocatecasehub-main-main.vercel.app/login',
    category: 'Legal Technology / Case Management',
  },
  {
    index: 5,
    id: '05',
    name: 'BeltForge',
    filename: 'project-05-beltforge.webp',
    url: 'https://beltforge.vercel.app/',
    category: 'Industrial AI / Predictive Maintenance',
  },
  {
    index: 6,
    id: '06',
    name: 'RailSync',
    filename: 'project-06-railsync.webp',
    url: 'https://web-shipper-main.vercel.app/',
    category: 'Logistics / AI Freight Booking',
  },
  {
    index: 7,
    id: '07',
    name: 'Halal Medical – Web User',
    filename: 'project-07-halal-medical-webuser.webp',
    url: 'https://halal-medical-webuser.vercel.app/',
    category: 'Healthcare / Medical Tourism',
  },
  {
    index: 8,
    id: '08',
    name: 'Connect Care',
    filename: 'project-08-connect-care.webp',
    url: 'https://medical-new-rose.vercel.app/',
    category: 'Healthcare / Medical Platform',
  },
  {
    index: 9,
    id: '09',
    name: 'Halal Health Hub',
    filename: 'project-09-halal-health-hub.webp',
    url: 'https://halal-portals.vercel.app/',
    category: 'Healthcare / Multi-Portal Platform',
  },
];

const OUTPUT_DIR = path.resolve(__dirname, '../public/projects');
const SCRATCH_DIR = path.resolve(
  '/Users/prasannahari/.gemini/antigravity/brain/bfc39606-7908-4c3e-bc25-2edd4975d91e/scratch/project_captures'
);

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(SCRATCH_DIR)) {
  fs.mkdirSync(SCRATCH_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.pending = new Map();

    this.ready = new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && this.pending.has(data.id)) {
        const { resolve, reject } = this.pending.get(data.id);
        this.pending.delete(data.id);
        if (data.error) reject(data.error);
        else resolve(data.result);
      }
    };
  }

  async send(method, params = {}) {
    await this.ready;
    const msgId = this.id++;
    return new Promise((resolve, reject) => {
      this.pending.set(msgId, { resolve, reject });
      this.ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  close() {
    this.ws.close();
  }
}

async function inspectAndCapture() {
  console.log('Starting Chrome for project inspection & screenshot capture...');
  const chromeProc = spawn(
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    [
      '--headless=new',
      '--remote-debugging-port=9227',
      '--user-data-dir=/tmp/chrome_projects_capture',
      '--no-first-run',
      '--no-default-browser-check',
      '--window-size=1440,920',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  let pageTarget = null;
  for (let i = 0; i < 20; i++) {
    try {
      await sleep(300);
      const res = await fetch('http://127.0.0.1:9227/json/list');
      const list = await res.json();
      pageTarget = list.find((t) => t.type === 'page');
      if (pageTarget && pageTarget.webSocketDebuggerUrl) break;
    } catch (e) {}
  }

  if (!pageTarget) {
    console.error('Failed to attach to Chrome');
    chromeProc.kill();
    process.exit(1);
  }

  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await client.send('Page.enable');
  await client.send('Runtime.enable');

  const report = [];

  for (const proj of PROJECTS) {
    console.log(`\n========================================`);
    console.log(`[${proj.id}/09] Inspecting: ${proj.name}`);
    console.log(`URL: ${proj.url}`);

    let inspectionResult = {
      ...proj,
      success: false,
      title: '',
      metaDesc: '',
      h1: '',
      h2List: [],
      bodySnippet: '',
      error: null,
      bytes: 0,
    };

    try {
      // Navigate to URL
      console.log(`Navigating to ${proj.url}...`);
      await client.send('Page.navigate', { url: proj.url });

      // Wait for network and DOM to settle
      await sleep(4500);

      // Extract metadata and visible text
      const extracted = await client.send('Runtime.evaluate', {
        expression: `
          (() => {
            const title = document.title || '';
            const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
            const h1 = document.querySelector('h1')?.innerText?.trim() || '';
            const h2List = Array.from(document.querySelectorAll('h2')).map(h => h.innerText.trim()).filter(Boolean).slice(0, 5);
            const bodySnippet = (document.body?.innerText || '').slice(0, 800).replace(/\\s+/g, ' ').trim();
            return { title, metaDesc, h1, h2List, bodySnippet };
          })()
        `,
        returnByValue: true,
      });

      if (extracted && extracted.result && extracted.result.value) {
        inspectionResult = {
          ...inspectionResult,
          ...extracted.result.value,
        };
      }

      console.log(`Title: "${inspectionResult.title}"`);
      console.log(`H1: "${inspectionResult.h1}"`);
      console.log(`H2s: ${JSON.stringify(inspectionResult.h2List)}`);
      console.log(`Snippet: "${inspectionResult.bodySnippet.slice(0, 160)}..."`);

      // Capture screenshot
      console.log(`Capturing screenshot...`);
      const screenshot = await client.send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false,
      });

      const rawBuffer = Buffer.from(screenshot.data, 'base64');
      const rawPngPath = path.join(SCRATCH_DIR, `project-${proj.id}-raw.png`);
      fs.writeFileSync(rawPngPath, rawBuffer);

      // Convert and optimize to WebP with Sharp
      const targetWebpPath = path.join(OUTPUT_DIR, proj.filename);
      await sharp(rawBuffer)
        .resize(1440, 900, {
          fit: 'cover',
          position: 'top',
        })
        .webp({ quality: 86, effort: 5 })
        .toFile(targetWebpPath);

      const stats = fs.statSync(targetWebpPath);
      inspectionResult.success = true;
      inspectionResult.bytes = stats.size;
      console.log(`Saved optimized WebP: ${targetWebpPath} (${Math.round(stats.size / 1024)} KB)`);
    } catch (err) {
      console.error(`Error processing ${proj.name}:`, err.message);
      inspectionResult.error = err.message;
    }

    report.push(inspectionResult);
  }

  client.close();
  chromeProc.kill();

  const reportPath = path.join(SCRATCH_DIR, 'inspection_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nInspection completed! Report saved to ${reportPath}`);
}

inspectAndCapture().catch(console.error);
