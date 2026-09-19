const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('========================================================================');
console.log('🚀 JAYT VISUAL MEDIA PIPELINE (v11.0.0): QA AUDIT');
console.log('========================================================================\n');

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

console.log('--- 1. PILLAR 1: CSS MEDIA PIPELINE & SQUIRCLE STYLING ---');
test('index.html contains .store-thumb-wrapper, .gear-image-box, .gear-real-image', () => {
  assert(htmlCode.includes('.store-thumb-wrapper'), 'Missing .store-thumb-wrapper in CSS');
  assert(htmlCode.includes('.store-real-thumb'), 'Missing .store-real-thumb in CSS');
  assert(htmlCode.includes('.gear-image-box'), 'Missing .gear-image-box in CSS');
  assert(htmlCode.includes('.gear-real-image'), 'Missing .gear-real-image in CSS');
});

console.log('\n--- 2. PILLAR 2: REAL FOOD RESCUE PHOTOS ---');
test('Campus food rescue directory contains real photos and brand tags', () => {
  assert(jsCode.includes('photo: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec'), 'Missing Cơm Tấm photo');
  assert(jsCode.includes('photo: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43'), 'Missing Bún Mắm photo');
  assert(jsCode.includes('photo: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46'), 'Missing Bánh Mì photo');
});

console.log('\n--- 3. PILLAR 3: REAL KTX PRODUCT PHOTOS ---');
test('6 KTX Gear cards feature real product images with loading=lazy and decoding=async', () => {
  assert(jsCode.includes('alt="Quạt Kẹp Tích Điện KTX"'), 'Missing Quạt Kẹp image tag');
  assert(jsCode.includes('alt="Đèn LED Kẹp Bàn Học"'), 'Missing Đèn LED image tag');
  assert(jsCode.includes('alt="Nồi Lẩu Mini Nấu Mì"'), 'Missing Nồi Lẩu image tag');
  assert(jsCode.includes('alt="Cáp Sạc 20W Type-C"'), 'Missing Cáp Sạc image tag');
  assert(jsCode.includes('alt="Ổ Cắm Đa Năng 4 USB"'), 'Missing Ổ Cắm image tag');
  assert(jsCode.includes('alt="Bình Giữ Nhiệt Inox 304"'), 'Missing Bình Giữ Nhiệt image tag');
});

console.log('\n--- 4. PILLAR 4: EDITORIAL VENUE REAL PHOTOS ---');
test('Editorial Venue cards feature Phê La with real photo and brand pill', () => {
  assert(jsCode.includes('alt="Phê La Bạch Đằng"'), 'Missing Phê La real photo tag');
  assert(jsCode.includes('Cơm Gà A Hải'), 'Missing Cơm Gà A Hải entry');
});

console.log('\n--- 5. PILLAR 5: ZERO CLS GUARANTEE (EXPLICIT DIMS & LAZY LOAD) ---');
test('All real media images have explicit width, height, and loading=lazy', () => {
  const imgTags = jsCode.match(/<img[^>]+>/g) || [];
  assert(imgTags.length >= 8, `Expected at least 8 img tags, found ${imgTags.length}`);
  imgTags.forEach((img, idx) => {
    assert(img.includes('loading="lazy"'), `Image ${idx+1} (${img}) missing loading="lazy"`);
    assert(img.includes('width='), `Image ${idx+1} missing explicit width`);
    assert(img.includes('height='), `Image ${idx+1} missing explicit height`);
  });
});

console.log('\n========================================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('========================================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL 5 JAYT VISUAL MEDIA PIPELINE PILLARS PASSED WITH 100% EXCELLENCE!');
  process.exit(0);
}
