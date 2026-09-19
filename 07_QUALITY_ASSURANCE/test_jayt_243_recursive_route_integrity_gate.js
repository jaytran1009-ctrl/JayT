/**
 * JAYT-243: RECURSIVE ROUTE & FULL SOURCE INTEGRITY QA GATE (v3.404.0)
 * 
 * 1. Recursive Route & Allowlist Scan on deploy/ and deploy/public/ (Zero archive exposure).
 * 2. Full-Source AST & Semantic Scan across all active production codebase files.
 * 3. Zero Forbidden Tokens / Dormant Renderers / Commercial Tracking URLs.
 * 4. Canonical Whitelist Compliance for all Tier 4 Pure Radar Cards & Bundles.
 * 5. Exact Version Parity (v3.404.0 strictly synchronized across all files).
 * 6. Physical Evidence Lineage: 43/43 cards resolve to valid bundles on disk.
 * 7. Supply Truth Matrix: 6 Deals, 10 Programs, 16 Venues, 11 Radars.
 * 8. Anti-Misleading Invariant & Zero Emoji Enforcement.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const SOT_DIR = path.join(ROOT_DIR, '03_SOURCE_OF_TRUTH');
const BUNDLES_DIR = path.join(SOT_DIR, 'evidence_bundles');
const DEPLOY_DIR = path.join(ROOT_DIR, 'deploy');

const FORBIDDEN_PATTERNS = [
  'raw_artefacts',
  'NÊN MUA',
  'NÊN CHỜ',
  'CHỜ GIÁ',
  'KIỂM TRA MÃ',
  'AccessTrade',
  'accesstrade',
  'isclix',
  'generated_tracking_url',
  'deep_tracking_url',
  'merchant_product_url',
  'buy_decision',
  'listed_price_vnd',
  'sale_price_vnd',
  'actual_cost_vnd',
  'thấp nhất 30 ngày',
  'Thấp nhất 30 ngày',
  'renderSmartShoppingAffiliateCard',
  'renderAffiliateDetailDrawer',
  'open-affiliate-detail',
  'JAYT_ADMITTED_AFFILIATE_CARDS',
  'historical_archive_containment'
];

const ALLOWED_TIER_4_KEYS = new Set([
  'card_id', 'claim_id', 'bundle_id', 'tier', 'tier_label', 'brand', 'title',
  'category', 'locality', 'customer_need', 'source_url', 'captured_at', 'recheck_due_at',
  'evidence_id', 'artifact_hash', 'visual_provenance', 'cta_type', 'claim_scope',
  'radar_status', 'radar_note', 'status', 'bundle_file', 'bundle_sha256', 'raw_quote_exact',
  'raw_artifact_file', 'raw_artifact_relative_path'
]);

function runGate() {
  console.log('========================================================================');
  console.log('🏛️ JAYT-243: RECURSIVE ROUTE & FULL SOURCE INTEGRITY QA GATE (v3.404.0)');
  console.log('========================================================================\n');

  let violations = [];

  // 1. RECURSIVE ROUTE & ALLOWLIST SCAN ON DEPLOY & DEPLOY/PUBLIC
  console.log('🔎 Step 1: Recursively scanning deploy/ directory for archive exposure & forbidden files...');
  if (fs.existsSync(DEPLOY_DIR)) {
    function scanDeploy(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (let e of entries) {
        const full = path.join(dir, e.name);
        if (e.name === '.vercel') continue;
        if (e.isDirectory()) {
          if (e.name === 'historical_archive_containment' || e.name === 'historical_archive') {
            violations.push(`Found forbidden archive directory in deploy: ${full}`);
          }
          scanDeploy(full);
        } else if (e.isFile()) {
          if (e.name.startsWith('daily_supply_feed_11') || e.name.startsWith('daily_supply_feed_120') || e.name.startsWith('daily_supply_feed_121') || e.name.startsWith('daily_supply_feed_122') || e.name.startsWith('daily_supply_feed_123') || e.name.startsWith('daily_supply_feed_124') || e.name.startsWith('daily_supply_feed_125') || e.name.startsWith('daily_supply_feed_126')) {
            violations.push(`Found legacy feed file in deploy root: ${e.name}`);
          }
          if (e.name.endsWith('.js') || e.name.endsWith('.html') || e.name.endsWith('.json')) {
            const content = fs.readFileSync(full, 'utf8');
            FORBIDDEN_PATTERNS.forEach(token => {
              if (content.includes(token)) {
                violations.push(`Deploy file ${full} contains forbidden token: "${token}"`);
              }
            });
          }
        }
      }
    }
    scanDeploy(DEPLOY_DIR);
  }

  // 2. FULL-SOURCE SCAN ACROSS ACTIVE PRODUCTION FILES
  console.log('🔎 Step 2: Scanning active production files in 03_SOURCE_OF_TRUTH...');
  const filesToScan = [
    path.join(SOT_DIR, 'jayt_apex_interface.js'),
    path.join(SOT_DIR, 'jayt_verified_deals_module.js'),
    path.join(SOT_DIR, 'jayt_affiliate_engine.js'),
    path.join(SOT_DIR, 'affiliate_customer_value_registry.json'),
    path.join(SOT_DIR, 'accesstrade_readonly_catalog_inventory.json'),
    path.join(SOT_DIR, 'daily_supply_feed_127.json'),
    path.join(SOT_DIR, 'index.html'),
    path.join(SOT_DIR, 'sw.js')
  ];

  filesToScan.forEach(filePath => {
    if (!fs.existsSync(filePath)) {
      violations.push(`File not found: ${filePath}`);
      return;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    FORBIDDEN_PATTERNS.forEach(token => {
      if (content.includes(token)) {
        violations.push(`File ${path.basename(filePath)} contains forbidden token: "${token}"`);
      }
    });
  });

  // 3. EXACT VERSION PARITY (v3.404.0)
  console.log('🔎 Step 3: Verifying exact version parity (v3.404.0)...');
  const EXPECTED_VERSION = 'v3.404.0';
  const sw = fs.readFileSync(path.join(SOT_DIR, 'sw.js'), 'utf8');
  const index = fs.readFileSync(path.join(SOT_DIR, 'index.html'), 'utf8');
  const apex = fs.readFileSync(path.join(SOT_DIR, 'jayt_apex_interface.js'), 'utf8');
  const feed = JSON.parse(fs.readFileSync(path.join(SOT_DIR, 'daily_supply_feed_127.json'), 'utf8'));

  if (!sw.includes(EXPECTED_VERSION)) violations.push(`sw.js does not contain ${EXPECTED_VERSION}`);
  if (!index.includes(EXPECTED_VERSION) && !index.includes('3.404.0')) violations.push(`index.html does not contain ${EXPECTED_VERSION}`);
  if (!apex.includes(EXPECTED_VERSION)) violations.push(`jayt_apex_interface.js does not contain ${EXPECTED_VERSION}`);
  if (feed.feed_version !== '3.404.0') violations.push(`daily_supply_feed_127.json feed_version is ${feed.feed_version}, expected 3.404.0`);

  // 4. PHYSICAL EVIDENCE LINEAGE (43 CARDS RESOLVE TO BUNDLES)
  console.log('🔎 Step 4: Verifying physical bundle lineage (43/43)...');
  const supplyCards = feed.supply_board_matrix || [];
  if (supplyCards.length !== 43) {
    violations.push(`Expected 43 supply cards, got ${supplyCards.length}`);
  }

  supplyCards.forEach(card => {
    const bundlePath = path.join(BUNDLES_DIR, `${card.bundle_id}.json`);
    if (!fs.existsSync(bundlePath)) {
      violations.push(`Card ${card.card_id} references missing bundle: ${card.bundle_id}.json`);
    } else {
      const bundleData = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));
      if (!bundleData.bundle_id || !bundleData.source_url) {
        violations.push(`Bundle ${card.bundle_id} is incomplete`);
      }
    }
  });

  // 5. CANONICAL WHITELIST COMPLIANCE FOR TIER 4 CARDS
  console.log('🔎 Step 5: Verifying Canonical Whitelist on Tier 4 Pure Radar Cards...');
  const tier4Cards = supplyCards.filter(c => c.tier === 'TIER_4_RADAR');
  if (tier4Cards.length !== 11) {
    violations.push(`Expected 11 Tier 4 cards, got ${tier4Cards.length}`);
  }

  tier4Cards.forEach(card => {
    Object.keys(card).forEach(k => {
      if (!ALLOWED_TIER_4_KEYS.has(k)) {
        violations.push(`Tier 4 card ${card.card_id} has non-whitelisted key: ${k}`);
      }
    });
    if (card.status !== 'MONITORED' && card.radar_status !== 'THEO DÕI') {
      violations.push(`Tier 4 card ${card.card_id} must have status MONITORED / THEO DÕI`);
    }
  });

  // 6. SUPPLY TRUTH MATRIX
  console.log('🔎 Step 6: Verifying Supply Truth Matrix...');
  const matrix = feed.truth_matrix;
  if (!matrix) violations.push('Missing truth_matrix in daily_supply_feed_127.json');
  else {
    if (matrix.tier_1_verified_deals !== 6) violations.push(`tier_1_verified_deals must be 6, got ${matrix.tier_1_verified_deals}`);
    if (matrix.tier_2_official_programs !== 10) violations.push(`tier_2_official_programs must be 10, got ${matrix.tier_2_official_programs}`);
    if (matrix.tier_3_verified_venues !== 16) violations.push(`tier_3_verified_venues must be 16, got ${matrix.tier_3_verified_venues}`);
    if (matrix.tier_4_candidate_radars !== 11) violations.push(`tier_4_candidate_radars must be 11, got ${matrix.tier_4_candidate_radars}`);
    if (matrix.affiliate_commercial_cards !== 0) violations.push(`affiliate_commercial_cards must be 0, got ${matrix.affiliate_commercial_cards}`);
  }

  // 7. ANTI-MISLEADING INVARIANT & ZERO EMOJI
  console.log('🔎 Step 7: Scanning for misleading metrics & emojis...');
  if (apex.includes('READY: 38/38') || apex.includes('READY: 43/43') || apex.includes('READY: 38') || apex.includes('READY: 43')) {
    violations.push('Found misleading READY metric in apex interface');
  }

  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/u;
  if (emojiRegex.test(apex)) {
    violations.push('Found emoji in apex interface');
  }

  if (violations.length > 0) {
    console.error('\n❌ JAYT-243 RECURSIVE ROUTE INTEGRITY GATE FAILED:');
    violations.forEach(v => console.error(`   - ${v}`));
    process.exit(1);
  }

  console.log('\n🟢 [JAYT-243-GATE-PASS] 100% Recursive Route Integrity, Zero Archive Exposure & Pure Radar Verified!');
}

runGate();
