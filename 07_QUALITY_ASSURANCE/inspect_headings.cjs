const fs = require('fs');
const puppeteer = require('puppeteer');
const http = require('http');
const path = require('path');

const STATIC_DIR = path.resolve('staging_preview_sprint_b');
const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const safePath = path.normalize(path.join(STATIC_DIR, reqPath));
  if (fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
    res.writeHead(200);
    fs.createReadStream(safePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(4179, '127.0.0.1', async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:4179/');

  const views = ['HOME', 'VOUCHER_HUB', 'SPLIT_BILL_PRO', 'SAVINGS_CALENDAR', 'VALUE_RADAR'];
  for (const v of views) {
    await page.evaluate((nav) => {
      const btn = document.querySelector('.nav-btn[data-nav="' + nav + '"]');
      if (btn) btn.click();
    }, v);
    await new Promise(r => setTimeout(r, 150));
    const headings = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
        tag: h.tagName,
        text: h.innerText.slice(0, 50).trim(),
        visible: h.offsetParent !== null,
        className: h.className
      }));
    });
    console.log('=== VIEW: ' + v + ' ===');
    console.log(headings);
  }

  await browser.close();
  server.close();
});
