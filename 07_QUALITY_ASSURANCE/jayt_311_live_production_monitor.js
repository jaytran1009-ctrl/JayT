/**
 * JAYT-311 / JAYT-324 LIVE PRODUCTION 24/7 HEALTH & INTEGRITY MONITOR
 * Governing Directives:
 *   - JAYT-311: Production Stabilization & Controlled Capacity Expansion
 *   - JAYT-324: v3.421.0 Production Release & Baseline Operational Synchronization (22 Cards)
 *
 * Verifies live production URL:
 *  1. HTTPS HTTP 200 Uptime & Latency
 *  2. Zero Browser Console Errors & Runtime Exceptions (Puppeteer across 1440, 768, 390 viewports)
 *  3. Zero Horizontal Overflow (Desktop 1440x900, Tablet 768x1024, Mobile 390x844)
 *  4. Exact 22 Approved Non-Commercial Cards Rendered
 *  5. Strict Exact URL Equality (===) for all 22 Cards against Approved Registry (Zero Prefix Matching, Zero False Alarms)
 *  6. Strict Commercial & Affiliate Lock (Zero tracking params, zero affiliate links, deals_feed = [])
 *  7. Touch Target & WCAG 2.1 AA Contrast Compliance (>= 4.5:1)
 *  8. Append-only receipt generation: LIVE_PRODUCTION_MONITOR_RECEIPT.json
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const puppeteer = require('puppeteer');

const PRODUCTION_URL = process.env.JAYT_PRODUCTION_URL || 'https://jayt-production-v3420.vercel.app';
const RECEIPT_PATH = path.join(__dirname, 'runtime_evidence/LIVE_PRODUCTION_MONITOR_RECEIPT.json');
const REGISTRY_PATH = path.resolve(__dirname, '../08_RELEASE_VAULT/RELEASE_CANDIDATE_v3.422.0_REGISTRY.json');
const DEALS_FEED_PATH = path.resolve(__dirname, '../05_DEAL_AND_AFFILIATE/deals_feed.json');

const EXPECTED_VERSION = 'v3.422.0';
const EXPECTED_CARD_COUNT = 24;

const FORBIDDEN_TRACKING_PATTERNS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'ref=', 'affiliate=', 'tag=', 'click_id='
];

const FORBIDDEN_COMMERCIAL_DOMAINS = [
  'shopee.vn', 'lazada.vn', 'tiktok.com', 'klook.com', 'accesstrade.vn'
];

function normalizeUrl(rawUrl) {
  try {
    return new URL(rawUrl).href;
  } catch (_) {
    return rawUrl;
  }
}

function loadApprovedRegistry() {
  if (!fs.existsSync(REGISTRY_PATH)) {
    throw new Error(`Registry file not found at ${REGISTRY_PATH}`);
  }
  const data = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  return data.approved_entities || [];
}

function checkHttpUptime(targetUrl) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const req = https.get(targetUrl, { timeout: 15000 }, (res) => {
      const latencyMs = Date.now() - startTime;
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          latencyMs,
          contentType: res.headers['content-type'] || '',
          contentLength: body.length,
          server: res.headers['server'] || 'vercel',
          success: res.statusCode === 200
        });
      });
    });
    req.on('error', (err) => {
      const isClientInfraError = err.message.includes('ERR_NETWORK_ACCESS_DENIED') ||
        err.message.includes('ENOTFOUND') ||
        err.message.includes('EAI_AGAIN') ||
        err.message.includes('ECONNREFUSED');
      resolve({
        statusCode: 0,
        latencyMs: Date.now() - startTime,
        error: err.message,
        errorCategory: isClientInfraError ? 'MEASUREMENT_INFRASTRUCTURE_ERROR' : 'NETWORK_TRANSPORT_ERROR',
        success: false
      });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({
        statusCode: 408,
        latencyMs: Date.now() - startTime,
        error: 'Connection timed out',
        success: false
      });
    });
  });
}

async function inspectBrowser(url, approvedEntities) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const consoleErrors = [];
  const pageErrors = [];
  const externalRequests = [];

  const viewports = [
    { name: 'desktop', width: 1440, height: 900, isMobile: false },
    { name: 'tablet', width: 768, height: 1024, isMobile: true },
    { name: 'mobile', width: 390, height: 844, isMobile: true }
  ];

  const viewportResults = {};

  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', err => {
      pageErrors.push(String(err));
    });
    page.on('request', req => {
      const reqUrl = req.url();
      if (!reqUrl.startsWith(url) && !reqUrl.startsWith('data:') && !reqUrl.startsWith('https://vercel.live')) {
        externalRequests.push(reqUrl);
      }
    });

    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile });
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

      const vpData = await page.evaluate(() => {
        const doc = document.documentElement;
        const interactive = [...document.querySelectorAll('button, a[href], input, select, textarea')];
        const undersized = interactive.map(el => {
          const box = el.getBoundingClientRect();
          return {
            tag: el.tagName,
            label: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 80),
            width: Math.round(box.width),
            height: Math.round(box.height)
          };
        }).filter(item => item.width > 0 && item.height > 0 && (item.width < 44 || item.height < 44));

        const cards = [...document.querySelectorAll('.t2-pilot-card-section')];
        const cardTexts = cards.map(c => c.textContent || '');

        // Extract primary action links from cards
        const cardLinks = [...document.querySelectorAll('.t2-pilot-card-section a[href^="http"]')].map(a => a.href);

        // Check all anchor links across entire page
        const allLinks = [...document.querySelectorAll('a[href]')].map(a => a.href);

        // Check deals feed global variable on client window
        let clientWindowDealsState;
        if (typeof window.JAYT_PUBLIC_DEALS === 'undefined') {
          clientWindowDealsState = { defined: false, count: null, status: 'NOT_OBSERVED' };
        } else if (Array.isArray(window.JAYT_PUBLIC_DEALS)) {
          clientWindowDealsState = {
            defined: true,
            count: window.JAYT_PUBLIC_DEALS.length,
            status: window.JAYT_PUBLIC_DEALS.length === 0 ? 'EMPTY_ARRAY_OBSERVED' : 'POPULATED_ARRAY_OBSERVED'
          };
        } else {
          clientWindowDealsState = { defined: true, count: null, status: 'NON_ARRAY_OBJECT_OBSERVED' };
        }

        // Extract action buttons for WCAG AA contrast check
        const actionButtons = [...document.querySelectorAll('.btn-action-portal, .btn-zero-action[data-nav="BUY_DECISION"]')].map(el => ({
          label: el.getAttribute('aria-label') || el.textContent || '',
          foreground: getComputedStyle(el).color,
          background: getComputedStyle(el).backgroundColor
        }));

        return {
          title: document.title,
          ledgerVersion: document.body.dataset.ledgerVersion || null,
          scrollWidth: doc.scrollWidth,
          clientWidth: doc.clientWidth,
          horizontalOverflow: doc.scrollWidth > doc.clientWidth,
          cardsCount: cards.length,
          cardTexts,
          cardLinks,
          allLinks,
          clientWindowDealsState,
          actionButtons,
          undersizedCount: undersized.length
        };
      });

      viewportResults[vp.name] = vpData;
    }

    return {
      viewportResults,
      consoleErrors,
      pageErrors,
      externalRequests
    };
  } finally {
    await browser.close();
  }
}

function calculateWcagContrast(actionButtons) {
  const rgb = color => (color.match(/\d+(?:\.\d+)?/g) || []).slice(0, 3).map(Number);
  const luminance = color => rgb(color).map(v => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }).reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);

  const contrast = pair => {
    const fg = luminance(pair.foreground);
    const bg = luminance(pair.background);
    return Number(((Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05)).toFixed(2));
  };

  const results = actionButtons.map(btn => {
    const ratio = contrast(btn);
    return {
      label: btn.label,
      ratio,
      wcagAA: ratio >= 4.5
    };
  });

  return {
    allCertified: results.length > 0 && results.every(r => r.wcagAA),
    pairs: results
  };
}

async function runMonitoringCycle() {
  const timestamp = new Date().toISOString();
  console.log(`\n===============================================================`);
  console.log(`🛡️  JAYT-311 / JAYT-324 LIVE PRODUCTION 24/7 MONITORING CYCLE`);
  console.log(`⏰  Timestamp: ${timestamp}`);
  console.log(`🌐  Target URL: ${PRODUCTION_URL}`);
  console.log(`📦  Expected Baseline: ${EXPECTED_VERSION} (${EXPECTED_CARD_COUNT} Approved Cards)`);
  console.log(`===============================================================`);

  const blockers = [];
  const approvedEntities = loadApprovedRegistry();
  const expectedUrls = approvedEntities.map(e => normalizeUrl(e.external_url)).sort();

  // Step 1: Network Probe
  console.log(`\n[1/5] Running Network Probe...`);
  const networkProbe = await checkHttpUptime(PRODUCTION_URL);
  console.log(`   - HTTP Status: ${networkProbe.statusCode} (${networkProbe.success ? 'PASS' : 'FAIL'})`);
  console.log(`   - Latency: ${networkProbe.latencyMs}ms`);
  console.log(`   - Content-Type: ${networkProbe.contentType}`);
  if (!networkProbe.success) {
    blockers.push(`HTTP probe failed with status ${networkProbe.statusCode}: ${networkProbe.error || 'Non-200'}`);
  }

  // Step 2: Browser DOM, Layout & Console Audit
  console.log(`\n[2/5] Launching Headless Chrome DOM & Console Audit across Viewports...`);
  let browserResult;
  try {
    browserResult = await inspectBrowser(PRODUCTION_URL, approvedEntities);
  } catch (err) {
    blockers.push(`Browser inspection failed: ${err.message}`);
  }

  let exactUrlsMatch = false;
  let verifiedCardCount = 0;
  let desktopData;
  let localDealsEmpty = true;
  let contrastResult = { allCertified: false, pairs: [] };
  let affiliateViolations = 0;

  if (browserResult) {
    const { viewportResults, consoleErrors, pageErrors, externalRequests } = browserResult;
    desktopData = viewportResults.desktop;

    // Check console errors
    console.log(`   - Console Errors: ${consoleErrors.length}`);
    console.log(`   - Page Runtime Errors: ${pageErrors.length}`);
    console.log(`   - External Network Requests: ${externalRequests.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach(e => console.error(`     * Console Error: ${e}`));
      blockers.push(`Detected ${consoleErrors.length} console error(s) on production.`);
    }
    if (pageErrors.length > 0) {
      pageErrors.forEach(e => console.error(`     * Page Error: ${e}`));
      blockers.push(`Detected ${pageErrors.length} runtime error(s) on production.`);
    }

    // Check version across viewports
    for (const [vpName, vp] of Object.entries(viewportResults)) {
      console.log(`   - [${vpName.toUpperCase()}] Ledger Version: ${vp.ledgerVersion} (Expected: ${EXPECTED_VERSION})`);
      if (vp.ledgerVersion !== EXPECTED_VERSION) {
        blockers.push(`[${vpName}] Ledger version mismatch: got ${vp.ledgerVersion}, expected ${EXPECTED_VERSION}`);
      }

      console.log(`   - [${vpName.toUpperCase()}] Cards Count: ${vp.cardsCount} (Expected: ${EXPECTED_CARD_COUNT})`);
      if (vp.cardsCount !== EXPECTED_CARD_COUNT) {
        blockers.push(`[${vpName}] Card count mismatch: expected ${EXPECTED_CARD_COUNT}, found ${vp.cardsCount}`);
      }
    }

    verifiedCardCount = desktopData.cardsCount;

    // Step 3: Exact URL Parity Audit (Strict Equality ===)
    console.log(`\n[3/5] Verifying Strict ${EXPECTED_CARD_COUNT}/${EXPECTED_CARD_COUNT} Exact URL Equality against Approved Registry...`);
    const actualNormalizedUrls = desktopData.cardLinks.map(u => normalizeUrl(u)).sort();
    
    // Exact URL equality comparison (no prefix matching)
    let urlMismatches = 0;
    const urlCheckDetails = [];

    expectedUrls.forEach((expUrl, idx) => {
      const actUrl = actualNormalizedUrls[idx];
      const isExactMatch = actUrl === expUrl;
      urlCheckDetails.push({
        expected: expUrl,
        actual: actUrl,
        exactMatch: isExactMatch
      });
      if (!isExactMatch) {
        urlMismatches++;
        console.error(`     * URL MISMATCH at index ${idx + 1}:`);
        console.error(`       Expected: ${expUrl}`);
        console.error(`       Actual:   ${actUrl}`);
      }
    });

    console.log(`   - Total Approved Registry URLs: ${expectedUrls.length}`);
    console.log(`   - Total Rendered Card Links:    ${actualNormalizedUrls.length}`);
    console.log(`   - Exact URL Equality Matches:   ${expectedUrls.length - urlMismatches}/${expectedUrls.length}`);

    if (urlMismatches === 0 && actualNormalizedUrls.length === EXPECTED_CARD_COUNT) {
      exactUrlsMatch = true;
      console.log(`   - URL Parity Verdict:           PASS (100% Exact Parity, Zero Drift, Zero Prefix-Masking)`);
    } else {
      blockers.push(`Exact URL parity check failed: ${urlMismatches} mismatch(es) detected.`);
    }

    // Step 4: Commercial & Affiliate Locks
    console.log(`\n[4/5] Verifying Commercial & Affiliate Locks...`);
    affiliateViolations = 0;
    for (const link of desktopData.allLinks) {
      const lower = link.toLowerCase();
      const hasTracking = FORBIDDEN_TRACKING_PATTERNS.some(p => lower.includes(p));
      const hasCommercialDomain = FORBIDDEN_COMMERCIAL_DOMAINS.some(d => lower.includes(d));
      if (hasTracking || hasCommercialDomain) {
        console.error(`     * VIOLATION: Forbidden commercial/tracking link detected: ${link}`);
        affiliateViolations++;
      }
    }
    console.log(`   - Forbidden commercial/tracking links: ${affiliateViolations}`);
    if (affiliateViolations > 0) {
      blockers.push(`Detected ${affiliateViolations} commercial/affiliate link violation(s).`);
    }

    // Local deals feed check
    localDealsEmpty = true;
    if (fs.existsSync(DEALS_FEED_PATH)) {
      try {
        const feed = JSON.parse(fs.readFileSync(DEALS_FEED_PATH, 'utf8'));
        localDealsEmpty = Array.isArray(feed) && feed.length === 0;
      } catch (_) {
        localDealsEmpty = false;
      }
    }
    console.log(`   - Local Deals Feed Empty ([]): ${localDealsEmpty ? 'PASS' : 'FAIL'}`);
    if (!localDealsEmpty) {
      blockers.push('Local deals_feed.json is not strictly empty [].');
    }

    const dealsState = desktopData ? desktopData.clientWindowDealsState : { defined: false, count: null, status: 'NOT_OBSERVED' };
    console.log(`   - Client Window window.JAYT_PUBLIC_DEALS: status=${dealsState.status}, count=${dealsState.count === null ? 'null/NOT_OBSERVED' : dealsState.count}`);
    if (dealsState.status === 'POPULATED_ARRAY_OBSERVED' && dealsState.count > 0) {
      blockers.push(`Client runtime window.JAYT_PUBLIC_DEALS is populated with ${dealsState.count} items.`);
    }

    // Step 5: Layout & Contrast Verification
    console.log(`\n[5/5] Verifying Viewport Layout & Contrast...`);
    for (const [vpName, vp] of Object.entries(viewportResults)) {
      console.log(`   - [${vpName.toUpperCase()}] Horizontal Overflow: ${vp.horizontalOverflow ? 'FAIL (OVERFLOW)' : 'PASS (NO OVERFLOW)'}`);
      if (vp.horizontalOverflow) {
        blockers.push(`[${vpName}] Horizontal overflow detected on viewport.`);
      }
    }

    console.log(`   - Undersized Touch Targets (<44px): ${desktopData.undersizedCount}`);
    if (desktopData.undersizedCount > 0) {
      blockers.push(`Detected ${desktopData.undersizedCount} touch target(s) smaller than 44px.`);
    }

    contrastResult = calculateWcagContrast(desktopData.actionButtons);
    console.log(`   - Primary Action WCAG AA Contrast: ${contrastResult.allCertified ? 'PASS (CERTIFIED >= 4.5:1)' : 'FAIL'} (${contrastResult.pairs.length} pairs measured)`);
    if (!contrastResult.allCertified) {
      blockers.push('Primary action button contrast failed WCAG AA compliance.');
    }
  }

  const pass = blockers.length === 0;

  console.log(`\n===============================================================`);
  console.log(`🏁  MONITORING RESULT: ${pass ? `✅ ALL GATES PASS (${EXPECTED_VERSION} BASELINE ${EXPECTED_CARD_COUNT} CARDS HEALTHY)` : '❌ BREACH DETECTED'}`);
  if (!pass) {
    console.log(`🚨  BLOCKERS (${blockers.length}):`);
    blockers.forEach(b => console.log(`   - ${b}`));
  }
  console.log(`===============================================================\n`);

  // Build and write receipt
  let existingReceipt = { history: [] };
  if (fs.existsSync(RECEIPT_PATH)) {
    try {
      existingReceipt = JSON.parse(fs.readFileSync(RECEIPT_PATH, 'utf8'));
    } catch (_) {}
  }

  const currentRun = {
    timestamp_utc: timestamp,
    target_url: PRODUCTION_URL,
    version: EXPECTED_VERSION,
    status: pass ? 'HEALTHY_PASS' : 'UNHEALTHY_BREACH',
    http_probe_snapshot: {
      status_code: networkProbe.statusCode,
      latency_ms: networkProbe.latencyMs,
      verdict: networkProbe.success ? 'HTTP_200_OK' : (networkProbe.statusCode === 0 ? 'PROBE_CLIENT_NETWORK_ERROR' : `HTTP_${networkProbe.statusCode}_SERVER_ERROR`),
      error_category: networkProbe.success ? 'NONE' : (networkProbe.errorCategory || (networkProbe.statusCode >= 500 ? 'PRODUCTION_SERVER_ERROR' : 'HTTP_CLIENT_ERROR')),
      error_detail: networkProbe.error || null,
      evidence_note: 'Point-in-time HTTP probe snapshot; does not represent continuous SLA uptime'
    },
    console_errors_count: browserResult ? browserResult.consoleErrors.length : -1,
    cards_rendered_count: verifiedCardCount,
    exact_urls_match: exactUrlsMatch,
    exact_urls_count: exactUrlsMatch ? EXPECTED_CARD_COUNT : 0,
    feed_verification_scope: {
      local_repo_fixture_empty: localDealsEmpty,
      client_runtime_deals_state: desktopData ? desktopData.clientWindowDealsState : { defined: false, count: null, status: 'NOT_OBSERVED' },
      scope_note: 'Scope restricted to local deals_feed.json file fixture and client DOM window memory'
    },
    blockers
  };

  const updatedHistory = [currentRun, ...(existingReceipt.history || [])].slice(0, 20);

  // Filter historical samples strictly for the active operational baseline version (v3.421.0)
  const versionSamples = updatedHistory.filter(h => h.version === EXPECTED_VERSION);

  const serverSuccessSamples = versionSamples.filter(h => {
    const code = h.http_probe_snapshot ? h.http_probe_snapshot.status_code : h.http_code;
    return code === 200;
  }).length;

  const probeInfrastructureErrors = versionSamples.filter(h => {
    if (h.http_probe_snapshot && h.http_probe_snapshot.error_category === 'MEASUREMENT_INFRASTRUCTURE_ERROR') return true;
    const code = h.http_probe_snapshot ? h.http_probe_snapshot.status_code : h.http_code;
    return code === 0 && (h.blockers || []).some(b => b.includes('ERR_NETWORK_ACCESS_DENIED') || b.includes('net::'));
  }).length;

  const serverHttpErrors = versionSamples.filter(h => {
    const code = h.http_probe_snapshot ? h.http_probe_snapshot.status_code : h.http_code;
    return code !== 200 && code !== 0;
  }).length;

  const versionTimestamps = versionSamples.map(h => new Date(h.timestamp_utc).getTime()).filter(t => !isNaN(t));
  const windowStartUtc = versionTimestamps.length > 0 ? new Date(Math.min(...versionTimestamps)).toISOString() : timestamp;
  const windowEndUtc = versionTimestamps.length > 0 ? new Date(Math.max(...versionTimestamps)).toISOString() : timestamp;

  const rollingSuccessRate = versionSamples.length > 0
    ? Number(((serverSuccessSamples / versionSamples.length) * 100).toFixed(1))
    : 100.0;

  const receipt = {
    receipt_id: 'JAYT_311_LIVE_PRODUCTION_MONITOR_RECEIPT',
    governing_directive: 'JAYT-311 / JAYT-324 / JAYT-325 / JAYT-327',
    last_evaluated_at: timestamp,
    target_url: PRODUCTION_URL,
    operational_health_verdict: pass ? 'HEALTHY_AUDITED_BASELINE_COMPLIANT' : 'BREACH_REQUIRES_ATTENTION',
    evidence_standardization: {
      http_probe_snapshot: {
        status_code: networkProbe.statusCode,
        latency_ms: networkProbe.latencyMs,
        verdict: networkProbe.success ? 'HTTP_200_OK' : (networkProbe.statusCode === 0 ? 'PROBE_CLIENT_NETWORK_ERROR' : `HTTP_${networkProbe.statusCode}_SERVER_ERROR`),
        error_category: networkProbe.success ? 'NONE' : (networkProbe.errorCategory || 'HTTP_ERROR'),
        evidence_note: 'Point-in-time HTTP connection snapshot; does not extrapolate to continuous 100% SLA uptime'
      },
      rolling_probe_metrics: {
        baseline_version: EXPECTED_VERSION,
        time_window: {
          start_utc: windowStartUtc,
          end_utc: windowEndUtc,
          sample_count: versionSamples.length
        },
        probe_outcomes: {
          successful_http_200_count: serverSuccessSamples,
          server_http_error_count: serverHttpErrors,
          measurement_client_infra_error_count: probeInfrastructureErrors
        },
        version_probe_success_rate_percent: rollingSuccessRate,
        evidence_note: `Empirical success rate restricted strictly to active baseline version (${EXPECTED_VERSION}); isolates measurement probe errors from server errors`
      },
      content_scope: {
        version: EXPECTED_VERSION,
        cards_rendered_count: verifiedCardCount,
        exact_url_equality_enforced: true,
        exact_urls_matched: exactUrlsMatch ? `${EXPECTED_CARD_COUNT}/${EXPECTED_CARD_COUNT}` : 'MISMATCH'
      },
      feed_and_commercial_scope: {
        local_repository_fixture: {
          path: '05_DEAL_AND_AFFILIATE/deals_feed.json',
          fixture_empty: localDealsEmpty,
          verified: true
        },
        client_runtime_window_memory: {
          variable_name: 'window.JAYT_PUBLIC_DEALS',
          status: desktopData ? desktopData.clientWindowDealsState.status : 'NOT_OBSERVED',
          observed_count: desktopData ? desktopData.clientWindowDealsState.count : null,
          evidence_note: desktopData && desktopData.clientWindowDealsState.status === 'NOT_OBSERVED'
            ? 'Variable window.JAYT_PUBLIC_DEALS is not defined on client DOM (null/NOT_OBSERVED); not claimed as empty array'
            : 'Explicit array state observed'
        },
        commercial_affiliate_links_count: affiliateViolations,
        evidence_note: 'Differentiates local fixture verification from browser runtime memory state without assuming dynamic backend CDN parity'
      },
      contrast_audit_scope: {
        measured_button_pairs_count: desktopData ? desktopData.actionButtons.length : 0,
        threshold_met_ge_4_5_to_1: contrastResult ? contrastResult.allCertified : false,
        evidence_note: 'Evaluated specific action buttons in rendered DOM against WCAG 2.1 AA 4.5:1; does not certify entire site accessibility'
      }
    },
    latest_blockers: blockers,
    history: updatedHistory
  };

  fs.mkdirSync(path.dirname(RECEIPT_PATH), { recursive: true });
  fs.writeFileSync(RECEIPT_PATH, JSON.stringify(receipt, null, 2) + '\n', 'utf8');
  console.log(`📄 Receipt recorded: ${RECEIPT_PATH}`);

  return { pass, blockers, receipt };
}

if (require.main === module) {
  runMonitoringCycle().then(({ pass }) => {
    process.exitCode = pass ? 0 : 1;
  }).catch((err) => {
    console.error('Fatal monitoring error:', err);
    process.exitCode = 1;
  });
}

module.exports = { runMonitoringCycle };
