const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const quarantineDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_135_contaminated_supply');
fs.mkdirSync(quarantineDir, { recursive: true });

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

// 1. Copy batch_capture_135 and batch_capture_135_manifest.json to quarantine
const srcManifest = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_135_manifest.json');
const dstManifest = path.join(quarantineDir, 'batch_capture_135_manifest.json');
if (fs.existsSync(srcManifest)) {
  fs.copyFileSync(srcManifest, dstManifest);
}

const srcCaptures = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_135');
const dstCaptures = path.join(quarantineDir, 'batch_capture_135');

function copyRecursive(src, dst) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dst, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, dstPath);
    } else {
      fs.copyFileSync(srcPath, dstPath);
    }
  }
}

copyRecursive(srcCaptures, dstCaptures);

// Build Quarantine Manifest
const quarantinedFiles = [];
function scanQuarantine(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanQuarantine(full);
    } else {
      quarantinedFiles.push({
        path: path.relative(repoRoot, full).replace(/\\/g, '/'),
        sha256: getSha256(full),
        bytes: fs.statSync(full).size
      });
    }
  }
}
scanQuarantine(quarantineDir);

const quarantineManifest = {
  manifest_id: 'BATCH_135_QUARANTINE_MANIFEST',
  directive: 'JAYT-135R — INVALID CAPTURE CONTAINMENT',
  status: 'CONTAMINATED_SUPPLY_QUARANTINED',
  quarantined_at: '2026-08-26T18:48:00+07:00',
  executive_ruling: 'Batch 135 rejected in its entirety as supply evidence due to flawed capture methodology.',
  root_causes: [
    {
      cause_id: 'P0_CAUSE_01_SYNTHETIC_TIMEOUT_FALLBACK',
      description: 'Collector had fallback mechanism synthesizing placeholder text when network timed out (OFFLINE_CACHE_OR_TIMEOUT).'
    },
    {
      cause_id: 'P0_CAUSE_02_CLASSIFIER_TARGET_ID_HARDCODING',
      description: 'Classifier assigned ACTIVE_VERIFIED status and terms by matching target_id rather than extracting verbatim quotes from DOM.'
    },
    {
      cause_id: 'P0_CAUSE_03_UNPROVEN_CLAIMS_IN_ARTIFACTS',
      description: 'Claims such as DanaBus 6.000₫ were assigned despite destination URL ending in Error.aspx.'
    },
    {
      cause_id: 'P0_CAUSE_04_MISSING_HTML_AND_SCREENSHOT_PROVENANCE',
      description: 'Batch lacked raw page.html DOM snapshots and screenshot.png visual proofs.'
    }
  ],
  summary_metrics: {
    total_quarantined_files: quarantinedFiles.length
  },
  quarantined_files: quarantinedFiles
};

const qManifestPath = path.join(quarantineDir, 'BATCH_135_QUARANTINE_MANIFEST.json');
fs.writeFileSync(qManifestPath, JSON.stringify(quarantineManifest, null, 2), 'utf8');

console.log(`✅ [135R-QUARANTINE] Successfully quarantined ${quarantinedFiles.length} files into ${quarantineDir}`);
console.log(`Manifest: ${qManifestPath}`);
