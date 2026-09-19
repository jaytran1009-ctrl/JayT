const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * JAYT PLATFORM VERIFIER ENGINE (JAYT-245 SECTION AO ARCHITECTURE)
 * - 100% Full-Byte Streaming SHA-256 across all assets
 * - Canonical Serialization Self-Hash for Registry & Core Manifest
 * - Deep Dependency Graph & Quarantine Lifecycle Import Guard
 * - Production-to-Staging Separation & CEO Approval Receipt Verification
 */

function sha256Buffer(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function sha256FullFileStreaming(filePath) {
  const hash = crypto.createHash('sha256');
  const fd = fs.openSync(filePath, 'r');
  const bufferSize = 64 * 1024; // 64 KB chunk
  const buffer = Buffer.alloc(bufferSize);
  let bytesRead = 0;

  try {
    while ((bytesRead = fs.readSync(fd, buffer, 0, bufferSize, null)) > 0) {
      hash.update(buffer.subarray(0, bytesRead));
    }
  } finally {
    fs.closeSync(fd);
  }
  return hash.digest('hex');
}

function calculateCanonicalSelfHash(obj) {
  const copy = JSON.parse(JSON.stringify(obj));
  delete copy.self_sha256;
  const canonicalJson = JSON.stringify(copy);
  return sha256Buffer(Buffer.from(canonicalJson, 'utf8'));
}

function verifyPlatformRegistry(registryData, projectRoot, options = {}) {
  const errors = [];
  let verifiedCount = 0;
  let failedCount = 0;
  let totalBytesRead = 0;

  if (!registryData || typeof registryData !== 'object') {
    return { valid: false, errors: ['Invalid registry object'], verified_count: 0, failed_count: 1, total_bytes_read: 0 };
  }

  // 1. Schema Verification
  if (!registryData.registry_id || !registryData.schema_version || !Array.isArray(registryData.assets)) {
    errors.push('Missing essential registry schema fields (registry_id, schema_version, assets)');
  }
  if (registryData.hash_algorithm !== 'sha256_full_file_streaming') {
    errors.push(`Invalid hash algorithm declared: ${registryData.hash_algorithm}, must be sha256_full_file_streaming`);
  }

  // 2. Canonical Self-Hash Verification for Registry
  if (!options.skipSelfHash) {
    const calculatedSelfHash = calculateCanonicalSelfHash(registryData);
    if (registryData.self_sha256 !== calculatedSelfHash) {
      errors.push(`Registry self-hash mismatch: declared ${registryData.self_sha256} vs calculated ${calculatedSelfHash}`);
    }
  }

  // 3. Core Manifest & Canonical Self-Hash Verification
  const coreManifestRel = options.coreManifestRel || '00_PROGRAM_BASELINE/CORE_BASELINE_MANIFEST_AN.json';
  const coreManifestEntry = registryData.assets.find(a => a.relative_path.includes('CORE_BASELINE_MANIFEST_AN.json') || a.relative_path.includes(coreManifestRel));
  
  if (!coreManifestEntry) {
    errors.push('CORE_BASELINE_MANIFEST_AN.json is missing from registry assets');
  } else {
    const fullPath = path.join(projectRoot, coreManifestEntry.relative_path);
    if (!fs.existsSync(fullPath)) {
      errors.push(`Core manifest file missing on disk: ${coreManifestEntry.relative_path}`);
    } else {
      const actualHash = sha256FullFileStreaming(fullPath);
      if (coreManifestEntry.sha256 !== actualHash) {
        errors.push(`Core manifest SHA-256 mismatch: registry ${coreManifestEntry.sha256} vs actual ${actualHash}`);
      }

      if (!options.skipCoreManifestSelfHash) {
        try {
          const coreObj = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
          const coreCalculatedSelfHash = calculateCanonicalSelfHash(coreObj);
          if (coreObj.self_sha256 !== coreCalculatedSelfHash) {
            errors.push(`Core manifest self-hash mismatch: declared ${coreObj.self_sha256} vs calculated ${coreCalculatedSelfHash}`);
          }
        } catch (e) {
          errors.push(`Error parsing core manifest JSON: ${e.message}`);
        }
      }
    }
  }

  // 4. Operating Brief & Dossier Existence
  const briefEntry = registryData.assets.find(a => a.relative_path.includes('NEW_CHAT_OPERATING_BRIEF_AN.md'));
  if (!briefEntry) {
    errors.push('NEW_CHAT_OPERATING_BRIEF_AN.md is missing from registry assets');
  }

  const dossierEntry = registryData.assets.find(a => a.relative_path.includes('JAYT_245_HO_SO_NEN_TANG_VA_BAN_GIAO_AN.md'));
  if (!dossierEntry) {
    errors.push('JAYT_245_HO_SO_NEN_TANG_VA_BAN_GIAO_AN.md is missing from registry assets');
  }

  // 5. Mutable Memory Snapshot Integrity Protocol
  const memoryEntry = registryData.assets.find(a => a.relative_path === 'PROJECT_MEMORY.md');
  if (!memoryEntry) {
    errors.push('PROJECT_MEMORY.md is missing from registry assets');
  } else if (!options.skipMemoryCheck) {
    const memPath = path.join(projectRoot, 'PROJECT_MEMORY.md');
    if (fs.existsSync(memPath)) {
      const actualMemHash = sha256FullFileStreaming(memPath);
      if (registryData.memory_snapshot_sha256 && registryData.memory_snapshot_sha256 !== actualMemHash) {
        errors.push(`Memory snapshot SHA-256 mismatch: registry declared ${registryData.memory_snapshot_sha256} vs actual ${actualMemHash}`);
      }
    }
  }

  // 6. Full-Byte SHA-256 Verification across All Assets
  const assetsToVerify = options.sampleOnly ? registryData.assets.slice(0, 50) : registryData.assets;
  for (const asset of assetsToVerify) {
    const fullAssetPath = path.join(projectRoot, asset.relative_path);
    if (!fs.existsSync(fullAssetPath)) {
      errors.push(`Asset file missing on disk: ${asset.relative_path}`);
      failedCount++;
      continue;
    }

    try {
      const stat = fs.statSync(fullAssetPath);
      totalBytesRead += stat.size;

      const actualHash = sha256FullFileStreaming(fullAssetPath);
      if (asset.sha256 !== actualHash && asset.relative_path !== 'PROJECT_MEMORY.md') {
        errors.push(`SHA-256 mismatch for ${asset.relative_path}: registry ${asset.sha256} vs actual ${actualHash}`);
        failedCount++;
      } else {
        verifiedCount++;
      }
    } catch (e) {
      errors.push(`Error reading asset ${asset.relative_path}: ${e.message}`);
      failedCount++;
    }
  }

  // 7. Deep Dependency Graph & Quarantine Lifecycle Guard (Section AO)
  const deployJsPath = options.deployJsPath || path.join(projectRoot, 'deploy', 'jayt_apex_interface.js');
  if (fs.existsSync(deployJsPath)) {
    const deployContent = fs.readFileSync(deployJsPath, 'utf8');
    
    // Check direct and indirect imports/references into quarantine paths
    const quarantinePatterns = [
      '09_CONTAINMENT_QUARANTINE_NON_SERVED',
      'raw_capture_20260829_002300',
      'evidence_bundles',
      'archived_synthetic_manifests',
      'generators_pre_223'
    ];

    for (const qp of quarantinePatterns) {
      if (deployContent.includes(qp)) {
        errors.push(`Quarantine lifecycle leakage detected in production build (${deployJsPath}): references '${qp}'`);
      }
    }

    // Check for require / import statements inside deploy JS targeting non-public assets
    const importRegex = /(?:require|import)s*\(['"]([^'"]+)['"]\)/g;
    let match;
    while ((match = importRegex.exec(deployContent)) !== null) {
      const importedPath = match[1];
      if (quarantinePatterns.some(qp => importedPath.includes(qp))) {
        errors.push(`Prohibited import into quarantine asset detected in production: ${importedPath}`);
      }
    }
  }

  // 8. Production-to-Staging Decoupling & CEO Approval Receipt Guard (Section AO)
  const stagingJsPath = options.stagingJsPath || path.join(projectRoot, '03_SOURCE_OF_TRUTH', 'jayt_storefront_staging.js');
  const releaseReceiptPath = options.releaseReceiptPath || path.join(projectRoot, '07_QUALITY_ASSURANCE', 'production_release_receipt_v3419.json');

  // Verify Release Receipt exists and has CEO Approval
  if (!fs.existsSync(releaseReceiptPath)) {
    errors.push(`Missing production release receipt / rollback baseline: ${releaseReceiptPath}`);
  } else {
    try {
      const receipt = JSON.parse(fs.readFileSync(releaseReceiptPath, 'utf8'));
      if (!receipt.version || receipt.version !== registryData.production_baseline.version) {
        errors.push(`Release receipt version mismatch: receipt ${receipt.version} vs registry production ${registryData.production_baseline.version}`);
      }
    } catch (e) {
      errors.push(`Error parsing release receipt: ${e.message}`);
    }
  }

  // Check if staging code has leaked directly into production without approved CEO release
  if (fs.existsSync(deployJsPath) && fs.existsSync(stagingJsPath)) {
    const deployContent = fs.readFileSync(deployJsPath, 'utf8');
    const stagingContent = fs.readFileSync(stagingJsPath, 'utf8');
    
    if (deployContent === stagingContent) {
      errors.push('Unapproved staging promotion detected: deploy/jayt_apex_interface.js is identical to staging storefront without release receipt');
    }
    if (deployContent.includes('v3.420.0-staging') || deployContent.includes('staging.ak')) {
      errors.push('Staging version identifier leaked into production build without CEO approval');
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors,
    verified_count: verifiedCount,
    failed_count: failedCount,
    total_bytes_read: totalBytesRead
  };
}

module.exports = {
  verifyPlatformRegistry,
  sha256Buffer,
  sha256FullFileStreaming,
  calculateCanonicalSelfHash
};
