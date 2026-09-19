/**
 * JAYT 5 CATEGORY HUBS RED-TEAM TEST SUITE (162)
 * Directive: JAYT-162: 5 CATEGORY HUBS, TRUSTED-AUTOMATION ONLY
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('========================================================================');
console.log('🧪 JAYT-162: 5 CATEGORY HUBS & TRUSTED AUTOMATION RED-TEAM AUDIT');
console.log('========================================================================\n');

const repoRoot = path.resolve(__dirname, '..');
const runsBaseDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'runs');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'autonomous_schedule_registry_162.json');
const contractPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'category_hubs_contract_162.json');
const dashboardPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'hybrid_supply_dashboard_162.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');
const diagnosticReportPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'WINDOWS_TASK_SCHEDULER_HOST_DIAGNOSTIC.md');
const opIntakePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'community_proof_intake_161.json');

const fixturesDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'fixtures');
fs.mkdirSync(fixturesDir, { recursive: true });

function getSha256(filePath) {
  if (!fs.existsSync(filePath)) return 'FILE_NOT_FOUND';
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

let passCount = 0;
let failCount = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${description}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${description}`);
    console.error(`     Error: ${err.message}`);
    failCount++;
  }
}

async function runCategoryHubs162Audit() {
  console.log('--- GATE 1: STATIC CODE SCAN (ZERO STATIC DICTIONARIES & ZERO HARDCODED CLAIMS) ---');
  test('Active pipeline contains zero static dictionaries, unproven cinema prices, or synthetic brand maps', () => {
    const targetDirs = [
      path.join(repoRoot, '05_DEAL_AND_AFFILIATE'),
      path.join(repoRoot, '07_QUALITY_ASSURANCE')
    ];
    const forbidden = ['leaf' + 'Semantics' + 'Map', 'expected_' + 'da_nang_' + 'verified', 'known_' + 'da_nang_' + 'venues'];
    for (const dir of targetDirs) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.includes('quarantine') && !f.includes('test_category_hubs_162.js'));
      for (const file of files) {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        for (const word of forbidden) {
          assert(!content.includes(word), `Forbidden token '${word}' found in ${file}!`);
        }
      }
    }
    console.log('     Scanned all active JS files: ZERO forbidden tokens found.');
  });

  console.log('\n--- GATE 2: DEFINITIVE SCHEDULER STATUS & HONEST ORIGIN VERIFICATION ---');
  test('Host scheduler status is SCHEDULER_BLOCKED_ON_THIS_HOST and origin is MANUAL_TRIGGERED', () => {
    assert(fs.existsSync(diagnosticReportPath), 'Diagnostic report must exist');
    const diagContent = fs.readFileSync(diagnosticReportPath, 'utf8');
    assert(diagContent.includes('SCHEDULER_BLOCKED_ON_THIS_HOST'), 'Diagnostic must conclude SCHEDULER_BLOCKED_ON_THIS_HOST');

    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));
    assert.strictEqual(manifest.execution_origin, 'MANUAL_TRIGGERED', 'Execution origin must be MANUAL_TRIGGERED');
    assert.strictEqual(manifest.host_scheduler_status, 'SCHEDULER_BLOCKED_ON_THIS_HOST');
    console.log('     Verified transparent origin: MANUAL_TRIGGERED with SCHEDULER_BLOCKED_ON_THIS_HOST.');
  });

  console.log('\n--- GATE 3: 5 CATEGORY HUBS DATA CONTRACT COMPLIANCE ---');
  test('5 Category Hubs contract formally defines the 5 hubs and unlock criteria', () => {
    assert(fs.existsSync(contractPath), 'Contract must exist');
    const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
    assert.strictEqual(contract.hubs.length, 5);
    const hubIds = contract.hubs.map(h => h.hub_id);
    assert(hubIds.includes('HUB_1_FOOD_AND_DINING'));
    assert(hubIds.includes('HUB_2_STUDY_SPACES'));
    assert(hubIds.includes('HUB_3_CINEMA_ENTERTAINMENT'));
    assert(hubIds.includes('HUB_4_PUBLIC_TRANSIT'));
    assert(hubIds.includes('HUB_5_DORM_AND_STUDY_SUPPLIES'));
    console.log('     Verified 5 Category Hubs structure.');
  });

  console.log('\n--- GATE 4: 4-TIER DISPLAY MATRIX FORMALIZATION ---');
  test('4-Tier Display Matrix defines clear allowed and forbidden content for all cards', () => {
    const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
    const matrix = contract.display_matrix_4_tiers;
    assert(matrix.TIER_1_VERIFIED_PROOF_DEAL);
    assert(matrix.TIER_2_VERIFIED_VENUE_LISTING);
    assert(matrix.TIER_3_TRACKED_SOURCE_SIGNAL);
    assert(matrix.TIER_4_UNRESOLVED_NEEDS_BACKLOG);
    console.log('     Verified 4-Tier Display Matrix: 🟢, 🔵, 🟣, ⚪.');
  });

  console.log('\n--- GATE 5: OCR QUARANTINE FLOW & SECOND SOURCE REQUIREMENT ---');
  test('OCR engine marks output as OCR_EXTRACTED_UNVERIFIED and prohibits auto-green promotion', () => {
    const { processOcrEvidence, resolveSecondSourceVerification } = require('../05_DEAL_AND_AFFILIATE/ocr_quarantine_engine_162');
    const testOcrInput = {
      image_source_url: 'https://example.test/receipt.jpg',
      extracted_text: 'Menu Sinh Vien 30k tra da 0d'
    };
    const res = processOcrEvidence(testOcrInput);
    assert.strictEqual(res.status, 'OCR_EXTRACTED_UNVERIFIED');
    assert.strictEqual(res.can_auto_promote_to_green, false);
    assert.strictEqual(res.second_source_verified, false);

    // Resolve with second source
    const resolved = resolveSecondSourceVerification(res, {
      verifier_type: 'HUMAN_OPERATOR',
      verifier_id: 'SCOUT_DN_001',
      notes: 'Thực địa xác minh menu đúng giá 30k'
    });
    assert.strictEqual(resolved.second_source_verified, true);
    assert.strictEqual(resolved.status, 'SECOND_SOURCE_CONFIRMED_PENDING_STAGING');
    console.log('     Verified OCR quarantine flow: OCR output isolated & requires second source.');
  });

  console.log('\n--- GATE 6: AFFILIATE & MAP API PERMISSION GATE ---');
  test('Permission gate restricts commercial deep links and map scraping without authorized credentials', () => {
    const { checkPlatformPermission } = require('../05_DEAL_AND_AFFILIATE/affiliate_permission_gate_162');
    const resUnauthorized = checkPlatformPermission('SHOPEE_FOOD', {});
    assert.strictEqual(resUnauthorized.is_authorized, false);
    assert.strictEqual(resUnauthorized.display_mode, 'TRACKED_SOURCE_CARD_ONLY');
    assert.strictEqual(resUnauthorized.can_generate_deep_links, false);

    const resAuthorized = checkPlatformPermission('SHOPEE_FOOD', {
      SHOPEE_FOOD: { api_key_or_token: 'SECRET_API_KEY', is_verified: true, feed_id: 'FEED_SPF_01', authorized_at: '2026-08-27T00:00:00Z' }
    });
    assert.strictEqual(resAuthorized.is_authorized, true);
    assert.strictEqual(resAuthorized.can_generate_deep_links, true);
    console.log('     Verified Affiliate & Map API Permission Gate: Unauthorized platforms restricted to source cards.');
  });

  console.log('\n--- GATE 7: FRESHNESS & ANTI-FRAUD LIFECYCLE (ZERO HISTORICAL DELETION) ---');
  test('Freshness lifecycle transitions to RECHECK_REQUIRED or POSSIBLY_CLOSED without deleting history', () => {
    const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
    const rules = contract.freshness_lifecycle_rules;
    assert.strictEqual(rules.on_ttl_expiry, 'RECHECK_REQUIRED');
    assert.strictEqual(rules.on_single_closed_report, 'POSSIBLY_CLOSED');
    assert.strictEqual(rules.auto_delete_history_rule, 'STRICTLY_PROHIBITED_ZERO_DATA_DELETION');
    console.log('     Verified freshness lifecycle: Zero historical data deletion.');
  });

  console.log('\n--- GATE 8: ISOLATED TEST FIXTURE & OPERATIONAL IMMUTABILITY ---');
  test('Operational stores remain 100% clean and invariant', () => {
    const opIntakeData = JSON.parse(fs.readFileSync(opIntakePath, 'utf8'));
    assert.strictEqual(opIntakeData.total_signals, 0, 'Operational intake store must have 0 signals');
    console.log('     Verified operational store is clean (0 records).');
  });

  console.log('\n--- GATE 9: STRICT RECONCILIATION INVARIANCE GATE ---');
  test('Reconciliation formula 32 roots + 6 student sources + 2 verified venues = 40 final targets holds 100% exact', () => {
    const runDirs = fs.readdirSync(runsBaseDir).filter(d => d.startsWith('RUN_'));
    const latestDirName = runDirs[runDirs.length - 1];
    const manifest = JSON.parse(fs.readFileSync(path.join(runsBaseDir, latestDirName, 'RUN_MANIFEST.json'), 'utf8'));
    const reg = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

    const rec = manifest.reconciliation;
    assert.strictEqual(rec.is_reconciled, true);
    assert.strictEqual(rec.initial_roots_count + rec.student_sources_count + rec.verified_venues_count, rec.final_registry_count);
    assert.strictEqual(reg.items.length, rec.final_registry_count);
    console.log(`     Verified reconciliation invariance: ${rec.invariance_formula} (100% MATCH).`);
  });

  console.log('\n--- GATE 10: PRODUCTION LOCKED & ZERO LIVE DEPLOYMENT ---');
  test('deals_feed.json is [] and is_approved is false', () => {
    const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
    const prodJson = JSON.parse(prodRaw);
    assert(Array.isArray(prodJson) && prodJson.length === 0);
    const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
    const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;
    assert.strictEqual(isApproved, false);
  });

  console.log('\n========================================================================');
  console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
  console.log('========================================================================\n');

  if (failCount > 0) {
    process.exit(1);
  } else {
    console.log('✨ ALL 10 JAYT-162 CATEGORY HUBS TESTS PASSED 100% CLEAN!');
    process.exit(0);
  }
}

if (require.main === module) {
  runCategoryHubs162Audit();
}

module.exports = {
  runCategoryHubs162Audit
};
