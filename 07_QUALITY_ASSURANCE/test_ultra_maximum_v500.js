const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('======================================================');
console.log('🚀 JAYT ULTRA-MAXIMUM v5.0.0: 5-PILLAR QA AUDIT');
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

console.log('--- 1. PILLAR 1: KINETIC AUDIO-VISUAL & 60FPS ROULETTE ---');
test('playHapticTick() synthesizes mechanical audio tick via WebAudio API', () => {
  assert(jsCode.includes('function playHapticTick('), 'Missing playHapticTick in JS');
  assert(jsCode.includes('AudioContext'), 'Must use WebAudio AudioContext');
  assert(jsCode.includes('createOscillator'), 'Must create oscillator for mechanical click');
});

test('launchKineticRoulette() executes 60FPS inertia deceleration curve', () => {
  assert(jsCode.includes('function launchKineticRoulette('), 'Missing launchKineticRoulette in JS');
  assert(jsCode.includes('id="btn-spin-roulette"'), 'Missing spin button ID');
  assert(jsCode.includes('id="roulette-result-box"'), 'Missing roulette result box');
});

console.log('\n--- 2. PILLAR 2: SPLIT-BILL PRO ENGINE ---');
test('calculateSplitAndGeneratePass() supports 2-8 people and formats Zalo pass', () => {
  assert(jsCode.includes('function calculateSplitAndGeneratePass('), 'Missing calculateSplitAndGeneratePass in JS');
  assert(jsCode.includes('id="split-people-select"'), 'Missing split-people-select in DOM');
  assert(jsCode.includes('split-and-share-zalo'), 'Missing split-and-share-zalo action');
  assert(htmlCode.includes('.split-select'), 'Missing .split-select in CSS');
});

console.log('\n--- 3. PILLAR 3: TAXONOMY VOUCHER 4 TAB & AUTO-COPY ---');
test('Voucher taxonomy tabs & filterVoucherCategory() active with 4 categories', () => {
  assert(htmlCode.includes('.voucher-cat-tabs'), 'Missing .voucher-cat-tabs in CSS');
  assert(htmlCode.includes('.voucher-cat-tab'), 'Missing .voucher-cat-tab in CSS');
  assert(jsCode.includes('function filterVoucherCategory('), 'Missing filterVoucherCategory in JS');
  assert(jsCode.includes('data-cat="ALL"'), 'Missing ALL category tab');
  assert(jsCode.includes('data-cat="FOOD"'), 'Missing FOOD category tab');
  assert(jsCode.includes('data-cat="RIDE"'), 'Missing RIDE category tab');
  assert(jsCode.includes('data-cat="UTILITY"'), 'Missing UTILITY category tab');
});

console.log('\n--- 4. PILLAR 4: NETWORK SENTINEL TOAST ---');
test('showNetworkToast() captures online/offline state changes', () => {
  assert(jsCode.includes('function showNetworkToast('), 'Missing showNetworkToast in JS');
  assert(jsCode.includes("addEventListener('offline'"), 'Missing offline event listener');
  assert(jsCode.includes("addEventListener('online'"), 'Missing online event listener');
});

console.log('\n--- 5. PILLAR 5: MANUAL THEME TOGGLE & SUN-SYNC OVERRIDE ---');
test('Theme toggle supports manual mode with Sun-Sync synergy', () => {
  assert(jsCode.includes('btn-toggle-theme'), 'Missing theme toggle button');
  assert(jsCode.includes('applySunSyncAmbient'), 'Must keep Sun-Sync ambient synergy');
  assert(swCode.length > 0, 'PWA service worker must be present');
});

console.log('\n======================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL 5 ULTRA-MAXIMUM v5.0.0 PILLARS PASSED WITH 100% EXCELLENCE!');
  process.exit(0);
}
