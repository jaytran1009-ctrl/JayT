const puppeteer = require('puppeteer');

async function checkFailedRequests() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  page.on('response', response => {
    if (!response.ok()) {
      console.log(`❌ FAILED (${response.status()}): ${response.url()}`);
    } else {
      console.log(`✅ OK (${response.status()}): ${response.url()}`);
    }
  });

  await page.goto('https://deploy-ten-xi-48.vercel.app/?t=' + Date.now(), { waitUntil: 'networkidle0' });
  await browser.close();
}

checkFailedRequests().catch(console.error);
