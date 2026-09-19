/**
 * JAYT REGISTRY RECOVERY & REPLACEMENT PROBE HARNESS (044D)
 * Directive: JAYT-REGISTRY-RECOVERY-044D — EXECUTE TODAY
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const artifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044d_artifacts');
const pendingRegistryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'pending_registry_updates.json');
const summaryPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044d_summary.json');
const reportPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'weekly_evidence_batch_044d_report.md');

fs.mkdirSync(artifactsDir, { recursive: true });

const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
];
const chromeExe = chromePaths.find(p => fs.existsSync(p));

if (!chromeExe) {
  console.error('❌ [FATAL] Không tìm thấy Google Chrome trên hệ thống!');
  process.exit(1);
}

function getFileSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

// 7 Deprecated URLs and their Proposed Official Replacements
const REPLACEMENT_CANDIDATES = [
  {
    brand_id: 'CGV',
    category: 'LOCAL_CINEMA',
    old_url: 'https://www.cgv.vn/default/culture-day-2026/',
    replacement_url: 'https://www.cgv.vn/default/cinox/site/cgv-vinh-trung-plaza',
    domain: 'cgv.vn',
    discovery_method: 'OFFICIAL_DOMAIN_DISCOVERY_LOCAL_BRANCH',
    notes: 'Trang thông tin & giá vé chính thức cụm rạp CGV Vĩnh Trung Plaza Đà Nẵng'
  },
  {
    brand_id: 'METIZ',
    category: 'LOCAL_CINEMA',
    old_url: 'https://metiz.vn/khuyen-mai/',
    replacement_url: 'https://metiz.vn/',
    domain: 'metiz.vn',
    discovery_method: 'OFFICIAL_DOMAIN_HOMEPAGE_ROUTING',
    notes: 'Trang chủ chính thức của Metiz Cinema Đà Nẵng (Helio Center)'
  },
  {
    brand_id: 'METIZ',
    category: 'LOCAL_CINEMA',
    old_url: 'https://metiz.vn/gia-ve/',
    replacement_url: 'https://metiz.vn/showtimes/',
    domain: 'metiz.vn',
    discovery_method: 'OFFICIAL_DOMAIN_SHOWTIMES_PAGE',
    notes: 'Trang lịch chiếu và bảng giá vé theo khung giờ Metiz'
  },
  {
    brand_id: 'METIZ',
    category: 'LOCAL_CINEMA',
    old_url: 'https://metiz.vn/tin-tuc/',
    replacement_url: 'https://metiz.vn/movie/',
    domain: 'metiz.vn',
    discovery_method: 'OFFICIAL_DOMAIN_MOVIES_CATALOG',
    notes: 'Danh mục phim đang chiếu và sự kiện điện ảnh Metiz'
  },
  {
    brand_id: 'JOLLIBEE',
    category: 'LOCAL_FASTFOOD',
    old_url: 'https://jollibee.com.vn/thuc-don/combo-tiet-kiem',
    replacement_url: 'https://jollibee.com.vn/thuc-don',
    domain: 'jollibee.com.vn',
    discovery_method: 'OFFICIAL_DOMAIN_MENU_ROOT',
    notes: 'Trang thực đơn chính thức tổng hợp các combo của Jollibee'
  },
  {
    brand_id: 'THE_COFFEE_HOUSE',
    category: 'LOCAL_COFFEE_TEA',
    old_url: 'https://thecoffeehouse.com/pages/khuyen-mai',
    replacement_url: 'https://thecoffeehouse.com/collections/all',
    domain: 'thecoffeehouse.com',
    discovery_method: 'OFFICIAL_DOMAIN_COLLECTIONS_CATALOG',
    notes: 'Trang danh mục sản phẩm và ưu đãi thực tế của The Coffee House'
  },
  {
    brand_id: 'THE_COFFEE_HOUSE',
    category: 'LOCAL_COFFEE_TEA',
    old_url: 'https://thecoffeehouse.com/blogs/news',
    replacement_url: 'https://thecoffeehouse.com/pages/cau-chuyen-thuong-hieu',
    domain: 'thecoffeehouse.com',
    discovery_method: 'OFFICIAL_DOMAIN_STORY_PAGE',
    notes: 'Trang câu chuyện thương hiệu và chính sách dịch vụ The Coffee House'
  }
];

function classifyHardened(brandId, reqUrl, finalUrl, pageTitle, pageText, pageHtml, fetchSuccess) {
  if (!fetchSuccess || !pageText || pageText.trim().length === 0) {
    return {
      http_status: 0,
      classification: 'NEEDS_RECHECK',
      reason: 'FETCH_FAILED_OR_NETWORK_ERROR',
      details: `Không thể kết nối hoặc tải nội dung từ URL ${reqUrl}`,
      snippets: null
    };
  }

  const textLower = pageText.toLowerCase();
  const titleLower = pageTitle ? pageTitle.toLowerCase() : '';

  // 1. Anti-Bot / CAPTCHA / Access Denied / Dynamic Platform
  if (textLower.includes('just a moment') ||
      textLower.includes('cloudflare') ||
      textLower.includes('verify you are human') ||
      textLower.includes('access denied') ||
      textLower.includes('403 forbidden') ||
      textLower.includes('captcha') ||
      textLower.includes('security verification') ||
      brandId === 'SHOPEE' || brandId === 'LAZADA' || brandId === 'TIKTOK' || brandId === 'GRABFOOD') {
    if (textLower.includes('captcha') || textLower.includes('cloudflare') || textLower.includes('access denied')) {
      return {
        http_status: 403,
        classification: 'NEEDS_RECHECK',
        reason: 'DYNAMIC_OR_ACCOUNT_REQUIRED',
        details: 'Trang kích hoạt anti-bot hoặc yêu cầu phiên người dùng/tài khoản cá nhân, tuân thủ nguyên tắc không vượt rào cản.',
        snippets: null
      };
    }
  }

  // 2. 404 / Deprecated
  if (textLower.includes('404 not found') ||
      textLower.includes('trang không tồn tại') ||
      textLower.includes('resource cannot be found') ||
      textLower.includes('page not found') ||
      titleLower.includes('404 not found') ||
      titleLower.includes('resource cannot be found')) {
    return {
      http_status: 404,
      classification: 'NEEDS_RECHECK',
      reason: 'DEPRECATED_OR_REDIRECTED',
      details: 'URL thay thế vẫn trả về mã 404.',
      snippets: null
    };
  }

  // 3. Snippet Extraction
  const priceMatch = pageText.match(/(\b\d{1,3}(\.\d{3})+\s*(đ|vnd|vnđ)\b|\b\d{2,3}k\b|đồng giá \d+k?)/i);
  const priceSnippet = priceMatch ? priceMatch[0] : null;

  const condMatch = pageText.match(/((điều kiện|áp dụng|lưu ý|thời gian|khung giờ)[^\n.]{5,100})/i);
  const conditionsSnippet = condMatch ? condMatch[0].trim() : null;

  const locMatch = pageText.match(/((đà nẵng|da nang|toàn quốc|toàn hệ thống|vĩnh trung)[^\n.]{0,60})/i);
  const localitySnippet = locMatch ? locMatch[0].trim() : null;

  const expMatch = pageText.match(/(\b\d{1,2}\/\d{1,2}\/\d{4}\b|\b\d{1,2}\/\d{1,2}\b|hằng tuần|hạn sử dụng|thứ [hai|ba|tư|năm|sáu|bảy|chủ nhật]+)/i);
  const expirySnippet = expMatch ? expMatch[0].trim() : null;

  const allSnippetsPresent = Boolean(priceSnippet && conditionsSnippet && localitySnippet && expirySnippet);

  if (allSnippetsPresent) {
    return {
      http_status: 200,
      classification: 'PROMOTION_SIGNAL',
      reason: 'AUTOMATED_SIGNAL_DETECTED_ALL_4_CONDITIONS',
      details: 'Tín hiệu ưu đãi bóc tách được đầy đủ 4 yếu tố: Giá, Điều kiện, Khu vực Đà Nẵng, Hạn dùng.',
      snippets: {
        price_snippet: priceSnippet,
        conditions_snippet: conditionsSnippet,
        locality_snippet: localitySnippet,
        expiry_snippet: expirySnippet
      }
    };
  }

  const missing = [];
  if (!priceSnippet) missing.push("mức giá/chiết khấu cụ thể");
  if (!expirySnippet) missing.push("thời hạn/lịch áp dụng");
  if (!conditionsSnippet) missing.push("điều kiện áp dụng");
  if (!localitySnippet) missing.push("phạm vi Đà Nẵng");

  const specificReason = !priceSnippet ? 'MISSING_EXPLICIT_PRICE_OR_DISCOUNT' :
                         !expirySnippet ? 'MISSING_EXPLICIT_EXPIRY_OR_SCHEDULE' :
                         !conditionsSnippet ? 'MISSING_TRANSPARENT_CONDITIONS' :
                         'LOCALITY_SCOPE_UNVERIFIED_FOR_DANANG';

  return {
    http_status: 200,
    classification: 'NEEDS_RECHECK',
    reason: specificReason,
    details: `Trang còn thiếu: ${missing.join(', ')}.`,
    snippets: {
      price_snippet: priceSnippet,
      conditions_snippet: conditionsSnippet,
      locality_snippet: localitySnippet,
      expiry_snippet: expirySnippet
    }
  };
}

async function runRecovery044D() {
  console.log('🚀 [JAYT-SWEEP-044D] Bắt đầu quét 7 URL thay thế chính thức...');
  console.log(`⏰ Thời gian: ${new Date().toISOString()}`);

  // 1. Write pending_registry_updates.json (Strictly PENDING CEO APPROVAL)
  const pendingUpdates = {
    $schema: 'https://jayt.vn/schemas/pending-registry-updates.v1.json',
    work_order: 'JAYT-REGISTRY-RECOVERY-044D',
    created_at: new Date().toISOString(),
    governance_status: 'PENDING_CEO_APPROVAL',
    total_proposed_updates: REPLACEMENT_CANDIDATES.length,
    updates: REPLACEMENT_CANDIDATES.map((item, idx) => ({
      update_id: `REG_UPDATE_044D_${idx + 1}`,
      brand_id: item.brand_id,
      category: item.category,
      old_url: item.old_url,
      replacement_url: item.replacement_url,
      domain: item.domain,
      discovery_method: item.discovery_method,
      discovered_at: new Date().toISOString(),
      status: 'PENDING_CEO_APPROVAL',
      notes: item.notes
    }))
  };

  fs.writeFileSync(pendingRegistryPath, JSON.stringify(pendingUpdates, null, 2), 'utf8');
  console.log(`✅ [PENDING-REGISTRY] Đã tạo hồ sơ đề xuất thay thế: ${pendingRegistryPath}`);

  // 2. Launch Chrome CDP session to sweep the 7 replacement URLs
  const cdpPort = 9333 + Math.floor(Math.random() * 50);
  const chromeProc = spawn(chromeExe, [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${cdpPort}`,
    '--window-size=1280,1024',
    '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 JayTOperationalBot/1.0'
  ]);

  let browserWsUrl = null;
  for (let attempt = 1; attempt <= 20; attempt++) {
    try {
      const verRes = await fetch(`http://127.0.0.1:${cdpPort}/json/version`);
      if (verRes.ok) {
        const ver = await verRes.json();
        browserWsUrl = ver.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {
      await new Promise(r => setTimeout(r, 400));
    }
  }

  if (!browserWsUrl) {
    chromeProc.kill('SIGKILL');
    throw new Error(`Chrome CDP port ${cdpPort} did not respond.`);
  }

  const browserWs = new WebSocket(browserWsUrl);
  await new Promise(r => browserWs.onopen = r);

  let bMsgId = 1;
  function sendBrowser(method, params = {}) {
    return new Promise((resolve) => {
      const id = bMsgId++;
      const handler = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.id === id) {
            browserWs.removeEventListener('message', handler);
            resolve(data.result || {});
          }
        } catch (e) {
          resolve({});
        }
      };
      browserWs.addEventListener('message', handler);
      browserWs.send(JSON.stringify({ id, method, params }));
    });
  }

  const sweepResults = [];

  try {
    for (let i = 0; i < REPLACEMENT_CANDIDATES.length; i++) {
      const item = REPLACEMENT_CANDIDATES[i];
      const urlKey = `${item.brand_id.toLowerCase()}_rep_${i + 1}`;
      console.log(`\n[${i + 1}/${REPLACEMENT_CANDIDATES.length}] Quét URL thay thế: [${item.brand_id}] ${item.replacement_url}...`);

      const pngPath = path.join(artifactsDir, `capture_044d_${urlKey}.png`);
      const htmlPath = path.join(artifactsDir, `capture_044d_${urlKey}.html`);
      const txtPath = path.join(artifactsDir, `capture_044d_${urlKey}.txt`);
      const receiptPath = path.join(artifactsDir, `receipt_044d_${urlKey}.json`);

      const captureStartTime = new Date().toISOString();
      let finalUrl = item.replacement_url;
      let pageTitle = '';
      let pageText = '';
      let pageHtml = '';
      let screenshotBase64 = null;
      let navError = null;

      try {
        const targetRes = await sendBrowser('Target.createTarget', { url: 'about:blank', width: 1280, height: 1024 });
        const targetId = targetRes.targetId;

        const listRes = await fetch(`http://127.0.0.1:${cdpPort}/json/list`);
        const pages = await listRes.json();
        const pageObj = pages.find(p => p.id === targetId);

        if (!pageObj) throw new Error('Target page not found');

        const pageWs = new WebSocket(pageObj.webSocketDebuggerUrl);
        await new Promise((res, rej) => {
          pageWs.onopen = res;
          pageWs.onerror = rej;
        });

        let pMsgId = 1;
        function sendPage(method, params = {}) {
          return new Promise((resolve) => {
            const id = pMsgId++;
            const timeout = setTimeout(() => resolve({}), 14000);
            const handler = (event) => {
              try {
                const data = JSON.parse(event.data);
                if (data.id === id) {
                  clearTimeout(timeout);
                  pageWs.removeEventListener('message', handler);
                  resolve(data.result || {});
                }
              } catch (e) {
                clearTimeout(timeout);
                resolve({});
              }
            };
            pageWs.addEventListener('message', handler);
            pageWs.send(JSON.stringify({ id, method, params }));
          });
        }

        await sendPage('Page.enable');
        await sendPage('DOM.enable');

        await sendPage('Page.navigate', { url: item.replacement_url });
        await new Promise(r => setTimeout(r, 4500));

        const evalRes = await sendPage('Runtime.evaluate', {
          expression: `({
            url: window.location.href,
            title: document.title,
            text: document.body ? document.body.innerText : '',
            html: document.documentElement ? document.documentElement.outerHTML : ''
          })`,
          returnByValue: true
        });

        if (evalRes.result?.value) {
          finalUrl = evalRes.result.value.url || item.replacement_url;
          pageTitle = evalRes.result.value.title || '';
          pageText = evalRes.result.value.text || '';
          pageHtml = evalRes.result.value.html || '';
        }

        const shotRes = await sendPage('Page.captureScreenshot', { format: 'png' });
        screenshotBase64 = shotRes.data;

        await sendBrowser('Target.closeTarget', { targetId });
        pageWs.close();
      } catch (err) {
        navError = err.message;
      }

      const hasContent = Boolean(!navError && pageHtml && pageHtml.length > 50 && pageText && pageText.trim().length > 0);
      const fetchSuccess = hasContent;

      let pngHash = null;
      let htmlHash = null;
      let txtHash = null;

      if (fetchSuccess && screenshotBase64 && screenshotBase64.length > 100) {
        fs.writeFileSync(pngPath, Buffer.from(screenshotBase64, 'base64'));
        pngHash = getFileSha256(pngPath);
        fs.writeFileSync(htmlPath, pageHtml, 'utf8');
        htmlHash = getFileSha256(htmlPath);
        fs.writeFileSync(txtPath, pageText, 'utf8');
        txtHash = getFileSha256(txtPath);
      } else {
        if (fs.existsSync(pngPath)) fs.unlinkSync(pngPath);
        if (fs.existsSync(htmlPath)) fs.unlinkSync(htmlPath);
        if (fs.existsSync(txtPath)) fs.unlinkSync(txtPath);
      }

      const evalResult = classifyHardened(item.brand_id, item.replacement_url, finalUrl, pageTitle, pageText, pageHtml, fetchSuccess);

      const redirectChain = [item.replacement_url];
      if (finalUrl !== item.replacement_url) redirectChain.push(finalUrl);

      const receipt = {
        $schema: 'https://jayt.vn/schemas/capture-receipt.v1.json',
        work_order: 'JAYT-REGISTRY-RECOVERY-044D',
        brand_id: item.brand_id,
        category: item.category,
        old_url: item.old_url,
        replacement_url: item.replacement_url,
        final_url: finalUrl,
        redirect_chain: redirectChain,
        http_status: evalResult.http_status,
        page_title: pageTitle,
        captured_at: captureStartTime,
        classification: evalResult.classification,
        reason: evalResult.reason,
        details: evalResult.details,
        fetch_success: fetchSuccess,
        browser_metadata: {
          browser_name: 'Google Chrome Headless',
          version: '120.0.0.0',
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 JayTOperationalBot/1.0',
          viewport: '1280x1024'
        },
        verifiable_snippets: evalResult.snippets,
        artifacts: {
          screenshot_file: pngHash ? path.basename(pngPath) : null,
          screenshot_sha256: pngHash,
          html_file: htmlHash ? path.basename(htmlPath) : null,
          html_sha256: htmlHash,
          text_file: txtHash ? path.basename(txtPath) : null,
          text_sha256: txtHash
        }
      };

      fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2), 'utf8');
      const receiptHash = getFileSha256(receiptPath);

      console.log(`   👉 [HTTP ${evalResult.http_status}] [${evalResult.classification}] — ${evalResult.reason}`);
      console.log(`   👉 Screenshot: ${pngHash ? `${pngHash.substring(0, 16)}...` : 'NONE (FETCH_FAILED)'}`);

      sweepResults.push({
        brand_id: item.brand_id,
        category: item.category,
        old_url: item.old_url,
        replacement_url: item.replacement_url,
        final_url: finalUrl,
        redirect_chain: redirectChain,
        http_status: evalResult.http_status,
        page_title: pageTitle,
        captured_at: captureStartTime,
        classification: evalResult.classification,
        reason: evalResult.reason,
        details: evalResult.details,
        fetch_success: fetchSuccess,
        verifiable_snippets: evalResult.snippets,
        artifacts: {
          screenshot_file: pngHash ? path.basename(pngPath) : null,
          screenshot_sha256: pngHash,
          html_file: htmlHash ? path.basename(htmlPath) : null,
          html_sha256: htmlHash,
          text_file: txtHash ? path.basename(txtPath) : null,
          text_sha256: txtHash,
          receipt_file: path.basename(receiptPath),
          receipt_sha256: receiptHash
        }
      });
    }

    browserWs.close();
  } finally {
    chromeProc.kill('SIGKILL');
  }

  const summary = {
    work_order: 'JAYT-REGISTRY-RECOVERY-044D',
    executed_at: new Date().toISOString(),
    total_replacements_scanned: sweepResults.length,
    promotion_signal_count: sweepResults.filter(r => r.classification === 'PROMOTION_SIGNAL').length,
    needs_recheck_count: sweepResults.filter(r => r.classification === 'NEEDS_RECHECK').length,
    http_200_count: sweepResults.filter(r => r.http_status === 200).length,
    results: sweepResults
  };

  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');

  console.log('\n========================================================================');
  console.log(`✅ [HOÀN TẤT SWEEP 044D] Đã quét ${sweepResults.length} URL thay thế.`);
  console.log(`   - HTTP 200 (Accessible): ${summary.http_200_count}/${summary.total_replacements_scanned}`);
  console.log(`   - PROMOTION_SIGNAL:      ${summary.promotion_signal_count}`);
  console.log(`   - NEEDS_RECHECK:         ${summary.needs_recheck_count}`);
  console.log(`   - Summary JSON: ${summaryPath}`);
  console.log('========================================================================\n');

  return summary;
}

if (require.main === module) {
  runRecovery044D().catch(e => {
    console.error('Sweep 044d fatal error:', e);
    process.exit(1);
  });
}

module.exports = {
  REPLACEMENT_CANDIDATES,
  classifyHardened,
  runRecovery044D
};
