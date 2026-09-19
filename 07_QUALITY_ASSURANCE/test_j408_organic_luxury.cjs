const puppeteer = require('puppeteer');
const assert = require('assert');

(async () => {
  const base = process.env.JAYT_J408_TEST_URL || 'http://127.0.0.1:4191/';
  const browser = await puppeteer.launch({ headless: true });
  for (const viewport of [{ width:390, height:844 }, { width:1440, height:900 }]) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.setViewport({ ...viewport, deviceScaleFactor:1 });
    const response = await page.goto(base, { waitUntil:'networkidle2' });
    assert([200,304].includes(response.status()));
    const m = await page.evaluate(() => {
      const visible = (s) => { const e=document.querySelector(s); return !!e && getComputedStyle(e).display !== 'none' && e.getClientRects().length; };
      const dock=document.querySelector('#counter-quick-dock');
      return {
        version:document.querySelector('[data-version]')?.dataset.version,
        overflow:document.documentElement.scrollWidth > document.documentElement.clientWidth,
        marks:document.querySelectorAll('.j408-brand-mark').length,
        oldCopy:document.body.innerText.includes('Không biến trang chủ thành kho dữ liệu') || document.body.innerText.includes('Terminal soi link'),
        title:document.querySelector('#j406-title')?.textContent.trim(),
        restored:['#campus-dock-section','#cinema-schedule-container','#lunch-arbitrage-module','#split-bill-module'].every(visible),
        dockVisible:visible('#counter-quick-dock'),
        dockHeight:dock?.getBoundingClientRect().height || 0,
        affiliateLeak:document.documentElement.innerHTML.includes('affiliate_enabled: true')
      };
    });
    assert.strictEqual(m.version,'v3.460.0-j408');
    assert.strictEqual(m.marks,5);
    assert.strictEqual(m.oldCopy,false);
    assert.strictEqual(m.title,'Đặc quyền vừa đúng lúc.');
    assert(m.restored && !m.overflow && !m.affiliateLeak);
    if (viewport.width === 390) assert(m.dockVisible && m.dockHeight >= 55 && m.dockHeight <= 58);
    else assert.strictEqual(m.dockVisible,false);

    await page.evaluate(() => document.querySelector('#j405-pass-flip').click());
    const pass = await page.evaluate(() => {
      const card=document.querySelector('#j406-private-concierge #j405-pass-card');
      const back=card.querySelector('.j405-pass-back');
      const qr=back.querySelector('#j405-pass-qr');
      const cr=card.getBoundingClientRect(), qrRect=qr.getBoundingClientRect();
      return { transform:getComputedStyle(back).transform, visible:getComputedStyle(back).display !== 'none', qrInside:qrRect.left>=cr.left&&qrRect.right<=cr.right&&qrRect.top>=cr.top&&qrRect.bottom<=cr.bottom };
    });
    assert(pass.visible && pass.transform === 'none' && pass.qrInside);

    const hudMs=await page.evaluate(()=>{
      const start=performance.now();
      openCashierQuickCard('highlands_coffee');
      const modal=document.querySelector('#cashier-quick-modal');
      if (!modal || getComputedStyle(modal).display === 'none') throw new Error('Cashier HUD did not open');
      return performance.now()-start;
    });
    assert(hudMs < 30, `HUD ${hudMs}ms`);
    assert.strictEqual(errors.length,0,errors.join('\n'));
    console.log(`J408 ${viewport.width}px PASS | 5 ambient monograms | HUD ${hudMs.toFixed(2)}ms | 0 console errors`);
    await page.close();
  }
  await browser.close();
})().catch((error)=>{ console.error(error); process.exit(1); });
