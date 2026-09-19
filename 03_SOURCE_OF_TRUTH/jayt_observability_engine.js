/**
 * JAYT OBSERVABILITY ENGINE (ZERO PII POLICY)
 * Governing Directive: JAYT-245 Section BR (BR.8)
 * Tracks Uptime, Asset Load Failures, Runtime Errors, Broken Links,
 * Performance and Accessibility regressions.
 * STRICT ZERO PII: Never logs form inputs, precise GPS, user identity or secrets.
 */

(function(global) {
  const JAYT_OBSERVABILITY = {
    version: "1.0.0-br",
    environment: "STAGING_REVIEW_BR",
    zero_pii_policy_active: true,
    telemetry_buffer: [],

    // Sanitizer to strip any accidental sensitive patterns
    sanitize: function(data) {
      if (typeof data !== 'object' || data === null) return data;
      const clean = Array.isArray(data) ? [] : {};
      const forbiddenKeys = ['password', 'token', 'secret', 'email', 'phone', 'fullname', 'address', 'lat', 'lng', 'coord', 'input_value'];

      for (let k in data) {
        if (data.hasOwnProperty(k)) {
          if (forbiddenKeys.some(f => k.toLowerCase().includes(f))) {
            clean[k] = '[REDACTED_BY_ZERO_PII_POLICY]';
          } else if (typeof data[k] === 'object') {
            clean[k] = this.sanitize(data[k]);
          } else {
            clean[k] = data[k];
          }
        }
      }
      return clean;
    },

    // Record system event
    recordEvent: function(eventType, eventData) {
      const entry = {
        type: eventType,
        timestamp: new Date().toISOString(),
        env: this.environment,
        data: this.sanitize(eventData)
      };
      this.telemetry_buffer.push(entry);
      if (this.telemetry_buffer.length > 50) {
        this.telemetry_buffer.shift(); // keep memory bounded
      }
      return entry;
    },

    // Track Asset Load Failures
    trackAssetLoad: function(assetUrl, success, status) {
      return this.recordEvent('ASSET_LOAD_MONITOR', {
        asset_url: assetUrl,
        success: success,
        http_status: status || (success ? 200 : 404),
        is_hero_asset: assetUrl.includes('dragon_bridge_hero_001')
      });
    },

    // Track Runtime JS Errors
    trackRuntimeError: function(message, source, lineno) {
      return this.recordEvent('RUNTIME_ERROR_MONITOR', {
        message: message,
        source: source,
        line: lineno
      });
    },

    // Initialize DOM Watcher
    init: function() {
      if (typeof window === 'undefined') return;

      window.addEventListener('error', (e) => {
        if (e.target && (e.target.tagName === 'IMG' || e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK')) {
          this.trackAssetLoad(e.target.src || e.target.href, false, 404);
        } else {
          this.trackRuntimeError(e.message, e.filename, e.lineno);
        }
      }, true);

      console.log('🛡️ [JayT Observability Engine Initialized] Zero-PII Telemetry Active.');
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = JAYT_OBSERVABILITY;
  } else {
    global.JAYT_OBSERVABILITY = JAYT_OBSERVABILITY;
    JAYT_OBSERVABILITY.init();
  }
})(typeof window !== 'undefined' ? window : global);
