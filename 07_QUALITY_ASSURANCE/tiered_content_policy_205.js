/**
 * JAYT-205 TIERED CONTENT POLICY ENGINE
 * Implements CEO Directive JAYT-205 for 30-50 Daily Savings Cards
 */

const TIER_DEFINITIONS = {
  TIER_GREEN_CONFIRMED: {
    code: 'GREEN_CONFIRMED',
    icon: '🟢',
    name: 'Deal đã xác nhận',
    badge: 'Dùng ngay tại Đà Nẵng',
    badge_style: 'background:#ECFDF5; color:#065F46; border:1px solid #A7F3D0;',
    requires_danang_locality: true,
    requires_terms: true,
    requires_validity: true,
    requires_verbatim_quote: true,
    ttl_days: 7
  },
  TIER_BLUE_OFFICIAL: {
    code: 'BLUE_OFFICIAL',
    icon: '🔵',
    name: 'Ưu đãi chính thức',
    badge: 'Ưu đãi chính thức · kiểm tra phạm vi/tài khoản',
    badge_style: 'background:#EFF6FF; color:#1E40AF; border:1px solid #BFDBFE;',
    requires_danang_locality: false, // Brand has presence, but promo is brand-wide official
    requires_terms: false,
    requires_validity: false,
    requires_verbatim_quote: true,
    ttl_days: 7
  },
  TIER_ORANGE_FLASH: {
    code: 'ORANGE_FLASH',
    icon: '🟠',
    name: 'Flash deal / voucher biến động',
    badge: 'Flash deal · tùy tài khoản/khu vực · kiểm tra trước khi thanh toán',
    badge_style: 'background:#FFF7ED; color:#C2410C; border:1px solid #FFEDD5;',
    requires_danang_locality: false,
    requires_terms: false,
    requires_validity: false,
    requires_verbatim_quote: true,
    ttl_hours: 24
  },
  TIER_PURPLE_VENUE: {
    code: 'PURPLE_VENUE',
    icon: '🟣',
    name: 'Điểm hẹn giá tốt',
    badge: 'Điểm hẹn đã xác minh · giá/ưu đãi kiểm tra tại quán',
    badge_style: 'background:#FAF5FF; color:#6B21A8; border:1px solid #E9D5FF;',
    requires_danang_locality: true,
    requires_terms: false,
    requires_validity: false,
    requires_verbatim_quote: false,
    ttl_days: 30
  },
  TIER_WHITE_RADAR: {
    code: 'WHITE_RADAR',
    icon: '⚪',
    name: 'Radar cộng đồng',
    badge: 'Tín hiệu cộng đồng · đang xác minh',
    badge_style: 'background:#F3F4F6; color:#4B5563; border:1px solid #E5E7EB;',
    requires_danang_locality: false,
    requires_terms: false,
    requires_validity: false,
    requires_verbatim_quote: false,
    ttl_hours: 72
  }
};

function validateCardByTier(card) {
  if (!card || !card.tier) return { valid: false, reason: 'Missing tier' };
  const def = TIER_DEFINITIONS[card.tier];
  if (!def) return { valid: false, reason: `Unknown tier ${card.tier}` };

  if (!card.title || card.title.trim().length === 0) {
    return { valid: false, reason: 'Missing title' };
  }
  if (!card.brand || card.brand.trim().length === 0) {
    return { valid: false, reason: 'Missing brand' };
  }
  if (!card.source_url || card.source_url.trim().length === 0) {
    return { valid: false, reason: 'Missing source_url' };
  }

  if (def.requires_verbatim_quote && (!card.offer_quote || card.offer_quote.trim().length === 0)) {
    return { valid: false, reason: `Tier ${def.name} requires verbatim offer_quote` };
  }

  if (def.requires_danang_locality && (!card.danang_address && !card.locality_quote)) {
    return { valid: false, reason: `Tier ${def.name} requires Da Nang address/locality` };
  }

  return { valid: true };
}

module.exports = {
  TIER_DEFINITIONS,
  validateCardByTier
};
