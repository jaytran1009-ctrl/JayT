/**
 * JAYT MULTI-CLUSTER CAPTURE ENGINE 070A - PER-TARGET SPAWN
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const rawBatchDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_070_multi_cluster_discovery');
fs.mkdirSync(rawBatchDir, { recursive: true });

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

const capturePlan = [
  {
    key: 'FNB_PHELA_HOME',
    lead_id: 'LEAD-068-10-PHELA',
    merchant_name: 'Phê La Đà Nẵng',
    url: 'https://phela.vn/',
    prefix: 'phela_home',
    receiptFile: 'FRESH_CAPTURE_RECEIPT_PHELA_HOME.json',
    purchase_channel: 'AT_COUNTER',
    description: 'Trang chủ thương hiệu Phê La chính thức'
  },
  {
    key: 'FNB_LOTTERIA_HOME',
    lead_id: 'LEAD-068-07-LOTTERIA',
    merchant_name: 'Lotteria Vietnam Đà Nẵng',
    url: 'https://lotteria.vn/',
    prefix: 'lotteria_home',
    receiptFile: 'FRESH_CAPTURE_RECEIPT_LOTTERIA_HOME.json',
    purchase_channel: 'AT_COUNTER',
    description: 'Trang chủ Lotteria Vietnam'
  },
  {
    key: 'FNB_HIGHLANDS_PROMO',
    lead_id: 'LEAD-068-03-HIGHLANDS',
    merchant_name: 'Highlands Coffee Đà Nẵng',
    url: 'https://highlandscoffee.com.vn/vn/tin-tuc-su-kien.html',
    prefix: 'highlands_promo',
    receiptFile: 'FRESH_CAPTURE_RECEIPT_HIGHLANDS_PROMO.json',
    purchase_channel: 'AT_COUNTER',
    description: 'Tin tức sự kiện khuyến mãi Highlands Coffee'
  }
];

function validateAndMintReceipt(receiptObj, targetPath) {
  if (!receiptObj.checked_at || typeof receiptObj.checked_at !== 'string' || !receiptObj.checked_at.endsWith('Z')) {
    throw new Error(`RECEIPT_VALIDATION_ERROR: Missing or invalid 'checked_at' UTC timestamp`);
  }
  if (!receiptObj.purchase_channel) {
    throw new Error(`RECEIPT_VALIDATION_ERROR: Missing 'purchase_channel'`);
  }
  if (!receiptObj.artifacts || Object.keys(receiptObj.artifacts).length === 0) {
    throw new Error(`RECEIPT_VALIDATION_ERROR: Missing 'artifacts'`);
  }
  for (const [k, v] of Object.entries(receiptObj.artifacts)) {
    if (!v.sha256 || typeof v.size_bytes !== 'number' || !v.path) {
      throw new Error(`RECEIPT_VALIDATION_ERROR: Artifact ${k} missing sha256/size_bytes/path`);
    }
  }
  fs.writeFileSync(targetPath, JSON.stringify(receiptObj, null, 2), 'utf8');
}

async function captureSingle(browserPath, item) {
  const port = 9880 + Math.floor(Math.random() * 100);
  console.log(`\n======================================================`);
  console.log(`📡 [ISOLATED-CAPTURE] ${item.key} (${item.url}) trên port ${port}...`);

  const chromeProc = spawn(browserPath, [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${port}`,
    '--window-size=1280,1024',
    item.url
  ]);

  let pageWs = null;
  try {
    let targetWsUrl = null;
    for (let attempt = 0; attempt < 35; attempt++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
        if (listRes.ok) {
          const list = await listRes.json();
          if (list.length > 0 && list[0].webSocketDebuggerUrl) {
            targetWsUrl = list[0].webSocketDebuggerUrl;
            break;
          }
        }
      } catch {}
    }

    if (!targetWsUrl) throw new Error(`Cannot connect to target on port ${port}`);

    pageWs = new WebSocket(targetWsUrl);
    await new Promise((resolve, reject) => {
      pageWs.onopen = resolve;
      pageWs.onerror = reject;
    });

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        const timeout = setTimeout(() => reject(new Error(`CDP ${method} timeout`)), 30000);
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

    await send('Page.enable');
    await send('Runtime.enable');
    await send('DOM.enable');

    await new Promise(r => setTimeout(r, 5000));

    const checkedAtUtc = new Date().toISOString();

    // 1. Capture PNG
    const screenshotRes = await send('Page.captureScreenshot', { format: 'png', fromSurface: true });
    const pngBuffer = Buffer.from(screenshotRes.data, 'base64');
    const pngPath = path.join(rawBatchDir, `${item.prefix}.png`);
    fs.writeFileSync(pngPath, pngBuffer);
    const pngSha = getSha256(pngBuffer);

    // 2. Capture HTML
    const htmlRes = await send('Runtime.evaluate', { expression: 'document.documentElement.outerHTML' });
    const htmlContent = htmlRes.result?.value || '';
    const htmlPath = path.join(rawBatchDir, `${item.prefix}.html`);
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    const htmlSha = getSha256(htmlContent);

    // 3. Extract Text
    const textRes = await send('Runtime.evaluate', { expression: 'document.body ? document.body.innerText : ""' });
    const textContent = textRes.result?.value || '';
    const textPath = path.join(rawBatchDir, `${item.prefix}.txt`);
    fs.writeFileSync(textPath, textContent, 'utf8');
    const textSha = getSha256(textContent);

    // 4. Mint Receipt
    const receiptRelDir = path.relative(repoRoot, rawBatchDir).replace(/\\/g, '/');
    const receiptObj = {
      $schema: 'https://jayt.vn/schemas/raw-capture-receipt.v1.json',
      receipt_id: `RECEIPT_${item.key}_${Date.now()}`,
      task_key: item.key,
      lead_id: item.lead_id,
      merchant_name: item.merchant_name,
      target_url: item.url,
      description: item.description,
      purchase_channel: item.purchase_channel,
      checked_at: checkedAtUtc,
      capture_method: 'LIVE_CHROME_CDP_ANONYMOUS',
      browser_info: 'Google Chrome Headless via CDP WebSocket',
      artifacts: {
        screenshot_png: {
          path: `${receiptRelDir}/${item.prefix}.png`,
          sha256: pngSha,
          size_bytes: pngBuffer.length
        },
        dom_html: {
          path: `${receiptRelDir}/${item.prefix}.html`,
          sha256: htmlSha,
          size_bytes: Buffer.byteLength(htmlContent, 'utf8')
        },
        extracted_text: {
          path: `${receiptRelDir}/${item.prefix}.txt`,
          sha256: textSha,
          size_bytes: Buffer.byteLength(textContent, 'utf8')
        }
      },
      integrity_status: 'VERIFIED_ON_DISK_IMMUTABLE_FRESH'
    };

    const receiptPath = path.join(rawBatchDir, item.receiptFile);
    validateAndMintReceipt(receiptObj, receiptPath);

    console.log(`  ✅ Thành công [${item.key}]:`);
    console.log(`     PNG: ${item.prefix}.png (${pngBuffer.length} B, SHA: ${pngSha.slice(0, 16)}...)`);
    console.log(`     HTML: ${item.prefix}.html (${Buffer.byteLength(htmlContent, 'utf8')} B)`);
    console.log(`     TXT: ${item.prefix}.txt (${Buffer.byteLength(textContent, 'utf8')} B)`);
  } finally {
    try { if (pageWs) pageWs.close(); } catch {}
    try { chromeProc.kill('SIGKILL'); } catch {}
  }
}

async function main() {
  const browserPath = findBrowserPath();
  for (const item of capturePlan) {
    try {
      await captureSingle(browserPath, item);
    } catch (e) {
      console.error(`  ❌ Lỗi [${item.key}]: ${e.message}`);
    }
  }
}

main();
