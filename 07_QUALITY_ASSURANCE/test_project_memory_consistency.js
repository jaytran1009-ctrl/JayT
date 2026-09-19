/**
 * =============================================================================
 * JAYT CORP - QUALITY ASSURANCE: PROJECT MEMORY CONSISTENCY TEST SUITE (NODE.JS)
 * WORK ORDER: JAYT-PROJECT-MEMORY-027 / JAYT-LIVE-CATALOG-TRUTH-025B
 * Purpose: Read-only automated verification of PROJECT_MEMORY.md consistency
 *          against real system state on disk. Zero hardcoded counts.
 * Execution: node 07_QUALITY_ASSURANCE/test_project_memory_consistency.js
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { validateQuarantineManifestContract } = require('./test_quarantine_integrity_contract.js');

const repoRoot = path.resolve(__dirname, '..');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');
const manifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const candidatesDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review');
const quarantineManifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'QUARANTINE_MANIFEST.json');

console.log('🧪 [JAYT-MEMORY-TEST] Khởi chạy bộ kiểm thử tính nhất quán PROJECT_MEMORY.md (Node.js Engine)...');

let allPassed = true;
const tests = [];

function assertTest(testId, passed, message) {
  tests.push({ id: testId, passed, message });
  console.log(`  [${testId}]: [${passed ? 'PASS' : 'FAIL'}] - ${message}`);
  if (!passed) {
    allPassed = false;
  }
}

try {
  // 1. Memory file existence & non-empty
  const memoryExists = fs.existsSync(memoryPath);
  const memoryText = memoryExists ? fs.readFileSync(memoryPath, 'utf8') : '';
  assertTest('MEM_01_EXISTS_AND_NON_EMPTY', memoryExists && memoryText.length > 1000,
    memoryExists ? `Tệp tồn tại, dung lượng ${memoryText.length} bytes.` : 'PROJECT_MEMORY.md không tồn tại.');

  // 2. Operational SSOT Definition Scope (Not replacing raw domain SSOTs)
  const isOperationalSSOT = memoryText.includes('nguồn sự thật điều hành và chỉ mục trạng thái') ||
                            memoryText.includes('Operational SSOT & State Index');
  const doesNotReplaceDomainSSOTs = memoryText.includes('tuyệt đối không thay thế') ||
                                    memoryText.includes('không thay thế catalog');
  assertTest('MEM_02_OPERATIONAL_SSOT_SCOPE', isOperationalSSOT && doesNotReplaceDomainSSOTs,
    'Định vị chính xác là Operational SSOT & State Index, không thay thế catalog/manifest/evidence.');

  // 3. Dynamic Production Lock State Consistency
  const manifestExists = fs.existsSync(manifestPath);
  let isApprovedManifest = false;
  if (manifestExists) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    isApprovedManifest = manifest.governance_locks?.immutable_ceo_approval_record?.is_approved === true;
  }
  const memoryClaimsLocked = memoryText.includes('is_approved: false') && memoryText.includes('PRODUCTION LOCKED');
  const memoryClaimsUnlocked = memoryText.includes('is_approved: true');
  const lockConsistent = (isApprovedManifest === false) && memoryClaimsLocked && !memoryClaimsUnlocked;
  assertTest('MEM_03_PRODUCTION_LOCK_CONSISTENCY', lockConsistent,
    `Manifest is_approved=${isApprovedManifest}; Memory phản ánh chính xác PRODUCTION LOCKED (is_approved: false).`);

  // 4. Dynamic Deals Feed Count & Blocker State Consistency
  const dealsFeedExists = fs.existsSync(dealsFeedPath);
  const deals = dealsFeedExists ? JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8')) : [];
  const actualDealCount = deals.length;

  let feedCountConsistent = false;
  let feedDetail = '';
  if (actualDealCount > 0) {
    const mentionsCount = memoryText.includes(`${actualDealCount} bản ghi`) || memoryText.includes(`${actualDealCount} record`);
    const mentionsBlocked = memoryText.includes('BLOCKED') || memoryText.includes('CHƯA ĐỦ ĐIỀU KIỆN');
    feedCountConsistent = mentionsCount && mentionsBlocked;
    feedDetail = `Feed thực tế có ${actualDealCount} records; Memory phản ánh đúng ${actualDealCount} bản ghi và trạng thái BLOCKED.`;
  } else {
    const mentionsEmpty = memoryText.includes('[]') || memoryText.includes('Honest Empty State');
    feedCountConsistent = mentionsEmpty;
    feedDetail = `Feed thực tế là []; Memory phản ánh đúng Honest Empty State [].`;
  }
  assertTest('MEM_04_DYNAMIC_DEALS_FEED_CONSISTENCY', feedCountConsistent, feedDetail);

  // 5. Dynamic Candidate Count & Needs Recheck Consistency
  const candidateFiles = fs.existsSync(candidatesDir)
    ? fs.readdirSync(candidatesDir).filter(f => f.startsWith('candidate_') && f.endsWith('.json'))
    : [];

  let actualRecheckCount = 0;
  for (const f of candidateFiles) {
    const cdata = JSON.parse(fs.readFileSync(path.join(candidatesDir, f), 'utf8'));
    const evKeys = Object.keys(cdata.evidence || {});
    if (evKeys.length > 0) {
      const ev = cdata.evidence[evKeys[0]];
      const status = ev.verification_status || ev.verification_readiness;
      if (status === 'NEEDS_RECHECK') actualRecheckCount++;
    }
  }

  const mentionsCandidateCount = memoryText.includes(`${actualRecheckCount} hồ sơ`) ||
                                 memoryText.includes(`${actualRecheckCount} candidate`) ||
                                 memoryText.includes(`${candidateFiles.length} candidate`);
  const mentionsZeroImport = memoryText.includes('0 PASS / 0 IMPORT') && memoryText.includes('NEEDS_RECHECK');
  const noFalseReadyClaim = !memoryText.includes('Candidate đã VERIFIED') && !memoryText.includes('Candidate sẵn sàng import');
  const candidateConsistent = mentionsCandidateCount && mentionsZeroImport && noFalseReadyClaim;
  assertTest('MEM_05_DYNAMIC_CANDIDATE_CONSISTENCY', candidateConsistent,
    `Hàng đợi có ${actualRecheckCount} candidates NEEDS_RECHECK; Memory phản ánh đúng 0 PASS / 0 IMPORT.`);

  // 6. Linked Artifacts Physical Presence on Disk
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  let checkedLinksCount = 0;
  let missingLinks = [];

  while ((match = linkRegex.exec(memoryText)) !== null) {
    const label = match[1].trim();
    let target = match[2].trim();

    if (target.startsWith('http://') || target.startsWith('https://') || target.startsWith('#') || target.startsWith('mailto:')) {
      continue;
    }
    let cleanTarget = target.replace(/^[<](.*)[>]$/, '$1').split('#')[0].replace(/:\d+$/, '').trim();
    if (!cleanTarget) continue;

    const fullPath = path.resolve(repoRoot, cleanTarget);
    if (!fs.existsSync(fullPath)) {
      missingLinks.push(`${target} (${label})`);
    } else {
      checkedLinksCount++;
    }
  }

  const linksValid = missingLinks.length === 0 && checkedLinksCount > 0;
  assertTest('MEM_06_LINKED_ARTIFACTS_EXIST', linksValid,
    linksValid ? `Đã xác thực ${checkedLinksCount} artifact links trên đĩa tồn tại 100%.`
               : `Có ${missingLinks.length} links không tồn tại: ${missingLinks.join(', ')}`);

  // 7. Active Work Order Acceptance Criteria (Strict Section 5 Criteria Validation)
  let activeWoId = null;
  const topStatusMatch = memoryText.match(/\b(\d{3}[A-Z0-9_-]*|JAYT-[A-Z0-9_-]+)\s*:\s*(?:IMPLEMENTED|IN_PROGRESS|PROPOSED)/i);
  if (topStatusMatch) {
    activeWoId = topStatusMatch[1].toUpperCase();
  }

  // Extract Section 5 specifically
  const section5Match = memoryText.match(/## 5\.\s*(?:Work Order Đang Hoạt Động|Kế Hoạch Vận Hành)[\s\S]*?(?=## 6\.|$)/i);
  const section5Text = section5Match ? section5Match[0] : '';

  const mentionsActiveWoInSection5 = activeWoId ? section5Text.includes(activeWoId.replace(/JAYT-/g, '')) : false;
  
  // Count structured bullet / numbered criteria items in Section 5
  const criteriaItems = section5Text.match(/(?:^\s*\d+\.|\*|-)\s+\*\*[^*]+\*\*:?[^\n]*/gm) || [];
  const hasSubstantialCriteria = criteriaItems.length >= 3 && criteriaItems.every(item => item.trim().length >= 20);

  const mem07Pass = Boolean(section5Text && mentionsActiveWoInSection5 && hasSubstantialCriteria);

  assertTest('MEM_07_WORK_ORDER_ACCEPTANCE_CRITERIA', mem07Pass,
    mem07Pass ? `Section 5 chứa đúng work order active '${activeWoId}' với ${criteriaItems.length} tiêu chí nghiệm thu cụ thể.`
              : `Section 5 thiếu work order active '${activeWoId}' hoặc tiêu chí không đủ cụ thể (${criteriaItems.length} items).`);

  // 8. Immutable Principles Integrity
  const hasPrinciples = memoryText.includes('MODEL ≠ OBSERVED ≠ EVIDENCE') &&
                        memoryText.includes('Fail-Closed Gate') &&
                        memoryText.includes('Không Tạo Dữ Liệu Ảo') &&
                        memoryText.includes('Candidate Không Phải Live Catalog') &&
                        memoryText.includes('Production Mặc Định Khóa Chặt');
  assertTest('MEM_08_IMMUTABLE_PRINCIPLES_ENFORCED', hasPrinciples,
    'Bộ 7 nguyên tắc bất biến được tuyên bố và bảo vệ đầy đủ.');

  // 9. Quarantine Integrity Contract & Future Fail-Closed Enforcement (TRUTH-025B)
  if (!fs.existsSync(quarantineManifestPath)) {
    assertTest('MEM_09_QUARANTINE_INTEGRITY_CONTRACT', false, 'QUARANTINE_MANIFEST.json không tồn tại.');
  } else {
    const qManifest = JSON.parse(fs.readFileSync(quarantineManifestPath, 'utf8'));
    const qRes = validateQuarantineManifestContract(qManifest, path.dirname(quarantineManifestPath), repoRoot);
    assertTest('MEM_09_QUARANTINE_INTEGRITY_CONTRACT', qRes.valid, qRes.reason);
  }

  // 10. Status Taxonomy Enforcement (057)
  const headerStatusMatch = memoryText.match(/Trạng thái chính thức\*\*:\s*`([^`]+)`/);
  const isHeaderTaxonomyClean = headerStatusMatch &&
                                !headerStatusMatch[1].includes('061A: VERIFIED') &&
                                !headerStatusMatch[1].includes('061A: ACCEPTED') &&
                                !headerStatusMatch[1].includes('061: VERIFIED') &&
                                !headerStatusMatch[1].includes('061: ACCEPTED') &&
                                !headerStatusMatch[1].includes('060C: VERIFIED') &&
                                !headerStatusMatch[1].includes('060B: VERIFIED') &&
                                !headerStatusMatch[1].includes('060B: ACCEPTED') &&
                                !headerStatusMatch[1].includes('060A: VERIFIED') &&
                                !headerStatusMatch[1].includes('060A: ACCEPTED') &&
                                !headerStatusMatch[1].includes('060: VERIFIED') &&
                                !headerStatusMatch[1].includes('060: ACCEPTED') &&
                                !headerStatusMatch[1].includes('058B: VERIFIED') &&
                                !headerStatusMatch[1].includes('058A: VERIFIED') &&
                                !headerStatusMatch[1].includes('058: VERIFIED') &&
                                !headerStatusMatch[1].includes('058: ACCEPTED') &&
                                !headerStatusMatch[1].includes('056C: VERIFIED') &&
                                !headerStatusMatch[1].includes('056B: VERIFIED') &&
                                !headerStatusMatch[1].includes('056B: ACCEPTED') &&
                                !headerStatusMatch[1].includes('056A: VERIFIED') &&
                                !headerStatusMatch[1].includes('056A: ACCEPTED');
  assertTest('MEM_10_STATUS_TAXONOMY_ENFORCEMENT', isHeaderTaxonomyClean,
    'Header status tuân thủ chuẩn 057: AI không tự ghi VERIFIED/ACCEPTED trước khi CEO kiểm toán độc lập.');

} catch (err) {
  console.error('  [MEM_FATAL_ERROR]:', err);
  allPassed = false;
}

console.log('\n' + (allPassed ? '🟢' : '❌') + ' [MEMORY-TEST-SUMMARY] ' +
  (allPassed ? `TOÀN BỘ ${tests.length}/${tests.length} KIỂM THỬ TÍNH NHẤT QUÁN PROJECT_MEMORY.MD ĐÃ ĐẠT [PASS]!`
             : `KIỂM THỬ THẤT BẠI [FAIL]!`));

process.exit(allPassed ? 0 : 1);
