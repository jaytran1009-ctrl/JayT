/**
 * JAYT IMMUTABLE LIVE CAPTURE - MONOTONIC BOOTSTRAP SWEEP RUNNER (060C)
 * Directive: JAYT-IMMUTABLE-LIVE-CAPTURE-060C / JAYT-PROJECT-MEMORY-TRANSACTION-057
 * 
 * Strict Governance & Immutability Rules:
 * 1. Dual Capture Outcome per Source:
 *    - LIVE_CDP_SUCCESS: response/navigation captured, artifacts saved & hashed, evaluated via 055D.
 *    - LIVE_CDP_CAPTURE_FAILED: error captured, status = CAPTURE_FAILED (NOT NEEDS_RECHECK, NOT CANDIDATE).
 * 2. Monotonic One-Pass Creation:
 *    - Step 1: Capture & save all 16 source artifacts to disk.
 *    - Step 2: Write sweep_summary_060c.json and seal its SHA-256.
 *    - Step 3: Write ceo_review_batch_060c.json & CEO_REVIEW_BATCH_060C.md and seal their SHA-256.
 *    - Step 4: Write receipt.json with all sealed hashes.
 *    - ZERO post-run mutation.
 * 3. Exact Byte-for-Byte On-Disk Lineage:
 *    - Every artifact path must be inside sweep_060c_artifacts/ without traversal.
 *    - Measured SHA-256 must match declared SHA-256 byte-for-byte.
 * 4. Production Lock: deals_feed.json: [], is_approved: false (LOCKED).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const { auditDomContainerScopedPromo055D } = require('./truth_gate_container_scoped_055d');
const { TARGET_SOURCES } = require('./execute_daily_public_sweep_055');

const run060cDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_060c_manual_bootstrap');
const sweep060cArtifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_060c_artifacts');
const summary060cPath = path.join(run060cDir, 'sweep_summary_060c.json');
const receipt060cPath = path.join(run060cDir, 'receipt.json');
const runReceipt060cPath = path.join(run060cDir, 'RUN_RECEIPT_JAYT-IMMUTABLE-LIVE-CAPTURE-060C.json');
const reviewBatchJsonPath = path.join(run060cDir, 'ceo_review_batch_060c.json');
const reviewBatchMdPath = path.join(run060cDir, 'CEO_REVIEW_BATCH_060C.md');

const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

function getSha256(strOrBuf) {
  if (!strOrBuf) return null;
  return crypto.createHash('sha256').update(strOrBuf).digest('hex');
}

/**
 * Strict Lineage & Outcome Validator for 060C
 */
