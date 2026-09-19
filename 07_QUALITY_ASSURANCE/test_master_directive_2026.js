const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('======================================================');
console.log('✨ JAYT MASTER DIRECTIVE 2026: COMPREHENSIVE QA AUDIT');
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

// 1. Semantic CSS Tokens & Dual-Theme
console.log('\n--- 1. SEMANTIC CSS TOKENS & DUAL-THEME ENGINE ---');
check('Contains semantic design tokens (:root)', () => {
  assert(htmlContent.includes('--bg-base: #F8FAFC;'), 'Missing --bg-base in light mode');
  assert(htmlContent.includes('--surface-card: #FFFFFF;'), 'Missing --surface-card in light mode');
  assert(htmlContent.includes('--emerald: #059669;'), 'Missing --emerald in light mode');
});

check('Contains Dark Obsidian Titanium semantic overrides', () => {
  assert(htmlContent.includes('--bg-base: #06090E;'), 'Missing --bg-base: #06090E in dark mode');
  assert(htmlContent.includes('--surface-card: #0D131F;'), 'Missing --surface-card: #0D131F in dark mode');
  assert(htmlContent.includes('--emerald: #10B981;'), 'Missing --emerald: #10B981 in dark mode');
});

check('Contains .arbitrage-winner-card with glowing emerald border', () => {
  assert(htmlContent.includes('.arbitrage-winner-card'), 'Missing .arbitrage-winner-card');
  assert(htmlContent.includes('border: 2px solid var(--emerald)'), 'Missing 2px solid var(--emerald)');
});

check('Contains .voucher-ticket-neon with cut-out punch holes', () => {
  assert(htmlContent.includes('.voucher-ticket-neon'), 'Missing .voucher-ticket-neon');
  assert(htmlContent.includes('.voucher-ticket-neon::before'), 'Missing punch hole left');
  assert(htmlContent.includes('.voucher-ticket-neon::after'), 'Missing punch hole right');
});

check('Contains .brand-monogram and brand squircle pastel classes', () => {
  assert(htmlContent.includes('.brand-monogram'), 'Missing .brand-monogram');
  assert(htmlContent.includes('.mono-phela'), 'Missing .mono-phela');
  assert(htmlContent.includes('.mono-ahai'), 'Missing .mono-ahai');
  assert(htmlContent.includes('.mono-cgv'), 'Missing .mono-cgv');
  assert(htmlContent.includes('.mono-metiz'), 'Missing .mono-metiz');
  assert(htmlContent.includes('.mono-starlight'), 'Missing .mono-starlight');
});

// 2. Zero Wireframe Clutter / Triệt Tiêu Rác Kỹ Thuật
console.log('\n--- 2. ZERO WIREFRAME CLUTTER / TRIỆT TIÊU RÁC KỸ THUẬT ---');
check('Zero occurrences of "TẦNG 1 · HERO BENTO HUB"', () => {
  assert(!jsContent.includes('TẦNG 1 · HERO BENTO HUB'), 'Contains wireframe text "TẦNG 1 · HERO BENTO HUB"');
});

check('Zero occurrences of "TẦNG 2 · TRỌNG TÀI GIỎ HÀNG 2.0"', () => {
  assert(!jsContent.includes('TẦNG 2 · TRỌNG TÀI GIỎ HÀNG 2.0'), 'Contains wireframe text "TẦNG 2 · TRỌNG TÀI GIỎ HÀNG 2.0"');
});

check('Zero occurrences of "TẦNG 3 · PLAN AHEAD & FINTECH SPLIT"', () => {
  assert(!jsContent.includes('TẦNG 3 · PLAN AHEAD & FINTECH SPLIT'), 'Contains wireframe text "TẦNG 3 · PLAN AHEAD & FINTECH SPLIT"');
});

check('Zero occurrences of "TẦNG 4 · SĂN ĐÁY TMĐT"', () => {
  assert(!jsContent.includes('TẦNG 4 · SĂN ĐÁY TMĐT'), 'Contains wireframe text "TẦNG 4 · SĂN ĐÁY TMĐT"');
});

check('Zero occurrences of "TẦNG 5 · KHO VOUCHER TOÀN SÀN"', () => {
  assert(!jsContent.includes('TẦNG 5 · KHO VOUCHER TOÀN SÀN'), 'Contains wireframe text "TẦNG 5 · KHO VOUCHER TOÀN SÀN"');
});

// 3. JavaScript Core Logic & DOM IDs
console.log('\n--- 3. JAVASCRIPT CORE LOGIC & DOM INTEGRATION ---');
check('Contains handleArbitrageSliderChange function', () => {
  assert(jsContent.includes('function handleArbitrageSliderChange'), 'Missing handleArbitrageSliderChange');
  assert(jsContent.includes('shopeeTotal = basePrice + shopeeShip - shopeeDiscount'), 'Missing shopee calculation');
});

check('Contains DOM IDs for Arbitrage Widget', () => {
  assert(jsContent.includes('id="arbitrageBasePriceLabel"'), 'Missing arbitrageBasePriceLabel ID');
  assert(jsContent.includes('id="shopeePriceDisplay"'), 'Missing shopeePriceDisplay ID');
  assert(jsContent.includes('id="grabPriceDisplay"'), 'Missing grabPriceDisplay ID');
  assert(jsContent.includes('id="bePriceDisplay"'), 'Missing bePriceDisplay ID');
  assert(jsContent.includes('id="arbitrageSavingsBadge"'), 'Missing arbitrageSavingsBadge ID');
});

check('Contains copyVoucherAndOpenApp function', () => {
  assert(jsContent.includes('function copyVoucherAndOpenApp'), 'Missing copyVoucherAndOpenApp');
});

check('Contains initBiologicalTheme function', () => {
  assert(jsContent.includes('function initBiologicalTheme'), 'Missing initBiologicalTheme');
});

check('Contains generateBoardingPassTicketCanvas function', () => {
  assert(jsContent.includes('function generateBoardingPassTicketCanvas'), 'Missing generateBoardingPassTicketCanvas');
});

// 4. Contract Verification
console.log('\n--- 4. NORTH STAR CONTRACT UPGRADE ---');
check('Contract upgraded to JAYT_CUSTOMER_JOURNEY_NORTH_STAR_2026 v4.0.0', () => {
  assert.strictEqual(contract.contract_id, 'JAYT_CUSTOMER_JOURNEY_NORTH_STAR_2026');
  assert.strictEqual(contract.version, '4.0.0');
  assert.strictEqual(contract.directive, 'JAYT-MASTER-DIRECTIVE-2026');
});

console.log('======================================================');
console.log(`📊 SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log('======================================================');

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log('\n✨ ALL JAYT MASTER DIRECTIVE 2026 AUDITS PASSED!');
}
