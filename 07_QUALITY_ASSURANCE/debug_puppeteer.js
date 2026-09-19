const puppeteer = require('puppeteer');

async function debugLivePage() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  await page.goto('https://deploy-ten-xi-48.vercel.app/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const text = await page.evaluate(() => document.body.innerText);
  console.log('--- BODY TEXT START ---');
  console.log(text.substring(0, 1000));
  console.log('--- BODY TEXT END ---');

  await browser.close();
}

debugLivePage().catch(console.error);
