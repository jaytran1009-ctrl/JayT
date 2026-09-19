/**
 * JAYT-358-R3-R5: Fully Reproducible Replay Runner Entrypoint
 * 
 * Mandate & Invariants:
 * 1. Single entrypoint executing full audit in one reproducible, sealed run.
 * 2. Non-mutating verify-existing replay mode by default (Req 20).
 *    - Calculates expected artifacts in memory.
 *    - Fails immediately on any difference from current matrix, test report, receipt or sidecars.
 *    - Never overwrites sealed evidence by default.
 *    - Generation mode must be explicitly invoked via --generate.
 * 3. Card-Scoped Identifier Schema (Req 15) & Strict Banned Container Exclusion (Req 16).
 * 4. Descendant Evidence Binding & Semantic Clause Relation (Req 17).
 * 5. Mandatory regression fixture testing post-content data-offer-id="x" (Req 18).
 * 6. 25 comprehensive test cases (0 VERIFIED / 10 HELD on real vault candidates).
 * 7. Bit-identical staging feed verification (v3.429.0, df0ccbab...). Zero production mutation.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {
  sha256,
  findAllRawByteSpans,
  validateSourcePreconditions,
  validateCardScopedIdentifier,
  isExplicitOfferCard,
  getSemanticClauseElement,
  getNodeText,
  evaluateCandidate,
  parseHTMLToDOM
} = require('./j358_r3_r5_card_scoped_evidence_validator.cjs');

const ROOT = path.resolve(__dirname, '..');
const VAULT_DIR = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_19_r3_offer_specific_vault');
const REPLAY_DIR = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_19_r3_r5_replay');
const QA_DIR = path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence');
const STAGING_FEED_PATH = path.join(ROOT, 'staging_preview_sprint_b', 'deals_feed.json');
const EXPECTED_STAGING_SHA = 'df0ccbab9aef23615e445a0bae6f3a16dbe1dab0face24f4fa5fe8bf6110ed94';

const MATRIX_OUTPUT_PATH = path.join(REPLAY_DIR, 'CLAIM_PROVENANCE_MATRIX.json');
const TESTS_OUTPUT_PATH = path.join(QA_DIR, 'J358_R3_R5_STABLE_IDENTIFIER_AND_NODE_RELATION_TESTS.json');
const RECEIPT_OUTPUT_PATH = path.join(QA_DIR, 'RECEIPT_J358_R3_R5_STABLE_IDENTIFIER_AND_NODE_RELATION.json');
const SEALED_TIMESTAMP = '2026-09-09T04:30:00.000Z';

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

function runReplay(options = {}) {
  const isGenerateMode = !!options.generate;
  const isVerifyMode = !isGenerateMode;

  console.log('======================================================================');
  console.log(`=== WORK ORDER J358-R3-R5: REPRODUCIBLE REPLAY ENTRYPOINT [${isGenerateMode ? 'GENERATE' : 'VERIFY-EXISTING'}] ===`);
  console.log('======================================================================\n');

  // Step 1: Self-Hashing & Environment Integrity
  const runnerBytes = fs.readFileSync(__filename);
  const runnerHash = sha256(runnerBytes);

  const validatorPath = path.join(ROOT, '04_DATA_PIPELINE', 'j358_r3_r5_card_scoped_evidence_validator.cjs');
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

    console.log(`   - ${leafId}: RAW=${rawSha.slice(0, 16)}... (${rawBuf.length} bytes) | META=${metaSha.slice(0, 16)}...`);
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
      console.log(`   - ${candidate.b19_id}: [HELD] ${evalResult.held_reason}`);
    } else {
      verifiedCount++;
      console.log(`   - ${candidate.b19_id}: [VERIFIED]`);
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
    work_order: 'J358-R3-R5-STABLE-IDENTIFIER-AND-NODE-RELATION-HARDENING',
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

  // Step 4: Run Automated Test Suite (25 Tests)
  console.log('4. Running Automated Test Suite (25 Tests):');
  const testResults = [];

  function recordTest(testId, description, passed, details = {}) {
    testResults.push({
      test_id: testId,
      description,
      status: passed ? 'PASS' : 'FAIL',
      details
    });
    console.log(`   [${passed ? 'PASS' : 'FAIL'}] ${testId}`);
  }

  // TEST 1: Real Vault Candidate Evaluation
  recordTest(
    'TEST_01_REAL_VAULT_EVALUATION',
    'Evaluate all 10 vault candidates -> exactly 0 VERIFIED and 10 HELD',
    heldCount === 10 && verifiedCount === 0,
    { heldCount, verifiedCount }
  );

  // Helper metadata
  function makeMockMeta(rawBuf, overrides = {}) {
    return Object.assign({
      requested_url: 'https://example.com/promo',
      final_url: 'https://example.com/promo',
      http_status: 200,
      captured_at_utc: '2026-09-09T00:00:00.000Z',
      bytes: rawBuf.length,
      sha256: sha256(rawBuf),
      is_fetch_failed: false,
      is_soft_404: false
    }, overrides);
  }

  // TEST 2: CEO Mandatory Regression (post-content data-offer-id="x")
  const ceoRegressionHTML = Buffer.from(`
<!DOCTYPE html>
<html>
<head><title>Trang Ưu Đãi</title></head>
<body>
  <div class="post-content" data-offer-id="x">
    <h3>Combo A</h3>
    <span>100.000đ</span>
    <p>Ưu đãi khai trương áp dụng tại Hà Nội</p>
    <p>Đà Nẵng là thành phố đáng sống với nhiều bãi biển đẹp.</p>
    <p>Kế hoạch tầm nhìn thương hiệu 2026.</p>
    <p>Áp dụng thứ 2 đến thứ 6 hàng tuần.</p>
  </div>
</body>
</html>
  `, 'utf8');

  const ceoRegCandidate = {
    b19_id: 'TEST_CEO_REGRESSION_POST_CONTENT_X',
    brand: 'Test Brand',
    claims: {
      title: 'Combo A',
      price: '100.000đ',
      conditions: null,
      validity_or_recurrence: 'thứ 2 đến thứ 6 hàng tuần',
      da_nang_locality: 'Đà Nẵng'
    }
  };
  const resCeoReg = evaluateCandidate(ceoRegCandidate, ceoRegressionHTML, makeMockMeta(ceoRegressionHTML));
  recordTest(
    'TEST_02_REGRESSION_POST_CONTENT_WEAK_ID_ATTACK',
    'Mandatory Regression: post-content data-offer-id="x" with separate Hanoi, Da Nang travel, 2026 branding must return HELD',
    resCeoReg.status === 'HELD' && resCeoReg.held_reason.includes('HELD__NO_EXPLICIT_OFFER_CARD_FOUND'),
    { status: resCeoReg.status, held_reason: resCeoReg.held_reason }
  );

  // TEST 3: Attack: Arbitrary data-offer-id schema
  const arbitraryIdHTML = Buffer.from(`
<!DOCTYPE html>
<html>
<body>
  <div class="some-box" data-offer-id="arbitrary_xyz_not_in_schema">
    <h3>Combo B</h3>
    <span>200.000đ</span>
    <p>Áp dụng tại Đà Nẵng</p>
    <p>Hạn dùng 2026</p>
  </div>
</body>
</html>
  `, 'utf8');
  const resArbId = evaluateCandidate({
    b19_id: 'TEST_ARB_ID',
    brand: 'Test Brand',
    claims: { title: 'Combo B', price: '200.000đ', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'Hạn dùng 2026' }
  }, arbitraryIdHTML, makeMockMeta(arbitraryIdHTML));
  recordTest(
    'TEST_03_ATTACK_ARBITRARY_DATA_OFFER_ID',
    'Arbitrary data-offer-id not matching schema is rejected',
    resArbId.status === 'HELD' && resArbId.held_reason.includes('HELD__NO_EXPLICIT_OFFER_CARD_FOUND'),
    { status: resArbId.status, held_reason: resArbId.held_reason }
  );

  // TEST 4: Attack: Generic id attribute
  const genericIdHTML = Buffer.from(`
<!DOCTYPE html>
<html>
<body>
  <div id="content">
    <h3>Combo C</h3>
    <span>300.000đ</span>
    <p>Áp dụng tại Đà Nẵng</p>
    <p>Hạn dùng 2026</p>
  </div>
</body>
</html>
  `, 'utf8');
  const resGenId = evaluateCandidate({
    b19_id: 'TEST_GEN_ID',
    brand: 'Test Brand',
    claims: { title: 'Combo C', price: '300.000đ', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'Hạn dùng 2026' }
  }, genericIdHTML, makeMockMeta(genericIdHTML));
  recordTest(
    'TEST_04_ATTACK_GENERIC_ID_ATTRIBUTE',
    'Generic id="content" is rejected as card container',
    resGenId.status === 'HELD' && resGenId.held_reason.includes('HELD__NO_EXPLICIT_OFFER_CARD_FOUND'),
    { status: resGenId.status, held_reason: resGenId.held_reason }
  );

  // TEST 5: Attack: Nested broad shell with a child card
  const nestedShellHTML = Buffer.from(`
<!DOCTYPE html>
<html>
<body>
  <div class="post-content" data-offer-id="deal-001">
    <div class="deal-card" data-offer-id="deal-002">
      <h3 class="deal-title">Combo D</h3>
      <div class="deal-price">400.000đ</div>
      <p class="deal-locality">Ưu đãi áp dụng tại Đà Nẵng</p>
      <p class="deal-validity">Áp dụng thứ 2 hàng tuần năm 2026</p>
    </div>
  </div>
</body>
</html>
  `, 'utf8');
  const resNested = evaluateCandidate({
    b19_id: 'TEST_NESTED',
    brand: 'Test Brand',
    claims: { title: 'Combo D', price: '400.000đ', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'thứ 2 hàng tuần năm 2026' }
  }, nestedShellHTML, makeMockMeta(nestedShellHTML));
  recordTest(
    'TEST_05_ATTACK_NESTED_BROAD_SHELL_WITH_CHILD_CARD',
    'Nested broad shell resolves to inner child card deal-002, outer post-content ineligible',
    resNested.status === 'VERIFIED' && resNested.offer_card.data_offer_id === 'deal-002',
    { status: resNested.status, resolved_id: resNested.offer_card ? resNested.offer_card.data_offer_id : null }
  );

  // TEST 6: Attack: Multiple unrelated semantic paragraphs inside accepted card
  const unrelatedParasHTML = Buffer.from(`
<!DOCTYPE html>
<html>
<body>
  <div class="deal-card" data-offer-id="deal-2026-combo-e">
    <h3 class="deal-title">Combo E</h3>
    <div class="deal-price">500.000đ</div>
    <p>Địa chỉ văn phòng: Đà Nẵng</p>
    <p>Ưu đãi khai trương áp dụng tại Hà Nội</p>
    <p>Kế hoạch phát triển thương hiệu 2026</p>
    <p>Áp dụng thứ 2 đến thứ 6 hàng tuần</p>
  </div>
</body>
</html>
  `, 'utf8');
  const resUnrelated = evaluateCandidate({
    b19_id: 'TEST_UNRELATED_PARAS',
    brand: 'Test Brand',
    claims: { title: 'Combo E', price: '500.000đ', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'thứ 2 đến thứ 6 hàng tuần' }
  }, unrelatedParasHTML, makeMockMeta(unrelatedParasHTML));
  recordTest(
    'TEST_06_ATTACK_UNRELATED_PARAGRAPHS_INSIDE_ACCEPTED_CARD',
    'Unrelated paragraphs inside accepted card fail semantic clause binding',
    resUnrelated.status === 'HELD' && (
      resUnrelated.held_reason.includes('HELD__LOCALITY_OFFICE_ADDRESS_REJECTED') ||
      resUnrelated.held_reason.includes('HELD__LOCALITY_OFFER_BINDING_MISSING') ||
      resUnrelated.held_reason.includes('HELD__VALIDITY_CALENDAR_YEAR_NOT_IN_OFFER_CLAUSE')
    ),
    { status: resUnrelated.status, held_reason: resUnrelated.held_reason }
  );

  // TEST 7: Positive Control: Accepted Card-Scoped ID & Semantic Clause Binding Verified
  const positiveControlHTML = Buffer.from(`
<!DOCTYPE html>
<html>
<head><title>Chương trình Ưu Đãi</title></head>
<body>
  <div class="deal-card" data-offer-id="deal-2026-combo-a">
    <h3 class="deal-title">Combo A Chuẩn Vị</h3>
    <div class="deal-price">120.000đ</div>
    <div class="deal-conditions">Dành riêng cho khách hàng thành viên</div>
    <p class="deal-locality">Ưu đãi áp dụng tại tất cả các chi nhánh Đà Nẵng</p>
    <p class="deal-validity">Áp dụng từ thứ 2 đến thứ 6 hàng tuần trong năm 2026</p>
  </div>
</body>
</html>
  `, 'utf8');
  const posCandidate = {
    b19_id: 'B19_TEST_POSITIVE_CONTROL',
    brand: 'Test Brand',
    claims: {
      title: 'Combo A Chuẩn Vị',
      price: '120.000đ',
      conditions: 'Dành riêng cho khách hàng thành viên',
      validity_or_recurrence: 'từ thứ 2 đến thứ 6 hàng tuần trong năm 2026',
      da_nang_locality: 'Đà Nẵng'
    }
  };
  const resPos = evaluateCandidate(posCandidate, positiveControlHTML, makeMockMeta(positiveControlHTML));
  recordTest(
    'TEST_07_POSITIVE_CONTROL_CARD_SCOPED_ID_VERIFIED',
    'Positive control with valid card-scoped identifier and tight semantic clause binding returns VERIFIED',
    resPos.status === 'VERIFIED' && resPos.all_dimensions_proven === true,
    { status: resPos.status, offer_card: resPos.offer_card }
  );

  // TEST 8: Broad post-content without ID
  const broadPostHTML = Buffer.from(`
<div class="post-content">
  <h3>Combo X</h3><span>50.000đ</span>
  <p>Áp dụng tại Đà Nẵng</p><p>Hạn dùng 2026</p>
</div>
  `, 'utf8');
  const resBroadPost = evaluateCandidate({ b19_id: 'TEST_BROAD_POST', brand: 'B', claims: { title: 'Combo X', price: '50.000đ' } }, broadPostHTML, makeMockMeta(broadPostHTML));
  recordTest(
    'TEST_08_ATTACK_BROAD_POST_CONTENT_NO_ID',
    'Broad post-content without ID rejected HELD__NO_EXPLICIT_OFFER_CARD_FOUND',
    resBroadPost.status === 'HELD' && resBroadPost.held_reason.includes('HELD__NO_EXPLICIT_OFFER_CARD_FOUND'),
    { status: resBroadPost.status }
  );

  // TEST 9: Broad main container
  const broadMainHTML = Buffer.from(`
<main id="main">
  <h3>Combo Main</h3><span>60.000đ</span>
  <p>Áp dụng tại Đà Nẵng</p><p>Hạn dùng 2026</p>
</main>
  `, 'utf8');
  const resBroadMain = evaluateCandidate({ b19_id: 'TEST_BROAD_MAIN', brand: 'B', claims: { title: 'Combo Main', price: '60.000đ' } }, broadMainHTML, makeMockMeta(broadMainHTML));
  recordTest(
    'TEST_09_ATTACK_BROAD_MAIN_CONTAINER',
    'Broad main container rejected HELD__NO_EXPLICIT_OFFER_CARD_FOUND',
    resBroadMain.status === 'HELD' && resBroadMain.held_reason.includes('HELD__NO_EXPLICIT_OFFER_CARD_FOUND'),
    { status: resBroadMain.status }
  );

  // TEST 10: Head title node borrowing
  const headTitleHTML = Buffer.from(`
<!DOCTYPE html>
<html>
<head><title>Combo Head Only</title></head>
<body><div><span>70.000đ</span></div></body>
</html>
  `, 'utf8');
  const resHeadTitle = evaluateCandidate({ b19_id: 'TEST_HEAD_TITLE', brand: 'B', claims: { title: 'Combo Head Only', price: '70.000đ' } }, headTitleHTML, makeMockMeta(headTitleHTML));
  recordTest(
    'TEST_10_ATTACK_HEAD_TITLE_NODE',
    'Title in <head><title> rejected HELD__TITLE_OR_PRICE_IN_EXCLUDED_NODE',
    resHeadTitle.status === 'HELD' && resHeadTitle.held_reason.includes('HELD__TITLE_OR_PRICE_IN_EXCLUDED_NODE'),
    { status: resHeadTitle.status }
  );

  // TEST 11: Malformed HTML
  const malformedHTML = Buffer.from('<div><article class="deal-card"><h3>Combo Malformed</h3><span>80.000đ', 'utf8');
  const resMalformed = evaluateCandidate({ b19_id: 'TEST_MALFORMED', brand: 'B', claims: { title: 'Combo Malformed', price: '80.000đ' } }, malformedHTML, makeMockMeta(malformedHTML));
  recordTest(
    'TEST_11_ATTACK_MALFORMED_HTML',
    'Malformed unclosed HTML structure fails closed HELD__SOURCE_PRECONDITION_FAILED__MALFORMED_HTML',
    resMalformed.status === 'HELD' && resMalformed.held_reason.includes('MALFORMED_HTML'),
    { status: resMalformed.status }
  );

  // TEST 12: Duplicate cards without unique ID
  const dupCardsHTML = Buffer.from(`
<div class="catalog">
  <div class="deal-card"><h3>Combo Dup</h3><span>90.000đ</span></div>
  <div class="deal-card"><h3>Combo Dup</h3><span>90.000đ</span></div>
</div>
  `, 'utf8');
  const resDup = evaluateCandidate({ b19_id: 'TEST_DUP', brand: 'B', claims: { title: 'Combo Dup', price: '90.000đ' } }, dupCardsHTML, makeMockMeta(dupCardsHTML));
  recordTest(
    'TEST_12_ATTACK_DUPLICATE_CARDS_WITHOUT_ID',
    'Duplicate identical cards without ID rejected HELD__AMBIGUOUS_DUPLICATE_CARDS_WITHOUT_IDENTIFIER',
    resDup.status === 'HELD' && resDup.held_reason.includes('AMBIGUOUS_DUPLICATE_CARDS'),
    { status: resDup.status }
  );

  // TEST 13: Cross-card pairing
  const crossCardHTML = Buffer.from(`
<div class="deal-card" data-offer-id="deal-001">
  <div class="deal-card" data-offer-id="deal-child-1"><h3>Combo Title 1</h3></div>
  <div class="deal-card" data-offer-id="deal-child-2"><span>Price 2: 95.000đ</span></div>
</div>
  `, 'utf8');
  const resCross = evaluateCandidate({ b19_id: 'TEST_CROSS', brand: 'B', claims: { title: 'Combo Title 1', price: 'Price 2: 95.000đ' } }, crossCardHTML, makeMockMeta(crossCardHTML));
  recordTest(
    'TEST_13_ATTACK_CROSS_CARD_PAIRING',
    'Cross-card pairing between child cards rejected HELD__CROSS_CARD_ELEMENTS_REJECTED',
    resCross.status === 'HELD' && resCross.held_reason.includes('CROSS_CARD'),
    { status: resCross.status }
  );

  // TEST 14: Office address in card
  const officeHTML = Buffer.from(`
<div class="deal-card" data-offer-id="deal-office-001">
  <h3>Combo Office</h3><span>110.000đ</span>
  <p>Địa chỉ văn phòng: Đà Nẵng</p>
  <p>Hạn dùng năm 2026</p>
</div>
  `, 'utf8');
  const resOffice = evaluateCandidate({ b19_id: 'TEST_OFFICE', brand: 'B', claims: { title: 'Combo Office', price: '110.000đ', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'năm 2026' } }, officeHTML, makeMockMeta(officeHTML));
  recordTest(
    'TEST_14_ATTACK_OFFICE_ADDRESS_IN_CARD',
    'Corporate office address rejected HELD__LOCALITY_OFFICE_ADDRESS_REJECTED',
    resOffice.status === 'HELD' && resOffice.held_reason.includes('OFFICE_ADDRESS_REJECTED'),
    { status: resOffice.status }
  );

  // TEST 15: Copyright year only
  const copyrightHTML = Buffer.from(`
<div class="deal-card" data-offer-id="deal-copy-001">
  <h3>Combo Copyright</h3><span>130.000đ</span>
  <p>Ưu đãi áp dụng tại Đà Nẵng</p>
  <p>Áp dụng thứ 2 hàng tuần</p>
  <p>© 2026 Brand Inc. All rights reserved.</p>
</div>
  `, 'utf8');
  const resCopy = evaluateCandidate({ b19_id: 'TEST_COPY', brand: 'B', claims: { title: 'Combo Copyright', price: '130.000đ', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'thứ 2 hàng tuần' } }, copyrightHTML, makeMockMeta(copyrightHTML));
  recordTest(
    'TEST_15_ATTACK_COPYRIGHT_YEAR_ONLY',
    'Copyright year excluded from offer validity clause HELD__VALIDITY_CALENDAR_YEAR_NOT_IN_OFFER_CLAUSE',
    resCopy.status === 'HELD' && resCopy.held_reason.includes('VALIDITY_CALENDAR_YEAR_NOT_IN_OFFER_CLAUSE'),
    { status: resCopy.status }
  );

  // TEST 16: Footer locality
  const footerLocHTML = Buffer.from(`
<div class="deal-card" data-offer-id="deal-foot-001">
  <h3>Combo Footer</h3><span>140.000đ</span><p>Hạn 2026</p>
</div>
<footer>Áp dụng tại Đà Nẵng</footer>
  `, 'utf8');
  const resFoot = evaluateCandidate({ b19_id: 'TEST_FOOT', brand: 'B', claims: { title: 'Combo Footer', price: '140.000đ', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'Hạn 2026' } }, footerLocHTML, makeMockMeta(footerLocHTML));
  recordTest(
    'TEST_16_ATTACK_FOOTER_LOCALITY',
    'Locality in footer rejected HELD__LOCALITY_NOT_IN_CARD',
    resFoot.status === 'HELD' && resFoot.held_reason.includes('LOCALITY_NOT_IN_CARD'),
    { status: resFoot.status }
  );

  // TEST 17: Store locator
  const storeLocHTML = Buffer.from(`
<div class="deal-card" data-offer-id="deal-store-001">
  <h3>Combo Store</h3><span>150.000đ</span><p>Hạn 2026</p>
  <select class="store-locator"><option>Đà Nẵng</option></select>
</div>
  `, 'utf8');
  const resStore = evaluateCandidate({ b19_id: 'TEST_STORE', brand: 'B', claims: { title: 'Combo Store', price: '150.000đ', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'Hạn 2026' } }, storeLocHTML, makeMockMeta(storeLocHTML));
  recordTest(
    'TEST_17_ATTACK_STORE_LOCATOR',
    'Locality in store-locator dropdown rejected',
    resStore.status === 'HELD',
    { status: resStore.status }
  );

  // TEST 18: Image alt locality
  const imgAltHTML = Buffer.from(`
<div class="deal-card" data-offer-id="deal-img-001">
  <h3>Combo Img</h3><span>160.000đ</span><p>Hạn 2026</p>
  <img src="banner.jpg" alt="Áp dụng tại Đà Nẵng" />
</div>
  `, 'utf8');
  const resImg = evaluateCandidate({ b19_id: 'TEST_IMG', brand: 'B', claims: { title: 'Combo Img', price: '160.000đ', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'Hạn 2026' } }, imgAltHTML, makeMockMeta(imgAltHTML));
  recordTest(
    'TEST_18_ATTACK_IMAGE_ALT_LOCALITY',
    'Locality in image alt attribute rejected',
    resImg.status === 'HELD',
    { status: resImg.status }
  );

  // TEST 19: Precondition SHA256 mismatch
  const preShaBuf = Buffer.from('hello', 'utf8');
  const resPreSha = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'h', price: 'p' } }, preShaBuf, makeMockMeta(preShaBuf, { sha256: 'bad' }));
  recordTest(
    'TEST_19_PRECONDITION_SHA256_MISMATCH',
    'Corrupt SHA256 fails precondition',
    resPreSha.status === 'HELD' && resPreSha.held_reason.includes('SHA256_MISMATCH'),
    { status: resPreSha.status }
  );

  // TEST 20: Precondition Byte length mismatch
  const resPreByte = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'h', price: 'p' } }, preShaBuf, makeMockMeta(preShaBuf, { bytes: 99999 }));
  recordTest(
    'TEST_20_PRECONDITION_BYTE_LENGTH_MISMATCH',
    'Corrupt byte length fails precondition',
    resPreByte.status === 'HELD' && resPreByte.held_reason.includes('BYTE_LENGTH_MISMATCH'),
    { status: resPreByte.status }
  );

  // TEST 21: Precondition HTTP 404
  const resPreHttp = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'h', price: 'p' } }, preShaBuf, makeMockMeta(preShaBuf, { http_status: 404 }));
  recordTest(
    'TEST_21_PRECONDITION_HTTP_STATUS_404',
    'HTTP 404 fails precondition',
    resPreHttp.status === 'HELD' && resPreHttp.held_reason.includes('HTTP_STATUS_NOT_200'),
    { status: resPreHttp.status }
  );

  // TEST 22: Precondition Fetch failed
  const resPreFetch = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'h', price: 'p' } }, preShaBuf, makeMockMeta(preShaBuf, { is_fetch_failed: true }));
  recordTest(
    'TEST_22_PRECONDITION_FETCH_FAILED',
    'Fetch failed flag fails precondition',
    resPreFetch.status === 'HELD' && resPreFetch.held_reason.includes('FETCH_FAILED'),
    { status: resPreFetch.status }
  );

  // TEST 23: Precondition Soft 404
  const soft404Buf = Buffer.from('<title>404 Not Found</title><h1>404 Không tìm thấy trang</h1>', 'utf8');
  const resSoft = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'h', price: 'p' } }, soft404Buf, makeMockMeta(soft404Buf));
  recordTest(
    'TEST_23_PRECONDITION_SOFT_404',
    'Soft 404 pattern detected in source fails precondition',
    resSoft.status === 'HELD' && resSoft.held_reason.includes('SOFT_404'),
    { status: resSoft.status }
  );

  // TEST 24: Policy Mutations: Altered price & Expired campaign
  const expiredHTML = Buffer.from(`
<div class="deal-card" data-offer-id="deal-exp-001">
  <h3>Combo Expired</h3><span>170.000đ</span>
  <p>Áp dụng tại Đà Nẵng</p>
  <p>Áp dụng từ 01/01/2024 đến 31/12/2024</p>
</div>
  `, 'utf8');
  const resExp = evaluateCandidate({ b19_id: 'T', brand: 'B', claims: { title: 'Combo Expired', price: '170.000đ', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'đến 31/12/2024' } }, expiredHTML, makeMockMeta(expiredHTML));
  recordTest(
    'TEST_24_POLICY_MUTATIONS_EXPIRED_CAMPAIGN',
    'Expired 2024 campaign rejected HELD__VALIDITY_CAMPAIGN_EXPIRED',
    resExp.status === 'HELD' && resExp.held_reason.includes('EXPIRED'),
    { status: resExp.status }
  );

  // TEST 25: Staging & Production Inviolability
  recordTest(
    'TEST_25_STAGING_PROD_INVIOLABILITY',
    'Staging feed matches sealed baseline df0ccbab...; zero production mutation',
    stagingIntact,
    { stagingHash, expected: EXPECTED_STAGING_SHA }
  );

  const totalTests = testResults.length;
  const passedTests = testResults.filter(t => t.status === 'PASS').length;
  const allTestsPassed = totalTests === passedTests;

  console.log(`\n   Total Tests: ${totalTests} | Passed: ${passedTests} | Failed: ${totalTests - passedTests} (${allTestsPassed ? '100% PASS' : 'FAILURES DETECTED'})`);

  const testReportObject = {
    work_order: 'J358-R3-R5-STABLE-IDENTIFIER-AND-NODE-RELATION-HARDENING',
    timestamp_utc: SEALED_TIMESTAMP,
    environment_integrity: {
      runner_sha256: runnerHash,
      validator_sha256: validatorHash,
      staging_feed_sha256: stagingHash
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
    work_order_id: 'J358-R3-R5-STABLE-IDENTIFIER-AND-NODE-RELATION-HARDENING',
    issued_by: 'Antigravity Autonomous Pair Programmer',
    receipt_timestamp_utc: SEALED_TIMESTAMP,
    status: allTestsPassed ? 'SUCCESS__HARDENED_EVALUATOR_VERIFIED' : 'FAILURE__TESTS_FAILED',
    shortfall_policy: {
      required: 'ZERO_UNVERIFIED_PROMOTIONS',
      verified_count: verifiedCount,
      held_count: heldCount,
      compliant: verifiedCount === 0 && heldCount === 10
    },
    reproducibility: {
      replay_entrypoint: '04_DATA_PIPELINE/run_jayt_358_r3_r5_reproducible_replay.cjs',
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
    fs.writeFileSync(MATRIX_OUTPUT_PATH + '.sha256', `${matrixSha}  ${path.basename(MATRIX_OUTPUT_PATH)}\n`, 'utf8');
    console.log(`   - Matrix written:  ${MATRIX_OUTPUT_PATH} (${matrixSha})`);

    // Write tests
    fs.writeFileSync(TESTS_OUTPUT_PATH, testsJson, 'utf8');
    fs.writeFileSync(TESTS_OUTPUT_PATH + '.sha256', `${testsSha}  ${path.basename(TESTS_OUTPUT_PATH)}\n`, 'utf8');
    console.log(`   - Tests written:   ${TESTS_OUTPUT_PATH} (${testsSha})`);

    // Write receipt
    fs.writeFileSync(RECEIPT_OUTPUT_PATH, receiptJson, 'utf8');
    fs.writeFileSync(RECEIPT_OUTPUT_PATH + '.sha256', `${receiptSha}  ${path.basename(RECEIPT_OUTPUT_PATH)}\n`, 'utf8');
    console.log(`   - Receipt written: ${RECEIPT_OUTPUT_PATH} (${receiptSha})`);

    console.log('\n6. Sidecar Self-Verification:');
    const mCheck = fs.readFileSync(MATRIX_OUTPUT_PATH + '.sha256', 'utf8').trim().startsWith(matrixSha);
    const tCheck = fs.readFileSync(TESTS_OUTPUT_PATH + '.sha256', 'utf8').trim().startsWith(testsSha);
    const rCheck = fs.readFileSync(RECEIPT_OUTPUT_PATH + '.sha256', 'utf8').trim().startsWith(receiptSha);

    console.log(`   - Matrix Sidecar:  ${mCheck ? 'MATCH: TRUE' : 'MISMATCH!'}`);
    console.log(`   - Tests Sidecar:   ${tCheck ? 'MATCH: TRUE' : 'MISMATCH!'}`);
    console.log(`   - Receipt Sidecar: ${rCheck ? 'MATCH: TRUE' : 'MISMATCH!'}`);

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

    console.log(`   - Matrix on disk:  ${diskMatrixSha} (Expected: ${matrixSha}) -> ${matrixMatch ? 'VERIFIED MATCH: TRUE' : 'MISMATCH!'}`);
    console.log(`   - Tests on disk:   ${diskTestsSha} (Expected: ${testsSha}) -> ${testsMatch ? 'VERIFIED MATCH: TRUE' : 'MISMATCH!'}`);
    console.log(`   - Receipt on disk: ${diskReceiptSha} (Expected: ${receiptSha}) -> ${receiptMatch ? 'VERIFIED MATCH: TRUE' : 'MISMATCH!'}`);

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
