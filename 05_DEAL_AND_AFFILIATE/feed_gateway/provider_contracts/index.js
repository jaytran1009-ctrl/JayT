/**
 * JAYT PROVIDER OFFICIAL CONTRACT REGISTRY
 * Directive: JAYT-PROVIDER-EVIDENCE-GATE-053C
 *
 * Current State: ALL THREE PROVIDERS ARE IN UNSUPPORTED_PENDING_PROVIDER_DOCS.
 * ZERO auth probes, ZERO request signing, ZERO claiming "officially specified".
 * Providers can only be reopened when passing the 3 criteria of Official Evidence Gate 053C.
 */

const SHOPEE_AFFILIATE_CONTRACT = require('./shopee_affiliate_contract');
const LAZADA_AFFILIATE_CONTRACT = require('./lazada_affiliate_contract');
const TIKTOK_AFFILIATE_CONTRACT = require('./tiktok_affiliate_contract');

const PROVIDER_CONTRACTS = Object.freeze({
  SHOPEE_AFFILIATE: SHOPEE_AFFILIATE_CONTRACT,
  LAZADA_AFFILIATE: LAZADA_AFFILIATE_CONTRACT,
  TIKTOK_AFFILIATE: TIKTOK_AFFILIATE_CONTRACT
});

function getProviderContract(providerKey) {
  const contract = PROVIDER_CONTRACTS[providerKey];
  if (!contract) {
    return {
      provider_key: providerKey,
      support_status: 'UNSUPPORTED_PENDING_PROVIDER_DOCS',
      reason: `No official contract specification registered for provider "${providerKey}".`
    };
  }
  return contract;
}

module.exports = {
  PROVIDER_CONTRACTS,
  getProviderContract,
  SHOPEE_AFFILIATE_CONTRACT,
  LAZADA_AFFILIATE_CONTRACT,
  TIKTOK_AFFILIATE_CONTRACT
};
