const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');

let js = fs.readFileSync(jsPath, 'utf8');
let html = fs.readFileSync(htmlPath, 'utf8');

console.log('--- 1. INJECTING JAYT SMART AFFILIATE ENGINE (v9.5.0) INTO JS ---');

const affiliateEngineCode = `
  // --- JAYT SMART AFFILIATE ROUTER & ATTRIBUTION ENGINE (v9.5.0) ---
  const JAYT_AFFILIATE_CONFIG = {
    ACCESSTRADE_BASE: "https://shorten.asia/",
    SHOPEE_APP_PREFIX: "shopeevn://",
    TIKTOK_APP_PREFIX: "snssdk1180://",
    KLOOK_AFFILIATE_ID: "jayt_danang_aff"
  };

  function dispatchSmartAffiliate(platform, campaignId, fallbackUrl, categoryTag) {
    if (typeof playHapticTick === 'function') playHapticTick();
    if (typeof triggerMicroConfetti === 'function') triggerMicroConfetti();

    // Lấy cụm trường hiện tại sinh viên đang chọn
    const activeCampusEl = document.querySelector('.campus-chip.active');
    const activeCampus = activeCampusEl ? activeCampusEl.innerText : 'ALL_CAMPUS';
    const cleanCampus = activeCampus.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();

    // Tạo URL Tracking chuẩn SEO & Phân tích chuyển đổi
    const trackingParams = \`utm_source=jayt&utm_medium=web_app&utm_campaign=\${categoryTag || 'general'}&sub1=\${cleanCampus}&sub2=\${(platform || 'direct').toLowerCase()}&sub3=\${Date.now()}\`;
    const finalWebUrl = fallbackUrl.includes('?') ? \`\${fallbackUrl}&\${trackingParams}\` : \`\${fallbackUrl}?\${trackingParams}\`;

    if (typeof showToast === 'function') {
      showToast(\`🚀 Đang chuyển hướng ưu đãi \${platform} đối soát #JayTAffiliate...\`);
    }

    const isIOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

    // Xử lý Universal Deep-Link trên điện thoại
    if (isIOS || isAndroid) {
      let deepLink = "";
      if (platform === "SHOPEE") {
        deepLink = \`shopeevn://product/\${campaignId}\`;
      } else if (platform === "TIKTOK") {
        deepLink = \`snssdk1180://ec/product/detail?product_id=\${campaignId}\`;
      }

      if (deepLink) {
        const clickTime = Date.now();
        window.location.href = deepLink;

        setTimeout(() => {
          if (Date.now() - clickTime < 1800) {
            window.open(finalWebUrl, '_blank', 'noopener,noreferrer');
          }
        }, 1200);
        return;
      }
    }

    // Mở tab mới trên máy tính
    window.open(finalWebUrl, '_blank', 'noopener,noreferrer');
  }

  if (typeof window !== 'undefined') {
    window.dispatchSmartAffiliate = dispatchSmartAffiliate;
    window.JAYT_AFFILIATE_CONFIG = JAYT_AFFILIATE_CONFIG;
  }
`;

if (!js.includes('JAYT SMART AFFILIATE ROUTER & ATTRIBUTION ENGINE')) {
  const mountAnchor = '  // --- JAYT HUB & UI GLOBAL CONTROLLERS v9.0.0 ---';
  js = js.replace(mountAnchor, affiliateEngineCode + '\n' + mountAnchor);
  console.log('✅ Injected dispatchSmartAffiliate engine into JS');
}

console.log('\n--- 2. UPDATING AFFILIATE TOUCHPOINTS IN JS TEMPLATES ---');

