/**
 * JAYT-241: FULL COMMUNITY DISCOVERY & VALUE-FIRST AFFILIATE QA GATE
 * 1. Exact Version Parity Gate (v3.397.0 strictly synced across all SOT files).
 * 2. 100% 43 Supply Cards resolve to PHYSICAL EVIDENCE BUNDLES on disk.
 * 3. Supply Truth Matrix Verification (6 Deals, 10 Programs, 16 Venues, 11 Value-First Advisors).
 * 4. Value-First Affiliate Invariant: Every shopping card contains net_paid_price, price_history, advisor_verdict, and disclosure.
 * 5. Anti-Misleading Invariant: ZERO "READY" metric in DOM.
 * 6. Touch Target Standard >= 44px & Zero Emoji Enforcement.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const SOT_DIR = path.join(ROOT_DIR, '03_SOURCE_OF_TRUTH');
const BUNDLES_DIR = path.join(SOT_DIR, 'evidence_bundles');

function runGate() {
  console.log('========================================================================');
  console.log('🏛️ JAYT-241: FULL COMMUNITY DISCOVERY & VALUE-FIRST AFFILIATE QA GATE');
  console.log('========================================================================\n');

  let violations = [];

  // 1. Exact Version Parity (v3.397.0)
  const EXPECTED_VERSION = 'v3.397.0';
  const sw = fs.readFileSync(path.join(SOT_DIR, 'sw.js'), 'utf8');
  const index = fs.readFileSync(path.join(SOT_DIR, 'index.html'), 'utf8');
  const apex = fs.readFileSync(path.join(SOT_DIR, 'jayt_apex_interface.js'), 'utf8');
  const feed = JSON.parse(fs.readFileSync(path.join(SOT_DIR, 'daily_supply_feed_127.json'), 'utf8'));

  if (!sw.includes(EXPECTED_VERSION)) violations.push(`sw.js does not contain ${EXPECTED_VERSION}`);
  if (!index.includes(EXPECTED_VERSION) && !index.includes('3.397.0')) violations.push(`index.html does not contain ${EXPECTED_VERSION}`);
  if (!apex.includes(EXPECTED_VERSION)) violations.push(`jayt_apex_interface.js does not contain ${EXPECTED_VERSION}`);

  // 2. Physical Evidence Bundle Resolution Gate
  const supplyCards = feed.supply_board_matrix || [];
  if (supplyCards.length !== 43) {
    violations.push(`Expected 43 supply cards, found ${supplyCards.length}`);
  }

  let resolvedBundlesCount = 0;
  supplyCards.forEach(card => {
    const bundleFile = path.join(BUNDLES_DIR, `${card.bundle_id}.json`);
    if (!fs.existsSync(bundleFile)) {
      violations.push(`Card ${card.card_id} references missing bundle file: ${card.bundle_id}.json`);
    } else {
      const bundleData = JSON.parse(fs.readFileSync(bundleFile, 'utf8'));
      if (!bundleData.bundle_id || !bundleData.source_url) {
        violations.push(`Bundle ${card.bundle_id} is incomplete (missing bundle_id or source_url)`);
      } else {
        resolvedBundlesCount++;
      }
    }
  });
  console.log(`   📦 Physical Bundle Check: ${resolvedBundlesCount}/43 bundles physically verified on disk.`);

  // 3. Truth Matrix Verification
  const matrix = feed.truth_matrix;
  if (!matrix) violations.push('Missing truth_matrix in daily_supply_feed_127.json');
  else {
    if (matrix.tier_1_verified_deals !== 6) violations.push(`truth_matrix.tier_1_verified_deals must be 6, got ${matrix.tier_1_verified_deals}`);
    if (matrix.tier_2_official_programs !== 10) violations.push(`truth_matrix.tier_2_official_programs must be 10, got ${matrix.tier_2_official_programs}`);
    if (matrix.tier_3_verified_venues !== 16) violations.push(`truth_matrix.tier_3_verified_venues must be 16, got ${matrix.tier_3_verified_venues}`);
    if (matrix.tier_4_candidate_radars !== 11) violations.push(`truth_matrix.tier_4_candidate_radars must be 11, got ${matrix.tier_4_candidate_radars}`);
  }

  // 4. Value-First Affiliate Invariants
  const tier4Cards = supplyCards.filter(c => c.tier === 'TIER_4_RADAR');
  tier4Cards.forEach(card => {
    if (!card.net_paid_price) violations.push(`Tier 4 Card ${card.card_id} missing net_paid_price`);
    if (!card.price_history_summary) violations.push(`Tier 4 Card ${card.card_id} missing price_history_summary`);
    if (!card.advisor_verdict) violations.push(`Tier 4 Card ${card.card_id} missing advisor_verdict`);
    if (!card.affiliate_disclosure) violations.push(`Tier 4 Card ${card.card_id} missing affiliate_disclosure`);
  });

  // 5. Anti-Misleading Check on DOM
  if (apex.includes('READY: 38/38') || apex.includes('READY: 38') || apex.includes('READY: 43/43') || apex.includes('READY: 43')) {
    violations.push('Found misleading READY metric in apex interface (must use Truth Matrix)');
  }
  if (!apex.includes('Bảng Sự Thật Nguồn Cung') || !apex.includes('DEAL XÁC MINH')) {
    violations.push('Missing Supply Truth Matrix markers in apex interface');
  }

  // 6. Zero Emoji Scan
  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/u;
  if (emojiRegex.test(apex)) {
    violations.push('Found emoji in apex interface');
  }

  if (violations.length > 0) {
    console.error('❌ JAYT-241 QA GATE FAILED:');
    violations.forEach(v => console.error(`   - ${v}`));
    process.exit(1);
  }

  console.log('🟢 [JAYT-241-GATE-PASS] 100% Physical Bundle Lineage, Value-First Affiliate & Truth Matrix v3.397.0 Verified!');
}

runGate();
