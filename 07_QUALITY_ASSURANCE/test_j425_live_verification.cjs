/**
 * JAYT-425: Live Puppeteer Verification for TikTok Shop PDP Resolver & 404 Elimination
 * Directive: CHAIRMAN_DIRECTIVE_20260918_FIX_PDP_RESOLVER_AND_ELIMINATE_404
 * Authority: CEO CODEX & ANTIGRAVITY ENGINEERING
 */

'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

(async () => {
  const targetUrl = process.env.TEST_URL || 'https://jayt-production-v3420.vercel.app/';
  const testPdpUrl = 'https://shop.tiktok.com/vn/pdp/1734961837103548126';
  console.log('=== JAYT-425 LIVE PUPPETEER VERIFICATION ===');
  console.log('Target URL:', targetUrl);
  console.log('Test PDP URL:', testPdpUrl);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));

    const response = await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('HTTP Status:', response.status());

    // 1. Verify that the input element exists and paste test PDP URL
    await page.waitForSelector('#j401-voucher-input', { timeout: 10000 });
    await page.$eval('#j401-voucher-input', (el, val) => {
      el.value = val;
    }, testPdpUrl);

    // Trigger lookup
    await page.evaluate(() => {
      if (typeof handleVoucherLookup === 'function') {
        handleVoucherLookup();
      }
    });

    // Wait for the modal or result to render
    await page.waitForSelector('#jayt-voucher-scanner-modal.is-open', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 1000));

    // 2. Audit modal contents
    const modalData = await page.evaluate(() => {
      const modal = document.getElementById('jayt-voucher-scanner-modal');
      const radar = window.__lastRadar;
      const parsed = window.__lastParsed;

      const modalText = modal ? modal.innerText : '';
      const hasBannedText = modalText.includes('Vật Dụng Sinh Viên Đà Nẵng');

      // Test dispatchSmartAffiliate for all 3 platforms
      const shopeeDispatch = window.dispatchSmartAffiliate('shopee', { isSearchFallback: true, searchQuery: 'Gối Công Thái Học' }, '');
      const lazadaDispatch = window.dispatchSmartAffiliate('lazada', { isSearchFallback: true, searchQuery: 'Gối Công Thái Học' }, '');
      const tiktokDispatch = window.dispatchSmartAffiliate('tiktok', { isSearchFallback: true, searchQuery: 'Gối Công Thái Học' }, '');

      return {
        modalOpened: !!modal,
        hasBannedText,
        parsedTitle: parsed ? parsed.title : null,
        parsedCleanTitle: parsed ? parsed.cleanTitle : null,
        parsedQuery: parsed ? parsed.searchQuery : null,
        parsedCategory: parsed ? parsed.category : null,
        matchedTripletId: radar && radar.matchedTriplet ? radar.matchedTriplet.id : null,
        platforms: radar && radar.platforms ? radar.platforms.map(p => ({
          id: p.id,
          name: p.name,
          searchQuery: p.payload ? p.payload.searchQuery : null,
          actionLabel: p.actionLabel
        })) : [],
        trustedShops: radar && radar.tierTrusted ? radar.tierTrusted.map(t => ({
          id: t.id,
          name: t.name,
          searchQuery: t.payload ? t.payload.searchQuery : null,
          actionLabel: t.actionLabel
        })) : [],
        dispatches: {
          shopee: {
            partnerId: shopeeDispatch.partnerId,
            destinationUrl: shopeeDispatch.destinationUrl,
            deepLinkUrl: shopeeDispatch.deepLinkUrl
          },
          lazada: {
            partnerId: lazadaDispatch.partnerId,
            destinationUrl: lazadaDispatch.destinationUrl,
            deepLinkUrl: lazadaDispatch.deepLinkUrl
          },
          tiktok: {
            partnerId: tiktokDispatch.partnerId,
            destinationUrl: tiktokDispatch.destinationUrl,
            deepLinkUrl: tiktokDispatch.deepLinkUrl
          }
        }
      };
    });

    console.log('Modal Audit Results:');
    console.log('- Parsed Title:', modalData.parsedTitle);
    console.log('- Parsed Search Query:', modalData.parsedQuery);
    console.log('- Matched Triplet ID:', modalData.matchedTripletId);
    console.log('- Has Banned Text (Vật Dụng Sinh Viên Đà Nẵng):', modalData.hasBannedText);
    console.log('- Platforms:', JSON.stringify(modalData.platforms, null, 2));
    console.log('- Dispatches:', JSON.stringify(modalData.dispatches, null, 2));

    // Assertions
    assert.strictEqual(modalData.modalOpened, true, 'Modal should be open');
    assert.strictEqual(modalData.hasBannedText, false, 'Banned text "Vật Dụng Sinh Viên Đà Nẵng" must NOT be in modal');
    assert.strictEqual(modalData.parsedCleanTitle, 'Gối Ngủ Công Thái Học', 'Clean title must be Gối Ngủ Công Thái Học');
    assert.strictEqual(modalData.parsedQuery, 'Gối Công Thái Học', 'Search query must be Gối Công Thái Học');
    assert.strictEqual(modalData.matchedTripletId, 'SKU_TRIPLET_11_GOI_CONG_THAI_HOC', 'Must match Triplet 11');

    // All platforms search for "Gối Công Thái Học"
    for (const p of modalData.platforms) {
      assert.strictEqual(p.searchQuery, 'Gối Công Thái Học', `${p.id} must search for Gối Công Thái Học`);
    }

    // TikTok destination URL must be www.tiktok.com/search (not shop.tiktok.com/search)
    assert.ok(modalData.dispatches.tiktok.destinationUrl.startsWith('https://www.tiktok.com/search?q='), 'TikTok destination must be www.tiktok.com/search');
    assert.ok(!modalData.dispatches.tiktok.destinationUrl.includes('shop.tiktok.com/search'), 'Must not contain shop.tiktok.com/search 404');
    assert.strictEqual(modalData.dispatches.tiktok.partnerId, 'VNVNLCB6LYL3', 'TikTok partnerId must be VNVNLCB6LYL3');

    // Shopee destination URL
    assert.ok(modalData.dispatches.shopee.destinationUrl.includes('shopee.vn/search?keyword='), 'Shopee destination URL valid');
    assert.strictEqual(modalData.dispatches.shopee.partnerId, '17372870594', 'Shopee partnerId must be 17372870594');

    // Lazada destination URL
    assert.ok(modalData.dispatches.lazada.destinationUrl.includes('lazada.vn/catalog/?q='), 'Lazada destination URL valid');
    assert.strictEqual(modalData.dispatches.lazada.partnerId, '262501305', 'Lazada partnerId must be 262501305');

    // Capture screenshots
    const evidenceDir = path.resolve(__dirname, 'runtime_evidence');
    const modalShotPath = path.join(evidenceDir, 'j425_live_tiktok_pdp_modal.png');
    await page.screenshot({ path: modalShotPath });
    console.log('Saved modal screenshot:', modalShotPath);

    // Scroll down to show all 3 comparison cards and trusted shops
    await page.evaluate(() => {
      const modal = document.getElementById('jayt-voucher-scanner-modal');
      if (modal) {
        const dialog = modal.querySelector('div[style*="overflow-y"]') || modal;
        dialog.scrollTop = 350;
      }
    });
    await new Promise(r => setTimeout(r, 500));

    const platformsShotPath = path.join(evidenceDir, 'j425_live_three_platform_search.png');
    await page.screenshot({ path: platformsShotPath });
    console.log('Saved platforms screenshot:', platformsShotPath);

    // Write execution receipt
    const receipt = {
      testId: 'JAYT-425-LIVE-VERIFICATION',
      directive: 'CHAIRMAN_DIRECTIVE_20260918_FIX_PDP_RESOLVER_AND_ELIMINATE_404',
      targetUrl,
      testPdpUrl,
      timestamp: new Date().toISOString(),
      status: 'VERIFIED_PASS',
      pdpResolution: {
        rawPdpId: '1734961837103548126',
        parsedTitle: modalData.parsedTitle,
        parsedCleanTitle: modalData.parsedCleanTitle,
        searchQuery: modalData.parsedQuery,
        category: modalData.parsedCategory,
        matchedTriplet: modalData.matchedTripletId
      },
      threePlatformQueryAlignment: {
        shopee: {
          searchQuery: modalData.platforms.find(p => p.id === 'shopee').searchQuery,
          destinationUrl: modalData.dispatches.shopee.destinationUrl,
          partnerId: modalData.dispatches.shopee.partnerId
        },
        lazada: {
          searchQuery: modalData.platforms.find(p => p.id === 'lazada').searchQuery,
          destinationUrl: modalData.dispatches.lazada.destinationUrl,
          partnerId: modalData.dispatches.lazada.partnerId
        },
        tiktok: {
          searchQuery: modalData.platforms.find(p => p.id === 'tiktok').searchQuery,
          destinationUrl: modalData.dispatches.tiktok.destinationUrl,
          partnerId: modalData.dispatches.tiktok.partnerId,
          error404Eliminated: true
        }
      },
      bannedStringAudit: {
        vatDungSinhVienDaNangPresent: modalData.hasBannedText,
        shopTikTokComSearchPresent: modalData.dispatches.tiktok.destinationUrl.includes('shop.tiktok.com/search')
      },
      screenshots: [
        '07_QUALITY_ASSURANCE/runtime_evidence/j425_live_tiktok_pdp_modal.png',
        '07_QUALITY_ASSURANCE/runtime_evidence/j425_live_three_platform_search.png'
      ]
    };

    const receiptPath = path.join(evidenceDir, 'JAYT_425_TIKTOK_PDP_RECEIPT.json');
    fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2), 'utf8');
    console.log('Saved live verification receipt:', receiptPath);

    console.log('\n================================================================');
    console.log('JAYT-425 LIVE PUPPETEER VERIFICATION: 100% SUCCESSFUL PASS!');
    console.log('================================================================\n');

  } catch (err) {
    console.error('Puppeteer verification failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
