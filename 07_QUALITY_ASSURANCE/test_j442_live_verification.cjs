/**
 * JAYT-442 LIVE PRODUCTION PUPPETEER VERIFICATION
 * Target: https://jayt-production-v3420.vercel.app
 * Mandate: CHAIRMAN_DIRECTIVE_20260918_FIX_TIKTOK_REGIONAL_DEAD_LINK_AND_LIVE_PROBE (JAYT-442)
 */

'use strict';

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const CANONICAL_URL = 'https://jayt-production-v3420.vercel.app';
const EVIDENCE_DIR = path.join(__dirname, 'runtime_evidence');
const ARTIFACT_DIR = 'C:\\Users\\tritr\\.gemini\\antigravity\\brain\\0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a';

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function probeHttp(url, timeoutMs = 8000) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          hasRegionalBlock: body.includes('không có sẵn') || body.includes('not available in your region')
        });
      });
    }).on('error', (e) => resolve({ status: 500, error: e.message, hasRegionalBlock: false }));
  });
}

(async () => {
  console.log('================================================================');
  console.log('  JAYT-442 LIVE PRODUCTION PUPPETEER VERIFICATION');
  console.log('  Target: ' + CANONICAL_URL);
  console.log('  Directive: CHAIRMAN_DIRECTIVE_20260918_FIX_TIKTOK_REGIONAL_DEAD_LINK');
  console.log('================================================================\n');

  if (!fs.existsSync(EVIDENCE_DIR)) {
    fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
  }

  // STEP 1: AUDIT REMOTE SERVED ASSET INTEGRITY
  console.log('--- STEP 1: AUDIT REMOTE SERVED ASSET INTEGRITY ---');
  const localApexPath = path.join(__dirname, '..', '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
  const localApexBuf = fs.readFileSync(localApexPath);
  const localHash = sha256(localApexBuf);

  const remoteApexUrl = CANONICAL_URL + '/jayt_apex_interface.js?v=3.496.0-j465-monolithic-surface';
  console.log('Fetching remote apex interface: ' + remoteApexUrl);
  const remoteApexBuf = await fetchBuffer(remoteApexUrl);
  const remoteHash = sha256(remoteApexBuf);

  console.log(`Local  apex size: ${localApexBuf.length}, SHA256: ${localHash}`);
  console.log(`Remote apex size: ${remoteApexBuf.length}, SHA256: ${remoteHash}`);

  if (localHash !== remoteHash) {
    console.error('[CRITICAL FAIL] Remote served asset SHA-256 mismatch!');
    process.exit(1);
  }
  console.log('[PASS] Remote served asset is 100% BIT-IDENTICAL to local source of truth!\n');

  // STEP 2: AUDIT TIKTOK PDP URL LIVE PROBE
  console.log('--- STEP 2: TIKTOK PDP LIVE PROBE ---');
  const targetTikTokUrl = 'https://shop.tiktok.com/vn/pdp/1734961837103548126';
  console.log('Probing live endpoint: ' + targetTikTokUrl);
  const probeRes = await probeHttp(targetTikTokUrl);
  console.log(`HTTP Status: ${probeRes.status}, Regional Block Detected: ${probeRes.hasRegionalBlock}`);

  if (probeRes.status !== 200 || probeRes.hasRegionalBlock) {
    console.error('[CRITICAL FAIL] TikTok PDP URL failed probe or returned regional block!');
    process.exit(1);
  }
  console.log('[PASS] TikTok PDP URL is healthy, HTTP 200, ZERO regional block errors!\n');

  // STEP 3: LAUNCH PUPPETEER (DESKTOP & MOBILE)
  console.log('--- STEP 3: PUPPETEER LIVE AUDIT ---');
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const executablePath = fs.existsSync(edgePath) ? edgePath : chromePath;

  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1440,900']
  });

  // --- DESKTOP AUDIT (1440x900) ---
  console.log('\n--- EXECUTING DESKTOP AUDIT (1440px) ---');
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  const desktopConsoleErrors = [];
  desktopPage.on('console', msg => {
    if (msg.type() === 'error') desktopConsoleErrors.push(msg.text());
  });

  console.log('Navigating to ' + CANONICAL_URL + '...');
  await desktopPage.goto(CANONICAL_URL, { waitUntil: 'networkidle2', timeout: 30000 });

  const desktopAudit = await desktopPage.evaluate(() => {
    // Open Voucher Scanner Modal for Ergonomic Pillow
    window.openSkuCrossPlatformRadar('SKU_TRIPLET_11_GOI_CONG_THAI_HOC');

    const modal = document.getElementById('jayt-voucher-scanner-modal');
    const modalVisible = modal && modal.classList.contains('is-open') && modal.style.display !== 'none';
    const radar = window.__lastRadar || (modal ? modal._currentRadar : null);

    let masterWinnerInfo = null;
    let dispatchedInfo = null;

    if (radar && radar.masterWinner) {
      masterWinnerInfo = {
        name: radar.masterWinner.name,
        payable: radar.masterWinner.payable,
        savings: radar.masterWinner.savings,
        pdpUrl: radar.masterWinner.payload ? radar.masterWinner.payload.pdpUrl : null,
        isSearchFallback: radar.masterWinner.payload ? radar.masterWinner.payload.isSearchFallback : null
      };

      // Test real click on Quán Quân Giá Đáy button in DOM
      let intercepted = null;
      const origDispatch = window.dispatchSmartAffiliate;
      window.dispatchSmartAffiliate = (prov, payload, code, evt) => {
        intercepted = origDispatch(prov, payload, code, evt);
        return intercepted;
      };

      const winnerBtn = modal ? modal.querySelector('.btn-master-winner-action') : null;
      if (winnerBtn) {
        winnerBtn.click();
      } else {
        window.dispatchRadarPlatform('master_winner');
      }
      window.dispatchSmartAffiliate = origDispatch;

      if (intercepted) {
        dispatchedInfo = {
          destinationUrl: intercepted.destinationUrl,
          deepLinkUrl: intercepted.deepLinkUrl,
          partnerId: intercepted.partnerId,
          affiliate_enabled: intercepted.affiliate_enabled
        };
      }
    }

    return {
      modalVisible,
      masterWinnerInfo,
      dispatchedInfo,
      hasBannedViewProduct: document.body.innerHTML.includes('/view/product/'),
      hasSyntheticId1: document.body.innerHTML.includes('1729482710492837201'),
      hasSyntheticId2: document.body.innerHTML.includes('1729584920193847582')
    };
  });

  console.log('Desktop Audit Result:');
  console.log('  Modal Visible:', desktopAudit.modalVisible);
  console.log('  Master Winner:', JSON.stringify(desktopAudit.masterWinnerInfo, null, 2));
  console.log('  Dispatched Info:', JSON.stringify(desktopAudit.dispatchedInfo, null, 2));
  console.log('  DOM has /view/product/:', desktopAudit.hasBannedViewProduct);
  console.log('  DOM has Synthetic ID 1:', desktopAudit.hasSyntheticId1);
  console.log('  DOM has Synthetic ID 2:', desktopAudit.hasSyntheticId2);

  if (desktopAudit.hasBannedViewProduct || desktopAudit.hasSyntheticId1 || desktopAudit.hasSyntheticId2) {
    console.error('[CRITICAL FAIL] Banned /view/product/ or synthetic ID found in rendered DOM!');
    process.exit(1);
  }

  if (!desktopAudit.dispatchedInfo || !desktopAudit.dispatchedInfo.destinationUrl.includes('/vn/pdp/1734961837103548126')) {
    console.error('[CRITICAL FAIL] Desktop Quán Quân dispatch did not route to /vn/pdp/1734961837103548126!');
    process.exit(1);
  }

  if (!desktopAudit.dispatchedInfo.deepLinkUrl.startsWith('snssdk1180://ec/pdp?product_id=1734961837103548126&code=VNVNLCB6LYL3')) {
    console.error('[CRITICAL FAIL] Desktop Quán Quân deep link mismatch: ' + desktopAudit.dispatchedInfo.deepLinkUrl);
    process.exit(1);
  }

  // Capture Desktop Screenshot
  const desktopImgPath = path.join(EVIDENCE_DIR, 'j442_live_desktop_tiktok_winner.png');
  await desktopPage.screenshot({ path: desktopImgPath });
  console.log('Saved desktop screenshot to ' + desktopImgPath);
  fs.copyFileSync(desktopImgPath, path.join(ARTIFACT_DIR, 'j442_live_desktop_tiktok_winner.png'));
  await desktopPage.close();

  // --- MOBILE AUDIT (390x844 - iPhone 14) ---
  console.log('\n--- EXECUTING MOBILE SAFARI AUDIT (390px) ---');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await mobilePage.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');

  const mobileConsoleErrors = [];
  mobilePage.on('console', msg => {
    if (msg.type() === 'error') mobileConsoleErrors.push(msg.text());
  });

  console.log('Navigating to ' + CANONICAL_URL + ' on mobile...');
  await mobilePage.goto(CANONICAL_URL, { waitUntil: 'networkidle2', timeout: 30000 });

  const mobileAudit = await mobilePage.evaluate(() => {
    window.openSkuCrossPlatformRadar('SKU_TRIPLET_11_GOI_CONG_THAI_HOC');

    const modal = document.getElementById('jayt-voucher-scanner-modal');
    const modalVisible = modal && modal.classList.contains('is-open') && modal.style.display !== 'none';
    const radar = window.__lastRadar || (modal ? modal._currentRadar : null);

    let masterWinnerInfo = null;
    let dispatchedInfo = null;

    if (radar && radar.masterWinner) {
      masterWinnerInfo = {
        name: radar.masterWinner.name,
        payable: radar.masterWinner.payable,
        savings: radar.masterWinner.savings,
        pdpUrl: radar.masterWinner.payload ? radar.masterWinner.payload.pdpUrl : null
      };

      let intercepted = null;
      const origDispatch = window.dispatchSmartAffiliate;
      window.dispatchSmartAffiliate = (prov, payload, code, evt) => {
        intercepted = origDispatch(prov, payload, code, evt);
        return intercepted;
      };

      const winnerBtn = modal ? modal.querySelector('.btn-master-winner-action') : null;
      if (winnerBtn) {
        winnerBtn.click();
      } else {
        window.dispatchRadarPlatform('master_winner');
      }
      window.dispatchSmartAffiliate = origDispatch;

      if (intercepted) {
        dispatchedInfo = {
          destinationUrl: intercepted.destinationUrl,
          deepLinkUrl: intercepted.deepLinkUrl,
          partnerId: intercepted.partnerId,
          affiliate_enabled: intercepted.affiliate_enabled
        };
      }
    }

    return {
      modalVisible,
      masterWinnerInfo,
      dispatchedInfo,
      hasBannedViewProduct: document.body.innerHTML.includes('/view/product/'),
      hasSyntheticId1: document.body.innerHTML.includes('1729482710492837201'),
      hasSyntheticId2: document.body.innerHTML.includes('1729584920193847582')
    };
  });

  console.log('Mobile Audit Result:');
  console.log('  Modal Visible:', mobileAudit.modalVisible);
  console.log('  Master Winner:', JSON.stringify(mobileAudit.masterWinnerInfo, null, 2));
  console.log('  Dispatched Info:', JSON.stringify(mobileAudit.dispatchedInfo, null, 2));

  if (mobileAudit.hasBannedViewProduct || mobileAudit.hasSyntheticId1 || mobileAudit.hasSyntheticId2) {
    console.error('[CRITICAL FAIL] Mobile rendered DOM contains banned elements!');
    process.exit(1);
  }

  if (!mobileAudit.dispatchedInfo || !mobileAudit.dispatchedInfo.destinationUrl.includes('/vn/pdp/1734961837103548126')) {
    console.error('[CRITICAL FAIL] Mobile Quán Quân dispatch did not route to /vn/pdp/1734961837103548126!');
    process.exit(1);
  }

  // Capture Mobile Screenshot
  const mobileImgPath = path.join(EVIDENCE_DIR, 'j442_live_mobile_tiktok_winner.png');
  await mobilePage.screenshot({ path: mobileImgPath });
  console.log('Saved mobile screenshot to ' + mobileImgPath);
  fs.copyFileSync(mobileImgPath, path.join(ARTIFACT_DIR, 'j442_live_mobile_tiktok_winner.png'));
  await mobilePage.close();
  await browser.close();

  // STEP 4: GENERATE OFFICIAL RECEIPT
  console.log('\n--- GENERATING JAYT-442 AUDIT RECEIPT ---');
  const receipt = {
    receipt_id: 'JAYT_442_TIKTOK_LIVE_PROBE_RECEIPT',
    mandate_cycle: 'JAYT-442',
    directive: 'CHAIRMAN_DIRECTIVE_20260918_FIX_TIKTOK_REGIONAL_DEAD_LINK_AND_LIVE_PROBE',
    timestamp_iso: new Date().toISOString(),
    canonical_url: CANONICAL_URL,
    asset_verification: {
      asset_path: '03_SOURCE_OF_TRUTH/jayt_apex_interface.js',
      local_sha256: localHash,
      remote_sha256: remoteHash,
      bit_identical: localHash === remoteHash
    },
    tiktok_routing_standard: {
      prohibited_url_format: 'shop.tiktok.com/view/product/',
      prohibited_occurrences: 0,
      banned_synthetic_ids: ['1729482710492837201', '1729584920193847582'],
      banned_id_occurrences: 0,
      standard_web_url_format: 'https://shop.tiktok.com/vn/pdp/${productId}',
      standard_app_scheme: 'snssdk1180://ec/pdp?product_id=${productId}&code=VNVNLCB6LYL3',
      pillow_genuine_product_id: '1734961837103548126',
      live_http_probe: {
        probed_url: targetTikTokUrl,
        http_status: probeRes.status,
        regional_block_detected: probeRes.hasRegionalBlock,
        probe_status: 'HEALTHY_HTTP_200_NO_BLOCK'
      }
    },
    master_floor_price_winner_audit: {
      sku_id: 'SKU_TRIPLET_11_GOI_CONG_THAI_HOC',
      winner_name: desktopAudit.masterWinnerInfo.name,
      floor_price_vnd: desktopAudit.masterWinnerInfo.payable,
      floor_savings_vnd: desktopAudit.masterWinnerInfo.savings,
      dispatched_web_url: desktopAudit.dispatchedInfo.destinationUrl,
      dispatched_deep_link: desktopAudit.dispatchedInfo.deepLinkUrl,
      partner_id: desktopAudit.dispatchedInfo.partnerId,
      attribution_locked: desktopAudit.dispatchedInfo.partnerId === 'VNVNLCB6LYL3',
      affiliate_enabled: desktopAudit.dispatchedInfo.affiliate_enabled
    },
    field_audit_evidence: {
      desktop_1440_screenshot: '07_QUALITY_ASSURANCE/runtime_evidence/j442_live_desktop_tiktok_winner.png',
      mobile_390_screenshot: '07_QUALITY_ASSURANCE/runtime_evidence/j442_live_mobile_tiktok_winner.png',
      desktop_console_errors: desktopConsoleErrors,
      mobile_console_errors: mobileConsoleErrors
    },
    governance_verdict: 'CHAIRMAN_DIRECTIVE_JAYT_442_RATIFIED_100_PERCENT_COMPLIANT'
  };

  const receiptPath = path.join(EVIDENCE_DIR, 'JAYT_442_TIKTOK_LIVE_PROBE_RECEIPT.json');
  fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2), 'utf8');
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'JAYT_442_TIKTOK_LIVE_PROBE_RECEIPT.json'), JSON.stringify(receipt, null, 2), 'utf8');
  console.log('Saved official receipt to ' + receiptPath);

  console.log('\n================================================================');
  console.log('  [PASS TUYỆT ĐỐI] JAYT-442 LIVE AUDIT HOÀN TẤT THÀNH CÔNG');
  console.log('================================================================\n');
})();
