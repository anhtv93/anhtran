import { spawn } from 'node:child_process';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import process from 'node:process';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const root = process.cwd();
const cvPath = path.join(root, 'public', 'Tran-Viet-Anh-CMO-Leadership-Profile.html');
const outputPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(root, 'public', 'CV_anhtranviet.com.pdf');
const port = 9333 + Math.floor(Math.random() * 500);
const tmp = await mkdtemp(path.join(tmpdir(), 'cv-image-pdf-'));
const profileDir = path.join(tmp, 'chrome-profile');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const chrome = spawn(chromePath, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profileDir}`,
  '--disable-gpu',
  '--disable-dev-shm-usage',
  '--no-first-run',
  '--no-default-browser-check',
  '--hide-scrollbars',
  '--allow-file-access-from-files',
  '--window-size=1440,1600',
  `file://${cvPath}`,
], { stdio: ['ignore', 'ignore', 'pipe'] });

let stderr = '';
chrome.stderr.on('data', (chunk) => {
  stderr += chunk.toString();
});

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${await response.text()}`);
  return response.json();
}

async function waitForTarget() {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    try {
      const targets = await fetchJson(`http://127.0.0.1:${port}/json`);
      const target = targets.find((item) => item.type === 'page' && item.url.includes('Tran-Viet-Anh-CMO-Leadership-Profile.html')) || targets.find((item) => item.type === 'page');
      if (target?.webSocketDebuggerUrl) return target;
    } catch {
      await sleep(120);
    }
  }
  throw new Error(`Chrome DevTools target not available. ${stderr.slice(0, 800)}`);
}

function createCdpClient(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();

  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message || JSON.stringify(message.error)));
      else resolve(message.result || {});
    }
  });

  const opened = new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', reject, { once: true });
  });

  return {
    async send(method, params = {}) {
      await opened;
      const messageId = ++id;
      ws.send(JSON.stringify({ id: messageId, method, params }));
      return new Promise((resolve, reject) => {
        pending.set(messageId, { resolve, reject });
      });
    },
    close() {
      ws.close();
    },
  };
}

try {
  const target = await waitForTarget();
  const cdp = createCdpClient(target.webSocketDebuggerUrl);
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setEmulatedMedia', { media: 'screen' });
  await cdp.send('Page.navigate', { url: `file://${cvPath}` });
  await sleep(1200);
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1600,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await cdp.send('Runtime.evaluate', {
    expression: `(() => {
      const floating = document.querySelector('.floating-actions');
      if (floating) floating.style.setProperty('display', 'none', 'important');
    })()`
  });
  await sleep(300);

  const metricsResult = await cdp.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const body = document.body;
      const html = document.documentElement;
      return {
        width: Math.ceil(Math.max(body.scrollWidth, html.scrollWidth, body.offsetWidth, html.offsetWidth, html.clientWidth)),
        height: Math.ceil(Math.max(body.scrollHeight, html.scrollHeight, body.offsetHeight, html.offsetHeight, html.clientHeight))
      };
    })()`,
  });

  const { width, height } = metricsResult.result.value;

  const screenshot = await cdp.send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width, height, scale: 1 },
  });

  const imageHtmlPath = path.join(tmp, 'image-pdf.html');
  const pageWidthIn = width / 96;
  const pageHeightIn = height / 96;
  await writeFile(imageHtmlPath, `<!doctype html>
<html><head><meta charset="utf-8"><style>
@page { size: ${pageWidthIn}in ${pageHeightIn}in; margin: 0; }
html, body { margin: 0; padding: 0; width: ${width}px; min-height: ${height}px; background: #050505; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
img { display: block; width: ${width}px; height: ${height}px; }
</style></head><body><img src="data:image/png;base64,${screenshot.data}" alt="Anh Tran Viet CV" /></body></html>`);

  await cdp.send('Page.navigate', { url: `file://${imageHtmlPath}` });
  await sleep(600);
  const pdf = await cdp.send('Page.printToPDF', {
    printBackground: true,
    preferCSSPageSize: true,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    scale: 1,
  });

  await writeFile(outputPath, Buffer.from(pdf.data, 'base64'));
  cdp.close();
  console.log(`Created ${outputPath}`);
  console.log(`Captured ${width}x${height}px as one image page.`);
} finally {
  chrome.kill('SIGTERM');
  await rm(tmp, { recursive: true, force: true });
}
