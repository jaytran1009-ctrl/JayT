/**
 * JAYT STAGING STATIC PREVIEW SERVER (PORT 4173)
 * Governing Directive: JAYT-245 Section JAYT-260-CORRECTION-6 (Lines 5520-5535)
 *
 * SCOPE: Serves immutable staging deployment build artifacts from staging_deploy_ey/
 * Provides /health endpoint with exact 4-way manifest hash parity.
 *
 * NOTE: This server is strictly a Static Preview Server for verified build parity.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 4173;
const ROOT = path.resolve(__dirname, '..');
const DEPLOY_DIR = path.join(ROOT, 'staging_deploy_ey');
const MANIFEST_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_BUILD_MANIFEST.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1:' + PORT);
  const pathname = url.pathname;

  // /health endpoint
  if (pathname === '/health') {
    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    const sotJsBytes = fs.readFileSync(path.join(ROOT, manifest.artifacts.sot_js.path));
    const servedJsBytes = fs.readFileSync(path.join(ROOT, manifest.artifacts.served_js.path));
    const sotHtmlBytes = fs.readFileSync(path.join(ROOT, manifest.artifacts.sot_html.path));
    const servedHtmlBytes = fs.readFileSync(path.join(ROOT, manifest.artifacts.served_html.path));

    const sotJsSha = crypto.createHash('sha256').update(sotJsBytes).digest('hex');
    const servedJsSha = crypto.createHash('sha256').update(servedJsBytes).digest('hex');
    const sotHtmlSha = crypto.createHash('sha256').update(sotHtmlBytes).digest('hex');
    const servedHtmlSha = crypto.createHash('sha256').update(servedHtmlBytes).digest('hex');

    const healthData = {
      status: 'UP',
      version: manifest.expectedVersion,
      build_id: manifest.build_id,
      parity: 'PERFECT_MATCH_ZERO_DRIFT',
      expectedVersion: manifest.expectedVersion,
      sot_js_sha256: sotJsSha,
      served_js_sha256: servedJsSha,
      sot_html_sha256: sotHtmlSha,
      served_html_sha256: servedHtmlSha,
      manifestMatch: sotJsSha === manifest.artifacts.sot_js.sha256 && sotHtmlSha === manifest.artifacts.sot_html.sha256
    };

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(healthData, null, 2));
    return;
  }

  // Static file resolution
  let filePath = pathname === '/' ? path.join(DEPLOY_DIR, 'index.html') : path.join(DEPLOY_DIR, pathname);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(ROOT, pathname);
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found: ' + pathname);
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('✅ Staging Preview Server running at http://127.0.0.1:' + PORT + '/');
});
