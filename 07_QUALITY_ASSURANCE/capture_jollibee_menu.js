const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const rawBatchDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_070_multi_cluster_discovery');

function getSha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

async function captureJollibeeMenu() {
  const browserPath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9911;
  const chromeProc = spawn(browserPath, [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${port}`,
    'https://jollibee.com.vn/thuc-don'
  ]);

  let ws = null;
  try {
    let targetWsUrl = null;
    for (let i = 0; i < 35; i++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
        const list = await listRes.json();
        if (list[0]?.webSocketDebuggerUrl) {
          targetWsUrl = list[0].webSocketDebuggerUrl;
          break;
        }
      } catch {}
    }

    if (!targetWsUrl) throw new Error('Cannot connect to CDP');
    ws = new WebSocket(targetWsUrl);
    await new Promise(r => ws.onopen = r);

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const curId = msgId++;
        const t = setTimeout(() => reject(new Error('timeout ' + method)), 30000);
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

    await send('Page.enable');
    await send('Runtime.enable');
    await send('DOM.enable');

    await new Promise(r => setTimeout(r, 5000));

    const textRes = await send('Runtime.evaluate', { expression: 'document.body ? document.body.innerText : ""' });
    const textContent = textRes.result?.value || '';

    const htmlRes = await send('Runtime.evaluate', { expression: 'document.documentElement.outerHTML' });
    const htmlContent = htmlRes.result?.value || '';

    const shotRes = await send('Page.captureScreenshot', { format: 'png', fromSurface: true });
    const pngBuf = Buffer.from(shotRes.data, 'base64');

    fs.writeFileSync(path.join(rawBatchDir, 'jollibee_menu.png'), pngBuf);
    fs.writeFileSync(path.join(rawBatchDir, 'jollibee_menu.html'), htmlContent, 'utf8');
    fs.writeFileSync(path.join(rawBatchDir, 'jollibee_menu.txt'), textContent, 'utf8');

    const receiptObj = {
      $schema: 'https://jayt.vn/schemas/raw-capture-receipt.v1.json',
      receipt_id: `RECEIPT_FNB_JOLLIBEE_MENU_${Date.now()}`,
      task_key: 'FNB_JOLLIBEE_MENU',
      lead_id: 'LEAD-068-06-JOLLIBEE',
      merchant_name: 'Jollibee Vietnam',
      target_url: 'https://jollibee.com.vn/thuc-don',
      description: 'Thực đơn niêm yết giá chính thức Jollibee Vietnam',
      purchase_channel: 'AT_COUNTER',
      checked_at: new Date().toISOString(),
      capture_method: 'LIVE_CHROME_CDP_ANONYMOUS',
      artifacts: {
        screenshot_png: {
          path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_070_multi_cluster_discovery/jollibee_menu.png',
          sha256: getSha256(pngBuf),
          size_bytes: pngBuf.length
        },
        dom_html: {
          path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_070_multi_cluster_discovery/jollibee_menu.html',
          sha256: getSha256(Buffer.from(htmlContent, 'utf8')),
          size_bytes: Buffer.byteLength(htmlContent, 'utf8')
        },
        extracted_text: {
          path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_070_multi_cluster_discovery/jollibee_menu.txt',
          sha256: getSha256(Buffer.from(textContent, 'utf8')),
          size_bytes: Buffer.byteLength(textContent, 'utf8')
        }
      }
    };

    fs.writeFileSync(path.join(rawBatchDir, 'FRESH_CAPTURE_RECEIPT_JOLLIBEE_MENU.json'), JSON.stringify(receiptObj, null, 2), 'utf8');
    console.log('✅ Jollibee Menu Captured Successfully!');
    console.log('Text preview:\n', textContent.slice(0, 400));
  } finally {
    if (ws) ws.close();
    chromeProc.kill('SIGKILL');
  }
}

captureJollibeeMenu().catch(console.error);
