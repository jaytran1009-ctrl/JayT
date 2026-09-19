/**
 * JAYT ONLINE FEED GATEWAY ADAPTER INTERFACE
 * Directive: JAYT-TRACK1-TRUST-BOUNDARY-050C
 * 
 * Rules:
 * 1. Reads credentials strictly from process.env (never hardcoded).
 * 2. Exponential backoff retry with Fail-Closed guarantee on error.
 * 3. Enforces standard online_deal_feed schema with ZERO DEFAULT FILL-IN.
 * 4. Zero real network calls unless authenticated credentials are explicitly loaded in environment.
 *
 * TRUST BOUNDARY RULES (050C — new):
 * - Reject ANY payload containing TEST_ONLY, DEMO_ONLY, SYNTHETIC markers unconditionally (Track 1 Gate 0).
 * - Only accept providers registered in allowlist REGISTERED_PROVIDERS.
 * - Provider API endpoint MUST strictly use HTTPS (http:// endpoint rejected).
 * - Every raw item payload transitions to RAW_PROVIDER_PAYLOAD with raw_payload_sha256, ingestion_timestamp, and full provenance_audit.
 *
 * HARDENING RULES (050B — maintained):
 * - affiliate_url MUST be HTTPS (http:// rejected).
 * - valid_from < valid_to, and valid_to must be in the future (not expired).
 * - conditions (min_spend, user_eligibility, payment_method, rules) ALL required — no partial.
 * - currency MUST be explicit from provider payload — no default 'VND' assumption.
 * - Price arithmetic: original_price > 0, discounted_price > 0, discounted_price <= original_price.
 * - discount_rate if provided must match calculated rate within ±2% tolerance.
 */

const crypto = require('crypto');

const REGISTERED_PROVIDERS = Object.freeze([
  'ACCESSTRADE_VN',
  'MASOFFER_VN',
  'ECOMMOBI_VN',
  'SHOPEE_AFFILIATE',
  'LAZADA_AFFILIATE',
  'TIKTOK_AFFILIATE',
  'AFFILIATE_NETWORK_API',
  'OFFICIAL_OPEN_PLATFORM_API'
]);

function containsSyntheticOrTestMarker(value) {
  if (typeof value !== 'string') return false;
  const lower = value.toLowerCase();
  return lower.includes('synthetic') ||
         lower.includes('test_only') ||
         lower.includes('demo_only') ||
         lower.includes('not_for_render') ||
         lower.includes('not_evidence') ||
         lower.includes('giả định') ||
         lower.includes('mô phỏng');
}

class OnlineFeedAdapter {
  constructor(providerName, envKeyPrefix) {
    this.providerName = providerName;
    this.envKeyPrefix = envKeyPrefix;
  }

  isProviderRegistered() {
    return REGISTERED_PROVIDERS.includes(this.providerName);
  }

  getCredentials() {
    if (!this.isProviderRegistered()) {
      return {
        configured: false,
        status: 'UNREGISTERED_PROVIDER',
        reason: `TRUST_BOUNDARY_VIOLATION: Provider "${this.providerName}" is not registered in the trusted allowlist.`
      };
    }

    const apiKey = process.env[`${this.envKeyPrefix}_API_KEY`];
    const apiSecret = process.env[`${this.envKeyPrefix}_API_SECRET`];
    const endpoint = process.env[`${this.envKeyPrefix}_API_ENDPOINT`];

    if (!apiKey || !apiSecret || !endpoint) {
      return {
        configured: false,
        status: 'UNCONFIGURED',
        reason: `MISSING_CREDENTIALS: ${this.envKeyPrefix}_API_KEY / SECRET / ENDPOINT not present in environment variables.`
      };
    }

    if (!endpoint.startsWith('https://')) {
      return {
        configured: false,
        status: 'INSECURE_ENDPOINT_REJECTED',
        reason: `SECURITY_VIOLATION: ${this.envKeyPrefix}_API_ENDPOINT must strictly use HTTPS protocol.`
      };
    }

    return {
      configured: true,
      status: 'CONFIGURED',
      apiKey,
      apiSecret,
      endpoint
    };
  }

