/**
 * INSPECT METIZ CINEMA ĐÀ NẴNG (CDP DEEP CRAWLER)
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

  const port = 9580 + Math.floor(Math.random() * 200);
  console.log(`🚀 [METIZ-INSPECT-CDP] Khởi động Chrome CDP trên cổng ${port}...`);

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

    const newTarget = await send('Target.createTarget', { url: 'https://metiz.vn/' });
    const targetId = newTarget.targetId;

    await new Promise(r => setTimeout(r, 500));
    const pagesRes = await fetch(`http://127.0.0.1:${port}/json/list`);
    const pages = await pagesRes.json();
    const targetPage = pages.find(p => p.id === targetId);

    if (!targetPage) throw new Error(`Cannot find created target page ${targetId}`);

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

    console.log('📡 Đang chờ trang tải: https://metiz.vn/...');
    await new Promise(r => setTimeout(r, 5000));

    const homeData = await sendPage('Runtime.evaluate', {
      expression: `(() => {
        const links = Array.from(document.querySelectorAll('a[href]')).map(a => ({
          text: a.innerText.trim().replace(/\\s+/g, ' '),
          href: a.href
        })).filter(l => l.text.length > 0 || l.href.includes('metiz.vn'));

        return {
          title: document.title,
          url: window.location.href,
          text: document.body ? document.body.innerText : '',
          links: links
        };
      })()`,
      returnByValue: true
    });

    const val = homeData.result?.value || {};
    console.log(`\n📄 Trang chủ Metiz Cinema: "${val.title}"`);
    console.log(`URL: ${val.url}`);
    console.log(`Độ dài văn bản: ${val.text?.length || 0} ký tự\n`);

    console.log('🔗 Danh sách liên kết nội bộ Metiz:');
    const uniqueLinks = new Map();
    for (const l of val.links || []) {
      if (!uniqueLinks.has(l.href)) {
        uniqueLinks.set(l.href, l.text);
      }
    }
    for (const [href, text] of uniqueLinks.entries()) {
      console.log(` - [${text}] -> ${href}`);
    }

    // Check specific promo or price links
    const interestingLinks = Array.from(uniqueLinks.keys()).filter(href => 
      href.includes('gia-ve') || href.includes('khuyen-mai') || href.includes('uu-dai') || 
      href.includes('lich-chieu') || href.includes('thanh-vien') || href.includes('u22') ||
      href.includes('cinema') || href.includes('event') || href.includes('tin-tuc') ||
      href.includes('movie') || href.includes('showtime')
    );

    console.log(`\n🎯 Các liên kết tiềm năng liên quan đến giá/ưu đãi (${interestingLinks.length}):`, interestingLinks);

    for (const link of interestingLinks) {
      console.log(`\n📡 Đang khám phá sâu: ${link}...`);
      await sendPage('Page.navigate', { url: link });
      await new Promise(r => setTimeout(r, 4000));

      const subData = await sendPage('Runtime.evaluate', {
        expression: `(() => {
          return {
            title: document.title,
            url: window.location.href,
            textSnippet: (document.body ? document.body.innerText : '').slice(0, 500).replace(/\\s+/g, ' ')
          };
        })()`,
        returnByValue: true
      });
      console.log(`   Tiêu đề: "${subData.result?.value?.title}"`);
      console.log(`   Nội dung: ${subData.result?.value?.textSnippet}`);
    }

    pageWs.close();
  } finally {
    if (ws) ws.close();
    chromeProc.kill('SIGTERM');
  }
}

main().catch(console.error);
