/**
 * JAYT RELEASE CANDIDATE v3.422.0 DEDICATED PREVIEW & QA TEST SUITE
 * Governing Directive: JAYT-326
 *
 * SCOPE: Rigorously verifies the standalone 24-card release candidate bundle on port 4175.
 * Asserts exact 24 card IDs, 24 external links (strict === equality), B11_01 and B11_02 disclaimers,
 * zero console errors, 100% local network requests across Desktop 1440, Tablet 768, Mobile 390.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const puppeteer = require('puppeteer');

const ROOT = path.resolve(__dirname, '..');
const RC_HEALTH_URL = 'http://127.0.0.1:4175/health';
const RC_PREVIEW_URL = 'http://127.0.0.1:4175/';
const RC_REGISTRY_PATH = path.join(ROOT, '08_RELEASE_VAULT/RELEASE_CANDIDATE_v3.422.0_REGISTRY.json');
const rcRegistry = JSON.parse(fs.readFileSync(RC_REGISTRY_PATH, 'utf8'));

// Authoritative mapping from approved registry candidate IDs to expected DOM Evidence IDs
// Corroborated against CEO Directives EZ-G/EZ-H, Batch 03 Dossier, UED Dossier, and Batch 04-11 Ingress Vault
const APPROVED_SLOT_EVIDENCE_ID_MAP = {
  'GITHUB_EDUCATION_PILOT_T2': 'FACT_EZ_G_01_GITHUB_DOCS_ELIGIBILITY',
  'BATCH03_DS_07': 'BATCH03_DS_07_DANABUS_INFORMATION',
  'J287-HK-STUDENT-POLICY-UED-20260903': 'J287_HK_STUDENT_POLICY_UED_20260903',
  'B04_02_KY_SO_TOAN_DAN_Y_TE': 'B04_02_KY_SO_TOAN_DAN_Y_TE',
  'B04_07_THU_VIEN_SO_HOC_LIEU_UED': 'B04_07_THU_VIEN_SO_HOC_LIEU_UED',
  'B04_06_AN_TOAN_TIEM_CHUNG_CDC_DANANG': 'B04_06_AN_TOAN_TIEM_CHUNG_CDC_DANANG',
  'B04_10_LICH_TIEM_CHUNG_TRE_EM_CDC_DANANG': 'B04_10_LICH_TIEM_CHUNG_TRE_EM_CDC_DANANG',
  'B05_01_LICH_TIEM_CHUNG_THAI_KY_CDC_DANANG': 'B05_01_LICH_TIEM_CHUNG_THAI_KY_CDC_DANANG',
  'B05_03_DANABUS_TUYEN_05_HOA_HIEP_NAM_BIEN_DONG': 'B05_03_DANABUS_TUYEN_05_HOA_HIEP_NAM_BIEN_DONG',
  'B06_01_DANABUS_CHUYEN_DOI_XE_BUYT_DIEN_02_13_21': 'B06_01_DANABUS_CHUYEN_DOI_XE_BUYT_DIEN_02_13_21',
  'B06_03_HUONG_DAN_DICH_VU_CONG_TRUC_TUYEN_DANANG': 'B06_03_HUONG_DAN_DICH_VU_CONG_TRUC_TUYEN_DANANG',
  'B06_02_BAN_TIN_SUC_KHOE_CONG_DONG_CDC_DANANG': 'B06_02_BAN_TIN_SUC_KHOE_CONG_DONG_CDC_DANANG',
  'B07_01_DANABUS_CHUYEN_DOI_XE_BUYT_DIEN_03_09_14': 'B07_01_DANABUS_CHUYEN_DOI_XE_BUYT_DIEN_03_09_14',
  'B07_02_CAM_NANG_AN_TOAN_SO_DEEPFAKE_1022': 'B07_02_CAM_NANG_AN_TOAN_SO_DEEPFAKE_1022',
  'B07_03_TRA_CUU_MAY_KHU_RUNG_TIM_AED_CONG_CONG_1022': 'B07_03_TRA_CUU_MAY_KHU_RUNG_TIM_AED_CONG_CONG_1022',
  'B08_01_BAN_DO_SO_UNG_PHO_LU_LUT_HOA_XUAN_1022': 'B08_01_BAN_DO_SO_UNG_PHO_LU_LUT_HOA_XUAN_1022',
  'B08_03_TIEN_ICH_SO_CONG_DONG_WIFI_AN_HAI_1022': 'B08_03_TIEN_ICH_SO_CONG_DONG_WIFI_AN_HAI_1022',
  'B09_01_DANABUS_TUYEN_11_XUAN_DIEU_BEN_XE_TIEN_SA': 'B09_01_DANABUS_TUYEN_11_XUAN_DIEU_BEN_XE_TIEN_SA',
  'B09_02_TRO_LY_SO_DANANG_AI_PHO_BIEN_PHAP_LUAT_1022': 'B09_02_TRO_LY_SO_DANANG_AI_PHO_BIEN_PHAP_LUAT_1022',
  'B09_03_CHIEN_DICH_BAO_VE_DANH_TINH_SO_MA_SO_THUE_1022': 'B09_03_CHIEN_DICH_BAO_VE_DANH_TINH_SO_MA_SO_THUE_1022',
  'B10_01_DIEM_TIEP_NHAN_THU_TUC_HANH_CHINH_TAM_KY_1022': 'B10_01_DIEM_TIEP_NHAN_THU_TUC_HANH_CHINH_TAM_KY_1022',
  'B10_02_PHO_CAP_KY_NANG_SO_VNEID_PHU_NU_1022': 'B10_02_PHO_CAP_KY_NANG_SO_VNEID_PHU_NU_1022',
  'B11_01_TRA_CUU_CHUYEN_BAY_DANANG_SMART_CITY_1022': 'B11_01_TRA_CUU_CHUYEN_BAY_DANANG_SMART_CITY_1022',
  'B11_02_HOAT_DONG_VAN_HOA_BAO_TANG_CHAM_1022': 'B11_02_HOAT_DONG_VAN_HOA_BAO_TANG_CHAM_1022'
};

async function runRcA迴Audit() {
  console.log('\n🔬 RUNNING JAYT-326 RELEASE CANDIDATE v3.422.0 (24-CARD) PREVIEW & QA SUITE...\n');
  console.log('  ℹ Current System Runtime UTC: ' + new Date().toISOString());
  console.log('  ℹ Testing dedicated preview endpoint: ' + RC_PREVIEW_URL);

  let totalTests = 0;
  let passedTests = 0;
  const testResults = [];

  async function it(name, fn) {
    totalTests++;
    try {
      await fn();
      passedTests++;
      console.log('  ✓ ' + name);
      testResults.push({ name, pass: true });
    } catch (err) {
      console.error('  ✗ ' + name);
      console.error('    Error:', err.message);
      testResults.push({ name, pass: false, error: err.message });
      throw err;
    }
  }

  // Suite 1: Health & Parity
  console.log('\n--- Suite 1: RC Health Endpoint & Artifact Parity ---');
  await it('RC Preview health endpoint returns UP, v3.422.0, and exactly 24 cards', async () => {
    const res = await fetch(RC_HEALTH_URL);
    const data = await res.json();
    assert.strictEqual(data.status, 'UP');
    assert.strictEqual(data.target_version, 'v3.422.0');
    assert.strictEqual(data.cards_count, 24);
    assert.strictEqual(data.parity, 'PERFECT_MATCH_ZERO_DRIFT');
    assert.strictEqual(data.manifest_match, true);
  });

  await it('Candidate registry contains strictly 24 entities matching pinned hash', () => {
    assert.strictEqual(rcRegistry.approved_entities_count, 24);
    assert.strictEqual(rcRegistry.approved_entities.length, 24);
    assert.strictEqual(rcRegistry.registry_pinned_sha256, 'e8703971669ad8b8e4d7e383087926a502dd6991e5eaece37e94ca410b60a501');
  });

  await it('Candidate registry entries and URLs are 100% unique (zero duplicates)', () => {
    const idSet = new Set();
    const urlSet = new Set();
    for (const item of rcRegistry.approved_entities) {
      assert.ok(!idSet.has(item.candidate_id), 'Duplicate ID detected: ' + item.candidate_id);
      assert.ok(!urlSet.has(item.external_url), 'Duplicate URL detected: ' + item.external_url);
      idSet.add(item.candidate_id);
      urlSet.add(item.external_url);
    }
    assert.strictEqual(idSet.size, 24);
    assert.strictEqual(urlSet.size, 24);
  });

  // Suite 2: Viewports & DOM Inspection
  console.log('\n--- Suite 2: Cross-Viewport DOM Verification & Exclusions (1440, 768, 390) ---');
  const viewports = [
    { name: 'Desktop 1440', width: 1440, height: 900, isMobile: false, hasTouch: false },
    { name: 'Tablet 768', width: 768, height: 1024, isMobile: true, hasTouch: true },
    { name: 'Mobile 390', width: 390, height: 844, isMobile: true, hasTouch: true }
  ];

  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });

    for (const vp of viewports) {
      const page = await browser.newPage();
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        isMobile: vp.isMobile,
        hasTouch: vp.hasTouch
      });

      const consoleErrors = [];
      const networkRequests = [];

      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      page.on('request', req => {
        networkRequests.push(req.url());
      });

      await page.goto(RC_PREVIEW_URL, { waitUntil: 'networkidle0' });

      await it('[' + vp.name + '] Strictly 24 approved cards rendered in DOM', async () => {
        const cards = await page.$$('.t2-pilot-card-section');
        assert.strictEqual(cards.length, 24);
      });

      await it('[' + vp.name + '] Strictly 24 slot Evidence IDs and URLs mapped 1-to-1 against approved evidence mapping (exact === check)', async () => {
        const domCards = await page.$$eval('.t2-pilot-card-section', sections => {
          return sections.map(sec => {
            const anchor = sec.querySelector('a[href^="http"]');
            const url = anchor ? anchor.href : null;
            const text = sec.textContent || '';
            const idMatch = text.match(/Evidence ID:\s*([A-Za-z0-9_\-]+)/);
            return {
              evidence_id: idMatch ? idMatch[1] : null,
              url: url
            };
          });
        });
        assert.strictEqual(domCards.length, 24);
        for (let i = 0; i < 24; i++) {
          const dom = domCards[i];
          const regItem = rcRegistry.approved_entities[i];
          const expectedEvidenceId = APPROVED_SLOT_EVIDENCE_ID_MAP[regItem.candidate_id];
          assert.strictEqual(dom.url, regItem.external_url, 'Slot ' + (i+1) + ' URL mismatch: DOM=' + dom.url + ' vs REG=' + regItem.external_url);
          assert.strictEqual(dom.evidence_id, expectedEvidenceId, 'Slot ' + (i+1) + ' Evidence ID mismatch: DOM=' + dom.evidence_id + ' vs EXPECTED=' + expectedEvidenceId);
        }
      });

      await it('[' + vp.name + '] Strictly 24 external links matching approved registry (exact === check)', async () => {
        const extLinks = await page.$$eval('a[href^="http"]', anchors => {
          return anchors
            .map(a => a.href)
            .filter(h => !h.startsWith('http://127.0.0.1') && !h.startsWith('http://localhost'));
        });
        assert.strictEqual(extLinks.length, 24);
        for (const item of rcRegistry.approved_entities) {
          const match = extLinks.some(link => link === item.external_url);
          assert.ok(match, 'Missing exact approved external link: ' + item.external_url);
        }
      });

      await it('[' + vp.name + '] B11_01 mandatory disclaimer rendered verbatim in DOM', async () => {
        const bodyText = await page.$eval('body', el => el.textContent);
        const b11_01_disclaimer = 'Thông tin tiện ích theo bài đăng của Cổng 1022 Đà Nẵng; không bán vé, không nhận đặt chỗ, không thu phí và không cam kết dữ liệu chuyến bay theo thời gian thực.';
        assert.ok(bodyText.includes(b11_01_disclaimer), 'B11_01 mandatory disclaimer missing in DOM');
      });

      await it('[' + vp.name + '] B11_02 mandatory disclaimer and schedule recurrence rendered verbatim in DOM', async () => {
        const bodyText = await page.$eval('body', el => el.textContent);
        const b11_02_disclaimer = 'Lịch biểu diễn văn hóa nghệ thuật định kỳ tại Bảo tàng Điêu khắc Chăm Đà Nẵng; người xem cần đối soát thông báo trực tiếp từ ban quản lý bảo tàng trong trường hợp có điều chỉnh thời tiết hoặc lịch đón tiếp ngoại giao.';
        const b11_02_schedule = 'buổi sáng các ngày 15 và 30 hằng tháng';
        assert.ok(bodyText.includes(b11_02_disclaimer), 'B11_02 mandatory disclaimer missing in DOM');
        assert.ok(bodyText.includes(b11_02_schedule), 'B11_02 schedule text missing in DOM');
      });

      await it('[' + vp.name + '] Strictly 0 excluded cards (B11_03, B10_03) rendered in DOM', async () => {
        const bodyText = await page.$eval('body', el => el.textContent);
        assert.ok(!bodyText.includes('Sông Vàng'), 'B10_03 card detected in 24-card candidate!');
        assert.ok(!bodyText.includes('B11_03'), 'B11_03 detected in candidate!');
      });

      await it('[' + vp.name + '] Strictly 0 commercial entities (Metiz, Galaxy, TNGo) in DOM', async () => {
        const bodyText = await page.$eval('body', el => el.textContent);
        assert.ok(!bodyText.includes('Metiz'));
        assert.ok(!bodyText.includes('Galaxy'));
        assert.ok(!bodyText.includes('TNGo'));
      });

      await it('[' + vp.name + '] 100% local network requests (0 external fonts/CDNs/analytics)', () => {
        const thirdParty = networkRequests.filter(u => !u.startsWith('http://127.0.0.1') && !u.startsWith('http://localhost') && !u.startsWith('data:'));
        assert.strictEqual(thirdParty.length, 0);
      });

      await it('[' + vp.name + '] Zero console errors during complete lifecycle', () => {
        assert.strictEqual(consoleErrors.length, 0);
      });

      await page.close();
    }
  } finally {
    if (browser) await browser.close();
  }

  // Suite 3: Negative Security Testing ("ID sai, URL đúng" Fail-Closed Enforcement)
  console.log('\n--- Suite 3: Negative Security Testing ("ID sai, URL đúng" Fail-Closed) ---');
  await it('Negative test: Card with valid approved URL but spoofed/mismatched Evidence ID is strictly blocked by validator', () => {
    function validateSlotIdentity(domCard, slotIndex, registryItem) {
      const expectedEvidenceId = APPROVED_SLOT_EVIDENCE_ID_MAP[registryItem.candidate_id];
      assert.strictEqual(
        domCard.url,
        registryItem.external_url,
        `Slot ${slotIndex + 1} URL mismatch: DOM=${domCard.url} vs REG=${registryItem.external_url}`
      );
      assert.strictEqual(
        domCard.evidence_id,
        expectedEvidenceId,
        `Slot ${slotIndex + 1} Evidence ID mismatch: DOM="${domCard.evidence_id}" vs EXPECTED="${expectedEvidenceId}"`
      );
    }

    // Negative Case 1: Slot 23 (B11_01) has correct URL but spoofed Evidence ID
    const slot23Reg = rcRegistry.approved_entities[22];
    const tamperedSlot23 = {
      evidence_id: 'SPOOFED_ID_MALICIOUS_CANDIDATE',
      url: slot23Reg.external_url // https://1022.vn/ra-mat-tien-ich-thong-tin-chuyen-bay-tren-ung-dung-danang-smart-city/
    };

    let slot23Blocked = false;
    try {
      validateSlotIdentity(tamperedSlot23, 22, slot23Reg);
    } catch (err) {
      if (err.name === 'AssertionError' && err.message.includes('Slot 23 Evidence ID mismatch: DOM="SPOOFED_ID_MALICIOUS_CANDIDATE" vs EXPECTED="B11_01_TRA_CUU_CHUYEN_BAY_DANANG_SMART_CITY_1022"')) {
        slot23Blocked = true;
        console.log('    [NEGATIVE_TEST_PASS] Blocked spoofed Evidence ID on Slot 23 (B11_01) despite valid URL.');
      }
    }
    assert.strictEqual(slot23Blocked, true, 'Negative test failed: Validator did not block spoofed ID on Slot 23');

    // Negative Case 2: Slot 1 (GitHub) has correct URL but swapped Evidence ID
    const slot1Reg = rcRegistry.approved_entities[0];
    const tamperedSlot1 = {
      evidence_id: 'FACT_EZ_G_02_SWAPPED_EVIDENCE',
      url: slot1Reg.external_url // https://docs.github.com/en/education
    };

    let slot1Blocked = false;
    try {
      validateSlotIdentity(tamperedSlot1, 0, slot1Reg);
    } catch (err) {
      if (err.name === 'AssertionError' && err.message.includes('Slot 1 Evidence ID mismatch: DOM="FACT_EZ_G_02_SWAPPED_EVIDENCE" vs EXPECTED="FACT_EZ_G_01_GITHUB_DOCS_ELIGIBILITY"')) {
        slot1Blocked = true;
        console.log('    [NEGATIVE_TEST_PASS] Blocked swapped Evidence ID on Slot 1 (GitHub) despite valid URL.');
      }
    }
    assert.strictEqual(slot1Blocked, true, 'Negative test failed: Validator did not block swapped ID on Slot 1');

    // Negative Case 3: Contrast with faulty legacy assertion (assert.ok would have falsely passed)
    assert.ok(tamperedSlot23.evidence_id, 'Legacy assert.ok blindly passes any non-empty string!');
    console.log('    [FORENSIC_PROOF] Demonstrated: legacy assert.ok(dom.evidence_id) was permissive; assert.strictEqual() provides true fail-closed security.');
  });

  // Suite 4: Commercial Locks & Rollback Standby
  console.log('\n--- Suite 4: Commercial Locks & Production Isolation ---');
  await it('Deals feed is strictly empty array [] and voucher count is 0', () => {
    const deals = JSON.parse(fs.readFileSync(path.join(ROOT, '05_DEAL_AND_AFFILIATE/deals_feed.json'), 'utf8'));
    assert.strictEqual(deals.length, 0);
  });

  await it('Production v3.421.0 rollback standby bundle is verified on disk (22 cards)', () => {
    const rollbackRoot = path.join(ROOT, 'deploy_personal_v3421');
    assert.ok(fs.existsSync(rollbackRoot));
    const jsPath = path.join(rollbackRoot, 'jayt_storefront_v3421.js');
    const jsSha = require('crypto').createHash('sha256').update(fs.readFileSync(jsPath)).digest('hex');
    assert.strictEqual(jsSha, '61ebf288537aa77d52b7fdb8763dd57b16beea039b7005ba7d9f13fdb9bb4319');
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' JAYT-326 RC v3.422.0 QA TESTS PASSED!\n');

  // Save QA receipt
  const receipt = {
    receipt_id: 'RC_V3422_QA_RECEIPT',
    governing_directive: 'JAYT-326_327',
    generated_at_utc: new Date().toISOString(),
    preview_url: RC_PREVIEW_URL,
    health_url: RC_HEALTH_URL,
    target_version: 'v3.422.0',
    total_tests: totalTests,
    passed_tests: passedTests,
    pass: passedTests === totalTests,
    cards_count: 24,
    exact_url_parity: '24/24_MATCHED',
    slot_evidence_id_verification: '24/24_MATCHED_EXACT_STRICT_EQUAL',
    negative_security_test: 'PASS__SPOOFED_ID_WITH_VALID_URL_BLOCKED',
    b11_01_disclaimer_verified: true,
    b11_02_disclaimer_verified: true,
    b11_02_schedule_recurrence_verified: true,
    commercial_locks_verified: true,
    rollback_standby_v3421_verified: true,
    test_results: testResults
  };

  const receiptPath = path.join(ROOT, '07_QUALITY_ASSURANCE/runtime_evidence/RC_V3422_QA_RECEIPT.json');
  fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2) + '\n');
  console.log('Saved QA receipt to:', receiptPath);
}

runRcA迴Audit().catch(err => {
  console.error('\n💥 QA SUITE FAILED:', err.message);
  process.exit(1);
});
