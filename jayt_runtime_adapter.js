/**
 * ============================================================================
 * JAYT APEX v5.1 — SSOT RUNTIME ENGINE (PRODUCTION CANDIDATE BUNDLE)
 * ============================================================================
 * Core Architecture: v4.6 Golden Master (SSOT Bất Biến)
 * Data Integrity: Provenance Core (TF-PROV-001..008) + Atomic Map Swap
 * Intelligence Layer: P0 Deal Intelligence Engine v1.0 (Hardened)
 * Security Standard: OWASP XSS Sanitization & Canonical Schema Lock
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 🔒 1. CANONICAL SCHEMA & SECURITY HELPERS
  // ==========================================================================

  const CANONICAL_DEAL_FIELDS = Object.freeze([
    'id',
    'title',
    'merchant_name',
    'min_order',
    'valid_until',
    'is_active',
    'distance_km',
    'base_price',
    'sale_price',
    'trust_score',
    'partner_link'
  ]);

  /**
   * OWASP XSS Sanitizer Helper (P0 Security Invariant)
   */
  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    if (typeof str !== 'string') return String(str);
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Universal ISO 8601 & Leap Year Calendar Validator
   */
  function isCalendarDateValid(year, month, day) {
    if (month < 1 || month > 12) return false;
    if (day < 1) return false;
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const maxDays = (month === 2 && isLeapYear) ? 29 : daysInMonth[month - 1];
    return day <= maxDays;
  }

  function parseCanonicalTimestamp(validUntil) {
    if (validUntil === null || validUntil === undefined) return null;

    if (typeof validUntil === 'number') {
      if (Number.isSafeInteger(validUntil) && validUntil >= 0) return validUntil;
      return null;
    }

    if (typeof validUntil === 'string') {
      const trimmed = validUntil.trim();
      const isoRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{1,3})?(Z|([+-])(0[0-9]|1[0-4]):([0-5][0-9]))$/;
      const match = trimmed.match(isoRegex);
      if (!match) return null;

      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10);
      const day = parseInt(match[3], 10);
      const hours = parseInt(match[4], 10);
      const minutes = parseInt(match[5], 10);
      const seconds = parseInt(match[6], 10);

      if (hours > 23 || minutes > 59 || seconds > 59) return null;
      if (!isCalendarDateValid(year, month, day)) return null;

      const parsedMs = Date.parse(trimmed);
      if (Number.isSafeInteger(parsedMs) && parsedMs >= 0) return parsedMs;
    }

    return null;
  }

  // ==========================================================================
  // 🔒 2. PROVENANCE CORE: ATOMIC STORE & SEQUENCE LIFECYCLE
  // ==========================================================================

  let ssotDealsMap = new Map();
  let publicationSequenceCounter = 0;
  let activePublicationSequenceId = 0;

  function beginPublicationSequence() {
    const seq = ++publicationSequenceCounter;
    activePublicationSequenceId = seq;
    return seq;
  }

  function normalizeToCanonicalFlatDeal(raw) {
    if (!raw || typeof raw !== 'object') return null;

    const id = raw.id !== undefined && raw.id !== null ? String(raw.id).trim() : null;
    if (!id) return null;

    const title = typeof raw.title === 'string' ? raw.title.trim() : '';
    const merchant_name = typeof raw.merchant_name === 'string' ? raw.merchant_name.trim() : '';
    const min_order = (typeof raw.min_order === 'number' && Number.isSafeInteger(raw.min_order) && raw.min_order >= 0) ? raw.min_order : null;
    const valid_until = (typeof raw.valid_until === 'number' && Number.isSafeInteger(raw.valid_until) && raw.valid_until >= 0)
      ? raw.valid_until
      : (typeof raw.valid_until === 'string' ? raw.valid_until.trim() : null);
    const is_active = (typeof raw.is_active === 'boolean') ? raw.is_active : null;
    const distance_km = (typeof raw.distance_km === 'number' && Number.isFinite(raw.distance_km) && raw.distance_km >= 0) ? raw.distance_km : null;
    const base_price = (typeof raw.base_price === 'number' && Number.isSafeInteger(raw.base_price) && raw.base_price >= 0) ? raw.base_price : 0;
    const sale_price = (typeof raw.sale_price === 'number' && Number.isSafeInteger(raw.sale_price) && raw.sale_price >= 0) ? raw.sale_price : 0;
    const trust_score = (typeof raw.trust_score === 'number' && Number.isFinite(raw.trust_score)) ? raw.trust_score : 0;
    const partner_link = typeof raw.partner_link === 'string' ? raw.partner_link.trim() : '';

    return Object.freeze({
      id,
      title,
      merchant_name,
      min_order,
      valid_until,
      is_active,
      distance_km,
      base_price,
      sale_price,
      trust_score,
      partner_link
    });
  }

  function updateSSOTDealsStore(rawDealsList, responseSequenceId) {
    if (!Array.isArray(rawDealsList)) return false;

    if (typeof responseSequenceId !== 'number' || responseSequenceId !== activePublicationSequenceId) {
      console.warn(`[SSOT Guard] Bỏ qua payload sequence ${responseSequenceId} !== ${activePublicationSequenceId}`);
      return false;
    }

    const nextMap = new Map();
    const seenIds = new Map();

    rawDealsList.forEach((raw, index) => {
      const flatDeal = normalizeToCanonicalFlatDeal(raw);
      if (!flatDeal || !flatDeal.id) return;

      if (seenIds.has(flatDeal.id)) {
        console.warn(`[SSOT Diagnostic] PROV-COLLISION: duplicate ID ${flatDeal.id}, first_seen: ${seenIds.get(flatDeal.id)}, action: SKIPPED`);
        return;
      }

      seenIds.set(flatDeal.id, index);
      nextMap.set(flatDeal.id, flatDeal);
    });

    ssotDealsMap = nextMap;
    return true;
  }

  function getDealById(dealId) {
    if (dealId === null || dealId === undefined) return null;
    return ssotDealsMap.get(String(dealId)) || null;
  }

  // ==========================================================================
  // 🟢 3. SURGICAL MICRO-QUALIFIER ENGINE
  // ==========================================================================

  function computeMicroQualifierData(deal, nowMs) {
    const isClockValid = (typeof nowMs === 'number' && Number.isSafeInteger(nowMs) && nowMs >= 0);

    if (!deal || typeof deal !== 'object') {
      return {
        minOrderText: 'Điều kiện đơn: Chưa có dữ liệu',
        isMinOrderValid: false,
        validityText: 'Chưa xác định hiệu lực',
        validityState: 'unknown',
        distanceText: 'Khoảng cách chưa có dữ liệu',
        isDistanceKnown: false,
        stateIcon: '⚠️',
        stateClass: 'qualifier-warning'
      };
    }

    // Min Order
    let minOrderText = 'Không yêu cầu đơn tối thiểu';
    let isMinOrderValid = true;

    if (deal.min_order !== undefined && deal.min_order !== null) {
      if (typeof deal.min_order === 'number' && Number.isSafeInteger(deal.min_order) && deal.min_order >= 0) {
        if (deal.min_order === 0) {
          minOrderText = 'Không yêu cầu đơn tối thiểu';
        } else {
          minOrderText = `Đơn từ ${deal.min_order / 1000}K`;
        }
      } else {
        minOrderText = 'Điều kiện đơn: Không hợp lệ';
        isMinOrderValid = false;
      }
    } else {
      minOrderText = 'Điều kiện đơn: Chưa có dữ liệu';
      isMinOrderValid = false;
    }

    // Validity
    let validityText = 'Chưa xác định hiệu lực';
    let validityState = 'unknown';

    if (!isClockValid) {
      validityText = 'Chưa xác định hiệu lực (Thiếu Clock)';
      validityState = 'unknown';
    } else if (typeof deal.is_active === 'boolean') {
      if (deal.is_active === false) {
        validityText = 'Đã hết hiệu lực';
        validityState = 'expired';
      } else if (deal.is_active === true) {
        const validUntilMs = parseCanonicalTimestamp(deal.valid_until);

        if (validUntilMs !== null) {
          const diffMs = validUntilMs - nowMs;
          if (diffMs <= 0) {
            validityText = 'Đã hết hiệu lực';
            validityState = 'expired';
          } else {
            const diffHours = Math.floor(diffMs / 3600000);
            const diffMinutes = Math.floor((diffMs % 3600000) / 60000);
            if (diffHours >= 1) {
              validityText = `Còn hiệu lực (~${diffHours}h)`;
              validityState = 'active';
            } else if (diffMinutes > 0) {
              validityText = `Sắp hết hạn (~${diffMinutes}p)`;
              validityState = 'expiring';
            } else {
              validityText = 'Sắp hết hạn (<1p)';
              validityState = 'expiring';
            }
          }
        } else {
          validityText = 'Chưa xác định hiệu lực';
          validityState = 'unknown';
        }
      }
    }

    // Distance
    let distText = 'Khoảng cách chưa có dữ liệu';
    let isDistanceKnown = false;

    if (deal.distance_km !== undefined && deal.distance_km !== null) {
      if (typeof deal.distance_km === 'number' && Number.isFinite(deal.distance_km) && deal.distance_km >= 0) {
        distText = `Cách bạn ${deal.distance_km}km`;
        isDistanceKnown = true;
      }
    }

    let stateIcon = '🟢';
    let stateClass = 'qualifier-positive';

    if (validityState === 'expired') {
      stateIcon = '🔴';
      stateClass = 'qualifier-danger';
    } else if (validityState === 'expiring' || validityState === 'unknown' || !isMinOrderValid || !isDistanceKnown) {
      stateIcon = '⚠️';
      stateClass = 'qualifier-warning';
    }

    return {
      minOrderText,
      isMinOrderValid,
      validityText,
      validityState,
      distanceText: distText,
      isDistanceKnown,
      stateIcon,
      stateClass
    };
  }

  function renderMicroQualifierHTML(data) {
    if (!data || typeof data !== 'object') return '';

    const safeMinOrder = escapeHTML(data.minOrderText || '');
    const safeValidity = escapeHTML(data.validityText || '');
    const safeDistance = escapeHTML(data.distanceText || '');
    
    const allowedClasses = ['qualifier-positive', 'qualifier-warning', 'qualifier-danger', 'qualifier-expiring'];
    const safeClass = allowedClasses.includes(data.stateClass) ? data.stateClass : 'qualifier-warning';
    const safeIcon = (data.stateIcon === '🟢' || data.stateIcon === '⚠️' || data.stateIcon === '🔴') ? data.stateIcon : '⚠️';

    return `
      <div class="deal-micro-qualifier ${escapeHTML(safeClass)}" style="margin: 6px 0 10px 0; font-size: 12px; font-weight: 500; display: inline-flex; align-items: center; gap: 4px;">
        <span class="qualifier-icon">${safeIcon}</span>
        <span class="qualifier-text">${safeMinOrder} · ${safeValidity} · ${safeDistance}</span>
      </div>
    `.trim();
  }

  // ==========================================================================
  // 🧠 4. P0 DEAL INTELLIGENCE ENGINE v1.0
  // ==========================================================================

  function computeDealIntelligence(deal, nowMs) {
    const isClockValid = (typeof nowMs === 'number' && Number.isSafeInteger(nowMs) && nowMs >= 0);
    const effectiveNowMs = isClockValid ? nowMs : 0;

    if (!deal || typeof deal !== 'object') {
      return {
        deal_id: null,
        deal_score: 50,
        hunt_score: null,
        fact_metrics: { is_pricing_known: false, real_savings: null, discount_rate: null, s_discount: 50, s_abs_saving: 50, s_feasibility: 50, s_trust: 50, s_urgency: 0 },
        badges: [],
        explanation: { error: 'Invalid Deal Object' }
      };
    }

    const isBasePriceValid = (typeof deal.base_price === 'number' && Number.isSafeInteger(deal.base_price) && deal.base_price > 0);
    const isSalePriceValid = (typeof deal.sale_price === 'number' && Number.isSafeInteger(deal.sale_price) && deal.sale_price >= 0);
    const isPricingKnown = (isBasePriceValid && isSalePriceValid && deal.base_price >= deal.sale_price);

    let realSavings = null;
    let discountRate = null;
    let sDiscount = 50;
    let sAbsSaving = 50;

    if (isPricingKnown) {
      realSavings = deal.base_price - deal.sale_price;
      discountRate = (realSavings / deal.base_price) * 100;
      sDiscount = Math.min(100, Math.max(0, discountRate * 2.0));

      if (realSavings <= 0) {
        sAbsSaving = 0;
      } else if (realSavings <= 30000) {
        sAbsSaving = (realSavings / 30000) * 50;
      } else if (realSavings <= 100000) {
        sAbsSaving = 50 + ((realSavings - 30000) / 70000) * 50;
      } else {
        sAbsSaving = 100;
      }
    }

    let sFeasibility = 50;
    const isMinOrderKnown = (typeof deal.min_order === 'number' && Number.isSafeInteger(deal.min_order) && deal.min_order >= 0);
    if (isMinOrderKnown) {
      if (deal.min_order === 0) {
        sFeasibility = 100;
      } else if (deal.min_order <= 50000) {
        sFeasibility = 100 - (deal.min_order / 50000) * 20;
      } else if (deal.min_order <= 200000) {
        sFeasibility = 80 - ((deal.min_order - 50000) / 150000) * 50;
      } else {
        sFeasibility = Math.max(0, 30 - ((deal.min_order - 200000) / 100000) * 30);
      }
    }

    let sTrust = 50;
    const isTrustKnown = (typeof deal.trust_score === 'number' && Number.isFinite(deal.trust_score) && deal.trust_score >= 0);
    if (isTrustKnown) {
      sTrust = Math.min(100, Math.max(0, deal.trust_score * 10));
    }

    let sUrgency = 0;
    let remainingMs = null;
    let isExpiryKnown = false;

    if (isClockValid) {
      const validUntilMs = parseCanonicalTimestamp(deal.valid_until);
      if (validUntilMs !== null) {
        isExpiryKnown = true;
        remainingMs = validUntilMs - effectiveNowMs;
        if (remainingMs > 0) {
          const diffHours = remainingMs / 3600000;
          const diffMinutes = remainingMs / 60000;
          if (diffHours <= 2) {
            sUrgency = 100 - (diffMinutes / 120) * 20;
          } else if (diffHours <= 24) {
            sUrgency = 80 - ((diffHours - 2) / 22) * 50;
          } else {
            sUrgency = Math.max(10, 30 - ((diffHours - 24) / 48) * 20);
          }
        } else {
          sUrgency = 0;
        }
      }
    }

    const dealScore = Math.round(
      (0.35 * sDiscount) +
      (0.25 * sAbsSaving) +
      (0.20 * sTrust) +
      (0.20 * sFeasibility)
    );

    let huntScore = null;
    let isScarcityVerified = false;

    const isScarcityFactorValid = (
      typeof deal.scarcity_factor === 'number' &&
      Number.isFinite(deal.scarcity_factor) &&
      deal.scarcity_factor >= 0 &&
      deal.scarcity_factor <= 1.0
    );

    if (deal.scarcity_evidence === true && isScarcityFactorValid) {
      isScarcityVerified = true;
      const sScarcity = deal.scarcity_factor * 100;
      huntScore = Math.round((0.40 * dealScore) + (0.30 * sScarcity) + (0.30 * sUrgency));
    }

    const badges = [];
    if (dealScore >= 85 && isTrustKnown && deal.trust_score >= 8.0) {
      badges.push({ code: 'BEST_VALUE', label: '🏆 BEST VALUE', type: 'discovery' });
    }
    if (isPricingKnown && discountRate >= 40.0) {
      badges.push({ code: 'DEEP_DISCOUNT', label: '🔥 GIẢM SÂU', type: 'fact' });
    }
    if (isPricingKnown && realSavings >= 50000) {
      badges.push({ code: 'HIGH_SAVINGS', label: '💰 TIẾT KIỆM CAO', type: 'fact' });
    }
    if (isExpiryKnown && remainingMs !== null && remainingMs > 0 && remainingMs <= 7200000) {
      badges.push({ code: 'ENDING_SOON', label: '⚡ SẮP HẾT', type: 'fact' });
    }
    if (isMinOrderKnown && deal.min_order === 0) {
      badges.push({ code: 'EASY_CLAIM', label: '🎯 DỄ LẤY', type: 'fact' });
    }
    if (isTrustKnown && deal.trust_score >= 9.0) {
      badges.push({ code: 'TOP_TRUSTED', label: '⭐ ĐÁNG TIN', type: 'fact' });
    }
    if (isScarcityVerified && huntScore !== null && huntScore >= 85) {
      badges.push({ code: 'HARD_HUNT', label: '🕵️ KHÓ SĂN', type: 'evidence_gated' });
    }
    if (isScarcityVerified && dealScore >= 80 && huntScore !== null && huntScore >= 80) {
      badges.push({ code: 'RARE_DEAL', label: '💎 DEAL HIẾM', type: 'evidence_gated' });
    }

    const explanation = {
      deal_score: dealScore,
      hunt_score: huntScore,
      pricing_status: isPricingKnown ? 'VERIFIED' : 'UNKNOWN',
      real_savings_vnd: realSavings,
      discount_rate_pct: discountRate !== null ? Math.round(discountRate * 10) / 10 : null,
      feasibility_status: isMinOrderKnown ? (deal.min_order === 0 ? 'KHÔNG ĐƠN TỐI THIỂU' : `ĐƠN TỪ ${deal.min_order / 1000}K`) : 'CHƯA RÕ',
      urgency_status: isExpiryKnown ? (remainingMs > 0 ? `CÒN ${Math.round(remainingMs / 60000)} PHÚT` : 'ĐÃ HẾT HẠN') : 'CHƯA RÕ',
      scarcity_status: isScarcityVerified ? 'VERIFIED' : 'UNKNOWN',
      sub_scores: {
        s_discount: Math.round(sDiscount),
        s_abs_saving: Math.round(sAbsSaving),
        s_feasibility: Math.round(sFeasibility),
        s_trust: Math.round(sTrust),
        s_urgency: Math.round(sUrgency)
      }
    };

    return {
      deal_id: deal.id,
      deal_score: dealScore,
      hunt_score: huntScore,
      fact_metrics: {
        is_pricing_known: isPricingKnown,
        real_savings: realSavings,
        discount_rate: discountRate,
        s_discount: Math.round(sDiscount),
        s_abs_saving: Math.round(sAbsSaving),
        s_feasibility: Math.round(sFeasibility),
        s_trust: Math.round(sTrust),
        s_urgency: Math.round(sUrgency)
      },
      badges,
      explanation
    };
  }

  // ==========================================================================
  // 📱 5. RUNTIME ORCHESTRATION & EVENT HANDLERS
  // ==========================================================================

  function renderDealCardHTML(deal, frameNowMs) {
    const qualifierData = computeMicroQualifierData(deal, frameNowMs);
    const qualifierHTML = renderMicroQualifierHTML(qualifierData);
    const intelligence = computeDealIntelligence(deal, frameNowMs);

    const badgesHTML = intelligence.badges.map(b => `
      <span class="deal-badge badge-${escapeHTML(b.code.toLowerCase())}" style="font-size: 11px; padding: 2px 6px; border-radius: 4px; font-weight: 600; margin-right: 4px;">
        ${escapeHTML(b.label)}
      </span>
    `).join('');

    const formattedBase = deal.base_price ? `${(deal.base_price).toLocaleString('vi-VN')}đ` : '';
    const formattedSale = deal.sale_price ? `${(deal.sale_price).toLocaleString('vi-VN')}đ` : 'Miễn phí';

    return `
      <div class="deal-card" data-deal-id="${escapeHTML(deal.id)}" style="border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
        <div class="deal-card-header" style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h3 class="deal-title" style="margin: 0 0 4px 0; font-size: 16px;">${escapeHTML(deal.title)}</h3>
            <span class="merchant-name" style="font-size: 13px; color: #888;">${escapeHTML(deal.merchant_name)}</span>
          </div>
          <div class="deal-score-badge" style="background: rgba(0,230,153,0.1); color: #00e699; padding: 4px 8px; border-radius: 8px; font-weight: bold; font-size: 13px;">
            ${intelligence.deal_score}/100
          </div>
        </div>

        <div class="deal-badges-row" style="margin: 8px 0;">
          ${badgesHTML}
        </div>

        ${qualifierHTML}

        <div class="deal-card-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
          <div class="deal-price-block">
            <span class="sale-price" style="font-size: 18px; font-weight: bold; color: #ff4757;">${formattedSale}</span>
            ${formattedBase ? `<span class="base-price" style="font-size: 13px; text-decoration: line-through; color: #777; margin-left: 6px;">${formattedBase}</span>` : ''}
          </div>
          <button class="btn-hunt-action" data-deal-id="${escapeHTML(deal.id)}" style="background: #00e699; color: #000; border: none; padding: 8px 16px; border-radius: 8px; font-weight: bold; cursor: pointer;">
            SĂN VOUCHER
          </button>
        </div>
      </div>
    `.trim();
  }

  function handleHuntButtonClick(event) {
    const button = event.currentTarget;
    const dealId = button.getAttribute('data-deal-id');
    if (!dealId) return;

    const canonicalDeal = getDealById(dealId);
    if (!canonicalDeal) {
      console.error(`[SSOT Guard] Deal ID ${dealId} không tồn tại trong SSOT Store`);
      return;
    }

    const actionNowMs = Date.now();
    const freshQualifier = computeMicroQualifierData(canonicalDeal, actionNowMs);
    const modalQualifierHTML = renderMicroQualifierHTML(freshQualifier);
    const freshIntelligence = computeDealIntelligence(canonicalDeal, actionNowMs);

    console.log(`[Hunt Action Triggered] Deal: ${canonicalDeal.title} | Score: ${freshIntelligence.deal_score}/100`);
    // Mở Modal Bước 1 với modalQualifierHTML & freshIntelligence
  }

  // Khởi tạo các event listeners
  document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
      const huntBtn = e.target.closest('.btn-hunt-action');
      if (huntBtn) {
        handleHuntButtonClick({ currentTarget: huntBtn });
      }
    });
  });

  // Export các hàm cốt lõi cho testing & global context
  window.JayTRuntime = {
    beginPublicationSequence,
    normalizeToCanonicalFlatDeal,
    updateSSOTDealsStore,
    getDealById,
    computeMicroQualifierData,
    renderMicroQualifierHTML,
    parseCanonicalTimestamp,
    computeDealIntelligence,
    renderDealCardHTML
  };

})();
