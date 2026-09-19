const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('======================================================');
console.log('✨ JAYT-135: MASTER DESIGN SYSTEM LEVEL MAX AUDIT');
console.log('======================================================');

let passedCount = 0;
let failedCount = 0;

function check(testName, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${testName}`);
    passedCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${testName} -> ${err.message}`);
    failedCount++;
  }
}

const htmlPath = path.resolve(__dirname, '..', '03_SOURCE_OF_TRUTH', 'index.html');
const jsPath = path.resolve(__dirname, '..', '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const contractPath = path.resolve(__dirname, '..', '03_SOURCE_OF_TRUTH', 'customer_journey_north_star.json');

const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const jsContent = fs.readFileSync(jsPath, 'utf8');
const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

// 1. Master CSS Verification
console.log('\n--- 1. MASTER DESIGN SYSTEM CSS CLASSES ---');
check('Contains .arbitrage-winner-card styling', () => {
  assert(htmlContent.includes('.arbitrage-winner-card'), 'Missing .arbitrage-winner-card class');
  assert(htmlContent.includes('#10B981'), 'Missing emerald glow');
});

check('Contains .voucher-ticket-neon cut-out styling', () => {
  assert(htmlContent.includes('.voucher-ticket-neon'), 'Missing .voucher-ticket-neon');
  assert(htmlContent.includes('.voucher-ticket-neon::before'), 'Missing punch holes left');
  assert(htmlContent.includes('.voucher-ticket-neon::after'), 'Missing punch holes right');
});

check('Contains .badge-freeship-xtra & .badge-day-90', () => {
  assert(htmlContent.includes('.badge-freeship-xtra'), 'Missing .badge-freeship-xtra');
  assert(htmlContent.includes('.badge-day-90'), 'Missing .badge-day-90');
});

check('Contains .apex-floating-thumb-dock for mobile', () => {
  assert(htmlContent.includes('.apex-floating-thumb-dock'), 'Missing .apex-floating-thumb-dock');
  assert(htmlContent.includes('.apex-thumb-btn'), 'Missing .apex-thumb-btn');
});

// 2. Trọng Tài Giỏ Hàng 2.0 (Real-Time Slider & Logic)
console.log('\n--- 2. TRỌNG TÀI GIỎ HÀNG 2.0 & ARBITRAGE ENGINE ---');
check('Contains interactive price slider in Tier 2', () => {
  assert(jsContent.includes('id="arbitrage-price-slider"'), 'Missing price slider');
  assert(jsContent.includes('updateArbitrageEngine'), 'Missing updateArbitrageEngine function');
});

check('Contains 3 app comparison columns (Shopee, Grab, Be)', () => {
  assert(jsContent.includes('id="card-shopeefood"'), 'Missing ShopeeFood card');
  assert(jsContent.includes('id="card-grabfood"'), 'Missing GrabFood card');
  assert(jsContent.includes('id="card-befood"'), 'Missing BeFood card');
});

check('Calculates arbitrage differences correctly in updateArbitrageEngine', () => {
  assert(jsContent.includes('shopeeTotal = price + shopeeShip - shopeeDiscount'), 'Missing Shopee calculation');
  assert(jsContent.includes('grabTotal = price + grabShip - grabDiscount'), 'Missing Grab calculation');
  assert(jsContent.includes('beTotal = price + beShip - beDiscount'), 'Missing Be calculation');
});

// 3. Kho Voucher Neon & Săn Đáy TMĐT <= 50K
console.log('\n--- 3. KHO VOUCHER NEON & SĂN ĐÁY TMĐT <= 50K ---');
check('Contains 3 neon cut-out voucher tickets', () => {
  assert(jsContent.includes('JAYTSHOPEE50'), 'Missing Shopee 50k voucher');
  assert(jsContent.includes('TIKTOKVIP0D'), 'Missing TikTok Shop freeship voucher');
  assert(jsContent.includes('KLOOKBANAHILLS'), 'Missing Klook voucher');
});

check('Contains 3 KTX utility products <= 50K with Freeship Xtra 0đ', () => {
  assert(jsContent.includes('Cáp Sạc Type-C Siêu Bền KTX'), 'Missing Type-C cable');
  assert(jsContent.includes('Quạt Mini USB Để Bàn Pin Trâu'), 'Missing mini fan');
  assert(jsContent.includes('Đèn Học Để Bàn Chống Cận LED'), 'Missing desk lamp');
  assert(jsContent.includes('29.000₫'), 'Missing 29k price point');
});

check('Contains #JayTAffiliate disclosure', () => {
  assert(jsContent.includes('#JayTAffiliate'), 'Missing #JayTAffiliate disclosure');
});

// 4. HTML5 Canvas Boarding Pass Generator
console.log('\n--- 4. CANVAS BOARDING PASS GENERATOR ---');
check('Contains generateBoardingPassTicketCanvas function', () => {
  assert(jsContent.includes('function generateBoardingPassTicketCanvas'), 'Missing canvas generator function');
  assert(jsContent.includes('canvas.toDataURL'), 'Missing canvas image export');
  assert(jsContent.includes('JayT_VeKeo_'), 'Missing PNG download filename pattern');
});

check('Features "Xuất Vé Kèo Đi Chung ↗" action buttons', () => {
  assert(jsContent.includes('data-action="generate-boarding-pass"'), 'Missing generate-boarding-pass CTA');
});

// 5. Mobile Floating Thumb-Bar
console.log('\n--- 5. MOBILE FLOATING THUMB-BAR ---');
check('Renders apex-floating-thumb-dock with 3 thumb buttons', () => {
  assert(jsContent.includes('class="apex-floating-thumb-dock"'), 'Missing floating dock HTML');
  assert(jsContent.includes('data-action="scroll-to-arbitrage"'), 'Missing scroll-to-arbitrage button');
  assert(jsContent.includes('data-action="scroll-to-cinema"'), 'Missing scroll-to-cinema button');
});

// 6. Contract Verification
console.log('\n--- 6. NORTH STAR CONTRACT UPGRADE ---');
check('Contract upgraded to JAYT_CUSTOMER_JOURNEY_NORTH_STAR_135 v3.6.0', () => {
  assert.strictEqual(contract.contract_id, 'JAYT_CUSTOMER_JOURNEY_NORTH_STAR_135');
  assert.strictEqual(contract.version, '3.6.0');
  assert.strictEqual(contract.directive, 'JAYT-135-MASTER-DESIGN-LEVEL-MAX');
});

console.log('======================================================');
console.log(`📊 SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log('======================================================');

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log('\n✨ ALL JAYT-135 MASTER DESIGN SYSTEM AUDITS PASSED!');
}
