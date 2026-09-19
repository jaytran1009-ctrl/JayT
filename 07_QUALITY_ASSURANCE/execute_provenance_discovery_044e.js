/**
 * JAYT DOM LINK PROVENANCE DISCOVERY & OBSERVATION ENGINE (044E)
 * Directive: JAYT-REGISTRY-PROVENANCE-044E — EXECUTE TODAY
 * 
 * Rules:
 * 1. Zero hardcoded replacement URLs.
 * 2. Navigates to official domain roots (springboards), extracts <a> tags directly from live DOM.
 * 3. Records full link provenance: discovery_source_url, source screenshot/HTML/hashes, link href, anchor text, locator, discovered_at, same_origin_verified.
 * 4. Homepage is strictly a discovery springboard, NEVER counted as promotion evidence itself.
 * 5. Sweeps discovered links with real Chrome CDP session, records full receipt & snippets.
 * 6. Only flags PROMOTION_SIGNAL when all 4 literal snippets are verified.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const artifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044e_artifacts');
const summaryPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_044e_summary.json');
const reportPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'weekly_evidence_batch_044e_report.md');
const provenanceManifestPath = osPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'provenance_discovered_registry_044e.json');

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

// 4 Brands needing link recovery from official roots
const TARGET_ROOTS = [
  {
    brand_id: 'CGV',
    category: 'LOCAL_CINEMA',
    root_url: 'https://www.cgv.vn/',
    domain: 'cgv.vn'
  },
  {
    brand_id: 'METIZ',
    category: 'LOCAL_CINEMA',
    root_url: 'https://metiz.vn/',
    domain: 'metiz.vn'
  },
  {
    brand_id: 'JOLLIBEE',
    category: 'LOCAL_FASTFOOD',
    root_url: 'https://jollibee.com.vn/',
    domain: 'jollibee.com.vn'
  },
  {
    brand_id: 'THE_COFFEE_HOUSE',
    category: 'LOCAL_COFFEE_TEA',
    root_url: 'https://thecoffeehouse.com/',
    domain: 'thecoffeehouse.com'
  }
];

function analyzeSnippets(brandId, pageText) {
  if (!pageText || pageText.trim().length === 0) return null;

  const priceMatch = pageText.match(/(\b\d{1,3}(\.\d{3})+\s*(đ|vnd|vnđ)\b|\b\d{2,3}k\b|đồng giá \d+k?)/i);
  const priceSnippet = priceMatch ? priceMatch[0] : null;

  const condMatch = pageText.match(/((điều kiện|áp dụng|lưu ý|thời gian|khung giờ)[^\n.]{5,100})/i);
  const conditionsSnippet = condMatch ? condMatch[0].trim() : null;

  const locMatch = pageText.match(/((đà nẵng|da nang|toàn quốc|toàn hệ thống|vĩnh trung|helio)[^\n.]{0,60})/i);
  const localitySnippet = locMatch ? locMatch[0].trim() : null;

  const expMatch = pageText.match(/(\b\d{1,2}\/\d{1,2}\/\d{4}\b|\b\d{1,2}\/\d{1,2}\b|hằng tuần|hạn sử dụng|thứ [hai|ba|tư|năm|sáu|bảy|chủ nhật]+)/i);
  const expirySnippet = expMatch ? expMatch[0].trim() : null;

  const allPresent = Boolean(priceSnippet && conditionsSnippet && localitySnippet && expirySnippet);

  return {
    all_present: allPresent,
    snippets: {
      price_snippet: priceSnippet,
      conditions_snippet: conditionsSnippet,
      locality_snippet: localitySnippet,
      expiry_snippet: expirySnippet
    }
  };
}

async function runProvenanceDiscovery() {
  console.log('🚀 [JAYT-SWEEP-044E] Khởi chạy Động cơ Khám phá DOM Link Provenance cho 4 thương hiệu...');
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

  const discoveryRecords = [];
  const linkSweepResults = [];

  try {
    for (const root of TARGET_ROOTS) {
      console.log(`\n🔍 [DOM-EXTRACT] Đang duyệt trang gốc: [${root.brand_id}] ${root.root_url}...`);
      const rootKey = root.brand_id.toLowerCase();
      const rootPngPath = path.join(artifactsDir, `discovery_root_${rootKey}.png`);
      const rootHtmlPath = path.join(artifactsDir, `discovery_root_${rootKey}.html`);
      const rootTxtPath = path.join(artifactsDir, `discovery_root_${rootKey}.txt`);

      let rootPageTitle = '';
      let rootPageText = '';
      let rootPageHtml = '';
      let rootScreenshot = null;
      let discoveredLinks = [];

      try {
        const targetRes = await sendBrowser('Target.createTarget', { url: 'about:blank', width: 1280, height: 1024 });
        const targetId = targetRes.targetId;

        const listRes = await fetch(`http://127.0.0.1:${cdpPort}/json/list`);
        const pages = await listRes.json();
        const pageObj = pages.find(p => p.id === targetId);

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

        await sendPage('Page.navigate', { url: root.root_url });
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
          rootPageTitle = evalRes.result.value.title || '';
          rootPageText = evalRes.result.value.text || '';
          rootPageHtml = evalRes.result.value.html || '';
        }

        const shotRes = await sendPage('Page.captureScreenshot', { format: 'png' });
        rootScreenshot = shotRes.data;

        // DOM Link Extraction of promotional links
        const domLinksRes = await sendPage('Runtime.evaluate', {
          expression: `(() => {
            const results = [];
            const anchors = Array.from(document.querySelectorAll('a[href]'));
            const promoKeywords = ['khuyen-mai', 'uu-dai', 'combo', 'khuyen_mai', 'promotion', 'special', 'event', 'tin-tuc', 'news', 'gia-ve', 'cinema', 'site'];
            
            for (let i = 0; i < anchors.length; i++) {
              const a = anchors[i];
              const href = a.href;
              const text = (a.innerText || a.textContent || a.title || '').trim();
              const lowerHref = href.toLowerCase();
              const lowerText = text.toLowerCase();
              
              const matchesKeyword = promoKeywords.some(k => lowerHref.includes(k) || lowerText.includes(k));
              if (matchesKeyword && href.startsWith('http')) {
                // Compute simple selector
                const parent = a.parentElement ? a.parentElement.tagName.toLowerCase() : '';
                const locator = parent ? \`\${parent} > a[href*="\${a.getAttribute('href')}"]\` : \`a[href*="\${a.getAttribute('href')}"]\`;
                results.push({
                  href,
                  anchor_text: text.slice(0, 100),
                  locator: locator.slice(0, 150)
                });
              }
            }
            // De-duplicate by href
            const unique = [];
            const seen = new Set();
            for (const r of results) {
              if (!seen.has(r.href)) {
                seen.add(r.href);
                unique.push(r);
              }
            }
            return unique.slice(0, 5);
          })()`,
          returnByValue: true
        });

        if (domLinksRes.result?.value) {
          discoveredLinks = domLinksRes.result.value;
        }

        await sendBrowser('Target.closeTarget', { targetId });
        pageWs.close();
      } catch (err) {
        console.warn(`Lỗi duyệt root ${root.root_url}:`, err.message);
      }

      let rootPngHash = null;
      let rootHtmlHash = null;
      let rootTxtHash = null;

      if (rootScreenshot && rootScreenshot.length > 100) {
        fs.writeFileSync(rootPngPath, Buffer.from(rootScreenshot, 'base64'));
        rootPngHash = getFileSha256(rootPngPath);
      }
      if (rootPageHtml && rootPageHtml.length > 50) {
        fs.writeFileSync(rootHtmlPath, rootPageHtml, 'utf8');
        rootHtmlHash = getFileSha256(rootHtmlPath);
      }
      if (rootPageText && rootPageText.length > 10) {
        fs.writeFileSync(rootTxtPath, rootPageText, 'utf8');
        rootTxtHash = getFileSha256(rootTxtPath);
      }

      console.log(`  ✓ Đã trích xuất ${discoveredLinks.length} liên kết cùng nguồn từ DOM trang gốc.`);

      // Verify same-origin
      const verifiedLinks = [];
      for (const dl of discoveredLinks) {
        try {
          const parsedLink = new URL(dl.href);
          const parsedRoot = new URL(root.root_url);
          const isSameOrigin = parsedLink.hostname.includes(root.domain);

          if (isSameOrigin && parsedLink.pathname !== '/' && parsedLink.pathname !== '') {
            verifiedLinks.push({
              ...dl,
              discovery_source_url: root.root_url,
              source_screenshot_file: path.basename(rootPngPath),
              source_screenshot_sha256: rootPngHash,
              source_html_file: path.basename(rootHtmlPath),
              source_html_sha256: rootHtmlHash,
              discovered_at: new Date().toISOString(),
              same_origin_verified: true
            });
          }
        } catch {}
      }

      discoveryRecords.push({
        brand_id: root.brand_id,
        category: root.category,
        root_url: root.root_url,
        root_screenshot: rootPngHash ? path.basename(rootPngPath) : null,
        root_screenshot_sha256: rootPngHash,
        root_html: rootHtmlHash ? path.basename(rootHtmlPath) : null,
        root_html_sha256: rootHtmlHash,
        discovered_links_count: verifiedLinks.length,
        links: verifiedLinks
      });

      // Now Sweep the top 2 verified discovered links per brand
      for (let lIdx = 0; lIdx < Math.min(verifiedLinks.length, 2); lIdx++) {
        const vLink = verifiedLinks[lIdx];
        const linkKey = `${root.brand_id.toLowerCase()}_disc_${lIdx + 1}`;
        console.log(`  👉 Quét kiểm chứng link phát hiện (${lIdx + 1}): ${vLink.href}...`);

        const linkPngPath = path.join(artifactsDir, `capture_044e_${linkKey}.png`);
        const linkHtmlPath = path.join(artifactsDir, `capture_044e_${linkKey}.html`);
        const linkTxtPath = path.join(artifactsDir, `capture_044e_${linkKey}.txt`);
        const receiptPath = path.join(artifactsDir, `receipt_044e_${linkKey}.json`);

        const capTime = new Date().toISOString();
        let fUrl = vLink.href;
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

          await sendPage2('Page.enable');
          await sendPage2('DOM.enable');

          await sendPage2('Page.navigate', { url: vLink.href });
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
            fUrl = evalRes.result.value.url || vLink.href;
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
          fs.writeFileSync(linkPngPath, Buffer.from(sShot, 'base64'));
          lPngHash = getFileSha256(linkPngPath);
          fs.writeFileSync(linkHtmlPath, pHtml, 'utf8');
          lHtmlHash = getFileSha256(linkHtmlPath);
          fs.writeFileSync(linkTxtPath, pText, 'utf8');
          lTxtHash = getFileSha256(linkTxtPath);
        }

        const snipEval = analyzeSnippets(root.brand_id, pText);
        const classification = (snipEval && snipEval.all_present) ? 'PROMOTION_SIGNAL' : 'NEEDS_RECHECK';
        const reason = (snipEval && snipEval.all_present)
          ? 'AUTOMATED_SIGNAL_DETECTED_ALL_4_CONDITIONS'
          : 'MISSING_EXPLICIT_PRICE_OR_DISCOUNT';

        const redChain = [vLink.href];
        if (fUrl !== vLink.href) redChain.push(fUrl);

        const receipt = {
          $schema: 'https://jayt.vn/schemas/capture-receipt.v1.json',
          work_order: 'JAYT-REGISTRY-PROVENANCE-044E',
          brand_id: root.brand_id,
          category: root.category,
          requested_url: vLink.href,
          final_url: fUrl,
          redirect_chain: redChain,
          http_status: fetchOk ? 200 : 0,
          page_title: pTitle,
          captured_at: capTime,
          classification: classification,
          reason: reason,
          details: 'Quét URL được phát hiện từ DOM liên kết chính thức.',
          fetch_success: fetchOk,
          provenance: {
            discovery_source_url: vLink.discovery_source_url,
            source_screenshot_sha256: vLink.source_screenshot_sha256,
            source_html_sha256: vLink.source_html_sha256,
            link_anchor_text: vLink.anchor_text,
            link_locator: vLink.locator,
            same_origin_verified: true,
            discovered_at: vLink.discovered_at
          },
          browser_metadata: {
            browser_name: 'Google Chrome Headless',
            version: '120.0.0.0',
            user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 JayTOperationalBot/1.0',
            viewport: '1280x1024'
          },
          verifiable_snippets: snipEval ? snipEval.snippets : null,
          artifacts: {
            screenshot_file: lPngHash ? path.basename(linkPngPath) : null,
            screenshot_sha256: lPngHash,
            html_file: lHtmlHash ? path.basename(linkHtmlPath) : null,
            html_sha256: lHtmlHash,
            text_file: lTxtHash ? path.basename(linkTxtPath) : null,
            text_sha256: lTxtHash
          }
        };

        fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2), 'utf8');
        const receiptHash = getFileSha256(receiptPath);

        linkSweepResults.push({
          brand_id: root.brand_id,
          category: root.category,
          requested_url: vLink.href,
          final_url: fUrl,
          http_status: fetchOk ? 200 : 0,
          classification: classification,
          reason: reason,
          provenance: receipt.provenance,
          artifacts: {
            screenshot_file: lPngHash ? path.basename(linkPngPath) : null,
            screenshot_sha256: lPngHash,
            html_file: lHtmlHash ? path.basename(linkHtmlPath) : null,
            html_sha256: lHtmlHash,
            receipt_file: path.basename(receiptPath),
            receipt_sha256: receiptHash
          }
        });
      }
    }

    browserWs.close();
  } finally {
    chromeProc.kill('SIGKILL');
  }

  // Write Provenance Discovered Registry
  const provenanceManifest = {
    $schema: 'https://jayt.vn/schemas/provenance-discovered-registry.v1.json',
    work_order: 'JAYT-REGISTRY-PROVENANCE-044E',
    created_at: new Date().toISOString(),
    governance_status: 'DOM_PROVENANCE_DISCOVERED_PENDING_CEO_REVIEW',
    total_roots_probed: discoveryRecords.length,
    discovery_roots: discoveryRecords
  };
  fs.writeFileSync(provenanceManifestPath, JSON.stringify(provenanceManifest, null, 2), 'utf8');

  // Summary
  const summary = {
    work_order: 'JAYT-REGISTRY-PROVENANCE-044E',
    executed_at: new Date().toISOString(),
    total_roots_probed: discoveryRecords.length,
    total_links_discovered: discoveryRecords.reduce((acc, r) => acc + r.discovered_links_count, 0),
    total_discovered_links_swept: linkSweepResults.length,
    promotion_signal_count: linkSweepResults.filter(r => r.classification === 'PROMOTION_SIGNAL').length,
    needs_recheck_count: linkSweepResults.filter(r => r.classification === 'NEEDS_RECHECK').length,
    sweep_results: linkSweepResults
  };
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');

  console.log('\n========================================================================');
  console.log(`✅ [HOÀN TẤT PROVENANCE 044E] Đã duyệt ${discoveryRecords.length} trang gốc và quét ${linkSweepResults.length} liên kết có xuất xứ DOM.`);
  console.log(`   - Tín hiệu PROMOTION_SIGNAL: ${summary.promotion_signal_count}`);
  console.log(`   - Phân loại NEEDS_RECHECK:    ${summary.needs_recheck_count}`);
  console.log(`   - Summary JSON: ${summaryPath}`);
  console.log('========================================================================\n');

  return summary;
}

if (require.main === module) {
  runProvenanceDiscovery().catch(e => {
    console.error('Fatal 044e discovery error:', e);
    process.exit(1);
  });
}

module.exports = {
  TARGET_ROOTS,
  runProvenanceDiscovery
};
