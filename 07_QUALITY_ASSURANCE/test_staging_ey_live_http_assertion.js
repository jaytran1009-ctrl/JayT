/**
 * JAYT SECTION EY LIVE HTTP ASSERTION SUITE
 * Governing Directive: JAYT-245 Section EY (Lines 3848-3877), Mandate EY.3
 * Version: v3.478.0-staging.ey
 *
 * This script tests the ACTUAL SERVED HTTP RESPONSE from staging,
 * NOT source files. All assertions run against http://127.0.0.1:4173/.
 */

const http = require('http');
const crypto = require('crypto');
const assert = require('assert');

function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function runLiveAssertions() {
  console.log('\n🧪 RUNNING JAYT SECTION EY LIVE HTTP ASSERTION SUITE (v3.478.0-staging.ey)...');
  console.log('   Target: http://127.0.0.1:4173/\n');

  let totalTests = 0;
  let passedTests = 0;

  function it(name, fn) {
    totalTests++;
    try {
      fn();
      console.log('  ✓ ' + name);
      passedTests++;
    } catch (err) {
      console.error('  ✕ ' + name + ': ' + err.message);
      throw err;
    }
  }

  // 1. Health
  console.log('--- Suite 1: Health & Version ---');
  const healthResp = await httpGet('http://127.0.0.1:4173/health');
  const healthJson = JSON.parse(healthResp.body);
  it('Health endpoint returns 200 with version v3.478.0-staging.ey', () => {
    assert.strictEqual(healthResp.status, 200);
    assert.strictEqual(healthJson.version, 'v3.478.0-staging.ey');
    assert.strictEqual(healthJson.status, 'UP');
  });

  // 2. Index
  const indexResp = await httpGet('http://127.0.0.1:4173/');
  const indexBody = indexResp.body;
  it('index.html returns 200 and references jayt_storefront_staging_ey.js', () => {
    assert.strictEqual(indexResp.status, 200);
    assert.ok(indexBody.includes('jayt_storefront_staging_ey.js'));
  });

  // 3. JS file
  const jsResp = await httpGet('http://127.0.0.1:4173/jayt_storefront_staging_ey.js');
  const jsBody = jsResp.body;
  it('JS file returns 200 and contains v3.478.0-staging.ey', () => {
    assert.strictEqual(jsResp.status, 200);
    assert.ok(jsBody.includes('v3.478.0-staging.ey'));
  });

  // 4. GATE: Maps href count = 0
  console.log('\n--- Suite 2: EY Gate Assertions (Must All Be 0) ---');
  const mapsCount = (jsBody.match(/google\.com\/maps/g) || []).length + (indexBody.match(/google\.com\/maps/g) || []).length;
  it('Maps href count = ' + mapsCount + ' (MUST BE 0)', () => {
    assert.strictEqual(mapsCount, 0);
  });

  // 5. GATE: Derived locality = 0
  const FORBIDDEN_LOCALITY = ['Vĩnh Trung Plaza','Vincom Plaza','Helio Center','Nguyễn Văn Linh','Pasteur Đà Nẵng','Tầng 1 Helio','Tầng 4','Ngô Quyền','Điện Biên Phủ'];
  let localityCount = 0;
  FORBIDDEN_LOCALITY.forEach(t => { if (jsBody.includes(t)) localityCount++; });
  it('Derived locality assertions count = ' + localityCount + ' (MUST BE 0)', () => {
    assert.strictEqual(localityCount, 0);
  });

  // 6. GATE: Fake count labels = 0
  const fakeCount50 = (jsBody.match(/Khám phá \(50\)/g) || []).length;
  const fakeCT13 = (jsBody.match(/Chương Trình \(13\)/g) || []).length;
  it('"Khám phá (50)" count = ' + fakeCount50 + ' (MUST BE 0)', () => {
    assert.strictEqual(fakeCount50, 0);
  });
  it('"Chương Trình (13)" count = ' + fakeCT13 + ' (MUST BE 0)', () => {
    assert.strictEqual(fakeCT13, 0);
  });

  // 7. GATE: Forbidden promo lexicon = 0
  const FORBIDDEN_PROMO = ['Mua 1 Tặng 1','Happy Lunch','U22','Ngày Tri Ân','voucher đổi thưởng','mã quà tặng','freeship','go.isclix'];
  let promoCount = 0;
  FORBIDDEN_PROMO.forEach(t => { if (jsBody.toLowerCase().includes(t.toLowerCase())) promoCount++; });
  it('Forbidden promo lexicon count = ' + promoCount + ' (MUST BE 0)', () => {
    assert.strictEqual(promoCount, 0);
  });

  // 8. GATE: T2/T3 badges = 0
  const t2Count = (jsBody.match(/TIER_2_PROGRAMME/g) || []).length;
  const t3Count = (jsBody.match(/TIER_3_LOCAL/g) || []).length;
  it('T2 badge count = ' + t2Count + ' (MUST BE 0)', () => {
    assert.strictEqual(t2Count, 0);
  });
  it('T3 badge count = ' + t3Count + ' (MUST BE 0)', () => {
    assert.strictEqual(t3Count, 0);
  });

  // 9. SOT / Deploy parity hash
  console.log('\n--- Suite 3: SOT / Deploy Parity ---');
  const servedJsSha = crypto.createHash('sha256').update(jsBody).digest('hex');
  const sotJsContent = require('fs').readFileSync('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/03_SOURCE_OF_TRUTH/jayt_storefront_staging_ey.js', 'utf8');
  const sotJsSha = crypto.createHash('sha256').update(sotJsContent).digest('hex');
  it('SOT SHA = Served SHA (zero drift)', () => {
    assert.strictEqual(servedJsSha, sotJsSha, 'DEPLOY_DRIFT detected');
  });

  // 10. Raw output
  console.log('\n--- RAW ASSERTION OUTPUT ---');
  console.log(JSON.stringify({
    version: 'v3.478.0-staging.ey',
    health_status: healthJson.status,
    maps_href_count: mapsCount,
    derived_locality_count: localityCount,
    fake_count_labels: fakeCount50 + fakeCT13,
    forbidden_promo_count: promoCount,
    t2_badge_count: t2Count,
    t3_badge_count: t3Count,
    sot_sha256: sotJsSha,
    served_sha256: servedJsSha,
    parity: servedJsSha === sotJsSha ? 'PERFECT_MATCH_ZERO_DRIFT' : 'DEPLOY_DRIFT',
    served_html_sha256: crypto.createHash('sha256').update(indexBody).digest('hex')
  }, null, 2));

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' LIVE HTTP ASSERTION TESTS PASSED!\n');
}

runLiveAssertions().catch(err => {
  console.error('❌ Live HTTP Assertion Error:', err.message);
  process.exit(1);
});
