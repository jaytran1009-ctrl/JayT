/**
 * JAYT STARLIGHT OFFICIAL DETAIL CAPTURES RUNNER (069-STEP1C)
 * Directive: JAYT-069-STEP1C — STARLIGHT OFFICIAL DETAIL CAPTURE
 * 
 * Captures direct promotion detail links from Starlight Cinema:
 * 1. https://starlight.vn/uu-dai/thu-3-phim-viet-1046.html ("THỨ 3 PHIM VIỆT")
 * 2. https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html ("CT U22 RẠP STARLIGHT")
 * 3. https://starlight.vn/uu-dai/bang-gia-ve-ap-dung-hien-hanh-cac-rap-starlight-cinema-1043.html ("BẢNG GIÁ VÉ ÁP DỤNG HIỆN HÀNH")
 * 4. https://starlight.vn/uu-dai/dia-chi-rap-1034.html ("ĐỊA CHỈ RẠP")
 * 
 * For each page, saves:
 * - PNG Screenshot
 * - HTML DOM
 * - Text Extract
 * - Capture Receipt with SHA-256
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const evidenceDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_069_step1c_starlight');
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

async function captureDetailUrl(browserPath, targetUrl, slug) {
  console.log(`\n📸 [CDP-DETAIL-CAPTURE] Bắt đầu capture: ${targetUrl} (${slug})`);
  const port = 9444 + Math.floor(Math.random() * 500);
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

    // Wait 6 seconds for dynamic JS / images / content load
    await new Promise(r => setTimeout(r, 6000));

    // 1. Capture HTML
    const domRes = await sendPage('Runtime.evaluate', { expression: 'document.documentElement.outerHTML' });
    const htmlContent = domRes.result?.value || '';

    // 2. Capture Text
    const textRes = await sendPage('Runtime.evaluate', { expression: 'document.body ? document.body.innerText : ""' });
    const textContent = textRes.result?.value || '';

    // 3. Capture Title
    const titleRes = await sendPage('Runtime.evaluate', { expression: 'document.title' });
    const pageTitle = titleRes.result?.value || '';

    // 4. Capture Screenshot
    const screenshotRes = await sendPage('Page.captureScreenshot', { format: 'png', quality: 90 });
    const pngBuffer = Buffer.from(screenshotRes.data, 'base64');

    // Save files
    const pngPath = path.join(evidenceDir, `${slug}_capture.png`);
    const htmlPath = path.join(evidenceDir, `${slug}_capture.html`);
    const txtPath = path.join(evidenceDir, `${slug}_capture.txt`);
    const receiptPath = path.join(evidenceDir, `CAPTURE_RECEIPT_${slug.toUpperCase()}.json`);

    fs.writeFileSync(pngPath, pngBuffer);
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    fs.writeFileSync(txtPath, textContent, 'utf8');

    const pngSha = getSha256(pngBuffer);
    const htmlSha = getSha256(Buffer.from(htmlContent, 'utf8'));
    const txtSha = getSha256(Buffer.from(textContent, 'utf8'));

    const receiptObj = {
      $schema: 'https://jayt.vn/schemas/live-cdp-capture-receipt.v1.json',
      slug,
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
      text_sample: textContent.slice(0, 800)
    };

    fs.writeFileSync(receiptPath, JSON.stringify(receiptObj, null, 2), 'utf8');
    console.log(`  [SUCCESS] Detail capture ${slug} hoàn tất: PNG (${pngBuffer.length} bytes), HTML (${htmlContent.length} bytes), Text (${textContent.length} bytes).`);
    console.log(`  Receipt: ${receiptPath}`);

    pageWs.close();
    ws.close();
    chromeProc.kill();

    return { success: true, receipt: receiptObj };
  } catch (err) {
    console.error(`  [ERROR] Capture ${slug} thất bại: ${err.message}`);
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
      targetUrl: 'https://starlight.vn/uu-dai/thu-3-phim-viet-1046.html',
      slug: 'starlight_thu_3_phim_viet'
    },
    {
      targetUrl: 'https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html',
      slug: 'starlight_ct_u22'
    },
    {
      targetUrl: 'https://starlight.vn/uu-dai/bang-gia-ve-ap-dung-hien-hanh-cac-rap-starlight-cinema-1043.html',
      slug: 'starlight_bang_gia_ve_hien_hanh'
    },
    {
      targetUrl: 'https://starlight.vn/uu-dai/dia-chi-rap-1034.html',
      slug: 'starlight_dia_chi_rap'
    }
  ];

  for (const t of targets) {
    await captureDetailUrl(browserPath, t.targetUrl, t.slug);
    await new Promise(r => setTimeout(r, 1500));
  }

  console.log('\n✅ [ALL-STARLIGHT-DETAIL-CAPTURES-COMPLETED]');
})();
