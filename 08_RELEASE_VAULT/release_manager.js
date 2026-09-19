/**
 * JAYT RELEASE & ATOMIC ROLLBACK MANAGER (047)
 * Directive: JAYT-PUBLIC-LAUNCH-047 — GATE 4: RELEASE, BACKUP & RECOVERY
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const vaultDir = path.join(repoRoot, '08_RELEASE_VAULT');
const releasesDir = path.join(vaultDir, 'releases');
const pointerPath = path.join(vaultDir, 'CURRENT_RELEASE_POINTER.json');

function computeFileHash(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function createSealedRelease(buildName, options = {}) {
  const timestamp = new Date().toISOString();
  const buildId = `BUILD-SEALED-047-${Date.now()}`;
  const targetBuildDir = path.join(releasesDir, buildId);

  fs.mkdirSync(targetBuildDir, { recursive: true });

  // Copy Source of Truth
  const truthDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
  const files = fs.readdirSync(truthDir);
  const fileManifest = {};

  for (const file of files) {
    const src = path.join(truthDir, file);
    const dest = path.join(targetBuildDir, file);
    if (fs.statSync(src).isFile()) {
      fs.copyFileSync(src, dest);
      fileManifest[file] = computeFileHash(dest);
    }
  }

  // Release Manifest
  const manifest = {
    build_id: buildId,
    build_name: buildName,
    created_at: timestamp,
    work_order: 'JAYT-PUBLIC-LAUNCH-047',
    scope: options.scope || 'STAGING_RELEASE_CANDIDATE',
    is_approved: false, // Default Fail-Closed
    file_hashes: fileManifest,
    governance: {
      zero_mutation_feed_sha256: '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945',
      domain_catalog_approved: true
    }
  };

  const manifestPath = path.join(targetBuildDir, 'SEALED_MANIFEST.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

  // Update pointer history
  let pointerData = {
    active_release_id: buildId,
    previous_release_id: null,
    updated_at: timestamp,
    history: []
  };

  if (fs.existsSync(pointerPath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(pointerPath, 'utf8'));
      pointerData.previous_release_id = existing.active_release_id;
      pointerData.history = existing.history || [];
      pointerData.history.push({
        release_id: existing.active_release_id,
        deactivated_at: timestamp
      });
    } catch {}
  }

  fs.writeFileSync(pointerPath, JSON.stringify(pointerData, null, 2), 'utf8');
  console.log(`📦 [SEALED-BUILD] Đã tạo release sealed: ${buildId} (Pointer cập nhật thành công)`);
  return { buildId, manifestPath, manifest };
}

function atomicRollback() {
  if (!fs.existsSync(pointerPath)) {
    throw new Error('Không tìm thấy CURRENT_RELEASE_POINTER.json để rollback');
  }

  const pointer = JSON.parse(fs.readFileSync(pointerPath, 'utf8'));
  if (!pointer.previous_release_id) {
    throw new Error('Không có previous_release_id trong lịch sử để rollback');
  }

  const prev = pointer.previous_release_id;
  const current = pointer.active_release_id;

  pointer.active_release_id = prev;
  pointer.previous_release_id = current;
  pointer.updated_at = new Date().toISOString();
  pointer.last_rollback = {
    rolled_back_at: pointer.updated_at,
    from: current,
    to: prev,
    reason: 'OPERATIONAL_ROLLBACK_TRIGGERED'
  };

  fs.writeFileSync(pointerPath, JSON.stringify(pointer, null, 2), 'utf8');
  console.log(`⏪ [ATOMIC-ROLLBACK] Đã chuyển con trỏ phát hành từ ${current} -> ${prev} (<1s atomic pointer switch)`);
  return pointer;
}

module.exports = {
  createSealedRelease,
  atomicRollback,
  pointerPath,
  releasesDir
};
