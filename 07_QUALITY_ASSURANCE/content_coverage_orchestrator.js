/**
 * JAYT CONTENT COVERAGE ORCHESTRATOR
 * Directive: JAYT-CONTENT-COVERAGE-042
 * 
 * Orchestrates recurring batch cycles (DAILY, WEEKLY, MONTHLY) for authentic
 * discount discovery across Da Nang local cinema, F&B, coffee/tea, and online platforms.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const schedulePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'content_coverage_schedule.json');
const domainCatalogPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'domain_catalog.json');
const candidatesDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review');
const artifactsDir = path.join(candidatesDir, 'artifacts');

function getSha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function loadSchedule() {
  if (!fs.existsSync(schedulePath)) {
    throw new Error(`Schedule file not found: ${schedulePath}`);
  }
  return JSON.parse(fs.readFileSync(schedulePath, 'utf8'));
}

function loadDomainCatalog() {
  if (!fs.existsSync(domainCatalogPath)) {
    throw new Error(`Domain catalog not found: ${domainCatalogPath}`);
  }
  return JSON.parse(fs.readFileSync(domainCatalogPath, 'utf8'));
}

/**
 * Returns deep URL targets for a given cycle ('DAILY_VOLATILE_AND_IMMINENT', 'WEEKLY_LOCAL_SCHEDULE', 'MONTHLY_GOVERNANCE_AND_BASE_TERMS')
 */
function getTargetsForCycle(cycleName) {
  const schedule = loadSchedule();
  if (!schedule.cycles[cycleName]) {
    throw new Error(`Invalid cycle name: ${cycleName}. Valid: ${Object.keys(schedule.cycles).join(', ')}`);
  }
  const cycleInfo = schedule.cycles[cycleName];
  if (cycleName === 'MONTHLY_GOVERNANCE_AND_BASE_TERMS') {
    return schedule.deep_url_registry;
  }
  return schedule.deep_url_registry.filter(entry => entry.priority_cycle === cycleName || cycleInfo.brands.includes(entry.brand_id));
}

/**
 * Tri-State Result Classifier
 * State 1: PROMOTION_DETAIL -> Create candidate for review
 * State 2: NO_PUBLIC_PROMO / GENERIC_MARKETING -> Record transparently
 * State 3: ANTI_BOT_OR_CHALLENGE / NOT_FOUND / DYNAMIC_ACCOUNT_REQUIRED -> Record technical challenge
 */
function classifyObservedContent(params) {
  const { statusCode, hasChallenge, isDynamicApp, promoFound, termsFound, isNotFound } = params;

  if (hasChallenge) {
    return {
      content_class: 'ANTI_BOT_OR_CHALLENGE',
      tri_state: 'STATE_3_CHALLENGE_OR_NOT_FOUND_OR_DYNAMIC',
      readiness_state: 'NEEDS_RECHECK',
      render_eligible: false,
      deal_price: null
    };
  }

  if (isNotFound || statusCode === 404) {
    return {
      content_class: 'NOT_FOUND',
      tri_state: 'STATE_3_CHALLENGE_OR_NOT_FOUND_OR_DYNAMIC',
      readiness_state: 'NEEDS_RECHECK',
      render_eligible: false,
      deal_price: null
    };
  }

  if (isDynamicApp) {
    return {
      content_class: 'DYNAMIC_ACCOUNT_REQUIRED',
      tri_state: 'STATE_3_CHALLENGE_OR_NOT_FOUND_OR_DYNAMIC',
      readiness_state: 'NEEDS_RECHECK',
      render_eligible: false,
      deal_price: null
    };
  }

  if (promoFound && termsFound) {
    return {
      content_class: 'PROMOTION_DETAIL',
      tri_state: 'STATE_1_PROMOTION_DETAIL',
      readiness_state: 'READY_FOR_CEO_REVIEW',
      render_eligible: true,
      eligible_for_staging: true
    };
  }

  if (promoFound && !termsFound) {
    return {
      content_class: 'GENERIC_MARKETING',
      tri_state: 'STATE_2_NO_PUBLIC_PROMO_OR_GENERIC',
      readiness_state: 'NEEDS_RECHECK',
      render_eligible: false,
      deal_price: null
    };
  }

  return {
    content_class: 'NO_PUBLIC_PROMO',
    tri_state: 'STATE_2_NO_PUBLIC_PROMO_OR_GENERIC',
    readiness_state: 'NEEDS_RECHECK',
    render_eligible: false,
    deal_price: null
  };
}

/**
 * Validates batch coverage schedule against system constraints
 */
function validateScheduleIntegrity() {
  const schedule = loadSchedule();
  const domainCatalog = loadDomainCatalog();
  const allowedDomains = domainCatalog.map(d => d.domain.toLowerCase());

  const errors = [];
  const requiredCycles = ['DAILY_MORNING_0800', 'DAILY_EVENING_1630', 'WEEKLY_LOCAL_SCHEDULE', 'MONTHLY_GOVERNANCE_AND_BASE_TERMS'];
  for (const c of requiredCycles) {
    if (!schedule.cycles[c]) {
      errors.push(`Missing required cycle in schedule: ${c}`);
    }
  }

  if (!Array.isArray(schedule.deep_url_registry) || schedule.deep_url_registry.length < 10) {
    errors.push(`deep_url_registry must contain at least 10 brand endpoints.`);
  }

  for (const reg of (schedule.deep_url_registry || [])) {
    if (!reg.brand_id || !reg.category || !Array.isArray(reg.discovery_urls)) {
      errors.push(`Invalid deep_url_registry entry: ${JSON.stringify(reg)}`);
      continue;
    }
    for (const u of reg.discovery_urls) {
      try {
        const parsed = new URL(u);
        const host = parsed.hostname.replace(/^www\./, '');
        if (!allowedDomains.includes(host)) {
          errors.push(`Target URL domain '${host}' is not in domain_catalog.json: ${u}`);
        }
      } catch (e) {
        errors.push(`Malformed URL in deep_url_registry: ${u}`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = {
  loadSchedule,
  loadDomainCatalog,
  getTargetsForCycle,
  classifyObservedContent,
  validateScheduleIntegrity
};
