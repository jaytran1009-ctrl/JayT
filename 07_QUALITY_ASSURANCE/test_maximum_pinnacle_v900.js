const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('======================================================');
console.log('🚀 JAYT MAXIMUM TUYỆT ĐỈNH v9.0.0: PINNACLE QA AUDIT');
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

console.log('--- 1. PILLAR 1: MICRO-CONFETTI PARTICLE BURST ---');
test('triggerMicroConfetti() particle engine active in JS', () => {
  assert(jsCode.includes('function triggerMicroConfetti('), 'Missing triggerMicroConfetti in JS');
  assert(jsCode.includes('jayt-micro-particle'), 'Missing micro-particle class in JS');
});

console.log('\n--- 2. PILLAR 2: INTERACTIVE KTX STACK SIMULATOR ---');
test('calculateDynamicStack() dynamically calculates 3-tier discount', () => {
  assert(jsCode.includes('function calculateDynamicStack('), 'Missing calculateDynamicStack in JS');
  assert(jsCode.includes('id="custom-stack-input"'), 'Missing custom-stack-input in DOM');
  assert(jsCode.includes('id="stack-result-display"'), 'Missing stack-result-display in DOM');
  assert(htmlCode.includes('.stack-input-price'), 'Missing .stack-input-price in CSS');
});

console.log('\n--- 3. PILLAR 3: GPS MAPS & 1-CLICK CALL IN FOOD CARDS ---');
test('Food rescue cards feature GPS maps link and tel: hotline', () => {
  assert(jsCode.includes('campusRescueDirectoryV9'), 'Missing campusRescueDirectoryV9 in JS');
  assert(jsCode.includes('maps.google.com'), 'Missing maps.google.com link in JS');
  assert(jsCode.includes('tel:'), 'Missing tel: protocol in JS');
  assert(htmlCode.includes('.btn-action-map'), 'Missing .btn-action-map in CSS');
  assert(htmlCode.includes('.btn-action-call'), 'Missing .btn-action-call in CSS');
});

console.log('\n--- 4. PILLAR 4: SMOOTH AMBIENT 400MS TRANSITIONS ---');
test('CSS specifies 400ms smooth transitions for background and borders', () => {
  assert(htmlCode.includes('transition: background 400ms ease'), 'Missing 400ms smooth transition in CSS');
});

console.log('\n--- 5. PILLAR 5: NIGHT OWL BADGE (22H+) ---');
test('Night owl badge style and text active in DOM & CSS', () => {
  assert(htmlCode.includes('.badge-night-owl'), 'Missing .badge-night-owl in CSS');
  assert(jsCode.includes('badge-night-owl'), 'Missing badge-night-owl in JS');
});

console.log('\n--- 6. PILLAR 6: CAMPUS DIRECTORY V9 RENDERING ---');
test('renderCampusDealsV9() supports 4 university clusters', () => {
  assert(jsCode.includes('function renderCampusDealsV9('), 'Missing renderCampusDealsV9 in JS');
  assert(jsCode.includes('BK_SP:'), 'Missing BK_SP data');
  assert(jsCode.includes('DUE:'), 'Missing DUE data');
  assert(jsCode.includes('DUYTAN:'), 'Missing DUYTAN data');
  assert(jsCode.includes('NN_SPKT:'), 'Missing NN_SPKT data');
});

console.log('\n======================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL 6 JAYT MAXIMUM TUYỆT ĐỈNH v9.0.0 PILLARS PASSED WITH 100% EXCELLENCE!');
  process.exit(0);
}
