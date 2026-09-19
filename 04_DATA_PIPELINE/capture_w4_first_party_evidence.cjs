'use strict';

/*
 * W4 public first-party evidence collector.
 * It is deliberately fail-closed: no CAPTCHA/WAF/login bypass, no credentials,
 * and no disk write until a clean public navigation is already proven.
 * A raw capture is not an approved voucher or a release authorization.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const WORKSPACE = path.resolve(__dirname, '..');
const WORK_ORDER_PATH = path.join(WORKSPACE, '04_DATA_PIPELINE', 'dispatch', 'WORK_ORDER_W4_FIRST_PARTY_EVIDENCE_AND_FIELD_TEST.json');
const EVIDENCE_ROOT = path.join(WORKSPACE, '04_DATA_PIPELINE', 'raw_evidence');
const HEADER_ALLOWLIST = new Set(['content-type', 'date', 'etag', 'last-modified', 'cache-control', 'server']);
const BLOCKED_MARKERS = [
  'cf-browser-verification', 'cf-chl-', 'attention required!', 'just a moment',
  'captcha', 'access denied', 'verify you are human', 'đăng nhập để tiếp tục',
  'login required', 'sign in to continue'
];

function sha256(bytes) {
  return crypto.createHash('sha256').update(bytes).digest('hex');
}

function readArgument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function fail(code) {
  throw new Error(code);
}

function safeFilename(value) {
  return value.replace(/[^a-zA-Z0-9_-]/g, '_');
}

function sanitizedHeaders(headers) {
  return Object.fromEntries(Object.entries(headers).filter(([key]) => HEADER_ALLOWLIST.has(key.toLowerCase())));
}

function loadTarget(targetId) {
  const workOrder = JSON.parse(fs.readFileSync(WORK_ORDER_PATH, 'utf8'));
  const target = workOrder.evidence_collection.targets.find((item) => item.target_id === targetId);
  if (!target) fail('CONFIG_UNKNOWN_TARGET');
  if (target.target_id === 'W4_SHOPEEFOOD_DANANG') {
    fail('POLICY_SHOPEEFOOD_AUTOMATED_CAPTURE_DISABLED_PENDING_NEW_AUDIT_APPROVAL');
  }
  return target;
}

function assertAllowedFinalUrl(urlString, target) {
  const finalUrl = new URL(urlString);
  if (finalUrl.protocol !== 'https:') fail('PREWRITE_FINAL_PROTOCOL_NOT_HTTPS');
  const allowed = target.approved_hosts.some((host) => finalUrl.hostname === host || finalUrl.hostname.endsWith(`.${host}`));
  if (!allowed) fail(`PREWRITE_FINAL_ORIGIN_NOT_ALLOWED:${finalUrl.hostname}`);
}

async function main() {
  const targetId = readArgument('--target');
  const requestedUrl = readArgument('--url');
  if (!targetId || !requestedUrl) {
    fail('USAGE:node 04_DATA_PIPELINE/capture_w4_first_party_evidence.cjs --target <W4_TARGET_ID> --url <exact_public_detail_url>');
  }

  const target = loadTarget(targetId);
  assertAllowedFinalUrl(requestedUrl, target);
  const browser = await puppeteer.launch({ headless: true, args: ['--disable-dev-shm-usage'] });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36');
    const response = await page.goto(requestedUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    const finalUrl = page.url();
    const html = await page.content();
    const blockedMarker = BLOCKED_MARKERS.find((marker) => html.toLowerCase().includes(marker));
    if (!response || response.status() !== 200) fail(`PREWRITE_HTTP_STATUS_NOT_200:${response ? response.status() : 'NO_RESPONSE'}`);
    assertAllowedFinalUrl(finalUrl, target);
    if (blockedMarker) fail(`PREWRITE_WAF_OR_LOGIN_MARKER:${blockedMarker}`);

    const capturedAtUtc = new Date().toISOString();
    const htmlBytes = Buffer.from(html, 'utf8');
    const pngBytes = await page.screenshot({ fullPage: true, type: 'png' });
    const safeTarget = safeFilename(targetId);
    const stamp = capturedAtUtc.replace(/[:.]/g, '-');
    const folder = path.join(EVIDENCE_ROOT, safeTarget, stamp);
    const rawHtmlName = 'raw.html';
    const screenshotName = 'screenshot.png';
    const headersName = 'headers.json';
    const receiptName = 'receipt.json';

    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, rawHtmlName), htmlBytes);
    fs.writeFileSync(path.join(folder, screenshotName), pngBytes);
    fs.writeFileSync(path.join(folder, headersName), JSON.stringify({
      requested_url: requestedUrl,
      final_url: finalUrl,
      captured_at_utc: capturedAtUtc,
      http_status: response.status(),
      headers: sanitizedHeaders(response.headers())
    }, null, 2) + '\n');

    const diskArtifacts = Object.fromEntries([rawHtmlName, screenshotName, headersName].map((fileName) => {
      const bytes = fs.readFileSync(path.join(folder, fileName));
      return [fileName, { size_bytes: bytes.length, sha256: sha256(bytes) }];
    }));
    const receipt = {
      receipt_id: `W4_${safeTarget}_${stamp}`,
      target_id: targetId,
      requested_url: requestedUrl,
      final_url: finalUrl,
      captured_at_utc: capturedAtUtc,
      http_status: response.status(),
      pre_write_gate: {
        public_first_party_session: true,
        status_200: true,
        approved_https_origin: true,
        waf_or_login_bypass_used: false,
        blocked_marker_detected: false
      },
      disk_artifacts: diskArtifacts,
      semantic_and_commercial_status: 'RAW_CAPTURE_ONLY__CEO_AUDIT_REQUIRED__NOT_PUBLISHABLE',
      affiliate_enabled: false,
      production_authorized: false
    };
    fs.writeFileSync(path.join(folder, receiptName), JSON.stringify(receipt, null, 2) + '\n');
    const rereadReceipt = JSON.parse(fs.readFileSync(path.join(folder, receiptName), 'utf8'));
    if (rereadReceipt.disk_artifacts[rawHtmlName].sha256 !== sha256(fs.readFileSync(path.join(folder, rawHtmlName)))) {
      fail('POSTWRITE_RAW_HTML_HASH_REPLAY_FAILED');
    }
    console.log(JSON.stringify({ status: 'PASS__RAW_CAPTURE_REQUIRES_CEO_AUDIT', folder, receipt: path.join(folder, receiptName) }, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(`CAPTURE_REJECTED:${error.message}`);
  process.exitCode = 1;
});