  async fetchDealsWithRetry(maxRetries = 3) {
    const creds = this.getCredentials();
    if (!creds.configured) {
      return {
        success: false,
        status: creds.status,
        reason: creds.reason,
        raw_items_count: 0,
        validated_items: [],
        rejected_items: []
      };
    }

    let attempt = 0;
    while (attempt < maxRetries) {
      attempt++;
      try {
        const response = await this.executeAuthenticatedRequest(creds);
        const { validated, rejected } = this.normalizeAndValidate(response.items || []);
        return {
          success: true,
          status: 'RAW_PROVIDER_PAYLOAD',
          attempt,
          raw_items_count: response.items ? response.items.length : 0,
          validated_items: validated,
          rejected_items: rejected
        };
      } catch (err) {
        if (attempt >= maxRetries) {
          return {
            success: false,
            status: 'FAIL_CLOSED_NETWORK_ERROR',
            reason: `Exceeded max retries (${maxRetries}): ${err.message}`,
            raw_items_count: 0,
            validated_items: [],
            rejected_items: []
          };
        }
        // Exponential backoff
        await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 100));
      }
    }
  }

  /**
   * Validates raw items STRICTLY — no default fill-in for any field.
   * Missing or invalid required field → REJECTED_INCOMPLETE.
   * 050C: Rejects test/synthetic markers, checks allowlist, and calculates SHA-256 provenance.
   */
  normalizeAndValidate(rawItems) {
    const validated = [];
    const rejected = [];

    // Guard: provider registration check
    if (!this.isProviderRegistered()) {
      for (const raw of rawItems) {
        rejected.push({
          raw_item: raw,
          status: 'REJECTED_UNREGISTERED_PROVIDER',
          violations: [`TRUST_BOUNDARY_VIOLATION: Provider "${this.providerName}" is not registered in the allowlist.`],
          missing_fields: [],
          reason: `Provider "${this.providerName}" không nằm trong danh sách đăng ký cho phép.`
        });
      }
      return { validated, rejected };
    }

    for (const raw of rawItems) {
      const violations = this.checkAllRequirements(raw);
      if (violations.length > 0) {
        const missing_fields = violations
          .filter(v => v.includes('MISSING'))
          .map(v => v.replace(/^MISSING(\/INVALID)?:?\s*/, '').split(' ')[0]);
        rejected.push({
          raw_item: raw,
          status: 'REJECTED_INCOMPLETE',
          violations,
          missing_fields,
          reason: `Vi phạm ${violations.length} yêu cầu: ${violations.join('; ')}. Không được tự điền giá trị mặc định.`
        });
        continue;
      }

      // Compute byte-for-byte SHA-256 hash of raw input
      const rawString = typeof raw === 'string' ? raw : JSON.stringify(raw);
      const rawPayloadSha256 = crypto.createHash('sha256').update(rawString).digest('hex');
      const ingestionTimestamp = new Date().toISOString();
      const externalDealId = String(raw.id || raw.deal_id);

      validated.push({
        feed_provider: this.providerName,
        external_deal_id: externalDealId,
        item_name: String(raw.name || raw.title),
        original_price: Number(raw.original_price),
        discounted_price: Number(raw.discounted_price),
        discount_rate: typeof raw.discount_rate === 'number' ? Number(raw.discount_rate) : null,
        currency: String(raw.currency),
        voucher_code: typeof raw.voucher_code === 'string' ? raw.voucher_code : null,
        conditions: {
          min_spend: Number(raw.min_spend),
          user_eligibility: String(raw.user_eligibility),
          payment_method: String(raw.payment_method),
          transparent_rules: raw.rules.slice()
        },
        valid_from: new Date(raw.start_time).toISOString(),
        valid_to: new Date(raw.end_time).toISOString(),
        affiliate_tracking_url: raw.affiliate_url,
        affiliate_disclosure: 'AFFILIATE_LINK',
        volatile_flag: true,
        raw_payload_sha256: rawPayloadSha256,
        ingestion_timestamp: ingestionTimestamp,
        provenance_audit: {
          provider_id: this.providerName,
          endpoint_protocol: 'HTTPS',
          source_item_id: externalDealId,
          received_at: ingestionTimestamp,
          raw_payload_sha256: rawPayloadSha256,
          trust_boundary_verified: true
        },
        governance_status: 'RAW_PROVIDER_PAYLOAD'
      });
    }

    return { validated, rejected };
  }

  /**
   * Comprehensive field, semantic & trust boundary validation (050A + 050B + 050C).
   * Returns array of violation descriptions. Empty array = all valid.
   */
  checkAllRequirements(item) {
    const violations = [];
    if (!item) return ['MISSING: entire_item'];

    // === GATE 0: TRUST BOUNDARY SYNTHETIC / TEST REJECTION (050C) ===
    if (item.test_notice && containsSyntheticOrTestMarker(item.test_notice)) {
      violations.push('REJECTED_TEST_OR_SYNTHETIC: test_notice contains forbidden test marker in live pipeline');
    }
    if (item.demo_notice && containsSyntheticOrTestMarker(item.demo_notice)) {
      violations.push('REJECTED_TEST_OR_SYNTHETIC: demo_notice contains forbidden demo marker in live pipeline');
    }
    if (containsSyntheticOrTestMarker(item.name || item.title || '')) {
      violations.push('REJECTED_TEST_OR_SYNTHETIC: deal name/title contains forbidden synthetic/test marker');
    }
    if (containsSyntheticOrTestMarker(item.id || item.deal_id || '')) {
      violations.push('REJECTED_TEST_OR_SYNTHETIC: deal id contains forbidden synthetic/test marker');
    }
    if (item.rules && Array.isArray(item.rules)) {
      for (const r of item.rules) {
        if (containsSyntheticOrTestMarker(r)) {
          violations.push('REJECTED_TEST_OR_SYNTHETIC: rules contain forbidden synthetic/test marker');
          break;
        }
      }
    }

    // === IDENTITY ===
    if (!item.id && !item.deal_id) violations.push('MISSING: id/deal_id');
    if (!item.name && !item.title) violations.push('MISSING: name/title');

    // === PRICE ARITHMETIC (050B) ===
    if (typeof item.original_price !== 'number') {
      violations.push('MISSING: original_price (must be number)');
    } else if (item.original_price <= 0) {
      violations.push('INVALID: original_price must be > 0');
    }
    if (typeof item.discounted_price !== 'number') {
      violations.push('MISSING: discounted_price (must be number)');
    } else if (item.discounted_price <= 0) {
      violations.push('INVALID: discounted_price must be > 0');
    }
    // Cross-field: discounted <= original
    if (typeof item.original_price === 'number' && item.original_price > 0 &&
        typeof item.discounted_price === 'number' && item.discounted_price > 0) {
      if (item.discounted_price > item.original_price) {
        violations.push('INVALID: discounted_price must be <= original_price');
      }
      // discount_rate cross-check (±2% tolerance)
      if (typeof item.discount_rate === 'number') {
        const expectedRate = ((item.original_price - item.discounted_price) / item.original_price) * 100;
        if (Math.abs(item.discount_rate - expectedRate) > 2) {
          violations.push(`INVALID: discount_rate ${item.discount_rate}% does not match calculated ${expectedRate.toFixed(1)}% (±2% tolerance)`);
        }
      }
    }

    // === CURRENCY — explicit, no default (050B) ===
    if (typeof item.currency !== 'string' || item.currency.trim() === '') {
      violations.push('MISSING: currency (must be explicitly provided by provider, no default assumption)');
    }

    // === DATE VALIDATION (050B) ===
    if (!item.start_time) {
      violations.push('MISSING: start_time');
    }
    if (!item.end_time) {
      violations.push('MISSING: end_time');
    }
    if (item.start_time && item.end_time) {
      const fromDate = new Date(item.start_time);
      const toDate = new Date(item.end_time);
      if (isNaN(fromDate.getTime())) {
        violations.push('INVALID: start_time is not a valid date');
      }
      if (isNaN(toDate.getTime())) {
        violations.push('INVALID: end_time is not a valid date');
      }
      if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
        if (fromDate >= toDate) {
          violations.push('INVALID: start_time must be before end_time (valid_from < valid_to)');
        }
        if (toDate <= new Date()) {
          violations.push('EXPIRED: end_time is in the past — deal has already expired');
        }
      }
    }

    // === AFFILIATE URL — HTTPS only (050B) ===
    if (typeof item.affiliate_url !== 'string' || item.affiliate_url.trim() === '') {
      violations.push('MISSING: affiliate_url');
    } else if (!item.affiliate_url.startsWith('https://')) {
      violations.push('INVALID: affiliate_url must use HTTPS (http:// is rejected for security)');
    }

    // === CONDITIONS — ALL sub-fields required (050B) ===
    if (typeof item.min_spend !== 'number' || item.min_spend < 0) {
      violations.push('MISSING/INVALID: min_spend (conditions — must be non-negative number)');
    }
    if (typeof item.user_eligibility !== 'string' || item.user_eligibility.trim() === '') {
      violations.push('MISSING: user_eligibility (conditions — must be explicit string)');
    }
    if (typeof item.payment_method !== 'string' || item.payment_method.trim() === '') {
      violations.push('MISSING: payment_method (conditions — must be explicit string)');
    }
    if (!Array.isArray(item.rules) || item.rules.length === 0 || !item.rules.every(r => typeof r === 'string' && r.trim().length > 0)) {
      violations.push('MISSING/INVALID: rules (conditions — must be non-empty array of transparent rule strings)');
    }

    return violations;
  }

  async executeAuthenticatedRequest(creds) {
    // Contract stub - requires real external environment configuration
    throw new Error('EXTERNAL_API_CONNECTION_BLOCKED: Awaiting explicit CEO credential provisioning.');
  }
}

