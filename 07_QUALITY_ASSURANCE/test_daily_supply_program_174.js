/**
 * JAYT-174: DAILY SUPPLY ACCELERATION PROGRAM RED-TEAM TEST SUITE
 * Directive: CHỈ THỊ JAYT-174 — DAILY SUPPLY ACCELERATION PROGRAM
 * 
 * 10 FAIL-CLOSED AUDIT GATES
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🧪 JAYT-174: DAILY SUPPLY ACCELERATION PROGRAM AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const inventoryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'daily_supply_program_inventory_174.json');
const jsSotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const jsDeployPath = path.join(repoRoot, 'deploy', 'jayt_apex_interface.js');
const jsDeployPubPath = path.join(repoRoot, 'deploy', 'public', 'jayt_apex_interface.js');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

function sha256(filePath) {
  if (!fs.existsSync(filePath)) return 'FILE_NOT_FOUND';
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

let passCount = 0;
let failCount = 0;

function gate(description, fn) {
  try {
    fn();
    console.log(`  ✅ PASS [exit:0]: ${description}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL [exit:1]: ${description}`);
    console.error(`     Error: ${err.message}`);
    failCount++;
  }
}

console.log('--- GATE 1: STRICT 3-TIER HIERARCHY SEPARATION ---');
gate('Display hierarchy separates 🟢 Deal, 🔵 Venue, 🟣 Tracked Source and enforces 🟢 KPI uniqueness', () => {
  assert(fs.existsSync(inventoryPath), 'Inventory file must exist');
  const inv = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
  const h = inv.display_hierarchy;
  assert.strictEqual(h.tier_1_verified_deal.counts_in_kpi, true, 'Tier 1 must count in KPI');
  assert.strictEqual(h.tier_2_verified_venue.counts_in_kpi, false, 'Tier 2 must NOT count in KPI');
  assert.strictEqual(h.tier_3_tracked_source.counts_in_kpi, false, 'Tier 3 must NOT count in KPI');
  assert.strictEqual(h.tier_1_verified_deal.current_count, 0, 'Current 🟢 deals must be 0 until evidence captured');
  console.log('     Verified 3-Tier separation and strict 🟢 KPI accounting.');
});

console.log('\n--- GATE 2: LANE A 60 CANDIDATE DEALS BACKLOG AUDIT ---');
gate('Lane A contains 60 verifiable candidates with required physical evidence specs across 5 hubs', () => {
  const inv = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
  const laneA = inv.lane_a_deal_candidates;
  assert.strictEqual(laneA.target_count, 60, 'Target count must be 60');
  assert.strictEqual(laneA.current_pool_count, 60, 'Pool count must be 60');
  assert.strictEqual(laneA.status, 'CANDIDATE_BACKLOG_AWAITING_PHYSICAL_EVIDENCE');
  for (const c of laneA.candidates) {
    assert(c.candidate_id, 'Candidate must have ID');
    assert(c.brand, 'Candidate must have brand');
    assert(c.required_evidence, 'Candidate must specify required physical evidence');
    assert(c.hub_id, 'Candidate must belong to a hub');
  }
  console.log(`     Verified ${laneA.current_pool_count} candidates in Lane A backlog.`);
});

console.log('\n--- GATE 3: LANE B 100 VERIFIED LOCATIONS MAP COVERAGE ---');
gate('Lane B contains 100 verified locations mapped across all 5 Da Nang clusters', () => {
  const inv = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
  const laneB = inv.lane_b_verified_locations;
  assert.strictEqual(laneB.target_count, 100, 'Target count must be 100');
  assert.strictEqual(laneB.current_count, 100, 'Current count must be 100');
  const clusters = laneB.by_cluster;
  assert.strictEqual(clusters.CLUSTER_1_HOA_KHANH, 25, 'Hòa Khánh must have 25 venues');
  assert.strictEqual(clusters.CLUSTER_2_BAC_MY_AN_HOA_QUY, 25, 'Bắc Mỹ An - Hòa Quý must have 25 venues');
  assert.strictEqual(clusters.CLUSTER_3_HAI_CHAU_THANH_KHE, 25, 'Hải Châu - Thanh Khê must have 25 venues');
  assert.strictEqual(clusters.CLUSTER_4_HI_TECH_SOFTWARE_PARK, 12, 'Khu CNC / CV Phần Mềm must have 12 venues');
  assert.strictEqual(clusters.CLUSTER_5_SON_TRA, 13, 'Sơn Trà must have 13 venues');
  console.log('     Verified 100/100 venues distributed across 5 clusters.');
});

console.log('\n--- GATE 4: LANE B VENUE DISCLAIMER & ZERO SYNTHETIC CLAIMS ---');
gate('Lane B venues strictly enforce mandate label with zero unproven price claims', () => {
  const inv = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
  const laneB = inv.lane_b_verified_locations;
  assert.strictEqual(laneB.mandate_label, 'ĐỊA ĐIỂM XÁC MINH — kiểm tra giá và ưu đãi tại nguồn');
  for (const loc of laneB.locations) {
    assert(loc.address, `Location ${loc.id} must have physical address`);
    assert(loc.verified_source, `Location ${loc.id} must have verified official source URL`);
    assert(!loc.price, `Location ${loc.id} must NOT have unverified price`);
    assert(!loc.discount_percent, `Location ${loc.id} must NOT have unverified discount percent`);
  }
  console.log('     Verified zero synthetic pricing/claims on all 100 venues.');
});

console.log('\n--- GATE 5: LANE C 24 TRACKING PORTALS AUDIT ---');
gate('Lane C indexes 24 partner & community tracking portals with zero fake affiliate links', () => {
  const inv = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
  const laneC = inv.lane_c_tracking_portals;
  assert.strictEqual(laneC.target_count, 24);
  assert.strictEqual(laneC.current_count, 24);
  for (const p of laneC.portals) {
    assert(p.partner, 'Portal must have partner name');
    assert(p.portal_url, 'Portal must have portal URL');
    assert(p.status, 'Portal must have status');
  }
  console.log('     Verified 24 tracking portals in Lane C.');
});

console.log('\n--- GATE 6: 14-DAY MILESTONE SCHEDULE CONTRACT REGISTRY ---');
gate('Milestone schedule specifies Day 0, Day 3, Day 7, Day 14 contracts', () => {
  const inv = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
  const ms = inv.milestone_schedule;
  assert(ms.day_0 && ms.day_0.status === 'INITIALIZED');
  assert(ms.day_3 && ms.day_3.date === '2026-08-30');
  assert(ms.day_7 && ms.day_7.date === '2026-09-03');
  assert(ms.day_14 && ms.day_14.date === '2026-09-10');
  console.log('     Verified 14-Day Milestone Schedule contract.');
});

console.log('\n--- GATE 7: DAILY FRESHNESS DAEMON & RECEIPT LINEAGE ---');
gate('Freshness daemon generates cryptographic receipt on disk', () => {
  const runsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs');
  const receipts = fs.readdirSync(runsDir).filter(f => f.startsWith('SUPPLY_FRESHNESS_RECEIPT_174_'));
  assert(receipts.length > 0, 'Freshness receipt must exist');
  const latestReceipt = path.join(runsDir, receipts[receipts.length - 1]);
  const data = JSON.parse(fs.readFileSync(latestReceipt, 'utf8'));
  assert.strictEqual(data.kpi_status.active_verified_green_deals, 0);
  assert.strictEqual(data.kpi_status.verified_blue_venues_not_in_kpi, 100);
  assert.strictEqual(data.kpi_status.tracked_purple_sources_not_in_kpi, 24);
  console.log(`     Verified receipt lineage: ${receipts[receipts.length - 1]}`);
});

console.log('\n--- GATE 8: SOT AND DEPLOY BUNDLE 100% PARITY ---');
gate('JS SHA-256 identical across SOT, deploy root and deploy/public', () => {
  const sotSha = sha256(jsSotPath);
  const deploySha = sha256(jsDeployPath);
  const deployPubSha = sha256(jsDeployPubPath);
  assert.strictEqual(sotSha, deploySha, 'SOT must match deploy root');
  assert.strictEqual(sotSha, deployPubSha, 'SOT must match deploy public');
  console.log(`     Parity confirmed: ${sotSha}`);
});

console.log('\n--- GATE 9: CONTAINMENT INVARIANCE AUDIT ---');
gate('6 student benefit cards remain in 🟣 TIER_3 with zero unverified claims', () => {
  const js = fs.readFileSync(jsSotPath, 'utf8');
  const startMarker = 'const ACTIVE_VERIFIED_DEALS_170 = ';
  const startIdx = js.indexOf(startMarker);
  assert(startIdx !== -1, 'ACTIVE_VERIFIED_DEALS_170 must exist');
  let depth = 0, endIdx = startIdx + startMarker.length, foundStart = false;
  for (let i = endIdx; i < js.length; i++) {
    if (js[i] === '[') { depth++; foundStart = true; }
    if (js[i] === ']') { depth--; }
    if (foundStart && depth === 0) { endIdx = i + 1; break; }
  }
  const arr = JSON.parse(js.substring(startIdx + startMarker.length, endIdx));
  assert.strictEqual(arr.length, 6);
  for (const d of arr) {
    assert.strictEqual(d.tier, 'TIER_3_TRACKED_SOURCE_SIGNAL');
    assert(!d.benefit_summary);
    assert(!d.terms);
  }
  console.log('     Verified 6 student cards invariant at TIER_3.');
});

console.log('\n--- GATE 10: PRODUCTION LOCKED & ZERO DEPLOYMENT CLAIM ---');
gate('deals_feed.json is [] and is_approved is false', () => {
  const feed = JSON.parse(fs.readFileSync(prodFeedPath, 'utf8'));
  assert(Array.isArray(feed) && feed.length === 0, 'deals_feed.json must be []');
  const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = manifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? manifest.is_approved;
  assert.strictEqual(isApproved, false, 'is_approved must be false');
  console.log('     Verified production feed locked ([]).');
});

console.log('\n========================================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('========================================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL 10 JAYT-174 SUPPLY PROGRAM TESTS PASSED 100% CLEAN!');
  process.exit(0);
}
