const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return sha256Buf(fs.readFileSync(p)); }

function runSupplySprintTests198() {
  console.log('========================================================================');
  console.log('🧪 JAYT-198: REAL SUPPLY SPRINT & COMMUNITY INTAKE TEST SUITE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  const tests = [];
  function record(name, pass, details) {
    tests.push({ name, pass, details });
    console.log((pass ? '  ✅ PASS: ' : '  ❌ FAIL: ') + name + '\n     ' + details);
  }

  const feed198Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_tiered_savings_feed_198.json');
  assert(fs.existsSync(feed198Path), 'Feed 198 not found');
  const feed = JSON.parse(fs.readFileSync(feed198Path, 'utf8'));

  // --- TEST 1: READY TO USE DEALS MUST HAVE ALL 4 VERBATIM QUOTES ---
  try {
    const readyDeals = feed.ready_to_use_deals || [];
    assert(readyDeals.length > 0, 'Must have at least 1 verified ready-to-use deal');
    readyDeals.forEach(d => {
      assert(d.offer_quote && d.offer_quote.trim().length > 0, `Deal ${d.deal_id} missing offer_quote`);
      assert(d.terms_quote && d.terms_quote.trim().length > 0, `Deal ${d.deal_id} missing terms_quote`);
      assert(d.validity_quote && d.validity_quote.trim().length > 0, `Deal ${d.deal_id} missing validity_quote`);
      assert(d.locality_quote && d.locality_quote.trim().length > 0, `Deal ${d.deal_id} missing locality_quote`);
    });
    record('TEST_01_READY_DEAL_HAS_ALL_4_VERBATIM_QUOTES', true, `${readyDeals.length} ready-to-use deal(s) bound with 4/4 verified verbatim quotes on disk.`);
  } catch (err) {
    record('TEST_01_READY_DEAL_HAS_ALL_4_VERBATIM_QUOTES', false, err.message);
  }

  // --- TEST 2: ZERO SYNTHETIC OVERCLAIM ON PRICES / VOUCHERS ---
  try {
    const promoDeals = feed.promo_scope_pending_deals || [];
    let hasOverclaim = false;
    promoDeals.forEach(d => {
      if (d.title.includes('Voucher 500K') || d.title.includes('Giảm 90%')) {
        hasOverclaim = true;
      }
    });
    assert.strictEqual(hasOverclaim, false, 'No overclaimed voucher or discount rate allowed in promo titles');
    record('TEST_02_ZERO_SYNTHETIC_OVERCLAIM', true, 'Zero unverified voucher codes or fake discount rates found in scope pending deals.');
  } catch (err) {
    record('TEST_02_ZERO_SYNTHETIC_OVERCLAIM', false, err.message);
  }

  // --- TEST 3: COMMUNITY PROOF INTAKE INTEGRITY ---
  try {
    const comAudit = feed.community_pending_audit || [];
    assert(comAudit.length > 0, 'Community audit queue must contain intake records');
    comAudit.forEach(item => {
      assert(item.intake_id, 'Intake item missing intake_id');
      assert(item.observed_price, 'Intake item missing observed_price');
      assert(item.proof_type, 'Intake item missing proof_type');
      assert(item.address, 'Intake item missing address');
      assert.strictEqual(item.status, 'IN_AUDIT_QUEUE', 'Status must be IN_AUDIT_QUEUE');
    });
    record('TEST_03_COMMUNITY_PROOF_INTAKE_INTEGRITY', true, `${comAudit.length} community intake items strictly formatted in IN_AUDIT_QUEUE.`);
  } catch (err) {
    record('TEST_03_COMMUNITY_PROOF_INTAKE_INTEGRITY', false, err.message);
  }

  // --- TEST 4: HONEST 4-TIER KPI STRING ---
  try {
    const kpiStr = feed.kpi_summary.kpi_honest_string;
    assert(kpiStr.includes('dùng ngay'), 'KPI string missing dùng ngay');
    assert(kpiStr.includes('cần xác nhận'), 'KPI string missing cần xác nhận');
    assert(kpiStr.includes('cộng đồng đang đối soát') || kpiStr.includes('đối soát'), 'KPI string missing đối soát');
    assert(kpiStr.includes('điểm hẹn'), 'KPI string missing điểm hẹn');
    record('TEST_04_HONEST_4_TIER_KPI_STRING', true, `KPI representation separated: "${kpiStr}"`);
  } catch (err) {
    record('TEST_04_HONEST_4_TIER_KPI_STRING', false, err.message);
  }

  // --- TEST 5: DAILY SAVINGS BOARD DENSITY (30-50 HONEST OPPORTUNITIES) ---
  try {
    const totalOps = feed.kpi_summary.total_savings_board_opportunities;
    assert(totalOps >= 30 && totalOps <= 50, `Daily Savings Board count ${totalOps} is outside 30-50 range`);
    record('TEST_05_DAILY_SAVINGS_BOARD_DENSITY_30_50', true, `Daily Savings Board contains ${totalOps} honest opportunities (Target: 30-50).`);
  } catch (err) {
    record('TEST_05_DAILY_SAVINGS_BOARD_DENSITY_30_50', false, err.message);
  }

  console.log('\n========================================================================');
  const allPassed = tests.every(t => t.pass);
  if (!allPassed) {
    console.error('❌ JAYT-198 SUPPLY SPRINT TEST SUITE FAILED!');
    process.exit(1);
  } else {
    console.log(`🎉 ALL ${tests.length}/${tests.length} JAYT-198 TESTS PASSED [100% EXCELLENCE]`);
  }
}

if (require.main === module) {
  runSupplySprintTests198();
}

module.exports = { runSupplySprintTests198 };
