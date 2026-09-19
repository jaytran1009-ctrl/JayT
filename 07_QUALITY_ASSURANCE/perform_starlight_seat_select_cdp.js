/**
 * JAYT STARLIGHT SEAT SELECT & PRICE CALCULATION LIVE CDP (069-STEP1D)
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

async function runSeatSelectInspection() {
  const browserPath = findBrowserPath();
  const port = 9888 + Math.floor(Math.random() * 100);

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

    const targetUrl = 'https://starlight.vn/dat-ve.html?film_name=NGH%E1%BB%88%20H%C3%88%20S%E1%BB%A2%20NGH%E1%BB%88%20H%C6%AFU%20(T13)&time_id=167dbfea-3de8-4e5a-8cad-f09c7f0c39ad&date=24/08/2026&format=2D&room=01&image=https://starlight.vn/Areas/Admin/Content/Fileuploads/images/POSTER2026/Nghi-he-so-nghi-huu.jpg&time=14:20&server_id=2&r_date=2026-08-24&l_age=T13';

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

    // Click available seat e.g. B05 or C05
    const clickSeatRes = await sendPage('Runtime.evaluate', {
      expression: `
        (() => {
          const seats = Array.from(document.querySelectorAll('.seat, div, span, a')).filter(el => {
            const txt = el.innerText?.trim();
            return txt && /^[B-H]\\d{2}$/.test(txt);
          });
          if (seats.length > 0) {
            const s = seats[0];
            s.click();
            return { clicked: true, seat: s.innerText };
          }
          return { clicked: false };
        })()
      `,
      returnByValue: true
    });
    console.log('🪑 [SEAT-CLICK-RESULT]:', clickSeatRes.result?.value);

    // Wait 3 seconds for dynamic price calculation
    await new Promise(r => setTimeout(r, 3000));

    // Extract calculated total price and price breakdown
    const priceCalculationRes = await sendPage('Runtime.evaluate', {
      expression: `
        (() => {
          const info = [];
          document.querySelectorAll('.total-price, .money, .price, .ticket-info, #total, p, span, h4, h3, div').forEach(el => {
            const txt = el.innerText?.trim();
            if (txt && (/\\d{2,3}\\.000/.test(txt) || txt.includes('Tổng') || txt.includes('VNĐ') || txt.includes('đ') || txt.includes('Giá'))) {
              info.push({ tag: el.tagName, className: el.className, text: txt });
            }
          });
          return {
            url: window.location.href,
            title: document.title,
            priceFindings: info.slice(0, 20),
            fullBodyText: document.body ? document.body.innerText : ''
          };
        })()
      `,
      returnByValue: true
    });
    console.log('💰 [PRICE-CALCULATION-FOUND]:', JSON.stringify(priceCalculationRes.result?.value?.priceFindings, null, 2));

    // Capture HTML, Text, Screenshot
    const domRes = await sendPage('Runtime.evaluate', { expression: 'document.documentElement.outerHTML' });
    const htmlContent = domRes.result?.value || '';

    const textContent = priceCalculationRes.result?.value?.fullBodyText || '';
    const screenshotRes = await sendPage('Page.captureScreenshot', { format: 'png', quality: 90 });
    const pngBuffer = Buffer.from(screenshotRes.data, 'base64');

    const prefix = 'starlight_danang_seat_selected_live_pricing';
    const pngPath = path.join(evidenceDir, `${prefix}_capture.png`);
    const htmlPath = path.join(evidenceDir, `${prefix}_capture.html`);
    const txtPath = path.join(evidenceDir, `${prefix}_capture.txt`);
    const receiptPath = path.join(evidenceDir, 'CAPTURE_RECEIPT_STARLIGHT_SEAT_SELECTED_PRICE.json');

    fs.writeFileSync(pngPath, pngBuffer);
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    fs.writeFileSync(txtPath, textContent, 'utf8');

    const pngSha = getSha256(pngBuffer);
    const htmlSha = getSha256(Buffer.from(htmlContent, 'utf8'));
    const txtSha = getSha256(Buffer.from(textContent, 'utf8'));

    const receiptObj = {
      $schema: 'https://jayt.vn/schemas/live-cdp-capture-receipt.v1.json',
      step: 'LIVE_SEAT_SELECT_AND_PRICE_CALCULATION',
      target_url: targetUrl,
      page_title: priceCalculationRes.result?.value?.title || '',
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
      seat_selected: clickSeatRes.result?.value?.seat || '',
      price_findings: priceCalculationRes.result?.value?.priceFindings || [],
      text_sample: textContent.slice(0, 1000)
    };

    fs.writeFileSync(receiptPath, JSON.stringify(receiptObj, null, 2), 'utf8');
    console.log(`\n✅ [SEAT-SELECTED-PRICE-SAVED] Captured: PNG (${pngBuffer.length} bytes), HTML (${htmlContent.length} bytes), Text (${textContent.length} bytes).`);
    console.log(`Receipt: ${receiptPath}`);
    console.log(`PNG SHA-256: ${pngSha}`);
    console.log(`HTML SHA-256: ${htmlSha}`);
    console.log(`TXT SHA-256: ${txtSha}`);

    pageWs.close();
    ws.close();
    chromeProc.kill();
  } catch (err) {
    console.error('Error during seat select inspection:', err);
    if (ws) ws.close();
    chromeProc.kill();
  }
}

runSeatSelectInspection();
