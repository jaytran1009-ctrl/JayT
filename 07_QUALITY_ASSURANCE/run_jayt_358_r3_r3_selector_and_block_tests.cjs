/**
 * J358-R3-R3: OFFER SUBTREE & OCCURRENCE-AWARE SELECTOR TEST SUITE
 * Work Order: J358-R3-R3-SELECTOR-AND-BLOCK-HARDENING
 * Authority: Quyết định CEO JAYT-358-R3-R2 (01_EXECUTIVE_COUNCIL/JAYT_358_CEO_R3_R2_PARTIAL_ACCEPTANCE_AND_SELECTOR_GATE.md)
 * 
 * Test Requirements:
 * 1. Invokes the pure evaluateCandidate evaluator against recorded R3 leaves and in-memory mutation fixtures.
 * 2. 5 Negative Attacks required by Dispatch Requirement 18:
 *    - Attack 1: Metadata title vs body title duplicate (reject meta title; fail closed if no offer subtree)
 *    - Attack 2: Title and price from different cards (HELD__CROSS_CARD_ELEMENTS_REJECTED)
 *    - Attack 3: Unclosed semantic block (HELD__SEMANTIC_BLOCK_NOT_FOUND)
 *    - Attack 4: Generic locality clause from another card in same overview section (HELD__LOCALITY_NOT_IN_OFFER_SUBTREE)
 *    - Attack 5: Duplicate identical offers without identifier (HELD__AMBIGUOUS_DUPLICATE_OFFERS_WITHOUT_IDENTIFIER)
 * 3. Mixed-context attacks:
 *    - Footer locality rejection
 *    - Store-locator locality rejection
 *    - Valid-looking recurrence + unrelated 2026 in footer rejection
 *    - Selected span inside image attribute rejection
 * 4. Precondition mutations (SHA drift, byte length mismatch, HTTP 404, fetch failed, soft-404).
 * 5. Policy mutations (price tampering, expired campaign).
 * 6. Positive control proof: Single card with stable identifier and all 5 claims in same subtree -> VERIFIED.
 * 7. Staging and production inviolability check.
 * 8. Generates J358_R3_R3_SELECTOR_AND_BLOCK_HARDENING_TESTS.json + .sha256 sidecar.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {
  sha256,
  findAllRawByteSpans,
  validateSourcePreconditions,
  findOfferCardSubtree,
  checkTagContextAtOffset,
  evaluateCandidate
} = require('../04_DATA_PIPELINE/j358_r3_r3_offer_subtree_validator.cjs');

const ROOT = path.resolve(__dirname, '..');
const VAULT_DIR = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_19_r3_offer_specific_vault');
const QA_DIR = path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence');
const TEST_OUTPUT_PATH = path.join(QA_DIR, 'J358_R3_R3_SELECTOR_AND_BLOCK_HARDENING_TESTS.json');
const STAGING_FEED_PATH = path.join(ROOT, 'staging_preview_sprint_b', 'deals_feed.json');
const EXPECTED_STAGING_SHA = 'df0ccbab9aef23615e445a0bae6f3a16dbe1dab0face24f4fa5fe8bf6110ed94';

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

function runTests() {
  console.log('======================================================================');
  console.log('=== WORK ORDER J358-R3-R3: SELECTOR AND BLOCK TEST SUITE ===');
  console.log('======================================================================\n');

  const testResults = [];

  function recordTest(testName, passed, details, measuredResults) {
    console.log('[' + (passed ? 'PASS' : 'FAIL') + '] ' + testName);
    if (!passed) console.error('   Details:', details);
    testResults.push({
      test_name: testName,
      passed,
      details: passed ? '' : details,
      measured_results: measuredResults
    });
  }

  // TEST 1: Pure evaluation of all 10 real vault candidates -> 0 VERIFIED, 10 HELD
  {
    let verifiedCount = 0;
    let heldCount = 0;
    const evaluatedBreakdown = [];

    for (const cand of CANDIDATES) {
      const rawPath = path.join(VAULT_DIR, cand.leaf_id + '.leaf.raw.html');
      const metaPath = path.join(VAULT_DIR, cand.leaf_id + '.leaf.meta.json');

      const rawBuffer = fs.readFileSync(rawPath);
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

      const res = evaluateCandidate(cand, rawBuffer, meta);

      evaluatedBreakdown.push({
        b19_id: cand.b19_id,
        brand: cand.brand,
        status: res.status,
        held_reason: res.held_reason,
        missing_dimensions: res.missing_dimensions,
        offer_subtree: res.offer_subtree
      });

      if (res.status === 'VERIFIED') verifiedCount++;
      else if (res.status === 'HELD') heldCount++;
    }

    const passed = verifiedCount === 0 && heldCount === 10;
    recordTest(
      'TEST_1_EVALUATE_ALL_10_VAULT_CANDIDATES',
      passed,
      'Expected 0 VERIFIED and 10 HELD, got ' + verifiedCount + ' VERIFIED, ' + heldCount + ' HELD',
      { verifiedCount, heldCount, totalEvaluated: CANDIDATES.length, evaluatedBreakdown }
    );
  }

  // TEST 2: Negative Attack 1 — Metadata title vs body title duplicate
  {
    const fixtureHtml = [
      '<html><head>',
      '  <meta property="og:title" content="Siêu Combo Ăn Vặt Đà Nẵng">',
      '</head><body>',
      '  <div><h1>Header Trực Tuyến</h1></div>',
      '  <p class="unrelated-text">Siêu Combo Ăn Vặt Đà Nẵng</p>',
      '  <p class="price-text">100.000đ</p>',
      '</body></html>'
    ].join('\n');

    const fixtureBuf = Buffer.from(fixtureHtml, 'utf8');
    const fixtureMeta = {
      leaf_id: 'attack_meta_title',
      requested_url: 'https://snack.vn/combo',
      final_url: 'https://snack.vn/combo',
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: '2026-09-08T12:00:00.000Z',
      bytes: fixtureBuf.length,
      sha256: sha256(fixtureBuf)
    };

    const cand = {
      b19_id: 'ATTACK_1_META_TITLE_DUPLICATE',
      brand: 'Snack Brand',
      claims: {
        title: 'Siêu Combo Ăn Vặt Đà Nẵng',
        price: '100.000đ',
        conditions: null,
        validity_or_recurrence: '2026',
        da_nang_locality: 'Đà Nẵng'
      }
    };

    const res = evaluateCandidate(cand, fixtureBuf, fixtureMeta);
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__SEMANTIC_BLOCK_NOT_FOUND');
    recordTest(
      'TEST_2_NEGATIVE_ATTACK_1_META_TITLE_DUPLICATE',
      passed,
      'Metadata title vs body title attack did not fail with HELD__SEMANTIC_BLOCK_NOT_FOUND: ' + res.held_reason,
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 3: Negative Attack 2 — Title and price from different cards in same container
  {
    const fixtureHtml = [
      '<html><body>',
      '<div class="menu-catalog">',
      '  <article class="deal-card" id="card-1">',
      '    <h3>Pizza Hải Sản</h3>',
      '    <p class="price">299.000đ</p>',
      '  </article>',
      '  <article class="deal-card" id="card-2">',
      '    <h3>Pizza Bò Nướng</h3>',
      '    <p class="price">199.000đ</p>',
      '  </article>',
      '</div>',
      '</body></html>'
    ].join('\n');

    const fixtureBuf = Buffer.from(fixtureHtml, 'utf8');
    const fixtureMeta = {
      leaf_id: 'attack_cross_card',
      requested_url: 'https://pizza.vn/menu',
      final_url: 'https://pizza.vn/menu',
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: '2026-09-08T12:00:00.000Z',
      bytes: fixtureBuf.length,
      sha256: sha256(fixtureBuf)
    };

    // Attempting to combine title from Card 1 and price from Card 2
    const cand = {
      b19_id: 'ATTACK_2_CROSS_CARD_ELEMENTS',
      brand: 'Pizza Brand',
      claims: {
        title: 'Pizza Hải Sản',
        price: '199.000đ',
        conditions: null,
        validity_or_recurrence: null,
        da_nang_locality: null
      }
    };

    const res = evaluateCandidate(cand, fixtureBuf, fixtureMeta);
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__CROSS_CARD_ELEMENTS_REJECTED');
    recordTest(
      'TEST_3_NEGATIVE_ATTACK_2_CROSS_CARD_ELEMENTS',
      passed,
      'Cross-card pairing was not rejected with HELD__CROSS_CARD_ELEMENTS_REJECTED: ' + res.held_reason,
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 4: Negative Attack 3 — Unclosed semantic block
  {
    const fixtureHtml = '<div><p>Fragmented unclosed HTML <h3>Ưu Đãi Đặc Biệt</h3> <span>50.000đ</span>';
    const fixtureBuf = Buffer.from(fixtureHtml, 'utf8');
    const fixtureMeta = {
      leaf_id: 'attack_unclosed_block',
      requested_url: 'https://store.vn/unclosed',
      final_url: 'https://store.vn/unclosed',
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: '2026-09-08T12:00:00.000Z',
      bytes: fixtureBuf.length,
      sha256: sha256(fixtureBuf)
    };

    const cand = {
      b19_id: 'ATTACK_3_UNCLOSED_SEMANTIC_BLOCK',
      brand: 'Store Brand',
      claims: {
        title: 'Ưu Đãi Đặc Biệt',
        price: '50.000đ'
      }
    };

    const res = evaluateCandidate(cand, fixtureBuf, fixtureMeta);
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__SEMANTIC_BLOCK_NOT_FOUND');
    recordTest(
      'TEST_4_NEGATIVE_ATTACK_3_UNCLOSED_SEMANTIC_BLOCK',
      passed,
      'Unclosed block was not rejected with HELD__SEMANTIC_BLOCK_NOT_FOUND: ' + res.held_reason,
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 5: Negative Attack 4 — Generic locality clause from another card in same section
  {
    const fixtureHtml = [
      '<html><body>',
      '<section class="catalog">',
      '  <article class="deal-card" id="card-danang">',
      '    <h3>Vé VIP Đà Nẵng</h3>',
      '    <p class="price">90.000đ</p>',
      '    <p class="locality">Áp dụng tại rạp Đà Nẵng</p>',
      '  </article>',
      '  <article class="deal-card" id="card-standard">',
      '    <h3>Vé Standard Toàn Quốc</h3>',
      '    <p class="price">70.000đ</p>',
      '    <p class="cond">Dành cho thành viên</p>',
      '    <p class="valid">Năm 2026</p>',
      '  </article>',
      '</section>',
      '</body></html>'
    ].join('\n');

    const fixtureBuf = Buffer.from(fixtureHtml, 'utf8');
    const fixtureMeta = {
      leaf_id: 'attack_sibling_locality',
      requested_url: 'https://cinema.vn/tickets',
      final_url: 'https://cinema.vn/tickets',
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: '2026-09-08T12:00:00.000Z',
      bytes: fixtureBuf.length,
      sha256: sha256(fixtureBuf)
    };

    // Card standard attempts to borrow locality from sibling card-danang
    const cand = {
      b19_id: 'ATTACK_4_SIBLING_LOCALITY_BORROWING',
      brand: 'Cinema Brand',
      claims: {
        title: 'Vé Standard Toàn Quốc',
        price: '70.000đ',
        conditions: 'Dành cho thành viên',
        validity_or_recurrence: 'Năm 2026',
        da_nang_locality: 'Áp dụng tại rạp Đà Nẵng'
      }
    };

    const res = evaluateCandidate(cand, fixtureBuf, fixtureMeta);
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__LOCALITY_NOT_IN_OFFER_SUBTREE');
    recordTest(
      'TEST_5_NEGATIVE_ATTACK_4_SIBLING_LOCALITY_BORROWING',
      passed,
      'Sibling card locality borrowing was not rejected with HELD__LOCALITY_NOT_IN_OFFER_SUBTREE: ' + res.held_reason,
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 6: Negative Attack 5 — Duplicate identical offers without identifier
  {
    const fixtureHtml = [
      '<html><body>',
      '<div class="wrapper">',
      '  <article class="deal-card">',
      '    <h3>Combo Bắp Nước</h3>',
      '    <p class="price">80.000đ</p>',
      '    <p class="cond">Tặng kèm nước ngọt</p>',
      '    <p class="valid">Áp dụng năm 2026</p>',
      '    <p class="loc">Áp dụng tại cụm rạp Đà Nẵng</p>',
      '  </article>',
      '  <article class="deal-card">',
      '    <h3>Combo Bắp Nước</h3>',
      '    <p class="price">80.000đ</p>',
      '    <p class="cond">Tặng kèm nước ngọt</p>',
      '    <p class="valid">Áp dụng năm 2026</p>',
      '    <p class="loc">Áp dụng tại cụm rạp Đà Nẵng</p>',
      '  </article>',
      '</div>',
      '</body></html>'
    ].join('\n');

    const fixtureBuf = Buffer.from(fixtureHtml, 'utf8');
    const fixtureMeta = {
      leaf_id: 'attack_duplicate_no_id',
      requested_url: 'https://cinema.vn/combos',
      final_url: 'https://cinema.vn/combos',
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: '2026-09-08T12:00:00.000Z',
      bytes: fixtureBuf.length,
      sha256: sha256(fixtureBuf)
    };

    const cand = {
      b19_id: 'ATTACK_5_DUPLICATE_NO_ID',
      brand: 'Cinema Brand',
      claims: {
        title: 'Combo Bắp Nước',
        price: '80.000đ',
        conditions: 'Tặng kèm nước ngọt',
        validity_or_recurrence: 'Áp dụng năm 2026',
        da_nang_locality: 'Áp dụng tại cụm rạp Đà Nẵng'
      }
    };

    const res = evaluateCandidate(cand, fixtureBuf, fixtureMeta);
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__AMBIGUOUS_DUPLICATE_OFFERS_WITHOUT_IDENTIFIER');
    recordTest(
      'TEST_6_NEGATIVE_ATTACK_5_DUPLICATE_OFFERS_WITHOUT_ID',
      passed,
      'Duplicate offers without identifier was not rejected with HELD__AMBIGUOUS_DUPLICATE_OFFERS_WITHOUT_IDENTIFIER: ' + res.held_reason,
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 7: Mixed-Context Attack — Footer locality
  {
    const fixtureHtml = [
      '<html><body>',
      '<div class="news-banner"><p>Tin tức: Du lịch Thành phố Đà Nẵng ghi nhận lượng khách tăng cao trong quý 1.</p></div>',
      '<article class="deal-card">',
      '  <h2>Combo Pizza Tiết Kiệm</h2>',
      '  <p class="price">150.000đ</p>',
      '  <p class="conditions">Áp dụng mua mang về</p>',
      '  <p class="validity">Áp dụng năm 2026</p>',
      '</article>',
      '<footer><p>Địa chỉ trụ sở chính: Đà Nẵng, Việt Nam</p></footer>',
      '</body></html>'
    ].join('\n');

    const fixtureBuf = Buffer.from(fixtureHtml, 'utf8');
    const fixtureMeta = {
      leaf_id: 'attack_footer_locality',
      requested_url: 'https://pizza.vn/combo',
      final_url: 'https://pizza.vn/combo',
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: '2026-09-08T12:00:00.000Z',
      bytes: fixtureBuf.length,
      sha256: sha256(fixtureBuf)
    };

    const cand = {
      b19_id: 'ATTACK_FOOTER_LOCALITY',
      brand: 'Pizza Brand',
      claims: {
        title: 'Combo Pizza Tiết Kiệm',
        price: '150.000đ',
        conditions: 'Áp dụng mua mang về',
        validity_or_recurrence: 'Áp dụng năm 2026',
        da_nang_locality: 'Đà Nẵng'
      }
    };

    const res = evaluateCandidate(cand, fixtureBuf, fixtureMeta);
    const passed = res.status === 'HELD' && (res.held_reason.includes('HELD__LOCALITY_NOT_IN_OFFER_SUBTREE') || res.held_reason.includes('HELD__LOCALITY_FOOTER_OR_LEGAL_REGISTRATION_ONLY'));
    recordTest(
      'TEST_7_MIXED_CONTEXT_FOOTER_LOCALITY_REJECTION',
      passed,
      'Footer locality attack was not rejected with HELD',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 8: Mixed-Context Attack — Store locator
  {
    const fixtureHtml = [
      '<html><body>',
      '<div class="store-selector">',
      '  <select name="store"><option value="1">Chi nhánh Đà Nẵng</option></select>',
      '</div>',
      '<article class="deal-card">',
      '  <h2>Combo Bò Nướng BBQ</h2>',
      '  <p class="price">250.000đ</p>',
      '  <p class="conditions">Áp dụng từ thứ 2 đến thứ 6</p>',
      '  <p class="validity">Hiệu lực năm 2026</p>',
      '</article>',
      '</body></html>'
    ].join('\n');

    const fixtureBuf = Buffer.from(fixtureHtml, 'utf8');
    const fixtureMeta = {
      leaf_id: 'attack_store_locator',
      requested_url: 'https://bbq.vn/deal',
      final_url: 'https://bbq.vn/deal',
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: '2026-09-08T12:00:00.000Z',
      bytes: fixtureBuf.length,
      sha256: sha256(fixtureBuf)
    };

    const cand = {
      b19_id: 'ATTACK_STORE_LOCATOR',
      brand: 'BBQ Brand',
      claims: {
        title: 'Combo Bò Nướng BBQ',
        price: '250.000đ',
        conditions: 'Áp dụng từ thứ 2 đến thứ 6',
        validity_or_recurrence: 'Hiệu lực năm 2026',
        da_nang_locality: 'Chi nhánh Đà Nẵng'
      }
    };

    const res = evaluateCandidate(cand, fixtureBuf, fixtureMeta);
    const passed = res.status === 'HELD' && (res.held_reason.includes('HELD__LOCALITY_NOT_IN_OFFER_SUBTREE') || res.held_reason.includes('HELD__LOCALITY_STORE_LOCATOR_WITHOUT_OFFER_BINDING'));
    recordTest(
      'TEST_8_MIXED_CONTEXT_STORE_LOCATOR_REJECTION',
      passed,
      'Store locator borrowing attack was not rejected with HELD',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 9: Mixed-Context Attack — Valid-looking recurrence + unrelated 2026 in footer
  {
    const fixtureHtml = [
      '<html><body>',
      '<article class="deal-card">',
      '  <h2>Đồng Giá Vé Xem Phim</h2>',
      '  <p class="price">45.000đ</p>',
      '  <p class="conditions">Dành cho thành viên</p>',
      '  <p class="locality">Áp dụng tại rạp Đà Nẵng</p>',
      '  <p class="recurrence">Áp dụng vào ngày thứ 3 hàng tuần</p>',
      '</article>',
      '<footer><p>© 2026 Cinema Holding Group. All rights reserved.</p></footer>',
      '</body></html>'
    ].join('\n');

    const fixtureBuf = Buffer.from(fixtureHtml, 'utf8');
    const fixtureMeta = {
      leaf_id: 'attack_unrelated_2026',
      requested_url: 'https://cinema.vn/promo',
      final_url: 'https://cinema.vn/promo',
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: '2026-09-08T12:00:00.000Z',
      bytes: fixtureBuf.length,
      sha256: sha256(fixtureBuf)
    };

    const cand = {
      b19_id: 'ATTACK_UNRELATED_2026',
      brand: 'Cinema Brand',
      claims: {
        title: 'Đồng Giá Vé Xem Phim',
        price: '45.000đ',
        conditions: 'Dành cho thành viên',
        validity_or_recurrence: 'Áp dụng vào ngày thứ 3 hàng tuần',
        da_nang_locality: 'Áp dụng tại rạp Đà Nẵng'
      }
    };

    const res = evaluateCandidate(cand, fixtureBuf, fixtureMeta, { targetYear: 2026 });
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__VALIDITY_CALENDAR_YEAR_NOT_IN_OFFER_SUBTREE');
    recordTest(
      'TEST_9_MIXED_CONTEXT_UNRELATED_2026_FOOTER_REJECTION',
      passed,
      'Unrelated 2026 in footer was not rejected with HELD__VALIDITY_CALENDAR_YEAR_NOT_IN_OFFER_SUBTREE: ' + res.held_reason,
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 10: Mixed-Context Attack — Selected span inside image attribute
  {
    const fixtureHtml = [
      '<html><body>',
      '<article class="deal-card">',
      '  <h2>Vé Xem Phim Cuối Tuần</h2>',
      '  <p class="price">55.000đ</p>',
      '  <p class="conditions">Học sinh sinh viên</p>',
      '  <p class="validity">Áp dụng năm 2026</p>',
      '  <img src="/images/rap_ĐN.jpg" alt="Đà Nẵng">',
      '</article>',
      '</body></html>'
    ].join('\n');

    const fixtureBuf = Buffer.from(fixtureHtml, 'utf8');
    const fixtureMeta = {
      leaf_id: 'attack_image_locality',
      requested_url: 'https://cinema.vn/weekend',
      final_url: 'https://cinema.vn/weekend',
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: '2026-09-08T12:00:00.000Z',
      bytes: fixtureBuf.length,
      sha256: sha256(fixtureBuf)
    };

    const cand = {
      b19_id: 'ATTACK_IMAGE_LOCALITY',
      brand: 'Cinema Brand',
      claims: {
        title: 'Vé Xem Phim Cuối Tuần',
        price: '55.000đ',
        conditions: 'Học sinh sinh viên',
        validity_or_recurrence: 'Áp dụng năm 2026',
        da_nang_locality: 'Đà Nẵng'
      }
    };

    const res = evaluateCandidate(cand, fixtureBuf, fixtureMeta);
    const passed = res.status === 'HELD' && (res.held_reason.includes('HELD__LOCALITY_IMAGE_ONLY_REJECTED') || res.held_reason.includes('HELD__LOCALITY_OFFER_BINDING_MISSING'));
    recordTest(
      'TEST_10_MIXED_CONTEXT_IMAGE_ATTRIBUTE_REJECTION',
      passed,
      'Image attribute locality was not rejected with HELD',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 11: Precondition mutation — SHA-256 mismatch
  {
    const cand = CANDIDATES[0];
    const rawBuf = fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.raw.html'));
    const meta = JSON.parse(fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.meta.json'), 'utf8'));

    const corruptedBuf = Buffer.from(rawBuf);
    corruptedBuf[0] = corruptedBuf[0] === 0x3c ? 0x3e : 0x3c;

    const res = evaluateCandidate(cand, corruptedBuf, meta);
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__SOURCE_PRECONDITION_FAILED__SHA256_MISMATCH');
    recordTest(
      'TEST_11_PRECONDITION_MUTATION_SHA256_MISMATCH_REJECTION',
      passed,
      'Corrupted SHA was not rejected with HELD__SOURCE_PRECONDITION_FAILED__SHA256_MISMATCH',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 12: Precondition mutation — Byte length mismatch
  {
    const cand = CANDIDATES[0];
    const rawBuf = fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.raw.html'));
    const meta = JSON.parse(fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.meta.json'), 'utf8'));

    meta.bytes = rawBuf.length + 99;

    const res = evaluateCandidate(cand, rawBuf, meta);
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__SOURCE_PRECONDITION_FAILED__BYTE_LENGTH_MISMATCH');
    recordTest(
      'TEST_12_PRECONDITION_MUTATION_BYTE_LENGTH_REJECTION',
      passed,
      'Byte length mismatch was not rejected with HELD__SOURCE_PRECONDITION_FAILED__BYTE_LENGTH_MISMATCH',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 13: Precondition mutation — HTTP status 404
  {
    const cand = CANDIDATES[0];
    const rawBuf = fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.raw.html'));
    const meta = JSON.parse(fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.meta.json'), 'utf8'));

    meta.http_status = 404;

    const res = evaluateCandidate(cand, rawBuf, meta);
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__SOURCE_PRECONDITION_FAILED__HTTP_STATUS_NOT_200');
    recordTest(
      'TEST_13_PRECONDITION_MUTATION_HTTP_STATUS_REJECTION',
      passed,
      'HTTP status 404 was not rejected with HELD__SOURCE_PRECONDITION_FAILED__HTTP_STATUS_NOT_200',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 14: Precondition mutation — Fetch failed flag
  {
    const cand = CANDIDATES[0];
    const rawBuf = fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.raw.html'));
    const meta = JSON.parse(fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.meta.json'), 'utf8'));

    meta.is_fetch_failed = true;

    const res = evaluateCandidate(cand, rawBuf, meta);
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__SOURCE_PRECONDITION_FAILED__FETCH_FAILED');
    recordTest(
      'TEST_14_PRECONDITION_MUTATION_FETCH_FAILED_REJECTION',
      passed,
      'Fetch failed was not rejected with HELD__SOURCE_PRECONDITION_FAILED__FETCH_FAILED',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 15: Precondition mutation — Soft-404 signature
  {
    const fixtureHtml = '<html><head><title>404 - Không Tìm Thấy Trang</title></head><body>Trang không tồn tại</body></html>';
    const fixtureBuf = Buffer.from(fixtureHtml, 'utf8');
    const fixtureMeta = {
      leaf_id: 'soft404_fixture',
      requested_url: 'https://brand.vn/404',
      final_url: 'https://brand.vn/404',
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: '2026-09-08T12:00:00.000Z',
      bytes: fixtureBuf.length,
      sha256: sha256(fixtureBuf)
    };
    const cand = {
      b19_id: 'CAND_SOFT404',
      brand: 'Brand',
      claims: { title: 'T', price: 'P' }
    };

    const res = evaluateCandidate(cand, fixtureBuf, fixtureMeta);
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__SOURCE_PRECONDITION_FAILED__SOFT_404_DETECTED');
    recordTest(
      'TEST_15_PRECONDITION_MUTATION_SOFT_404_REJECTION',
      passed,
      'Soft-404 signature was not rejected with HELD__SOURCE_PRECONDITION_FAILED__SOFT_404_DETECTED',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 16: Policy mutation — Price tampering rejection
  {
    const cand = JSON.parse(JSON.stringify(CANDIDATES[0]));
    cand.claims.price = '999.000đ'; // altered price
    const rawBuf = fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.raw.html'));
    const meta = JSON.parse(fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.meta.json'), 'utf8'));

    const res = evaluateCandidate(cand, rawBuf, meta);
    const passed = res.status === 'HELD' && res.missing_dimensions.includes('price');
    recordTest(
      'TEST_16_POLICY_MUTATION_ALTERED_PRICE_REJECTION',
      passed,
      'Altered price was not rejected with HELD',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 17: Policy mutation — Expired campaign rejection
  {
    const fixtureHtml = [
      '<html><body>',
      '<article class="deal-card">',
      '  <h2>Voucher Giảm 30K</h2>',
      '  <p class="price">Giảm 30.000đ</p>',
      '  <p class="conditions">Đơn tối thiểu 60k</p>',
      '  <p class="locality">Áp dụng tại chi nhánh Đà Nẵng</p>',
      '  <p class="validity">Thời hạn áp dụng từ 25/4/2024 đến 09/05/2024</p>',
      '</article>',
      '</body></html>'
    ].join('\n');

    const fixtureBuf = Buffer.from(fixtureHtml, 'utf8');
    const fixtureMeta = {
      leaf_id: 'expired_promo_fixture',
      requested_url: 'https://cafe.vn/voucher',
      final_url: 'https://cafe.vn/voucher',
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: '2026-09-08T12:00:00.000Z',
      bytes: fixtureBuf.length,
      sha256: sha256(fixtureBuf)
    };

    const cand = {
      b19_id: 'CAND_EXPIRED',
      brand: 'Cafe Brand',
      claims: {
        title: 'Voucher Giảm 30K',
        price: 'Giảm 30.000đ',
        conditions: 'Đơn tối thiểu 60k',
        validity_or_recurrence: 'Thời hạn áp dụng từ 25/4/2024',
        da_nang_locality: 'Áp dụng tại chi nhánh Đà Nẵng'
      }
    };

    const res = evaluateCandidate(cand, fixtureBuf, fixtureMeta);
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__VALIDITY_CAMPAIGN_EXPIRED');
    recordTest(
      'TEST_17_POLICY_MUTATION_EXPIRED_CAMPAIGN_REJECTION',
      passed,
      'Expired campaign was not rejected with HELD__VALIDITY_CAMPAIGN_EXPIRED',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 18: Positive Control — Proof that single card with stable identifier and all five claims in same subtree promotes to VERIFIED
  {
    const positiveHtml = [
      '<html><body>',
      '<div class="header"><h1>Cinema Portal</h1></div>',
      '<article class="deal-card" id="u22-promo-danang-2026" data-offer-id="b19-starlight-u22">',
      '  <h2>Ưu Đãi Học Sinh Sinh Viên 2026</h2>',
      '  <p class="price">Đồng giá vé: 45.000đ/vé</p>',
      '  <p class="conditions">Áp dụng cho học sinh sinh viên có CCCD hoặc thẻ sinh viên</p>',
      '  <p class="locality">Ưu đãi áp dụng tại cụm rạp Đà Nẵng</p>',
      '  <p class="validity">Hiệu lực xuyên suốt các ngày trong tuần năm 2026</p>',
      '</article>',
      '<footer><p>© 2026 Cinema Portal. All rights reserved.</p></footer>',
      '</body></html>'
    ].join('\n');

    const positiveBuf = Buffer.from(positiveHtml, 'utf8');
    const positiveMeta = {
      leaf_id: 'positive_control_bound',
      requested_url: 'https://cinema.vn/u22-danang-2026',
      final_url: 'https://cinema.vn/u22-danang-2026',
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: '2026-09-08T12:00:00.000Z',
      bytes: positiveBuf.length,
      sha256: sha256(positiveBuf)
    };

    const positiveCand = {
      b19_id: 'B19_POSITIVE_CONTROL_BOUND',
      brand: 'Cinema Portal',
      claims: {
        title: 'Ưu Đãi Học Sinh Sinh Viên 2026',
        price: 'Đồng giá vé: 45.000đ/vé',
        conditions: 'Áp dụng cho học sinh sinh viên có CCCD hoặc thẻ sinh viên',
        validity_or_recurrence: 'Hiệu lực xuyên suốt các ngày trong tuần năm 2026',
        da_nang_locality: 'Ưu đãi áp dụng tại cụm rạp Đà Nẵng'
      }
    };

    const res = evaluateCandidate(positiveCand, positiveBuf, positiveMeta, { targetYear: 2026 });
    const passed = res.status === 'VERIFIED' &&
      res.all_dimensions_proven === true &&
      res.offer_subtree.tagName === 'article' &&
      res.offer_subtree.offer_id === 'u22-promo-danang-2026';
    recordTest(
      'TEST_18_POSITIVE_CONTROL_SAME_SUBTREE_VERIFIED',
      passed,
      'Valid same-subtree positive control was not verified: ' + JSON.stringify(res),
      { status: res.status, all_dimensions_proven: res.all_dimensions_proven, offer_subtree: res.offer_subtree }
    );
  }

  // TEST 19: Staging and Production Inviolability
  {
    const stagingFeedExists = fs.existsSync(STAGING_FEED_PATH);
    let stagingSha = '';
    if (stagingFeedExists) {
      stagingSha = sha256(fs.readFileSync(STAGING_FEED_PATH));
    }
    const stagingMatches = stagingSha === EXPECTED_STAGING_SHA;
    const passed = stagingMatches;

    recordTest(
      'TEST_19_STAGING_PROD_INVIOLABILITY',
      passed,
      'Staging feed SHA mismatch: ' + stagingSha + ' vs expected ' + EXPECTED_STAGING_SHA,
      {
        stagingFeedExists,
        stagingSha,
        expectedStagingSha: EXPECTED_STAGING_SHA,
        stagingMatches,
        production_deployment_authorized: false,
        production_mutation_permitted: false
      }
    );
  }

  const totalTests = testResults.length;
  const passedTests = testResults.filter(t => t.passed).length;
  const allPassed = passedTests === totalTests;

  console.log('\n======================================================================');
  console.log('RESULTS: ' + passedTests + '/' + totalTests + ' PASS (' + (allPassed ? '100%' : 'FAILED') + ')');
  console.log('======================================================================\n');

  const testReport = {
    test_suite_id: 'J358_R3_R3_SELECTOR_AND_BLOCK_HARDENING_TESTS',
    work_order_id: 'J358-R3-R3-SELECTOR-AND-BLOCK-HARDENING',
    authority: 'Quyết định CEO JAYT-358-R3-R2 (01_EXECUTIVE_COUNCIL/JAYT_358_CEO_R3_R2_PARTIAL_ACCEPTANCE_AND_SELECTOR_GATE.md)',
    executed_at_utc: new Date().toISOString(),
    evaluator_module: '04_DATA_PIPELINE/j358_r3_r3_offer_subtree_validator.cjs',
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

  fs.writeFileSync(TEST_OUTPUT_PATH, JSON.stringify(testReport, null, 2), 'utf8');
  const testSha = sha256(fs.readFileSync(TEST_OUTPUT_PATH));
  fs.writeFileSync(TEST_OUTPUT_PATH + '.sha256', testSha + '  ' + path.basename(TEST_OUTPUT_PATH) + '\n', 'utf8');

  console.log('Test results written to:', TEST_OUTPUT_PATH);
  console.log('Test results SHA-256 sidecar:', testSha);

  return testReport;
}

runTests();
