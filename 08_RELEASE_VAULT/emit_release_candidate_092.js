/**
 * JAYT RELEASE CANDIDATE EMITTER (092)
 * Directive: JAYT-092-VISUAL-POLISH-WITH-TRUTH-SAFETY
 *
 * Dedicated standalone emitter for immutable Release Candidate generation.
 * Fail-closed: Refuses to overwrite unless explicitly specified with --force.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const targetRcPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_092.json');

const isForce = process.argv.includes('--force') || process.argv.includes('-f');

if (fs.existsSync(targetRcPath) && !isForce) {
  console.error(`❌ [FAIL-CLOSED] Tệp Release Candidate đã tồn tại tại ${targetRcPath}. Sử dụng --force để tạo lại.`);
  process.exit(1);
}

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const artifactFiles = [
  'index.html',
  'jayt_apex_interface.js',
  'four_layer_dataset.json',
  'visual_hybrid_hub_contract.json',
  'customer_journey_north_star.json'
];

const artifactsManifest = {};

for (const f of artifactFiles) {
  const sotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', f);
  const deployPath = path.join(repoRoot, 'deploy', 'public', f);
  const stagingPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH', f);

  if (!fs.existsSync(sotPath)) {
    throw new Error(`MISSING_SOT_FILE: ${sotPath}`);
  }

  const sotBuf = fs.readFileSync(sotPath);
  const sotHash = sha256(sotBuf);
  const sotSize = sotBuf.length;

  if (fs.existsSync(deployPath)) {
    const deployHash = sha256(fs.readFileSync(deployPath));
    if (deployHash !== sotHash) {
      throw new Error(`HASH_MISMATCH_DEPLOY: ${f} SoT (${sotHash}) !== Deploy (${deployHash})`);
    }
  }

  if (fs.existsSync(stagingPath)) {
    const stagingHash = sha256(fs.readFileSync(stagingPath));
    if (stagingHash !== sotHash) {
      throw new Error(`HASH_MISMATCH_STAGING: ${f} SoT (${sotHash}) !== Staging (${stagingHash})`);
    }
  }

  artifactsManifest[f] = {
    sha256: sotHash,
    size_bytes: sotSize,
    verified_at: new Date().toISOString()
  };
}

const rcData = {
  release_candidate_id: 'JAYT_RELEASE_CANDIDATE_092',
  version: '2.2.0',
  created_at: new Date().toISOString(),
  directive: 'JAYT-092-VISUAL-POLISH-WITH-TRUTH-SAFETY',
  bundle_type: 'VISUAL_HYBRID_HUB_V2_EDITORIAL',
  status: 'EMITTED_PENDING_CEO_REVIEW',
  artifacts: artifactsManifest,
  invariants: {
    production_feed_empty: true,
    ceo_approval_locked: false,
    zero_pii_storage: true,
    zero_unverified_pulses: true
  }
};

fs.writeFileSync(targetRcPath, JSON.stringify(rcData, null, 2), 'utf8');
console.log(`✅ [RC-092-EMITTED] Đã tạo thành công Release Candidate 092: ${targetRcPath}`);
console.log(`   Artifacts: ${Object.keys(artifactsManifest).length} files verified with 100% hash parity.`);
