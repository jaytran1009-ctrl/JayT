/**
 * QA TEST SUITE 123
 * Directive: JAYT-123-INTENT-TRUTH-AND-MOMENT-FIT
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

let totalAssertions = 0;
let passedAssertions = 0;

function assert(condition, message) {
  totalAssertions++;
  if (condition) {
    passedAssertions++;
    console.log(`  ✅ [PASS] ${message}`);
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
}

function getSha256(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

console.log('🧪 ========================================================');
console.log('🧪 BẮT ĐẦU TEST SUITE 123: INTENT TRUTH & MOMENT FIT');
console.log('🧪 ========================================================\n');

// 1. Kiểm tra 7 tệp Source of Truth & Byte Parity
console.log('📦 1. KIỂM TRA ĐỒNG BỘ 7 TỆP SOURCE OF TRUTH (SOT PARITY)');
const sotFiles = [
  'index.html',
  'jayt_apex_interface.js',
  'customer_journey_north_star.json',
  'four_layer_dataset.json',
  'radar_dataset_086u.json',
  'brand_asset_registry.json',
  'daily_supply_feed_123.json'
];

sotFiles.forEach(file => {
  const sotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', file);
  const deployPath = path.join(repoRoot, 'deploy', 'public', file);
  const stagingPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH', file);

  assert(fs.existsSync(sotPath), `Tệp SOT tồn tại: ${file}`);
  assert(fs.existsSync(deployPath), `Tệp Deploy tồn tại: ${file}`);
  assert(fs.existsSync(stagingPath), `Tệp Staging tồn tại: ${file}`);

  const sotBuf = fs.readFileSync(sotPath);
  const depBuf = fs.readFileSync(deployPath);
  const stgBuf = fs.readFileSync(stagingPath);

  assert(sotBuf.length === depBuf.length, `Kích thước byte SOT khớp Deploy cho ${file} (${sotBuf.length} B)`);
  assert(getSha256(sotBuf) === getSha256(depBuf), `Mã SHA-256 SOT khớp Deploy cho ${file}`);
  assert(getSha256(sotBuf) === getSha256(stgBuf), `Mã SHA-256 SOT khớp Staging cho ${file}`);
});

// 2. Kiểm tra Daily Supply Feed 123
console.log('\n📊 2. KIỂM TRA DỮ LIỆU NGUỒN CUNG FEED 123');
const feedPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'daily_supply_feed_123.json');
const feedData = JSON.parse(fs.readFileSync(feedPath, 'utf8'));

assert(feedData.feed_version === '123.0.0', 'Feed version đúng 123.0.0');
assert(feedData.directive === 'JAYT-123-INTENT-TRUTH-AND-MOMENT-FIT', 'Directive đúng JAYT-123-INTENT-TRUTH-AND-MOMENT-FIT');
assert(feedData.summary.total_items === 15, 'Tổng số mục nguồn cung là 15');
assert(feedData.summary.intent_contracts.SLOT_2000.length === 3, 'Slot 20:00 có hợp đồng 3 ý định rõ ràng');
assert(feedData.summary.intent_contracts.SLOT_2000[0].includes('CGV Cinemas (Xem gì)'), 'Slot 20:00 Intent 1 là CGV xem phim');
assert(feedData.summary.intent_contracts.SLOT_2000[1].includes('GoGi House (Ăn tối)'), 'Slot 20:00 Intent 2 là GoGi ăn tối nướng');
assert(feedData.summary.intent_contracts.SLOT_2000[2].includes('DanaBus Đà Nẵng (Về nhà)'), 'Slot 20:00 Intent 3 là DanaBus xe buýt về');

// 3. Kiểm tra Watchlist Recheck & WinMart Card Sanitization
console.log('\n🛒 3. KIỂM TRA CHUẨN HÓA CARD WINMART & WATCHLIST');
const winmartItem = feedData.watchlist_deals.find(d => d.brand_id === 'BRAND_WINMART');
assert(winmartItem, 'Có mục WinMart trong watchlist');
assert(winmartItem.category_badge === '⚠️ KIỂM TRA TẠI QUẦY', 'Badge WinMart là "⚠️ KIỂM TRA TẠI QUẦY"');
assert(winmartItem.validity.includes('kiểm tra tại quầy trước khi mua'), 'Validity WinMart yêu cầu kiểm tra tại quầy');
assert(!winmartItem.validity.includes('áp dụng quanh năm'), 'Đã loại bỏ khẳng định "áp dụng quanh năm" khỏi WinMart');
assert(!winmartItem.benefit.includes('Tiết kiệm 20% trực tiếp'), 'Đã loại bỏ cam đoan "tiết kiệm 20% trực tiếp" gây mâu thuẫn');

// 4. Kiểm tra JS Intent Contract Matching Engine
console.log('\n🖥️ 4. KIỂM TRA JAVASCRIPT INTENT CONTRACT MATCHING ENGINE');
const jsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const jsContent = fs.readFileSync(jsPath, 'utf8');

assert(jsContent.includes('daily_supply_feed_123.json'), 'JS tải đúng feed 123');
assert(jsContent.includes('INTENT CONTRACT MATCHING WITH CERTAINTY-FIRST RANKING'), 'Có khối thuật toán Intent Contract & Certainty-First Ranking');
assert(jsContent.includes('getBestCardForIntentSlot'), 'Có hàm getBestCardForIntentSlot');
assert(jsContent.includes('getCertaintyRank'), 'Có hàm xếp hạng độ chắc chắn getCertaintyRank');
assert(jsContent.includes('⚠️ KIỂM TRA TẠI QUẦY'), 'Watchlist card render badge "⚠️ KIỂM TRA TẠI QUẦY"');

// Slot Questions
assert(jsContent.includes('Tối nay xem gì, ăn ở đâu, về thế nào?'), 'Slot 20:00 có câu hỏi "Tối nay xem gì, ăn ở đâu, về thế nào?"');
assert(jsContent.includes('Trưa nay ăn gì, vé xem phim trưa hay đi lại thế nào?'), 'Slot 11:15 có câu hỏi "Trưa nay ăn gì, vé xem phim trưa hay đi lại thế nào?"');
assert(jsContent.includes('Gặp bạn, học nhóm hay nghỉ giải lao?'), 'Slot 14:15 có câu hỏi "Gặp bạn, học nhóm hay nghỉ giải lao?"');
assert(jsContent.includes('Tan làm: Ăn tối cùng đồng nghiệp, xem phim hay xe về nhà?'), 'Slot 17:30 có câu hỏi "Tan làm: Ăn tối cùng đồng nghiệp, xem phim hay xe về nhà?"');
assert(jsContent.includes('Khởi đầu ngày mới: Cà phê sáng, xe buýt trợ giá hay bữa ăn nhanh?'), 'Slot 07:30 có câu hỏi "Khởi đầu ngày mới: Cà phê sáng, xe buýt trợ giá hay bữa ăn nhanh?"');

// Header & Section 3
assert(jsContent.includes('📝 Ghi Chú Riêng Của Bạn'), 'Tiêu đề Section 3 là "📝 Ghi Chú Riêng Của Bạn"');
assert(jsContent.includes('Nguồn rõ ràng'), 'Header badge hiển thị "Nguồn rõ ràng"');

// 5. Zero Technical Jargon & Copy Safety
console.log('\n🛡️ 5. KIỂM TRA ZERO JARGON & COPY AN TOÀN');
assert(jsContent.includes('JayT phân loại rõ ưu đãi có hạn, giá tham khảo và ghi chú riêng.'), 'Footer copy an toàn');
assert(jsContent.includes('Không nhập thông tin cá nhân. Ghi chú được lưu trên thiết bị này.'), 'Signal copy an toàn');

const forbidden = [
  'Tier 1 (Ưu đãi xác minh)',
  'Tier 2 (Ưu đãi đang rà soát)',
  'Tier 3 (Quán ăn & Cà phê cộng đồng)',
  'SSOT',
  'SHA-256',
  'Classification Policy'
];
forbidden.forEach(j => {
  assert(!jsContent.includes(`>${j}<`) && !jsContent.includes(`"${j}"`), `Không có technical jargon: ${j}`);
});

// 6. Commercial Lock
console.log('\n🔒 6. KIỂM TRA KHÓA SẢN XUẤT THƯƠNG MẠI');
const fourLayerPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'four_layer_dataset.json');
const fourLayer = JSON.parse(fs.readFileSync(fourLayerPath, 'utf8'));

assert(fourLayer.layer_1_pending_candidates.every(c => c.is_commercial_published === false), 'Mọi ứng viên layer 1 đều is_commercial_published === false');
assert(fourLayer.layer_1_pending_candidates.every(c => c.status === 'PENDING_CEO_REVIEW'), 'Mọi ứng viên đều ở trạng thái PENDING_CEO_REVIEW');

console.log('\n🎉 ========================================================');
console.log(`🎉 TEST SUITE 123 HOÀN TẤT: ${passedAssertions}/${totalAssertions} ASSERTIONS PASS 100%!`);
console.log('🎉 ========================================================\n');
