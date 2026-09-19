/**
 * JAYT BATCH 3 TRUTHFUL DISCOVERY SWEEP & SOURCE-LEVEL CLASSIFIER (070F-R2)
 * Directive: JAYT-070F-R2 — SOURCE-BOUND REPORTING CORRECTION + BATCH 3 TRUTHFUL DISCOVERY
 * Captures 20 unverified targets via Headless Chrome CDP and classifies at source level.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const runDirName = `run_070f_r2_batch3_sweep_${Date.now()}`;
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

// 20 Unverified Discovery Targets (Neutral, no business claims, no hardcoded locality)
const batch3Targets = [
  // Cinema Targets
  {
    target_id: 'B3_GALAXY_HAPPY_DAY',
    brand: 'Galaxy Cinema',
    domain: 'galaxycine.vn',
    expected_source_type: 'PROMO_LEAF',
    url: 'https://www.galaxycine.vn/khuyen-mai/happy-day/',
    required_capture_conditions: 'Yêu cầu chụp văn bản giá, ngày áp dụng và điều kiện vé',
    locality_status: 'locality_verification_required',
    prefix: 'b3_galaxy_happy_day'
  },
  {
    target_id: 'B3_GALAXY_MEMBER_DAY',
    brand: 'Galaxy Cinema',
    domain: 'galaxycine.vn',
    expected_source_type: 'PROMO_LEAF',
    url: 'https://www.galaxycine.vn/khuyen-mai/ngay-thanh-vien/',
    required_capture_conditions: 'Yêu cầu chụp văn bản ưu đãi thành viên định kỳ',
    locality_status: 'locality_verification_required',
    prefix: 'b3_galaxy_member_day'
  },
  {
    target_id: 'B3_METIZ_SUPER_MONDAY',
    brand: 'Metiz Cinema Đà Nẵng',
    domain: 'metiz.vn',
    expected_source_type: 'PROMO_LEAF',
    url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    required_capture_conditions: 'Yêu cầu chụp bài viết ưu đãi Thứ Hai',
    locality_status: 'locality_verification_required',
    prefix: 'b3_metiz_super_monday'
  },
  {
    target_id: 'B3_METIZ_U22',
    brand: 'Metiz Cinema Đà Nẵng',
    domain: 'metiz.vn',
    expected_source_type: 'PROMO_LEAF',
    url: 'https://metiz.vn/promotion/u22-vui-ve-bap-nuoc-sieu-re-2.html',
    required_capture_conditions: 'Yêu cầu chụp bài viết ưu đãi U22',
    locality_status: 'locality_verification_required',
    prefix: 'b3_metiz_u22'
  },
  {
    target_id: 'B3_METIZ_MEMBER_DAY',
    brand: 'Metiz Cinema Đà Nẵng',
    domain: 'metiz.vn',
    expected_source_type: 'PROMO_LEAF',
    url: 'https://metiz.vn/promotion/ngay-hoi-thanh-vien-metiz-member-day.html',
    required_capture_conditions: 'Yêu cầu chụp bài viết Member Day',
    locality_status: 'locality_verification_required',
    prefix: 'b3_metiz_member_day'
  },
  {
    target_id: 'B3_STARLIGHT_MEMBER',
    brand: 'Starlight Cinema',
    domain: 'starlight.vn',
    expected_source_type: 'PROMO_LEAF',
    url: 'https://starlight.vn/tin-tuc/ngay-tri-an-thanh-vien-starlight-cinema.html',
    required_capture_conditions: 'Yêu cầu chụp bài viết tri ân thành viên',
    locality_status: 'locality_verification_required',
    prefix: 'b3_starlight_member'
  },
  {
    target_id: 'B3_LOTTE_CINEMA_EVENTS',
    brand: 'Lotte Cinema',
    domain: 'lottecinemavn.com',
    expected_source_type: 'PROMO_HUB',
    url: 'https://www.lottecinemavn.com/LCHS/Contents/Event/Event-List.aspx',
    required_capture_conditions: 'Yêu cầu chụp danh mục sự kiện và khuyến mãi',
    locality_status: 'locality_verification_required',
    prefix: 'b3_lotte_events'
  },
  // Fast Food & Pizza
  {
    target_id: 'B3_DOMINOS_PROMO_LISTING',
    brand: 'Domino Pizza',
    domain: 'dominos.vn',
    expected_source_type: 'PROMO_HUB',
    url: 'https://dominos.vn/promotion-listing',
    required_capture_conditions: 'Yêu cầu chụp danh mục chương trình ưu đãi',
    locality_status: 'locality_verification_required',
    prefix: 'b3_dominos_promos'
  },
  {
    target_id: 'B3_DOMINOS_STORE_LOCATOR',
    brand: 'Domino Pizza',
    domain: 'dominos.vn',
    expected_source_type: 'STORE_LOCATOR',
    url: 'https://dominos.vn/danh-sach-cua-hang',
    required_capture_conditions: 'Yêu cầu chụp danh sách chi nhánh công khai',
    locality_status: 'locality_verification_required',
    prefix: 'b3_dominos_stores'
  },
  {
    target_id: 'B3_PIZZAHUT_PROMOS',
    brand: 'Pizza Hut Vietnam',
    domain: 'pizzahut.vn',
    expected_source_type: 'PROMO_HUB',
    url: 'https://pizzahut.vn/promotions',
    required_capture_conditions: 'Yêu cầu chụp danh mục khuyến mãi chính thức',
    locality_status: 'locality_verification_required',
    prefix: 'b3_pizzahut_promos'
  },
  {
    target_id: 'B3_THEPIZZACOMPANY_NEWS',
    brand: 'The Pizza Company',
    domain: 'thepizzacompany.vn',
    expected_source_type: 'PROMO_HUB',
    url: 'https://thepizzacompany.vn/tin-khuyen-mai',
    required_capture_conditions: 'Yêu cầu chụp danh mục tin khuyến mãi',
    locality_status: 'locality_verification_required',
    prefix: 'b3_thepizzacompany_news'
  },
  {
    target_id: 'B3_KFC_PROMOS',
    brand: 'KFC Vietnam',
    domain: 'kfcvietnam.com.vn',
    expected_source_type: 'PROMO_HUB',
    url: 'https://kfcvietnam.com.vn/khuyen-mai',
    required_capture_conditions: 'Yêu cầu chụp danh mục khuyến mãi',
    locality_status: 'locality_verification_required',
    prefix: 'b3_kfc_promos'
  },
  {
    target_id: 'B3_JOLLIBEE_MENU_COMBO',
    brand: 'Jollibee Vietnam',
    domain: 'jollibee.com.vn',
    expected_source_type: 'MENU_CATALOG',
    url: 'https://jollibee.com.vn/thuc-don/combo-1-nguoi',
    required_capture_conditions: 'Yêu cầu chụp danh mục combo',
    locality_status: 'locality_verification_required',
    prefix: 'b3_jollibee_combo'
  },
  {
    target_id: 'B3_LOTTERIA_SET_CATALOG',
    brand: 'Lotteria Vietnam',
    domain: 'lotteria.vn',
    expected_source_type: 'MENU_CATALOG',
    url: 'https://www.lotteria.vn/category/set',
    required_capture_conditions: 'Yêu cầu chụp danh mục set menu',
    locality_status: 'locality_verification_required',
    prefix: 'b3_lotteria_set'
  },
  // Beverage & Cafe
  {
    target_id: 'B3_HIGHLANDS_NEWS_HUB',
    brand: 'Highlands Coffee',
    domain: 'highlandscoffee.com.vn',
    expected_source_type: 'NEWS_HUB',
    url: 'https://www.highlandscoffee.com.vn/vn/tin-tuc-su-kien.html',
    required_capture_conditions: 'Yêu cầu chụp tin tức và sự kiện',
    locality_status: 'locality_verification_required',
    prefix: 'b3_highlands_news'
  },
  {
    target_id: 'B3_PHUCLONG_PROMO_HUB',
    brand: 'Phúc Long Coffee & Tea',
    domain: 'phuclong.com.vn',
    expected_source_type: 'PROMO_HUB',
    url: 'https://phuclong.com.vn/khuyen-mai',
    required_capture_conditions: 'Yêu cầu chụp trang khuyến mãi',
    locality_status: 'locality_verification_required',
    prefix: 'b3_phuclong_promos'
  },
  {
    target_id: 'B3_PHELA_STORES',
    brand: 'Phê La',
    domain: 'phela.vn',
    expected_source_type: 'STORE_LOCATOR',
    url: 'https://phela.vn/cua-hang-2/',
    required_capture_conditions: 'Yêu cầu chụp danh sách cửa hàng',
    locality_status: 'locality_verification_required',
    prefix: 'b3_phela_stores'
  },
  {
    target_id: 'B3_KATINAT_HOME',
    brand: 'Katinat Saigon Kafe',
    domain: 'katinat.vn',
    expected_source_type: 'BRAND_HOME',
    url: 'https://katinat.vn/',
    required_capture_conditions: 'Yêu cầu chụp trang chủ thương hiệu',
    locality_status: 'locality_verification_required',
    prefix: 'b3_katinat_home'
  },
  {
    target_id: 'B3_THECOFFEEHOUSE_COLLECTIONS',
    brand: 'The Coffee House',
    domain: 'thecoffeehouse.com',
    expected_source_type: 'MENU_CATALOG',
    url: 'https://thecoffeehouse.com/collections/ca-phe',
    required_capture_conditions: 'Yêu cầu chụp bộ sưu tập cà phê',
    locality_status: 'locality_verification_required',
    prefix: 'b3_tch_collections'
  },
  {
    target_id: 'B3_GONGCHA_PROMOS',
    brand: 'Gong Cha Vietnam',
    domain: 'gongcha.com.vn',
    expected_source_type: 'PROMO_HUB',
    url: 'https://gongcha.com.vn/tin-tuc-khuyen-mai/',
    required_capture_conditions: 'Yêu cầu chụp tin tức khuyến mãi',
    locality_status: 'locality_verification_required',
    prefix: 'b3_gongcha_promos'
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

    // Wait 5 seconds for dynamic rendering
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

    // Persist raw files
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
      target_id: target.target_id,
      expected_source_type: target.expected_source_type,
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

    // Source-level classification
    let sourceClassification = 'UNKNOWN';
    const is404 = /404|page-not-found|cannot be found|không tìm thấy/i.test(finalUrl) ||
                  /HTTP 404|Server Error|NỘI DUNG TRANG KHÔNG TÌM THẤY|Không tìm thấy trang|The page you are looking for cannot be found/i.test(textContent);
    const isBlank = finalUrl === 'about:blank' || textContent.trim().length === 0;
    const isRedirect = finalUrl !== target.url && (finalUrl.endsWith('/') || !finalUrl.includes(target.prefix));

    if (is404) {
      sourceClassification = 'DEAD_ROUTE';
    } else if (isBlank) {
      sourceClassification = 'BLANK';
    } else if (isRedirect && textContent.length < 500) {
      sourceClassification = 'REDIRECT';
    } else if (target.expected_source_type === 'STORE_LOCATOR' || /danh sách|cửa hàng|chi nhánh|hệ thống/i.test(textContent)) {
      sourceClassification = 'LOCALITY_SOURCE';
    } else if (target.expected_source_type.includes('PROMO') || /khuyến mãi|ưu đãi|combo|đồng giá|giảm/i.test(textContent)) {
      sourceClassification = 'PROMO_SOURCE';
    } else {
      sourceClassification = 'NO_PUBLIC_PROMO';
    }

    return {
      success: true,
      target_id: target.target_id,
      brand: target.brand,
      domain: target.domain,
      requested_url: target.url,
      final_url: finalUrl,
      checked_at: checkTimestampUtc,
      text_length: textContent.length,
      receipt_file: receiptFile,
      receipt_sha256: receiptSha,
      png_sha256: pngSha,
      html_sha256: htmlSha,
      text_sha256: textSha,
      source_classification: sourceClassification,
      text_snippet: textContent.slice(0, 160).replace(/\n/g, ' ')
    };

  } catch (err) {
    return {
      success: false,
      target_id: target.target_id,
      brand: target.brand,
      url: target.url,
      error: err.message,
      source_classification: 'CAPTURE_ERROR'
    };
  } finally {
    try { chromeProc.kill('SIGKILL'); } catch (e) {}
  }
}

async function runBatch3Sweep() {
  const browserPath = findBrowserPath();
  if (!browserPath) throw new Error('Browser not found on system');

  console.log(`🚀 [BATCH-3-SWEEP] Khởi chạy quét CDP cho ${batch3Targets.length} mục tiêu discovery...`);
  console.log(`📁 Target run dir: ${targetRunDir}\n`);

  const results = [];
  let port = 9900 + Math.floor(Math.random() * 50);

  for (let i = 0; i < batch3Targets.length; i++) {
    const t = batch3Targets[i];
    console.log(`🔍 [${i + 1}/${batch3Targets.length}] Quét ${t.target_id} (${t.brand}) - ${t.url}...`);
    const res = await captureSingleUrl(browserPath, t, port++);
    results.push(res);
    if (res.success) {
      console.log(`  🟢 [${res.source_classification}] Final URL: ${res.final_url} | Text: ${res.text_length} chars | CheckedAt: ${res.checked_at}`);
    } else {
      console.log(`  🔴 [FAIL]: ${res.error}`);
    }
  }

  // 1. Write Discovery JSON Matrix
  const jsonMatrixPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'BATCH_3_DISCOVERY_MATRIX.json');
  fs.writeFileSync(jsonMatrixPath, JSON.stringify(results, null, 2), 'utf8');

  // 2. Generate Markdown Discovery Matrix
  let md = `# JAYT BATCH 3 TRUTHFUL DISCOVERY MATRIX (20 TARGETS)
**Chỉ thị**: \`JAYT-070F-R2 — SOURCE-BOUND REPORTING CORRECTION + BATCH 3 TRUTHFUL DISCOVERY\`  
**Thời điểm quét**: ${new Date().toISOString()} | **Run ID**: \`${runDirName}\`  
**Quy tắc**: \`PREPARATION_DISCOVERY_ONLY\` (0 candidate, 0 staging, 0 CEO receipt)

---

## 1. MA TRẬN PHÂN LOẠI CẤP ĐỘ NGUỒN THỰC TẾ (SOURCE-LEVEL CLASSIFICATION)

| # | Target ID | Thương Hiệu & Domain | Final URL (CDP) | Phân Loại Cấp Nguồn | Text Chars | SHA-256 Receipt (Đọc từ đĩa) | Trích Đoạn Nội Dung Thực Tế |
|---|---|---|---|:---:|---|---|---|
`;

  results.forEach((r, idx) => {
    md += `| ${idx + 1} | \`${r.target_id}\` | **${r.brand}** (\`${r.domain}\`) | [${r.final_url.slice(0, 30)}...](${r.final_url}) | \`${r.source_classification}\` | ${r.text_length} B | \`${r.receipt_sha256 ? r.receipt_sha256.slice(0, 10) : 'N/A'}...\` | ${r.text_snippet || r.error} |\n`;
  });

  md += `\n---

## 2. THỐNG KÊ PHÂN LOẠI NGUỒN BATCH 3

- **PROMO_SOURCE**: ${results.filter(r => r.source_classification === 'PROMO_SOURCE').length} nguồn
- **LOCALITY_SOURCE**: ${results.filter(r => r.source_classification === 'LOCALITY_SOURCE').length} nguồn
- **DEAD_ROUTE**: ${results.filter(r => r.source_classification === 'DEAD_ROUTE').length} nguồn
- **REDIRECT**: ${results.filter(r => r.source_classification === 'REDIRECT').length} nguồn
- **BLANK**: ${results.filter(r => r.source_classification === 'BLANK').length} nguồn
- **NO_PUBLIC_PROMO / KHÁC**: ${results.filter(r => ['NO_PUBLIC_PROMO', 'UNKNOWN', 'CAPTURE_ERROR'].includes(r.source_classification)).length} nguồn

---

## 3. ĐIỀU KIỆN SANG BATCH 4 (CANDIDATE EVIDENCE BUNDLE GATE)

- **Không tự động sinh candidate**: Candidate chỉ được tạo tại Batch 4 khi ghép nối hoàn chỉnh một Evidence Bundle thỏa mãn đồng thời:
  1. \`pricing\` (mức giá cụ thể)
  2. \`terms\` (điều kiện sử dụng)
  3. \`validity\` (thời hạn 2026 tường minh)
  4. \`Da Nang locality\` (bằng chứng chi nhánh/rạp Đà Nẵng từ nguồn \`LOCALITY_SOURCE\` hợp lệ)
  5. \`raw_receipt\` gốc cùng SHA-256 đối soát.
- Nếu thiếu bất kỳ thành phần nào $\rightarrow$ giữ nguyên phân loại \`LEAD_ONLY_NO_CLAIM\`.
`;

  const mdPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'BATCH_3_DISCOVERY_MATRIX.md');
  fs.writeFileSync(mdPath, md, 'utf8');

  console.log(`\n📋 Đã xuất bản BATCH_3_DISCOVERY_MATRIX:`);
  console.log(`   Markdown: ${mdPath}`);
  console.log(`   JSON: ${jsonMatrixPath}`);
}

runBatch3Sweep();
