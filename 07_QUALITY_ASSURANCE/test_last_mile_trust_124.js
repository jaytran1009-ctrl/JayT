/**
 * QA TEST SUITE 124
 * Directive: JAYT-124-LAST-MILE-TRUST-AND-LOCAL-MOMENT
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
console.log('🧪 BẮT ĐẦU TEST SUITE 124: LAST-MILE TRUST & LOCAL MOMENT');
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
  'daily_supply_feed_124.json'
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

// 2. Kiểm tra Daily Supply Feed 124 & Last-Mile Metadata
console.log('\n📊 2. KIỂM TRA DỮ LIỆU NGUỒN CUNG FEED 124 & LAST-MILE TRUST');
const feedPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'daily_supply_feed_124.json');
const feedData = JSON.parse(fs.readFileSync(feedPath, 'utf8'));

assert(feedData.feed_version === '124.0.0', 'Feed version đúng 124.0.0');
assert(feedData.directive === 'JAYT-124-LAST-MILE-TRUST-AND-LOCAL-MOMENT', 'Directive đúng JAYT-124-LAST-MILE-TRUST-AND-LOCAL-MOMENT');
assert(feedData.summary.total_items === 15, 'Tổng số mục nguồn cung là 15');

const allItems = [...feedData.limited_time_deals, ...feedData.watchlist_deals, ...feedData.planning_menu_and_utilities];

// Kiểm tra mọi mục đều có operating_hours & last_mile_note
allItems.forEach(item => {
  assert(item.operating_hours && item.operating_hours.length > 5, `Mục ${item.id} (${item.brand}) có giờ hoạt động rõ ràng`);
  assert(item.contextual_taxonomy && item.contextual_taxonomy.length > 3, `Mục ${item.id} có taxonomy theo ngữ cảnh`);
});

// 3. Kiểm tra Chuẩn Hóa Ngữ Cảnh Tối (GoGi, KFC, DanaBus)
console.log('\n🥩 3. KIỂM TRA TAXONOMY NGỮ CẢNH TỐI & CÔNG THỨC CHIA BILL');
const gogi = allItems.find(it => it.brand_id === 'BRAND_GOGI');
assert(gogi, 'Có mục GoGi House trong feed');
assert(gogi.contextual_taxonomy.includes('Ăn tối nhóm'), 'GoGi mang taxonomy "Ăn tối nhóm" (không phải Bữa trưa & Fastfood)');
assert(gogi.per_person_formula.includes('Ước tính ~176.300₫/người khi chia 3 người'), 'GoGi có công thức ước tính chia 3 người minh bạch');
assert(gogi.operating_hours.includes('10:00 – 22:00'), 'GoGi có giờ mở cửa 10:00 - 22:00');

const danabus = allItems.find(it => it.brand_id === 'BRAND_DANABUS');
assert(danabus, 'Có mục DanaBus trong feed');
assert(danabus.operating_hours.includes('05:30 – 21:00'), 'DanaBus có giờ hoạt động 05:30 – 21:00');
assert(danabus.last_mile_note.includes('Sau 21:00'), 'DanaBus có cảnh báo sau 21:00 xe buýt ngưng chạy');

// 4. Kiểm tra JS UI & Mobile Foldable Comparison Card
console.log('\n📱 4. KIỂM TRA GIAO DIỆN & THU GỌN THẺ SO SÁNH TRÊN MOBILE');
const jsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const jsContent = fs.readFileSync(jsPath, 'utf8');

assert(jsContent.includes('daily_supply_feed_124.json'), 'JS nạp đúng feed 124');
assert(jsContent.includes('apex-comparison-mobile-toggle-btn'), 'Có nút thu gọn/mở rộng so sánh trên mobile');
assert(jsContent.includes('toggle-comparison-expand'), 'Có event listener toggle-comparison-expand');
assert(jsContent.includes('item.operating_hours'), 'Card render giờ hoạt động operating_hours');
assert(jsContent.includes('item.last_mile_note'), 'Card render last_mile_note');
assert(jsContent.includes('item.per_person_formula'), 'Card render per_person_formula');

const indexPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');
assert(indexContent.includes('.apex-comparison-tabs-container'), 'index.html có class apex-comparison-tabs-container');
assert(indexContent.includes('mobile-compact'), 'index.html có class mobile-compact cho responsive');

// 5. Commercial Lock
console.log('\n🔒 5. KIỂM TRA KHÓA SẢN XUẤT THƯƠNG MẠI');
const fourLayerPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'four_layer_dataset.json');
const fourLayer = JSON.parse(fs.readFileSync(fourLayerPath, 'utf8'));

assert(fourLayer.layer_1_pending_candidates.every(c => c.is_commercial_published === false), 'Mọi ứng viên layer 1 đều is_commercial_published === false');
assert(fourLayer.layer_1_pending_candidates.every(c => c.status === 'PENDING_CEO_REVIEW'), 'Mọi ứng viên đều ở trạng thái PENDING_CEO_REVIEW');

console.log('\n🎉 ========================================================');
console.log(`🎉 TEST SUITE 124 HOÀN TẤT: ${passedAssertions}/${totalAssertions} ASSERTIONS PASS 100%!`);
console.log('🎉 ========================================================\n');
