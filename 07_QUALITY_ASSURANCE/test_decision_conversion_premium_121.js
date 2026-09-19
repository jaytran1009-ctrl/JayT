/**
 * QA TEST SUITE 121
 * Directive: JAYT-121-DECISION-CONVERSION-PREMIUM
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
console.log('🧪 BẮT ĐẦU TEST SUITE 121: DECISION CONVERSION PREMIUM');
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
  'daily_supply_feed_121.json'
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

// 2. Kiểm tra Daily Supply Feed 121
console.log('\n📊 2. KIỂM TRA DỮ LIỆU NGUỒN CUNG FEED 121');
const feedPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'daily_supply_feed_121.json');
const feedData = JSON.parse(fs.readFileSync(feedPath, 'utf8'));

assert(feedData.feed_version === '121.0.0', 'Feed version đúng 121.0.0');
assert(feedData.directive === 'JAYT-121-DECISION-CONVERSION-PREMIUM', 'Directive đúng JAYT-121-DECISION-CONVERSION-PREMIUM');
assert(feedData.summary.total_items === 15, 'Tổng số mục nguồn cung là 15');
assert(feedData.summary.limited_time_deals_count === 5, 'Có đúng 5 ưu đãi có hạn');
assert(feedData.summary.watchlist_deals_count === 2, 'Có đúng 2 ưu đãi watchlist');
assert(feedData.summary.planning_menu_and_utilities_count === 8, 'Có đúng 8 mục giá menu / tiện ích thường nhật');

// Kiểm tra 5 limited-time deals có chứng cứ đĩa thật
feedData.limited_time_deals.forEach(deal => {
  assert(deal.id && deal.brand && deal.benefit && deal.primary_condition, `Deal ${deal.id} có đủ trường cốt lõi`);
  assert(deal.evidence && deal.evidence.verified_file_path, `Deal ${deal.id} có đường dẫn chứng cứ trên đĩa`);
  assert(fs.existsSync(path.join(repoRoot, deal.evidence.verified_file_path)), `File chứng cứ đĩa tồn tại: ${deal.evidence.verified_file_path}`);
});

// 3. Kiểm tra Supply Gap Board 121
console.log('\n🗺️ 3. KIỂM TRA SUPPLY GAP BOARD 121');
const gapBoardPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'supply_gap_board_121.json');
const gapBoard = JSON.parse(fs.readFileSync(gapBoardPath, 'utf8'));

assert(gapBoard.board_version === '121.0.0', 'Gap board version 121.0.0');
assert(gapBoard.summary_metrics.total_matrix_cells === 25, 'Tổng số ô ma trận là 25');
assert(gapBoard.summary_metrics.actionable_coverage_rate_percent >= 40, `Độ phủ hành động đạt ${gapBoard.summary_metrics.actionable_coverage_rate_percent}% (>=40%)`);
assert(gapBoard.summary_metrics.high_priority_gaps_count === 3, 'Theo dõi đúng 3 khoảng trống ưu tiên');

// 4. Kiểm tra Frontend JS Engine: Brand Grouping & Comparison Cards
console.log('\n🖥️ 4. KIỂM TRA JAVASCRIPT DECISION ENGINE & BRAND GROUPING');
const jsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const jsContent = fs.readFileSync(jsPath, 'utf8');

assert(jsContent.includes('daily_supply_feed_121.json'), 'JS tải đúng feed 121');
assert(jsContent.includes('function renderBrandComparisonCard('), 'JS có hàm renderBrandComparisonCard');
assert(jsContent.includes('apex-comparison-card'), 'JS chứa class apex-comparison-card');
assert(jsContent.includes('apex-comparison-tabs-strip'), 'JS chứa class apex-comparison-tabs-strip');
assert(jsContent.includes('apex-deal-tab-chip'), 'JS chứa class apex-deal-tab-chip');
assert(jsContent.includes('switch-comparison-deal'), 'JS có data-action switch-comparison-deal');
assert(jsContent.includes('brandGroups'), 'JS triển khai thuật toán nhóm thương hiệu (brandGroups)');
assert(jsContent.includes('distinctBrandNames'), 'JS đảm bảo Top 3 thẻ thuộc các thương hiệu phân biệt (distinctBrandNames)');
assert(jsContent.includes('getProximityText()'), 'JS sử dụng helper getProximityText');
assert(jsContent.includes('Lập kèo ngay 👥'), 'Return banner có CTA Lập kèo ngay');
assert(jsContent.includes('Chia bill ngay 🧮'), 'Return banner có CTA Chia bill ngay');

// 5. Kiểm tra Copy Chính Xác & Không Dùng Từ Ngữ Tuyệt Đối
console.log('\n✍️ 5. KIỂM TRA COPY FOOTER & PRIVACY NOTE');
assert(jsContent.includes('JayT phân loại rõ ưu đãi có hạn, giá tham khảo và ghi chú riêng.'), 'Footer copy đúng quy chuẩn 121');
assert(!jsContent.includes('100% dữ liệu đối soát thực tế'), 'Đã xóa bỏ hoàn toàn copy tuyệt đối "100% dữ liệu đối soát thực tế"');
assert(jsContent.includes('Không nhập thông tin cá nhân. Ghi chú được lưu trên thiết bị này.'), 'Signal copy đúng quy chuẩn 121');
assert(!jsContent.includes('Tự động lọc số điện thoại/email'), 'Đã xóa bỏ copy cam đoan "Tự động lọc số điện thoại/email"');

// Kiểm tra zero technical jargon
const techJargon = [
  'Tier 1 (Ưu đãi xác minh)',
  'Tier 2 (Ưu đãi đang rà soát)',
  'Tier 3 (Quán ăn & Cà phê cộng đồng)',
  'SSOT',
  'SHA-256',
  'Classification Policy'
];
techJargon.forEach(jargon => {
  assert(!jsContent.includes(`>${jargon}<`) && !jsContent.includes(`"${jargon}"`), `Không có technical jargon trong UI: "${jargon}"`);
});

// 6. Kiểm tra CSS Design System & WCAG AA Contrast Tokens
console.log('\n🎨 6. KIỂM TRA CSS DESIGN SYSTEM & CONTRAST TOKENS');
const htmlPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

assert(htmlContent.includes('--touch-min: 44px'), 'CSS Token --touch-min: 44px tồn tại');
assert(htmlContent.includes('outline: 2.5px solid #10B981'), 'Focus-visible outline 2.5px solid #10B981 tồn tại');
assert(htmlContent.includes('.apex-comparison-card'), 'CSS class .apex-comparison-card được khai báo');
assert(htmlContent.includes('.apex-deal-tab-chip'), 'CSS class .apex-deal-tab-chip được khai báo');
assert(htmlContent.includes('.apex-return-experience-banner'), 'CSS class .apex-return-experience-banner được khai báo');
assert(htmlContent.includes('@media (min-width: 768px)'), 'Responsive breakpoint 768px được hỗ trợ');

// Contrast Ratio Calculation Helper
function getLuminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(rgb1, rgb2) {
  const lum1 = getLuminance(...rgb1);
  const lum2 = getLuminance(...rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Đo độ tương phản các cặp màu quan trọng trong Design System
const colorPairs = [
  { name: 'Dark Text (#0F172A) on White Card (#FFFFFF)', c1: [15, 23, 42], c2: [255, 255, 255], minRatio: 4.5 },
  { name: 'Pine Primary Text (#065F46) on Light Green (#ECFDF5)', c1: [6, 95, 70], c2: [236, 253, 245], minRatio: 4.5 },
  { name: 'White Text (#FFFFFF) on Pine Button (#065F46)', c1: [255, 255, 255], c2: [6, 95, 70], minRatio: 4.5 },
  { name: 'Dark Muted Text (#64748B) on White Card (#FFFFFF)', c1: [100, 116, 139], c2: [255, 255, 255], minRatio: 4.5 },
  { name: 'Dark Mode Text (#F8FAFC) on Dark Surface (#0F172A)', c1: [248, 250, 252], c2: [15, 23, 42], minRatio: 4.5 }
];

colorPairs.forEach(pair => {
  const ratio = getContrastRatio(pair.c1, pair.c2);
  assert(ratio >= pair.minRatio, `WCAG AA Contrast [${pair.name}]: ${ratio.toFixed(2)}:1 >= ${pair.minRatio}:1`);
});

// 7. Commercial Lock Check
console.log('\n🔒 7. KIỂM TRA KHÓA SẢN XUẤT THƯƠNG MẠI');
const fourLayerPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'four_layer_dataset.json');
const fourLayer = JSON.parse(fs.readFileSync(fourLayerPath, 'utf8'));

assert(Array.isArray(fourLayer.layer_1_pending_candidates), 'Pending candidates là mảng');
assert(fourLayer.layer_1_pending_candidates.every(c => c.is_commercial_published === false), 'Mọi ứng viên layer 1 đều is_commercial_published === false');
assert(fourLayer.layer_1_pending_candidates.every(c => c.status === 'PENDING_CEO_REVIEW'), 'Mọi ứng viên đều ở trạng thái PENDING_CEO_REVIEW');

console.log('\n🎉 ========================================================');
console.log(`🎉 TEST SUITE 121 HOÀN TẤT: ${passedAssertions}/${totalAssertions} ASSERTIONS PASS 100%!`);
console.log('🎉 ========================================================\n');
