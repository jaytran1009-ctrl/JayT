/**
 * JAYT-178: 4-QUOTE EVIDENCE PREDICATE ENGINE & VALIDATOR
 * Directive: CHỈ THỊ KHẨN JAYT-178 — EVIDENCE PREDICATE LOCK & SUPPLY RECOVERY
 * 
 * CORE REQUIREMENT:
 * No item can EVER enter Tier 1 (🟢 ĐÃ ĐỐI SOÁT) unless all 4 physical quotes exist
 * and match exact substrings in the raw capture artifact:
 * 1. offer_quote: Concrete benefit/discount/price
 * 2. terms_quote: Specific terms/conditions
 * 3. validity_quote: Explicit expiration date or recurring cycle
 * 4. scope_quote: Da Nang branch or explicit online scope
 * 
 * Zero hand-typed deals. Zero tier elevation by UI.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const generatedFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_verified_deals_178.json');

function sha256Str(str) { return crypto.createHash('sha256').update(str, 'utf8').digest('hex'); }
function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }

console.log('=== RUNNING JAYT-178 4-QUOTE EVIDENCE PREDICATE ENGINE ===\n');

/**
 * Validates a candidate against the strict 4-Quote Evidence Predicate
 * @param {Object} candidate Candidate deal object
 * @param {string} rawHtmlContent Raw captured HTML string
 * @returns {Object} { isValid: boolean, missingQuotes: string[], details: Object }
 */
function validate4QuotePredicate(candidate, rawHtmlContent) {
  const requiredQuotes = ['offer_quote', 'terms_quote', 'validity_quote', 'scope_quote'];
  const missingQuotes = [];
  const matchedQuotes = {};

  if (!rawHtmlContent || typeof rawHtmlContent !== 'string' || rawHtmlContent.length < 200) {
    return {
      isValid: false,
      reason: 'RAW_ARTIFACT_MISSING_OR_TOO_SHORT',
      missingQuotes: requiredQuotes,
      matchedQuotes: {}
    };
  }

  for (const qKey of requiredQuotes) {
    const quoteVal = candidate[qKey];
    if (!quoteVal || typeof quoteVal !== 'string' || quoteVal.trim().length === 0) {
      missingQuotes.push(qKey);
      continue;
    }

    // Check if quote is a verbatim substring in raw HTML
    if (rawHtmlContent.includes(quoteVal.trim())) {
      matchedQuotes[qKey] = {
        verbatim_text: quoteVal.trim(),
        found_in_raw: true,
        match_length: quoteVal.trim().length
      };
    } else {
      missingQuotes.push(qKey + '_NOT_IN_RAW_ARTIFACT');
    }
  }

  return {
    isValid: missingQuotes.length === 0,
    missingQuotes,
    matchedQuotes
  };
}

/**
 * Generates verified deals feed for UI consumption.
 * Output: generated_verified_deals_178.json
 */
function generateVerifiedFeed(candidatesWithRawFiles = []) {
  const verifiedDeals = [];
  const rejectedDeals = [];

  for (const item of candidatesWithRawFiles) {
    let rawContent = '';
    if (item.raw_file_path && fs.existsSync(item.raw_file_path)) {
      rawContent = fs.readFileSync(item.raw_file_path, 'utf8');
    }

    const valResult = validate4QuotePredicate(item, rawContent);

    if (valResult.isValid) {
      verifiedDeals.push({
        deal_id: item.deal_id,
        brand: item.brand,
        title: item.title,
        offer_quote: item.offer_quote,
        terms_quote: item.terms_quote,
        validity_quote: item.validity_quote,
        scope_quote: item.scope_quote,
        benefit_summary: item.benefit_summary,
        action_url: item.action_url,
        hub_id: item.hub_id,
        target_cluster: item.target_cluster,
        evidence_file: path.basename(item.raw_file_path),
        evidence_sha256: sha256Str(rawContent),
        captured_at: item.captured_at || new Date().toISOString(),
        reliability_tier: 'TIER_1_VERIFIED_PROOF_DEAL',
        tier_badge: '🟢 ƯU ĐÃI ĐANG DÙNG ĐƯỢC'
      });
    } else {
      rejectedDeals.push({
        brand: item.brand,
        reason: valResult.missingQuotes.join(', '),
        details: valResult
      });
    }
  }

  const feedResult = {
    program: 'JAYT-178-EVIDENCE-PREDICATE-LOCK',
    timestamp: new Date().toISOString(),
    total_verified_tier_1_deals: verifiedDeals.length,
    tier_1_deals: verifiedDeals,
    rejected_from_tier_1: rejectedDeals
  };

  fs.writeFileSync(generatedFeedPath, JSON.stringify(feedResult, null, 2), 'utf8');
  console.log(`✅ Generated Verified Deals Feed 178 at: ${generatedFeedPath}`);
  console.log(`   Tier 1 Verified Deals: ${verifiedDeals.length}`);
  console.log(`   Rejected Items: ${rejectedDeals.length}`);

  return feedResult;
}

// Initialize empty feed under 178 containment lock
const initialFeed = generateVerifiedFeed([]);

module.exports = {
  validate4QuotePredicate,
  generateVerifiedFeed,
  generatedFeedPath
};
