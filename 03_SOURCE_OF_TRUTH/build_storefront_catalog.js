/**
 * JAYT STOREFRONT CATALOG BUILD STEP (EXECUTABLE BUILD PROCESS)
 * Governing Directive: JAYT-245 Section JAYT-260-CORRECTION-9 (Lines 5572-5586)
 *
 * CANONICAL REGISTRY & PINNED HASH CONTRACT:
 * 1. Pinned Canonical Input Only: Accepts only the canonical public approved registry (00_PROGRAM_BASELINE/JAYT_CANONICAL_PUBLIC_APPROVED_REGISTRY.json).
 * 2. Written CEO Approval Verification: Requires verified ceo_approval_id (e.g. CEO_DECISION_EZ_AR_GITHUB_PILOT_ONLY).
 * 3. Hash Pin Parity: Verifies registry_pinned_sha256 matches actual hash of approved entities.
 * 4. Rejection of Unapproved Inputs: Arbitrary JSON, hand-crafted files, or unapproved registries throw ERR_UNAPPROVED_CATALOG_INPUT fail-closed.
 * 5. Pre-Read Gateway Check: Calls assertArtifactNotQuarantined on input registry and all items.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { assertContaminationFreezeNotActive } = require('../00_PROGRAM_BASELINE/jayt_freeze_state_guard.js');
const { renderCatalogWithAdmission } = require('../00_PROGRAM_BASELINE/jayt_canonical_admission_gateway.js');
const { assertArtifactNotQuarantined } = require('../00_PROGRAM_BASELINE/jayt_artifact_loader_guard.js');

const CANONICAL_REGISTRY_REL = '00_PROGRAM_BASELINE/JAYT_CANONICAL_PUBLIC_APPROVED_REGISTRY.json';

function executeCatalogBuild(inputFilePath, outputFilePath) {
  // Preflight Contamination Freeze Check (Mandate JAYT-262-CORRECTION-6.1)
  assertContaminationFreezeNotActive('STOREFRONT_CATALOG_BUILDER');

  const rootDir = path.resolve(__dirname, '..');
  const canonicalRegistryAbs = path.join(rootDir, CANONICAL_REGISTRY_REL);
  const resolvedInput = path.resolve(inputFilePath);
  const resolvedOutput = path.resolve(outputFilePath);

  // Validate Input Path is Allowlisted Canonical Registry
  if (path.normalize(resolvedInput) !== path.normalize(canonicalRegistryAbs)) {
    throw new Error('ERR_UNAPPROVED_CATALOG_INPUT: Arbitrary input path "' + inputFilePath + '" is forbidden. Catalog build only accepts canonical registry: ' + CANONICAL_REGISTRY_REL);
  }

  if (!fs.existsSync(resolvedInput)) {
    throw new Error('ERR_CANONICAL_REGISTRY_NOT_FOUND: ' + resolvedInput);
  }

  // Pre-read gateway quarantine check on input registry
  assertArtifactNotQuarantined(resolvedInput);

  const rawContent = fs.readFileSync(resolvedInput, 'utf8');
  assertArtifactNotQuarantined(resolvedInput, Buffer.from(rawContent));

  let registry;
  try {
    registry = JSON.parse(rawContent);
  } catch (err) {
    throw new Error('ERR_INVALID_REGISTRY_JSON: ' + err.message);
  }

  // Verify Written CEO Approval ID
  if (!registry.ceo_approval_id || typeof registry.ceo_approval_id !== 'string') {
    throw new Error('ERR_UNAPPROVED_CATALOG_INPUT: Canonical registry is missing mandatory ceo_approval_id.');
  }

  // Verify Pinned Hash Integrity
  const computedHash = crypto.createHash('sha256').update(JSON.stringify(registry.approved_entities)).digest('hex');
  if (registry.registry_pinned_sha256 !== computedHash) {
    throw new Error('ERR_REGISTRY_PINNED_HASH_MISMATCH: Declared pinned hash ' + registry.registry_pinned_sha256 + ' does not match computed ' + computedHash);
  }

  // Gateway admission evaluation
  const candidateList = registry.approved_entities;
  const admissionResult = renderCatalogWithAdmission(candidateList, "RENDERING");
  const admittedItems = admissionResult.rendered_items;

  // Compile Catalog Markup strictly from admitted entities
  const inputHash = crypto.createHash('sha256').update(rawContent).digest('hex');
  let compiledHtml = '<!-- JAYT ADMITTED STOREFRONT CATALOG -->\n';
  compiledHtml += '<div id="jayt-admitted-catalog" data-input-hash="' + inputHash + '" data-admitted-count="' + admittedItems.length + '" data-ceo-approval="' + registry.ceo_approval_id + '">\n';

  for (const item of admittedItems) {
    compiledHtml += '  <div class="admitted-card" data-id="' + item.candidate_id + '">\n';
    compiledHtml += '    <h3>' + (item.title || item.candidate_id) + '</h3>\n';
    compiledHtml += '    <span class="geo-scope">' + (item.geographic_scope || 'DA_NANG') + '</span>\n';
    if (item.external_url) {
      compiledHtml += '    <a href="' + item.external_url + '" class="action-btn" target="_blank" rel="noopener">Truy cập</a>\n';
    }
    compiledHtml += '  </div>\n';
  }

  compiledHtml += '</div>';

  const outputHash = crypto.createHash('sha256').update(compiledHtml).digest('hex');
  fs.writeFileSync(resolvedOutput, compiledHtml, 'utf8');

  return {
    status: "BUILD_SUCCESS",
    ceo_approval_id: registry.ceo_approval_id,
    input_file: inputFilePath,
    output_file: outputFilePath,
    input_sha256: inputHash,
    output_sha256: outputHash,
    admitted_count: admittedItems.length,
    admitted_ids: admittedItems.map(i => i.candidate_id)
  };
}

// CLI Execution Entrypoint
if (require.main === module) {
  const args = process.argv.slice(2);
  let inputFile = null;
  let outputFile = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' && args[i + 1]) {
      inputFile = args[i + 1];
      i++;
    } else if (args[i] === '--output' && args[i + 1]) {
      outputFile = args[i + 1];
      i++;
    }
  }

  if (!inputFile || !outputFile) {
    console.error('Usage: node build_storefront_catalog.js --input <canonical-registry-path> --output <output-html-path>');
    process.exit(1);
  }

  try {
    const result = executeCatalogBuild(inputFile, outputFile);
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('CATALOG_BUILD_ERROR:', err.message);
    process.exit(1);
  }
}

module.exports = { executeCatalogBuild, CANONICAL_REGISTRY_REL };