// 1. Touchpoint 1: KTX Gear Items in Tab 3 of Student Hub
const oldKtxGridRegex = /<div class="ktx-gear-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newKtxGearHtml = `
            <div class="ktx-gear-grid">
              <!-- ITEM 1: QUẠT KẸP TÍCH ĐIỆN -->
              <div class="gear-card apex-spring-interactive">
                <div style="font-size:24px; margin-bottom:6px;">🔋</div>
                <div class="gear-title">Quạt Kẹp Tích Điện KTX 3 Tốc Độ</div>
                <div class="gear-price-row">
                  <span class="gear-price-final">39.000₫</span>
                  <span class="gear-price-orig">85.000₫</span>
                </div>
                <div class="gear-badge-tag">🟢 Freeship Xtra 0đ</div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'quat_kep_ktx_01', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:32px; font-size:11.5px; margin-top:8px; border:none; cursor:pointer;">Săn Đáy 39K ↗</button>
              </div>

              <!-- ITEM 2: ĐÈN HỌC LED CHỐNG CẬN -->
              <div class="gear-card apex-spring-interactive">
                <div style="font-size:24px; margin-bottom:6px;">💡</div>
                <div class="gear-title">Đèn LED Kẹp Bàn Học 3 Chế Độ</div>
                <div class="gear-price-row">
                  <span class="gear-price-final">29.000₫</span>
                  <span class="gear-price-orig">69.000₫</span>
                </div>
                <div class="gear-badge-tag">🟢 Freeship Xtra 0đ</div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'den_led_ktx_02', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:32px; font-size:11.5px; margin-top:8px; border:none; cursor:pointer;">Săn Đáy 29K ↗</button>
              </div>

              <!-- ITEM 3: NỒI LẨU MINI NẤU MÌ -->
              <div class="gear-card apex-spring-interactive">
                <div style="font-size:24px; margin-bottom:6px;">🍲</div>
                <div class="gear-title">Nồi Lẩu Mini Nấu Mì 1.5L Chống Dính</div>
                <div class="gear-price-row">
                  <span class="gear-price-final">55.000₫</span>
                  <span class="gear-price-orig">115.000₫</span>
                </div>
                <div class="gear-badge-tag">🟢 Freeship Xtra 0đ</div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'noi_lau_mini_03', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:32px; font-size:11.5px; margin-top:8px; border:none; cursor:pointer;">Săn Đáy 55K ↗</button>
              </div>

              <!-- ITEM 4: CÁP SẠC 20W BỌC DÙ -->
              <div class="gear-card apex-spring-interactive">
                <div style="font-size:24px; margin-bottom:6px;">🔌</div>
                <div class="gear-title">Cáp Sạc Nhanh Type-C 20W Bọc Dù</div>
                <div class="gear-price-row">
                  <span class="gear-price-final">29.000₫</span>
                  <span class="gear-price-orig">55.000₫</span>
                </div>
                <div class="gear-badge-tag">🟢 Freeship Xtra 0đ</div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'cap_sac_20w_04', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:32px; font-size:11.5px; margin-top:8px; border:none; cursor:pointer;">Săn Đáy 29K ↗</button>
              </div>

              <!-- ITEM 5: Ổ CẮM ĐIỆN 4 CỔNG USB -->
              <div class="gear-card apex-spring-interactive">
                <div style="font-size:24px; margin-bottom:6px;">⚡</div>
                <div class="gear-title">Ổ Cắm Đa Năng 4 Cổng USB Chống Giật</div>
                <div class="gear-price-row">
                  <span class="gear-price-final">45.000₫</span>
                  <span class="gear-price-orig">95.000₫</span>
                </div>
                <div class="gear-badge-tag">🟢 Freeship Xtra 0đ</div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'o_cam_usb_05', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:32px; font-size:11.5px; margin-top:8px; border:none; cursor:pointer;">Săn Đáy 45K ↗</button>
              </div>

              <!-- ITEM 6: BÌNH GIỮ NHIỆT 500ML -->
              <div class="gear-card apex-spring-interactive">
                <div style="font-size:24px; margin-bottom:6px;">🧊</div>
                <div class="gear-title">Bình Giữ Nhiệt Inox 304 500ml 12h</div>
                <div class="gear-price-row">
                  <span class="gear-price-final">35.000₫</span>
                  <span class="gear-price-orig">75.000₫</span>
                </div>
                <div class="gear-badge-tag">🟢 Freeship Xtra 0đ</div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'binh_giu_nhiet_06', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:32px; font-size:11.5px; margin-top:8px; border:none; cursor:pointer;">Săn Đáy 35K ↗</button>
              </div>
            </div>`;

// Update KTX Gear grid
const ktxGridIdx = js.indexOf('<div class="ktx-gear-grid">');
if (ktxGridIdx !== -1) {
  const ktxEndIdx = js.indexOf('</div>\n          </div>\n        </section>', ktxGridIdx);
  if (ktxEndIdx !== -1) {
    const before = js.substring(0, ktxGridIdx);
    const after = js.substring(ktxEndIdx);
    js = before + newKtxGearHtml + after;
    console.log('✅ Updated KTX Gear Grid with Shopee Affiliate dispatcher');
  }
}

// 2. Touchpoint 2: Fintech CPA in Tab 2 of Student Hub (Đặc Quyền 0đ)
const fintechBannerHtml = `
            <!-- BANNER FINTECH CPA ACCESSTRADE (HOA HỒNG 50K - 80K/MỞ THẺ) -->
            <div style="background:linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.15)); border:1px solid rgba(16, 185, 129, 0.35); border-radius:14px; padding:16px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <div style="flex:1; min-width:240px;">
                <div style="font-size:11px; font-weight:800; color:var(--emerald); text-transform:uppercase; letter-spacing:0.5px;">💳 ĐẶC QUYỀN TÀI CHÍNH SINH VIÊN 0Đ (ACCESSTRADE CPA)</div>
                <div style="font-size:16px; font-weight:900; color:var(--text-main); margin:3px 0;">Mở Tài Khoản Số Cake / MBBank 0đ — Nhận Ngay 50.000₫ Tiền Mặt</div>
                <div style="font-size:12px; color:var(--text-muted);">Miễn 100% phí duy trì · Thẻ thanh toán quốc tế Visa/Mastercard ảo kích hoạt sau 2 phút</div>
              </div>
              <button type="button" onclick="dispatchSmartAffiliate('FINTECH', 'cake_vpbank_student', 'https://shorten.asia/cake_vpbank_aff', 'student_cpa')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="height:38px; padding:0 18px; font-size:12.5px; border:none; cursor:pointer; font-weight:800;">Mở Thẻ Nhận 50K ↗</button>
            </div>
