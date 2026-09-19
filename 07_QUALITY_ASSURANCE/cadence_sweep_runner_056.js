/**
 * JAYT AUTHORIZED CADENCE SWEEP RUNNER (056)
 * Directive: JAYT-AUTHORIZED-CADENCE-SCAN-056 / JAYT-PROJECT-MEMORY-TRANSACTION-057
 * 
 * Operational Rules:
 * 1. Exclusively drives sweeps through DOM Container Scoped Truth Gate (055D Engine).
 * 2. Parses CLI flags: `--cycle <CYCLE>`, `--reprocess-only`, `--live`, `--work-order <WO>`, `--is-test`, `--receipts-dir`, `--review-sheets-dir`, etc.
 * 3. Filters target sources according to cycle definition in `05_DEAL_AND_AFFILIATE/content_coverage_schedule.json`.
 * 4. If a single DOM container contains all 4 verified factors (price, date_window, conditions, locality in Da Nang):
 *    - Generates a structured Candidate Review Sheet for CEO approval in the designated reviewSheetsDir.
 *    - Absolutely ZERO auto-rendering, ZERO auto-import into production feed.
 * 5. If any factor is missing -> fail-closed (NEEDS_RECHECK, 4 claims null).
 * 6. Production Lock Invariant: deals_feed.json: [], is_approved: false (LOCKED).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const { runDailyPublicSweep055, TARGET_SOURCES } = require('./execute_daily_public_sweep_055');
const schedulePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'content_coverage_schedule.json');
const candidatesDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

fs.mkdirSync(candidatesDir, { recursive: true });

function getSha256(strOrBuf) {
  if (!strOrBuf) return null;
  return crypto.createHash('sha256').update(strOrBuf).digest('hex');
}

/**
 * Filter sources according to cycle definition in content_coverage_schedule.json
 */
function getSourcesForCycle(cycleName) {
  if (!cycleName || cycleName === 'ALL') {
    return TARGET_SOURCES;
  }

  if (!fs.existsSync(schedulePath)) {
    return TARGET_SOURCES;
  }

  try {
    const schedule = JSON.parse(fs.readFileSync(schedulePath, 'utf8'));
    const cycleInfo = schedule.cycles ? schedule.cycles[cycleName] : null;

    if (!cycleInfo || !Array.isArray(cycleInfo.brands)) {
      return TARGET_SOURCES;
    }

    if (cycleInfo.brands.includes('ALL_REGISTERED_BRANDS')) {
      return TARGET_SOURCES;
    }

    const filtered = TARGET_SOURCES.filter(src => cycleInfo.brands.includes(src.brand_id));
    return filtered.length > 0 ? filtered : TARGET_SOURCES;
  } catch (e) {
    return TARGET_SOURCES;
  }
}

/**
 * Generates an immutable CEO Review Sheet artifact if a new deal is fully qualified.
 */
