const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('======================================================');
console.log('👑 JAYT MASTER CANVAS 2026: COMPREHENSIVE QA AUDIT');
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

// 1. Top Utility Header Bar
console.log('\n--- 1. TOP UTILITY HEADER BAR ---');
check('Contains .jayt-top-utility-bar with persona switch & location', () => {
  assert(htmlContent.includes('.jayt-top-utility-bar'), 'Missing .jayt-top-utility-bar class');
  assert(jsContent.includes('class="jayt-top-utility-bar"'), 'Missing jayt-top-utility-bar in DOM');
  assert(jsContent.includes('Hải Châu, Đà Nẵng ▼'), 'Missing location dropdown in top bar');
  assert(jsContent.includes('🎓 Sinh Viên ⇄ 💼 Văn Phòng'), 'Missing persona toggle');
  assert(jsContent.includes('⚡ Live: 18 Cơ Sở') || jsContent.includes('⚡ Trực tiếp: 18 cơ sở'), 'Missing 18 active locations tag');
});

// 2. Tầng 1: Today Decision Hub & Lịch Rạp 7 Ngày
console.log('\n--- 2. TẦNG 1: TODAY DECISION HUB & LỊCH RẠP 7 NGÀY ---');
check('Bento Cột 1 contains 11:30 & Bách Khoa/Sư Phạm', () => {
  assert(jsContent.includes('📍 HẢI CHÂU · 11:30'), 'Missing 11:30 header in Bento Col 1');
  assert(jsContent.includes('🍚 Nhịp: Cứu Đói Trưa'), 'Missing Lunch beat');
  assert(jsContent.includes('🎓 Bách Khoa / SP'), 'Missing campus subtitle');
  assert(jsContent.includes('Đổi Cụm Trường ⇄'), 'Missing campus switcher button');
});

check('Bento Cột 2 contains Metiz U22 Featured Destination', () => {
  assert(jsContent.includes('🌟 ĐIỂM HẸN TỐI ƯU HÔM NAY'), 'Missing featured badge');
  assert(jsContent.includes('🎬 Metiz Cinema Helio — Vé U22'), 'Missing Metiz title');
  assert(jsContent.includes('🟢 CHÍNH SÁCH THÀNH VIÊN ĐÃ ĐỐI SOÁT'), 'Missing verified policy tag');
  assert(jsContent.includes('Số 01 Đường 2/9 · 08:00 - 23:00'), 'Missing address & hours');
  assert(jsContent.includes('Xem Suất Chiếu ↗'), 'Missing showtimes button');
  assert(jsContent.includes('📲 Xuất Vé'), 'Missing export ticket button');
});

check('Bento Cột 3 contains 7-Day Glass Calendar & Zalo Social Pass', () => {
  assert(jsContent.includes('📅 LỊCH VÉ RẺ 7 NGÀY VÙNG 43'), 'Missing 7-day calendar header');
  assert(jsContent.includes('🍿 Lập Kèo Rủ Bạn (Pass QR) ↗'), 'Missing Social Pass button');
});

// 3. Tầng 2: Hot Now & Trọng Tài Giỏ Hàng 3 App
console.log('\n--- 3. TẦNG 2: HOT NOW & TRỌNG TÀI GIỎ HÀNG 3 APP ---');
check('Thẻ 1 contains Phê La 36 Bạch Đằng with [PL] Monogram', () => {
  assert(jsContent.includes('☕ Phê La — 36 Bạch Đằng'), 'Missing Phê La title');
  assert(jsContent.includes('🔵 ĐỊA ĐIỂM THEO DÕI'), 'Missing tracked location status');
  assert(jsContent.includes('mono-phela">PL</div>'), 'Missing PL squircle');
});

check('Thẻ 2 contains Cơm Gà A Hải with [AH] Monogram', () => {
  assert(jsContent.includes('🍚 Cơm Gà A Hải — Thái Phiên'), 'Missing A Hải title');
  assert(jsContent.includes('🟢 ĐÃ ĐỐI SOÁT CƠ SỞ'), 'Missing verified status');
  assert(jsContent.includes('mono-ahai">AH</div>'), 'Missing AH squircle');
});

