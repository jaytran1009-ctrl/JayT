/**
 * JAYT SCHEDULE REGISTRY INITIALIZER (150)
 * Directive: JAYT-150: EXECUTION CREDIBILITY RESET & REAL-SUPPLY CONTINUITY
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const queuePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_144_queue.json');
const registryOutputPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'autonomous_schedule_registry_150.json');

// 12 Known Stale Sources Identified & Isolated across Batches 148-149
const KNOWN_STALE_ITEM_IDS = new Set([
  'CAP_144_B_10', 'CAP_144_B_11', 'CAP_144_B_12',
  'CAP_144_A_02', 'CAP_144_A_03', 'CAP_144_A_04', 'CAP_144_A_05',
  'CAP_144_B_19', 'CAP_144_B_20', 'CAP_144_B_21', 'CAP_144_B_22'
]);

function initScheduleRegistry150() {
  const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
  const now = Date.now();
  const backoff7Days = new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString();

  const registryItems = queue.items.map((item, idx) => {
    const isLocator = item.cohort === 'COHORT_A_LOCALITY';
    const intervalHours = isLocator ? 7 * 24 : 24;
    const isStale = KNOWN_STALE_ITEM_IDS.has(item.capture_id);

    return {
      item_id: item.capture_id,
      brand_id: item.brand_id,
      brand_name: item.brand_name,
      category: item.category,
      url: item.url,
      target_type: item.target_type,
      cohort: item.cohort,
      scan_interval_hours: intervalHours,
      last_checked_at: isStale ? new Date().toISOString() : null,
      next_check_due: isStale ? backoff7Days : new Date(now - 10000).toISOString(),
      backoff_until: isStale ? backoff7Days : null,
      last_http_status: isStale ? 404 : null,
      last_classification: isStale ? 'SOURCE_PATH_STALE' : 'PENDING_INITIAL_CAPTURE',
      consecutive_failures: isStale ? 1 : 0,
      lineage: {
        origin: 'OFFICIAL_BRAND_QUEUE_144',
        parent_source_url: item.url,
        parent_receipt_sha256: null,
        content_root_selector: 'INITIAL_OFFICIAL_QUEUE',
        content_root_hash: null,
        anchor_selector: null,
        anchor_text: item.target_type || item.brand_name,
        outer_html_hash: null,
        discovered_at: new Date().toISOString()
      }
    };
  });

  const registryData = {
    registry_id: 'AUTONOMOUS_SCHEDULE_REGISTRY_150',
    directive: 'JAYT-150: EXECUTION CREDIBILITY RESET & REAL-SUPPLY CONTINUITY',
    created_at: new Date().toISOString(),
    last_updated_at: new Date().toISOString(),
    total_items: registryItems.length,
    locators_count: registryItems.filter(i => i.cohort === 'COHORT_A_LOCALITY').length,
    leaves_count: registryItems.filter(i => i.cohort !== 'COHORT_A_LOCALITY').length,
    stale_sources_count: registryItems.filter(i => i.last_classification === 'SOURCE_PATH_STALE').length,
    items: registryItems
  };

  fs.writeFileSync(registryOutputPath, JSON.stringify(registryData, null, 2), 'utf8');
  console.log(`✅ [REGISTRY-150] Initialized ${registryItems.length} schedulable targets (${registryData.stale_sources_count} marked SOURCE_PATH_STALE) at: ${registryOutputPath}`);
  return registryData;
}

if (require.main === module) {
  initScheduleRegistry150();
}

module.exports = {
  initScheduleRegistry150
};
