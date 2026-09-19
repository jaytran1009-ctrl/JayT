/* Internal-only JAYT-282 preparation. Not imported by any storefront bundle. */
const BASE = Object.freeze({ public_approved: false, render_permitted: false, affiliate: false, commercial_claims: false });
const MOCK_SLOTS = Object.freeze([
  { id: 'GITHUB_EDUCATION_PILOT_T2', state: 'PUBLIC_APPROVED', public_approved: true, render_permitted: true, affiliate: false, commercial_claims: false },
  { id: 'BATCH03_HK_04', state: 'AWAITING_OPERATOR_RAW_ATTACHMENT', ...BASE },
  { id: 'BATCH03_HC_07', state: 'AWAITING_OPERATOR_RAW_ATTACHMENT', ...BASE },
  { id: 'BATCH03_DS_07', state: 'AWAITING_OPERATOR_RAW_ATTACHMENT', ...BASE }
]);

function hydrateApprovedSlot(item) {
  if (!item || item.state !== 'EVIDENCE_COMPLETE_INTERNAL_HELD' || item.public_approved !== true || item.render_permitted !== true) {
    throw new Error('JAYT-282 hydration denied: provenance and named public approval are both required.');
  }
  if (item.affiliate || item.commercial_claims || /(?:utm_|affiliate|ref=)/i.test(item.official_url || '')) {
    throw new Error('JAYT-282 hydration denied: commercial or tracking data is forbidden.');
  }
  return { id: item.id, title: item.title, source_excerpt: item.source_excerpt, source_date: item.source_date, official_url: item.official_url };
}
module.exports = { MOCK_SLOTS, hydrateApprovedSlot };
