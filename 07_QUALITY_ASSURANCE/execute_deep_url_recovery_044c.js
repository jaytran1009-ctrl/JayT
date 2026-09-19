/**
 * JAYT DEEP URL RECOVERY & OBSERVATION HARNESS (044C - CLEAN STRICT)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const schedulePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'content_coverage_schedule.json');
const artifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044c_artifacts');
const summaryPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044c_summary.json');
const reportPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'weekly_evidence_batch_044c_report.md');

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

function loadAllDeepUrls() {
  const scheduleData = JSON.parse(fs.readFileSync(schedulePath, 'utf8'));
  const registry = scheduleData.deep_url_registry || [];

  const allItems = [];
  for (const reg of registry) {
    const brandId = reg.brand_id;
    const category = reg.category;
    const urls = reg.discovery_urls || [];

    urls.forEach((url, idx) => {
      allItems.push({
        brand_id: brandId,
        category: category,
        url_index: idx + 1,
        total_brand_urls: urls.length,
        url: url
      });
    });
  }
  return { registry, allItems };
}

function classifyHardened(brandId, reqUrl, finalUrl, pageTitle, pageText, pageHtml, fetchSuccess) {
  if (!fetchSuccess || !pageText || pageText.trim().length === 0) {
    return {
      http_status: 0,
      classification: 'NEEDS_RECHECK',
      reason: 'FETCH_FAILED_OR_NETWORK_ERROR',
      details: `Không thể kết nối hoặc tải nội dung từ URL ${reqUrl}`,
      snippets: null,
      is_deprecated: false
    };
  }

  const textLower = pageText.toLowerCase();
  const titleLower = pageTitle ? pageTitle.toLowerCase() : '';

  // 1. Anti-Bot / Challenge / Captcha
  if (textLower.includes('just a moment') ||
      textLower.includes('cloudflare') ||
      textLower.includes('verify you are human') ||
      textLower.includes('access denied') ||
      textLower.includes('403 forbidden') ||
      textLower.includes('captcha')) {
    return {
      http_status: 403,
      classification: 'NEEDS_RECHECK',
      reason: 'ANTI_BOT_CHALLENGE_OR_ACCESS_RESTRICTED',
      details: 'Trang kích hoạt cơ chế bảo vệ anti-bot/Cloudflare challenge, tuân thủ nguyên tắc không vượt rào cản.',
      snippets: null,
      is_deprecated: false
    };
  }

  // 2. 404 / Resource Not Found / Deprecated
  if (textLower.includes('404 not found') ||
      textLower.includes('trang không tồn tại') ||
      textLower.includes('resource cannot be found') ||
      textLower.includes('page not found') ||
      textLower.includes('không tìm thấy trang') ||
      titleLower.includes('404 not found') ||
      titleLower.includes('resource cannot be found') ||
      titleLower.includes('the resource cannot be found')) {
    return {
      http_status: 404,
      classification: 'NEEDS_RECHECK',
      reason: 'DEPRECATED_OR_REDIRECTED',
      details: 'URL trả về mã 404 hoặc đường dẫn đã thay đổi trên hệ thống đối tác.',
      snippets: null,
      is_deprecated: true
    };
  }

  // 3. Homepage Redirect Detection
  try {
    const parsedReq = new URL(reqUrl);
    const parsedFinal = new URL(finalUrl);
    if (parsedReq.pathname !== '/' && (parsedFinal.pathname === '/' || parsedFinal.pathname === '')) {
      return {
        http_status: 302,
        classification: 'NEEDS_RECHECK',
        reason: 'DEPRECATED_OR_REDIRECTED',
        details: `Deep URL đã bị chuyển hướng về trang chủ (${finalUrl}), nội dung ưu đãi cũ đã hết hiệu lực hoặc đổi đường dẫn.`,
        snippets: null,
        is_deprecated: true
      };
    }
  } catch {}

  // 4. Extract literal snippets for the 4 conditions
  const priceMatch = pageText.match(/(\b\d{1,3}(\.\d{3})+\s*(đ|vnd|vnđ)\b|\b\d{2,3}k\b|đồng giá \d+k?)/i);
  const priceSnippet = priceMatch ? priceMatch[0] : null;

  const condMatch = pageText.match(/((điều kiện|áp dụng|lưu ý|thời gian|khung giờ)[^\n.]{5,100})/i);
  const conditionsSnippet = condMatch ? condMatch[0].trim() : null;

  const locMatch = pageText.match(/((đà nẵng|da nang|toàn quốc|toàn hệ thống)[^\n.]{0,60})/i);
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
      },
      is_deprecated: false
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
    },
    is_deprecated: false
  };
}

async function runDeepUrlRecovery() {
  const { registry, allItems } = loadAllDeepUrls();
  console.log(`🚀 [JAYT-SWEEP-044C] Bắt đầu quét TOÀN BỘ ${allItems.length} Deep URLs thuộc 16 thương hiệu...`);
  console.log(`⏰ Thời gian: ${new Date().toISOString()}`);

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
    for (let i = 0; i < allItems.length; i++) {
      const item = allItems[i];
      const urlKey = `${item.brand_id.toLowerCase()}_u${item.url_index}`;
      console.log(`\n[${i + 1}/${allItems.length}] Quét: [${item.brand_id}] (${item.url_index}/${item.total_brand_urls}) ${item.url}...`);

      const pngPath = path.join(artifactsDir, `capture_044c_${urlKey}.png`);
      const htmlPath = path.join(artifactsDir, `capture_044c_${urlKey}.html`);
      const txtPath = path.join(artifactsDir, `capture_044c_${urlKey}.txt`);
      const receiptPath = path.join(artifactsDir, `receipt_044c_${urlKey}.json`);

      const captureStartTime = new Date().toISOString();
      let finalUrl = item.url;
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

        await sendPage('Page.navigate', { url: item.url });
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
          finalUrl = evalRes.result.value.url || item.url;
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
        // Clean up any stale files on failure
        if (fs.existsSync(pngPath)) fs.unlinkSync(pngPath);
        if (fs.existsSync(htmlPath)) fs.unlinkSync(htmlPath);
        if (fs.existsSync(txtPath)) fs.unlinkSync(txtPath);
      }

      const evalResult = classifyHardened(item.brand_id, item.url, finalUrl, pageTitle, pageText, pageHtml, fetchSuccess);

      const redirectChain = [item.url];
      if (finalUrl !== item.url) redirectChain.push(finalUrl);

      const receipt = {
        $schema: 'https://jayt.vn/schemas/capture-receipt.v1.json',
        work_order: 'JAYT-DEEP-URL-RECOVERY-044C',
        brand_id: item.brand_id,
        category: item.category,
        url_index: item.url_index,
        requested_url: item.url,
        final_url: finalUrl,
        redirect_chain: redirectChain,
        http_status: evalResult.http_status,
        page_title: pageTitle,
        captured_at: captureStartTime,
        classification: evalResult.classification,
        reason: evalResult.reason,
        details: evalResult.details,
        is_deprecated: evalResult.is_deprecated,
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
        url_index: item.url_index,
        requested_url: item.url,
        final_url: finalUrl,
        redirect_chain: redirectChain,
        http_status: evalResult.http_status,
        page_title: pageTitle,
        captured_at: captureStartTime,
        classification: evalResult.classification,
        reason: evalResult.reason,
        details: evalResult.details,
        is_deprecated: evalResult.is_deprecated,
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

  // Two-tier Summary
  const brandsScanned = Array.from(new Set(sweepResults.map(r => r.brand_id)));
  const deprecatedUrls = sweepResults.filter(r => r.is_deprecated || r.http_status === 404 || r.reason === 'DEPRECATED_OR_REDIRECTED');

  const summary = {
    work_order: 'JAYT-DEEP-URL-RECOVERY-044C',
    executed_at: new Date().toISOString(),
    tier1_brands_count: brandsScanned.length,
    tier2_deep_urls_count: sweepResults.length,
    promotion_signal_count: sweepResults.filter(r => r.classification === 'PROMOTION_SIGNAL').length,
    needs_recheck_count: sweepResults.filter(r => r.classification === 'NEEDS_RECHECK').length,
    deprecated_urls_count: deprecatedUrls.length,
    deprecated_urls_list: deprecatedUrls.map(d => ({
      brand_id: d.brand_id,
      url: d.requested_url,
      http_status: d.http_status,
      final_url: d.final_url,
      reason: d.reason
    })),
    results: sweepResults
  };

  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');

  console.log('\n========================================================================');
  console.log(`✅ [HOÀN TẤT SWEEP 044C] Đã quét ${brandsScanned.length} thương hiệu / ${sweepResults.length} Deep URLs.`);
  console.log(`   - PROMOTION_SIGNAL:   ${summary.promotion_signal_count}`);
  console.log(`   - NEEDS_RECHECK:      ${summary.needs_recheck_count}`);
  console.log(`   - DEPRECATED/404 URL: ${summary.deprecated_urls_count}`);
  console.log(`   - Summary JSON: ${summaryPath}`);
  console.log('========================================================================\n');

  return summary;
}

if (require.main === module) {
  runDeepUrlRecovery().catch(e => {
    console.error('Sweep 044c fatal error:', e);
    process.exit(1);
  });
}

module.exports = {
  loadAllDeepUrls,
  classifyHardened,
  runDeepUrlRecovery
};
