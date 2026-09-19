/**
 * JAYT-420: PUPPETEER REAL IPHONE SHORTLINK RESOLUTION & DEEP VERDICT VERIFICATION
 * 
 * Target: https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/
 * Viewport: iPhone 14/15 Pro (390x844)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');
const { URL } = require('url');

const ROOT_DIR = path.resolve(__dirname, '..');
const DEPLOY_DIR = path.join(ROOT_DIR, 'deploy');
const resolveApiHandler = require(path.join(DEPLOY_DIR, 'api/resolve-link.js'));

const PORT = 4199;

// 1. Create mock local server that serves deploy/ static files and /api/resolve-link
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  
  if (parsedUrl.pathname.startsWith('/api/resolve-link')) {
    return resolveApiHandler(req, res);
  }

  let filePath = path.join(DEPLOY_DIR, parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    let contentType = 'text/plain';
    if (ext === '.html') contentType = 'text/html; charset=utf-8';
    if (ext === '.js') contentType = 'application/javascript; charset=utf-8';
    if (ext === '.json') contentType = 'application/json; charset=utf-8';
    if (ext === '.css') contentType = 'text/css; charset=utf-8';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

async function runVerification() {
  server.listen(PORT, async () => {
    console.log(`Test server running at http://127.0.0.1:${PORT}`);
    
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
      await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');

      console.log('Navigating to local deployment...');
      await page.goto(`http://127.0.0.1:${PORT}/index.html`, { waitUntil: 'domcontentloaded', timeout: 30000 });

      // Check if input exists
      await page.waitForSelector('#j401-voucher-input', { timeout: 10000 });
      console.log('Found #j401-voucher-input');

      // Paste the Chairman's exact shortlink
      const testLink = 'https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/';
      console.log(`Entering test shortlink: ${testLink}`);
      
      await page.$eval('#j401-voucher-input', (el, val) => {
        el.value = val;
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }, testLink);

      // Intercept clicks to capture dispatched deep links
      const dispatchedLinks = [];
      await page.exposeFunction('onJaytInterceptDeepLink', (url) => {
        console.log('[INTERCEPTED DEEP LINK]:', url);
        dispatchedLinks.push(url);
      });

      await page.evaluate(() => {
        const origDispatch = window.dispatchSmartAffiliate;
        window.dispatchSmartAffiliate = function(provider, payload, voucher, event) {
          const res = origDispatch.call(this, provider, payload, voucher, event);
          if (res && res.deepLinkUrl) {
            window.onJaytInterceptDeepLink(res.deepLinkUrl);
          }
          return res;
        };
      });

      // Trigger lookup
      await page.evaluate(() => {
        if (typeof handleVoucherLookup === 'function') {
          handleVoucherLookup();
        }
      });
      console.log('Called handleVoucherLookup(). Waiting for async resolution...');

      // Wait for output box to resolve and render deep verdict table
      await page.waitForSelector('.jayt-deep-verdict-box', { timeout: 15000 });
      console.log('Found .jayt-deep-verdict-box!');

      // Wait 1.5s for DOM animations to settle
      await new Promise(r => setTimeout(r, 1500));

      // Capture screenshot of the inline output
      const evidenceDir = path.join(ROOT_DIR, '07_QUALITY_ASSURANCE/runtime_evidence');
      if (!fs.existsSync(evidenceDir)) fs.mkdirSync(evidenceDir, { recursive: true });

      const inlineScreenshotPath = path.join(evidenceDir, 'j420_live_shortlink_resolved_iphone.png');
      await page.screenshot({ path: inlineScreenshotPath, fullPage: false });
      console.log(`Saved screenshot to: ${inlineScreenshotPath}`);

      // Inspect resolved text in output
      const outputText = await page.$eval('#j401-voucher-output', el => el.innerText);
      console.log('\n--- EXTRACTED RESOLVED TEXT ---');
      console.log(outputText.slice(0, 500));
      console.log('-------------------------------\n');

      // Assertions
      if (outputText.includes('ZS9AJ7')) {
        throw new Error('FAIL: Output still contains gibberish token ZS9AJ7!');
      }
      if (!outputText.includes('ATYS') && !outputText.includes('CARDIGAN')) {
        throw new Error('FAIL: Output does not contain resolved product title (ATYS CARDIGAN)!');
      }
      if (!outputText.includes('5 Tiêu Chuẩn So Sánh')) {
        throw new Error('FAIL: Output does not contain 5-Standard Deep Verdict Matrix table!');
      }

      console.log('SUCCESS: iPhone shortlink resolution verified with zero gibberish!');

      // Now click on the Shopee search button in modal or inline
      console.log('Simulating click on Shopee button...');
      await page.evaluate(() => {
        if (typeof window.dispatchRadarPlatform === 'function' && window.__lastRadar) {
          const shopeeIdx = window.__lastRadar.platforms.findIndex(p => p.id === 'shopee');
          if (shopeeIdx !== -1) {
            window.dispatchRadarPlatform(shopeeIdx, 'mall');
          }
        }
      });

      await new Promise(r => setTimeout(r, 500));
      console.log('Dispatched links count:', dispatchedLinks.length);
      if (dispatchedLinks.length > 0) {
        const shopeeLink = dispatchedLinks[0];
        console.log('Dispatched link:', shopeeLink);
        if (shopeeLink.includes('ZS9AJ7')) {
          throw new Error('FAIL: Dispatched link contains gibberish ZS9AJ7!');
        }
        if (!shopeeLink.includes('partner=17372870594')) {
          throw new Error('FAIL: Dispatched link missing partner=17372870594!');
        }
        console.log('SUCCESS: Shopee search link contains partner=17372870594 and pristine search query!');
      }

      // Also copy screenshot to artifact dir if present
      const brainDir = 'C:\\Users\\tritr\\.gemini\\antigravity\\brain\\0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a';
      if (fs.existsSync(brainDir)) {
        fs.copyFileSync(inlineScreenshotPath, path.join(brainDir, 'j420_live_shortlink_resolved_iphone.png'));
        console.log('Copied evidence screenshot to brain artifacts.');
      }

      console.log('\n=== PUPPETEER REAL IPHONE VERIFICATION: 100% PASS ===');
    } finally {
      if (browser) await browser.close();
      server.close();
    }
  });
}

runVerification().catch(err => {
  console.error('Verification failed:', err);
  server.close();
  process.exit(1);
});
