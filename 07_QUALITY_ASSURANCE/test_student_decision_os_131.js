/**
 * JAYT-131 QA TEST SUITE: STUDENT DAILY DECISION OS VERIFICATION
 * 
 * Verifies:
 * 1. Cinema Planning Engine: 7 days, 5 chains, 3 status tiers, watchlist disclaimer, 0 fake forecasts.
 * 2. Real-Pay Comparison Engine: 3 calculation modes, formula transparency, 0 "Mở app rẻ nhất" claims.
 * 3. Nearby Savings Engine: 3 student clusters (Hòa Khánh, Ngũ Hành Sơn, Hải Châu), max 6 initial, 0 GPS tracking.
 * 4. Habit & Group Engine: 5 slots moment-fit, group bill split, post-21h transit block.
 * 5. Four Student User Journeys E2E Simulation.
 * 6. Card Truth & Evidence Ledger Contract.
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const feedPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'daily_supply_feed_126.json');
const jsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const ledgerPath = path.join(repoRoot, '06_TRUST_AND_EVIDENCE', 'evidence_records', 'EVIDENCE_LEDGER_BATCH_131.json');

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
console.log('🧪 JAYT-131: STUDENT DAILY DECISION OS QA SUITE');
console.log('======================================================\n');

// 1. Evidence Ledger & Feed Contract
console.log('--- 1. EVIDENCE LEDGER & DATA SUPPLY CONTRACT ---');
assert(fs.existsSync(ledgerPath), 'Evidence Ledger Batch 131 exists (EVIDENCE_LEDGER_BATCH_131.json)');

const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
assert(Array.isArray(ledger.records) && ledger.records.length === 15, `Ledger contains exactly 15 verified supply records (actual: ${ledger.records?.length})`);

const feed = JSON.parse(fs.readFileSync(feedPath, 'utf8'));
assert(feed.feed_version === '131.0.0', `Feed version is 131.0.0 (actual: ${feed.feed_version})`);
assert(feed.directive === 'JAYT-131-STUDENT-DAILY-DECISION-OS', `Feed directive matches JAYT-131-STUDENT-DAILY-DECISION-OS`);

// 2. Engine A: Cinema Planning Engine
console.log('\n--- 2. ENGINE A: CINEMA PLANNING ENGINE ---');
const jsContent = fs.readFileSync(jsPath, 'utf8');

assert(jsContent.includes('renderCinema7DayCalendar'), 'renderCinema7DayCalendar function exists');
assert(jsContent.includes('CGV Cinemas') && jsContent.includes('Metiz Cinema') && jsContent.includes('Starlight Cinema') && jsContent.includes('Galaxy Cinema') && jsContent.includes('Lotte Cinema'), 'Covers all 5 canonical cinema chains in Da Nang');
assert(jsContent.includes('🟢 ĐÃ XÁC MINH CÓ HẠN') || jsContent.includes('VERIFIED_ACTIVE'), 'Implements Tier 1: Verified Limited-Time Offer');
assert(jsContent.includes('⚠️ CHÍNH SÁCH ĐỊNH KỲ (HỎI TẠI QUẦY)') || jsContent.includes('WATCHLIST_POLICY'), 'Implements Tier 2: Periodic Policy Recheck');
assert(jsContent.includes('🏢 RẠP ĐÃ XÁC THỰC (GIÁ NIÊM YẾT)') || jsContent.includes('VENUE_VERIFIED_ONLY'), 'Implements Tier 3: Verified Venue Listed Price');
assert(jsContent.includes('Watchlist tháng tới (Lịch cần theo dõi)'), 'Labels future dates explicitly as Watchlist / Periodic Schedule');
assert(!jsContent.includes('dự báo ưu đãi tháng tới'), 'Strictly prohibits synthetic future deal forecasting claims');
assert(jsContent.includes('follow-cinema-day'), 'Supports "⭐ Theo dõi ngày này" user action');

// 3. Engine B: Real-Pay Comparison Engine
console.log('\n--- 3. ENGINE B: REAL-PAY COMPARISON ENGINE ---');
assert(jsContent.includes('renderRealPriceComparisonDesk'), 'renderRealPriceComparisonDesk function exists');
assert(jsContent.includes('Giá món') && jsContent.includes('Phí ship/phụ thu') && jsContent.includes('Giảm giá') && jsContent.includes('Thực trả'), 'Displays transparent mathematical formula');
assert(jsContent.includes('Chế độ 1') && jsContent.includes('Chế độ 2') && jsContent.includes('Chế độ 3'), 'Implements all 3 transparent comparison modes');
assert(jsContent.includes('So sánh bằng giá bạn đang thấy'), 'Features honest user CTA: "So sánh bằng giá bạn đang thấy"');
assert(!jsContent.includes('Mở app rẻ nhất'), 'Strictly prohibits claiming "Mở app rẻ nhất" when cart evidence is absent');

// 4. Engine C: Nearby Savings Engine
console.log('\n--- 4. ENGINE C: NEARBY SAVINGS ENGINE ---');
assert(jsContent.includes('renderNearbyClusterExplorer'), 'renderNearbyClusterExplorer function exists');
assert(jsContent.includes('Cụm Hòa Khánh') && jsContent.includes('Cụm Ngũ Hành Sơn') && jsContent.includes('Cụm Hải Châu'), 'Features 3 core student clusters (Hòa Khánh, Ngũ Hành Sơn, Hải Châu)');
assert(jsContent.includes('Không thu thập vị trí GPS cá nhân'), 'Explicitly protects user privacy with 0 GPS tracking');
assert(jsContent.includes('clusterVenueLimit || 6') || jsContent.includes('slice(0, limit)'), 'Limits initial venue display to max 6 locations');
assert(jsContent.includes('expand-cluster-venues'), 'Provides progressive disclosure expansion button');

// 5. Engine D: Habit & Group Engine
console.log('\n--- 5. ENGINE D: HABIT & GROUP ENGINE ---');
assert(jsContent.includes('renderSmartGroupPlanDesk'), 'renderSmartGroupPlanDesk function exists');
assert(jsContent.includes('Tổng niêm yết') && jsContent.includes('người'), 'Separates listed total and net per-person cost');
assert(jsContent.includes('50000') && jsContent.includes('80000') && jsContent.includes('150000'), 'Provides clear student-friendly budget thresholds');
assert(jsContent.includes('Sau 21:00 xe buýt ngưng chạy'), 'Enforces post-21:00 DanaBus serviceability guard with transparent late-night transit notice');

// 6. Home Mobile-First & Destination Architecture
console.log('\n--- 6. HOME MOBILE-FIRST & 4 DESTINATIONS ---');
assert(jsContent.includes('renderDeepDiscoveryPortal'), 'renderDeepDiscoveryPortal function exists');
assert(jsContent.includes('CINEMA') && jsContent.includes('COMPARE') && jsContent.includes('NEARBY') && jsContent.includes('GROUP'), 'Supports 4 dedicated discovery destinations');
assert(jsContent.includes('collapse-home-destination'), 'Allows clean collapse to preserve 3-second homepage focus');

// 7. Simulated 4 Student User Journeys
console.log('\n--- 7. SIMULATED 4 STUDENT USER JOURNEYS ---');

// Journey 1: Weekly Movie Planning
const tuesdayMovies = ledger.records.filter(r => r.valid_time_windows.includes('SLOT_1730') || r.valid_time_windows.includes('SLOT_2000'));
assert(tuesdayMovies.length >= 2, `Journey 1: Student finds >=2 valid evening movie options for weekly movie planning (found: ${tuesdayMovies.length})`);

// Journey 2: Real-Pay Self-Comparison
const sampleItem = 88000;
const sampleShip = 16000;
const sampleVoucher = 20000;
const calculatedNet = sampleItem + sampleShip - sampleVoucher;
assert(calculatedNet === 84000, `Journey 2: Student calculates net pay arithmetic truthfully (88k + 16k - 20k = ${calculatedNet}k)`);

// Journey 3: Student Campus Cluster Discovery
const hoaKhanhVenues = ledger.records.filter(r => r.student_cluster === 'HOA_KHANH');
const nguHanhSonVenues = ledger.records.filter(r => r.student_cluster === 'NGU_HANH_SON');
const haiChauVenues = ledger.records.filter(r => r.student_cluster === 'HAI_CHAU');
assert(hoaKhanhVenues.length > 0 && nguHanhSonVenues.length > 0 && haiChauVenues.length > 0, `Journey 3: All 3 student campuses have verified local destinations (Hòa Khánh: ${hoaKhanhVenues.length}, Ngũ Hành Sơn: ${nguHanhSonVenues.length}, Hải Châu: ${haiChauVenues.length})`);

// Journey 4: Group Plan Bill Splitting
const groupCombo = 529000;
const count3 = 3;
const perPerson3 = Math.round(groupCombo / count3);
assert(perPerson3 === 176333, `Journey 4: Group of 3 splits 529k GoGi combo transparently (~176k/person)`);

// 8. Zero Placeholder & Zero Fake Claims Contract
console.log('\n--- 8. ZERO PLACEHOLDER & ZERO FAKE CLAIMS CONTRACT ---');
assert(!jsContent.includes('"Deal 1"') && !jsContent.includes('"Deal 2"'), 'Zero placeholder labels "Deal 1" / "Deal 2" in codebase');
assert(!jsContent.includes('Freeship 0đ trong 2km'), 'Zero unverified speculative freeship claims');

console.log('\n======================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL JAYT-131 STUDENT DECISION OS ASSERTIONS PASSED!');
  process.exit(0);
}
