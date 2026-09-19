const https = require('https');
const crypto = require('crypto');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
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
  console.log('=== VERIFYING REMOTE CANONICAL PRODUCTION ===\n');

  // 1. Health check
  console.log('1. Querying /api/health-check...');
  const hc = await fetch('https://jayt-production-v3420.vercel.app/api/health-check');
  console.log('Health check status:', hc.statusCode);

  // 2. Resolve Link endpoint with Chairman\'s exact link
  console.log('\n2. Querying /api/resolve-link with https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/ ...');
  const targetShortlink = 'https://vt.tiktok.com/ZS9AJ7tbWDtcs-yOIvD/';
  const resolveRes = await fetch('https://jayt-production-v3420.vercel.app/api/resolve-link?url=' + encodeURIComponent(targetShortlink));
  console.log('Resolve link status:', resolveRes.statusCode);
  const resolveJson = JSON.parse(resolveRes.buffer.toString('utf8'));
  console.log('Resolve link response:', resolveJson);

  // 3. Remote JS Bundle Hash
  console.log('\n3. Verifying remote JS bundle hash...');
  const jsRes = await fetch('https://jayt-production-v3420.vercel.app/jayt_apex_interface.js');
  const remoteHash = crypto.createHash('sha256').update(jsRes.buffer).digest('hex');
  console.log('Remote JS status:', jsRes.statusCode, 'size:', jsRes.buffer.length, 'sha256:', remoteHash);

  const localHash = crypto.createHash('sha256').update(require('fs').readFileSync('03_SOURCE_OF_TRUTH/jayt_apex_interface.js')).digest('hex');
  console.log('Local JS sha256: ', localHash);
  console.log('Parity:', remoteHash === localHash ? 'PASS TUYỆT ĐỐI 100%' : 'MISMATCH');
}

verify().catch(console.error);
