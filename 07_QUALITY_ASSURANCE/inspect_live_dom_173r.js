const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://deploy-ten-xi-48.vercel.app/', { waitUntil: 'networkidle0', timeout: 20000 });

  // Click hub 5 (Đồ KTX) to show student cards
  const hubTexts = await page.$$eval('.jayt-category-hub-pill', els => els.map(e => e.textContent.trim()));
  console.log('Hubs:', JSON.stringify(hubTexts));

  const hubs = await page.$$('.jayt-category-hub-pill');
  if (hubs.length >= 5) {
    await hubs[4].click();
    await new Promise(r => setTimeout(r, 1000));
  }

  // Search for brand names in the rendered DOM
  const brands = ['GitHub Education', 'JetBrains', 'Spotify Vietnam', 'Notion', 'Canva', 'YouTube Premium'];
  const result = await page.evaluate((brands) => {
    const body = document.body.innerText;
    const findings = {};
    brands.forEach(b => {
      findings[b] = {
        present: body.includes(b),
        context: ''
      };
      const idx = body.indexOf(b);
      if (idx !== -1) {
        findings[b].context = body.substring(Math.max(0, idx - 30), Math.min(body.length, idx + 150));
      }
    });

    // Find parent containers of brand text
    const containers = [];
    brands.forEach(brand => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
      while (walker.nextNode()) {
        if (walker.currentNode.textContent.includes(brand)) {
          let el = walker.currentNode.parentElement;
          // Walk up to find card container
          let card = el;
          for (let i = 0; i < 8; i++) {
            if (!card.parentElement) break;
            card = card.parentElement;
            if (card.className && (card.className.includes('card') || card.className.includes('source') || card.className.includes('deal'))) break;
          }
          containers.push({
            brand,
            cardClass: card.className ? card.className.substring(0, 120) : 'none',
            cardDataset: JSON.stringify(card.dataset),
            cardText: card.innerText.substring(0, 300)
          });
          break;
        }
      }
    });
    return { findings, containers };
  }, brands);

  console.log('\n=== BRAND FINDINGS ===');
  for (const [brand, info] of Object.entries(result.findings)) {
    console.log(brand + ':', info.present ? 'FOUND' : 'NOT FOUND');
    if (info.context) console.log('  Context:', JSON.stringify(info.context.substring(0, 200)));
  }

  console.log('\n=== CARD CONTAINERS ===');
  result.containers.forEach((c, i) => {
    console.log('\n--- ' + c.brand + ' ---');
    console.log('Card class:', c.cardClass);
    console.log('Card dataset:', c.cardDataset);
    console.log('Card text:', c.cardText.substring(0, 250));
  });

  await browser.close();
})();
