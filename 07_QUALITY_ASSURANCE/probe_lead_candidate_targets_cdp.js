/**
 * PROBE LEAD CANDIDATE TARGETS VIA NATIVE CHROME CDP
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

const targets = [
  { name: 'METIZ_HOME', lead_id: 'LEAD-068-02-METIZ', url: 'https://metiz.vn/' },
  { name: 'METIZ_PROMO', lead_id: 'LEAD-068-02-METIZ', url: 'https://metiz.vn/uu-dai/' },
  { name: 'CGV_OFFERS', lead_id: 'LEAD-068-03-CGV', url: 'https://www.cgv.vn/default/movies/offers.html' },
  { name: 'CGV_VINH_TRUNG', lead_id: 'LEAD-068-03-CGV', url: 'https://www.cgv.vn/default/cinox/site/cgv-vinh-trung-plaza' },
  { name: 'JOLLIBEE_PROMO', lead_id: 'LEAD-068-06-JOLLIBEE', url: 'https://jollibee.com.vn/khuyen-mai' },
  { name: 'PHELA_HOME', lead_id: 'LEAD-068-10-PHELA', url: 'https://phela.vn/' },
  { name: 'PHELA_STORES', lead_id: 'LEAD-068-10-PHELA', url: 'https://phela.vn/cua-hang/' }
];

async function main() {
  const browserPath = findBrowserPath();
  if (!browserPath) {
    console.error('FATAL: Browser executable not found!');
    process.exit(1);
  }

  const port = 9560 + Math.floor(Math.random() * 300);
  console.log(`🚀 [PROBE-CDP] Khởi động Chrome CDP trên cổng ${port}...`);

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
        const timeout = setTimeout(() => reject(new Error(`CDP command ${method} timed out`)), 20000);
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

    console.log('\n🔍 Bắt đầu probe danh sách các mục tiêu Lead tiềm năng:\n');

    for (const t of targets) {
      console.log(`📡 [PROBE] ${t.lead_id} | ${t.name}: ${t.url}...`);
      try {
        const targetRes = await send('Target.createTarget', { url: t.url, width: 1280, height: 1024 });
        const targetId = targetRes.targetId;

        await new Promise(r => setTimeout(r, 500));
        const pageWsRes = await fetch(`http://127.0.0.1:${port}/json/list`);
        const pages = await pageWsRes.json();
        const pageObj = pages.find(p => p.id === targetId);

        if (!pageObj) {
          console.log(`   ❌ Không tìm thấy page object cho target ${targetId}`);
          continue;
        }

        const pageWs = new WebSocket(pageObj.webSocketDebuggerUrl);
        await new Promise((resolve, reject) => {
          pageWs.onopen = resolve;
          pageWs.onerror = reject;
        });

        let pageMsgId = 1;
        function sendPage(method, params = {}) {
          return new Promise((resolve, reject) => {
            const id = pageMsgId++;
            const timeout = setTimeout(() => reject(new Error(`Page command ${method} timed out`)), 20000);
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

        // Wait for page to settle
        await new Promise(r => setTimeout(r, 3500));

        const titleRes = await sendPage('Runtime.evaluate', { expression: 'document.title' });
        const urlRes = await sendPage('Runtime.evaluate', { expression: 'window.location.href' });
        const textRes = await sendPage('Runtime.evaluate', { expression: 'document.body ? document.body.innerText.length : 0' });

        console.log(`   ✅ Status: OK | Title: "${titleRes?.result?.value}" | TextLength: ${textRes?.result?.value} chars | URL: ${urlRes?.result?.value}`);

        pageWs.close();
        await send('Target.closeTarget', { targetId });
      } catch (err) {
        console.log(`   ❌ Lỗi khi probe ${t.name}: ${err.message}`);
      }
    }

  } finally {
    if (ws) ws.close();
    chromeProc.kill('SIGTERM');
  }

  console.log('\n🏁 [PROBE-COMPLETE] Đã hoàn tất khảo sát các mục tiêu.');
}

main().catch(console.error);
