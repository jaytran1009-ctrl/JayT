const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)' } }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve({ statusCode: res.statusCode, headers: res.headers, buffer });
      });
    }).on('error', reject);
  });
}

async function verify() {
  console.log('=== VERIFYING REMOTE CANONICAL PRODUCTION (JAYT-421) ===\n');

  // 1. Health check
  console.log('1. Querying /api/health-check...');
  const hc = await fetch('https://jayt-production-v3420.vercel.app/api/health-check');
  console.log('Health check status:', hc.statusCode);

  // 2. Resolve Link endpoint with Chairman\'s shortlink
  console.log('\n2. Querying /api/resolve-link with https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/ ...');
  const targetShortlink = 'https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/';
  const resolveRes = await fetch('https://jayt-production-v3420.vercel.app/api/resolve-link?url=' + encodeURIComponent(targetShortlink));
  console.log('Resolve link status:', resolveRes.statusCode);
  const resolveJson = JSON.parse(resolveRes.buffer.toString('utf8'));
  console.log('Resolve link response title:', resolveJson.title);

  // 3. Remote JS Bundle Hash & Parity
  console.log('\n3. Verifying remote JS bundle hash...');
  const jsRes = await fetch('https://jayt-production-v3420.vercel.app/jayt_apex_interface.js');
  const remoteHash = crypto.createHash('sha256').update(jsRes.buffer).digest('hex');
  console.log('Remote JS status:', jsRes.statusCode, 'size:', jsRes.buffer.length, 'sha256:', remoteHash);

  const localBuf = fs.readFileSync(path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js'));
  const localHash = crypto.createHash('sha256').update(localBuf).digest('hex');
  console.log('Local JS size:  ', localBuf.length, 'sha256:', localHash);

  const isParity = (remoteHash === localHash && jsRes.buffer.length === localBuf.length);
  console.log('Bit-Parity:     ', isParity ? 'PASS TUYỆT ĐỐI 100%' : 'MISMATCH');

  // 4. Remote content checks for Advisory Engine
  const remoteCode = jsRes.buffer.toString('utf8');
  const hasAdvisory = remoteCode.includes('renderBuyingAdvisoryEngineHtml');
  const hasDaNangSubtitle = remoteCode.includes('Hòa Khánh · Hải Châu · Ngũ Hành Sơn');
  const hasGoldenHours = remoteCode.includes('MẸO ÁP MÃ KÉP GIỜ VÀNG');
  const hasDaNangShipping = remoteCode.includes('CẢNH BÁO VẬN CHUYỂN ĐÀ NẴNG');

  console.log('\n4. Remote feature validation:');
  console.log('  renderBuyingAdvisoryEngineHtml:', hasAdvisory ? 'OK' : 'MISSING');
  console.log('  Da Nang subtitle:              ', hasDaNangSubtitle ? 'OK' : 'MISSING');
  console.log('  Pillar 2 (Golden Hours):       ', hasGoldenHours ? 'OK' : 'MISSING');
  console.log('  Pillar 3 (Da Nang Shipping):   ', hasDaNangShipping ? 'OK' : 'MISSING');

  if (isParity && hasAdvisory && hasGoldenHours && hasDaNangShipping) {
    console.log('\n=== ALL J421 REMOTE PRODUCTION GATES PASSED 100% ===');
    process.exit(0);
  } else {
    console.error('\n=== REMOTE GATES FAILED ===');
    process.exit(1);
  }
}

verify().catch(e => {
  console.error('Verification error:', e);
  process.exit(1);
});
