const fs = require('fs');
const path = require('path');
const http = require('http');
const assert = require('assert');
const { captureVenueProvenance } = require('../05_DEAL_AND_AFFILIATE/safe_provenance_collector_100.js');

let passCount = 0;
let totalCount = 0;

async function runAsyncTest(name, fn) {
  totalCount++;
  try {
    await fn();
    console.log(`  [${name}]: [PASS]`);
    passCount++;
  } catch (err) {
    console.error(`  [${name}]: [FAIL] - ${err.message}`);
  }
}

async function main() {
  console.log('🧪 [JAYT-100-TEST] Khởi chạy bộ kiểm thử Safe Fail-Closed Provenance Collector (Unit & Mock Server Isolation)...\n');

  const testOutputDir = path.resolve(__dirname, 'runtime_evidence', 'test_collector_100_runs');
  if (fs.existsSync(testOutputDir)) {
    fs.rmSync(testOutputDir, { recursive: true, force: true });
  }
  fs.mkdirSync(testOutputDir, { recursive: true });

  // Spin up mock HTTP test server
  let currentMockMode = 'NORMAL_200';
  const server = http.createServer((req, res) => {
    if (currentMockMode === 'NORMAL_200') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>Metiz Cinema Đà Nẵng Official</title></head>
        <body>
          <h1>Metiz Cinema Đà Nẵng</h1>
          <p>Địa chỉ: Số 01 Đường 2 Tháng 9, Phường Hòa Cường Bắc, Quận Hải Châu, TP Đà Nẵng</p>
          <div>Hotline: 0236 3630 689</div>
        </body>
        </html>
      `);
    } else if (currentMockMode === 'HTTP_404') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else if (currentMockMode === 'EMPTY_BODY') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<html><head></head><body></body></html>');
    } else if (currentMockMode === 'HTTP_500') {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  });

  const port = await new Promise(resolve => {
    server.listen(0, '127.0.0.1', () => resolve(server.address().port));
  });

  const baseUrl = `http://127.0.0.1:${port}`;

  // TEST 01: Positive Capture with Authentic HTTP 200 + Valid DOM
  await runAsyncTest('TEST_01_POSITIVE_CAPTURE_AUTHENTIC_200_AND_DOM', async () => {
    currentMockMode = 'NORMAL_200';
    const target = {
      id: 'TARGET_TEST_METIZ',
      venueName: 'Metiz Cinema Đà Nẵng',
      url: `${baseUrl}/metiz`,
      district: 'Hải Châu',
      sector: 'CINEMA'
    };

    const res = await captureVenueProvenance(target, testOutputDir, { timeoutMs: 10000 });
    assert.strictEqual(res.success, true, 'Positive capture must succeed');
    assert.strictEqual(res.status, 'CAPTURE_AUTHENTICATED');

    const targetDir = path.join(testOutputDir, target.id);
    assert.ok(fs.existsSync(path.join(targetDir, 'page.html')), 'page.html must exist');
    assert.ok(fs.existsSync(path.join(targetDir, 'page.txt')), 'page.txt must exist');
    assert.ok(fs.existsSync(path.join(targetDir, 'page.png')), 'page.png must exist');
    assert.ok(fs.existsSync(path.join(targetDir, 'capture_receipt.json')), 'capture_receipt.json must exist');

    const textContent = fs.readFileSync(path.join(targetDir, 'page.txt'), 'utf8');
    assert.ok(textContent.includes('Metiz Cinema Đà Nẵng'), 'page.txt must contain authentic extracted text');
    assert.ok(!textContent.includes('FALLBACK_METADATA'), 'page.txt MUST NOT contain synthetic fallback');
  });

  // TEST 02: Negative Capture on HTTP 404 Error
  await runAsyncTest('TEST_02_NEGATIVE_FAIL_CLOSED_ON_HTTP_404', async () => {
    currentMockMode = 'HTTP_404';
    const target = {
      id: 'TARGET_TEST_404',
      venueName: 'Non Existent Store',
      url: `${baseUrl}/404`,
      district: 'Hải Châu',
      sector: 'FNB'
    };

    const res = await captureVenueProvenance(target, testOutputDir, { timeoutMs: 10000 });
    assert.strictEqual(res.success, false, 'Capture must fail-closed on HTTP 404');
    assert.strictEqual(res.status, 'FAILED_CAPTURE');

    const targetDir = path.join(testOutputDir, target.id);
    assert.strictEqual(fs.existsSync(path.join(targetDir, 'page.html')), false, 'page.html MUST NOT exist on failure');
    assert.strictEqual(fs.existsSync(path.join(targetDir, 'page.txt')), false, 'page.txt MUST NOT exist on failure');
    assert.ok(fs.existsSync(path.join(targetDir, 'capture_failed_receipt.json')), 'capture_failed_receipt.json must exist');
  });

  // TEST 03: Negative Capture on Empty DOM / Empty Body
  await runAsyncTest('TEST_03_NEGATIVE_FAIL_CLOSED_ON_EMPTY_DOM', async () => {
    currentMockMode = 'EMPTY_BODY';
    const target = {
      id: 'TARGET_TEST_EMPTY',
      venueName: 'Empty Store',
      url: `${baseUrl}/empty`,
      district: 'Thanh Khê',
      sector: 'COFFEE'
    };

    const res = await captureVenueProvenance(target, testOutputDir, { timeoutMs: 10000 });
    assert.strictEqual(res.success, false, 'Capture must fail-closed on empty DOM');
    assert.strictEqual(res.status, 'FAILED_CAPTURE');

    const targetDir = path.join(testOutputDir, target.id);
    assert.strictEqual(fs.existsSync(path.join(targetDir, 'page.html')), false, 'page.html MUST NOT exist on failure');
    assert.strictEqual(fs.existsSync(path.join(targetDir, 'page.txt')), false, 'page.txt MUST NOT exist on failure');
  });

  // TEST 04: Negative Capture on HTTP 500 Server Error
  await runAsyncTest('TEST_04_NEGATIVE_FAIL_CLOSED_ON_HTTP_500', async () => {
    currentMockMode = 'HTTP_500';
    const target = {
      id: 'TARGET_TEST_500',
      venueName: 'Error Store',
      url: `${baseUrl}/500`,
      district: 'Sơn Trà',
      sector: 'CINEMA'
    };

    const res = await captureVenueProvenance(target, testOutputDir, { timeoutMs: 10000 });
    assert.strictEqual(res.success, false, 'Capture must fail-closed on HTTP 500');
    assert.strictEqual(res.status, 'FAILED_CAPTURE');
  });

  // TEST 05: Negative Capture on Network Timeout / Unreachable Host
  await runAsyncTest('TEST_05_NEGATIVE_FAIL_CLOSED_ON_NETWORK_TIMEOUT', async () => {
    const target = {
      id: 'TARGET_TEST_TIMEOUT',
      venueName: 'Timeout Store',
      url: 'http://127.0.0.1:59999/unreachable',
      district: 'Hòa Khánh',
      sector: 'FNB'
    };

    const res = await captureVenueProvenance(target, testOutputDir, { timeoutMs: 2500 });
    assert.strictEqual(res.success, false, 'Capture must fail-closed on unreachable port');
    assert.strictEqual(res.status, 'FAILED_CAPTURE');
  });

  server.close();

  // Cleanup test artifacts
  fs.rmSync(testOutputDir, { recursive: true, force: true });

  console.log('\n======================================================');
  if (passCount === totalCount) {
    console.log(`🟢 [FAIL-CLOSED-COLLECTOR-SUMMARY] Toàn bộ ${passCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
  } else {
    console.error(`❌ [FAIL-CLOSED-COLLECTOR-SUMMARY] Thất bại: ${passCount}/${totalCount} PASS.\n`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
