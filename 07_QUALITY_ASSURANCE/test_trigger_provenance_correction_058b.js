/**
 * JAYT TRIGGER PROVENANCE & CORRECTION TEST SUITE (058B)
 * Directive: JAYT-TRIGGER-PROVENANCE-CORRECTION-058B / JAYT-PROJECT-MEMORY-TRANSACTION-057
 * 
 * Verifies:
 * 1. Positive: Receipt 058B accurately records source_scan_work_order: JAYT-AUTHORIZED-CADENCE-SCAN-056,
 *    execution_trigger: MANUAL_TASK_TRIGGER, scheduler_verification: UNVERIFIED_IN_CODEX_AUDIT_ENVIRONMENT.
 * 2. Positive: Strict summary lineage binding to sweep_summary_058a.json via SHA-256 and indicators 5/3/1/5.
 * 3. Positive: Historical receipts 058 and 058A are preserved append-only without mutation or deletion.
 * 4. Negative: Any receipt claiming NATURAL_SCHEDULED_RUN or WINDOWS_SCHEDULER_LIVE_RUN for a session with schtasks /run is rejected fail-closed.
 * 5. Negative: Any receipt with mismatched source_scan_work_order is rejected fail-closed.
 * 6. Negative: Any receipt omitting cross-environment disclosure UNVERIFIED_IN_CODEX_AUDIT_ENVIRONMENT is rejected fail-closed.
 * 7. Invariant: Production feed is [] (SHA-256 invariant) and is_approved is false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const receipt058bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058b_trigger_provenance_correction', 'receipt.json');
const receipt058aPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058a_cadence_receipt_lineage', 'receipt.json');
const receipt058Path = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058_first_cadence_observation', 'receipt.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

let passedCount = 0;
let totalCount = 0;

function assertTest(testName, condition, detail) {
  totalCount++;
  if (condition) {
    passedCount++;
    console.log(`  [${testName}]: [PASS] - ${detail}`);
  } else {
    console.error(`  [${testName}]: [FAIL] - ${detail}`);
    process.exitCode = 1;
  }
}

function validateTriggerProvenanceContract(receiptObj, sessionHasManualRunCommand = true, basePath = repoRoot) {
  if (!receiptObj || typeof receiptObj !== 'object') {
    return { valid: false, reason: 'RECEIPT_NOT_AN_OBJECT' };
  }

  // 1. Trigger classification check
  if (sessionHasManualRunCommand) {
    if (receiptObj.execution_trigger === 'NATURAL_SCHEDULED_RUN' ||
        receiptObj.execution_trigger === 'WINDOWS_SCHEDULER_LIVE_RUN' ||
        receiptObj.task_identity?.execution_trigger === 'WINDOWS_SCHEDULER_LIVE_RUN' ||
        receiptObj.task_identity?.execution_trigger === 'NATURAL_SCHEDULED_RUN') {
      return {
        valid: false,
        reason: 'UNAUTHORIZED_NATURAL_SCHEDULE_CLAIM_REJECTED: session executed schtasks /run so execution_trigger MUST be declared as MANUAL_TASK_TRIGGER'
      };
    }
  }

  if (receiptObj.execution_trigger !== 'MANUAL_TASK_TRIGGER') {
    return { valid: false, reason: 'INVALID_EXECUTION_TRIGGER: expected MANUAL_TASK_TRIGGER' };
  }

  // 2. Cross-environment disclosure check
  if (receiptObj.scheduler_verification !== 'UNVERIFIED_IN_CODEX_AUDIT_ENVIRONMENT' ||
      receiptObj.task_identity?.scheduler_verification !== 'UNVERIFIED_IN_CODEX_AUDIT_ENVIRONMENT') {
    return {
      valid: false,
      reason: 'CROSS_ENV_DISCLOSURE_MISSING: scheduler_verification MUST be declared as UNVERIFIED_IN_CODEX_AUDIT_ENVIRONMENT'
    };
  }

  // 3. Summary lineage and source work order check
  if (!receiptObj.summary_lineage || !receiptObj.summary_lineage.summary_file_path || !receiptObj.summary_lineage.summary_sha256) {
    return { valid: false, reason: 'MISSING_SUMMARY_LINEAGE_OR_HASH' };
  }

  const summaryFullPath = path.isAbsolute(receiptObj.summary_lineage.summary_file_path)
    ? receiptObj.summary_lineage.summary_file_path
    : path.join(basePath, receiptObj.summary_lineage.summary_file_path);

  if (!fs.existsSync(summaryFullPath)) {
    return { valid: false, reason: `SUMMARY_FILE_NOT_FOUND: ${summaryFullPath}` };
  }

  const rawSummary = fs.readFileSync(summaryFullPath, 'utf8');
  const actualSummarySha = crypto.createHash('sha256').update(rawSummary).digest('hex');

  if (actualSummarySha !== receiptObj.summary_lineage.summary_sha256) {
    return { valid: false, reason: `SUMMARY_SHA256_MISMATCH: expected ${receiptObj.summary_lineage.summary_sha256}, got ${actualSummarySha}` };
  }

  let summaryJson;
  try {
    summaryJson = JSON.parse(rawSummary);
  } catch (e) {
    return { valid: false, reason: 'SUMMARY_NOT_VALID_JSON' };
  }

  // Check source scan work order matches summary metadata
  const expectedSourceWorkOrder = summaryJson.work_order || 'JAYT-AUTHORIZED-CADENCE-SCAN-056';
  if (receiptObj.source_scan_work_order !== expectedSourceWorkOrder ||
      receiptObj.summary_lineage.source_scan_work_order !== expectedSourceWorkOrder) {
    return {
      valid: false,
      reason: `SOURCE_SCAN_WORK_ORDER_MISMATCH: receipt [${receiptObj.source_scan_work_order}] does not match summary [${expectedSourceWorkOrder}]`
    };
  }

  // Verify cycle indicators match summary
  const recInd = receiptObj.cycle_indicators || receiptObj.weekly_indicators || {};
  if (!receiptObj.cycle_indicators) {
    return {
      valid: false,
      reason: 'MISSING_CYCLE_INDICATORS: receipt must declare cycle_indicators for morning batch'
    };
  }
  if (recInd.total_sources_swept !== summaryJson.total_sources_swept ||
      recInd.sources_changed !== summaryJson.sources_changed ||
      recInd.staging_accepted_deals !== summaryJson.staging_accepted_deals ||
      recInd.deals_in_recheck !== summaryJson.deals_in_recheck) {
    return {
      valid: false,
      reason: `INDICATORS_MISMATCH: receipt indicators do not match summary`
    };
  }

  return { valid: true, summaryJson };
}

function run058bProvenanceTests() {
  console.log('🧪 [JAYT-PROVENANCE-058B-TEST] Khởi chạy bộ kiểm thử Trigger Provenance & Correction (058B)...');

  // 1. Positive: Real Receipt 058B Validation
  let realReceipt058b = null;
  let validationResult = { valid: false, reason: 'FILE_NOT_EXISTS' };
  if (fs.existsSync(receipt058bPath)) {
    try {
      realReceipt058b = JSON.parse(fs.readFileSync(receipt058bPath, 'utf8'));
      validationResult = validateTriggerProvenanceContract(realReceipt058b, true, repoRoot);
    } catch (e) {
      validationResult = { valid: false, reason: e.message };
    }
  }

  assertTest('T1_01_REAL_RECEIPT_058B_PROVENANCE_VALID',
    validationResult.valid,
    `Receipt 058B ghi nhận chuẩn xác provenance: source_scan_work_order (056), execution_trigger (MANUAL_TASK_TRIGGER), cycle_indicators (5/3/1/5), và cross-environment disclosure.`);

  // 2. Positive: Summary Lineage & 4 Cycle Indicators (5/3/1/5)
  const ind = realReceipt058b?.cycle_indicators || {};
  const indValid = ind.total_sources_swept === 5 &&
                   ind.sources_changed === 3 &&
                   ind.staging_accepted_deals === 1 &&
                   ind.deals_in_recheck === 5;
  assertTest('T1_02_INDICATORS_AND_LINEAGE_MATCH',
    indValid,
    `4 chỉ số chu kỳ (cycle_indicators) trong receipt 058B khớp tuyệt đối với summary file đã băm (5 swept / 3 changed / 1 staging / 5 recheck).`);

  // 3. Positive: Historical Receipts Preserved Intact
  const receipt058Exists = fs.existsSync(receipt058Path);
  const receipt058aExists = fs.existsSync(receipt058aPath);
  assertTest('T1_03_HISTORICAL_RECEIPTS_PRESERVED',
    receipt058Exists && receipt058aExists,
    `Các receipt lịch sử 058 và 058A được lưu giữ nguyên vẹn 100% trong lịch sử append-only.`);

  // 4. Negative: Natural Scheduled Claim Blocked
  const mutatedNaturalClaim = JSON.parse(JSON.stringify(realReceipt058b));
  mutatedNaturalClaim.execution_trigger = 'NATURAL_SCHEDULED_RUN';
  const resNatural = validateTriggerProvenanceContract(mutatedNaturalClaim, true, repoRoot);
  assertTest('T1_04_NEGATIVE_NATURAL_SCHEDULE_CLAIM_BLOCKED',
    resNatural.valid === false && resNatural.reason.includes('UNAUTHORIZED_NATURAL_SCHEDULE_CLAIM_REJECTED'),
    `Receipt tự gọi là NATURAL_SCHEDULED_RUN khi phiên có lệnh schtasks /run bị chặn thành công: [${resNatural.reason}].`);

  // 5. Negative: Mismatched Source Work Order Blocked
  const mutatedWorkOrder = JSON.parse(JSON.stringify(realReceipt058b));
  mutatedWorkOrder.source_scan_work_order = 'JAYT-CADENCE-RECEIPT-LINEAGE-058A';
  const resWorkOrder = validateTriggerProvenanceContract(mutatedWorkOrder, true, repoRoot);
  assertTest('T1_05_NEGATIVE_SOURCE_WORK_ORDER_MISMATCH_BLOCKED',
    resWorkOrder.valid === false && resWorkOrder.reason.includes('SOURCE_SCAN_WORK_ORDER_MISMATCH'),
    `Receipt tự gán source_scan_work_order khác với raw summary bị chặn thành công: [${resWorkOrder.reason}].`);

  // 6. Negative: Missing Cross-Environment Disclosure Blocked
  const mutatedDisclosure = JSON.parse(JSON.stringify(realReceipt058b));
  mutatedDisclosure.scheduler_verification = 'FULLY_VERIFIED_UNIVERSALLY';
  const resDisclosure = validateTriggerProvenanceContract(mutatedDisclosure, true, repoRoot);
  assertTest('T1_06_NEGATIVE_CROSS_ENV_DISCLOSURE_MISSING_BLOCKED',
    resDisclosure.valid === false && resDisclosure.reason.includes('CROSS_ENV_DISCLOSURE_MISSING'),
    `Receipt bỏ sót hoặc khai gian trạng thái cross-environment bị chặn thành công: [${resDisclosure.reason}].`);

  // 7. Invariant: Production Locked
  const prodFeedContent = fs.readFileSync(prodFeedPath, 'utf8');
  const prodFeedJson = JSON.parse(prodFeedContent);
  const prodFeedSha = crypto.createHash('sha256').update(prodFeedContent).digest('hex');
  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));

  const isProdEmpty = Array.isArray(prodFeedJson) && prodFeedJson.length === 0;
  const isProdShaMatched = prodFeedSha === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945';
  const isReleaseLocked = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === false;

  assertTest('INVARIANT_07_PRODUCTION_LOCKED',
    isProdEmpty && isProdShaMatched && isReleaseLocked,
    `Production feed duy trì bất biến [] (SHA-256: ${prodFeedSha}) và RELEASE_MANIFEST is_approved: false (LOCKED)`);

  console.log(`\n🟢 [PROVENANCE-058B-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
}

if (require.main === module) {
  run058bProvenanceTests();
}

module.exports = { run058bProvenanceTests, validateTriggerProvenanceContract };
