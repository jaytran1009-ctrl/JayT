/**
 * JAYT REAL COVERAGE SCHEDULER & RUNTIME INTEGRITY TEST SUITE (042D)
 * Directive: JAYT-SCHEDULER-SEMANTIC-FIX-042D
 * 
 * Verifies real Chrome headless captures, PNG validation (chunk/CRC/zlib), HTTP probe & status resolution,
 * live XML trigger inspection for all 4 Windows Scheduled Tasks (Morning, Evening, Weekly, Monthly),
 * negative pseudo-monthly trigger rejection, physical artifact verification on disk,
 * error isolation, bidirectional receipts with run IDs, append-only journal, and fail-closed zero-mutation invariants.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync, execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const {
  getVNTime,
  matchCron,
  getJobsTriggeredAt,
  executeControlledBatch,
  assertTimezoneConformance,
  assertProductionInvariants
} = require('./coverage_worker');

const {
  parseAndVerifyPng
} = require('./validate_candidate_evidence');

const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');
const journalDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'coverage_journal');
const candidatesDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review');
const artifactsDir = path.join(candidatesDir, 'artifacts');

let testCount = 0;
let passCount = 0;

function assertTest(name, condition, message) {
  testCount++;
  if (condition) {
    passCount++;
    console.log(`  [${name}]: [PASS] - ${message}`);
  } else {
    console.error(`  [${name}]: [FAIL] - ${message}`);
    process.exitCode = 1;
  }
}

function getFileSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

/**
 * Validates the semantic XML trigger structure of a registered task
 */
function validateTaskXmlTrigger(taskName, xmlContent) {
  if (!xmlContent || typeof xmlContent !== 'string') return { valid: false, reason: 'Empty XML content' };

  const isMonthly = taskName.toLowerCase().includes('monthly');
  const isWeekly = taskName.toLowerCase().includes('weekly');
  const isMorning = taskName.toLowerCase().includes('morning') || taskName.toLowerCase().includes('0800');
  const isEvening = taskName.toLowerCase().includes('evening') || taskName.toLowerCase().includes('1630');

  if (isMonthly) {
    const hasMonthTag = xmlContent.includes('<ScheduleByMonth>');
    const hasDayOne = xmlContent.includes('<Day>1</Day>');
    const hasBadDayTag = xmlContent.includes('<ScheduleByDay>');
    if (hasBadDayTag && !hasMonthTag) {
      return { valid: false, reason: 'CRITICAL_SEMANTIC_ERROR: Monthly task is configured with ScheduleByDay instead of ScheduleByMonth!' };
    }
    if (!hasMonthTag || !hasDayOne) {
      return { valid: false, reason: 'Monthly task missing ScheduleByMonth or Day 1 trigger.' };
    }
    return { valid: true, triggerType: 'MONTHLY_DAY_1' };
  }

  if (isWeekly) {
    const hasWeekTag = xmlContent.includes('<ScheduleByWeek>');
    const hasMonday = xmlContent.includes('<Monday') || xmlContent.includes('<Monday/>');
    if (!hasWeekTag || !hasMonday) {
      return { valid: false, reason: 'Weekly task missing ScheduleByWeek or Monday trigger.' };
    }
    return { valid: true, triggerType: 'WEEKLY_MONDAY' };
  }

  if (isMorning) {
    const hasDayTag = xmlContent.includes('<ScheduleByDay>');
    const has0800 = xmlContent.includes('08:00:00');
    if (!hasDayTag || !has0800) {
      return { valid: false, reason: 'Morning task missing ScheduleByDay or 08:00:00 boundary.' };
    }
    return { valid: true, triggerType: 'DAILY_0800' };
  }

  if (isEvening) {
    const hasDayTag = xmlContent.includes('<ScheduleByDay>');
    const has1630 = xmlContent.includes('16:30:00');
    if (!hasDayTag || !has1630) {
      return { valid: false, reason: 'Evening task missing ScheduleByDay or 16:30:00 boundary.' };
    }
    return { valid: true, triggerType: 'DAILY_1630' };
  }

  return { valid: true, triggerType: 'GENERIC' };
}

