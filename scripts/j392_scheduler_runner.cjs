const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const baseDir = path.resolve(__dirname, '..');
const logFile = path.join(baseDir, '07_QUALITY_ASSURANCE/runtime_evidence/j392_scheduler_run.log');
const evidenceDir = path.dirname(logFile);

if (!fs.existsSync(evidenceDir)) {
  fs.mkdirSync(evidenceDir, { recursive: true });
}

const fixedAuditItems = [
  'DORM_SKU_03_AM_SUNHOUSE',
  'DORM_SKU_05_DEN_RANGDONG',
  'DORM_SKU_04_NOI_NAU_BEAR',
  'DORM_SKU_02_QUAT_JISULIFE',
  'DORM_SKU_10_HOP_COM_LOCKNLOCK',
  'DORM_SKU_07_NEM_GAP_EVERON',
  'DORM_SKU_16_BAN_UI_PHILIPS',
  'DORM_SKU_15_MOC_INOCHI',
  'DORM_SKU_28_BUT_THIENLONG',
  'DORM_SKU_22_CHUOT_LOGITECH'
];

const MAX_EVIDENCE_AGE_MS = 24 * 60 * 60 * 1000;
const waveEvidence = [
  {
    id: 'GALAXY_HAPPY_DAY_R3',
    receipt: '06_TRUST_AND_EVIDENCE/j392/deals/deal_04_galaxy_happy_day_r3_20260911T080230_RECEIPT.json'
  },
  {
    id: 'METIZ_U22_R3',
    receipt: '06_TRUST_AND_EVIDENCE/j392/deals/metiz_relational_scope_r3_20260911T080230_RECEIPT.json'
  }
];

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function inspectEvidence(item, now) {
  const receiptPath = path.join(baseDir, item.receipt);
  if (!fs.existsSync(receiptPath)) return { id: item.id, status: 'MISSING_RECEIPT' };
  try {
    const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
    // A single-artifact receipt stores its capture time at the root.  A
    // relational receipt (such as Metiz) stores the independently captured
    // source artifacts under linked_artifacts; use the earliest source capture
    // as the age anchor so the scheduler never treats its structure as a
    // failed capture.
    const linkedCaptureTimes = Object.values(receipt.linked_artifacts || {})
      .map(artifact => artifact?.timing?.capture_start_utc)
      .filter(Boolean)
      .map(value => ({ value, epoch: Date.parse(value) }))
      .filter(item => Number.isFinite(item.epoch))
      .sort((a, b) => a.epoch - b.epoch);
    const timestamp = receipt.timing?.capture_start_utc
      || receipt.compiled_at_utc
      || linkedCaptureTimes[0]?.value;
    const capturedAt = Date.parse(timestamp);
    if (!Number.isFinite(capturedAt)) return { id: item.id, status: 'INVALID_CAPTURE_TIMESTAMP' };
    const ageMs = now - capturedAt;
    const artifacts = receipt.artifacts?.raw_html ? [receipt.artifacts.raw_html, receipt.artifacts.screenshot] : [];
    if (!artifacts.length && receipt.linked_artifacts) {
      for (const artifact of Object.values(receipt.linked_artifacts)) {
        if (artifact.artifacts?.raw_html) artifacts.push(artifact.artifacts.raw_html, artifact.artifacts.screenshot);
      }
    }
    if (!artifacts.length) return { id: item.id, status: 'MISSING_ARTIFACT_MANIFEST', age_ms: ageMs };
    for (const artifact of artifacts) {
      const artifactPath = path.join(baseDir, artifact.relative_path);
      if (!fs.existsSync(artifactPath)) return { id: item.id, status: 'MISSING_ARTIFACT', path: artifact.relative_path, age_ms: ageMs };
      if (sha256(fs.readFileSync(artifactPath)) !== artifact.sha256) {
        return { id: item.id, status: 'ARTIFACT_HASH_MISMATCH', path: artifact.relative_path, age_ms: ageMs };
      }
    }
    const isFresh = ageMs >= 0 && ageMs <= MAX_EVIDENCE_AGE_MS;
    return { id: item.id, status: isFresh ? 'CURRENT_AND_HASH_BOUND' : 'STALE_BUT_HASH_BOUND', freshness: isFresh ? 'CURRENT' : 'RECAPTURE_REQUIRED', age_ms: ageMs, artifact_count: artifacts.length };
  } catch (error) {
    return { id: item.id, status: 'RECEIPT_PARSE_FAILURE', error: error.message };
  }
}

const startTimestamp = new Date().toISOString();
console.log(`[${startTimestamp}] J392 Autonomous Catalog Monitor Scheduler Tick Started`);
console.log(` - PID: ${process.pid}`);
console.log(` - PPID: ${process.ppid}`);
console.log(` - Executable: ${process.execPath}`);
console.log(` - User: ${process.env.USERNAME || 'system'}`);

// Integrity checks on catalog assets
let assetsOk = 0;
const assetResults = [];
const assetDir = path.join(baseDir, '03_SOURCE_OF_TRUTH/assets/products');
const files = fs.existsSync(assetDir) ? fs.readdirSync(assetDir) : [];

for (const id of fixedAuditItems) {
  // Extract number like "03", "05", "10"
  const m = id.match(/DORM_SKU_(\d+)/);
  const num = m ? m[1] : '';
  const matched = files.find(f => f.toLowerCase().startsWith(`sku_${num}`));
  if (matched) {
    assetsOk++;
    assetResults.push({ id, status: 'AVAILABLE', file: matched });
  } else {
    assetResults.push({ id, status: 'NOT_FOUND' });
  }
}

const endTimestamp = new Date().toISOString();
const evidenceResults = waveEvidence.map(item => inspectEvidence(item, Date.now()));
const evidenceIntegrityHealthy = evidenceResults.every(item => item.status === 'CURRENT_AND_HASH_BOUND' || item.status === 'STALE_BUT_HASH_BOUND');
const evidenceFresh = evidenceResults.every(item => item.status === 'CURRENT_AND_HASH_BOUND');
const schedulerHealthy = assetsOk === fixedAuditItems.length && evidenceIntegrityHealthy;
const logEntry = {
  task_name: 'JayT_Autonomous_Catalog_Monitor_4H',
  cycle: 'JAYT-392',
  execution_trigger: 'SCHEDULED_TASK_TRIGGERED',
  start_utc: startTimestamp,
  end_utc: endTimestamp,
  pid: process.pid,
  ppid: process.ppid,
  executable: process.execPath,
  args: process.argv,
  user: process.env.USERNAME || 'system',
  fixed_input_item_count: fixedAuditItems.length,
  assets_verified_count: assetsOk,
  evidence_max_age_ms: MAX_EVIDENCE_AGE_MS,
  wave_evidence: evidenceResults,
  content_freshness_status: evidenceFresh ? 'CURRENT' : 'STALE_RECAPTURE_REQUIRED',
  catalog_publish_authorized: evidenceFresh,
  execution_trigger: 'OS_TRIGGER_UNATTESTED__CORRELATE_WITH_TASK_SCHEDULER_HISTORY',
  status: schedulerHealthy ? 'HEALTHY' : 'DEGRADED',
  exit_code: schedulerHealthy ? 0 : 2
};

fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n', 'utf8');
console.log(`[${endTimestamp}] Tick Finished. Assets ${assetsOk}/${fixedAuditItems.length}; evidence ${evidenceResults.filter(x => x.status === 'CURRENT_AND_HASH_BOUND').length}/${waveEvidence.length}. Appended to ${logFile}`);
process.exitCode = logEntry.exit_code;
