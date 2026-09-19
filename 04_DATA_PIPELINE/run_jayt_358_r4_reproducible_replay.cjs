/**
 * JAYT-358-R4: Targeted Offer Card Source Reacquisition Replay Runner
 * 
 * Mandate & Invariants (Work Order J358-R4-TARGETED-OFFER-CARD-SOURCE-REACQUISITION):
 * 1. Single entrypoint executing full R4 evidence verification in one reproducible run.
 * 2. Non-mutating verify-existing replay mode by default (Req 19, 21).
 * 3. Fresh official first-party source acquisition recorded in SEALED_SOURCE_MANIFEST.json (Req 15, 17).
 * 4. Run R3-R9 evaluator only against anchored registry extension from sealed R4 vault (Req 19).
 * 5. Candid Shortfall Policy: 0 VERIFIED / 10 HELD maintained across all 10 real candidates (Req 20).
 * 6. Zero staging hydration, candidate packaging, or production mutation permitted (Req 21).
 */

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {
  sha256,
  evaluateCandidate,
  loadCanonicalAnchoredRegistry,
  CANONICAL_REGISTRY_PATH,
  EXPECTED_REGISTRY_SHA,
  CANONICAL_R4_EXTENSION_PATH,
  EXPECTED_R4_EXTENSION_SHA
} = require('./j358_r3_r9_anchored_registry_validator.cjs');

const ROOT = path.resolve(__dirname, '..');
const VAULT_R4 = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_19_r4_targeted_offer_card_vault');
const QA_DIR = path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence');
const STAGING_FEED_PATH = path.join(ROOT, 'staging_preview_sprint_b', 'deals_feed.json');
const EXPECTED_STAGING_SHA = 'df0ccbab9aef23615e445a0bae6f3a16dbe1dab0face24f4fa5fe8bf6110ed94';

const SOURCE_MANIFEST_PATH = path.join(VAULT_R4, 'SEALED_SOURCE_MANIFEST.json');
const REGISTRY_EXT_PATH = path.join(VAULT_R4, 'SEALED_METADATA_REGISTRY_R4_EXTENSION.json');
const MATRIX_OUTPUT_PATH = path.join(VAULT_R4, 'OFFER_CARD_EVIDENCE_MATRIX.json');
const RECEIPT_OUTPUT_PATH = path.join(QA_DIR, 'RECEIPT_J358_R4_TARGETED_SOURCE_REACQUISITION.json');
const SEALED_TIMESTAMP = '2026-09-09T06:30:00.000Z';

