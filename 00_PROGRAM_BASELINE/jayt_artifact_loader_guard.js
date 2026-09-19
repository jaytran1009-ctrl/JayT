/**
 * JAYT ARTIFACT LOADER GUARD & QUARANTINE DENYLIST ENFORCEMENT
 * Governing Directive: JAYT-245 Section JAYT-260-CORRECTION-2 (Lines 5453-5467)
 *
 * Enforces mandatory rejection (QUARANTINED_ARTIFACT_REFERENCE) of all quarantined files, paths, and SHA-256 hashes.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const QUARANTINE_RECORD_260_2 = path.join(ROOT, '06_TRUST_AND_EVIDENCE/QUARANTINE_RECORD_JAYT_260_CORRECTION_2.json');
const QUARANTINE_RECORD_262_1 = path.join(ROOT, '06_TRUST_AND_EVIDENCE/QUARANTINE_RECORD_JAYT_262_CORRECTION_1.json');

function getQuarantineDenylist() {
  const hashes = new Set();
  const paths = new Set();

  // Add default quarantined directories
  paths.add('QUARANTINED_EVIDENCE_VAULT_JAYT_260_SYNTHETIC');
  paths.add('QUARANTINED_EVIDENCE_VAULT_JAYT_MICRO_BATCH_02');
  paths.add('evidence_vault_jayt_260');
  paths.add('evidence_vault_jayt_micro_batch_02');

  if (fs.existsSync(QUARANTINE_RECORD_260_2)) {
    const qRec = JSON.parse(fs.readFileSync(QUARANTINE_RECORD_260_2, 'utf8'));
    if (qRec.denylist_enforcement_contract) {
      (qRec.denylist_enforcement_contract.denylisted_sha256_hashes || []).forEach(h => hashes.add(h));
      (qRec.denylist_enforcement_contract.denylisted_file_paths || []).forEach(p => paths.add(p));
    }
  }

  if (fs.existsSync(QUARANTINE_RECORD_262_1)) {
    const qRec2 = JSON.parse(fs.readFileSync(QUARANTINE_RECORD_262_1, 'utf8'));
    (qRec2.quarantined_artifacts || []).forEach(item => {
      if (item.sha256) hashes.add(item.sha256);
      if (item.original_path) paths.add(item.original_path);
      if (item.quarantined_path) paths.add(item.quarantined_path);
    });
  }

  return {
    hashes: Array.from(hashes),
    paths: Array.from(paths)
  };
}

function assertArtifactNotQuarantined(filePathOrHash, optionalBuffer = null) {
  const denylist = getQuarantineDenylist();

  // Check path
  if (typeof filePathOrHash === 'string') {
    const normPath = filePathOrHash.replace(/\\/g, '/');
    for (const dPath of denylist.paths) {
      if (normPath.includes(dPath) || dPath.includes(normPath)) {
        throw new Error('QUARANTINED_ARTIFACT_REFERENCE: File path "' + filePathOrHash + '" references a quarantined artifact.');
      }
    }
    // Check if it is a hash string directly
    if (denylist.hashes.includes(filePathOrHash)) {
      throw new Error('QUARANTINED_ARTIFACT_REFERENCE: SHA-256 hash "' + filePathOrHash + '" matches a quarantined synthetic artifact.');
    }
  }

  // Check file bytes if buffer provided or if path exists
  if (optionalBuffer) {
    const sha = crypto.createHash('sha256').update(optionalBuffer).digest('hex');
    if (denylist.hashes.includes(sha)) {
      throw new Error('QUARANTINED_ARTIFACT_REFERENCE: Artifact SHA-256 hash "' + sha + '" matches a quarantined synthetic artifact.');
    }
  } else if (typeof filePathOrHash === 'string' && fs.existsSync(filePathOrHash) && fs.statSync(filePathOrHash).isFile()) {
    const bytes = fs.readFileSync(filePathOrHash);
    const sha = crypto.createHash('sha256').update(bytes).digest('hex');
    if (denylist.hashes.includes(sha)) {
      throw new Error('QUARANTINED_ARTIFACT_REFERENCE: Artifact at "' + filePathOrHash + '" has quarantined SHA-256 hash "' + sha + '".');
    }
  }

  return true;
}

module.exports = {
  getQuarantineDenylist,
  assertArtifactNotQuarantined
};
