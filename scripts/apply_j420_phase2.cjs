/**
 * JAYT-420: PHASE 2 HOTFIX - DEEP VERDICT MATRIX & SHORTLINK RESOLUTION INTEGRATION
 */

const fs = require('fs');
const path = require('path');

const APEX_PATH = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let code = fs.readFileSync(APEX_PATH, 'utf8');

console.log('Original size before Phase 2:', code.length);

// 1. Insert renderDeepVerdictTableHtml function before openVoucherScannerModal
if (!code.includes('function renderDeepVerdictTableHtml')) {
  const tableFn = `
function renderDeepVerdictTableHtml(radar, money) {
  if (!radar || !radar.deepVerdictMatrix) return '';
  const m = radar.deepVerdictMatrix;
  const verdict = radar.smartVerdict;
  let rowsHtml = '';
  for (let i = 0; i < m.length; i++) {
    const item = m[i];
    rowsHtml += '<tr style="border-bottom: 1px solid rgba(229,195,120,0.15);">' +
      '<td style="padding: 10px 8px; font-weight: 750; color: #F4EFE6; vertical-align: top; width: 28%;">' +
        item.standard +
        '<div style="font-size: 10px; margin-top: 4px;">' +
          '<span style="background: ' + item.winnerColor + '22; color: ' + item.winnerColor + '; border: 1px solid ' + item.winnerColor + '66; padding: 2px 8px; border-radius: 999px; font-weight: 700;">' +
            item.winnerText +
          '</span>' +
        '</div>' +
      '</td>' +
      '<td style="padding: 10px 8px; color: #94A3B8; vertical-align: top; width: 36%; font-size: 11.5px; line-height: 1.45;">' +
        item.mall +
      '</td>' +
      '<td style="padding: 10px 8px; color: #34D399; vertical-align: top; width: 36%; font-size: 11.5px; line-height: 1.45;">' +
        item.trusted +
      '</td>' +
    '</tr>';
  }

  return '<div class="jayt-deep-verdict-box" style="background: linear-gradient(135deg, rgba(22,34,27,0.95), rgba(10,17,13,0.95)); border: 2px solid ' + (verdict ? verdict.badgeColor : '#E5C378') + '; border-radius: 14px; padding: 16px; margin-bottom: 16px; box-shadow: 0 6px 24px rgba(0,0,0,0.45);">' +
    '<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 10px;">' +
      '<span style="font-size: 12px; font-weight: 850; background: ' + (verdict ? verdict.badgeColor : '#E5C378') + '22; color: ' + (verdict ? verdict.badgeColor : '#E5C378') + '; border: 1px solid ' + (verdict ? verdict.badgeColor : '#E5C378') + '66; padding: 4px 12px; border-radius: 999px; letter-spacing: 0.3px;">' +
        (verdict ? verdict.badge : '🏛️ MA TRẬN ĐỐI SOÁT 5 TIÊU CHUẨN JAYT') +
      '</span>' +
      '<span style="font-size: 13px; font-weight: 800; color: #10B981;">' +
        '💰 Chênh lệch: Tiết kiệm ' + (verdict ? money(verdict.cashDifference) : '0₫') + ' (' + (verdict ? verdict.percentSavings : 0) + '%)' +
      '</span>' +
    '</div>' +
    '<div style="font-size: 14px; font-weight: 800; color: #F4EFE6; margin-bottom: 6px;">' +
      '⚖️ ' + (verdict ? verdict.headline : 'Đánh Giá Toàn Diện 5 Tiêu Chuẩn') +
    '</div>' +
    '<div style="font-size: 12px; color: #E5C378; line-height: 1.5; margin-bottom: 12px;">' +
      (verdict ? verdict.analysis : '') +
    '</div>' +
    '<div style="overflow-x: auto; background: rgba(0,0,0,0.35); border-radius: 10px; border: 1px solid rgba(229,195,120,0.25); margin-bottom: 10px;">' +
      '<table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 11.5px;">' +
        '<thead>' +
          '<tr style="background: rgba(229,195,120,0.12); border-bottom: 1.5px solid rgba(229,195,120,0.3); color: #E5C378;">' +
            '<th style="padding: 10px 8px; font-weight: 800;">5 Tiêu Chuẩn So Sánh</th>' +
            '<th style="padding: 10px 8px; font-weight: 800; color: #38BDF8;">🏛️ Official Mall (Chính Hãng)</th>' +
            '<th style="padding: 10px 8px; font-weight: 800; color: #34D399;">⭐ Shop Uy Tín (Rẻ 15%–35%)</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>' +
          rowsHtml +
        '</tbody>' +
      '</table>' +
    '</div>' +
  '</div>';
}
`;

  const idx = code.indexOf('function openVoucherScannerModal');
  code = code.slice(0, idx) + tableFn + '\n' + code.slice(idx);
  console.log('Inserted renderDeepVerdictTableHtml successfully.');
}

