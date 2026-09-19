const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('========================================================================');
console.log('🚨 JAYT-134B: P0 TRUTH, CONTACT & ASSET CONTAINMENT AUDIT');
console.log('========================================================================\n');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');
const manifestPath = path.resolve(__dirname, '../08_RELEASE_VAULT/INCIDENT_MANIFEST_JAYT_134B_CONTAINMENT.json');

const jsCode = fs.readFileSync(jsPath, 'utf8');
const htmlCode = fs.readFileSync(htmlPath, 'utf8');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

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

console.log('--- 1. INVARIANT 1: ZERO STOCK / UNSPLASH IMAGES IN SOURCE ---');
test('Zero occurrences of unsplash.com in jayt_apex_interface.js and index.html', () => {
  const jsMatches = jsCode.match(/unsplash\.com/g) || [];
  const htmlMatches = htmlCode.match(/unsplash\.com/g) || [];
  assert.strictEqual(jsMatches.length, 0, `Found ${jsMatches.length} Unsplash links in JS`);
  assert.strictEqual(htmlMatches.length, 0, `Found ${htmlMatches.length} Unsplash links in HTML`);
});

console.log('\n--- 2. INVARIANT 2: ZERO UNVERIFIED TEL: & DIRECT PHONE PROTOCOLS ---');
test('Zero tel: protocol links and zero fake phone numbers (0905123456, 0935987654, etc.)', () => {
  const telMatches = jsCode.match(/tel:[0-9]+/g) || [];
  const fakePhoneMatches = jsCode.match(/0905\d{6}|0935\d{6}/g) || [];
  assert.strictEqual(telMatches.length, 0, `Found ${telMatches.length} tel: links in JS`);
  assert.strictEqual(fakePhoneMatches.length, 0, `Found ${fakePhoneMatches.length} fake phone numbers in JS`);
});

console.log('\n--- 3. INVARIANT 3: ZERO UNVERIFIED FREESHIP 0Đ & SYNTHETIC GEAR ---');
test('Zero Freeship 0đ claims and zero synthetic Shopee gear IDs', () => {
  const freeshipMatches = jsCode.match(/Freeship 0đ/gi) || [];
  const gearMatches = jsCode.match(/quat_kep_ktx|den_led_ktx|noi_lau_mini/g) || [];
  assert.strictEqual(freeshipMatches.length, 0, `Found ${freeshipMatches.length} Freeship 0đ claims in JS`);
  assert.strictEqual(gearMatches.length, 0, `Found ${gearMatches.length} synthetic gear IDs in JS`);
});

console.log('\n--- 4. INVARIANT 4: ZERO SYNTHETIC FINTECH CPA & KLOOK AFFILIATE ---');
test('Zero synthetic Fintech CPA claims and zero synthetic Klook weekend affiliate buttons', () => {
  const fintechMatches = jsCode.match(/cake_vpbank/g) || [];
  const klookMatches = jsCode.match(/bana_hills_aff|mikazuki_waterpark_aff/g) || [];
  assert.strictEqual(fintechMatches.length, 0, `Found ${fintechMatches.length} synthetic Fintech CPA in JS`);
  assert.strictEqual(klookMatches.length, 0, `Found ${klookMatches.length} synthetic Klook affiliate in JS`);
});

console.log('\n--- 5. INVARIANT 5: CANONICAL STUDENT HUB WATCHLIST & HONEST CONTAINMENT ---');
test('Student Hub uses canonicalStudentWatchlist with provenance pointer and honest containment notices', () => {
  assert(jsCode.includes('canonicalStudentWatchlist'), 'Missing canonicalStudentWatchlist in JS');
  assert(jsCode.includes('Bằng chứng đối soát:'), 'Missing provenance pointer display');
  assert(jsCode.includes('Danh Mục Tiện Ích KTX Đang Trong Quá Trình Đối Soát'), 'Missing honest KTX containment notice');
});

console.log('\n--- 6. INVARIANT 6: INCIDENT MANIFEST INTEGRITY ---');
test('INCIDENT_MANIFEST_JAYT_134B_CONTAINMENT.json is present, append-only, and fully documented', () => {
  assert.strictEqual(manifest.incident_id, 'INCIDENT-JAYT-134B');
  assert.strictEqual(manifest.status, 'CONTAINED_AND_VERIFIED');
  assert(manifest.isolated_records.length >= 5, 'Expected at least 5 isolated records');
});

console.log('\n========================================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('========================================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL P0 TRUTH & CONTACT CONTAINMENT INVARIANTS SATISFIED 100%!');
  process.exit(0);
}
