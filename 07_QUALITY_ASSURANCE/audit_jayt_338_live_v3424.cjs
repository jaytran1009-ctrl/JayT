const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const root = path.resolve(__dirname, '..');
const output = path.join(root, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'JAYT_338_V3424_LIVE_POST_DEPLOY_AUDIT.json');
const productionAlias = 'https://jayt-production-v3420.vercel.app';

(async () => {
  const preflight = JSON.parse(fs.readFileSync(path.join(root, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'JAYT_337_V3424_PREFLIGHT_AUDIT_RECEIPT.json'), 'utf8'));
  const receipt = {
    receipt_id: 'JAYT_338_V3424_LIVE_POST_DEPLOY_AUDIT',
    directive: 'JAYT-338',
    generated_at_utc: new Date().toISOString(),
    deployment: {
      id: 'dpl_34p9DCu8LZFX7cPmkkVE1DypM5HH',
      url: 'https://jayt-production-v3420-7xaqsa4jm-kuntran777-6857s-projects.vercel.app',
      cli_ready_state: 'READY',
      alias_assignment_completed: true
    },
    expected: { version: 'v3.424.0', total_cards: 51, civic_cards: 24, commercial_cards: 27 },
    immutable_preflight: {
      technical_candidate_passed: preflight.technical_candidate_passed,
      receipt_sha256: 'c991db62504c59dc25a8818c8be301e3500c4ff04bf1b0badf9533048b65aa34'
    },
    live_observations_before_rollback: {
      production_root_http_status: 200,
      registry_http_status: 200,
      registry_identity: 'JAYT_RELEASE_CANDIDATE_V3424_REGISTRY',
      deals_feed_http_status: 404,
      deals_feed_payload: null,
      source: 'Immediate read-only post-deploy probes executed after Vercel alias assignment.'
    },
    gates: {
      deployment_ready: true,
      root_http_200: true,
      registry_v3424_reachable: true,
      deals_feed_http_200_and_empty_array: false,
      full_live_dom_audit_completed: false
    },
    failed_gate: 'deals_feed_http_200_and_empty_array',
    full_live_dom_audit_disclosure: 'Not continued after the first mandatory fail-closed gate. The sealed local candidate had already passed DOM/keyboard/responsive preflight; this is not relabeled as a live post-deploy PASS.',
    rollback: {
      triggered: true,
      reason: 'Live /deals_feed.json returned HTTP 404 instead of HTTP 200 with [].',
      target_version: 'v3.423.0',
      target_cards: 47,
      target_deployment_id: 'dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA',
      alias_command_status: 'SUCCESS'
    },
    verdict: 'FAIL__ROLLBACK_EXECUTED',
    production_baseline_after_audit: null
  };

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    const response = await page.goto(productionAlias, { waitUntil: 'networkidle2', timeout: 30000 });
    const storefront = await page.evaluate(() => ({
      version: window.__JAYT_STOREFRONT__?.version,
      total: window.__JAYT_STOREFRONT__?.totalCardsCount,
      civic: window.__JAYT_STOREFRONT__?.civicCardsCount,
      commercial: window.__JAYT_STOREFRONT__?.commercialCardsCount
    }));
    receipt.rollback.verification = { http_status: response?.status(), storefront };
    receipt.rollback.verified = response?.status() === 200 && storefront.version === 'v3.423.0' && storefront.total === 47;
    receipt.production_baseline_after_audit = receipt.rollback.verified ? 'v3.423.0__47_CARDS__RESTORED' : 'ROLLBACK_VERIFICATION_FAILED';
  } finally {
    await browser.close();
  }

  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, JSON.stringify(receipt, null, 2) + '\n');
  console.log(JSON.stringify({ verdict: receipt.verdict, failed_gate: receipt.failed_gate, rollback: receipt.rollback }, null, 2));
  if (!receipt.rollback.verified) process.exitCode = 1;
})().catch(error => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
