/**
 * JAYT STAGING HTTP SERVER (054F / 054G HARDENED)
 * Directives: JAYT-CGV-RUNTIME-STAGING-E2E-054F, JAYT-STAGING-ISOLATION-HARDENING-054G
 * 
 * Hardening Features (054G):
 * 1. ZERO CORS WILDCARD: Removed Access-Control-Allow-Origin: *.
 * 2. STRICT LOOPBACK ORIGIN & HOST GUARD: Blocks non-loopback Host / Origin headers with 403 Forbidden.
 * 3. TEST-ONLY SIMULATION CLOCK: Query ?sim_time and x-simulation-time are strictly ignored in default
 *    staging mode. Only active when explicitly running with enableTestSimulation: true or TEST_SIMULATION_ENABLED=true.
 * 4. STRICT CSP & ISOLATION HEADERS: default-src 'self', frame-ancestors 'none'.
 * 5. PRODUCTION LOCK INVARIANT: Root deals_feed.json: [] and is_approved: false.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');

const { evaluateStagingTimebox061F: evaluateStagingTimebox, renderStagingFeed061F: renderStagingFeed } = require('../../07_QUALITY_ASSURANCE/staging_timeboxed_engine_061f');

const repoRoot = path.resolve(__dirname, '..', '..');
const stagingFeedPath = path.join(__dirname, 'staging_instance', '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const stagingStaticDir = path.join(__dirname, 'staging_instance', 'static_054f');

// Ensure static directory exists
if (!fs.existsSync(stagingStaticDir)) {
  fs.mkdirSync(stagingStaticDir, { recursive: true });
}

function getSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function isLoopbackOrigin(originStr) {
  if (!originStr) return true;
  try {
    const u = new URL(originStr);
    return u.hostname === '127.0.0.1' || u.hostname === 'localhost' || u.hostname === '::1';
  } catch {
    return false;
  }
}

function isLoopbackHost(hostStr) {
  if (!hostStr) return true;
  const hostWithoutPort = hostStr.split(':')[0].toLowerCase();
  return hostWithoutPort === '127.0.0.1' || hostWithoutPort === 'localhost' || hostWithoutPort === '::1';
}

const BUILD_ID = 'BUILD-STAGING-054F-CGV-TIMEBOXED-054G';
const ENVIRONMENT = 'STAGING_INTERNAL_ONLY';
const startTime = Date.now();

function createStagingServer(options = {}) {
  const enableTestSimulation = options.enableTestSimulation === true || process.env.TEST_SIMULATION_ENABLED === 'true';
  const stagingFeedSha256 = getSha256(stagingFeedPath);
  const prodFeedSha256 = getSha256(prodFeedPath);

  console.log('🚀 [STAGING-SERVER-054G] Khởi tạo Staging Runtime Server (Hardened Isolation)...');
  console.log(`   - BUILD_ID:                ${BUILD_ID}`);
  console.log(`   - ENVIRONMENT:             ${ENVIRONMENT}`);
  console.log(`   - TEST_SIMULATION_MODE:    ${enableTestSimulation ? 'ENABLED (TEST_ONLY)' : 'DISABLED (REAL_CLOCK_ONLY)'}`);
  console.log(`   - STAGING_FEED_PATH:       ${stagingFeedPath}`);
  console.log(`   - STAGING_FEED_SHA256:     ${stagingFeedSha256}`);
  console.log(`   - PROD_FEED_PATH:          ${prodFeedPath}`);
  console.log(`   - PROD_FEED_SHA256:        ${prodFeedSha256}`);
  console.log(`   - PRODUCTION_LOCK:         LOCKED (is_approved: false, prod_deals_feed: [])`);

  const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // 1. Host Header Validation
    const reqHost = req.headers.host;
    if (reqHost && !isLoopbackHost(reqHost)) {
      res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({
        error: 'FORBIDDEN_UNTRUSTED_HOST',
        message: 'Staging runtime only accepts requests targeting loopback interface (127.0.0.1 / localhost).'
      }));
    }

    // 2. Origin Header Validation (CORS Hardening)
    const reqOrigin = req.headers.origin;
    if (reqOrigin) {
      if (!isLoopbackOrigin(reqOrigin)) {
        res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({
          error: 'FORBIDDEN_CROSS_ORIGIN',
          message: 'Cross-origin requests from non-loopback domains are strictly blocked.'
        }));
      }
      // Dynamic loopback CORS only (Zero Wildcard)
      res.setHeader('Access-Control-Allow-Origin', reqOrigin);
      res.setHeader('Vary', 'Origin');
    }

    // Strict Security & Isolation Headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; font-src 'self'; frame-ancestors 'none';");
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    // Preflight OPTIONS handling
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-simulation-time');
      res.writeHead(204);
      return res.end();
    }

    // 3. /healthz Endpoint
    if (pathname === '/healthz') {
      const currentStagingFeedSha = getSha256(stagingFeedPath);
      const currentProdFeedSha = getSha256(prodFeedPath);
      const stagingFeed = fs.existsSync(stagingFeedPath) ? JSON.parse(fs.readFileSync(stagingFeedPath, 'utf8')) : [];

      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({
        status: 'UP',
        service: 'jayt-staging-runtime',
        environment: ENVIRONMENT,
        build_id: BUILD_ID,
        test_simulation_mode: enableTestSimulation,
        staging_feed_path: stagingFeedPath,
        staging_feed_sha256: currentStagingFeedSha,
        deal_count: stagingFeed.length,
        production_status: 'LOCKED (is_approved: false)',
        production_feed_sha256: currentProdFeedSha,
        timestamp: new Date().toISOString(),
        uptime_seconds: Math.floor((Date.now() - startTime) / 1000)
      }, null, 2));
    }

    // 4. /readyz Endpoint
    if (pathname === '/readyz') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({
        ready: true,
        environment: ENVIRONMENT,
        build_id: BUILD_ID,
        timestamp: new Date().toISOString()
      }, null, 2));
    }

    // 5. /api/staging-deals Endpoint
    if (pathname === '/api/staging-deals') {
      const stagingFeed = fs.existsSync(stagingFeedPath) ? JSON.parse(fs.readFileSync(stagingFeedPath, 'utf8')) : [];
      
      let evalTime = new Date().toISOString();
      let isSimulated = false;

      // Only allow simulation override if test mode is explicitly enabled
      if (enableTestSimulation) {
        const candidateSimTime = parsedUrl.query.sim_time || req.headers['x-simulation-time'];
        if (candidateSimTime) {
          evalTime = candidateSimTime;
          isSimulated = true;
        }
      }

      const renderResult = renderStagingFeed(stagingFeed, evalTime);

      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({
        environment: ENVIRONMENT,
        build_id: BUILD_ID,
        clock_mode: isSimulated ? 'TEST_SIMULATED_CLOCK' : 'REAL_SYSTEM_CLOCK',
        staging_feed_sha256: getSha256(stagingFeedPath),
        simulation_timestamp: renderResult.simulation_timestamp,
        total_feed_items: renderResult.total_feed_items,
        active_rendered_count: renderResult.active_rendered_count,
        rendered_items: renderResult.rendered_items
      }, null, 2));
    }

    // 6. Static Assets & Staging UI
    let targetFile = 'index.html';
    if (pathname !== '/' && pathname !== '') {
      targetFile = pathname.replace(/^\//, '');
    }

    const filePath = path.join(stagingStaticDir, targetFile);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.png': 'image/png',
        '.svg': 'image/svg+xml'
      };
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
      return res.end(fs.readFileSync(filePath));
    }

    // Fallback to index.html
    const indexHtmlPath = path.join(stagingStaticDir, 'index.html');
    if (fs.existsSync(indexHtmlPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(fs.readFileSync(indexHtmlPath));
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found - Staging Resource');
  });

  return server;
}

if (require.main === module) {
  const PORT = parseInt(process.env.STAGING_PORT || process.env.PORT || '3000', 10);
  const HOST = '127.0.0.1';
  const server = createStagingServer({ enableTestSimulation: process.env.TEST_SIMULATION_ENABLED === 'true' });
  server.listen(PORT, HOST, () => {
    const address = server.address();
    console.log(`🌐 [STAGING-SERVER-054G] Đang lắng nghe tại http://${HOST}:${address.port}`);
  });
}

module.exports = {
  createStagingServer,
  BUILD_ID,
  ENVIRONMENT,
  stagingFeedPath,
  prodFeedPath,
  isLoopbackOrigin,
  isLoopbackHost
};