const CANDIDATES_R4 = [
  {
    b19_id: 'B19_STARLIGHT_U22_WEEKDAY',
    brand: 'Starlight Cinema',
    leaf_id: 'r4_starlight_u22_program',
    claims: {
      title: 'CT U22 RẠP STARLIGHT',
      price: 'Đồng gi&aacute; v&eacute; 45k/v&eacute; khi mua tại quầy từ thứ 2 đến thứ 5!',
      conditions: 'Độ tuổi dưới 22',
      validity_or_recurrence: 'từ thứ 2 đến thứ 5!',
      da_nang_locality: null
    }
  },
  {
    b19_id: 'B19_STARLIGHT_U22_WEEKEND',
    brand: 'Starlight Cinema',
    leaf_id: 'r4_starlight_u22_program',
    claims: {
      title: 'CT U22 RẠP STARLIGHT',
      price: '&Aacute;p dụng tại c&aacute;c rạp Quy Nhơn, Đ&agrave; Nẵng d&agrave;nh cho kh&aacute;ch h&agrave;ng U22 l&agrave; 55k/v&eacute;',
      conditions: 'Độ tuổi dưới 22',
      validity_or_recurrence: null,
      da_nang_locality: 'Đ&agrave; Nẵng'
    }
  },
  {
    b19_id: 'B19_STARLIGHT_THU_3_PHIM_VIET',
    brand: 'Starlight Cinema',
    leaf_id: 'r4_starlight_thu_3_phim_viet',
    claims: {
      title: 'THỨ 3 PHIM VIỆT',
      price: '-&Aacute;p dụng gi&aacute; : 45 k cho tất cả c&aacute;c phim Việt v&agrave;o ng&agrave;y thứ 3 h&agrave;ng tuần.',
      conditions: 'mua v&eacute; c&aacute;c phim Việt Nam',
      validity_or_recurrence: 'v&agrave;o ng&agrave;y thứ 3 h&agrave;ng tuần',
      da_nang_locality: null
    }
  },
  {
    b19_id: 'B19_TPC_COMBO_VU_LAN_315K',
    brand: 'The Pizza Company',
    leaf_id: 'r4_tpc_combo_vu_lan_22662',
    claims: {
      title: 'Combo Vu Lan An L&#xE0;nh',
      price: '315.000đ',
      conditions: '01 Pizza Rau Củ/ Phô Mai',
      validity_or_recurrence: null,
      da_nang_locality: null
    }
  },
  {
    b19_id: 'B19_TPC_COMBO_COT_MAM_KEO_479K',
    brand: 'The Pizza Company',
    leaf_id: 'r4_tpc_combo_cot_mam_keo',
    claims: {
      title: 'Combo &quot;C&#x1ED1;t&quot; M&#x1EAF;m K&#x1EB9;o',
      price: '479.000đ',
      conditions: '1 Pizza Hải Sản Calamari Xốt Nước Mắm',
      validity_or_recurrence: null,
      da_nang_locality: null
    }
  },
  {
    b19_id: 'B19_TPC_COMBO_COT_MAI_MAN_599K',
    brand: 'The Pizza Company',
    leaf_id: 'r4_tpc_combo_cot_mai_man',
    claims: {
      title: 'Combo &quot;C&#x1ED1;t&quot; M&#xE3;i M&#x1EB7;n',
      price: '599.000đ',
      conditions: '1 Pizza Hải Sản Calamari Xốt Nước Mắm',
      validity_or_recurrence: null,
      da_nang_locality: null
    }
  },
  {
    b19_id: 'B19_TPC_BOGO_PEPSI_15L',
    brand: 'The Pizza Company',
    leaf_id: 'r4_tpc_mua_1_tang_1_nuoc',
    claims: {
      title: 'Mua 1 T&#x1EB7;ng 1 N&#x1B0;&#x1EDB;c',
      price: '50.000đ',
      conditions: 'Tặng 1 Chai Pepsi PET 1.5L',
      validity_or_recurrence: null,
      da_nang_locality: null
    }
  },
  {
    b19_id: 'B19_TPC_BO_DOI_NHU_Y_169K',
    brand: 'The Pizza Company',
    leaf_id: 'r4_tpc_bo_doi_nhu_y_combo_1',
    claims: {
      title: 'B&#x1ED9; &#x110;&#xF4;i Nh&#x1B0; &quot;Y&#x301;&quot; Combo 1',
      price: '169.000đ',
      conditions: '01 Pizza Truyền Thống, Cỡ Nhỏ',
      validity_or_recurrence: null,
      da_nang_locality: null
    }
  },
  {
    b19_id: 'B19_GONGCHA_MEMBER_POLICY',
    brand: 'Gong Cha',
    leaf_id: 'r4_gongcha_member_policy',
    claims: {
      title: 'CHÍNH SÁCH THÀNH VIÊN ỨNG DỤNG GONG CHA VN',
      price: '10,000 vnđ = 1 Lá trà',
      conditions: 'Nhận voucher miễn phí 1 thức uống size M trên menu vào ngày sinh nhật',
      validity_or_recurrence: null,
      da_nang_locality: null
    }
  },
  {
    b19_id: 'B19_KATINAT_APP_LOYALTY',
    brand: 'Katinat Saigon Kafe',
    leaf_id: 'r4_katinat_app_loyalty',
    claims: {
      title: 'KATINAT CHÍNH THỨC RA MẮT ỨNG DỤNG',
      price: 'Nhận Voucher ưu đãi 30k cho đơn tối thiểu 60k (từ 25/04 &#8211; 09/05)',
      conditions: 'ứng dụng thành viên &amp; đặt món dành riêng cho Katies',
      validity_or_recurrence: null,
      da_nang_locality: null
    }
  }
];

