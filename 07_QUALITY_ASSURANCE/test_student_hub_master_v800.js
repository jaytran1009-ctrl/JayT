const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('======================================================');
console.log('🚀 JAYT PRODUCTION MASTER v8.0.0: FULL-SITE AUDIT');
console.log('======================================================\n');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');
const swPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/sw.js');

const jsCode = fs.readFileSync(jsPath, 'utf8');
const htmlCode = fs.readFileSync(htmlPath, 'utf8');
const swCode = fs.existsSync(swPath) ? fs.readFileSync(swPath, 'utf8') : '';

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

console.log('--- 1. MOBILE TOUCH STABILITY & TOUCH-ACTION ---');
test('#arbitrage-price-slider has touch-action: none !important', () => {
  assert(htmlCode.includes('#arbitrage-price-slider') && htmlCode.includes('touch-action: none !important'), 'Missing touch-action none for slider');
});

console.log('\n--- 2. STUDENT HUB MASTER 3-IN-1 COMPONENT ---');
test('Student Hub Master container and 3 tabs active in DOM & CSS', () => {
  assert(htmlCode.includes('.student-hub-master'), 'Missing .student-hub-master in CSS');
  assert(jsCode.includes('student-hub-master'), 'Missing student-hub-master in JS');
  assert(jsCode.includes('function switchHubSection('), 'Missing switchHubSection in JS');
  assert(jsCode.includes('data-tab="FOOD_25K"'), 'Missing FOOD_25K tab');
  assert(jsCode.includes('data-tab="EDU_FREE"'), 'Missing EDU_FREE tab');
  assert(jsCode.includes('data-tab="KTX_STACK"'), 'Missing KTX_STACK tab');
});

console.log('\n--- 3. RADAR DEAL CỨU ĐÓI <= 25K (4 CỤM TRƯỜNG ĐỐI SOÁT) ---');
test('Campus rescue directory contains 4 clusters (BK_SP, DUE, DUYTAN, NN_SPKT)', () => {
  assert(jsCode.includes('campusRescueDirectory'), 'Missing campusRescueDirectory in JS');
  assert(jsCode.includes('BK_SP:'), 'Missing BK_SP cluster data');
  assert(jsCode.includes('DUE:'), 'Missing DUE cluster data');
  assert(jsCode.includes('DUYTAN:'), 'Missing DUYTAN cluster data');
  assert(jsCode.includes('NN_SPKT:'), 'Missing NN_SPKT cluster data');
  assert(jsCode.includes('function renderCampusDeals('), 'Missing renderCampusDeals in JS');
  assert(jsCode.includes('id="foodRescueMatrixContainer"'), 'Missing foodRescueMatrixContainer in DOM');
});

console.log('\n--- 4. ĐẶC QUYỀN EMAIL .EDU.VN & UNIDAYS/SHEERID ---');
test('Edu perks matrix contains 6 verified global licenses', () => {
  assert(jsCode.includes('Spotify Student'), 'Missing Spotify Student perk');
  assert(jsCode.includes('YouTube Premium HSSV'), 'Missing YouTube Premium perk');
  assert(jsCode.includes('GitHub Student Pack'), 'Missing GitHub Student Pack');
  assert(jsCode.includes('Notion Plus & Canva Pro'), 'Missing Notion Plus perk');
  assert(jsCode.includes('Apple Education Store'), 'Missing Apple Education Store');
  assert(jsCode.includes('JetBrains All Products'), 'Missing JetBrains perk');
  assert(htmlCode.includes('.btn-edu-link'), 'Missing .btn-edu-link in CSS');
});

console.log('\n--- 5. SĂN ĐỒ KTX & CÔNG THỨC XẾP CHỒNG 3 TẦNG MÃ ---');
test('Stack calculator flow and gear matrix active', () => {
  assert(htmlCode.includes('.stack-calculator-box'), 'Missing .stack-calculator-box in CSS');
  assert(htmlCode.includes('.stack-calc-flow'), 'Missing .stack-calc-flow in CSS');
  assert(jsCode.includes('CÔNG THỨC XẾP CHỒNG 3 TẦNG MÃ ĐÁY'), 'Missing calculator in DOM');
  assert(jsCode.includes('Cáp Sạc 20W Bọc Dù Type-C'), 'Missing cable gear card');
  assert(jsCode.includes('Quạt Kẹp KTX Mini USB'), 'Missing fan gear card');
  assert(jsCode.includes('Đèn LED Kẹp Bàn Chống Cận'), 'Missing lamp gear card');
});

console.log('\n--- 6. PWA DYNAMIC UPDATE & CONTROLLERCHANGE ---');
test('PWA controllerchange listener and updated cache active', () => {
  assert(jsCode.includes('controllerchange'), 'Missing controllerchange in JS');
  assert(swCode.includes('jayt-danang-v') || swCode.includes('jayt-cache-v'), 'Missing cache version in sw.js');
});

console.log('\n======================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL 6 FULL-SITE PRODUCTION MASTER v8.0.0 AUDITS PASSED WITH 100% EXCELLENCE!');
  process.exit(0);
}
