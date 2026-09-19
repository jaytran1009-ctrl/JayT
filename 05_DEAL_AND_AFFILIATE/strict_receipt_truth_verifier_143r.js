/**
 * JAYT STRICT RECEIPT TRUTH VERIFIER (143R)
 * Directive: JAYT-143R: CAPTURE-PROVENANCE INCIDENT, HARNESS CERTIFICATION & SCHEDULER FREEZE
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function computeSha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

/**
 * Strictly verifies a raw capture folder from disk against native network event provenance
 */
function verifyStrictRawCaptureReceipt143R(captureFolderPath) {
  const htmlPath = path.join(captureFolderPath, 'page.html');
  const textPath = path.join(captureFolderPath, 'page.txt');
  const screenshotPath = path.join(captureFolderPath, 'screenshot.png');
  const receiptPath = path.join(captureFolderPath, 'receipt.json');

  if (!fs.existsSync(htmlPath) || !fs.existsSync(receiptPath)) {
    return {
      status: 'MISSING_PHYSICAL_ARTIFACTS',
      capture_folder: captureFolderPath,
      is_receipt_trusted: false
    };
  }

  const htmlBuf = fs.readFileSync(htmlPath);
  const textBuf = fs.existsSync(textPath) ? fs.readFileSync(textPath) : Buffer.from('');
  const screenshotBuf = fs.existsSync(screenshotPath) ? fs.readFileSync(screenshotPath) : Buffer.from('');
  const rawReceipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));

  const freshHtmlSha = computeSha256(htmlBuf);
  const freshTextSha = computeSha256(textBuf);
  const freshScreenshotSha = computeSha256(screenshotBuf);

  const runId = rawReceipt.capture_run_id ? rawReceipt.capture_run_id : 'RUN_ID_UNPROVEN';
  const receiptId = rawReceipt.receipt_id || 'RECEIPT_ID_UNPROVEN';
  const requestedUrl = rawReceipt.requested_url || 'REQUESTED_URL_UNPROVEN';
  const finalUrl = rawReceipt.final_url ? rawReceipt.final_url : 'FINAL_URL_UNPROVEN';
  const redirectChain = Array.isArray(rawReceipt.redirect_chain) ? rawReceipt.redirect_chain : 'REDIRECT_CHAIN_UNPROVEN';
  const httpStatus = (typeof rawReceipt.http_status === 'number') ? rawReceipt.http_status : 'HTTP_STATUS_UNPROVEN';
  const captureMethod = rawReceipt.capture_method ? rawReceipt.capture_method : 'CAPTURE_METHOD_UNPROVEN';
  const browserVersion = rawReceipt.browser_version ? rawReceipt.browser_version : 'BROWSER_VERSION_UNPROVEN';
  const capturedAt = rawReceipt.captured_at ? rawReceipt.captured_at : 'CAPTURED_AT_UNPROVEN';
  const navObserved = Boolean(rawReceipt.navigation_response_observed);

  // Trust is ONLY granted if navigation response was actually observed from the browser event
  const isReceiptComplete = (
    navObserved === true &&
    typeof httpStatus === 'number' &&
    finalUrl !== 'FINAL_URL_UNPROVEN' &&
    redirectChain !== 'REDIRECT_CHAIN_UNPROVEN' &&
    captureMethod === 'PUPPETEER_NATIVE_EVENT_ONLY' &&
    browserVersion !== 'BROWSER_VERSION_UNPROVEN' &&
    capturedAt !== 'CAPTURED_AT_UNPROVEN'
  );

  return {
    status: isReceiptComplete ? 'CAPTURE_RECEIPT_VALID' : 'CAPTURE_RECEIPT_INVALID',
    is_receipt_trusted: isReceiptComplete,
    capture_run_id: runId,
    receipt_id: receiptId,
    brand_id: rawReceipt.brand_id,
    brand_name: rawReceipt.brand_name,
    cohort: rawReceipt.cohort,
    target_type: rawReceipt.target_type,
    requested_url: requestedUrl,
    final_url: finalUrl,
    navigation_response_observed: navObserved,
    http_status: httpStatus,
    redirect_chain: redirectChain,
    captured_at: capturedAt,
    browser_version: browserVersion,
    capture_method: captureMethod,
    viewport: rawReceipt.viewport || { width: 1280, height: 800 },
    network_error: rawReceipt.network_error || null,
    fresh_hashes: {
      html_sha256: freshHtmlSha,
      text_sha256: freshTextSha,
      screenshot_sha256: freshScreenshotSha
    }
  };
}

module.exports = {
  computeSha256,
  verifyStrictRawCaptureReceipt143R
};
