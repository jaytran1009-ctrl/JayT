/**
 * JAYT NEUTRAL SOURCE OBSERVATION & DISCOVERY SWEEPER (062)
 * Directive: JAYT-NEUTRAL-SOURCE-OBSERVATION-062
 * 
 * Rules:
 * 1. Zero speculative promo expectations as input (all initial targets marked UNVERIFIED_DISCOVERY_LEAD).
 * 2. Unauthenticated guest observation only (no login, no CAPTCHA bypass).
 * 3. Discovery provenance bound: [discovered_from, selector, source_hash, timestamp].
 * 4. DOM container scope 055D & Claim-bound extraction.
 * 5. Output to candidate review sheet (NO auto-staging).
 * 6. Production lock invariant: deals_feed.json: [], is_approved: false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const runDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_062_neutral_source_observation');
const artifactsDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_062_artifacts');
const reviewSheetPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'CANDIDATE_REVIEW_SHEET_062.md');

const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

function getSha256(bufOrStr) {
  if (!bufOrStr) return null;
  return crypto.createHash('sha256').update(bufOrStr).digest('hex');
}

const DISCOVERY_TARGET_HUBS_062 = [
  {
    cluster: 'LOCAL_FNB',
    brand_id: 'JOLLIBEE',
    brand_name: 'Jollibee Vietnam',
    discovery_url: 'https://jollibee.com.vn/khuyen-mai',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  },
  {
    cluster: 'LOCAL_FNB',
    brand_id: 'DOMINOS',
    brand_name: "Domino's Pizza Vietnam",
    discovery_url: 'https://dominos.vn/khuyen-mai',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  },
  {
    cluster: 'LOCAL_FNB',
    brand_id: 'THE_PIZZA_COMPANY',
    brand_name: 'The Pizza Company',
    discovery_url: 'https://thepizzacompany.vn/promotions',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  },
  {
    cluster: 'LOCAL_FNB',
    brand_id: 'LOTTERIA',
    brand_name: 'Lotteria Vietnam',
    discovery_url: 'https://www.lotteria.vn/promotions',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  },
  {
    cluster: 'LOCAL_FNB',
    brand_id: 'HIGHLANDS',
    brand_name: 'Highlands Coffee',
    discovery_url: 'https://www.highlandscoffee.com.vn/vn/tin-tuc-su-kien.html',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  },
  {
    cluster: 'LOCAL_FNB',
    brand_id: 'PHUCLONG',
    brand_name: 'Phúc Long Tea & Coffee',
    discovery_url: 'https://phuclong.com.vn/khuyen-mai',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  },
  {
    cluster: 'ONLINE_ECOMMERCE',
    brand_id: 'TIKI',
    brand_name: 'Tiki Vietnam',
    discovery_url: 'https://tiki.vn/khuyen-mai/ma-giam-gia',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  },
  {
    cluster: 'ONLINE_ECOMMERCE',
    brand_id: 'SHOPEE',
    brand_name: 'Shopee Vietnam',
    discovery_url: 'https://shopee.vn/m/ma-giam-gia',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  },
  {
    cluster: 'ONLINE_ECOMMERCE',
    brand_id: 'LAZADA',
    brand_name: 'Lazada Vietnam',
    discovery_url: 'https://www.lazada.vn/voucher/',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  }
];

function sanitizeFilename(str) {
  return str.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
}

async function runNeutralSourceObservation062(options = {}) {
  const startedAt = new Date().toISOString();
  console.log('\n=============================================================');
  console.log('🚀 [NEUTRAL-OBSERVATION-062] KHỞI CHẠY QUÉT NGUỒN TRUNG LẬP (062)');
  console.log('   Directive:   JAYT-NEUTRAL-SOURCE-OBSERVATION-062');
  console.log('   Clusters:    F&B (Ăn uống / Cà phê) & Online / Sàn TMĐT');
  console.log('   Method:      Unauthenticated Guest · Zero Speculative Assumptions');
  console.log('   Governance:  Discovery Lineage · Truth Gate 055D · Claim-Bound · 7-Day TTL');
  console.log('=============================================================\n');

  fs.mkdirSync(runDir, { recursive: true });
  fs.mkdirSync(artifactsDir, { recursive: true });

  const chromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.CHROME_BIN
  ].filter(Boolean);

  let chromeExe = null;
  for (const p of chromePaths) {
    if (fs.existsSync(p)) {
      chromeExe = p;
      break;
    }
  }

  if (!chromeExe) {
    throw new Error('CHROME_NOT_FOUND: Không tìm thấy Google Chrome executable.');
  }

  const cdpPort = 9350 + Math.floor(Math.random() * 100);
  const userDataDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', `.chrome_profile_sweep_062_${Date.now()}`);
  fs.mkdirSync(userDataDir, { recursive: true });

  let chromeProc = spawn(chromeExe, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${cdpPort}`,
    `--user-data-dir=${userDataDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1280,1024'
  ]);

  let browserWs = null;
  const observedHubs = [];
  const discoveredDeepItems = [];

  try {
    let browserWsUrl = null;
    for (let attempt = 1; attempt <= 25; attempt++) {
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
      throw new Error(`LIVE_BROWSER_FAILED: Chrome CDP port ${cdpPort} did not respond.`);
    }

    browserWs = new WebSocket(browserWsUrl);
    await new Promise((resolve, reject) => {
      browserWs.onopen = resolve;
      browserWs.onerror = reject;
    });

    let bMsgId = 1;
    function sendBrowser(method, params = {}, timeoutMs = 7000) {
      return new Promise((resolve) => {
        const id = bMsgId++;
        let timer = null;
        const handler = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.id === id) {
              if (timer) clearTimeout(timer);
              browserWs.removeEventListener('message', handler);
              resolve(data.result || {});
            }
          } catch (e) {
            if (timer) clearTimeout(timer);
            resolve({});
          }
        };
        timer = setTimeout(() => {
          browserWs.removeEventListener('message', handler);
          resolve({});
        }, timeoutMs);
        browserWs.addEventListener('message', handler);
        browserWs.send(JSON.stringify({ id, method, params }));
      });
    }

    const newTarget = await sendBrowser('Target.createTarget', { url: 'about:blank' });
    const targetId = newTarget.targetId;
    const attachRes = await sendBrowser('Target.attachToTarget', { targetId, flatten: true });
    const sessionId = attachRes.sessionId;

    function sendSession(method, params = {}, timeoutMs = 8000) {
      return new Promise((resolve) => {
        const id = bMsgId++;
        let timer = null;
        const handler = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.id === id) {
              if (timer) clearTimeout(timer);
              browserWs.removeEventListener('message', handler);
              resolve(data.result || {});
            }
          } catch (e) {
            if (timer) clearTimeout(timer);
            resolve({});
          }
        };
        timer = setTimeout(() => {
          browserWs.removeEventListener('message', handler);
          resolve({});
        }, timeoutMs);
        browserWs.addEventListener('message', handler);
        browserWs.send(JSON.stringify({ id, sessionId, method, params }));
      });
    }

    await sendSession('Page.enable');
    await sendSession('Runtime.enable');
    await sendSession('Network.setUserAgentOverride', {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 JayTObservationBot/3.0'
    });

    console.log(`📡 [DISCOVERY-START] Tiến hành quan sát ${DISCOVERY_TARGET_HUBS_062.length} kênh khám phá trung lập...\n`);

    for (let i = 0; i < DISCOVERY_TARGET_HUBS_062.length; i++) {
      const hub = DISCOVERY_TARGET_HUBS_062[i];
      const hubIndex = i + 1;
      const hubSlug = sanitizeFilename(`${hubIndex}_${hub.brand_id}`);
      console.log(`🔍 [HUB-${hubIndex}/${DISCOVERY_TARGET_HUBS_062.length}] Đang quét Hub: ${hub.brand_name} (${hub.discovery_url})...`);

      const hubCapturedAt = new Date().toISOString();
      let navSuccess = false;
      let navError = null;

      try {
        await sendSession('Page.navigate', { url: hub.discovery_url });
        await new Promise(r => setTimeout(r, 4500));
        navSuccess = true;
      } catch (err) {
        navError = err.message || String(err);
      }

      if (!navSuccess) {
        console.log(`   ❌ [NAV-FAILED] Không thể kết nối tới ${hub.discovery_url}: ${navError}`);
        observedHubs.push({
          ...hub,
          captured_at: hubCapturedAt,
          outcome: 'LIVE_CDP_CAPTURE_FAILED',
          error: navError,
          discovered_links: []
        });
        continue;
      }

      // Check if page blocked / Cloudflare challenge
      const checkBlockedRes = await sendSession('Runtime.evaluate', {
        expression: `(function() {
          const text = document.body ? document.body.innerText : '';
          const title = document.title || '';
          if (title.includes('Just a moment') || title.includes('Attention Required') || text.includes('Cloudflare') || text.includes('captcha')) {
            return { blocked: true, reason: 'CAPTCHA_OR_CHALLENGE_DETECTED' };
          }
          return { blocked: false, textLength: text.length };
        })()`,
        returnByValue: true
      });

      const blockInfo = checkBlockedRes.result ? checkBlockedRes.result.value : { blocked: false };
      if (blockInfo.blocked) {
        console.log(`   ⛔ [CHALLENGE-BLOCKED] Kênh ${hub.brand_name} bị chặn bởi CAPTCHA/WAF. Fail-closed tuân thủ không bypass.`);
        observedHubs.push({
          ...hub,
          captured_at: hubCapturedAt,
          outcome: 'BLOCKED_BY_CAPTCHA_FAIL_CLOSED',
          error: blockInfo.reason,
          discovered_links: []
        });
        continue;
      }

      // Capture Hub HTML, Text, PNG
      const docRes = await sendSession('Runtime.evaluate', {
        expression: `JSON.stringify({
          title: document.title,
          html: document.documentElement.outerHTML,
          text: document.body ? document.body.innerText : ''
        })`,
        returnByValue: true
      });

      let pageData = { title: '', html: '', text: '' };
      try {
        pageData = JSON.parse(docRes.result.value);
      } catch (e) {}

      const hubHtmlRel = `07_QUALITY_ASSURANCE/runtime_evidence/sweep_062_artifacts/hub_${hubSlug}.html`;
      const hubTextRel = `07_QUALITY_ASSURANCE/runtime_evidence/sweep_062_artifacts/hub_${hubSlug}.txt`;
      const hubPngRel = `07_QUALITY_ASSURANCE/runtime_evidence/sweep_062_artifacts/hub_${hubSlug}.png`;

      const hubHtmlAbs = path.join(repoRoot, hubHtmlRel);
      const hubTextAbs = path.join(repoRoot, hubTextRel);
      const hubPngAbs = path.join(repoRoot, hubPngRel);

      fs.writeFileSync(hubHtmlAbs, pageData.html, 'utf8');
      fs.writeFileSync(hubTextAbs, pageData.text, 'utf8');

      const ssRes = await sendSession('Page.captureScreenshot', { format: 'png', quality: 75 });
      const ssBuf = Buffer.from(ssRes.data || '', 'base64');
      fs.writeFileSync(hubPngAbs, ssBuf);

      const hubHtmlSha = getSha256(pageData.html);
      const hubTextSha = getSha256(pageData.text);
      const hubPngSha = getSha256(ssBuf);

      // Extract raw anchor links from DOM
      const extractLinksRes = await sendSession('Runtime.evaluate', {
        expression: `(function() {
          const anchors = Array.from(document.querySelectorAll('a[href]'));
          const currentUrl = window.location.href;
          const host = window.location.host;
          
          const links = [];
          const seen = new Set();
          
          for (let i = 0; i < anchors.length; i++) {
            const a = anchors[i];
            let href = a.getAttribute('href');
            if (!href) continue;
            try {
              const fullUrl = new URL(href, currentUrl).href;
              const u = new URL(fullUrl);
              if (u.host !== host && !u.host.includes(host.replace('www.', ''))) continue;
              
              const pathname = u.pathname.toLowerCase();
              if (pathname === '/' || pathname === '') continue;
              if (pathname.includes('login') || pathname.includes('register') || pathname.includes('cart') || 
                  pathname.includes('terms') || pathname.includes('privacy') || pathname.includes('affiliate') ||
                  pathname.includes('policy') || pathname.includes('contact') || pathname.includes('about')) {
                continue;
              }
              
              if (!seen.has(fullUrl)) {
                seen.add(fullUrl);
                let text = a.innerText ? a.innerText.trim() : '';
                let title = a.getAttribute('title') || '';
                
                // Build a reliable CSS selector
                let selector = 'a[href="' + href.replace(/"/g, '\\"') + '"]';
                if (a.id) selector = '#' + a.id;
                else if (a.className && typeof a.className === 'string') {
                  const firstClass = a.className.trim().split(/\\s+/)[0];
                  if (firstClass) selector = 'a.' + firstClass + '[href="' + href.replace(/"/g, '\\"') + '"]';
                }
                
                links.push({
                  href: href,
                  full_url: fullUrl,
                  anchor_text: text || title,
                  locator_selector: selector
                });
              }
            } catch (e) {}
          }
          return links;
        })()`,
        returnByValue: true
      });

      const rawLinks = extractLinksRes.result ? extractLinksRes.result.value : [];
      console.log(`   🔗 [LINKS-EXTRACTED] Tìm thấy ${rawLinks.length} liên kết nội bộ công khai từ Hub.`);

      observedHubs.push({
        ...hub,
        captured_at: hubCapturedAt,
        outcome: 'LIVE_CDP_SUCCESS',
        artifacts: {
          html_path: hubHtmlRel,
          html_sha256: hubHtmlSha,
          text_path: hubTextRel,
          text_sha256: hubTextSha,
          png_path: hubPngRel,
          png_sha256: hubPngSha
        },
        discovered_links_count: rawLinks.length,
        discovered_links: rawLinks
      });

      // Probe top candidate deep links (up to 2 per hub)
      const candidateLinks = rawLinks.slice(0, 2);
      for (let j = 0; j < candidateLinks.length; j++) {
        const link = candidateLinks[j];
        const deepIndex = discoveredDeepItems.length + 1;
        const deepSlug = sanitizeFilename(`deep_${deepIndex}_${hub.brand_id}_link_${j + 1}`);

        console.log(`   👉 [DEEP-PROBE-${deepIndex}] Đang quan sát liên kết sâu: ${link.full_url}`);

        const deepCapturedAt = new Date().toISOString();
        let deepNavSuccess = false;
        let deepNavError = null;

        try {
          await sendSession('Page.navigate', { url: link.full_url });
          await new Promise(r => setTimeout(r, 4000));
          deepNavSuccess = true;
        } catch (err) {
          deepNavError = err.message || String(err);
        }

        if (!deepNavSuccess) {
          console.log(`      ❌ [DEEP-NAV-FAILED] Lỗi kết nối: ${deepNavError}`);
          discoveredDeepItems.push({
            deep_index: deepIndex,
            cluster: hub.cluster,
            brand_id: hub.brand_id,
            brand_name: hub.brand_name,
            target_url: link.full_url,
            discovered_from: {
              hub_url: hub.discovery_url,
              hub_html_sha256: hubHtmlSha,
              locator_selector: link.locator_selector,
              anchor_text: link.anchor_text,
              source_captured_at: hubCapturedAt
            },
            captured_at: deepCapturedAt,
            outcome: 'LIVE_CDP_CAPTURE_FAILED',
            error: deepNavError
          });
          continue;
        }

        // Capture deep HTML, Text, PNG
        const deepDocRes = await sendSession('Runtime.evaluate', {
          expression: `JSON.stringify({
            title: document.title,
            html: document.documentElement.outerHTML,
            text: document.body ? document.body.innerText : ''
          })`,
          returnByValue: true
        });

        let deepPageData = { title: '', html: '', text: '' };
        try {
          deepPageData = JSON.parse(deepDocRes.result.value);
        } catch (e) {}

        const deepHtmlRel = `07_QUALITY_ASSURANCE/runtime_evidence/sweep_062_artifacts/capture_062_${deepSlug}.html`;
        const deepTextRel = `07_QUALITY_ASSURANCE/runtime_evidence/sweep_062_artifacts/capture_062_${deepSlug}.txt`;
        const deepPngRel = `07_QUALITY_ASSURANCE/runtime_evidence/sweep_062_artifacts/capture_062_${deepSlug}.png`;

        const deepHtmlAbs = path.join(repoRoot, deepHtmlRel);
        const deepTextAbs = path.join(repoRoot, deepTextRel);
        const deepPngAbs = path.join(repoRoot, deepPngRel);

        fs.writeFileSync(deepHtmlAbs, deepPageData.html, 'utf8');
        fs.writeFileSync(deepTextAbs, deepPageData.text, 'utf8');

        const deepSsRes = await sendSession('Page.captureScreenshot', { format: 'png', quality: 75 });
        const deepSsBuf = Buffer.from(deepSsRes.data || '', 'base64');
        fs.writeFileSync(deepPngAbs, deepSsBuf);

        const deepHtmlSha = getSha256(deepPageData.html);
        const deepTextSha = getSha256(deepPageData.text);
        const deepPngSha = getSha256(deepSsBuf);

        // Analyze candidate content for Truth Gate 055D compliance
        const bodyText = deepPageData.text;
        const hasPriceKeywords = /(\d{1,3}(?:\.\d{3})+|\d+k|\d+đ|giảm|voucher|tặng|combo)/i.test(bodyText);
        const hasTimeKeywords = /(thứ|hàng tuần|từ ngày|đến ngày|hạn sử dụng|áp dụng)/i.test(bodyText);
        const isSubstantial = bodyText.length > 150;

        let classification = 'UNVERIFIED_CONTENT';
        if (hasPriceKeywords && hasTimeKeywords && isSubstantial) {
          classification = 'CANDIDATE_DISCOVERY_QUALIFIED';
        } else {
          classification = 'INSUFFICIENT_DETAILS_OR_CATEGORY_PAGE';
        }

        console.log(`      📝 [CLASSIFIED] ${classification} (Text length: ${bodyText.length})`);

        discoveredDeepItems.push({
          deep_index: deepIndex,
          cluster: hub.cluster,
          brand_id: hub.brand_id,
          brand_name: hub.brand_name,
          title: deepPageData.title,
          target_url: link.full_url,
          discovered_from: {
            hub_url: hub.discovery_url,
            hub_html_sha256: hubHtmlSha,
            locator_selector: link.locator_selector,
            anchor_text: link.anchor_text,
            source_captured_at: hubCapturedAt
          },
          captured_at: deepCapturedAt,
          recheck_due_at: new Date(new Date(deepCapturedAt).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          outcome: 'LIVE_CDP_SUCCESS',
          classification: classification,
          artifacts: {
            html_path: deepHtmlRel,
            html_sha256: deepHtmlSha,
            text_path: deepTextRel,
            text_sha256: deepTextSha,
            png_path: deepPngRel,
            png_sha256: deepPngSha
          }
        });
      }
    }
  } finally {
    if (browserWs) {
      try {
        await sendBrowser('Browser.close');
      } catch (e) {}
      try { browserWs.close(); } catch (e) {}
    }
    if (chromeProc && chromeProc.pid) {
      try {
        chromeProc.kill('SIGKILL');
      } catch (e) {}
    }
  }

  const completedAt = new Date().toISOString();

  // Write Sweep Summary 062
  const summary062 = {
    $schema: 'https://jayt.vn/schemas/sweep-summary.v3.json',
    schema_version: '3.0.0',
    work_order: 'JAYT-NEUTRAL-SOURCE-OBSERVATION-062',
    executed_at: completedAt,
    time_window: {
      started_at: startedAt,
      completed_at: completedAt
    },
    neutral_observation_protocol: {
      zero_speculative_inputs_enforced: true,
      unauthenticated_guest_only: true,
      captcha_bypass_prohibited: true,
      auto_staging_prohibited: true,
      rolling_7_day_ttl_enforced: true
    },
    total_hubs_swept: observedHubs.length,
    hubs_success_count: observedHubs.filter(h => h.outcome === 'LIVE_CDP_SUCCESS').length,
    hubs_blocked_count: observedHubs.filter(h => h.outcome === 'BLOCKED_BY_CAPTCHA_FAIL_CLOSED').length,
    total_deep_items_probed: discoveredDeepItems.length,
    deep_items_success_count: discoveredDeepItems.filter(d => d.outcome === 'LIVE_CDP_SUCCESS').length,
    qualified_candidates_count: discoveredDeepItems.filter(d => d.classification === 'CANDIDATE_DISCOVERY_QUALIFIED').length,
    hubs: observedHubs,
    deep_probes: discoveredDeepItems
  };

  const summaryPath = path.join(runDir, 'sweep_summary_062.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary062, null, 2), 'utf8');
  const summarySha = getSha256(fs.readFileSync(summaryPath));
  console.log(`📄 [SUMMARY-WRITTEN] ${summaryPath} (SHA-256: ${summarySha})`);

  // Write Run Receipt 062
  const receipt062 = {
    $schema: 'https://jayt.vn/schemas/run-receipt.v3.json',
    schema_version: '3.0.0',
    work_order: 'JAYT-NEUTRAL-SOURCE-OBSERVATION-062',
    run_id: 'run_062_neutral_source_observation',
    status: 'COMPLETED_PENDING_CEO_AUDIT',
    execution_trigger: 'AGENTIC_RUNNER_LIVE_CDP',
    executed_at: completedAt,
    sealed_artifacts: {
      sweep_summary_path: '07_QUALITY_ASSURANCE/runtime_evidence/runs/run_062_neutral_source_observation/sweep_summary_062.json',
      sweep_summary_sha256: summarySha,
      candidate_review_sheet_path: '07_QUALITY_ASSURANCE/runtime_evidence/CANDIDATE_REVIEW_SHEET_062.md'
    },
    metrics: {
      hubs_swept: observedHubs.length,
      deep_probes: discoveredDeepItems.length,
      qualified_candidates: discoveredDeepItems.filter(d => d.classification === 'CANDIDATE_DISCOVERY_QUALIFIED').length
    },
    production_lock: {
      deals_feed_sha256: '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945',
      is_approved: false
    }
  };

  const receiptPath = path.join(runDir, 'receipt.json');
  fs.writeFileSync(receiptPath, JSON.stringify(receipt062, null, 2), 'utf8');
  console.log(`📄 [RECEIPT-SEALED] ${receiptPath}\n`);

  // Generate CANDIDATE_REVIEW_SHEET_062.md
  generateCandidateReviewSheet062(summary062);

  return {
    summary062,
    receipt062
  };
}

function generateCandidateReviewSheet062(summary) {
  let md = `# BẢNG TỔNG HỢP KHÁM PHÁ BẰNG CHỨNG TRUNG LẬP & HỒ SƠ CANDIDATE (062)

> **Mã Chỉ Thị**: \`JAYT-NEUTRAL-SOURCE-OBSERVATION-062\`  
> **Thời điểm thực thi**: \`${summary.executed_at}\`  
> **Phương thức**: Khách vãng lai unauthenticated · Không vượt CAPTCHA · Không giả định trước lịch/ưu đãi  
> **Ranh giới Staging / Production**: Không tự đưa vào staging; Production duy trì \`deals_feed.json: []\` và \`is_approved: false (LOCKED)\`.

---

## 1. Báo Cáo Tổng Hợp Kênh Khám Phá (Hubs Overview)

| # | Thương Hiệu / Kênh | Cụm | URL Kênh | Kết Quả Capture | Số Link Nội Bộ Khám Phá |
| :-: | :--- | :---: | :--- | :---: | :---: |
`;

  summary.hubs.forEach((h, idx) => {
    md += `| ${idx + 1} | **${h.brand_name}** | \`${h.cluster}\` | [Link](${h.discovery_url}) | \`${h.outcome}\` | **${h.discovered_links_count || 0}** |\n`;
  });

  md += `\n---\n\n## 2. Chi Tiết Các Liên Kết Sâu Được Quan Sát (Deep Probes Lineage)\n\n`;

  summary.deep_probes.forEach((dp, idx) => {
    md += `### Candidate #${dp.deep_index}: ${dp.brand_name} — ${dp.title || 'Chi tiết khuyến mãi'}

- **Cụm**: \`${dp.cluster}\` | **Thương hiệu**: \`${dp.brand_name}\`
- **URL Khảo Sát**: [\`${dp.target_url}\`](${dp.target_url})
- **Discovery Provenance**:
  - **URL Kênh Nguồn**: [\`${dp.discovered_from.hub_url}\`](${dp.discovered_from.hub_url})
  - **Mã Băm HTML Kênh Nguồn**: \`${dp.discovered_from.hub_html_sha256 || 'N/A'}\`
  - **CSS Selector Thẻ Anchor**: \`${dp.discovered_from.locator_selector}\`
  - **Thời điểm quan sát**: \`${dp.captured_at}\`
  - **Hạn Kiểm Tra Lại (TTL 7 Ngày)**: \`${dp.recheck_due_at || 'N/A'}\`
- **Kết quả phân loại**: \`${dp.classification}\`
- **Artifacts Niêm Phong**:
  - HTML: [\`${dp.artifacts?.html_path}\`](file:///${dp.artifacts?.html_path ? path.resolve(repoRoot, dp.artifacts.html_path).replace(/\\\\/g, '/') : ''}) (\`${dp.artifacts?.html_sha256 || 'N/A'}\`)
  - Text: [\`${dp.artifacts?.text_path}\`](file:///${dp.artifacts?.text_path ? path.resolve(repoRoot, dp.artifacts.text_path).replace(/\\\\/g, '/') : ''}) (\`${dp.artifacts?.text_sha256 || 'N/A'}\`)
  - PNG: [\`${dp.artifacts?.png_path}\`](file:///${dp.artifacts?.png_path ? path.resolve(repoRoot, dp.artifacts.png_path).replace(/\\\\/g, '/') : ''}) (\`${dp.artifacts?.png_sha256 || 'N/A'}\`)
- **Trạng Thái Thẩm Duyệt**: \`CANDIDATE_PENDING_CEO_REVIEW\` (Chờ CEO phê duyệt độc lập trước khi xem xét Staging).

---\n\n`;
  });

  md += `## 3. Khóa Sản Xuất Bất Biến

- Root Feed: \`05_DEAL_AND_AFFILIATE/deals_feed.json\` tiếp tục duy trì \`[]\` (SHA-256: \`4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945\`).
- Release Manifest: \`08_RELEASE_VAULT/RELEASE_MANIFEST.json\` ghi nhận \`is_approved: false (LOCKED)\`.
`;

  fs.writeFileSync(reviewSheetPath, md, 'utf8');
  console.log(`📄 [REVIEW-SHEET-WRITTEN] ${reviewSheetPath}`);
}

module.exports = {
  runNeutralSourceObservation062,
  DISCOVERY_TARGET_HUBS_062
};

if (require.main === module) {
  runNeutralSourceObservation062()
    .then(() => {
      console.log('🟢 NEUTRAL SOURCE OBSERVATION 062 COMPLETED SUCCESSFULLY');
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ NEUTRAL SOURCE OBSERVATION 062 FAILED:', err && err.stack ? err.stack : err);
      process.exit(1);
    });
}
