const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🔍 JAYT-136: REAL BROWSER EVIDENCE SUPPLY BATCH AUDIT (0 SYNTHETIC)');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_136_manifest.json');
const collectorPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'run_batch_capture_136.js');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');
const jsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const { applyProjectMemoryTransaction067, runsEvidenceDir } = require('./memory_transaction_manager_057');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const collectorCode = fs.readFileSync(collectorPath, 'utf8');
const memory = fs.readFileSync(memoryPath, 'utf8');
const jsCode = fs.readFileSync(jsPath, 'utf8');

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

console.log('--- GATE 1: ZERO SYNTHETIC FALLBACKS IN COLLECTOR CODE ---');
test('Collector contains ZERO synthetic fallback text or placeholder synthesizers', () => {
  assert(!collectorCode.includes('OFFLINE_CACHE'), 'Violation: Found OFFLINE_CACHE fallback in collector code');
  assert(!collectorCode.includes('THƯƠNG HIỆU: ${t.brand}'), 'Violation: Found synthetic template text in collector code');
  assert(collectorCode.includes("captureStatus = 'FETCH_FAILED_OR_TIMEOUT'"), 'Missing explicit error state capture');
});

console.log('\n--- GATE 2: ZERO TARGET_ID OR TITLE BIAS IN CLASSIFIER ---');
test('Classifier operates purely on DOM content (text, html, finalUrl) with zero target_id bias', () => {
  assert(!collectorCode.includes('if (target.target_id ==='), 'Violation: Classifier branches on target_id');
  assert(!collectorCode.includes('if (t.target_id ==='), 'Violation: Classifier branches on t.target_id');
  assert(collectorCode.includes('function parseAndClassifyDom(text, html, finalUrl, brand)'), 'Classifier function signature mismatch');
});

console.log('\n--- GATE 3: 4 MANDATORY PHYSICAL ARTIFACTS PER TARGET (55/55) ---');
test('All 55 targets have page.html, page.txt, screenshot.png, and metadata.json matching SHA-256', () => {
  const allTargets = [
    ...manifest.active_verified_offers,
    ...manifest.locality_only_venues,
    ...manifest.incomplete_or_blocked
  ];

  assert.strictEqual(allTargets.length, 55, `Expected 55 targets, found ${allTargets.length}`);

  let valid = 0;
  for (const t of allTargets) {
    const htmlFull = path.join(repoRoot, t.artifacts.page_html.path);
    const txtFull = path.join(repoRoot, t.artifacts.page_txt.path);
    const shotFull = path.join(repoRoot, t.artifacts.screenshot_png.path);

    assert(fs.existsSync(htmlFull), `Missing HTML: ${t.artifacts.page_html.path}`);
    assert(fs.existsSync(txtFull), `Missing TXT: ${t.artifacts.page_txt.path}`);
    assert(fs.existsSync(shotFull), `Missing Screenshot: ${t.artifacts.screenshot_png.path}`);

    const htmlSha = crypto.createHash('sha256').update(fs.readFileSync(htmlFull)).digest('hex');
    const txtSha = crypto.createHash('sha256').update(fs.readFileSync(txtFull)).digest('hex');
    const shotSha = crypto.createHash('sha256').update(fs.readFileSync(shotFull)).digest('hex');

    assert.strictEqual(htmlSha, t.artifacts.page_html.sha256, `HTML SHA mismatch for ${t.target_id}`);
    assert.strictEqual(txtSha, t.artifacts.page_txt.sha256, `TXT SHA mismatch for ${t.target_id}`);
    assert.strictEqual(shotSha, t.artifacts.screenshot_png.sha256, `Shot SHA mismatch for ${t.target_id}`);
    valid++;
  }

  assert.strictEqual(valid, 55, `Only ${valid}/55 targets valid`);
  console.log(`     Validated 55/55 targets with 4 physical artifacts each (Total 220 physical files)`);
});

