const puppeteer = require('puppeteer');

async function testFetch() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const targets = [
    { name: 'Starlight U22', url: 'https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html' },
    { name: 'Starlight Thu 3', url: 'https://starlight.vn/uu-dai/thu-3-phim-viet-1046.html' },
    { name: 'The Coffee House', url: 'https://thecoffeehouse.com/' },
    { name: 'Popeyes VN Promo', url: 'https://popeyes.vn/promotion' },
    { name: 'Gong Cha Member', url: 'https://gongcha.com.vn/chinh-sach-thanh-vien/' },
    { name: 'Katinat App', url: 'https://katinat.vn/katinat-chinh-thuc-ra-mat-ung-dung-kung-thanh-vien-khong-gioi-han/' }
  ];

  for (const t of targets) {
    console.log(`\n=== Probing ${t.name}: ${t.url} ===`);
    try {
      const resp = await page.goto(t.url, { waitUntil: 'networkidle2', timeout: 30000 });
      const status = resp.status();
      const title = await page.title();
      const text = await page.evaluate(() => document.body.innerText.slice(0, 800));
      console.log(`Status: ${status} | Title: ${title}`);
      console.log(`Sample text: ${text.replace(/\s+/g, ' ').slice(0, 300)}...`);
    } catch (e) {
      console.log(`Error probing ${t.name}: ${e.message}`);
    }
  }

  await browser.close();
}

testFetch();
