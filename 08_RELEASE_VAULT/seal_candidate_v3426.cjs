/**
 * Package and Seal Candidate v3.426.0
 * Path: 08_RELEASE_VAULT/seal_candidate_v3426.cjs
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const STAGING_DIR = path.join(ROOT, 'staging_preview_sprint_b');
const CANDIDATE_DIR = path.join(ROOT, '08_RELEASE_VAULT', 'candidates', 'v3.426.0');

const sha = buf => crypto.createHash('sha256').update(buf).digest('hex');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function sealCandidate() {
  console.log('[SEAL] Creating candidate directory:', CANDIDATE_DIR);
  fs.mkdirSync(CANDIDATE_DIR, { recursive: true });

  const filesToCopy = [
    'index.html',
    'jayt_storefront_sprint_b.js',
    'styles.css',
    'registry.json',
    'deals_feed.json'
  ];

  for (const f of filesToCopy) {
    const src = path.join(STAGING_DIR, f);
    const dest = path.join(CANDIDATE_DIR, f);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`[SEAL] Copied ${f}`);
    } else {
      throw new Error(`Missing staging file: ${src}`);
    }
  }

  // Copy assets directory if exists
  const srcAssets = path.join(STAGING_DIR, 'assets');
  const destAssets = path.join(CANDIDATE_DIR, 'assets');
  if (fs.existsSync(srcAssets)) {
    copyDir(srcAssets, destAssets);
    console.log('[SEAL] Copied assets directory');
  }

  // Calculate fingerprints
  const fingerprints = {};
  for (const f of filesToCopy) {
    fingerprints[f] = sha(fs.readFileSync(path.join(CANDIDATE_DIR, f)));
  }
  const heroSvgPath = path.join(destAssets, 'board_a_afterglow_hero.svg');
  if (fs.existsSync(heroSvgPath)) {
    fingerprints['board_a_afterglow_hero.svg'] = sha(fs.readFileSync(heroSvgPath));
  }

  const manifest = {
    manifest_name: 'JAYT_350_V3426_RELEASE_CANDIDATE_MANIFEST',
    directive: 'JAYT-350 Batch 16 Harvest and Staging Hydration',
    sealed_at_utc: new Date().toISOString(),
    target_domain: 'https://jayt-production-v3420.vercel.app',
    target_version: 'v3.426.0',
    baseline_production_version: 'v3.425.0-sprint-b-r1',
    registry_baseline_scope: '76_ENTITIES__24_CIVIC_PLUS_52_COMMERCIAL',
    counts: {
      total_entities: 76,
      civic_entities: 24,
      commercial_entities: 52,
      voucher_vault_items: 37,
      smart_value_radar_items: 15
    },
    fingerprints,
    audit_receipts: {
      harvest_receipt: {
        path: '06_TRUST_AND_EVIDENCE/batch_16_voucher_matrix_vault/run_20260907T134242Z_744863e8/BATCH_16_CAPTURE_RECEIPT.json',
        sha256: sha(fs.readFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_16_voucher_matrix_vault', 'run_20260907T134242Z_744863e8', 'BATCH_16_CAPTURE_RECEIPT.json')))
      },
      work_order_receipt: {
        path: '07_QUALITY_ASSURANCE/runtime_evidence/RECEIPT_JAYT-350.json',
        sha256: sha(fs.readFileSync(path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'RECEIPT_JAYT-350.json')))
      }
    },
    rollback_target: {
      version: 'v3.423.0',
      cards_count: 47,
      civic_cards: 24,
      commercial_cards: 23,
      deployment_id: 'dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA',
      artifact_root: 'deploy_personal_v3423/',
      verification_command: 'npx vercel alias set dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA jayt-production-v3420.vercel.app',
      status: 'STANDBY_READY'
    }
  };

  const manifestPath = path.join(CANDIDATE_DIR, 'candidate_manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  const manifestSha = sha(fs.readFileSync(manifestPath));
  console.log('[SEAL] Candidate manifest sealed: SHA-256 =', manifestSha);

  const rollbackManifest = {
    manifest_name: 'JAYT_350_ROLLBACK_MANIFEST',
    rollback_target_version: 'v3.423.0',
    rollback_deployment_id: 'dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA',
    cards_count: 47,
    civic_cards: 24,
    commercial_cards: 23,
    artifact_path: 'deploy_personal_v3423/',
    verification_command: 'npx vercel alias set dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA jayt-production-v3420.vercel.app',
    status: 'STANDBY_READY'
  };

  const rollbackPath = path.join(CANDIDATE_DIR, 'rollback_manifest.json');
  fs.writeFileSync(rollbackPath, JSON.stringify(rollbackManifest, null, 2) + '\n', 'utf8');
  const rollbackSha = sha(fs.readFileSync(rollbackPath));
  console.log('[SEAL] Rollback manifest sealed: SHA-256 =', rollbackSha);

  return {
    candidate_dir: path.relative(ROOT, CANDIDATE_DIR).replace(/\\/g, '/'),
    manifest_path: path.relative(ROOT, manifestPath).replace(/\\/g, '/'),
    manifest_sha256: manifestSha,
    rollback_path: path.relative(ROOT, rollbackPath).replace(/\\/g, '/'),
    rollback_sha256: rollbackSha,
    fingerprints
  };
}

if (require.main === module) {
  try {
    const res = sealCandidate();
    console.log('[SEAL] Done:', JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('[SEAL] Fatal error:', err);
    process.exit(1);
  }
}

module.exports = { sealCandidate };
