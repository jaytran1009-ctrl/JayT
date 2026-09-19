const { spawn } = require('child_process');
const fs = require('fs');

async function testNavigate(url) {
  const port = 9933;
  const browserPath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(browserPath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-software-rasterizer',
    `--remote-debugging-port=${port}`,
    'about:blank'
  ]);

  try {
    let targetWs = null;
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/list`);
        const list = await res.json();
        if (list[0]?.webSocketDebuggerUrl) {
          targetWs = list[0].webSocketDebuggerUrl;
          break;
        }
      } catch {}
    }

    const ws = new WebSocket(targetWs);
    await new Promise(r => ws.onopen = r);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const curId = id++;
        const t = setTimeout(() => reject(new Error('timeout ' + method)), 15000);
        const h = (evt) => {
          const d = JSON.parse(evt.data);
          if (d.id === curId) {
            clearTimeout(t);
            ws.removeEventListener('message', h);
            resolve(d.result);
          }
        };
        ws.addEventListener('message', h);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    console.log('Navigating to', url);
    await send('Page.enable');
    await send('Page.navigate', { url });
    await new Promise(r => setTimeout(r, 4000));

    console.log('Capturing screenshot...');
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    console.log('Screenshot captured, bytes:', Buffer.from(shot.data, 'base64').length);

    const txt = await send('Runtime.evaluate', { expression: 'document.body.innerText' });
    console.log('Text preview:', (txt.result.value || '').slice(0, 150).replace(/\n/g, ' '));
  } finally {
    chromeProc.kill('SIGKILL');
  }
}

testNavigate('https://phela.vn/').catch(console.error);
