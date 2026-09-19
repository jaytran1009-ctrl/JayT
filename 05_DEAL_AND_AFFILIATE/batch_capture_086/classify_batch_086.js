/**
 * JAYT BATCH EVIDENCE CLASSIFIER (086)
 * Directive: JAYT-REAL-SUPPLY-SPRINT-086
 *
 * Reads batch_manifest_086.json and classifies each capture by quality.
 * No deal analysis. No price extraction. Pure capture quality classification.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..', '..');
const captureDir = path.join(__dirname, 'captures');
const manifestPath = path.join(captureDir, 'batch_manifest_086.json');

function sha256File(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function classifyEntry(entry) {
  // Failed capture
  if (entry.error) {
    return { classification: 'CAPTURE_FAILED', reason: entry.error.slice(0, 120) };
  }

  // No HTTP status or non-200
  if (!entry.http_status || entry.http_status >= 400) {
    return { classification: 'CAPTURE_FAILED', reason: `HTTP ${entry.http_status || 0}` };
  }

  // Check all 4 artifacts exist on disk with matching hashes
  const artifactTypes = ['png', 'html', 'text', 'receipt'];
  const missing = [];
  const hashMismatch = [];

  for (const type of artifactTypes) {
    const art = entry.artifacts[type];
    if (!art || !art.path) {
      missing.push(type);
      continue;
    }
    const absPath = path.join(repoRoot, art.path);
    if (!fs.existsSync(absPath)) {
      missing.push(type);
      continue;
    }
    const diskHash = sha256File(absPath);
    if (art.sha256 && diskHash !== art.sha256) {
      hashMismatch.push(type);
    }
  }

  if (missing.length > 0) {
    return { classification: 'CAPTURE_PARTIAL', reason: `Missing: ${missing.join(', ')}` };
  }

  if (hashMismatch.length > 0) {
    return { classification: 'CAPTURE_PARTIAL', reason: `Hash mismatch: ${hashMismatch.join(', ')}` };
  }

  // Check for blocked/CAPTCHA (very small HTML body suggests block)
  const htmlArt = entry.artifacts.html;
  if (htmlArt) {
    const absHtmlPath = path.join(repoRoot, htmlArt.path);
    if (fs.existsSync(absHtmlPath)) {
      const htmlSize = fs.statSync(absHtmlPath).size;
      if (htmlSize < 1024) {
        return { classification: 'CAPTURE_BLOCKED', reason: `HTML body too small: ${htmlSize} bytes` };
      }
      const htmlContent = fs.readFileSync(absHtmlPath, 'utf8').toLowerCase();
      if (htmlContent.includes('captcha') || htmlContent.includes('challenge-platform') ||
          htmlContent.includes('access denied') || htmlContent.includes('just a moment')) {
        return { classification: 'CAPTURE_BLOCKED', reason: 'CAPTCHA or access challenge detected' };
      }
    }
  }

  // Check for redirect (HTTP 3xx)
  if (entry.http_status >= 300 && entry.http_status < 400) {
    return { classification: 'CAPTURE_PARTIAL', reason: `HTTP redirect ${entry.http_status}` };
  }

  return { classification: 'CAPTURE_SUCCESS', reason: 'All artifacts present, hashes match, HTTP 200' };
}

function main() {
  if (!fs.existsSync(manifestPath)) {
    console.error('❌ batch_manifest_086.json not found. Run collector first.');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  console.log(`📊 [CLASSIFY-086] Phân loại ${manifest.entries.length} captures...\n`);

  const classified = [];
  const summary = { CAPTURE_SUCCESS: 0, CAPTURE_PARTIAL: 0, CAPTURE_FAILED: 0, CAPTURE_BLOCKED: 0 };

  for (const entry of manifest.entries) {
    const { classification, reason } = classifyEntry(entry);
    classified.push({
      index: entry.index,
      brand: entry.brand,
      sector: entry.sector,
      domain: entry.domain,
      http_status: entry.http_status,
      classification,
      reason,
      artifacts: entry.artifacts ? {
        png: !!entry.artifacts.png,
        html: !!entry.artifacts.html,
        text: !!entry.artifacts.text,
        receipt: !!entry.artifacts.receipt
      } : {}
    });

    summary[classification] = (summary[classification] || 0) + 1;

    const icon = classification === 'CAPTURE_SUCCESS' ? '✅' :
                 classification === 'CAPTURE_PARTIAL' ? '⚠️' :
                 classification === 'CAPTURE_BLOCKED' ? '🚫' : '❌';
    console.log(`  [${entry.index}] ${icon} ${entry.brand} — ${classification} (${reason})`);
  }

  // Write classification result
  const classificationResult = {
    run_id: manifest.run_id,
    classified_at: new Date().toISOString(),
    total: manifest.entries.length,
    summary,
    entries: classified
  };

  const outputPath = path.join(captureDir, 'batch_classification_086.json');
  fs.writeFileSync(outputPath, JSON.stringify(classificationResult, null, 2), 'utf8');

  console.log(`\n======================================================`);
  console.log(`📊 [CLASSIFICATION-SUMMARY]`);
  console.log(`   ✅ SUCCESS:  ${summary.CAPTURE_SUCCESS}`);
  console.log(`   ⚠️ PARTIAL:  ${summary.CAPTURE_PARTIAL}`);
  console.log(`   🚫 BLOCKED:  ${summary.CAPTURE_BLOCKED}`);
  console.log(`   ❌ FAILED:   ${summary.CAPTURE_FAILED}`);
  console.log(`   📄 Output: ${outputPath}`);
  console.log(`======================================================\n`);

  return classificationResult;
}

if (require.main === module) {
  main();
}

module.exports = { classifyEntry, main };
