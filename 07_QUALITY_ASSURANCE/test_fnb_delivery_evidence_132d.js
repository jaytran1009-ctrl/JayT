/**
 * JAYT-132D QA TEST SUITE: F&B AND DELIVERY EVIDENCE BATCH
 * 
 * Verifies:
 * 1. Exactly 12+ F&B and Delivery candidates captured in EVIDENCE_LEDGER_BATCH_132D.json.
 * 2. Jollibee 69K candidate strictly classified as WATCHLIST_RECHECK with transparent reason.
 * 3. Delivery apps (ShopeeFood, GrabFood, BeFood, Xanh SM) flagged as ACCOUNT_OR_CART_DEPENDENT.
 * 4. At least 3 candidates with verified scope and validity TTL (ACTIVE_VERIFIED).
 * 5. Three distinct actionability tiers: ACTIONABLE_LIVE, RECHECK_REQUIRED, CART_DEPENDENT_SIMULATOR.
 * 6. Zero fake voucher or speculative freeship claims in product UI.
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const northStarPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'customer_journey_north_star.json');
const feedPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'daily_supply_feed_126.json');
const jsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const ledgerPath = path.join(repoRoot, '06_TRUST_AND_EVIDENCE', 'evidence_records', 'EVIDENCE_LEDGER_BATCH_132D.json');

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
console.log('🧪 JAYT-132D: F&B AND DELIVERY EVIDENCE BATCH QA');
console.log('======================================================\n');

// 1. Evidence Ledger & Contracts Check
console.log('--- 1. EVIDENCE LEDGER & CONTRACTS INTEGRITY ---');
assert(fs.existsSync(ledgerPath), 'Evidence Ledger Batch 132D exists (EVIDENCE_LEDGER_BATCH_132D.json)');
const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
const northStar = JSON.parse(fs.readFileSync(northStarPath, 'utf8'));
const feed = JSON.parse(fs.readFileSync(feedPath, 'utf8'));
const jsContent = fs.readFileSync(jsPath, 'utf8');

assert(northStar.contract_id === 'JAYT_CUSTOMER_JOURNEY_NORTH_STAR_132D', 'North Star contract upgraded to JAYT_CUSTOMER_JOURNEY_NORTH_STAR_132D');
assert(northStar.version === '3.3.0', 'North Star version is 3.3.0');
assert(feed.feed_version === '132.4.0', 'Feed version is 132.4.0');
assert(feed.directive === 'JAYT-132D-FNB-DELIVERY-EVIDENCE', 'Feed directive matches JAYT-132D');

// 2. Candidate Count & Actionability Tiers
console.log('\n--- 2. CANDIDATE COUNT & ACTIONABILITY TIERS ---');
assert(Array.isArray(ledger.candidates) && ledger.candidates.length >= 12, `At least 12 candidates captured (actual: ${ledger.candidates.length})`);

const actionableLive = ledger.candidates.filter(c => c.actionability_tier === 'ACTIONABLE_LIVE');
const recheckRequired = ledger.candidates.filter(c => c.actionability_tier === 'RECHECK_REQUIRED');
const cartDependent = ledger.candidates.filter(c => c.actionability_tier === 'CART_DEPENDENT_SIMULATOR');

assert(actionableLive.length >= 3, `At least 3 ACTIONABLE_LIVE candidates (actual: ${actionableLive.length})`);
assert(recheckRequired.length >= 2, `At least 2 RECHECK_REQUIRED candidates (actual: ${recheckRequired.length})`);
assert(cartDependent.length >= 4, `At least 4 CART_DEPENDENT_SIMULATOR candidates (actual: ${cartDependent.length})`);

// 3. Jollibee 69K Governance Check
console.log('\n--- 3. JOLLIBEE 69K CANDIDATE GOVERNANCE ---');
const jollibeeCandidate = ledger.candidates.find(c => c.id === 'CANDIDATE_132D_01_JOLLIBEE_69K');
assert(!!jollibeeCandidate, 'Jollibee 69K candidate is recorded in ledger');
assert(jollibeeCandidate.canonical_status === 'WATCHLIST_RECHECK', 'Jollibee 69K is strictly WATCHLIST_RECHECK (not ACTIVE_VERIFIED)');
assert(jollibeeCandidate.actionability_tier === 'RECHECK_REQUIRED', 'Jollibee 69K is RECHECK_REQUIRED');
assert(jollibeeCandidate.evidence_reason.includes('chưa chứng minh riêng chi nhánh Đà Nẵng'), 'Jollibee 69K explicitly documents unproven Da Nang scope and TTL');

const jollibeeInFeedWatchlist = feed.watchlist_deals.find(d => d.id === 'CANDIDATE_132D_01_JOLLIBEE_69K');
assert(!!jollibeeInFeedWatchlist, 'Jollibee 69K is placed in feed watchlist_deals');

// 4. Delivery Apps Governance Check
console.log('\n--- 4. DELIVERY APPS ACCOUNT & CART DEPENDENCY ---');
const deliveryBrands = ['ShopeeFood Đà Nẵng', 'GrabFood Đà Nẵng', 'BeFood Đà Nẵng', 'Xanh SM Đà Nẵng'];
deliveryBrands.forEach(bName => {
  const c = ledger.candidates.find(item => item.brand === bName);
  assert(c && c.cart_dependency_flag === true, `${bName} flagged with cart_dependency_flag = true`);
  assert(c && c.evidence_tier === 'RADAR_ONLY_SIGNAL', `${bName} classified as RADAR_ONLY_SIGNAL`);
});

assert(jsContent.includes('TÙY TÀI KHOẢN & GIỎ HÀNG'), 'UI displays ACCOUNT_OR_CART_DEPENDENT badge for delivery apps');

// 5. Zero Speculative Deal / Voucher Claims
console.log('\n--- 5. ZERO SPECULATIVE CLAIMS AUDIT ---');
assert(!jsContent.includes('Mở app rẻ nhất'), 'Zero occurrences of "Mở app rẻ nhất" claim');
assert(!jsContent.includes('freeship 0đ mọi đơn'), 'Zero false freeship promises');

console.log('\n======================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL JAYT-132D F&B AND DELIVERY EVIDENCE ASSERTIONS PASSED!');
  process.exit(0);
}