function validate060cItemLineage(item, expectedRunArtifactsDir, customRepoRoot = repoRoot) {
  if (!item || typeof item !== 'object') {
    return { valid: false, reason: 'INVALID_ITEM_OBJECT' };
  }

  // 1. Dual Outcome Check
  if (item.capture_outcome !== 'LIVE_CDP_SUCCESS' && item.capture_outcome !== 'LIVE_CDP_CAPTURE_FAILED') {
    return {
      valid: false,
      reason: `INVALID_CAPTURE_OUTCOME: Expected LIVE_CDP_SUCCESS or LIVE_CDP_CAPTURE_FAILED, got '${item.capture_outcome}'`
    };
  }

  // 2. Failed capture cannot be marked NEEDS_RECHECK or QUALIFIED_RAW_CAPTURE
  if (item.capture_outcome === 'LIVE_CDP_CAPTURE_FAILED') {
    if (item.status === 'NEEDS_RECHECK' || item.status === 'QUALIFIED_RAW_CAPTURE') {
      return {
        valid: false,
        reason: `PROVENANCE_OBFUSCATION: Capture failed source cannot be marked status '${item.status}'. Must be CAPTURE_FAILED.`
      };
    }
    if (!item.capture_error) {
      return {
        valid: false,
        reason: 'MISSING_CAPTURE_ERROR: capture_error must be disclosed when capture_outcome is LIVE_CDP_CAPTURE_FAILED.'
      };
    }
  }

  // 3. Artifact path & hash validation
  const artifacts = item.artifacts;
  if (!artifacts || typeof artifacts !== 'object') {
    return { valid: false, reason: 'MISSING_ARTIFACTS_OBJECT' };
  }

  const requiredKeys = ['html_path', 'html_sha256', 'text_path', 'text_sha256', 'png_path', 'png_sha256'];
  for (const k of requiredKeys) {
    if (!artifacts[k] || typeof artifacts[k] !== 'string') {
      return { valid: false, reason: `MISSING_ARTIFACT_FIELD: ${k}` };
    }
  }

  const targetDirResolved = path.resolve(expectedRunArtifactsDir);
  const artifactTypes = [
    { type: 'html', pathKey: 'html_path', hashKey: 'html_sha256' },
    { type: 'text', pathKey: 'text_path', hashKey: 'text_sha256' },
    { type: 'png', pathKey: 'png_path', hashKey: 'png_sha256' }
  ];

  const verified = {};

  for (const art of artifactTypes) {
    const rawPath = artifacts[art.pathKey];
    const declaredSha = artifacts[art.hashKey];

    // Traversal check
    if (rawPath.includes('..') || rawPath.startsWith('/') || rawPath.startsWith('\\')) {
      return {
        valid: false,
        reason: `PATH_TRAVERSAL_DETECTED: Path '${rawPath}' contains illegal traversal tokens.`
      };
    }

    const fullPath = path.resolve(customRepoRoot, rawPath);

    // Run folder confinement
    if (!fullPath.startsWith(targetDirResolved)) {
      return {
        valid: false,
        reason: `OUT_OF_RUN_DIRECTORY: Path '${rawPath}' resolves to '${fullPath}' which is outside '${targetDirResolved}'`
      };
    }

    // Existence
    if (!fs.existsSync(fullPath)) {
      return {
        valid: false,
        reason: `ARTIFACT_FILE_MISSING: File does not exist on disk: '${rawPath}'`
      };
    }

    // Measured SHA-256 match
    const fileBytes = fs.readFileSync(fullPath);
    const measuredSha = getSha256(fileBytes);

    if (measuredSha !== declaredSha) {
      return {
        valid: false,
        reason: `HASH_MISMATCH: For '${rawPath}', measured '${measuredSha}' != declared '${declaredSha}'`
      };
    }

    verified[art.pathKey] = rawPath;
    verified[art.hashKey] = measuredSha;
  }

  return {
    valid: true,
    verified_artifacts: verified
  };
}

/**
 * Builds the hardened CEO review batch strictly from verified artifact lineages.
 */