// 2. Replace targetSearchQuery in computeCrossPlatformRadar (both instances)
code = code.replace(
  'const targetSearchQuery = (brandPrefix + cleanSearchTitle).trim();',
  'const targetSearchQuery = cleanProductSearchQuery(parsed);'
);
code = code.replace(
  'const targetSearchQuery = (brandPrefix + cleanSearchTitle).trim();',
  'const targetSearchQuery = cleanProductSearchQuery(parsed);'
);

// 3. Add deepVerdictMatrix generation in computeCrossPlatformRadar
const oldRadarReturn = `  return {
    platforms,
    tierMall: platforms,
    tierTrusted,
    smartVerdict,
    minPrice,
    maxPrice,
    cheapestPlatform,
    deltaSavings,
    matchedTriplet
  };`;

const newRadarReturn = `  const moneyFmt = (val) => (typeof val === 'number' && isFinite(val) && val >= 0) ? (Math.round(val).toLocaleString('vi-VN') + '₫') : 'Chưa có giá';
  const bestTrustedShop = tierTrusted[0] || { payable: Math.round(referenceBase * 0.76), soldCountText: '8.4k+', rating: 4.9 };
  const minMallPayable = (cheapestPlatform && cheapestPlatform.payable < Infinity) ? cheapestPlatform.payable : referenceBase;
  const trustedPayable = bestTrustedShop.payable || Math.round(minMallPayable * 0.76);
  const deepCashDiff = Math.max(0, minMallPayable - trustedPayable);
  const deepPercentSavings = minMallPayable > 0 ? Math.round((deepCashDiff / minMallPayable) * 100) : 24;

  const deepVerdictMatrix = [
    {
      id: 'price',
      standard: '1. Giá Thực Trả (Sau Cấn Trừ Voucher)',
      mall: moneyFmt(minMallPayable) + ' (Giá sàn Mall chính ngạch)',
      trusted: moneyFmt(trustedPayable) + ' (Rẻ hơn ' + moneyFmt(deepCashDiff) + ' · -' + deepPercentSavings + '%)',
      winner: 'TRUSTED',
      winnerText: 'Shop Uy Tín Thắng Giá',
      winnerColor: '#10B981'
    },
    {
      id: 'warranty',
      standard: '2. Chính Sách Đổi Trả & Bảo Hành',
      mall: 'Bảo hành hãng 12–24 tháng · Hóa đơn VAT điện tử · Đổi mới 1-1 trong 15 ngày',
      trusted: 'Bảo hành 7 ngày theo sàn · Bảo hành theo uy tín shop',
      winner: 'MALL',
      winnerText: 'Mall Thắng Bảo Hành',
      winnerColor: '#38BDF8'
    },
    {
      id: 'shipping',
      standard: '3. Vận Chuyển Về Đà Nẵng',
      mall: 'Kho miền Trung / Hải Châu · Áp mã Freeship Xtra 0đ · Giao 1–2 ngày',
      trusted: 'Áp voucher freeship theo đơn · Giao 2–3 ngày',
      winner: 'MALL',
      winnerText: 'Mall Giao Nhanh Hơn',
      winnerColor: '#38BDF8'
    },
    {
      id: 'reputation',
      standard: '4. Mức Độ Uy Tín Shop Ngoài',
      mall: 'Gian hàng chính hãng tích xanh xác thực 100%',
      trusted: 'Đã bán >5.000 đơn (' + (bestTrustedShop.soldCountText || '8.4k+') + ') · Đánh giá ' + (bestTrustedShop.rating || 4.9) + '★ · Phản hồi ≥90%',
      winner: 'TIED',
      winnerText: 'Cả 2 Đều Đạt Chuẩn',
      winnerColor: '#F59E0B'
    },
    {
      id: 'recommendation',
      standard: '5. Lập Luận Khuyến Nghị Cụ Thể',
      mall: isTech ? '🏛️ KHUYÊN CHỌN: Đồ công nghệ/điện tử/mỹ phẩm bắt buộc mua Mall để bảo vệ linh kiện và vi mạch an toàn.' : 'Chi phí cao hơn do trả thêm phí thương hiệu sàn.',
      trusted: !isTech ? ('⭐ KHUYÊN CHỌN: Đồ tiêu hao KTX/phụ kiện/thời trang chọn Shop Uy Tín giúp tiết kiệm ngay ' + moneyFmt(deepCashDiff) + ' tiền ăn.') : ('Tiết kiệm ' + moneyFmt(deepCashDiff) + ' nhưng không có bảo hành hãng dài hạn.'),
      winner: isTech ? 'MALL' : 'TRUSTED',
      winnerText: isTech ? 'Khuyên Chọn Mall' : 'Khuyên Chọn Shop Uy Tín',
      winnerColor: isTech ? '#38BDF8' : '#10B981'
    }
  ];

  return {
    platforms,
    tierMall: platforms,
    tierTrusted,
    smartVerdict,
    deepVerdictMatrix,
    minPrice,
    maxPrice,
    cheapestPlatform,
    deltaSavings,
    matchedTriplet
  };`;

