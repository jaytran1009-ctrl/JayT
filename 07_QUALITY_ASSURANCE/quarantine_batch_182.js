const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const quarantineDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'quarantine_182_synthetic');
if (!fs.existsSync(quarantineDir)) fs.mkdirSync(quarantineDir, { recursive: true });

const filesToQuarantine = [
  path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_verified_deals_182.json'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'generate_clean_feed_182.js'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'multimodal_batch_harvest_182.js'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_182_harvest', 'MULTIMODAL_HARVEST_182_MANIFEST.json')
];

filesToQuarantine.forEach(f => {
  if (fs.existsSync(f)) {
    const target = path.join(quarantineDir, path.basename(f));
    fs.renameSync(f, target);
    console.log('Quarantined: ' + path.basename(f) + ' -> ' + target);
  }
});

// Remove harvest directory for 182
const harvestDir182 = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_182_harvest');
if (fs.existsSync(harvestDir182)) {
  fs.rmSync(harvestDir182, { recursive: true, force: true });
  console.log('Removed directory: ' + harvestDir182);
}

console.log('✅ Batch 182 Synthetic Data Quarantine Completed.');
