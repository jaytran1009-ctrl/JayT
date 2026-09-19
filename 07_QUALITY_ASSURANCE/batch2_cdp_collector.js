/**
 * JAYT BATCH 2 ROBUST CDP COLLECTOR
 * Directive: JAYT-070D
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const batch2RunId = `run_070d_batch2_full_${Date.now()}`;
const batch2RawDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', batch2RunId);
fs.mkdirSync(batch2RawDir, { recursive: true });

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

const targets = [
  { id: 'JOLLIBEE_PROMO', url: 'https://jollibee.com.vn/khuyen-mai', category: 'FNB_FASTFOOD' },
  { id: 'LOTTERIA_PROMO', url: 'https://www.lotteria.vn/khuyen-mai', category: 'FNB_FASTFOOD' },
  { id: 'HIGHLANDS_NEWS', url: 'https://www.highlandscoffee.com.vn/vn/tin-tuc.html', category: 'FNB_CAFE' },
  { id: 'PHELA_HOME', url: 'https://phela.vn/', category: 'FNB_CAFE' },
  { id: 'KATINAT_HOME', url: 'https://katinat.vn/', category: 'FNB_CAFE' },
  { id: 'PHUCLONG_PROMO', url: 'https://phuclong.com.vn/khuyen-mai', category: 'FNB_CAFE' },
  { id: 'THECOFFEEHOUSE_HOME', url: 'https://thecoffeehouse.com/', category: 'FNB_CAFE' },
  { id: 'STARBUCKS_VN', url: 'https://www.starbucks.vn/', category: 'FNB_CAFE' },
  { id: 'SHOPEE_VOUCHER', url: 'https://shopee.vn/m/ma-giam-gia', category: 'ONLINE_ECOMMERCE' },
  { id: 'SHOPEEFOOD_DNG', url: 'https://shopeefood.vn/da-nang', category: 'ONLINE_FOOD_DELIVERY' },
  { id: 'LAZADA_VOUCHER', url: 'https://www.lazada.vn/', category: 'ONLINE_ECOMMERCE' },
  { id: 'GRABFOOD_VN', url: 'https://food.grab.com/vn/vi/', category: 'ONLINE_FOOD_DELIVERY' }
];

async function captureSingleTarget(browserPath, t) {
  console.log(`\n📸 [ISOLATED-CAPTURE] Đang quét ${t.id} (${t.url})...`);
  const port = 9500 + Math.floor(Math.random() * 400);
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

    // Wait 6 seconds for network & DOM rendering
    await new Promise(r => setTimeout(r, 6000));

    const evalRes = await send('Runtime.evaluate', {
      expression: `({
        title: document.title,
        url: window.location.href,
        text: document.body ? document.body.innerText.slice(0, 20000) : '',
        links: Array.from(document.querySelectorAll('a[href]')).map(a => ({ text: a.innerText.trim(), href: a.href })).filter(l => l.text.length > 2).slice(0, 50),
        images: Array.from(document.querySelectorAll('img[src]')).map(img => ({ alt: img.alt || '', src: img.src })).slice(0, 30)
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

    fs.writeFileSync(path.join(batch2RawDir, pngFile), pngBuf);
    fs.writeFileSync(path.join(batch2RawDir, htmlFile), htmlStr, 'utf8');
    fs.writeFileSync(path.join(batch2RawDir, textFile), textStr, 'utf8');

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
      },
      discovered_links_sample: pageData.links?.slice(0, 20),
      discovered_images_sample: pageData.images?.slice(0, 15)
    };

    const receiptFile = `receipt_${t.id.toLowerCase()}.json`;
    fs.writeFileSync(path.join(batch2RawDir, receiptFile), JSON.stringify(receipt, null, 2), 'utf8');
    console.log(`  🟢 [SUCCESS] ${t.id}: ${pageData.title?.slice(0, 60)} | Text: ${textStr.length} chars | PNG: ${pngBuf.length} B`);

    return {
      success: true,
      target: t,
      receipt,
      receiptFile,
      textPreview: textStr.slice(0, 200).replace(/\n+/g, ' ')
    };

  } catch (err) {
    console.error(`  🔴 [FAILED] ${t.id}: ${err.message}`);
    return { success: false, target: t, error: err.message };
  } finally {
    if (ws) ws.close();
    chromeProc.kill();
  }
}

async function runAll() {
  const browserPath = findBrowserPath();
  if (!browserPath) throw new Error('No browser found');
  console.log(`🚀 Bắt đầu quét Batch 2 bằng Chrome cô lập từng tab.`);
  console.log(`📁 Thư mục lưu trữ: ${batch2RawDir}`);

  const results = [];
  for (const t of targets) {
    const res = await captureSingleTarget(browserPath, t);
    results.push(res);
    await new Promise(r => setTimeout(r, 1000));
  }

  const successful = results.filter(r => r.success);
  console.log(`\n🎉 [BATCH-2-SWEEP-DONE] Thành công: ${successful.length}/${targets.length} nguồn!`);
  fs.writeFileSync(path.join(batch2RawDir, 'BATCH2_SWEEP_SUMMARY.json'), JSON.stringify(results, null, 2), 'utf8');
}

runAll().catch(err => {
  console.error('FATAL BATCH 2 SWEEP ERROR:', err);
  process.exit(1);
});
