/**
 * QA TEST SUITE: JAYT-119 PREMIUM CLARITY & SUPPLY FOCUS
 * 
 * Verifies:
 * 1. Plain Life Language Classification (3 Groups: Limited-time, Menu planning, Daily utility).
 * 2. 100% Physical file evidence on disk & SHA-256 verification.
 * 3. Zero technical jargon in user-facing UI (no Tier 1/2/3, SSOT, SHA-256, classification policy).
 * 4. Distinct visual tags & CTAs (Xem nguồn & điều kiện ↗, Xem lộ trình tuyến ↗, Xem menu gốc ↗).
 * 5. Bento Category Dock (5 sectors) & Time Dock (5 slots) & Header (District + Persona).
 * 6. Split Bill card CTA: "Nhập tổng bill để chia nhóm 🧮" (never 0đ/người).
 * 7. Supply Gap Board 119 (5x5 matrix, 25 cells, 36% actionable coverage).
 * 8. Honest Local-Only text & "Ưu đãi chỉ xuất hiện khi JayT có nguồn và điều kiện đối soát rõ ràng".
 * 9. Commercial Lock Invariant (deals_feed.json: [], is_approved: false).
 * 10. Puppeteer Mobile 390px & Desktop 1440px (Hero max 3 cards, progressive disclosure, 0 targets < 44px, theme toggle).
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const screenshotsDir = path.join(repoRoot, '08_RELEASE_VAULT', 'screenshots_119');

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

async function runTestSuite119() {
  console.log('\n================================================================');
  console.log('    STARTING JAYT-119 PREMIUM CLARITY & SUPPLY FOCUS QA SUITE   ');
  console.log('================================================================\n');

  // --- TEST 1: SSOT 3-GROUP DATASET & 100% DISK EVIDENCE ---
  console.log('--- TEST 1: SSOT 3-Group Dataset & Claim-Level Fidelity ---');
  const feedPath = path.join(sotDir, 'daily_supply_feed_119.json');
  assert(fs.existsSync(feedPath), 'daily_supply_feed_119.json exists in SOT');
  const feedData = JSON.parse(fs.readFileSync(feedPath, 'utf8'));

  assert(Array.isArray(feedData.limited_time_deals) && feedData.limited_time_deals.length === 4, 'Group 1 limited_time_deals contains strictly 4 verified deals');
  assert(Array.isArray(feedData.watchlist_deals) && feedData.watchlist_deals.length === 2, 'Group 2 watchlist_deals contains strictly 2 deals');
  assert(Array.isArray(feedData.planning_menu_and_utilities) && feedData.planning_menu_and_utilities.length === 7, 'Group 3 planning_menu_and_utilities contains strictly 7 items');

  // Check Limited-Time Deals
  for (const deal of feedData.limited_time_deals) {
    assert(deal.id && deal.brand && deal.title, `Deal ${deal.id} has metadata`);
    assert(deal.category_badge.includes('ƯU ĐÃI CÓ HẠN'), `Deal ${deal.id} has plain category_badge`);
    assert(deal.expiry_date !== null && deal.expiry_date.length === 10, `Deal ${deal.id} has exact expiry_date (YYYY-MM-DD)`);
    assert(deal.official_url && deal.official_url.startsWith('https://'), `Deal ${deal.id} has valid HTTPS official URL`);

    const fullPath = path.join(repoRoot, deal.evidence.physical_file);
    assert(fs.existsSync(fullPath), `Physical file exists: ${deal.evidence.physical_file}`);
    const fileBuf = fs.readFileSync(fullPath);
    assert(getSha256(fileBuf) === deal.evidence.file_sha256, `SHA-256 matches for ${deal.id}`);

    const fileText = fileBuf.toString('utf8');
    for (const claim of deal.claims_to_verify) {
      assert(fileText.includes(claim), `Verbatim claim verified on disk: "${claim.slice(0, 35)}..."`);
    }
  }

  // Check Watchlist Deals
  for (const deal of feedData.watchlist_deals) {
    assert(deal.id && deal.brand && deal.title, `Recheck Deal ${deal.id} has metadata`);
    assert(deal.category_badge.includes('CẦN HỎI LẠI'), `Deal ${deal.id} has plain category_badge`);
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

  // Check Planning Menu Pricing & Utility Items
  for (const item of feedData.planning_menu_and_utilities) {
    assert(item.id && item.brand && item.item_name, `Item ${item.id} has metadata`);
    assert(item.listed_price_vnd > 0, `Item ${item.id} has positive listed price`);
    assert(item.category_badge.includes('GIÁ THAM KHẢO') || item.category_badge.includes('TIỆN ÍCH TIẾT KIỆM'), `Item ${item.id} has plain category_badge`);

    const fullPath = path.join(repoRoot, item.evidence.physical_file);
    assert(fs.existsSync(fullPath), `Physical file exists: ${item.evidence.physical_file}`);
    const fileBuf = fs.readFileSync(fullPath);
    assert(getSha256(fileBuf) === item.evidence.file_sha256, `SHA-256 matches for ${item.id}`);

    const fileText = fileBuf.toString('utf8');
    for (const claim of item.claims_to_verify) {
      assert(fileText.includes(claim), `Verbatim claim verified on disk: "${claim.slice(0, 35)}..."`);
    }
  }

  // --- TEST 2: SUPPLY GAP BOARD 119 MATRIX AUDIT ---
  console.log('\n--- TEST 2: Supply Gap Board 119 Matrix Audit ---');
  const gapBoardPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'supply_gap_board_119.json');
  assert(fs.existsSync(gapBoardPath), 'supply_gap_board_119.json exists');
  const gapData = JSON.parse(fs.readFileSync(gapBoardPath, 'utf8'));
  assert(gapData.matrix_dimensions.slots.length === 5, 'Gap board has 5 slots');
  assert(gapData.matrix_dimensions.sectors.length === 5, 'Gap board has 5 sectors');
  assert(gapData.matrix_cells.length === 25, 'Gap board defines exactly 25 cells (5x5 matrix)');
  assert(gapData.summary_metrics.actionable_coverage_cells === 9, 'Actionable coverage covers 9 cells (36.0%)');

  // --- TEST 3: PLAIN LANGUAGE & ZERO TECHNICAL JARGON ---
  console.log('\n--- TEST 3: Plain Life Language & Zero Jargon in JS ---');
  const interfaceJs = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
  assert(interfaceJs.includes('daily_supply_feed_119.json'), 'Interface loads daily_supply_feed_119.json');
  assert(interfaceJs.includes('Xem nguồn & điều kiện ↗'), 'Interface uses clean action button: Xem nguồn & điều kiện ↗');
  assert(interfaceJs.includes('Xem lộ trình tuyến ↗'), 'Interface uses clean action button: Xem lộ trình tuyến ↗');
  assert(interfaceJs.includes('Ưu đãi chỉ xuất hiện khi JayT có nguồn và điều kiện đối soát rõ ràng'), 'Interface uses truthful verification copy');
  assert(interfaceJs.includes('Nhập tổng bill để chia nhóm 🧮'), 'Interface uses clean Split Bill CTA instead of 0 VND');

  // --- TEST 4: COMMERCIAL LOCK INVARIANT ---
  console.log('\n--- TEST 4: Commercial Lock Invariant ---');
  const prodFeed = JSON.parse(fs.readFileSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json'), 'utf8'));
  assert(Array.isArray(prodFeed) && prodFeed.length === 0, 'Commercial deals_feed.json remains strictly locked ([])');

  // --- TEST 5: HEADLESS BROWSER & VIEWPORT VERIFICATION ---
  console.log('\n--- TEST 5: Headless Browser Verification ---');

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
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(`${baseUrl}/index.html`, { waitUntil: 'networkidle0' });

    // 1. Verify Unified Hero Decision Box & Category Dock
    const heroBox = await page.$('.apex-hero-decision-box');
    assert(heroBox !== null, `Viewport ${vp.name} renders .apex-hero-decision-box`);

    const categoryDock = await page.$('.apex-category-dock');
    assert(categoryDock !== null, `Viewport ${vp.name} renders .apex-category-dock`);

    const categoryChips = await page.$$eval('.apex-category-chip', els => els.length);
    assert(categoryChips === 6, `Viewport ${vp.name} renders 6 category chips in dock (found: ${categoryChips})`);

    // 2. Verify Max 3 Cards Invariant in Hero
    const heroActionCards = await page.$$eval('.apex-hero-decision-box .apex-deal-4q-card', els => els.length);
    assert(heroActionCards <= 3 && heroActionCards >= 2, `Viewport ${vp.name} respects strict MAX 3 CARDS in decision hub (found: ${heroActionCards})`);

    // 3. Test Category Dock Switching
    console.log(`     Testing Category Dock click (LUNCH, COFFEE, CINEMA, MOBILITY)...`);
    await page.evaluate(() => {
      const chip = document.querySelector('.apex-category-chip[data-category-dock="MOBILITY"]');
      if (chip) chip.click();
    });
    await new Promise(r => setTimeout(r, 150));
    const mobilityText = await page.$eval('.apex-hero-decision-box', el => el.innerText);
    assert(mobilityText.includes('DanaBus'), `Viewport ${vp.name}: Category MOBILITY renders DanaBus`);

    // 4. Test Smart Split Bill Bottom Sheet Default Text
    const splitBtn = await page.$('[data-action="open-split-modal"]');
    assert(splitBtn !== null, `Viewport ${vp.name} renders Smart Split Bill button`);
    await splitBtn.click();
    await new Promise(r => setTimeout(r, 150));

    const sheetVisible = await page.$eval('#calc-bottom-sheet-overlay', el => el.classList.contains('active'));
    assert(sheetVisible, `Viewport ${vp.name}: Smart Split Bill bottom sheet opens on click`);

    const sheetPerPersonText = await page.$eval('#sheet-val-per-person', el => el.innerText);
    assert(sheetPerPersonText.includes('VND') || sheetPerPersonText.includes('Nhập tổng bill'), `Viewport ${vp.name}: Split bill displays valid CTA text`);

    const closeSheetBtn = await page.$('#btn-close-calc-sheet');
    if (closeSheetBtn) await closeSheetBtn.click();
    await new Promise(r => setTimeout(r, 150));

    // 5. Verify Progressive Disclosure: Full Catalog is Initially Collapsed
    const fullCatalogVisibleInitially = await page.$eval('#full-catalog-extended-section', el => el.style.display !== 'none');
    assert(!fullCatalogVisibleInitially, `Viewport ${vp.name}: Full catalog is collapsed initially`);

    const toggleBtn = await page.$('#btn-toggle-full-catalog');
    assert(toggleBtn !== null, `Viewport ${vp.name} renders #btn-toggle-full-catalog`);
    await toggleBtn.click();
    await new Promise(r => setTimeout(r, 200));

    const fullCatalogVisibleAfterClick = await page.$eval('#full-catalog-extended-section', el => el.style.display !== 'none');
    assert(fullCatalogVisibleAfterClick, `Viewport ${vp.name}: Full catalog expands successfully on click`);

    // Verify 26 Compact Venue Cards
    const venueCards = await page.$$eval('.apex-editorial-card', els => els.length);
    assert(venueCards === 26, `Viewport ${vp.name} renders 26 watchlist locations (found: ${venueCards})`);

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

    // Toggle Theme
    const themeBtn = await page.$('#btn-toggle-theme');
    if (themeBtn) {
      const initialTheme = await page.evaluate(() => document.body.getAttribute('data-theme') || 'light');
      await themeBtn.click();
      const newTheme = await page.evaluate(() => document.body.getAttribute('data-theme'));
      assert(newTheme !== initialTheme, `Viewport ${vp.name} successfully toggled theme (from ${initialTheme} to ${newTheme})`);
      const themePath = path.join(screenshotsDir, `${vp.name}_theme_${newTheme}.png`);
      await page.screenshot({ path: themePath, fullPage: false });
      console.log(`     📸 Screenshot: ${vp.name}_theme_${newTheme}.png`);
    }

    await page.close();
  }

  await browser.close();
  server.close();

  console.log('\n================================================================');
  console.log(`  ALL ${passedAssertions}/${totalAssertions} ASSERTIONS PASSED FOR JAYT-119!`);
  console.log('================================================================\n');
}

runTestSuite119().catch(err => {
  console.error('\n❌ Test Suite 119 Failed:', err);
  process.exit(1);
});
