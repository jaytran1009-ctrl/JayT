/**
 * JAYT REAL CDP PHYSICAL EVIDENCE CAPTURE RUNNER (069-STEP1B)
 * Directive: JAYT-069-STEP1B — PRIORITY PHYSICAL EVIDENCE CAPTURE
 * 
 * Captures 3 priority leads:
 * 1. Starlight Cinema (http://starlight.vn/uu-dai.html)
 * 2. Lotteria Vietnam (https://www.lotteria.vn/khuyen-mai)
 * 3. Phê La (https://phela.vn)
 * 
 * For each lead, saves:
 * - PNG screenshot
 * - HTML rendered DOM
 * - Text extract
 * - Capture Receipt with SHA-256 hashes & verbatim extracts
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const evidenceDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_069_step1b');
fs.mkdirSync(evidenceDir, { recursive: true });

function getSha256(bufferOrStr) {
  return crypto.createHash('sha256').update(bufferOrStr).digest('hex');
}

function findBrowserPath() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  for (const c of candidates) {
    if (c && fs.existsSync(c)) return c;
  }
  return null;
}

async function captureUrl(browserPath, targetUrl, leadId, prefix) {
  console.log(`\n📸 [CDP-CAPTURE] Bắt đầu capture cho ${leadId}: ${targetUrl}`);
  const port = 9333 + Math.floor(Math.random() * 500);
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

    // Create target
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

    // Wait 5 seconds for dynamic JS / network render
    await new Promise(r => setTimeout(r, 5000));

    // 1. Capture HTML
    const domRes = await sendPage('Runtime.evaluate', { expression: 'document.documentElement.outerHTML' });
    const htmlContent = domRes.result?.value || '';

    // 2. Capture Text
    const textRes = await sendPage('Runtime.evaluate', { expression: 'document.body ? document.body.innerText : ""' });
    const textContent = textRes.result?.value || '';

    // 3. Capture Page Title
    const titleRes = await sendPage('Runtime.evaluate', { expression: 'document.title' });
    const pageTitle = titleRes.result?.value || '';

    // 4. Capture Screenshot PNG
    const screenshotRes = await sendPage('Page.captureScreenshot', { format: 'png', quality: 90 });
    const pngBuffer = Buffer.from(screenshotRes.data, 'base64');

    // Save files
    const pngPath = path.join(evidenceDir, `${prefix}_capture.png`);
    const htmlPath = path.join(evidenceDir, `${prefix}_capture.html`);
    const txtPath = path.join(evidenceDir, `${prefix}_capture.txt`);
    const receiptPath = path.join(evidenceDir, `CAPTURE_RECEIPT_${leadId}.json`);

    fs.writeFileSync(pngPath, pngBuffer);
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    fs.writeFileSync(txtPath, textContent, 'utf8');

    const pngSha = getSha256(pngBuffer);
    const htmlSha = getSha256(Buffer.from(htmlContent, 'utf8'));
    const txtSha = getSha256(Buffer.from(textContent, 'utf8'));

    const receiptObj = {
      $schema: 'https://jayt.vn/schemas/live-cdp-capture-receipt.v1.json',
      lead_id: leadId,
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
      text_sample_first_500_chars: textContent.slice(0, 500)
    };

    fs.writeFileSync(receiptPath, JSON.stringify(receiptObj, null, 2), 'utf8');
    console.log(`  [SUCCESS] Capture ${leadId} hoàn tất: PNG (${pngBuffer.length} bytes), HTML (${htmlContent.length} bytes), Text (${textContent.length} bytes).`);
    console.log(`  Receipt: ${receiptPath}`);

    pageWs.close();
    ws.close();
    chromeProc.kill();

    return { success: true, receipt: receiptObj };
  } catch (err) {
    console.error(`  [ERROR] Capture ${leadId} thất bại: ${err.message}`);
    if (ws) ws.close();
    chromeProc.kill();
    return { success: false, error: err.message };
  }
}

(async () => {
  const browserPath = findBrowserPath();
  if (!browserPath) {
    console.error('FATAL: Chrome/Edge executable not found!');
    process.exit(1);
  }
  console.log(`Browser executable: ${browserPath}`);

  const targets = [
    {
      lead_id: 'LEAD-068-05-STARLIGHT',
      target_url: 'http://starlight.vn/uu-dai.html',
      prefix: 'starlight_promotions'
    },
    {
      lead_id: 'LEAD-068-07-LOTTERIA',
      target_url: 'https://www.lotteria.vn/khuyen-mai',
      prefix: 'lotteria_promotions'
    },
    {
      lead_id: 'LEAD-068-10-PHELA',
      target_url: 'https://phela.vn/he-thong-cua-hang/',
      prefix: 'phela_stores_danang'
    }
  ];

  for (const t of targets) {
    await captureUrl(browserPath, t.target_url, t.lead_id, t.prefix);
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('\n✅ [ALL-CAPTURES-COMPLETED]');
})();
