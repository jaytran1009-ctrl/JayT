/**
 * JAYT DEEP OFFICIAL PROMOTIONS & DA NANG BRANCH SWEEP (070F)
 * Directive: JAYT-070F — TRACK 2 OFFICIAL PROMOTION BUNDLE BATCH
 * Captures deep leaf promotion articles and store/branch confirmations in Da Nang.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const runDirName = `run_070f_deep_sweep_${Date.now()}`;
const targetRunDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', runDirName);
fs.mkdirSync(targetRunDir, { recursive: true });

function getSha256(bufOrStr) {
  const buf = Buffer.isBuffer(bufOrStr) ? bufOrStr : Buffer.from(bufOrStr, 'utf8');
  return crypto.createHash('sha256').update(buf).digest('hex');
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

const sweepTargets = [
  // 1. Domino's Pizza Promotions & Store Confirmation in Da Nang
  {
    id: 'DOMINOS_STORES_DNG',
    brand: 'Domino Pizza',
    domain: 'dominos.vn',
    url: 'https://dominos.vn/danh-sach-cua-hang',
    category: 'LOCAL_FNB',
    prefix: 'dominos_stores_dng'
  },
  {
    id: 'DOMINOS_PROMO_LISTING',
    brand: 'Domino Pizza',
    domain: 'dominos.vn',
    url: 'https://dominos.vn/promotion-listing',
    category: 'LOCAL_FNB',
    prefix: 'dominos_promo_listing'
  },
  // 2. Galaxy Cinema Promotions & Da Nang Branch
  {
    id: 'GALAXY_CINEMA_DNG',
    brand: 'Galaxy Cinema',
    domain: 'galaxycine.vn',
    url: 'https://www.galaxycine.vn/rap-gia-ve/galaxy-da-nang/',
    category: 'LOCAL_CINEMA',
    prefix: 'galaxy_dng_cinema'
  },
  {
    id: 'GALAXY_PROMO_HUB',
    brand: 'Galaxy Cinema',
    domain: 'galaxycine.vn',
    url: 'https://www.galaxycine.vn/khuyen-mai/',
    category: 'LOCAL_CINEMA',
    prefix: 'galaxy_promo_hub'
  },
  // 3. CGV Cinemas Da Nang & Promotions
  {
    id: 'CGV_DNG_VINTRUNG',
    brand: 'CGV Cinemas',
    domain: 'cgv.vn',
    url: 'https://www.cgv.vn/default/cinox/site/cgv-vinh-trung-plaza',
    category: 'LOCAL_CINEMA',
    prefix: 'cgv_dng_vinhtrung'
  },
  {
    id: 'CGV_CULTURE_DAY_ARTICLE',
    brand: 'CGV Cinemas',
    domain: 'cgv.vn',
    url: 'https://www.cgv.vn/default/culture-day',
    category: 'LOCAL_CINEMA',
    prefix: 'cgv_culture_day_article'
  },
  {
    id: 'CGV_U22_ARTICLE',
    brand: 'CGV Cinemas',
    domain: 'cgv.vn',
    url: 'https://www.cgv.vn/default/u22-cgv',
    category: 'LOCAL_CINEMA',
    prefix: 'cgv_u22_article'
  },
  // 4. Metiz Cinema Đà Nẵng
  {
    id: 'METIZ_PROMO_HUB',
    brand: 'Metiz Cinema Đà Nẵng',
    domain: 'metiz.vn',
    url: 'https://metiz.vn/promotion/',
    category: 'LOCAL_CINEMA',
    prefix: 'metiz_promo_hub'
  },
  // 5. Jollibee Vietnam Promotions & Da Nang Stores
  {
    id: 'JOLLIBEE_STORES_DNG',
    brand: 'Jollibee Vietnam',
    domain: 'jollibee.com.vn',
    url: 'https://jollibee.com.vn/cua-hang',
    category: 'LOCAL_FAST_FOOD',
    prefix: 'jollibee_stores_dng'
  },
  {
    id: 'JOLLIBEE_PROMO_NEWS',
    brand: 'Jollibee Vietnam',
    domain: 'jollibee.com.vn',
    url: 'https://jollibee.com.vn/tin-tuc',
    category: 'LOCAL_FAST_FOOD',
    prefix: 'jollibee_promo_news'
  },
  // 6. Lotteria Vietnam Store & Promos
  {
    id: 'LOTTERIA_STORES_DNG',
    brand: 'Lotteria Vietnam',
    domain: 'lotteria.vn',
    url: 'https://www.lotteria.vn/stores',
    category: 'LOCAL_FAST_FOOD',
    prefix: 'lotteria_stores_dng'
  },
  // 7. Highlands Coffee Da Nang Stores & Promo News
  {
    id: 'HIGHLANDS_STORES_DNG',
    brand: 'Highlands Coffee',
    domain: 'highlandscoffee.com.vn',
    url: 'https://www.highlandscoffee.com.vn/vn/danh-sach-quan.html',
    category: 'LOCAL_BEVERAGE',
    prefix: 'highlands_stores_dng'
  },
  // 8. The Coffee House Da Nang Stores
  {
    id: 'TCH_STORES_DNG',
    brand: 'The Coffee House',
    domain: 'thecoffeehouse.com',
    url: 'https://thecoffeehouse.com/pages/danh-sach-cua-hang',
    category: 'LOCAL_BEVERAGE',
    prefix: 'tch_stores_dng'
  },
  // 9. Phê La Đà Nẵng
  {
    id: 'PHELA_STORES_DNG',
    brand: 'Phê La',
    domain: 'phela.vn',
    url: 'https://phela.vn/cua-hang/',
    category: 'LOCAL_BEVERAGE',
    prefix: 'phela_stores_dng'
  },
  // 10. Katinat Đà Nẵng
  {
    id: 'KATINAT_STORES_DNG',
    brand: 'Katinat',
    domain: 'katinat.vn',
    url: 'https://katinat.vn/cua-hang/',
    category: 'LOCAL_BEVERAGE',
    prefix: 'katinat_stores_dng'
  },
  // 11. Phúc Long Đà Nẵng
  {
    id: 'PHUCLONG_STORES_DNG',
    brand: 'Phúc Long',
    domain: 'phuclong.com.vn',
    url: 'https://phuclong.com.vn/he-thong-cua-hang-phuc-long',
    category: 'LOCAL_FNB',
    prefix: 'phuclong_stores_dng'
  }
];

async function captureSingleUrl(browserPath, target, port) {
  const chromeProc = spawn(browserPath, [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${port}`,
    '--window-size=1280,1024',
    '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    target.url
  ]);

  let ws = null;
  try {
    for (let attempt = 0; attempt < 25; attempt++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
        if (listRes.ok) {
          const list = await listRes.json();
          const page = list.find(p => p.type === 'page' || p.url.includes(target.url) || p.url.startsWith('http'));
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

    // Wait 5 seconds for dynamic content
    await new Promise(r => setTimeout(r, 5000));

    const checkTimestampUtc = new Date().toISOString();

    const evalRes = await send('Runtime.evaluate', {
      expression: `({
        title: document.title,
        url: window.location.href,
        text: document.body ? document.body.innerText.slice(0, 35000) : '',
        html: document.documentElement ? document.documentElement.outerHTML : ''
      })`,
      returnByValue: true
    });

    const pageData = evalRes?.result?.value || {};
    const finalUrl = pageData.url || target.url;
    const textContent = pageData.text || '';
    const htmlContent = pageData.html || '';

    const screenshotRes = await send('Page.captureScreenshot', { format: 'png' });
    const pngBuf = Buffer.from(screenshotRes?.data || '', 'base64');

    ws.close();

    // Persist raw capture files
    const pngFile = `${target.prefix}_capture.png`;
    const htmlFile = `${target.prefix}_raw.html`;
    const textFile = `${target.prefix}_text.txt`;
    const receiptFile = `receipt_${target.prefix}.json`;

    const pngPath = path.join(targetRunDir, pngFile);
    const htmlPath = path.join(targetRunDir, htmlFile);
    const textPath = path.join(targetRunDir, textFile);
    const receiptPath = path.join(targetRunDir, receiptFile);

    fs.writeFileSync(pngPath, pngBuf);
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    fs.writeFileSync(textPath, textContent, 'utf8');

    const pngSha = getSha256(pngBuf);
    const htmlSha = getSha256(htmlContent);
    const textSha = getSha256(textContent);

    const receiptObj = {
      $schema: 'https://jayt.vn/schemas/raw-capture-receipt.v1.json',
      capture_id: `CAP_${target.prefix.toUpperCase()}_${Date.now()}`,
      brand: target.brand,
      domain: target.domain,
      target_id: target.id,
      requested_url: target.url,
      final_url: finalUrl,
      captured_at: checkTimestampUtc,
      checked_at: checkTimestampUtc,
      runtime_run_id: runDirName,
      artifacts: {
        screenshot_png: pngFile,
        screenshot_sha256: pngSha,
        raw_html: htmlFile,
        raw_html_sha256: htmlSha,
        extracted_text: textFile,
        extracted_text_sha256: textSha
      }
    };

    fs.writeFileSync(receiptPath, JSON.stringify(receiptObj, null, 2), 'utf8');
    const receiptSha = getSha256(fs.readFileSync(receiptPath));

    return {
      success: true,
      target_id: target.id,
      brand: target.brand,
      domain: target.domain,
      requested_url: target.url,
      final_url: finalUrl,
      checked_at: checkTimestampUtc,
      text_length: textContent.length,
      html_length: htmlContent.length,
      png_size: pngBuf.length,
      receipt_file: receiptFile,
      receipt_sha256: receiptSha,
      png_sha256: pngSha,
      html_sha256: htmlSha,
      text_sha256: textSha,
      raw_text_snippet: textContent.slice(0, 300)
    };

  } catch (err) {
    return {
      success: false,
      target_id: target.id,
      brand: target.brand,
      url: target.url,
      error: err.message
    };
  } finally {
    try { chromeProc.kill('SIGKILL'); } catch (e) {}
  }
}

async function runDeepSweep() {
  const browserPath = findBrowserPath();
  if (!browserPath) throw new Error('Browser not found on system');

  console.log(`🚀 [DEEP-SWEEP-070F] Khởi chạy quét sâu cho ${sweepTargets.length} mục tiêu khuyến mãi & chi nhánh Đà Nẵng...`);
  console.log(`📁 Target run dir: ${targetRunDir}\n`);

  const results = [];
  let port = 9800 + Math.floor(Math.random() * 100);

  for (const target of sweepTargets) {
    console.log(`🔍 Quét ${target.id} (${target.brand}) - ${target.url}...`);
    const res = await captureSingleUrl(browserPath, target, port++);
    results.push(res);
    if (res.success) {
      console.log(`  🟢 THÀNH CÔNG: Final URL: ${res.final_url} | Text: ${res.text_length} chars | CheckedAt: ${res.checked_at}`);
    } else {
      console.log(`  🔴 THẤT BẠI: ${res.error}`);
    }
  }

  // Write Manifest
  const manifest = {
    $schema: 'https://jayt.vn/schemas/deep-sweep-manifest.v1.json',
    work_order: 'JAYT-070F',
    run_id: runDirName,
    completed_at: new Date().toISOString(),
    total_targets: sweepTargets.length,
    results: results
  };

  const manifestPath = path.join(targetRunDir, 'DEEP_SWEEP_MANIFEST.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`\n📋 Đã lưu DEEP_SWEEP_MANIFEST.json: ${manifestPath}`);
}

runDeepSweep();
