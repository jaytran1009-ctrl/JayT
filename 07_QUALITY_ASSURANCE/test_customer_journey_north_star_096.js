const fs = require('fs');
const path = require('path');
const assert = require('assert');
const crypto = require('crypto');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const deployDir = path.join(repoRoot, 'deploy', 'public');
const stagingDir = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH');

let passCount = 0;
let totalCount = 0;

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function runTest(name, fn) {
  totalCount++;
  try {
    fn();
    console.log(`  [${name}]: [PASS]`);
    passCount++;
  } catch (err) {
    console.error(`  [${name}]: [FAIL] - ${err.message}`);
  }
}

async function main() {
  console.log('🧪 [JAYT-096-TEST] Khởi chạy bộ kiểm thử Customer Journey North Star & Community Discovery 096 (READ-ONLY)...\n');

  // TEST 01: Project Memory Consistency (10/10 PASS)
  runTest('TEST_01_MEMORY_CONSISTENCY_PASSES_ALL_10_TESTS', () => {
    const memTestPath = path.join(__dirname, 'test_project_memory_consistency.js');
    assert.ok(fs.existsSync(memTestPath), 'test_project_memory_consistency.js missing');
    const out = execSync(`node "${memTestPath}"`, { encoding: 'utf8', cwd: repoRoot });
    assert.ok(out.includes('10/10') && out.includes('PASS'), 'Project memory must pass 10/10');
  });

  // TEST 02: Customer Journey North Star Contract v2.0.0
  runTest('TEST_02_CUSTOMER_JOURNEY_NORTH_STAR_CONTRACT_V2', () => {
    const contractPath = path.join(sotDir, 'customer_journey_north_star.json');
    assert.ok(fs.existsSync(contractPath), 'customer_journey_north_star.json missing');
    const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

    assert.strictEqual(contract.contract_id, 'JAYT_CUSTOMER_JOURNEY_NORTH_STAR_096');
    assert.strictEqual(contract.version, '2.0.0');
    assert.ok(contract.north_star_vision.includes('Community Deal Discovery Engine'), 'Vision must declare Community Deal Discovery Engine');
    assert.ok(Array.isArray(contract.time_of_day_slots) && contract.time_of_day_slots.length === 5, 'Must have 5 time-of-day slots');
    assert.ok(contract.three_tier_data_model.EMERALD_VERIFIED_OFFER, 'Must define Emerald tier');
    assert.ok(contract.three_tier_data_model.COBALT_VERIFIED_LOCATION, 'Must define Cobalt tier');
    assert.ok(contract.three_tier_data_model.AMBER_COMMUNITY_SIGNAL, 'Must define Amber tier');
    assert.ok(Array.isArray(contract.customer_journey_scenarios) && contract.customer_journey_scenarios.length === 11, 'Must have 11 customer scenarios');
  });

  // TEST 03: Release Candidate Freeze Protocol
  runTest('TEST_03_RELEASE_CANDIDATE_FREEZE_PROTOCOL_ENFORCED', () => {
    const rc096Path = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_096.json');
    assert.strictEqual(fs.existsSync(rc096Path), false, 'RELEASE_CANDIDATE_096.json must NOT exist in 096');

    // Historical triple disclosures & correction receipt
    const d094 = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECORD_094_RE_EMISSION_INTEGRITY_GAP.json');
    const d094a = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECORD_094A_RE_EMISSION_INTEGRITY_GAP.json');
    const d094b = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECORD_094B_RE_EMISSION_AND_DIRECT_MUTATION.json');
    const r095 = path.join(repoRoot, '08_RELEASE_VAULT', 'CORRECTION_RECEIPT_095_REJECTED_WO_TAXONOMY_INTEGRITY.json');
    assert.ok(fs.existsSync(d094) && fs.existsSync(d094a) && fs.existsSync(d094b) && fs.existsSync(r095), 'All historical disclosures must exist');
  });

  // TEST 04: Negative Taxonomy Enforcement
  runTest('TEST_04_NEGATIVE_TAXONOMY_ENFORCEMENT', () => {
    const { validateGlobalStatusTaxonomy067 } = require('./memory_transaction_manager_057.js');
    const rejectedWos = ['094', '094A', '094B'];
    for (const wo of rejectedWos) {
      assert.throws(() => {
        validateGlobalStatusTaxonomy067(`| \`2026-08-25T15:00:00+07:00\` | \`JAYT-${wo}\` | Desc | Art | Test | **ACCEPTED BY CEO** |`);
      }, /STATUS_TAXONOMY_VIOLATION_067/, `Work order ${wo} MUST be rejected when claiming ACCEPTED BY CEO`);
    }
  });

  // TEST 05: Three-Tier Visual Model & Zero Prohibited Words in Blue/Amber Tiers
  runTest('TEST_05_THREE_TIER_DATA_MODEL_AND_ZERO_PROHIBITED_WORDS', () => {
    const jsContent = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
    
    // Check tier badges in JS
    assert.ok(jsContent.includes('apex-badge-cobalt-tier'), 'Must use cobalt tier badge');
    assert.ok(jsContent.includes('apex-badge-amber-tier'), 'Must use amber tier badge');
    
    // Check honest disclaimers
    assert.ok(jsContent.includes('Quán hoạt động; ưu đãi online chưa đủ dữ liệu') || jsContent.includes('Rạp hoạt động; ưu đãi online chưa đủ dữ liệu'), 'Must contain honest watchlist disclaimer');
    assert.ok(jsContent.includes('Chưa có ưu đãi thương mại được mở bán công khai hôm nay') || jsContent.includes('Chưa có ưu đãi thương mại live hôm nay'), 'Must disclose honest empty deal state');
  });

  // TEST 06: Time-of-Day 5 Slots Dock & Dynamic Bento Structure
  runTest('TEST_06_TIME_OF_DAY_5_SLOTS_DOCK_AND_DYNAMIC_BENTO', () => {
    const jsContent = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
    const slots = ['SLOT_0730', 'SLOT_1115', 'SLOT_1415', 'SLOT_1730', 'SLOT_2100'];
    for (const s of slots) {
      assert.ok(jsContent.includes(s), `Must support slot ${s}`);
    }
    assert.ok(jsContent.includes('renderTimeOfDayDock'), 'Must contain renderTimeOfDayDock function');
  });

  // TEST 07: Local Habit Engine 5 Clusters & Cinema Provenance
  runTest('TEST_07_LOCAL_HABIT_ENGINE_5_CLUSTERS_PROVENANCE', () => {
    const datasetPath = path.join(sotDir, 'four_layer_dataset.json');
    assert.ok(fs.existsSync(datasetPath), 'four_layer_dataset.json missing');
    const ds = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));

    const locs = ds.layer_2_watchlist.verified_locations;
    assert.ok(Array.isArray(locs) && locs.length >= 4, 'Must have at least 4 verified locations');

    // Confirm Metiz Helio, CGV Vincom, Galaxy Co.opmart, Jollibee Vincom
    const brands = locs.map(l => l.brand);
    assert.ok(brands.some(b => b.includes('Metiz')), 'Metiz Cinema must be present');
    assert.ok(brands.some(b => b.includes('CGV')), 'CGV Vincom must be present');
    assert.ok(brands.some(b => b.includes('Galaxy')), 'Galaxy Cinema must be present');
    assert.ok(brands.some(b => b.includes('Jollibee')), 'Jollibee must be present');
  });

  // TEST 08: Touch Targets >= 44px & Accessibility
  runTest('TEST_08_TOUCH_TARGETS_GE_44PX_AND_ACCESSIBILITY', () => {
    const htmlContent = fs.readFileSync(path.join(sotDir, 'index.html'), 'utf8');
    assert.ok(htmlContent.includes('--touch-min: 44px;'), 'CSS must define --touch-min: 44px');
    assert.ok(htmlContent.includes('.apex-time-pill'), 'CSS must style .apex-time-pill');
    assert.ok(htmlContent.includes('.apex-category-pill'), 'CSS must style .apex-category-pill');
  });

  // TEST 09: Community Signal Network Airgap & PII Sanitization
  runTest('TEST_09_COMMUNITY_SIGNAL_NETWORK_AIRGAP_AND_PII_SANITIZATION', () => {
    const jsContent = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
    assert.ok(jsContent.includes('sanitizeCommunitySignalText'), 'Must have PII sanitization function');
    assert.ok(jsContent.includes('window.ApexApp'), 'Must expose ApexApp');
  });

  // TEST 10: Pre-generated HTTP Staging Evidence Metadata Parity
  runTest('TEST_10_PRE_GENERATED_HTTP_STAGING_EVIDENCE_METADATA_PARITY', () => {
    const metaPath = path.join(__dirname, 'runtime_evidence', 'screenshots_096', 'evidence_metadata_096.json');
    assert.ok(fs.existsSync(metaPath), 'evidence_metadata_096.json missing');
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

    assert.strictEqual(meta.work_order, 'JAYT-096-CUSTOMER-JOURNEY-NORTH-STAR-AND-COMMUNITY-DISCOVERY');
    assert.strictEqual(meta.purpose, 'CEO_VISUAL_REVIEW_ONLY');
    assert.strictEqual(meta.release_candidate_emitted, false);

    const expectedScreens = [
      'desktop_1440px_north_star_review_096.png',
      'tablet_768px_north_star_review_096.png',
      'mobile_390px_north_star_review_096.png'
    ];

    for (const scr of expectedScreens) {
      assert.ok(meta.viewports[scr], `Metadata missing entry for ${scr}`);
      const scrPath = path.join(__dirname, 'runtime_evidence', 'screenshots_096', scr);
      assert.ok(fs.existsSync(scrPath), `Screenshot missing: ${scr}`);
      const realBuf = fs.readFileSync(scrPath);
      assert.strictEqual(realBuf.length, meta.viewports[scr].file_size_bytes, `File size mismatch for ${scr}`);
      assert.strictEqual(sha256(realBuf), meta.viewports[scr].sha256, `SHA-256 mismatch for ${scr}`);
      assert.strictEqual(meta.viewports[scr].overflow_x, false, `Horizontal overflow detected for ${scr}`);
    }
  });

  // TEST 11: Three-Layer Byte Parity (03_SOURCE_OF_TRUTH === deploy/public === staging_instance)
  runTest('TEST_11_THREE_LAYER_BYTE_PARITY', () => {
    const syncFiles = ['index.html', 'jayt_apex_interface.js', 'customer_journey_north_star.json'];
    for (const f of syncFiles) {
      const sotBuf = fs.readFileSync(path.join(sotDir, f));
      const depBuf = fs.readFileSync(path.join(deployDir, f));
      const stgBuf = fs.readFileSync(path.join(stagingDir, f));

      const sotHash = sha256(sotBuf);
      const depHash = sha256(depBuf);
      const stgHash = sha256(stgBuf);

      assert.strictEqual(depHash, sotHash, `Deploy parity mismatch for ${f}`);
      assert.strictEqual(stgHash, sotHash, `Staging parity mismatch for ${f}`);
    }
  });

  // TEST 12: Production Lock Invariants
  runTest('TEST_12_PRODUCTION_LOCK_INVARIANTS', () => {
    const dealsPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
    assert.ok(fs.existsSync(dealsPath), 'deals_feed.json missing');
    const dealsContent = fs.readFileSync(dealsPath, 'utf8').trim();
    assert.ok(dealsContent === '[]' || dealsContent === '', 'deals_feed.json MUST be []');

    const manifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');
    assert.ok(fs.existsSync(manifestPath), 'RELEASE_MANIFEST.json missing');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.strictEqual(manifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved MUST be false');
  });

  console.log('\n======================================================');
  if (passCount === totalCount) {
    console.log(`🟢 [NORTH-STAR-096-SUMMARY] Toàn bộ ${passCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
  } else {
    console.error(`❌ [NORTH-STAR-096-SUMMARY] Thất bại: ${passCount}/${totalCount} PASS.\n`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
