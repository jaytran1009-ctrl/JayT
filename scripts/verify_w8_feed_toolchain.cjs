/**
 * JAYT W8 Feed Ingress Toolchain Verifier
 * 
 * Independently audits and verifies the 5 cryptographic components of the Pha 2 Ingress Toolchain:
 *  1. scripts/parse_w8_portal_feed.cjs
 *  2. scripts/reconcile_w8_conversion_report.cjs
 *  4. 04_DATA_PIPELINE/raw_evidence/w8_sku_vault/W8_EVIDENCE_EQUIVALENCE_ADDENDUM.json
 *  3. 04_DATA_PIPELINE/raw_evidence/w8_sku_vault/raw_portal_exports/README.md
 *  5. 08_RELEASE_VAULT/W8_COMMERCIAL_DUAL_KEY_RELEASE_MANIFEST.json
 * 
 * Note: This toolchain is strictly independent of the J465 Production Pipeline Seal (24/24 static files).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT_DIR, '08_RELEASE_VAULT/W8_FEED_TOOLCHAIN_MANIFEST.json');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function verifyFeedToolchain() {
  console.log('=== JAYT W8 FEED INGRESS TOOLCHAIN VERIFICATION ===');
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('[FAIL] Manifest missing:', MANIFEST_PATH);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  let passed = 0;
  let total = manifest.sealed_files.length;

  for (const item of manifest.sealed_files) {
    const fullPath = path.join(ROOT_DIR, item.relative_path);
    if (!fs.existsSync(fullPath)) {
      console.error(`[DRIFT] Missing file: ${item.relative_path}`);
      continue;
    }
    const buf = fs.readFileSync(fullPath);
    const actualHash = sha256(buf);
    if (buf.length === item.byte_length && actualHash === item.sha256) {
      console.log(`[OK] ${item.relative_path} (${item.byte_length} bytes, SHA: ${actualHash.slice(0, 16)}...)`);
      passed++;
    } else {
      console.error(`[DRIFT] Hash mismatch on: ${item.relative_path}`);
      console.error(`  Expected: ${item.byte_length} bytes / ${item.sha256}`);
      console.error(`  Actual:   ${buf.length} bytes / ${actualHash}`);
    }
  }

  console.log(`\nW8 Feed Toolchain Seal: ${passed}/${total} files verified bit-identical.`);
  if (passed !== total) {
    console.error('[FATAL] Feed Toolchain verification failed!');
    process.exit(1);
  }
  console.log('Status: PASS_TOOLCHAIN_SEAL (Pha 2 Ingress Engine Validated Intact)');
}

if (require.main === module) {
  verifyFeedToolchain();
}

module.exports = { verifyFeedToolchain };
