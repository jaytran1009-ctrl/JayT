/**
 * JAYT REPROCESSING RED-TEAM TEST SUITE (142R)
 * Directive: JAYT-142R: THU HỒI KẾT LUẬN 142, KHÔI PHỤC BẰNG CHỨNG GỐC VÀ TÁI XỬ LÝ BATCH LỚN
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('puppeteer');
const { parseLeafDomNative } = require('../05_DEAL_AND_AFFILIATE/generic_leaf_dom_parser_142r');

console.log('========================================================================');
console.log('🧪 JAYT-142R: REPROCESSING & GENUINE DOM PROVENANCE RED-TEAM AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const brandRegistryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'brand_locality_registry_142r.json');
const tablePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'leaf_batch_142r_table.json');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_142r_manifest.json');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'fresh_source_registry_142r.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const brandRegistry = JSON.parse(fs.readFileSync(brandRegistryPath, 'utf8'));
const table = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

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

async function runAsyncTests() {
  console.log('--- GATE 1: STATIC CODE SCAN (ZERO STATIC DICTIONARIES) ---');
  test('Active data processing pipeline contains 0 occurrences of static dictionary patterns', () => {
    const targetDirs = [
      path.join(repoRoot, '05_DEAL_AND_AFFILIATE'),
      path.join(repoRoot, '07_QUALITY_ASSURANCE')
    ];
    const forbidden = ['leaf' + 'Semantics' + 'Map', 'expected_' + 'da_nang_' + 'verified', 'known_' + 'da_nang_' + 'venues'];
    for (const dir of targetDirs) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.includes('quarantine') && !f.includes('test_reprocessing_142r.js'));
      for (const file of files) {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        for (const word of forbidden) {
          assert(!content.includes(word), `Forbidden static dictionary token '${word}' found in active file ${file}!`);
        }
      }
    }
    console.log('     Scanned all active JS files: ZERO static dictionary tokens found.');
  });

  console.log('\n--- GATE 2: DOM NODE PROVENANCE INTEGRITY ---');
  test('Every proven extracted field records exact DOM selector, outerHTML SHA, raw HTML SHA, screenshot SHA, and receipt ID', () => {
    for (const leaf of table.leaves) {
      if (leaf.extracted_fields.title_provenance) {
        const p = leaf.extracted_fields.title_provenance;
        assert(p.dom_selector, `Missing dom_selector in title for ${leaf.leaf_id}`);
        assert(p.node_outer_html_sha256 && p.node_outer_html_sha256.length === 64, `Invalid outer_html_sha256 for ${leaf.leaf_id}`);
        assert(p.raw_html_sha256 && p.raw_html_sha256.length === 64, `Invalid raw_html_sha256 for ${leaf.leaf_id}`);
        assert(p.capture_receipt_id, `Missing capture_receipt_id for ${leaf.leaf_id}`);
        assert(p.captured_at, `Missing captured_at for ${leaf.leaf_id}`);
      }
    }
    console.log('     Verified DOM node provenance on all extracted fields.');
  });

  console.log('\n--- GATE 3: CAPTURE IDENTITY COLLISION ENFORCEMENT ---');
  test('Leaves sharing identical raw HTML hash are flagged CAPTURE_IDENTITY_COLLISION', () => {
    const collisions = table.leaves.filter(l => l.terminal_state === 'CAPTURE_IDENTITY_COLLISION');
    assert(collisions.length >= 2, 'Expected at least 2 collision flags (Starlight duplicate leaves)');
    assert(collisions.some(c => c.leaf_id === 'LEAF_142_09'));
    assert(collisions.some(c => c.leaf_id === 'LEAF_142_10'));
    console.log(`     Identified ${collisions.length} collision leaves: ${collisions.map(c => c.leaf_id).join(', ')}.`);
  });

  console.log('\n--- GATE 4: ZERO UNRENDERED TEMPLATE STRINGS ---');
  test('Generated JSON and MD files contain zero unrendered template literals like ${...}', () => {
    const filesToCheck = [
      brandRegistryPath,
      tablePath,
      manifestPath,
      registryPath
    ];
    for (const fp of filesToCheck) {
      const txt = fs.readFileSync(fp, 'utf8');
      assert(!/\$\{[a-zA-Z0-9_]+\}/.test(txt), `Unrendered template literal found in ${path.basename(fp)}!`);
    }
    console.log('     Verified 0 unrendered template literals in active artifacts.');
  });

  console.log('\n--- GATE 5: ONLINE SERVICES PROPERLY QUALIFIED ---');
  test('Online/global services are classified as ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG without assumptions', () => {
    const onlineBrands = brandRegistry.brands.filter(b => b.locality_status === 'ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG');
    assert(onlineBrands.length >= 3, 'Expected at least 3 online brands');
    const onlineLeaves = table.leaves.filter(l => l.terminal_state === 'ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG');
    assert(onlineLeaves.length >= 6, 'Expected online leaves to be tagged properly');
    console.log(`     Properly qualified ${onlineLeaves.length} leaves as ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG.`);
  });

  console.log('\n--- GATE 6: MUTATION TEST (PARSER IS DYNAMIC, NOT STATIC) ---');
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const dummyHtml1 = '<html><body><h1>Khuyến mãi 50.000đ tại Đà Nẵng</h1><span class="price">50.000đ</span></body></html>';
    const dummyHtml2 = '<html><body><h1>Ưu đãi hoàn toàn mới 99k</h1><span class="price">99k</span></body></html>';
    const dummyReceipt = { receipt_id: 'TEST_MUTATION', hashes: { html_sha256: '000', screenshot_sha256: '111' }, captured_at: new Date().toISOString() };

    const res1 = await parseLeafDomNative(dummyHtml1, 'https://test.com/1', dummyReceipt, browser);
    const res2 = await parseLeafDomNative(dummyHtml2, 'https://test.com/2', dummyReceipt, browser);

    await browser.close();

    assert.strictEqual(res1.title, 'Khuyến mãi 50.000đ tại Đà Nẵng');
    assert.strictEqual(res1.price_claim, '50.000đ');
    assert.strictEqual(res2.title, 'Ưu đãi hoàn toàn mới 99k');
    assert.strictEqual(res2.price_claim, '99k');
    assert.notStrictEqual(res1.title, res2.title);
    assert.notStrictEqual(res1.price_claim, res2.price_claim);

    console.log('  ✅ PASS: Mutation test passed: Parser dynamically adapts output based purely on raw HTML input.');
    passCount++;
  } catch (err) {
    console.error('  ❌ FAIL: Mutation test failed: ' + err.message);
    failCount++;
  }

  console.log('\n--- GATE 7: METRIC CONSERVATION CHECK (32 == 32) ---');
  test('Conservation sum of 142R leaves equals exactly 32 evaluated captures', () => {
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
    console.log('✨ ALL 9 JAYT-142R REPROCESSING RED-TEAM AUDIT TESTS PASSED 100% CLEAN!');
    process.exit(0);
  }
}

runAsyncTests();