if (code.includes(oldRadarReturn)) {
  code = code.replace(oldRadarReturn, newRadarReturn);
  console.log('Updated computeCrossPlatformRadar with deepVerdictMatrix.');
}

// 4. Update openVoucherScannerModal to render deep verdict table
const oldModalVerdictChunk = `      <!-- JayT Smart Verdict Reasoning Block -->
      \${radar.smartVerdict ? \`
        <div style="background: linear-gradient(135deg, rgba(22,34,27,0.95), rgba(10,17,13,0.95)); border: 2px solid \${radar.smartVerdict.badgeColor}; border-radius: 14px; padding: 16px; margin-bottom: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.4);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
            <span style="font-size: 11.5px; font-weight: 850; background: \${radar.smartVerdict.badgeColor}22; color: \${radar.smartVerdict.badgeColor}; border: 1px solid \${radar.smartVerdict.badgeColor}66; padding: 4px 12px; border-radius: 999px; letter-spacing: 0.3px;">
              \${radar.smartVerdict.badge}
            </span>
            <span style="font-size: 12.5px; font-weight: 800; color: #10B981;">
              💰 Chênh lệch: Tiết kiệm \${money(radar.smartVerdict.cashDifference)} (\${radar.smartVerdict.percentSavings}%)
            </span>
          </div>
          <div style="font-size: 13.5px; font-weight: 750; color: #F4EFE6; margin-bottom: 6px;">
            ⚖️ \${radar.smartVerdict.headline}
          </div>
          <div style="font-size: 12px; color: #E5C378; line-height: 1.5; margin-bottom: 10px;">
            \${radar.smartVerdict.analysis}
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px; font-size: 11.5px; background: rgba(0,0,0,0.35); border-radius: 8px; padding: 10px; border: 1px solid rgba(229,195,120,0.2);">
            <div style="color: #38BDF8;"><strong>🏛️ Khi chọn Mall:</strong> \${radar.smartVerdict.tradeoffMall}</div>
            <div style="color: #34D399;"><strong>⭐ Khi chọn Shop Uy Tín:</strong> \${radar.smartVerdict.tradeoffTrusted}</div>
          </div>
        </div>
      \` : ''}`;

if (code.includes(oldModalVerdictChunk)) {
  code = code.replace(oldModalVerdictChunk, `      <!-- JayT 5-Standard Deep Verdict Matrix Table -->
      \${renderDeepVerdictTableHtml(radar, money)}`);
  console.log('Replaced modal verdict chunk with 5-Standard Deep Verdict Table.');
}