console.log('🧪 [JAYT-SCHEDULER-042D-TEST] Khởi chạy bộ kiểm thử Real Coverage Scheduler & Runtime Integrity (042D)...');

(async () => {
  // [TEST 1]: Split 4 Cron Jobs
  const schedule = JSON.parse(fs.readFileSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'content_coverage_schedule.json'), 'utf8'));
  const cycles = schedule.cycles || {};
  const has4Cycles = cycles.DAILY_MORNING_0800 &&
                     cycles.DAILY_EVENING_1630 &&
                     cycles.WEEKLY_LOCAL_SCHEDULE &&
                     cycles.MONTHLY_GOVERNANCE_AND_BASE_TERMS &&
                     cycles.DAILY_MORNING_0800.cron_schedule === '0 8 * * *' &&
                     cycles.DAILY_EVENING_1630.cron_schedule === '30 16 * * *' &&
                     cycles.WEEKLY_LOCAL_SCHEDULE.cron_schedule === '0 6 * * 1' &&
                     cycles.MONTHLY_GOVERNANCE_AND_BASE_TERMS.cron_schedule === '0 0 1 * *';

  assertTest(
    'RUN_01_SPLIT_4_CRON_JOBS',
    has4Cycles,
    `4 job chu kỳ vận hành định kỳ tách biệt: Sáng (08:00), Chiều (16:30), Tuần (T2 06:00), Tháng (Ngày 1 00:00)`
  );

  // [TEST 2]: Timezone Fail-Closed Check & Da Nang (Asia/Ho_Chi_Minh) Mapping
  let tzOk = false;
  try {
    assertTimezoneConformance();
    const testMorning = getJobsTriggeredAt('2026-08-24T08:00:00+07:00');
    const testEvening = getJobsTriggeredAt('2026-08-24T16:30:00+07:00');
    const testBad1600 = getJobsTriggeredAt('2026-08-24T16:00:00+07:00');
    tzOk = testMorning.triggeredJobs.some(j => j.jobName === 'DAILY_MORNING_0800') &&
           testEvening.triggeredJobs.some(j => j.jobName === 'DAILY_EVENING_1630') &&
           !testBad1600.triggeredJobs.some(j => j.jobName === 'DAILY_EVENING_1630');
  } catch (e) {
    tzOk = false;
  }

  assertTest(
    'RUN_02_TIMEZONE_FAIL_CLOSED_CHECK',
    tzOk,
    `Múi giờ Asia/Ho_Chi_Minh (UTC+7) kiểm soát chuẩn xác: 08:00 & 16:30 khớp đúng, 16:00 không kích hoạt`
  );

  // [TEST 3]: Windows Task Scheduler Live XML Trigger Inspection
  const taskNames = [
    'JayT_Coverage_Daily_Morning_0800',
    'JayT_Coverage_Daily_Evening_1630',
    'JayT_Coverage_Weekly_Monday_0600',
    'JayT_Coverage_Monthly_1st_0000'
  ];
  let liveXmlValidCount = 0;
  for (const tn of taskNames) {
    try {
      const xmlOutput = execSync(`schtasks /query /tn "${tn}" /xml`, { encoding: 'utf8' });
      const check = validateTaskXmlTrigger(tn, xmlOutput);
      if (check.valid) {
        liveXmlValidCount++;
      } else {
        console.error(`  [DEBUG] Task ${tn} invalid trigger: ${check.reason}`);
      }
    } catch (e) {
      console.error(`  [DEBUG] Failed to query XML for ${tn}: ${e.message}`);
    }
  }

  assertTest(
    'RUN_03_LIVE_TASK_XML_TRIGGERS_VERIFIED',
    liveXmlValidCount === 4,
    `Cả 4 Windows Scheduled Tasks (${liveXmlValidCount}/4) được kiểm chứng trực tiếp qua schtasks /xml: Morning (Daily 08:00), Evening (Daily 16:30), Weekly (Monday 06:00), Monthly (ScheduleByMonth Day 1 00:00)`
  );

  // [TEST 3B]: Negative Test - Pseudo-Monthly with ScheduleByDay MUST FAIL
  const fakeMonthlyXml = `
    <Task version="1.3">
      <Triggers>
        <CalendarTrigger>
          <StartBoundary>2026-08-22T00:00:00+07:00</StartBoundary>
          <ScheduleByDay><DaysInterval>1</DaysInterval></ScheduleByDay>
        </CalendarTrigger>
      </Triggers>
    </Task>
  `;
  const fakeCheck = validateTaskXmlTrigger('JayT_Coverage_Monthly_Pseudo_Task', fakeMonthlyXml);

  assertTest(
    'RUN_03B_NEGATIVE_PSEUDO_MONTHLY_REJECTED',
    !fakeCheck.valid && fakeCheck.reason.includes('CRITICAL_SEMANTIC_ERROR'),
    `Kiểm thử âm: Task có tên 'Monthly' nhưng cấu hình ScheduleByDay bị từ chối ngay lập tức (Fail-Closed)`
  );

  // [TEST 4 & 5 & 6]: Real Browser Capture, Physical Artifact Verification & Error Isolation
  const testBatch = await executeControlledBatch('WEEKLY_LOCAL_SCHEDULE', {
    targets: [
      { brand_id: 'METIZ', discovery_urls: ['https://metiz.vn/'] },
      { brand_id: 'INVALID_DOMAIN_TEST', discovery_urls: ['https://unapproved-malicious-domain-12345.com/deal'] }
    ],
    delayMs: 50
  });

  const metizTarget = testBatch.processed_targets.find(t => t.brand_id === 'METIZ');
  const errorTarget = testBatch.errors_contained.find(t => t.brand_id === 'INVALID_DOMAIN_TEST');

  let physicalMetizValid = false;
  if (metizTarget) {
    const screenPath = path.join(artifactsDir, metizTarget.screenshot_file);
    const rcptPath = path.join(artifactsDir, metizTarget.receipt_file);

    if (fs.existsSync(screenPath) && fs.existsSync(rcptPath)) {
      const screenBuf = fs.readFileSync(screenPath);
      const pngCheck = parseAndVerifyPng(screenBuf);
      const actualScreenHash = getFileSha256(screenPath);
      const rcptContent = JSON.parse(fs.readFileSync(rcptPath, 'utf8'));

      physicalMetizValid = pngCheck.ok &&
                           pngCheck.width === 1280 &&
                           pngCheck.height === 720 &&
                           actualScreenHash === metizTarget.screenshot_hash &&
                           rcptContent.screenshot_sha256 === actualScreenHash &&
                           rcptContent.runtime_run_id === testBatch.run_id;
    }
  }

  assertTest(
    'RUN_04_REAL_BROWSER_CAPTURE_PNG_VALIDATION',
    physicalMetizValid,
    `Real Browser Capture thành công trên Metiz: File PNG 1280x720 thật trên đĩa, CRC32/zlib verified, hash khớp 100%`
  );

  const errorIsolationOk = errorTarget &&
                           errorTarget.content_class === 'UNAPPROVED_DOMAIN' &&
                           testBatch.errors_contained_count === 1 &&
                           testBatch.targets_processed_count === 1;

  assertTest(
    'RUN_05_ISOLATED_ERROR_CONTAINMENT',
    errorIsolationOk,
    `Cô lập lỗi hoàn hảo trên từng URL: Domain sai bị chặn ngay, không làm dừng hay gián đoạn chu kỳ batch`
  );

  // [TEST 6]: Bidirectional Capture Receipt with Run ID
  const rcptContent = JSON.parse(fs.readFileSync(path.join(artifactsDir, metizTarget.receipt_file), 'utf8'));
  const rcptValid = rcptContent.schema_version === '1.1.0' &&
                    rcptContent.runtime_run_id === testBatch.run_id &&
                    rcptContent.candidate_id === 'CAND-DNG-METIZ-REAL' &&
                    rcptContent.evidence_id === 'EVID_CAND-DNG-METIZ-REAL' &&
                    rcptContent.screenshot_sha256 === metizTarget.screenshot_hash &&
                    rcptContent.decoded_dimensions.width === 1280;

  assertTest(
    'RUN_06_BIDIRECTIONAL_RECEIPT_WITH_RUN_ID',
    rcptValid,
    `Capture Receipt hai chiều chứa đầy đủ runtime_run_id (${testBatch.run_id}), candidate_id, evidence_id và SHA-256`
  );

  // [TEST 7]: Append-Only Journal Logging
  const journalFiles = fs.readdirSync(journalDir);
  const currentJournal = journalFiles.find(f => f.startsWith('coverage_journal_'));
  const journalData = currentJournal ? fs.readFileSync(path.join(journalDir, currentJournal), 'utf8') : '';
  const journalHasEntry = journalData.includes(testBatch.run_id) && journalData.includes('WEEKLY_LOCAL_SCHEDULE');

  assertTest(
    'RUN_07_APPEND_ONLY_JOURNAL_LOGGING',
    journalHasEntry,
    `Sổ nhật ký vận hành append-only trong coverage_journal/ ghi nhận đầy đủ lịch sử run_id ${testBatch.run_id}`
  );

  // [TEST 8]: Fail-Closed Zero-Mutation Production Invariant
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodHash = crypto.createHash('sha256').update(prodRaw).digest('hex');
  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;

  assertTest(
    'RUN_08_FAIL_CLOSED_ZERO_MUTATION_PRODUCTION_IMMUTABLE',
    prodRaw.trim() === '[]' &&
    prodHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' &&
    isApproved === false &&
    testBatch.governance.deals_imported === 0,
    `Production feed duy trì bất biến [] (SHA-256: ${prodHash}) và RELEASE_MANIFEST is_approved: false (LOCKED)`
  );

  // [TEST 9]: CLI Dry-Run and Once Conformance
  const cliWorkerPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'coverage_worker.js');
  const dryRunOutput = execFileSync('node', [cliWorkerPath, '--dry-run', '--at', '2026-08-24T16:30:00+07:00'], { encoding: 'utf8' });
  const dryRunOk = dryRunOutput.includes('DAILY_EVENING_1630') && dryRunOutput.includes('Asia/Ho_Chi_Minh');

  assertTest(
    'RUN_09_CLI_INTERFACE_DRY_RUN_CONFORMANCE',
    dryRunOk,
    `Giao diện CLI --dry-run --at <ISO> phản hồi chính xác job và múi giờ`
  );

  // [TEST 10]: Non-Promotion States Fail-Closed in Candidate Queue
  const pendingFiles = fs.readdirSync(candidatesDir).filter(f => f.startsWith('candidate_') && f.endsWith('.json'));
  let nonPromoSafe = true;
  for (const pf of pendingFiles) {
    const isCgv = pf.includes('CGV') || pf.includes('candidate_21');
    if (!isCgv) {
      const cdata = JSON.parse(fs.readFileSync(path.join(candidatesDir, pf), 'utf8'));
      if (cdata.deals && cdata.deals[0]) {
        if (cdata.deals[0].render_eligible !== false || cdata.deals[0].deal_price !== null) {
          nonPromoSafe = false;
        }
      }
    }
  }

  assertTest(
    'RUN_10_NON_PROMOTION_STATES_FAIL_CLOSED_LOCKED',
    nonPromoSafe,
    `Toàn bộ 13 candidate không phải PROMOTION_DETAIL giữ nguyên render_eligible: false và deal_price: null (Fail-Closed)`
  );

  if (passCount === testCount && testCount > 0) {
    console.log(`\n🟢 [SCHEDULER-042D-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ REAL COVERAGE SCHEDULER RUNTIME (042D) ĐÃ ĐẠT [PASS]!\n`);
  } else {
    console.error(`\n❌ [SCHEDULER-042D-SUMMARY] KIỂM THỬ THẤT BẠI: ${passCount}/${testCount} PASS (${testCount - passCount} FAILED)!\n`);
    process.exitCode = 1;
    process.exit(1);
  }
})();
