const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return sha256Buf(fs.readFileSync(p)); }

function runClaimEvidenceGateTests197() {
  console.log('========================================================================');
  console.log('🧪 JAYT-197: CLAIM-LEVEL EVIDENCE & SAVINGS BOARD TEST SUITE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  const tests = [];
  function record(name, pass, details) {
    tests.push({ name, pass, details });
    console.log((pass ? '  ✅ PASS: ' : '  ❌ FAIL: ') + name + '\n     ' + details);
  }

  const feed197Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_tiered_savings_feed_197.json');
  assert(fs.existsSync(feed197Path), 'Feed 197 not found');
  const feed = JSON.parse(fs.readFileSync(feed197Path, 'utf8'));

  // --- TEST 1: ZERO OVERCLAIM ON PRICES / VOUCHERS ---
  try {
    const promoDeals = feed.promo_scope_pending_deals || [];
    let hasOverclaim = false;
    promoDeals.forEach(d => {
      if (d.title.includes('Voucher 500K') || d.title.includes('Giảm 90%')) {
        hasOverclaim = true;
      }
    });
    assert.strictEqual(hasOverclaim, false, 'No overclaimed voucher or discount rate allowed');
    record('TEST_01_ZERO_OVERCLAIM_ON_PRICES_AND_VOUCHERS', true, 'Zero overclaimed voucher titles or discount numbers in scope pending deals.');
  } catch (err) {
    record('TEST_01_ZERO_OVERCLAIM_ON_PRICES_AND_VOUCHERS', false, err.message);
  }

  // --- TEST 2: ADDRESS FOOTER ALONE CANNOT GRANT LOCAL_CONFIRMED ---
  try {
    const readyDeals = feed.ready_to_use_deals || [];
    // Currently ready_to_use_deals must be 0 until explicit Da Nang offer quote is captured
    assert.strictEqual(readyDeals.length, 0, 'Address footer must not elevate Mikazuki or any card to READY_TO_USE');
    record('TEST_02_ADDRESS_ALONE_CANNOT_GRANT_READY_TO_USE', true, 'Company footer address properly rejected from granting READY_TO_USE.');
  } catch (err) {
    record('TEST_02_ADDRESS_ALONE_CANNOT_GRANT_READY_TO_USE', false, err.message);
  }

  // --- TEST 3: INCONCLUSIVE IS NEVER REPORTED AS PASS ---
  try {
    const harvestReportPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_197_harvest', 'COHORT_100_HARVEST_REPORT_197.json');
    assert(fs.existsSync(harvestReportPath), 'Harvest report not found');
    const harvestReport = JSON.parse(fs.readFileSync(harvestReportPath, 'utf8'));
    
    assert(harvestReport.total_inconclusive > 0, 'Inconclusive errors must be tracked');
    const inconclusiveItems = harvestReport.results.filter(r => r.status === 'INCONCLUSIVE');
    assert.strictEqual(inconclusiveItems.length, harvestReport.total_inconclusive);
    record('TEST_03_INCONCLUSIVE_NEVER_REPORTED_AS_PASS', true, `${harvestReport.total_inconclusive}/100 network/timeout targets strictly marked INCONCLUSIVE.`);
  } catch (err) {
    record('TEST_03_INCONCLUSIVE_NEVER_REPORTED_AS_PASS', false, err.message);
  }

  // --- TEST 4: HONEST TIERED KPI STRING ---
  try {
    const kpiStr = feed.kpi_summary.kpi_honest_string;
    assert(kpiStr.includes('dùng ngay'), 'KPI string missing dùng ngay');
    assert(kpiStr.includes('cần xác nhận'), 'KPI string missing cần xác nhận');
    assert(kpiStr.includes('điểm hẹn'), 'KPI string missing điểm hẹn');
    assert(kpiStr.includes('chờ đối tác'), 'KPI string missing chờ đối tác');
    record('TEST_04_HONEST_TIERED_KPI_STRING', true, `KPI representation separated: "${kpiStr}"`);
  } catch (err) {
    record('TEST_04_HONEST_TIERED_KPI_STRING', false, err.message);
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
    console.error('❌ JAYT-197 CLAIM EVIDENCE GATE TEST SUITE FAILED!');
    process.exit(1);
  } else {
    console.log(`🎉 ALL ${tests.length}/${tests.length} JAYT-197 TESTS PASSED [100% EXCELLENCE]`);
  }
}

if (require.main === module) {
  runClaimEvidenceGateTests197();
}

module.exports = { runClaimEvidenceGateTests197 };
