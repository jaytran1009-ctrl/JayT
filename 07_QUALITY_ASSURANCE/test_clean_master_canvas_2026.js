const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('======================================================');
console.log('🧪 JAYT: CLEAN MASTER CANVAS 2026 COMPLIANCE AUDIT');
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
const myVouchersStart = jsCode.indexOf('function renderMyVouchersModule()');
const topBarStart = jsCode.indexOf('function renderTopBar()');
const footerStart = jsCode.indexOf('function renderFooter()');

const fiveTierContent = jsCode.substring(fiveTierStart, discoveryHomeStart);
const discoveryHomeContent = jsCode.substring(discoveryHomeStart, myVouchersStart);
const topBarContent = jsCode.substring(topBarStart, footerStart);

console.log('--- 1. AUDITING 5 UX FRICTION RESOLUTIONS ---');

test('1. Gỡ bỏ 100% Dashboard KPI nội bộ khỏi view chính', () => {
  assert(!discoveryHomeContent.includes('renderCoverageToRetentionDashboard()'), 'Must not call renderCoverageToRetentionDashboard in main home view');
});

test('2. Loại bỏ khối 5 chuyên mục trùng lặp ở chân trang', () => {
  assert(!discoveryHomeContent.includes('renderDeepDiscoveryPortal()'), 'Must not render redundant renderDeepDiscoveryPortal in home view');
});

test('3. Hợp nhất thành đúng 1 thanh Glass Navbar duy nhất trên cùng', () => {
  assert(topBarContent.includes('jayt-top-utility-bar'), 'Top bar must render unified jayt-top-utility-bar');
  assert(topBarContent.includes('btn-toggle-theme'), 'Top bar must include theme toggle');
  assert(topBarContent.includes('btn-toggle-persona'), 'Top bar must include persona toggle');
  assert(topBarContent.includes('btn-toggle-district'), 'Top bar must include district selector');
  
  // renderFiveTierDailyDealCanvas should NOT render another top-utility-bar
  assert(!fiveTierContent.includes('<!-- TOP UTILITY HEADER BAR -->'), 'Must not have duplicate utility header bar inside five tier canvas');
});

test('4. Xóa sạch chữ "TẦNG X" và cụm tiếng Anh trong ngoặc khỏi tiêu đề', () => {
  assert(!fiveTierContent.includes('TẦNG 1:'), 'Must not contain TẦNG 1:');
  assert(!fiveTierContent.includes('TẦNG 2:'), 'Must not contain TẦNG 2:');
  assert(!fiveTierContent.includes('TẦNG 3:'), 'Must not contain TẦNG 3:');
  assert(!fiveTierContent.includes('TẦNG 4 & 5:'), 'Must not contain TẦNG 4 & 5:');
  assert(!fiveTierContent.includes('(TODAY DECISION HUB)'), 'Must not contain (TODAY DECISION HUB)');
  assert(!fiveTierContent.includes('(CROSS-APP ARBITRAGE)'), 'Must not contain (CROSS-APP ARBITRAGE)');
  assert(!fiveTierContent.includes('(COUNTDOWN & MOBILITY)'), 'Must not contain (COUNTDOWN & MOBILITY)');
  assert(!fiveTierContent.includes('(LUXURY VOUCHER VAULT)'), 'Must not contain (LUXURY VOUCHER VAULT)');
  
  // Natural titles present
  assert(fiveTierContent.includes('Hôm Nay Đi Đâu, Ăn Gì Đáng Tiền Nhất?'), 'Must have Section 1 natural title');
  assert(fiveTierContent.includes('Địa Điểm Xác Thực & Trọng Tài Giỏ Hàng 3 App (Ăn Trưa 11:30)'), 'Must have Section 2 natural title');
  assert(fiveTierContent.includes('Lên Kế Hoạch Tuần Này & Radar Di Chuyển Cao Điểm'), 'Must have Section 3 natural title');
  assert(fiveTierContent.includes('Săn Đáy Đồ Tiện Ích KTX ≤ 50K & Kho Voucher Toàn Sàn'), 'Must have Section 4 natural title');
});

test('5. Khóa đồng nhất chiều cao lưới (CSS Grid Equal Height) cho 3 thẻ đồ ăn', () => {
  assert(fiveTierContent.includes('align-items:stretch'), 'Grid container must have align-items:stretch');
  assert(fiveTierContent.includes('height:100%'), 'Cards must specify height:100%');
  assert(fiveTierContent.includes('margin-top:auto'), 'Bottom action buttons must have margin-top:auto for perfect bottom alignment');
});

console.log('\n======================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL CLEAN MASTER CANVAS 2026 AUDITS PASSED!');
  process.exit(0);
}
