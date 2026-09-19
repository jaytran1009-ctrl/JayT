/**
 * READ SUPER MONDAY METIZ TEXT
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
  const port = 9595;
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

    const newTarget = await send('Target.createTarget', { url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html' });
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

    await new Promise(r => setTimeout(r, 4500));

    const pageData = await sendPage('Runtime.evaluate', {
      expression: `(() => {
        return {
          title: document.title,
          url: window.location.href,
          bodyText: document.body ? document.body.innerText : ''
        };
      })()`,
      returnByValue: true
    });

    console.log('=== METIZ SUPER MONDAY FULL TEXT ===\n');
    console.log(pageData.result?.value?.bodyText);

    pageWs.close();
  } finally {
    if (ws) ws.close();
    chromeProc.kill('SIGTERM');
  }
}

main().catch(console.error);
