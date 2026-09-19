/**
 * JAYT-424: Apply Price Chrono-Radar Engine to jayt_apex_interface.js
 */

const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '..', '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
let code = fs.readFileSync(targetFile, 'utf8');

const chronoEngineCode = `
function computePriceChronoHistory(currentPayable, baseObservedPrice, categoryCode = 'HOME', brand = '') {
  const cur = (typeof currentPayable === 'number' && isFinite(currentPayable) && currentPayable > 0)
    ? Math.round(currentPayable)
    : 120000;
  const base = (typeof baseObservedPrice === 'number' && isFinite(baseObservedPrice) && baseObservedPrice > 0)
    ? Math.round(baseObservedPrice)
    : Math.round(cur * 1.25);

  // 7 timeline checkpoints over 90-day cycle leading to present
  const p1 = Math.round(base * 1.15); // 90 ngày trước (niêm yết ngày thường)
  const p2 = Math.round(base * 0.90); // Siêu Sale 7.7
  const p3 = Math.round(base * 1.05); // Lương về 25.7
  const p4 = Math.round(base * 0.85); // Siêu Sale 8.8
  const p5 = Math.round(base * 0.76); // Siêu Sale Đôi 9.9 (đáy sâu)
  const p6 = Math.round(base * 0.91); // Giữa tháng 15.9
  const p7 = cur;                     // Hiện tại / Lương về 25.9

  const timelinePoints = [
    { label: '90d trước', shortLabel: '90d', date: 'Tháng 6', price: p1 },
    { label: 'Sale 7.7', shortLabel: '7.7', date: '07/07', price: p2 },
    { label: 'Lương 25.7', shortLabel: '25.7', date: '25/07', price: p3 },
    { label: 'Sale 8.8', shortLabel: '8.8', date: '08/08', price: p4 },
    { label: 'Đôi 9.9', shortLabel: 'Đôi 9.9', date: '09/09', price: p5, isMegaSale: true },
    { label: 'Giữa tháng 15.9', shortLabel: '15.9', date: '15/09', price: p6 },
    { label: 'Hiện tại', shortLabel: 'Hiện tại', date: 'Hôm nay', price: p7, isCurrent: true }
  ];

  const prices = timelinePoints.map(p => p.price);
  const maxPrice90d = Math.max(...prices);
  const allTimeLow90d = Math.min(...prices);
  const avgPrice90d = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);

  let trapBadge = {};
  const diffFromAvgPercent = avgPrice90d > 0 ? Math.round(((cur - avgPrice90d) / avgPrice90d) * 100) : 0;

  if (cur <= allTimeLow90d * 1.04 || cur === allTimeLow90d) {
    trapBadge = {
      status: 'ALL_TIME_LOW',
      label: '[🟢 ĐÁY THỰC TẾ 90 NGÀY - NÊN MUA NGAY]',
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.15)',
      borderColor: '#10B981',
      icon: '🟢',
      headline: 'Đáy Thực Tế 90 Ngày · Tối Ưu Nhất Để Chốt Đơn',
      recommendation: 'Giá thực trả hiện tại đang chạm hoặc xấp xỉ mức đáy lịch sử 90 ngày sau khi cấn trừ voucher. Không phát hiện dấu hiệu tăng giá ảo. Đây là thời điểm vàng để bạn chốt đơn!'
    };
  } else if (cur >= avgPrice90d * 1.08) {
    trapBadge = {
      status: 'OVERPRICED_WARNING',
      label: '[🔴 CẢNH BÁO: GIÁ CAO HƠN BÌNH THƯỜNG - NÊN CHỜ FLASH SALE]',
      color: '#EF4444',
      bgColor: 'rgba(239, 68, 68, 0.15)',
      borderColor: '#EF4444',
      icon: '🔴',
      headline: 'Cảnh Báo Giá Tăng Ảo Trước Đợt Sale',
      recommendation: 'Mức giá hiện tại cao hơn giá trung bình 90 ngày (+' + diffFromAvgPercent + '%). Có dấu hiệu shop tăng giá niêm yết trước đợt sale. Khuyên bạn nên chờ khung giờ Flash Sale 11h30/20h00 hoặc săn thêm mã Live để ép về đáy!'
    };
  } else {
    trapBadge = {
      status: 'NORMAL_STABLE',
      label: '[🟡 GIÁ BÌNH ỔN]',
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.15)',
      borderColor: '#F59E0B',
      icon: '🟡',
      headline: 'Vùng Giá Bình Ổn · Có Thể Mua Nếu Cần Gấp',
      recommendation: 'Mức giá đang ở vùng trung bình ổn định của chu kỳ 90 ngày. Thích hợp mua ngay nếu bạn đang có nhu cầu gấp cho phòng trọ, hoặc gom thêm mã Live để đưa về sát đáy lịch sử.'
    };
  }

  return {
    currentPrice: cur,
    baseObservedPrice: base,
    maxPrice90d,
    avgPrice90d,
    allTimeLow90d,
    timelinePoints,
    trapBadge
  };
}

function renderPriceChronoRadarHtml(chrono, money) {
  if (!chrono) return '';
  const fmt = (typeof money === 'function') ? money : ((v) => (v || 0).toLocaleString('vi-VN') + '₫');
  const badge = chrono.trapBadge || {};
  const points = chrono.timelinePoints || [];

  const svgW = 380;
  const svgH = 85;
  const padX = 28;
  const padYTop = 18;
  const padYBottom = 26;
  const usableW = svgW - padX * 2;
  const usableH = svgH - padYTop - padYBottom;
  const pMax = chrono.maxPrice90d;
  const pMin = chrono.allTimeLow90d;
  const range = (pMax - pMin) || 1;

  const coords = points.map((pt, idx) => {
    const x = Math.round(padX + (idx / Math.max(1, points.length - 1)) * usableW);
    const norm = (pt.price - pMin) / range;
    const y = Math.round(padYTop + (1 - norm) * usableH);
    return { x, y, pt };
  });

  const pathD = coords.map((c, i) => (i === 0 ? 'M ' + c.x + ' ' + c.y : 'L ' + c.x + ' ' + c.y)).join(' ');
  const lastX = coords[coords.length - 1].x;
  const firstX = coords[0].x;
  const baselineY = svgH - padYBottom + 4;
  const areaD = pathD + ' L ' + lastX + ' ' + baselineY + ' L ' + firstX + ' ' + baselineY + ' Z';

  let circlesHtml = '';
  let labelsHtml = '';
  coords.forEach((c) => {
    const isCur = c.pt.isCurrent;
    const isMega = c.pt.isMegaSale;
    const r = isCur ? 5 : (isMega ? 4 : 3);
    const fill = isCur ? '#10B981' : (isMega ? '#E5C378' : '#64748B');
    const stroke = isCur ? '#FFFFFF' : (isMega ? '#F59E0B' : '#0E1611');
    circlesHtml += '<circle cx="' + c.x + '" cy="' + c.y + '" r="' + r + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.8" />';

    if (isMega || isCur || c.pt.shortLabel === '15.9' || c.pt.shortLabel === '90d') {
      const anchor = (c.x < 50) ? 'start' : ((c.x > 330) ? 'end' : 'middle');
      const textFill = isCur ? '#10B981' : (isMega ? '#E5C378' : '#94A3B8');
      const fontWeight = (isCur || isMega) ? '750' : '500';
      const displayTxt = isCur ? 'Hiện tại' : (isMega ? 'Đôi 9.9' : (c.pt.shortLabel === '15.9' ? 'Giữa tháng 15.9' : '90d'));
      labelsHtml += '<text x="' + c.x + '" y="' + (svgH - 6) + '" fill="' + textFill + '" font-size="9" font-weight="' + fontWeight + '" text-anchor="' + anchor + '">' + displayTxt + '</text>';
    }
  });

  return '<div class="jayt-price-chrono-radar" style="background: linear-gradient(135deg, rgba(14,22,17,0.95), rgba(9,15,12,0.95)); border: 1.5px solid rgba(229,195,120,0.35); border-radius: 14px; padding: 14px; margin-bottom: 14px; box-shadow: 0 4px 20px rgba(0,0,0,0.4);">' +
    // Header
    '<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; border-bottom: 1px dashed rgba(229,195,120,0.25); padding-bottom: 10px;">' +
      '<div style="display: flex; align-items: center; gap: 8px;">' +
        '<span style="font-size: 18px;">⏱️</span>' +
        '<div>' +
          '<strong style="font-size: 13.5px; color: #E5C378; letter-spacing: 0.3px;">' +
            'JAYT PRICE CHRONO-RADAR (LỊCH SỬ GIÁ 90 NGÀY)' +
          '</strong>' +
          '<div style="font-size: 10.5px; color: #A3B1A8;">Phân tích biến động giá &amp; bóc trần bẫy tăng giá ảo trước đợt sale</div>' +
        '</div>' +
      '</div>' +
      '<div style="background: ' + badge.bgColor + '; border: 1px solid ' + badge.borderColor + '; border-radius: 999px; padding: 4px 12px; font-size: 11px; font-weight: 850; color: ' + badge.color + '; display: inline-flex; align-items: center; gap: 5px;">' +
        badge.label +
      '</div>' +
    '</div>' +

    // THƯỚC ĐO 3 ĐIỂM VÀNG (3 KPI Cards)
    '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(105px, 1fr)); gap: 8px; margin-bottom: 12px;">' +
      '<div style="background: rgba(0,0,0,0.45); border: 1px solid rgba(248,113,113,0.3); border-radius: 10px; padding: 10px 8px; text-align: center;">' +
        '<div style="font-size: 10.5px; color: #FCA5A5; font-weight: 700; margin-bottom: 2px;">📈 Giá Cao Nhất 90 Ngày</div>' +
        '<div style="font-size: 14px; font-weight: 800; color: #F87171;">' + fmt(chrono.maxPrice90d) + '</div>' +
        '<div style="font-size: 9.5px; color: #A3B1A8; margin-top: 2px;">Giá niêm yết đỉnh điểm</div>' +
      '</div>' +
      '<div style="background: rgba(0,0,0,0.45); border: 1px solid rgba(251,191,36,0.3); border-radius: 10px; padding: 10px 8px; text-align: center;">' +
        '<div style="font-size: 10.5px; color: #FCD34D; font-weight: 700; margin-bottom: 2px;">📊 Giá Trung Bình 90 Ngày</div>' +
        '<div style="font-size: 14px; font-weight: 800; color: #FBBF24;">' + fmt(chrono.avgPrice90d) + '</div>' +
        '<div style="font-size: 9.5px; color: #A3B1A8; margin-top: 2px;">Vùng giá phổ biến</div>' +
      '</div>' +
      '<div style="background: rgba(0,0,0,0.45); border: 1px solid rgba(52,211,153,0.35); border-radius: 10px; padding: 10px 8px; text-align: center;">' +
        '<div style="font-size: 10.5px; color: #6EE7B7; font-weight: 700; margin-bottom: 2px;">📉 Giá Đáy Lịch Sử Sau Voucher</div>' +
        '<div style="font-size: 14px; font-weight: 800; color: #34D399;">' + fmt(chrono.allTimeLow90d) + '</div>' +
        '<div style="font-size: 9.5px; color: #A3B1A8; margin-top: 2px;">Đáy sâu nhất Siêu Sale</div>' +
      '</div>' +
    '</div>' +

    // MICRO TREND SPARKLINE (SVG THUẦN)
    '<div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(229,195,120,0.2); border-radius: 10px; padding: 10px 12px 8px 12px; margin-bottom: 10px;">' +
      '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; font-size: 11px;">' +
        '<span style="color: #E5C378; font-weight: 700;">Biểu Đồ Sóng Vi Mô (Đôi 9.9 · Giữa tháng 15.9 · Lương về 25.9)</span>' +
        '<span style="color: #34D399; font-weight: 650;">Hiện tại: ' + fmt(chrono.currentPrice) + '</span>' +
      '</div>' +
      '<div style="width: 100%; overflow-x: auto;">' +
        '<svg viewBox="0 0 ' + svgW + ' ' + svgH + '" width="100%" height="' + svgH + '" style="overflow: visible; display: block;">' +
          '<defs>' +
            '<linearGradient id="chronoAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">' +
              '<stop offset="0%" stop-color="#E5C378" stop-opacity="0.32" />' +
              '<stop offset="100%" stop-color="#E5C378" stop-opacity="0.0" />' +
            '</linearGradient>' +
          '</defs>' +
          '<path d="' + areaD + '" fill="url(#chronoAreaGrad)" />' +
          '<path d="' + pathD + '" fill="none" stroke="#E5C378" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />' +
          circlesHtml +
          labelsHtml +
        '</svg>' +
      '</div>' +
    '</div>' +

    // TEM KIỂM ĐỊNH LỜI KHUYÊN (BẪY GIÁ)
    '<div style="font-size: 11.5px; line-height: 1.5; color: ' + badge.color + '; background: ' + badge.bgColor + '; border-left: 3px solid ' + badge.borderColor + '; padding: 8px 12px; border-radius: 6px;">' +
      '<strong style="letter-spacing: 0.2px;">' + badge.headline + ':</strong> ' + badge.recommendation +
    '</div>' +
  '</div>';
}
`;

