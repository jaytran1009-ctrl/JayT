/**
 * JAYT STARLIGHT SHOWTIME CLICK & TICKET PRICING STEP INSPECTOR (069-STEP1D)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const evidenceDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_069_step1d_starlight_booking');

function getSha256(bufferOrStr) {
  return crypto.createHash('sha256').update(bufferOrStr).digest('hex');
}

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

async function runShowtimeInspection() {
  const browserPath = findBrowserPath();
  const port = 9666 + Math.floor(Math.random() * 300);

  const chromeProc = spawn(browserPath, [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${port}`,
    '--window-size=1280,1024'
  ]);

  let ws = null;
  try {
    for (let attempt = 0; attempt < 20; attempt++) {
      await new Promise(r => setTimeout(r, 250));
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

    if (!ws) throw new Error('Cannot connect to Chrome CDP');

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

    const targetUrl = 'https://starlight.vn/lich-chieu.html';
    const targetRes = await send('Target.createTarget', { url: targetUrl, width: 1280, height: 1024 });
    const targetId = targetRes.targetId;
    const pageWsRes = await fetch(`http://127.0.0.1:${port}/json/list`);
    const pages = await pageWsRes.json();
    const pageObj = pages.find(p => p.id === targetId);

    const pageWs = new WebSocket(pageObj.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      pageWs.onopen = resolve;
      pageWs.onerror = reject;
    });

    let pageMsgId = 1;
    function sendPage(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = pageMsgId++;
        const timeout = setTimeout(() => reject(new Error(`CDP page command ${method} timed out`)), 25000);
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
    await sendPage('DOM.enable');
    await sendPage('Runtime.enable');
    await sendPage('Page.navigate', { url: targetUrl });

    await new Promise(r => setTimeout(r, 6000));

    // Click Đà Nẵng cinema tab
    await sendPage('Runtime.evaluate', {
      expression: `
        (() => {
          const links = Array.from(document.querySelectorAll('a, button'));
          const dng = links.find(l => l.innerText && l.innerText.includes('STARLIGHT ĐÀ NẴNG'));
          if (dng) dng.click();
        })()
      `
    });
    await new Promise(r => setTimeout(r, 3000));

    // Click first available showtime
    const clickShowtimeRes = await sendPage('Runtime.evaluate', {
      expression: `
        (() => {
          const showtimeLinks = Array.from(document.querySelectorAll('a, button, span')).filter(el => {
            return /^\\d{1,2}:\\d{2}$/.test(el.innerText?.trim()) || el.className?.includes('showtime') || el.className?.includes('time');
          });
          if (showtimeLinks.length > 0) {
            const first = showtimeLinks[0];
            const href = first.getAttribute('href') || first.onclick?.toString();
            first.click();
            return { clicked: true, text: first.innerText, href: href };
          }
          return { clicked: false };
        })()
      `,
      returnByValue: true
    });
    console.log('🎬 [CLICK-SHOWTIME-RESULT]:', clickShowtimeRes.result?.value);

    await new Promise(r => setTimeout(r, 5000));

    // Inspect the resulting page (modal / login prompt / seat map)
    const afterClickRes = await sendPage('Runtime.evaluate', {
      expression: `
        (() => {
          return {
            url: window.location.href,
            title: document.title,
            bodyText: document.body ? document.body.innerText.slice(0, 1500) : ''
          };
        })()
      `,
      returnByValue: true
    });
    console.log('🔍 [PAGE-AFTER-SHOWTIME-CLICK]:', JSON.stringify(afterClickRes.result?.value, null, 2));

    // Capture Screenshot & DOM
    const domRes = await sendPage('Runtime.evaluate', { expression: 'document.documentElement.outerHTML' });
    const htmlContent = domRes.result?.value || '';

    const textContent = afterClickRes.result?.value?.bodyText || '';
    const screenshotRes = await sendPage('Page.captureScreenshot', { format: 'png', quality: 90 });
    const pngBuffer = Buffer.from(screenshotRes.data, 'base64');

    const prefix = 'starlight_danang_showtime_click_screen';
    const pngPath = path.join(evidenceDir, `${prefix}_capture.png`);
    const htmlPath = path.join(evidenceDir, `${prefix}_capture.html`);
    const txtPath = path.join(evidenceDir, `${prefix}_capture.txt`);
    const receiptPath = path.join(evidenceDir, 'CAPTURE_RECEIPT_STARLIGHT_SHOWTIME_STEP.json');

    fs.writeFileSync(pngPath, pngBuffer);
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    fs.writeFileSync(txtPath, textContent, 'utf8');

    const pngSha = getSha256(pngBuffer);
    const htmlSha = getSha256(Buffer.from(htmlContent, 'utf8'));
    const txtSha = getSha256(Buffer.from(textContent, 'utf8'));

    const receiptObj = {
      $schema: 'https://jayt.vn/schemas/live-cdp-capture-receipt.v1.json',
      step: 'SHOWTIME_SELECTION_AND_TICKET_PRICING',
      target_url: afterClickRes.result?.value?.url || targetUrl,
      page_title: afterClickRes.result?.value?.title || '',
      checked_at: new Date().toISOString(),
      browser_engine: 'Chromium / Chrome Headless (CDP)',
      artifacts: {
        screenshot_png: {
          path: path.relative(repoRoot, pngPath).replace(/\\/g, '/'),
          sha256: pngSha,
          size_bytes: pngBuffer.length
        },
        dom_html: {
          path: path.relative(repoRoot, htmlPath).replace(/\\/g, '/'),
          sha256: htmlSha,
          size_bytes: Buffer.byteLength(htmlContent, 'utf8')
        },
        extracted_text: {
          path: path.relative(repoRoot, txtPath).replace(/\\/g, '/'),
          sha256: txtSha,
          size_bytes: Buffer.byteLength(textContent, 'utf8')
        }
      },
      text_sample: textContent.slice(0, 1000)
    };

    fs.writeFileSync(receiptPath, JSON.stringify(receiptObj, null, 2), 'utf8');
    console.log(`\n✅ [SHOWTIME-STEP-SAVED] Captured: PNG (${pngBuffer.length} bytes), HTML (${htmlContent.length} bytes), Text (${textContent.length} bytes).`);
    console.log(`Receipt: ${receiptPath}`);
    console.log(`PNG SHA-256: ${pngSha}`);
    console.log(`HTML SHA-256: ${htmlSha}`);
    console.log(`TXT SHA-256: ${txtSha}`);

    pageWs.close();
    ws.close();
    chromeProc.kill();
  } catch (err) {
    console.error('Error during showtime inspection:', err);
    if (ws) ws.close();
    chromeProc.kill();
  }
}

runShowtimeInspection();
