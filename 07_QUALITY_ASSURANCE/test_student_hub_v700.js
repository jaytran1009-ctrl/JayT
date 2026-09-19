const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('======================================================');
console.log('🚀 JAYT STUDENT HUB v7.0.0: 3-IN-1 MODULE QA AUDIT');
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

console.log('--- 1. COMPONENT STRUCTURE & 3-IN-1 TABS ---');
test('Student Hub container and 3 main tabs active in DOM & CSS', () => {
  assert(htmlCode.includes('.student-hub-container'), 'Missing .student-hub-container in CSS');
  assert(htmlCode.includes('.hub-nav-tabs'), 'Missing .hub-nav-tabs in CSS');
  assert(jsCode.includes('JayT Student Hub'), 'Missing Student Hub section in JS');
  assert(jsCode.includes('function switchStudentTab('), 'Missing switchStudentTab in JS');
  assert(jsCode.includes('data-tab="CUU_DOI"'), 'Missing CUU_DOI tab');
  assert(jsCode.includes('data-tab="EDU_PERKS"'), 'Missing EDU_PERKS tab');
  assert(jsCode.includes('data-tab="KTX_STACK"'), 'Missing KTX_STACK tab');
});

console.log('\n--- 2. MODULE 1: RADAR CỨU ĐÓI <= 25K (4 CỤM TRƯỜNG) ---');
test('Campus rescue data contains 4 clusters (BK_SP, DUE, DUYTAN, NN_SPKT)', () => {
  assert(jsCode.includes('campusRescueData'), 'Missing campusRescueData in JS');
  assert(jsCode.includes('BK_SP:'), 'Missing BK_SP cluster data');
  assert(jsCode.includes('DUE:'), 'Missing DUE cluster data');
  assert(jsCode.includes('DUYTAN:'), 'Missing DUYTAN cluster data');
  assert(jsCode.includes('NN_SPKT:'), 'Missing NN_SPKT cluster data');
  assert(jsCode.includes('function filterCampus('), 'Missing filterCampus in JS');
  assert(jsCode.includes('id="foodRescueGrid"'), 'Missing foodRescueGrid in DOM');
});

console.log('\n--- 3. MODULE 2: ĐẶC QUYỀN EMAIL .EDU.VN (0Đ & GIẢM 50%) ---');
test('Edu perks grid includes Spotify, YouTube, GitHub, Notion, Apple, JetBrains', () => {
  assert(jsCode.includes('Spotify Student'), 'Missing Spotify Student perk');
  assert(jsCode.includes('YouTube Premium HSSV'), 'Missing YouTube Premium perk');
  assert(jsCode.includes('GitHub Student Pack'), 'Missing GitHub Student Pack');
  assert(jsCode.includes('Notion Plus & Canva Pro'), 'Missing Notion Plus perk');
  assert(jsCode.includes('Apple Education Store'), 'Missing Apple Education Store');
  assert(jsCode.includes('JetBrains All Products'), 'Missing JetBrains perk');
  assert(htmlCode.includes('.btn-edu-action'), 'Missing .btn-edu-action in CSS');
});

console.log('\n--- 4. MODULE 3: SĂN ĐỒ KTX <= 49K & XẾP CHỒNG 3 TẦNG MÃ ---');
test('Coupon stack simulator equation & 4 KTX items active', () => {
  assert(htmlCode.includes('.coupon-stack-simulator'), 'Missing .coupon-stack-simulator in CSS');
  assert(htmlCode.includes('.sim-equation'), 'Missing .sim-equation in CSS');
  assert(jsCode.includes('Trình Mô Phỏng Xếp Chồng 3 Tầng Mã'), 'Missing simulator in DOM');
  assert(jsCode.includes('Quạt tích điện để bàn mini USB'), 'Missing USB fan item');
  assert(jsCode.includes('Đèn LED kẹp bàn chống cận'), 'Missing LED lamp item');
  assert(jsCode.includes('Nồi lẩu mini nấu mì 1.5L'), 'Missing mini pot item');
  assert(jsCode.includes('Cáp sạc Type-C 20W bọc dù'), 'Missing Type-C cable item');
});

console.log('\n======================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL 4 JAYT STUDENT HUB v7.0.0 AUDITS PASSED WITH 100% EXCELLENCE!');
  process.exit(0);
}
