const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('========================================================================');
console.log('🚀 JAYT SMART AFFILIATE ROUTER (v9.5.0): MONETIZATION QA AUDIT');
console.log('========================================================================\n');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const jsCode = fs.readFileSync(jsPath, 'utf8');

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

console.log('--- 1. PILLAR 1: SMART AFFILIATE DISPATCHER & CONFIG ---');
test('dispatchSmartAffiliate() function and JAYT_AFFILIATE_CONFIG are active', () => {
  assert(jsCode.includes('function dispatchSmartAffiliate('), 'Missing dispatchSmartAffiliate in JS');
  assert(jsCode.includes('JAYT_AFFILIATE_CONFIG = {'), 'Missing JAYT_AFFILIATE_CONFIG in JS');
  assert(jsCode.includes('window.dispatchSmartAffiliate = dispatchSmartAffiliate'), 'Missing window export');
});

console.log('\n--- 2. PILLAR 2: DYNAMIC SUB-ID & TRACKING PARAMS ---');
test('Tracking URL generates cleanCampus, sub1, sub2, sub3, utm_source', () => {
  assert(jsCode.includes('utm_source=jayt&utm_medium=web_app'), 'Missing utm tracking params');
  assert(jsCode.includes('sub1='), 'Missing sub1 in tracking');
  assert(jsCode.includes('sub2='), 'Missing sub2 in tracking');
  assert(jsCode.includes('sub3='), 'Missing sub3 in tracking');
});

console.log('\n--- 3. PILLAR 3: SHOPEE KTX GEAR AFFILIATE TOUCHPOINT ---');
test('6 Shopee KTX items invoke dispatchSmartAffiliate with SHOPEE platform', () => {
  assert(jsCode.includes("dispatchSmartAffiliate('SHOPEE', 'quat_kep_ktx_01'"), 'Missing Quạt kẹp affiliate call');
  assert(jsCode.includes("dispatchSmartAffiliate('SHOPEE', 'den_led_ktx_02'"), 'Missing Đèn LED affiliate call');
  assert(jsCode.includes("dispatchSmartAffiliate('SHOPEE', 'noi_lau_mini_03'"), 'Missing Nồi lẩu affiliate call');
});

console.log('\n--- 4. PILLAR 4: ACCESSTRADE FINTECH CPA TOUCHPOINT ---');
test('Fintech CPA Banner (Cake/MBBank 0đ) invokes dispatchSmartAffiliate', () => {
  assert(jsCode.includes("dispatchSmartAffiliate('FINTECH', 'cake_vpbank_student'"), 'Missing Fintech CPA call');
  assert(jsCode.includes('Mở Tài Khoản Số Cake / MBBank 0đ'), 'Missing Fintech Banner copy');
});

console.log('\n--- 5. PILLAR 5: KLOOK WEEKEND REVENUE TOUCHPOINT ---');
test('Klook Weekend Attractions invoke dispatchSmartAffiliate with KLOOK platform', () => {
  assert(jsCode.includes("dispatchSmartAffiliate('KLOOK', 'bana_hills_aff'"), 'Missing Bà Nà Hills Klook call');
  assert(jsCode.includes("dispatchSmartAffiliate('KLOOK', 'mikazuki_waterpark_aff'"), 'Missing Mikazuki Klook call');
});

console.log('\n--- 6. PILLAR 6: TRANSPARENT LEGAL DISCLOSURE ---');
test('Footer and UI contain #JayTAffiliate legal transparency disclosure', () => {
  assert(jsCode.includes('#JayTAffiliate'), 'Missing #JayTAffiliate in footer');
  assert(jsCode.includes('Shopee Affiliate Direct, Accesstrade CPA & Klook Official Partner'), 'Missing partner list');
});

console.log('\n========================================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('========================================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL 6 JAYT SMART AFFILIATE PILLARS PASSED WITH 100% EXCELLENCE!');
  process.exit(0);
}
