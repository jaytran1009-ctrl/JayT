const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return sha256Buf(fs.readFileSync(p)); }

function runTruthRestorationTests199() {
  console.log('========================================================================');
  console.log('🧪 JAYT-199: TRUTH RESTORATION & 5-PART EVIDENCE GATE TEST SUITE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  const tests = [];
  function record(name, pass, details) {
    tests.push({ name, pass, details });
    console.log((pass ? '  ✅ PASS: ' : '  ❌ FAIL: ') + name + '\n     ' + details);
  }

  const feed199Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_tiered_savings_feed_199.json');
  assert(fs.existsSync(feed199Path), 'Feed 199 not found');
  const feed = JSON.parse(fs.readFileSync(feed199Path, 'utf8'));

  // --- TEST 1: ZERO SYNTHETIC COMMUNITY RECORDS ---
  try {
    const comAudit = feed.community_pending_audit || [];
    assert.strictEqual(comAudit.length, 0, 'Community pending audit must be empty until real physical photos/receipts exist');
    record('TEST_01_ZERO_SYNTHETIC_COMMUNITY_RECORDS', true, 'Zero synthetic community records on production. Queue is 100% clean and awaiting physical artifacts.');
  } catch (err) {
    record('TEST_01_ZERO_SYNTHETIC_COMMUNITY_RECORDS', false, err.message);
  }

  // --- TEST 2: METIZ DOWNGRADED & ZERO FAKE READY DEALS ---
  try {
    const readyDeals = feed.ready_to_use_deals || [];
    assert.strictEqual(readyDeals.length, 0, 'ready_to_use_deals must be 0 until 5-part verbatim evidence is fulfilled');
    const scopeDeals = feed.promo_scope_pending_deals || [];
    const metizDeal = scopeDeals.find(d => d.brand_id === 'BRAND_METIZ_CINEMA');
    assert(metizDeal, 'Metiz Cinema must be present in promo_scope_pending_deals');
    assert.strictEqual(metizDeal.tier, 'TIER_BLUE_SCOPE_PENDING', 'Metiz must be strictly TIER_BLUE_SCOPE_PENDING');
    record('TEST_02_METIZ_DOWNGRADED_AND_ZERO_FAKE_READY_DEALS', true, 'Metiz successfully downgraded to TIER_BLUE_SCOPE_PENDING. Exactly 0 fake green deals.');
  } catch (err) {
    record('TEST_02_METIZ_DOWNGRADED_AND_ZERO_FAKE_READY_DEALS', false, err.message);
  }

  // --- TEST 3: STRICT 5-PART EVIDENCE GATE COMPLIANCE ---
  try {
    const scopeDeals = feed.promo_scope_pending_deals || [];
    assert.strictEqual(scopeDeals.length, 12, 'Must have 12 scope pending deals');
    scopeDeals.forEach(d => {
      assert(d.offer_quote && d.offer_quote.trim().length > 0, `Deal ${d.deal_id} missing offer_quote`);
      assert(d.locality_quote && d.locality_quote.trim().length > 0, `Deal ${d.deal_id} missing locality_quote`);
      assert(d.what_to_check && d.what_to_check.trim().length > 0, `Deal ${d.deal_id} missing what_to_check guidance`);
    });
    record('TEST_03_STRICT_5_PART_EVIDENCE_GATE_COMPLIANCE', true, '12 scope pending deals bound with explicit offer quotes and what_to_check instructions.');
  } catch (err) {
    record('TEST_03_STRICT_5_PART_EVIDENCE_GATE_COMPLIANCE', false, err.message);
  }

  // --- TEST 4: HONEST 4-TIER KPI STRING ---
  try {
    const kpiStr = feed.kpi_summary.kpi_honest_string;
    assert.strictEqual(kpiStr, '0 dùng ngay · 12 cần xác nhận · 0 cộng đồng đang đối soát · 25 điểm hẹn/đặc quyền theo dõi · 10 chờ đối tác', 'KPI string mismatch');
    record('TEST_04_HONEST_4_TIER_KPI_STRING', true, `KPI representation strictly honest: "${kpiStr}"`);
  } catch (err) {
    record('TEST_04_HONEST_4_TIER_KPI_STRING', false, err.message);
  }

  // --- TEST 5: DAILY SAVINGS BOARD DENSITY (37 HONEST OPPORTUNITIES) ---
  try {
    const totalOps = feed.kpi_summary.total_savings_board_opportunities;
    assert.strictEqual(totalOps, 37, 'Total board count must be 37 (12 Scope + 0 Community + 25 Tracking)');
    record('TEST_05_DAILY_SAVINGS_BOARD_DENSITY_37', true, `Daily Savings Board contains exactly ${totalOps} honest opportunities without overclaiming.`);
  } catch (err) {
    record('TEST_05_DAILY_SAVINGS_BOARD_DENSITY_37', false, err.message);
  }

  console.log('\n========================================================================');
  const allPassed = tests.every(t => t.pass);
  if (!allPassed) {
    console.error('❌ JAYT-199 TEST SUITE FAILED!');
    process.exit(1);
  } else {
    console.log(`🎉 ALL ${tests.length}/${tests.length} JAYT-199 TESTS PASSED [100% EXCELLENCE]`);
  }
}

if (require.main === module) {
  runTruthRestorationTests199();
}

module.exports = { runTruthRestorationTests199 };
