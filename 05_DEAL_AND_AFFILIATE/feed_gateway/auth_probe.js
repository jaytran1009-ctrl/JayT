/**
 * JAYT TRACK 1 AUTHENTICATION PROBE MODULE (053C)
 * Directive: JAYT-PROVIDER-EVIDENCE-GATE-053C
 *
 * Current State:
 * ALL THREE PROVIDERS (Shopee, Lazada, TikTok Shop) are locked in UNSUPPORTED_PENDING_PROVIDER_DOCS.
 * ZERO generic probes, ZERO self-generated signatures, ZERO network calls.
 *
 * Requirements for Reopening Provider Evidence Gate:
 * 1. Official Partner Center documentation for JayT's exact account type.
 * 2. Formally quoted HTTP method, route, parameters, signing algorithm, and identity response schema.
 * 3. Provider-published deterministic test vector or sanitized real sandbox response.
 *
 * Invariant: deals_feed.json === [] and is_approved === false.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const {
  OnlineFeedAdapter,
  sanitizeForLogging,
  sanitizeHeaders,
  sanitizeUrl
} = require('./adapter_interface');

const {
  getProviderContract,
  PROVIDER_CONTRACTS
} = require('./provider_contracts');

const DEFAULT_REGISTRY_PATH = path.resolve(__dirname, 'authorized_affiliate_accounts.json');

function loadRegistry(registryPath = DEFAULT_REGISTRY_PATH) {
  if (!fs.existsSync(registryPath)) {
    throw new Error(`REGISTRY_NOT_FOUND: Registry file does not exist at ${registryPath}`);
  }
  return JSON.parse(fs.readFileSync(registryPath, 'utf8'));
}

function updateProviderStatus(providerKey, newStatus, probeDetails = {}, registryPath = DEFAULT_REGISTRY_PATH) {
  const registry = loadRegistry(registryPath);
  if (!registry.platforms || !registry.platforms[providerKey]) {
    throw new Error(`PROVIDER_NOT_IN_REGISTRY: ${providerKey} is not present in registry.`);
  }

  registry.platforms[providerKey].status = newStatus;
  registry.platforms[providerKey].last_auth_probe = {
    timestamp: new Date().toISOString(),
    auth_status: newStatus,
    http_status: probeDetails.http_status || null,
    request_id: probeDetails.request_id || null,
    identity_verified: probeDetails.identity_verified === true
    // CRITICAL: ZERO tokens, secrets, or headers stored in registry
  };

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
}

/**
 * Executes an isolated authentication probe for one single provider.
 * In 053C, all providers without confirmed official evidence gate pass are blocked.
 * @param {string} providerKey - e.g. 'SHOPEE_AFFILIATE'
 * @param {object} options - { registryPath, customProbeExecutor }
 */
async function probeProviderAuthentication(providerKey, options = {}) {
  const registryPath = options.registryPath || DEFAULT_REGISTRY_PATH;
  const registry = loadRegistry(registryPath);
  const providerConfig = registry.platforms?.[providerKey];

  if (!providerConfig) {
    return {
      provider: providerKey,
      auth_status: 'FAILED',
      identity_verified: false,
      error_code: 'PROVIDER_UNREGISTERED',
      http_status: null,
      request_id: null,
      timestamp: new Date().toISOString()
    };
  }

  // Retrieve provider contract & check Evidence Gate status
  const contract = getProviderContract(providerKey);
  if (contract.support_status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS' || contract.support_status !== 'OFFICIALLY_SPECIFIED') {
    const blockedReceipt = {
      provider: providerKey,
      contract_id: contract.contract_id || 'UNKNOWN_CONTRACT',
      http_status: null,
      request_id: null,
      timestamp: new Date().toISOString(),
      auth_status: 'UNSUPPORTED_PENDING_PROVIDER_DOCS',
      identity_verified: false,
      error_code: 'OFFICIAL_EVIDENCE_GATE_BLOCKED_PENDING_PROVIDER_DOCS'
    };

    // Update target registry (sandbox or live)
    updateProviderStatus(providerKey, 'UNSUPPORTED_PENDING_PROVIDER_DOCS', blockedReceipt, registryPath);
    return blockedReceipt;
  }

  // If in future a provider passes the 053C Evidence Gate with verified official docs:
  return {
    provider: providerKey,
    auth_status: 'UNSUPPORTED_PENDING_PROVIDER_DOCS',
    identity_verified: false,
    error_code: 'OFFICIAL_EVIDENCE_GATE_PENDING_CEO_APPROVAL',
    http_status: null,
    request_id: null,
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  probeProviderAuthentication,
  loadRegistry,
  updateProviderStatus,
  DEFAULT_REGISTRY_PATH
};