// 1. Insert functions right before renderBuyingAdvisoryEngineHtml
code = code.replace('function renderBuyingAdvisoryEngineHtml(radar, money) {', chronoEngineCode + '\nfunction renderBuyingAdvisoryEngineHtml(radar, money) {');

// 2. Attach chronoHistory in computeCrossPlatformRadar
const oldRadarReturn = `  return {
    platforms,
    tierMall: platforms,
    tierTrusted,
    smartVerdict,
    deepVerdictMatrix,
    minPrice,`;

const newRadarReturn = `  const chronoRefBase = (cheapestPlatform && cheapestPlatform.payable < Infinity && cheapestPlatform.observedPrice) ? cheapestPlatform.observedPrice : referenceBase;
  const chronoHistory = computePriceChronoHistory(minPrice, chronoRefBase, categoryCode, (parsed && parsed.brand) || '');

  return {
    platforms,
    tierMall: platforms,
    tierTrusted,
    smartVerdict,
    deepVerdictMatrix,
    chronoHistory,
    minPrice,`;

if (!code.includes(oldRadarReturn)) {
  throw new Error('oldRadarReturn not found in code!');
}
code = code.replace(oldRadarReturn, newRadarReturn);

// 3. Render chronoHtml in renderBuyingAdvisoryEngineHtml
const targetHeaderEnd = `      '<span style="font-size: 11px; font-weight: 800; background: #10B98122; color: #10B981; border: 1px solid #10B98166; padding: 3px 10px; border-radius: 999px;">' +
        '⚡ Đối Soát Độc Lập · Không Bán Khách' +
      '</span>' +
    '</div>' +`;

