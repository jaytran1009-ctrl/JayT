const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 1 });
  const consoleErrors = [];
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => consoleErrors.push(error.message));

  const response = await page.goto('http://127.0.0.1:4181/', { waitUntil: 'networkidle0', timeout: 30000 });
  await page.waitForSelector('#brand-instant-search', { timeout: 10000 });

  const counter = await page.evaluate(() => {
    const header = document.querySelector('.j399-header');
    const tabs = document.querySelector('.j399-tabs');
    const dock = document.querySelector('#counter-quick-dock');
    const panel = document.querySelector('#j399-panel-counter');
    const deals = panel.querySelector('.j399-deals');
    const brandSearch = panel.querySelector('.cashier-consumer-surface');
    const pickupBtn = document.querySelector('#btn-onsite-savings');
    const utility = panel.querySelector('.j399-utility');
    const dealCards = deals ? [...deals.querySelectorAll('.j399-deal')] : [];
    const metizR = dealCards[0]?.getBoundingClientRect();
    const metizPriceR = dealCards[0]?.querySelector('.j399-price')?.getBoundingClientRect();
    const galaxyR = dealCards[1]?.getBoundingClientRect();
    const galaxyPriceR = dealCards[1]?.querySelector('.j399-price')?.getBoundingClientRect();
    const pickupR = pickupBtn?.getBoundingClientRect();
    const dockR = dock?.getBoundingClientRect();

    // Check DOM order: deals must come before brandSearch
    const dealsAboveSearch = Boolean(deals && brandSearch && (deals.compareDocumentPosition(brandSearch) & Node.DOCUMENT_POSITION_FOLLOWING));

    // Check affordance label
    const hasAffordance = dealCards.every((card) => card.textContent.includes('Mở ➔'));

    // Check duplicate pick-up button: only ONE inside brand search, zero in .j399-utility
    const utilityPickupButtonCount = utility ? utility.querySelectorAll('button[onclick*="openOnSiteSavingsHud"]').length : 0;

    // Check dock stowed at scrollY = 0
    const dockStowedAtTop = dock ? dock.classList.contains('dock-stowed') : false;

    return {
      version: document.body.dataset.version,
      tabCount: document.querySelectorAll('[data-j399-tab]').length,
      activePanels: document.querySelectorAll('.j399-panel.is-active').length,
      hasUndefined: document.body.innerText.includes('undefined'),
      hasPlaceholderImage: [...document.images].some((img) => /placeholder/i.test(img.getAttribute('src') || '')),
      legacySplitMounted: Boolean(document.querySelector('#split-bill-module, #quick-split-module')),
      legacyCopyMounted: /Xem menu tại quán|Hãy hỏi thu ngân/i.test(document.body.innerText),
      hasDuplicateHero: document.body.innerText.includes('Đến quán mới mở'),
      headerPosition: header ? getComputedStyle(header).position : null,
      tabsPosition: tabs ? getComputedStyle(tabs).position : null,
      dockVisibleOnCounter: dock ? dock.style.display !== 'none' : false,
      dockStowedAtTop,
      dealsAboveSearch,
      hasAffordance,
      utilityPickupButtonCount,
      metizPriceTop: metizPriceR?.top,
      metizPriceBottom: metizPriceR?.bottom,
      galaxyPriceTop: galaxyPriceR?.top,
      galaxyPriceBottom: galaxyPriceR?.bottom,
      pickupBtnBottom: pickupR?.bottom,
      dockTop: dockR?.top,
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      background: getComputedStyle(document.body).backgroundColor
    };
  });

  // Test dock unstows on scroll
  await page.evaluate(() => window.scrollTo({ top: 150 }));
  await new Promise((r) => setTimeout(r, 100));
  const dockActiveOnScroll = await page.evaluate(() => {
    const dock = document.querySelector('#counter-quick-dock');
    return dock ? !dock.classList.contains('dock-stowed') : false;
  });
  await page.evaluate(() => window.scrollTo({ top: 0 }));

  // Test Campus Reactivity with "Từ [Campus] · ..."
  await page.click('[data-j399-campus="due"]');
  const campusDue = await page.evaluate(() => ({
    metizBadge: document.getElementById('campus-badge-metiz_cinema')?.textContent.trim(),
    galaxyBadge: document.getElementById('campus-badge-galaxy_cinema')?.textContent.trim()
  }));

  await page.click('[data-j399-campus="hoa_khanh"]');
  const campusHoaKhanh = await page.evaluate(() => ({
    metizBadge: document.getElementById('campus-badge-metiz_cinema')?.textContent.trim(),
    galaxyBadge: document.getElementById('campus-badge-galaxy_cinema')?.textContent.trim()
  }));

  // Test Brand Instant Search
  await page.type('#brand-instant-input', 'galaxy');
  await page.waitForFunction(() => document.querySelectorAll('#brand-instant-results [data-cashier-brand-id]').length === 1);
  await page.evaluate(() => document.querySelector('#brand-instant-results [data-cashier-brand-id]').click());
  await page.waitForSelector('#cashier-quick-modal .cashier-quick-card');
  const cashierLatencyMs = await page.evaluate(() => window.cashierQuickCardLastOpenMs);
  await page.click('.cashier-quick-close');

  // Test Tab: Today (Đà Nẵng Hôm Nay)
  await page.click('[data-j399-tab="today"]');
  await page.waitForFunction(() => document.querySelector('#j399-panel-today').classList.contains('is-active'));
  const today = await page.evaluate(() => {
    const dock = document.querySelector('#counter-quick-dock');
    const todayPanel = document.querySelector('#j399-panel-today');
    return {
      activePanels: document.querySelectorAll('.j399-panel.is-active').length,
      dockHiddenOnToday: dock ? dock.style.display === 'none' : false,
      hasDuplicateDeals: Boolean(todayPanel?.querySelector('.j399-deals')),
      hasMetizCta: Boolean(todayPanel?.querySelector('button[onclick*="metiz_cinema"]')),
      hasGalaxyCta: Boolean(todayPanel?.querySelector('button[onclick*="galaxy_cinema"]'))
    };
  });

  // Test Tab: Pass (JayT Pass)
  await page.click('[data-j399-tab="pass"]');
  await page.waitForFunction(() => document.querySelector('#j399-panel-pass').classList.contains('is-active'));
  await page.waitForFunction(() => [...document.querySelectorAll('.j399-product img')].every((img) => img.complete && img.naturalWidth > 0));
  const pass = await page.evaluate(() => {
    const dock = document.querySelector('#counter-quick-dock');
    return {
      productCount: document.querySelectorAll('.j399-product').length,
      loadedImages: [...document.querySelectorAll('.j399-product img')].filter((img) => img.naturalWidth > 0).length,
      scrollHeight: document.documentElement.scrollHeight,
      activePanels: document.querySelectorAll('.j399-panel.is-active').length,
      dockHiddenOnPass: dock ? dock.style.display === 'none' : false
    };
  });

  // Switch back to counter tab and test bill split modal
  await page.click('[data-j399-tab="counter"]');
  await page.waitForFunction(() => document.querySelector('#j399-panel-counter').classList.contains('is-active'));
  await page.click('.j399-utility .j399-action');
  await page.waitForSelector('#j399-bill-modal .j399-modal');
  await page.$eval('#j399-bill-total', (input) => { input.value = '100001'; input.dispatchEvent(new Event('input', { bubbles: true })); });
  await page.$eval('#j399-bill-count', (input) => { input.value = '3'; input.dispatchEvent(new Event('input', { bubbles: true })); });
  const bill = await page.evaluate(() => ({
    result: document.querySelector('#j399-split-result').textContent.trim(),
    qrRendered: Boolean(document.querySelector('#j399-qr table')),
    modalCount: document.querySelectorAll('#j399-bill-modal .j399-modal').length
  }));

  // Test 360px viewport responsive gate
  await page.setViewport({ width: 360, height: 800, isMobile: true, deviceScaleFactor: 1 });
  await page.click('[data-j399-tab="counter"]');
  await page.waitForFunction(() => document.querySelector('#j399-panel-counter').classList.contains('is-active'));
  const smoke360 = await page.evaluate(() => {
    const deals = Array.from(document.querySelectorAll('.j399-deal'));
    const campus = document.querySelector('.j399-campus');
    const dealOverflows = deals.map((deal) => {
      const cardRect = deal.getBoundingClientRect();
      const badge = deal.querySelector('.j399-deal-badge');
      const bRect = badge ? badge.getBoundingClientRect() : null;
      return bRect ? Math.max(0, bRect.right - cardRect.right) : 0;
    });
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      maxBadgeOverflow: Math.max(...dealOverflows),
      campusScrollable: campus ? campus.scrollWidth > campus.clientWidth : false
    };
  });

  const result = { httpStatus: response.status(), counter, dockActiveOnScroll, campusDue, campusHoaKhanh, cashierLatencyMs, today, pass, bill, smoke360, consoleErrors };
  console.log(JSON.stringify(result, null, 2));
  await browser.close();

  const valid = response.status() === 200 && consoleErrors.length === 0 &&
    counter.version === 'v3.450.0-j399-staging' && counter.tabCount === 3 && counter.activePanels === 1 &&
    !counter.hasUndefined && !counter.hasPlaceholderImage && !counter.legacySplitMounted && !counter.legacyCopyMounted &&
    !counter.hasDuplicateHero && counter.headerPosition === 'relative' && counter.tabsPosition === 'sticky' &&
    counter.dockVisibleOnCounter && counter.dockStowedAtTop && dockActiveOnScroll &&
    counter.dealsAboveSearch && counter.hasAffordance && counter.utilityPickupButtonCount === 0 &&
    counter.metizPriceBottom < counter.dockTop && counter.galaxyPriceBottom < counter.dockTop &&
    counter.pickupBtnBottom < counter.dockTop &&
    counter.scrollHeight < counter.clientHeight * 3 && counter.scrollWidth <= counter.clientWidth &&
    counter.background === 'rgb(9, 13, 20)' && cashierLatencyMs <= 30 &&
    campusDue.metizBadge.includes('Từ Kinh Tế DUE · ~3.8km') && campusDue.galaxyBadge.includes('Từ Kinh Tế DUE · ~6.5km') &&
    campusHoaKhanh.galaxyBadge.includes('Từ Bách Khoa · ~4.2km') && campusHoaKhanh.metizBadge.includes('Từ Bách Khoa · ~8.5km') &&
    today.activePanels === 1 && today.dockHiddenOnToday && !today.hasDuplicateDeals && today.hasMetizCta && today.hasGalaxyCta &&
    pass.productCount === 5 && pass.loadedImages === 5 && pass.activePanels === 1 && pass.dockHiddenOnPass && pass.scrollHeight < 844 * 3 &&
    bill.result === '33.334đ / người' && bill.qrRendered && bill.modalCount === 1 &&
    smoke360.scrollWidth <= smoke360.clientWidth && smoke360.maxBadgeOverflow <= 0.5 && smoke360.campusScrollable;
  if (!valid) process.exitCode = 1;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
