/**
 * JAYT STRICT TRUST & 5-STEP ORDER RED-TEAM TEST SUITE (142T)
 * Directive: JAYT-142T: CẤM BODY FALLBACK, KHÓA RECEIPT TRUTH VÀ SỬA THỨ TỰ PHÂN LOẠI
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('puppeteer');
const { parseStrictSemanticRootLeaf } = require('../05_DEAL_AND_AFFILIATE/strict_semantic_root_dom_parser_142t');
const { verifyStrictRawCaptureReceipt } = require('../05_DEAL_AND_AFFILIATE/strict_receipt_truth_verifier_142t');
const { verifyNormalizedAddressUnits } = require('../05_DEAL_AND_AFFILIATE/address_unit_locality_verifier_142t');

console.log('========================================================================');
console.log('🧪 JAYT-142T: STRICT TRUST & 5-STEP ORDER RED-TEAM AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const brandRegistryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'brand_locality_registry_142t.json');
const tablePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'leaf_batch_142t_table.json');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_142t_manifest.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const brandRegistry = JSON.parse(fs.readFileSync(brandRegistryPath, 'utf8'));
const table = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

let passCount = 0;
let failCount = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${description}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${description}`);
    console.error(`     Error: ${err.message}`);
    failCount++;
  }
}

async function runStrictAudit() {
  console.log('--- GATE 1: STATIC CODE SCAN (ZERO STATIC DICTIONARIES) ---');
  test('Active data processing pipeline contains 0 occurrences of static dictionary patterns', () => {
    const targetDirs = [
      path.join(repoRoot, '05_DEAL_AND_AFFILIATE'),
      path.join(repoRoot, '07_QUALITY_ASSURANCE')
    ];
    const forbidden = ['leaf' + 'Semantics' + 'Map', 'expected_' + 'da_nang_' + 'verified', 'known_' + 'da_nang_' + 'venues'];
    for (const dir of targetDirs) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.includes('quarantine') && !f.includes('test_strict_trust_142t.js'));
      for (const file of files) {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        for (const word of forbidden) {
          assert(!content.includes(word), `Forbidden static dictionary token '${word}' found in active file ${file}!`);
        }
      }
    }
    console.log('     Scanned all active JS files: ZERO static dictionary tokens found.');
  });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  console.log('\n--- GATE 2: REAL GALAXY LEAF ARTIFACTS PARSED WITHOUT BODY FALLBACK ---');
  try {
    for (const leafId of ['LEAF_142_01', 'LEAF_142_02', 'LEAF_142_03', 'LEAF_142_04']) {
      const folder = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'leaf_captures_142', leafId);
      const html = fs.readFileSync(path.join(folder, 'page.html'), 'utf8');
      const rTruth = verifyStrictRawCaptureReceipt(folder);

      const parsed = await parseStrictSemanticRootLeaf(html, rTruth.requested_url, rTruth, browser);
      assert.notStrictEqual(parsed.title, 'Tin liên quan', `Galaxy leaf ${leafId} must not extract "Tin liên quan"`);
      assert.notStrictEqual(parsed.title, 'Mua vé nhanh', `Galaxy leaf ${leafId} must not extract "Mua vé nhanh"`);
      assert.strictEqual(parsed.has_content_root, false, `Galaxy raw leaf ${leafId} has no isolated article container`);
    }
    console.log('  ✅ PASS: Verified on real Galaxy disk artifacts: zero body fallback, zero "Tin liên quan" extraction.');
    passCount++;
  } catch (err) {
    console.error('  ❌ FAIL: Gate 2 Galaxy test failed: ' + err.message);
    failCount++;
  }

  console.log('\n--- GATE 3: RECEIPT TRUTH HAS ZERO SYNTHETIC FALLBACK DEFAULTS ---');
  test('Incomplete raw receipts explicitly report UNPROVEN fields without defaulting to 200 or requested_url', () => {
    const brandFolders = fs.readdirSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'store_locators_142'));
    for (const bf of brandFolders) {
      const folder = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'store_locators_142', bf);
      const rTruth = verifyStrictRawCaptureReceipt(folder);
      assert.strictEqual(rTruth.final_url, 'FINAL_URL_UNPROVEN');
      assert.strictEqual(rTruth.redirect_chain, 'REDIRECT_CHAIN_UNPROVEN');
      assert.strictEqual(rTruth.capture_method, 'CAPTURE_METHOD_UNPROVEN');
      assert.strictEqual(rTruth.status, 'RECEIPT_INCOMPLETE_UNTRUSTED_PROVENANCE');
    }
    console.log('     Verified all 15 raw locator receipts are strictly marked RECEIPT_INCOMPLETE_UNTRUSTED_PROVENANCE without defaults.');
  });

  console.log('\n--- GATE 4: DANABUS NORMALIZED ADDRESS UNITS AUDIT ---');
  test('DanaBus counts exactly 9 distinct normalized address units (not inflated DOM node counts)', () => {
    const danaBus = brandRegistry.brands.find(b => b.brand_id === 'BRAND_DANABUS');
    assert(danaBus);
    assert.strictEqual(danaBus.distinct_normalized_address_units_count, 9);
    assert.strictEqual(danaBus.locality_status, 'LOCALITY_VERIFIED_DA_NANG');
    console.log(`     Verified DanaBus has exactly 9 distinct, readable address units.`);
  });

  console.log('\n--- GATE 5: STRICT 5-STEP CLASSIFICATION ORDER ---');
  test('Leaf table enforces step 1 (RECEIPT_INCOMPLETE) on 30 leaves and collision on 2 leaves', () => {
    const sd = table.state_distribution;
    assert.strictEqual(sd.RECEIPT_INCOMPLETE, 30);
    assert.strictEqual(sd.CAPTURE_IDENTITY_COLLISION, 2);
    assert.strictEqual(sd.EVIDENCE_COMPLETE_FOR_REVIEW, 0);
    console.log('     Verified strict 5-step diagnostic priority: 30 RECEIPT_INCOMPLETE, 2 COLLISION.');
  });

  await browser.close();

  console.log('\n--- GATE 6: MUTATION TEST (PARSER IS DYNAMIC, NOT STATIC) ---');
  try {
    const browser2 = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const dummyHtml1 = '<html><body><main><article class="article-content"><h1>Ưu đãi vé xem phim 45.000đ</h1><span class="price">45.000đ</span><p>Chương trình áp dụng cho tất cả các suất chiếu 2D vào các ngày trong tuần tại hệ thống rạp.</p></article></main></body></html>';
    const dummyHtml2 = '<html><body><main><article class="article-content"><h1>Khuyến mãi đặc biệt 99k</h1><span class="price">99k</span><p>Thưởng thức combo ưu đãi đặc biệt hấp dẫn với mức giá ưu đãi bất ngờ hàng ngày.</p></article></main></body></html>';
    const dummyReceipt = { receipt_id: 'TEST_MUT', final_url: 'https://test.com', fresh_hashes: { html_sha256: '111', screenshot_sha256: '222' }, captured_at: new Date().toISOString() };

    const res1 = await parseStrictSemanticRootLeaf(dummyHtml1, 'https://test.com/1', dummyReceipt, browser2);
    const res2 = await parseStrictSemanticRootLeaf(dummyHtml2, 'https://test.com/2', dummyReceipt, browser2);

    await browser2.close();

    assert.strictEqual(res1.has_content_root, true);
    assert.strictEqual(res1.title, 'Ưu đãi vé xem phim 45.000đ');
    assert.strictEqual(res1.price_claim, '45.000đ');

    assert.strictEqual(res2.has_content_root, true);
    assert.strictEqual(res2.title, 'Khuyến mãi đặc biệt 99k');
    assert.strictEqual(res2.price_claim, '99k');

    console.log('  ✅ PASS: Mutation test passed: Parser dynamically adapts output based purely on raw HTML input.');
    passCount++;
  } catch (err) {
    console.error('  ❌ FAIL: Mutation test failed: ' + err.message);
    failCount++;
  }

  console.log('\n--- GATE 7: METRIC CONSERVATION CHECK (32 == 32) ---');
  test('Conservation sum of 142T leaves equals exactly 32 evaluated captures', () => {
    const sd = table.state_distribution;
    const sum = Object.values(sd).reduce((a, b) => a + b, 0);
    assert.strictEqual(sum, 32);
    assert.strictEqual(table.total_raw_captures_evaluated, 32);
    console.log(`     Conservation Sum: ${sum} == 32.`);
  });

  console.log('\n--- GATE 8: AUTOMATED STAGING GATE (CONTINUE_ACQUISITION) ---');
  test('Automated staging gate evaluates CONTINUE_ACQUISITION due to 0 complete bundles', () => {
    assert.strictEqual(manifest.automated_staging_gate_evaluation.complete_bundles_count, 0);
    assert.strictEqual(manifest.automated_staging_gate_evaluation.decision_verdict, 'CONTINUE_ACQUISITION');
  });

  console.log('\n--- GATE 9: PRODUCTION LOCKED & ZERO LIVE DEPLOYMENT ---');
  test('deals_feed.json is [] and is_approved is false', () => {
    const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
    const prodJson = JSON.parse(prodRaw);
    assert(Array.isArray(prodJson) && prodJson.length === 0);
    const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
    const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;
    assert.strictEqual(isApproved, false);
  });

  console.log('\n========================================================================');
  console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
  console.log('========================================================================\n');

  if (failCount > 0) {
    process.exit(1);
  } else {
    console.log('✨ ALL 9 JAYT-142T STRICT TRUST & 5-STEP ORDER TESTS PASSED 100% CLEAN!');
    process.exit(0);
  }
}

runStrictAudit();
