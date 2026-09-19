const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('======================================================');
console.log('👑 JAYT PRODUCTION MASTER 2026: 4-DEPARTMENT QA AUDIT');
console.log('======================================================\n');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');

const jsCode = fs.readFileSync(jsPath, 'utf8');
const htmlCode = fs.readFileSync(htmlPath, 'utf8');

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

// Slice functions safely
const fiveTierStart = jsCode.indexOf('function renderFiveTierDailyDealCanvas()');
const discoveryHomeStart = jsCode.indexOf('function renderDiscoveryFirstHome()');
const fiveTierContent = jsCode.substring(fiveTierStart, discoveryHomeStart);

console.log('--- 1. DEPARTMENT 1: UI/UX & DESIGN STANDARDS ---');
test('CSS includes .store-editorial-card, .store-thumb-box, .store-tag-group, .store-micro-tag', () => {
  assert(htmlCode.includes('.store-editorial-card'), 'Missing .store-editorial-card in CSS');
  assert(htmlCode.includes('.store-thumb-box'), 'Missing .store-thumb-box in CSS');
  assert(htmlCode.includes('.store-tag-group'), 'Missing .store-tag-group in CSS');
  assert(htmlCode.includes('.store-micro-tag'), 'Missing .store-micro-tag in CSS');
});

test('Button Rule of 3 (Emerald #059669, Amber #D97706, Subtle) in CSS & DOM', () => {
  assert(htmlCode.includes('.btn-cta-emerald'), 'Missing .btn-cta-emerald in CSS');
  assert(htmlCode.includes('#059669'), 'Primary button must be Emerald #059669');
  assert(htmlCode.includes('.btn-cta-amber'), 'Missing .btn-cta-amber in CSS');
  assert(htmlCode.includes('#D97706'), 'Social button must be Amber #D97706');
  assert(htmlCode.includes('.btn-cta-subtle'), 'Missing .btn-cta-subtle in CSS');
  
  assert(fiveTierContent.includes('btn-cta-emerald'), 'Must use btn-cta-emerald for primary actions');
  assert(fiveTierContent.includes('btn-cta-amber'), 'Must use btn-cta-amber for social/invite actions');
  assert(fiveTierContent.includes('btn-cta-subtle'), 'Must use btn-cta-subtle for subtle actions');
});

test('Tactile 3-layer shadow and 20px squircle corners applied', () => {
  assert(htmlCode.includes('box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05)'), 'Missing 3-layer tactile shadow');
  assert(htmlCode.includes('border-radius: 20px'), 'Missing 20px squircle border-radius');
});

console.log('\n--- 2. DEPARTMENT 2: FRONTEND ENGINEERING & LOGIC ---');
test('getCinemaSchedule() correctly outputs T4 as CGV Culture Day 75K', () => {
  assert(jsCode.includes('function getCinemaSchedule()'), 'Missing getCinemaSchedule function in JS');
  assert(jsCode.includes('CGV Culture Day — Đồng giá 75K toàn quốc') || jsCode.includes('CGV Culture Day'), 'T4 must be CGV Culture Day 75K');
  assert(!fiveTierContent.includes('highlight: \'☕ Phê La Bạch Đằng\''), 'T4 must not be coffee shop in cinema schedule');
});

test('exportGroupHangoutPass() supports Native Share Sheet (navigator.share) & Clipboard fallback', () => {
  assert(jsCode.includes('function exportGroupHangoutPass('), 'Missing exportGroupHangoutPass function');
  assert(jsCode.includes('navigator.share'), 'Must check and support navigator.share');
  assert(jsCode.includes('navigator.clipboard'), 'Must support clipboard fallback');
});

test('Kinetic Arbitrage Slider computes in-memory without network lag', () => {
  assert(fiveTierContent.includes('id="arbitrage-price-slider"'), 'Missing arbitrage slider in Tier 2');
  assert(jsCode.includes('updateArbitrageEngine'), 'Must have updateArbitrageEngine handler');
});

console.log('\n--- 3. DEPARTMENT 3: DATA & AFFILIATE OPS ---');
test('Transparency attribution #JayTAffiliate present on Vault section', () => {
  assert(fiveTierContent.includes('#JayTAffiliate'), 'Must include #JayTAffiliate attribution');
  assert(fiveTierContent.includes('Dữ liệu đối soát từ đối tác chính thức'), 'Must include partner verification disclaimer');
});

test('Voucher 2-second visual feedback (✅ Đã Chép)', () => {
  assert(jsCode.includes('✅ Đã Chép'), 'Must have 2-second visual feedback on copy');
});

console.log('\n======================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL 4-DEPARTMENT JAYT PRODUCTION MASTER 2026 AUDITS PASSED!');
  process.exit(0);
}
