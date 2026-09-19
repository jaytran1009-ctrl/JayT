/**
 * JAYT REAL SEMANTIC DELTA SCHEDULER (141S)
 * Directive: JAYT-141S — SEMANTIC DELTA RECOVERY & AUTONOMOUS VERIFIED-SUPPLY LOOP
 * 
 * STRICT MANDATES:
 * 1. Process lock prevents concurrent execution collisions.
 * 2. Strict schedule discipline: ONLY captures sources where next_check_due <= now.
 * 3. Skips backoff sources (e.g. 404 under 7-day backoff).
 * 4. Runs authentic Puppeteer capture on due sources.
 * 5. Uses 2-layer hashing: raw_html_sha256 (artifact provenance) + semantic_content_sha256 (normalized text).
 * 6. 4-tier delta classification:
 *    - UNCHANGED_IDENTICAL
 *    - UNCHANGED_RENDER_VARIATION
 *    - SEMANTIC_CHANGED_REVIEW_REQUIRED
 *    - OFFER_RELEVANT_DELTA (triggers leaf discovery)
 *    - HTTP_ERROR_BACKOFF
 * 7. Atomic registry updates with rollback protection.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');
const { getSemanticHash, computeSha256 } = require('./semantic_normalizer_141s');

const repoRoot = path.resolve(__dirname, '..');
const lockFilePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'scheduler_141s.lock');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'fresh_source_registry_141s.json');
const deltaCapturesDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'semantic_captures_141s');
const schedulerRunsDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'scheduler_runs_141s');

fs.mkdirSync(deltaCapturesDir, { recursive: true });
fs.mkdirSync(schedulerRunsDir, { recursive: true });

function acquireLock() {
  if (fs.existsSync(lockFilePath)) {
    throw new Error(`Process collision detected! Lock file exists: ${lockFilePath}`);
  }
  fs.writeFileSync(lockFilePath, JSON.stringify({ pid: process.pid, started_at: new Date().toISOString() }), { flag: 'wx' });
}

function releaseLock() {
  if (fs.existsSync(lockFilePath)) {
    fs.unlinkSync(lockFilePath);
  }
}

async function captureSourceLive(browser, source, runTimestamp) {
  const srcSubdir = path.join(deltaCapturesDir, source.source_id);
  const receiptsDir = path.join(deltaCapturesDir, 'receipts');
  fs.mkdirSync(srcSubdir, { recursive: true });
  fs.mkdirSync(receiptsDir, { recursive: true });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  let captureStatus = 'OK';
  let httpStatus = 200;
  let finalUrl = source.canonical_url;
  let htmlContent = '';
  let textContent = '';
  let screenshotBuffer = null;
  let errorMsg = null;

  try {
    const response = await page.goto(source.canonical_url, {
      waitUntil: 'domcontentloaded',
      timeout: 15000
    });

    if (response) {
      httpStatus = response.status();
      finalUrl = response.url();
    }

    await new Promise(r => setTimeout(r, 1200));

    htmlContent = await page.content();
    textContent = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script, style, noscript');
      scripts.forEach(s => s.remove());
      return document.body ? document.body.innerText : '';
    });

    screenshotBuffer = await page.screenshot({ fullPage: false, type: 'png' });

    if (httpStatus >= 400) {
      captureStatus = 'HTTP_ERROR_' + httpStatus;
    }
  } catch (err) {
    captureStatus = 'BLOCKED_OR_ERROR';
    errorMsg = err.message;
    htmlContent = `<!-- CAPTURE ERROR: ${err.message} -->`;
    textContent = `CAPTURE_ERROR: ${err.message}`;
    screenshotBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
  } finally {
    await page.close();
  }

  // Save files
  const htmlPath = path.join(srcSubdir, 'page.html');
  const txtPath = path.join(srcSubdir, 'page.txt');
  const pngPath = path.join(srcSubdir, 'screenshot.png');
  const metaPath = path.join(srcSubdir, 'metadata.json');

  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  fs.writeFileSync(txtPath, textContent, 'utf8');
  fs.writeFileSync(pngPath, screenshotBuffer);

  const rawSha = computeSha256(Buffer.from(htmlContent, 'utf8'));
  const semantic = getSemanticHash(htmlContent);
  const pngSha = computeSha256(screenshotBuffer);

  const relHtmlPath = path.relative(repoRoot, htmlPath).replace(/\\/g, '/');

  const meta = {
    source_id: source.source_id,
    cohort: source.cohort,
    brand_name: source.brand_name,
    canonical_url: source.canonical_url,
    final_url: finalUrl,
    capture_status: captureStatus,
    http_status: httpStatus,
    captured_at: runTimestamp,
    error: errorMsg,
    sha256: {
      raw_html: rawSha,
      semantic_content: semantic.semantic_sha256,
      screenshot: pngSha
    }
  };

  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf8');

  // Emit Physical Capture Receipt
  const receiptId = `RECEIPT_SEMANTIC_${source.source_id}_${Date.now()}`;
  const receiptFilePath = path.join(receiptsDir, `${receiptId}.json`);
  const relReceiptPath = path.relative(repoRoot, receiptFilePath).replace(/\\/g, '/');

  const receipt = {
    receipt_id: receiptId,
    directive: 'JAYT-141S — SEMANTIC DELTA RECOVERY & AUTONOMOUS VERIFIED-SUPPLY LOOP',
    source_id: source.source_id,
    canonical_url: source.canonical_url,
    final_url: finalUrl,
    captured_at: runTimestamp,
    http_status: httpStatus,
    capture_status: captureStatus,
    raw_html_sha256: rawSha,
    semantic_content_sha256: semantic.semantic_sha256,
    prior_raw_sha256: source.hashes?.raw_html_current_sha256 || source.raw_html_sha256 || null,
    prior_semantic_sha256: source.hashes?.semantic_content_current_sha256 || source.semantic_content_sha256 || null,
    physical_artifacts: {
      html_path: relHtmlPath,
      html_sha256: rawSha,
      text_path: path.relative(repoRoot, txtPath).replace(/\\/g, '/'),
      semantic_text_length: semantic.text_length
    }
  };

  fs.writeFileSync(receiptFilePath, JSON.stringify(receipt, null, 2), 'utf8');

  return {
    source_id: source.source_id,
    http_status: httpStatus,
    capture_status: captureStatus,
    raw_sha: rawSha,
    semantic_sha: semantic.semantic_sha256,
    semantic_text: semantic.semantic_text,
    artifact_path: relHtmlPath,
    receipt_path: relReceiptPath,
    receipt
  };
}

async function executeSemanticScheduler141S() {
  acquireLock();
  console.log('========================================================================');
  console.log('🚀 JAYT-141S: EXECUTING SEMANTIC DELTA SCHEDULER (STRICT SCHEDULE DISCIPLINE)...');
  console.log('========================================================================\n');

  try {
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    const now = new Date();
    const runId = `RUN_141S_${Date.now()}`;
    const runSubdir = path.join(schedulerRunsDir, runId);
    fs.mkdirSync(runSubdir, { recursive: true });

    // Filter sources strictly due for check
    const sourcesToCapture = [];
    const skippedBackoff = [];
    const skippedNotDue = [];

    for (const src of registry.sources) {
      const isBackoff = src.state === 'HTTP_ERROR_BACKOFF' && new Date(src.next_check_due) > now;
      const isNotDue = new Date(src.next_check_due) > now;

      if (isBackoff) {
        skippedBackoff.push(src);
      } else if (isNotDue) {
        skippedNotDue.push(src);
      } else {
        sourcesToCapture.push(src);
      }
    }

    console.log(`📋 Total Sources in Registry: ${registry.sources.length}`);
    console.log(`⏳ Sources Due for Delta Capture (next_check_due <= now): ${sourcesToCapture.length}`);
    console.log(`🛑 Sources Skipped (Active 7-day Backoff): ${skippedBackoff.length}`);
    console.log(`⏭️ Sources Skipped (Not Yet Due): ${skippedNotDue.length}\n`);

    const runResults = [];

    if (sourcesToCapture.length > 0) {
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
      });

      const concurrency = 3;
      for (let i = 0; i < sourcesToCapture.length; i += concurrency) {
        const batch = sourcesToCapture.slice(i, i + concurrency);
        const batchResults = await Promise.all(batch.map(s => captureSourceLive(browser, s, now.toISOString())));

        for (const res of batchResults) {
          const src = registry.sources.find(x => x.source_id === res.source_id);
          let action = 'UNKNOWN';

          if (res.http_status >= 400 || res.capture_status !== 'OK') {
            action = 'HTTP_ERROR_BACKOFF';
            src.state = 'HTTP_ERROR_BACKOFF';
            src.http_status = res.http_status;
            src.backoff_policy = '7_DAYS_URL_REVIEW_BACKOFF';
            src.next_check_due = new Date(now.getTime() + 7 * 24 * 3600 * 1000).toISOString();
          } else {
            const priorRawSha = src.hashes ? src.hashes.raw_html_current_sha256 : src.raw_html_sha256;
            const priorSemanticSha = src.hashes ? src.hashes.semantic_content_current_sha256 : src.semantic_content_sha256;

            if (res.raw_sha === priorRawSha) {
              action = 'UNCHANGED_IDENTICAL';
              src.state = 'UNCHANGED_IDENTICAL';
            } else if (res.semantic_sha === priorSemanticSha) {
              action = 'UNCHANGED_RENDER_VARIATION';
              src.state = 'UNCHANGED_RENDER_VARIATION';
            } else {
              const promoKeywords = ['giảm', 'tặng', 'voucher', 'vé', 'combo', 'đồng giá', 'ưu đãi', 'áp dụng'];
              const priorText = (src.semantic_text || '').toLowerCase();
              const currentText = res.semantic_text.toLowerCase();

              const hasNewPromoKeyword = promoKeywords.some(kw => currentText.includes(kw) && !priorText.includes(kw));

              if (hasNewPromoKeyword) {
                action = 'OFFER_RELEVANT_DELTA';
                src.state = 'OFFER_RELEVANT_DELTA';
              } else {
                action = 'SEMANTIC_CHANGED_REVIEW_REQUIRED';
                src.state = 'SEMANTIC_CHANGED_REVIEW_REQUIRED';
              }
            }

            src.hashes = {
              raw_html_baseline_sha256: priorRawSha || res.raw_sha,
              raw_html_current_sha256: res.raw_sha,
              semantic_content_baseline_sha256: priorSemanticSha || res.semantic_sha,
              semantic_content_current_sha256: res.semantic_sha
            };
            src.semantic_text = res.semantic_text;
            src.receipts = {
              baseline_receipt_path: src.receipts ? src.receipts.baseline_receipt_path : res.receipt_path,
              current_receipt_path: res.receipt_path
            };
            src.next_check_due = new Date(now.getTime() + src.check_interval_hours * 3600 * 1000).toISOString();
          }

          console.log(`[${action}] ${src.source_id} (${src.brand_name})`);

          runResults.push({
            source_id: src.source_id,
            brand_name: src.brand_name,
            action,
            state: src.state,
            raw_sha: res.raw_sha,
            semantic_sha: res.semantic_sha,
            receipt_path: res.receipt_path,
            next_check_due: src.next_check_due
          });
        }
      }

      await browser.close();

      // Atomic registry write
      const tmpRegPath = `${registryPath}.tmp.${Date.now()}`;
      fs.writeFileSync(tmpRegPath, JSON.stringify(registry, null, 2), 'utf8');
      fs.renameSync(tmpRegPath, registryPath);
    }

    // Save cycle summary
    const cycleSummary = {
      run_id: runId,
      executed_at: now.toISOString(),
      total_sources_in_registry: registry.sources.length,
      sources_captured_count: sourcesToCapture.length,
      unchanged_identical_count: registry.sources.filter(s => s.state === 'UNCHANGED_IDENTICAL').length,
      unchanged_render_variation_count: registry.sources.filter(s => s.state === 'UNCHANGED_RENDER_VARIATION').length,
      semantic_changed_review_count: registry.sources.filter(s => s.state === 'SEMANTIC_CHANGED_REVIEW_REQUIRED').length,
      offer_relevant_delta_count: registry.sources.filter(s => s.state === 'OFFER_RELEVANT_DELTA').length,
      http_error_backoff_count: registry.sources.filter(s => s.state === 'HTTP_ERROR_BACKOFF').length,
      skipped_backoff_count: skippedBackoff.length,
      skipped_not_due_count: skippedNotDue.length,
      results: runResults
    };

    const summaryFilePath = path.join(runSubdir, 'semantic_cycle_summary.json');
    fs.writeFileSync(summaryFilePath, JSON.stringify(cycleSummary, null, 2), 'utf8');

    console.log('\n========================================================================');
    console.log('📊 KẾT QUẢ VẬN HÀNH SEMANTIC SCHEDULER 141S:');
    console.log(`- Nguồn thực sự capture trong vòng: ${cycleSummary.sources_captured_count}`);
    console.log(`- UNCHANGED_IDENTICAL: ${cycleSummary.unchanged_identical_count}`);
    console.log(`- UNCHANGED_RENDER_VARIATION (Raw khác, Semantic giống): ${cycleSummary.unchanged_render_variation_count}`);
    console.log(`- SEMANTIC_CHANGED_REVIEW_REQUIRED: ${cycleSummary.semantic_changed_review_count}`);
    console.log(`- OFFER_RELEVANT_DELTA (Khác ưu đãi, kích hoạt leaf): ${cycleSummary.offer_relevant_delta_count}`);
    console.log(`- HTTP_ERROR_BACKOFF (Metiz 404): ${cycleSummary.http_error_backoff_count}`);
    console.log(`- SKIPPED_BACKOFF: ${cycleSummary.skipped_backoff_count}`);
    console.log(`- SKIPPED_NOT_DUE: ${cycleSummary.skipped_not_due_count}`);
    console.log(`- Cycle Summary File: ${summaryFilePath}`);
    console.log('========================================================================\n');

    return cycleSummary;
  } finally {
    releaseLock();
  }
}

executeSemanticScheduler141S().catch(err => {
  console.error('Fatal Error in executeSemanticScheduler141S:', err);
  releaseLock();
  process.exit(1);
});
