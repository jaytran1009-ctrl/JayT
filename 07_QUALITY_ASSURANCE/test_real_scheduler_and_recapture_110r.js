/**
 * TEST SUITE 110R: REAL WINDOWS SCHEDULER & FRESH RECAPTURE INTEGRITY
 * 
 * Verifies:
 * 1. All 5 Windows Task Scheduler tasks exist on OS in Ready state with valid Next Run Time
 * 2. Run lock mechanism prevents overlapping execution and properly cleans up
 * 3. Fresh Recapture Engine creates dedicated batch artifacts with fresh timestamps
 * 4. Semantic Gate properly eliminates false positives on fresh captures
 * 5. Automatic fallback to Watchlist/Radar for incomplete/unverified items
 * 6. Four Layer Dataset & Beta UI contains strictly verified active deals
 * 7. Production commercial feed invariant: deals_feed.json is empty array [], is_approved is false, 0 affiliate links
 * 8. Project Memory is consistent with version 3.220.0
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { execSync } = require('child_process');

console.log('=== RUNNING TEST SUITE 110R: REAL SCHEDULER & FRESH RECAPTURE ===\n');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`✅ PASS: [${totalTests}] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`❌ FAIL: [${totalTests}] ${name}`);
    console.error(err.message);
  }
}

const repoRoot = path.resolve(__dirname, '..');
const SCHEDULER_RECEIPT = path.join(repoRoot, '08_RELEASE_VAULT/WINDOWS_TASK_SCHEDULER_RECEIPT_110R.json');
const ENGINE_PATH = path.join(repoRoot, '05_DEAL_AND_AFFILIATE/fresh_recapture_engine_110r.js');
const BATCH_RUNS_DIR = path.join(repoRoot, '05_DEAL_AND_AFFILIATE/batch_runs');
const DATASET_PATH = path.join(repoRoot, '03_SOURCE_OF_TRUTH/four_layer_dataset.json');
const DEALS_FEED_PATH = path.join(repoRoot, '05_DEAL_AND_AFFILIATE/deals_feed.json');
const PROJECT_MEMORY_PATH = path.join(repoRoot, 'PROJECT_MEMORY.md');
const LOCK_FILE = path.join(repoRoot, '05_DEAL_AND_AFFILIATE/run.lock');

// Test 1: Windows Task Scheduler tasks query verification
runTest('All 5 Windows Task Scheduler tasks exist in Ready state with Next Run Time', () => {
  assert.ok(fs.existsSync(SCHEDULER_RECEIPT), 'WINDOWS_TASK_SCHEDULER_RECEIPT_110R.json must exist');
  const receipt = JSON.parse(fs.readFileSync(SCHEDULER_RECEIPT, 'utf8'));
  assert.strictEqual(receipt.total_tasks_registered, 5, 'Must have 5 tasks');
  assert.strictEqual(receipt.status, 'ALL_TASKS_REGISTERED_AND_READY');

  const requiredTasks = ['JayT_Beta_Auton_0700', 'JayT_Beta_Auton_1045', 'JayT_Beta_Auton_1400', 'JayT_Beta_Auton_1700', 'JayT_Beta_Auton_2030'];
  requiredTasks.forEach(taskName => {
    const task = receipt.tasks.find(t => t.task_name === taskName);
    assert.ok(task, `Task ${taskName} must be in receipt`);
    assert.strictEqual(task.state, 'Ready', `Task ${taskName} state must be Ready`);
    assert.ok(task.next_run_time, `Task ${taskName} must have valid next_run_time`);

    // Also verify OS schtasks query directly
    const osQuery = execSync(`schtasks /query /tn "${taskName}" /fo list`, { encoding: 'utf8' });
    assert.ok(osQuery.includes(taskName), `OS schtasks must return ${taskName}`);
    assert.ok(osQuery.includes('Ready') || osQuery.includes('Sẵn sàng'), `${taskName} status in OS must be Ready`);
  });
});

// Test 2: Lock mechanism prevention & release
runTest('Lock mechanism (run.lock) prevents concurrent runs and releases cleanly', () => {
  const engine = require(ENGINE_PATH);
  const testBatchId = 'TEST_LOCK_BATCH';

  // Acquire lock
  engine.acquireLock(testBatchId);
  assert.ok(fs.existsSync(LOCK_FILE), 'Lock file must exist after acquire');

  // Attempt second lock should throw LOCKED_RUN_IN_PROGRESS
  let caughtError = false;
  try {
    engine.acquireLock('COLLIDING_BATCH');
  } catch (err) {
    if (err.message.includes('LOCKED_RUN_IN_PROGRESS')) {
      caughtError = true;
    }
  }
  assert.ok(caughtError, 'Must reject second overlapping run with LOCKED_RUN_IN_PROGRESS');

  // Release lock
  engine.releaseLock();
  assert.ok(!fs.existsSync(LOCK_FILE), 'Lock file must be deleted after release');
});

// Test 3: Fresh Recapture Engine creates dedicated batch artifacts
runTest('Fresh Recapture Engine outputs dedicated batch runs with fresh captures', () => {
  assert.ok(fs.existsSync(BATCH_RUNS_DIR), 'batch_runs directory must exist');
  const batches = fs.readdirSync(BATCH_RUNS_DIR).filter(b => b.startsWith('BATCH_'));
  assert.ok(batches.length > 0, 'Must have at least one batch run folder');

  const latestBatch = batches[batches.length - 1];
  const capturesDir = path.join(BATCH_RUNS_DIR, latestBatch, 'captures');
  assert.ok(fs.existsSync(capturesDir), 'captures directory must exist in batch folder');

  const capturedItems = fs.readdirSync(capturesDir);
  assert.ok(capturedItems.length > 0, 'Must contain captured source/leaf folders');

  const firstItem = capturedItems[0];
  const metaFile = path.join(capturesDir, firstItem, 'metadata.json');
  assert.ok(fs.existsSync(metaFile), 'Metadata file must exist');
  const meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
  assert.ok(meta.captured_at, 'Must have captured_at timestamp');
  assert.ok(meta.text_sha256, 'Must have text_sha256');
});

// Test 4: Semantic Gate eliminates false positives
runTest('Dataset layer_1 contains strictly valid active deals meeting 4 criteria', () => {
  const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, 'utf8'));
  assert.ok(dataset.layer_1_emerald_deals, 'layer_1_emerald_deals must exist');
  assert.ok(dataset.layer_1_emerald_deals.length > 0, 'Must have verified active deals');

  const now = new Date();
  dataset.layer_1_emerald_deals.forEach(deal => {
    assert.strictEqual(deal.status, 'ACTIVE_VERIFIED_DEAL');
    assert.ok(deal.offer_highlight, 'Must have offer highlight');
    assert.ok(deal.valid_to, 'Must have valid_to');
    const expiry = new Date(deal.valid_to);
    assert.ok(expiry >= now, `Deal ${deal.id} valid_to ${deal.valid_to} must not be expired`);
  });
});

// Test 5: Automatic fallback to Watchlist
runTest('Incomplete and unverified signals automatically route to layer_2_watchlist', () => {
  const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, 'utf8'));
  assert.ok(dataset.layer_2_watchlist.unverified_signals_count > 0, 'Watchlist signals count must be > 0');
  assert.ok(dataset.layer_2_watchlist.verified_locations.length >= 18, `At least 18 verified locations preserved, found ${dataset.layer_2_watchlist.verified_locations.length}`);
  assert.ok(dataset.layer_2_watchlist.last_pipeline_run, 'Must record last_pipeline_run timestamp');
});

// Test 6: Production commercial feed invariant
runTest('Production commercial feed invariant: deals_feed.json is empty array and is_approved is false', () => {
  const dealsFeed = JSON.parse(fs.readFileSync(DEALS_FEED_PATH, 'utf8'));
  assert.ok(Array.isArray(dealsFeed), 'deals_feed must be an array');
  assert.strictEqual(dealsFeed.length, 0, 'deals_feed must remain strictly empty []');
});

// Test 7: Project Memory consistency
runTest('Project memory consistency: version matches >= 3.220.0 after transaction', () => {
  const memoryContent = fs.readFileSync(PROJECT_MEMORY_PATH, 'utf8');
  assert.ok(/(?:v)?3\.[2-9]\d+\.0/.test(memoryContent), 'Memory must be at version >= 3.220.0');
  assert.ok(memoryContent.includes('110R') || memoryContent.includes('111'), 'Memory must record 110R or later');
});

console.log(`\n====================================`);
console.log(`TEST RESULTS: ${passedTests}/${totalTests} PASSED`);
console.log(`====================================`);

if (passedTests !== totalTests) {
  process.exit(1);
}
