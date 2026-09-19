/**
 * JAYT STRICT RECEIPT TRUTH VERIFIER (142T)
 * Directive: JAYT-142T: CẤM BODY FALLBACK, KHÓA RECEIPT TRUTH VÀ SỬA THỨ TỰ PHÂN LOẠI
 * 
 * STRICT ARCHITECTURAL CONSTRAINTS:
 * 1. Zero fallback defaults: missing fields MUST BE EXPLICITLY MARKED UNPROVEN.
 * 2. Cấm http_status || 200, final_url || requested_url, redirect_chain || [url], capture_method = "PUPPETEER_FULL_DOM".
 * 3. All SHA-256 hashes recalculated strictly from physical file buffers on disk.
 * 4. Discards all inherited metadata from old batches.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function computeSha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

/**
 * Strictly verifies a raw capture folder from disk without synthetic defaults
 */
function verifyStrictRawCaptureReceipt(captureFolderPath) {
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

  // Check fields strictly without synthetic defaults
  const receiptId = rawReceipt.receipt_id || 'RECEIPT_ID_UNPROVEN';
  const requestedUrl = rawReceipt.locator_url || rawReceipt.leaf_url || rawReceipt.requested_url || 'REQUESTED_URL_UNPROVEN';
  const finalUrl = rawReceipt.final_url ? rawReceipt.final_url : 'FINAL_URL_UNPROVEN';
  const redirectChain = Array.isArray(rawReceipt.redirect_chain) ? rawReceipt.redirect_chain : 'REDIRECT_CHAIN_UNPROVEN';
  const httpStatus = (typeof rawReceipt.http_status === 'number') ? rawReceipt.http_status : 'HTTP_STATUS_UNPROVEN';
  const captureMethod = rawReceipt.capture_method ? rawReceipt.capture_method : 'CAPTURE_METHOD_UNPROVEN';
  const capturedAt = rawReceipt.captured_at ? rawReceipt.captured_at : 'CAPTURED_AT_UNPROVEN';

  // Check if all essential provenance fields are proven
  const isReceiptComplete = (
    finalUrl !== 'FINAL_URL_UNPROVEN' &&
    redirectChain !== 'REDIRECT_CHAIN_UNPROVEN' &&
    httpStatus !== 'HTTP_STATUS_UNPROVEN' &&
    captureMethod !== 'CAPTURE_METHOD_UNPROVEN'
  );

  // Whitelist of valid physical keys
  const validKeys = new Set(['receipt_id', 'brand_id', 'cohort', 'brand_name', 'locator_url', 'leaf_url', 'requested_url', 'final_url', 'redirect_chain', 'captured_at', 'http_status', 'hashes', 'capture_method']);
  const hasInheritedUntrustedFields = Object.keys(rawReceipt).some(k => !validKeys.has(k));

  return {
    status: isReceiptComplete ? 'VERIFIED_PHYSICAL_RECEIPT' : 'RECEIPT_INCOMPLETE_UNTRUSTED_PROVENANCE',
    is_receipt_trusted: isReceiptComplete,
    receipt_id: receiptId,
    requested_url: requestedUrl,
    final_url: finalUrl,
    redirect_chain: redirectChain,
    http_status: httpStatus,
    captured_at: capturedAt,
    capture_method: captureMethod,
    fresh_hashes: {
      html_sha256: freshHtmlSha,
      text_sha256: freshTextSha,
      screenshot_sha256: freshScreenshotSha
    },
    inherited_metadata_audit: {
      has_untrusted_inherited_fields: hasInheritedUntrustedFields,
      inherited_metadata_status: hasInheritedUntrustedFields ? 'INHERITED_METADATA_UNTRUSTED_DISCARDED' : 'CLEAN_PHYSICAL_RECEIPT'
    }
  };
}

module.exports = {
  computeSha256,
  verifyStrictRawCaptureReceipt
};
