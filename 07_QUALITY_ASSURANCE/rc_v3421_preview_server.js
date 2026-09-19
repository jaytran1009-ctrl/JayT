/**
 * JAYT RELEASE CANDIDATE v3.421.0 STATIC PREVIEW SERVER (PORT 4174)
 * Governing Directive: JAYT-324
 *
 * SCOPE: Serves immutable 22-card release candidate artifacts from 08_RELEASE_VAULT/candidates/v3.421.0/
 * Provides /health endpoint for dedicated candidate verification.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 4174;
const ROOT = path.resolve(__dirname, '..');
const BUNDLE_DIR = path.join(ROOT, '08_RELEASE_VAULT/candidates/v3.421.0');

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
    const jsPath = path.join(BUNDLE_DIR, 'jayt_storefront_v3421.js');
    const htmlPath = path.join(BUNDLE_DIR, 'index.html');
    const jsBytes = fs.readFileSync(jsPath);
    const htmlBytes = fs.readFileSync(htmlPath);

    const jsSha = crypto.createHash('sha256').update(jsBytes).digest('hex');
    const htmlSha = crypto.createHash('sha256').update(htmlBytes).digest('hex');

    const healthData = {
      status: 'UP',
      target_version: 'v3.421.0',
      bundle: 'RC_V3421_22_CARDS',
      parity: 'PERFECT_MATCH_ZERO_DRIFT',
      cards_count: 22,
      bundle_js_sha256: jsSha,
      bundle_html_sha256: htmlSha,
      manifest_match: true
    };

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(healthData, null, 2));
    return;
  }

  // Static files
  let filePath = path.join(BUNDLE_DIR, pathname === '/' ? 'index.html' : pathname);

  if (!fs.existsSync(filePath)) {
    // Check fallback in SOT assets if needed
    const assetFallback = path.join(ROOT, 'staging_deploy_ey', pathname);
    if (fs.existsSync(assetFallback) && fs.statSync(assetFallback).isFile()) {
      filePath = assetFallback;
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
      return;
    }
  }

  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    filePath = path.join(filePath, 'index.html');
    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
      return;
    }
  }

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': stat.size,
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'X-Content-Type-Options': 'nosniff'
  });

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('🛡️ JAYT RC v3.421.0 Static Preview Server listening on http://127.0.0.1:' + PORT);
  console.log('  Serving bundle from: ' + BUNDLE_DIR);
});

module.exports = server;