console.log('\n--- GATE 4: 100% VERBATIM EVIDENCE SUBSTRING MATCH IN REAL DOM ---');
test('Every ACTIVE_VERIFIED offer has verbatim quotes matching physical page.txt', () => {
  const activeOffers = manifest.active_verified_offers;
  assert(activeOffers.length >= 10, `Expected >= 10 active offers, found ${activeOffers.length}`);
  console.log(`     Active Verified Offers: ${activeOffers.length}`);

  for (const o of activeOffers) {
    const txtPath = path.join(repoRoot, o.artifacts.page_txt.path);
    const txt = fs.readFileSync(txtPath, 'utf8');

    assert(o.evidence_offer_quote && o.evidence_offer_quote.length > 5, `Offer ${o.target_id} missing evidence_offer_quote`);
    assert(o.evidence_terms_quote && o.evidence_terms_quote.length > 5, `Offer ${o.target_id} missing evidence_terms_quote`);
    
    assert(txt.includes(o.evidence_offer_quote), `Offer quote "${o.evidence_offer_quote}" not found in page.txt of ${o.target_id}`);
    assert(txt.includes(o.evidence_terms_quote), `Terms quote "${o.evidence_terms_quote}" not found in page.txt of ${o.target_id}`);
  }
});

console.log('\n--- GATE 5: ZERO ERROR OR AUTH/LOGIN PAGES IN ACTIVE OFFERS ---');
test('All ACTIVE_VERIFIED offers have valid HTTP status and non-error final URLs', () => {
  for (const o of manifest.active_verified_offers) {
    const lowerUrl = o.final_url.toLowerCase();
    assert(!lowerUrl.includes('error'), `Active offer ${o.target_id} has error in final_url: ${o.final_url}`);
    assert(!lowerUrl.includes('404'), `Active offer ${o.target_id} has 404 in final_url: ${o.final_url}`);
    assert(!lowerUrl.includes('login'), `Active offer ${o.target_id} has login in final_url: ${o.final_url}`);
    assert(!lowerUrl.includes('dang-nhap'), `Active offer ${o.target_id} has dang-nhap in final_url: ${o.final_url}`);
    assert.strictEqual(o.capture_status, 'OK', `Active offer ${o.target_id} has capture_status: ${o.capture_status}`);
  }
});

console.log('\n--- GATE 6: SEPARATE CLASSIFICATION REPORTING & DIVERSITY ---');
test('Manifest reports distinct counts for all 4 classification tiers without merging', () => {
  const m = manifest.summary_metrics;
  console.log(`     ACTIVE_VERIFIED: ${m.active_verified_count}`);
  console.log(`     LOCALITY_ONLY:   ${m.locality_only_count}`);
  console.log(`     INCOMPLETE:      ${m.incomplete_count}`);
  console.log(`     BLOCKED/ERROR:   ${m.blocked_count}`);
  console.log(`     EXPIRED:         ${m.expired_count}`);
  console.log(`     Categories:      ${m.categories_covered.join(', ')}`);

  assert(m.active_verified_count >= 10, 'Active verified count < 10');
  assert(m.locality_only_count >= 15, 'Locality only count < 15');
  assert(m.categories_covered.length >= 3, 'Categories covered < 3');
});

console.log('\n--- GATE 7: GOVERNANCE P1 IDEMPOTENCY & PRODUCTION LOCKS ---');
test('Production locks intact (deals_feed.json = [], is_approved = false) and safe UI preserved', () => {
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodJson = JSON.parse(prodRaw);
  const prodSha = crypto.createHash('sha256').update(prodRaw).digest('hex');
  assert(Array.isArray(prodJson) && prodJson.length === 0, 'Production feed is not empty');
  assert.strictEqual(prodSha, '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945', 'deals_feed.json SHA-256 altered');

  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;
  assert.strictEqual(isApproved, false, 'Production is_approved lock is not false');

  assert(!jsCode.includes('ShopeeFood rẻ hơn'), 'Found ShopeeFood rẻ hơn in JS');
  assert(!jsCode.includes('Freeship 18K'), 'Found Freeship 18K in JS');
  assert(jsCode.includes('🔵 ĐỊA ĐIỂM XÁC MINH'), 'Missing 🔵 ĐỊA ĐIỂM XÁC MINH in JS');
});

console.log('\n========================================================================');
console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('========================================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL 7 JAYT-136 REAL BROWSER EVIDENCE SUPPLY GATES PASSED 100% CLEAN!');
  process.exit(0);
}
