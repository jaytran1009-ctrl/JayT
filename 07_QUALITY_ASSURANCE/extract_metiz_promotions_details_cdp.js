/**
 * EXTRACT METIZ CINEMA PROMOTIONS DETAILS VIA CDP
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function findBrowserPath() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  for (const c of candidates) {
    if (c && fs.existsSync(c)) return c;
  }
  return null;
}

async function main() {
  const browserPath = findBrowserPath();
  if (!browserPath) {
    console.error('FATAL: Browser executable not found!');
    process.exit(1);
  }

  const port = 9585 + Math.floor(Math.random() * 200);
  console.log(`🚀 [METIZ-EXTRACT-CDP] Khởi động Chrome CDP trên cổng ${port}...`);

  const chromeProc = spawn(browserPath, [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${port}`,
    '--window-size=1280,1024'
  ]);

  let ws = null;
  try {
    for (let attempt = 0; attempt < 25; attempt++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const listRes = await fetch(`http://127.0.0.1:${port}/json/version`);
        if (listRes.ok) {
          const ver = await listRes.json();
          ws = new WebSocket(ver.webSocketDebuggerUrl);
          await new Promise((res, rej) => {
            ws.onopen = res;
            ws.onerror = rej;
          });
          break;
        }
      } catch {}
    }

    if (!ws) throw new Error(`Cannot connect to Chrome CDP on port ${port}`);

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        const timeout = setTimeout(() => reject(new Error(`CDP command ${method} timed out`)), 25000);
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === id) {
            clearTimeout(timeout);
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    const newTarget = await send('Target.createTarget', { url: 'https://metiz.vn/tin-va-khuyen-mai.html' });
    const targetId = newTarget.targetId;

    await new Promise(r => setTimeout(r, 500));
    const pagesRes = await fetch(`http://127.0.0.1:${port}/json/list`);
    const pages = await pagesRes.json();
    const targetPage = pages.find(p => p.id === targetId);

    const pageWs = new WebSocket(targetPage.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      pageWs.onopen = resolve;
      pageWs.onerror = reject;
    });

    let pageMsgId = 1;
    function sendPage(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = pageMsgId++;
        const timeout = setTimeout(() => reject(new Error(`Page command ${method} timed out`)), 25000);
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === id) {
            clearTimeout(timeout);
            pageWs.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        pageWs.addEventListener('message', handler);
        pageWs.send(JSON.stringify({ id, method, params }));
      });
    }

    await sendPage('Page.enable');
    await sendPage('Runtime.enable');

    console.log('📡 Đang tải trang danh mục khuyến mãi Metiz...');
    await new Promise(r => setTimeout(r, 4000));

    // Extract all promotion items and links
    const promoList = await sendPage('Runtime.evaluate', {
      expression: `(() => {
        const cards = [];
        // Scan for elements containing promotion info
        const allLinks = Array.from(document.querySelectorAll('a')).map(a => ({
          href: a.href,
          text: a.innerText.trim(),
          innerHTML: a.innerHTML
        }));

        const cardElements = Array.from(document.querySelectorAll('.item, .card, .promo-item, .col, article, li, div')).filter(el => {
          const t = el.innerText || '';
          return (t.includes('SUPER MONDAY') || t.includes('U22') || t.includes('THỨ HAI') || t.includes('GIÁ VÉ')) && el.querySelector('a');
        });

        return {
          allLinks: allLinks.filter(l => l.href.includes('metiz.vn')),
          rawText: document.body ? document.body.innerText : ''
        };
      })()`,
      returnByValue: true
    });

    const val = promoList.result?.value || {};
    console.log('\n📄 Toàn bộ text trên trang Tin & Khuyến Mãi:\n', val.rawText);

    console.log('\n🔗 Tất cả links tìm thấy trên trang:');
    const links = val.allLinks || [];
    for (const l of links) {
      if (l.text) {
        console.log(` - [${l.text.replace(/\s+/g, ' ')}] -> ${l.href}`);
      }
    }

    // Also check About page for address
    console.log('\n📡 Đang khám phá trang Giới Thiệu / Địa Chỉ (https://metiz.vn/about.html)...');
    await sendPage('Page.navigate', { url: 'https://metiz.vn/about.html' });
    await new Promise(r => setTimeout(r, 4000));

    const aboutData = await sendPage('Runtime.evaluate', {
      expression: `(() => {
        return {
          title: document.title,
          text: document.body ? document.body.innerText : ''
        };
      })()`,
      returnByValue: true
    });

    console.log(`\n📄 Trang About: "${aboutData.result?.value?.title}"`);
    console.log(aboutData.result?.value?.text);

    pageWs.close();
  } finally {
    if (ws) ws.close();
    chromeProc.kill('SIGTERM');
  }
}

main().catch(console.error);
