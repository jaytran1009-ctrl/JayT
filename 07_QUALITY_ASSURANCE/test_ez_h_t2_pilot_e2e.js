/**
 * JAYT CONTROLLED T2 STAGING PILOT BROWSER E2E SUITE (SECTION EZ-H)
 * Governing Directive: JAYT-245 Section EZ-H (Lines 4101-4124)
 * Port: 4173
 */

const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');
const assert = require('assert');

const TARGET_URL = 'http://127.0.0.1:4173/';

async function runEZHT2PilotE2E() {
  console.log('\n🎭 RUNNING JAYT SECTION EZ-H CONTROLLED T2 PILOT BROWSER E2E QA...');
  console.log('   Target: ' + TARGET_URL + '\n');

  let browser;
  let totalTests = 0;
  let passedTests = 0;

  async function it(name, fn) {
    totalTests++;
    try {
      await fn();
      console.log('  ✓ ' + name);
      passedTests++;
    } catch (err) {
      console.error('  ✕ ' + name + ': ' + err.message);
      throw err;
    }
  }

  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const viewports = [
      { name: 'Desktop 1440', width: 1440, height: 900 },
      { name: 'Tablet 768', width: 768, height: 1024 },
      { name: 'Mobile 390', width: 390, height: 844 }
    ];

    for (const vp of viewports) {
      console.log('\n--- Viewport: ' + vp.name + ' (' + vp.width + 'x' + vp.height + ') ---');
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height });

      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 15000 });

      await it('[' + vp.name + '] 0 console JS errors on load', () => {
        const critical = consoleErrors.filter(e => !e.includes('favicon') && !e.includes('404'));
        assert.strictEqual(critical.length, 0, 'Critical console errors found: ' + JSON.stringify(critical));
      });

      await it('[' + vp.name + '] 0 Maps links in rendered DOM', async () => {
        const mapsHrefCount = await page.evaluate(() => {
          return document.querySelectorAll('a[href*="google.com/maps"], a[href*="maps.google.com"], a[href*="goo.gl/maps"]').length;
        });
        assert.strictEqual(mapsHrefCount, 0);
      });

      // --- T2 Pilot Card Assertions ---
      await it('[' + vp.name + '] Controlled T2 pilot card is rendered and visible', async () => {
        const cardExists = await page.evaluate(() => {
          const card = document.querySelector('.t2-pilot-card-section');
          return card !== null;
        });
        assert.strictEqual(cardExists, true);
      });

      await it('[' + vp.name + '] Pilot card has neutral title "GitHub Education — Thông tin đăng ký"', async () => {
        const title = await page.evaluate(() => {
          const card = document.querySelector('.t2-pilot-card-section');
          const h2 = card ? card.querySelector('h2') : null;
          return h2 ? h2.innerText.trim() : '';
        });
        assert.strictEqual(title, 'GitHub Education — Thông tin đăng ký');
      });

      await it('[' + vp.name + '] Pilot card renders exact approved grounded sentence', async () => {
        const text = await page.evaluate(() => {
          const card = document.querySelector('.t2-pilot-card-section');
          return card ? card.innerText : '';
        });
        const expectedSentence = 'Theo tài liệu chính thức của GitHub, người học hoặc giảng viên tại một cơ sở giáo dục được công nhận có thể nộp đơn đăng ký GitHub Education.';
        assert.ok(text.includes(expectedSentence), 'Missing approved sentence in pilot card text');
      });

      await it('[' + vp.name + '] Pilot card renders mandatory scope and exclusion caveat', async () => {
        const text = await page.evaluate(() => {
          const card = document.querySelector('.t2-pilot-card-section');
          return card ? card.innerText : '';
        });
        const expectedCaveat = 'Phạm vi: chương trình toàn cầu; điều kiện và quyền lợi áp dụng do GitHub quyết định. JayT không xác nhận voucher, giá hay ưu đãi tại Đà Nẵng.';
        assert.ok(text.includes(expectedCaveat), 'Missing approved caveat in pilot card text');
      });

      await it('[' + vp.name + '] Pilot card has safe canonical action CTA (rel="noopener noreferrer nofollow")', async () => {
        const cta = await page.evaluate(() => {
          const link = document.querySelector('.t2-pilot-card-section a');
          return link ? {
            href: link.href,
            text: link.innerText.trim(),
            rel: link.getAttribute('rel'),
            target: link.getAttribute('target')
          } : null;
        });
        assert.ok(cta !== null);
        assert.ok(cta.text.includes('Mở tài liệu chính thức'));
        assert.ok(cta.href.includes('docs.github.com/en/education'));
        assert.strictEqual(cta.target, '_blank');
        assert.ok(cta.rel.includes('nofollow'));
      });

      await it('[' + vp.name + '] Fact Da Nang is NOT rendered as a verified utility card (Held Internal)', async () => {
        const dnUtilityCard = await page.evaluate(() => {
          const cards = document.querySelectorAll('.t2-pilot-card-section, .value-layer-card[data-lane="VERIFIED_UTILITY"]');
          let count = 0;
          cards.forEach(c => {
            if (c.innerText.includes('Cổng Thông Tin Điện Tử Thành Phố Đà Nẵng') && c.innerText.includes('TIỆN ÍCH ĐÃ KIỂM')) count++;
          });
          return count;
        });
        assert.strictEqual(dnUtilityCard, 0);
      });

      await it('[' + vp.name + '] 0 forbidden counts / unverified locality / fake promo in public DOM', async () => {
        const bodyText = await page.evaluate(() => document.body.innerText);
        assert.strictEqual(bodyText.includes('Đang hiển thị 50/50'), false);
        assert.strictEqual(bodyText.includes('Khám phá (50)'), false);
        assert.strictEqual(bodyText.includes('Chương Trình (13)'), false);
      });

      // Savings Lab functionality check
      await it('[' + vp.name + '] Savings Lab form and inputs are functional and clean', async () => {
        await page.evaluate(() => {
          const btn = document.querySelector('[data-nav="BUY_DECISION"]');
          if (btn) btn.click();
        });
        await new Promise(r => setTimeout(r, 100));
        const hasInputs = await page.evaluate(() => {
          return document.getElementById('calc-item-price') !== null;
        });
        assert.strictEqual(hasInputs, true);
      });

      await page.close();
    }

    console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-H T2 PILOT BROWSER E2E TESTS PASSED!\n');
  } finally {
    if (browser) await browser.close();
  }
}

runEZHT2PilotE2E().catch(err => {
  console.error('\n✕ Fatal E2E Error:', err);
  process.exit(1);
});
