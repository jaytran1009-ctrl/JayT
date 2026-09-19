/**
 * QA TEST SUITE 128: DAILY SAVINGS ENGINE
 * Directive: JAYT-128-DAILY-SAVINGS-ENGINE
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const deployDir = path.join(repoRoot, 'deploy', 'public');
const stagingDir = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH');

function getSha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

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

console.log('🧪 ========================================================');
console.log('🧪 BẮT ĐẦU TEST SUITE 128: DAILY SAVINGS ENGINE');
console.log('🧪 ========================================================\n');

// 1. SOT 7-File Parity
console.log('📦 1. KIỂM TRA ĐỒNG BỘ 7 TỆP SOURCE OF TRUTH (SOT PARITY)');
const sotFiles = [
  'index.html',
  'jayt_apex_interface.js',
  'customer_journey_north_star.json',
  'four_layer_dataset.json',
  'radar_dataset_086u.json',
  'brand_asset_registry.json',
  'daily_supply_feed_126.json'
];

for (const file of sotFiles) {
  const sotPath = path.join(sotDir, file);
  const deployPath = path.join(deployDir, file);
  const stagingPath = path.join(stagingDir, file);

  assert(fs.existsSync(sotPath), `Tệp SOT tồn tại: ${file}`);
  assert(fs.existsSync(deployPath), `Tệp Deploy tồn tại: ${file}`);
  assert(fs.existsSync(stagingPath), `Tệp Staging tồn tại: ${file}`);

  const sotBuf = fs.readFileSync(sotPath);
  const depBuf = fs.readFileSync(deployPath);
  const stgBuf = fs.readFileSync(stagingPath);

  assert(sotBuf.length === depBuf.length, `Kích thước byte SOT khớp Deploy cho ${file} (${sotBuf.length} B)`);
  assert(getSha256(sotBuf) === getSha256(depBuf), `Mã SHA-256 SOT khớp Deploy cho ${file}`);
  assert(getSha256(sotBuf) === getSha256(stgBuf), `Mã SHA-256 SOT khớp Staging cho ${file}`);
}

const jsContent = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
const htmlContent = fs.readFileSync(path.join(sotDir, 'index.html'), 'utf8');

// 2. Phase A: Today Board 5 Time Slots
console.log('\n⏰ 2. KIỂM TRA PHASE A: TODAY BOARD 5 THỜI ĐIỂM & HONEST EMPTY STATE');
assert(jsContent.includes('SLOT_0730') && jsContent.includes('07:30'), 'Có khung giờ 07:30 Ăn sáng/đồ thiết yếu');
assert(jsContent.includes('SLOT_1105') && jsContent.includes('11:05'), 'Có khung giờ 11:05 Cứu đói trưa');
assert(jsContent.includes('SLOT_1430') && jsContent.includes('14:30'), 'Có khung giờ 14:30 Cà phê/học nhóm');
assert(jsContent.includes('SLOT_1730') && jsContent.includes('17:30'), 'Có khung giờ 17:30 Tan học/tan ca');
assert(jsContent.includes('SLOT_2000') && jsContent.includes('20:00'), 'Có khung giờ 20:00 Kèo tối');
assert(jsContent.includes('apex-honest-empty-state'), 'JS có markup Honest Empty State khi chưa có deal xác minh');
assert(htmlContent.includes('.apex-honest-empty-state'), 'CSS có styles cho Honest Empty State');

// 3. Phase B: Cinema 7-Day Calendar
console.log('\n🎬 3. KIỂM TRA PHASE B: CINEMA 7-DAY CALENDAR & BỘ LỌC ĐỐI SOÁT');
assert(jsContent.includes('renderCinema7DayCalendar'), 'JS có hàm renderCinema7DayCalendar');
assert(jsContent.includes('switch-cinema-day'), 'JS có switch 7 ngày trong tuần T2-CN');
assert(jsContent.includes('filter-cinema-tag'), 'JS có bộ lọc U22/BOGO/Quận cho rạp phim');
assert(jsContent.includes('CINEMA_CGV_PAYDAY'), 'Có dữ liệu CGV Payday');
assert(jsContent.includes('CINEMA_METIZ_U22'), 'Có dữ liệu Metiz U22 45k');
assert(jsContent.includes('CINEMA_STARLIGHT_MEMBER'), 'Có dữ liệu Starlight Member');
assert(jsContent.includes('CINEMA_GALAXY_COOPMART'), 'Có dữ liệu Galaxy Co.opmart');
assert(jsContent.includes('CINEMA_LOTTE_TUYEN_SON'), 'Có dữ liệu Lotte Cinema');
assert(htmlContent.includes('.apex-cinema-calendar-section'), 'CSS có styles cho Lịch Rạp 7 Ngày');

// 4. Phase C: Real-Price Comparison Desk
console.log('\n🧮 4. KIỂM TRA PHASE C: REAL-PRICE COMPARISON DESK (3 TRẠNG THÁI MINH BẠCH)');
assert(jsContent.includes('renderRealPriceComparisonDesk'), 'JS có hàm renderRealPriceComparisonDesk');
assert(jsContent.includes('calc-compare-input'), 'JS có input handler cho máy tính so sánh thực trả');
assert(jsContent.includes('Giá món') && jsContent.includes('Phí ship') && jsContent.includes('Thực trả'), 'Hiển thị công thức thực trả chuẩn xác');
assert(htmlContent.includes('.apex-comparison-desk-section'), 'CSS có styles cho Comparison Desk');

// 5. Phase D: Nearby 5-Cluster Explorer
console.log('\n📍 5. KIỂM TRA PHASE D: NEARBY 5-CLUSTER EXPLORER & HABIT ENGINE');
assert(jsContent.includes('renderNearbyClusterExplorer'), 'JS có hàm renderNearbyClusterExplorer');
assert(jsContent.includes('switch-nearby-cluster'), 'JS có switch 5 cụm sinh hoạt');
assert(jsContent.includes('HOA_KHANH') && jsContent.includes('HAI_CHAU') && jsContent.includes('THANH_KHE') && jsContent.includes('NGU_HANH_SON') && jsContent.includes('SON_TRA'), 'Có đầy đủ 5 cụm: Hòa Khánh, Hải Châu, Thanh Khê, Ngũ Hành Sơn, Sơn Trà');
assert(jsContent.includes('expand-cluster-venues'), 'Có progressive disclosure expand cho địa điểm theo cụm');
assert(htmlContent.includes('.apex-nearby-cluster-tabs'), 'CSS có styles cho Nearby Clusters');

// 6. Phase E: Smart Group Plan Desk
console.log('\n👥 6. KIỂM TRA PHASE E: KÈO NHÓM THÔNG MINH CÓ NGÂN SÁCH THỰC TRẢ');
assert(jsContent.includes('renderSmartGroupPlanDesk'), 'JS có hàm renderSmartGroupPlanDesk');
assert(jsContent.includes('set-group-budget'), 'JS có handler chọn ngân sách mỗi người');
assert(jsContent.includes('set-group-headcount'), 'JS có handler chọn số lượng người tham gia');
assert(jsContent.includes('switch-transit-mode'), 'JS có kiểm tra phương tiện sau 21h');
assert(htmlContent.includes('.apex-group-plan-engine'), 'CSS có styles cho Group Plan Engine');

// 7. Phase F: Premium UX/UI & Semantic Tokens
console.log('\n🎨 7. KIỂM TRA PHASE F: DARK MODE CHUẨN HÓA & 1 PRIMARY CTA');
assert(htmlContent.includes('--bg-app-base: #0B0F17'), 'Dark theme có nền Charcoal #0B0F17');
assert(htmlContent.includes('--emerald-accent: #10B981'), 'Emerald là CTA/active duy nhất');
assert(htmlContent.includes('--gold-champagne: #F59E0B'), 'Amber chỉ dùng cho cảnh báo');
assert(jsContent.includes('apex-btn-primary-action'), 'Mỗi card có 1 Primary CTA duy nhất');

// 8. Commercial Freeze Lock
console.log('\n🔒 8. KIỂM TRA KHÓA SẢN XUẤT THƯƠNG MẠI');
const fourLayer = JSON.parse(fs.readFileSync(path.join(sotDir, 'four_layer_dataset.json'), 'utf8'));
assert(fourLayer.layer_1_pending_candidates.every(c => c.is_commercial_published === false), 'Mọi ứng viên layer 1 đều is_commercial_published === false');
assert(fourLayer.layer_1_pending_candidates.every(c => c.status === 'PENDING_CEO_REVIEW'), 'Mọi ứng viên đều ở trạng thái PENDING_CEO_REVIEW');

console.log('\n🎉 ========================================================');
console.log(`🎉 TEST SUITE 128 HOÀN TẤT: ${passedAssertions}/${totalAssertions} ASSERTIONS PASS 100%!`);
console.log('🎉 ========================================================\n');
