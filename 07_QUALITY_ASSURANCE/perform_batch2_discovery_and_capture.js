/**
 * JAYT BATCH 2 DISCOVERY & CAPTURE PROBE
 * Directive: JAYT-070D — BATCH-2 ACCUMULATION
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const batch2RunId = `run_070d_batch2_${Date.now()}`;
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
  { id: 'LOTTERIA_PROMO', url: 'https://www.lotteria.vn/khuyen-mai', category: 'FNB_FASTFOOD' },
  { id: 'JOLLIBEE_PROMO', url: 'https://jollibee.com.vn/khuyen-mai', category: 'FNB_FASTFOOD' },
  { id: 'HIGHLANDS_NEWS', url: 'https://www.highlandscoffee.com.vn/vn/tin-tuc.html', category: 'FNB_CAFE' },
  { id: 'PHELA_HOME', url: 'https://phela.vn/', category: 'FNB_CAFE' },
  { id: 'KATINAT_HOME', url: 'https://katinat.vn/', category: 'FNB_CAFE' },
  { id: 'THE_COFFEE_HOUSE', url: 'https://thecoffeehouse.com/', category: 'FNB_CAFE' },
  { id: 'PHUC_LONG_PROMO', url: 'https://phuclong.com.vn/khuyen-mai', category: 'FNB_CAFE' },
  { id: 'SHOPEEFOOD_DNG', url: 'https://shopeefood.vn/da-nang', category: 'ONLINE_FOOD_DELIVERY' }
];

async function runProbe() {
  const browserPath = findBrowserPath();
  if (!browserPath) throw new Error('No browser found on system');
  console.log(`🚀 Bắt đầu quét Batch 2 bằng trình duyệt: ${browserPath}`);
  console.log(`📁 Thư mục lưu trữ: ${batch2RawDir}`);

  const port = 9444 + Math.floor(Math.random() * 200);
  const chromeProc = spawn(browserPath, [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${port}`,
    '--window-size=1280,1024'
  ]);

  let ws = null;
  for (let attempt = 0; attempt < 25; attempt++) {
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

  if (!ws) {
    chromeProc.kill();
    throw new Error('Cannot connect to Chrome CDP');
  }

  let msgId = 1;
  function send(socket, method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      const timeout = setTimeout(() => reject(new Error(`CDP command ${method} timed out`)), 25000);
      const handler = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === id) {
          clearTimeout(timeout);
          socket.removeEventListener('message', handler);
          resolve(data.result);
        }
      };
      socket.addEventListener('message', handler);
      socket.send(JSON.stringify({ id, method, params }));
    });
  }

  const results = [];

  for (const t of targets) {
    console.log(`\n🔍 [PROBE] Khởi tạo tab cho ${t.id} (${t.url})...`);
    let pageWs = null;
    let targetId = null;
    try {
      const targetRes = await send(ws, 'Target.createTarget', { url: t.url, width: 1280, height: 1024 });
      targetId = targetRes.targetId;
      const pageListRes = await fetch(`http://127.0.0.1:${port}/json/list`);
      const pages = await pageListRes.json();
      const pageObj = pages.find(p => p.id === targetId);

      pageWs = new WebSocket(pageObj.webSocketDebuggerUrl);
      await new Promise((res, rej) => {
        pageWs.onopen = res;
        pageWs.onerror = rej;
      });

      await send(pageWs, 'Page.enable');
      await send(pageWs, 'DOM.enable');
      await send(pageWs, 'Runtime.enable');

      // Wait 5 seconds for client-side rendering
      await new Promise(r => setTimeout(r, 5000));

      const evalRes = await send(pageWs, 'Runtime.evaluate', {
        expression: `({
          title: document.title,
          url: window.location.href,
          text: document.body.innerText.slice(0, 15000),
          links: Array.from(document.querySelectorAll('a[href]')).map(a => ({ text: a.innerText.trim(), href: a.href })).filter(l => l.text.length > 3).slice(0, 50)
        })`,
        returnByValue: true
      });

      const pageData = evalRes?.result?.value || {};
      const screenshotRes = await send(pageWs, 'Page.captureScreenshot', { format: 'png' });
      const htmlRes = await send(pageWs, 'Runtime.evaluate', {
        expression: 'document.documentElement.outerHTML',
        returnByValue: true
      });

      const checkedAt = new Date().toISOString();
      const pngBuf = Buffer.from(screenshotRes.data, 'base64');
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
        source_url: pageData.url || t.url,
        canonical_url: pageData.url || t.url,
        checked_at: checkedAt,
        captured_at: checkedAt,
        page_title: pageData.title,
        artifacts: {
          png: { file: pngFile, size_bytes: pngBuf.length, sha256: pngSha },
          html: { file: htmlFile, size_bytes: Buffer.byteLength(htmlStr), sha256: htmlSha },
          text: { file: textFile, size_bytes: Buffer.byteLength(textStr), sha256: textSha }
        },
        discovered_links_sample: pageData.links?.slice(0, 15)
      };

      const receiptFile = `receipt_${t.id.toLowerCase()}.json`;
      fs.writeFileSync(path.join(batch2RawDir, receiptFile), JSON.stringify(receipt, null, 2), 'utf8');
      console.log(`  🟢 Capture thành công ${t.id}: ${pageData.title?.slice(0, 60)} (Receipt: ${receiptFile})`);

      results.push({
        target: t,
        receipt,
        title: pageData.title,
        textPreview: textStr.slice(0, 300).replace(/\n+/g, ' ')
      });

    } catch (err) {
      console.error(`  🔴 Thất bại khi capture ${t.id}: ${err.message}`);
    } finally {
      if (pageWs) pageWs.close();
      if (targetId) {
        try { await send(ws, 'Target.closeTarget', { targetId }); } catch {}
      }
    }
  }

  ws.close();
  chromeProc.kill();

  console.log(`\n🎉 [BATCH-2-PROBE-COMPLETE] Đã hoàn thành quét ${results.length}/${targets.length} nguồn!`);
  fs.writeFileSync(path.join(batch2RawDir, 'SUMMARY_PROBE_RESULTS.json'), JSON.stringify(results, null, 2), 'utf8');
}

runProbe().catch(err => {
  console.error('FATAL BATCH 2 PROBE ERROR:', err);
  process.exit(1);
});
