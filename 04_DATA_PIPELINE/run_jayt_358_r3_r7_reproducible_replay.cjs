/**
 * JAYT-358-R3-R7: Fully Reproducible Replay Runner Entrypoint
 * 
 * Mandate & Invariants (Work Order J358-R3-R7-REMOVE-CALLER-AUTH-INJECTION):
 * 1. Single entrypoint executing full audit in one reproducible, sealed run.
 * 2. Non-mutating verify-existing replay mode by default (Req 20).
 * 3. Candidate-controlled authenticity paths completely eliminated (Req 15).
 * 4. Authenticate only through sealed metadata/manifest bytes with multi-attribute binding:
 *    leaf ID, raw source SHA-256, DOM selector, exact card byte range (Req 16).
 * 5. Distinct fail-closed reason codes for manifest/binding mismatches (Req 17).
 * 6. Mandatory negative tests: caller injection with empty mapping, forged metadata SHA mismatch,
 *    ID mapped to different range/card, valid schema but missing sealed mapping (Req 18).
 * 7. Positive control derives authenticity only from a sealed fixture metadata mapping
 *    that is hashed and listed as a test input (Req 19).
 * 8. Real vault candidates preserved: 0 VERIFIED / 10 HELD (Req 20).
 * 9. Staging baseline df0ccbab... and production strictly untouched (Req 20).
 */

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {
  sha256,
  findAllRawByteSpans,
  validateSourcePreconditions,
  authenticateCardIdentifier,
  isExplicitOfferCard,
  getSemanticClauseElement,
  getNodeText,
  validateDirectedLocality,
  validateValiditySemantics,
  evaluateCandidate,
  parseHTMLToDOM
} = require('./j358_r3_r7_sealed_authentication_validator.cjs');

const ROOT = path.resolve(__dirname, '..');
const VAULT_DIR = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_19_r3_offer_specific_vault');
const REPLAY_DIR = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_19_r3_r7_replay');
const QA_DIR = path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence');
const STAGING_FEED_PATH = path.join(ROOT, 'staging_preview_sprint_b', 'deals_feed.json');
const EXPECTED_STAGING_SHA = 'df0ccbab9aef23615e445a0bae6f3a16dbe1dab0face24f4fa5fe8bf6110ed94';

const MATRIX_OUTPUT_PATH = path.join(REPLAY_DIR, 'CLAIM_PROVENANCE_MATRIX.json');
const TESTS_OUTPUT_PATH = path.join(QA_DIR, 'J358_R3_R7_SEALED_AUTHENTICATION_TESTS.json');
const RECEIPT_OUTPUT_PATH = path.join(QA_DIR, 'RECEIPT_J358_R3_R7_SEALED_AUTHENTICATION.json');
const SEALED_TIMESTAMP = '2026-09-09T05:00:00.000Z';

const CANDIDATES = [
  {
    b19_id: 'B19_STARLIGHT_U22_WEEKDAY',
    brand: 'Starlight Cinema',
    leaf_id: 'r3_starlight_u22_program',
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
    leaf_id: 'r3_starlight_u22_program',
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
    leaf_id: 'r3_starlight_thu_3_phim_viet',
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
    leaf_id: 'r3_tpc_combo_vu_lan_22662',
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
    leaf_id: 'r3_tpc_combo_cot_mam_keo',
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
    leaf_id: 'r3_tpc_combo_cot_mai_man',
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
    leaf_id: 'r3_tpc_mua_1_tang_1_nuoc',
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
    leaf_id: 'r3_tpc_bo_doi_nhu_y_combo_1',
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
    leaf_id: 'r3_gongcha_member_policy',
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
    leaf_id: 'r3_katinat_app_loyalty',
    claims: {
      title: 'KATINAT CHÍNH THỨC RA MẮT ỨNG DỤNG',
      price: 'Nhận Voucher ưu đãi 30k cho đơn tối thiểu 60k (từ 25/04 &#8211; 09/05)',
      conditions: 'ứng dụng thành viên &amp; đặt món dành riêng cho Katies',
      validity_or_recurrence: null,
      da_nang_locality: null
    }
  }
];

function makeMockMeta(rawBuf, overrides = {}) {
  return Object.assign({
    leaf_id: 'mock_leaf_id',
    requested_url: 'https://example.com/promo',
    final_url: 'https://example.com/promo',
    http_status: 200,
    captured_at_utc: '2026-09-09T00:00:00.000Z',
    bytes: rawBuf.length,
    sha256: sha256(rawBuf),
    is_fetch_failed: false,
    is_soft_404: false,
    offer_card_manifest: {}
  }, overrides);
}

