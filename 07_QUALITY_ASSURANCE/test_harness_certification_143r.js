/**
 * JAYT CAPTURE HARNESS LOCAL TEST-SERVER CERTIFICATION (143R)
 * Directive: JAYT-143R: CAPTURE-PROVENANCE INCIDENT, HARNESS CERTIFICATION & SCHEDULER FREEZE
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('puppeteer');
const { captureSingleUrlNative } = require('../05_DEAL_AND_AFFILIATE/native_event_capture_harness_143r');

console.log('========================================================================');
console.log('🧪 JAYT-143R: CAPTURE HARNESS LOCAL TEST-SERVER CERTIFICATION');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const testSandboxDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'harness_cert_sandbox_143r');

let passCount = 0;
let failCount = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${description}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${description}`);
    console.error(`     Error: ${err.message}`);
    failCount++;
  }
}

async function runLocalHarnessCertification() {
  fs.mkdirSync(testSandboxDir, { recursive: true });

  // 1. Static Source Code Scan for Insecure Flags & Fallbacks
  console.log('--- GATE 1: CODE SCAN (ZERO INSECURE FLAGS & ZERO SYNTHETIC FALLBACKS) ---');
  test('Capture harness contains 0 insecure browser flags and 0 synthetic fallbacks', () => {
    const harnessCode = fs.readFileSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'native_event_capture_harness_143r.js'), 'utf8');
    assert(!harnessCode.includes('--disable-web-security'), 'Forbidden flag --disable-web-security found!');
    assert(!harnessCode.includes('--ignore-certificate-errors'), 'Forbidden flag --ignore-certificate-errors found!');
    assert(!harnessCode.includes('|| 200'), 'Forbidden fallback || 200 found!');
    assert(!harnessCode.includes('|| 504'), 'Forbidden fallback || 504 found!');
    assert(!harnessCode.includes('networkError ? 504'), 'Forbidden ternary 504 found!');
    console.log('     Verified: Zero insecure flags and zero synthetic status fallbacks in harness.');
  });

  // 2. Spin up Local HTTP Test Server
  console.log('\n--- STARTING LOCAL TEST SERVER FOR CONTROLLED NETWORK PROVENANCE ---');
  const server = http.createServer((req, res) => {
    if (req.url === '/ok-200') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<html><body><h1>Trang Thành Công 200</h1><p>Nội dung hợp lệ.</p></body></html>');
    } else if (req.url === '/redirect-302') {
      res.writeHead(302, { 'Location': '/ok-200' });
      res.end();
    } else if (req.url === '/forbidden-403') {
      res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<html><body><h1>403 Forbidden</h1><p>Access Denied</p></body></html>');
    } else if (req.url === '/timeout-hang') {
      // Intentionally do not respond, let client timeout
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`     Local test server listening at ${baseUrl}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  });

  // Test 1: Route /ok-200
  console.log('\n--- GATE 2: ROUTE 200 PROVENANCE ---');
  try {
    const targetDir = path.join(testSandboxDir, 'test_200');
    const item = { capture_id: 'CERT_200', brand_name: 'Test 200', url: `${baseUrl}/ok-200` };
    const res = await captureSingleUrlNative(browser, item, targetDir, 'RUN_CERT');
    const receipt = JSON.parse(fs.readFileSync(path.join(targetDir, 'receipt.json'), 'utf8'));

    assert.strictEqual(receipt.http_status, 200);
    assert.strictEqual(receipt.navigation_response_observed, true);
    assert.strictEqual(receipt.final_url, `${baseUrl}/ok-200`);
    assert.strictEqual(res.is_trusted, true);
    console.log('  ✅ PASS: Route 200 successfully captured with exact HTTP status and final URL.');
    passCount++;
  } catch (err) {
    console.error('  ❌ FAIL: Gate 2 failed: ' + err.message);
    failCount++;
  }

  // Test 2: Route /redirect-302 -> /ok-200
  console.log('\n--- GATE 3: ROUTE 302 -> 200 REDIRECT CHAIN ---');
  try {
    const targetDir = path.join(testSandboxDir, 'test_302');
    const item = { capture_id: 'CERT_302', brand_name: 'Test 302', url: `${baseUrl}/redirect-302` };
    const res = await captureSingleUrlNative(browser, item, targetDir, 'RUN_CERT');
    const receipt = JSON.parse(fs.readFileSync(path.join(targetDir, 'receipt.json'), 'utf8'));

    assert.strictEqual(receipt.http_status, 200);
    assert.strictEqual(receipt.navigation_response_observed, true);
    assert.strictEqual(receipt.final_url, `${baseUrl}/ok-200`);
    assert(Array.isArray(receipt.redirect_chain), 'redirect_chain must be an array');
    assert.strictEqual(receipt.redirect_chain.length, 2, 'redirect_chain must contain exactly 2 steps');
    assert.strictEqual(receipt.redirect_chain[0].http_status, 302);
    assert.strictEqual(receipt.redirect_chain[1].http_status, 200);
    console.log('  ✅ PASS: Route 302 redirect chain recorded both 302 and 200 steps sequentially.');
    passCount++;
  } catch (err) {
    console.error('  ❌ FAIL: Gate 3 failed: ' + err.message);
    failCount++;
  }

  // Test 3: Route /forbidden-403
  console.log('\n--- GATE 4: ROUTE 403 PROVENANCE ---');
  try {
    const targetDir = path.join(testSandboxDir, 'test_403');
    const item = { capture_id: 'CERT_403', brand_name: 'Test 403', url: `${baseUrl}/forbidden-403` };
    const res = await captureSingleUrlNative(browser, item, targetDir, 'RUN_CERT');
    const receipt = JSON.parse(fs.readFileSync(path.join(targetDir, 'receipt.json'), 'utf8'));

    assert.strictEqual(receipt.http_status, 403);
    assert.strictEqual(receipt.navigation_response_observed, true);
    assert.strictEqual(receipt.final_url, `${baseUrl}/forbidden-403`);
    console.log('  ✅ PASS: Route 403 accurately recorded HTTP 403 status.');
    passCount++;
  } catch (err) {
    console.error('  ❌ FAIL: Gate 4 failed: ' + err.message);
    failCount++;
  }

  // Test 4: Route /timeout-hang (No fallback 504 allowed!)
  console.log('\n--- GATE 5: TIMEOUT / HANG (UNPROVEN STATUS, NO 504 DEFAULT) ---');
  try {
    const targetDir = path.join(testSandboxDir, 'test_hang');
    const item = { capture_id: 'CERT_HANG', brand_name: 'Test Hang', url: `${baseUrl}/timeout-hang` };
    const res = await captureSingleUrlNative(browser, item, targetDir, 'RUN_CERT', 3000);
    const receipt = JSON.parse(fs.readFileSync(path.join(targetDir, 'receipt.json'), 'utf8'));

    assert.strictEqual(receipt.http_status, 'HTTP_STATUS_UNPROVEN', 'Must NOT default to 504 or 200');
    assert.strictEqual(receipt.navigation_response_observed, false);
    assert.strictEqual(receipt.redirect_chain, 'REDIRECT_CHAIN_UNPROVEN');
    assert.strictEqual(res.is_trusted, false);
    console.log('  ✅ PASS: Connection timeout accurately recorded HTTP_STATUS_UNPROVEN without synthetic 504 default.');
    passCount++;
  } catch (err) {
    console.error('  ❌ FAIL: Gate 5 failed: ' + err.message);
    failCount++;
  }

  // Test 5: Byte-level Hash Verification
  console.log('\n--- GATE 6: BYTE-FOR-BYTE PHYSICAL HASH VERIFICATION ---');
  test('Receipt SHA-256 hashes match physical disk files byte-for-byte', () => {
    const targetDir = path.join(testSandboxDir, 'test_200');
    const receipt = JSON.parse(fs.readFileSync(path.join(targetDir, 'receipt.json'), 'utf8'));
    const htmlBuf = fs.readFileSync(path.join(targetDir, 'page.html'));
    const expectedHtmlSha = crypto.createHash('sha256').update(htmlBuf).digest('hex');
    assert.strictEqual(receipt.fresh_hashes.html_sha256, expectedHtmlSha);
    console.log('     Verified HTML SHA matches disk buffer exactly.');
  });

  await browser.close();
  server.close();
  fs.rmSync(testSandboxDir, { recursive: true, force: true });

  console.log('\n========================================================================');
  console.log(`📊 CERTIFICATION SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
  console.log('========================================================================\n');

  if (failCount > 0) {
    process.exit(1);
  } else {
    console.log('✨ CAPTURE HARNESS 143R PASSED 100% OF LOCAL CERTIFICATION TESTS!');
    process.exit(0);
  }
}

runLocalHarnessCertification();