check('Thẻ 3 contains Cross-App Arbitrage 3 App Engine', () => {
  assert(jsContent.includes('🧮 TRỌNG TÀI GIỎ HÀNG 3 APP'), 'Missing Arbitrage header');
  assert(jsContent.includes('id="arbitrage-price-slider"'), 'Missing slider input');
  assert(jsContent.includes('ShopeeFood:'), 'Missing ShopeeFood line');
  assert(jsContent.includes('GrabFood:'), 'Missing GrabFood line');
  assert(jsContent.includes('BeFood:'), 'Missing BeFood line');
});

// 4. Tầng 3: Plan Ahead & Lên Kế Hoạch Tuần
console.log('\n--- 4. TẦNG 3: PLAN AHEAD & RADAR DI CHUYỂN ---');
check('Thẻ 1 contains Lotte Cinema HSSV with [LT] Monogram', () => {
  assert(jsContent.includes('🎬 Lotte Cinema Đà Nẵng'), 'Missing Lotte title');
  assert(jsContent.includes('mono-lotte') && jsContent.includes('>LT</div>'), 'Missing LT squircle');
  assert(jsContent.includes('📅 Thêm Vào Lịch Nhắc ↗'), 'Missing add calendar button');
});

check('Thẻ 2 contains Jollibee Ngày 15 with [JB] Monogram', () => {
  assert(jsContent.includes('🍗 Jollibee Ngày Hội Viên'), 'Missing Jollibee title');
  assert(jsContent.includes('mono-jollibee') && jsContent.includes('>JB</div>'), 'Missing JB squircle');
  assert(jsContent.includes('📅 Lưu Lịch Cá Nhân ↗'), 'Missing save calendar button');
});

check('Thẻ 3 contains Mobility Radar Cước Xe Cao Điểm 17:30', () => {
  assert(jsContent.includes('🚗 Cước Xe Mưa Lớn / Cầu Rồng'), 'Missing traffic title');
  assert(jsContent.includes('🚗 Xem Mã Cước Xe ↗') || jsContent.includes('📲 Chia Sẻ Kèo Đi Chung ↗'), 'Missing carpool / fare button');
});

// 5. Tầng 4 & 5: Luxury Voucher Vault & Săn Đáy KTX
console.log('\n--- 5. TẦNG 4 & 5: LUXURY VOUCHER VAULT & KTX SUPPLY ---');
check('Voucher Vault contains official neon codes', () => {
  assert(jsContent.includes('JAYTSHOPEE50'), 'Missing Shopee code');
  assert(jsContent.includes('TIKTOKVIP0D'), 'Missing TikTok code');
  assert(jsContent.includes('JAYTBE30'), 'Missing Be code');
});

check('KTX Supply Grid contains items <= 50k with 90-Day Bottom Badges', () => {
  assert(jsContent.includes('Cáp sạc Type-C 20W'), 'Missing cable item');
  assert(jsContent.includes('Quạt KTX mini USB'), 'Missing fan item');
  assert(jsContent.includes('Đèn học để bàn LED'), 'Missing lamp item');
  assert(jsContent.includes('#JayTAffiliate'), 'Missing Affiliate transparency tag');
});

// 6. JavaScript Functions
console.log('\n--- 6. JAVASCRIPT FUNCTIONS INTEGRATION ---');
check('copyZaloGroupPlanPass is defined and exposed', () => {
  assert(jsContent.includes('function copyZaloGroupPlanPass'), 'Missing copyZaloGroupPlanPass');
  assert(jsContent.includes('window.copyZaloGroupPlanPass = copyZaloGroupPlanPass'), 'Not exposed to window');
});

console.log('======================================================');
console.log(`📊 SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log('======================================================');

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log('\n✨ ALL JAYT MASTER CANVAS 2026 AUDITS PASSED!');
}
