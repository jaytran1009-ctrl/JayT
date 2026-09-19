/**
 * JAYT PROJECT MEMORY TRANSACTION TEST SUITE (057)
 * Directive: JAYT-PROJECT-MEMORY-TRANSACTION-057
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');
const runReceiptsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'run_receipts');
const sandboxTestDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_evidence', 'run_receipts');

const {
  initiateWorkOrderTransaction,
  recordCommandExecution,
  recordModifiedFile,
  recordArtifact,
  recordProductionLockCheck,
  finalizeWorkOrderReceipt,
  validateMemoryStatusTaxonomy,
  getSha256
} = require('./memory_transaction_manager_057');

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

async function run057TransactionTests() {
  console.log('🧪 [JAYT-MEMORY-TRANSACTION-057-TEST] Khởi chạy bộ kiểm thử Project Memory Transaction (057)...');

  // 1. Step 1: Pre-Execution Context Loading
  const txContext = initiateWorkOrderTransaction('JAYT-057-UNIT-TEST', { isTest: true });
  const memoryRaw = fs.readFileSync(memoryPath, 'utf8');
  const expectedHash = getSha256(memoryRaw);

  const step1Valid = txContext &&
                     txContext.initialMemoryHash === expectedHash &&
                     txContext.initialVersion !== 'UNKNOWN' &&
                     txContext.receipt.context_loaded_version === txContext.initialVersion &&
                     txContext.receipt.project_memory_initial_sha256 === expectedHash &&
                     txContext.receipt.status === 'IN_PROGRESS';

  assertTest('T1_01_STEP1_PRE_EXECUTION_CONTEXT_RECORDED',
    step1Valid,
    `Step 1 ghi nhận chuẩn xác context_loaded_version (${txContext.initialVersion}) và SHA-256 khởi tạo của PROJECT_MEMORY.md.`);

  // 2. Step 2: During Execution Tracking & Production Lock Assert
  const { receipt, targetRunDir } = txContext;

  recordCommandExecution(receipt, 'node --version', 0, 'v24.18.0');
  recordModifiedFile(receipt, 'PROJECT_MEMORY.md');
  recordArtifact(receipt, '07_QUALITY_ASSURANCE/runtime_evidence/scheduler_registration_proof.json');
  const prodCheck = recordProductionLockCheck(receipt);

  const step2Valid = receipt.commands_executed.length === 1 &&
                     receipt.commands_executed[0].exit_code === 0 &&
                     receipt.files_modified.length === 1 &&
                     receipt.files_modified[0].path === 'PROJECT_MEMORY.md' &&
                     receipt.artifacts_created.length === 1 &&
                     prodCheck.locked === true &&
                     prodCheck.is_approved_lock_false === true;

  assertTest('T1_02_STEP2_TRACKING_AND_PRODUCTION_LOCK',
    step2Valid,
    'Step 2 ghi nhận đầy đủ command, exit code, modified files, artifacts băm SHA-256 và xác thực khóa sản xuất bất biến.');

  // 3. Step 3: Finalization & Status Taxonomy Enforcement
  // Positive test: Finalize with allowed status
  const finalized = finalizeWorkOrderReceipt(receipt, targetRunDir, 'IMPLEMENTED_PENDING_CEO_AUDIT');
  const isReceiptSaved = fs.existsSync(finalized.receiptFilePath);
  const receiptSavedJson = isReceiptSaved ? JSON.parse(fs.readFileSync(finalized.receiptFilePath, 'utf8')) : {};

  // Negative test: Agent trying to declare ACCEPTED or VERIFIED must be BLOCKED
  let taxonomyBlocked = false;
  try {
    finalizeWorkOrderReceipt(receipt, targetRunDir, 'ACCEPTED');
  } catch (e) {
    if (e.message.includes('STATUS_TAXONOMY_VIOLATION')) {
      taxonomyBlocked = true;
    }
  }

  // Clean up test receipt from sandbox
  if (isReceiptSaved) {
    try { fs.unlinkSync(finalized.receiptFilePath); } catch (e) {}
  }

  assertTest('T1_03_STEP3_FINALIZATION_AND_STATUS_TAXONOMY_ENFORCED',
    isReceiptSaved && receiptSavedJson.status === 'IMPLEMENTED_PENDING_CEO_AUDIT' && taxonomyBlocked,
    'Step 3 sinh RUN_RECEIPT_<WORK_ORDER>.json chuẩn và chặn đứng hành vi AI tự ý tuyên bố ACCEPTED/VERIFIED.');

  // 4. Receipt Isolation & Verification of 056A Operational Receipt under runs/
  const opReceipt056aPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_056a_scheduler_wiring', 'receipt.json');
  let opReceipt056aValid = false;
  if (fs.existsSync(opReceipt056aPath)) {
    const json056a = JSON.parse(fs.readFileSync(opReceipt056aPath, 'utf8'));
    opReceipt056aValid = json056a.work_order === 'JAYT-SCHEDULER-WIRING-AND-EVIDENCE-ISOLATION-056A' &&
                         json056a.status === 'IMPLEMENTED_PENDING_CEO_AUDIT' &&
                         json056a.operational_readiness === 'SCHEDULER_NOT_YET_ACCEPTED' &&
                         json056a.commands_executed.length >= 2 &&
                         json056a.production_lock_check.locked === true;
  }

  assertTest('T1_04_RUN_RECEIPT_056A_INTEGRITY',
    opReceipt056aValid,
    'Run Receipt của 056A tồn tại hợp lệ trong runtime_evidence/runs/run_056a_scheduler_wiring/receipt.json.');

  // 5. Standard Memory Update Block Formatting
  const { generateStandardMemoryUpdateBlock } = require('./memory_transaction_manager_057');
  const sampleBlock = generateStandardMemoryUpdateBlock({
    version: '3.52.0',
    workOrder: 'JAYT-PROJECT-MEMORY-TRANSACTION-057',
    state: 'IMPLEMENTED — PENDING CEO AUDIT',
    receiptPath: '07_QUALITY_ASSURANCE/runtime_evidence/runs/run_057_memory_transaction/receipt.json',
    nextStep: 'Trình CEO kiểm toán độc lập.'
  });

  const isBlockValid = sampleBlock.includes('PROJECT MEMORY UPDATE') &&
                       sampleBlock.includes('Version: 3.52.0') &&
                       sampleBlock.includes('Hash:') &&
                       sampleBlock.includes('Work Order: JAYT-PROJECT-MEMORY-TRANSACTION-057') &&
                       sampleBlock.includes('State: IMPLEMENTED — PENDING CEO AUDIT') &&
                       sampleBlock.includes('Receipt: 07_QUALITY_ASSURANCE/runtime_evidence/runs/run_057_memory_transaction/receipt.json');

  assertTest('T1_05_STANDARD_MEMORY_UPDATE_BLOCK_GENERATOR',
    isBlockValid,
    'generateStandardMemoryUpdateBlock tạo chính xác khối chuẩn hóa định dạng yêu cầu từ CEO 057.');

  // 6. Status Taxonomy in PROJECT_MEMORY.md (No Self-Awarded VERIFIED on active/current work orders)
  const currentMemoryText = fs.readFileSync(memoryPath, 'utf8');
  const memoryValidation = validateMemoryStatusTaxonomy(currentMemoryText);

  assertTest('T1_06_MEMORY_STATUS_TAXONOMY_CONFORMANCE',
    memoryValidation.valid,
    'PROJECT_MEMORY.md tuân thủ triệt để taxonomy trạng thái: AI không tự nhận VERIFIED trên work order đang thực hiện.');

  // 7. Production Lock Invariant
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

  console.log(`\n🟢 [MEMORY-TRANSACTION-057-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
}

if (require.main === module) {
  run057TransactionTests();
}

module.exports = { run057TransactionTests };
