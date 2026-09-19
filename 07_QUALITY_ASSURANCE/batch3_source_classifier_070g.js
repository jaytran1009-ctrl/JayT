/**
 * JAYT SOURCE-LEVEL CLASSIFIER ENGINE (070G)
 * Directive: JAYT-070G — CLASSIFIER ROOT-FIX + BATCH 3 RECLASSIFICATION
 * Implements strict hierarchical fail-closed source classification.
 */

const fs = require('fs');
const path = require('path');

const DANANG_DISTRICT_REGEX = /\b(đà nẵng|da nang|hải châu|thanh khê|sơn trà|ngũ hành sơn|cẩm lệ|liên chiểu|hòa vang|helio center|478 điện biên phủ|255 hùng vương|07 nguyễn văn linh|25 nguyễn văn linh|225 nguyễn văn thoại|lotte mart đà nẵng|coopmart đà nẵng|co\.opmart đà nẵng)\b/i;

const DEAD_ROUTE_URL_REGEX = /\b(404|page-not-found|cannot-be-found|not-found|error|aspxerrorpath)\b/i;

const DEAD_ROUTE_TEXT_REGEX = /(?:404\s*[-–:]?\s*(?:not found|không tìm thấy)|the page (?:which )?you are looking for (?:is not found|cannot be found)|server error in '\/' application|http 404|nội dung trang không tìm thấy|không tìm thấy trang|trang này không thể được tìm thấy|error page not found)/i;

const PROMO_OFFER_REGEX = /\b(đồng giá\s*\d+|giảm\s*\d+%|combo\s*\d+|ưu đãi\s*\d+|giá vé\s*\d+|\d{1,3}(?:\.\d{3})+\s*(?:đ|₫|vnd|k)\b|super monday|u22 vui vẻ|happy day|deal đôi|menu chay)/i;

/**
 * Classifies a captured target based strictly on actual final URL, text, and html.
 * Execution Order:
 * 1. DEAD_ROUTE (404 / server error / not found)
 * 2. BLANK (0 length / about:blank)
 * 3. REDIRECT (redirected away to homepage without data)
 * 4. AUTH_WALL (login required)
 * 5. PROMO_SOURCE (promotional content / offer terms)
 * 6. LOCALITY_SOURCE (explicit verified Da Nang address / store block)
 * 7. NO_VERIFIED_DANANG_LOCALITY (store locator without Da Nang text)
 * 8. NO_PUBLIC_PROMO (general brand home / news without discounts)
 */