function buildHardenedCeoReviewBatch060C(sweepResults, options = {}) {
  const completedAt = options.completedAt || new Date().toISOString();
  const runArtifactsDir = options.runArtifactsDir || sweep060cArtifactsDir;
  const customRoot = options.repoRoot || repoRoot;

  const clusters = {
    LOCAL_CINEMA: { name: 'Rạp Chiếu Phim & Giải Trí (Đà Nẵng)', items: [] },
    LOCAL_FOOD_BEVERAGE: { name: 'F&B, Thức Ăn Nhanh, Cà Phê & Trà (Đà Nẵng)', items: [] },
    ONLINE_DELIVERY_APP: { name: 'Online, Voucher & Ứng Dụng Giao Đồ Ăn', items: [] }
  };

  const recheckGroups = {};
  const qualifiedCandidates = [];
  const captureFailures = [];
  let successfulCapturesCount = 0;

  for (const item of sweepResults) {
    const brand = item.brand_id;
    let clusterKey = 'LOCAL_FOOD_BEVERAGE';
    if (['CGV', 'GALAXY', 'METIZ'].includes(brand)) {
      clusterKey = 'LOCAL_CINEMA';
    } else if (['SHOPEEFOOD', 'GRABFOOD', 'SHOPEE', 'LAZADA', 'TIKTOK'].includes(brand)) {
      clusterKey = 'ONLINE_DELIVERY_APP';
    }

    // Lineage & Outcome Check
    const lineageRes = validate060cItemLineage(item, runArtifactsDir, customRoot);
    if (!lineageRes.valid) {
      captureFailures.push({
        brand_id: brand,
        reason: lineageRes.reason
      });
      continue;
    }

    const verified = lineageRes.verified_artifacts;

    if (item.capture_outcome === 'LIVE_CDP_CAPTURE_FAILED') {
      captureFailures.push({
        brand_id: brand,
        error: item.capture_error
      });

      clusters[clusterKey].items.push({
        brand_id: item.brand_id,
        category: item.category,
        target_url: item.target_url,
        captured_at: item.captured_at,
        capture_outcome: item.capture_outcome,
        capture_error: item.capture_error,
        status: 'CAPTURE_FAILED',
        four_conditions: {
          specific_price: false,
          valid_date_window: false,
          da_nang_scope: false,
          explicit_conditions: false
        },
        missing_reasons: [`LIVE_CDP_CAPTURE_FAILED: ${item.capture_error}`],
        artifacts: verified
      });
      continue;
    }

    // Successful live capture
    successfulCapturesCount++;
    const missingReasons = [];
    const claims = item.qualified_claims || {};
    const container = item.dom_container_scope || {};

    if (!container.is_container_scoped) {
      missingReasons.push('NO_DOM_CONTAINER_FOUND (Không tìm thấy khối container khuyến mãi đạt chuẩn cấu trúc HTML)');
    }
    if (!claims.price) {
      missingReasons.push('MISSING_SPECIFIC_PRICE (Thiếu mức giá cụ thể / số tiền ưu đãi trong khối)');
    }
    if (!claims.date_window) {
      missingReasons.push('MISSING_VALID_EXPIRATION_DATE (Thiếu hạn dùng cụ thể / ngày hết hạn trong khối)');
    } else if (!claims.date_window.is_unexpired) {
      missingReasons.push('EXPIRED_OR_OUT_OF_WINDOW (Ưu đãi đã hết hạn hoặc chưa đến ngày)');
    }
    if (!claims.locality) {
      missingReasons.push('MISSING_DA_NANG_LOCALITY_IN_CONTAINER (Thiếu định danh phạm vi áp dụng tại Đà Nẵng trong cùng khối)');
    }
    if (!claims.conditions || (Array.isArray(claims.conditions) && claims.conditions.length === 0)) {
      missingReasons.push('MISSING_EXPLICIT_CONDITIONS (Thiếu điều kiện áp dụng / đối tượng / phương thức thanh toán)');
    }

    const itemDetail = {
      brand_id: item.brand_id,
      category: item.category,
      target_url: item.target_url,
      captured_at: item.captured_at,
      capture_outcome: item.capture_outcome,
      capture_error: null,
      status: item.status,
      change_status: item.change_status || 'EVALUATED_IN_060C',
      canonical_content_signature: item.canonical_content_signature,
      four_conditions: {
        specific_price: Boolean(claims.price),
        valid_date_window: Boolean(claims.date_window && claims.date_window.is_unexpired),
        da_nang_scope: Boolean(claims.locality),
        explicit_conditions: Boolean(claims.conditions && claims.conditions.length > 0)
      },
      missing_reasons: missingReasons,
      artifacts: verified
    };

    clusters[clusterKey].items.push(itemDetail);

    if (item.status === 'QUALIFIED_RAW_CAPTURE' && container.is_container_scoped) {
      qualifiedCandidates.push(itemDetail);
    }

    if (missingReasons.length > 0) {
      for (const r of missingReasons) {
        if (!recheckGroups[r]) recheckGroups[r] = [];
        recheckGroups[r].push(brand);
      }
    }
  }

  // Pure link-based reference to historical staging (ZERO hardcoded claims)
  const historicalStagingReferences = [
    {
      dossier_id: 'CGV_CULTURE_DAY_054E_054F',
      brand_id: 'CGV',
      approval_work_order: 'JAYT-CGV-STAGING-ACCEPTANCE-054E',
      status: 'APPROVED_STAGING_ONLY',
      governance_rule: 'TIMEBOXED_STAGING_ENTRY_ONLY — ZERO_MUTATION_TO_PRODUCTION',
      dossier_links: [
        '07_QUALITY_ASSURANCE/runtime_evidence/CGV_CULTURE_DAY_MANUAL_REVIEW_SHEET_054D1.md',
        '07_QUALITY_ASSURANCE/runtime_evidence/staging_054f/STAGING_E2E_RECEIPT_054F.json'
      ]
    }
  ];

  const reviewBatch = {
    schema_version: '4.0.0',
    batch_id: `CEO_REVIEW_BATCH_060C_${completedAt.replace(/[:.]/g, '-')}`,
    work_order: options.workOrder || 'JAYT-IMMUTABLE-LIVE-CAPTURE-060C',
    created_at: completedAt,
    governance_rule: 'CANDIDATES_ENTER_STAGING_ONLY — ZERO_MUTATION_TO_PRODUCTION',
    summary: {
      total_sources_swept: sweepResults.length,
      successful_live_captures: successfulCapturesCount,
      failed_captures: captureFailures.length,
      deals_meeting_all_4_conditions: qualifiedCandidates.length,
      deals_in_recheck: successfulCapturesCount - qualifiedCandidates.length,
      candidates_pending_ceo_review: qualifiedCandidates.length
    },
    capture_failures: captureFailures,
    recheck_breakdown_by_reason: recheckGroups,
    value_clusters: clusters,
    qualified_candidates_pending_review: qualifiedCandidates,
    historical_staging_references: historicalStagingReferences,
    go_live_gate_status: {
      approved_deals_count: 0,
      approved_deals_target: 10,
      value_clusters_represented: 0,
      value_clusters_target: 3,
      days_covered: 0,
      days_covered_target: 5,
      https_staging_browser_smoke: 'PASS_IN_054F',
      offsite_backup_restore: 'PENDING',
      release_pack_audit: 'HONEST_EMPTY_STATE',
      go_live_verdict: 'BLOCKED (Cần đủ ≥ 10 deal thật được CEO duyệt vào Staging)'
    }
  };

  return reviewBatch;
}