`;

const eduTabIdx = js.indexOf('<div id="hub-tab-edu" class="hub-panel">');
if (eduTabIdx !== -1 && !js.includes('FINTECH CPA ACCESSTRADE')) {
  const insertPos = js.indexOf('<div class="edu-perks-matrix">', eduTabIdx);
  if (insertPos !== -1) {
    js = js.substring(0, insertPos) + fintechBannerHtml + '\n            ' + js.substring(insertPos);
    console.log('✅ Injected Fintech CPA Banner into Student Hub Tab 2');
  }
}

// 3. Touchpoint 3: Klook Affiliate for Weekend Attractions (Bà Nà, Mikazuki, Núi Thần Tài)
const klookCardHtml = `
            <!-- KLOOK AFFILIATE TOUCHPOINT (HOA HỒNG 3% - 5%/VÉ) -->
            <div style="background:linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(234, 88, 12, 0.12)); border:1px solid rgba(245, 158, 11, 0.35); border-radius:16px; padding:16px; margin-top:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <div style="flex:1; min-width:240px;">
                <div style="font-size:11px; font-weight:800; color:#EA580C; text-transform:uppercase; letter-spacing:0.5px;">🎡 KÈO CUỐI TUẦN VÙNG 43 · ĐỐI SOÁT KLOOK REVENUE</div>
                <div style="font-size:15px; font-weight:900; color:var(--text-main); margin:3px 0;">Săn Vé Bà Nà Hills, Công Viên Nước Mikazuki & Núi Thần Tài Rẻ Hơn 15%</div>
                <div style="font-size:12px; color:var(--text-muted);">Vé điện tử quét mã QR vào cổng không cần xếp hàng · Đảm bảo giá tốt nhất qua Klook</div>
              </div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button type="button" onclick="dispatchSmartAffiliate('KLOOK', 'bana_hills_aff', 'https://www.klook.com/vi/activity/bana-hills-danang/', 'weekend_klook')" class="btn-cta-emerald apex-spring-interactive" style="height:36px; padding:0 14px; font-size:12px; border:none; cursor:pointer; background:#EA580C; color:#FFF; font-weight:800;">Vé Bà Nà Hills ↗</button>
                <button type="button" onclick="dispatchSmartAffiliate('KLOOK', 'mikazuki_waterpark_aff', 'https://www.klook.com/vi/activity/mikazuki-water-park-danang/', 'weekend_klook')" class="btn-cta-emerald apex-spring-interactive" style="height:36px; padding:0 14px; font-size:12px; border:none; cursor:pointer; background:#F59E0B; color:#000; font-weight:800;">Vé Mikazuki ↗</button>
              </div>
            </div>
`;

const tier3Anchor = 'id="splitBillProContainer"';
if (js.includes(tier3Anchor) && !js.includes('KLOOK AFFILIATE TOUCHPOINT')) {
  const insertPos = js.indexOf('</section>', js.indexOf(tier3Anchor));
  if (insertPos !== -1) {
    js = js.substring(0, insertPos) + klookCardHtml + '\n        ' + js.substring(insertPos);
    console.log('✅ Injected Klook Affiliate Touchpoint into Tier 3');
  }
}

// 4. Update Footer Transparency Notice
const footerAnchor = '🔒 Dữ liệu đã đối soát qua cổng tiếp thị liên kết chính thức';
const newFooterNotice = '🔒 Dữ liệu và mã ưu đãi đã đối soát qua cổng tiếp thị liên kết chính thức <strong>#JayTAffiliate</strong> (Shopee Affiliate Direct, Accesstrade CPA & Klook Official Partner) — Tự động nhận diện thiết bị & minh bạch giá 100%.';

if (js.includes(footerAnchor)) {
  const lineStart = js.indexOf(footerAnchor);
  const lineEnd = js.indexOf('</div>', lineStart);
  js = js.substring(0, lineStart) + newFooterNotice + js.substring(lineEnd);
  console.log('✅ Updated footer transparency notice with full #JayTAffiliate attribution');
}

fs.writeFileSync(jsPath, js, 'utf8');
console.log('✨ JAYT SMART AFFILIATE ENGINE v9.5.0 SUCCESSFULLY CONFIGURED!');