/**
 * Secret Sanitization Utility
 * Directive: JAYT-SECRET-HYGIENE-052A
 * Strictly redacts sensitive credentials, tokens, authorization headers, and signed params.
 */
function sanitizeForLogging(data) {
  if (!data) return data;
  if (typeof data === 'string') {
    return sanitizeUrl(data);
  }
  if (typeof data !== 'object') return data;

  const SENSITIVE_KEYS = [
    'authorization', 'api_key', 'apikey', 'api_secret', 'apisecret',
    'secret', 'token', 'bot_token', 'access_token', 'refresh_token',
    'password', 'private_key', 'credentials'
  ];

  if (Array.isArray(data)) {
    return data.map(item => sanitizeForLogging(item));
  }

  const sanitized = {};
  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase();
    if (SENSITIVE_KEYS.some(k => lowerKey.includes(k))) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeForLogging(value);
    } else if (typeof value === 'string') {
      sanitized[key] = sanitizeUrl(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

function sanitizeHeaders(headers) {
  if (!headers || typeof headers !== 'object') return {};
  const sanitized = { ...headers };
  for (const k of Object.keys(sanitized)) {
    const lk = k.toLowerCase();
    if (lk.includes('authorization') || lk.includes('secret') || lk.includes('token') || lk.includes('key')) {
      sanitized[k] = '[REDACTED]';
    }
  }
  return sanitized;
}

function sanitizeUrl(rawUrl) {
  if (typeof rawUrl !== 'string') return rawUrl;
  return rawUrl.replace(/(key|token|secret|sig|signature|auth)=([^&]+)/gi, '$1=[REDACTED]');
}

module.exports = {
  OnlineFeedAdapter,
  REGISTERED_PROVIDERS,
  containsSyntheticOrTestMarker,
  sanitizeForLogging,
  sanitizeHeaders,
  sanitizeUrl
};