function generateCeoReviewSheet(candidateResult, customOutputDir = null) {
  const brand = candidateResult.brand_id;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const targetDir = customOutputDir || candidatesDir;
  fs.mkdirSync(targetDir, { recursive: true });
  const reviewSheetPath = path.join(targetDir, `CEO_REVIEW_SHEET_${brand}_${timestamp}.md`);

  const { price, date_window, conditions, locality } = candidateResult.qualified_claims;
  const { container_locator, container_outer_html_sha256, container_text_sha256, container_text_length } = candidateResult.dom_container_scope;

  let md = `# HỒ SƠ THẨM DUYỆT BẰNG CHỨNG DEAL THẬT (CEO REVIEW SHEET)\n\n`;
  md += `> **Thương hiệu**: \`${brand}\`  \n`;
  md += `> **Cụm giá trị**: \`${candidateResult.category}\`  \n`;
  md += `> **Thời điểm thẩm định**: \`${candidateResult.captured_at}\`  \n`;
  md += `> **Trạng thái**: \`PENDING_CEO_APPROVAL (CHỜ CEO KÝ DUYỆT)\`  \n`;
  md += `> **Quy tắc an toàn**: \`ZERO-MUTATION BOUNDARY: Không tự import vào production feed, không tự render\`  \n\n`;
  md += `## 1. Định Danh Khối DOM Container Khuyến Mãi (DOM Provenance)\n\n`;
  md += `- **CSS Selector / Locator**: \`${container_locator}\`\n`;
  md += `- **Mã băm outerHTML SHA-256**: \`${container_outer_html_sha256}\`\n`;
  md += `- **Mã băm Text SHA-256**: \`${container_text_sha256}\`\n`;
  md += `- **Độ dài ký tự trong khối**: \`${container_text_length} chars\`\n\n`;
  md += `## 2. Bốn Yếu Tố Sự Thật Đồng Vị Trí Trong Container\n\n`;
  md += `1. **Mức giá xác thực (Price)**: \`${price?.verbatim_quote || 'null'}\` (Đơn vị: \`${price?.currency || 'VND'}\`)\n`;
  md += `2. **Hạn dùng xác thực (Date Window)**: \`${date_window?.verbatim_quote || 'null'}\` (ISO: \`${date_window?.parsed_iso || 'null'}\`, Còn hạn: \`${date_window?.is_unexpired}\`)\n`;
  md += `3. **Phạm vi địa phương (Locality)**: \`${locality?.verbatim_quote || 'null'}\` (Địa chỉ: \`${locality?.locality_address || 'null'}\`)\n`;
  md += `4. **Điều khoản áp dụng (Conditions)**: \`${Array.isArray(conditions) ? conditions.map(c => c.verbatim_quote).join('; ') : 'null'}\`\n\n`;
  md += `## 3. Quyết Định Của CEO\n\n`;
  md += `[ ] **PHÊ DUYỆT NHẬP STAGING**  \n`;
  md += `[ ] **TỪ CHỐI / YÊU CẦU THU THẬP LẠI (NEEDS_RECHECK)**  \n\n`;
  md += `*Ký tên / Xác nhận: CEO Jay Trần*  \n`;

  fs.writeFileSync(reviewSheetPath, md, 'utf8');
  console.log(`  📝 [REVIEW-SHEET-GENERATED] Đã tạo Review Sheet trình CEO: ${reviewSheetPath}`);
  return reviewSheetPath;
}

/**
 * Parses command-line arguments
 */
function parseCliArgs(argv) {
  const options = {
    cycle: null,
    reprocessOnly: false,
    live: false,
    workOrder: null,
    isTest: false,
    artifactsDir: null,
    receiptsDir: null,
    reviewSheetsDir: null,
    summaryPath: null,
    reportPath: null,
    baselinePath: null
  };

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--cycle' && argv[i + 1]) {
      options.cycle = argv[++i];
    } else if (arg === '--reprocess-only' || arg === '--reprocess') {
      options.reprocessOnly = true;
    } else if (arg === '--live') {
      options.live = true;
    } else if (arg === '--work-order' && argv[i + 1]) {
      options.workOrder = argv[++i];
    } else if (arg === '--is-test') {
      options.isTest = true;
    } else if (arg === '--artifacts-dir' && argv[i + 1]) {
      options.artifactsDir = argv[++i];
    } else if (arg === '--receipts-dir' && argv[i + 1]) {
      options.receiptsDir = argv[++i];
    } else if (arg === '--review-sheets-dir' && argv[i + 1]) {
      options.reviewSheetsDir = argv[++i];
    } else if (arg === '--summary-path' && argv[i + 1]) {
      options.summaryPath = argv[++i];
    } else if (arg === '--report-path' && argv[i + 1]) {
      options.reportPath = argv[++i];
    } else if (arg === '--baseline-path' && argv[i + 1]) {
      options.baselinePath = argv[++i];
    }
  }

  // Default mode logic:
  // If not explicitly --live and not explicitly --reprocess-only, default to reprocessOnly for safety unless running under scheduler
  if (!options.live && !options.reprocessOnly) {
    options.reprocessOnly = true; // safe default
  }

  return options;
}

