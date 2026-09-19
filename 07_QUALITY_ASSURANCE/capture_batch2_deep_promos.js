/**
 * JAYT BATCH 2 DEEP PROMO ACQUISITION
 * Directive: JAYT-070D
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const deepRunId = `run_070d_batch2_deep_${Date.now()}`;
const deepRawDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', deepRunId);
fs.mkdirSync(deepRawDir, { recursive: true });

function getSha256(bufOrStr) {
  return crypto.createHash('sha256').update(bufOrStr).digest('hex');
}

function findBrowserPath() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  for (const c of candidates) {
    if (c && fs.existsSync(c)) return c;
  }
  return null;
}

const deepTargets = [
  // F&B / Fastfood
  { id: 'JOLLIBEE_COMBO', url: 'https://jollibee.com.vn/thuc-don/combo-1-nguoi', category: 'FNB_FASTFOOD' },
  { id: 'LOTTERIA_SET', url: 'https://www.lotteria.vn/category/set', category: 'FNB_FASTFOOD' },
  { id: 'HIGHLANDS_COMBO', url: 'https://www.highlandscoffee.com.vn/vn/thuc-don.html', category: 'FNB_CAFE' },
  { id: 'PHUCLONG_COMBO', url: 'https://phuclong.com.vn/khuyen-mai/combo-he-dam-vi-tiep-suc-vi-vu', category: 'FNB_CAFE' },
  { id: 'PHELA_MENU', url: 'https://phela.vn/menu/', category: 'FNB_CAFE' },
  { id: 'KATINAT_MENU', url: 'https://katinat.vn/menu/', category: 'FNB_CAFE' },
  // Online / App / Delivery
  { id: 'SHOPEE_VOUCHER_XTRA', url: 'https://shopee.vn/m/ma-giam-gia', category: 'ONLINE_ECOMMERCE' },
  { id: 'SHOPEEFOOD_DNG_COLLECTION', url: 'https://shopeefood.vn/bo-suu-tap/quan-ngon-da-nang-giam-40000d', category: 'ONLINE_FOOD_DELIVERY' },
  { id: 'SHOPEEFOOD_DNG_BUOM', url: 'https://shopeefood.vn/da-nang/bun-cha-ca-109-nguyen-chi-thanh', category: 'ONLINE_FOOD_DELIVERY' },
  { id: 'GRABFOOD_DNG', url: 'https://food.grab.com/vn/vi/restaurants', category: 'ONLINE_FOOD_DELIVERY' }
];

async function captureSingle(browserPath, t) {
  console.log(`\n🔍 [DEEP-CAPTURE] Bắt đầu quét ${t.id}: ${t.url}...`);
  const port = 9600 + Math.floor(Math.random() * 300);
  const chromeProc = spawn(browserPath, [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${port}`,
    '--window-size=1280,1024',
    '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    t.url
  ]);

  let ws = null;
  try {
    for (let attempt = 0; attempt < 25; attempt++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
        if (listRes.ok) {
          const list = await listRes.json();
          const page = list.find(p => p.type === 'page' || p.url.includes(t.url) || p.url.startsWith('http'));
          if (page && page.webSocketDebuggerUrl) {
            ws = new WebSocket(page.webSocketDebuggerUrl);
            await new Promise((res, rej) => {
              ws.onopen = res;
              ws.onerror = rej;
            });
            break;
          }
        }
      } catch {}
    }

    if (!ws) throw new Error(`Cannot connect to Chrome page websocket on port ${port}`);

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

    await send('Page.enable');
    await send('DOM.enable');
    await send('Runtime.enable');

    // Wait 7 seconds for dynamic promo loading
    await new Promise(r => setTimeout(r, 7000));

    const evalRes = await send('Runtime.evaluate', {
      expression: `({
        title: document.title,
        url: window.location.href,
        text: document.body ? document.body.innerText.slice(0, 25000) : '',
        links: Array.from(document.querySelectorAll('a[href]')).map(a => ({ text: a.innerText.trim(), href: a.href })).filter(l => l.text.length > 2).slice(0, 40)
      })`,
      returnByValue: true
    });

    const pageData = evalRes?.result?.value || {};
    const screenshotRes = await send('Page.captureScreenshot', { format: 'png' });
    const htmlRes = await send('Runtime.evaluate', {
      expression: 'document.documentElement.outerHTML',
      returnByValue: true
    });

    const checkedAt = new Date().toISOString();
    const pngBuf = Buffer.from(screenshotRes?.data || '', 'base64');
    const htmlStr = htmlRes?.result?.value || '';
    const textStr = pageData.text || '';

    const pngFile = `${t.id.toLowerCase()}_capture.png`;
    const htmlFile = `${t.id.toLowerCase()}_raw.html`;
    const textFile = `${t.id.toLowerCase()}_text.txt`;

    fs.writeFileSync(path.join(deepRawDir, pngFile), pngBuf);
    fs.writeFileSync(path.join(deepRawDir, htmlFile), htmlStr, 'utf8');
    fs.writeFileSync(path.join(deepRawDir, textFile), textStr, 'utf8');

    const pngSha = getSha256(pngBuf);
    const htmlSha = getSha256(htmlStr);
    const textSha = getSha256(textStr);

    const receipt = {
      receipt_id: `RECEIPT_${t.id}_${Date.now()}`,
      target_id: t.id,
      category: t.category,
      source_url: t.url,
      canonical_url: pageData.url || t.url,
      checked_at: checkedAt,
      captured_at: checkedAt,
      page_title: pageData.title || '',
      artifacts: {
        png: { file: pngFile, size_bytes: pngBuf.length, sha256: pngSha },
        html: { file: htmlFile, size_bytes: Buffer.byteLength(htmlStr), sha256: htmlSha },
        text: { file: textFile, size_bytes: Buffer.byteLength(textStr), sha256: textSha }
      }
    };

    const receiptFile = `receipt_${t.id.toLowerCase()}.json`;
    fs.writeFileSync(path.join(deepRawDir, receiptFile), JSON.stringify(receipt, null, 2), 'utf8');
    console.log(`  🟢 [SUCCESS] ${t.id}: ${pageData.title?.slice(0, 60)} | Text: ${textStr.length} chars`);

    return { success: true, target: t, receipt, textStr };
  } catch (err) {
    console.error(`  🔴 [FAILED] ${t.id}: ${err.message}`);
    return { success: false, target: t, error: err.message };
  } finally {
    if (ws) ws.close();
    chromeProc.kill();
  }
}

async function runDeep() {
  const browserPath = findBrowserPath();
  if (!browserPath) throw new Error('No browser found');
  console.log(`🚀 Bắt đầu quét Deep Promos Batch 2.`);
  console.log(`📁 Thư mục lưu trữ: ${deepRawDir}`);

  const results = [];
  for (const t of deepTargets) {
    const res = await captureSingle(browserPath, t);
    results.push(res);
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log(`\n🎉 [DEEP-SWEEP-DONE] Hoàn tất ${results.filter(r => r.success).length}/${deepTargets.length} mục tiêu!`);
}

runDeep().catch(err => {
  console.error('FATAL DEEP SWEEP ERROR:', err);
  process.exit(1);
});
