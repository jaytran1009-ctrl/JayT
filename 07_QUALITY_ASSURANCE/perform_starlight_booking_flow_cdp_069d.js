/**
 * JAYT STARLIGHT BOOKING FLOW CURRENT PRICE CONFIRMATION RUNNER (069-STEP1D)
 * Directive: JAYT-069-STEP1D — STARLIGHT CURRENT-PRICE CONFIRMATION
 * 
 * Inspects official booking flow for Starlight Đà Nẵng:
 * 1. https://starlight.vn/lich-chieu.html
 * 2. Selects / filters Starlight Đà Nẵng cinema.
 * 3. Checks current movie showtimes and pricing matrix (U22, Phim Việt, standard 2D).
 * 
 * Saves:
 * - PNG Screenshot
 * - Rendered HTML
 * - Extracted Text
 * - Capture Receipt with measured SHA-256 hashes
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const evidenceDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_069_step1d_starlight_booking');
fs.mkdirSync(evidenceDir, { recursive: true });

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

async function runBookingInspection() {
  const browserPath = findBrowserPath();
  if (!browserPath) {
    console.error('FATAL: Browser executable not found!');
    process.exit(1);
  }

  const port = 9555 + Math.floor(Math.random() * 400);
  console.log(`\n🚀 [CDP-BOOKING-INSPECT] Khởi động Chrome CDP trên cổng ${port}...`);

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

    // Wait for initial load
    await new Promise(r => setTimeout(r, 6000));

    // Evaluate available cinema options and click Starlight Đà Nẵng if available
    const inspectScript = `
      (() => {
        const cinemas = [];
        document.querySelectorAll('select option, .cinema-item, [data-cinema], button, a').forEach(el => {
          const txt = el.textContent.trim();
          if (txt.includes('Đà Nẵng') || txt.includes('Da Nang') || txt.includes('Starlight')) {
            cinemas.push({ tag: el.tagName, text: txt, id: el.id, className: el.className });
          }
        });
        return {
          title: document.title,
          cinemasFound: cinemas,
          bodyTextSample: document.body ? document.body.innerText.slice(0, 1000) : ''
        };
      })()
    `;
    const evalRes = await sendPage('Runtime.evaluate', { expression: inspectScript, returnByValue: true });
    console.log('🔍 [INSPECT-RESULTS]:', JSON.stringify(evalRes.result?.value, null, 2));

    // Try selecting Starlight Đà Nẵng if select element exists
    await sendPage('Runtime.evaluate', {
      expression: `
        (() => {
          const selects = Array.from(document.querySelectorAll('select'));
          for (const s of selects) {
            const opts = Array.from(s.options);
            const dngOpt = opts.find(o => o.text.includes('Đà Nẵng') || o.text.includes('Da Nang'));
            if (dngOpt) {
              s.value = dngOpt.value;
              s.dispatchEvent(new Event('change', { bubbles: true }));
              return 'SELECTED_OPTION_' + dngOpt.text;
            }
          }
          // Try clicking cinema tab
          const tabs = Array.from(document.querySelectorAll('a, button, li, div'));
          const dngTab = tabs.find(t => t.innerText && t.innerText.includes('Đà Nẵng') && (t.tagName === 'A' || t.tagName === 'BUTTON' || t.onclick || t.className.includes('tab')));
          if (dngTab) {
            dngTab.click();
            return 'CLICKED_TAB_' + dngTab.innerText;
          }
          return 'NO_DIRECT_CINEMA_SELECTOR_FOUND';
        })()
      `
    });

    // Wait 4 seconds after selection
    await new Promise(r => setTimeout(r, 4000));

    // Capture HTML, Text, Title, Screenshot
    const domRes = await sendPage('Runtime.evaluate', { expression: 'document.documentElement.outerHTML' });
    const htmlContent = domRes.result?.value || '';

    const textRes = await sendPage('Runtime.evaluate', { expression: 'document.body ? document.body.innerText : ""' });
    const textContent = textRes.result?.value || '';

    const titleRes = await sendPage('Runtime.evaluate', { expression: 'document.title' });
    const pageTitle = titleRes.result?.value || '';

    const screenshotRes = await sendPage('Page.captureScreenshot', { format: 'png', quality: 90 });
    const pngBuffer = Buffer.from(screenshotRes.data, 'base64');

    // Save files
    const prefix = 'starlight_danang_schedule_booking';
    const pngPath = path.join(evidenceDir, `${prefix}_capture.png`);
    const htmlPath = path.join(evidenceDir, `${prefix}_capture.html`);
    const txtPath = path.join(evidenceDir, `${prefix}_capture.txt`);
    const receiptPath = path.join(evidenceDir, 'CAPTURE_RECEIPT_STARLIGHT_BOOKING_FLOW.json');

    fs.writeFileSync(pngPath, pngBuffer);
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    fs.writeFileSync(txtPath, textContent, 'utf8');

    const pngSha = getSha256(pngBuffer);
    const htmlSha = getSha256(Buffer.from(htmlContent, 'utf8'));
    const txtSha = getSha256(Buffer.from(textContent, 'utf8'));

    const receiptObj = {
      $schema: 'https://jayt.vn/schemas/live-cdp-capture-receipt.v1.json',
      lead_id: 'LEAD-068-05-STARLIGHT',
      target_url: targetUrl,
      page_title: pageTitle,
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
    console.log(`\n✅ [CAPTURE-SAVED] Starlight Booking Flow captured: PNG (${pngBuffer.length} bytes), HTML (${htmlContent.length} bytes), Text (${textContent.length} bytes).`);
    console.log(`Receipt: ${receiptPath}`);
    console.log(`PNG SHA-256: ${pngSha}`);
    console.log(`HTML SHA-256: ${htmlSha}`);
    console.log(`TXT SHA-256: ${txtSha}`);

    pageWs.close();
    ws.close();
    chromeProc.kill();
    return { success: true, receipt: receiptObj };
  } catch (err) {
    console.error(`[ERROR] Inspection failed: ${err.message}`);
    if (ws) ws.close();
    chromeProc.kill();
    return { success: false, error: err.message };
  }
}

runBookingInspection();
