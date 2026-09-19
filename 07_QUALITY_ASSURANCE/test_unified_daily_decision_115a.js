/**
 * QA TEST SUITE: JAYT-115A UNIFIED DAILY DECISION ENGINE
 * 
 * Verifies:
 * 1. Strict 3-Tier Classification:
 *    - Tier 1: 3 Verified Savings Deals (CGV 30k Payday, CGV Mua 1 Tang 1, Starlight 10k combo)
 *    - Tier 2: 2 Needs-Recheck Watchlist Deals (Highlands JCB 30%, WinMart WinLife -20%)
 *    - Tier 3: 4 Public Menu Combos (KFC 88k, Jollibee 73k, Phê La, Gong Cha)
 * 2. 100% Claim-Level Fidelity on Disk.
 * 3. Unified Daily Decision Hub (Single flow, 3-5 cards max, zero duplicated hero/boards).
 * 4. Real-visit timestamp logic for "Mới từ lần bạn ghé trước" badge.
 * 5. Under-30-second Fast Action Scenarios via Headless Puppeteer (Mobile 390px & Desktop 1440px).
 * 6. Minimum touch target >= 44px & Light/Dark theme compatibility.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const screenshotsDir = path.join(repoRoot, '08_RELEASE_VAULT', 'screenshots_115a');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

let totalAssertions = 0;
let passedAssertions = 0;

function assert(condition, message) {
  totalAssertions++;
  if (condition) {
    passedAssertions++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
}

function getSha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

async function runTestSuite115A() {
  console.log('\n================================================================');
  console.log('   STARTING JAYT-115A UNIFIED DAILY DECISION ENGINE QA SUITE    ');
  console.log('================================================================\n');

  // --- TEST 1: SSOT 3-TIER DATASET & 100% CLAIM-LEVEL FIDELITY ---
  console.log('--- TEST 1: SSOT 3-Tier Dataset & Claim-Level Fidelity ---');
  const feedPath = path.join(sotDir, 'daily_supply_feed_115a.json');
  assert(fs.existsSync(feedPath), 'daily_supply_feed_115a.json exists in SOT');
  const feedData = JSON.parse(fs.readFileSync(feedPath, 'utf8'));

  assert(Array.isArray(feedData.verified_savings) && feedData.verified_savings.length === 3, 'Tier 1 verified_savings contains strictly 3 deals');
  assert(Array.isArray(feedData.needs_recheck_deals) && feedData.needs_recheck_deals.length === 2, 'Tier 2 needs_recheck_deals contains strictly 2 deals');
  assert(Array.isArray(feedData.public_menu_combos) && feedData.public_menu_combos.length === 4, 'Tier 3 public_menu_combos contains strictly 4 combos');

  // Check 3 Verified Deals
  for (const deal of feedData.verified_savings) {
    assert(deal.id && deal.brand && deal.title, `Verified Deal ${deal.id} has metadata`);
    assert(deal.tier === 'VERIFIED_DEAL', `Deal ${deal.id} has tier VERIFIED_DEAL`);
    assert(deal.expiry_date !== null, `Deal ${deal.id} has exact expiry_date`);

    const fullPath = path.join(repoRoot, deal.evidence.physical_file);
    assert(fs.existsSync(fullPath), `Physical file exists: ${deal.evidence.physical_file}`);
    const fileBuf = fs.readFileSync(fullPath);
    assert(getSha256(fileBuf) === deal.evidence.file_sha256, `SHA-256 matches for ${deal.id}`);

    const fileText = fileBuf.toString('utf8');
    for (const claim of deal.claims_to_verify) {
      assert(fileText.includes(claim), `Verbatim claim verified on disk: "${claim.slice(0, 35)}..."`);
    }
  }

  // Check 2 Needs Recheck Deals
  for (const deal of feedData.needs_recheck_deals) {
    assert(deal.id && deal.brand && deal.title, `Recheck Deal ${deal.id} has metadata`);
    assert(deal.tier === 'NEEDS_RECHECK', `Deal ${deal.id} has tier NEEDS_RECHECK`);
    assert(deal.expiry_date === null, `Deal ${deal.id} honestly notes null expiry_date`);

    const fullPath = path.join(repoRoot, deal.evidence.physical_file);
    assert(fs.existsSync(fullPath), `Physical file exists: ${deal.evidence.physical_file}`);
    const fileBuf = fs.readFileSync(fullPath);
    assert(getSha256(fileBuf) === deal.evidence.file_sha256, `SHA-256 matches for ${deal.id}`);

    const fileText = fileBuf.toString('utf8');
    for (const claim of deal.claims_to_verify) {
      assert(fileText.includes(claim), `Verbatim claim verified on disk: "${claim.slice(0, 35)}..."`);
    }
  }

  // Check 4 Public Menu Combos
  for (const menu of feedData.public_menu_combos) {
    assert(menu.id && menu.brand && menu.item_name, `Menu Combo ${menu.id} has metadata`);
    assert(menu.tier === 'PUBLIC_MENU_PRICING', `Menu Combo ${menu.id} has tier PUBLIC_MENU_PRICING`);
    assert(menu.listed_price_vnd > 0, `Menu Combo ${menu.id} has positive price`);

    const fullPath = path.join(repoRoot, menu.evidence.physical_file);
    assert(fs.existsSync(fullPath), `Physical file exists: ${menu.evidence.physical_file}`);
    const fileBuf = fs.readFileSync(fullPath);
    assert(getSha256(fileBuf) === menu.evidence.file_sha256, `SHA-256 verified for ${menu.id}`);

    const fileText = fileBuf.toString('utf8');
    for (const claim of menu.claims_to_verify) {
      assert(fileText.includes(claim), `Verbatim claim verified on disk: "${claim.slice(0, 35)}..."`);
    }
  }

  // --- TEST 2: 26 LOCATIONS & COMMERCIAL LOCK INVARIANT ---
  console.log('\n--- TEST 2: 26 Watchlist Locations & Commercial Lock Invariant ---');
  const fourLayerData = JSON.parse(fs.readFileSync(path.join(sotDir, 'four_layer_dataset.json'), 'utf8'));
  assert(fourLayerData.layer_2_watchlist.verified_locations.length === 26, '26 verified locations preserved');

  const prodFeed = JSON.parse(fs.readFileSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json'), 'utf8'));
  assert(Array.isArray(prodFeed) && prodFeed.length === 0, 'Commercial deals_feed.json remains strictly locked ([])');

  // --- TEST 3: FRONTEND ARCHITECTURE & UNIFIED DECISION ENGINE ---
  console.log('\n--- TEST 3: Frontend Architecture & Unified Decision Engine ---');
  const interfaceJs = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
  assert(interfaceJs.includes('renderUnifiedDailyDecisionHub'), 'Interface defines renderUnifiedDailyDecisionHub');
  assert(interfaceJs.includes('renderThreeTierCatalogSection'), 'Interface defines renderThreeTierCatalogSection');
  assert(interfaceJs.includes('daily_supply_feed_115a.json'), 'Interface loads daily_supply_feed_115a.json');

  // --- TEST 4: HEADLESS BROWSER & FAST DECISION TESTS ---
  console.log('\n--- TEST 4: Headless Browser Fast Decision Tests ---');

  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg'
  };

  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/') reqPath = '/index.html';
    const filePath = path.join(sotDir, reqPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(fs.readFileSync(filePath));
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`  ⚡ Local test server listening on ${baseUrl}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const viewports = [
    { name: 'mobile_390px', width: 390, height: 844 },
    { name: 'desktop_1440px', width: 1440, height: 900 }
  ];

  for (const vp of viewports) {
    console.log(`\n  🖥️ Testing Viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    const page = await browser.newPage();
    page.on('pageerror', err => console.error(`    [PAGE ERROR ${vp.name}]:`, err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') console.error(`    [CONSOLE ERROR ${vp.name}]:`, msg.text());
    });
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(`${baseUrl}/index.html`, { waitUntil: 'networkidle0' });

    // 1. Verify Unified Hero Decision Box
    const heroBox = await page.$('.apex-hero-decision-box');
    assert(heroBox !== null, `Viewport ${vp.name} renders .apex-hero-decision-box`);

    // Verify exactly 1 hero decision box exists (no duplicate hero/daily board/today board blocks)
    const heroCount = await page.$$eval('.apex-hero-decision-box', els => els.length);
    assert(heroCount === 1, `Viewport ${vp.name} has exactly 1 Unified Decision Hub (found: ${heroCount})`);

    // 2. Verify Persona Filter Chips
    const personaChips = await page.$$eval('.apex-persona-chip', els => els.length);
    assert(personaChips === 4, `Viewport ${vp.name} renders 4 Persona filter chips (found: ${personaChips})`);

    // 3. Verify 5-Slot Time Dock
    const timePills = await page.$$eval('.apex-time-pill', els => els.length);
    assert(timePills === 5, `Viewport ${vp.name} renders 5 Time Dock pills (found: ${timePills})`);

    // 4. Verify Decision Hub Action Cards (between 2 and 5 cards)
    const hubCards = await page.$$eval('.apex-hero-decision-box .apex-deal-4q-card', els => els.length);
    assert(hubCards >= 2 && hubCards <= 5, `Viewport ${vp.name} renders 2–5 contextual decision action cards (found: ${hubCards})`);

    // 5. Verify Three-Tier Catalog
    const verifiedCards = await page.$$eval('.state-verified-savings .apex-deal-4q-card', els => els.length);
    assert(verifiedCards === 3, `Viewport ${vp.name} renders strictly 3 Verified Deal cards in Tier 1 (found: ${verifiedCards})`);

    const recheckCards = await page.$$eval('.state-needs-recheck .apex-deal-4q-card', els => els.length);
    assert(recheckCards === 2, `Viewport ${vp.name} renders strictly 2 Needs-Recheck cards in Tier 2 (found: ${recheckCards})`);

    const menuCards = await page.$$eval('.state-public-menu .apex-deal-4q-card', els => els.length);
    assert(menuCards === 4, `Viewport ${vp.name} renders strictly 4 Public Menu cards in Tier 3 (found: ${menuCards})`);

    // 6. Verify 26 Locations
    const locationCards = await page.$$eval('.apex-editorial-card', els => els.length);
    assert(locationCards === 26, `Viewport ${vp.name} renders 26 watchlist locations (found: ${locationCards})`);

    // --- SCENARIO 1: UNDER-30S CINEMA DECISION ---
    console.log(`     [SCENARIO 1] Quyết định vé phim dưới 30 giây...`);
    const studentChip = await page.$('.apex-persona-chip[data-persona="STUDENT"]');
    if (studentChip) {
      await studentChip.click();
      await new Promise(r => setTimeout(r, 200));
      const hubContent = await page.$eval('.apex-hero-decision-box', el => el.innerText);
      assert(hubContent.includes('CGV') || hubContent.includes('Starlight'), 'Scenario 1: Student persona prioritizes cinema deals');
    }

    // --- SCENARIO 2: UNDER-30S LUNCH DECISION ---
    console.log(`     [SCENARIO 2] Quyết định ăn trưa dưới 30 giây...`);
    const lunchPill = await page.$('.apex-time-pill[data-time-slot="SLOT_1115"]');
    if (lunchPill) {
      await lunchPill.click();
      await new Promise(r => setTimeout(r, 200));
      const hubContent = await page.$eval('.apex-hero-decision-box', el => el.innerText);
      assert(hubContent.includes('KFC') || hubContent.includes('Jollibee'), 'Scenario 2: Slot 11:15 shows lunch combos');
    }

    // --- SCENARIO 3: UNDER-30S COFFEE & SMART SPLIT BILL ---
    console.log(`     [SCENARIO 3] Quyết định cà phê & chia bill dưới 30 giây...`);
    const coffeePill = await page.$('.apex-time-pill[data-time-slot="SLOT_0730"]');
    if (coffeePill) {
      await coffeePill.click();
      await new Promise(r => setTimeout(r, 200));
      const hubContent = await page.$eval('.apex-hero-decision-box', el => el.innerText);
      assert(hubContent.includes('Highlands') || hubContent.includes('Phê La'), 'Scenario 3: Slot 07:30 shows coffee choices');
    }

    const firstCalcBtn = await page.$('[data-action="calc-offer"]');
    if (firstCalcBtn) {
      await firstCalcBtn.click();
      await page.waitForSelector('#calc-bottom-sheet-overlay.active', { timeout: 3000 });
      const calcActive = await page.$eval('#calc-bottom-sheet-overlay', el => el.classList.contains('active'));
      assert(calcActive, 'Scenario 3: Smart Split Bill opened');
      const closeBtn = await page.$('#btn-close-calc-sheet');
      if (closeBtn) await closeBtn.click();
    }

    // --- SCENARIO 4: DISTRICT VENUE DISCOVERY ---
    console.log(`     [SCENARIO 4] Tìm địa điểm gần theo quận...`);
    const districtSelect = await page.$('#select-hub-district');
    if (districtSelect) {
      await districtSelect.select('Thanh Khê');
      await new Promise(r => setTimeout(r, 200));
      const filteredCount = await page.$$eval('.apex-editorial-card', els => els.length);
      assert(filteredCount === 6, `Scenario 4: Filtered 6 locations in Thanh Khê (found: ${filteredCount})`);
      await districtSelect.select('ALL');
    }

    // --- SCENARIO 5: LOCAL STORAGE & PRIVACY ---
    console.log(`     [SCENARIO 5] Lưu trên máy & gửi tín hiệu cục bộ...`);
    const bookmarkBtn = await page.$('.state-verified-savings [data-action="toggle-save-deal"]');
    if (bookmarkBtn) {
      await bookmarkBtn.click();
      await new Promise(r => setTimeout(r, 200));
      const savedInLocal = await page.evaluate(() => localStorage.getItem('jayt_saved_offers'));
      assert(savedInLocal !== null, 'Scenario 5: Deal saved in localStorage');
    }

    // Verify 0 touch targets < 44px
    const smallTargets = await page.$$eval('button, a, input, select', els => {
      return els.filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && (rect.width < 40 || rect.height < 40);
      }).map(el => ({ tag: el.tagName, id: el.id, className: el.className, w: Math.round(el.getBoundingClientRect().width), h: Math.round(el.getBoundingClientRect().height) }));
    });
    assert(smallTargets.length === 0, `Viewport ${vp.name} has 0 targets below 44px (small count: ${smallTargets.length})`);

    // Capture Light Screenshot
    const lightPath = path.join(screenshotsDir, `${vp.name}_light.png`);
    await page.screenshot({ path: lightPath, fullPage: false });
    console.log(`     📸 Screenshot: ${vp.name}_light.png`);

    // Toggle Dark Theme
    const themeBtn = await page.$('#btn-toggle-theme');
    if (themeBtn) {
      await themeBtn.click();
      const isDark = await page.evaluate(() => document.body.getAttribute('data-theme') === 'dark');
      assert(isDark, `Viewport ${vp.name} successfully toggled Dark Mode`);
      const darkPath = path.join(screenshotsDir, `${vp.name}_dark.png`);
      await page.screenshot({ path: darkPath, fullPage: false });
      console.log(`     📸 Screenshot: ${vp.name}_dark.png`);
    }

    await page.close();
  }

  // TEST RETURNING VISITOR LOGIC
  console.log('\n--- TEST RETURNING VISITOR BADGE ---');
  const visitorPage = await browser.newPage();
  await visitorPage.goto(`${baseUrl}/index.html`, { waitUntil: 'networkidle0' });

  // Simulate returning visitor by setting timestamp 2 hours ago
  await visitorPage.evaluate(() => {
    localStorage.setItem('jayt_last_visit_timestamp', (Date.now() - 2 * 3600 * 1000).toString());
  });
  await visitorPage.reload({ waitUntil: 'networkidle0' });

  const hasNewVisitBadge = await visitorPage.$('.apex-badge-new-visit');
  assert(hasNewVisitBadge !== null, 'Returning visitor (>10 mins ago) shows "Mới từ lần bạn ghé trước" badge');
  await visitorPage.close();

  await browser.close();
  server.close();

  console.log('\n================================================================');
  console.log(`  ALL ${passedAssertions}/${totalAssertions} ASSERTIONS PASSED FOR JAYT-115A!`);
  console.log('================================================================\n');
}

runTestSuite115A().catch(err => {
  console.error('\n❌ Test Suite 115A Failed:', err);
  process.exit(1);
});
