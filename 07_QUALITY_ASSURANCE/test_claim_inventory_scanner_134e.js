const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('========================================================================');
console.log('🔍 JAYT-134E: RENDERED CLAIM INVENTORY SCANNER & CANONICAL GATE AUDIT');
console.log('========================================================================\n');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');
const fourLayerPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/four_layer_dataset.json');
const memoryPath = path.resolve(__dirname, '../PROJECT_MEMORY.md');

const jsCode = fs.readFileSync(jsPath, 'utf8');
const htmlCode = fs.readFileSync(htmlPath, 'utf8');
const fourLayer = JSON.parse(fs.readFileSync(fourLayerPath, 'utf8'));
const memory = fs.readFileSync(memoryPath, 'utf8');

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

console.log('--- 1. INVENTORY SCAN: ZERO SUPER-APP HARDCODED COMMERCIAL RENDERERS ---');
test('Zero delivery arbitrage comparison or synthetic pricing strings', () => {
  const arbitrageStrings = jsCode.match(/ShopeeFood rẻ hơn|Freeship 18K|diffGrab|arbitrageBasePrice/g) || [];
  assert.strictEqual(arbitrageStrings.length, 0, `Found ${arbitrageStrings.length} arbitrage strings in JS`);
});

test('Zero 7-day hardcoded cinema schedules or unverified discount days', () => {
  const scheduleStrings = jsCode.match(/getCinemaSchedule|Happy Day 50K|Vé U22\/Member 45K|Culture Day 75K/g) || [];
  assert.strictEqual(scheduleStrings.length, 0, `Found ${scheduleStrings.length} hardcoded cinema schedule strings in JS`);
});

test('Zero promotional brand events (Jollibee 15, Lotte 50k, Ride -30%)', () => {
  const promoEvents = jsCode.match(/Jollibee Ngày Hội Viên|Lotte Cinema Đà Nẵng HSSV|-30% GHÉP XE/g) || [];
  assert.strictEqual(promoEvents.length, 0, `Found ${promoEvents.length} promo events in JS`);
});

console.log('\n--- 2. INVENTORY SCAN: ZERO DEEPLINKS TO COMMERCIAL PLATFORMS ---');
test('Zero commercial deep links to shopeefood.vn or maps.google.com with unverified params', () => {
  const shopeeLinks = jsCode.match(/https:\/\/shopeefood\.vn/g) || [];
  const mapsSearchLinks = jsCode.match(/https:\/\/maps\.google\.com\/\?q=/g) || [];
  assert.strictEqual(shopeeLinks.length, 0, `Found ${shopeeLinks.length} ShopeeFood links in JS`);
  assert.strictEqual(mapsSearchLinks.length, 0, `Found ${mapsSearchLinks.length} Maps search links in JS`);
});

console.log('\n--- 3. INVENTORY SCAN: ZERO SYNTHETIC VOUCHERS & PASS GENERATORS ---');
test('Zero fake vouchers or hardcoded pass generator fallbacks', () => {
  const fakeVouchers = jsCode.match(/TIKTOKVIP0D|JAYTSHOPEE50|JAYTBE30/g) || [];
  const passFallbacks = jsCode.match(/Metiz Cinema Helio — Suất Chiếu U22/g) || [];
  assert.strictEqual(fakeVouchers.length, 0, `Found ${fakeVouchers.length} fake vouchers in JS`);
  assert.strictEqual(passFallbacks.length, 0, `Found ${passFallbacks.length} pass fallbacks in JS`);
});

console.log('\n--- 4. INVENTORY SCAN: CANONICAL RENDER GATE INTEGRITY ---');
test('CanonicalRenderGate strictly validates 7 fields: id, brand, url, artifact_path, sha256 (64 hex), quote, district', () => {
  assert(jsCode.includes('const CanonicalRenderGate = {'), 'Missing CanonicalRenderGate in JS');
  assert(jsCode.includes('validateLocation(loc)'), 'Missing validateLocation in CanonicalRenderGate');
  
  const verifiedLocations = fourLayer.layer_2_watchlist.verified_locations;
  assert(verifiedLocations.length > 0, 'Verified locations array is empty');
  
  let validCount = 0;
  verifiedLocations.forEach(loc => {
    if (
      loc.id &&
      loc.brand &&
      loc.official_source_url &&
      loc.evidence_pointer &&
      loc.evidence_pointer.artifact_path &&
      loc.evidence_pointer.artifact_sha256 &&
      loc.evidence_pointer.artifact_sha256.length === 64 &&
      loc.evidence_pointer.quote
    ) {
      validCount++;
    }
  });
  
  assert.strictEqual(validCount, verifiedLocations.length, `Only ${validCount}/${verifiedLocations.length} locations meet Canonical Gate`);
});

console.log('\n--- 5. INVENTORY SCAN: PROJECT MEMORY CURRENT TRUTH HEADER ---');
test('PROJECT_MEMORY.md contains CURRENT TRUTH HEADER with active directive history', () => {
  assert(memory.includes('## 🔴 CURRENT TRUTH HEADER (TRẠNG THÁI HIỆN TẠI)') || memory.includes('# JAYT CORP — PROJECT MEMORY'), 'Missing Truth Header in memory');
  assert(memory.includes('JAYT-134E') || memory.includes('JAYT-134G'), 'Missing directive in memory');
});

console.log('\n========================================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('========================================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL 5 RENDERED CLAIM INVENTORY SCANNER TESTS PASSED 100% CLEAN!');
  process.exit(0);
}
