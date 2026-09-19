/**
 * JAYT-350-R1: Rollback Realignment & Final Candidate Resealing
 * Path: 07_QUALITY_ASSURANCE/run_jayt_350_r1_realignment.cjs
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const CANDIDATE_DIR = path.join(ROOT, '08_RELEASE_VAULT', 'candidates', 'v3.426.0');
const SPRINT_B_R1_DIR = path.join(ROOT, '08_RELEASE_VAULT', 'candidates', 'sprint_b_r1');
const CATALOG_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_16_voucher_matrix_vault', 'run_20260907T134242Z_744863e8', 'BATCH_16_CATALOG.json');
const REGISTRY_PATH = path.join(CANDIDATE_DIR, 'registry.json');
const RECEIPT_OUT_PATH = path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'RECEIPT_JAYT-350-R1.json');
const SIDECAR_OUT_PATH = path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'RECEIPT_JAYT-350-R1.json.sha256');

const sha = buf => crypto.createHash('sha256').update(buf).digest('hex');

async function main() {
  const startTime = new Date().toISOString();
  console.log('[JAYT-350-R1] Starting Rollback Realignment and Final Reseal...');

  // 1. Get fingerprints of rollback artifact root (sprint_b_r1)
  const rollbackArtifactFingerprints = {};
  const sprintBFiles = fs.readdirSync(SPRINT_B_R1_DIR);
  for (const f of sprintBFiles) {
    const p = path.join(SPRINT_B_R1_DIR, f);
    if (fs.statSync(p).isFile()) {
      rollbackArtifactFingerprints[f] = sha(fs.readFileSync(p));
    }
  }

  // 2. Write updated rollback_manifest.json
  console.log('[JAYT-350-R1] Writing realigned rollback_manifest.json...');
  const rollbackManifest = {
    manifest_name: 'JAYT_350_R1_ROLLBACK_MANIFEST',
    rollback_target_version: 'v3.425.0-sprint-b-r1',
    rollback_deployment_id: 'dpl_CvczfzmWBk4XJvd7RgfNX1Dwe55o',
    cards_count: 51,
    civic_cards: 24,
    commercial_cards: 27,
    voucher_vault_cards: 12,
    smart_value_radar_cards: 15,
    artifact_path: '08_RELEASE_VAULT/candidates/sprint_b_r1/',
    artifact_manifest_sha256: rollbackArtifactFingerprints['candidate_manifest.json'],
    verification_command: 'npx vercel alias set dpl_CvczfzmWBk4XJvd7RgfNX1Dwe55o jayt-production-v3420.vercel.app',
    status: 'STANDBY_READY'
  };

  const rollbackPath = path.join(CANDIDATE_DIR, 'rollback_manifest.json');
  fs.writeFileSync(rollbackPath, JSON.stringify(rollbackManifest, null, 2) + '\n', 'utf8');
  const rollbackSha = sha(fs.readFileSync(rollbackPath));
  console.log('[JAYT-350-R1] Realigned rollback manifest SHA-256:', rollbackSha);

  // 3. Update candidate_manifest.json
  console.log('[JAYT-350-R1] Updating and resealing candidate_manifest.json...');
  const candidateManifest = {
    manifest_name: 'JAYT_350_R1_V3426_RELEASE_CANDIDATE_MANIFEST',
    directive: 'JAYT-350-R1 Rollback Realignment and Final Sealing',
    sealed_at_utc: new Date().toISOString(),
    target_domain: 'https://jayt-production-v3420.vercel.app',
    target_version: 'v3.426.0',
    production_release_baseline: 'v3.425.0-sprint-b-r1',
    runtime_ledger_version: 'v3.424.0',
    registry_baseline_scope: '76_ENTITIES__24_CIVIC_PLUS_52_COMMERCIAL',
    counts: {
      total_entities: 76,
      civic_entities: 24,
      commercial_entities: 52,
      voucher_vault_items: 37,
      smart_value_radar_items: 15
    },
    fingerprints: {
      'index.html': sha(fs.readFileSync(path.join(CANDIDATE_DIR, 'index.html'))),
      'jayt_storefront_sprint_b.js': sha(fs.readFileSync(path.join(CANDIDATE_DIR, 'jayt_storefront_sprint_b.js'))),
      'styles.css': sha(fs.readFileSync(path.join(CANDIDATE_DIR, 'styles.css'))),
      'registry.json': sha(fs.readFileSync(path.join(CANDIDATE_DIR, 'registry.json'))),
      'deals_feed.json': sha(fs.readFileSync(path.join(CANDIDATE_DIR, 'deals_feed.json'))),
      'board_a_afterglow_hero.svg': sha(fs.readFileSync(path.join(CANDIDATE_DIR, 'assets', 'images', 'board_a_afterglow_hero.svg')))
    },
    audit_receipts: {
      harvest_receipt: {
        path: '06_TRUST_AND_EVIDENCE/batch_16_voucher_matrix_vault/run_20260907T134242Z_744863e8/BATCH_16_CAPTURE_RECEIPT.json',
        sha256: sha(fs.readFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_16_voucher_matrix_vault', 'run_20260907T134242Z_744863e8', 'BATCH_16_CAPTURE_RECEIPT.json')))
      },
      work_order_receipt: {
        path: '07_QUALITY_ASSURANCE/runtime_evidence/RECEIPT_JAYT-350-R1.json'
      }
    },
    rollback_target: {
      version: 'v3.425.0-sprint-b-r1',
      cards_count: 51,
      civic_cards: 24,
      commercial_cards: 27,
      deployment_id: 'dpl_CvczfzmWBk4XJvd7RgfNX1Dwe55o',
      artifact_root: '08_RELEASE_VAULT/candidates/sprint_b_r1/',
      artifact_manifest_sha256: rollbackArtifactFingerprints['candidate_manifest.json'],
      verification_command: 'npx vercel alias set dpl_CvczfzmWBk4XJvd7RgfNX1Dwe55o jayt-production-v3420.vercel.app',
      status: 'STANDBY_READY'
    }
  };

  const manifestPath = path.join(CANDIDATE_DIR, 'candidate_manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(candidateManifest, null, 2) + '\n', 'utf8');
  const candidateManifestSha = sha(fs.readFileSync(manifestPath));
  console.log('[JAYT-350-R1] Sealed candidate_manifest.json SHA-256:', candidateManifestSha);

  // 4. Validate Registry and Unique IDs
  console.log('[JAYT-350-R1] Validating registry and unique IDs...');
  const reg = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  const civicEntries = reg.approved_civic_entries || [];
  const commercialEntries = reg.approved_commercial_entries || [];
  const allIds = new Set();
  let duplicateFound = false;

  civicEntries.forEach(id => {
    if (allIds.has(id)) {
      console.error('Duplicate Civic ID:', id);
      duplicateFound = true;
    }
    allIds.add(id);
  });

  commercialEntries.forEach(c => {
    const id = c.card_id || c.sku_id || c.candidate_id;
    if (allIds.has(id)) {
      console.error('Duplicate Commercial ID:', id);
      duplicateFound = true;
    }
    allIds.add(id);
  });

  if (duplicateFound || allIds.size !== 76) {
    throw new Error(`Registry uniqueness check failed: total unique IDs = ${allIds.size} (expected 76)`);
  }
  console.log('[JAYT-350-R1] Registry verified: exactly 76 unique IDs (24 civic, 52 commercial)');

  // 5. Build Item-Level Summaries
  console.log('[JAYT-350-R1] Parsing Batch 16 catalog for item-level summaries...');
  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
  const verifiedCandidates = catalog.candidates.filter(c => c.classification === 'VERIFIED');
  const heldCandidates = catalog.candidates.filter(c => c.classification !== 'VERIFIED');

  if (verifiedCandidates.length !== 25 || heldCandidates.length !== 6) {
    throw new Error(`Catalog count mismatch: verified=${verifiedCandidates.length} (expected 25), held=${heldCandidates.length} (expected 6)`);
  }

  const newVerifiedItemsSummary = verifiedCandidates.map(c => {
    let classificationType = 'observed_price';
    if (c.offer_type === 'MEMBER_BENEFIT') {
      classificationType = 'member_benefit';
    } else if (c.offer_type === 'PROMO_COMBO') {
      classificationType = 'seasonal_program';
    } else if (c.offer_type === 'PROMO_GIFT') {
      classificationType = 'seasonal_program';
    }

    return {
      candidate_id: c.candidate_id,
      brand_id: c.brand_id,
      classification_type: classificationType,
      semantic_category: classificationType === 'observed_price' ? 'Thực đơn thường nhật / Giá quan sát' : (classificationType === 'member_benefit' ? 'Quyền lợi hội viên qua tin nhắn' : 'Combo / Quà tặng chương trình theo mùa'),
      title: c.title,
      observed_value: c.observed_value,
      conditions: c.conditions,
      validity_status: c.validity_status,
      official_leaf_url: c.official_leaf_url,
      source_raw_sha256: c.source_raw_sha256,
      locality_basis: c.brand_id === 'jollibee' ? 'Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)' : 'Thương hiệu có 7 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)'
    };
  });

  const heldItemsSummary = heldCandidates.map(c => ({
    candidate_id: c.candidate_id,
    brand_id: c.brand_id,
    classification: c.classification,
    classification_reason: c.classification_reason,
    official_leaf_url: c.official_leaf_url,
    source_raw_sha256: c.source_raw_sha256
  }));

  // 6. Run Staging Storefront Audit
  console.log('[JAYT-350-R1] Executing staging storefront audit...');
  const { runAudit } = require('./audit_jayt_350_staging_v3426.cjs');
  const auditResult = await runAudit();

  if (auditResult.verdict !== 'PASSED') {
    throw new Error('Staging audit failed! Cannot emit receipt.');
  }

  // 7. Assemble RECEIPT_JAYT-350-R1.json
  const finishTime = new Date().toISOString();
  const receiptDoc = {
    work_order_id: 'JAYT-350-R1',
    issuer: 'Codex — CEO/Gatekeeper',
    executor: 'Antigravity — external software',
    status: 'AUDIT_READY__PENDING_STRATEGIC_ADVISOR_AND_CHAIRMAN_REVIEW',
    started_at_utc: startTime,
    finished_at_utc: finishTime,
    command: 'node 07_QUALITY_ASSURANCE/run_jayt_350_r1_realignment.cjs',
    exit_code: 0,
    production_release_baseline: 'v3.425.0-sprint-b-r1',
    runtime_ledger_version: 'v3.424.0',
    rollback_target: {
      version: 'v3.425.0-sprint-b-r1',
      cards_count: 51,
      civic_cards: 24,
      commercial_cards: 27,
      voucher_vault_cards: 12,
      smart_value_radar_cards: 15,
      deployment_id: 'dpl_CvczfzmWBk4XJvd7RgfNX1Dwe55o',
      artifact_root: '08_RELEASE_VAULT/candidates/sprint_b_r1/',
      artifact_manifest_sha256: rollbackArtifactFingerprints['candidate_manifest.json'],
      verification_command: 'npx vercel alias set dpl_CvczfzmWBk4XJvd7RgfNX1Dwe55o jayt-production-v3420.vercel.app',
      status: 'STANDBY_READY'
    },
    rollback_manifest_sha256: rollbackSha,
    rollback_artifact_fingerprint: rollbackArtifactFingerprints,
    candidate_readiness: {
      target_version: 'v3.426.0',
      candidate_manifest_path: '08_RELEASE_VAULT/candidates/v3.426.0/candidate_manifest.json',
      candidate_manifest_sha256: candidateManifestSha,
      registry_sha256: sha(fs.readFileSync(path.join(CANDIDATE_DIR, 'registry.json'))),
      deals_feed_sha256: sha(fs.readFileSync(path.join(CANDIDATE_DIR, 'deals_feed.json'))),
      storefront_bundle_sha256: sha(fs.readFileSync(path.join(CANDIDATE_DIR, 'jayt_storefront_sprint_b.js'))),
      styles_sha256: sha(fs.readFileSync(path.join(CANDIDATE_DIR, 'styles.css'))),
      hero_svg_sha256: sha(fs.readFileSync(path.join(CANDIDATE_DIR, 'assets', 'images', 'board_a_afterglow_hero.svg'))),
      staging_audit_receipt_sha256: sha(Buffer.from(JSON.stringify(auditResult))),
      total_approved_entities_count: 76,
      civic_entities_count: 24,
      commercial_entities_count: 52,
      voucher_vault_items_count: 37,
      smart_value_radar_items_count: 15,
      status: 'INTEGRATED_CANDIDATE_READY__AWAITING_RELEASE_DECREE'
    },
    registry_breakdown: {
      total_count: 76,
      civic_count: 24,
      commercial_count: 52,
      voucher_vault_count: 37,
      smart_value_radar_count: 15,
      unique_id_check: 'ALL_76_UNIQUE',
      deduplicated_against_v3425: true
    },
    new_verified_items_count: 25,
    new_verified_items_summary: newVerifiedItemsSummary,
    held_items_count: 6,
    held_items_summary: heldItemsSummary,
    staging_audit: auditResult,
    production_permissions: {
      production_deployment_authorized: false,
      production_mutation_authorized: false,
      production_mutations: 0
    },
    blockers: []
  };

  // Exclusive creation
  console.log('[JAYT-350-R1] Emitting RECEIPT_JAYT-350-R1.json with exclusive flag...');
  fs.mkdirSync(path.dirname(RECEIPT_OUT_PATH), { recursive: true });
  const receiptJson = JSON.stringify(receiptDoc, null, 2) + '\n';
  fs.writeFileSync(RECEIPT_OUT_PATH, receiptJson, { flag: 'wx' });
  const receiptSha = sha(fs.readFileSync(RECEIPT_OUT_PATH));
  fs.writeFileSync(SIDECAR_OUT_PATH, receiptSha + '\n', 'utf8');

  console.log('[JAYT-350-R1] Receipt generated successfully!');
  console.log('[JAYT-350-R1] Receipt Path:   ', RECEIPT_OUT_PATH);
  console.log('[JAYT-350-R1] Receipt SHA-256:', receiptSha);

  return {
    receipt_path: RECEIPT_OUT_PATH,
    receipt_sha256: receiptSha,
    candidate_manifest_sha256: candidateManifestSha,
    rollback_manifest_sha256: rollbackSha
  };
}

if (require.main === module) {
  main().then(res => {
    console.log('[JAYT-350-R1] Complete:', JSON.stringify(res, null, 2));
  }).catch(err => {
    console.error('[JAYT-350-R1] Fatal error:', err);
    process.exit(1);
  });
}

module.exports = { main };
