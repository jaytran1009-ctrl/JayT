/**
 * JAYT 072B UNVERIFIED PROVIDER CONTRACT CONTAINMENT ENGINE
 * Directive: JAYT-072B-INCIDENT — UNVERIFIED PROVIDER CONTRACT CONTAINMENT
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const quarantineDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_072b_unverified_shopee_contract');
fs.mkdirSync(quarantineDir, { recursive: true });

function getSha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

const filesToQuarantine = [
  {
    src: path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'feed_gateway', 'provider_docs', 'shopee_affiliate_open_api_spec.md'),
    filename: 'shopee_affiliate_open_api_spec.md',
    type: 'UNVERIFIED_SPEC_DOC',
    reason: 'UNVERIFIED_PROVIDER_DOCS: Web-researched assumptions without official Partner Center provenance.'
  },
  {
    src: path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'feed_gateway', 'provider_contracts', 'shopee_affiliate_contract_072b.js'),
    filename: 'shopee_affiliate_contract_072b.js',
    type: 'UNAUTHORIZED_CONTRACT_MODULE',
    reason: 'Self-labeled SUPPORTED_SPEC_VERIFIED without Partner Center official doc evidence.'
  },
  {
    src: path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'feed_gateway', 'probe_shopee_affiliate_072b.js'),
    filename: 'probe_shopee_affiliate_072b.js',
    type: 'NETWORK_CAPABLE_UNAUTHORIZED_PROBE',
    reason: 'Network-capable probe querying shopOfferV2 without approved partner credentials.'
  },
  {
    src: path.join(repoRoot, '07_QUALITY_ASSURANCE', 'test_shopee_affiliate_contract_072b.js'),
    filename: 'test_shopee_affiliate_contract_072b.js',
    type: 'UNVERIFIED_CONTRACT_TEST_SUITE',
    reason: 'Test suite validating code execution on unverified synthetic vector.'
  }
];

const quarantinedEntries = [];

console.log('🔒 [CONTAINMENT-072B] Bắt đầu cô lập các file 072B vào quarantine vault...');

for (const item of filesToQuarantine) {
  if (fs.existsSync(item.src)) {
    const sha = getSha256(item.src);
    const size = fs.statSync(item.src).size;
    const dst = path.join(quarantineDir, item.filename);

    fs.copyFileSync(item.src, dst);
    fs.unlinkSync(item.src);

    const dstSha = getSha256(dst);
    if (sha !== dstSha) {
      throw new Error(`BYTE-FOR-BYTE CORRUPTION ON QUARANTINE: ${item.filename}`);
    }

    quarantinedEntries.push({
      filename: item.filename,
      type: item.type,
      size_bytes: size,
      sha256: sha,
      quarantine_reason: item.reason
    });
    console.log(`  📦 Quarantined: ${item.filename} (${size} B, SHA: ${sha.slice(0, 16)}...)`);
  }
}

// Write Quarantine Manifest
const manifest = {
  $schema: 'https://jayt.vn/schemas/quarantine-manifest.v1.json',
  manifest_id: 'QUARANTINE_MANIFEST_BATCH_072B',
  work_order: 'JAYT-072B-INCIDENT',
  quarantine_reason: 'UNVERIFIED_PROVIDER_DOCS / NETWORK_CAPABLE_UNAUTHORIZED_PROBE — Web-researched assumptions are not Partner Center evidence; network query probe is disallowed.',
  quarantined_at: new Date().toISOString(),
  snapshot_byte_for_byte_persisted: true,
  total_files_quarantined: quarantinedEntries.length,
  items: quarantinedEntries
};

const manifestPath = path.join(quarantineDir, 'QUARANTINE_MANIFEST_BATCH_072B.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
const manifestSha = getSha256(manifestPath);

console.log(`\n📋 [MANIFEST-SAVED] ${manifestPath}`);
console.log(`   SHA-256: ${manifestSha}`);
console.log(`   Total items: ${quarantinedEntries.length}`);
