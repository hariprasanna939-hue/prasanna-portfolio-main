const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SITES = [
  {
    index: 2,
    id: '02',
    name: 'Halal Medi',
    filename: 'project-02-halal-medi.webp',
    url: 'https://halal-website-main.vercel.app/',
    category: 'Healthcare / Medical Platform',
  },
  {
    index: 4,
    id: '04',
    name: 'AdvocateCaseOS',
    filename: 'project-04-advocatecaseos.webp',
    url: 'https://advocatecasehub-main-main.vercel.app/',
    category: 'Legal Technology / Case Management',
  },
];

const OUTPUT_DIR = path.resolve(__dirname, '../public/projects');
const SCRATCH_DIR = path.resolve(
  '/Users/prasannahari/.gemini/antigravity/brain/bfc39606-7908-4c3e-bc25-2edd4975d91e/scratch/project_captures'
);

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

async function run() {
  const chromeProc = spawn(
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    [
      '--headless=new',
      '--remote-debugging-port=9228',
      '--user-data-dir=/tmp/chrome_p2_p4_capture',
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
      const res = await fetch('http://127.0.0.1:9228/json/list');
      const list = await res.json();
      pageTarget = list.find((t) => t.type === 'page');
      if (pageTarget && pageTarget.webSocketDebuggerUrl) break;
    } catch (e) {}
  }

  if (!pageTarget) {
    chromeProc.kill();
    return;
  }

  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await client.send('Page.enable');
  await client.send('Runtime.enable');

  for (const s of SITES) {
    console.log(`\nNavigating to ${s.name}: ${s.url}`);
    await client.send('Page.navigate', { url: s.url });
    await sleep(5000);

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

    console.log(`Title:`, extracted?.result?.value?.title);
    console.log(`H1:`, extracted?.result?.value?.h1);
    console.log(`H2s:`, extracted?.result?.value?.h2List);
    console.log(`Snippet:`, extracted?.result?.value?.bodySnippet?.slice(0, 200));

    // Save metadata to file
    fs.writeFileSync(
      path.join(SCRATCH_DIR, `project-${s.id}-meta.json`),
      JSON.stringify(extracted?.result?.value || {}, null, 2)
    );

    const screenshot = await client.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });

    const rawBuffer = Buffer.from(screenshot.data, 'base64');
    fs.writeFileSync(path.join(SCRATCH_DIR, `project-${s.id}-raw.png`), rawBuffer);

    const targetWebpPath = path.join(OUTPUT_DIR, s.filename);
    await sharp(rawBuffer)
      .resize(1440, 900, {
        fit: 'cover',
        position: 'top',
      })
      .webp({ quality: 86, effort: 5 })
      .toFile(targetWebpPath);

    const stats = fs.statSync(targetWebpPath);
    console.log(`Saved optimized WebP: ${targetWebpPath} (${Math.round(stats.size / 1024)} KB)`);
  }

  client.close();
  chromeProc.kill();
  console.log('Finished capturing Project 02 and Project 04!');
}

run().catch(console.error);
