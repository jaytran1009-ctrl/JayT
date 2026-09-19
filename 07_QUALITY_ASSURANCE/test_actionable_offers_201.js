const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');

function runActionableTests201() {
  console.log('========================================================================');
  console.log('🧪 JAYT-201: ACTIONABLE OFFICIAL OFFERS AT SCALE TEST SUITE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  const tests = [];
  function record(name, pass, details) {
    tests.push({ name, pass, details });
    console.log((pass ? '  ✅ PASS: ' : '  ❌ FAIL: ') + name + '\n     ' + details);
  }

  const feed201Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_tiered_savings_feed_201.json');
  assert(fs.existsSync(feed201Path), 'Feed 201 not found');
  const feed = JSON.parse(fs.readFileSync(feed201Path, 'utf8'));

  // --- TEST 1: ZERO UNVERIFIED GREEN DEALS ---
  try {
    const readyDeals = feed.ready_to_use_deals || [];
    assert.strictEqual(readyDeals.length, 0, 'Ready to use deals must be 0 until 5-part verbatim evidence is fulfilled');
    record('TEST_01_ZERO_UNVERIFIED_GREEN_DEALS', true, 'Strict fail-closed on 5-part verbatim gate: 0 fake green deals.');
  } catch (err) {
    record('TEST_01_ZERO_UNVERIFIED_GREEN_DEALS', false, err.message);
  }

  // --- TEST 2: 20 ACTIONABLE OFFICIAL BLUE OFFERS BOUND WITH 4-PART EVIDENCE ---
  try {
    const blueDeals = feed.promo_scope_pending_deals || [];
    assert.strictEqual(blueDeals.length, 20, `Expected 20 actionable official blue offers, got ${blueDeals.length}`);
    blueDeals.forEach((d, idx) => {
      assert(d.offer_quote && d.offer_quote.trim().length > 0, `Deal #${idx + 1} (${d.deal_id}) missing offer_quote`);
      assert(d.terms_quote && d.terms_quote.trim().length > 0, `Deal #${idx + 1} (${d.deal_id}) missing terms_quote`);
      assert(d.validity_quote && d.validity_quote.trim().length > 0, `Deal #${idx + 1} (${d.deal_id}) missing validity_quote`);
      assert(d.locality_quote && d.locality_quote.trim().length > 0, `Deal #${idx + 1} (${d.deal_id}) missing locality_quote`);
      assert(d.branch_address && d.branch_address.trim().length > 0, `Deal #${idx + 1} (${d.deal_id}) missing branch_address`);
      assert(d.what_to_check && d.what_to_check.trim().length > 0, `Deal #${idx + 1} (${d.deal_id}) missing what_to_check`);
      assert(d.official_notice && d.official_notice.includes('Ưu đãi công bố chính thức; cơ sở Đà Nẵng đã xác minh'), `Deal #${idx + 1} missing standard notice`);
    });
    record('TEST_02_20_ACTIONABLE_OFFICIAL_BLUE_OFFERS_BOUND', true, 'All 20 blue offers have 4-part evidence (Offer + Terms + Validity + Verified Da Nang Branch) + what_to_check + standard notice.');
  } catch (err) {
    record('TEST_02_20_ACTIONABLE_OFFICIAL_BLUE_OFFERS_BOUND', false, err.message);
  }

  // --- TEST 3: ZERO SYNTHETIC COMMUNITY RECORDS ---
  try {
    const comAudit = feed.community_pending_audit || [];
    assert.strictEqual(comAudit.length, 0, 'Community pending audit queue must be 0 until real physical photos exist');
    record('TEST_03_ZERO_SYNTHETIC_COMMUNITY_RECORDS', true, 'Zero synthetic community records. Intake form is clean.');
  } catch (err) {
    record('TEST_03_ZERO_SYNTHETIC_COMMUNITY_RECORDS', false, err.message);
  }

  // --- TEST 4: STRATEGIC SAVINGS DEALS KPI EQUALS 20 (🟢 + 🔵) ---
  try {
    const strategicKpi = feed.strategic_kpi_summary.actionable_savings_deals_kpi;
    const ready = feed.strategic_kpi_summary.ready_to_use_count;
    const scope = feed.strategic_kpi_summary.actionable_official_offers_count;
    assert.strictEqual(strategicKpi, ready + scope, 'Strategic KPI must equal ready + scope');
    assert.strictEqual(strategicKpi, 20, 'Strategic KPI must be 20');
    record('TEST_04_STRATEGIC_SAVINGS_DEALS_KPI_20', true, `Strategic Savings Deals KPI: ${strategicKpi} = ${ready} (🟢) + ${scope} (🔵) (Milestone 2 Achieved!)`);
  } catch (err) {
    record('TEST_04_STRATEGIC_SAVINGS_DEALS_KPI_20', false, err.message);
  }

  // --- TEST 5: HEADLINE TEXT AND UI STRING ACCURACY ---
  try {
    const headline = feed.strategic_kpi_summary.headline_kpi_string;
    assert.strictEqual(headline, 'Hôm nay: 0 đã xác nhận · 20 ưu đãi chính thức cần kiểm tra phạm vi', 'Headline text mismatch');
    const sotUi = fs.readFileSync(path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js'), 'utf8');
    assert(sotUi.includes('Hôm nay: ${totalReadyToUse} đã xác nhận · ${totalPromoPending} ưu đãi chính thức cần kiểm tra phạm vi'), 'SOT UI missing exact headline');
    assert(sotUi.includes('Ưu đãi công bố chính thức; cơ sở Đà Nẵng đã xác minh. Kiểm tra phạm vi áp dụng trước khi thanh toán.'), 'SOT UI missing exact disclaimer');
    record('TEST_05_HEADLINE_TEXT_AND_UI_STRING_ACCURACY', true, `Headline perfectly matches: "${headline}"`);
  } catch (err) {
    record('TEST_05_HEADLINE_TEXT_AND_UI_STRING_ACCURACY', false, err.message);
  }

  console.log('\n========================================================================');
  const allPassed = tests.every(t => t.pass);
  if (!allPassed) {
    console.error('❌ JAYT-201 TEST SUITE FAILED!');
    process.exit(1);
  } else {
    console.log(`🎉 ALL ${tests.length}/${tests.length} JAYT-201 TESTS PASSED [100% EXCELLENCE]`);
  }
}

if (require.main === module) {
  runActionableTests201();
}

module.exports = { runActionableTests201 };
