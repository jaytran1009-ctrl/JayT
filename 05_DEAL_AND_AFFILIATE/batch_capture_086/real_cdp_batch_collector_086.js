/**
 * JAYT REAL CDP BATCH COLLECTOR (086)
 * Directive: JAYT-REAL-SUPPLY-SPRINT-086
 *
 * Captures 28 official brand URLs using real Puppeteer/Chrome CDP.
 * For each URL: PNG screenshot (390x844), raw HTML, text extract, SHA-256 receipt.
 * No content analysis, no price extraction, no deal classification.
 * Pure evidence capture only.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..', '..');
const seedsPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'discovery_seeds', 'official_brand_discovery_urls.json');
const captureBaseDir = path.join(__dirname, 'captures');
const RUN_ID = `batch_086_cdp_${Date.now().toString(36)}`;
const VIEWPORT = { width: 390, height: 844 };
const TIMEOUT_MS = 20000;
const MAX_RETRIES = 2;
const DELAY_BETWEEN_MS = 2000;

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function captureUrl(browser, entry, index) {
  const { brand, sector, domain, discovery_url } = entry;
  const domainDir = path.join(captureBaseDir, domain.replace(/[^a-z0-9._-]/gi, '_'));
  fs.mkdirSync(domainDir, { recursive: true });

  const result = {
    index: index + 1,
    brand,
    sector,
    domain,
    target_url: discovery_url,
    capture_origin: 'REAL_BROWSER_CDP',
    run_id: RUN_ID,
    viewport: VIEWPORT,
    http_status: null,
    captured_at: null,
    artifacts: {},
    error: null,
    retries: 0
  };

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const page = await browser.newPage();
    try {
      await page.setViewport(VIEWPORT);
      await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');

      const response = await page.goto(discovery_url, {
        waitUntil: 'networkidle2',
        timeout: TIMEOUT_MS
      });

      result.http_status = response ? response.status() : 0;
      result.captured_at = new Date().toISOString();
      result.retries = attempt - 1;

      // Wait a moment for dynamic content
      await sleep(1500);

      // 1. Screenshot (full page)
      const pngPath = path.join(domainDir, 'screenshot.png');
      await page.screenshot({ path: pngPath, fullPage: true });
      const pngBuf = fs.readFileSync(pngPath);
      result.artifacts.png = {
        path: path.relative(repoRoot, pngPath).replace(/\\/g, '/'),
        sha256: sha256(pngBuf),
        size_bytes: pngBuf.length,
        artifact_type: 'png'
      };

      // 2. HTML (raw DOM)
      const htmlContent = await page.content();
      const htmlPath = path.join(domainDir, 'page.html');
      fs.writeFileSync(htmlPath, htmlContent, 'utf8');
      const htmlBuf = fs.readFileSync(htmlPath);
      result.artifacts.html = {
        path: path.relative(repoRoot, htmlPath).replace(/\\/g, '/'),
        sha256: sha256(htmlBuf),
        size_bytes: htmlBuf.length,
        artifact_type: 'html'
      };

      // 3. Text extract (innerText)
      const textContent = await page.evaluate(() => document.body ? document.body.innerText : '');
      const txtPath = path.join(domainDir, 'page.txt');
      fs.writeFileSync(txtPath, textContent, 'utf8');
      const txtBuf = fs.readFileSync(txtPath);
      result.artifacts.text = {
        path: path.relative(repoRoot, txtPath).replace(/\\/g, '/'),
        sha256: sha256(txtBuf),
        size_bytes: txtBuf.length,
        artifact_type: 'text'
      };

      // Success — build receipt and break retry loop
      const receiptObj = {
        receipt_id: `CAPTURE_RECEIPT_086_${domain.replace(/[^a-z0-9]/gi, '_').toUpperCase()}_${Date.now()}`,
        target_url: discovery_url,
        captured_at: result.captured_at,
        capture_origin: 'REAL_BROWSER_CDP',
        capture_method: 'puppeteer_cdp_headless',
        viewport: VIEWPORT,
        user_agent: await page.evaluate(() => navigator.userAgent),
        http_status: result.http_status,
        run_id: RUN_ID,
        artifacts: result.artifacts,
        brand,
        sector,
        domain
      };

      const receiptPath = path.join(domainDir, 'capture_receipt.json');
      fs.writeFileSync(receiptPath, JSON.stringify(receiptObj, null, 2), 'utf8');
      const receiptBuf = fs.readFileSync(receiptPath);
      result.artifacts.receipt = {
        path: path.relative(repoRoot, receiptPath).replace(/\\/g, '/'),
        sha256: sha256(receiptBuf),
        size_bytes: receiptBuf.length,
        artifact_type: 'json'
      };

      result.error = null;
      await page.close();
      break;

    } catch (err) {
      result.error = err.message;
      result.retries = attempt;
      result.captured_at = new Date().toISOString();
      await page.close().catch(() => {});

      if (attempt < MAX_RETRIES) {
        console.log(`   ⟳ Retry ${attempt}/${MAX_RETRIES} for ${domain}...`);
        await sleep(1000);
      }
    }
  }

  return result;
}

async function main() {
  console.log(`🚀 [BATCH-086] Real CDP Batch Collector — Khởi động...`);
  console.log(`   Run ID: ${RUN_ID}`);
  console.log(`   Viewport: ${VIEWPORT.width}x${VIEWPORT.height}`);
  console.log(`   Timeout: ${TIMEOUT_MS}ms, Max retries: ${MAX_RETRIES}\n`);

  const seeds = JSON.parse(fs.readFileSync(seedsPath, 'utf8'));
  console.log(`   📋 Loaded ${seeds.length} seeds from official_brand_discovery_urls.json\n`);

  fs.mkdirSync(captureBaseDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--lang=vi-VN'
    ]
  });

  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < seeds.length; i++) {
    const entry = seeds[i];
    console.log(`[${i + 1}/${seeds.length}] ${entry.brand} (${entry.domain})...`);

    const result = await captureUrl(browser, entry, i);
    results.push(result);

    if (result.error) {
      failCount++;
      console.log(`   ❌ FAILED: ${result.error.slice(0, 80)}`);
    } else {
      successCount++;
      console.log(`   ✅ HTTP ${result.http_status} | PNG: ${result.artifacts.png?.size_bytes || 0}B | HTML: ${result.artifacts.html?.size_bytes || 0}B | TXT: ${result.artifacts.text?.size_bytes || 0}B`);
    }

    // Delay between requests
    if (i < seeds.length - 1) {
      await sleep(DELAY_BETWEEN_MS);
    }
  }

  await browser.close();

  // Write batch manifest
  const manifest = {
    $schema: 'https://jayt.vn/schemas/batch-capture-manifest.v1.json',
    manifest_id: `BATCH_MANIFEST_086_${Date.now()}`,
    run_id: RUN_ID,
    capture_origin: 'REAL_BROWSER_CDP',
    capture_method: 'puppeteer_cdp_headless',
    viewport: VIEWPORT,
    started_at: results[0]?.captured_at || new Date().toISOString(),
    completed_at: new Date().toISOString(),
    total_seeds: seeds.length,
    success_count: successCount,
    fail_count: failCount,
    entries: results
  };

  const manifestPath = path.join(captureBaseDir, 'batch_manifest_086.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

  console.log(`\n======================================================`);
  console.log(`🏁 [BATCH-086-COMPLETE] ${successCount}/${seeds.length} thành công, ${failCount} thất bại.`);
  console.log(`   Manifest: ${manifestPath}`);
  console.log(`======================================================\n`);
}

main().catch(err => {
  console.error(`FATAL: ${err.message}`);
  process.exit(1);
});
