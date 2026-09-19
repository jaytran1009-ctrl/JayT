/**
 * =============================================================================
 * JAYT CORP - QUALITY ASSURANCE: QUARANTINE INTEGRITY CONTRACT TEST SUITE
 * WORK ORDER: JAYT-LIVE-CATALOG-TRUTH-025B
 * Purpose: Strict fail-closed validation of quarantine snapshot contracts.
 *          Verifies that historical exemption applies ONLY to TRUTH-025,
 *          and all future work orders are strictly rejected if missing raw snapshots.
 * Execution: node 07_QUALITY_ASSURANCE/test_quarantine_integrity_contract.js
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const realQuarantineManifest = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'QUARANTINE_MANIFEST.json');
const realIntegrityGap = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'QUARANTINE_INTEGRITY_GAP.md');

/**
 * Core validation logic for any quarantine manifest
 */
function validateQuarantineManifestContract(manifestData, manifestDir, repoBasePath) {
  if (!manifestData || typeof manifestData !== 'object') {
    return { valid: false, reason: 'Manifest is not a valid JSON object' };
  }

  const workOrder = manifestData.work_order;
  if (!workOrder) {
    return { valid: false, reason: 'Missing mandatory field: work_order' };
  }

  // 1. HISTORICAL EXEMPTION: Strictly limited to JAYT-LIVE-CATALOG-TRUTH-025
  if (workOrder === 'JAYT-LIVE-CATALOG-TRUTH-025') {
    const hasRemediation = manifestData.remediation_work_order === 'JAYT-LIVE-CATALOG-TRUTH-025A';
    const hasStatus = manifestData.integrity_remediation_status === 'DISCLOSED_GAP';
    const isNotPersisted = manifestData.snapshot_byte_for_byte_persisted === false;
    const isGapStatus = manifestData.snapshot_gap_status === 'INTEGRITY_GAP_DISCLOSED_NO_RAW_BYTE_COPY';
    const gapFileRel = manifestData.integrity_gap_dossier || '05_DEAL_AND_AFFILIATE/quarantine_vault/QUARANTINE_INTEGRITY_GAP.md';
    const gapFileFull = path.resolve(repoBasePath, gapFileRel);
    const gapFileExists = fs.existsSync(gapFileFull);

    if (hasRemediation && hasStatus && isNotPersisted && isGapStatus && gapFileExists) {
      return {
        valid: true,
        type: 'HISTORICAL_GAP_DISCLOSED',
        reason: 'Historical TRUTH-025 manifest properly disclosed with QUARANTINE_INTEGRITY_GAP.md and remediation tags.'
      };
    } else {
      return {
        valid: false,
        reason: 'Historical TRUTH-025 manifest missing mandatory remediation disclosure fields or gap markdown file.'
      };
    }
  }

  // 2. ALL FUTURE / OTHER WORK ORDERS: Strictly Fail-Closed Contract
  if (manifestData.snapshot_byte_for_byte_persisted !== true) {
    return {
      valid: false,
      reason: `NON-HISTORICAL WORK ORDER VIOLATION: Work order '${workOrder}' MUST set 'snapshot_byte_for_byte_persisted: true'. Historical gap exemption is strictly restricted to TRUTH-025.`
    };
  }

  const rawSnapshotRel = manifestData.raw_byte_for_byte_snapshot_file;
  if (!rawSnapshotRel || typeof rawSnapshotRel !== 'string') {
    return {
      valid: false,
      reason: `Work order '${workOrder}' missing mandatory 'raw_byte_for_byte_snapshot_file' path.`
    };
  }

  const rawSnapshotPath = path.resolve(repoBasePath, rawSnapshotRel);
  if (!fs.existsSync(rawSnapshotPath) || !fs.statSync(rawSnapshotPath).isFile()) {
    return {
      valid: false,
      reason: `Raw snapshot file does not exist on disk: '${rawSnapshotRel}' (Full: ${rawSnapshotPath})`
    };
  }

  const expectedSha256 = manifestData.source_sha256_pre_quarantine;
  if (!expectedSha256 || typeof expectedSha256 !== 'string' || expectedSha256.length !== 64) {
    return {
      valid: false,
      reason: `Invalid or missing 'source_sha256_pre_quarantine' in manifest: '${expectedSha256}'`
    };
  }

  const fileBytes = fs.readFileSync(rawSnapshotPath);
  const actualSha256 = crypto.createHash('sha256').update(fileBytes).digest('hex');

  if (actualSha256 !== expectedSha256) {
    return {
      valid: false,
      reason: `BYTE-FOR-BYTE HASH MISMATCH: Snapshot file SHA-256 '${actualSha256}' does NOT match manifest '${expectedSha256}'`
    };
  }

  return {
    valid: true,
    type: 'PERSISTED_RAW_SNAPSHOT_VERIFIED',
    reason: `Work order '${workOrder}' has valid byte-for-byte raw snapshot matching SHA-256 ${actualSha256}.`
  };
}

