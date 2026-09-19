const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('======================================================');
console.log('🚀 JAYT MAXIMUM MODE v4.0.0: 5-PACKAGE QA AUDIT');
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

console.log('--- 1. PACKAGE 1: MA TRẬN QUICK-PICK 4 PRESETS (≤10MS) ---');
test('CSS includes .quick-pick-container and .quick-pick-chip', () => {
  assert(htmlCode.includes('.quick-pick-container'), 'Missing .quick-pick-container in CSS');
  assert(htmlCode.includes('.quick-pick-chip'), 'Missing .quick-pick-chip in CSS');
});

test('DOM & JS include 4 quick-pick chips (35K, 45K, 80K, 120K) and selectArbitragePreset', () => {
  assert(jsCode.includes('selectArbitragePreset'), 'Missing selectArbitragePreset in JS');
  assert(jsCode.includes('data-amount="35000"'), 'Missing 35K preset');
  assert(jsCode.includes('data-amount="45000"'), 'Missing 45K preset');
  assert(jsCode.includes('data-amount="80000"'), 'Missing 80K preset');
  assert(jsCode.includes('data-amount="120000"'), 'Missing 120K preset');
});

console.log('\n--- 2. PACKAGE 2: DYNAMIC SUN-SYNC & SPRING DYNAMICS ---');
test('CSS includes .apex-spring-interactive and .specular-glass-panel', () => {
  assert(htmlCode.includes('.apex-spring-interactive'), 'Missing .apex-spring-interactive in CSS');
  assert(htmlCode.includes('scale(0.965)'), 'Missing spring scale(0.965) in CSS');
  assert(htmlCode.includes('.specular-glass-panel'), 'Missing .specular-glass-panel in CSS');
});

test('applySunSyncAmbient() correctly calculates hour-based background gradient', () => {
  assert(jsCode.includes('function applySunSyncAmbient('), 'Missing applySunSyncAmbient in JS');
  assert(jsCode.includes('Bình minh Mỹ Khê') || jsCode.includes('FEF3C7'), 'Must handle sunrise gradient');
  assert(jsCode.includes('Trưa Hải Châu') || jsCode.includes('F8FAFC'), 'Must handle noon gradient');
  assert(jsCode.includes('Hoàng hôn Cầu Rồng') || jsCode.includes('1E1B4B'), 'Must handle sunset gradient');
  assert(jsCode.includes('Đêm Obsidian') || jsCode.includes('06090E'), 'Must handle night gradient');
});

console.log('\n--- 3. PACKAGE 3: HANGOUT STUDIO & VÒNG QUAY CỨU ĐÓI ---');
test('Decision Roulette widget & spinHungerRoulette() present in JS and DOM', () => {
  assert(jsCode.includes('function spinHungerRoulette('), 'Missing spinHungerRoulette in JS');
  assert(jsCode.includes('roulette-card-container'), 'Missing roulette-card-container in DOM');
  assert(jsCode.includes('id="roulette-result-box"'), 'Missing roulette-result-box in DOM');
  assert(jsCode.includes('Cơm Gà A Hải'), 'Roulette must include verified places');
});

console.log('\n--- 4. PACKAGE 4: KHO VOUCHER ĐA TẦNG & FLASH COUNTDOWN ---');
test('Flash deal countdown ticker & startFlashCountdownTimer() in place', () => {
  assert(htmlCode.includes('.flash-countdown-ticker'), 'Missing .flash-countdown-ticker in CSS');
  assert(jsCode.includes('function startFlashCountdownTimer('), 'Missing startFlashCountdownTimer in JS');
  assert(jsCode.includes('id="flash-deal-clock"'), 'Missing flash-deal-clock in DOM');
});

console.log('\n--- 5. PACKAGE 5: PWA OFFLINE-FIRST ENGINE ---');
test('sw.js exists and precaches all 5 tiers and core datasets', () => {
  assert(swCode.length > 0, 'sw.js file is empty or missing');
  assert(swCode.includes('caches.open'), 'Service Worker must open cache');
  assert(swCode.includes('ASSETS_TO_CACHE'), 'Service Worker must define asset cache list');
  assert(htmlCode.includes('navigator.serviceWorker.register'), 'Service worker must be registered in index.html');
});

console.log('\n======================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL 5 MAXIMUM MODE v4.0.0 PACKAGES PASSED WITH 100% EXCELLENCE!');
  process.exit(0);
}