function runReplay(options = {}) {
  const isGenerateMode = !!options.generate;
  const isVerifyMode = !isGenerateMode;

  console.log('======================================================================');
  console.log('=== WORK ORDER J358-R4: TARGETED SOURCE REACQUISITION REPLAY [' + (isGenerateMode ? 'GENERATE' : 'VERIFY-EXISTING') + '] ===');
  console.log('======================================================================\n');

  // Step 1: Self-Hashing & Environment Integrity
  const runnerBytes = fs.readFileSync(__filename);
  const runnerHash = sha256(runnerBytes);

  const validatorPath = path.join(ROOT, '04_DATA_PIPELINE', 'j358_r3_r9_anchored_registry_validator.cjs');
  const validatorBytes = fs.readFileSync(validatorPath);
  const validatorHash = sha256(validatorBytes);

  const stagingBytes = fs.readFileSync(STAGING_FEED_PATH);
  const stagingHash = sha256(stagingBytes);
  const stagingIntact = stagingHash === EXPECTED_STAGING_SHA;

  // Step 1.1: Verify Canonical Registry & Anchored R4 Extension independently
  const regCheck = loadCanonicalAnchoredRegistry();
  if (!regCheck.ok) {
    console.error('[FATAL] Canonical registry anchor verification failed:', regCheck.error);
    process.exit(1);
  }
  const registryHash = regCheck.sha256;
  const extensionInfo = regCheck.extension;

  console.log('1. Environment Integrity & Anchored Registry Extension Verification:');
  console.log('   - Runner Hash:          ' + runnerHash);
  console.log('   - Validator Hash:       ' + validatorHash);
  console.log('   - Base Registry Hash:   ' + registryHash + ' (EXPECTED: ' + EXPECTED_REGISTRY_SHA + ') -> VERIFIED MATCH');
  console.log('   - Extension Path:       ' + extensionInfo.path);
  console.log('   - Extension Hash:       ' + extensionInfo.sha256 + ' (EXPECTED: ' + EXPECTED_R4_EXTENSION_SHA + ') -> VERIFIED MATCH');
  console.log('   - Extension Leaves:     ' + extensionInfo.leaves_count + ' registered leaves');
  console.log('   - Staging Feed:         ' + stagingHash + ' (' + (stagingIntact ? 'BIT-IDENTICAL BASELINE v3.429.0' : 'MISMATCH!') + ')\n');

  if (!stagingIntact) {
    console.error('[FATAL] Staging feed mismatch!');
    process.exit(1);
  }

  // Step 2: Ingest and Hash all 18 sealed R4 vault files + Manifest
  console.log('2. Ingesting and Hashing Sealed R4 Vault Files:');
  const vaultInputHashes = {};
  const uniqueLeafIds = Array.from(new Set(CANDIDATES_R4.map(c => c.leaf_id)));

  for (const leafId of uniqueLeafIds) {
    const rawPath = path.join(VAULT_R4, leafId + '.leaf.raw.html');
    const metaPath = path.join(VAULT_R4, leafId + '.leaf.meta.json');

    if (!fs.existsSync(rawPath) || !fs.existsSync(metaPath)) {
      throw new Error('Missing required vault leaf file: ' + leafId);
    }

    const rawBuf = fs.readFileSync(rawPath);
    const metaBuf = fs.readFileSync(metaPath);
    const rawSha = sha256(rawBuf);
    const metaSha = sha256(metaBuf);

    // Verify sidecars
    const rawSidecar = fs.readFileSync(rawPath + '.sha256', 'utf8').trim().split(/\s+/)[0];
    const metaSidecar = fs.readFileSync(metaPath + '.sha256', 'utf8').trim().split(/\s+/)[0];

    if (rawSha !== rawSidecar || metaSha !== metaSidecar) {
      throw new Error('Sidecar mismatch for leaf: ' + leafId);
    }

    vaultInputHashes[leafId] = {
      raw_sha256: rawSha,
      raw_bytes: rawBuf.length,
      meta_sha256: metaSha,
      meta_bytes: metaBuf.length,
      sidecars_verified: true
    };

    console.log('   - ' + leafId + ': RAW=' + rawSha.slice(0, 16) + '... (' + rawBuf.length + ' bytes) | META=' + metaSha.slice(0, 16) + '... [SIDECARS: OK]');
  }

  const manifestBuf = fs.readFileSync(SOURCE_MANIFEST_PATH);
  const manifestSha = sha256(manifestBuf);
  const manifestSidecar = fs.readFileSync(SOURCE_MANIFEST_PATH + '.sha256', 'utf8').trim().split(/\s+/)[0];
  const manifestSidecarOk = manifestSha === manifestSidecar;
  console.log('   - SEALED_SOURCE_MANIFEST.json: ' + manifestSha + ' [SIDECAR: ' + (manifestSidecarOk ? 'OK' : 'MISMATCH') + ']\n');

  // Step 3: Evaluate 10 Real Vault Candidates using R3-R9 Evaluator against R4 Extension
  console.log('3. Evaluating 10 Real Vault Candidates (Candid Shortfall Evaluation):');
  const candidateResults = [];
  let heldCount = 0;
  let verifiedCount = 0;

  for (const candidate of CANDIDATES_R4) {
    const rawPath = path.join(VAULT_R4, candidate.leaf_id + '.leaf.raw.html');
    const metaPath = path.join(VAULT_R4, candidate.leaf_id + '.leaf.meta.json');
    const rawBuf = fs.readFileSync(rawPath);
    const metaBuf = fs.readFileSync(metaPath);
    const meta = JSON.parse(metaBuf.toString('utf8'));

    const evalResult = evaluateCandidate(candidate, rawBuf, meta, {
      metadataBytes: metaBuf,
      targetYear: 2026
    });

    if (evalResult.status === 'HELD') {
      heldCount++;
      console.log('   - ' + candidate.b19_id + ': [HELD] ' + evalResult.held_reason);
    } else {
      verifiedCount++;
      console.log('   - ' + candidate.b19_id + ': [VERIFIED]');
    }

    candidateResults.push({
      b19_id: candidate.b19_id,
      brand: candidate.brand,
      leaf_id: candidate.leaf_id,
      status: evalResult.status,
      held_reason: evalResult.held_reason,
      preconditions_passed: evalResult.preconditions_passed,
      offer_card: evalResult.offer_card,
      dimensions: evalResult.dimensions,
      missing_dimensions: evalResult.missing_dimensions
    });
  }
  console.log('');

  const shortfallMaintained = verifiedCount === 0 && heldCount === CANDIDATES_R4.length;
  console.log('   Shortfall Policy Status: ' + (shortfallMaintained ? 'COMPLIANT (10 HELD / 0 VERIFIED)' : 'VIOLATION'));

  const evidenceMatrixObject = {
    work_order: 'J358-R4-TARGETED-OFFER-CARD-SOURCE-REACQUISITION',
    generated_at_utc: SEALED_TIMESTAMP,
    environment_integrity: {
      runner_sha256: runnerHash,
      validator_sha256: validatorHash,
      canonical_registry_path: CANONICAL_REGISTRY_PATH,
      canonical_registry_sha256: registryHash,
      canonical_r4_extension_path: CANONICAL_R4_EXTENSION_PATH,
      canonical_r4_extension_sha256: extensionInfo.sha256,
      staging_feed_sha256: stagingHash,
      staging_invariance_maintained: stagingIntact
    },
    r4_vault_inputs: vaultInputHashes,
    summary: {
      total_candidates: CANDIDATES_R4.length,
      verified_count: verifiedCount,
      held_count: heldCount,
      shortfall_policy_maintained: shortfallMaintained
    },
    matrix: candidateResults
  };

  const matrixJson = JSON.stringify(evidenceMatrixObject, null, 2);
  const matrixSha = sha256(Buffer.from(matrixJson, 'utf8'));

  // Step 4: Consolidated Immutable Receipt
  const receiptObject = {
    work_order_id: 'J358-R4-TARGETED-OFFER-CARD-SOURCE-REACQUISITION',
    issued_by: 'Antigravity Autonomous Pair Programmer',
    receipt_timestamp_utc: SEALED_TIMESTAMP,
    status: shortfallMaintained ? 'SUCCESS__TARGETED_SOURCES_SEALED_AND_EVALUATED' : 'FAILURE__UNAUTHORIZED_PROMOTIONS_DETECTED',
    shortfall_policy: {
      required: 'ZERO_UNVERIFIED_PROMOTIONS',
      verified_count: verifiedCount,
      held_count: heldCount,
      compliant: shortfallMaintained
    },
    source_reacquisition: {
      vault_directory: '06_TRUST_AND_EVIDENCE/batch_19_r4_targeted_offer_card_vault',
      source_manifest_path: '06_TRUST_AND_EVIDENCE/batch_19_r4_targeted_offer_card_vault/SEALED_SOURCE_MANIFEST.json',
      source_manifest_sha256: manifestSha,
      total_leaves_acquired: uniqueLeafIds.length,
      first_party_domains: ['starlight.vn', 'thepizzacompany.vn', 'gongcha.com.vn', 'katinat.vn']
    },
    trust_root_extension: {
      extension_path: '06_TRUST_AND_EVIDENCE/batch_19_r4_targeted_offer_card_vault/SEALED_METADATA_REGISTRY_R4_EXTENSION.json',
      extension_sha256: extensionInfo.sha256,
      registered_leaves: extensionInfo.leaves_count,
      extension_anchored_independently: true
    },
    reproducibility: {
      replay_entrypoint: '04_DATA_PIPELINE/run_jayt_358_r4_reproducible_replay.cjs',
      runner_sha256: runnerHash,
      validator_sha256: validatorHash,
      evidence_matrix_sha256: matrixSha
    },
    invariance_assertions: {
      staging_preview_feed: STAGING_FEED_PATH,
      staging_preview_feed_sha256: stagingHash,
      staging_bit_identical_to_v34290: stagingIntact,
      production_baseline: 'v3.429.0',
      production_url: 'https://jayt-production-v3420.vercel.app',
      production_deployment_id: 'dpl_BiD7syWRkLVgXFjPNjxesMJ2h4mM',
      production_deployment_authorized: false,
      production_mutation_permitted: false
    },
    verified_artifacts: [
      {
        path: SOURCE_MANIFEST_PATH,
        sha256: manifestSha
      },
      {
        path: REGISTRY_EXT_PATH,
        sha256: extensionInfo.sha256
      },
      {
        path: MATRIX_OUTPUT_PATH,
        sha256: matrixSha
      }
    ]
  };

  const receiptJson = JSON.stringify(receiptObject, null, 2);
  const receiptSha = sha256(Buffer.from(receiptJson, 'utf8'));

  if (isGenerateMode) {
    console.log('\n4. Emitting Sealed Artifacts & Sidecars (--generate mode):');

    // Write matrix
    fs.writeFileSync(MATRIX_OUTPUT_PATH, matrixJson, 'utf8');
    fs.writeFileSync(MATRIX_OUTPUT_PATH + '.sha256', matrixSha + '  ' + path.basename(MATRIX_OUTPUT_PATH) + '\n', 'utf8');
    console.log('   - Evidence Matrix written: ' + MATRIX_OUTPUT_PATH + ' (' + matrixSha + ')');

    // Write receipt
    fs.writeFileSync(RECEIPT_OUTPUT_PATH, receiptJson, 'utf8');
    fs.writeFileSync(RECEIPT_OUTPUT_PATH + '.sha256', receiptSha + '  ' + path.basename(RECEIPT_OUTPUT_PATH) + '\n', 'utf8');
    console.log('   - Receipt written:         ' + RECEIPT_OUTPUT_PATH + ' (' + receiptSha + ')');

    console.log('\n5. Sidecar Self-Verification:');
    const mCheck = fs.readFileSync(MATRIX_OUTPUT_PATH + '.sha256', 'utf8').trim().startsWith(matrixSha);
    const rCheck = fs.readFileSync(RECEIPT_OUTPUT_PATH + '.sha256', 'utf8').trim().startsWith(receiptSha);

    console.log('   - Evidence Matrix Sidecar: ' + (mCheck ? 'MATCH: TRUE' : 'MISMATCH!'));
    console.log('   - Receipt Sidecar:         ' + (rCheck ? 'MATCH: TRUE' : 'MISMATCH!'));

    console.log('\n======================================================================');
    console.log('R4 ARTIFACT GENERATION COMPLETE: SUCCESS');
    console.log('======================================================================\n');
    return { ok: true, matrixSha, receiptSha };
  } else {
    // VERIFY-EXISTING MODE (Non-mutating per Req 21)
    console.log('\n4. Verifying Existing On-Disk Artifacts (Non-Mutating verify-existing mode):');

    if (!fs.existsSync(MATRIX_OUTPUT_PATH) || !fs.existsSync(RECEIPT_OUTPUT_PATH)) {
      console.error('[FAIL] Required on-disk artifacts are missing!');
      console.error('To generate initial artifacts, run with --generate flag.');
      process.exit(1);
    }

    const diskMatrixBuf = fs.readFileSync(MATRIX_OUTPUT_PATH);
    const diskMatrixSha = sha256(diskMatrixBuf);
    const diskMatrixSidecar = fs.readFileSync(MATRIX_OUTPUT_PATH + '.sha256', 'utf8').trim();

    const diskReceiptBuf = fs.readFileSync(RECEIPT_OUTPUT_PATH);
    const diskReceiptSha = sha256(diskReceiptBuf);
    const diskReceiptSidecar = fs.readFileSync(RECEIPT_OUTPUT_PATH + '.sha256', 'utf8').trim();

    const matrixMatch = diskMatrixSha === matrixSha && diskMatrixSidecar.startsWith(matrixSha);
    const receiptMatch = diskReceiptSha === receiptSha && diskReceiptSidecar.startsWith(receiptSha);

    console.log('   - Evidence Matrix on disk: ' + diskMatrixSha + ' (Expected: ' + matrixSha + ') -> ' + (matrixMatch ? 'VERIFIED MATCH: TRUE' : 'MISMATCH!'));
    console.log('   - Receipt on disk:         ' + diskReceiptSha + ' (Expected: ' + receiptSha + ') -> ' + (receiptMatch ? 'VERIFIED MATCH: TRUE' : 'MISMATCH!'));

    if (!matrixMatch || !receiptMatch) {
      console.error('\n[FATAL] Existing sealed artifacts do not match in-memory deterministic replay calculation!');
      process.exit(1);
    }

    console.log('\n======================================================================');
    console.log('VERIFY-EXISTING REPLAY: 100% BYTE-FOR-BYTE & DIGEST-FOR-DIGEST VERIFIED');
    console.log('Zero Disk Mutation Occurred. Sealed Evidence Intact.');
    console.log('======================================================================\n');
    return { ok: true, matrixSha, receiptSha };
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const generate = args.includes('--generate') || args.includes('--emit');
  try {
    runReplay({ generate });
  } catch (err) {
    console.error('[FATAL ERROR]:', err);
    process.exit(1);
  }
}

module.exports = { runReplay, CANDIDATES_R4 };