function classifySource070g(params) {
  const {
    targetId = '',
    brand = '',
    requestedUrl = '',
    finalUrl = '',
    textContent = '',
    htmlContent = '',
    expectedType = ''
  } = params;

  const text = (textContent || '').trim();
  const lowerText = text.toLowerCase();
  const lowerUrl = (finalUrl || '').toLowerCase();

  // 1. DEAD_ROUTE Priority
  if (DEAD_ROUTE_URL_REGEX.test(lowerUrl) || DEAD_ROUTE_TEXT_REGEX.test(text) || lowerText.includes("server error in '/' application") || text.includes('404') && (text.includes('not found') || text.includes('không tìm thấy') || text.length < 400 && lowerText.includes('404'))) {
    return {
      classification: 'DEAD_ROUTE',
      triage: 'RED',
      is_eligible: false,
      reason: `Đường dẫn trả về lỗi route, 404 hoặc server error (${text.length} ký tự).`,
      snippet: text.slice(0, 150).replace(/\s+/g, ' ')
    };
  }

  // 2. BLANK Priority
  if (lowerUrl === 'about:blank' || text.length === 0) {
    return {
      classification: 'BLANK',
      triage: 'RED',
      is_eligible: false,
      reason: 'Trang client-side rendering trả về rỗng (0 bytes text).',
      snippet: ''
    };
  }

  // 3. REDIRECT Priority
  if (requestedUrl && finalUrl !== requestedUrl && (lowerUrl.endsWith('/') || !lowerUrl.includes(targetId.toLowerCase().replace(/b3_|_/g, '')))) {
    if (text.length < 600 && !PROMO_OFFER_REGEX.test(text) && !DANANG_DISTRICT_REGEX.test(text)) {
      return {
        classification: 'REDIRECT',
        triage: 'RED',
        is_eligible: false,
        reason: `Tự chuyển hướng về trang khác (${finalUrl}), không chứa dữ liệu nguồn kỳ vọng (${text.length} ký tự).`,
        snippet: text.slice(0, 150).replace(/\s+/g, ' ')
      };
    }
  }

  // 4. AUTH_WALL Priority
  if (/vui lòng đăng nhập để tiếp tục|yêu cầu xác thực tài khoản|đăng nhập để xem/i.test(text)) {
    return {
      classification: 'AUTH_WALL',
      triage: 'RED',
      is_eligible: false,
      reason: 'Trang yêu cầu đăng nhập / xác thực nội bộ.',
      snippet: text.slice(0, 150).replace(/\s+/g, ' ')
    };
  }

  // 5. PROMO_SOURCE Check (Priority for pages intended or containing promotional offers)
  const isPromoOffer = PROMO_OFFER_REGEX.test(text) || expectedType.includes('PROMO');
  const isStrictLocator = expectedType === 'STORE_LOCATOR' || (lowerUrl.includes('danh-sach-cua-hang') || lowerUrl.includes('cua-hang') || lowerUrl.includes('rap-gia-ve')) && !isPromoOffer;

  if (isPromoOffer && !isStrictLocator) {
    const promoMatch = text.match(PROMO_OFFER_REGEX);
    const promoSnippet = promoMatch
      ? text.slice(Math.max(0, text.indexOf(promoMatch[0]) - 20), Math.min(text.length, text.indexOf(promoMatch[0]) + 140)).replace(/\s+/g, ' ')
      : text.slice(0, 150).replace(/\s+/g, ' ');

    return {
      classification: 'PROMO_SOURCE',
      triage: 'AMBER',
      is_eligible: true,
      reason: 'Trang chứa nội dung chương trình khuyến mãi / ưu đãi văn bản.',
      snippet: promoSnippet
    };
  }

  // 6. LOCALITY_SOURCE Check (Strict Da Nang verification on verified store pages)
  const hasDaNangProof = DANANG_DISTRICT_REGEX.test(text);

  if (hasDaNangProof) {
    const match = text.match(DANANG_DISTRICT_REGEX);
    const matchIdx = match ? text.indexOf(match[0]) : 0;
    const snippetStart = Math.max(0, matchIdx - 40);
    const snippetEnd = Math.min(text.length, matchIdx + 120);
    const daNangSnippet = text.slice(snippetStart, snippetEnd).replace(/\s+/g, ' ');

    return {
      classification: 'LOCALITY_SOURCE',
      triage: 'AMBER',
      is_eligible: true,
      reason: 'Trang danh mục cửa hàng / địa điểm có chứa bằng chứng địa chỉ tại Đà Nẵng.',
      snippet: daNangSnippet
    };
  }

  // 7. Locator without Da Nang Proof
  if (expectedType === 'STORE_LOCATOR' || isStrictLocator) {
    return {
      classification: 'NO_VERIFIED_DANANG_LOCALITY',
      triage: 'AMBER',
      is_eligible: false,
      reason: 'Trang danh mục / cửa hàng nhưng không tìm thấy địa chỉ hoặc chi nhánh tại Đà Nẵng.',
      snippet: text.slice(0, 150).replace(/\s+/g, ' ')
    };
  }

  // 8. NO_PUBLIC_PROMO / Fallback
  return {
    classification: 'NO_PUBLIC_PROMO',
    triage: 'AMBER',
    is_eligible: false,
    reason: 'Trang thông tin chung / tin tức không có chiết khấu hoặc ưu đãi giá công khai.',
    snippet: text.slice(0, 150).replace(/\s+/g, ' ')
  };
}

module.exports = {
  classifySource070g,
  DANANG_DISTRICT_REGEX,
  DEAD_ROUTE_TEXT_REGEX
};
