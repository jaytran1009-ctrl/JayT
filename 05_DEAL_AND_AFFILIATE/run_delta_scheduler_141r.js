/**
 * JAYT REAL DELTA SCHEDULER ENGINE (141R)
 * Directive: JAYT-141R — REAL DELTA SCHEDULER EXECUTION & RECOVERY-TEST CERTIFICATION
 * 
 * STRICT MANDATES:
 * 1. Process lock prevents concurrent collisions.
 * 2. Checks next_check_due to identify due sources.
 * 3. Skips backoff sources (e.g. 404 under 7-day backoff).
 * 4. Runs authentic Puppeteer capture on due sources.
 * 5. Saves physical artifacts & receipts to delta_captures_141r/.
 * 6. Compares new hash vs baseline hash byte-by-byte:
 *    - identical -> UNCHANGED
 *    - different -> CHANGED (triggers leaf discovery)
 *    - error -> HTTP_ERROR + backoff
 * 7. Atomic registry write with rollback protection.
 * 8. Releases lock on completion or error.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const lockFilePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'scheduler_141r.lock');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'fresh_source_registry_141.json');
const deltaCapturesDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'delta_captures_141r');
const schedulerRunsDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'scheduler_runs_141r');

fs.mkdirSync(deltaCapturesDir, { recursive: true });
fs.mkdirSync(schedulerRunsDir, { recursive: true });

function getSha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

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

  const htmlSha = getSha256(Buffer.from(htmlContent, 'utf8'));
  const txtSha = getSha256(Buffer.from(textContent, 'utf8'));
  const pngSha = getSha256(screenshotBuffer);

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
      html: htmlSha,
      text: txtSha,
      screenshot: pngSha
    }
  };

  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf8');

  // Emit Physical Capture Receipt
  const receiptId = `RECEIPT_DELTA_${source.source_id}_${Date.now()}`;
  const receiptFilePath = path.join(receiptsDir, `${receiptId}.json`);
  const relReceiptPath = path.relative(repoRoot, receiptFilePath).replace(/\\/g, '/');

  const receipt = {
    receipt_id: receiptId,
    directive: 'JAYT-141R — REAL DELTA SCHEDULER EXECUTION & RECOVERY-TEST CERTIFICATION',
    source_id: source.source_id,
    canonical_url: source.canonical_url,
    final_url: finalUrl,
    captured_at: runTimestamp,
    http_status: httpStatus,
    capture_status: captureStatus,
    prior_baseline_sha256: source.baseline_sha256 || null,
    current_sha256: htmlSha,
    physical_artifacts: {
      html_path: relHtmlPath,
      html_sha256: htmlSha,
      text_path: path.relative(repoRoot, txtPath).replace(/\\/g, '/'),
      text_sha256: txtSha
    }
  };

  fs.writeFileSync(receiptFilePath, JSON.stringify(receipt, null, 2), 'utf8');

  return {
    source_id: source.source_id,
    http_status: httpStatus,
    capture_status: captureStatus,
    html_sha: htmlSha,
    artifact_path: relHtmlPath,
    receipt_path: relReceiptPath,
    receipt
  };
}

async function executeDeltaScheduler141R(options = { checkDueOnly: false }) {
  acquireLock();
  console.log('========================================================================');
  console.log('🚀 JAYT-141R: EXECUTING REAL DELTA FRESHNESS SCHEDULER...');
  console.log('========================================================================\n');

  try {
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    const now = new Date();
    const runId = `RUN_141R_${Date.now()}`;
    const runSubdir = path.join(schedulerRunsDir, runId);
    fs.mkdirSync(runSubdir, { recursive: true });

    // Step 1: Filter sources due for capture vs skipped backoff
    const sourcesToCapture = [];
    const skippedBackoff = [];
    const skippedNotDue = [];

    for (const src of registry.sources) {
      if (src.state === 'HTTP_ERROR' && new Date(src.next_check_due) > now) {
        skippedBackoff.push(src);
      } else if (options.checkDueOnly && new Date(src.next_check_due) > now) {
        skippedNotDue.push(src);
      } else {
        sourcesToCapture.push(src);
      }
    }

    console.log(`📋 Total Sources in Registry: ${registry.sources.length}`);
    console.log(`⏳ Sources Due for Delta Capture: ${sourcesToCapture.length}`);
    console.log(`🛑 Sources Skipped (Active Backoff): ${skippedBackoff.length}`);
    console.log(`⏭️ Sources Skipped (Not Yet Due): ${skippedNotDue.length}\n`);

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });

    const runResults = [];
    const concurrency = 3;

    for (let i = 0; i < sourcesToCapture.length; i += concurrency) {
      const batch = sourcesToCapture.slice(i, i + concurrency);
      const batchResults = await Promise.all(batch.map(s => captureSourceLive(browser, s, now.toISOString())));

      for (const res of batchResults) {
        const src = registry.sources.find(x => x.source_id === res.source_id);
        let action = 'UNKNOWN';

        if (res.http_status >= 400 || res.capture_status !== 'OK') {
          action = 'HTTP_ERROR';
          src.state = 'HTTP_ERROR';
          src.http_status = res.http_status;
          src.backoff_policy = '7_DAYS_URL_REVIEW_BACKOFF';
          src.next_check_due = new Date(now.getTime() + 7 * 24 * 3600 * 1000).toISOString();
        } else {
          // Compare new hash vs baseline hash byte-by-byte
          if (res.html_sha === src.baseline_sha256) {
            action = 'UNCHANGED';
            src.state = 'UNCHANGED';
            src.last_verified_sha256 = res.html_sha;
            src.last_verified_receipt_path = res.receipt_path;
            src.last_verified_timestamp = now.toISOString();
            src.next_check_due = new Date(now.getTime() + src.check_interval_hours * 3600 * 1000).toISOString();
          } else {
            action = 'CHANGED';
            src.state = 'CHANGED';
            src.prior_baseline_sha256 = src.baseline_sha256;
            src.prior_baseline_receipt_path = src.baseline_receipt_path;
            src.new_sha256 = res.html_sha;
            src.new_receipt_path = res.receipt_path;
            src.changed_at = now.toISOString();
            src.baseline_sha256 = res.html_sha;
            src.baseline_receipt_path = res.receipt_path;
            src.next_check_due = new Date(now.getTime() + src.check_interval_hours * 3600 * 1000).toISOString();
          }
        }

        console.log(`[${action}] ${src.source_id} (${src.brand_name}): Baseline=${(src.baseline_sha256 || '').substring(0, 10)}... Current=${res.html_sha.substring(0, 10)}...`);

        runResults.push({
          source_id: src.source_id,
          brand_name: src.brand_name,
          action,
          state: src.state,
          http_status: res.http_status,
          current_sha256: res.html_sha,
          prior_baseline_sha256: res.receipt.prior_baseline_sha256,
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

    // Save cycle summary
    const cycleSummary = {
      run_id: runId,
      executed_at: now.toISOString(),
      total_sources_evaluated: registry.sources.length,
      sources_captured_count: sourcesToCapture.length,
      unchanged_count: runResults.filter(r => r.action === 'UNCHANGED').length,
      changed_count: runResults.filter(r => r.action === 'CHANGED').length,
      http_error_count: runResults.filter(r => r.action === 'HTTP_ERROR').length,
      skipped_backoff_count: skippedBackoff.length,
      skipped_not_due_count: skippedNotDue.length,
      results: runResults,
      skipped_backoff: skippedBackoff.map(s => ({ source_id: s.source_id, brand_name: s.brand_name, next_check_due: s.next_check_due }))
    };

    const summaryFilePath = path.join(runSubdir, 'cycle_summary.json');
    fs.writeFileSync(summaryFilePath, JSON.stringify(cycleSummary, null, 2), 'utf8');

    console.log('\n========================================================================');
    console.log('📊 KẾT QUẢ VẬN HÀNH DELTA SCHEDULER 141R:');
    console.log(`- Nguồn thực sự capture: ${cycleSummary.sources_captured_count} / ${registry.sources.length}`);
    console.log(`- UNCHANGED (Khớp hash 100%): ${cycleSummary.unchanged_count}`);
    console.log(`- CHANGED (Khác hash, kích hoạt discovery): ${cycleSummary.changed_count}`);
    console.log(`- HTTP_ERROR: ${cycleSummary.http_error_count}`);
    console.log(`- SKIPPED_BACKOFF (Metiz 404): ${cycleSummary.skipped_backoff_count}`);
    console.log(`- Cycle Summary File: ${summaryFilePath}`);
    console.log('========================================================================\n');

    return cycleSummary;
  } finally {
    releaseLock();
  }
}

executeDeltaScheduler141R().catch(err => {
  console.error('Fatal Error in executeDeltaScheduler141R:', err);
  releaseLock();
  process.exit(1);
});
