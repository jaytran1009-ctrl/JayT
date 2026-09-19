/**
 * JAYT CANONICAL LEAF BATCH CAPTURE RUNNER (139)
 * Directive: JAYT-139 — ATOMIC PROMOTION UNIT EXTRACTION & CANONICAL LEAF VERIFICATION
 * 
 * STRICT MANDATES:
 * 1. Captures >= 300 canonical leaf targets across 5 cohorts.
 * 2. Authentic Puppeteer browser capture saving HTML, TXT, PNG screenshot, metadata, SHA-256.
 * 3. 0 synthetic fallbacks or offline mocks. Every failure is transparently logged as BLOCKED_OR_ERROR.
 * 4. Zero deployment / catalog locked.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const outputDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_139', 'captures_139');
const seedsPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'seed_targets_139.json');

fs.mkdirSync(outputDir, { recursive: true });

const targets = JSON.parse(fs.readFileSync(seedsPath, 'utf8'));

function getSha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

async function captureCanonicalTarget(browser, target) {
  const targetSubdir = path.join(outputDir, target.target_id);
  fs.mkdirSync(targetSubdir, { recursive: true });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  let captureStatus = 'OK';
  let httpStatus = 200;
  let finalUrl = target.canonical_leaf_url;
  let htmlContent = '';
  let textContent = '';
  let screenshotBuffer = null;
  let errorMsg = null;

  try {
    const response = await page.goto(target.canonical_leaf_url, {
      waitUntil: 'domcontentloaded',
      timeout: 15000
    });

    if (response) {
      httpStatus = response.status();
      finalUrl = response.url();
    }

    // Wait a brief moment for dynamic text
    await new Promise(r => setTimeout(r, 1200));

    htmlContent = await page.content();
    textContent = await page.evaluate(() => {
      // Remove scripts and styles
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
    // Transparently record error - 0 synthetic fallback
    htmlContent = `<!-- CAPTURE ERROR: ${err.message} -->`;
    textContent = `CAPTURE_ERROR: ${err.message}`;
    // Blank 1x1 transparent png for screenshot
    screenshotBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
  } finally {
    await page.close();
  }

  // Save files
  const htmlPath = path.join(targetSubdir, 'page.html');
  const txtPath = path.join(targetSubdir, 'page.txt');
  const pngPath = path.join(targetSubdir, 'screenshot.png');
  const metaPath = path.join(targetSubdir, 'metadata.json');

  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  fs.writeFileSync(txtPath, textContent, 'utf8');
  fs.writeFileSync(pngPath, screenshotBuffer);

  const meta = {
    target_id: target.target_id,
    promotion_unit_id: target.promotion_unit_id,
    cohort: target.cohort,
    name: target.name,
    source_url: target.canonical_leaf_url,
    final_url: finalUrl,
    provenance: target.provenance,
    capture_status: captureStatus,
    http_status: httpStatus,
    captured_at: new Date().toISOString(),
    error: errorMsg,
    sha256: {
      html: getSha256(Buffer.from(htmlContent, 'utf8')),
      text: getSha256(Buffer.from(textContent, 'utf8')),
      screenshot: getSha256(screenshotBuffer)
    }
  };

  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf8');
  console.log(`[${captureStatus}] ${target.target_id} (${target.promotion_unit_id}): ${target.name}`);
}

async function runBatch139() {
  console.log('========================================================================');
  console.log(`🚀 STARTING CANONICAL LEAF BATCH CAPTURE 139 (${targets.length} CANONICAL LEAF TARGETS)...`);
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  const concurrency = 4;
  for (let i = 0; i < targets.length; i += concurrency) {
    const batch = targets.slice(i, i + concurrency);
    await Promise.all(batch.map(t => captureCanonicalTarget(browser, t)));
  }

  await browser.close();

  console.log('\n========================================================================');
  console.log(`✅ CANONICAL LEAF BATCH CAPTURE 139 COMPLETED: ${targets.length} TARGETS CAPTURED.`);
  console.log(`📂 Output Directory: ${outputDir}`);
  console.log('========================================================================\n');
}

runBatch139().catch(err => {
  console.error('Fatal Error in runBatch139:', err);
  process.exit(1);
});