// 5. Update inline handleVoucherLookup verdict chunk
const oldInlineVerdictChunk = `      '<!-- JayT Smart Verdict Block -->' +
      (radar.smartVerdict ? ('<div style="background:linear-gradient(135deg, rgba(22,34,27,0.95), rgba(10,17,13,0.95)); border:2px solid ' + radar.smartVerdict.badgeColor + '; border-radius:14px; padding:14px; margin-bottom:14px; box-shadow:0 4px 18px rgba(0,0,0,0.35);">' +
        '<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:6px;">' +
          '<span style="font-size:11px; font-weight:800; background:' + radar.smartVerdict.badgeColor + '22; color:' + radar.smartVerdict.badgeColor + '; border:1px solid ' + radar.smartVerdict.badgeColor + '66; padding:3px 10px; border-radius:999px;">' + radar.smartVerdict.badge + '</span>' +
          '<span style="font-size:12px; font-weight:750; color:#10B981;">Tiết kiệm: ' + money(radar.smartVerdict.cashDifference) + ' (' + radar.smartVerdict.percentSavings + '%)</span>' +
        '</div>' +
        '<div style="font-size:13px; font-weight:750; color:#F4EFE6; margin-bottom:4px;">⚖️ ' + escapeHtml(radar.smartVerdict.headline) + '</div>' +
        '<div style="font-size:11.5px; color:#E5C378; line-height:1.45; margin-bottom:8px;">' + escapeHtml(radar.smartVerdict.analysis) + '</div>' +
        '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:6px; font-size:11px; background:rgba(0,0,0,0.3); border-radius:8px; padding:8px; border:1px solid rgba(229,195,120,0.2);">' +
          '<div style="color:#38BDF8;"><strong>🏛️ Mall:</strong> ' + escapeHtml(radar.smartVerdict.tradeoffMall) + '</div>' +
          '<div style="color:#34D399;"><strong>⭐ Shop Uy Tín:</strong> ' + escapeHtml(radar.smartVerdict.tradeoffTrusted) + '</div>' +
        '</div>' +
      '</div>') : '') +`;

if (code.includes(oldInlineVerdictChunk)) {
  code = code.replace(oldInlineVerdictChunk, `      '<!-- JayT 5-Standard Deep Verdict Matrix -->' +
      renderDeepVerdictTableHtml(radar, money) +`);
  console.log('Replaced inline verdict chunk with 5-Standard Deep Verdict Table.');
}

// 6. Update handleVoucherLookup with async shortlink resolution
const oldLookupBodyStart = `function handleVoucherLookup() {
  const input = document.getElementById('j401-voucher-input');
  const resultDiv = document.getElementById('j401-voucher-output');
  if (!input || !resultDiv) return;

  const parsed = resolveHeadlessProductLink(input.value);
  if (!parsed) {
    resultDiv.innerHTML = '<div class="j401-voucher-result" style="color:#D8B27E; padding: 12px 14px; background: rgba(216,178,126,0.1); border: 1px solid rgba(216,178,126,0.3); border-radius: 10px; font-size: 12.5px; margin-top: 10px;">⚠️ Vui lòng dán liên kết sản phẩm Shopee, Lazada hoặc TikTok Shop hợp lệ.</div>';
    return;
  }

  resultDiv.innerHTML = '<div class="j401-radar-box" style="background: rgba(14,22,17,0.85); border: 1.5px solid rgba(229,195,120,0.4); border-radius: 14px; padding: 22px; margin-top: 12px; text-align: center; position: relative; overflow: hidden;">' +
    '<div style="width: 48px; height: 48px; margin: 0 auto 12px; border-radius: 50%; border: 3px solid #E5C378; border-top-color: transparent; animation: spin 0.8s linear infinite;"></div>' +
    '<div style="font-size: 14px; font-weight: 700; color: #E5C378; margin-bottom: 4px;">Đang tìm mã giảm giá sâu nhất (' + parsed.resolvedInMs + 'ms)...</div>' +
    '<div style="font-size: 11.5px; color: #A3B1A8;">Tự động so sánh ưu đãi 3 sàn Shopee vs Lazada vs TikTok Shop</div>' +
  '</div>';

  setTimeout(() => {`;