/**
 * Cadence Runner Entry Point.
 */
async function runAuthorizedCadence(options = {}) {
  const isTest = options.isTest === true || (options.workOrder && options.workOrder.includes('TEST'));
  const isReprocessOnly = options.reprocessOnly === true && !options.live;
  const cycleName = options.cycle || null;
  const workOrder = options.workOrder || 'JAYT-AUTHORIZED-CADENCE-SCAN-056';

  const targetSources = options.sources || getSourcesForCycle(cycleName);

  const targetReviewDir = options.reviewSheetsDir || (isTest
    ? path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_candidates')
    : candidatesDir);

  console.log(`\n=============================================================`);
  console.log(`⏱️ [JAYT-CADENCE-056] KHỞI CHẠY CHU KỲ QUÉT VẬN HÀNH ĐƯỢC ỦY QUYỀN`);
  console.log(`   Directive: ${workOrder}`);
  console.log(`   Cycle:     ${cycleName || 'ALL_SOURCES'}`);
  console.log(`   Sources:   ${targetSources.length} nguồn mục tiêu`);
  console.log(`   Engine:    055D DOM Container Scoped Truth Gate`);
  console.log(`   Mode:      ${isReprocessOnly ? 'REPROCESS_EXISTING_ARTIFACTS' : 'LIVE_CHROME_CDP_SWEEP'}`);
  console.log(`=============================================================\n`);

  // Execute sweep through 055D engine
  const sweepSummary = await runDailyPublicSweep055({
    sources: targetSources,
    reprocessOnly: isReprocessOnly,
    workOrder: workOrder,
    isTest: isTest,
    artifactsDir: options.artifactsDir,
    receiptsDir: options.receiptsDir,
    summaryPath: options.summaryPath,
    reportPath: options.reportPath,
    baselinePath: options.baselinePath
  });

  // Check if any new candidate achieved full container qualification
  const generatedSheets = [];
  if (sweepSummary.results && Array.isArray(sweepSummary.results)) {
    for (const item of sweepSummary.results) {
      if (item.brand_id !== 'CGV' && item.status === 'QUALIFIED_RAW_CAPTURE' && item.dom_container_scope && item.dom_container_scope.is_container_scoped) {
        const sheetPath = generateCeoReviewSheet(item, targetReviewDir);
        generatedSheets.push(sheetPath);
      }
    }
  }

  // Verify Production Lock Invariant
  const prodFeed = JSON.parse(fs.readFileSync(prodFeedPath, 'utf8'));
  const prodSha = getSha256(fs.readFileSync(prodFeedPath, 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = manifest.governance_locks?.immutable_ceo_approval_record?.is_approved === true;

  if (prodFeed.length > 0 || isApproved || prodSha !== '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945') {
    throw new Error('FATAL: Production Lock Invariant Violated during cadence sweep!');
  }

  console.log(`\n🔒 [CADENCE-056-LOCK-VERIFIED] Production lock bất biến: deals_feed.json: [] (SHA-256: ${prodSha}), is_approved: false (LOCKED).`);
  console.log(`📋 [CADENCE-056-RESULT] Review sheets tạo mới: ${generatedSheets.length}. Deal staging nội bộ: 1 (CGV). Deal recheck: ${sweepSummary.deals_in_recheck}.\n`);

  return {
    sweepSummary,
    generatedSheets,
    production_locked: true
  };
}

if (require.main === module) {
  const cliOptions = parseCliArgs(process.argv);
  runAuthorizedCadence(cliOptions).then(() => {
    process.exit(0);
  }).catch(err => {
    console.error('❌ [CADENCE-056-ERROR]:', err);
    process.exit(1);
  });
}

module.exports = {
  runAuthorizedCadence,
  generateCeoReviewSheet,
  getSourcesForCycle,
  parseCliArgs
};
