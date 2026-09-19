/**
 * JAYT BATCH 143R PROCESSING RUNNER (NATIVE RECEIPT TRUTH & STRICT 5-STEP ORDER)
 * Directive: JAYT-143R: CAPTURE-PROVENANCE INCIDENT, HARNESS CERTIFICATION & SCHEDULER FREEZE
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { verifyStrictRawCaptureReceipt143R } = require('./strict_receipt_truth_verifier_143r');
const { verifyNormalizedAddressUnits143R } = require('./address_unit_locality_verifier_143r');
const { parseStrictSemanticRootLeaf143R } = require('./strict_semantic_root_dom_parser_143r');

const repoRoot = path.resolve(__dirname, '..');
const capturesBaseDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_143r_captures');
const queuePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_143_queue.json');

const brandRegistryOutputPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'brand_locality_registry_143r.json');
const batchTableOutputPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_143r_table.json');
const registry143rPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'fresh_source_registry_143r.json');

async function processBatch143R() {
  console.log('========================================================================');
  console.log('🔬 JAYT-143R: EVALUATING CERTIFIED FRESH CAPTURES (5-STEP ORDER)');
  console.log('========================================================================\n');

  const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  // Phase 1: Process Cohort A (Locality Store Locators)
  console.log('--- PHASE 1: EVALUATING COHORT A STORE LOCATORS (21 BRANDS) ---');
  const localityItems = queue.items.filter(i => i.cohort === 'COHORT_A_LOCALITY');
  const brandLocalityResults = [];

  for (const item of localityItems) {
    const folder = path.join(capturesBaseDir, item.capture_id);
    const receiptTruth = verifyStrictRawCaptureReceipt143R(folder);
    const html = fs.existsSync(path.join(folder, 'page.html')) ? fs.readFileSync(path.join(folder, 'page.html'), 'utf8') : '';

    const localityEval = await verifyNormalizedAddressUnits143R(html, item.url, receiptTruth, browser);

    console.log(`  [LOCATOR] ${item.capture_id} (${item.brand_name}): ${localityEval.locality_status} (${localityEval.distinct_normalized_address_units_count} distinct units) | Receipt: ${receiptTruth.status}`);

    brandLocalityResults.push({
      capture_id: item.capture_id,
      brand_id: item.brand_id,
      brand_name: item.brand_name,
      locator_url: item.url,
      locality_status: localityEval.locality_status,
      verdict_reason: localityEval.verdict_reason,
      distinct_normalized_address_units_count: localityEval.distinct_normalized_address_units_count,
      address_units: localityEval.address_units,
      raw_receipt_truth: receiptTruth
    });
  }

  const brandRegistry = {
    registry_id: 'BRAND_LOCALITY_REGISTRY_143R',
    directive: 'JAYT-143R: CAPTURE-PROVENANCE INCIDENT, HARNESS CERTIFICATION & SCHEDULER FREEZE',
    generated_at: new Date().toISOString(),
    total_brands_audited: brandLocalityResults.length,
    locality_distribution: {
      LOCALITY_VERIFIED_DA_NANG: brandLocalityResults.filter(b => b.locality_status === 'LOCALITY_VERIFIED_DA_NANG').length,
      ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG: brandLocalityResults.filter(b => b.locality_status === 'ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG').length,
      LOCALITY_PENDING_ADDRESS_UNIT_VALIDATION: brandLocalityResults.filter(b => b.locality_status === 'LOCALITY_PENDING_ADDRESS_UNIT_VALIDATION').length,
      LOCALITY_PENDING_FRESH_RECEIPT_CERTIFICATION: brandLocalityResults.filter(b => b.locality_status === 'LOCALITY_PENDING_FRESH_RECEIPT_CERTIFICATION').length
    },
    receipt_trust_audit: {
      capture_receipt_valid: brandLocalityResults.filter(b => b.raw_receipt_truth.status === 'CAPTURE_RECEIPT_VALID').length,
      capture_receipt_invalid: brandLocalityResults.filter(b => b.raw_receipt_truth.status === 'CAPTURE_RECEIPT_INVALID').length
    },
    brands: brandLocalityResults
  };

  fs.writeFileSync(brandRegistryOutputPath, JSON.stringify(brandRegistry, null, 2), 'utf8');

  // Phase 2: Collision Detection across all 51 captures
  console.log('\n--- PHASE 2: CAPTURE IDENTITY COLLISION DETECTION ---');
  const hashCount = {};
  for (const item of queue.items) {
    const folder = path.join(capturesBaseDir, item.capture_id);
    const receiptTruth = verifyStrictRawCaptureReceipt143R(folder);
    const sha = receiptTruth.fresh_hashes ? receiptTruth.fresh_hashes.html_sha256 : 'missing';
    if (!hashCount[sha]) hashCount[sha] = [];
    hashCount[sha].push(item.capture_id);
  }

  const collidingCaptureIds = new Set();
  for (const sha in hashCount) {
    if (sha !== 'missing' && hashCount[sha].length > 1) {
      console.log(`  ⚠️ COLLISION: ${hashCount[sha].join(', ')} share identical raw HTML SHA: ${sha.substring(0, 16)}...`);
      for (let i = 1; i < hashCount[sha].length; i++) {
        collidingCaptureIds.add(hashCount[sha][i]);
      }
    }
  }

  // Phase 3: Evaluate Cohort B (Offer Leaves) and Cohort C (Utilities/Students)
  console.log('\n--- PHASE 3: 5-STEP EVALUATION ACROSS COHORTS B & C (30 ITEMS) ---');
  const nonLocatorItems = queue.items.filter(i => i.cohort !== 'COHORT_A_LOCALITY');
  const evaluatedLeaves = [];

  for (const item of nonLocatorItems) {
    const folder = path.join(capturesBaseDir, item.capture_id);
    const receiptTruth = verifyStrictRawCaptureReceipt143R(folder);
    const html = fs.existsSync(path.join(folder, 'page.html')) ? fs.readFileSync(path.join(folder, 'page.html'), 'utf8') : '';

    const parsed = await parseStrictSemanticRootLeaf143R(html, item.url, receiptTruth, browser);

    const brandLocality = brandLocalityResults.find(b => b.brand_id === item.brand_id);
    const brandStatus = brandLocality ? brandLocality.locality_status : 'LOCALITY_PENDING_ADDRESS_UNIT_VALIDATION';

    let terminalState;
    let classificationReason;

    if (collidingCaptureIds.has(item.capture_id)) {
      terminalState = 'CAPTURE_IDENTITY_COLLISION';
      classificationReason = 'Raw capture HTML hash is identical to another URL in the batch (redirect/fallback duplicate).';
    } else if (!receiptTruth.is_receipt_trusted) {
      // Step 1: Receipt Invalid / Incomplete
      terminalState = 'CAPTURE_RECEIPT_INVALID';
      classificationReason = 'Raw capture receipt is missing observed network response or HTTP status.';
    } else if (typeof receiptTruth.http_status === 'number' && receiptTruth.http_status >= 400) {
      // HTTP Error / Blocked
      terminalState = 'NON_OFFER_PAGE_OR_SHELL';
      classificationReason = `HTTP Error / App Wall / Cloudflare block encountered (Status ${receiptTruth.http_status}).`;
    } else if (!parsed.has_content_root || parsed.page_text_length < 40) {
      // Step 2: No Valid Semantic Content Root
      terminalState = 'NON_OFFER_PAGE_OR_SHELL';
      classificationReason = 'Page lacks an isolated semantic article/content root (e.g. empty shell, catalog index, login modal, or non-article structure).';
    } else if (!parsed.price_claim && !parsed.discount_percentage) {
      // Step 3: Missing price/discount claim
      terminalState = 'INCOMPLETE_OFFER_EVIDENCE';
      classificationReason = 'Semantic content root found but lacks explicit numeric price or discount percentage node.';
    } else if (!parsed.program_validity_span && !parsed.weekly_schedule) {
      // Step 3b: Missing validity/schedule
      terminalState = 'INCOMPLETE_OFFER_EVIDENCE';
      classificationReason = 'Offer found in content root but lacks explicit expiration date or weekly recurring schedule.';
    } else if (brandStatus !== 'LOCALITY_VERIFIED_DA_NANG') {
      // Step 4: Da Nang locality unproven
      terminalState = (brandStatus === 'ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG') ? 'ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG' : 'SCOPE_UNPROVEN';
      classificationReason = (brandStatus === 'ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG')
        ? 'Global/national online service; lacks physical Da Nang campus enrollment receipt.'
        : 'Brand store locator lacks proven Da Nang address units.';
    } else {
      // Step 5: All pieces complete & Da Nang locality proven
      terminalState = 'EVIDENCE_COMPLETE_FOR_REVIEW';
      classificationReason = 'Title, price/offer, schedule/validity, and physical Da Nang address units verified within semantic root with DOM provenance.';
    }

    console.log(`  [ITEM] ${item.capture_id} (${item.brand_name}): ${terminalState} -> ContentRoot=${parsed.has_content_root ? 'YES' : 'NO'}, Title="${parsed.title || 'null'}", Price=${parsed.price_claim || 'null'}`);

    evaluatedLeaves.push({
      capture_id: item.capture_id,
      brand_id: item.brand_id,
      brand_name: item.brand_name,
      cohort: item.cohort,
      target_type: item.target_type,
      canonical_url: item.url,
      has_content_root: parsed.has_content_root,
      content_root_provenance: parsed.content_root_provenance,
      extracted_fields_in_root: {
        title: parsed.title,
        title_provenance: parsed.title_provenance,
        price_claim: parsed.price_claim,
        price_provenance: parsed.price_provenance,
        discount_percentage: parsed.discount_percentage,
        discount_provenance: parsed.discount_provenance,
        weekly_schedule: parsed.weekly_schedule,
        weekly_schedule_provenance: parsed.weekly_schedule_provenance,
        program_validity_span: parsed.program_validity_span,
        validity_provenance: parsed.validity_provenance,
        leaf_scope_stated: parsed.leaf_scope_stated,
        leaf_scope_provenance: parsed.leaf_scope_provenance
      },
      locality_evaluation: {
        brand_locality_status: brandStatus,
        distinct_normalized_address_units_count: brandLocality ? brandLocality.distinct_normalized_address_units_count : 0
      },
      raw_receipt_truth: receiptTruth,
      terminal_state: terminalState,
      classification_reason: classificationReason
    });
  }

  await browser.close();

  const stateCounts = {
    EVIDENCE_COMPLETE_FOR_REVIEW: evaluatedLeaves.filter(l => l.terminal_state === 'EVIDENCE_COMPLETE_FOR_REVIEW').length,
    INCOMPLETE_OFFER_EVIDENCE: evaluatedLeaves.filter(l => l.terminal_state === 'INCOMPLETE_OFFER_EVIDENCE').length,
    SCOPE_UNPROVEN: evaluatedLeaves.filter(l => l.terminal_state === 'SCOPE_UNPROVEN').length,
    ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG: evaluatedLeaves.filter(l => l.terminal_state === 'ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG').length,
    NON_OFFER_PAGE_OR_SHELL: evaluatedLeaves.filter(l => l.terminal_state === 'NON_OFFER_PAGE_OR_SHELL').length,
    CAPTURE_RECEIPT_INVALID: evaluatedLeaves.filter(l => l.terminal_state === 'CAPTURE_RECEIPT_INVALID').length,
    CAPTURE_IDENTITY_COLLISION: evaluatedLeaves.filter(l => l.terminal_state === 'CAPTURE_IDENTITY_COLLISION').length
  };

  const batchTable143r = {
    batch_id: 'BATCH_CAPTURE_143R_TABLE',
    directive: 'JAYT-143R: CAPTURE-PROVENANCE INCIDENT, HARNESS CERTIFICATION & SCHEDULER FREEZE',
    generated_at: new Date().toISOString(),
    total_urls_queued: queue.total_urls_queued,
    total_locators_audited: brandLocalityResults.length,
    total_leaves_and_utilities_evaluated: evaluatedLeaves.length,
    state_distribution: stateCounts,
    conservation_check: Object.values(stateCounts).reduce((a, b) => a + b, 0),
    governance_statement: 'Tái xử lý 143R trên harness đã được chứng nhận local test server. Zero synthetic defaults. Zero candidate staging hay live deploy.',
    items: evaluatedLeaves
  };

  fs.writeFileSync(batchTableOutputPath, JSON.stringify(batchTable143r, null, 2), 'utf8');

  // Build Fresh Source Registry 143R
  const sources143r = brandLocalityResults.map((b, idx) => ({
    source_id: `SRC_143R_${String(idx + 1).padStart(2, '0')}`,
    brand_id: b.brand_id,
    brand_name: b.brand_name,
    canonical_url: b.locator_url,
    state: (typeof b.raw_receipt_truth.http_status === 'number' && b.raw_receipt_truth.http_status >= 400) ? 'HTTP_ERROR_BACKOFF' : 'OFFICIAL_SOURCE_MONITORED',
    http_status: b.raw_receipt_truth.http_status,
    backoff_policy: (typeof b.raw_receipt_truth.http_status === 'number' && b.raw_receipt_truth.http_status >= 400) ? '7_DAYS_BACKOFF' : 'NONE',
    next_check_due: '2026-09-03T02:00:00.000Z'
  }));

  const registry143r = {
    registry_id: 'FRESH_SOURCE_REGISTRY_143R',
    directive: 'JAYT-143R: CAPTURE-PROVENANCE INCIDENT, HARNESS CERTIFICATION & SCHEDULER FREEZE',
    generated_at: new Date().toISOString(),
    governance_statement: `21 official brand sources monitored in Batch 143R under certified native event capture harness.`,
    sources: sources143r
  };

  fs.writeFileSync(registry143rPath, JSON.stringify(registry143r, null, 2), 'utf8');

  console.log('\n========================================================================');
  console.log(`✅ 143R PROCESSING COMPLETE: ${evaluatedLeaves.length} EVALUATED.`);
  console.log(`- EVIDENCE_COMPLETE_FOR_REVIEW: ${stateCounts.EVIDENCE_COMPLETE_FOR_REVIEW}`);
  console.log(`- INCOMPLETE_OFFER_EVIDENCE: ${stateCounts.INCOMPLETE_OFFER_EVIDENCE}`);
  console.log(`- SCOPE_UNPROVEN: ${stateCounts.SCOPE_UNPROVEN}`);
  console.log(`- ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG: ${stateCounts.ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG}`);
  console.log(`- NON_OFFER_PAGE_OR_SHELL: ${stateCounts.NON_OFFER_PAGE_OR_SHELL}`);
  console.log(`- CAPTURE_RECEIPT_INVALID: ${stateCounts.CAPTURE_RECEIPT_INVALID}`);
  console.log(`- CAPTURE_IDENTITY_COLLISION: ${stateCounts.CAPTURE_IDENTITY_COLLISION}`);
  console.log(`- Metric Conservation Check: ${batchTable143r.conservation_check} == ${evaluatedLeaves.length}`);
  console.log(`📂 Output Brand Registry: ${brandRegistryOutputPath}`);
  console.log(`📂 Output Batch Table: ${batchTableOutputPath}`);
  console.log(`📂 Output Fresh Source Registry: ${registry143rPath}`);
  console.log('========================================================================\n');
}

processBatch143R();
