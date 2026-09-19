/**
 * SHOPEE AFFILIATE OPEN API CONTRACT SPECIFICATION
 * Directive: JAYT-PROVIDER-EVIDENCE-GATE-053C
 *
 * Current Audit Status: UNSUPPORTED_PENDING_PROVIDER_DOCS
 * Reason: Official partner documentation and provider-published test vectors for JayT's specific affiliate account type are pending.
 * Evidence Gate Requirements to Reopen:
 * 1. Official Partner Center developer documentation for JayT's account type.
 * 2. Formally quoted HTTP method, route, parameters, and identity response schema.
 * 3. Provider-published deterministic test vector or sanitized real sandbox response.
 */

const SHOPEE_AFFILIATE_CONTRACT = Object.freeze({
  provider_key: 'SHOPEE_AFFILIATE',
  contract_id: 'JAYT_CONTRACT_SHOPEE_AFFILIATE_PENDING_DOCS',
  support_status: 'UNSUPPORTED_PENDING_PROVIDER_DOCS',
  official_documentation: {
    doc_title: 'Shopee Affiliate Open Platform — Pending Account Documentation',
    doc_url: 'https://open-api.affiliate.shopee.vn/graphql',
    api_type: 'GraphQL over HTTPS',
    status_note: 'PENDING_OFFICIAL_ACCOUNT_SPEC_AND_TEST_VECTOR'
  },
  authorized_endpoints: [
    'https://open-api.affiliate.shopee.vn/graphql'
  ],
  required_evidence: [
    'OFFICIAL_PARTNER_PORTAL_SPEC',
    'EXACT_ROUTE_AND_IDENTITY_SCHEMA',
    'PROVIDER_PUBLISHED_TEST_VECTOR_OR_SANDBOX_RECEIPT'
  ]
});

module.exports = SHOPEE_AFFILIATE_CONTRACT;
