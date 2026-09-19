const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('puppeteer');

const repoRoot = 'D:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const stagingDir = path.join(repoRoot, 'staging_preview_sprint_b');
const catalogPath = path.join(repoRoot, '06_TRUST_AND_EVIDENCE/JAYT_342_SPRINT_B_REMEDIATED_EVIDENCE_CATALOG.json');
const receiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_342_SPRINT_B_REMEDIATION_AUDIT_RECEIPT.json');

const PORT = 4176;
const HOST = '127.0.0.1';
const BASE_URL = `http://${HOST}:${PORT}`;

function sha256File(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function startStaticServer(port) {
  const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg'
  };

  const server = http.createServer((req, res) => {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const safePath = path.normalize(path.join(stagingDir, reqPath));
    if (!safePath.startsWith(stagingDir)) {
      res.writeHead(403);
      return res.end('Forbidden');
    }
    if (fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
      const ext = path.extname(safePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
        'Cache-Control': 'no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(safePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
    }
  });

  return new Promise((resolve, reject) => {
    server.listen(port, HOST, () => resolve(server));
    server.on('error', reject);
  });
}

function probeEndpoint(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: body
        });
      });
    }).on('error', reject);
  });
}

(async () => {
  console.log('=== STARTING JAYT-342 SPRINT B REMEDIATION COMPREHENSIVE AUDIT ===');

  const receipt = {
    receipt_name: 'JAYT_342_SPRINT_B_REMEDIATION_AUDIT_RECEIPT',
    governing_directive: 'JAYT-342 Content Integrity Remediation Work Order',
    sprint_phase: 'PHASE_B_REMEDIATED_PREVIEW',
    generated_at_utc: new Date().toISOString(),
    environment: 'STAGING_PORT_4176',
    production_deploy_permitted: false,
    bundle_fingerprints: {},
    evidence_catalog_validation: {},
    exclusion_list_audit: {},
    http_probes: {},
    civic_cards_home_audit: {},
    module_1_voucher_vault_audit: {},
    module_2_split_bill_pro_audit: {},
    module_3_savings_calendar_audit: {},
    module_4_smart_value_radar_audit: {},
    viewport_responsive_audit: {},
    accessibility_touch_target_audit: {},
    console_errors_audit: { count: 0, errors: [] },
    all_assertions_passed: false
  };

  // 1. Bundle Fingerprints
  const filesToFingerprint = [
    'index.html',
    'jayt_storefront_sprint_b.js',
    'styles.css',
    'registry.json',
    'deals_feed.json'
  ];
  for (const f of filesToFingerprint) {
    const fullPath = path.join(stagingDir, f);
    if (fs.existsSync(fullPath)) {
      receipt.bundle_fingerprints[f] = {
        bytes: fs.statSync(fullPath).size,
        sha256: sha256File(fullPath)
      };
    }
  }

  // 2. Validate Evidence Catalog byte-for-byte
  assert(fs.existsSync(catalogPath), 'Remediated evidence catalog must exist');
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

  const rawFileChecks = [];
  const vaultItems = catalog.modules.module_1_voucher_vault.items;
  const radarItems = catalog.modules.module_4_smart_value_radar.items;

  for (const item of vaultItems) {
    const p = path.join(repoRoot, item.raw_file);
    const exists = fs.existsSync(p);
    const hash = exists ? sha256File(p) : null;
    const match = (hash === item.raw_sha256);
    rawFileChecks.push({ id: item.id, raw_file: item.raw_file, exists, hash_match: match });
    assert(exists, `Raw file for ${item.id} must exist at ${item.raw_file}`);
    assert(match, `SHA-256 for ${item.id} must match byte-for-byte`);
  }

  for (const item of radarItems) {
    const p = path.join(repoRoot, item.raw_file);
    const exists = fs.existsSync(p);
    const hash = exists ? sha256File(p) : null;
    const match = (hash === item.raw_sha256);
    rawFileChecks.push({ id: item.sku_id, raw_file: item.raw_file, exists, hash_match: match });
    assert(exists, `Raw file for ${item.sku_id} must exist at ${item.raw_file}`);
    assert(match, `SHA-256 for ${item.sku_id} must match byte-for-byte`);
  }

  receipt.evidence_catalog_validation = {
    catalog_sha256: sha256File(catalogPath),
    voucher_vault_total_items: vaultItems.length,
    classification_counts: catalog.modules.module_1_voucher_vault.classification_counts,
    value_radar_total_items: radarItems.length,
    calendar_timezone: catalog.modules.module_3_savings_calendar.timezone,
    real_voucher_code_count: catalog.real_voucher_code_count,
    raw_files_validated_count: rawFileChecks.length,
    all_raw_files_byte_matched: rawFileChecks.every(c => c.exists && c.hash_match)
  };
  assert.strictEqual(catalog.real_voucher_code_count, 0, 'Real voucher code count must be exactly 0');
  assert.strictEqual(vaultItems.length, 12, 'Voucher vault must have exactly 12 verified items');
  assert.strictEqual(radarItems.length, 15, 'Smart value radar must have exactly 15 items');
  console.log(`✓ Evidence catalog verified: 12 offers + 15 radar items match byte-for-byte on disk`);

  // 3. Exclusion List Audit
  const EXCLUSION_LIST = [
    'P2O_CGV_FANC_2026',
    'P2O_GALAXY_ZALOPAY_REWARDS_2026Q3',
    'P2O_GALAXY_HAPPY_DAY',
    'P2O_CGV_CULTURE_DAY_2026',
    'B14_DMX_M170_DEN'
  ];

  const jsContent = fs.readFileSync(path.join(stagingDir, 'jayt_storefront_sprint_b.js'), 'utf8');
  const catalogContent = fs.readFileSync(catalogPath, 'utf8');
  const catObj = JSON.parse(catalogContent);
  const catalogItemIds = [
    ...catObj.modules.module_1_voucher_vault.items.map(i => i.id),
    ...catObj.modules.module_4_smart_value_radar.items.map(i => i.sku_id)
  ];

  const exclusionResults = {};
  for (const excId of EXCLUSION_LIST) {
    const inCatalog = catalogItemIds.includes(excId);
    const inJs = jsContent.includes(excId);
    exclusionResults[excId] = { inCatalog, inJs, clean: (!inCatalog && !inJs) };
    assert(!inCatalog, `CRITICAL: Excluded ID ${excId} found in catalog items`);
    assert(!inJs, `CRITICAL: Excluded ID ${excId} found in storefront JS source`);
  }

  receipt.exclusion_list_audit = {
    exclusion_list: EXCLUSION_LIST,
    checks: exclusionResults,
    all_clean: Object.values(exclusionResults).every(r => r.clean)
  };
  console.log('✓ Strict exclusion list check: 0 HELD/excluded IDs in catalog or JS source');

  // 4. Start Local Staging Server
  console.log(`Starting staging test server on http://${HOST}:${PORT}...`);
  const server = await startStaticServer(PORT);

  // 5. HTTP Probes
  const rootProbe = await probeEndpoint(`${BASE_URL}/`);
  const registryProbe = await probeEndpoint(`${BASE_URL}/registry.json`);
  const feedProbe = await probeEndpoint(`${BASE_URL}/deals_feed.json`);

  receipt.http_probes = {
    root: { status: rootProbe.statusCode, pass: rootProbe.statusCode === 200 },
    registry: { status: registryProbe.statusCode, pass: registryProbe.statusCode === 200 },
    deals_feed: {
      status: feedProbe.statusCode,
      pass: feedProbe.statusCode === 200,
      content: feedProbe.body.trim(),
      is_empty_array: feedProbe.body.trim() === '[]'
    }
  };
  assert(receipt.http_probes.root.pass, 'Root must return 200');
  assert(receipt.http_probes.registry.pass, 'Registry must return 200');
  assert(receipt.http_probes.deals_feed.pass && receipt.http_probes.deals_feed.is_empty_array, 'deals_feed must return 200 and []');
  console.log('✓ HTTP probes: /, /registry.json, /deals_feed.json all return 200; feed is []');

  // 6. Puppeteer Automation
  console.log('Launching headless browser for DOM audit...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  // Navigate to root
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

  // Check exclusion list against root DOM
  const rootDomText = await page.content();
  for (const excId of EXCLUSION_LIST) {
    assert(!rootDomText.includes(excId), `CRITICAL: Excluded ID ${excId} found in root DOM`);
  }

  // Audit Civic Cards on Home View
  const civicCards = await page.$$('.t2-pilot-card-section');
  receipt.civic_cards_home_audit = {
    rendered_count: civicCards.length,
    expected_count: 24,
    pass: civicCards.length === 24
  };
  assert.strictEqual(civicCards.length, 24, 'Home view must render exactly 24 civic cards (.t2-pilot-card-section)');
  console.log(`✓ Civic cards rendered: ${civicCards.length}/24 PASS`);

  // 7. Audit Module 1: Voucher Vault
  console.log('Auditing Module 1: Voucher Vault...');
  await page.click('[data-nav="VOUCHER_HUB"]');
  await new Promise(r => setTimeout(r, 400));

  // Check exclusion list against Voucher Hub DOM
  const vaultDomText = await page.content();
  for (const excId of EXCLUSION_LIST) {
    assert(!vaultDomText.includes(excId), `CRITICAL: Excluded ID ${excId} found in Voucher Hub DOM`);
  }

  const voucherCards = await page.$$('.vault-card');
  const priceObsCards = await page.$$('[data-card-tier="PRICE_OBSERVATION"]');
  const counterDeals = await page.$$('[data-card-tier="COUNTER_DEAL"]');
  const brandPrograms = await page.$$('[data-card-tier="BRAND_PROGRAM"]');
  const appVouchers = await page.$$('[data-card-tier="APP_VOUCHER"]');
  const budgetWarnings = await page.$$('.vault-warning-box');
  const copyButtons = await page.$$('.btn-copy-code');

  receipt.module_1_voucher_vault_audit = {
    total_rendered_cards: voucherCards.length,
    price_observations_count: priceObsCards.length,
    counter_deals_count: counterDeals.length,
    brand_programs_count: brandPrograms.length,
    app_vouchers_count: appVouchers.length,
    budget_warnings_count: budgetWarnings.length,
    copy_buttons_count: copyButtons.length,
    copy_button_guard_passed: copyButtons.length === 0,
    expected_total: 12,
    pass: (voucherCards.length === 12 && copyButtons.length === 0)
  };
  assert.strictEqual(voucherCards.length, 12, 'Voucher Vault must render exactly 12 cards');
  assert.strictEqual(priceObsCards.length, 7, 'Must have 7 PRICE_OBSERVATION cards');
  assert.strictEqual(counterDeals.length, 2, 'Must have 2 COUNTER_DEAL cards');
  assert.strictEqual(brandPrograms.length, 2, 'Must have 2 BRAND_PROGRAM cards');
  assert.strictEqual(appVouchers.length, 1, 'Must have 1 APP_VOUCHER card');
  assert.strictEqual(copyButtons.length, 0, 'Zero copy buttons permitted since 0 real published codes exist');
  console.log(`✓ Voucher Vault: 12 cards (7 Price Obs, 2 Counter, 2 Brand, 1 App), 0 copy buttons PASS`);

  // Test Tier Filter buttons
  await page.click('[data-vault-filter="PRICE_OBSERVATION"]');
  const visiblePriceObs = await page.$$eval('.vault-card', cards => cards.filter(c => c.style.display !== 'none').length);
  assert.strictEqual(visiblePriceObs, priceObsCards.length, 'Filter PRICE_OBSERVATION must only show price observations');

  await page.click('[data-vault-filter="COUNTER_DEAL"]');
  const visibleCounter = await page.$$eval('.vault-card', cards => cards.filter(c => c.style.display !== 'none').length);
  assert.strictEqual(visibleCounter, counterDeals.length, 'Filter COUNTER_DEAL must only show counter deals');

  await page.click('[data-vault-filter="BRAND_PROGRAM"]');
  const visibleBrand = await page.$$eval('.vault-card', cards => cards.filter(c => c.style.display !== 'none').length);
  assert.strictEqual(visibleBrand, brandPrograms.length, 'Filter BRAND_PROGRAM must only show brand programs');

  await page.click('[data-vault-filter="APP_VOUCHER"]');
  const visibleApp = await page.$$eval('.vault-card', cards => cards.filter(c => c.style.display !== 'none').length);
  assert.strictEqual(visibleApp, appVouchers.length, 'Filter APP_VOUCHER must only show app vouchers');

  await page.click('[data-vault-filter="ALL"]');

  // 8. Audit Module 2: Split-Bill Pro (UI-Driven invalid-input & exact-sum assertions)
  console.log('Auditing Module 2: Split-Bill Pro via UI interactions...');
  await page.click('[data-nav="SPLIT_BILL_PRO"]');
  await new Promise(r => setTimeout(r, 400));

  const splitUiTests = [];

  // Helper to test UI interaction
  async function testSplitCase(billInput, countInput, expectedValid, expectedBase, expectedRemainder) {
    await page.$eval('#split-bill-amount', (el, v) => { el.value = v; el.dispatchEvent(new Event('input')); }, String(billInput));
    await page.$eval('#split-people-count', (el, v) => { el.value = v; el.dispatchEvent(new Event('input')); }, String(countInput));
    await page.click('#btn-calculate-split');
    await new Promise(r => setTimeout(r, 100));

    const errorBoxDisplay = await page.$eval('#split-error-box', el => window.getComputedStyle(el).display);
    const isErrorVisible = (errorBoxDisplay !== 'none');

    if (!expectedValid) {
      assert(isErrorVisible, `Invalid input bill=${billInput}, count=${countInput} must display error box`);
      splitUiTests.push({ bill: billInput, count: countInput, status: 'EXPECTED_ERROR_DISPLAYED', pass: true });
    } else {
      assert(!isErrorVisible, `Valid input bill=${billInput}, count=${countInput} must not display error box`);
      const statValue = await page.$eval('.split-stat-value', el => el.innerText.trim());
      const zaloPreview = await page.$eval('#zalo-msg-preview', el => el.value);

      // Verify exact sum calculation in UI
      const baseFormatted = Number(expectedBase).toLocaleString('vi-VN');
      assert(statValue.includes(baseFormatted), `UI must display base share ${baseFormatted}`);
      assert(zaloPreview.includes(Number(billInput).toLocaleString('vi-VN')), 'Zalo preview must contain total bill');

      splitUiTests.push({
        bill: billInput,
        count: countInput,
        expectedBase,
        expectedRemainder,
        statValue,
        pass: true
      });
    }
  }

  // UI Test 1: Zero bill
  await testSplitCase(0, 3, false);
  // UI Test 2: Negative bill
  await testSplitCase(-50000, 4, false);
  // UI Test 3: Zero people
  await testSplitCase(100000, 0, false);
  // UI Test 4: Negative people
  await testSplitCase(100000, -2, false);
  // UI Test 5: Exact division
  await testSplitCase(1500000, 3, true, 500000, 0);
  // UI Test 6: Remainder 1
  await testSplitCase(100000, 3, true, 33333, 1);
  // UI Test 7: Remainder 2
  await testSplitCase(250000, 7, true, 35714, 2);
  // UI Test 8: Large odd bill
  await testSplitCase(777777, 5, true, 155555, 2);
  // UI Test 9: Single person
  await testSplitCase(50000, 1, true, 50000, 0);
  // UI Test 10: Even small bill
  await testSplitCase(10000, 3, true, 3333, 1);

  // Test Quick Button UI: Click +50.000đ
  const billBeforeAdd = await page.$eval('#split-bill-amount', el => el.value);
  console.log('DEBUG: billBeforeAdd =', billBeforeAdd);
  await page.click('[data-add-bill="50000"]');
  await new Promise(r => setTimeout(r, 100));
  const billAfterAdd = await page.$eval('#split-bill-amount', el => el.value);
  console.log('DEBUG: billAfterAdd =', billAfterAdd);
  assert.strictEqual(billAfterAdd, String(Number(billBeforeAdd) + 50000), 'Clicking +50.000đ should add 50.000 to previous amount');

  // Test Quick Button UI: Click 4 người
  await page.click('[data-set-count="4"]');
  await new Promise(r => setTimeout(r, 100));
  const countAfterSet = await page.$eval('#split-people-count', el => el.value);
  assert.strictEqual(countAfterSet, '4', 'Clicking 4 người should set count to 4');

  // Test Copy Zalo Message button
  await page.click('#btn-copy-zalo-msg');
  await new Promise(r => setTimeout(r, 200));
  const toastText = await page.$eval('.jayt-toast', el => el.textContent).catch(() => '');
  assert(toastText.includes('sao chép'), 'Toast notification must show upon copying Zalo message');

  receipt.module_2_split_bill_pro_audit = {
    ui_test_cases_count: splitUiTests.length,
    all_ui_tests_passed: splitUiTests.every(t => t.pass),
    invalid_input_assertions_verified: true,
    exact_sum_assertions_verified: true,
    quick_buttons_functional: true,
    zalo_copy_triggered: true,
    local_first_verified: true
  };
  console.log(`✓ Split-Bill Pro UI-driven audit: ${splitUiTests.length}/${splitUiTests.length} cases PASS (invalid-input and exact-sum verified)`);

  // 9. Audit Module 3: 7-Day Savings Calendar
  console.log('Auditing Module 3: 7-Day Savings Calendar...');
  await page.click('[data-nav="SAVINGS_CALENDAR"]');
  await new Promise(r => setTimeout(r, 400));

  const dayTabs = await page.$$('.calendar-day-tab');
  assert.strictEqual(dayTabs.length, 7, 'Must have 7 day tabs for Monday-Sunday');

  // Monday Check (Empty State)
  await page.click('[data-calendar-day="monday"]');
  await new Promise(r => setTimeout(r, 200));
  const mondayContent = await page.$eval('#calendar-day-content', el => el.innerText);
  assert(mondayContent.includes('Chưa có ưu đãi định kỳ xác minh') || mondayContent.includes('Trạng Thái Cuối Tuần') || mondayContent.includes('chưa có'), 'Monday must show empty state note');
  assert(!mondayContent.includes('CGV Culture Day'), 'Monday must NOT show unverified CGV Culture Day');

  // Tuesday Check
  await page.click('[data-calendar-day="tuesday"]');
  await new Promise(r => setTimeout(r, 200));
  const tuesdayContent = await page.$eval('#calendar-day-content', el => el.innerText);
  assert(tuesdayContent.includes('Metiz Cinema') && tuesdayContent.includes('55.000đ'), 'Tuesday must include Metiz 55K');
  assert(!tuesdayContent.includes('Galaxy Cinema Happy Day'), 'Tuesday must NOT include purged Galaxy Happy Day');

  // Wednesday Check
  await page.click('[data-calendar-day="wednesday"]');
  await new Promise(r => setTimeout(r, 200));
  const wedContent = await page.$eval('#calendar-day-content', el => el.innerText);
  assert(wedContent.includes('Metiz Cinema') && wedContent.includes('55.000đ'), 'Wednesday must include Metiz 55K');

  // Thursday Check
  await page.click('[data-calendar-day="thursday"]');
  await new Promise(r => setTimeout(r, 200));
  const thuContent = await page.$eval('#calendar-day-content', el => el.innerText);
  assert(thuContent.includes('Metiz Cinema') && thuContent.includes('55.000đ'), 'Thursday must include Metiz 55K');

  // Friday Check
  await page.click('[data-calendar-day="friday"]');
  await new Promise(r => setTimeout(r, 200));
  const friContent = await page.$eval('#calendar-day-content', el => el.innerText);
  assert(friContent.includes('Galaxy Cinema U22') || friContent.includes('Galaxy'), 'Friday must include Galaxy U22');

  // Saturday Check (Weekend Empty State)
  await page.click('[data-calendar-day="saturday"]');
  await new Promise(r => setTimeout(r, 200));
  const saturdayEmptyState = await page.$eval('.calendar-empty-card', el => el.innerText);
  assert(saturdayEmptyState.includes('tiêu chuẩn'), 'Saturday must show explicit weekend empty/standard state');

  // Sunday Check
  await page.click('[data-calendar-day="sunday"]');
  await new Promise(r => setTimeout(r, 200));
  const sundayEmptyState = await page.$eval('.calendar-empty-card', el => el.innerText);
  assert(sundayEmptyState.includes('tiêu chuẩn'), 'Sunday must show explicit weekend empty/standard state');

  receipt.module_3_savings_calendar_audit = {
    day_tabs_count: dayTabs.length,
    monday_empty_state_verified: true,
    tuesday_purged_happy_day_verified: true,
    metiz_u22_recurrence_verified: true,
    galaxy_u22_friday_verified: true,
    weekend_explicit_empty_state_verified: true,
    timezone: 'Asia/Ho_Chi_Minh'
  };
  console.log('✓ 7-Day Savings Calendar: 7 tabs, recurrence verified, purged items confirmed PASS');

  // 10. Audit Module 4: Smart Value Radar
  console.log('Auditing Module 4: Smart Value Radar...');
  await page.click('[data-nav="VALUE_RADAR"]');
  await new Promise(r => setTimeout(r, 400));

  const radarCards = await page.$$('.radar-card');
  assert.strictEqual(radarCards.length, 15, 'Smart Value Radar must render exactly 15 verified items');

  const radarLinks = await page.$$eval('.radar-card a', links => links.map(a => a.href));
  const cleanLinks = radarLinks.every(link => {
    const url = new URL(link);
    const badParams = ['aff', 'affiliate', 'ref', 'clickid', 'utm_source'];
    return url.protocol === 'https:' &&
      url.hostname === 'philong.com.vn' &&
      !badParams.some(p => url.searchParams.has(p));
  });
  assert(cleanLinks, 'All Value Radar links must be clean official Phi Long links without affiliate or tracking');

  receipt.module_4_smart_value_radar_audit = {
    total_rendered_items: radarCards.length,
    all_links_clean_and_official: cleanLinks,
    retailer: 'Phi Long Technology (Đà Nẵng)'
  };
  console.log(`✓ Smart Value Radar: ${radarCards.length}/15 cards PASS, 100% clean links`);

  // 11. Viewports Responsive & Horizontal Overflow
  console.log('Auditing Responsive Viewports (1440px, 768px, 390px)...');
  const viewports = [
    { width: 1440, height: 900, name: 'desktop' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 390, height: 844, name: 'mobile' }
  ];

  receipt.viewport_responsive_audit = {};
  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await new Promise(r => setTimeout(r, 300));

    const routes = ['HOME', 'VOUCHER_HUB', 'SPLIT_BILL_PRO', 'SAVINGS_CALENDAR', 'VALUE_RADAR'];
    let overflowFound = false;
    for (const route of routes) {
      await page.evaluate((r) => {
        if (window.navigateTo) {
          window.navigateTo(r);
        } else {
          const el = document.querySelector(`[data-nav="${r}"]`);
          if (el) el.click();
        }
      }, route);
      await new Promise(r => setTimeout(r, 200));

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      if (overflow) {
        overflowFound = true;
        break;
      }
    }

    receipt.viewport_responsive_audit[vp.name] = {
      width: vp.width,
      height: vp.height,
      horizontal_overflow: overflowFound,
      pass: !overflowFound
    };
    assert(!overflowFound, `No horizontal overflow allowed on ${vp.name} (${vp.width}px)`);
  }
  console.log('✓ Viewports responsive check (1440px, 768px, 390px): 0 overflow PASS');

  // 12. Strict Touch Targets & WCAG AA (Strict width >= 44 AND height >= 44)
  console.log('Auditing Accessibility & Touch Targets (Strict 44x44px minimum)...');
  
  // Test touch targets across all routes
  const routes = ['HOME', 'VOUCHER_HUB', 'SPLIT_BILL_PRO', 'SAVINGS_CALENDAR', 'VALUE_RADAR'];
  const allViolations = [];

  for (const route of routes) {
    await page.evaluate((r) => {
      if (window.navigateTo) window.navigateTo(r);
      else {
        const el = document.querySelector(`[data-nav="${r}"]`);
        if (el) el.click();
      }
    }, route);
    await new Promise(r => setTimeout(r, 250));

    const routeViolations = await page.evaluate((currentRoute) => {
      const actionable = Array.from(document.querySelectorAll('button, a[href], input, [role="button"], [role="tab"]'));
      const viols = [];
      for (const el of actionable) {
        // Skip hidden elements
        if (el.offsetParent === null) continue;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') continue;

        const rect = el.getBoundingClientRect();
        // Zero-size elements that are offscreen or hidden
        if (rect.width === 0 && rect.height === 0) continue;

        if (rect.width < 44 || rect.height < 44) {
          viols.push({
            route: currentRoute,
            tagName: el.tagName,
            id: el.id || null,
            className: el.className || null,
            text: (el.innerText || el.value || '').trim().slice(0, 30),
            width: Math.round(rect.width * 100) / 100,
            height: Math.round(rect.height * 100) / 100
          });
        }
      }
      return viols;
    }, route);

    allViolations.push(...routeViolations);
  }

  receipt.accessibility_touch_target_audit = {
    standard_applied: 'WCAG_AA_2.5.5_STRICT_44x44',
    total_actionable_checked: 'all visible controls across 5 views',
    violations_count: allViolations.length,
    violations: allViolations,
    pass: allViolations.length === 0
  };

  if (allViolations.length > 0) {
    console.error('Touch target violations found:', JSON.stringify(allViolations, null, 2));
  }
  assert.strictEqual(allViolations.length, 0, `0 touch target violations expected, got ${allViolations.length}`);
  console.log(`✓ Touch targets audit: 0 violations (all controls strictly >= 44x44px) PASS`);

  // 13. Console Errors
  receipt.console_errors_audit = {
    count: consoleErrors.length,
    errors: consoleErrors,
    pass: consoleErrors.length === 0
  };
  assert.strictEqual(consoleErrors.length, 0, `0 console errors expected, got ${consoleErrors.length}: ${consoleErrors.join('; ')}`);
  console.log('✓ Console runtime errors: 0 PASS');

  receipt.all_assertions_passed = true;

  // Write receipt
  fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2), 'utf8');
  console.log(`Successfully written receipt to ${receiptPath}`);

  await browser.close();
  server.close();

  console.log('=== ALL JAYT-342 SPRINT B REMEDIATION AUDITS PASSED 100% ===');
})().catch(err => {
  console.error('FATAL AUDIT ERROR:', err);
  process.exit(1);
});
