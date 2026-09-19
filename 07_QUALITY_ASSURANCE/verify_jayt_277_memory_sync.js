/* Full-byte, no-network verifier for the JAYT-277 system-of-record transaction. */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const relativeFiles = [
  'PROJECT_MEMORY.md',
  '00_PROGRAM_BASELINE/START_HERE_AZ.md',
  '00_PROGRAM_BASELINE/JAYT_CURRENT_STATE_BY.json',
  '00_PROGRAM_BASELINE/JAYT_CONTAMINATION_FREEZE_STATE.json',
  'RUNTIME_FREEZE_TRACE_EVIDENCE.log',
  '06_TRUST_AND_EVIDENCE/JAYT_274_ITEM_LEVEL_AUDIT_VERDICT.json',
  '06_TRUST_AND_EVIDENCE/JAYT_BATCH_03B_LEAF_PAGE_PROPOSALS.json',
  '06_TRUST_AND_EVIDENCE/batch_03b_micro_capture_vault/JAYT_276_MICRO_CAPTURE_MANIFEST.json',
  '05_DEAL_AND_AFFILIATE/deals_feed.json',
  '00_PROGRAM_BASELINE/JAYT_CANONICAL_PUBLIC_APPROVED_REGISTRY.json',
  '03_SOURCE_OF_TRUTH/jayt_storefront_staging_ey.js',
  'staging_deploy_ey/jayt_storefront_staging_ey.js',
  '03_SOURCE_OF_TRUTH/index.html',
  'staging_deploy_ey/index.html'
];
const sha256 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');

function main() {
  const artifacts = relativeFiles.map((relativePath) => {
    const absolutePath = path.join(root, relativePath);
    const bytes = fs.readFileSync(absolutePath);
    return { relative_path: relativePath, byte_length: bytes.length, sha256: sha256(bytes) };
  });
  const by = JSON.parse(fs.readFileSync(path.join(root, '00_PROGRAM_BASELINE/JAYT_CURRENT_STATE_BY.json'), 'utf8'));
  const freeze = JSON.parse(fs.readFileSync(path.join(root, '00_PROGRAM_BASELINE/JAYT_CONTAMINATION_FREEZE_STATE.json'), 'utf8'));
  const registry = JSON.parse(fs.readFileSync(path.join(root, '00_PROGRAM_BASELINE/JAYT_CANONICAL_PUBLIC_APPROVED_REGISTRY.json'), 'utf8'));
  const feed = fs.readFileSync(path.join(root, '05_DEAL_AND_AFFILIATE/deals_feed.json'), 'utf8').trim();
  const lookup = (name) => artifacts.find((a) => a.relative_path === name).sha256;
  const invariantErrors = [];
  if (by.batch_03.public_approved !== 0 || by.batch_03b.capture_authorized_now !== false) invariantErrors.push('State BY Batch 03 public/capture status is not fail-closed.');
  if (freeze.state !== 'ACTIVE') invariantErrors.push('Freeze state record is not ACTIVE.');
  if (feed !== '[]') invariantErrors.push('Deals feed is not empty.');
  if (registry.approved_entities_count !== 1) invariantErrors.push('Public registry approved count is not 1.');
  if (lookup('03_SOURCE_OF_TRUTH/jayt_storefront_staging_ey.js') !== lookup('staging_deploy_ey/jayt_storefront_staging_ey.js')) invariantErrors.push('SOT/staging JavaScript parity drift.');
  if (lookup('03_SOURCE_OF_TRUTH/index.html') !== lookup('staging_deploy_ey/index.html')) invariantErrors.push('SOT/staging HTML parity drift.');
  const receipt = {
    receipt_id: 'JAYT_MEMORY_SYNC_RECEIPT_277',
    transaction_id: 'TX_20260903_JAYT_277_MEMORY_SYNCHRONIZATION',
    method: 'SHA-256 full-byte read for every listed artifact; no network I/O.',
    project_memory_pre_sha256: 'd7421e327a158c325e827d194d69efe48faf80aa2986fae1e98b1aaada455b7f',
    project_memory_final_sha256: lookup('PROJECT_MEMORY.md'),
    verified_artifacts: artifacts,
    state_summary: { freeze_state: freeze.state, public_registry_approved_count: registry.approved_entities_count, batch03_public_approved: by.batch_03.public_approved, batch03b_capture_authorized_now: by.batch_03b.capture_authorized_now, deals_feed: feed },
    universal_full_byte_verifier: { pass: invariantErrors.length === 0, errors: invariantErrors, verified_count: artifacts.length },
    generated_at_utc: new Date().toISOString()
  };
  const receiptPath = path.join(root, '06_TRUST_AND_EVIDENCE/JAYT_MEMORY_SYNC_RECEIPT_277.json');
  fs.writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify(receipt.universal_full_byte_verifier, null, 2));
}
main();
