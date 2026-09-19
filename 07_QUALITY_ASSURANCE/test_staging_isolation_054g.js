/**
 * JAYT STAGING ISOLATION & SECURITY HARDENING TEST SUITE (054G)
 * Directive: JAYT-STAGING-ISOLATION-HARDENING-054G
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const net = require('net');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const { createStagingServer, BUILD_ID, ENVIRONMENT, stagingFeedPath, prodFeedPath } = require('../08_RELEASE_VAULT/deployments/staging_server_054f');
const receiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'staging_054f', 'STAGING_E2E_RECEIPT_054F.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

let passedCount = 0;
let totalCount = 0;

function assertTest(testName, condition, detail) {
  totalCount++;
  if (condition) {
    passedCount++;
    console.log(`  [${testName}]: [PASS] - ${detail}`);
  } else {
    console.error(`  [${testName}]: [FAIL] - ${detail}`);
    process.exitCode = 1;
  }
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.listen(0, '127.0.0.1', () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
    srv.on('error', reject);
  });
}

function makeRequest(options) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(body); } catch {}
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body,
          json
        });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function runIsolationHardeningTests() {
  console.log('🧪 [JAYT-STAGING-ISOLATION-054G-TEST] Khởi chạy bộ kiểm thử cô lập & thắt chặt bảo mật Staging 054G...');

  // Start Server 1: Default Staging Mode (enableTestSimulation = false)
  const defaultPort = await getFreePort();
  const defaultServer = createStagingServer({ enableTestSimulation: false });
  await new Promise(r => defaultServer.listen(defaultPort, '127.0.0.1', r));

  // Start Server 2: Test Simulation Mode (enableTestSimulation = true)
  const testPort = await getFreePort();
  const testServer = createStagingServer({ enableTestSimulation: true });
  await new Promise(r => testServer.listen(testPort, '127.0.0.1', r));

  try {
    // 1. Assert NO CORS Wildcard
    const resHealthz = await makeRequest({
      hostname: '127.0.0.1',
      port: defaultPort,
      path: '/healthz',
      method: 'GET'
    });
    const allowOrigin = resHealthz.headers['access-control-allow-origin'];
    assertTest('T1_01_NO_CORS_WILDCARD', allowOrigin !== '*',
      `Không gửi wildcard Access-Control-Allow-Origin: * (Giá trị nhận được: ${allowOrigin || 'undefined/omitted'}).`);

    // 2. Loopback Origin Allowed Dynamically
    const loopbackOrigin = `http://127.0.0.1:${defaultPort}`;
    const resLoopback = await makeRequest({
      hostname: '127.0.0.1',
      port: defaultPort,
      path: '/healthz',
      method: 'GET',
      headers: {
        'Origin': loopbackOrigin
      }
    });
    const loopbackAllow = resLoopback.headers['access-control-allow-origin'];
    assertTest('T1_02_LOOPBACK_ORIGIN_ALLOWED_DYNAMICALLY',
      resLoopback.statusCode === 200 && loopbackAllow === loopbackOrigin,
      `Origin loopback (${loopbackOrigin}) được chấp nhận chính xác qua Access-Control-Allow-Origin động.`);

    // 3. External Untrusted Origin Blocked with 403 Forbidden
    const evilOrigin = 'https://malicious-attacker.com';
    const resEvilOrigin = await makeRequest({
      hostname: '127.0.0.1',
      port: defaultPort,
      path: '/api/staging-deals',
      method: 'GET',
      headers: {
        'Origin': evilOrigin
      }
    });
    assertTest('T1_03_EXTERNAL_ORIGIN_REJECTED_403',
      resEvilOrigin.statusCode === 403 && resEvilOrigin.json?.error === 'FORBIDDEN_CROSS_ORIGIN',
      `Origin bên ngoài (${evilOrigin}) bị từ chối với mã 403 Forbidden (FORBIDDEN_CROSS_ORIGIN).`);

    // 4. External Untrusted Host Blocked with 403 Forbidden
    const evilHost = 'attacker-domain.org';
    const resEvilHost = await makeRequest({
      hostname: '127.0.0.1',
      port: defaultPort,
      path: '/healthz',
      method: 'GET',
      headers: {
        'Host': evilHost
      }
    });
    assertTest('T1_04_EXTERNAL_HOST_REJECTED_403',
      resEvilHost.statusCode === 403 && resEvilHost.json?.error === 'FORBIDDEN_UNTRUSTED_HOST',
      `Host header bên ngoài (${evilHost}) bị từ chối với mã 403 Forbidden (FORBIDDEN_UNTRUSTED_HOST).`);

    // 5. Default Staging Mode Strictly Ignores ?sim_time (Uses Real Clock)
    const fakeTime = '2026-08-24T12:00:00+07:00';
    const resDefaultSim = await makeRequest({
      hostname: '127.0.0.1',
      port: defaultPort,
      path: `/api/staging-deals?sim_time=${encodeURIComponent(fakeTime)}`,
      method: 'GET'
    });
    const defaultData = resDefaultSim.json;
    const isRealClock = defaultData && defaultData.clock_mode === 'REAL_SYSTEM_CLOCK';
    assertTest('T1_05_DEFAULT_MODE_IGNORES_SIM_TIME', isRealClock,
      `Chế độ Staging mặc định bỏ qua ?sim_time và chạy strictly bằng REAL_SYSTEM_CLOCK (clock_mode: ${defaultData?.clock_mode}).`);

    // 6. Test Simulation Mode Allows ?sim_time for E2E Test Harness
    const resTestSim = await makeRequest({
      hostname: '127.0.0.1',
      port: testPort,
      path: `/api/staging-deals?sim_time=${encodeURIComponent(fakeTime)}`,
      method: 'GET'
    });
    const testData = resTestSim.json;
    const isSimulated = testData && testData.clock_mode === 'TEST_SIMULATED_CLOCK' && testData.active_rendered_count === 1;
    assertTest('T1_06_TEST_MODE_ALLOWS_SIM_TIME', isSimulated,
      `Chế độ kiểm thử (enableTestSimulation: true) chấp nhận ?sim_time để test 3 kịch bản vòng đời (active_rendered_count = 1).`);

    // 7. Security Isolation Headers Present
    const csp = resHealthz.headers['content-security-policy'];
    const xcto = resHealthz.headers['x-content-type-options'];
    const xfo = resHealthz.headers['x-frame-options'];
    const hasStrictHeaders = csp && csp.includes("default-src 'self'") && xcto === 'nosniff' && xfo === 'DENY';
    assertTest('T1_07_STRICT_ISOLATION_SECURITY_HEADERS', hasStrictHeaders,
      'Đầy đủ các headers bảo mật cô lập: Content-Security-Policy, X-Content-Type-Options: nosniff, X-Frame-Options: DENY.');

    // 8. Production Lock Invariant Unchanged
    const prodFeedContent = fs.readFileSync(prodFeedPath, 'utf8');
    const prodFeedJson = JSON.parse(prodFeedContent);
    const prodFeedSha = crypto.createHash('sha256').update(prodFeedContent).digest('hex');
    const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));

    const isProdEmpty = Array.isArray(prodFeedJson) && prodFeedJson.length === 0;
    const isProdShaMatched = prodFeedSha === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945';
    const isReleaseLocked = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === false;

    assertTest('INVARIANT_08_PRODUCTION_LOCKED',
      isProdEmpty && isProdShaMatched && isReleaseLocked,
      `Production feed duy trì bất biến [] (SHA-256: ${prodFeedSha}) và RELEASE_MANIFEST is_approved: false (LOCKED)`);

  } finally {
    defaultServer.close();
    testServer.close();
  }

  console.log(`\n🟢 [STAGING-ISOLATION-054G-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
}

if (require.main === module) {
  runIsolationHardeningTests().catch(err => {
    console.error('❌ [STAGING-ISOLATION-054G-ERROR]:', err);
    process.exit(1);
  });
}

module.exports = { runIsolationHardeningTests };
