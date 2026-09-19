const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

async function run() {
  console.log('📸 [GEN-099] Khởi tạo bằng chứng Staging Review 5 Cụm Nguồn Cung (22 Địa Điểm Cobalt) phục vụ trực tiếp từ Staging Instance...');

  const evidenceDir = path.resolve(__dirname, 'runtime_evidence', 'screenshots_099');
  if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true });
  }

  // Serve directly from staging_instance directory
  const stagingInstanceDir = path.resolve(__dirname, '..', '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH');

  // Start HTTP server
  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(stagingInstanceDir, reqPath);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath);
      const mime = ext === '.html' ? 'text/html' : ext === '.js' ? 'application/javascript' : ext === '.json' ? 'application/json' : 'text/plain';
      res.writeHead(200, { 'Content-Type': mime });
      res.end(fs.readFileSync(filePath));
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  const port = await new Promise(resolve => {
    server.listen(0, '127.0.0.1', () => {
      resolve(server.address().port);
    });
  });

  console.log(`  ✓ HTTP Staging Instance Server đang chạy tại: http://127.0.0.1:${port}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.message));

  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
  const html = await page.content();
  console.log('HTML Length:', html.length);

  await browser.close();
  server.close();
}

run().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
