/**
 * JAYT CROSS-LAYER STAGING GATE TEST SUITE (070C)
 * Directive: JAYT-070C
 */

const fs = require('fs');
const path = require('path');
const { validateCrossLayerStagingLineage } = require('./cross_layer_staging_lineage_gate_070c');

const repoRoot = path.resolve(__dirname, '..');
const cand44Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review', 'candidate_44_CAND-DNG-METIZ-SUPER-MONDAY-2026.json');
const stagingFeedPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const incidentVaultSnapshotPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_070c_staging_lineage_incident', 'staging_deals_feed_070b_mutated.json');

const cand44 = JSON.parse(fs.readFileSync(cand44Path, 'utf8'));

let passed = 0;
let failed = 0;

function assertTest(name, condition, message) {
  if (condition) {
    console.log(`  [${name}]: [PASS] - ${message}`);
    passed++;
  } else {
    console.error(`  [${name}]: [FAIL] - ${message}`);
    failed++;
  }
}

console.log('🧪 [JAYT-CROSS-LAYER-GATE-TEST] Bắt đầu kiểm thử Cross-Layer Lineage Gate (070C)...');

// 1. Negative Test on Mutated Staging Item (Incident 070B replay)
const mutatedFeed = JSON.parse(fs.readFileSync(incidentVaultSnapshotPath, 'utf8'));
const mutatedMetizItem = mutatedFeed.find(d => d.deal_id === 'DNG-METIZ-SUPER-MONDAY-2026');
const incidentCheck = validateCrossLayerStagingLineage(mutatedMetizItem, cand44);
assertTest('GATE_01_NEGATIVE_MUTATED_FEED_BLOCKED', incidentCheck.valid === false && incidentCheck.errors.length >= 2,
  `Gate chặn thành công bản staging 070B bị biến dạng (${incidentCheck.errors.join('; ')})`);

// 2. Negative Test: Mutated Address
const testItemAddressMutated = JSON.parse(JSON.stringify(mutatedMetizItem));
testItemAddressMutated.captured_at = cand44.evidence['EVID_CAND-DNG-METIZ-SUPER-MONDAY-2026'].captured_at;
testItemAddressMutated.pricing_tiers[0].address_observed = 'Tầng 1 Helio Center, Đường 2/9, Hải Châu, Đà Nẵng';
const addressCheck = validateCrossLayerStagingLineage(testItemAddressMutated, cand44);
assertTest('GATE_02_NEGATIVE_ADDRESS_MUTATION_BLOCKED', addressCheck.errors.some(e => e.includes('LOCALITY_MUTATION')),
  'Gate chặn thành công địa chỉ suy diễn không có trong candidate locality');

// 3. Negative Test: Mutated Timestamp
const testItemTimestampMutated = JSON.parse(JSON.stringify(mutatedMetizItem));
testItemTimestampMutated.captured_at = '2026-08-24T05:22:15.000Z';
const timestampCheck = validateCrossLayerStagingLineage(testItemTimestampMutated, cand44);
assertTest('GATE_03_NEGATIVE_TIMESTAMP_MUTATION_BLOCKED', timestampCheck.errors.some(e => e.includes('CAPTURED_AT_MUTATION')),
  'Gate chặn thành công timestamp captured_at bị sai lệch');

// 4. Negative Test: Mutated Artifact Hash
const testItemHashMutated = JSON.parse(JSON.stringify(mutatedMetizItem));
testItemHashMutated.provenance.artifacts = {
  png: { sha256: '0000000000000000000000000000000000000000000000000000000000000000' }
};
const hashCheck = validateCrossLayerStagingLineage(testItemHashMutated, cand44);
assertTest('GATE_04_NEGATIVE_HASH_MUTATION_BLOCKED', hashCheck.errors.some(e => e.includes('PNG_HASH_MUTATION')),
  'Gate chặn thành công artifact hash bị sai khác');

// 5. Positive Test: Exact 1-to-1 Staging Item Passes
const exactStagingItem = {
  deal_id: 'DNG-METIZ-SUPER-MONDAY-2026',
  captured_at: cand44.evidence['EVID_CAND-DNG-METIZ-SUPER-MONDAY-2026'].captured_at,
  purchase_channel: 'AT_COUNTER',
  pricing_tiers: [
    {
      cinema_name: 'Metiz Cinema Đà Nẵng',
      price_vnd: 55000,
      price_display: '55.000đ',
      address_observed: 'Metiz Cinema Đà Nẵng; hướng dẫn vào Helio Center từ đường 2/9'
    }
  ],
  provenance: {
    source_url: cand44.evidence['EVID_CAND-DNG-METIZ-SUPER-MONDAY-2026'].source_url,
    capture_receipt_ref: cand44.evidence['EVID_CAND-DNG-METIZ-SUPER-MONDAY-2026'].capture_receipt_ref,
    capture_receipt_hash: cand44.evidence['EVID_CAND-DNG-METIZ-SUPER-MONDAY-2026'].capture_receipt_hash,
    artifacts: {
      png: { sha256: cand44.evidence['EVID_CAND-DNG-METIZ-SUPER-MONDAY-2026'].evidence_content_hash },
      html: { sha256: cand44.evidence['EVID_CAND-DNG-METIZ-SUPER-MONDAY-2026'].artifact_html_hash },
      text: { sha256: cand44.evidence['EVID_CAND-DNG-METIZ-SUPER-MONDAY-2026'].artifact_text_hash }
    }
  }
};
const exactCheck = validateCrossLayerStagingLineage(exactStagingItem, cand44);
assertTest('GATE_05_POSITIVE_EXACT_STAGING_PASSES', exactCheck.valid === true && exactCheck.errors.length === 0,
  'Staging item chuẩn xác 100% từng byte và claim PASS gate hoàn hảo');

// 6. Current Staging Feed Verification (3 clean deals)
const currentStagingFeed = JSON.parse(fs.readFileSync(stagingFeedPath, 'utf8'));
const cand45Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review', 'candidate_45_CAND-DNG-METIZ-U22-2026.json');
const cand45 = JSON.parse(fs.readFileSync(cand45Path, 'utf8'));

const stgMetizMon = currentStagingFeed.find(d => d.deal_id === 'DNG-METIZ-SUPER-MONDAY-2026');
const stgMetizU22 = currentStagingFeed.find(d => d.deal_id === 'DNG-METIZ-U22-2026');

const liveCheck44 = validateCrossLayerStagingLineage(stgMetizMon, cand44);
const liveCheck45 = validateCrossLayerStagingLineage(stgMetizU22, cand45);

assertTest('GATE_06_CURRENT_STAGING_METIZ_DEALS_PASS_GATE',
  currentStagingFeed.length === 3 && liveCheck44.valid && liveCheck45.valid,
  'Toàn bộ 2 deal Metiz triển khai trên Staging feed 070D đều PASS 100% cross-layer lineage gate (3/10 staging deals tổng thể)');

console.log(`\n======================================================`);
console.log(`🟢 [CROSS-LAYER-SUMMARY] Kết quả kiểm thử: ${passed}/${passed + failed} PASS!`);
if (failed > 0) process.exit(1);
