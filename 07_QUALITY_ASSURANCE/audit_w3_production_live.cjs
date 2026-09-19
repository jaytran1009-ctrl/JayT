const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const candidateDir = path.join(ROOT, '08_RELEASE_VAULT', 'candidates', 'v3.448.0-w3');
const candidate = JSON.parse(fs.readFileSync(path.join(candidateDir, 'candidate_manifest.json'), 'utf8'));
const baseUrl = process.env.JAYT_W3_PRODUCTION_URL || 'https://jayt-production-v3420.vercel.app';
const outputPath = path.join(ROOT, '08_RELEASE_VAULT', 'JAYT_W3_PRODUCTION_GO_LIVE_RECEIPT.json');

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

async function auditAsset(relativePath, expected) {
  const livePath = relativePath === 'index.html' ? '/' : `/${relativePath}`;
  const response = await fetch(`${baseUrl}${livePath}`, {
    cache: 'no-store',
    signal: AbortSignal.timeout(20000)
  });
  const body = Buffer.from(await response.arrayBuffer());
  return {
    path: livePath,
    http_status: response.status,
    bytes: body.length,
    sha256: sha256(body),
    expected_sha256: expected.sha256,
    match: response.status === 200 && body.length === expected.bytes && sha256(body) === expected.sha256
  };
}

async function run() {
  const served = ['index.html', 'jayt_apex_interface.js', 'styles.css', 'registry.json', 'deals_feed.json', 'published_manifest.json', 'search.css', 'search.js'];
  const assets = [];
  for (const relativePath of served) assets.push(await auditAsset(relativePath, candidate.artifact_hashes[relativePath]));
  const manifestAsset = assets.find(asset => asset.path === '/published_manifest.json');
  const manifestResponse = await fetch(`${baseUrl}/published_manifest.json`, { cache: 'no-store', signal: AbortSignal.timeout(20000) });
  const manifest = await manifestResponse.json();
  const feedResponse = await fetch(`${baseUrl}/deals_feed.json`, { cache: 'no-store', signal: AbortSignal.timeout(20000) });
  const feed = await feedResponse.json();
  const offers = Array.isArray(feed) ? feed : (feed.offers || feed.deals || []);
  const offerIds = offers.map(offer => offer.offer_id || offer.id).filter(Boolean).sort();
  const requiredOffers = ['B14_METIZ_U22_2D', 'B18_GALAXY_HAPPY_DAY'];
  const pass = assets.every(asset => asset.match) &&
    manifest.version === 'v3.448.0-w3' &&
    manifest.technical_boundaries?.affiliate_enabled === false &&
    manifest.technical_boundaries?.production_deployment_authorized === true &&
    manifestAsset?.match === true &&
    requiredOffers.every(id => offerIds.includes(id));

  const receipt = {
    receipt_id: 'JAYT_W3_PRODUCTION_GO_LIVE_RECEIPT',
    version: 'v3.448.0-w3',
    canonical_url: baseUrl,
    deployment_id: 'dpl_FVrUNSADMUQore2umH5VyywADiXS',
    ready_state: 'READY',
    target: 'production',
    served_assets: assets,
    live_contract: {
      manifest_version: manifest.version,
      affiliate_enabled: manifest.technical_boundaries?.affiliate_enabled,
      production_deployment_authorized: manifest.technical_boundaries?.production_deployment_authorized,
      public_offer_ids: offerIds,
      required_wave_1_offer_ids: requiredOffers
    },
    decision: pass ? 'PASS__W3_PRODUCTION_LIVE__AFFILIATE_DISABLED' : 'FAIL__INVESTIGATE_BEFORE_DECLARING_GO_LIVE'
  };
  fs.writeFileSync(outputPath, JSON.stringify(receipt, null, 2) + '\n');
  console.log(JSON.stringify(receipt, null, 2));
  process.exitCode = pass ? 0 : 2;
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
