/**
 * JAYT LIVE COMMUNITY SAVINGS HUB SMOKE TEST (080)
 * Tests HTTPS live deployment at https://deploy-ten-xi-48.vercel.app
 */

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const targetUrl = 'https://deploy-ten-xi-48.vercel.app';
const jsUrl = 'https://deploy-ten-xi-48.vercel.app/jayt_apex_interface.js';
const repoRoot = path.resolve(__dirname, '..');
const sotJsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const sotJsCode = fs.readFileSync(sotJsPath, 'utf8');
const expectedHash = crypto.createHash('sha256').update(sotJsCode, 'utf8').digest('hex');

function fetchUrl(url, userAgent) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: {
        'User-Agent': userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };
    https.get(options, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        resolve({ statusCode: res.statusCode, headers: res.headers, buffer: buf, body: buf.toString('utf8') });
      });
    }).on('error', reject);
  });
}

async function runLiveSmokeTest() {
  console.log('🌐 [LIVE-SMOKE-080] Khởi chạy kiểm tra thực địa Community Hub trên Vercel Production...\n');

  let pass = 0;
  let fail = 0;

  function assertCheck(name, cond, msg) {
    if (cond) {
      console.log(`  [${name}]: [PASS] - ${msg}`);
      pass++;
    } else {
      console.error(`  [${name}]: [FAIL] - ${msg}`);
      fail++;
    }
  }

  try {
    // 1. Desktop HTML Fetch
    const desktopRes = await fetchUrl(targetUrl);
    assertCheck('CHECK_01_DESKTOP_HTTPS_200', desktopRes.statusCode === 200, `Desktop HTTP Status: ${desktopRes.statusCode}`);

    // 2. Mobile HTML Fetch
    const mobileRes = await fetchUrl(targetUrl, 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15');
    assertCheck('CHECK_02_MOBILE_HTTPS_200', mobileRes.statusCode === 200, `Mobile HTTP Status: ${mobileRes.statusCode}`);

    // 3. Live JS Fetch & Hash Verification
    const jsRes = await fetchUrl(jsUrl);
    assertCheck('CHECK_03_JS_FILE_HTTPS_200', jsRes.statusCode === 200, `JS Bundle HTTP Status: ${jsRes.statusCode}`);

    const liveJsHash = crypto.createHash('sha256').update(jsRes.buffer).digest('hex');
    assertCheck('CHECK_04_LIVE_JS_BYTE_PARITY',
      liveJsHash === expectedHash,
      `Mã băm JS trên Live (${liveJsHash}) khớp 100% Source of Truth cục bộ (${expectedHash}).`
    );

    // 4. Check 080 Features on Live JS
    const hasMyVouchers = jsRes.body.includes('my_vouchers') && jsRes.body.includes('Voucher Của Tôi');
    const hasReportSignal = jsRes.body.includes('report_voucher') && jsRes.body.includes('Báo Voucher Vừa Thấy');
    const hasTwoAreas = jsRes.body.includes('KHU VỰC 1: Ưu Đãi Đã Xác Thực (Verified Deals)') && jsRes.body.includes('KHU VỰC 2: Kho Voucher Do Bạn Tự Nhập');

    assertCheck('CHECK_05_COMMUNITY_HUB_FEATURES',
      hasMyVouchers && hasReportSignal && hasTwoAreas,
      'Live bundle chứa đầy đủ các tính năng 080: Ví Voucher cá nhân, Luồng Báo Voucher, Phân định 2 khu vực rõ ràng.'
    );

    console.log(`\n======================================================`);
    console.log(`🟢 [LIVE-SMOKE-080-SUMMARY] Kết quả kiểm thử Live: ${pass}/${pass + fail} PASS!\n`);

    if (fail > 0) process.exit(1);
  } catch (err) {
    console.error('Lỗi khi fetch live URL:', err);
    process.exit(1);
  }
}

runLiveSmokeTest();
