/**
 * QA TEST SUITE 126: PLAN REALITY & CUSTOMER CARE
 * Directive: JAYT-126-PLAN-REALITY-AND-CUSTOMER-CARE
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
console.log('🧪 BẮT ĐẦU TEST SUITE 126: PLAN REALITY & CUSTOMER CARE');
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

// 2. Feed 126 Structure & Serviceability Metadata
console.log('\n📊 2. KIỂM TRA DỮ LIỆU FEED 126 & SERVICEABILITY METADATA');
const feed126 = JSON.parse(fs.readFileSync(path.join(sotDir, 'daily_supply_feed_126.json'), 'utf8'));

assert(feed126.feed_version === '126.0.0', 'Feed version đúng 126.0.0');
assert(feed126.directive === 'JAYT-126-PLAN-REALITY-AND-CUSTOMER-CARE', 'Directive đúng JAYT-126-PLAN-REALITY-AND-CUSTOMER-CARE');
assert(feed126.summary.total_items === 15, 'Tổng số mục nguồn cung là 15');

const allItems = [...feed126.limited_time_deals, ...feed126.watchlist_deals, ...feed126.planning_menu_and_utilities];

allItems.forEach(item => {
  assert(!!item.serviceability, `Mục ${item.id} (${item.brand}) có serviceability object`);
  assert(!!item.serviceability.cut_off_time, `Mục ${item.id} có cut_off_time: ${item.serviceability.cut_off_time}`);
  assert(!!item.serviceability.operating_window, `Mục ${item.id} có operating_window`);
});

// Specific Serviceability Assertions
const gogiItem = allItems.find(it => it.brand_id === 'BRAND_GOGI');
assert(gogiItem.serviceability.cut_off_time === '21:00', 'GoGi cut-off time là 21:00');
assert(gogiItem.serviceability.is_active_after_2100 === false, 'GoGi không nhận khách sau 21:00');

const danabusItem = allItems.find(it => it.brand_id === 'BRAND_DANABUS');
assert(danabusItem.serviceability.cut_off_time === '21:00', 'DanaBus cut-off time là 21:00');
assert(danabusItem.serviceability.is_active_after_2100 === false, 'DanaBus không hoạt động sau 21:00');

const phelaItem = allItems.find(it => it.brand_id === 'BRAND_PHELA');
assert(phelaItem.serviceability.is_active_after_2100 === true, 'Phê La hoạt động muộn sau 21:00 (mở đến 23:00)');

// 3. Asset Truth Gate (4 conditions)
console.log('\n📸 3. KIỂM TRA ASSET TRUTH GATE (4 ĐIỀU KIỆN)');
const registry = JSON.parse(fs.readFileSync(path.join(sotDir, 'brand_asset_registry.json'), 'utf8'));

const flagshipBrands = ['BRAND_CGV', 'BRAND_GOGI', 'BRAND_PHELA'];
flagshipBrands.forEach(bId => {
  const brand = registry.brands[bId];
  assert(brand.visual_identity.type === 'VERIFIED_EDITORIAL_ASSET', `${bId} là VERIFIED_EDITORIAL_ASSET`);
  assert(brand.display_permission === 'EDITORIAL_CONTEXT_PERMITTED', `${bId} có quyền EDITORIAL_CONTEXT_PERMITTED`);
  assert(brand.visual_identity.asset_sha256.length === 64, `${bId} có SHA-256 hash chuẩn 64 ký tự`);
  assert(!!brand.visual_identity.matched_branch, `${bId} có matched_branch rõ ràng`);
  assert(fs.existsSync(path.join(sotDir, brand.visual_identity.asset_path)), `${bId} tệp ảnh tồn tại trên đĩa`);
});

const nonFlagship = registry.brands['BRAND_GONGCHA'];
assert(nonFlagship.visual_identity.type === 'VECTOR_MONOGRAM_TREATMENT', 'Gong Cha duy trì VECTOR_MONOGRAM_TREATMENT trung thực');

// 4. Testing 5 Time Slots Serviceability
console.log('\n⏱️ 4. KIỂM THỬ 5 MỐC THỜI GIAN THEO SERVICEABILITY GATE');
const slotsToTest = [
  { id: 'SLOT_0730', name: '07:30 (Sáng)', expectedTransit: 'DANABUS_ACTIVE' },
  { id: 'SLOT_1115', name: '11:15 (Trưa)', expectedTransit: 'DANABUS_ACTIVE' },
  { id: 'SLOT_1415', name: '14:15 (Chiều)', expectedTransit: 'DANABUS_ACTIVE' },
  { id: 'SLOT_1730', name: '17:30 (Tan ca)', expectedTransit: 'DANABUS_ACTIVE' },
  { id: 'SLOT_2000', name: '20:00 (Tối)', expectedTransit: 'HONEST_LATE_NIGHT_NOTICE' }
];

slotsToTest.forEach(sl => {
  const matched = allItems.filter(it => it.slot === sl.id || (it.relevance_slots && it.relevance_slots.includes(sl.id)));
  assert(matched.length >= 1, `Khung giờ ${sl.name} có ít nhất 1 lựa chọn dịch vụ`);
  if (sl.id === 'SLOT_2000') {
    assert(matched.some(it => it.brand_id === 'BRAND_CGV'), 'Khung 20:00 có rạp phim CGV');
    assert(matched.some(it => it.brand_id === 'BRAND_GOGI'), 'Khung 20:00 có ăn tối GoGi');
    assert(matched.some(it => it.brand_id === 'BRAND_DANABUS'), 'Khung 20:00 có card di chuyển với cảnh báo sau 21h');
  }
});

// 5. Customer Care Feedback Loop in JS
console.log('\n💬 5. KIỂM TRA CUSTOMER CARE FEEDBACK LOOP TRONG JS');
const jsCode = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');

assert(jsCode.includes('daily_supply_feed_126.json'), 'JS nạp đúng feed 126');
assert(jsCode.includes('open-feedback-modal'), 'JS có nút mở modal phản ánh trên card');
assert(jsCode.includes('renderFeedbackModal'), 'JS có hàm render modal phản ánh');
assert(jsCode.includes('btn-submit-user-feedback'), 'JS có handler gửi phản ánh');
assert(jsCode.includes('switch-night-scenario'), 'JS có switcher kịch bản buổi tối');
assert(jsCode.includes('Chưa có phương án công cộng đã xác minh sau 21:00'), 'JS có thông báo trung thực sau 21:00');

// 6. Commercial Lock
console.log('\n🔒 6. KIỂM TRA KHÓA SẢN XUẤT THƯƠNG MẠI');
const fourLayer = JSON.parse(fs.readFileSync(path.join(sotDir, 'four_layer_dataset.json'), 'utf8'));
assert(fourLayer.layer_1_pending_candidates.every(c => c.is_commercial_published === false), 'Mọi ứng viên layer 1 đều is_commercial_published === false');
assert(fourLayer.layer_1_pending_candidates.every(c => c.status === 'PENDING_CEO_REVIEW'), 'Mọi ứng viên đều ở trạng thái PENDING_CEO_REVIEW');

console.log('\n🎉 ========================================================');
console.log(`🎉 TEST SUITE 126 HOÀN TẤT: ${passedAssertions}/${totalAssertions} ASSERTIONS PASS 100%!`);
console.log('🎉 ========================================================\n');
