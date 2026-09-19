/**
 * BATCH 14 COMMERCIAL STAGING DOM & A11Y AUDIT (JAYT-330-R2)
 * 
 * Verifies live Staging (:4176) after Batch 14 Hydration:
 * 1. HTTP 200 on /commercial_test.html and /approved_commercial_cards.json
 * 2. Exactly 22 unique cards rendered in DOM (.commercial-card)
 * 3. 22 rendered IDs match authorized approval IDs 1-to-1
 * 4. Zero console errors, zero uncaught page errors
 * 5. 100% Clean: Zero affiliate/tracking links in any rendered href
 * 6. Galaxy Cinema rendered as "FROM_PRICE" ("từ 45.000 VNĐ")
 * 7. Phúc Long rendered as MEMBER_POLICY without numeric price
 * 8. Metiz Cinema geographic scope maintained as UNVERIFIED
 * 9. Responsive layout on 3 viewports (1440px Desktop, 768px Tablet, 390px Mobile) with zero overflow
 * 10. Usable keyboard & touch interaction (A11y)
 * 11. Production boundary verified: PROJECT_MEMORY.md unchanged during this audit, zero prod modification
 * 12. Emits 07_QUALITY_ASSURANCE/runtime_evidence/STAGING_BATCH_14_HYDRATION_RECEIPT.json
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const AUTHORIZED_PACKAGE_SHA256 = '4daadbcd4115d0d878dc66410173629cee8590dd8e7069416579c6767be0b9b0';
const PRE_HYDRATION_SHA256 = '9563d5a2eb979a60595cc81c19a7f792a09e98ed25a49c30d8248c0e05af6906';
const STAGING_URL = 'http://127.0.0.1:4176/commercial_test.html';
const STAGING_JSON_URL = 'http://127.0.0.1:4176/approved_commercial_cards.json';
const RECEIPT_R3_PATH = path.resolve('07_QUALITY_ASSURANCE/runtime_evidence/STAGING_BATCH_14_HYDRATION_RECEIPT_R3.json');
const RECEIPT_LEGACY_PATH = path.resolve('07_QUALITY_ASSURANCE/runtime_evidence/STAGING_BATCH_14_HYDRATION_RECEIPT.json');

function computeSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const CANONICAL_UPDATE_MAPPINGS = [
  { batch_candidate_id: 'B14_JB_70144', updates_staging_card_id: 'PROD_JOLLIBEE_COMBO_02', brand: 'jollibee' },
  { batch_candidate_id: 'B14_PL_DTX64GB', updates_staging_card_id: 'B12_15', brand: 'phi_long' },
  { batch_candidate_id: 'B14_DMX_M170_DEN', updates_staging_card_id: 'B12_13', brand: 'dien_may_xanh' },
  { batch_candidate_id: 'B14_PLONG_MEMBER_BENEFITS', updates_staging_card_id: 'B12_05', brand: 'phuclong' }
];

async function runDomAudit() {
  console.log('=== BẮT ĐẦU KIỂM THỬ TOÀN DIỆN DOM & A11Y STAGING BATCH 14 (JAYT-330-R3) ===\n');

  const stagingCardsPath = path.resolve('staging_workspace_j328/approved_commercial_cards.json');
  const postHydrationHash = computeSha256(stagingCardsPath);
  const stagingCardsOnDisk = JSON.parse(fs.readFileSync(stagingCardsPath, 'utf8'));

  const approvalPath = path.resolve('06_TRUST_AND_EVIDENCE/batch_14_catalog_vault/BATCH_14_CATALOG_PUBLIC_APPROVAL_STAGING_ONLY.json');
  const approval = JSON.parse(fs.readFileSync(approvalPath, 'utf8'));
  const incrementalApprovalPath = path.resolve('06_TRUST_AND_EVIDENCE/jayt_333_hot_campaign_vault/J333_HOT_05_JOLLIBEE_SPICY_SPAGHETTI_40K_PUBLIC_APPROVAL_STAGING_ONLY.json');
  const incrementalApproval = JSON.parse(fs.readFileSync(incrementalApprovalPath, 'utf8'));
  const galaxyApprovalPath = path.resolve('06_TRUST_AND_EVIDENCE/jayt_333_hot_campaign_vault/J333_HOT_02_GALAXY_U22_PUBLIC_APPROVAL_STAGING_ONLY.json');
  const galaxyApproval = JSON.parse(fs.readFileSync(galaxyApprovalPath, 'utf8'));
  const expectedIds = [...approval.approved_candidate_ids, incrementalApproval.candidate_id, galaxyApproval.candidate_id];
  const expectedCardCount = expectedIds.length;

  const memoryPath = path.resolve('PROJECT_MEMORY.md');
  const memorySha256 = computeSha256(memoryPath);

  // Production artifact hashes
  const prodIndexSha = computeSha256(path.resolve('deploy_personal_v3422/index.html'));
  const prodJsSha = computeSha256(path.resolve('deploy_personal_v3422/jayt_storefront_v3422.js'));
  const vaultIndexSha = computeSha256(path.resolve('08_RELEASE_VAULT/candidates/v3.422.0/index.html'));
  const vaultJsSha = computeSha256(path.resolve('08_RELEASE_VAULT/candidates/v3.422.0/jayt_storefront_v3422.js'));

  const expectedProdIndexSha = 'bbc522387901d516bf37bc9d0c7516df913269a2fae166e2c51ce0778bf53f00';
  const expectedProdJsSha = '9c2e6bfe6d9f7be7ac8e3d80cfb5848857c1462f7a1b908046e0b3c0a71d8b16';

  assert.strictEqual(prodIndexSha, expectedProdIndexSha, 'Production index.html hash must match v3.422.0');
  assert.strictEqual(prodJsSha, expectedProdJsSha, 'Production storefront JS hash must match v3.422.0');
  assert.strictEqual(vaultIndexSha, expectedProdIndexSha, 'Release vault index.html hash must match v3.422.0');
  assert.strictEqual(vaultJsSha, expectedProdJsSha, 'Release vault storefront JS hash must match v3.422.0');
  console.log('0. Đối soát tính toàn vẹn Production Artifacts (v3.422.0): KHỚP 100% BIT-FOR-BIT.\n');

  // Verify Canonical Update Mappings on disk
  console.log('1. Thẩm tra bảng ánh xạ cập nhật chuẩn (Canonical Update Mappings):');
  for (const m of CANONICAL_UPDATE_MAPPINGS) {
    const card = stagingCardsOnDisk.find(c => c.card_id === m.batch_candidate_id);
    assert.ok(card, `Card ${m.batch_candidate_id} must exist in Staging`);
    assert.strictEqual(card.legacy_card_id, m.updates_staging_card_id,
      `Mapping mismatch for ${m.batch_candidate_id}: expected ${m.updates_staging_card_id}, got ${card.legacy_card_id}`);
    console.log(`   [PASS] ${m.batch_candidate_id} ➔ ${m.updates_staging_card_id} (${m.brand})`);
  }

  const receipt = {
    receipt_name: 'STAGING_BATCH_14_HYDRATION_RECEIPT_R3',
    work_order: 'JAYT-330-R3',
    decision_document: 'BATCH_14_CATALOG_PUBLIC_APPROVAL_STAGING_ONLY',
    generated_at_utc: new Date().toISOString(),
    environment: {
      server_target: STAGING_URL,
      data_endpoint: STAGING_JSON_URL,
      browser: 'Headless Chromium (Puppeteer)'
    },
    hashes: {
      authorized_package_sha256: AUTHORIZED_PACKAGE_SHA256,
      pre_hydration_catalog_sha256: PRE_HYDRATION_SHA256,
      post_hydration_catalog_sha256: postHydrationHash,
      project_memory_sha256: memorySha256,
      memory_pre_audit_sha256: memorySha256,
      memory_post_audit_sha256: null,
      memory_untouched_during_audit: false
    },
    production_boundary: {
      production_deployment_authorized: false,
      production_modified: false,
      production_baseline_frozen: 'v3.422.0',
      production_cards_count: 24,
      artifacts_parity: {
        'deploy_personal_v3422/index.html': { sha256: prodIndexSha, match: true },
        'deploy_personal_v3422/jayt_storefront_v3422.js': { sha256: prodJsSha, match: true },
        '08_RELEASE_VAULT/candidates/v3.422.0/index.html': { sha256: vaultIndexSha, match: true },
        '08_RELEASE_VAULT/candidates/v3.422.0/jayt_storefront_v3422.js': { sha256: vaultJsSha, match: true }
      }
    },
    canonical_update_mappings: CANONICAL_UPDATE_MAPPINGS,
    all_22_display_urls: [],
    rendered_ids: [],
    rendered_cards_count: 0,
    tests: [],
    console_logs: [],
    page_errors: [],
    viewport_tests: [],
    keyboard_navigation_audit: {
      tested_links_count: 0,
      all_22_links_reachable: false,
      visible_focus_verified: false,
      accessible_names_verified: false,
      stops: []
    },
    touch_target_audit_390px: {
      tested_targets_count: 0,
      min_dimension_target_px: 44,
      all_targets_pass_44px: false,
      failures: [],
      measurements: []
    },
    wcag_aa_contrast_audit: {
      all_pass_wcag_aa: false,
      results: []
    },
    all_passed: false
  };

  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Listen to console
    page.on('console', msg => {
      const entry = { type: msg.type(), text: msg.text() };
      receipt.console_logs.push(entry);
      if (msg.type() === 'error') {
        console.error(`[BROWSER ERROR] ${msg.text()}`);
      }
    });

    // Listen to page errors
    page.on('pageerror', err => {
      receipt.page_errors.push(err.message);
      console.error(`[PAGE UNCAUGHT ERROR] ${err.message}`);
    });

    // 1. HTTP 200 Navigation
    console.log(`1. Điều hướng tới ${STAGING_URL} ...`);
    const resp = await page.goto(STAGING_URL, { waitUntil: 'networkidle0', timeout: 10000 });
    assert.strictEqual(resp.status(), 200, 'Page must return HTTP 200');
    console.log('   [PASS] HTTP 200 OK.');

    receipt.tests.push({
      id: 'HTTP_200_AVAILABILITY',
      status: 'PASS',
      url: STAGING_URL,
      http_status: resp.status()
    });

    // 2. Load and Mount Cards
    console.log(`\n2. Nạp và render ${expectedCardCount} thẻ thương mại đã được duyệt...`);
    const loadResult = await page.evaluate(async () => {
      return await window.loadAndMountRealApprovedCards();
    });
    console.log('   Load Result:', loadResult);
    assert.strictEqual(loadResult.mountedCount, expectedCardCount, `Expected ${expectedCardCount} mounted cards, got ${loadResult.mountedCount}`);
    console.log(`   [PASS] Đã gắn ${expectedCardCount} thẻ thương mại vào DOM.`);

    receipt.tests.push({
      id: 'CARD_MOUNT_COUNT',
      status: 'PASS',
      mounted_count: loadResult.mountedCount,
      total_candidates: loadResult.totalCandidates
    });

    // 3. Detailed DOM Extraction & Inspection
    console.log(`\n3. Kiểm tra chi tiết ${expectedCardCount} thẻ trong DOM:`);
    const domCards = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('.commercial-card')];
      return cards.map(c => {
        const id = c.getAttribute('data-sku') || c.getAttribute('data-card-id');
        const cardType = c.getAttribute('data-card-type') || 'COMMERCIAL_PRICE_OBSERVATION';
        const title = c.querySelector('.product-title')?.textContent?.trim();
        const retailer = c.querySelector('.source-retailer')?.textContent?.trim();
        const price = c.querySelector('.observed-price')?.textContent?.trim();
        const disclaimer = c.querySelector('.disclaimer')?.textContent?.trim();
        const geoScope = c.querySelector('.geographic-scope')?.textContent?.trim();
        const provHash = c.querySelector('.provenance-hash')?.textContent?.trim();
        const sourceLink = c.querySelector('.source-link-btn');
        const href = sourceLink?.getAttribute('href');
        const target = sourceLink?.getAttribute('target');
        const rel = sourceLink?.getAttribute('rel');
        const ariaLabel = sourceLink?.getAttribute('aria-label');

        return {
          id,
          cardType,
          title,
          retailer,
          price,
          disclaimer,
          geoScope,
          provHash,
          href,
          target,
          rel,
          ariaLabel
        };
      });
    });

    assert.strictEqual(domCards.length, expectedCardCount, `Must have exactly ${expectedCardCount} DOM card elements`);
    receipt.rendered_cards_count = domCards.length;
    receipt.rendered_ids = domCards.map(c => c.id);

    // Verify all 22 IDs match approval order
    console.log('   Rendered Card IDs:');
    domCards.forEach((c, idx) => console.log(`     [${idx + 1}] ${c.id} - ${c.title} (${c.price || 'MEMBER_POLICY'})`));

    assert.deepStrictEqual(receipt.rendered_ids, expectedIds, 'Rendered IDs must strictly match approved_candidate_ids');
    console.log(`   [PASS] ${expectedCardCount}/${expectedCardCount} ID trùng khớp chính xác với các quyết định CEO phê duyệt.`);

    // 4. Verify 22 Display URLs & Item URL Specificity for Phi Long
    console.log(`\n5. Kiểm tra ${expectedCardCount} liên kết nguồn khảo sát (Display URLs) & Tránh sáp nhập URL Phi Long:`);
    const phiLongCards = domCards.filter(c => c.id.startsWith('B14_PL_'));
    assert.strictEqual(phiLongCards.length, 13, 'Must have exactly 13 Phi Long cards in DOM');

    const phiLongHrefs = new Set(phiLongCards.map(c => c.href));
    assert.strictEqual(phiLongHrefs.size, 13, 'All 13 Phi Long cards must have distinct candidate-specific item_urls');
    console.log('   [PASS] 13/13 sản phẩm Phi Long mở chính xác trang item_url riêng biệt.');

    for (const card of domCards) {
      assert.ok(card.href, `Card ${card.id} must have source link`);
      assert.strictEqual(card.target, '_blank', `Card ${card.id} link must target _blank`);
      assert.strictEqual(card.rel, 'noopener noreferrer', `Card ${card.id} must have rel="noopener noreferrer"`);
      assert.ok(!/[?&](aff|utm_|ref|subid|click_id|tracking)=/i.test(card.href),
        `Card ${card.id} contains forbidden tracking/affiliate parameter: ${card.href}`);
      assert.ok(card.ariaLabel && card.ariaLabel.includes('mở trong tab mới'),
        `Card ${card.id} missing accessible new-tab disclosure in aria-label`);

      receipt.all_22_display_urls.push({
        card_id: card.id,
        display_url: card.href,
        brand: card.id.split('_')[1],
        target: card.target,
        rel: card.rel,
        accessible_name: card.ariaLabel
      });
    }
    console.log('   [PASS] 100% Link sạch: Zero affiliate, zero UTM tracking, đầy đủ rel="noopener noreferrer".');

    receipt.tests.push({
      id: 'AFFILIATE_AND_TRACKING_PROHIBITION',
      status: 'PASS',
      audited_links_count: domCards.length,
      affiliate_detected: false
    });

    // 5. Verify Brand-Specific Requirements
    // 5.1 Galaxy Cinema
    const galaxyDom = domCards.find(c => c.id === 'B14_GALAXY_DANANG_TARIFF');
    assert.ok(galaxyDom, 'Galaxy Cinema card must exist in DOM');
    assert.ok(galaxyDom.price.includes('từ 45.000 VNĐ'), `Galaxy price must render as FROM_PRICE, got: "${galaxyDom.price}"`);
    assert.ok(galaxyDom.geoScope.includes('Đã xác minh'), 'Galaxy must have verified Da Nang scope');
    console.log(`   [PASS] Galaxy Cinema: "${galaxyDom.price}" | "${galaxyDom.geoScope}"`);

    // 5.2 Phuc Long Member Policy
    const phucLongDom = domCards.find(c => c.id === 'B14_PLONG_MEMBER_BENEFITS');
    assert.ok(phucLongDom, 'Phuc Long member policy card must exist in DOM');
    assert.strictEqual(phucLongDom.cardType, 'LOCAL_MEMBER_BENEFIT', 'Phuc Long must have LOCAL_MEMBER_BENEFIT card type');
    assert.strictEqual(phucLongDom.price, undefined, 'Phuc Long must NOT render an observed retail price');
    console.log(`   [PASS] Phúc Long: Quyền lợi hội viên (LOCAL_MEMBER_BENEFIT) - Không gán giá bán lẻ 0đ.`);

    // 5.3 Metiz Cinema
    const metizDom = domCards.find(c => c.id === 'B14_METIZ_U22_2D');
    assert.ok(metizDom, 'Metiz card must exist in DOM');
    assert.ok(metizDom.price.includes('55.000 VNĐ'), `Metiz price must be 55.000 VNĐ, got: "${metizDom.price}"`);
    assert.ok(metizDom.geoScope.includes('Đã xác minh'), 'Metiz geographic scope must be VERIFIED from the approved locality amendment');
    console.log(`   [PASS] Metiz Cinema: "${metizDom.price}" | "${metizDom.geoScope}"`);

    receipt.tests.push({
      id: 'BRAND_NORMALIZATION_VALIDATION',
      status: 'PASS',
      galaxy_from_price_verified: true,
      phuclong_member_policy_no_price_verified: true,
      metiz_verified_scope_verified: true
    });

    // 6. Multi-Viewport Responsive & Zero Overflow Audit
    console.log('\n6. Kiểm thử Responsive & Tràn trang trên 3 Viewport:');
    const viewports = [
      { name: 'Desktop', width: 1440, height: 900 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Mobile', width: 390, height: 844 }
    ];

    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await new Promise(r => setTimeout(r, 200));

      const overflow = await page.evaluate(() => {
        const scrollW = document.documentElement.scrollWidth;
        const clientW = document.documentElement.clientWidth;
        return {
          scrollW,
          clientW,
          hasOverflow: scrollW > clientW
        };
      });

      assert.strictEqual(overflow.hasOverflow, false, `Viewport ${vp.name} (${vp.width}px) has horizontal overflow!`);
      console.log(`   [PASS] Viewport ${vp.name} (${vp.width}x${vp.height}px): scrollWidth=${overflow.scrollW}, clientWidth=${overflow.clientW} (KHÔNG TRÀN NGANG).`);

      receipt.viewport_tests.push({
        name: vp.name,
        width: vp.width,
        height: vp.height,
        scroll_width: overflow.scrollW,
        client_width: overflow.clientW,
        horizontal_overflow: overflow.hasOverflow,
        status: 'PASS'
      });
    }

    // 7. Complete Keyboard & Focus Navigation Audit across ALL 22 Links
    console.log(`\n7. Kiểm thử Điều hướng Bàn phím & Focus trên TOÀN BỘ ${expectedCardCount}/${expectedCardCount} Liên kết:`);
    await page.setViewport({ width: 1440, height: 900 });

    // Reset focus to top
    await page.evaluate(() => {
      window.scrollTo(0, 0);
      document.body.focus();
    });

    const expectedFilterOrder = ['ALL', 'COUNTER_DEAL', 'BRAND_PROGRAM', 'APP_HIDDEN_CODE', 'VALUE_RADAR'];
    const keyboardStops = [];
    const totalExpectedStops = expectedFilterOrder.length + expectedIds.length;
    for (let i = 0; i < totalExpectedStops; i++) {
      await page.keyboard.press('Tab');
      const stopInfo = await page.evaluate((index) => {
        const active = document.activeElement;
        if (!active) return null;
        const isSourceLink = active.classList.contains('source-link-btn');
        const isTierFilter = active.classList.contains('tier-filter');
        const card = active.closest('.commercial-card');
        const cardId = card ? (card.getAttribute('data-sku') || card.getAttribute('data-card-id')) : null;
        const style = window.getComputedStyle(active);
        const hasVisibleFocus = style.outlineStyle !== 'none' || parseInt(style.outlineWidth) > 0;
        const accessibleName = active.getAttribute('aria-label') || active.textContent?.trim();
        const href = active.getAttribute('href');

        return {
          stop_number: index + 1,
          is_source_link: isSourceLink,
          is_tier_filter: isTierFilter,
          filter: active.getAttribute('data-filter'),
          card_id: cardId,
          href,
          accessible_name: accessibleName,
          has_visible_focus: hasVisibleFocus,
          outline_style: style.outlineStyle,
          outline_color: style.outlineColor,
          new_tab_disclosed: isSourceLink ? accessibleName.includes('mở trong tab mới') : null
        };
      }, i);

      assert.ok(stopInfo, `Tab stop ${i + 1} must focus an active element`);
      assert.strictEqual(stopInfo.has_visible_focus, true, `Tab stop ${i + 1} must have visible focus`);
      if (i < expectedFilterOrder.length) {
        assert.strictEqual(stopInfo.is_tier_filter, true, `Tab stop ${i + 1} must focus a .tier-filter`);
        assert.strictEqual(stopInfo.filter, expectedFilterOrder[i], `Unexpected filter order at Tab stop ${i + 1}`);
      } else {
        const linkIndex = i - expectedFilterOrder.length;
        assert.strictEqual(stopInfo.is_source_link, true, `Tab stop ${i + 1} must focus a .source-link-btn`);
        assert.strictEqual(stopInfo.card_id, expectedIds[linkIndex],
          `Tab stop ${i + 1} focused card ${stopInfo.card_id}, expected ${expectedIds[linkIndex]}`);
        assert.strictEqual(stopInfo.new_tab_disclosed, true, `Tab stop ${i + 1} must disclose new tab in accessible name`);
      }

      keyboardStops.push(stopInfo);
    }

    assert.strictEqual(keyboardStops.length, totalExpectedStops, `Must test exactly ${totalExpectedStops} keyboard Tab stops`);
    console.log(`   [PASS] Đã kiểm tra 5 bộ lọc + ${expectedCardCount} liên kết bằng phím Tab: focus hiển thị và accessible name đạt yêu cầu.`);

    receipt.keyboard_navigation_audit = {
      tested_filter_count: expectedFilterOrder.length,
      tested_links_count: expectedIds.length,
      all_22_links_reachable: true,
      visible_focus_verified: true,
      accessible_names_verified: true,
      stops: keyboardStops
    };

    // 8. Mobile Touch Target Size Audit (390px Viewport >= 44x44 CSS px)
    console.log('\n8. Kiểm thử Kích thước Touch Target trên Viewport Mobile (390px):');
    await page.setViewport({ width: 390, height: 844 });
    await new Promise(r => setTimeout(r, 200));

    const touchMeasurements = await page.evaluate(() => {
      const buttons = [...document.querySelectorAll('.source-link-btn')];
      return buttons.map((btn, idx) => {
        const rect = btn.getBoundingClientRect();
        const card = btn.closest('.commercial-card');
        const cardId = card ? (card.getAttribute('data-sku') || card.getAttribute('data-card-id')) : `index_${idx}`;
        const width = Math.round(rect.width * 10) / 10;
        const height = Math.round(rect.height * 10) / 10;
        const passesMin44 = width >= 44 && height >= 44;

        return {
          index: idx + 1,
          card_id: cardId,
          target_selector: '.source-link-btn',
          width,
          height,
          passes_min_44px: passesMin44
        };
      });
    });

    const touchFailures = touchMeasurements.filter(m => !m.passes_min_44px);
    assert.strictEqual(touchFailures.length, 0,
      `Detected ${touchFailures.length} touch targets failing 44x44px minimum: ${JSON.stringify(touchFailures)}`);
    console.log(`   [PASS] ${expectedCardCount}/${expectedCardCount} Touch targets đạt kích thước tối thiểu 44×44px (Chiều rộng: ${touchMeasurements[0].width}px, Chiều cao: ${touchMeasurements[0].height}px).`);

    receipt.touch_target_audit_390px = {
      tested_targets_count: touchMeasurements.length,
      min_dimension_target_px: 44,
      all_targets_pass_44px: true,
      failures: touchFailures,
      measurements: touchMeasurements
    };

    // 9. WCAG AA Contrast Ratio Audit
    console.log('\n9. Đo đạc & Kiểm toán Tỷ lệ Tương phản WCAG AA:');
    const contrastResults = await page.evaluate(() => {
      function parseRgb(rgbStr, bgRgb = [30, 41, 59]) {
        if (!rgbStr) return [0, 0, 0];
        const match = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/i);
        if (match) {
          const r = parseInt(match[1]);
          const g = parseInt(match[2]);
          const b = parseInt(match[3]);
          const a = match[4] !== undefined ? parseFloat(match[4]) : 1.0;
          if (a < 1.0 && bgRgb) {
            return [
              Math.round(r * a + bgRgb[0] * (1 - a)),
              Math.round(g * a + bgRgb[1] * (1 - a)),
              Math.round(b * a + bgRgb[2] * (1 - a))
            ];
          }
          return [r, g, b];
        }
        return [0, 0, 0];
      }

      function getLuminance(r, g, b) {
        const a = [r, g, b].map(v => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
      }

      function getContrast(rgb1, rgb2) {
        const l1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
        const l2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);
        return Math.round(((lighter + 0.05) / (darker + 0.05)) * 100) / 100;
      }

      const checks = [];

      // 1. Card Background
      const card = document.querySelector('.commercial-card');
      const cardBg = parseRgb(window.getComputedStyle(card).backgroundColor);

      // 2. Product Title
      const title = document.querySelector('.product-title');
      const titleFg = parseRgb(window.getComputedStyle(title).color);
      const titleContrast = getContrast(titleFg, cardBg);
      checks.push({
        element: 'Product Title (.product-title)',
        type: 'Normal/Large Text',
        measured_fg: window.getComputedStyle(title).color,
        measured_bg: window.getComputedStyle(card).backgroundColor,
        contrast_ratio: titleContrast,
        required_ratio: 4.5,
        passes_wcag_aa: titleContrast >= 4.5
      });

      // 3. Retailer Name
      const retailer = document.querySelector('.source-retailer');
      const retFg = parseRgb(window.getComputedStyle(retailer).color);
      const retContrast = getContrast(retFg, cardBg);
      checks.push({
        element: 'Retailer Name (.source-retailer)',
        type: 'Normal Text',
        measured_fg: window.getComputedStyle(retailer).color,
        measured_bg: window.getComputedStyle(card).backgroundColor,
        contrast_ratio: retContrast,
        required_ratio: 4.5,
        passes_wcag_aa: retContrast >= 4.5
      });

      // 4. Observed Price
      const priceStrong = document.querySelector('.observed-price strong');
      const priceFg = parseRgb(window.getComputedStyle(priceStrong).color);
      const priceContrast = getContrast(priceFg, cardBg);
      checks.push({
        element: 'Observed Price (.observed-price strong)',
        type: 'Large Text / Accent',
        measured_fg: window.getComputedStyle(priceStrong).color,
        measured_bg: window.getComputedStyle(card).backgroundColor,
        contrast_ratio: priceContrast,
        required_ratio: 4.5,
        passes_wcag_aa: priceContrast >= 4.5
      });

      // 5. Disclaimer Text
      const disclaimer = document.querySelector('.disclaimer');
      const discFg = parseRgb(window.getComputedStyle(disclaimer).color);
      const discBg = parseRgb(window.getComputedStyle(disclaimer).backgroundColor);
      const discContrast = getContrast(discFg, discBg);
      checks.push({
        element: 'Disclaimer (.disclaimer)',
        type: 'Normal Text',
        measured_fg: window.getComputedStyle(disclaimer).color,
        measured_bg: window.getComputedStyle(disclaimer).backgroundColor,
        contrast_ratio: discContrast,
        required_ratio: 4.5,
        passes_wcag_aa: discContrast >= 4.5
      });

      // 6. Action Link Button Text on Button Background
      const btn = document.querySelector('.source-link-btn');
      const btnFg = parseRgb(window.getComputedStyle(btn).color);
      const btnBg = parseRgb(window.getComputedStyle(btn).backgroundColor);
      const btnContrast = getContrast(btnFg, btnBg);
      checks.push({
        element: 'Action Link Button (.source-link-btn)',
        type: 'Normal Text on Button BG',
        measured_fg: window.getComputedStyle(btn).color,
        measured_bg: window.getComputedStyle(btn).backgroundColor,
        contrast_ratio: btnContrast,
        required_ratio: 4.5,
        passes_wcag_aa: btnContrast >= 4.5
      });

      // 7. Focus Indicator vs Card BG
      const focusColor = [56, 189, 248]; // #38bdf8
      const focusContrast = getContrast(focusColor, cardBg);
      checks.push({
        element: 'Focus Indicator (outline on card BG)',
        type: 'Non-text Component',
        measured_fg: 'rgb(56, 189, 248)',
        measured_bg: window.getComputedStyle(card).backgroundColor,
        contrast_ratio: focusContrast,
        required_ratio: 3.0,
        passes_wcag_aa: focusContrast >= 3.0
      });

      return checks;
    });

    for (const c of contrastResults) {
      assert.strictEqual(c.passes_wcag_aa, true,
        `Contrast violation on ${c.element}: measured ${c.contrast_ratio}:1, required ${c.required_ratio}:1`);
      console.log(`   [PASS] ${c.element}: ${c.contrast_ratio}:1 (Yêu cầu >= ${c.required_ratio}:1)`);
    }

    receipt.wcag_aa_contrast_audit = {
      all_pass_wcag_aa: true,
      results: contrastResults
    };

    // 10. Console and Page Errors Check
    const errors = receipt.console_logs.filter(l => l.type === 'error');
    assert.strictEqual(errors.length, 0, `Expected 0 console errors, got ${errors.length}`);
    assert.strictEqual(receipt.page_errors.length, 0, `Expected 0 uncaught page errors, got ${receipt.page_errors.length}`);
    console.log('\n10. Kiểm toán lỗi trình duyệt: 0 console errors, 0 uncaught exceptions [PASS]');

    // 11. Production Boundary Verification
    const memoryPostAuditSha256 = computeSha256(memoryPath);
    assert.strictEqual(memoryPostAuditSha256, memorySha256, 'PROJECT_MEMORY.md changed during DOM audit');
    receipt.hashes.memory_post_audit_sha256 = memoryPostAuditSha256;
    receipt.hashes.memory_untouched_during_audit = true;
    console.log(`\n11. Biên giới Production: Sổ cái PROJECT_MEMORY.md không đổi trong phiên audit (${memorySha256}) [PASS]`);

    receipt.all_passed = true;
    console.log('\n=== TẤT CẢ CÁC MỤC KIỂM THỬ DOM, RUNTIME, A11Y & WCAG AA ĐẠT 100% ===\n');

  } catch (err) {
    console.error('LỖI KIỂM THỬ DOM STAGING:', err);
    receipt.all_passed = false;
    receipt.error_message = err.message;
    throw err;
  } finally {
    await browser.close();
  }

  // Write Receipts
  fs.writeFileSync(RECEIPT_R3_PATH, JSON.stringify(receipt, null, 2) + '\n', 'utf8');
  console.log(`Đã xuất biên bản nghiệm thu R3 tại: ${RECEIPT_R3_PATH}`);

  fs.writeFileSync(RECEIPT_LEGACY_PATH, JSON.stringify(receipt, null, 2) + '\n', 'utf8');
  console.log(`Đã cập nhật biên bản nghiệm thu tại: ${RECEIPT_LEGACY_PATH}`);

  return receipt;
}

if (require.main === module) {
  runDomAudit().then(() => {
    process.exit(0);
  }).catch(err => {
    console.error('FATAL AUDIT FAILURE:', err);
    process.exit(1);
  });
}
module.exports = { runDomAudit };
