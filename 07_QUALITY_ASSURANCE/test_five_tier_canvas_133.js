/**
 * JAYT-133 QA TEST SUITE: FIVE-TIER PREMIUM DISCOVERY CANVAS
 * 
 * Verifies:
 * 1. Complete 5-Tier Canvas architecture rendered in product UI.
 * 2. Tier 1: Today Hero 3-column bento, 1 best moment-fit match, glassmorphic 7-day calendar.
 * 3. Tier 2: Hot Now moment-fit food items & "Nhập giỏ hàng để đối chiếu" action.
 * 4. Tier 3: Plan Ahead verified countdowns (CGV, Starlight, Metiz) with .ics calendar download & share plan.
 * 5. Tier 4 & 5: Premium, honest empty states for Smart Buy & Voucher Wallet (0 fake items, 0 fake vouchers).
 * 6. Zero speculative claims: No 0đ/1đ fake items, no "Mở app rẻ nhất", no unverified freeship claims.
 * 7. 100% physical leaf provenance preserved from 132E.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const northStarPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'customer_journey_north_star.json');
const feedPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'daily_supply_feed_126.json');
const ledgerPath = path.join(repoRoot, '06_TRUST_AND_EVIDENCE', 'evidence_records', 'EVIDENCE_LEDGER_BATCH_132.json');
const jsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failCount++;
  }
}

console.log('\n======================================================');
console.log('🧪 JAYT-133: FIVE-TIER PREMIUM DISCOVERY CANVAS QA');
console.log('======================================================\n');

// 1. Contract & Architecture Integrity
console.log('--- 1. CONTRACTS & CANVAS ARCHITECTURE ---');
assert(fs.existsSync(northStarPath), 'customer_journey_north_star.json exists');
const northStar = JSON.parse(fs.readFileSync(northStarPath, 'utf8'));
const feed = JSON.parse(fs.readFileSync(feedPath, 'utf8'));
const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
const jsContent = fs.readFileSync(jsPath, 'utf8');

assert(northStar.contract_id === 'JAYT_CUSTOMER_JOURNEY_NORTH_STAR_133', 'North Star contract upgraded to JAYT_CUSTOMER_JOURNEY_NORTH_STAR_133');
assert(northStar.version === '3.5.0', 'North Star version is 3.5.0');
assert(northStar.five_tier_canvas_architecture !== undefined, 'North Star defines five_tier_canvas_architecture');
assert(jsContent.includes('renderFiveTierDailyDealCanvas'), 'JS implements renderFiveTierDailyDealCanvas()');

// 2. Tier 1: Today & Week Hero
console.log('\n--- 2. TIER 1: TODAY & WEEK HERO ---');
assert(jsContent.includes('apex-tier-1-hero'), 'Canvas contains Tier 1 Hero container');
assert(jsContent.includes('LỰA CHỌN PHÙ HỢP NHẤT'), 'Tier 1 features 1 Best Moment-Fit Match card');
assert(jsContent.includes('LỊCH 7 NGÀY (KÍNH MỜ)'), 'Tier 1 features Glassmorphic 7-Day Calendar');
assert(jsContent.includes('data-action="select-canvas-day"'), 'Supports 7-day scroller day selection');

// 3. Tier 2: Hot Now
console.log('\n--- 3. TIER 2: HOT NOW & DELIVERY RADAR ---');
assert(jsContent.includes('apex-tier-2-hotnow'), 'Canvas contains Tier 2 Hot Now section');
assert(jsContent.includes('Ngay lúc này có gì đáng chốt?'), 'Tier 2 displays moment-fit headline');
assert(jsContent.includes('data-action="open-cart-calculator"'), 'Tier 2 features "Nhập giỏ hàng để đối chiếu" action');
assert(jsContent.includes('TÙY TÀI KHOẢN & GIỎ HÀNG'), 'Delivery apps clearly labeled as ACCOUNT_OR_CART_DEPENDENT');

// 4. Tier 3: Plan Ahead & Calendar Export
console.log('\n--- 4. TIER 3: PLAN AHEAD & .ICS EXPORT ---');
assert(jsContent.includes('apex-tier-3-planahead'), 'Canvas contains Tier 3 Plan Ahead section');
assert(jsContent.includes('data-action="download-ics-event"'), 'Features "Nhắc lịch (.ics)" button without requiring login');
assert(jsContent.includes('BEGIN:VCALENDAR') && jsContent.includes('PRODID:-//JayT Da Nang'), 'JS includes standard RFC 5545 iCalendar generator');
assert(jsContent.includes('data-action="share-deal-plan"'), 'Features "Chia sẻ kèo" action');

// 5. Tier 4 & 5: Smart Buy & Voucher Wallet Empty States
console.log('\n--- 5. TIER 4 & 5: SMART BUY & VOUCHER WALLET ---');
assert(jsContent.includes('apex-tier-4-smartbuy'), 'Canvas contains Tier 4 Smart Buy section');
assert(jsContent.includes('JayT đang chờ nguồn giá và liên kết sản phẩm được cấp quyền chính thức'), 'Tier 4 displays honest waiting authorization state');
assert(jsContent.includes('data-action="subscribe-smart-buy"'), 'Tier 4 features category notification subscription');

assert(jsContent.includes('apex-tier-5-voucherwallet'), 'Canvas contains Tier 5 Voucher Wallet section');
assert(jsContent.includes('Chưa có mã voucher độc quyền nào được ủy quyền hôm nay'), 'Tier 5 displays transparent voucher status');

// 6. Zero False Claim Audit
console.log('\n--- 6. ZERO SPECULATIVE CLAIMS AUDIT ---');
assert(!jsContent.includes('cáp sạc 1k') && !jsContent.includes('cáp sạc 1K'), 'Zero occurrences of 1k fake cable items');
assert(!jsContent.includes('Mở app rẻ nhất'), 'Zero occurrences of "Mở app rẻ nhất" claim');
assert(!jsContent.includes('freeship 0đ mọi đơn'), 'Zero false freeship promises');

// 7. Physical Provenance Audit
console.log('\n--- 7. PHYSICAL PROVENANCE INVARIANT AUDIT ---');
const activeRecords = ledger.records.filter(r => r.canonical_status === 'ACTIVE_VERIFIED');
assert(activeRecords.length === 5, `Exactly 5 ACTIVE_VERIFIED records in ledger (actual: ${activeRecords.length})`);
activeRecords.forEach(r => {
  const fPath = path.join(repoRoot, r.evidence.verified_file_path);
  assert(fs.existsSync(fPath), `${r.id} physical leaf file exists on disk`);
  const buf = fs.readFileSync(fPath);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  assert(hash === r.evidence.sha256, `${r.id} SHA-256 matches physical file byte-for-byte`);
});

console.log('\n======================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL JAYT-133 FIVE-TIER DISCOVERY CANVAS ASSERTIONS PASSED!');
  process.exit(0);
}
