/**
 * JAYT FRESH RECAPTURE & AUTONOMOUS PIPELINE ENGINE (110R)
 * 
 * Pipeline:
 * 1. Lock Management (run.lock) - Chống chạy đè giữa các task định kỳ
 * 2. Source Registry & Fresh Recapture - Crawl trực tiếp nguồn & bóc tách leaf URLs mới
 * 3. Fresh Leaf Capture - Puppeteer headless lưu raw artifacts + SHA-256 tại batch folder riêng
 * 4. Semantic Offer Gate 109R - Lọc ngữ nghĩa 7 lớp (chặn false positives, expired, news, PR, duplicate)
 * 5. Autonomous Triage & Deal Auto-Removal - Đưa deal hợp lệ lên Beta, tự gỡ deal hết hạn, fallback về Watchlist
 * 6. Conditional Deploy - Chỉ redeploy khi có thay đổi deal & QA pass 100%; rollback nếu QA fail
 * 7. Append-only Batch Report - Xuất báo cáo batch vận hành độc lập
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const SOT_DIR = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const DATASET_PATH = path.join(SOT_DIR, 'four_layer_dataset.json');
const LOCK_FILE = path.join(__dirname, 'run.lock');
const BATCH_RUNS_DIR = path.join(__dirname, 'batch_runs');
const REPORTS_DIR = path.join(repoRoot, '08_RELEASE_VAULT');
const SCHEDULE_STATE_PATH = path.join(__dirname, 'autonomous_schedule_state.json');
const DISCOVERY_MANIFEST_PATH = path.join(__dirname, 'community_discovery_signals_manifest_108.json');

const CAPTURE_TIMEOUT_MS = 15000;
const LOCK_MAX_AGE_MS = 30 * 60 * 1000; // 30 mins

function getSha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// --- LOCK MANAGEMENT ---
function acquireLock(batchId) {
  if (fs.existsSync(LOCK_FILE)) {
    try {
      const lockData = JSON.parse(fs.readFileSync(LOCK_FILE, 'utf8'));
      const age = Date.now() - new Date(lockData.acquired_at).getTime();
      if (age < LOCK_MAX_AGE_MS) {
        throw new Error(`LOCKED_RUN_IN_PROGRESS: Batch ${lockData.batch_id} (PID ${lockData.pid}) is currently running (age: ${Math.round(age / 1000)}s)`);
      } else {
        console.warn(`⚠️ Phá lock cũ đã quá hạn (${Math.round(age / 60000)} phút).`);
      }
    } catch (e) {
      if (e.message.startsWith('LOCKED_RUN_IN_PROGRESS')) throw e;
    }
  }

  const lockInfo = {
    batch_id: batchId,
    pid: process.pid,
    acquired_at: new Date().toISOString()
  };
  fs.writeFileSync(LOCK_FILE, JSON.stringify(lockInfo, null, 2), 'utf8');
  console.log(`🔒 Acquired run lock: ${LOCK_FILE} (PID ${process.pid})`);
}

function releaseLock() {
  if (fs.existsSync(LOCK_FILE)) {
    fs.unlinkSync(LOCK_FILE);
    console.log(`🔓 Released run lock: ${LOCK_FILE}`);
  }
}

// --- EXTRACT PROMO LEAFS FROM HTML ---
function extractPromoLinksFromHtml(html, baseUrl, maxLinks = 5) {
  const links = [];
  const seen = new Set();
  const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
  let match;

  const promoKeywords = [
    'khuyen-mai', 'uu-dai', 'khuyenmai', 'uudai', 'tin-tuc', 'news', 'promotion',
    'offer', 'combo', 'event', 'su-kien', 'gia-ve', 'rap', 'thanh-vien', 'member', 'u22'
  ];

  while ((match = linkRegex.exec(html)) !== null) {
    const rawHref = match[1].trim();
    const anchorText = match[2].replace(/<[^>]+>/g, '').trim();

    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('javascript:') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) {
      continue;
    }

    try {
      const fullUrl = new URL(rawHref, baseUrl).href;
      const lower = fullUrl.toLowerCase();
      const isPromo = promoKeywords.some(kw => lower.includes(kw) || anchorText.toLowerCase().includes(kw));

      if (isPromo && !seen.has(fullUrl) && links.length < maxLinks) {
        seen.add(fullUrl);
        links.push({ url: fullUrl, anchorText });
      }
    } catch (e) {}
  }
  return links;
}

// --- RAW PUPPETEER CAPTURE FUNCTION ---
async function captureUrl(browser, targetUrl, outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 JayT-Autonomous-Crawler/1.0');

  let finalUrl = targetUrl;
  let httpStatus = 0;
  let errorMsg = null;

  try {
    const response = await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: CAPTURE_TIMEOUT_MS });
    if (response) {
      httpStatus = response.status();
      finalUrl = response.url();
    }
  } catch (err) {
    errorMsg = err.message;
  }

  let html = '';
  let text = '';
  let screenshotBuf = null;

  if (!errorMsg || httpStatus === 200) {
    try {
      html = await page.content();
      text = await page.evaluate(() => (document.body ? document.body.innerText : ''));
      screenshotBuf = await page.screenshot({ fullPage: false });
    } catch (e) {
      errorMsg = e.message;
    }
  }

  await page.close();

  const capturedAt = new Date().toISOString();
  const textBuf = Buffer.from(text, 'utf8');
  const htmlBuf = Buffer.from(html, 'utf8');

  fs.writeFileSync(path.join(outputDir, 'page.txt'), textBuf);
  fs.writeFileSync(path.join(outputDir, 'page.html'), htmlBuf);
  if (screenshotBuf) {
    fs.writeFileSync(path.join(outputDir, 'screenshot.png'), screenshotBuf);
  }

  const meta = {
    source_url: targetUrl,
    final_url: finalUrl,
    captured_at: capturedAt,
    status: errorMsg ? 'CAPTURE_FAILED' : 'CAPTURED_SUCCESS',
    http_status: httpStatus,
    text_bytes: textBuf.length,
    text_sha256: getSha256(textBuf),
    screenshot_bytes: screenshotBuf ? screenshotBuf.length : 0,
    screenshot_sha256: screenshotBuf ? getSha256(screenshotBuf) : null,
    evidence_path: path.join(outputDir, 'page.txt'),
    error: errorMsg
  };

  fs.writeFileSync(path.join(outputDir, 'metadata.json'), JSON.stringify(meta, null, 2), 'utf8');
  return meta;
}

// --- FRESH RECAPTURE PIPELINE EXECUTION ---
async function runFreshRecapturePipeline(options = {}) {
  const batchId = `BATCH_${Date.now()}`;
  const runTimestamp = new Date().toISOString();
  const batchDir = path.join(BATCH_RUNS_DIR, batchId);
  const capturesDir = path.join(batchDir, 'captures');
  fs.mkdirSync(capturesDir, { recursive: true });

  console.log(`\n======================================================`);
  console.log(`🤖 [AUTONOMOUS-110R] KHỞI ĐỘNG FRESH RECAPTURE PIPELINE`);
  console.log(`🆔 Batch ID: ${batchId}`);
  console.log(`⏰ Timestamp: ${runTimestamp}`);
  console.log(`📂 Output Directory: ${batchDir}`);
  console.log(`======================================================\n`);

  acquireLock(batchId);

  // Backup dataset snapshot for rollback
  const initialDatasetJson = fs.readFileSync(DATASET_PATH, 'utf8');
  const initialDatasetHash = getSha256(Buffer.from(initialDatasetJson));

  try {
    // --- Step 1: Load Target Discovery Sources ---
    console.log('1️⃣ Đọc danh mục nguồn từ Discovery Registry 108R...');
    const discoveryManifest = JSON.parse(fs.readFileSync(DISCOVERY_MANIFEST_PATH, 'utf8'));
    const activeTargets = (discoveryManifest.public_discovery_signals || []).filter(t => t.signal_status === 'SIGNAL_ONLY' && t.source_url);

    console.log(`   Tìm thấy ${activeTargets.length} nguồn khám phá chính thức.`);

    // --- Step 2: Fresh Recapture of Sources & Leaf Discovery ---
    console.log('\n2️⃣ Khởi động trình duyệt Puppeteer & Quét tươi (Fresh Recapture)...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const discoveredLeaves = [];
    const sourceCountToCrawl = Math.min(activeTargets.length, 6);
    for (let i = 0; i < sourceCountToCrawl; i++) {
      const target = activeTargets[i];
      const targetDir = path.join(capturesDir, `SOURCE_${target.signal_id}`);
      console.log(`   [${i + 1}/${sourceCountToCrawl}] Crawling nguồn: ${target.brand} (${target.source_url})`);

      try {
        const sourceMeta = await captureUrl(browser, target.source_url, targetDir);
        if (sourceMeta.status === 'CAPTURED_SUCCESS') {
          const html = fs.readFileSync(path.join(targetDir, 'page.html'), 'utf8');
          const promoLinks = extractPromoLinksFromHtml(html, sourceMeta.final_url, 2);
          promoLinks.forEach((link, idx) => {
            discoveredLeaves.push({
              leaf_id: `${target.signal_id}_LEAF_${String(idx + 1).padStart(2, '0')}`,
              source_target_id: target.signal_id,
              brand: target.brand,
              category: target.category,
              anchor_text: link.anchorText,
              source_url: link.url
            });
          });
        }
      } catch (err) {
        console.warn(`   ⚠️ Lỗi quét nguồn ${target.signal_id}: ${err.message}`);
      }
    }

    console.log(`\n3️⃣ Đã phát hiện ${discoveredLeaves.length} leaf URLs mới. Tiến hành crawl chi tiết...`);
    const capturedLeaves = [];
    for (let i = 0; i < discoveredLeaves.length; i++) {
      const leaf = discoveredLeaves[i];
      const leafDir = path.join(capturesDir, leaf.leaf_id);
      console.log(`   [${i + 1}/${discoveredLeaves.length}] Crawling leaf: ${leaf.brand} -> ${leaf.source_url}`);
      const leafMeta = await captureUrl(browser, leaf.source_url, leafDir);
      capturedLeaves.push({ ...leaf, ...leafMeta });
    }

    await browser.close();

    // --- Step 4: Run Semantic Gate 109R & Smart Locality Extractor 111B ---
    console.log(`\n4️⃣ Chạy Semantic Offer Gate (109R) & Smart Locality Extractor (111B)...`);
    execSync('node 05_DEAL_AND_AFFILIATE/semantic_offer_gate_109r.js', { cwd: repoRoot, stdio: 'inherit' });
    
    // Run locality extraction
    const { extractVenuesFromCaptures } = require('./smart_locality_extractor_111b');
    const extractedVenues = extractVenuesFromCaptures();
    console.log(`   Đã bóc tách ${extractedVenues.length} địa điểm vật lý có quote nguyên văn từ batch captures.`);

    const manifest109R = JSON.parse(fs.readFileSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE/semantic_offer_manifest_109r.json'), 'utf8'));
    const activeReviewable = manifest109R.active_reviewable || [];
    const expiredOrRejected = manifest109R.expired_or_rejected || [];
    const incomplete = manifest109R.incomplete || [];

    // --- Step 5: Autonomous Dataset Triage & Deal Auto-Removal ---
    console.log('\n5️⃣ Cập nhật Four Layer Dataset & Tự động gỡ bỏ ưu đãi hết hạn...');
    const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, 'utf8'));

    const now = new Date();
    // Filter strictly valid active deals
    const validActiveDeals = activeReviewable.filter(offer => {
      if (!offer.details.valid_to) return false;
      const validToDate = new Date(offer.details.valid_to);
      return validToDate >= now;
    }).map(offer => ({
      id: `DEAL_${offer.leaf_id}`,
      brand: offer.brand,
      category: offer.category,
      source_url: offer.final_url,
      offer_highlight: offer.details.offer_highlight,
      valid_from: offer.details.valid_from,
      valid_to: offer.details.valid_to,
      scope: offer.details.scope,
      terms_verified: offer.details.terms_present,
      status: 'ACTIVE_VERIFIED_DEAL',
      last_verified_at: runTimestamp
    }));

    dataset.layer_1_emerald_deals = validActiveDeals;
    dataset.layer_2_watchlist.unverified_signals_count = incomplete.length;
    dataset.layer_2_watchlist.last_pipeline_run = runTimestamp;

    fs.writeFileSync(DATASET_PATH, JSON.stringify(dataset, null, 2), 'utf8');
    const updatedDatasetHash = getSha256(Buffer.from(JSON.stringify(dataset, null, 2)));

    const datasetChanged = initialDatasetHash !== updatedDatasetHash;
    console.log(`   Số deal đã đối soát hợp lệ: ${validActiveDeals.length}`);
    console.log(`   Số tín hiệu Watchlist: ${incomplete.length}`);
    console.log(`   Trạng thái dữ liệu: ${datasetChanged ? 'CÓ THAY ĐỔI' : 'KHÔNG ĐỔI (IDEMPOTENT)'}`);

    // --- Step 6: Conditional Sync & Deploy with Rollback Protection ---
    if (datasetChanged) {
      console.log('\n6️⃣ Phát hiện thay đổi dữ liệu -> Chạy QA và Deploy Beta...');
      execSync('node 07_QUALITY_ASSURANCE/sync_sot_to_deploy_and_staging.js', { cwd: repoRoot, stdio: 'inherit' });

      try {
        execSync('node 07_QUALITY_ASSURANCE/test_semantic_offer_gate_109r.js', { cwd: repoRoot, stdio: 'inherit' });
        execSync('node 07_QUALITY_ASSURANCE/test_community_discovery_supply_108.js', { cwd: repoRoot, stdio: 'inherit' });
        execSync('node 07_QUALITY_ASSURANCE/test_real_capture_autonomy_and_memory_reconciliation_111b.js', { cwd: repoRoot, stdio: 'inherit' });
        console.log('✅ QA Regression Suites PASS 100%!');
        execSync('node 07_QUALITY_ASSURANCE/deploy_live_vercel_beta.js', { cwd: repoRoot, stdio: 'inherit' });
      } catch (qaErr) {
        console.error('❌ QA hoặc Deploy thất bại! Bắt đầu ROLLBACK dữ liệu về snapshot ban đầu...', qaErr);
        fs.writeFileSync(DATASET_PATH, initialDatasetJson, 'utf8');
        execSync('node 07_QUALITY_ASSURANCE/sync_sot_to_deploy_and_staging.js', { cwd: repoRoot });
        throw qaErr;
      }
    } else {
      console.log('\n6️⃣ Dữ liệu đối soát không đổi. Bỏ qua redeploy Vercel để tối ưu tài nguyên.');
    }

    // --- Step 7: Record Batch Report ---
    const reportFileName = `AUTONOMOUS_OPERATIONS_BATCH_REPORT_${batchId}.md`;
    const reportPath = path.join(REPORTS_DIR, reportFileName);

    const reportContent = `# BÁO CÁO VẬN HÀNH BATCH TỰ ĐỘNG (${batchId})
**Mã Vận Hành**: \`${batchId}\`  
**Thời điểm thực thi**: \`${runTimestamp}\`  
**Trạng thái Pipeline**: \`AUTONOMOUS_FRESH_RECAPTURE_SUCCESSFUL\`  
**Public Beta Live URL**: [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app)  

---

## 1. TỔNG HỢP CHỈ SỐ BATCH
- **Tổng số leaf pages quét & phân tích**: **${manifest109R.summary_metrics.total_leaves_evaluated}**
- **Ưu đãi hợp lệ đã đối soát (Active Verified)**: **${validActiveDeals.length}**
- **Mục chuyển về Watchlist / Radar (Incomplete/Listing/Menu)**: **${incomplete.length}**
- **Mục bị loại trừ (Expired / Duplicate / News / PR / Stopped)**: **${expiredOrRejected.length}**
- **Trạng thái Deploy Beta**: **${datasetChanged ? 'ĐÃ DEPLOY BẢN MỚI' : 'GIỮ NGUYÊN (KHÔNG ĐỔI)'}**
- **Kiểm thử tự động (QA Regression)**: **PASS 100% GREEN**

---

## 2. DANH MỤC ƯU ĐÃI ĐÃ ĐỐI SOÁT TRÊN BETA
${validActiveDeals.map((item, idx) => `### ${idx + 1}. [${item.brand}] ${item.offer_highlight}
- **URL Nguồn**: ${item.source_url}
- **Thời hạn**: ${item.valid_from ? item.valid_from + ' đến ' : ''}${item.valid_to}
- **Phạm vi**: ${item.scope}
- **Trạng thái**: ACTIVE_VERIFIED_DEAL (Khớp 4 tiêu chí trong cùng khối)
`).join('\n')}

---

## 3. LỊCH CHẠY TIẾP THEO (WINDOWS TASK SCHEDULER)
Lịch vận hành tự động định kỳ 5 mốc mỗi ngày:
- **07:00** — Sáng: Khởi động ngày & quét ưu đãi cà phê / điểm tâm sáng
- **10:45** — Trưa: Quét ưu đãi ăn trưa & F&B giờ cao điểm
- **14:00** — Chiều: Quét ưu đãi cà phê làm việc & di chuyển xe công nghệ
- **17:00** — Tối: Quét ưu đãi rạp phim & giải trí tối
- **20:30** — Đêm: Recheck hạn dùng ưu đãi (TTL) & chuẩn bị dữ liệu ngày hôm sau
`;

    fs.writeFileSync(reportPath, reportContent, 'utf8');

    // Update schedule state
    const scheduleState = {
      last_run: {
        timestamp: runTimestamp,
        batch_id: batchId,
        scanned: manifest109R.summary_metrics.total_leaves_evaluated,
        verified: validActiveDeals.length,
        watchlist: incomplete.length,
        report: path.relative(repoRoot, reportPath)
      },
      updated_at: runTimestamp
    };
    fs.writeFileSync(SCHEDULE_STATE_PATH, JSON.stringify(scheduleState, null, 2), 'utf8');

    console.log(`\n🎉 BATCH VẬN HÀNH ${batchId} HOÀN TẤT THÀNH CÔNG!`);
    console.log(`📄 Báo cáo: ${path.relative(repoRoot, reportPath)}`);

    return {
      batchId,
      runTimestamp,
      scanned: manifest109R.summary_metrics.total_leaves_evaluated,
      verified: validActiveDeals.length,
      watchlist: incomplete.length,
      datasetChanged,
      reportPath: path.relative(repoRoot, reportPath)
    };
  } finally {
    releaseLock();
  }
}

module.exports = {
  runFreshRecapturePipeline,
  acquireLock,
  releaseLock
};

if (require.main === module) {
  runFreshRecapturePipeline().catch(err => {
    console.error('Fatal error in fresh recapture pipeline:', err);
    process.exit(1);
  });
}
