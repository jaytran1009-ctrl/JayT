/**
 * CAPTURE STAGING SCREENSHOTS FOR 108R REVIEW PACK
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const stagingDir = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH');
const outputDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'screenshots_108r');

fs.mkdirSync(outputDir, { recursive: true });

function startServer(rootDir) {
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.png': 'image/png'
  };

  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(rootDir, reqPath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
      res.end(fs.readFileSync(filePath));
    } else {
      res.writeHead(404);
      res.end('404 Not Found');
    }
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      resolve({ server, port });
    });
  });
}

async function capture() {
  const { server, port } = await startServer(stagingDir);
  const testUrl = `http://127.0.0.1:${port}/index.html`;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  try {
    // 1. Desktop 1440
    const p1 = await browser.newPage();
    await p1.setViewport({ width: 1440, height: 900 });
    await p1.goto(testUrl, { waitUntil: 'networkidle0' });
    const deskPath = path.join(outputDir, 'staging_ui_108r_desktop_1440.png');
    await p1.screenshot({ path: deskPath, fullPage: true });
    console.log('✅ Desktop screenshot saved:', deskPath);
    await p1.close();

    // 2. Tablet 768
    const p2 = await browser.newPage();
    await p2.setViewport({ width: 768, height: 1024 });
    await p2.goto(testUrl, { waitUntil: 'networkidle0' });
    const tabPath = path.join(outputDir, 'staging_ui_108r_tablet_768.png');
    await p2.screenshot({ path: tabPath, fullPage: true });
    console.log('✅ Tablet screenshot saved:', tabPath);
    await p2.close();

    // 3. Mobile 375
    const p3 = await browser.newPage();
    await p3.setViewport({ width: 375, height: 812, isMobile: true });
    await p3.goto(testUrl, { waitUntil: 'networkidle0' });
    const mobPath = path.join(outputDir, 'staging_ui_108r_mobile_375.png');
    await p3.screenshot({ path: mobPath, fullPage: true });
    console.log('✅ Mobile screenshot saved:', mobPath);
    await p3.close();

  } finally {
    await browser.close();
    server.close();
  }
}

capture().catch(err => {
  console.error('Screenshot error:', err);
  process.exit(1);
});