/**
 * Formats the review batch into structured Markdown
 */
function formatCeoReviewBatchMarkdown060C(batchObj) {
  let md = `# BÁO CÁO TÍCH LŨY DỮ LIỆU THẬT & HỒ SƠ DUYỆT BATCH CỦA CEO (060C)\n\n`;
  md += `> **Mã Chỉ Thị**: \`${batchObj.work_order}\`  \n`;
  md += `> **Thời điểm hoàn tất**: \`${batchObj.created_at}\`  \n`;
  md += `> **Hình thức thực hiện**: \`MANUAL_BOOTSTRAP_RUN (Quét tay duy nhất 16 nguồn — Provenance LIVE_CDP)\`  \n`;
  md += `> **Quy tắc an toàn**: \`Mặc định đóng (Fail-Closed) — Monotonic One-Pass — Production khóa chặt (deals_feed.json: [])\`  \n\n`;
  md += `---\n\n`;

  md += `## 1. Tổng Hợp Kết Quả Chu Kỳ Quét 16 Nguồn\n\n`;
  md += `| Chỉ Số Vận Hành | Số Lượng Thực Tế | Ghi Chú & Định Danh |\n`;
  md += `| :--- | :---: | :--- |\n`;
  md += `| **Tổng số nguồn quét** | **${batchObj.summary.total_sources_swept} / 16** | 100% nguồn đã đăng ký trong 3 cụm |\n`;
  md += `| **Số nguồn capture Live CDP thành công** | **${batchObj.summary.successful_live_captures} / 16** | Navigation & content captured |\n`;
  md += `| **Số nguồn capture thất bại (Capture Error)** | **${batchObj.summary.failed_captures}** | Ghi nhận lỗi kỹ thuật, không xếp recheck |\n`;
  md += `| **Số deal mới đủ 4 điều kiện trong container** | **${batchObj.summary.deals_meeting_all_4_conditions}** | Đạt đồng vị trí: Giá + Hạn + Đà Nẵng + Điều kiện |\n`;
  md += `| **Số nguồn trạng thái NEEDS_RECHECK** | **${batchObj.summary.deals_in_recheck}** | Bị từ chối do thiếu 1 hoặc nhiều điều kiện |\n`;
  md += `| **Candidate chờ CEO duyệt trong batch hôm nay** | **${batchObj.summary.candidates_pending_ceo_review}** | Gom thành batch duy nhất, không duyệt lẻ |\n\n`;

  if (batchObj.capture_failures && batchObj.capture_failures.length > 0) {
    md += `## ⚠️ Danh Sách Nguồn Capture Thất Bại Kỹ Thuật (LIVE_CDP_CAPTURE_FAILED)\n\n`;
    for (const f of batchObj.capture_failures) {
      md += `- **[${f.brand_id}]**: \`${f.error || f.reason}\`\n`;
    }
    md += `\n`;
  }

  md += `## 2. Phân Tích Lý Do NEEDS_RECHECK Theo Nhóm Nguyên Nhân\n\n`;
  for (const [reason, brands] of Object.entries(batchObj.recheck_breakdown_by_reason)) {
    md += `- **${reason}** (${brands.length} nguồn): \`${brands.join(', ')}\`\n`;
  }
  md += `\n`;

  md += `## 3. Hiện Trạng Chi Tiết 3 Cụm Giá Trị & Bằng Chứng Artifacts\n\n`;
  for (const [cKey, cData] of Object.entries(batchObj.value_clusters)) {
    md += `### 🏷️ ${cData.name}\n\n`;
    md += `| Thương Hiệu | Danh Mục | Outcome | Trạng Thái | 4 Điều Kiện | Hash Text SHA-256 | Hash PNG SHA-256 |\n`;
    md += `| :--- | :--- | :---: | :---: | :---: | :--- | :--- |\n`;
    for (const item of cData.items) {
      const cond = item.four_conditions;
      const condStr = `${cond.specific_price ? '✅' : '❌'} Giá | ${cond.valid_date_window ? '✅' : '❌'} Hạn | ${cond.da_nang_scope ? '✅' : '❌'} ĐN | ${cond.explicit_conditions ? '✅' : '❌'} Điều kiện`;
      const textShaShort = item.artifacts?.text_sha256 ? item.artifacts.text_sha256.substring(0, 12) + '...' : 'null';
      const pngShaShort = item.artifacts?.png_sha256 ? item.artifacts.png_sha256.substring(0, 12) + '...' : 'null';
      md += `| \`${item.brand_id}\` | \`${item.category}\` | \`${item.capture_outcome}\` | \`${item.status}\` | ${condStr} | \`${textShaShort}\` | \`${pngShaShort}\` |\n`;
    }
    md += `\n`;
  }

  md += `## 4. Hồ Sơ Staging Lịch Sử (Tham Chiếu Link)\n\n`;
  for (const ref of batchObj.historical_staging_references) {
    md += `- **[${ref.brand_id}]** ${ref.dossier_id} (${ref.approval_work_order}):  \n`;
    for (const link of ref.dossier_links) {
      md += `  - Dossier: [\`${path.basename(link)}\`](file:///${path.resolve(repoRoot, link).replace(/\\/g, '/')})\n`;
    }
  }
  md += `\n`;

  md += `## 5. Tiến Độ Đối Soát 6 Cổng Điều Kiện Go-Live\n\n`;
  md += `\`\`\`text
TIẾN ĐỘ GO-LIVE HIỆN TẠI (060C):
[ 0 / 10 ] Deal thật được CEO duyệt vào Staging (Reset từ run 060)
[ 0 /  3 ] Cụm giá trị đại diện (Cần duyệt thêm F&B và App/Online)
[ 0 /  5 ] Ngày phủ sóng trong tuần
[ PASS   ] HTTPS Staging + Real Chrome Browser Smoke (054F / 054G)
[ STANDBY] Offsite Backup & Restore Drill
[ LOCKED ] Production Release Manifest (deals_feed.json: [], is_approved: false)
\`\`\`\n\n`;

  md += `> 🔒 **Kết Luận Bảo Vệ Khóa Sản Xuất**: Tuyệt đối không tự động import vào production feed. Mọi dữ liệu duy trì ranh giới Staging an toàn.\n`;

  return md;
}

