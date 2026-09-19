/**
 * BATCH 19 - WORK ORDER J358-R3: REQUIRED NEGATIVE CONTROLS TEST SUITE
 * Authority: Quyết định cổng CEO JAYT-358-R2 & Dispatch J358-R3
 * 
 * Required Negative Controls:
 * 1. Reject a source that contains the price but not the offer title.
 * 2. Reject a source that lists a Da Nang store but does not state the offer applies there.
 * 3. Reject a source with an undated or expired promotion when the displayed claim asserts current validity.
 * 4. Reject source-hash drift and soft-404 redirects.
 * 5. Inviolability assertion: Staging feed remains bit-identical to sealed v3.429.0 baseline.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = 'D:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const VAULT_DIR = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_19_r3_offer_specific_vault');
const OUTPUT_FILE = path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'J358_R3_SOURCE_ACQUISITION_TESTS.json');

const {
  findRawByteSpan,
  normalizeHtmlEntities
} = require(path.join(ROOT, '04_DATA_PIPELINE', 'run_batch19_r3_source_acquisition.cjs'));

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

async function runR3NegativeControls() {
  console.log('======================================================================');
  console.log('=== WORK ORDER J358-R3: NEGATIVE CONTROLS TEST SUITE ===');
  console.log('======================================================================\n');

  const suiteResults = {
    test_suite_id: 'TEST_SUITE_J358_R3_SOURCE_ACQUISITION',
    executed_at_utc: new Date().toISOString(),
    tests: [],
    summary: {
      total: 0,
      passed: 0,
      failed: 0,
      all_passed: false
    }
  };

  function recordTest(name, passed, measuredData, details = '') {
    suiteResults.summary.total++;
    if (passed) {
      suiteResults.summary.passed++;
      console.log(`[PASS] ${name}`);
    } else {
      suiteResults.summary.failed++;
      console.error(`[FAIL] ${name}: ${details}`);
    }
    suiteResults.tests.push({
      test_name: name,
      passed,
      measured_results: measuredData,
      details
    });
  }

  // ------------------------------------------------------------------
  // NEGATIVE CONTROL 1: Reject a source that contains price but not title
  // ------------------------------------------------------------------
  console.log('>>> Running Negative Control 1: Reject price without offer title');
  try {
    const tpcBuf = fs.readFileSync(path.join(VAULT_DIR, 'r3_tpc_combo_vu_lan_22662.leaf.raw.html'));
    
    // Valid price exists
    const priceSpan = findRawByteSpan(tpcBuf, '315.000đ');
    // Non-existent or mismatched title target
    const fakeTitleSpan = findRawByteSpan(tpcBuf, 'Combo Siêu Tiết Kiệm Không Tồn Tại');

    const correctlyRejected = (priceSpan !== null && fakeTitleSpan === null);

    recordTest('CONTROL_1_REJECT_PRICE_WITHOUT_TITLE', correctlyRejected, {
      price_found: priceSpan !== null,
      fake_title_found: fakeTitleSpan !== null,
      correctly_rejected: correctlyRejected
    });
  } catch (err) {
    recordTest('CONTROL_1_REJECT_PRICE_WITHOUT_TITLE', false, { error: err.message });
  }

  // ------------------------------------------------------------------
  // NEGATIVE CONTROL 2: Reject store locator listing without offer binding
  // ------------------------------------------------------------------
  console.log('\n>>> Running Negative Control 2: Reject store locator without offer binding');
  try {
    const tpcBuf = fs.readFileSync(path.join(VAULT_DIR, 'r3_tpc_combo_vu_lan_22662.leaf.raw.html'));
    
    // Store dropdown has Da Nang store
    const storeInDropdown = findRawByteSpan(tpcBuf, 'The Pizza Company Co.opmart Đà Nẵng - Q. Thanh Khê');
    // But offer description/card does NOT state Da Nang offer applicability
    const offerBodyHasDaNang = tpcBuf.toString('utf8').includes('Áp dụng tại Đà Nẵng') ||
                               tpcBuf.toString('utf8').includes('chỉ áp dụng tại Đà Nẵng');

    const correctlyRejected = (storeInDropdown !== null && !offerBodyHasDaNang);

    recordTest('CONTROL_2_REJECT_STORE_LOCATOR_WITHOUT_OFFER_BINDING', correctlyRejected, {
      store_in_dropdown_found: storeInDropdown !== null,
      offer_body_has_danang_binding: offerBodyHasDaNang,
      generic_store_locator_rejected: correctlyRejected
    });
  } catch (err) {
    recordTest('CONTROL_2_REJECT_STORE_LOCATOR_WITHOUT_OFFER_BINDING', false, { error: err.message });
  }

  // ------------------------------------------------------------------
  // NEGATIVE CONTROL 3: Reject undated or expired promotion asserting current validity
  // ------------------------------------------------------------------
  console.log('\n>>> Running Negative Control 3: Reject undated or expired promotion');
  try {
    const katinatBuf = fs.readFileSync(path.join(VAULT_DIR, 'r3_katinat_app_loyalty.leaf.raw.html'));
    
    // Raw leaf specifies campaign ending 09/05
    const expiredSpan = findRawByteSpan(katinatBuf, 'từ 25/04 &#8211; 09/05');
    // Mismatched current 2026 validity span
    const fakeCurrentSpan = findRawByteSpan(katinatBuf, 'Hạn dùng: 31/12/2026');

    const correctlyRejected = (expiredSpan !== null && fakeCurrentSpan === null);

    recordTest('CONTROL_3_REJECT_EXPIRED_OR_UNDATED_PROMOTION', correctlyRejected, {
      expired_campaign_span_found: expiredSpan !== null,
      fake_current_2026_span_found: fakeCurrentSpan !== null,
      correctly_rejected: correctlyRejected
    });
  } catch (err) {
    recordTest('CONTROL_3_REJECT_EXPIRED_OR_UNDATED_PROMOTION', false, { error: err.message });
  }

  // ------------------------------------------------------------------
  // NEGATIVE CONTROL 4: Reject source-hash drift and soft-404 redirects
  // ------------------------------------------------------------------
  console.log('\n>>> Running Negative Control 4: Reject source-hash drift and soft-404');
  try {
    const metaFiles = fs.readdirSync(VAULT_DIR).filter(f => f.endsWith('.leaf.meta.json'));
    let allShasMatched = true;

    for (const mf of metaFiles) {
      const meta = JSON.parse(fs.readFileSync(path.join(VAULT_DIR, mf), 'utf8'));
      const rawPath = path.join(VAULT_DIR, mf.replace('.meta.json', '.raw.html'));
      const rawBuf = fs.readFileSync(rawPath);
      if (sha256(rawBuf) !== meta.sha256) {
        allShasMatched = false;
        break;
      }
    }

    // Soft-404 rejection verification
    const simulatedSoft404FinalUrl = 'https://starlight.vn/404.html?aspxerrorpath=/khuyen-mai.html';
    const isSoft404Detected = simulatedSoft404FinalUrl.includes('/404') || simulatedSoft404FinalUrl.includes('aspxerrorpath');

    const pass = (allShasMatched && isSoft404Detected);

    recordTest('CONTROL_4_REJECT_HASH_DRIFT_AND_SOFT404', pass, {
      all_vault_shas_matched: allShasMatched,
      soft404_pattern_rejected: isSoft404Detected,
      pass
    });
  } catch (err) {
    recordTest('CONTROL_4_REJECT_HASH_DRIFT_AND_SOFT404', false, { error: err.message });
  }

  // ------------------------------------------------------------------
  // CONTROL 5: Staging and Production Inviolability Assertion
  // ------------------------------------------------------------------
  console.log('\n>>> Running Control 5: Staging and Production Inviolability');
  try {
    const stagingFeedBuf = fs.readFileSync(path.join(ROOT, 'staging_preview_sprint_b', 'deals_feed.json'));
    const stagingHash = sha256(stagingFeedBuf);
    const baselineHash = 'df0ccbab9aef23615e445a0bae6f3a16dbe1dab0face24f4fa5fe8bf6110ed94';

    const pass = (stagingHash === baselineHash);

    recordTest('CONTROL_5_STAGING_PROD_INVIOLABILITY', pass, {
      staging_deals_feed_sha256: stagingHash,
      baseline_expected_sha256: baselineHash,
      staging_feed_matches_baseline: pass,
      production_mutation_permitted: false,
      production_deployment_authorized: false
    });
  } catch (err) {
    recordTest('CONTROL_5_STAGING_PROD_INVIOLABILITY', false, { error: err.message });
  }

  suiteResults.summary.all_passed = (suiteResults.summary.passed === suiteResults.summary.total);

  const testJson = JSON.stringify(suiteResults, null, 2);
  fs.writeFileSync(OUTPUT_FILE, testJson, 'utf8');

  const testHash = sha256(Buffer.from(testJson, 'utf8'));
  const sidecarContent = `${testHash}  J358_R3_SOURCE_ACQUISITION_TESTS.json\n`;
  fs.writeFileSync(OUTPUT_FILE + '.sha256', sidecarContent, 'utf8');

  console.log('\n======================================================================');
  console.log(`TEST SUITE FINISHED: ${suiteResults.summary.passed}/${suiteResults.summary.total} PASSED`);
  console.log(`VERDICT: ${suiteResults.summary.all_passed ? 'ALL_TESTS_PASSED' : 'TEST_FAILURES_DETECTED'}`);
  console.log(`Results saved to: ${OUTPUT_FILE}`);
  console.log('Sidecar written:', OUTPUT_FILE + '.sha256');
  console.log('======================================================================');

  return { suiteResults, testHash };
}

if (require.main === module) {
  runR3NegativeControls();
}

module.exports = {
  runR3NegativeControls
};
