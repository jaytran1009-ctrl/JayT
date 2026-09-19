/**
 * JAYT SCHEDULE REGISTRY INITIALIZER (145)
 * Directive: JAYT-145: SCHEDULER AUTONOMY THẬT, RUN-ID BẤT BIẾN VÀ BẰNG CHỨNG OS-TRIGGER
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const queuePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_144_queue.json');
const registryOutputPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'autonomous_schedule_registry_145.json');

function initScheduleRegistry145() {
  const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
  const now = Date.now();

  const registryItems = queue.items.map((item, idx) => {
    const isLocator = item.cohort === 'COHORT_A_LOCALITY';
    const intervalHours = isLocator ? 7 * 24 : 24;

    return {
      item_id: item.capture_id,
      brand_id: item.brand_id,
      brand_name: item.brand_name,
      category: item.category,
      url: item.url,
      target_type: item.target_type,
      cohort: item.cohort,
      scan_interval_hours: intervalHours,
      last_checked_at: null,
      next_check_due: new Date(now - 10000).toISOString(), // Due immediately for initial cycle
      backoff_until: null,
      last_http_status: null,
      last_status: 'PENDING_INITIAL_CAPTURE',
      consecutive_failures: 0
    };
  });

  const registryData = {
    registry_id: 'AUTONOMOUS_SCHEDULE_REGISTRY_145',
    directive: 'JAYT-145: SCHEDULER AUTONOMY THẬT, RUN-ID BẤT BIẾN VÀ BẰNG CHỨNG OS-TRIGGER',
    created_at: new Date().toISOString(),
    last_updated_at: new Date().toISOString(),
    total_items: registryItems.length,
    locators_count: registryItems.filter(i => i.cohort === 'COHORT_A_LOCALITY').length,
    leaves_count: registryItems.filter(i => i.cohort !== 'COHORT_A_LOCALITY').length,
    items: registryItems
  };

  fs.writeFileSync(registryOutputPath, JSON.stringify(registryData, null, 2), 'utf8');
  console.log(`✅ [REGISTRY-145] Initialized ${registryItems.length} schedulable targets at: ${registryOutputPath}`);
  return registryData;
}

if (require.main === module) {
  initScheduleRegistry145();
}

module.exports = {
  initScheduleRegistry145
};
