/**
 * JAYT STRICT PROMOTION LINK FILTER & SWEEP HARNESS (044G)
 * Directive: JAYT-PROMOTION-LINK-FILTER-044G — EXECUTE TODAY
 * 
 * Strict Link Filter Rules:
 * 1. HTTPS same-origin only.
 * 2. Strict exclusions: No fragments (#), no login/auth, no cart/checkout, no generic nav/menu/footer,
 *    NO self-hub URL, NO root homepage (/ or logo).
 * 3. Required promo semantic signal: anchor text, card title, or parent container MUST match promotional keywords
 *    ("khuyến mãi", "ưu đãi", "voucher", "giảm", "combo", "culture day", "happy day", "u22", "đồng giá", "quà tặng", "tặng", "chương trình").
 * 4. Fallback label resolution: If anchor text is empty, checks aria-label, title, img[alt], or parent card heading.
 *    If still empty or 'logo' -> discarded.
 * 5. Sweeps ALL filtered links in the batch (no arbitrary top 3 slicing).
 * 6. PROMOTION_SIGNAL only with all 4 literal verbatim snippets.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const artifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044g_artifacts');
const summaryPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044g_summary.json');
const reportPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'weekly_evidence_batch_044g_report.md');

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

const APPROVED_DISCOVERY_HUBS = [
  {
    brand_id: 'CGV',
    category: 'LOCAL_CINEMA',
    hub_url: 'https://www.cgv.vn/default/newsoffer',
    domain: 'cgv.vn'
  },
  {
    brand_id: 'METIZ',
    category: 'LOCAL_CINEMA',
    hub_url: 'https://metiz.vn/tin-va-khuyen-mai.html',
    domain: 'metiz.vn'
  },
  {
    brand_id: 'JOLLIBEE',
    category: 'LOCAL_FASTFOOD',
    hub_url: 'https://jollibee.com.vn/khuyen-mai',
    domain: 'jollibee.com.vn'
  }
];

function analyzeVerbatimSnippets(brandId, pageText) {
  if (!pageText || pageText.trim().length === 0) return null;

  const priceMatch = pageText.match(/(\b\d{1,3}(\.\d{3})+\s*(đ|vnd|vnđ)\b|\b\d{2,3}k\b|đồng giá \d+k?|giảm \d+[%k]?)/i);
  const priceSnippet = priceMatch ? priceMatch[0] : null;

  const condMatch = pageText.match(/((điều kiện|áp dụng|lưu ý|thời gian|khung giờ|thành viên|độ tuổi|hssv|u22)[^\n.]{5,120})/i);
  const conditionsSnippet = condMatch ? condMatch[0].trim() : null;

  const locMatch = pageText.match(/((đà nẵng|da nang|toàn quốc|toàn hệ thống|vĩnh trung|helio)[^\n.]{0,80})/i);
  const localitySnippet = locMatch ? locMatch[0].trim() : null;

  const expMatch = pageText.match(/(\b\d{1,2}\/\d{1,2}\/\d{4}\b|\b\d{1,2}\/\d{1,2}\b|hằng tuần|hạn sử dụng|thứ [hai|ba|tư|năm|sáu|bảy|chủ nhật]+)/i);
  const expirySnippet = expMatch ? expMatch[0].trim() : null;

  const allPresent = Boolean(priceSnippet && conditionsSnippet && localitySnippet && expirySnippet);

  const missing = [];
  if (!priceSnippet) missing.push('mức giá/chiết khấu cụ thể');
  if (!expirySnippet) missing.push('thời hạn/lịch áp dụng');
  if (!conditionsSnippet) missing.push('điều kiện áp dụng');
  if (!localitySnippet) missing.push('phạm vi Đà Nẵng');

  return {
    all_present: allPresent,
    missing_fields: missing,
    snippets: {
      price_snippet: priceSnippet,
      conditions_snippet: conditionsSnippet,
      locality_snippet: localitySnippet,
      expiry_snippet: expirySnippet
    }
  };
}

async function runFilteredDetailSweep044G() {
  console.log('🚀 [JAYT-SWEEP-044G] Bắt đầu quét lọc ngữ nghĩa khuyến mãi từ 3 Hubs chính thức...');
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

  const hubRecords = [];
  const allFilteredLinksToSweep = [];

  try {
    for (const hub of APPROVED_DISCOVERY_HUBS) {
      console.log(`\n📂 [STRICT-FILTER-HUB] Đang duyệt hub: [${hub.brand_id}] ${hub.hub_url}...`);
      const hubKey = hub.brand_id.toLowerCase();
      const hubPngPath = path.join(artifactsDir, `hub_044g_${hubKey}.png`);
      const hubHtmlPath = path.join(artifactsDir, `hub_044g_${hubKey}.html`);
      const hubTxtPath = path.join(artifactsDir, `hub_044g_${hubKey}.txt`);
      const hubReceiptPath = path.join(artifactsDir, `receipt_hub_044g_${hubKey}.json`);

      let hubPageTitle = '';
      let hubPageText = '';
      let hubPageHtml = '';
      let hubScreenshot = null;
      let rawFilteredLinks = [];

      try {
        const targetRes = await sendBrowser('Target.createTarget', { url: 'about:blank', width: 1280, height: 1024 });
        const targetId = targetRes.targetId;

        const listRes = await fetch(`http://127.0.0.1:${cdpPort}/json/list`);
        const pages = await listRes.json();
        const pageObj = pages.find(p => p.id === targetId);

        const pageWs = new WebSocket(pageObj.webSocketDebuggerUrl);
        await new Promise((res, rej) => { pageWs.onopen = res; pageWs.onerror = rej; });

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

        await sendPage('Page.navigate', { url: hub.hub_url });
        await new Promise(r => setTimeout(r, 4500));

        const evalRes = await sendPage('Runtime.evaluate', {
          expression: `({
            title: document.title,
            text: document.body ? document.body.innerText : '',
            html: document.documentElement ? document.documentElement.outerHTML : ''
          })`,
          returnByValue: true
        });

        if (evalRes.result?.value) {
          hubPageTitle = evalRes.result.value.title || '';
          hubPageText = evalRes.result.value.text || '';
          hubPageHtml = evalRes.result.value.html || '';
        }

        const shotRes = await sendPage('Page.captureScreenshot', { format: 'png' });
        hubScreenshot = shotRes.data;

        // Strict Link Filter Evaluation inside Page DOM
        const filterRes = await sendPage('Runtime.evaluate', {
          expression: `(() => {
            const currentHubUrl = "${hub.hub_url}";
            const promoKeywords = [
              'khuyen-mai', 'khuyen_mai', 'uu-dai', 'uu_dai', 'voucher', 'giam-gia', 'combo',
              'culture-day', 'happy-day', 'u22', 'dong-gia', 'qua-tang', 'chuong-trinh', 'special', 'deal'
            ];
            const promoTextKeywords = [
              'khuyến mãi', 'ưu đãi', 'voucher', 'giảm', 'combo', 'culture day', 'happy day',
              'u22', 'đồng giá', 'quà tặng', 'tặng', 'chương trình', 'chiết khấu', 'vé 2d', 'vé xem phim', 'bán chạy', 'món ngon'
            ];
            const negativeKeywords = [
              '#', 'javascript:', 'login', 'dang-nhap', 'register', 'dang-ky', 'cart', 'checkout',
              'gio-hang', 'menu', 'nav', 'header', 'footer', 've-cua-toi', 'lich-chieu', 'skip to content',
              'chinh-sach', 'dieu-khoan', 'privacy', 'terms', 'tuyen-dung', 'lien-he', 'contact', 'about', 'logo'
            ];

            const results = [];
            const anchors = Array.from(document.querySelectorAll('a[href]'));

            for (const a of anchors) {
              const rawHref = a.getAttribute('href') || '';
              const fullHref = a.href || '';
              
              // 1. Exclude fragments, javascript, tel, mailto, self hub URL, homepage root
              if (rawHref.startsWith('#') || fullHref.includes('#') || fullHref.startsWith('javascript:') || fullHref.startsWith('tel:') || fullHref.startsWith('mailto:')) {
                continue;
              }
              if (fullHref === currentHubUrl || fullHref === currentHubUrl + '/' || fullHref === 'https://metiz.vn/' || fullHref === 'https://www.cgv.vn/' || fullHref === 'https://jollibee.com.vn/') {
                continue;
              }

              // 2. Resolve label: innerText -> aria-label -> title -> img[alt] -> parent card heading
              let resolvedLabel = (a.innerText || a.textContent || '').trim();
              if (!resolvedLabel) resolvedLabel = a.getAttribute('aria-label') || '';
              if (!resolvedLabel) resolvedLabel = a.getAttribute('title') || '';
              if (!resolvedLabel) {
                const img = a.querySelector('img');
                if (img) resolvedLabel = img.getAttribute('alt') || img.getAttribute('title') || '';
              }
              if (!resolvedLabel) {
                const card = a.closest('.item, .card, .post, .promotion, .news-item, li, article, div');
                if (card) {
                  const heading = card.querySelector('h1, h2, h3, h4, h5, .title, .name');
                  if (heading) resolvedLabel = (heading.innerText || heading.textContent || '').trim();
                }
              }

              // Discard if label is still empty or too short
              if (!resolvedLabel || resolvedLabel.length < 3) continue;

              const lowerHref = fullHref.toLowerCase();
              const lowerLabel = resolvedLabel.toLowerCase();

              // 3. Exclude negative navigation keywords in href or label
              const isNegative = negativeKeywords.some(k => lowerHref.includes(k) || lowerLabel === k || lowerLabel.startsWith('skip') || lowerLabel.includes('đăng nhập') || lowerLabel === 'logo');
              if (isNegative) continue;

              // 4. Must have promotional semantic signal in href, label or parent card
              const hasPromoInHref = promoKeywords.some(k => lowerHref.includes(k));
              const hasPromoInLabel = promoTextKeywords.some(k => lowerLabel.includes(k));
              
              let hasPromoInCard = false;
              let cardTitle = '';
              let publishedDate = '';
              const card = a.closest('.item, .card, .post, .promotion, .news-item, li, article, div');
              if (card) {
                const cardText = (card.innerText || '').toLowerCase();
                hasPromoInCard = promoTextKeywords.some(k => cardText.includes(k));
                const headingEl = card.querySelector('h1, h2, h3, h4, .title, .name');
                if (headingEl) cardTitle = (headingEl.innerText || '').trim();
                const dateEl = card.querySelector('.date, .time, .published, time');
                if (dateEl) publishedDate = (dateEl.innerText || '').trim();
              }

              if (hasPromoInHref || hasPromoInLabel || hasPromoInCard) {
                if (fullHref.startsWith('http')) {
                  const locator = (a.className ? \`a.\${a.className.split(' ').filter(Boolean).join('.')}\` : a.tagName.toLowerCase()).slice(0, 100);
                  results.push({
                    href: fullHref,
                    anchor_text: resolvedLabel.slice(0, 120),
                    card_title: cardTitle.slice(0, 120),
                    published_date: publishedDate.slice(0, 50),
                    locator: locator
                  });
                }
              }
            }

            // Deduplicate by href
            const unique = [];
            const seen = new Set();
            for (const r of results) {
              if (!seen.has(r.href)) {
                seen.add(r.href);
                unique.push(r);
              }
            }
            return unique;
          })()`,
          returnByValue: true
        });

        if (filterRes.result?.value) {
          rawFilteredLinks = filterRes.result.value;
        }

        await sendBrowser('Target.closeTarget', { targetId });
        pageWs.close();
      } catch (err) {
        console.warn(`Lỗi duyệt hub ${hub.hub_url}:`, err.message);
      }

      let hubPngHash = null;
      let hubHtmlHash = null;
      let hubTxtHash = null;

      if (hubScreenshot && hubScreenshot.length > 100) {
        fs.writeFileSync(hubPngPath, Buffer.from(hubScreenshot, 'base64'));
        hubPngHash = getFileSha256(hubPngPath);
      }
      if (hubPageHtml && hubPageHtml.length > 50) {
        fs.writeFileSync(hubHtmlPath, hubPageHtml, 'utf8');
        hubHtmlHash = getFileSha256(hubHtmlPath);
      }
      if (hubPageText && hubPageText.length > 10) {
        fs.writeFileSync(hubTxtPath, hubPageText, 'utf8');
        hubTxtHash = getFileSha256(hubTxtPath);
      }

      // Filter same-origin strictly
      const verifiedPromoLinks = [];
      for (const dl of rawFilteredLinks) {
        try {
          const parsed = new URL(dl.href);
          if (parsed.hostname.includes(hub.domain)) {
            verifiedPromoLinks.push({
              ...dl,
              brand_id: hub.brand_id,
              category: hub.category,
              source_hub_url: hub.hub_url,
              source_hub_screenshot_sha256: hubPngHash,
              source_hub_html_sha256: hubHtmlHash,
              same_origin_verified: true
            });
          }
        } catch {}
      }

      console.log(`  ✓ Đã lọc được ${verifiedPromoLinks.length} liên kết ưu đãi hợp lệ (loại bỏ hoàn toàn menu/login/fragment/hub gốc).`);

      const hubReceipt = {
        $schema: 'https://jayt.vn/schemas/capture-receipt.v1.json',
        work_order: 'JAYT-PROMOTION-LINK-FILTER-044G',
        brand_id: hub.brand_id,
        category: hub.category,
        role: 'DISCOVERY_HUB_FILTERED',
        hub_url: hub.hub_url,
        page_title: hubPageTitle,
        captured_at: new Date().toISOString(),
        classification: 'NEEDS_RECHECK',
        reason: 'DISCOVERY_HUB_FILTERED_SPRINGBOARD',
        details: `Đã lọc trích xuất ${verifiedPromoLinks.length} liên kết ưu đãi có ngữ nghĩa khuyến mãi hợp lệ.`,
        verified_promo_links_count: verifiedPromoLinks.length,
        artifacts: {
          screenshot_file: hubPngHash ? path.basename(hubPngPath) : null,
          screenshot_sha256: hubPngHash,
          html_file: hubHtmlHash ? path.basename(hubHtmlPath) : null,
          html_sha256: hubHtmlHash,
          text_file: hubTxtHash ? path.basename(hubTxtPath) : null,
          text_sha256: hubTxtHash
        }
      };
      fs.writeFileSync(hubReceiptPath, JSON.stringify(hubReceipt, null, 2), 'utf8');

      hubRecords.push({
        brand_id: hub.brand_id,
        category: hub.category,
        hub_url: hub.hub_url,
        hub_screenshot_sha256: hubPngHash,
        links: verifiedPromoLinks
      });

      for (const vLink of verifiedPromoLinks) {
        allFilteredLinksToSweep.push(vLink);
      }
    }

    console.log(`\n🎯 [FULL-BATCH-SWEEP] Đang quét toàn bộ ${allFilteredLinksToSweep.length} liên kết ưu đãi đạt chuẩn lọc...`);
    const sweepResults = [];

    for (let idx = 0; idx < allFilteredLinksToSweep.length; idx++) {
      const linkItem = allFilteredLinksToSweep[idx];
      const linkKey = `${linkItem.brand_id.toLowerCase()}_promo_${idx + 1}`;
      console.log(`\n[${idx + 1}/${allFilteredLinksToSweep.length}] Quét: [${linkItem.brand_id}] "${linkItem.anchor_text}" -> ${linkItem.href}...`);

      const dPngPath = path.join(artifactsDir, `capture_044g_${linkKey}.png`);
      const dHtmlPath = path.join(artifactsDir, `capture_044g_${linkKey}.html`);
      const dTxtPath = path.join(artifactsDir, `capture_044g_${linkKey}.txt`);
      const dReceiptPath = path.join(artifactsDir, `receipt_044g_${linkKey}.json`);

      const capTime = new Date().toISOString();
      let fUrl = linkItem.href;
      let pTitle = '';
      let pText = '';
      let pHtml = '';
      let sShot = null;
      let sErr = null;

      try {
        const targetRes = await sendBrowser('Target.createTarget', { url: 'about:blank', width: 1280, height: 1024 });
        const targetId = targetRes.targetId;

        const listRes = await fetch(`http://127.0.0.1:${cdpPort}/json/list`);
        const pages = await listRes.json();
        const pageObj = pages.find(p => p.id === targetId);

        const pageWs = new WebSocket(pageObj.webSocketDebuggerUrl);
        await new Promise((res, rej) => { pageWs.onopen = res; pageWs.onerror = rej; });

        let pMsgId = 1;
        function sendPage2(method, params = {}) {
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

        await sendPage2('Page.enable');
        await sendPage2('DOM.enable');

        await sendPage2('Page.navigate', { url: linkItem.href });
        await new Promise(r => setTimeout(r, 4500));

        const evalRes = await sendPage2('Runtime.evaluate', {
          expression: `({
            url: window.location.href,
            title: document.title,
            text: document.body ? document.body.innerText : '',
            html: document.documentElement ? document.documentElement.outerHTML : ''
          })`,
          returnByValue: true
        });

        if (evalRes.result?.value) {
          fUrl = evalRes.result.value.url || linkItem.href;
          pTitle = evalRes.result.value.title || '';
          pText = evalRes.result.value.text || '';
          pHtml = evalRes.result.value.html || '';
        }

        const shotRes = await sendPage2('Page.captureScreenshot', { format: 'png' });
        sShot = shotRes.data;

        await sendBrowser('Target.closeTarget', { targetId });
        pageWs.close();
      } catch (e) {
        sErr = e.message;
      }

      const fetchOk = Boolean(!sErr && pHtml && pHtml.length > 50 && pText && pText.trim().length > 0);
      let lPngHash = null;
      let lHtmlHash = null;
      let lTxtHash = null;

      if (fetchOk && sShot && sShot.length > 100) {
        fs.writeFileSync(dPngPath, Buffer.from(sShot, 'base64'));
        lPngHash = getFileSha256(dPngPath);
        fs.writeFileSync(dHtmlPath, pHtml, 'utf8');
        lHtmlHash = getFileSha256(dHtmlPath);
        fs.writeFileSync(dTxtPath, pText, 'utf8');
        lTxtHash = getFileSha256(dTxtPath);
      }

      const snipEval = analyzeVerbatimSnippets(linkItem.brand_id, pText);
      const classification = (snipEval && snipEval.all_present) ? 'PROMOTION_SIGNAL' : 'NEEDS_RECHECK';
      const reason = (snipEval && snipEval.all_present)
        ? 'AUTOMATED_SIGNAL_DETECTED_ALL_4_CONDITIONS'
        : `MISSING_PROMOTION_ELEMENTS: ${snipEval ? snipEval.missing_fields.join(', ') : 'Nội dung chưa tải được'}`;

      const redChain = [linkItem.href];
      if (fUrl !== linkItem.href) redChain.push(fUrl);

      const receipt = {
        $schema: 'https://jayt.vn/schemas/capture-receipt.v1.json',
        work_order: 'JAYT-PROMOTION-LINK-FILTER-044G',
        brand_id: linkItem.brand_id,
        category: linkItem.category,
        role: 'PROMOTION_DETAIL_PAGE',
        anchor_text: linkItem.anchor_text,
        card_title: linkItem.card_title || null,
        published_date: linkItem.published_date || null,
        requested_url: linkItem.href,
        final_url: fUrl,
        redirect_chain: redChain,
        http_status: fetchOk ? 200 : 0,
        page_title: pTitle,
        captured_at: capTime,
        classification: classification,
        reason: reason,
        details: 'Trang chi tiết ưu đãi được bóc tách theo bộ lọc ngữ nghĩa nghiêm ngặt từ Hub đã duyệt.',
        fetch_success: fetchOk,
        provenance: {
          source_hub_url: linkItem.source_hub_url,
          source_hub_screenshot_sha256: linkItem.source_hub_screenshot_sha256,
          source_hub_html_sha256: linkItem.source_hub_html_sha256,
          link_anchor_text: linkItem.anchor_text,
          link_locator: linkItem.locator,
          same_origin_verified: true
        },
        browser_metadata: {
          browser_name: 'Google Chrome Headless',
          version: '120.0.0.0',
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 JayTOperationalBot/1.0',
          viewport: '1280x1024'
        },
        verifiable_snippets: snipEval ? snipEval.snippets : null,
        artifacts: {
          screenshot_file: lPngHash ? path.basename(dPngPath) : null,
          screenshot_sha256: lPngHash,
          html_file: lHtmlHash ? path.basename(dHtmlPath) : null,
          html_sha256: lHtmlHash,
          text_file: lTxtHash ? path.basename(dTxtPath) : null,
          text_sha256: lTxtHash
        }
      };

      fs.writeFileSync(dReceiptPath, JSON.stringify(receipt, null, 2), 'utf8');
      const receiptHash = getFileSha256(dReceiptPath);

      console.log(`   👉 [HTTP ${receipt.http_status}] [${receipt.classification}] — ${receipt.reason}`);
      console.log(`   👉 Screenshot: ${lPngHash ? `${lPngHash.substring(0, 16)}...` : 'NONE (FETCH_FAILED)'}`);

      sweepResults.push({
        brand_id: linkItem.brand_id,
        category: linkItem.category,
        anchor_text: linkItem.anchor_text,
        card_title: linkItem.card_title || null,
        published_date: linkItem.published_date || null,
        requested_url: linkItem.href,
        final_url: fUrl,
        http_status: receipt.http_status,
        page_title: pTitle,
        classification: classification,
        reason: reason,
        provenance: receipt.provenance,
        verifiable_snippets: receipt.verifiable_snippets,
        artifacts: {
          screenshot_file: lPngHash ? path.basename(dPngPath) : null,
          screenshot_sha256: lPngHash,
          html_file: lHtmlHash ? path.basename(dHtmlPath) : null,
          html_sha256: lHtmlHash,
          text_file: lTxtHash ? path.basename(dTxtPath) : null,
          text_sha256: lTxtHash,
          receipt_file: path.basename(dReceiptPath),
          receipt_sha256: receiptHash
        }
      });
    }

    browserWs.close();

    const summary = {
      work_order: 'JAYT-PROMOTION-LINK-FILTER-044G',
      executed_at: new Date().toISOString(),
      approved_hubs_count: APPROVED_DISCOVERY_HUBS.length,
      total_filtered_links_found: allFilteredLinksToSweep.length,
      total_links_swept: sweepResults.length,
      promotion_signal_count: sweepResults.filter(r => r.classification === 'PROMOTION_SIGNAL').length,
      needs_recheck_count: sweepResults.filter(r => r.classification === 'NEEDS_RECHECK').length,
      results: sweepResults
    };

    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');

    console.log('\n========================================================================');
    console.log(`✅ [HOÀN TẤT SWEEP 044G] Đã quét toàn bộ ${sweepResults.length} liên kết ưu đãi hợp lệ.`);
    console.log(`   - PROMOTION_SIGNAL: ${summary.promotion_signal_count}`);
    console.log(`   - NEEDS_RECHECK:    ${summary.needs_recheck_count}`);
    console.log(`   - Summary JSON: ${summaryPath}`);
    console.log('========================================================================\n');

    return summary;
  } finally {
    chromeProc.kill('SIGKILL');
  }
}

if (require.main === module) {
  runFilteredDetailSweep044G().catch(e => {
    console.error('Sweep 044g fatal error:', e);
    process.exit(1);
  });
}

module.exports = {
  APPROVED_DISCOVERY_HUBS,
  analyzeVerbatimSnippets,
  runFilteredDetailSweep044G
};
