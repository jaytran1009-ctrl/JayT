/**
 * JAYT LIVE COMMUNITY SAVINGS HUB HOTFIX SMOKE TEST (080R)
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
  console.log('🌐 [LIVE-SMOKE-080R] Khởi chạy kiểm tra thực địa Hotfix 080R trên Vercel Production...\n');

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

    // 4. Check 080R Semantic Hotfix Elements
    const hasNeutralVoucherStatus = jsRes.body.includes("badgeClass: 'badge-user-entered'") && jsRes.body.includes("Tự nhập (Còn hạn");
    const hasNeutralFooter = jsRes.body.includes('Xem phạm vi dữ liệu và nguồn thông tin trong mục Minh bạch.');
    const hasZeroAbsoluteClaim = !jsRes.body.includes('0 theo dõi riêng tư') && !jsRes.body.includes('100% minh bạch');

    assertCheck('CHECK_05_HOTFIX_080R_ELEMENTS',
      hasNeutralVoucherStatus && hasNeutralFooter && hasZeroAbsoluteClaim,
      'Live bundle chứa đầy đủ sửa đổi 080R: Trạng thái voucher trung tính badge-user-entered, Footer trung thực và 0 tuyên bố tuyệt đối.'
    );

    console.log(`\n======================================================`);
    console.log(`🟢 [LIVE-SMOKE-080R-SUMMARY] Kết quả kiểm thử Live: ${pass}/${pass + fail} PASS!\n`);

    if (fail > 0) process.exit(1);
  } catch (err) {
    console.error('Lỗi khi fetch live URL:', err);
    process.exit(1);
  }
}

runLiveSmokeTest();
