/**
 * QA TEST SUITE 122
 * Directive: JAYT-122-INTENT-DIVERSITY-AND-PREMIUM-MOMENT
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
console.log('🧪 BẮT ĐẦU TEST SUITE 122: INTENT DIVERSITY & PREMIUM MOMENT');
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
  'daily_supply_feed_122.json'
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

// 2. Kiểm tra Daily Supply Feed 122
console.log('\n📊 2. KIỂM TRA DỮ LIỆU NGUỒN CUNG FEED 122');
const feedPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'daily_supply_feed_122.json');
const feedData = JSON.parse(fs.readFileSync(feedPath, 'utf8'));

assert(feedData.feed_version === '122.0.0', 'Feed version đúng 122.0.0');
assert(feedData.directive === 'JAYT-122-INTENT-DIVERSITY-AND-PREMIUM-MOMENT', 'Directive đúng JAYT-122-INTENT-DIVERSITY-AND-PREMIUM-MOMENT');
assert(feedData.summary.total_items === 15, 'Tổng số mục nguồn cung là 15');
assert(feedData.summary.multi_intent_distribution.ENTERTAINMENT === 5, 'Phân bổ 5 mục Giải trí/Phim');
assert(feedData.summary.multi_intent_distribution.DINING_MEETING === 7, 'Phân bổ 7 mục Ăn uống/Cà phê');
assert(feedData.summary.multi_intent_distribution.MOBILITY_SHOPPING === 3, 'Phân bổ 3 mục Di chuyển/Mua sắm');

// 3. Kiểm tra Supply Gap Board 122
console.log('\n🗺️ 3. KIỂM TRA SUPPLY GAP BOARD 122');
const gapBoardPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'supply_gap_board_122.json');
const gapBoard = JSON.parse(fs.readFileSync(gapBoardPath, 'utf8'));

assert(gapBoard.board_version === '122.0.0', 'Gap board version 122.0.0');
assert(gapBoard.summary_metrics.total_matrix_cells === 25, 'Tổng số ô ma trận là 25');
assert(gapBoard.summary_metrics.actionable_coverage_rate_percent >= 40, `Độ phủ hành động đạt ${gapBoard.summary_metrics.actionable_coverage_rate_percent}% (>=40%)`);

// 4. Kiểm tra Frontend JS Engine: Multi-Intent Diversity & Decision Questions
console.log('\n🖥️ 4. KIỂM TRA JAVASCRIPT MULTI-INTENT DIVERSITY & QUESTIONS');
const jsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const jsContent = fs.readFileSync(jsPath, 'utf8');

assert(jsContent.includes('daily_supply_feed_122.json'), 'JS tải đúng feed 122');
assert(jsContent.includes('Tối nay xem gì, ăn ở đâu, về thế nào?'), 'Có câu hỏi định hướng khung giờ Tối (20:00)');
assert(jsContent.includes('Ăn nhanh, ăn nhóm hay uống cà phê?'), 'Có câu hỏi định hướng khung giờ Trưa (11:15)');
assert(jsContent.includes('Gặp bạn, học nhóm hay nghỉ giải lao?'), 'Có câu hỏi định hướng khung giờ Chiều (14:15)');
assert(jsContent.includes('Tan làm: Ăn tối cùng đồng nghiệp, mua sắm hay xe về nhà?'), 'Có câu hỏi định hướng khung giờ Tan ca (17:30)');
assert(jsContent.includes('Khởi đầu ngày mới: Cà phê sáng, xe buýt trợ giá hay bữa ăn nhanh?'), 'Có câu hỏi định hướng khung giờ Sáng (07:30)');

// Thuật toán Multi-Intent
assert(jsContent.includes('MULTI-INTENT SELECTION ALGORITHM'), 'Có khối thuật toán Multi-Intent Selection');
assert(jsContent.includes('entItems'), 'Thuật toán trích xuất nhóm Giải trí (entItems)');
assert(jsContent.includes('dinItems'), 'Thuật toán trích xuất nhóm Ăn uống/Cà phê (dinItems)');
assert(jsContent.includes('mobItems'), 'Thuật toán trích xuất nhóm Di chuyển/Mua sắm (mobItems)');

// Deal Expired Recovery
assert(jsContent.includes('renderExpiredOfferRecoveryModal'), 'Có hàm renderExpiredOfferRecoveryModal');
assert(jsContent.includes('close-expired-modal'), 'Có event listener close-expired-modal');

// 5. Kiểm tra UI Header & Section 3 Titles
console.log('\n✍️ 5. KIỂM TRA HEADER POLISH & SECTION TITLES');
assert(jsContent.includes('📝 Ghi Chú Riêng Của Bạn'), 'Tiêu đề Section 3 là "📝 Ghi Chú Riêng Của Bạn"');
assert(!jsContent.includes('📝 3. Ghi Chú & Tín Hiệu Trên Thiết Bị Này'), 'Đã xóa bỏ tiêu đề mang tính nội bộ cũ');
assert(jsContent.includes('Nguồn rõ ràng'), 'Header badge hiển thị "Nguồn rõ ràng"');
assert(!jsContent.includes('>● VERIFIED<'), 'Đã xóa bỏ badge gây hiểu nhầm ● VERIFIED');

// 6. Kiểm tra Copy An Toàn & Zero Technical Jargon
console.log('\n🛡️ 6. KIỂM TRA COPY AN TOÀN & ZERO JARGON');
assert(jsContent.includes('JayT phân loại rõ ưu đãi có hạn, giá tham khảo và ghi chú riêng.'), 'Footer copy đúng quy chuẩn');
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
  assert(!jsContent.includes(`>${j}<`) && !jsContent.includes(`"${j}"`), `Không có forbidden jargon: ${j}`);
});

// 7. Commercial Lock Check
console.log('\n🔒 7. KIỂM TRA KHÓA SẢN XUẤT THƯƠNG MẠI');
const fourLayerPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'four_layer_dataset.json');
const fourLayer = JSON.parse(fs.readFileSync(fourLayerPath, 'utf8'));

assert(fourLayer.layer_1_pending_candidates.every(c => c.is_commercial_published === false), 'Mọi ứng viên layer 1 đều is_commercial_published === false');
assert(fourLayer.layer_1_pending_candidates.every(c => c.status === 'PENDING_CEO_REVIEW'), 'Mọi ứng viên đều ở trạng thái PENDING_CEO_REVIEW');

console.log('\n🎉 ========================================================');
console.log(`🎉 TEST SUITE 122 HOÀN TẤT: ${passedAssertions}/${totalAssertions} ASSERTIONS PASS 100%!`);
console.log('🎉 ========================================================\n');
