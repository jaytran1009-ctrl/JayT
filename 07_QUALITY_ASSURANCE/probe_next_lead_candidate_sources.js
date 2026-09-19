/**
 * PROBE NEXT LEAD CANDIDATE SOURCES (CDP PROBE)
 */

const puppeteer = require('puppeteer');

const targets = [
  { name: 'METIZ_HOME', url: 'https://metiz.vn/' },
  { name: 'METIZ_PROMO', url: 'https://metiz.vn/uu-dai/' },
  { name: 'CGV_OFFERS', url: 'https://www.cgv.vn/default/movies/offers.html' },
  { name: 'CGV_VINH_TRUNG', url: 'https://www.cgv.vn/default/cinox/site/cgv-vinh-trung-plaza' },
  { name: 'JOLLIBEE_PROMO', url: 'https://jollibee.com.vn/khuyen-mai' },
  { name: 'PHELA_HOME', url: 'https://phela.vn/' },
  { name: 'PHELA_STORES', url: 'https://phela.vn/cua-hang/' }
];

async function main() {
  console.log('🚀 [PROBE-START] Khởi động kiểm tra khả năng kết nối tới các nguồn Lead...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  for (const t of targets) {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1280, height: 800 });

    try {
      console.log(`📡 Đang probe: ${t.name} (${t.url})...`);
      const resp = await page.goto(t.url, { waitUntil: 'networkidle2', timeout: 20000 });
      const status = resp ? resp.status() : 'NO_RESPONSE';
      const title = await page.title();
      const pageUrl = page.url();
      console.log(`   Status: ${status} | Title: "${title}" | Final URL: ${pageUrl}`);
    } catch (err) {
      console.log(`   ❌ Error: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n🏁 [PROBE-END] Hoàn tất probe kết nối.');
}

main().catch(console.error);
