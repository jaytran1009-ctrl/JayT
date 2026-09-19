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

  const response = await page.goto('http://127.0.0.1:4181/', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });
  await page.waitForSelector('#counter-quick-dock', { timeout: 10000 });

  const dock = await page.evaluate(() => {
    const element = document.querySelector('#counter-quick-dock');
    const style = getComputedStyle(element);
    return {
      height: style.height,
      zIndex: style.zIndex,
      background: style.backgroundColor,
      borderTop: style.borderTopColor,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      buttonHeights: [...element.querySelectorAll('button')].map((button) => button.getBoundingClientRect().height)
    };
  });

  const modals = [];
  for (const mode of ['metiz', 'galaxy', 'lunch', 'split']) {
    await page.evaluate((selectedMode) => window.openCounterQuickHud(selectedMode), mode);
    await page.waitForSelector('#counter-3sec-modal:not([hidden])', { timeout: 2000 });
    modals.push(await page.evaluate(() => {
      const modal = document.querySelector('#counter-3sec-modal');
      const price = [...modal.querySelectorAll('*')]
        .map((element) => ({
          text: element.textContent.trim(),
          fontSize: getComputedStyle(element).fontSize,
          color: getComputedStyle(element).color
        }))
        .find((element) => element.fontSize === '28px' && element.color === 'rgb(16, 185, 129)');
      return {
        title: modal.querySelector('h3')?.textContent.trim(),
        price,
        latencyMs: window.counterQuickHudLastOpenMs
      };
    }));
    await page.evaluate(() => window.closeCounterQuickSheet());
  }

  await page.evaluate(() => window.openCounterQuickHud('split'));
  await page.evaluate(() => {
    const [total, people] = document.querySelectorAll('#counter-3sec-modal input');
    total.value = '100001';
    people.value = '3';
    people.dispatchEvent(new Event('input', { bubbles: true }));
  });
  const splitText = await page.evaluate(() => document.querySelector('#counter-3sec-modal').innerText);
  await page.evaluate(() => window.openOnSiteSavingsHud());
  await page.waitForSelector('#onsite-savings-result', { timeout: 2000 });
  const onsite = await page.evaluate(() => ({
    text: document.querySelector('#onsite-savings-result')?.innerText,
    latencyMs: window.counterOnSiteHudLastOpenMs,
    button: !!document.querySelector('#btn-onsite-savings')
  }));
  const finalWidth = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth
  }));
  await browser.close();

  const result = {
    httpStatus: response.status(),
    dock,
    modals,
    splitText,
    onsite,
    finalWidth,
    consoleErrors
  };
  console.log(JSON.stringify(result, null, 2));

  const valid = response.status() === 200 && consoleErrors.length === 0 &&
    dock.height === '56px' && dock.zIndex === '90' &&
    dock.scrollWidth <= dock.clientWidth && finalWidth.scrollWidth <= finalWidth.clientWidth &&
    dock.buttonHeights.every((height) => height >= 44) &&
    modals.every((modal) => modal.price && modal.latencyMs < 50) &&
    splitText.includes('33.334đ / người') && onsite.button && onsite.latencyMs < 50 && onsite.text.includes('50.000đ');
  if (!valid) process.exitCode = 1;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
