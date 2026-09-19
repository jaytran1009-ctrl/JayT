/**
 * =============================================================================
 * JAYT ELIGIBILITY ENGINE (SHARED CORE RUNTIME MODULE)
 * =============================================================================
 * Universal Module: Compatible with Node.js (CommonJS) and Browser globals.
 */
(function (root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root.JayTEligibilityEngine = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const VALID_TAXONOMY_ENUMS = ['VERIFIED', 'PROBING', 'UNVERIFIED', 'EXPIRED'];

  function isValidStrictISO8601WithTimezone(dateStr) {
    if (typeof dateStr !== 'string') return false;
    const isoRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
    const match = isoRegex.exec(dateStr.trim());
    if (!match) return false;
    const [_, y, m, d, hh, mm, ss] = match.map(Number);
    if (m < 1 || m > 12 || d < 1 || d > 31 || hh > 23 || mm > 59 || ss > 59) return false;
    const daysInMonth = [31, (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (d > daysInMonth[m - 1]) return false;
    const dObj = new Date(dateStr);
    return !isNaN(dObj.getTime());
  }

  function isValidStrictHttpsURL(urlStr) {
    if (typeof urlStr !== 'string' || urlStr.trim() === '') return false;
    try {
      const parsed = new URL(urlStr.trim());
      if (parsed.protocol !== 'https:') return false;
      if (parsed.username !== '' || parsed.password !== '') return false;
      if (!parsed.hostname || !parsed.hostname.includes('.') || parsed.hostname.endsWith('.')) return false;
      if (/[ <>"{}|\\^`]/i.test(parsed.hostname)) return false;
      return true;
    } catch (e) {
      return false;
    }
  }

  function executeEligibilityGate(deals, userProfile, evidenceStore, fixedTimestampStr) {
    const now = new Date(fixedTimestampStr || '2026-08-20T12:00:00.000Z');
    const maxFreshnessDays = 30;
    const result = {
      verified_hero_deals: [],
      probing_deals: [],
      unverified_deals: [],
      disqualified_diagnostics: []
    };

    if (!Array.isArray(deals)) return result;

    deals.forEach(deal => {
      if (!deal || !deal.deal_id || !deal.merchant || String(deal.merchant).trim() === '') {
        result.disqualified_diagnostics.push({ deal_id: deal?.deal_id || 'UNKNOWN', reason_code: 'ERR_MISSING_CORE' });
        return;
      }
      if (typeof deal.price_num !== 'number' || isNaN(deal.price_num) || deal.price_num <= 0) {
        result.disqualified_diagnostics.push({ deal_id: deal.deal_id, reason_code: 'ERR_PRICE_UNKNOWN' });
        return;
      }
      if (!deal.taxonomy || !VALID_TAXONOMY_ENUMS.includes(deal.taxonomy)) {
        result.disqualified_diagnostics.push({ deal_id: deal.deal_id, reason_code: 'ERR_INVALID_TAXONOMY' });
        return;
      }
      if (deal.taxonomy === 'EXPIRED') {
        result.disqualified_diagnostics.push({ deal_id: deal.deal_id, reason_code: 'ERR_EXPIRED' });
        return;
      }
      if (!deal.source_type || String(deal.source_type).trim() === '') {
        result.disqualified_diagnostics.push({ deal_id: deal.deal_id, reason_code: 'ERR_MISSING_SOURCE_TYPE' });
        return;
      }
      if (!deal.zone || String(deal.zone).trim() === '') {
        result.disqualified_diagnostics.push({ deal_id: deal.deal_id, reason_code: 'ERR_DATA_MISSING_ZONE' });
        return;
      }
      if (!deal.expires_at || !isValidStrictISO8601WithTimezone(deal.expires_at)) {
        result.disqualified_diagnostics.push({ deal_id: deal.deal_id, reason_code: 'ERR_INVALID_DATE_FORMAT' });
        return;
      }
      const expiryDate = new Date(deal.expires_at);
      if (expiryDate < now) {
        result.disqualified_diagnostics.push({ deal_id: deal.deal_id, reason_code: 'ERR_EXPIRED' });
        return;
      }
      if (!deal.checked_at || !isValidStrictISO8601WithTimezone(deal.checked_at)) {
        result.disqualified_diagnostics.push({ deal_id: deal.deal_id, reason_code: 'ERR_INVALID_CHECKED_AT_FORMAT' });
        return;
      }
      const checkedDate = new Date(deal.checked_at);
      if (checkedDate > new Date(now.getTime() + 60000)) {
        result.disqualified_diagnostics.push({ deal_id: deal.deal_id, reason_code: 'ERR_FUTURE_TIMESTAMP' });
        return;
      }
      if (deal.is_terms_disabled === true || deal.partner_active === false) {
        result.disqualified_diagnostics.push({ deal_id: deal.deal_id, reason_code: 'ERR_PARTNER_TERMS_DISABLED' });
        return;
      }
      if (deal.taxonomy === 'VERIFIED') {
        if (!isValidStrictHttpsURL(deal.source_url) || !deal.evidence_ref) {
          result.disqualified_diagnostics.push({ deal_id: deal.deal_id, reason_code: 'ERR_BROKEN_EVIDENCE' });
          return;
        }
        const evidence = evidenceStore ? evidenceStore[deal.evidence_ref] : null;
        if (!evidence) {
          result.disqualified_diagnostics.push({ deal_id: deal.deal_id, reason_code: 'ERR_BROKEN_EVIDENCE' });
          return;
        }
        if (evidence.deal_id !== deal.deal_id) {
          result.disqualified_diagnostics.push({ deal_id: deal.deal_id, reason_code: 'ERR_EVIDENCE_REF_MISMATCH' });
          return;
        }
        if (evidence.source_url !== deal.source_url) {
          result.disqualified_diagnostics.push({ deal_id: deal.deal_id, reason_code: 'ERR_EVIDENCE_SOURCE_URL_MISMATCH' });
          return;
        }
        if (evidence.verified_at && evidence.verified_at !== deal.checked_at) {
          result.disqualified_diagnostics.push({ deal_id: deal.deal_id, reason_code: 'ERR_EVIDENCE_TIMESTAMP_CONFLICT' });
          return;
        }
        const daysOld = (now - checkedDate) / (1000 * 60 * 60 * 24);
        if (daysOld > maxFreshnessDays) {
          result.disqualified_diagnostics.push({ deal_id: deal.deal_id, reason_code: 'ERR_STALE_EVIDENCE' });
          return;
        }
      }
      if (userProfile && typeof userProfile.maxBudget === 'number' && userProfile.maxBudget > 0) {
        if (deal.price_num > userProfile.maxBudget) {
          result.disqualified_diagnostics.push({ deal_id: deal.deal_id, reason_code: 'FLT_BUDGET_EXCEEDED' });
          return;
        }
      }
      if (userProfile && userProfile.preferredZone && userProfile.preferredZone !== 'ALL_DANANG') {
        if (deal.zone !== userProfile.preferredZone && deal.zone !== 'ALL_DANANG') {
          result.disqualified_diagnostics.push({ deal_id: deal.deal_id, reason_code: 'FLT_ZONE_OUTSIDE_SELECTION' });
          return;
        }
      }

      if (deal.taxonomy === 'VERIFIED') result.verified_hero_deals.push(deal);
      else if (deal.taxonomy === 'PROBING') result.probing_deals.push(deal);
      else if (deal.taxonomy === 'UNVERIFIED') result.unverified_deals.push(deal);
    });

    return result;
  }

  return {
    VALID_TAXONOMY_ENUMS: VALID_TAXONOMY_ENUMS,
    isValidStrictISO8601WithTimezone: isValidStrictISO8601WithTimezone,
    isValidStrictHttpsURL: isValidStrictHttpsURL,
    executeEligibilityGate: executeEligibilityGate
  };
});
