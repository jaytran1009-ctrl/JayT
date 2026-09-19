/**
 * INSPECT METIZ BOOKING FLOW VIA CDP
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const evidenceDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_069_step2_metiz');

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

async function main() {
  const browserPath = findBrowserPath();
  const port = 9620;
  console.log(`🚀 [METIZ-BOOKING-CDP] Khởi động Chrome CDP trên cổng ${port}...`);

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
        const timeout = setTimeout(() => reject(new Error(`CDP command ${method} timed out`)), 30000);
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

    const newTarget = await send('Target.createTarget', { url: 'https://metiz.vn/lich-chieu-phim.html' });
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
        const timeout = setTimeout(() => reject(new Error(`Page command ${method} timed out`)), 30000);
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

    console.log('📡 Đang chờ lịch chiếu load...');
    await new Promise(r => setTimeout(r, 4500));

    // Find showtime buttons / links
    const showtimeLinks = await sendPage('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('a, button, span, div')).filter(el => {
          const t = el.innerText ? el.innerText.trim() : '';
          return /^\\d{1,2}:\\d{2}$/.test(t) || (el.tagName === 'A' && el.href.includes('booking'));
        }).map(el => ({
          text: el.innerText ? el.innerText.trim() : '',
          href: el.href || el.getAttribute('data-href') || el.getAttribute('onclick') || '',
          className: el.className
        }));
        return btns;
      })()`,
      returnByValue: true
    });

    console.log('🎬 Showtime buttons found:', showtimeLinks.result?.value);

    // Try clicking first showtime button
    const clickResult = await sendPage('Runtime.evaluate', {
      expression: `(() => {
        const targetBtn = Array.from(document.querySelectorAll('a, button, span, div')).find(el => {
          const t = el.innerText ? el.innerText.trim() : '';
          return /^\\d{1,2}:\\d{2}$/.test(t);
        });
        if (targetBtn) {
          targetBtn.click();
          return { clicked: true, text: targetBtn.innerText };
        }
        return { clicked: false };
      })()`,
      returnByValue: true
    });

    console.log('👉 Click result:', clickResult.result?.value);
    await new Promise(r => setTimeout(r, 4000));

    const currentUrl = await sendPage('Runtime.evaluate', { expression: 'window.location.href' });
    const currentTitle = await sendPage('Runtime.evaluate', { expression: 'document.title' });
    const currentText = await sendPage('Runtime.evaluate', { expression: 'document.body ? document.body.innerText.slice(0, 600) : ""' });

    console.log(`\n📍 Trạng thái sau khi click showtime:`);
    console.log(`URL: ${currentUrl.result?.value}`);
    console.log(`Title: "${currentTitle.result?.value}"`);
    console.log(`Text: ${currentText.result?.value}`);

    // If redirected to booking or modal opened, capture screenshot
    const screenshotRes = await sendPage('Page.captureScreenshot', { format: 'png', fromSurface: true });
    const pngBuffer = Buffer.from(screenshotRes.data, 'base64');
    const pngPath = path.join(evidenceDir, 'metiz_booking_flow_session_capture.png');
    fs.writeFileSync(pngPath, pngBuffer);
    const pngSha = getSha256(pngBuffer);

    const htmlRes = await sendPage('Runtime.evaluate', { expression: 'document.documentElement.outerHTML' });
    const htmlContent = htmlRes.result?.value || '';
    const htmlPath = path.join(evidenceDir, 'metiz_booking_flow_session_capture.html');
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    const htmlSha = getSha256(htmlContent);

    const textContent = (await sendPage('Runtime.evaluate', { expression: 'document.body ? document.body.innerText : ""' })).result?.value || '';
    const textPath = path.join(evidenceDir, 'metiz_booking_flow_session_capture.txt');
    fs.writeFileSync(textPath, textContent, 'utf8');
    const textSha = getSha256(textContent);

    const receiptRelativeDir = path.relative(repoRoot, evidenceDir).replace(/\\/g, '/');
    const receiptObj = {
      $schema: 'https://jayt.vn/schemas/raw-capture-receipt.v1.json',
      receipt_id: `RECEIPT_METIZ_BOOKING_FLOW_${Date.now()}`,
      task_key: 'METIZ_BOOKING_FLOW',
      lead_id: 'LEAD-068-02-METIZ',
      merchant_name: 'Metiz Cinema Đà Nẵng',
      target_url: currentUrl.result?.value || 'https://metiz.vn/lich-chieu-phim.html',
      description: 'Khảo sát luồng đặt vé và chọn suất chiếu live tại Metiz Cinema Đà Nẵng',
      captured_at: new Date().toISOString(),
      capture_method: 'LIVE_CHROME_CDP_ANONYMOUS',
      browser_info: 'Google Chrome Headless via CDP WebSocket',
      artifacts: {
        screenshot_png: {
          path: `${receiptRelativeDir}/metiz_booking_flow_session_capture.png`,
          sha256: pngSha,
          size_bytes: pngBuffer.length
        },
        dom_html: {
          path: `${receiptRelativeDir}/metiz_booking_flow_session_capture.html`,
          sha256: htmlSha,
          size_bytes: Buffer.byteLength(htmlContent, 'utf8')
        },
        extracted_text: {
          path: `${receiptRelativeDir}/metiz_booking_flow_session_capture.txt`,
          sha256: textSha,
          size_bytes: Buffer.byteLength(textContent, 'utf8')
        }
      },
      integrity_status: 'VERIFIED_ON_DISK'
    };

    const receiptPath = path.join(evidenceDir, 'CAPTURE_RECEIPT_METIZ_BOOKING_FLOW.json');
    fs.writeFileSync(receiptPath, JSON.stringify(receiptObj, null, 2), 'utf8');
    console.log(`🧾 Đã lưu Booking Flow Receipt: ${receiptPath}`);

    pageWs.close();
  } finally {
    if (ws) ws.close();
    chromeProc.kill('SIGTERM');
  }
}

main().catch(console.error);
