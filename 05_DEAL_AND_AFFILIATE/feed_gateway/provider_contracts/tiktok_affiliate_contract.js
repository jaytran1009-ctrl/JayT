/**
 * TIKTOK SHOP PARTNER API CONTRACT SPECIFICATION
 * Directive: JAYT-PROVIDER-EVIDENCE-GATE-053C
 *
 * Current Audit Status: UNSUPPORTED_PENDING_PROVIDER_DOCS
 * Reason: Official account-specific authorization documentation, verified route, and provider-published test vectors for JayT's specific affiliate app credentials are pending.
 * Evidence Gate Requirements to Reopen:
 * 1. Official Partner Center developer documentation for JayT's specific app and account type.
 * 2. Formally quoted HTTP method, verified route, parameters, secret wrapping algorithm, and identity response schema.
 * 3. Provider-published deterministic test vector or sanitized real sandbox response.
 */

const TIKTOK_AFFILIATE_CONTRACT = Object.freeze({
  provider_key: 'TIKTOK_AFFILIATE',
  contract_id: 'JAYT_CONTRACT_TIKTOK_PENDING_DOCS',
  support_status: 'UNSUPPORTED_PENDING_PROVIDER_DOCS',
  official_documentation: {
    doc_title: 'TikTok Shop Partner API — Pending Account Documentation',
    doc_url: 'https://partner.tiktokshop.com/docv2/page/sign-your-api-request',
    api_type: 'REST over HTTPS',
    status_note: 'PENDING_OFFICIAL_ACCOUNT_SPEC_AND_TEST_VECTOR'
  },
  authorized_endpoints: [
    'https://open-api.tiktokglobalshop.com'
  ],
  required_evidence: [
    'OFFICIAL_PARTNER_PORTAL_SPEC',
    'EXACT_ROUTE_AND_IDENTITY_SCHEMA',
    'PROVIDER_PUBLISHED_TEST_VECTOR_OR_SANDBOX_RECEIPT'
  ]
});

module.exports = TIKTOK_AFFILIATE_CONTRACT;
