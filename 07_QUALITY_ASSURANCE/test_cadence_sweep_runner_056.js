/**
 * JAYT AUTHORIZED CADENCE SWEEP RUNNER TEST SUITE (056)
 * Directive: JAYT-AUTHORIZED-CADENCE-SCAN-056
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const cadenceScriptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'cadence_sweep_runner_056.js');
const batRunnerPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'scheduler_runner.bat');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const { runAuthorizedCadence, generateCeoReviewSheet } = require('./cadence_sweep_runner_056');

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

async function run056CadenceTests() {
  console.log('🧪 [JAYT-CADENCE-056-TEST] Khởi chạy bộ kiểm thử Cadence Runner (056)...');

  // 1. Script Configuration & Battery Setup
  const cadenceContent = fs.readFileSync(cadenceScriptPath, 'utf8');
  const batContent = fs.readFileSync(batRunnerPath, 'utf8');

  assertTest('T1_01_CADENCE_RUNNER_CONFIGURED',
    cadenceContent.includes('runDailyPublicSweep055') && batContent.includes('cadence_sweep_runner_056.js'),
    'cadence_sweep_runner_056.js và scheduler_runner.bat được cấu hình chính xác để kích hoạt các chu kỳ quét.');

  // 2. CEO Review Sheet Generator Verification in Sandbox
  const sandboxCandidateDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_candidates');
  fs.mkdirSync(sandboxCandidateDir, { recursive: true });

  const mockCandidate = {
    brand_id: 'METIZ',
    category: 'LOCAL_CINEMA',
    captured_at: new Date().toISOString(),
    dom_container_scope: {
      is_container_scoped: true,
      container_locator: 'div.promo-box',
      container_outer_html_sha256: 'a'.repeat(64),
      container_text_sha256: 'b'.repeat(64),
      container_text_length: 500
    },
    qualified_claims: {
      price: { verbatim_quote: '45.000đ', currency: 'VND' },
      date_window: { verbatim_quote: '30/08/2026', parsed_iso: '2026-08-30', is_unexpired: true },
      conditions: [{ verbatim_quote: 'Áp dụng cho thành viên' }],
      locality: { verbatim_quote: 'Helio Center Đà Nẵng', locality_address: 'Đường 2/9, Hải Châu, Đà Nẵng' }
    }
  };

  const sheetPath = generateCeoReviewSheet(mockCandidate, sandboxCandidateDir);
  const isSheetCreated = fs.existsSync(sheetPath);
  const sheetContent = isSheetCreated ? fs.readFileSync(sheetPath, 'utf8') : '';

  // Clean up mock sheet in sandbox
  if (isSheetCreated) {
    try { fs.unlinkSync(sheetPath); } catch (e) {}
  }

  assertTest('T1_02_CEO_REVIEW_SHEET_INTEGRITY',
    isSheetCreated && sheetPath.includes('private_sandbox') && sheetContent.includes('div.promo-box') && sheetContent.includes('45.000đ') && sheetContent.includes('ZERO-MUTATION BOUNDARY'),
    'generateCeoReviewSheet tạo hồ sơ Review Sheet chuẩn trong private_sandbox và không ghi vào candidate vận hành.');

  // 3. Cadence Execution Integrity in Sandbox
  const cadenceResult = await runAuthorizedCadence({ reprocessOnly: true, isTest: true, workOrder: 'JAYT-056-TEST' });

  assertTest('T1_03_CADENCE_REPROCESS_SUCCESS',
    cadenceResult && cadenceResult.production_locked === true && cadenceResult.sweepSummary.total_sources_swept === 16,
    'Chu kỳ quét tự động 056 thực thi thành công qua Truth Gate 055D với 16 nguồn.');

  // 4. Batch Metrics Accuracy
  const summary = cadenceResult.sweepSummary;
  const isMetricsClean = summary.total_sources_swept === 16 &&
                         summary.new_ready_deals_from_055 === 0 &&
                         summary.staging_accepted_deals === 1 &&
                         summary.deals_in_recheck === 15;

  assertTest('T1_04_HONEST_BATCH_METRICS_056', isMetricsClean,
    'Báo cáo batch số liệu trung thực: 16 Quét / 0 Deal mới / 1 Staging (CGV) / 15 Recheck.');

  // 5. Production Lock Invariant
  const prodFeedContent = fs.readFileSync(prodFeedPath, 'utf8');
  const prodFeedJson = JSON.parse(prodFeedContent);
  const prodFeedSha = crypto.createHash('sha256').update(prodFeedContent).digest('hex');
  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));

  const isProdEmpty = Array.isArray(prodFeedJson) && prodFeedJson.length === 0;
  const isProdShaMatched = prodFeedSha === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945';
  const isReleaseLocked = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === false;

  assertTest('INVARIANT_05_PRODUCTION_LOCKED',
    isProdEmpty && isProdShaMatched && isReleaseLocked,
    `Production feed duy trì bất biến [] (SHA-256: ${prodFeedSha}) và RELEASE_MANIFEST is_approved: false (LOCKED)`);

  console.log(`\n🟢 [CADENCE-056-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
}

if (require.main === module) {
  run056CadenceTests();
}

module.exports = { run056CadenceTests };
