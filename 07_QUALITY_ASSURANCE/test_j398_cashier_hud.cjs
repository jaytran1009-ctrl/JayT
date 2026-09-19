const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 1 });
  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(error.message));

  const response = await page.goto('http://127.0.0.1:4181/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('#brand-instant-search', { timeout: 10000 });

  const initial = await page.evaluate(() => {
    const dock = document.querySelector('#counter-quick-dock');
    const style = getComputedStyle(dock);
    return {
      resultCount: document.querySelectorAll('#brand-instant-results [data-cashier-brand-id]').length,
      dockHeight: style.height,
      dockZIndex: style.zIndex,
      dockButtons: [...dock.querySelectorAll('button')].map((button) => button.getBoundingClientRect().height),
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth
    };
  });

  await page.type('#brand-instant-input', 'galaxy');
  await page.waitForFunction(() => document.querySelectorAll('#brand-instant-results [data-cashier-brand-id]').length === 1);
  const galaxySearch = await page.$eval('#brand-instant-results', (element) => element.innerText);
  await page.evaluate(() => document.querySelector('#brand-instant-results [data-cashier-brand-id]').click());
  await page.waitForSelector('#cashier-quick-modal .cashier-quick-card', { timeout: 2000 });
  const galaxyCard = await page.evaluate(() => {
    const modal = document.querySelector('#cashier-quick-modal');
    const amount = modal.querySelector('#cashier-quick-amount');
    const line = modal.querySelector('.cashier-line');
    return {
      title: modal.querySelector('#cashier-quick-title')?.textContent.trim(),
      amount: amount?.textContent.trim(),
      amountFontSize: getComputedStyle(amount).fontSize,
      amountColor: getComputedStyle(amount).color,
      cashierLineFontSize: getComputedStyle(line).fontSize,
      address: modal.querySelector('.cashier-address')?.textContent.trim(),
      latencyMs: window.cashierQuickCardLastOpenMs
    };
  });
  await page.click('.cashier-quick-close');

  await page.evaluate(() => {
    const input = document.querySelector('#brand-instant-input');
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.type('#brand-instant-input', 'highlands');
  await page.waitForFunction(() => document.querySelectorAll('#brand-instant-results [data-cashier-brand-id]').length === 1);
  await page.evaluate(() => document.querySelector('#brand-instant-results [data-cashier-brand-id]').click());
  await page.waitForSelector('#cashier-menu-amount', { timeout: 2000 });
  await page.type('#cashier-menu-amount', '42000');
  const userPrice = await page.$eval('#cashier-quick-amount', (element) => element.textContent.trim());
  await page.click('.cashier-quick-close');

  await page.evaluate(() => document.querySelector('#counter-quick-dock button:nth-child(2)').click());
  await page.waitForSelector('#cashier-quick-title', { timeout: 2000 });
  const dockOpenTitle = await page.$eval('#cashier-quick-title', (element) => element.textContent.trim());
  await page.click('.cashier-quick-close');

  const consumerCopy = await page.evaluate(() => ({
    text: document.body.innerText,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth
  }));
  await browser.close();

  const result = { httpStatus: response.status(), initial, galaxySearch, galaxyCard, userPrice, dockOpenTitle, consumerCopy: { ...consumerCopy, text: undefined }, consoleErrors };
  console.log(JSON.stringify(result, null, 2));

  const amountSize = parseFloat(galaxyCard.amountFontSize || '0');
  const lineSize = parseFloat(galaxyCard.cashierLineFontSize || '0');
  const prohibitedConsumerTerms = /forensic|băm sha|audit manifest/i.test(consumerCopy.text);
  const valid = response.status() === 200 && consoleErrors.length === 0 &&
    initial.resultCount === 7 && initial.dockHeight === '56px' && initial.dockZIndex === '90' &&
    initial.dockButtons.length === 5 && initial.dockButtons.every((height) => height >= 44) &&
    initial.scrollWidth <= initial.clientWidth && consumerCopy.scrollWidth <= consumerCopy.clientWidth &&
    galaxySearch.includes('Galaxy') && galaxyCard.title === 'Galaxy Cinema Đà Nẵng' && galaxyCard.amount === '45.000đ' &&
    amountSize >= 32 && galaxyCard.amountColor === 'rgb(16, 185, 129)' && lineSize >= 18 &&
    galaxyCard.address.includes('Đà Nẵng') && galaxyCard.latencyMs <= 30 && userPrice === '42.000đ' &&
    dockOpenTitle === 'Galaxy Cinema Đà Nẵng' && !prohibitedConsumerTerms;
  if (!valid) process.exitCode = 1;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
