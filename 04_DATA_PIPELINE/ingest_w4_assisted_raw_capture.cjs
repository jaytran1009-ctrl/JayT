'use strict';

/*
 * W4 Assisted Raw Capture Ingress
 * Ingests only a manually exported, public, logged-out browser capture. This
 * script never opens a browser, sends a network request, handles cookies, or
 * attempts to bypass a challenge. A successful ingest is evidence awaiting
 * semantic audit, never an approved offer or an affiliate authorization.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const WORKSPACE = path.resolve(__dirname, '..');
const WORK_ORDER = path.join(WORKSPACE, '04_DATA_PIPELINE', 'dispatch', 'WORK_ORDER_W4_FIRST_PARTY_EVIDENCE_AND_FIELD_TEST.json');
const EVIDENCE_ROOT = path.join(WORKSPACE, '04_DATA_PIPELINE', 'raw_evidence');
const ALLOWED_HEADERS = new Set(['content-type', 'date', 'etag', 'last-modified', 'cache-control', 'server']);
const BLOCKED_MARKERS = ['cf-browser-verification', 'cf-chl-', 'attention required!', 'just a moment', 'captcha', 'access denied', 'verify you are human', 'đăng nhập để tiếp tục', 'login required'];

function sha256(value) { return crypto.createHash('sha256').update(value).digest('hex'); }
function fail(message) { throw new Error(message); }
function argument(name) { const i = process.argv.indexOf(name); return i >= 0 ? process.argv[i + 1] : null; }
function safeSegment(value) { return value.replace(/[^a-zA-Z0-9_-]/g, '_'); }

function loadTarget(targetId) {
  const workOrder = JSON.parse(fs.readFileSync(WORK_ORDER, 'utf8'));
  const target = workOrder.evidence_collection.targets.find((item) => item.target_id === targetId);
  if (!target) fail('CONFIG_UNKNOWN_TARGET');
  return target;
}

function assertApprovedUrl(urlString, target) {
  const url = new URL(urlString);
  if (url.protocol !== 'https:') fail('PREWRITE_URL_NOT_HTTPS');
  const allowed = target.approved_hosts.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`));
  if (!allowed) fail(`PREWRITE_ORIGIN_NOT_ALLOWED:${url.hostname}`);
}

function validateMetadata(metadata, target) {
  const allowedTopLevel = new Set(['requested_url', 'final_url', 'captured_at_utc', 'http_status', 'response_headers', 'operator_attestation']);
  const allowedAttestation = new Set(['public_logged_out_session', 'credentials_or_cookies_exported', 'personal_data_visible', 'challenge_or_waf_bypass_used']);
  if (Object.keys(metadata).some((key) => !allowedTopLevel.has(key))) fail('PREWRITE_METADATA_FIELD_NOT_ALLOWED');
  if (metadata.http_status !== 200) fail(`PREWRITE_HTTP_STATUS_NOT_200:${metadata.http_status}`);
  if (!metadata.captured_at_utc || Number.isNaN(Date.parse(metadata.captured_at_utc))) fail('PREWRITE_INVALID_CAPTURE_TIMESTAMP');
  if (!metadata.operator_attestation || metadata.operator_attestation.public_logged_out_session !== true || metadata.operator_attestation.credentials_or_cookies_exported !== false || metadata.operator_attestation.personal_data_visible !== false || metadata.operator_attestation.challenge_or_waf_bypass_used !== false) {
    fail('PREWRITE_OPERATOR_ATTESTATION_INCOMPLETE');
  }
  if (Object.keys(metadata.operator_attestation).some((key) => !allowedAttestation.has(key))) fail('PREWRITE_OPERATOR_ATTESTATION_FIELD_NOT_ALLOWED');
  assertApprovedUrl(metadata.requested_url, target);
  assertApprovedUrl(metadata.final_url, target);
  for (const header of Object.keys(metadata.response_headers || {})) {
    if (!ALLOWED_HEADERS.has(header.toLowerCase())) fail(`PREWRITE_HEADER_NOT_ALLOWLISTED:${header}`);
  }
}

function artifactInfo(filePath) {
  const bytes = fs.readFileSync(filePath);
  return { file_name: path.basename(filePath), size_bytes: bytes.length, sha256: sha256(bytes) };
}

function main() {
  const targetId = argument('--target');
  const htmlInput = argument('--html');
  const pngInput = argument('--png');
  const metadataInput = argument('--metadata');
  if (!targetId || !htmlInput || !pngInput || !metadataInput) {
    fail('USAGE:node 04_DATA_PIPELINE/ingest_w4_assisted_raw_capture.cjs --target <W4_TARGET_ID> --html <public.html> --png <full-page.png> --metadata <sanitized.json>');
  }
  const target = loadTarget(targetId);
  const metadata = JSON.parse(fs.readFileSync(metadataInput, 'utf8'));
  validateMetadata(metadata, target);

  const htmlBytes = fs.readFileSync(htmlInput);
  const pngBytes = fs.readFileSync(pngInput);
  if (htmlBytes.length < 256) fail('PREWRITE_HTML_TOO_SMALL');
  if (pngBytes.length < 8 || !pngBytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) fail('PREWRITE_INVALID_PNG_SIGNATURE');
  const bodyLower = htmlBytes.toString('utf8').toLowerCase();
  const marker = BLOCKED_MARKERS.find((item) => bodyLower.includes(item));
  if (marker) fail(`PREWRITE_WAF_OR_LOGIN_MARKER:${marker}`);

  const stamp = metadata.captured_at_utc.replace(/[:.]/g, '-');
  const destination = path.join(EVIDENCE_ROOT, safeSegment(targetId), 'assisted', stamp);
  fs.mkdirSync(destination, { recursive: true });
  const htmlDestination = path.join(destination, 'raw.html');
  const pngDestination = path.join(destination, 'screenshot.png');
  const metadataDestination = path.join(destination, 'metadata.json');
  fs.copyFileSync(htmlInput, htmlDestination);
  fs.copyFileSync(pngInput, pngDestination);
  fs.writeFileSync(metadataDestination, JSON.stringify({
    requested_url: metadata.requested_url,
    final_url: metadata.final_url,
    captured_at_utc: metadata.captured_at_utc,
    http_status: metadata.http_status,
    response_headers: metadata.response_headers,
    operator_attestation: metadata.operator_attestation
  }, null, 2) + '\n');

  const artifacts = {
    raw_html: artifactInfo(htmlDestination),
    screenshot_png: artifactInfo(pngDestination),
    metadata: artifactInfo(metadataDestination)
  };
  const receipt = {
    receipt_id: `W4_ASSISTED_${safeSegment(targetId)}_${stamp}`,
    target_id: targetId,
    evidence_mode: 'HUMAN_OPERATOR_PUBLIC_LOGGED_OUT_EXPORT',
    pre_write_gate: { status_200: true, approved_origin: true, challenge_or_waf_bypass_used: false, credentials_or_cookies_exported: false, personal_data_visible: false },
    artifacts,
    audit_status: 'INGESTED__RAW_EVIDENCE_ONLY__CEO_SEMANTIC_AUDIT_REQUIRED',
    production_authorized: false,
    affiliate_enabled: false
  };
  const receiptDestination = path.join(destination, 'receipt.json');
  fs.writeFileSync(receiptDestination, JSON.stringify(receipt, null, 2) + '\n');
  if (artifactInfo(htmlDestination).sha256 !== artifacts.raw_html.sha256 || artifactInfo(pngDestination).sha256 !== artifacts.screenshot_png.sha256) fail('POSTWRITE_DISK_HASH_REPLAY_FAILED');
  console.log(JSON.stringify({ status: receipt.audit_status, receipt: receiptDestination, artifacts }, null, 2));
}

try { main(); } catch (error) { console.error(`ASSISTED_INGRESS_REJECTED:${error.message}`); process.exitCode = 1; }