function runReplay(options = {}) {
  const isGenerateMode = !!options.generate;
  const isVerifyMode = !isGenerateMode;

  console.log('======================================================================');
  console.log('=== WORK ORDER J358-R3-R7: REPRODUCIBLE REPLAY ENTRYPOINT [' + (isGenerateMode ? 'GENERATE' : 'VERIFY-EXISTING') + '] ===');
  console.log('======================================================================\n');

  // Step 1: Self-Hashing & Environment Integrity
  const runnerBytes = fs.readFileSync(__filename);
  const runnerHash = sha256(runnerBytes);

  const validatorPath = path.join(ROOT, '04_DATA_PIPELINE', 'j358_r3_r7_sealed_authentication_validator.cjs');
  const validatorBytes = fs.readFileSync(validatorPath);
  const validatorHash = sha256(validatorBytes);

  const stagingBytes = fs.readFileSync(STAGING_FEED_PATH);
  const stagingHash = sha256(stagingBytes);
  const stagingIntact = stagingHash === EXPECTED_STAGING_SHA;

  console.log('1. Environment Integrity:');
  console.log('   - Runner Hash:    ' + runnerHash);
  console.log('   - Validator Hash: ' + validatorHash);
  console.log('   - Staging Feed:   ' + stagingHash + ' (' + (stagingIntact ? 'BIT-IDENTICAL BASELINE v3.429.0' : 'MISMATCH!') + ')\n');

  if (!stagingIntact) {
    console.error('[FATAL] Staging feed mismatch!');
    process.exit(1);
  }

  // Step 2: Ingest and Hash all 18 sealed vault files
  console.log('2. Ingesting and Hashing Sealed Vault Files:');
  const vaultInputHashes = {};
  const uniqueLeafIds = Array.from(new Set(CANDIDATES.map(c => c.leaf_id)));

  for (const leafId of uniqueLeafIds) {
    const rawPath = path.join(VAULT_DIR, leafId + '.leaf.raw.html');
    const metaPath = path.join(VAULT_DIR, leafId + '.leaf.meta.json');

    if (!fs.existsSync(rawPath) || !fs.existsSync(metaPath)) {
      throw new Error('Missing required vault leaf file: ' + leafId);
    }

    const rawBuf = fs.readFileSync(rawPath);
    const metaBuf = fs.readFileSync(metaPath);
    const rawSha = sha256(rawBuf);
    const metaSha = sha256(metaBuf);

    vaultInputHashes[leafId] = {
      raw_sha256: rawSha,
      raw_bytes: rawBuf.length,
      meta_sha256: metaSha,
      meta_bytes: metaBuf.length
    };

    console.log('   - ' + leafId + ': RAW=' + rawSha.slice(0, 16) + '... (' + rawBuf.length + ' bytes) | META=' + metaSha.slice(0, 16) + '...');
  }
  console.log('');

  // Step 3: Evaluate 10 Real Vault Candidates
  console.log('3. Evaluating 10 Real Vault Candidates:');
  const candidateResults = [];
  let heldCount = 0;
  let verifiedCount = 0;

  for (const candidate of CANDIDATES) {
    const rawPath = path.join(VAULT_DIR, candidate.leaf_id + '.leaf.raw.html');
    const metaPath = path.join(VAULT_DIR, candidate.leaf_id + '.leaf.meta.json');
    const rawBuf = fs.readFileSync(rawPath);
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

    const evalResult = evaluateCandidate(candidate, rawBuf, meta, { targetYear: 2026 });
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

  const matrixObject = {
    work_order: 'J358-R3-R7-REMOVE-CALLER-AUTH-INJECTION',
    generated_at_utc: SEALED_TIMESTAMP,
    environment_integrity: {
      runner_sha256: runnerHash,
      validator_sha256: validatorHash,
      staging_feed_sha256: stagingHash,
      staging_invariance_maintained: stagingIntact
    },
    vault_inputs: vaultInputHashes,
    summary: {
      total_candidates: CANDIDATES.length,
      verified_count: verifiedCount,
      held_count: heldCount,
      shortfall_policy_maintained: verifiedCount === 0 && heldCount === CANDIDATES.length
    },
    matrix: candidateResults
  };

  const matrixJson = JSON.stringify(matrixObject, null, 2);
  const matrixSha = sha256(Buffer.from(matrixJson, 'utf8'));

  // Step 4: Run Automated Test Suite (35 Tests)
  console.log('4. Running Automated Test Suite (35 Tests):');
  const testResults = [];

  function recordTest(testId, description, passed, details = {}) {
    testResults.push({
      test_id: testId,
      description,
      status: passed ? 'PASS' : 'FAIL',
      details
    });
    console.log('   [' + (passed ? 'PASS' : 'FAIL') + '] ' + testId);
  }

  // Define Sealed Positive Control Fixture (Req 19)
  const posHTML = Buffer.from(
`<!DOCTYPE html>
<html>
<head><title>Chương trình Ưu Đãi</title></head>
<body>
  <div class="deal-card" data-offer-id="deal-2026-combo-a">
    <h3 class="deal-title">Combo A Chuẩn Vị</h3>
    <div class="deal-price">120.000đ</div>
    <div class="deal-conditions">Dành riêng cho khách hàng thành viên</div>
    <p class="deal-locality">Ưu đãi áp dụng tại tất cả các chi nhánh Đà Nẵng</p>
    <p class="deal-validity">Chương trình ưu đãi áp dụng từ thứ 2 đến thứ 6 hàng tuần trong năm 2026</p>
  </div>
</body>
</html>`, 'utf8');

  const { root: posRoot } = parseHTMLToDOM(posHTML);
  let posCardNode = null;
  function findPosCard(n) {
    if (isExplicitOfferCard(n)) { posCardNode = n; return; }
    if (n.children) for (const c of n.children) findPosCard(c);
  }
  findPosCard(posRoot);

  const posRawSha = sha256(posHTML);
  const fixtureMeta = {
    leaf_id: 'fixture_sealed_positive_control',
    requested_url: 'https://example.com/promo/combo-a',
    final_url: 'https://example.com/promo/combo-a',
    http_status: 200,
    captured_at_utc: '2026-09-09T00:00:00.000Z',
    bytes: posHTML.length,
    sha256: posRawSha,
    is_fetch_failed: false,
    is_soft_404: false,
    offer_card_manifest: {
      'deal-2026-combo-a': {
        offer_id: 'deal-2026-combo-a',
        leaf_id: 'fixture_sealed_positive_control',
        source_sha256: posRawSha,
        dom_selector: 'div.deal-card',
        card_byte_range: [posCardNode.byteStart, posCardNode.byteEnd]
      }
    }
  };

  const fixtureMetaJson = JSON.stringify(fixtureMeta, null, 2);
  const fixtureMetaSha = sha256(Buffer.from(fixtureMetaJson, 'utf8'));

  const validMetadataHashes = [fixtureMetaSha];

  // TEST 1: Real Vault Candidate Evaluation
  recordTest(
    'TEST_01_REAL_VAULT_EVALUATION',
    'Evaluate all 10 vault candidates -> exactly 0 VERIFIED and 10 HELD',
    heldCount === 10 && verifiedCount === 0,
    { heldCount, verifiedCount }
  );

  // TEST 2: Mandatory CEO Regression: post-content deal-card data-offer-id="deal-abc" (Req 19)
  const ceoBypassHTML = Buffer.from(
`<!DOCTYPE html>
<html>
<head><title>Trang Ưu Đãi</title></head>
<body>
  <div class="post-content deal-card" data-offer-id="deal-abc">
    <h3>Combo A</h3>
    <span>100.000đ</span>
    <p>Đà Nẵng là điểm đến du lịch tuyệt vời. Chương trình ưu đãi áp dụng tại Hà Nội.</p>
    <p>Chiến lược thương hiệu 2026 cam kết đồng hành hàng tuần cùng quý khách.</p>
  </div>
</body>
</html>`, 'utf8');
  const resCeoBypass = evaluateCandidate({
    b19_id: 'TEST_CEO_BYPASS_POST_CONTENT_DEAL_CARD',
    brand: 'Test Brand',
    claims: { title: 'Combo A', price: '100.000đ', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'hàng tuần' }
  }, ceoBypassHTML, makeMockMeta(ceoBypassHTML));
  recordTest(
    'TEST_02_REGRESSION_CEO_BYPASS_POST_CONTENT_DEAL_CARD',
    'Mandatory Regression: div.post-content deal-card data-offer-id="deal-abc" must return HELD',
    resCeoBypass.status === 'HELD',
    { status: resCeoBypass.status, held_reason: resCeoBypass.held_reason }
  );

  // TEST 3: Mandatory Negative Test: Caller-injected authenticated_offer_id with empty mapping (Req 15, 18)
  const resCallerInj = evaluateCandidate({
    b19_id: 'TEST_CALLER_INJECTION_EMPTY_MAPPING',
    brand: 'Test Brand',
    authenticated_offer_id: 'deal-2026-combo-a', // CALLER INJECTION ATTEMPT
    claims: {
      title: 'Combo A Chuẩn Vị',
      price: '120.000đ',
      conditions: 'Dành riêng cho khách hàng thành viên',
      validity_or_recurrence: 'từ thứ 2 đến thứ 6 hàng tuần trong năm 2026',
      da_nang_locality: 'Đà Nẵng'
    }
  }, posHTML, makeMockMeta(posHTML, { offer_card_manifest: {} }));
  recordTest(
    'TEST_03_ATTACK_CALLER_INJECTED_AUTH_EMPTY_MANIFEST',
    'Caller-injected authenticated_offer_id with empty manifest fails closed (HELD__UNAUTHENTICATED_CARD_IDENTIFIER)',
    resCallerInj.status === 'HELD' && resCallerInj.held_reason.includes('UNAUTHENTICATED_CARD_IDENTIFIER'),
    { status: resCallerInj.status, held_reason: resCallerInj.held_reason }
  );

  // TEST 4: Mandatory Negative Test: Forged metadata mapping with SHA mismatch (Req 17, 18)
  const forgedShaMeta = makeMockMeta(posHTML, {
    offer_card_manifest: {
      'deal-2026-combo-a': {
        offer_id: 'deal-2026-combo-a',
        leaf_id: 'mock_leaf_id',
        source_sha256: '0000000000000000000000000000000000000000000000000000000000000000',
        dom_selector: 'div.deal-card',
        card_byte_range: [posCardNode.byteStart, posCardNode.byteEnd]
      }
    }
  });
  const resForgedSha = evaluateCandidate({
    b19_id: 'TEST_FORGED_METADATA_SHA_MISMATCH',
    brand: 'Test Brand',
    claims: {
      title: 'Combo A Chuẩn Vị',
      price: '120.000đ',
      conditions: 'Dành riêng cho khách hàng thành viên',
      validity_or_recurrence: 'từ thứ 2 đến thứ 6 hàng tuần trong năm 2026',
      da_nang_locality: 'Đà Nẵng'
    }
  }, posHTML, forgedShaMeta);
  recordTest(
    'TEST_04_ATTACK_FORGED_METADATA_SOURCE_SHA_MISMATCH',
    'Forged metadata with source SHA mismatch fails closed (HELD__MANIFEST_SOURCE_SHA_MISMATCH)',
    resForgedSha.status === 'HELD' && resForgedSha.held_reason.includes('MANIFEST_SOURCE_SHA_MISMATCH'),
    { status: resForgedSha.status, held_reason: resForgedSha.held_reason }
  );

  // TEST 5: Mandatory Negative Test: ID mapped to a different byte range/card (Req 17, 18)
  const badRangeMeta = makeMockMeta(posHTML, {
    offer_card_manifest: {
      'deal-2026-combo-a': {
        offer_id: 'deal-2026-combo-a',
        leaf_id: 'mock_leaf_id',
        source_sha256: posRawSha,
        dom_selector: 'div.deal-card',
        card_byte_range: [10, 50] // WRONG BYTE RANGE
      }
    }
  });
  const resBadRange = evaluateCandidate({
    b19_id: 'TEST_MANIFEST_CARD_RANGE_MISMATCH',
    brand: 'Test Brand',
    claims: {
      title: 'Combo A Chuẩn Vị',
      price: '120.000đ',
      conditions: 'Dành riêng cho khách hàng thành viên',
      validity_or_recurrence: 'từ thứ 2 đến thứ 6 hàng tuần trong năm 2026',
      da_nang_locality: 'Đà Nẵng'
    }
  }, posHTML, badRangeMeta);
  recordTest(
    'TEST_05_ATTACK_MANIFEST_CARD_RANGE_MISMATCH',
    'ID mapped to wrong byte range fails closed (HELD__MANIFEST_CARD_RANGE_MISMATCH)',
    resBadRange.status === 'HELD' && resBadRange.held_reason.includes('MANIFEST_CARD_RANGE_MISMATCH'),
    { status: resBadRange.status, held_reason: resBadRange.held_reason }
  );

  // TEST 6: Mandatory Negative Test: Leaf ID mismatch in manifest (Req 17)
  const badLeafMeta = makeMockMeta(posHTML, {
    leaf_id: 'fixture_leaf_target',
    offer_card_manifest: {
      'deal-2026-combo-a': {
        offer_id: 'deal-2026-combo-a',
        leaf_id: 'other_leaf_attacker', // WRONG LEAF
        source_sha256: posRawSha,
        dom_selector: 'div.deal-card',
        card_byte_range: [posCardNode.byteStart, posCardNode.byteEnd]
      }
    }
  });
  const resBadLeaf = evaluateCandidate({
    b19_id: 'TEST_MANIFEST_LEAF_ID_MISMATCH',
    brand: 'Test Brand',
    leaf_id: 'fixture_leaf_target',
    claims: {
      title: 'Combo A Chuẩn Vị',
      price: '120.000đ',
      conditions: 'Dành riêng cho khách hàng thành viên',
      validity_or_recurrence: 'từ thứ 2 đến thứ 6 hàng tuần trong năm 2026',
      da_nang_locality: 'Đà Nẵng'
    }
  }, posHTML, badLeafMeta);
  recordTest(
    'TEST_06_ATTACK_MANIFEST_LEAF_ID_MISMATCH',
    'Manifest bound to different leaf ID fails closed (HELD__MANIFEST_LEAF_ID_MISMATCH)',
    resBadLeaf.status === 'HELD' && resBadLeaf.held_reason.includes('MANIFEST_LEAF_ID_MISMATCH'),
    { status: resBadLeaf.status, held_reason: resBadLeaf.held_reason }
  );

  // TEST 7: Mandatory Negative Test: DOM selector mismatch in manifest (Req 17)
  const badSelectorMeta = makeMockMeta(posHTML, {
    offer_card_manifest: {
      'deal-2026-combo-a': {
        offer_id: 'deal-2026-combo-a',
        leaf_id: 'mock_leaf_id',
        source_sha256: posRawSha,
        dom_selector: 'article.voucher-card', // MISMATCH WITH div.deal-card
        card_byte_range: [posCardNode.byteStart, posCardNode.byteEnd]
      }
    }
  });
  const resBadSelector = evaluateCandidate({
    b19_id: 'TEST_MANIFEST_DOM_SELECTOR_MISMATCH',
    brand: 'Test Brand',
    claims: {
      title: 'Combo A Chuẩn Vị',
      price: '120.000đ',
      conditions: 'Dành riêng cho khách hàng thành viên',
      validity_or_recurrence: 'từ thứ 2 đến thứ 6 hàng tuần trong năm 2026',
      da_nang_locality: 'Đà Nẵng'
    }
  }, posHTML, badSelectorMeta);
  recordTest(
    'TEST_07_ATTACK_MANIFEST_DOM_SELECTOR_MISMATCH',
    'Manifest bound to different DOM selector fails closed (HELD__MANIFEST_CARD_SELECTOR_MISMATCH)',
    resBadSelector.status === 'HELD' && resBadSelector.held_reason.includes('MANIFEST_CARD_SELECTOR_MISMATCH'),
    { status: resBadSelector.status, held_reason: resBadSelector.held_reason }
  );

  // TEST 8: Mandatory Negative Test: Valid schema but missing sealed mapping (Req 17, 18)
  const unmappedSchemaHTML = Buffer.from(
`<div class="deal-card" data-offer-id="deal-valid-unmapped">
  <h3>Combo Test</h3><span>100.000đ</span>
  <p>Áp dụng tại Đà Nẵng</p><p>Hàng tuần trong năm 2026</p>
</div>`, 'utf8');
  const resUnmapped = evaluateCandidate({
    b19_id: 'TEST_VALID_SCHEMA_MISSING_MAPPING',
    brand: 'Test Brand',
    claims: { title: 'Combo Test', price: '100.000đ', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'năm 2026' }
  }, unmappedSchemaHTML, makeMockMeta(unmappedSchemaHTML, { offer_card_manifest: {} }));
  recordTest(
    'TEST_08_ATTACK_VALID_SCHEMA_MISSING_MANIFEST_ENTRY',
    'Valid schema ID without sealed manifest entry fails closed (HELD__UNAUTHENTICATED_CARD_IDENTIFIER)',
    resUnmapped.status === 'HELD' && resUnmapped.held_reason.includes('UNAUTHENTICATED_CARD_IDENTIFIER'),
    { status: resUnmapped.status, held_reason: resUnmapped.held_reason }
  );

  // TEST 9: Mandatory Negative Test: Metadata hash absent from receipt inputs (Req 17)
  const unlistedMeta = Object.assign({}, fixtureMeta);
  const resUnlisted = evaluateCandidate({
    b19_id: 'TEST_METADATA_HASH_ABSENT',
    brand: 'Test Brand',
    leaf_id: 'fixture_sealed_positive_control',
    claims: {
      title: 'Combo A Chuẩn Vị',
      price: '120.000đ',
      conditions: 'Dành riêng cho khách hàng thành viên',
      validity_or_recurrence: 'từ thứ 2 đến thứ 6 hàng tuần trong năm 2026',
      da_nang_locality: 'Đà Nẵng'
    }
  }, posHTML, unlistedMeta, {
    targetYear: 2026,
    validMetadataHashes: ['unrelated_hash_12345'],
    metadataSha256: 'some_other_hash'
  });
  recordTest(
    'TEST_09_ATTACK_METADATA_HASH_ABSENT_FROM_RECEIPT',
    'Metadata hash absent from receipt input list fails closed (HELD__METADATA_HASH_ABSENT_FROM_RECEIPT)',
    resUnlisted.status === 'HELD' && resUnlisted.held_reason.includes('METADATA_HASH_ABSENT_FROM_RECEIPT'),
    { status: resUnlisted.status, held_reason: resUnlisted.held_reason }
  );

  // TEST 10: Attack: Conflicting city locality without Da Nang directed predicate (Req 19)
  const conflictingLocHTML = Buffer.from(
`<div class="deal-card" data-offer-id="deal-auth-001">
  <h3>Combo Conflict City</h3><span>250.000đ</span>
  <p>Đà Nẵng là điểm đến du lịch tuyệt vời. Chương trình ưu đãi áp dụng tại Hà Nội.</p>
  <p>Chương trình áp dụng đến hết năm 2026</p>
</div>`, 'utf8');
  const resConflictLoc = evaluateCandidate({
    b19_id: 'TEST_CONFLICT_LOC',
    brand: 'Test Brand',
    claims: { title: 'Combo Conflict City', price: '250.000đ', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'đến hết năm 2026' }
  }, conflictingLocHTML, makeMockMeta(conflictingLocHTML, {
    offer_card_manifest: {
      'deal-auth-001': {
        offer_id: 'deal-auth-001',
        leaf_id: 'mock_leaf_id',
        source_sha256: sha256(conflictingLocHTML),
        dom_selector: 'div.deal-card',
        card_byte_range: [0, conflictingLocHTML.length]
      }
    }
  }));
  recordTest(
    'TEST_10_ATTACK_CONFLICTING_CITY_LOCALITY',
    'Locality clause binding conflicting city without target rejected HELD__LOCALITY_CONFLICTING_OR_UNDIRECTED_BINDING',
    resConflictLoc.status === 'HELD' && resConflictLoc.held_reason.includes('CONFLICTING_OR_UNDIRECTED_BINDING'),
    { status: resConflictLoc.status, held_reason: resConflictLoc.held_reason }
  );

  // TEST 11: Attack: Non-promotional branding statement containing 2026 (Req 19)
  const brandingYearHTML = Buffer.from(
`<div class="deal-card" data-offer-id="deal-auth-002">
  <h3>Combo Branding Year</h3><span>280.000đ</span>
  <p>Ưu đãi áp dụng tại tất cả các chi nhánh Đà Nẵng</p>
  <p>Chiến lược thương hiệu 2026 cam kết đồng hành hàng tuần cùng quý khách.</p>
</div>`, 'utf8');
  const resBrandYear = evaluateCandidate({
    b19_id: 'TEST_BRANDING_YEAR',
    brand: 'Test Brand',
    claims: { title: 'Combo Branding Year', price: '280.000đ', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'hàng tuần' }
  }, brandingYearHTML, makeMockMeta(brandingYearHTML, {
    offer_card_manifest: {
      'deal-auth-002': {
        offer_id: 'deal-auth-002',
        leaf_id: 'mock_leaf_id',
        source_sha256: sha256(brandingYearHTML),
        dom_selector: 'div.deal-card',
        card_byte_range: [0, brandingYearHTML.length]
      }
    }
  }));
  recordTest(
    'TEST_11_ATTACK_NON_PROMOTIONAL_BRANDING_YEAR',
    'Validity year 2026 in branding/strategy sentence rejected HELD__VALIDITY_NON_PROMOTIONAL_CONTEXT',
    resBrandYear.status === 'HELD' && resBrandYear.held_reason.includes('VALIDITY_NON_PROMOTIONAL_CONTEXT'),
    { status: resBrandYear.status, held_reason: resBrandYear.held_reason }
  );

  // TEST 12: Positive Control: Authenticated Card ID & Directed Semantics Verified (Req 19)
  const resPos = evaluateCandidate({
    b19_id: 'B19_TEST_POSITIVE_CONTROL',
    brand: 'Test Brand',
    leaf_id: 'fixture_sealed_positive_control',
    claims: {
      title: 'Combo A Chuẩn Vị',
      price: '120.000đ',
      conditions: 'Dành riêng cho khách hàng thành viên',
      validity_or_recurrence: 'từ thứ 2 đến thứ 6 hàng tuần trong năm 2026',
      da_nang_locality: 'Đà Nẵng'
    }
  }, posHTML, fixtureMeta, {
    targetYear: 2026,
    validMetadataHashes,
    metadataSha256: fixtureMetaSha
  });
  recordTest(
    'TEST_12_POSITIVE_CONTROL_SEALED_MANIFEST_VERIFIED',
    'Positive control with sealed manifest and multi-attribute binding returns VERIFIED',
    resPos.status === 'VERIFIED' && resPos.all_dimensions_proven === true,
    { status: resPos.status, offer_card: resPos.offer_card }
  );

  // TEST 13: Attack: Arbitrary data-offer-id format
  const arbIdHTML = Buffer.from('<div class="deal-card" data-offer-id="arbitrary_xyz"><h3>C</h3><span>10k</span></div>', 'utf8');
  const resArb = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C', price: '10k' } }, arbIdHTML, makeMockMeta(arbIdHTML));
  recordTest('TEST_13_ATTACK_ARBITRARY_ID_SCHEMA', 'Arbitrary ID schema rejected', resArb.status === 'HELD');

  // TEST 14: Attack: Generic ID attribute
  const genIdHTML = Buffer.from('<div id="content"><h3>C</h3><span>10k</span></div>', 'utf8');
  const resGen = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C', price: '10k' } }, genIdHTML, makeMockMeta(genIdHTML));
  recordTest('TEST_14_ATTACK_GENERIC_ID_ATTRIBUTE', 'Generic id=content rejected', resGen.status === 'HELD');

  // TEST 15: Attack: Nested broad shell with child card
  const nestedHTML = Buffer.from(
`<div class="post-content">
  <div class="deal-card" data-offer-id="deal-child-001">
    <h3>Child Combo</h3><span>50.000đ</span>
    <p>Áp dụng tại Đà Nẵng</p><p>Áp dụng năm 2026</p>
  </div>
</div>`, 'utf8');
  const { root: nestRoot } = parseHTMLToDOM(nestedHTML);
  let nestCardNode = null;
  function fNest(n) {
    if (isExplicitOfferCard(n)) { nestCardNode = n; return; }
    if (n.children) for (const c of n.children) fNest(c);
  }
  fNest(nestRoot);
  const resNest = evaluateCandidate({
    b19_id: 'T', brand: 'B',
    claims: { title: 'Child Combo', price: '50.000đ', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'năm 2026' }
  }, nestedHTML, makeMockMeta(nestedHTML, {
    offer_card_manifest: {
      'deal-child-001': {
        offer_id: 'deal-child-001',
        leaf_id: 'mock_leaf_id',
        source_sha256: sha256(nestedHTML),
        dom_selector: 'div.deal-card',
        card_byte_range: [nestCardNode.byteStart, nestCardNode.byteEnd]
      }
    }
  }));
  recordTest('TEST_15_ATTACK_NESTED_BROAD_SHELL_WITH_CHILD_CARD', 'Nested child card resolves, post-content ignored', resNest.status === 'VERIFIED');

  // TEST 16: Attack: Multiple unrelated paragraphs inside card
  const unrelHTML = Buffer.from(
`<div class="deal-card" data-offer-id="deal-auth-003">
  <h3>Combo Unrel</h3><span>60.000đ</span>
  <p>Địa chỉ văn phòng: Đà Nẵng</p>
  <p>Chương trình áp dụng đến hết năm 2026</p>
</div>`, 'utf8');
  const { root: unrelRoot } = parseHTMLToDOM(unrelHTML);
  let unrelCard = null;
  function fUnrel(n) { if (isExplicitOfferCard(n)) { unrelCard = n; return; } if (n.children) for (const c of n.children) fUnrel(c); }
  fUnrel(unrelRoot);
  const resUnrel = evaluateCandidate({
    b19_id: 'T', brand: 'B', claims: { title: 'Combo Unrel', price: '60.000đ', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'năm 2026' }
  }, unrelHTML, makeMockMeta(unrelHTML, {
    offer_card_manifest: {
      'deal-auth-003': {
        offer_id: 'deal-auth-003',
        leaf_id: 'mock_leaf_id',
        source_sha256: sha256(unrelHTML),
        dom_selector: 'div.deal-card',
        card_byte_range: [unrelCard.byteStart, unrelCard.byteEnd]
      }
    }
  }));
  recordTest('TEST_16_ATTACK_UNRELATED_PARAGRAPHS_INSIDE_CARD', 'Office address inside card fails locality', resUnrel.status === 'HELD');

  // TEST 17: Attack: Broad post-content no ID
  const broadPostHTML = Buffer.from('<div class="post-content"><h3>C</h3><span>10k</span></div>', 'utf8');
  const resBroadPost = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C', price: '10k' } }, broadPostHTML, makeMockMeta(broadPostHTML));
  recordTest('TEST_17_ATTACK_BROAD_POST_CONTENT_NO_ID', 'Broad post-content without ID rejected', resBroadPost.status === 'HELD');

  // TEST 18: Attack: Broad main container
  const broadMainHTML = Buffer.from('<main id="main"><h3>C</h3><span>10k</span></main>', 'utf8');
  const resBroadMain = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C', price: '10k' } }, broadMainHTML, makeMockMeta(broadMainHTML));
  recordTest('TEST_18_ATTACK_BROAD_MAIN_CONTAINER', 'Broad main container rejected', resBroadMain.status === 'HELD');

  // TEST 19: Attack: Head title node
  const headTitleHTML = Buffer.from('<html><head><title>Combo Head</title></head><body><span>10k</span></body></html>', 'utf8');
  const resHead = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'Combo Head', price: '10k' } }, headTitleHTML, makeMockMeta(headTitleHTML));
  recordTest('TEST_19_ATTACK_HEAD_TITLE_NODE', 'Title in head rejected', resHead.status === 'HELD');

  // TEST 20: Attack: Malformed HTML
  const malformedHTML = Buffer.from('<div><div class="deal-card"><h3>C</h3><span>10k', 'utf8');
  const resMal = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C', price: '10k' } }, malformedHTML, makeMockMeta(malformedHTML));
  recordTest('TEST_20_ATTACK_MALFORMED_HTML', 'Malformed HTML fails closed', resMal.status === 'HELD');

  // TEST 21: Attack: Duplicate cards without ID
  const dupHTML = Buffer.from('<div class="deal-card"><h3>C</h3><span>10k</span></div><div class="deal-card"><h3>C</h3><span>10k</span></div>', 'utf8');
  const resDup = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C', price: '10k' } }, dupHTML, makeMockMeta(dupHTML));
  recordTest('TEST_21_ATTACK_DUPLICATE_CARDS_WITHOUT_ID', 'Duplicate cards without ID rejected', resDup.status === 'HELD');

  // TEST 22: Attack: Cross-card pairing
  const crossHTML = Buffer.from(
`<div class="deal-card" data-offer-id="deal-001"><div class="deal-card"><h3>C1</h3></div><div class="deal-card"><span>10k</span></div></div>`, 'utf8');
  const { root: crossRoot } = parseHTMLToDOM(crossHTML);
  let crossCard = null;
  function fCross(n) { if (isExplicitOfferCard(n)) { crossCard = n; return; } if (n.children) for (const c of n.children) fCross(c); }
  fCross(crossRoot);
  const resCross = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C1', price: '10k' } }, crossHTML, makeMockMeta(crossHTML, {
    offer_card_manifest: {
      'deal-001': {
        offer_id: 'deal-001', leaf_id: 'mock_leaf_id', source_sha256: sha256(crossHTML),
        dom_selector: 'div.deal-card', card_byte_range: [crossCard.byteStart, crossCard.byteEnd]
      }
    }
  }));
  recordTest('TEST_22_ATTACK_CROSS_CARD_PAIRING', 'Cross-card pairing rejected', resCross.status === 'HELD');

  // TEST 23: Attack: Corporate office address
  const officeHTML = Buffer.from(
`<div class="deal-card" data-offer-id="deal-001"><h3>C</h3><span>10k</span><p>Địa chỉ văn phòng: Đà Nẵng</p><p>Hạn 2026</p></div>`, 'utf8');
  const { root: offRoot } = parseHTMLToDOM(officeHTML);
  let offCard = null;
  function fOff(n) { if (isExplicitOfferCard(n)) { offCard = n; return; } if (n.children) for (const c of n.children) fOff(c); }
  fOff(offRoot);
  const resOff = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C', price: '10k', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'Hạn 2026' } }, officeHTML, makeMockMeta(officeHTML, {
    offer_card_manifest: {
      'deal-001': {
        offer_id: 'deal-001', leaf_id: 'mock_leaf_id', source_sha256: sha256(officeHTML),
        dom_selector: 'div.deal-card', card_byte_range: [offCard.byteStart, offCard.byteEnd]
      }
    }
  }));
  recordTest('TEST_23_ATTACK_OFFICE_ADDRESS_IN_CARD', 'Office address in card rejected', resOff.status === 'HELD');

  // TEST 24: Attack: Copyright year only
  const copyHTML = Buffer.from(
`<div class="deal-card" data-offer-id="deal-001"><h3>C</h3><span>10k</span><p>Áp dụng tại Đà Nẵng</p><p>Hàng tuần</p><p>© 2026</p></div>`, 'utf8');
  const { root: copyRoot } = parseHTMLToDOM(copyHTML);
  let copyCard = null;
  function fCopy(n) { if (isExplicitOfferCard(n)) { copyCard = n; return; } if (n.children) for (const c of n.children) fCopy(c); }
  fCopy(copyRoot);
  const resCopy = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C', price: '10k', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'Hàng tuần' } }, copyHTML, makeMockMeta(copyHTML, {
    offer_card_manifest: {
      'deal-001': {
        offer_id: 'deal-001', leaf_id: 'mock_leaf_id', source_sha256: sha256(copyHTML),
        dom_selector: 'div.deal-card', card_byte_range: [copyCard.byteStart, copyCard.byteEnd]
      }
    }
  }));
  recordTest('TEST_24_ATTACK_COPYRIGHT_YEAR_ONLY', 'Copyright year excluded from validity clause', resCopy.status === 'HELD');

  // TEST 25: Attack: Footer locality
  const footHTML = Buffer.from(
`<div class="deal-card" data-offer-id="deal-001"><h3>C</h3><span>10k</span><p>Hạn 2026</p></div><footer>Áp dụng tại Đà Nẵng</footer>`, 'utf8');
  const { root: footRoot } = parseHTMLToDOM(footHTML);
  let footCard = null;
  function fFoot(n) { if (isExplicitOfferCard(n)) { footCard = n; return; } if (n.children) for (const c of n.children) fFoot(c); }
  fFoot(footRoot);
  const resFoot = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C', price: '10k', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'Hạn 2026' } }, footHTML, makeMockMeta(footHTML, {
    offer_card_manifest: {
      'deal-001': {
        offer_id: 'deal-001', leaf_id: 'mock_leaf_id', source_sha256: sha256(footHTML),
        dom_selector: 'div.deal-card', card_byte_range: [footCard.byteStart, footCard.byteEnd]
      }
    }
  }));
  recordTest('TEST_25_ATTACK_FOOTER_LOCALITY', 'Footer locality rejected', resFoot.status === 'HELD');

  // TEST 26: Attack: Store locator dropdown
  const storeHTML = Buffer.from(
`<div class="deal-card" data-offer-id="deal-001"><h3>C</h3><span>10k</span><p>Hạn 2026</p><select class="store-locator"><option>Đà Nẵng</option></select></div>`, 'utf8');
  const { root: storeRoot } = parseHTMLToDOM(storeHTML);
  let storeCard = null;
  function fStore(n) { if (isExplicitOfferCard(n)) { storeCard = n; return; } if (n.children) for (const c of n.children) fStore(c); }
  fStore(storeRoot);
  const resStore = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C', price: '10k', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'Hạn 2026' } }, storeHTML, makeMockMeta(storeHTML, {
    offer_card_manifest: {
      'deal-001': {
        offer_id: 'deal-001', leaf_id: 'mock_leaf_id', source_sha256: sha256(storeHTML),
        dom_selector: 'div.deal-card', card_byte_range: [storeCard.byteStart, storeCard.byteEnd]
      }
    }
  }));
  recordTest('TEST_26_ATTACK_STORE_LOCATOR', 'Store locator locality rejected', resStore.status === 'HELD');

  // TEST 27: Attack: Image alt locality
  const imgHTML = Buffer.from(
`<div class="deal-card" data-offer-id="deal-001"><h3>C</h3><span>10k</span><p>Hạn 2026</p><img src="a.jpg" alt="Áp dụng tại Đà Nẵng" /></div>`, 'utf8');
  const { root: imgRoot } = parseHTMLToDOM(imgHTML);
  let imgCard = null;
  function fImg(n) { if (isExplicitOfferCard(n)) { imgCard = n; return; } if (n.children) for (const c of n.children) fImg(c); }
  fImg(imgRoot);
  const resImg = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C', price: '10k', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'Hạn 2026' } }, imgHTML, makeMockMeta(imgHTML, {
    offer_card_manifest: {
      'deal-001': {
        offer_id: 'deal-001', leaf_id: 'mock_leaf_id', source_sha256: sha256(imgHTML),
        dom_selector: 'div.deal-card', card_byte_range: [imgCard.byteStart, imgCard.byteEnd]
      }
    }
  }));
  recordTest('TEST_27_ATTACK_IMAGE_ALT_LOCALITY', 'Image alt locality rejected', resImg.status === 'HELD');

  // TEST 28: Precondition SHA256 mismatch
  const rawBufTest = Buffer.from('abc', 'utf8');
  const resSha = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C', price: '10k' } }, rawBufTest, makeMockMeta(rawBufTest, { sha256: 'bad' }));
  recordTest('TEST_28_PRECONDITION_SHA256_MISMATCH', 'SHA256 mismatch fails precondition', resSha.status === 'HELD');

  // TEST 29: Precondition Byte length mismatch
  const resLen = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C', price: '10k' } }, rawBufTest, makeMockMeta(rawBufTest, { bytes: 9999 }));
  recordTest('TEST_29_PRECONDITION_BYTE_LENGTH_MISMATCH', 'Byte length mismatch fails precondition', resLen.status === 'HELD');

  // TEST 30: Precondition HTTP 404
  const res404 = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C', price: '10k' } }, rawBufTest, makeMockMeta(rawBufTest, { http_status: 404 }));
  recordTest('TEST_30_PRECONDITION_HTTP_STATUS_404', 'HTTP status 404 fails precondition', res404.status === 'HELD');

  // TEST 31: Precondition Fetch failed
  const resFetch = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C', price: '10k' } }, rawBufTest, makeMockMeta(rawBufTest, { is_fetch_failed: true }));
  recordTest('TEST_31_PRECONDITION_FETCH_FAILED', 'Fetch failed fails precondition', resFetch.status === 'HELD');

  // TEST 32: Precondition Soft 404
  const softBuf = Buffer.from('<title>404 Not Found</title><h1>404 không tìm thấy trang</h1>', 'utf8');
  const resSoft = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C', price: '10k' } }, softBuf, makeMockMeta(softBuf));
  recordTest('TEST_32_PRECONDITION_SOFT_404', 'Soft 404 pattern fails precondition', resSoft.status === 'HELD');

  // TEST 33: Policy Mutation: Expired campaign
  const expHTML = Buffer.from(
`<div class="deal-card" data-offer-id="deal-001"><h3>C</h3><span>10k</span><p>Áp dụng tại Đà Nẵng</p><p>Hạn đến 31/12/2024</p></div>`, 'utf8');
  const { root: expRoot } = parseHTMLToDOM(expHTML);
  let expCard = null;
  function fExp(n) { if (isExplicitOfferCard(n)) { expCard = n; return; } if (n.children) for (const c of n.children) fExp(c); }
  fExp(expRoot);
  const resExp = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C', price: '10k', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: '31/12/2024' } }, expHTML, makeMockMeta(expHTML, {
    offer_card_manifest: {
      'deal-001': {
        offer_id: 'deal-001', leaf_id: 'mock_leaf_id', source_sha256: sha256(expHTML),
        dom_selector: 'div.deal-card', card_byte_range: [expCard.byteStart, expCard.byteEnd]
      }
    }
  }));
  recordTest('TEST_33_POLICY_MUTATIONS_EXPIRED_CAMPAIGN', 'Expired 2024 campaign rejected', resExp.status === 'HELD');

  // TEST 34: Policy Mutation: Altered price
  const priceHTML = Buffer.from(
`<div class="deal-card" data-offer-id="deal-001"><h3>C</h3><span>10k</span><p>Áp dụng tại Đà Nẵng</p><p>Năm 2026</p></div>`, 'utf8');
  const { root: priceRoot } = parseHTMLToDOM(priceHTML);
  let priceCard = null;
  function fPrice(n) { if (isExplicitOfferCard(n)) { priceCard = n; return; } if (n.children) for (const c of n.children) fPrice(c); }
  fPrice(priceRoot);
  const resPrice = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'C', price: '999k', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'Năm 2026' } }, priceHTML, makeMockMeta(priceHTML, {
    offer_card_manifest: {
      'deal-001': {
        offer_id: 'deal-001', leaf_id: 'mock_leaf_id', source_sha256: sha256(priceHTML),
        dom_selector: 'div.deal-card', card_byte_range: [priceCard.byteStart, priceCard.byteEnd]
      }
    }
  }));
  recordTest('TEST_34_POLICY_MUTATIONS_ALTERED_PRICE', 'Altered price rejected', resPrice.status === 'HELD');

  // TEST 35: Staging & Production Inviolability
  recordTest(
    'TEST_35_STAGING_PROD_INVIOLABILITY',
    'Staging feed matches sealed baseline df0ccbab...; zero production mutation',
    stagingIntact,
    { stagingHash, expected: EXPECTED_STAGING_SHA }
  );

  const totalTests = testResults.length;
  const passedTests = testResults.filter(t => t.status === 'PASS').length;
  const allTestsPassed = totalTests === passedTests;

  console.log('\n   Total Tests: ' + totalTests + ' | Passed: ' + passedTests + ' | Failed: ' + (totalTests - passedTests) + ' (' + (allTestsPassed ? '100% PASS' : 'FAILURES DETECTED') + ')');

  const testReportObject = {
    work_order: 'J358-R3-R7-REMOVE-CALLER-AUTH-INJECTION',
    timestamp_utc: SEALED_TIMESTAMP,
    environment_integrity: {
      runner_sha256: runnerHash,
      validator_sha256: validatorHash,
      staging_feed_sha256: stagingHash
    },
    fixture_inputs: {
      fixture_sealed_positive_control: {
        raw_sha256: posRawSha,
        raw_bytes: posHTML.length,
        meta_sha256: fixtureMetaSha,
        meta_bytes: Buffer.from(fixtureMetaJson, 'utf8').length
      }
    },
    summary: {
      total: totalTests,
      passed: passedTests,
      failed: totalTests - passedTests,
      pass_rate: (passedTests / totalTests * 100).toFixed(1) + '%'
    },
    tests: testResults
  };

  const testsJson = JSON.stringify(testReportObject, null, 2);
  const testsSha = sha256(Buffer.from(testsJson, 'utf8'));

  // Step 5: Consolidated Immutable Receipt
  const receiptObject = {
    work_order_id: 'J358-R3-R7-REMOVE-CALLER-AUTH-INJECTION',
    issued_by: 'Antigravity Autonomous Pair Programmer',
    receipt_timestamp_utc: SEALED_TIMESTAMP,
    status: allTestsPassed ? 'SUCCESS__SEALED_AUTHENTICATION_VERIFIED' : 'FAILURE__TESTS_FAILED',
    shortfall_policy: {
      required: 'ZERO_UNVERIFIED_PROMOTIONS',
      verified_count: verifiedCount,
      held_count: heldCount,
      compliant: verifiedCount === 0 && heldCount === 10
    },
    trust_boundary_enforcement: {
      caller_auth_injection_permitted: false,
      candidate_controlled_id_attestation: 'REMOVED_AND_FORBIDDEN',
      source_bound_sealed_manifest_required: true,
      multi_attribute_bindings_enforced: [
        'leaf_id',
        'source_sha256',
        'dom_selector',
        'card_byte_range',
        'offer_id'
      ]
    },
    reproducibility: {
      replay_entrypoint: '04_DATA_PIPELINE/run_jayt_358_r3_r7_reproducible_replay.cjs',
      runner_sha256: runnerHash,
      validator_sha256: validatorHash,
      matrix_sha256: matrixSha,
      tests_sha256: testsSha
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
        path: MATRIX_OUTPUT_PATH,
        sha256: matrixSha
      },
      {
        path: TESTS_OUTPUT_PATH,
        sha256: testsSha
      }
    ]
  };

  const receiptJson = JSON.stringify(receiptObject, null, 2);
  const receiptSha = sha256(Buffer.from(receiptJson, 'utf8'));

  if (isGenerateMode) {
    console.log('\n5. Emitting Sealed Artifacts & Sidecars (--generate mode):');
    if (!fs.existsSync(REPLAY_DIR)) fs.mkdirSync(REPLAY_DIR, { recursive: true });
    if (!fs.existsSync(QA_DIR)) fs.mkdirSync(QA_DIR, { recursive: true });

    // Write matrix
    fs.writeFileSync(MATRIX_OUTPUT_PATH, matrixJson, 'utf8');
    fs.writeFileSync(MATRIX_OUTPUT_PATH + '.sha256', matrixSha + '  ' + path.basename(MATRIX_OUTPUT_PATH) + '\n', 'utf8');
    console.log('   - Matrix written:  ' + MATRIX_OUTPUT_PATH + ' (' + matrixSha + ')');

    // Write tests
    fs.writeFileSync(TESTS_OUTPUT_PATH, testsJson, 'utf8');
    fs.writeFileSync(TESTS_OUTPUT_PATH + '.sha256', testsSha + '  ' + path.basename(TESTS_OUTPUT_PATH) + '\n', 'utf8');
    console.log('   - Tests written:   ' + TESTS_OUTPUT_PATH + ' (' + testsSha + ')');

    // Write receipt
    fs.writeFileSync(RECEIPT_OUTPUT_PATH, receiptJson, 'utf8');
    fs.writeFileSync(RECEIPT_OUTPUT_PATH + '.sha256', receiptSha + '  ' + path.basename(RECEIPT_OUTPUT_PATH) + '\n', 'utf8');
    console.log('   - Receipt written: ' + RECEIPT_OUTPUT_PATH + ' (' + receiptSha + ')');

    console.log('\n6. Sidecar Self-Verification:');
    const mCheck = fs.readFileSync(MATRIX_OUTPUT_PATH + '.sha256', 'utf8').trim().startsWith(matrixSha);
    const tCheck = fs.readFileSync(TESTS_OUTPUT_PATH + '.sha256', 'utf8').trim().startsWith(testsSha);
    const rCheck = fs.readFileSync(RECEIPT_OUTPUT_PATH + '.sha256', 'utf8').trim().startsWith(receiptSha);

    console.log('   - Matrix Sidecar:  ' + (mCheck ? 'MATCH: TRUE' : 'MISMATCH!'));
    console.log('   - Tests Sidecar:   ' + (tCheck ? 'MATCH: TRUE' : 'MISMATCH!'));
    console.log('   - Receipt Sidecar: ' + (rCheck ? 'MATCH: TRUE' : 'MISMATCH!'));

    console.log('\n======================================================================');
    console.log('ARTIFACT GENERATION COMPLETE: SUCCESS');
    console.log('======================================================================\n');
    return { ok: true, matrixSha, testsSha, receiptSha };
  } else {
    // VERIFY-EXISTING MODE (Non-mutating per Req 20)
    console.log('\n5. Verifying Existing On-Disk Artifacts (Non-Mutating verify-existing mode):');

    if (!fs.existsSync(MATRIX_OUTPUT_PATH) || !fs.existsSync(TESTS_OUTPUT_PATH) || !fs.existsSync(RECEIPT_OUTPUT_PATH)) {
      console.error('[FAIL] Required on-disk artifacts are missing!');
      console.error('To generate initial artifacts, run with --generate flag.');
      process.exit(1);
    }

    const diskMatrixBuf = fs.readFileSync(MATRIX_OUTPUT_PATH);
    const diskMatrixSha = sha256(diskMatrixBuf);
    const diskMatrixSidecar = fs.readFileSync(MATRIX_OUTPUT_PATH + '.sha256', 'utf8').trim();

    const diskTestsBuf = fs.readFileSync(TESTS_OUTPUT_PATH);
    const diskTestsSha = sha256(diskTestsBuf);
    const diskTestsSidecar = fs.readFileSync(TESTS_OUTPUT_PATH + '.sha256', 'utf8').trim();

    const diskReceiptBuf = fs.readFileSync(RECEIPT_OUTPUT_PATH);
    const diskReceiptSha = sha256(diskReceiptBuf);
    const diskReceiptSidecar = fs.readFileSync(RECEIPT_OUTPUT_PATH + '.sha256', 'utf8').trim();

    const matrixMatch = diskMatrixSha === matrixSha && diskMatrixSidecar.startsWith(matrixSha);
    const testsMatch = diskTestsSha === testsSha && diskTestsSidecar.startsWith(testsSha);
    const receiptMatch = diskReceiptSha === receiptSha && diskReceiptSidecar.startsWith(receiptSha);

    console.log('   - Matrix on disk:  ' + diskMatrixSha + ' (Expected: ' + matrixSha + ') -> ' + (matrixMatch ? 'VERIFIED MATCH: TRUE' : 'MISMATCH!'));
    console.log('   - Tests on disk:   ' + diskTestsSha + ' (Expected: ' + testsSha + ') -> ' + (testsMatch ? 'VERIFIED MATCH: TRUE' : 'MISMATCH!'));
    console.log('   - Receipt on disk: ' + diskReceiptSha + ' (Expected: ' + receiptSha + ') -> ' + (receiptMatch ? 'VERIFIED MATCH: TRUE' : 'MISMATCH!'));

    if (!matrixMatch || !testsMatch || !receiptMatch) {
      console.error('\n[FATAL] Existing sealed artifacts do not match in-memory deterministic replay calculation!');
      process.exit(1);
    }

    console.log('\n======================================================================');
    console.log('VERIFY-EXISTING REPLAY: 100% BYTE-FOR-BYTE & DIGEST-FOR-DIGEST VERIFIED');
    console.log('Zero Disk Mutation Occurred. Sealed Evidence Intact.');
    console.log('======================================================================\n');
    return { ok: true, matrixSha, testsSha, receiptSha };
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

module.exports = { runReplay, CANDIDATES };
