const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const bundlesDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'verified_exact_bundles');

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return fs.existsSync(p) ? sha256Buf(fs.readFileSync(p)) : null; }

function verifyVisualTruthContract() {
  console.log('========================================================================');
  console.log('🛡️ JAYT-217: VISUAL TRUTH CONTRACT INDEPENDENT RELEASE GATE');
  console.log('   Principle: STOP-SHIP UNTIL PROVEN');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  const registryPath = path.join(sotDir, 'card_visual_evidence_registry.json');
  if (!fs.existsSync(registryPath)) {
    console.error('❌ FATAL: card_visual_evidence_registry.json not found');
    process.exit(1);
  }

  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const cards = registry.cards || [];

  let verifiedExactCount = 0;
  let identityVisualCount = 0;
  let blockedCount = 0;
  const blockedDetails = [];

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const cardId = card.card_id || `CARD_${i+1}`;
    const visualKind = card.visual_kind || 'IDENTITY_VISUAL';

    if (visualKind === 'VERIFIED_EXACT' || visualKind === 'EXACT_PROMOTION' || visualKind === 'EXACT_VENUE') {
      // Must have physical evidence bundle on disk
      const bundlePath = path.join(bundlesDir, cardId);
      const bundleExists = fs.existsSync(bundlePath);
      const assetPath = card.asset_file_or_embed_url ? path.join(sotDir, card.asset_file_or_embed_url) : null;
      const assetExists = assetPath && fs.existsSync(assetPath);

      const hasSourceUrl = !!card.source_page_url;
      const hasRightsDossier = !!card.rights_proof_artifact_path && fs.existsSync(path.join(repoRoot, card.rights_proof_artifact_path));
      const hasSha = !!card.asset_sha256;
      const shaMatches = assetExists && sha256File(assetPath) === card.asset_sha256;
      const hasRelation = !!card.brand_and_branch_relation;
      const hasValidRights = card.rights_basis && card.rights_basis !== 'IDENTITY_CANVAS_NO_MEDIA_LICENSE_ASSERTED';

      const isCompliant = bundleExists && assetExists && hasSourceUrl && hasRightsDossier && hasSha && shaMatches && hasRelation && hasValidRights;

      if (isCompliant) {
        verifiedExactCount++;
        console.log(`  🟢 [VERIFIED_EXACT] ${cardId} (${card.brand})`);
      } else {
        blockedCount++;
        const reasons = [];
        if (!bundleExists) reasons.push('Missing physical evidence bundle on disk');
        if (!assetExists) reasons.push('Missing raw asset file');
        if (!hasSourceUrl) reasons.push('Missing source URL');
        if (!hasRightsDossier) reasons.push('Missing rights proof dossier');
        if (!shaMatches) reasons.push('SHA-256 mismatch or missing');
        if (!hasRelation) reasons.push('Missing 1-1 deal/branch relation');
        if (!hasValidRights) reasons.push('Missing documented rights basis');

        blockedDetails.push({ cardId, brand: card.brand, reasons });
        console.error(`  🔴 [BLOCKED] ${cardId} (${card.brand}): ${reasons.join('; ')}`);
      }
    } else if (visualKind === 'IDENTITY_VISUAL' || visualKind === 'OFFICIAL_IDENTITY') {
      identityVisualCount++;
      const isHonestLabel = card.render_label && card.render_label.includes('Nhận diện thương hiệu');
      if (!isHonestLabel) {
        console.warn(`  ⚠️ [IDENTITY_VISUAL_WARNING] ${cardId}: render_label does not indicate JayT Identity`);
      }
    } else {
      blockedCount++;
      blockedDetails.push({ cardId, brand: card.brand, reasons: [`Unknown visual kind: ${visualKind}`] });
    }
  }

  console.log('\n--- KPI SỰ THẬT THỊ GIÁC (VISUAL TRUTH REPORT) ---');
  console.log(`  📸 Verified exact visuals: ${verifiedExactCount}/${cards.length} (${((verifiedExactCount/cards.length)*100).toFixed(1)}%)`);
  console.log(`  🏛️ JayT identity visuals:  ${identityVisualCount}/${cards.length} (${((identityVisualCount/cards.length)*100).toFixed(1)}%)`);
  console.log(`  🚫 Blocked assets:         ${blockedCount}/${cards.length} (${((blockedCount/cards.length)*100).toFixed(1)}%)`);

  if (blockedCount > 0) {
    console.error('\n🚨 [STOP-SHIP TRIGGERED] One or more assets failed the Visual Truth Contract!');
    console.error('   Deployment is HARD-BLOCKED until evidence is provided or assets are demoted to IDENTITY_VISUAL.');
    return {
      status: 'BLOCKED WITH EVIDENCE',
      verifiedExactCount,
      identityVisualCount,
      blockedCount,
      blockedDetails
    };
  }

  console.log('\n🎉 [VISUAL TRUTH CONTRACT PASSED] All cards conform 100% to evidence invariants.');
  return {
    status: 'VERIFIED AND LIVE',
    verifiedExactCount,
    identityVisualCount,
    blockedCount
  };
}

if (require.main === module) {
  const result = verifyVisualTruthContract();
  if (result.status !== 'VERIFIED AND LIVE') {
    process.exit(1);
  }
}

module.exports = { verifyVisualTruthContract };
