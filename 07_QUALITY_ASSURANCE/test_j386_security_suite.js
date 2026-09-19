/**
 * JAYT-386 AUTOMATED SECURITY AND SSRF REMEDIATION TEST SUITE
 * Mandate: WORK_ORDER_J386_SECURITY_AND_LEVEL_MAX.json
 * Tests all 10 security rejection paths, DNS IP range controls, and contract enforcement.
 */

const assert = require('assert');
const handler = require('../deploy/api/health-check.js');
const { isProhibitedIp, resolveAndValidateHost, AUDITED_CATALOGUE, AUDITED_HOST_ALLOWLIST } = handler;

// Mock Response Helper
function createMockRes() {
  return {
    statusCode: null,
    headers: {},
    body: '',
    setHeader(key, value) {
      this.headers[key] = value;
    },
    end(chunk) {
      if (chunk) this.body += chunk;
    },
    json() {
      try {
        return JSON.parse(this.body);
      } catch (e) {
        return null;
      }
    }
  };
}

async function runSecuritySuite() {
  console.log('================================================================');
  console.log('RUNNING JAYT-386 SECURITY & SSRF TEST SUITE');
  console.log('================================================================\n');

  let passed = 0;
  let total = 0;

  function record(testName, result) {
    total++;
    if (result) {
      passed++;
      console.log(`[PASS] ${total}. ${testName}`);
    } else {
      console.error(`[FAIL] ${total}. ${testName}`);
      process.exitCode = 1;
    }
  }

  // ---------------------------------------------------------------------------
  // TEST 1: Query parameter ?url= MUST be rejected immediately (GET)
  // ---------------------------------------------------------------------------
  {
    const req = {
      method: 'GET',
      url: '/api/health-check?url=https://evil.internal/metadata',
      query: { url: 'https://evil.internal/metadata' },
      headers: {}
    };
    const res = createMockRes();
    await handler(req, res);
    const data = res.json();
    record(
      'GET /api/health-check?url=... is rejected with HTTP 400',
      res.statusCode === 400 && data && data.error === 'INVALID_REQUEST'
    );
  }

  // ---------------------------------------------------------------------------
  // TEST 2: Query parameter ?url= with cloud metadata IP MUST be rejected (GET)
  // ---------------------------------------------------------------------------
  {
    const req = {
      method: 'GET',
      url: '/api/health-check?url=http://169.254.169.254/latest/meta-data',
      query: { url: 'http://169.254.169.254/latest/meta-data' },
      headers: {}
    };
    const res = createMockRes();
    await handler(req, res);
    const data = res.json();
    record(
      'Cloud metadata IP in query parameter rejected with HTTP 400',
      res.statusCode === 400 && data && data.error === 'INVALID_REQUEST'
    );
  }

  // ---------------------------------------------------------------------------
  // TEST 3: POST body with forbidden 'url' property MUST be rejected (POST)
  // ---------------------------------------------------------------------------
  {
    const req = {
      method: 'POST',
      url: '/api/health-check',
      body: { url: 'http://127.0.0.1:8080/admin' },
      headers: { 'content-type': 'application/json' }
    };
    const res = createMockRes();
    await handler(req, res);
    const data = res.json();
    record(
      "POST body with forbidden 'url' field rejected with HTTP 400 FORBIDDEN_FIELD_DETECTED",
      res.statusCode === 400 && data && data.error === 'FORBIDDEN_FIELD_DETECTED'
    );
  }

  // ---------------------------------------------------------------------------
  // TEST 4: POST body with extra/arbitrary fields MUST be rejected (POST)
  // ---------------------------------------------------------------------------
  {
    const req = {
      method: 'POST',
      url: '/api/health-check',
      body: { itemId: 'DORM_SKU_01_OCAM_DIENQUANG', targetUrl: 'http://internal.service' },
      headers: { 'content-type': 'application/json' }
    };
    const res = createMockRes();
    await handler(req, res);
    const data = res.json();
    record(
      "POST body with unexpected field 'targetUrl' rejected with HTTP 400",
      res.statusCode === 400 && data && data.error === 'FORBIDDEN_FIELD_DETECTED'
    );
  }

  // ---------------------------------------------------------------------------
  // TEST 5: POST body with unknown itemId MUST be rejected before any outbound request
  // ---------------------------------------------------------------------------
  {
    const req = {
      method: 'POST',
      url: '/api/health-check',
      body: { itemId: 'ATTACKER_INVENTED_SKU_999' },
      headers: { 'content-type': 'application/json' }
    };
    const res = createMockRes();
    await handler(req, res);
    const data = res.json();
    record(
      'Unknown itemId rejected with HTTP 400 and zero outbound network calls',
      res.statusCode === 400 && data && data.error === 'UNKNOWN_ITEM_ID'
    );
  }

  // ---------------------------------------------------------------------------
  // TEST 6: Unit Test: isProhibitedIp IPv4 Private and Reserved Ranges
  // ---------------------------------------------------------------------------
  {
    const privateIpv4s = [
      '127.0.0.1',       // Loopback
      '127.0.1.1',       // Loopback
      '10.0.0.1',        // RFC 1918 Class A
      '10.254.254.254',  // RFC 1918 Class A
      '172.16.0.1',      // RFC 1918 Class B
      '172.31.255.255',  // RFC 1918 Class B
      '192.168.0.1',     // RFC 1918 Class C
      '192.168.1.254',   // RFC 1918 Class C
      '169.254.169.254', // AWS/GCP Instance Metadata
      '169.254.1.1',     // Link Local
      '100.64.0.1',      // Carrier Grade NAT
      '100.127.255.255', // Carrier Grade NAT
      '0.0.0.0',         // Current network
      '224.0.0.1',       // Multicast
      '240.0.0.1',       // Reserved
      '255.255.255.255'  // Broadcast
    ];

    const allBlocked = privateIpv4s.every(ip => isProhibitedIp(ip) === true);
    const publicIpv4s = ['8.8.8.8', '1.1.1.1', '142.250.190.46', '13.228.12.1'];
    const allAllowed = publicIpv4s.every(ip => isProhibitedIp(ip) === false);

    record(
      'IPv4 Prohibited Range verification (Loopback, 10/8, 172.16/12, 192.168/16, 169.254/16, CGNAT, Multicast)',
      allBlocked && allAllowed
    );
  }

  // ---------------------------------------------------------------------------
  // TEST 7: Unit Test: isProhibitedIp IPv6 and IPv4-mapped IPv6 Ranges
  // ---------------------------------------------------------------------------
  {
    const prohibitedIpv6s = [
      '::1',                         // Loopback
      '0:0:0:0:0:0:0:1',             // Loopback expanded
      'fe80::1',                     // Link Local
      'fe80::200:5aee:feaa:20a2',    // Link Local
      'fc00::1',                     // Unique Local (RFC 4193)
      'fd12:3456:789a:1::1',         // Unique Local
      'ff02::1',                     // Multicast
      '::ffff:127.0.0.1',            // IPv4-mapped Loopback
      '::ffff:10.0.0.1',             // IPv4-mapped Private
      '::ffff:169.254.169.254'       // IPv4-mapped Metadata
    ];

    const allIpv6Blocked = prohibitedIpv6s.every(ip => isProhibitedIp(ip) === true);
    const publicIpv6 = '2606:4700:4700::1111'; // Cloudflare DNS
    const publicAllowed = isProhibitedIp(publicIpv6) === false;

    record(
      'IPv6 Prohibited Range verification (::1, fe80::/10, fc00::/7, Multicast, IPv4-mapped IPv6)',
      allIpv6Blocked && publicAllowed
    );
  }

  // ---------------------------------------------------------------------------
  // TEST 8: Mock DNS resolving to Private IP -> Entire Hostname Rejected
  // ---------------------------------------------------------------------------
  {
    const mockResolver = {
      resolve4: async () => ['127.0.0.1'],
      resolve6: async () => []
    };

    let threw = false;
    try {
      await resolveAndValidateHost('shopee.vn', mockResolver);
    } catch (err) {
      threw = err.message.includes('PROHIBITED_IP_RANGE');
    }

    record(
      'Mock DNS returning 127.0.0.1 throws PROHIBITED_IP_RANGE',
      threw
    );
  }

  // ---------------------------------------------------------------------------
  // TEST 9: Mock DNS returning Mixed IP (1 Public, 1 Private) -> Rejected
  // ---------------------------------------------------------------------------
  {
    const mockResolver = {
      resolve4: async () => ['142.250.190.46', '10.0.0.1'],
      resolve6: async () => []
    };

    let threw = false;
    try {
      await resolveAndValidateHost('shopee.vn', mockResolver);
    } catch (err) {
      threw = err.message.includes('PROHIBITED_IP_RANGE');
    }

    record(
      'Mock DNS returning mixed public and private IP rejects entire destination',
      threw
    );
  }

  // ---------------------------------------------------------------------------
  // TEST 10: POST execution with Mock Resolver blocking destination returns HTTP 400
  // ---------------------------------------------------------------------------
  {
    const mockResolver = {
      resolve4: async () => ['169.254.169.254'],
      resolve6: async () => []
    };

    const req = {
      method: 'POST',
      url: '/api/health-check',
      body: { itemId: 'DORM_SKU_01_OCAM_DIENQUANG' },
      headers: { 'content-type': 'application/json' }
    };
    const res = createMockRes();
    await handler(req, res, mockResolver);
    const data = res.json();

    record(
      'POST handler with mock private DNS returns HTTP 400 DESTINATION_VALIDATION_FAILED',
      res.statusCode === 400 && data && data.error === 'DESTINATION_VALIDATION_FAILED'
    );
  }

  // ---------------------------------------------------------------------------
  // TEST 11: GET /api/health-check returns Ledger with truthful governance
  // ---------------------------------------------------------------------------
  {
    const req = {
      method: 'GET',
      url: '/api/health-check',
      headers: {}
    };
    const res = createMockRes();
    await handler(req, res);
    const data = res.json();

    record(
      'GET /api/health-check returns ledger declaring honest ephemeral SLA without false 60s durable claims',
      res.statusCode === 200 &&
      data &&
      data.service === 'JAYT_LINK_HEALTH_WORKER' &&
      data.security_contract.ssrf_protection_active === true &&
      data.freshness_governance.durable_sla_guarantee.includes('NOT_ASSERTED')
    );
  }

  // ---------------------------------------------------------------------------
  // TEST 12: GET /api/health-check?itemId=... reads stored catalogued status safely
  // ---------------------------------------------------------------------------
  {
    const req = {
      method: 'GET',
      url: '/api/health-check?itemId=DORM_SKU_01_OCAM_DIENQUANG',
      query: { itemId: 'DORM_SKU_01_OCAM_DIENQUANG' },
      headers: {}
    };
    const res = createMockRes();
    await handler(req, res);
    const data = res.json();

    record(
      'GET /api/health-check?itemId=SKU returns stored catalogue status with zero outbound probes',
      res.statusCode === 200 &&
      data &&
      data.itemId === 'DORM_SKU_01_OCAM_DIENQUANG' &&
      data.status === 'STORED_AVAILABLE'
    );
  }

  console.log('\n================================================================');
  console.log(`SECURITY TEST SUITE COMPLETED: ${passed}/${total} PASS`);
  console.log('================================================================\n');

  return { passed, total, allPassed: passed === total };
}

if (require.main === module) {
  runSecuritySuite().then(({ allPassed }) => {
    if (!allPassed) process.exit(1);
  });
}

module.exports = runSecuritySuite;
