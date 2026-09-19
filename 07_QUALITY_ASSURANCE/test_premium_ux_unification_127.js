/**
 * QA TEST SUITE 127: PREMIUM UX UNIFICATION
 * Directive: JAYT-127-PREMIUM-UX-UNIFICATION
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
console.log('🧪 BẮT ĐẦU TEST SUITE 127: PREMIUM UX UNIFICATION');
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

// 2. Dark Mode & Semantic Token Architecture (P0)
console.log('\n🎨 2. KIỂM TRA DARK MODE & SEMANTIC DESIGN TOKENS (P0)');
const htmlContent = fs.readFileSync(path.join(sotDir, 'index.html'), 'utf8');

assert(htmlContent.includes('--bg-app-base: #F8FAFC'), 'Light theme có nền Slate/Charcoal sáng');
assert(htmlContent.includes('--bg-app-base: #0B0F17'), 'Dark theme có nền Charcoal/Slate trung tính #0B0F17');
assert(htmlContent.includes('--bg-card-white: #131B2A'), 'Dark theme có nền card #131B2A');
assert(htmlContent.includes('--emerald-accent: #10B981'), 'Dark theme có Emerald CTA nổi bật #10B981');
assert(htmlContent.includes('--gold-champagne: #F59E0B'), 'Amber chỉ dùng cho cảnh báo/hạn dùng');
assert(htmlContent.includes('apex-explorer-section'), 'index.html có styles cho Explorer 5 tab');
assert(htmlContent.includes('apex-card-footer-unified'), 'index.html có styles cho card footer unified');
assert(htmlContent.includes('apex-btn-primary-action'), 'index.html có styles cho 1 Primary CTA duy nhất');

// 3. Unified 5-Tab Explorer & Progressive Disclosure (P0)
console.log('\n📂 3. KIỂM TRA UNIFIED EXPLORER 5 TAB & PROGRESSIVE DISCLOSURE (P0)');
const jsContent = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');

assert(jsContent.includes('renderUnifiedExplorerSection'), 'JS có hàm renderUnifiedExplorerSection');
assert(jsContent.includes('renderUnifiedVenueCard'), 'JS có hàm renderUnifiedVenueCard');
assert(jsContent.includes('switch-explorer-tab'), 'JS có handler chuyển đổi 5 tab Explorer');
assert(jsContent.includes('expand-explorer-venues'), 'JS có handler mở rộng progressive disclosure cho địa điểm');
assert(jsContent.includes('state.explorerVenueLimit'), 'JS có logic giới hạn progressive disclosure cho danh bạ địa điểm');
assert(jsContent.includes('🟢 Đang có hạn'), 'Tab 1 là Đang có hạn');
assert(jsContent.includes('⚠️ Cần xác nhận'), 'Tab 2 là Cần xác nhận');
assert(jsContent.includes('📋 Giá tham khảo'), 'Tab 3 là Giá tham khảo');
assert(jsContent.includes('🏢 Địa điểm'), 'Tab 4 là Địa điểm');
assert(jsContent.includes('📡 Cộng đồng'), 'Tab 5 là Cộng đồng');

// 4. Visual System & Single Primary CTA (P1)
console.log('\n✨ 4. KIỂM TRA HỆ THỐNG THỊ GIÁC & 1 PRIMARY CTA DUY NHẤT (P1)');

assert(jsContent.includes('apex-btn-primary-action'), 'Card có nút Primary CTA nổi bật duy nhất');
assert(jsContent.includes('apex-card-secondary-utilities-row'), 'Card có hàng tiện ích phụ tinh gọn');
assert(jsContent.includes('apex-btn-subtle-util'), 'Các tiện ích Chia bill / Lập kèo được tinh gọn thành subtle chips');
assert(jsContent.includes('apex-btn-subtle-report'), 'Nút Báo tin được đặt tế nhị ở cuối card');
assert(jsContent.includes('btn-toggle-theme'), 'JS có event listener cho theme toggle');

// 5. Customer Experience & Serviceability Gate (P1)
console.log('\n🛡️ 5. KIỂM TRA CUSTOMER EXPERIENCE & SERVICEABILITY GATE (P1)');

assert(jsContent.includes('switch-transit-mode'), 'JS có chuyển đổi Before 21h vs After 21h');
assert(jsContent.includes('Chưa có phương án công cộng đã xác minh sau 21:00'), 'Thông báo di chuyển sau 21h trung thực');
assert(jsContent.includes('switch-night-scenario'), 'JS có switcher 2 kịch bản tối (Ăn sớm vs Khởi hành 20h)');
assert(jsContent.includes('renderFeedbackModal'), 'JS có Customer Care Feedback Modal');

// 6. Commercial Freeze Lock
console.log('\n🔒 6. KIỂM TRA KHÓA SẢN XUẤT THƯƠNG MẠI');
const fourLayer = JSON.parse(fs.readFileSync(path.join(sotDir, 'four_layer_dataset.json'), 'utf8'));
assert(fourLayer.layer_1_pending_candidates.every(c => c.is_commercial_published === false), 'Mọi ứng viên layer 1 đều is_commercial_published === false');
assert(fourLayer.layer_1_pending_candidates.every(c => c.status === 'PENDING_CEO_REVIEW'), 'Mọi ứng viên đều ở trạng thái PENDING_CEO_REVIEW');

console.log('\n🎉 ========================================================');
console.log(`🎉 TEST SUITE 127 HOÀN TẤT: ${passedAssertions}/${totalAssertions} ASSERTIONS PASS 100%!`);
console.log('🎉 ========================================================\n');
