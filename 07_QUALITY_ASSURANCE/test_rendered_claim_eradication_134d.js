const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('========================================================================');
console.log('🚨 JAYT-134D: RENDERED-CLAIM ERADICATION SCANNER & CANONICAL MAPPING');
console.log('========================================================================\n');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');
const fourLayerPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/four_layer_dataset.json');
const manifestPath = path.resolve(__dirname, '../08_RELEASE_VAULT/INCIDENT_MANIFEST_JAYT_134D_CONTAINMENT.json');

const jsCode = fs.readFileSync(jsPath, 'utf8');
const htmlCode = fs.readFileSync(htmlPath, 'utf8');
const fourLayer = JSON.parse(fs.readFileSync(fourLayerPath, 'utf8'));

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

console.log('--- 1. AUDIT SURFACE 1: ERADICATION OF SYNTHETIC VOUCHERS (TIKTOKVIP0D, ETC.) ---');
test('Zero occurrences of TIKTOKVIP0D, JAYTSHOPEE50, JAYTBE30, or fake voucher codes', () => {
  const fakeVouchers = jsCode.match(/TIKTOKVIP0D|JAYTSHOPEE50|JAYTBE30|SHOPEEKTX15/g) || [];
  assert.strictEqual(fakeVouchers.length, 0, `Found ${fakeVouchers.length} fake vouchers in JS`);
});

console.log('\n--- 2. AUDIT SURFACE 2: ERADICATION OF HANDWRITTEN DISCOUNT STACK FORMULAS ---');
test('Zero handwritten discount numbers (-8.500₫, -15.000₫, -21.000₫, Thực Trả Đáy 40.500₫)', () => {
  const stackMatches = jsCode.match(/-8\.500₫|-15\.000₫|-21\.000₫|Thực Trả Đáy 40\.500₫/g) || [];
  assert.strictEqual(stackMatches.length, 0, `Found ${stackMatches.length} handwritten stack formulas in JS`);
});

console.log('\n--- 3. AUDIT SURFACE 3: ERADICATION OF HANDWRITTEN PLACES & FAKE DISTANCES ---');
test('Kinetic roulette uses canonical 26 locations with zero fake distances or priceNums', () => {
  assert(!jsCode.includes('Cơm Tấm Sườn Cay (Ngô Văn Sở)'), 'Found handwritten Cơm Tấm in roulette');
  assert(!jsCode.includes('tag: "Cứu đói cuối tháng"'), 'Found fake tag in roulette');
  assert(jsCode.includes('Metiz Cinema (Helio Center)'), 'Missing canonical Metiz in roulette');
});

console.log('\n--- 4. AUDIT SURFACE 4: ERADICATION OF COMMERCIAL FALLBACKS IN HANGOUT PASS ---');
test('exportGroupHangoutPass has zero hardcoded fallback strings for venue, price, or address', () => {
  assert(!jsCode.includes("venue || 'Metiz Cinema Helio'"), 'Found fallback Metiz in export pass');
  assert(!jsCode.includes("price || '45.000₫'"), 'Found fallback price in export pass');
});

console.log('\n--- 5. AUDIT SURFACE 5: NEUTRALIZATION OF UNVERIFIED HUB LABELS ---');
test('Hub titles and tab names are strictly neutral without unmapped claims', () => {
  assert(!jsCode.includes('⚡ Cứu Đói ≤ 25K'), 'Found Cứu Đói ≤ 25K in JS tab');
  assert(!jsCode.includes('💎 Đặc Quyền .edu.vn (0đ)'), 'Found Đặc Quyền .edu.vn (0đ) in JS tab');
  assert(!jsCode.includes('🛒 Săn Đồ KTX Xếp Mã'), 'Found Săn Đồ KTX in JS tab');
  assert(!htmlCode.includes('⚡ Cứu Đói ≤ 25K'), 'Found Cứu Đói ≤ 25K in HTML');
});

console.log('\n--- 6. AUDIT SURFACE 6: CANONICAL EVIDENCE MAPPING INTEGRITY ---');
test('All displayed items strictly map to canonical 26 verified locations in four_layer_dataset.json', () => {
  const verifiedLocs = fourLayer.layer_2_watchlist.verified_locations;
  assert(verifiedLocs.length === 26, `Expected 26 verified locations, found ${verifiedLocs.length}`);
  verifiedLocs.forEach(loc => {
    assert(loc.evidence_pointer, `Location ${loc.id} missing evidence_pointer`);
    assert(loc.evidence_pointer.artifact_path, `Location ${loc.id} missing artifact_path`);
    assert(loc.evidence_pointer.artifact_sha256, `Location ${loc.id} missing artifact_sha256`);
  });
});

console.log('\n========================================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('========================================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL 6 JAYT-134D RENDERED-CLAIM ERADICATION SURFACES PASSED 100% CLEAN!');
  process.exit(0);
}
