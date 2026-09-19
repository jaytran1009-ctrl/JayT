const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');
const disclosurePath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'BATCH_103R1_DIRECT_MUTATION_DISCLOSURE.md');
const correctionReceiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'correction_receipt_103r1_direct_mutation.json');
const runsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

let passed = 0;
let total = 0;

function runTest(name, fn) {
  total++;
  try {
    fn();
    console.log(`  [${name}]: [PASS]`);
    passed++;
  } catch (err) {
    console.error(`  [${name}]: [FAIL] - ${err.message}`);
  }
}

console.log('🧪 [JAYT-103R2-TEST] Khởi chạy bộ kiểm thử Memory Lineage Containment 103R2...\n');

// TEST 01: Memory Consistency
runTest('TEST_01_MEMORY_CONSISTENCY_PASSES_ALL_10_TESTS', () => {
  const { execSync } = require('child_process');
  const out = execSync('node 07_QUALITY_ASSURANCE/test_project_memory_consistency.js', { encoding: 'utf8' });
  assert.ok(out.includes('TOÀN BỘ 10/10 KIỂM THỬ TÍNH NHẤT QUÁN PROJECT_MEMORY.MD ĐÃ ĐẠT [PASS]!'), 'Memory consistency must pass 10/10');
});

// TEST 02: Negative Fail-Closed: Zero Active Runner Scripts Outside Manager Write Directly to Memory
runTest('TEST_02_ZERO_ACTIVE_RUNNERS_WRITE_DIRECTLY_TO_PROJECT_MEMORY', () => {
  const qaDir = path.join(repoRoot, '07_QUALITY_ASSURANCE');
  const activeRunners = fs.readdirSync(qaDir).filter(f => f.startsWith('perform_memory_transaction_') && f.endsWith('.js'));
  for (const runner of activeRunners) {
    const content = fs.readFileSync(path.join(qaDir, runner), 'utf8');
    assert.ok(!content.includes('fs.writeFileSync(memoryPath') && !content.includes("writeFileSync('PROJECT_MEMORY.md'"),
      `Active runner ${runner} must NOT contain unmonitored writeFileSync directly to PROJECT_MEMORY.md`);
  }
});

// TEST 03: Disclosure File Exists & Contains Exact Hashes
runTest('TEST_03_DISCLOSURE_FILE_EXISTS_WITH_EXACT_HASHES', () => {
  assert.ok(fs.existsSync(disclosurePath), 'BATCH_103R1_DIRECT_MUTATION_DISCLOSURE.md must exist');
  const content = fs.readFileSync(disclosurePath, 'utf8');
  assert.ok(content.includes('1e3f0e99e893681571ef592bd9e43c8824d27cc74a2000a64e3a7934abef5b60'), 'Must contain pre-103R1 hash');
  assert.ok(content.includes('26931a28967fda7421488940c206a84f5c8e6e34d0d192e3fc5c016b5bb68a2d'), 'Must contain intermediate mutated hash');
  assert.ok(content.includes('JAYT-103R2-MEMORY-LINEAGE-CONTAINMENT'), 'Must mention 103R2');
});

// TEST 04: Correction Receipt Exists & Follows Schema
runTest('TEST_04_CORRECTION_RECEIPT_VALIDITY', () => {
  assert.ok(fs.existsSync(correctionReceiptPath), 'correction_receipt_103r1_direct_mutation.json must exist');
  const receipt = JSON.parse(fs.readFileSync(correctionReceiptPath, 'utf8'));
  assert.strictEqual(receipt.correction_id, 'CORR_103R1_DIRECT_MUTATION_DISCLOSURE');
  assert.strictEqual(receipt.before_sha256, '1e3f0e99e893681571ef592bd9e43c8824d27cc74a2000a64e3a7934abef5b60');
  assert.strictEqual(receipt.after_sha256, '26931a28967fda7421488940c206a84f5c8e6e34d0d192e3fc5c016b5bb68a2d');
});

// TEST 05: Official 103R2 Transaction Receipt Exists with Matching On-Disk Hashes
runTest('TEST_05_OFFICIAL_103R2_TRANSACTION_RECEIPT_AND_LINEAGE', () => {
  const subdirs = fs.readdirSync(runsDir).filter(d => d.startsWith('run_transaction_'));
  
  let found103R2Receipt = null;
  let found104Receipt = null;
  for (const sd of subdirs) {
    const dirPath = path.join(runsDir, sd);
    const files = fs.readdirSync(dirPath);
    for (const f of files) {
      if (f.includes('103R2') || f.includes('JAYT-103R2')) {
        found103R2Receipt = JSON.parse(fs.readFileSync(path.join(dirPath, f), 'utf8'));
      }
      if (f.includes('104') || f.includes('JAYT-104')) {
        found104Receipt = JSON.parse(fs.readFileSync(path.join(dirPath, f), 'utf8'));
      }
    }
  }

  assert.ok(found103R2Receipt, 'Transaction receipt for 103R2 must exist in runtime_evidence/runs/');
  assert.strictEqual(found103R2Receipt.work_order, 'JAYT-103R2-MEMORY-LINEAGE-CONTAINMENT');
  assert.strictEqual(found103R2Receipt.pre_hash, '26931a28967fda7421488940c206a84f5c8e6e34d0d192e3fc5c016b5bb68a2d');
  assert.strictEqual(found103R2Receipt.final_hash, '77185ec225d42ceb91148589865983acf3e64b4f584fd1924f88615232ed2158');

  // Verify unbroken lineage link forward to 104
  if (found104Receipt) {
    assert.strictEqual(found104Receipt.pre_hash, found103R2Receipt.final_hash, '104 pre_hash must match 103R2 final_hash');
  }
});

// TEST 06: Status of 103R1 strictly CORRECTED_PENDING_CEO_AUDIT
runTest('TEST_06_103R1_STATUS_STRICTLY_CORRECTED_PENDING_CEO_AUDIT', () => {
  const memContent = fs.readFileSync(memoryPath, 'utf8');
  assert.ok(!memContent.includes('103R1: ACCEPTED') && !memContent.includes('103R1: CEO APPROVED'),
    '103R1 must not be marked as ACCEPTED or APPROVED');
});

// TEST 07: Production Lock Invariants
runTest('TEST_07_PRODUCTION_LOCK_INVARIANTS', () => {
  const feed = JSON.parse(fs.readFileSync(prodFeedPath, 'utf8'));
  assert.strictEqual(feed.length, 0, 'Production deals_feed.json must remain []');

  const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  assert.strictEqual(manifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
});

console.log('\n======================================================');
if (passed === total) {
  console.log(`🟢 [MEMORY-LINEAGE-103R2-SUMMARY] Toàn bộ ${passed}/${total} KIỂM THỬ ĐÃ ĐẠT [PASS]!`);
  process.exit(0);
} else {
  console.error(`❌ [MEMORY-LINEAGE-103R2-SUMMARY] Thất bại: ${passed}/${total} PASS.`);
  process.exit(1);
}
