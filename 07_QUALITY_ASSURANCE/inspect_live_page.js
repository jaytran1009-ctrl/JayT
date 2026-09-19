const puppeteer = require('puppeteer');

async function inspectLive() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleMessages = [];
  const errors = [];

  page.on('console', msg => consoleMessages.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => errors.push(err.toString()));

  await page.goto('https://deploy-ten-xi-48.vercel.app/?t=' + Date.now(), { waitUntil: 'networkidle0' });

  console.log('--- LIVE PAGE CONSOLE LOGS ---');
  consoleMessages.forEach(m => console.log(m));

  console.log('\n--- LIVE PAGE ERRORS ---');
  errors.forEach(e => console.error(e));

  // Check DOM elements
  const info = await page.evaluate(() => {
    const hub = document.querySelector('.student-hub-master');
    const hubOld = document.querySelector('.student-hub-container');
    const sections = Array.from(document.querySelectorAll('section')).map(s => ({
      class: s.className,
      textPreview: s.innerText.substring(0, 80).replace(/\n/g, ' ')
    }));
    return {
      hasHubMaster: !!hub,
      hasHubOld: !!hubOld,
      hubMasterVisible: hub ? hub.offsetHeight > 0 : false,
      sectionsCount: sections.length,
      sections
    };
  });

  console.log('\n--- LIVE DOM STRUCTURE ---');
  console.log(JSON.stringify(info, null, 2));

  await browser.close();
}

inspectLive().catch(console.error);
