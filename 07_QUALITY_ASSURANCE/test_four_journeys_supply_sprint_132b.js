/**
 * JAYT-132B QA TEST SUITE: FOUR JOURNEYS SUPPLY SPRINT
 * 
 * Verifies:
 * 1. Supply expansion across 4 Lanes (Cinema, F&B/Lunch, Delivery/Mobility, Community/Clusters).
 * 2. Strict compliance with the 5 Real Customer Acceptance Standards.
 * 3. 17 Live Supply Records mapped to 4 Canonical Statuses.
 * 4. Zero speculative winning app declarations.
 * 5. Moment-fit filtering across 5 daily time slots.
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const northStarPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'customer_journey_north_star.json');
const feedPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'daily_supply_feed_126.json');
const jsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const ledgerPath = path.join(repoRoot, '06_TRUST_AND_EVIDENCE', 'evidence_records', 'EVIDENCE_LEDGER_BATCH_132.json');

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
console.log('🧪 JAYT-132B: FOUR JOURNEYS SUPPLY SPRINT QA SUITE');
console.log('======================================================\n');

// 1. Four Lanes Supply Breakdown
console.log('--- 1. FOUR LANES SUPPLY BREAKDOWN (17 RECORDS) ---');
const northStar = JSON.parse(fs.readFileSync(northStarPath, 'utf8'));
const feed = JSON.parse(fs.readFileSync(feedPath, 'utf8'));
const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));

assert(northStar.contract_id === 'JAYT_CUSTOMER_JOURNEY_NORTH_STAR_132B', 'North Star contract is JAYT_CUSTOMER_JOURNEY_NORTH_STAR_132B');
assert(northStar.version === '3.1.0', 'North Star version is 3.1.0');
assert(feed.feed_version === '132.2.0', 'Feed version upgraded to 132.2.0');
assert(feed.summary.total_items === 17, `Feed total items is 17 (actual: ${feed.summary.total_items})`);
assert(ledger.total_records === 17, `Ledger total records is 17 (actual: ${ledger.total_records})`);

// Lane 1: Cinema
const cinemaRecords = ledger.records.filter(r => r.brand.includes('Cinema') || r.brand.includes('CGV') || r.brand.includes('Metiz') || r.brand.includes('Starlight'));
assert(cinemaRecords.length === 5, `Lane 1: Cinema has 5 verified records (actual: ${cinemaRecords.length})`);

// Lane 2: Bữa trưa & F&B
const fnbRecords = ledger.records.filter(r => ['KFC Vietnam', 'Jollibee Vietnam', 'Lotteria Vietnam', 'Highlands Coffee', 'Phê La', 'Gong Cha', 'Phúc Long Coffee & Tea', 'GoGi House', 'Dookki Vietnam', 'WinMart'].includes(r.brand));
assert(fnbRecords.length === 11, `Lane 2: Lunch & F&B has 11 records across 10 brands (actual: ${fnbRecords.length})`);

// Check Lotteria Happy Lunch and Dookki Buffet presence
const lotteriaItem = ledger.records.find(r => r.id === 'MENU_120_LOTTERIA_HAPPY_LUNCH_40K');
assert(lotteriaItem && lotteriaItem.canonical_status === 'MENU_REFERENCE', 'Lotteria Happy Lunch present with MENU_REFERENCE status');

const dookkiItem = ledger.records.find(r => r.id === 'MENU_120_DOOKKI_BUFFET_139K');
assert(dookkiItem && dookkiItem.canonical_status === 'MENU_REFERENCE', 'Dookki Buffet present with MENU_REFERENCE status');

// Lane 3: Delivery & Mobility
const mobilityRecords = ledger.records.filter(r => r.brand.includes('DanaBus'));
assert(mobilityRecords.length === 1, `Lane 3: Mobility has DanaBus transit utility (actual: ${mobilityRecords.length})`);

// Lane 4: Community & 5 Clusters
assert(ledger.four_lanes_breakdown.lane_4_community_and_clusters.verified_venues_count === 26, 'Lane 4: 26 Verified Venues across 5 student clusters');

// 2. Five Real Customer Acceptance Standards
console.log('\n--- 2. FIVE REAL CUSTOMER ACCEPTANCE STANDARDS ---');
const jsContent = fs.readFileSync(jsPath, 'utf8');

// Standard 1: 11:05 Lunch Selection
const slot1105Items = ledger.records.filter(r => r.valid_time_windows && r.valid_time_windows.includes('SLOT_1105'));
assert(slot1105Items.length >= 3, `Standard 1: At 11:05, students have ${slot1105Items.length} lunch choices (KFC, Jollibee, Lotteria, CGV ZaloPay)`);
const hasNightMovieIn1105 = slot1105Items.some(i => i.id === 'DEAL_120_CGV_PAYDAY_30K' || i.id === 'DEAL_120_CGV_MUA1TANG1');
assert(!hasNightMovieIn1105, 'Standard 1: 11:05 Strictly excludes night movie cards');

// Standard 2: App Comparison Desk Honest Total & 0 Speculation
assert(jsContent.includes('Real-Pay Comparison Engine'), 'Standard 2: Real-Pay Comparison Engine integrated');
assert(!jsContent.includes('rẻ nhất hôm nay'), 'Standard 2: Zero speculative "app rẻ nhất hôm nay" claim');
assert(jsContent.includes('So sánh bằng giá bạn đang thấy 🧮'), 'Standard 2: Honest user calculation CTA present');

// Standard 3: 17:30 Evening & Group Planning
const slot1730Items = ledger.records.filter(r => r.valid_time_windows && r.valid_time_windows.includes('SLOT_1730'));
assert(slot1730Items.some(i => i.id === 'DEAL_120_METIZ_U22_45K'), 'Standard 3: 17:30 features Metiz U22 45k card');
assert(slot1730Items.some(i => i.id === 'MENU_120_KFC_XO_HOP_CA'), 'Standard 3: 17:30 features KFC Xô Hợp Cạ 189k group dinner');
assert(jsContent.includes('GRP_DOOKKI_BUFFET') && jsContent.includes('GRP_GOGI_NIGHT'), 'Standard 3: Group planning engine has GoGi 529k and Dookki 139k combos');

// Standard 4: Reliable Calendar for Future Dates
assert(jsContent.includes('renderCinema7DayCalendar'), 'Standard 4: 7-Day Cinema Calendar present');
assert(jsContent.includes('Watchlist tháng tới (Lịch cần theo dõi)'), 'Standard 4: Future month labeled as reliable watchlist');

// Standard 5: Actionable Buttons for Every Card
assert(jsContent.includes('data-action="open-deal-source"'), 'Standard 5: Has primary CTA "Mở nguồn chính thức ↗"');
assert(jsContent.includes('data-action="calc-offer"'), 'Standard 5: Has secondary utility "Chia bill 🧮"');
assert(jsContent.includes('data-action="plan-offer"'), 'Standard 5: Has secondary utility "Lập kèo 👥"');
assert(jsContent.includes('data-action="open-feedback-modal"'), 'Standard 5: Has customer care "Báo tin 🚩"');

// 3. Four Canonical Status Counts
console.log('\n--- 3. FOUR CANONICAL STATUS COUNTS ---');
const activeVerified = ledger.records.filter(r => r.canonical_status === 'ACTIVE_VERIFIED');
const policyRef = ledger.records.filter(r => r.canonical_status === 'POLICY_REFERENCE');
const watchlistRecheck = ledger.records.filter(r => r.canonical_status === 'WATCHLIST_RECHECK');
const menuRef = ledger.records.filter(r => r.canonical_status === 'MENU_REFERENCE');

assert(activeVerified.length === 5, `ACTIVE_VERIFIED count is 5 (actual: ${activeVerified.length})`);
assert(policyRef.length === 1, `POLICY_REFERENCE count is 1 (actual: ${policyRef.length})`);
assert(watchlistRecheck.length === 1, `WATCHLIST_RECHECK count is 1 (actual: ${watchlistRecheck.length})`);
assert(menuRef.length === 10, `MENU_REFERENCE count is 10 (actual: ${menuRef.length})`);

console.log('\n======================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL JAYT-132B FOUR JOURNEYS SUPPLY SPRINT ASSERTIONS PASSED!');
  process.exit(0);
}
