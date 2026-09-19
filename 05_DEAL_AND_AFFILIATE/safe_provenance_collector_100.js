const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

/**
 * Safe Fail-Closed Provenance Collector (Work Order 100)
 * 
 * Strict Invariants:
 * 1. Requires authentic HTTP response (status < 400).
 * 2. Requires non-empty DOM and text content.
 * 3. Requires authentic screenshot.
 * 4. Writes raw extracted content directly without synthetic metadata injection or fallbacks.
 * 5. On any failure: emits FAILED_CAPTURE receipt, removes partial artifacts, does NOT fake HTTP status 200.
 */
async function captureVenueProvenance(target, baseOutputDir, options = {}) {
  const {
    id,
    venueName,
    url,
    district,
    sector
  } = target;

  const targetDir = path.join(baseOutputDir, id);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const timeoutMs = options.timeoutMs || 25000;
  let browser = null;

  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    let httpResponse = null;
    page.on('response', resp => {
      if (resp.url() === url || resp.url() === url + '/' || resp.url().startsWith(url)) {
        if (!httpResponse) httpResponse = resp;
      }
    });

    // Navigate with timeout
    const mainResponse = await page.goto(url, { waitUntil: 'networkidle2', timeout: timeoutMs });
    const finalResp = mainResponse || httpResponse;

    // INVARIANT 1: Must have authentic HTTP response with status < 400
    if (!finalResp) {
      throw new Error(`FAIL_CLOSED_NO_HTTP_RESPONSE: No HTTP response received for ${url}`);
    }

    const httpStatus = finalResp.status();
    if (httpStatus >= 400) {
      throw new Error(`FAIL_CLOSED_HTTP_ERROR: Server returned HTTP ${httpStatus} for ${url}`);
    }

    // Wait a brief moment for dynamic hydration
    await new Promise(r => setTimeout(r, 1200));

    // INVARIANT 2: DOM must be non-empty
    const rawHtml = await page.content();
    if (!rawHtml || rawHtml.trim().length < 50) {
      throw new Error(`FAIL_CLOSED_EMPTY_HTML: Page HTML is empty or trivial (< 50 bytes) for ${url}`);
    }

    const rawText = await page.evaluate(() => document.body ? document.body.innerText.trim() : '');
    if (!rawText || rawText.length < 20) {
      throw new Error(`FAIL_CLOSED_EMPTY_TEXT: Page text is empty or trivial (< 20 chars) for ${url}`);
    }

    // INVARIANT 3: Screenshot must succeed and produce non-empty buffer
    const screenshotPath = path.join(targetDir, 'page.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    const screenshotBuf = fs.readFileSync(screenshotPath);
    if (!screenshotBuf || screenshotBuf.length < 1000) {
      throw new Error(`FAIL_CLOSED_INVALID_SCREENSHOT: Screenshot failed or is corrupt (< 1000 bytes)`);
    }

    // INVARIANT 4: Write pristine raw artifacts (NO SYNTHETIC METADATA INJECTION)
    const htmlPath = path.join(targetDir, 'page.html');
    const textPath = path.join(targetDir, 'page.txt');

    fs.writeFileSync(htmlPath, rawHtml, 'utf8');
    fs.writeFileSync(textPath, rawText, 'utf8');

    const htmlBuf = Buffer.from(rawHtml, 'utf8');
    const textBuf = Buffer.from(rawText, 'utf8');

    const receipt = {
      receipt_type: 'AUTHENTIC_BROWSER_CAPTURE_RECEIPT',
      status: 'CAPTURE_AUTHENTICATED',
      captured_at: new Date().toISOString(),
      target_id: id,
      venue_name: venueName,
      source_url: url,
      district: district || 'UNSPECIFIED',
      sector: sector || 'UNSPECIFIED',
      http_response: {
        status: httpStatus,
        url: finalResp.url(),
        ok: finalResp.ok()
      },
      artifacts: {
        page_html: {
          path: path.relative(path.resolve(__dirname, '..'), htmlPath).replace(/\\/g, '/'),
          size_bytes: htmlBuf.length,
          sha256: sha256(htmlBuf)
        },
        page_txt: {
          path: path.relative(path.resolve(__dirname, '..'), textPath).replace(/\\/g, '/'),
          size_bytes: textBuf.length,
          sha256: sha256(textBuf)
        },
        page_png: {
          path: path.relative(path.resolve(__dirname, '..'), screenshotPath).replace(/\\/g, '/'),
          size_bytes: screenshotBuf.length,
          sha256: sha256(screenshotBuf)
        }
      },
      invariants_verified: {
        authentic_http_response: true,
        non_empty_dom: true,
        non_empty_text: true,
        authentic_screenshot: true,
        zero_synthetic_fallback_injection: true
      }
    };

    const receiptPath = path.join(targetDir, 'capture_receipt.json');
    fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2), 'utf8');

    await browser.close();

    return {
      success: true,
      status: 'CAPTURE_AUTHENTICATED',
      receipt
    };
  } catch (err) {
    if (browser) {
      try { await browser.close(); } catch (_) {}
    }

    // INVARIANT 5: On failure, clean up partial raw files and emit explicit FAILED_CAPTURE receipt
    const failedReceipt = {
      receipt_type: 'FAILED_CAPTURE_RECEIPT',
      status: 'FAILED_CAPTURE',
      attempted_at: new Date().toISOString(),
      target_id: id,
      venue_name: venueName,
      source_url: url,
      error_message: err.message,
      synthetic_fallback_permitted: false,
      raw_artifacts_persisted: false
    };

    // Remove any corrupt / partial files
    ['page.html', 'page.txt', 'page.png'].forEach(f => {
      const p = path.join(targetDir, f);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    });

    const failedReceiptPath = path.join(targetDir, 'capture_failed_receipt.json');
    fs.writeFileSync(failedReceiptPath, JSON.stringify(failedReceipt, null, 2), 'utf8');

    return {
      success: false,
      status: 'FAILED_CAPTURE',
      error: err.message,
      receipt: failedReceipt
    };
  }
}

module.exports = {
  captureVenueProvenance
};
