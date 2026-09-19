/**
 * JAYT-125 QA TEST SUITE: NIGHT PLAN & VISUAL TRUTH
 * Directive: JAYT-125-NIGHT-PLAN-AND-VISUAL-TRUTH
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const deployDir = path.join(repoRoot, 'deploy', 'public');
const stagingDir = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH');

let passedAssertions = 0;
let totalAssertions = 0;

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

function getSha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

console.log('🧪 ========================================================');
console.log('🧪 BẮT ĐẦU TEST SUITE 125: NIGHT PLAN & VISUAL TRUTH');
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
  'daily_supply_feed_125.json'
];

for (const file of sotFiles) {
  const sotPath = path.join(sotDir, file);
  const depPath = path.join(deployDir, file);
  const staPath = path.join(stagingDir, file);

  assert(fs.existsSync(sotPath), `Tệp SOT tồn tại: ${file}`);
  assert(fs.existsSync(depPath), `Tệp Deploy tồn tại: ${file}`);
  assert(fs.existsSync(staPath), `Tệp Staging tồn tại: ${file}`);

  const sotBuf = fs.readFileSync(sotPath);
  const depBuf = fs.readFileSync(depPath);
  const staBuf = fs.readFileSync(staPath);

  assert(sotBuf.length === depBuf.length, `Kích thước byte SOT khớp Deploy cho ${file} (${sotBuf.length} B)`);
  assert(getSha256(sotBuf) === getSha256(depBuf), `Mã SHA-256 SOT khớp Deploy cho ${file}`);
  assert(getSha256(sotBuf) === getSha256(staBuf), `Mã SHA-256 SOT khớp Staging cho ${file}`);
}

// 2. Data Feed 125 Validation
console.log('\n📊 2. KIỂM TRA DỮ LIỆU NGUỒN CUNG FEED 125 & NIGHT PLAN METADATA');
const feed125 = JSON.parse(fs.readFileSync(path.join(sotDir, 'daily_supply_feed_125.json'), 'utf8'));

assert(feed125.feed_version === '125.0.0', 'Feed version đúng 125.0.0');
assert(feed125.directive === 'JAYT-125-NIGHT-PLAN-AND-VISUAL-TRUTH', 'Directive đúng JAYT-125-NIGHT-PLAN-AND-VISUAL-TRUTH');
assert(feed125.summary.total_items === 15, 'Tổng số mục nguồn cung là 15');

const allItems = [...feed125.limited_time_deals, ...feed125.watchlist_deals, ...feed125.planning_menu_and_utilities];

allItems.forEach(item => {
  assert(typeof item.operating_hours === 'string' && item.operating_hours.length > 5, `Mục ${item.id} (${item.brand}) có operating_hours rõ ràng`);
  assert(typeof item.contextual_taxonomy === 'string' && item.contextual_taxonomy.length > 3, `Mục ${item.id} có contextual_taxonomy`);
});

// Check Night Journey Steps
const gogi = allItems.find(it => it.brand_id === 'BRAND_GOGI');
const cgvPayday = allItems.find(it => it.id === 'DEAL_120_CGV_PAYDAY_30K');
const danabus = allItems.find(it => it.brand_id === 'BRAND_DANABUS');

assert(gogi && gogi.night_journey_step && gogi.night_journey_step.step_number === 1, 'GoGi House được định danh là Chặng 1 của Night Journey');
assert(cgvPayday && cgvPayday.night_journey_step && cgvPayday.night_journey_step.step_number === 2, 'CGV Cinemas được định danh là Chặng 2 của Night Journey');
assert(danabus && danabus.night_journey_step && danabus.night_journey_step.step_number === 3, 'DanaBus được định danh là Chặng 3 của Night Journey');
assert(danabus.primary_condition.includes('trước 21:00'), 'DanaBus có điều kiện thời gian "trước 21:00" ngay trên card');

// 3. Visual Truth Asset Validation
console.log('\n📸 3. KIỂM TRA VISUAL TRUTH & BRAND ASSET REGISTRY');
const assetRegistry = JSON.parse(fs.readFileSync(path.join(sotDir, 'brand_asset_registry.json'), 'utf8'));

assert(assetRegistry.brands.BRAND_CGV.visual_identity.type === 'VERIFIED_EDITORIAL_ASSET', 'CGV Cinemas được khai báo VERIFIED_EDITORIAL_ASSET trong registry');
assert(assetRegistry.brands.BRAND_GOGI.visual_identity.type === 'VERIFIED_EDITORIAL_ASSET', 'GoGi House được khai báo VERIFIED_EDITORIAL_ASSET trong registry');
assert(assetRegistry.brands.BRAND_PHELA.visual_identity.type === 'VERIFIED_EDITORIAL_ASSET', 'Phê La được khai báo VERIFIED_EDITORIAL_ASSET trong registry');
assert(assetRegistry.brands.BRAND_GONGCHA.visual_identity.type === 'VECTOR_MONOGRAM_TREATMENT', 'Gong Cha được khai báo VECTOR_MONOGRAM_TREATMENT trung thực');

// Check disk existence of verified images
const cgvImgPath = path.join(sotDir, assetRegistry.brands.BRAND_CGV.visual_identity.asset_path);
const gogiImgPath = path.join(sotDir, assetRegistry.brands.BRAND_GOGI.visual_identity.asset_path);
const phelaImgPath = path.join(sotDir, assetRegistry.brands.BRAND_PHELA.visual_identity.asset_path);

assert(fs.existsSync(cgvImgPath), 'Tệp ảnh CGV tồn tại trên đĩa');
assert(fs.existsSync(gogiImgPath), 'Tệp ảnh GoGi tồn tại trên đĩa');
assert(fs.existsSync(phelaImgPath), 'Tệp ảnh Phê La tồn tại trên đĩa');

// 4. JS UI & Interactive Simulator Validation
console.log('\n📱 4. KIỂM TRA GIAO DIỆN & BỘ CÔNG CỤ LẬP KÈO TỐI NAY (NIGHT PLANNER)');
const jsContent = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');

assert(jsContent.includes('daily_supply_feed_125.json'), 'JS nạp đúng feed 125');
assert(jsContent.includes('apex-night-journey-stepper'), 'JS có stepper lộ trình đêm 3 chặng');
assert(jsContent.includes('apex-night-planner-widget'), 'JS có widget Lập kèo tối nay');
assert(jsContent.includes('switch-transit-mode'), 'JS có chuyển đổi di chuyển Trước 21h vs Sau 21h');
assert(jsContent.includes('apex-editorial-visual-banner'), 'JS render visual banner bối cảnh cho các điểm flagship');
assert(jsContent.includes('set-night-headcount'), 'JS có event listener thay đổi số người tham gia');
assert(jsContent.includes('set-night-plan-type'), 'JS có event listener thay đổi loại kế hoạch');

// 5. CSS & HTML Layout Validation
console.log('\n🎨 5. KIỂM TRA STYLES VÀ RESPONSIVE TRONG INDEX.HTML');
const htmlContent = fs.readFileSync(path.join(sotDir, 'index.html'), 'utf8');

assert(htmlContent.includes('apex-editorial-visual-banner'), 'index.html có styles cho visual banner');
assert(htmlContent.includes('apex-night-journey-stepper'), 'index.html có responsive media query cho night stepper');

// 6. Commercial Freeze Lock
console.log('\n🔒 6. KIỂM TRA KHÓA SẢN XUẤT THƯƠNG MẠI');
const fourLayer = JSON.parse(fs.readFileSync(path.join(sotDir, 'four_layer_dataset.json'), 'utf8'));
assert(fourLayer.layer_1_pending_candidates.every(d => d.is_commercial_published === false), 'Mọi ứng viên layer 1 đều is_commercial_published === false');
assert(fourLayer.layer_1_pending_candidates.every(d => d.status === 'PENDING_CEO_REVIEW'), 'Mọi ứng viên đều ở trạng thái PENDING_CEO_REVIEW');

console.log('\n🎉 ========================================================');
console.log(`🎉 TEST SUITE 125 HOÀN TẤT: ${passedAssertions}/${totalAssertions} ASSERTIONS PASS 100%!`);
console.log('🎉 ========================================================\n');
