/**
 * JAYT LIVE PUBLIC BETA SMOKE TEST (079R3)
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
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function runLiveSmokeTest() {
  console.log('🌐 [LIVE-SMOKE-079R3] Khởi chạy kiểm tra thực địa trên Vercel Production...\n');

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
    const desktopRes = await fetchUrl(targetUrl, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    assertCheck('CHECK_01_DESKTOP_HTTPS_200', desktopRes.statusCode === 200, `Desktop HTTP Status: ${desktopRes.statusCode}`);
    assertCheck('CHECK_02_DESKTOP_CONTAINS_CONTAINER', desktopRes.body.includes('id="jayt-apex"'), 'Desktop HTML chứa container #jayt-apex.');

    // 2. Mobile HTML Fetch
    const mobileRes = await fetchUrl(targetUrl, 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148');
    assertCheck('CHECK_03_MOBILE_HTTPS_200', mobileRes.statusCode === 200, `Mobile HTTP Status: ${mobileRes.statusCode}`);

    // 3. Live JS Fetch & Hash Verification
    const jsRes = await fetchUrl(jsUrl);
    assertCheck('CHECK_04_JS_FILE_HTTPS_200', jsRes.statusCode === 200, `JS Bundle HTTP Status: ${jsRes.statusCode}`);

    const liveJsHash = crypto.createHash('sha256').update(jsRes.body, 'utf8').digest('hex');
    assertCheck('CHECK_05_LIVE_JS_BYTE_PARITY',
      liveJsHash === expectedHash,
      `Mã băm JS trên Live (${liveJsHash}) khớp 100% Source of Truth cục bộ (${expectedHash}).`
    );

    // 4. Check Content Elements on Live JS
    const hasHeroNeutral = jsRes.body.includes('Trợ lý lập kế hoạch và tính tiền chi tiêu mỗi ngày cho sinh viên và người đi làm Đà Nẵng. Dữ liệu kế hoạch được lưu cục bộ trên thiết bị của bạn.');
    const hasPIIEngine = jsRes.body.includes('detectPII') && jsRes.body.includes('Không nhập số điện thoại, email');
    const hasNeutralRadar = jsRes.body.includes('Kiểm tra điều kiện tại nguồn chính thức trước khi quyết định.');
    const hasZeroForbidden = !jsRes.body.toLowerCase().includes('100% minh bạch');

    assertCheck('CHECK_06_LIVE_HERO_AND_PRIVACY_STANDARDS',
      hasHeroNeutral && hasPIIEngine && hasNeutralRadar && hasZeroForbidden,
      'Live bundle chứa đầy đủ các chuẩn mực 079R3: Hero trung thực, bộ lọc PII, radar chuẩn hóa và 0 claim tuyệt đối.'
    );

    console.log(`\n======================================================`);
    console.log(`🟢 [LIVE-SMOKE-079R3-SUMMARY] Kết quả kiểm thử Live: ${pass}/${pass + fail} PASS!\n`);

    if (fail > 0) process.exit(1);
  } catch (err) {
    console.error('Lỗi khi fetch live URL:', err);
    process.exit(1);
  }
}

runLiveSmokeTest();
