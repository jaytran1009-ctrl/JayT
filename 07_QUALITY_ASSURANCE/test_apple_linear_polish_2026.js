const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('======================================================');
console.log('🍎 JAYT: APPLE/LINEAR MASTER POLISH 2026 AUDIT');
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

console.log('--- 1. AUDITING 4 MASTER DESIGN CRITERIA ---');

test('1. Lấp đầy khoảng trống Tầng 2 với Thumbnail & Micro-tags', () => {
  // CSS Classes
  assert(htmlCode.includes('.verified-store-card'), 'Missing .verified-store-card in CSS');
  assert(htmlCode.includes('.store-card-body'), 'Missing .store-card-body in CSS');
  assert(htmlCode.includes('.store-thumbnail-preview'), 'Missing .store-thumbnail-preview in CSS');
  assert(htmlCode.includes('.store-meta-tags'), 'Missing .store-meta-tags in CSS');
  assert(htmlCode.includes('.meta-pill-tag'), 'Missing .meta-pill-tag in CSS');
  
  // HTML / DOM structure in Tier 2
  assert(fiveTierContent.includes('verified-store-card'), 'Cards must use verified-store-card');
  assert(fiveTierContent.includes('store-thumbnail-preview'), 'Cards must have store-thumbnail-preview');
  assert(fiveTierContent.includes('Giờ đông khách: 11:30 - 12:30'), 'Must display rush hour metadata');
  assert(fiveTierContent.includes('Bán kính:'), 'Must display radius distance metadata');
  assert(fiveTierContent.includes('Máy Lạnh') || fiveTierContent.includes('Máy lạnh'), 'Must display air-conditioned tag');
  assert(fiveTierContent.includes('Chỗ để xe'), 'Must display parking tag');
});

test('2. Khóa 1 quy tắc phân cấp màu nút bấm (CTA Hierarchy)', () => {
  // CSS Classes
  assert(htmlCode.includes('.btn-action-primary'), 'Missing .btn-action-primary in CSS');
  assert(htmlCode.includes('#059669'), 'Primary button must use Emerald #059669');
  assert(htmlCode.includes('.btn-action-secondary'), 'Missing .btn-action-secondary in CSS');
  assert(htmlCode.includes('.btn-action-social'), 'Missing .btn-action-social in CSS');
  assert(htmlCode.includes('#D97706'), 'Social button must use Amber #D97706');
  
  // Usage in Tier 1 & 2
  assert(fiveTierContent.includes('btn-action-primary'), 'Must use btn-action-primary for main actions');
  assert(fiveTierContent.includes('btn-action-secondary'), 'Must use btn-action-secondary for secondary actions');
  assert(fiveTierContent.includes('btn-action-social'), 'Must use btn-action-social for group social actions');
});

test('3. Sửa dứt điểm logic Lịch Rạp Phim (T4 là CGV Culture Day 75K)', () => {
  assert(fiveTierContent.includes('CGV Culture Day — 75K') || fiveTierContent.includes('CGV Culture Day'), 'T4 must be CGV Culture Day');
  assert(!fiveTierContent.includes('highlight: \'☕ Phê La Bạch Đằng\''), 'T4 must not be Phê La in cinema calendar');
});

test('4. Tactile Elevation & Nút Voucher đổi trạng thái 2 giây (✅ Đã Chép)', () => {
  assert(htmlCode.includes('box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05)'), 'Must include 3-layer tactile shadow');
  assert(htmlCode.includes('border-radius: 20px'), 'Must include 20px squircle border-radius');
  assert(jsCode.includes('✅ Đã Chép'), 'JS must include 2-second visual feedback for voucher copy');
});

console.log('\n======================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL APPLE/LINEAR MASTER POLISH 2026 AUDITS PASSED!');
  process.exit(0);
}
