/**
 * JAYT REAL PUBLIC SOURCE CAPTURE HARNESS (044B - ROBUST CDP SESSION)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const schedulePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'content_coverage_schedule.json');
const sweepArtifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044b_artifacts');
const journalDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'coverage_journal');

fs.mkdirSync(sweepArtifactsDir, { recursive: true });
fs.mkdirSync(journalDir, { recursive: true });

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

function loadRegistrySources() {
  if (!fs.existsSync(schedulePath)) {
    throw new Error(`Schedule file not found: ${schedulePath}`);
  }
  const scheduleData = JSON.parse(fs.readFileSync(schedulePath, 'utf8'));
  const registry = scheduleData.deep_url_registry || [];

  const sources = [];
  for (const item of registry) {
    const brandId = item.brand_id;
    const category = item.category;
    const urls = item.discovery_urls || [];
    const primaryUrl = urls[0];

    sources.push({
      brand_id: brandId,
      category: category,
      url: primaryUrl,
      discovery_urls: urls
    });
  }
  return sources;
}

function analyzeDynamicContent(brandId, title, text, html) {
  const textLower = (text || '').toLowerCase();

  // 1. Anti-Bot / Cloudflare Challenge
  if (textLower.includes('just a moment') ||
      textLower.includes('cloudflare') ||
      textLower.includes('verify you are human') ||
      textLower.includes('access denied') ||
      textLower.includes('403 forbidden') ||
      textLower.includes('captcha')) {
    return {
      status: 'NEEDS_RECHECK',
      reason: 'ANTI_BOT_CHALLENGE_OR_ACCESS_RESTRICTED',
      details: 'Trang kích hoạt cơ chế bảo vệ anti-bot/Cloudflare challenge, tuân thủ nguyên tắc không vượt rào cản.',
      claims: null
    };
  }

  // 2. 404 / Resource Not Found
  if (textLower.includes('404 not found') ||
      textLower.includes('trang không tồn tại') ||
      textLower.includes('resource cannot be found') ||
      textLower.includes('page not found')) {
    return {
      status: 'NEEDS_RECHECK',
      reason: 'PAGE_NOT_FOUND_OR_DEPRECATED_URL',
      details: 'URL trả về trang 404 hoặc đường dẫn đã thay đổi trên hệ thống đối tác.',
      claims: null
    };
  }

  // 3. Dynamic parse for 4 conditions: Price, Conditions, Locality (Da Nang), Expiry
  const hasExplicitPrice = /\b\d{1,3}(\.\d{3})+\s*(đ|vnd|vnđ)\b/i.test(text) ||
                           /\b\d{2,3}k\b/i.test(text);

  const hasConditions = textLower.includes('điều kiện') ||
                        textLower.includes('áp dụng') ||
                        textLower.includes('thời gian') ||
                        textLower.includes('khung giờ');

  const hasExpiry = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/.test(text) ||
                    textLower.includes('hằng tuần') ||
                    textLower.includes('hạn sử dụng') ||
                    textLower.includes('thứ hai') ||
                    textLower.includes('thứ ba') ||
                    textLower.includes('thứ tư') ||
                    textLower.includes('thứ năm') ||
                    textLower.includes('thứ sáu');

  const hasDaNang = textLower.includes('đà nẵng') ||
                    textLower.includes('da nang') ||
                    textLower.includes('toàn quốc') ||
                    textLower.includes('toàn hệ thống');

  // Verify all 4 conditions
  if (!hasExplicitPrice) {
    return {
      status: 'NEEDS_RECHECK',
      reason: 'MISSING_EXPLICIT_PRICE_OR_DISCOUNT',
      details: 'Trang chỉ hiển thị hình ảnh banner hoặc danh mục chung, thiếu mức giá ưu đãi/số tiền chiết khấu cụ thể bằng văn bản.',
      claims: null
    };
  }

  if (!hasExpiry) {
    return {
      status: 'NEEDS_RECHECK',
      reason: 'MISSING_EXPLICIT_EXPIRY_OR_SCHEDULE',
      details: 'Thiếu mốc thời hạn áp dụng hoặc lịch trình ngày cụ thể.',
      claims: null
    };
  }

  if (!hasConditions) {
    return {
      status: 'NEEDS_RECHECK',
      reason: 'MISSING_TRANSPARENT_CONDITIONS',
      details: 'Thiếu danh sách điều kiện áp dụng/ràng buộc sử dụng.',
      claims: null
    };
  }

  if (!hasDaNang) {
    return {
      status: 'NEEDS_RECHECK',
      reason: 'LOCALITY_SCOPE_UNVERIFIED_FOR_DANANG',
      details: 'Chưa có điều khoản xác nhận áp dụng tại khu vực TP. Đà Nẵng.',
      claims: null
    };
  }

  return {
    status: 'PROMOTION_DETAIL',
    reason: 'VERIFIED_OFFICIAL_PROMOTION_DETAIL',
    details: 'Đầy đủ giá, điều kiện, phạm vi áp dụng và thời hạn hiệu lực.',
    claims: {
      title,
      price_verified: true,
      conditions_verified: true,
      locality_verified: true,
      expiry_verified: true
    }
  };
}

async function runFullSourceSweep() {
  const sources = loadRegistrySources();
  console.log(`🚀 [JAYT-SWEEP-044B-FIX] Bắt đầu quét ${sources.length} thương hiệu từ content_coverage_schedule.json...`);
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

  // Wait for Chrome remote debugging port to be ready
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
    throw new Error(`Chrome remote debugging port ${cdpPort} did not respond in time.`);
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
    for (let i = 0; i < sources.length; i++) {
      const src = sources[i];
      console.log(`\n[${i + 1}/${sources.length}] Đang quét thương hiệu: ${src.brand_id} (${src.url})...`);

      const brandKey = src.brand_id.toLowerCase();
      const pngPath = path.join(sweepArtifactsDir, `capture_sweep_044b_${brandKey}.png`);
      const htmlPath = path.join(sweepArtifactsDir, `capture_sweep_044b_${brandKey}.html`);
      const txtPath = path.join(sweepArtifactsDir, `capture_sweep_044b_${brandKey}.txt`);
      const receiptPath = path.join(sweepArtifactsDir, `receipt_sweep_044b_${brandKey}.json`);

      const captureStartTime = new Date().toISOString();
      let finalUrl = src.url;
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

        if (!pageObj) {
          throw new Error('Target page could not be located');
        }

        const pageWs = new WebSocket(pageObj.webSocketDebuggerUrl);
        await new Promise((res, rej) => {
          pageWs.onopen = res;
          pageWs.onerror = rej;
        });

        let pMsgId = 1;
        function sendPage(method, params = {}) {
          return new Promise((resolve) => {
            const id = pMsgId++;
            const timeout = setTimeout(() => resolve({}), 15000);
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

        await sendPage('Page.navigate', { url: src.url });
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
          finalUrl = evalRes.result.value.url || src.url;
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

      let pngHash = null;
      let htmlHash = null;
      let txtHash = null;

      if (screenshotBase64 && screenshotBase64.length > 100) {
        fs.writeFileSync(pngPath, Buffer.from(screenshotBase64, 'base64'));
        pngHash = getFileSha256(pngPath);
      } else {
        if (fs.existsSync(pngPath)) fs.unlinkSync(pngPath);
      }

      if (pageHtml && pageHtml.length > 50) {
        fs.writeFileSync(htmlPath, pageHtml, 'utf8');
        htmlHash = getFileSha256(htmlPath);
      } else {
        if (fs.existsSync(htmlPath)) fs.unlinkSync(htmlPath);
      }

      if (pageText && pageText.length > 10) {
        fs.writeFileSync(txtPath, pageText, 'utf8');
        txtHash = getFileSha256(txtPath);
      } else {
        if (fs.existsSync(txtPath)) fs.unlinkSync(txtPath);
      }

      let analysis;
      if (navError && !pageText) {
        analysis = {
          status: 'NEEDS_RECHECK',
          reason: 'FETCH_FAILED_OR_NETWORK_ERROR',
          details: `Lỗi kết nối trình duyệt khi tải ${src.url}: ${navError}`,
          claims: null
        };
      } else {
        analysis = analyzeDynamicContent(src.brand_id, pageTitle, pageText, pageHtml);
      }

      const receipt = {
        $schema: 'https://jayt.vn/schemas/capture-receipt.v1.json',
        work_order: 'JAYT-FULL-SOURCE-SWEEP-044B',
        brand_id: src.brand_id,
        category: src.category,
        requested_url: src.url,
        final_url: finalUrl,
        page_title: pageTitle,
        captured_at: captureStartTime,
        classification: analysis.status,
        reason: analysis.reason,
        details: analysis.details,
        fetch_success: Boolean(pngHash && htmlHash),
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

      console.log(`   👉 Trạng thái: [${analysis.status}] — ${analysis.reason}`);
      console.log(`   👉 Screenshot: ${pngHash ? `${pngHash.substring(0, 16)}...` : 'NONE (FETCH_FAILED)'}`);

      sweepResults.push({
        brand_id: src.brand_id,
        category: src.category,
        url: src.url,
        final_url: finalUrl,
        page_title: pageTitle,
        captured_at: captureStartTime,
        classification: analysis.status,
        reason: analysis.reason,
        details: analysis.details,
        fetch_success: Boolean(pngHash && htmlHash),
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
    work_order: 'JAYT-FULL-SOURCE-SWEEP-044B',
    executed_at: new Date().toISOString(),
    total_sources_scanned: sweepResults.length,
    promotion_detail_count: sweepResults.filter(r => r.classification === 'PROMOTION_DETAIL').length,
    needs_recheck_count: sweepResults.filter(r => r.classification === 'NEEDS_RECHECK').length,
    results: sweepResults
  };

  const summaryPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044b_summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');

  console.log('\n========================================================================');
  console.log(`✅ [HOÀN TẤT SWEEP 044B-FIX] Đã quét ${sweepResults.length}/16 nguồn thực tế.`);
  console.log(`   - PROMOTION_DETAIL: ${summary.promotion_detail_count}`);
  console.log(`   - NEEDS_RECHECK:    ${summary.needs_recheck_count}`);
  console.log(`   - Summary JSON: ${summaryPath}`);
  console.log('========================================================================\n');
  return summary;
}

if (require.main === module) {
  runFullSourceSweep().catch(e => {
    console.error('Sweep execution fatal error:', e);
    process.exit(1);
  });
}

module.exports = {
  loadRegistrySources,
  analyzeDynamicContent,
  runFullSourceSweep
};