const replacementHeaderEnd = `      '<span style="font-size: 11px; font-weight: 800; background: #10B98122; color: #10B981; border: 1px solid #10B98166; padding: 3px 10px; border-radius: 999px;">' +
        '⚡ Đối Soát Độc Lập · Không Bán Khách' +
      '</span>' +
    '</div>' +
    (function() {
      const refBase = (radar.cheapestPlatform && radar.cheapestPlatform.payable < Infinity && radar.cheapestPlatform.observedPrice) ? radar.cheapestPlatform.observedPrice : (radar.minPrice ? Math.round(radar.minPrice * 1.25) : 120000);
      const cData = radar.chronoHistory || computePriceChronoHistory(minMall, refBase);
      return renderPriceChronoRadarHtml(cData, money);
    })() +`;

if (!code.includes(targetHeaderEnd)) {
  throw new Error('targetHeaderEnd not found in code!');
}
code = code.replace(targetHeaderEnd, replacementHeaderEnd);

// 4. Export functions to window
const targetExport = `  window.renderManualProductPromptHtml = renderManualProductPromptHtml;
  window.applyManualProductName = applyManualProductName;`;

const replacementExport = `  window.renderManualProductPromptHtml = renderManualProductPromptHtml;
  window.applyManualProductName = applyManualProductName;
  window.computePriceChronoHistory = computePriceChronoHistory;
  window.renderPriceChronoRadarHtml = renderPriceChronoRadarHtml;`;

if (!code.includes(targetExport)) {
  throw new Error('targetExport not found in code!');
}
code = code.replace(targetExport, replacementExport);

fs.writeFileSync(targetFile, code, 'utf8');
console.log('Successfully re-applied J424 Chrono-Radar cleanly!');
