/**
 * JAYT STAGING RUNTIME HTTP/HTTPS SERVER (047)
 * Directive: JAYT-PUBLIC-LAUNCH-047 — GATE 3: CLOUD STAGING & HEALTH MONITORS
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const repoRoot = path.resolve(__dirname, '..', '..');
const truthDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const vaultDir = path.join(repoRoot, '08_RELEASE_VAULT');
const stagingBuildManifestPath = path.join(vaultDir, 'deployments', 'staging_instance_g3_038', 'BUILD_MANIFEST.json');

// Configuration from Environment Variables (Zero hard-coded secrets)
const PORT = parseInt(process.env.PORT || process.env.STAGING_PORT || '3000', 10);
const HOST = process.env.HOST || '127.0.0.1';
const NODE_ENV = process.env.NODE_ENV || 'staging';
const SSL_CERT_PATH = process.env.SSL_CERT_PATH || '';
const SSL_KEY_PATH = process.env.SSL_KEY_PATH || '';

let buildManifest = {
  build_id: 'BUILD-STAGING-047-LAUNCH',
  build_timestamp: new Date().toISOString(),
  work_order: 'JAYT-PUBLIC-LAUNCH-047',
  deal_count: 1
};

if (fs.existsSync(stagingBuildManifestPath)) {
  try {
    buildManifest = JSON.parse(fs.readFileSync(stagingBuildManifestPath, 'utf8'));
  } catch {}
}

const startTime = Date.now();

function requestHandler(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS & Security Headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // --- HEALTH ENDPOINTS ---
  if (pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({
      status: 'healthy',
      service: 'jayt-staging-runtime',
      environment: NODE_ENV,
      timestamp: new Date().toISOString(),
      uptime_seconds: Math.floor((Date.now() - startTime) / 1000)
    }, null, 2));
  }

  if (pathname === '/readyz') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({
      ready: true,
      service: 'jayt-staging-runtime',
      active_build_id: buildManifest.build_id,
      deal_count: buildManifest.deal_count,
      timestamp: new Date().toISOString()
    }, null, 2));
  }

  if (pathname === '/api/build-info') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({
      active_build_id: buildManifest.build_id,
      build_timestamp: buildManifest.build_timestamp,
      work_order: buildManifest.work_order,
      scope: 'STAGING_INTERNAL_ONLY',
      deal_count: buildManifest.deal_count,
      server_uptime_seconds: Math.floor((Date.now() - startTime) / 1000)
    }, null, 2));
  }

  // --- STATIC ASSETS ---
  let filePath = path.join(truthDir, pathname === '/' ? 'index.html' : pathname);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(truthDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    res.end(data);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Internal Server Error: ${err.message}`);
  }
}

let server;
if (SSL_CERT_PATH && SSL_KEY_PATH && fs.existsSync(SSL_CERT_PATH) && fs.existsSync(SSL_KEY_PATH)) {
  const options = {
    key: fs.readFileSync(SSL_KEY_PATH),
    cert: fs.readFileSync(SSL_CERT_PATH)
  };
  server = https.createServer(options, requestHandler);
  console.log('🔒 Khởi tạo Staging Server ở chế độ HTTPS');
} else {
  server = http.createServer(requestHandler);
  console.log('🌐 Khởi tạo Staging Server ở chế độ HTTP');
}

if (require.main === module) {
  server.listen(PORT, HOST, () => {
    console.log(`🚀 [JAYT-STAGING-SERVER] Đang chạy tại http://${HOST}:${PORT}`);
    console.log(`   - Health endpoint: http://${HOST}:${PORT}/healthz`);
    console.log(`   - Ready endpoint:  http://${HOST}:${PORT}/readyz`);
    console.log(`   - Build info:      http://${HOST}:${PORT}/api/build-info`);
  });
}

module.exports = { server, PORT, HOST };
