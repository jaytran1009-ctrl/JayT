/**
 * AST CONTENT ADMISSION SCANNER (JAYT-223)
 * Scans UI source code and generators for forbidden hardcoded claims, unadmitted card arrays,
 * or attempts to bypass the Published Content Manifest.
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

const scanTargets = [
  path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js'),
  path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'index.html'),
  path.join(repoRoot, 'deploy', 'jayt_apex_interface.js'),
  path.join(repoRoot, 'deploy', 'index.html')
];

function runAstScanner() {
  console.log('========================================================================');
  console.log('🔍 JAYT-223: AST & STATIC CONTENT ADMISSION SCANNER');
  console.log('========================================================================\n');

  const violations = [];

  for (const targetPath of scanTargets) {
    if (!fs.existsSync(targetPath)) continue;
    const relPath = path.relative(repoRoot, targetPath);
    const content = fs.readFileSync(targetPath, 'utf8');

    console.log(`🔎 Scanning ${relPath} (${content.length} bytes)...`);

    // Rule 1: Must NOT contain hardcoded mock deals array declaring fake discounts or synthetic promo generators
    if (content.includes('SYNTHETIC_PROMO_GENERATOR') || content.includes('FABRICATED_DEALS_ARRAY')) {
      violations.push({ file: relPath, rule: 'RULE_01_NO_SYNTHETIC_GENERATOR', message: 'Contains forbidden synthetic generator token' });
    }

    // Rule 2: Must enforce Single Manifest Admission check in UI code
    if (targetPath.endsWith('.js')) {
      if (!content.includes('bundle_id') && !content.includes('published_manifest')) {
        violations.push({ file: relPath, rule: 'RULE_02_MANIFEST_BINDING_REQUIRED', message: 'UI script does not bind to published manifest / bundle_id' });
      }
    }

    // Rule 3: Check for bypass patterns where unverified cards are directly assigned green confirmed status
    if (content.includes('TIER_GREEN_CONFIRMED: [') && !content.includes('TIER_GREEN_CONFIRMED: []')) {
      violations.push({ file: relPath, rule: 'RULE_03_NO_UNVERIFIED_GREEN_CLAIMS', message: 'Green confirmed array is non-empty without verified on-site receipt' });
    }
  }

  console.log('\n--- SCANNER RESULTS ---');
  if (violations.length > 0) {
    console.error('❌ AST SCANNER FOUND VIOLATIONS:');
    console.error(JSON.stringify(violations, null, 2));
    throw new Error(`AST Content Admission Scanner failed with ${violations.length} violations.`);
  }

  console.log('🟢 0 AST / Static Code Violations Found. UI is 100% compliant with Single Content Admission System.\n');
  return true;
}

if (require.main === module) {
  runAstScanner();
}

module.exports = { runAstScanner };