// CLI Mode: node test_quarantine_integrity_contract.js --verify <file_path>
if (process.argv.includes('--verify')) {
  const fileIdx = process.argv.indexOf('--verify') + 1;
  const targetFile = process.argv[fileIdx];
  if (!targetFile || !fs.existsSync(targetFile)) {
    console.error(`[CLI_VERIFY_ERROR] File not found: ${targetFile}`);
    process.exit(2);
  }
  const data = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
  const res = validateQuarantineManifestContract(data, path.dirname(targetFile), repoRoot);
  if (!res.valid) {
    console.error(`[FAIL_CLOSED] ${res.reason}`);
    process.exit(1);
  } else {
    console.log(`[PASS] ${res.reason}`);
    process.exit(0);
  }
}

// Suite Runner Mode
console.log('🧪 [JAYT-QUARANTINE-CONTRACT-TEST] Khởi chạy bộ kiểm thử Fail-Closed Quarantine Snapshot Contract (TRUTH-025B)...');

let allPassed = true;
const testResults = [];

function recordTest(id, passed, message) {
  testResults.push({ id, passed, message });
  console.log(`  [${id}]: [${passed ? 'PASS' : 'FAIL'}] - ${message}`);
  if (!passed) allPassed = false;
}

try {
  // TEST 1: Real Historical TRUTH-025 Manifest in Vault
  const realManifestData = JSON.parse(fs.readFileSync(realQuarantineManifest, 'utf8'));
  const res1 = validateQuarantineManifestContract(realManifestData, path.dirname(realQuarantineManifest), repoRoot);
  recordTest('QC_01_REAL_HISTORICAL_MANIFEST_VALID',
    res1.valid === true && res1.type === 'HISTORICAL_GAP_DISCLOSED',
    `Manifest lịch sử TRUTH-025 hợp lệ: ${res1.reason}`);

  // TEST 2: Future Work Order with Valid Snapshot (Positive Contract Test)
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jayt_qc_test_'));
  const samplePayload = JSON.stringify([{ deal_id: "TEST-DEAL-01", price: 10000 }], null, 2);
  const sampleSha256 = crypto.createHash('sha256').update(Buffer.from(samplePayload)).digest('hex');
  const snapshotFile = path.join(tempDir, 'snapshot_deals_feed_pre_quarantine.json');
  fs.writeFileSync(snapshotFile, samplePayload, 'utf8');

  const validFutureManifest = {
    work_order: "JAYT-FUTURE-QUARANTINE-099",
    quarantine_timestamp: new Date().toISOString(),
    source_file: "05_DEAL_AND_AFFILIATE/deals_feed.json",
    source_sha256_pre_quarantine: sampleSha256,
    snapshot_byte_for_byte_persisted: true,
    raw_byte_for_byte_snapshot_file: path.relative(repoRoot, snapshotFile),
    quarantined_records_count: 1
  };

  const res2 = validateQuarantineManifestContract(validFutureManifest, tempDir, repoRoot);
  recordTest('QC_02_FUTURE_MANIFEST_WITH_VALID_SNAPSHOT_PASSES',
    res2.valid === true && res2.type === 'PERSISTED_RAW_SNAPSHOT_VERIFIED',
    `Work order tương lai có snapshot byte-for-byte hợp lệ: ${res2.reason}`);

  // TEST 3 (NEGATIVE): Future Work Order claiming persisted: false (MUST FAIL)
  const fakeFutureNoSnapshot = {
    work_order: "JAYT-FUTURE-UNAUTHORIZED-100",
    quarantine_timestamp: new Date().toISOString(),
    source_file: "05_DEAL_AND_AFFILIATE/deals_feed.json",
    source_sha256_pre_quarantine: sampleSha256,
    snapshot_byte_for_byte_persisted: false, // VIOLATION!
    snapshot_gap_status: "INTEGRITY_GAP_DISCLOSED_NO_RAW_BYTE_COPY"
  };

  const res3 = validateQuarantineManifestContract(fakeFutureNoSnapshot, tempDir, repoRoot);
  const negativeBlocked3 = (res3.valid === false && res3.reason.includes('NON-HISTORICAL WORK ORDER VIOLATION'));
  recordTest('QC_03_NEGATIVE_FUTURE_PERSISTED_FALSE_BLOCKED',
    negativeBlocked3,
    `Work order mới có persisted:false bị chặn thành công: [${res3.reason}]`);

  // TEST 4 (NEGATIVE): Future Work Order with missing snapshot file (MUST FAIL)
  const fakeFutureMissingFile = {
    work_order: "JAYT-FUTURE-MISSING-FILE-101",
    quarantine_timestamp: new Date().toISOString(),
    source_file: "05_DEAL_AND_AFFILIATE/deals_feed.json",
    source_sha256_pre_quarantine: sampleSha256,
    snapshot_byte_for_byte_persisted: true,
    raw_byte_for_byte_snapshot_file: "non_existent_snapshot.json" // Missing!
  };

  const res4 = validateQuarantineManifestContract(fakeFutureMissingFile, tempDir, repoRoot);
  const negativeBlocked4 = (res4.valid === false && res4.reason.includes('does not exist on disk'));
  recordTest('QC_04_NEGATIVE_FUTURE_MISSING_SNAPSHOT_FILE_BLOCKED',
    negativeBlocked4,
    `Work order mới thiếu file snapshot bị chặn thành công: [${res4.reason}]`);

  // TEST 5 (NEGATIVE): Future Work Order with tampered SHA-256 (MUST FAIL)
  const fakeFutureTamperedHash = {
    work_order: "JAYT-FUTURE-TAMPERED-HASH-102",
    quarantine_timestamp: new Date().toISOString(),
    source_file: "05_DEAL_AND_AFFILIATE/deals_feed.json",
    source_sha256_pre_quarantine: "0000000000000000000000000000000000000000000000000000000000000000", // Tampered!
    snapshot_byte_for_byte_persisted: true,
    raw_byte_for_byte_snapshot_file: path.relative(repoRoot, snapshotFile)
  };

  const res5 = validateQuarantineManifestContract(fakeFutureTamperedHash, tempDir, repoRoot);
  const negativeBlocked5 = (res5.valid === false && res5.reason.includes('BYTE-FOR-BYTE HASH MISMATCH'));
  recordTest('QC_05_NEGATIVE_FUTURE_TAMPERED_HASH_BLOCKED',
    negativeBlocked5,
    `Work order mới có hash không khớp bị chặn thành công: [${res5.reason}]`);

  // TEST 6 (NEGATIVE CLI PROCESS RUNNER): Spawn real Node subprocess with fake future manifest -> assert exit code !== 0
  const fakeManifestFile = path.join(tempDir, 'fake_unauthorized_manifest.json');
  fs.writeFileSync(fakeManifestFile, JSON.stringify(fakeFutureNoSnapshot, null, 2), 'utf8');

  const cliRun = spawnSync(process.execPath, [__filename, '--verify', fakeManifestFile], {
    encoding: 'utf8'
  });

  const cliFailedAsExpected = (cliRun.status !== 0 && cliRun.stderr.includes('NON-HISTORICAL WORK ORDER VIOLATION'));
  recordTest('QC_06_NEGATIVE_CLI_PROCESS_NON_ZERO_EXIT',
    cliFailedAsExpected,
    `Subprocess thực tế chạy manifest giả định trả về exit code ${cliRun.status} (khác 0) và stderr fail-closed chuẩn.`);

  // Cleanup temp dir
  try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch {}

} catch (err) {
  console.error('  [QC_FATAL_ERROR]:', err);
  allPassed = false;
}

console.log('\n' + (allPassed ? '🟢' : '❌') + ' [QUARANTINE-CONTRACT-SUMMARY] ' +
  (allPassed ? `TOÀN BỘ ${testResults.length}/${testResults.length} KIỂM THỬ QUARANTINE INTEGRITY CONTRACT ĐÃ ĐẠT [PASS]!`
             : `KIỂM THỬ THẤT BẠI [FAIL]!`));

module.exports = { validateQuarantineManifestContract };

if (require.main === module && !process.argv.includes('--verify')) {
  process.exit(allPassed ? 0 : 1);
}
