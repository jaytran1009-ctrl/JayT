#!/usr/bin/env node
'use strict';

// Retry #2 preflight: DNS-only. It deliberately makes no HTTP request.
const dns = require('dns').promises;
const fs = require('fs');
const path = require('path');

const hosts = ['www.cgv.vn', 'metiz.vn', 'www.galaxycine.vn', 'education.github.com', 'www.spotify.com', 'danangbus.vn', 'shopeefood.vn', 'food.grab.com'];
const output = path.join(__dirname, 'runtime_evidence', 'NETWORK_READINESS_PROBE_RETRY_02.json');

(async () => {
  const results = await Promise.all(hosts.map(async host => {
    try { return { host, resolved: await dns.lookup(host), status: 'DNS_RESOLVED' }; }
    catch (error) { return { host, status: 'DNS_UNAVAILABLE', error: String(error.code || error.message) }; }
  }));
  const pass = results.every(result => result.status === 'DNS_RESOLVED');
  const receipt = { execution_id: 'EXECUTION_RETRY_02_20260903', probe_type: 'DNS_ONLY_NO_HTTP_CAPTURE', generated_at_utc: new Date().toISOString(), status: pass ? 'NETWORK_PROBE_PASS' : 'NETWORK_PROBE_FAIL', results };
  fs.writeFileSync(output, `${JSON.stringify(receipt, null, 2)}\n`);
  console.log(JSON.stringify(receipt, null, 2));
  process.exitCode = pass ? 0 : 1;
})();
