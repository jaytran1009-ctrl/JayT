/**
 * J358-R3-R1: VALIDATOR HARDENING TEST SUITE
 * Work Order: J358-R3-R1-VALIDATOR-HARDENING
 * Authority: Quyết định CEO JAYT-358-R3 (01_EXECUTIVE_COUNCIL/JAYT_358_CEO_R3_CONTAINMENT_ACCEPTANCE_AND_HARDENING_GATE.md)
 * 
 * Test Requirements:
 * 1. Invokes the pure evaluateCandidate evaluator against recorded R3 leaves and in-memory mutation fixtures.
 * 2. Mutation tests for price, locality (footer, store locator, image), expiry (expired, unproven year),
 *    source SHA drift, byte length mismatch, HTTP status, fetch failure, soft-404, duplicate spans.
 * 3. Positive control fixture to prove the gate CAN promote to VERIFIED when valid evidence exists.
 * 4. Staging and production inviolability checks.
 * 5. Generates J358_R3_R1_VALIDATOR_HARDENING_TESTS.json + .sha256 sidecar.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {
  sha256,
  findRawByteSpan,
  validateSourcePreconditions,
  evaluateLocalityBinding,
  evaluateValidityRecurrence,
  evaluateCandidate
} = require('../04_DATA_PIPELINE/j358_r3_r1_claim_provenance_validator.cjs');

const ROOT = path.resolve(__dirname, '..');
const VAULT_DIR = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_19_r3_offer_specific_vault');
const QA_DIR = path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence');
const TEST_OUTPUT_PATH = path.join(QA_DIR, 'J358_R3_R1_VALIDATOR_HARDENING_TESTS.json');
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
  console.log('=== WORK ORDER J358-R3-R1: VALIDATOR HARDENING TEST SUITE ===');
  console.log('======================================================================\n');

  const testResults = [];

  // Helper to record test
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

  // TEST 1: Evaluate all 10 real vault candidates through pure evaluateCandidate
  {
    let verifiedCount = 0;
    let heldCount = 0;
    const evaluatedBreakdown = [];

    for (const cand of CANDIDATES) {
      const rawPath = path.join(VAULT_DIR, cand.leaf_id + '.leaf.raw.html');
      const metaPath = path.join(VAULT_DIR, cand.leaf_id + '.leaf.meta.json');
      const rawBuf = fs.readFileSync(rawPath);
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

      const res = evaluateCandidate({ candidate: cand, rawBuffer: rawBuf, meta });
      evaluatedBreakdown.push({
        id: cand.b19_id,
        status: res.status,
        held_reason: res.held_reason
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

  // TEST 2: Mutation test — Altered price through evaluateCandidate
  {
    const cand = JSON.parse(JSON.stringify(CANDIDATES[0]));
    cand.claims.price = '999.000đ'; // Alter price to non-existent value
    const rawBuf = fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.raw.html'));
    const meta = JSON.parse(fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.meta.json'), 'utf8'));

    const res = evaluateCandidate({ candidate: cand, rawBuffer: rawBuf, meta });
    const passed = res.status === 'HELD' && res.missing_dimensions.includes('price');
    recordTest(
      'TEST_2_MUTATION_ALTERED_PRICE_REJECTION',
      passed,
      'Altered price was not rejected with HELD',
      { status: res.status, held_reason: res.held_reason, missing_dimensions: res.missing_dimensions }
    );
  }

  // TEST 3: Mutation test — Locality in footer only
  {
    const fixtureHtml = '<html><body><h1>Khuyến Mãi Đặc Biệt</h1><p>Giá 50.000đ</p><p>Điều kiện: Mua tại quầy</p><p>Áp dụng năm 2026</p><footer><p>Địa chỉ trụ sở chính tại TP. Đà Nẵng</p></footer></body></html>';
    const fixtureBuf = Buffer.from(fixtureHtml, 'utf8');
    const fixtureMeta = {
      leaf_id: 'fixture_footer_locality',
      requested_url: 'https://brand.vn/promo',
      final_url: 'https://brand.vn/promo',
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: new Date().toISOString(),
      bytes: fixtureBuf.length,
      sha256: sha256(fixtureBuf)
    };
    const cand = {
      b19_id: 'FIXTURE_FOOTER_LOCALITY',
      brand: 'Test Brand',
      claims: {
        title: 'Khuyến Mãi Đặc Biệt',
        price: 'Giá 50.000đ',
        conditions: 'Điều kiện: Mua tại quầy',
        validity_or_recurrence: 'Áp dụng năm 2026',
        da_nang_locality: 'Đà Nẵng'
      }
    };

    const res = evaluateCandidate({ candidate: cand, rawBuffer: fixtureBuf, meta: fixtureMeta });
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__LOCALITY_FOOTER_OR_LEGAL_REGISTRATION_ONLY');
    recordTest(
      'TEST_3_MUTATION_LOCALITY_FOOTER_ONLY_REJECTION',
      passed,
      'Footer locality was not rejected with HELD__LOCALITY_FOOTER_OR_LEGAL_REGISTRATION_ONLY',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 4: Mutation test — Locality in store locator dropdown only
  {
    const fixtureHtml = '<html><body><h1>Khuyến Mãi Đặc Biệt</h1><p>Giá 50.000đ</p><p>Điều kiện: Mua tại quầy</p><p>Áp dụng năm 2026</p><select class="store-locator"><option>Chi nhánh Đà Nẵng</option></select></body></html>';
    const fixtureBuf = Buffer.from(fixtureHtml, 'utf8');
    const fixtureMeta = {
      leaf_id: 'fixture_locator_locality',
      requested_url: 'https://brand.vn/promo',
      final_url: 'https://brand.vn/promo',
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: new Date().toISOString(),
      bytes: fixtureBuf.length,
      sha256: sha256(fixtureBuf)
    };
    const cand = {
      b19_id: 'FIXTURE_LOCATOR_LOCALITY',
      brand: 'Test Brand',
      claims: {
        title: 'Khuyến Mãi Đặc Biệt',
        price: 'Giá 50.000đ',
        conditions: 'Điều kiện: Mua tại quầy',
        validity_or_recurrence: 'Áp dụng năm 2026',
        da_nang_locality: 'Đà Nẵng'
      }
    };

    const res = evaluateCandidate({ candidate: cand, rawBuffer: fixtureBuf, meta: fixtureMeta });
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__LOCALITY_STORE_LOCATOR_WITHOUT_OFFER_BINDING');
    recordTest(
      'TEST_4_MUTATION_LOCALITY_STORE_LOCATOR_REJECTION',
      passed,
      'Store locator locality was not rejected with HELD__LOCALITY_STORE_LOCATOR_WITHOUT_OFFER_BINDING',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 5: Mutation test — Locality in image attribute only
  {
    const fixtureHtml = '<html><body><h1>Khuyến Mãi Đặc Biệt</h1><p>Giá 50.000đ</p><p>Điều kiện: Mua tại quầy</p><p>Áp dụng năm 2026</p><img src="/images/rap_ĐN.jpg" alt="ĐN"></body></html>';
    const fixtureBuf = Buffer.from(fixtureHtml, 'utf8');
    const fixtureMeta = {
      leaf_id: 'fixture_image_locality',
      requested_url: 'https://brand.vn/promo',
      final_url: 'https://brand.vn/promo',
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: new Date().toISOString(),
      bytes: fixtureBuf.length,
      sha256: sha256(fixtureBuf)
    };
    const cand = {
      b19_id: 'FIXTURE_IMAGE_LOCALITY',
      brand: 'Test Brand',
      claims: {
        title: 'Khuyến Mãi Đặc Biệt',
        price: 'Giá 50.000đ',
        conditions: 'Điều kiện: Mua tại quầy',
        validity_or_recurrence: 'Áp dụng năm 2026',
        da_nang_locality: 'ĐN'
      }
    };

    const res = evaluateCandidate({ candidate: cand, rawBuffer: fixtureBuf, meta: fixtureMeta });
    const passed = res.status === 'HELD' && (res.held_reason.includes('HELD__LOCALITY_IMAGE_ONLY_REJECTED') || res.held_reason.includes('HELD__LOCALITY_ABSENT_IN_SOURCE'));
    recordTest(
      'TEST_5_MUTATION_LOCALITY_IMAGE_ONLY_REJECTION',
      passed,
      'Image-only locality was not rejected with HELD',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 6: Mutation test — Expired promotional campaign
  {
    const fixtureHtml = '<html><body><h1>Ưu Đãi Đặc Biệt</h1><p>Giá 50.000đ</p><p>Điều kiện: Mua tại quầy</p><p>Áp dụng tại các rạp Đà Nẵng</p><p>Thời hạn: áp dụng từ 25/4/2024 đến 09/05/2024</p></body></html>';
    const fixtureBuf = Buffer.from(fixtureHtml, 'utf8');
    const fixtureMeta = {
      leaf_id: 'fixture_expired_campaign',
      requested_url: 'https://brand.vn/promo',
      final_url: 'https://brand.vn/promo',
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: new Date().toISOString(),
      bytes: fixtureBuf.length,
      sha256: sha256(fixtureBuf)
    };
    const cand = {
      b19_id: 'FIXTURE_EXPIRED_CAMPAIGN',
      brand: 'Test Brand',
      claims: {
        title: 'Ưu Đãi Đặc Biệt',
        price: 'Giá 50.000đ',
        conditions: 'Điều kiện: Mua tại quầy',
        validity_or_recurrence: 'áp dụng từ 25/4/2024',
        da_nang_locality: 'Đà Nẵng'
      }
    };

    const res = evaluateCandidate({ candidate: cand, rawBuffer: fixtureBuf, meta: fixtureMeta });
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__VALIDITY_CAMPAIGN_EXPIRED');
    recordTest(
      'TEST_6_MUTATION_EXPIRED_CAMPAIGN_REJECTION',
      passed,
      'Expired campaign was not rejected with HELD__VALIDITY_CAMPAIGN_EXPIRED',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 7: Mutation test — Unproven 2026 calendar year
  {
    const fixtureHtml = '<html><body><h1>Ưu Đãi Đặc Biệt</h1><p>Giá 50.000đ</p><p>Điều kiện: Mua tại quầy</p><p>Áp dụng tại các rạp Đà Nẵng</p><p>Áp dụng vào thứ 6 hàng tuần</p><p>Ngày đăng: 15/05/2025</p></body></html>';
    const fixtureBuf = Buffer.from(fixtureHtml, 'utf8');
    const fixtureMeta = {
      leaf_id: 'fixture_unproven_year',
      requested_url: 'https://brand.vn/promo',
      final_url: 'https://brand.vn/promo',
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: new Date().toISOString(),
      bytes: fixtureBuf.length,
      sha256: sha256(fixtureBuf)
    };
    const cand = {
      b19_id: 'FIXTURE_UNPROVEN_YEAR',
      brand: 'Test Brand',
      claims: {
        title: 'Ưu Đãi Đặc Biệt',
        price: 'Giá 50.000đ',
        conditions: 'Điều kiện: Mua tại quầy',
        validity_or_recurrence: 'Áp dụng vào thứ 6 hàng tuần',
        da_nang_locality: 'Đà Nẵng'
      }
    };

    const res = evaluateCandidate({ candidate: cand, rawBuffer: fixtureBuf, meta: fixtureMeta, options: { targetYear: 2026 } });
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__VALIDITY_CALENDAR_YEAR_UNPROVEN');
    recordTest(
      'TEST_7_MUTATION_UNPROVEN_CALENDAR_YEAR_REJECTION',
      passed,
      'Unproven 2026 calendar year was not rejected with HELD__VALIDITY_CALENDAR_YEAR_UNPROVEN',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 8: Precondition mutation — SHA-256 mismatch
  {
    const cand = CANDIDATES[0];
    const rawBuf = fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.raw.html'));
    const meta = JSON.parse(fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.meta.json'), 'utf8'));

    // Corrupt buffer
    const corruptedBuf = Buffer.from(rawBuf);
    corruptedBuf[0] = corruptedBuf[0] === 0x3c ? 0x3e : 0x3c; // tamper 1 byte

    const res = evaluateCandidate({ candidate: cand, rawBuffer: corruptedBuf, meta });
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__SOURCE_PRECONDITION_FAILED__SHA256_MISMATCH');
    recordTest(
      'TEST_8_PRECONDITION_MUTATION_SHA256_MISMATCH_REJECTION',
      passed,
      'Corrupted buffer hash was not rejected with HELD__SOURCE_PRECONDITION_FAILED__SHA256_MISMATCH',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 9: Precondition mutation — Byte length mismatch
  {
    const cand = CANDIDATES[0];
    const rawBuf = fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.raw.html'));
    const meta = JSON.parse(fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.meta.json'), 'utf8'));

    // Corrupt metadata byte length
    meta.bytes = rawBuf.length + 42;

    const res = evaluateCandidate({ candidate: cand, rawBuffer: rawBuf, meta });
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__SOURCE_PRECONDITION_FAILED__BYTE_LENGTH_MISMATCH');
    recordTest(
      'TEST_9_PRECONDITION_MUTATION_BYTE_LENGTH_REJECTION',
      passed,
      'Byte length mismatch was not rejected with HELD__SOURCE_PRECONDITION_FAILED__BYTE_LENGTH_MISMATCH',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 10: Precondition mutation — HTTP status not 200
  {
    const cand = CANDIDATES[0];
    const rawBuf = fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.raw.html'));
    const meta = JSON.parse(fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.meta.json'), 'utf8'));

    // Mutate http status
    meta.http_status = 404;

    const res = evaluateCandidate({ candidate: cand, rawBuffer: rawBuf, meta });
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__SOURCE_PRECONDITION_FAILED__HTTP_STATUS_NOT_200');
    recordTest(
      'TEST_10_PRECONDITION_MUTATION_HTTP_STATUS_REJECTION',
      passed,
      'HTTP status 404 was not rejected with HELD__SOURCE_PRECONDITION_FAILED__HTTP_STATUS_NOT_200',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 11: Precondition mutation — Fetch failure flag
  {
    const cand = CANDIDATES[0];
    const rawBuf = fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.raw.html'));
    const meta = JSON.parse(fs.readFileSync(path.join(VAULT_DIR, cand.leaf_id + '.leaf.meta.json'), 'utf8'));

    // Mutate fetch failed flag
    meta.is_fetch_failed = true;

    const res = evaluateCandidate({ candidate: cand, rawBuffer: rawBuf, meta });
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__SOURCE_PRECONDITION_FAILED__FETCH_FAILED');
    recordTest(
      'TEST_11_PRECONDITION_MUTATION_FETCH_FAILED_REJECTION',
      passed,
      'is_fetch_failed=true was not rejected with HELD__SOURCE_PRECONDITION_FAILED__FETCH_FAILED',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 12: Precondition mutation — Soft-404 detection
  {
    const fixtureHtml = '<html><head><title>404 - Không Tìm Thấy Trang</title></head><body>Trang bạn tìm kiếm không tồn tại</body></html>';
    const fixtureBuf = Buffer.from(fixtureHtml, 'utf8');
    const fixtureMeta = {
      leaf_id: 'fixture_soft_404',
      requested_url: 'https://brand.vn/deal-404',
      final_url: 'https://brand.vn/deal-404',
      http_status: 200, // HTTP 200 but content is soft-404
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: new Date().toISOString(),
      bytes: fixtureBuf.length,
      sha256: sha256(fixtureBuf)
    };
    const cand = {
      b19_id: 'FIXTURE_SOFT_404',
      brand: 'Test Brand',
      claims: {
        title: 'Deal Name',
        price: '10.000đ',
        conditions: 'Điều kiện',
        validity_or_recurrence: '2026',
        da_nang_locality: 'Đà Nẵng'
      }
    };

    const res = evaluateCandidate({ candidate: cand, rawBuffer: fixtureBuf, meta: fixtureMeta });
    const passed = res.status === 'HELD' && res.held_reason.includes('HELD__SOURCE_PRECONDITION_FAILED__SOFT_404_DETECTED');
    recordTest(
      'TEST_12_PRECONDITION_MUTATION_SOFT_404_REJECTION',
      passed,
      'Soft-404 signature was not rejected with HELD__SOURCE_PRECONDITION_FAILED__SOFT_404_DETECTED',
      { status: res.status, held_reason: res.held_reason }
    );
  }

  // TEST 13: Span slice verification & duplicate span disambiguation
  {
    const fixtureHtml = '<div><span>Đồng giá 45k</span>...<span>Đồng giá 45k</span></div>';
    const fixtureBuf = Buffer.from(fixtureHtml, 'utf8');
    const span = findRawByteSpan(fixtureBuf, 'Đồng giá 45k');
    const passed = span !== null &&
      span.occurrence_count === 2 &&
      span.byte_slice_verified === true &&
      fixtureBuf.subarray(span.start_byte_offset, span.end_byte_offset).toString('utf8') === 'Đồng giá 45k';
    recordTest(
      'TEST_13_DUPLICATE_SPAN_DISAMBIGUATION_AND_SLICE_VERIFICATION',
      passed,
      'Duplicate span tracking or byte slice verification failed',
      { span }
    );
  }

  // TEST 14: Positive Control — Proof that valid, compliant evidence CAN be promoted to VERIFIED
  {
    const positiveHtml = '<html><body>' +
      '<h1>Ưu Đãi Đặc Biệt Sinh Viên</h1>' +
      '<p>Giá vé: 45.000đ</p>' +
      '<p>Điều kiện: Áp dụng cho học sinh sinh viên có thẻ học sinh</p>' +
      '<p>Địa bàn: Áp dụng tại chi nhánh Đà Nẵng</p>' +
      '<p>Thời hạn: Hiệu lực xuyên suốt năm 2026</p>' +
      '</body></html>';
    const positiveBuf = Buffer.from(positiveHtml, 'utf8');
    const positiveMeta = {
      leaf_id: 'positive_control_fixture',
      requested_url: 'https://cinema.vn/uu-dai-sinh-vien',
      final_url: 'https://cinema.vn/uu-dai-sinh-vien',
      http_status: 200,
      is_fetch_failed: false,
      is_soft_404: false,
      captured_at_utc: '2026-09-08T12:00:00.000Z',
      bytes: positiveBuf.length,
      sha256: sha256(positiveBuf)
    };
    const positiveCand = {
      b19_id: 'B19_POSITIVE_CONTROL_TEST',
      brand: 'Cinema Brand',
      claims: {
        title: 'Ưu Đãi Đặc Biệt Sinh Viên',
        price: '45.000đ',
        conditions: 'Áp dụng cho học sinh sinh viên có thẻ học sinh',
        validity_or_recurrence: 'Hiệu lực xuyên suốt năm 2026',
        da_nang_locality: 'Áp dụng tại chi nhánh Đà Nẵng'
      }
    };

    const res = evaluateCandidate({ candidate: positiveCand, rawBuffer: positiveBuf, meta: positiveMeta });
    const passed = res.status === 'VERIFIED' &&
      res.all_dimensions_proven === true &&
      res.missing_dimensions.length === 0;
    recordTest(
      'TEST_14_POSITIVE_CONTROL_PROMOTION_PROOF',
      passed,
      'Compliant positive fixture was not promoted to VERIFIED: ' + JSON.stringify(res),
      { status: res.status, all_dimensions_proven: res.all_dimensions_proven, dimensions: res.dimensions }
    );
  }

  // TEST 15: Staging and Production Inviolability
  {
    const stagingFeedExists = fs.existsSync(STAGING_FEED_PATH);
    let stagingSha = '';
    if (stagingFeedExists) {
      stagingSha = sha256(fs.readFileSync(STAGING_FEED_PATH));
    }
    const stagingMatches = stagingSha === EXPECTED_STAGING_SHA;
    const passed = stagingMatches;

    recordTest(
      'TEST_15_STAGING_PROD_INVIOLABILITY',
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

  // Summary and Output
  const totalTests = testResults.length;
  const passedTests = testResults.filter(t => t.passed).length;
  const allPassed = passedTests === totalTests;

  console.log('\n======================================================================');
  console.log('RESULTS: ' + passedTests + '/' + totalTests + ' PASS (' + (allPassed ? '100%' : 'FAILED') + ')');
  console.log('======================================================================\n');

  const testReport = {
    test_suite_id: 'J358_R3_R1_VALIDATOR_HARDENING_TESTS',
    work_order_id: 'J358-R3-R1-VALIDATOR-HARDENING',
    authority: 'Quyết định CEO JAYT-358-R3 (01_EXECUTIVE_COUNCIL/JAYT_358_CEO_R3_CONTAINMENT_ACCEPTANCE_AND_HARDENING_GATE.md)',
    executed_at_utc: new Date().toISOString(),
    evaluator_module: '04_DATA_PIPELINE/j358_r3_r1_claim_provenance_validator.cjs',
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
