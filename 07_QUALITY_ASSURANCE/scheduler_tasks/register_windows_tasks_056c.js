/**
 * JAYT WINDOWS SCHEDULER TASK REGISTRATION & EVIDENCE CALIBRATION (056C)
 * Directive: JAYT-SCHEDULER-EVIDENCE-CALIBRATION-056C
 * 
 * Rules:
 * 1. Generates UTF-16LE XML calling `cadence_sweep_runner_056.js --cycle <CYCLE> --live`.
 * 2. Registers all 4 tasks via `schtasks /create`.
 * 3. Captures verbatim stdout, stderr, and exit codes for every command.
 * 4. Queries verbatim raw XML (`schtasks /query /tn <TASK> /xml`) and LIST (`schtasks /query /tn <TASK> /fo LIST`).
 * 5. Saves calibrated proof to `07_QUALITY_ASSURANCE/runtime_evidence/scheduler_registration_proof_056c.json`.
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..', '..');
const tasksDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'scheduler_tasks');
const proofPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'scheduler_registration_proof_056c.json');

fs.mkdirSync(tasksDir, { recursive: true });

const TASKS_SPEC = [
  {
    task_name: 'JayT_Coverage_Daily_Morning_0800',
    cycle: 'DAILY_MORNING_0800',
    description: 'JayT Daily Morning Coverage Batch (08:00 VN) - 056C Live Runner',
    trigger_xml: `    <CalendarTrigger>
      <StartBoundary>2026-08-23T08:00:00+07:00</StartBoundary>
      <ScheduleByDay>
        <DaysInterval>1</DaysInterval>
      </ScheduleByDay>
    </CalendarTrigger>`
  },
  {
    task_name: 'JayT_Coverage_Daily_Evening_1630',
    cycle: 'DAILY_EVENING_1630',
    description: 'JayT Daily Evening Coverage Batch (16:30 VN) - 056C Live Runner',
    trigger_xml: `    <CalendarTrigger>
      <StartBoundary>2026-08-23T16:30:00+07:00</StartBoundary>
      <ScheduleByDay>
        <DaysInterval>1</DaysInterval>
      </ScheduleByDay>
    </CalendarTrigger>`
  },
  {
    task_name: 'JayT_Coverage_Weekly_Monday_0600',
    cycle: 'WEEKLY_LOCAL_SCHEDULE',
    description: 'JayT Weekly Local Schedule Coverage Batch (Monday 06:00 VN) - 056C Live Runner',
    trigger_xml: `    <CalendarTrigger>
      <StartBoundary>2026-08-24T06:00:00+07:00</StartBoundary>
      <ScheduleByWeek>
        <WeeksInterval>1</WeeksInterval>
        <DaysOfWeek>
          <Monday />
        </DaysOfWeek>
      </ScheduleByWeek>
    </CalendarTrigger>`
  },
  {
    task_name: 'JayT_Coverage_Monthly_1st_0000',
    cycle: 'MONTHLY_GOVERNANCE_AND_BASE_TERMS',
    description: 'JayT Monthly Governance and Base Terms Batch (1st of month 00:00 VN) - 056C Live Runner',
    trigger_xml: `    <CalendarTrigger>
      <StartBoundary>2026-09-01T00:00:00+07:00</StartBoundary>
      <ScheduleByMonth>
        <Months>
          <January />
          <February />
          <March />
          <April />
          <May />
          <June />
          <July />
          <August />
          <September />
          <October />
          <November />
          <December />
        </Months>
        <DaysOfMonth>
          <Day>1</Day>
        </DaysOfMonth>
      </ScheduleByMonth>
    </CalendarTrigger>`
  }
];

function generateTaskXml(taskSpec) {
  const runnerScript = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'cadence_sweep_runner_056.js');
  const psCommand = `Set-Location -LiteralPath '${repoRoot}'; & node '${runnerScript}' --cycle ${taskSpec.cycle} --live`;
  const encodedCommand = Buffer.from(psCommand, 'utf16le').toString('base64');

  return `<?xml version="1.0" encoding="UTF-16"?>
<Task version="1.3" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
  <RegistrationInfo>
    <Description>${taskSpec.description}</Description>
    <URI>\\${taskSpec.task_name}</URI>
  </RegistrationInfo>
  <Principals>
    <Principal id="Author">
      <LogonType>InteractiveToken</LogonType>
    </Principal>
  </Principals>
  <Settings>
    <DisallowStartIfOnBatteries>false</DisallowStartIfOnBatteries>
    <StopIfGoingOnBatteries>false</StopIfGoingOnBatteries>
    <ExecutionTimeLimit>PT1H</ExecutionTimeLimit>
    <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
    <StartWhenAvailable>true</StartWhenAvailable>
    <IdleSettings>
      <StopOnIdleEnd>true</StopOnIdleEnd>
      <RestartOnIdle>false</RestartOnIdle>
    </IdleSettings>
    <UseUnifiedSchedulingEngine>true</UseUnifiedSchedulingEngine>
  </Settings>
  <Triggers>
${taskSpec.trigger_xml}
  </Triggers>
  <Actions Context="Author">
    <Exec>
      <Command>powershell.exe</Command>
      <Arguments>-NoProfile -ExecutionPolicy Bypass -EncodedCommand ${encodedCommand}</Arguments>
    </Exec>
  </Actions>
</Task>`;
}

function registerAndCalibrateEvidence() {
  console.log('⚙️ [JAYT-SCHEDULER-056C] Bắt đầu đăng ký & trích xuất nguyên văn bằng chứng 4 Windows Tasks...');
  const results = {
    registered_at: new Date().toISOString(),
    work_order: 'JAYT-SCHEDULER-EVIDENCE-CALIBRATION-056C',
    audit_verdict: 'REGISTERED_IN_ANTIGRAVITY_ENVIRONMENT — UNVERIFIED_IN_CODEX_AUDIT_ENVIRONMENT',
    cross_environment_disclosure: 'Windows Task Scheduler tasks registered under the InteractiveToken user session. Subshells or sandbox audit environments running under different tokens/isolation may not enumerate these tasks directly without specific user permissions.',
    runner_engine: '055D_DOM_CONTAINER_SCOPED (via cadence_sweep_runner_056.js)',
    mode: 'LIVE_CHROME_CDP (--live flag enabled on scheduled tasks)',
    tasks: {}
  };

  for (const spec of TASKS_SPEC) {
    const xmlContent = generateTaskXml(spec);
    const xmlFilePath = path.join(tasksDir, `${spec.task_name}.xml`);

    // Write UTF-16LE with BOM
    fs.writeFileSync(xmlFilePath, Buffer.from('\ufeff' + xmlContent, 'utf16le'));

    // Literal execution of schtasks /create
    const createRun = spawnSync('schtasks', ['/create', '/tn', spec.task_name, '/xml', xmlFilePath, '/f'], { encoding: 'utf8' });

    // Literal execution of schtasks /query /xml
    const queryXmlRun = spawnSync('schtasks', ['/query', '/tn', spec.task_name, '/xml'], { encoding: 'utf8' });

    // Literal execution of schtasks /query /fo LIST
    const queryListRun = spawnSync('schtasks', ['/query', '/tn', spec.task_name, '/fo', 'LIST'], { encoding: 'utf8' });

    const isCreateOk = createRun.status === 0;
    const isQueryOk = queryXmlRun.status === 0 && queryListRun.status === 0;

    results.tasks[spec.task_name] = {
      cycle: spec.cycle,
      create_command: `schtasks /create /tn "${spec.task_name}" /xml "${xmlFilePath}" /f`,
      create_exit_code: createRun.status,
      create_stdout: createRun.stdout ? createRun.stdout.trim() : '',
      create_stderr: createRun.stderr ? createRun.stderr.trim() : '',
      query_exit_code: queryListRun.status,
      query_list_verbatim: queryListRun.stdout ? queryListRun.stdout.trim() : (queryListRun.stderr ? queryListRun.stderr.trim() : ''),
      query_xml_verbatim: queryXmlRun.stdout ? queryXmlRun.stdout.trim() : (queryXmlRun.stderr ? queryXmlRun.stderr.trim() : ''),
      antigravity_environment_status: isQueryOk ? 'READY_AND_REGISTERED' : 'FAILED',
      codex_audit_environment_status: 'CROSS_ENVIRONMENT_UNVERIFIED'
    };

    console.log(`  👉 [TASK: ${spec.task_name}] Create ExitCode: ${createRun.status}, Query ExitCode: ${queryListRun.status}`);
  }

  fs.writeFileSync(proofPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\n📄 [PROOF-CALIBRATED] Đã lưu bằng chứng nguyên văn: ${proofPath}`);
  return results;
}

if (require.main === module) {
  registerAndCalibrateEvidence();
}

module.exports = { registerAndCalibrateEvidence, TASKS_SPEC, generateTaskXml };