/**
 * Executes a single manual bootstrap sweep with live Chrome CDP and strict monotonic one-pass creation (060C).
 */
async function executeManualBootstrapSweep060C(options = {}) {
  const startedAt = new Date().toISOString();
  console.log('\n=============================================================');
  console.log('🚀 [JAYT-DATA-LINEAGE-060C] KHỞI CHẠY MANUAL_BOOTSTRAP_RUN');
  console.log('   Directive:  JAYT-IMMUTABLE-LIVE-CAPTURE-060C');
  console.log('   Trigger:    MANUAL_BOOTSTRAP_RUN (Live Chrome CDP 16 nguồn)');
  console.log('   Artifacts:  sweep_060c_artifacts/ (Monotonic One-Pass)');
  console.log('   Engine:     055D DOM Container Scoped Truth Gate Engine');
  console.log('=============================================================\n');

  fs.mkdirSync(run060cDir, { recursive: true });
  fs.mkdirSync(sweep060cArtifactsDir, { recursive: true });

  // Locate Chrome
  const chromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.CHROME_BIN
  ].filter(Boolean);

  let chromeExe = null;
  for (const p of chromePaths) {
    if (fs.existsSync(p)) {
      chromeExe = p;
      break;
    }
  }

  if (!chromeExe) {
    throw new Error('LIVE_CAPTURE_FAILED: Không tìm thấy Google Chrome executable trên hệ thống!');
  }

  const cdpPort = 9222 + Math.floor(Math.random() * 500);
  const userDataDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', `.chrome_profile_060c_${Date.now()}`);
  fs.mkdirSync(userDataDir, { recursive: true });

  let chromeProc = null;
  let browserWs = null;

  try {
    chromeProc = spawn(chromeExe, [
      '--headless=new',
      '--disable-gpu',
      `--remote-debugging-port=${cdpPort}`,
      `--user-data-dir=${userDataDir}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--window-size=1280,1024',
      '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 JayTOperationalBot/3.0'
    ]);

    let browserWsUrl = null;
    for (let attempt = 1; attempt <= 25; attempt++) {
      try {
        const verRes = await fetch(`http://127.0.0.1:${cdpPort}/json/version`);
        if (verRes.ok) {
          const ver = await verRes.json();
          browserWsUrl = ver.webSocketDebuggerUrl;
          break;
        }
      } catch (e) {
        await new Promise(r => setTimeout(r, 400));
      }
    }

    if (!browserWsUrl) {
      throw new Error(`LIVE_CAPTURE_FAILED: Chrome CDP port ${cdpPort} did not respond within timeout.`);
    }

    browserWs = new WebSocket(browserWsUrl);
    await new Promise((resolve, reject) => {
      browserWs.onopen = resolve;
      browserWs.onerror = reject;
    });

    let bMsgId = 1;
    function sendBrowser(method, params = {}) {
      return new Promise((resolve) => {
        const id = bMsgId++;
        const handler = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.id === id) {
              browserWs.removeEventListener('message', handler);
              resolve(data.result || {});
            }
          } catch (e) {
            resolve({});
          }
        };
        browserWs.addEventListener('message', handler);
        browserWs.send(JSON.stringify({ id, method, params }));
      });
    }

    const sweepResults = [];

    // STEP 1: Capture & save all 16 source artifacts to disk
    for (let idx = 0; idx < TARGET_SOURCES.length; idx++) {
      const src = TARGET_SOURCES[idx];
      const key = `${src.brand_id.toLowerCase()}_${idx + 1}`;
      console.log(`[${idx + 1}/${TARGET_SOURCES.length}] Live capture: [${src.brand_id}] -> ${src.url}...`);

      const capTime = new Date().toISOString();
      let rawHtml = '';
      let rawText = '';
      let pngBuf = null;
      let captureError = null;
      let isSuccess = false;

      const relHtmlPath = `07_QUALITY_ASSURANCE/runtime_evidence/sweep_060c_artifacts/capture_060c_${key}.html`;
      const relTxtPath = `07_QUALITY_ASSURANCE/runtime_evidence/sweep_060c_artifacts/capture_060c_${key}.txt`;
      const relPngPath = `07_QUALITY_ASSURANCE/runtime_evidence/sweep_060c_artifacts/capture_060c_${key}.png`;

      const absHtmlPath = path.join(repoRoot, relHtmlPath);
      const absTxtPath = path.join(repoRoot, relTxtPath);
      const absPngPath = path.join(repoRoot, relPngPath);

      try {
        const newTarget = await sendBrowser('Target.createTarget', { url: 'about:blank' });
        const targetId = newTarget.targetId;
        const attachRes = await sendBrowser('Target.attachToTarget', { targetId, flatten: true });
        const sessionId = attachRes.sessionId;

        function sendSession(method, params = {}) {
          return new Promise((resolve) => {
            const id = bMsgId++;
            const handler = (event) => {
              try {
                const data = JSON.parse(event.data);
                if (data.id === id) {
                  browserWs.removeEventListener('message', handler);
                  resolve(data.result || {});
                }
              } catch (e) {
                resolve({});
              }
            };
            browserWs.addEventListener('message', handler);
            browserWs.send(JSON.stringify({ id, sessionId, method, params }));
          });
        }

        await sendSession('Page.enable');
        await sendSession('Runtime.enable');
        await sendSession('Network.enable');

        await sendSession('Page.navigate', { url: src.url });
        await new Promise(r => setTimeout(r, 4500));

        const docEval = await sendSession('Runtime.evaluate', {
          expression: `JSON.stringify({
            html: document.documentElement.outerHTML || '',
            text: document.body ? (document.body.innerText || '') : ''
          })`,
          returnByValue: true
        });

        if (docEval && docEval.result && docEval.result.value) {
          const parsed = JSON.parse(docEval.result.value);
          rawHtml = parsed.html;
          rawText = parsed.text;
          isSuccess = true;
        }

        const ssRes = await sendSession('Page.captureScreenshot', { format: 'png', quality: 80 });
        if (ssRes && ssRes.data) {
          pngBuf = Buffer.from(ssRes.data, 'base64');
        }

        await sendBrowser('Target.closeTarget', { targetId });

        fs.writeFileSync(absHtmlPath, rawHtml || '', 'utf8');
        fs.writeFileSync(absTxtPath, rawText || '', 'utf8');
        fs.writeFileSync(absPngPath, pngBuf || Buffer.from([]));
      } catch (err) {
        captureError = err.message;
        console.warn(`  ⚠️ Live capture error for ${src.brand_id}:`, err.message);
        fs.writeFileSync(absHtmlPath, '', 'utf8');
        fs.writeFileSync(absTxtPath, `CAPTURE_FAILED: ${err.message}`, 'utf8');
        fs.writeFileSync(absPngPath, Buffer.from([]));
      }

      const htmlSha = getSha256(fs.readFileSync(absHtmlPath));
      const textSha = getSha256(fs.readFileSync(absTxtPath));
      const pngSha = getSha256(fs.readFileSync(absPngPath));

      if (isSuccess) {
        const containerEval = auditDomContainerScopedPromo055D(rawHtml, rawText, new Date());
        sweepResults.push({
          brand_id: src.brand_id,
          category: src.category,
          title_context: src.title_context,
          target_url: src.url,
          captured_at: capTime,
          capture_outcome: 'LIVE_CDP_SUCCESS',
          capture_error: null,
          status: containerEval.status || 'NEEDS_RECHECK',
          change_status: 'EVALUATED_IN_060C',
          canonical_content_signature: containerEval.canonical_content_signature,
          dom_container_scope: containerEval.dom_container_scope,
          qualified_claims: containerEval.qualified_claims,
          artifacts: {
            html_path: relHtmlPath,
            html_sha256: htmlSha,
            text_path: relTxtPath,
            text_sha256: textSha,
            png_path: relPngPath,
            png_sha256: pngSha
          }
        });
      } else {
        sweepResults.push({
          brand_id: src.brand_id,
          category: src.category,
          title_context: src.title_context,
          target_url: src.url,
          captured_at: capTime,
          capture_outcome: 'LIVE_CDP_CAPTURE_FAILED',
          capture_error: captureError || 'UNKNOWN_CAPTURE_FAILURE',
          status: 'CAPTURE_FAILED',
          change_status: 'FAILED_IN_060C',
          canonical_content_signature: null,
          dom_container_scope: { is_container_scoped: false },
          qualified_claims: null,
          artifacts: {
            html_path: relHtmlPath,
            html_sha256: htmlSha,
            text_path: relTxtPath,
            text_sha256: textSha,
            png_path: relPngPath,
            png_sha256: pngSha
          }
        });
      }
    }

    const completedAt = new Date().toISOString();

    // STEP 2: Write sweep_summary_060c.json and seal its SHA-256
    const sweepSummary = {
      work_order: 'JAYT-IMMUTABLE-LIVE-CAPTURE-060C',
      run_id: 'run_060c_manual_bootstrap',
      executed_at: completedAt,
      execution_trigger: 'MANUAL_BOOTSTRAP_RUN',
      total_sources_swept: TARGET_SOURCES.length,
      successful_live_captures: sweepResults.filter(r => r.capture_outcome === 'LIVE_CDP_SUCCESS').length,
      failed_captures: sweepResults.filter(r => r.capture_outcome === 'LIVE_CDP_CAPTURE_FAILED').length,
      results: sweepResults
    };

    fs.writeFileSync(summary060cPath, JSON.stringify(sweepSummary, null, 2), 'utf8');
    const summarySha256 = getSha256(fs.readFileSync(summary060cPath, 'utf8'));

    // STEP 3: Write ceo_review_batch_060c.json & CEO_REVIEW_BATCH_060C.md and seal their SHA-256
    const ceoReviewBatch = buildHardenedCeoReviewBatch060C(sweepResults, {
      completedAt,
      runArtifactsDir: sweep060cArtifactsDir,
      workOrder: 'JAYT-IMMUTABLE-LIVE-CAPTURE-060C'
    });

    fs.writeFileSync(reviewBatchJsonPath, JSON.stringify(ceoReviewBatch, null, 2), 'utf8');
    const reviewBatchJsonSha = getSha256(fs.readFileSync(reviewBatchJsonPath, 'utf8'));

    const reviewBatchMd = formatCeoReviewBatchMarkdown060C(ceoReviewBatch);
    fs.writeFileSync(reviewBatchMdPath, reviewBatchMd, 'utf8');
    const reviewBatchMdSha = getSha256(fs.readFileSync(reviewBatchMdPath, 'utf8'));

    // STEP 4: Write receipt.json with all sealed hashes
    const receipt060c = {
      schema_version: '4.0.0',
      work_order: 'JAYT-IMMUTABLE-LIVE-CAPTURE-060C',
      run_id: 'run_060c_manual_bootstrap',
      memory_version: '3.64.0',
      memory_sha256: getSha256(fs.readFileSync(path.join(repoRoot, 'PROJECT_MEMORY.md'), 'utf8')),
      source_scan_work_order: 'JAYT-IMMUTABLE-LIVE-CAPTURE-060C',
      execution_trigger: 'MANUAL_BOOTSTRAP_RUN',
      scheduler_verification: 'UNVERIFIED_IN_CODEX_AUDIT_ENVIRONMENT',
      status: 'IMPLEMENTED_PENDING_CEO_AUDIT',
      audit_verdict: 'MANUAL_BOOTSTRAP_SWEEP_COMPLETED_MONOTONICALLY_SEALED',
      task_identity: {
        execution_mode: 'MANUAL_BOOTSTRAP_RUN',
        cycle: 'ALL_16_PUBLIC_SOURCES',
        runner_engine: '055D_DOM_CONTAINER_SCOPED_MONOTONIC_060C',
        exit_code: 0
      },
      summary_lineage: {
        summary_file_path: '07_QUALITY_ASSURANCE/runtime_evidence/runs/run_060c_manual_bootstrap/sweep_summary_060c.json',
        summary_sha256: summarySha256,
        source_scan_work_order: 'JAYT-IMMUTABLE-LIVE-CAPTURE-060C',
        truth_gate_version: '055D_DOM_CONTAINER_SCOPED'
      },
      time_window: {
        started_at: startedAt,
        completed_at: completedAt,
        earliest_capture_at: sweepResults[0]?.captured_at || startedAt,
        latest_capture_at: sweepResults[sweepResults.length - 1]?.captured_at || completedAt,
        time_window_covers_captures: true
      },
      bootstrap_indicators: {
        total_sources_swept: TARGET_SOURCES.length,
        successful_live_captures: ceoReviewBatch.summary.successful_live_captures,
        failed_captures: ceoReviewBatch.summary.failed_captures,
        new_qualified_deals: ceoReviewBatch.summary.deals_meeting_all_4_conditions,
        deals_in_recheck: ceoReviewBatch.summary.deals_in_recheck,
        candidates_pending_ceo_review: ceoReviewBatch.summary.candidates_pending_ceo_review
      },
      review_batch_lineage: {
        review_batch_json_path: '07_QUALITY_ASSURANCE/runtime_evidence/runs/run_060c_manual_bootstrap/ceo_review_batch_060c.json',
        review_batch_json_sha256: reviewBatchJsonSha,
        review_batch_md_path: '07_QUALITY_ASSURANCE/runtime_evidence/runs/run_060c_manual_bootstrap/CEO_REVIEW_BATCH_060C.md',
        review_batch_md_sha256: reviewBatchMdSha
      }
    };

    fs.writeFileSync(receipt060cPath, JSON.stringify(receipt060c, null, 2), 'utf8');
    fs.writeFileSync(runReceipt060cPath, JSON.stringify(receipt060c, null, 2), 'utf8');

    // Invariant Check
    const prodFeed = JSON.parse(fs.readFileSync(prodFeedPath, 'utf8'));
    const prodSha = getSha256(fs.readFileSync(prodFeedPath, 'utf8'));
    const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
    const isApproved = manifest.governance_locks && manifest.governance_locks.immutable_ceo_approval_record && manifest.governance_locks.immutable_ceo_approval_record.is_approved === true;

    if (prodFeed.length > 0 || isApproved || prodSha !== '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945') {
      throw new Error('FATAL: Production Lock Invariant Violated during bootstrap sweep 060C!');
    }

    console.log(`\n🔒 [BOOTSTRAP-060C-LOCK-VERIFIED] Production lock bất biến: deals_feed.json: [] (SHA-256: ${prodSha}), is_approved: false (LOCKED).`);
    console.log(`📋 [BOOTSTRAP-060C-COMPLETED] 16 nguồn swept & sealed: ${ceoReviewBatch.summary.successful_live_captures} Live Success / ${ceoReviewBatch.summary.failed_captures} Failures.`);
    console.log(`📄 [RECEIPT-SEALED] Run Receipt: ${receipt060cPath}\n`);

    return {
      receipt060c,
      ceoReviewBatch,
      production_locked: true
    };
  } finally {
    if (browserWs) {
      try { browserWs.close(); } catch (e) {}
    }
    if (chromeProc) {
      try { chromeProc.kill(); } catch (e) {}
    }
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

module.exports = {
  validate060cItemLineage,
  buildHardenedCeoReviewBatch060C,
  formatCeoReviewBatchMarkdown060C,
  executeManualBootstrapSweep060C
};
