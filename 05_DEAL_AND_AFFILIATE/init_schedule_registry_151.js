/**
 * JAYT THREE-COHORT SCHEDULE REGISTRY INITIALIZER (151)
 * Directive: JAYT-151: THREE-COHORT REAL-SUPPLY RECOVERY
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const queuePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_144_queue.json');
const registryOutputPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'autonomous_schedule_registry_151.json');

// 17 Stale Sources Isolated Across Batches 148-150
const KNOWN_STALE_ITEM_IDS = new Set([
  'CAP_144_B_10', 'CAP_144_B_11', 'CAP_144_B_12',
  'CAP_144_A_01', 'CAP_144_A_02', 'CAP_144_A_03', 'CAP_144_A_04', 'CAP_144_A_05',
  'CAP_144_B_17', 'CAP_144_B_19', 'CAP_144_B_20', 'CAP_144_B_21', 'CAP_144_B_22',
  'CAP_144_B_23', 'CAP_144_B_25', 'CAP_144_B_26', 'CAP_144_A_07'
]);

function assignCohort151(item) {
  const brandId = (item.brand_id || '').toUpperCase();
  const cat = (item.category || '').toLowerCase();
  const name = (item.brand_name || '').toLowerCase();

  if (brandId.includes('CINEMA') || brandId.includes('VINWONDERS') || brandId.includes('SUNWORLD') || cat.includes('cinema') || cat.includes('giải trí') || name.includes('cinema') || name.includes('starlight')) {
    return 'COHORT_A_CINEMA_ENTERTAINMENT';
  } else if (brandId.includes('BUS') || brandId.includes('DSVN') || brandId.includes('GA_') || brandId.includes('GITHUB') || brandId.includes('SPOTIFY') || brandId.includes('NOTION') || brandId.includes('JETBRAINS') || brandId.includes('CANVA') || cat.includes('vận tải') || cat.includes('sinh viên') || cat.includes('tiện ích')) {
    return 'COHORT_C_TRANSIT_STUDENT';
  }
  return 'COHORT_B_FNB_COFFEE';
}

function initScheduleRegistry151() {
  const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
  const now = Date.now();
  const backoff7Days = new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString();

  const registryItems = queue.items.map((item, idx) => {
    const isLocator = item.cohort === 'COHORT_A_LOCALITY';
    const intervalHours = isLocator ? 7 * 24 : 24;
    const isStale = KNOWN_STALE_ITEM_IDS.has(item.capture_id);
    const cohort151 = assignCohort151(item);

    return {
      item_id: item.capture_id,
      brand_id: item.brand_id,
      brand_name: item.brand_name,
      category: item.category,
      url: item.url,
      target_type: item.target_type,
      queue_cohort: item.cohort,
      cohort_151: cohort151,
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
    registry_id: 'AUTONOMOUS_SCHEDULE_REGISTRY_151',
    directive: 'JAYT-151: THREE-COHORT REAL-SUPPLY RECOVERY',
    created_at: new Date().toISOString(),
    last_updated_at: new Date().toISOString(),
    total_items: registryItems.length,
    cohort_breakdown: {
      COHORT_A_CINEMA_ENTERTAINMENT: registryItems.filter(i => i.cohort_151 === 'COHORT_A_CINEMA_ENTERTAINMENT').length,
      COHORT_B_FNB_COFFEE: registryItems.filter(i => i.cohort_151 === 'COHORT_B_FNB_COFFEE').length,
      COHORT_C_TRANSIT_STUDENT: registryItems.filter(i => i.cohort_151 === 'COHORT_C_TRANSIT_STUDENT').length
    },
    stale_sources_count: registryItems.filter(i => i.last_classification === 'SOURCE_PATH_STALE').length,
    items: registryItems
  };

  fs.writeFileSync(registryOutputPath, JSON.stringify(registryData, null, 2), 'utf8');
  console.log(`✅ [REGISTRY-151] Initialized ${registryItems.length} schedulable targets across 3 cohorts:`);
  console.log(`- Cohort A (Cinema/Entertainment): ${registryData.cohort_breakdown.COHORT_A_CINEMA_ENTERTAINMENT}`);
  console.log(`- Cohort B (F&B/Coffee): ${registryData.cohort_breakdown.COHORT_B_FNB_COFFEE}`);
  console.log(`- Cohort C (Transit/Student): ${registryData.cohort_breakdown.COHORT_C_TRANSIT_STUDENT}`);
  console.log(`- Stale sources isolated: ${registryData.stale_sources_count}`);
  return registryData;
}

if (require.main === module) {
  initScheduleRegistry151();
}

module.exports = {
  initScheduleRegistry151,
  assignCohort151
};