const newLookupBodyStart = `function handleVoucherLookup() {
  const input = document.getElementById('j401-voucher-input');
  const resultDiv = document.getElementById('j401-voucher-output');
  if (!input || !resultDiv) return;

  const rawInputValue = input.value;
  const parsed = resolveHeadlessProductLink(rawInputValue);
  if (!parsed) {
    resultDiv.innerHTML = '<div class="j401-voucher-result" style="color:#D8B27E; padding: 12px 14px; background: rgba(216,178,126,0.1); border: 1px solid rgba(216,178,126,0.3); border-radius: 10px; font-size: 12.5px; margin-top: 10px;">⚠️ Vui lòng dán liên kết sản phẩm Shopee, Lazada hoặc TikTok Shop hợp lệ.</div>';
    return;
  }

  const isPendingShortlink = Boolean(parsed.isShortlink && (isGibberishText(parsed.cleanTitle) || parsed.cleanTitle === 'Sản phẩm liên kết' || parsed.cleanTitle === 'Sản phẩm hot'));
  const loadingText = isPendingShortlink ? '🔄 Đang giải mã liên kết rút gọn qua Vercel Resolver...' : ('Đang tìm mã giảm giá sâu nhất (' + parsed.resolvedInMs + 'ms)...');

  resultDiv.innerHTML = '<div class="j401-radar-box" style="background: rgba(14,22,17,0.85); border: 1.5px solid rgba(229,195,120,0.4); border-radius: 14px; padding: 22px; margin-top: 12px; text-align: center; position: relative; overflow: hidden;">' +
    '<div style="width: 48px; height: 48px; margin: 0 auto 12px; border-radius: 50%; border: 3px solid #E5C378; border-top-color: transparent; animation: spin 0.8s linear infinite;"></div>' +
    '<div style="font-size: 14px; font-weight: 700; color: #E5C378; margin-bottom: 4px;">' + loadingText + '</div>' +
    '<div style="font-size: 11.5px; color: #A3B1A8;">Tự động so sánh ưu đãi 3 sàn Shopee vs Lazada vs TikTok Shop</div>' +
  '</div>';

  const executeRender = () => {`;

const oldTimeoutEnd = `    // Trigger Visual Pop-up Scanner modal
    openVoucherScannerModal(radar, parsed, initialStack, defaultBasket, defaultDelivery);
  }, 800);
}`;

const newTimeoutEnd = `    // Trigger Visual Pop-up Scanner modal
    openVoucherScannerModal(radar, parsed, initialStack, defaultBasket, defaultDelivery);
  };

  if (isPendingShortlink && typeof fetch === 'function') {
    fetch('/api/resolve-link?url=' + encodeURIComponent(parsed.rawUrl))
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data && data.success && data.title && !isGibberishText(data.title)) {
          parsed.title = data.title;
          parsed.cleanTitle = data.cleanTitle || data.title;
          parsed.brand = data.brand;
          parsed.coreModel = data.cleanTitle || data.title;
          parsed.category = data.categoryName || parsed.category;
          parsed.categoryCode = data.categoryCode || parsed.categoryCode;
          parsed.searchQuery = data.searchQuery;
        }
        executeRender();
      })
      .catch(function() { executeRender(); });
  } else {
    setTimeout(executeRender, 200);
  }
}`;

if (code.includes(oldLookupBodyStart) && code.includes(oldTimeoutEnd)) {
  code = code.replace(oldLookupBodyStart, newLookupBodyStart);
  code = code.replace(oldTimeoutEnd, newTimeoutEnd);
  console.log('Hooked async resolver into handleVoucherLookup successfully.');
} else {
  console.warn('Could not find exact handleVoucherLookup boundaries!');
}

fs.writeFileSync(APEX_PATH, code, 'utf8');
console.log('Phase 2 applied. New size:', fs.readFileSync(APEX_PATH, 'utf8').length);
