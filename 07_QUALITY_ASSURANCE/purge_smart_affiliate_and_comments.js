const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let js = fs.readFileSync(jsPath, 'utf8');

// 1. Remove JAYT_AFFILIATE_CONFIG and dispatchSmartAffiliate
const targetBlock = `  const JAYT_AFFILIATE_CONFIG = {
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
      showToast(\`🚀 Đang chuyển hướng ưu đãi \${platform} đối soát JayT Community Verification...\`);
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
  }`;

if (js.includes(targetBlock)) {
  js = js.replace(targetBlock, '// JAYT SMART AFFILIATE ROUTER: PURGED UNDER JAYT-134C (Zero unverified affiliate routing)');
  console.log('✅ Purged JAYT_AFFILIATE_CONFIG and dispatchSmartAffiliate');
}

// 2. Clean comments
js = js.replace(/<!-- 4\. SĂN ĐÁY ĐỒ TIỆN ÍCH KTX ≤ 50K & KHO VOUCHER TOÀN SÀN -->/g, '<!-- 4. KHO VOUCHER & MÃ ƯU ĐÃI THAM KHẢO -->');
js = js.replace(/badge-freeship-xtra/g, 'badge-status-neutral');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('✨ Cleaned smart affiliate and comments from JS!');
