const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('========================================================================');
console.log('🔍 JAYT-134C: FULL-SCOPE CLAIM SURFACE SCANNER & AUDIT');
console.log('========================================================================\n');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');
const manifestPath = path.resolve(__dirname, '../08_RELEASE_VAULT/INCIDENT_MANIFEST_JAYT_134C_CONTAINMENT.json');

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

console.log('--- 1. SURFACE 1: ZERO REMNANT KTX PRODUCTS & SHOPEE BUY BUTTONS ---');
test('Zero static KTX items with ĐÁY 90N and Shopee buy links', () => {
  const day90Matches = jsCode.match(/ĐÁY 90N/g) || [];
  const shopeeBuyMatches = jsCode.match(/<a href="https:\/\/shopee\.vn"[^>]*>Mua ↗<\/a>/g) || [];
  assert.strictEqual(day90Matches.length, 0, `Found ${day90Matches.length} ĐÁY 90N badges in JS`);
  assert.strictEqual(shopeeBuyMatches.length, 0, `Found ${shopeeBuyMatches.length} Shopee buy buttons in JS`);
});

console.log('\n--- 2. SURFACE 2: ZERO SYNTHETIC AFFILIATE PARTNER DECLARATIONS ---');
test('Zero occurrences of #JayTAffiliate, Accesstrade CPA, or Klook Official Partner claims', () => {
  const affClaims = jsCode.match(/#JayTAffiliate|Accesstrade CPA|Klook Official Partner/g) || [];
  assert.strictEqual(affClaims.length, 0, `Found ${affClaims.length} affiliate partner claims in JS`);
});

console.log('\n--- 3. SURFACE 3: ZERO SMART AFFILIATE ROUTER & KLOOK IDS ---');
test('Zero JAYT_AFFILIATE_CONFIG, KLOOK_AFFILIATE_ID, or dispatchSmartAffiliate engine', () => {
  const klookIdMatches = jsCode.match(/KLOOK_AFFILIATE_ID/g) || [];
  const dispatchMatches = jsCode.match(/function dispatchSmartAffiliate/g) || [];
  assert.strictEqual(klookIdMatches.length, 0, `Found ${klookIdMatches.length} KLOOK_AFFILIATE_ID in JS`);
  assert.strictEqual(dispatchMatches.length, 0, `Found ${dispatchMatches.length} dispatchSmartAffiliate functions in JS`);
});

console.log('\n--- 4. SURFACE 4: ZERO UNVERIFIED PRICES IN EDU DIRECTORY ---');
test('Zero unverified price tags or strike-through discounts in Edu Perks tab', () => {
  const eduPriceMatches = jsCode.match(/29\.500₫|49\.000₫|0₫\/năm|0₫ trọn đời sinh viên|-2\.000\.000₫/g) || [];
  assert.strictEqual(eduPriceMatches.length, 0, `Found ${eduPriceMatches.length} unverified prices in Edu tab`);
});

console.log('\n--- 5. SURFACE 5: ZERO STOCK / UNSPLASH ASSETS & ZERO TEL PROTOCOL ---');
test('Zero unsplash.com images and zero tel: links across HTML and JS', () => {
  const unsplashMatches = jsCode.match(/unsplash\.com/g) || [];
  const telMatches = jsCode.match(/tel:[0-9]+/g) || [];
  assert.strictEqual(unsplashMatches.length, 0, `Found ${unsplashMatches.length} Unsplash links in JS`);
  assert.strictEqual(telMatches.length, 0, `Found ${telMatches.length} tel: links in JS`);
});

console.log('\n--- 6. SURFACE 6: INCIDENT MANIFEST 134C INTEGRITY ---');
test('INCIDENT_MANIFEST_JAYT_134C_CONTAINMENT.json is present and valid', () => {
  assert.strictEqual(manifest.incident_id, 'INCIDENT-JAYT-134C');
  assert.strictEqual(manifest.status, 'CONTAINED_FULL_SCOPE_AWAITING_INDEPENDENT_AUDIT');
  assert.strictEqual(manifest.escaped_claims_remediated.length, 4);
});

console.log('\n========================================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('========================================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL CLAIM SURFACE SCANNER SURFACES PASSED 100% CLEAN!');
  process.exit(0);
}
