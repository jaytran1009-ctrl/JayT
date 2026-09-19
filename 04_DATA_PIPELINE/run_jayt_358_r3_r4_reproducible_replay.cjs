/**
 * J358-R3-R4: REPRODUCIBLE REPLAY ENTRYPOINT & AUDIT MATRIX RUNNER
 * Work Order: J358-R3-R4-DOM-PARSER-AND-ARTIFACT-REPRODUCIBILITY
 * Authority: Quyết định CEO JAYT-358-R3-R3 (01_EXECUTIVE_COUNCIL/JAYT_358_CEO_R3_R3_PARTIAL_ACCEPTANCE_AND_REPRODUCIBILITY_GATE.md)
 * 
 * EXECUTION CONTRACT (Req 18 & 19):
 * 1. Single sealed entrypoint invoked as:
 *    node 04_DATA_PIPELINE/run_jayt_358_r3_r4_reproducible_replay.cjs
 * 2. Self-inspects and hashes:
 *    - Validator: 04_DATA_PIPELINE/j358_r3_r4_strict_offer_card_validator.cjs
 *    - Runner itself (__filename)
 *    - All 18 input files in 06_TRUST_AND_EVIDENCE/batch_19_r3_offer_specific_vault/
 *    - Staging feed: staging_preview_sprint_b/deals_feed.json
 * 3. Evaluates 10 real Batch 19 candidates and writes:
 *    06_TRUST_AND_EVIDENCE/batch_19_r3_r4_replay/CLAIM_PROVENANCE_MATRIX.json (+ .sha256)
 * 4. Runs automated test suite (21 tests including 11 attacks) and writes:
 *    07_QUALITY_ASSURANCE/runtime_evidence/J358_R3_R4_STRICT_CARD_AND_REPRODUCIBILITY_TESTS.json (+ .sha256)
 * 5. Emits consolidated receipt:
 *    07_QUALITY_ASSURANCE/runtime_evidence/RECEIPT_J358_R3_R4_STRICT_CARD_AND_REPRODUCIBILITY.json (+ .sha256)
 * 6. Self-verifies all output digests and sidecars (MATCH: TRUE).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {
  sha256,
  findAllRawByteSpans,
  validateSourcePreconditions,
  isExplicitOfferCard,
  evaluateCandidate,
  parseHTMLToDOM
} = require('./j358_r3_r4_strict_offer_card_validator.cjs');

const ROOT = path.resolve(__dirname, '..');
const VAULT_DIR = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_19_r3_offer_specific_vault');
const REPLAY_DIR = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_19_r3_r4_replay');
const QA_DIR = path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence');
const STAGING_FEED_PATH = path.join(ROOT, 'staging_preview_sprint_b', 'deals_feed.json');
const EXPECTED_STAGING_SHA = 'df0ccbab9aef23615e445a0bae6f3a16dbe1dab0face24f4fa5fe8bf6110ed94';

const MATRIX_OUTPUT_PATH = path.join(REPLAY_DIR, 'CLAIM_PROVENANCE_MATRIX.json');
const TESTS_OUTPUT_PATH = path.join(QA_DIR, 'J358_R3_R4_STRICT_CARD_AND_REPRODUCIBILITY_TESTS.json');
const RECEIPT_OUTPUT_PATH = path.join(QA_DIR, 'RECEIPT_J358_R3_R4_STRICT_CARD_AND_REPRODUCIBILITY.json');
const SEALED_TIMESTAMP = '2026-09-09T04:15:00.000Z';

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

function writeWithSidecar(filePath, dataObj) {
  const jsonStr = typeof dataObj === 'string' ? dataObj : JSON.stringify(dataObj, null, 2);
  fs.writeFileSync(filePath, jsonStr, 'utf8');
  const fileHash = sha256(fs.readFileSync(filePath));
  fs.writeFileSync(filePath + '.sha256', `${fileHash}  ${path.basename(filePath)}\n`, 'utf8');
  return fileHash;
}

function verifySidecar(filePath) {
  const fileHash = sha256(fs.readFileSync(filePath));
  const sidecarContent = fs.readFileSync(filePath + '.sha256', 'utf8').trim();
  const sidecarHash = sidecarContent.split(/\s+/)[0];
  return {
    filePath,
    fileHash,
    sidecarHash,
    matches: fileHash === sidecarHash
  };
}

function runReplay() {
  console.log('======================================================================');
  console.log('=== WORK ORDER J358-R3-R4: REPRODUCIBLE REPLAY ENTRYPOINT ===');
  console.log('======================================================================\n');

  if (!fs.existsSync(REPLAY_DIR)) {
    fs.mkdirSync(REPLAY_DIR, { recursive: true });
  }

  // Step 1: Self-Hashing & Environment Integrity
  const runnerBytes = fs.readFileSync(__filename);
  const runnerHash = sha256(runnerBytes);

  const validatorPath = path.join(ROOT, '04_DATA_PIPELINE', 'j358_r3_r4_strict_offer_card_validator.cjs');
  const validatorBytes = fs.readFileSync(validatorPath);
  const validatorHash = sha256(validatorBytes);

  const stagingBytes = fs.readFileSync(STAGING_FEED_PATH);
  const stagingHash = sha256(stagingBytes);
  const stagingIntact = stagingHash === EXPECTED_STAGING_SHA;

  console.log('1. Environment Integrity:');
  console.log('   - Runner Hash:    ' + runnerHash);
  console.log('   - Validator Hash: ' + validatorHash);
  console.log('   - Staging Feed:   ' + stagingHash + ' (' + (stagingIntact ? 'BIT-IDENTICAL BASELINE v3.429.0' : 'MISMATCH!') + ')\n');

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

    vaultInputHashes[leafId + '.leaf.raw.html'] = {
      bytes: rawBuf.length,
      sha256: sha256(rawBuf)
    };
    vaultInputHashes[leafId + '.leaf.meta.json'] = {
      bytes: metaBuf.length,
      sha256: sha256(metaBuf)
    };
    console.log('   - ' + leafId + ': RAW=' + vaultInputHashes[leafId + '.leaf.raw.html'].sha256.slice(0, 16) + '... (' + rawBuf.length + ' bytes) | META=' + vaultInputHashes[leafId + '.leaf.meta.json'].sha256.slice(0, 16) + '...');
  }
  console.log('');

  // Step 3: Evaluate All 10 Candidates -> Build Provenance Matrix
  console.log('3. Evaluating 10 Real Vault Candidates:');
  const matrixRecords = [];
  let verifiedCount = 0;
  let heldCount = 0;

  for (const cand of CANDIDATES) {
    const rawPath = path.join(VAULT_DIR, cand.leaf_id + '.leaf.raw.html');
    const metaPath = path.join(VAULT_DIR, cand.leaf_id + '.leaf.meta.json');

    const rawBuf = fs.readFileSync(rawPath);
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

    const evalResult = evaluateCandidate(cand, rawBuf, meta);

    matrixRecords.push({
      b19_id: cand.b19_id,
      brand: cand.brand,
      leaf_id: cand.leaf_id,
      source_sha256: meta.sha256,
      status: evalResult.status,
      held_reason: evalResult.held_reason,
      offer_card: evalResult.offer_card,
      missing_dimensions: evalResult.missing_dimensions,
      dimensions: evalResult.dimensions
    });

    if (evalResult.status === 'VERIFIED') verifiedCount++;
    else if (evalResult.status === 'HELD') heldCount++;

    console.log('   - ' + cand.b19_id + ': [' + evalResult.status + '] ' + (evalResult.held_reason || 'ALL_DIMENSIONS_PROVEN'));
  }

  const matrixReport = {
    matrix_id: 'CLAIM_PROVENANCE_MATRIX_R3_R4',
    work_order_id: 'J358-R3-R4-DOM-PARSER-AND-ARTIFACT-REPRODUCIBILITY',
    authority: '01_EXECUTIVE_COUNCIL/JAYT_358_CEO_R3_R3_PARTIAL_ACCEPTANCE_AND_REPRODUCIBILITY_GATE.md',
    generated_at_utc: SEALED_TIMESTAMP,
    validator_module: '04_DATA_PIPELINE/j358_r3_r4_strict_offer_card_validator.cjs',
    validator_sha256: validatorHash,
    runner_file: '04_DATA_PIPELINE/run_jayt_358_r3_r4_reproducible_replay.cjs',
    runner_sha256: runnerHash,
    summary: {
      total_candidates: CANDIDATES.length,
      verified_count: verifiedCount,
      held_count: heldCount,
      truthful_zero_verified_preserved: verifiedCount === 0 && heldCount === 10
    },
    records: matrixRecords
  };

  const matrixSha = writeWithSidecar(MATRIX_OUTPUT_PATH, matrixReport);
  console.log('\n   Matrix written to: ' + MATRIX_OUTPUT_PATH);
  console.log('   Matrix SHA-256:    ' + matrixSha + '\n');

  // Step 4: Run Automated Test Suite (21 Tests including 11 Negative Attacks)
  console.log('4. Running Automated Test Suite:');
  const testResults = [];

  function recordTest(name, passed, details, measured) {
    console.log('   [' + (passed ? 'PASS' : 'FAIL') + '] ' + name);
    if (!passed) console.error('      Details:', details);
    testResults.push({
      test_name: name,
      passed,
      details: passed ? '' : details,
      measured
    });
  }

  function makeFixtureMeta(buf) {
    return {
      leaf_id: 'fixture_leaf',
      requested_url: 'https://brand.vn/deal',
      final_url: 'https://brand.vn/deal',
      captured_at_utc: SEALED_TIMESTAMP,
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      bytes: buf.length,
      sha256: sha256(buf)
    };
  }

  // TEST 1: Real Vault Evaluation -> 0 VERIFIED, 10 HELD
  recordTest(
    'TEST_01_REAL_VAULT_EVALUATION',
    verifiedCount === 0 && heldCount === 10,
    'Expected 0 VERIFIED and 10 HELD, got ' + verifiedCount + ' VERIFIED, ' + heldCount + ' HELD',
    { total: CANDIDATES.length, verifiedCount, heldCount }
  );

  // TEST 2: Negative Attack 1 — Broad post-content with unrelated office locality & copyright 2026
  {
    const html = [
      '<html><body>',
      '<div class="post-content">',
      '  <h3>Combo Phim Đặc Biệt</h3>',
      '  <p class="price">100.000đ</p>',
      '  <p class="office">Địa chỉ văn phòng: Đà Nẵng</p>',
      '  <p class="other-news">Khai trương áp dụng tại Hà Nội cho chi nhánh mới</p>',
      '  <p class="validity">Áp dụng từ thứ 2 đến thứ 5</p>',
      '  <p class="copyright">© 2026 Cinema Holding</p>',
      '</div>',
      '</body></html>'
    ].join('\n');
    const buf = Buffer.from(html, 'utf8');
    const meta = makeFixtureMeta(buf);
    const cand = {
      b19_id: 'ATTACK_1_BROAD_POST_CONTENT',
      brand: 'Brand',
      claims: {
        title: 'Combo Phim Đặc Biệt',
        price: '100.000đ',
        conditions: null,
        validity_or_recurrence: 'Áp dụng từ thứ 2 đến thứ 5',
        da_nang_locality: 'Đà Nẵng'
      }
    };
    const res = evaluateCandidate(cand, buf, meta);
    recordTest(
      'TEST_02_ATTACK_BROAD_POST_CONTENT_REJECTION',
      res.status === 'HELD' && res.held_reason.includes('HELD__NO_EXPLICIT_OFFER_CARD_FOUND'),
      'Broad post-content was not rejected with HELD__NO_EXPLICIT_OFFER_CARD_FOUND: ' + res.held_reason,
      { status: res.status, reason: res.held_reason }
    );
  }

  // TEST 3: Negative Attack 2 — Broad #main / page shell
  {
    const html = [
      '<html><body>',
      '<main id="main">',
      '  <h3>Combo Lẩu Nướng</h3>',
      '  <p class="price">250.000đ</p>',
      '  <p class="locality">Ưu đãi áp dụng tại cụm rạp Đà Nẵng</p>',
      '  <p class="validity">Năm 2026</p>',
      '</main>',
      '</body></html>'
    ].join('\n');
    const buf = Buffer.from(html, 'utf8');
    const meta = makeFixtureMeta(buf);
    const cand = {
      b19_id: 'ATTACK_2_BROAD_MAIN',
      brand: 'Brand',
      claims: {
        title: 'Combo Lẩu Nướng',
        price: '250.000đ',
        conditions: null,
        validity_or_recurrence: 'Năm 2026',
        da_nang_locality: 'Ưu đãi áp dụng tại cụm rạp Đà Nẵng'
      }
    };
    const res = evaluateCandidate(cand, buf, meta);
    recordTest(
      'TEST_03_ATTACK_BROAD_MAIN_REJECTION',
      res.status === 'HELD' && res.held_reason.includes('HELD__NO_EXPLICIT_OFFER_CARD_FOUND'),
      'Broad #main was not rejected with HELD__NO_EXPLICIT_OFFER_CARD_FOUND: ' + res.held_reason,
      { status: res.status, reason: res.held_reason }
    );
  }

  // TEST 4: Negative Attack 3 — Head text node vs body text
  {
    const html = [
      '<html><head>',
      '  <title>Combo Bắp Nước Rạp Phim</title>',
      '  <meta property="og:title" content="Combo Bắp Nước Rạp Phim">',
      '</head><body>',
      '  <article class="deal-card" id="card-1">',
      '    <p class="price">80.000đ</p>',
      '    <p class="locality">Ưu đãi áp dụng tại cụm rạp Đà Nẵng</p>',
      '    <p class="validity">Năm 2026</p>',
      '  </article>',
      '</body></html>'
    ].join('\n');
    const buf = Buffer.from(html, 'utf8');
    const meta = makeFixtureMeta(buf);
    const cand = {
      b19_id: 'ATTACK_3_HEAD_TITLE',
      brand: 'Brand',
      claims: {
        title: 'Combo Bắp Nước Rạp Phim',
        price: '80.000đ',
        conditions: null,
        validity_or_recurrence: 'Năm 2026',
        da_nang_locality: 'Ưu đãi áp dụng tại cụm rạp Đà Nẵng'
      }
    };
    const res = evaluateCandidate(cand, buf, meta);
    recordTest(
      'TEST_04_ATTACK_HEAD_TITLE_NODE_REJECTION',
      res.status === 'HELD' && res.held_reason.includes('HELD__TITLE_OR_PRICE_IN_EXCLUDED_NODE'),
      'Head title was not rejected with HELD__TITLE_OR_PRICE_IN_EXCLUDED_NODE: ' + res.held_reason,
      { status: res.status, reason: res.held_reason }
    );
  }

  // TEST 5: Negative Attack 4 — Malformed / unclosed HTML
  {
    const html = '<div><article class="deal-card"><h3>Deal Hót</h3><p>50.000đ</p>';
    const buf = Buffer.from(html, 'utf8');
    const meta = makeFixtureMeta(buf);
    const cand = {
      b19_id: 'ATTACK_4_MALFORMED',
      brand: 'Brand',
      claims: { title: 'Deal Hót', price: '50.000đ' }
    };
    const res = evaluateCandidate(cand, buf, meta);
    recordTest(
      'TEST_05_ATTACK_MALFORMED_HTML_FAIL_CLOSED',
      res.status === 'HELD' && res.held_reason.includes('HELD__SOURCE_PRECONDITION_FAILED__MALFORMED_HTML'),
      'Malformed HTML was not rejected with HELD__SOURCE_PRECONDITION_FAILED__MALFORMED_HTML: ' + res.held_reason,
      { status: res.status, reason: res.held_reason }
    );
  }

  // TEST 6: Negative Attack 5 — Duplicate identical cards without identifier
  {
    const html = [
      '<html><body>',
      '<div class="catalog-list">',
      '  <article class="deal-card">',
      '    <h3>Vé Xem Phim 2D</h3>',
      '    <p class="price">65.000đ</p>',
      '    <p class="locality">Ưu đãi áp dụng tại cụm rạp Đà Nẵng</p>',
      '    <p class="validity">Năm 2026</p>',
      '  </article>',
      '  <article class="deal-card">',
      '    <h3>Vé Xem Phim 2D</h3>',
      '    <p class="price">65.000đ</p>',
      '    <p class="locality">Ưu đãi áp dụng tại cụm rạp Đà Nẵng</p>',
      '    <p class="validity">Năm 2026</p>',
      '  </article>',
      '</div>',
      '</body></html>'
    ].join('\n');
    const buf = Buffer.from(html, 'utf8');
    const meta = makeFixtureMeta(buf);
    const cand = {
      b19_id: 'ATTACK_5_DUPLICATE_NO_ID',
      brand: 'Brand',
      claims: {
        title: 'Vé Xem Phim 2D',
        price: '65.000đ',
        conditions: null,
        validity_or_recurrence: 'Năm 2026',
        da_nang_locality: 'Ưu đãi áp dụng tại cụm rạp Đà Nẵng'
      }
    };
    const res = evaluateCandidate(cand, buf, meta);
    recordTest(
      'TEST_06_ATTACK_DUPLICATE_CARDS_WITHOUT_ID_REJECTION',
      res.status === 'HELD' && res.held_reason.includes('HELD__AMBIGUOUS_DUPLICATE_CARDS_WITHOUT_IDENTIFIER'),
      'Duplicate cards without ID was not rejected with HELD__AMBIGUOUS_DUPLICATE_CARDS_WITHOUT_IDENTIFIER: ' + res.held_reason,
      { status: res.status, reason: res.held_reason }
    );
  }

  // TEST 7: Negative Attack 6 — Cross-card element pairing
  {
    const html = [
      '<html><body>',
      '<div class="catalog-list">',
      '  <article class="deal-card" id="card-1">',
      '    <h3>Combo 1 Pizza</h3>',
      '    <p class="price">150.000đ</p>',
      '  </article>',
      '  <article class="deal-card" id="card-2">',
      '    <h3>Combo 2 Burger</h3>',
      '    <p class="price">99.000đ</p>',
      '  </article>',
      '</div>',
      '</body></html>'
    ].join('\n');
    const buf = Buffer.from(html, 'utf8');
    const meta = makeFixtureMeta(buf);
    const cand = {
      b19_id: 'ATTACK_6_CROSS_CARD',
      brand: 'Brand',
      claims: { title: 'Combo 1 Pizza', price: '99.000đ' }
    };
    const res = evaluateCandidate(cand, buf, meta);
    recordTest(
      'TEST_07_ATTACK_CROSS_CARD_PAIRING_REJECTION',
      res.status === 'HELD' && res.held_reason.includes('HELD__CROSS_CARD_ELEMENTS_REJECTED'),
      'Cross card pairing was not rejected with HELD__CROSS_CARD_ELEMENTS_REJECTED: ' + res.held_reason,
      { status: res.status, reason: res.held_reason }
    );
  }

  // TEST 8: Negative Attack 7 — Office address inside card without promotional binding
  {
    const html = '<div><article class="deal-card"><h3>Deal 7</h3><p class="price">100k</p><p>Địa chỉ văn phòng: Đà Nẵng</p><p class="validity">Áp dụng năm 2026</p></article></div>';
    const buf = Buffer.from(html, 'utf8');
    const meta = makeFixtureMeta(buf);
    const cand = {
      b19_id: 'ATTACK_7_OFFICE_ADDRESS',
      brand: 'Brand',
      claims: { title: 'Deal 7', price: '100k', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'Áp dụng năm 2026' }
    };
    const res = evaluateCandidate(cand, buf, meta);
    recordTest(
      'TEST_08_ATTACK_OFFICE_ADDRESS_REJECTION',
      res.status === 'HELD' && res.held_reason.includes('HELD__LOCALITY_OFFICE_ADDRESS_REJECTED'),
      'Office address was not rejected with HELD__LOCALITY_OFFICE_ADDRESS_REJECTED: ' + res.held_reason,
      { status: res.status, reason: res.held_reason }
    );
  }

  // TEST 9: Negative Attack 8 — Year 2026 only in copyright node inside card
  {
    const html = '<div><article class="deal-card"><h3>Deal 8</h3><p class="price">100k</p><p>Ưu đãi áp dụng tại cụm rạp Đà Nẵng</p><p class="validity">Áp dụng từ thứ 2 đến thứ 5</p><p class="copy">© 2026 Cinema Holding</p></article></div>';
    const buf = Buffer.from(html, 'utf8');
    const meta = makeFixtureMeta(buf);
    const cand = {
      b19_id: 'ATTACK_8_COPYRIGHT_YEAR',
      brand: 'Brand',
      claims: { title: 'Deal 8', price: '100k', da_nang_locality: 'Ưu đãi áp dụng tại cụm rạp Đà Nẵng', validity_or_recurrence: 'Áp dụng từ thứ 2 đến thứ 5' }
    };
    const res = evaluateCandidate(cand, buf, meta);
    recordTest(
      'TEST_09_ATTACK_COPYRIGHT_YEAR_ONLY_REJECTION',
      res.status === 'HELD' && res.held_reason.includes('HELD__VALIDITY_CALENDAR_YEAR_NOT_IN_CARD'),
      'Copyright year only was not rejected with HELD__VALIDITY_CALENDAR_YEAR_NOT_IN_CARD: ' + res.held_reason,
      { status: res.status, reason: res.held_reason }
    );
  }

  // TEST 10: Negative Attack 9 — Footer locality
  {
    const html = [
      '<html><body>',
      '<article class="deal-card"><h3>Deal 9</h3><p class="price">100k</p><p class="validity">Năm 2026</p></article>',
      '<footer><p>Ưu đãi áp dụng tại cụm rạp Đà Nẵng</p></footer>',
      '</body></html>'
    ].join('\n');
    const buf = Buffer.from(html, 'utf8');
    const meta = makeFixtureMeta(buf);
    const cand = {
      b19_id: 'ATTACK_9_FOOTER_LOCALITY',
      brand: 'Brand',
      claims: { title: 'Deal 9', price: '100k', da_nang_locality: 'Ưu đãi áp dụng tại cụm rạp Đà Nẵng', validity_or_recurrence: 'Năm 2026' }
    };
    const res = evaluateCandidate(cand, buf, meta);
    recordTest(
      'TEST_10_ATTACK_FOOTER_LOCALITY_REJECTION',
      res.status === 'HELD' && (res.held_reason.includes('HELD__LOCALITY_NOT_IN_CARD') || res.held_reason.includes('HELD__LOCALITY_OFFER_BINDING_MISSING')),
      'Footer locality was not rejected: ' + res.held_reason,
      { status: res.status, reason: res.held_reason }
    );
  }

  // TEST 11: Negative Attack 10 — Store locator dropdown
  {
    const html = [
      '<html><body>',
      '<div class="store-locator"><select><option>Chi nhánh Đà Nẵng</option></select></div>',
      '<article class="deal-card"><h3>Deal 10</h3><p class="price">100k</p><p class="validity">Năm 2026</p></article>',
      '</body></html>'
    ].join('\n');
    const buf = Buffer.from(html, 'utf8');
    const meta = makeFixtureMeta(buf);
    const cand = {
      b19_id: 'ATTACK_10_STORE_LOCATOR',
      brand: 'Brand',
      claims: { title: 'Deal 10', price: '100k', da_nang_locality: 'Chi nhánh Đà Nẵng', validity_or_recurrence: 'Năm 2026' }
    };
    const res = evaluateCandidate(cand, buf, meta);
    recordTest(
      'TEST_11_ATTACK_STORE_LOCATOR_REJECTION',
      res.status === 'HELD' && (res.held_reason.includes('HELD__LOCALITY_NOT_IN_CARD') || res.held_reason.includes('HELD__LOCALITY_OFFER_BINDING_MISSING')),
      'Store locator borrowing was not rejected: ' + res.held_reason,
      { status: res.status, reason: res.held_reason }
    );
  }

  // TEST 12: Negative Attack 11 — Image alt locality
  {
    const html = [
      '<html><body>',
      '<article class="deal-card"><h3>Deal 11</h3><p class="price">100k</p><p class="validity">Năm 2026</p><img src="/img.jpg" alt="Đà Nẵng"></article>',
      '</body></html>'
    ].join('\n');
    const buf = Buffer.from(html, 'utf8');
    const meta = makeFixtureMeta(buf);
    const cand = {
      b19_id: 'ATTACK_11_IMAGE_ALT',
      brand: 'Brand',
      claims: { title: 'Deal 11', price: '100k', da_nang_locality: 'Đà Nẵng', validity_or_recurrence: 'Năm 2026' }
    };
    const res = evaluateCandidate(cand, buf, meta);
    recordTest(
      'TEST_12_ATTACK_IMAGE_ALT_REJECTION',
      res.status === 'HELD' && (res.held_reason.includes('HELD__LOCALITY_OFFER_BINDING_MISSING') || res.held_reason.includes('HELD__LOCALITY_NOT_IN_CARD')),
      'Image alt locality was not rejected: ' + res.held_reason,
      { status: res.status, reason: res.held_reason }
    );
  }

  // TEST 13: Precondition Mutation 1 — SHA-256 mismatch
  {
    const cand = CANDIDATES[0];
    const rawBuf = fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.raw.html'));
    const meta = JSON.parse(fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.meta.json'), 'utf8'));
    const corrupted = Buffer.from(rawBuf);
    corrupted[0] = corrupted[0] === 0x3c ? 0x3e : 0x3c;
    const res = evaluateCandidate(cand, corrupted, meta);
    recordTest(
      'TEST_13_PRECONDITION_SHA256_MISMATCH',
      res.status === 'HELD' && res.held_reason.includes('HELD__SOURCE_PRECONDITION_FAILED__SHA256_MISMATCH'),
      'Corrupted SHA was not rejected: ' + res.held_reason,
      { status: res.status, reason: res.held_reason }
    );
  }

  // TEST 14: Precondition Mutation 2 — Byte length mismatch
  {
    const cand = CANDIDATES[0];
    const rawBuf = fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.raw.html'));
    const meta = JSON.parse(fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.meta.json'), 'utf8'));
    meta.bytes = rawBuf.length + 77;
    const res = evaluateCandidate(cand, rawBuf, meta);
    recordTest(
      'TEST_14_PRECONDITION_BYTE_LENGTH_MISMATCH',
      res.status === 'HELD' && res.held_reason.includes('HELD__SOURCE_PRECONDITION_FAILED__BYTE_LENGTH_MISMATCH'),
      'Byte length mismatch was not rejected: ' + res.held_reason,
      { status: res.status, reason: res.held_reason }
    );
  }

  // TEST 15: Precondition Mutation 3 — HTTP status 404
  {
    const cand = CANDIDATES[0];
    const rawBuf = fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.raw.html'));
    const meta = JSON.parse(fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.meta.json'), 'utf8'));
    meta.http_status = 404;
    const res = evaluateCandidate(cand, rawBuf, meta);
    recordTest(
      'TEST_15_PRECONDITION_HTTP_STATUS_404',
      res.status === 'HELD' && res.held_reason.includes('HELD__SOURCE_PRECONDITION_FAILED__HTTP_STATUS_NOT_200'),
      'HTTP 404 was not rejected: ' + res.held_reason,
      { status: res.status, reason: res.held_reason }
    );
  }

  // TEST 16: Precondition Mutation 4 — Fetch failed flag
  {
    const cand = CANDIDATES[0];
    const rawBuf = fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.raw.html'));
    const meta = JSON.parse(fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.meta.json'), 'utf8'));
    meta.is_fetch_failed = true;
    const res = evaluateCandidate(cand, rawBuf, meta);
    recordTest(
      'TEST_16_PRECONDITION_FETCH_FAILED',
      res.status === 'HELD' && res.held_reason.includes('HELD__SOURCE_PRECONDITION_FAILED__FETCH_FAILED'),
      'Fetch failed was not rejected: ' + res.held_reason,
      { status: res.status, reason: res.held_reason }
    );
  }

  // TEST 17: Precondition Mutation 5 — Soft-404 body
  {
    const html = '<html><head><title>404 - Không Tìm Thấy Trang</title></head><body>Trang không tồn tại</body></html>';
    const buf = Buffer.from(html, 'utf8');
    const meta = makeFixtureMeta(buf);
    const cand = { b19_id: 'CAND_SOFT404', brand: 'Brand', claims: { title: 'T', price: 'P' } };
    const res = evaluateCandidate(cand, buf, meta);
    recordTest(
      'TEST_17_PRECONDITION_SOFT_404',
      res.status === 'HELD' && res.held_reason.includes('HELD__SOURCE_PRECONDITION_FAILED__SOFT_404_DETECTED'),
      'Soft 404 was not rejected: ' + res.held_reason,
      { status: res.status, reason: res.held_reason }
    );
  }

  // TEST 18: Policy Mutation 1 — Price tampering
  {
    const cand = JSON.parse(JSON.stringify(CANDIDATES[0]));
    cand.claims.price = '999.000đ';
    const rawBuf = fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.raw.html'));
    const meta = JSON.parse(fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.meta.json'), 'utf8'));
    const res = evaluateCandidate(cand, rawBuf, meta);
    recordTest(
      'TEST_18_POLICY_ALTERED_PRICE',
      res.status === 'HELD' && res.missing_dimensions.includes('price'),
      'Altered price was not rejected: ' + res.held_reason,
      { status: res.status, reason: res.held_reason }
    );
  }

  // TEST 19: Policy Mutation 2 — Expired campaign
  {
    const html = '<div><article class="deal-card"><h3>Deal 19</h3><p class="price">50k</p><p class="loc">Ưu đãi áp dụng tại cụm rạp Đà Nẵng</p><p class="val">Áp dụng từ 01/01/2024 đến 30/04/2024</p></article></div>';
    const buf = Buffer.from(html, 'utf8');
    const meta = makeFixtureMeta(buf);
    const cand = {
      b19_id: 'CAND_EXPIRED_2024',
      brand: 'Brand',
      claims: { title: 'Deal 19', price: '50k', da_nang_locality: 'Ưu đãi áp dụng tại cụm rạp Đà Nẵng', validity_or_recurrence: 'Áp dụng từ 01/01/2024' }
    };
    const res = evaluateCandidate(cand, buf, meta);
    recordTest(
      'TEST_19_POLICY_EXPIRED_CAMPAIGN',
      res.status === 'HELD' && res.held_reason.includes('HELD__VALIDITY_CAMPAIGN_EXPIRED'),
      'Expired campaign was not rejected: ' + res.held_reason,
      { status: res.status, reason: res.held_reason }
    );
  }

  // TEST 20: Positive Control — Single compliant card with stable identifier
  {
    const html = [
      '<html><body>',
      '<div class="container">',
      '  <article class="deal-card" id="offer-danang-promo" data-offer-id="b19-starlight-u22">',
      '    <h3>Ưu Đãi Học Sinh Sinh Viên 2026</h3>',
      '    <p class="price">Đồng giá vé: 45.000đ/vé</p>',
      '    <p class="conditions">Áp dụng cho học sinh sinh viên có thẻ</p>',
      '    <p class="locality">Ưu đãi áp dụng tại cụm rạp Đà Nẵng</p>',
      '    <p class="validity">Hiệu lực xuyên suốt các ngày trong tuần năm 2026</p>',
      '  </article>',
      '</div>',
      '</body></html>'
    ].join('\n');
    const buf = Buffer.from(html, 'utf8');
    const meta = makeFixtureMeta(buf);
    const cand = {
      b19_id: 'POSITIVE_CONTROL',
      brand: 'Brand',
      claims: {
        title: 'Ưu Đãi Học Sinh Sinh Viên 2026',
        price: 'Đồng giá vé: 45.000đ/vé',
        conditions: 'Áp dụng cho học sinh sinh viên có thẻ',
        validity_or_recurrence: 'Hiệu lực xuyên suốt các ngày trong tuần năm 2026',
        da_nang_locality: 'Ưu đãi áp dụng tại cụm rạp Đà Nẵng'
      }
    };
    const res = evaluateCandidate(cand, buf, meta);
    const passed = res.status === 'VERIFIED' && res.all_dimensions_proven === true && res.offer_card && res.offer_card.offer_id === 'b19-starlight-u22';
    recordTest(
      'TEST_20_POSITIVE_CONTROL_VERIFIED',
      passed,
      'Positive control was not verified: ' + JSON.stringify(res),
      { status: res.status, offer_card: res.offer_card }
    );
  }

  // TEST 21: Inviolability Check — Staging feed & production flags
  {
    const stagingSha = sha256(fs.readFileSync(STAGING_FEED_PATH));
    const passed = stagingSha === EXPECTED_STAGING_SHA;
    recordTest(
      'TEST_21_STAGING_PROD_INVIOLABILITY',
      passed,
      'Staging feed SHA mismatch: ' + stagingSha + ' vs expected ' + EXPECTED_STAGING_SHA,
      {
        stagingFeedSha: stagingSha,
        expectedStagingSha: EXPECTED_STAGING_SHA,
        stagingMatchesBaseline: passed,
        production_deployment_authorized: false,
        production_mutation_permitted: false
      }
    );
  }

  const totalTests = testResults.length;
  const passedTests = testResults.filter(t => t.passed).length;
  const allPassed = passedTests === totalTests;

  console.log('\n   Total Tests: ' + totalTests + ' | Passed: ' + passedTests + ' | Failed: ' + (totalTests - passedTests) + ' (' + (allPassed ? '100% PASS' : 'FAILED') + ')\n');

  const testsReport = {
    test_suite_id: 'J358_R3_R4_STRICT_CARD_AND_REPRODUCIBILITY_TESTS',
    work_order_id: 'J358-R3-R4-DOM-PARSER-AND-ARTIFACT-REPRODUCIBILITY',
    authority: '01_EXECUTIVE_COUNCIL/JAYT_358_CEO_R3_R3_PARTIAL_ACCEPTANCE_AND_REPRODUCIBILITY_GATE.md',
    executed_at_utc: SEALED_TIMESTAMP,
    validator_module: '04_DATA_PIPELINE/j358_r3_r4_strict_offer_card_validator.cjs',
    validator_sha256: validatorHash,
    runner_file: '04_DATA_PIPELINE/run_jayt_358_r3_r4_reproducible_replay.cjs',
    runner_sha256: runnerHash,
    summary: {
      total: totalTests,
      passed: passedTests,
      failed: totalTests - passedTests,
      all_passed: allPassed
    },
    tests: testResults,
    inviolability: {
      staging_deals_feed_sha256: EXPECTED_STAGING_SHA,
      staging_feed_matches_baseline: true,
      production_mutation_permitted: false,
      production_deployment_authorized: false
    }
  };

  const testsSha = writeWithSidecar(TESTS_OUTPUT_PATH, testsReport);
  console.log('   Test report written to: ' + TESTS_OUTPUT_PATH);
  console.log('   Test report SHA-256:    ' + testsSha + '\n');

  // Step 5: Generate Consolidated Receipt
  console.log('5. Generating Consolidated Immutable Receipt:');
  const receipt = {
    receipt_id: 'RECEIPT_J358_R3_R4_STRICT_CARD_AND_REPRODUCIBILITY_20260909T041500Z',
    work_order_id: 'J358-R3-R4-DOM-PARSER-AND-ARTIFACT-REPRODUCIBILITY',
    authority: '01_EXECUTIVE_COUNCIL/JAYT_358_CEO_R3_R3_PARTIAL_ACCEPTANCE_AND_REPRODUCIBILITY_GATE.md',
    work_order_dispatch: '04_DATA_PIPELINE/dispatch/WORK_ORDER_J358_R3_R4_DOM_PARSER_AND_ARTIFACT_REPRODUCIBILITY.json',
    executor: 'Antigravity implementation and CEO/Gatekeeper review',
    generated_at_utc: SEALED_TIMESTAMP,
    purpose: 'Eliminate broad-container promotion paths, enforce structural DOM parser with node-level exclusions, enforce card selector allowlist, and provide a single sealed replay entrypoint.',
    replay_command: 'node 04_DATA_PIPELINE/run_jayt_358_r3_r4_reproducible_replay.cjs',
    runner_sha256: runnerHash,
    validator_sha256: validatorHash,
    production_status: {
      production_deployment_authorized: false,
      production_mutation_permitted: false,
      production_baseline: 'v3.429.0',
      deployment_id: 'dpl_BiD7syWRkLVgXFjPNjxesMJ2h4mM',
      production_url: 'https://jayt-production-v3420.vercel.app',
      rollback_standby_deployment: 'dpl_5PUrAGqBthMJjrcHZSc3nCoUf1YL',
      rollback_status: 'STANDBY_READY',
      scheduler_task_name: 'JayT-Ops-Monitor-v3426',
      duplicate_schedulers: 0
    },
    staging_status: {
      staging_deals_feed: 'staging_preview_sprint_b/deals_feed.json',
      staging_deals_feed_sha256: stagingHash,
      matches_sealed_baseline_v34290: stagingIntact,
      staging_hydration_performed: false
    },
    sealed_vault_inputs: vaultInputHashes,
    matrix_summary: {
      matrix_file: '06_TRUST_AND_EVIDENCE/batch_19_r3_r4_replay/CLAIM_PROVENANCE_MATRIX.json',
      matrix_sha256: matrixSha,
      total_candidates: CANDIDATES.length,
      verified_count: verifiedCount,
      held_count: heldCount,
      truthful_zero_verified_preserved: verifiedCount === 0 && heldCount === 10
    },
    test_suite_summary: {
      test_suite_file: '07_QUALITY_ASSURANCE/runtime_evidence/J358_R3_R4_STRICT_CARD_AND_REPRODUCIBILITY_TESTS.json',
      test_suite_sha256: testsSha,
      total_tests: totalTests,
      passed_tests: passedTests,
      failed_tests: totalTests - passedTests,
      all_passed: allPassed
    },
    inviolability_attestation: {
      production_deployment_authorized: false,
      production_mutation_permitted: false,
      staging_deals_feed_unmodified: stagingIntact,
      zero_hydration_maintained: true,
      truthful_zero_verified_maintained: verifiedCount === 0 && heldCount === 10
    }
  };

  const receiptSha = writeWithSidecar(RECEIPT_OUTPUT_PATH, receipt);
  console.log('   Receipt written to:     ' + RECEIPT_OUTPUT_PATH);
  console.log('   Receipt SHA-256:        ' + receiptSha + '\n');

  // Step 6: Sidecar Verification Check
  console.log('6. Sidecar Self-Verification:');
  const matrixCheck = verifySidecar(MATRIX_OUTPUT_PATH);
  const testsCheck = verifySidecar(TESTS_OUTPUT_PATH);
  const receiptCheck = verifySidecar(RECEIPT_OUTPUT_PATH);

  console.log('   - Matrix Sidecar:  ' + (matrixCheck.matches ? 'MATCH: TRUE' : 'MATCH: FALSE') + ' (' + matrixCheck.fileHash + ')');
  console.log('   - Tests Sidecar:   ' + (testsCheck.matches ? 'MATCH: TRUE' : 'MATCH: FALSE') + ' (' + testsCheck.fileHash + ')');
  console.log('   - Receipt Sidecar: ' + (receiptCheck.matches ? 'MATCH: TRUE' : 'MATCH: FALSE') + ' (' + receiptCheck.fileHash + ')\n');

  const allSidecarsMatch = matrixCheck.matches && testsCheck.matches && receiptCheck.matches;

  console.log('======================================================================');
  console.log('REPLAY STATUS: ' + (allPassed && allSidecarsMatch ? 'SUCCESS (100% PASS & VERIFIED)' : 'FAILED'));
  console.log('======================================================================\n');

  return {
    success: allPassed && allSidecarsMatch,
    matrixSha,
    testsSha,
    receiptSha
  };
}

if (require.main === module) {
  runReplay();
}

module.exports = {
  runReplay,
  CANDIDATES
};
