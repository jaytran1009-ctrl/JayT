/**
 * JAYT INCIDENT 070C CONTAINMENT ENGINE
 * Directive: JAYT-070C — STAGING SOURCE-LINEAGE INCIDENT CONTAINMENT
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const stagingFeedPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const incidentVaultDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_070c_staging_lineage_incident');

fs.mkdirSync(incidentVaultDir, { recursive: true });

function getSha256(filePathOrBuffer) {
  const buf = Buffer.isBuffer(filePathOrBuffer) ? filePathOrBuffer : fs.readFileSync(filePathOrBuffer);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

// 1. Snapshot staging feed 070B byte-for-byte
const mutatedFeedRaw = fs.readFileSync(stagingFeedPath);
const mutatedSha = getSha256(mutatedFeedRaw);
const snapshotPath = path.join(incidentVaultDir, 'staging_deals_feed_070b_mutated.json');
fs.writeFileSync(snapshotPath, mutatedFeedRaw);

const verifiedSnapshotSha = getSha256(snapshotPath);
if (mutatedSha !== verifiedSnapshotSha) {
  throw new Error('CORRUPTION DURING INCIDENT 070C SNAPSHOT');
}

console.log(`📦 Đã snapshot byte-for-byte staging feed 070B: ${snapshotPath}`);
console.log(`   Dung lượng: ${mutatedFeedRaw.length} B | SHA-256: ${mutatedSha}`);

// 2. Mint Quarantine Manifest 070C
const manifestObj = {
  $schema: 'https://jayt.vn/schemas/quarantine-manifest.v1.json',
  manifest_id: 'QUARANTINE_MANIFEST_070C_STAGING_LINEAGE_INCIDENT',
  work_order: 'JAYT-070C',
  incident_id: 'INC-STAGING-LINEAGE-MUTATION-070B',
  quarantined_at: new Date().toISOString(),
  quarantine_reason: 'Staging transformer added/modified claims, artifact hashes, and captured_at timestamps not matching raw candidate/receipt SSOT.',
  snapshot_byte_for_byte_persisted: true,
  items: [
    {
      filename: 'staging_deals_feed_070b_mutated.json',
      size_bytes: mutatedFeedRaw.length,
      sha256: mutatedSha,
      quarantine_reason: 'Mutated 3-deal staging feed deployed during 070B containing mutated Metiz claims and altered hashes.'
    }
  ]
};

const manifestPath = path.join(incidentVaultDir, 'QUARANTINE_MANIFEST_070C.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifestObj, null, 2), 'utf8');
console.log(`✅ Đã ban hành Quarantine Manifest 070C: ${manifestPath}`);
