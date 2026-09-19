const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const candidateDir = path.join(ROOT, '08_RELEASE_VAULT', 'candidates', 'v3.448.0-w3');
const candidateManifestPath = path.join(candidateDir, 'candidate_manifest.json');
const releaseManifestPath = path.join(ROOT, '08_RELEASE_VAULT', 'W3_PRODUCTION_RELEASE_MANIFEST.json');
const outputPath = path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'JAYT_W3_PRODUCTION_PREFLIGHT_RECEIPT.json');

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const candidate = readJson(candidateManifestPath);
const release = readJson(releaseManifestPath);
const artifacts = Object.entries(candidate.artifact_hashes).map(([relativePath, expected]) => {
  const absolutePath = path.join(candidateDir, relativePath);
  const actualBytes = fs.statSync(absolutePath).size;
  const actualSha256 = sha256(absolutePath);
  return {
    file: relativePath,
    expected_bytes: expected.bytes,
    actual_bytes: actualBytes,
    expected_sha256: expected.sha256,
    actual_sha256: actualSha256,
    pass: actualBytes === expected.bytes && actualSha256 === expected.sha256
  };
});

const rootPublished = fs.readFileSync(path.join(candidateDir, 'published_manifest.json'));
const publicPublished = fs.readFileSync(path.join(candidateDir, 'public', 'published_manifest.json'));
const rootIndex = fs.readFileSync(path.join(candidateDir, 'index.html'));
const publicIndex = fs.readFileSync(path.join(candidateDir, 'public', 'index.html'));
const published = JSON.parse(rootPublished.toString('utf8'));
const storefront = fs.readFileSync(path.join(candidateDir, 'jayt_apex_interface.js'), 'utf8');
const html = rootIndex.toString('utf8');

const contract = {
  root_public_manifest_match: rootPublished.equals(publicPublished),
  root_public_index_match: rootIndex.equals(publicIndex),
  version: published.version,
  release_scope: published.release_scope,
  production_deployment_authorized: published.technical_boundaries?.production_deployment_authorized,
  production_alias_mutation_authorized: published.technical_boundaries?.production_alias_mutation_authorized,
  affiliate_enabled: published.technical_boundaries?.affiliate_enabled,
  html_declares_w3: html.includes('data-version="v3.448.0-w3"'),
  staging_marker_absent: !html.includes('v3.448.0-w3-staging') && !rootPublished.toString('utf8').includes('v3.448.0-w3-staging'),
  affiliate_guard_present: storefront.includes('function dispatchSmartAffiliate(providerKey)'),
  affiliate_guard_is_non_dispatching: storefront.includes("dispatchPerformed: false") && storefront.includes('destinationUrl: null') && storefront.includes('trackingParameters: null'),
  affiliate_tracking_tokens: ['partner_id', 's.shopee.vn', 'tiki.vn/affiliate', 'c.lazada.vn']
    .reduce((total, token) => total + storefront.toLowerCase().split(token).length - 1, 0),
  release_manifest_authorizes_production: release.governance_and_security_invariants?.production_authorized === true,
  release_manifest_keeps_affiliate_disabled: release.governance_and_security_invariants?.affiliate_enabled === false
};

const pass = artifacts.every(item => item.pass) &&
  contract.root_public_manifest_match &&
  contract.root_public_index_match &&
  contract.version === 'v3.448.0-w3' &&
  contract.release_scope === 'W3_USER_DRIVEN_PRODUCTION_RELEASE' &&
  contract.production_deployment_authorized === true &&
  contract.production_alias_mutation_authorized === true &&
  contract.affiliate_enabled === false &&
  contract.html_declares_w3 &&
  contract.staging_marker_absent &&
  contract.affiliate_guard_present &&
  contract.affiliate_guard_is_non_dispatching &&
  contract.affiliate_tracking_tokens === 0 &&
  contract.release_manifest_authorizes_production &&
  contract.release_manifest_keeps_affiliate_disabled;

const receipt = {
  receipt_id: 'JAYT_W3_PRODUCTION_PREFLIGHT_RECEIPT',
  candidate: 'v3.448.0-w3',
  candidate_manifest_sha256: sha256(candidateManifestPath),
  release_manifest_sha256: sha256(releaseManifestPath),
  artifacts,
  contract,
  decision: pass ? 'PASS__PRODUCTION_PROMOTION_PERMITTED__AFFILIATE_DISABLED' : 'FAIL__DO_NOT_DEPLOY'
};

fs.writeFileSync(outputPath, JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify(receipt, null, 2));
process.exitCode = pass ? 0 : 2;
