const fs = require('fs');
const path = require('path');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const { validateCandidate, validateZonePolicy, loadZoneCatalog, getFileSha256 } = require('./validate_candidate_evidence.js');

let totalTests = 0;
let passedTests = 0;

function assertTest(name, condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [${name}]: [PASS] - ${message}`);
  } else {
    console.error(`  [${name}]: [FAIL] - ${message}`);
  }
}

console.log('🧪 [JAYT-ZONE-TEST] Khởi chạy bộ kiểm thử Zone Evidence Contract & Negative Tests (036E)...');

// 1. Live zone_catalog.json integrity
const zoneCatalogPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'zone_catalog.json');
const rawZones = JSON.parse(fs.readFileSync(zoneCatalogPath, 'utf8'));

let allZonesValid = Array.isArray(rawZones) && rawZones.length >= 6;
let vinhTrungZone = null;

for (const z of rawZones) {
  if (!z.zone_id || !z.zone_name || !z.cluster_type || !z.district) {
    allZonesValid = false;
  }
  if (z.zone_id === 'ZONE_VINH_TRUNG_THANH_KHE') {
    vinhTrungZone = z;
  }
}

assertTest('ZONE_01_REAL_ZONE_CATALOG_VALID', allZonesValid,
  `zone_catalog.json hợp lệ 100%, gồm ${rawZones.length} zones.`);

// 2. Physical evidence file presence and byte-for-byte SHA-256 match
const snapshotsDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'evidence_snapshots');
const physicalFilePath = path.join(snapshotsDir, vinhTrungZone.location_evidence_ref);
const fileExists = fs.existsSync(physicalFilePath);
const actualFileHash = fileExists ? getFileSha256(physicalFilePath) : 'NON_EXISTENT';
const hashMatches = actualFileHash === vinhTrungZone.location_artifact_hash;

assertTest('ZONE_02_PHYSICAL_ARTIFACT_AND_HASH_MATCH', fileExists && hashMatches,
  `File vị trí tồn tại (${vinhTrungZone.location_evidence_ref}) và mã băm SHA-256 từ đĩa (${actualFileHash}) khớp 100% catalog.`);

// 3. CGV candidate uses ZONE_VINH_TRUNG_THANH_KHE
const cand21Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review', 'candidate_21_CAND-DNG-CGV-CULTURE-DAY-REAL.json');
const cand21Data = JSON.parse(fs.readFileSync(cand21Path, 'utf8'));
const deal21 = cand21Data.deals[0];

const candZoneValid = deal21.zone === 'ZONE_VINH_TRUNG_THANH_KHE';
assertTest('ZONE_03_CANDIDATE_USES_HONEST_ZONE', candZoneValid,
  `Candidate CGV gán chính xác zone '${deal21.zone}', không dùng ZONE_HAI_CHAU_CENTER.`);

// 4. Candidate validator passes on live candidate with full zone validation
const valRes = validateCandidate(cand21Data);
assertTest('ZONE_04_CANDIDATE_VALIDATION_PASSES', valRes.valid,
  `Candidate CGV Culture Day đạt VALID: ${valRes.valid ? 'OK' : valRes.errors.join('; ')}`);

// 5. NEGATIVE: Non-existent zone is blocked
const fakeZoneCand = JSON.parse(JSON.stringify(cand21Data));
fakeZoneCand.deals[0].zone = 'ZONE_NON_EXISTENT_FAKE';
const fakeZoneRes = validateCandidate(fakeZoneCand);
assertTest('ZONE_05_NEGATIVE_NON_EXISTENT_ZONE_BLOCKED', !fakeZoneRes.valid && fakeZoneRes.errors.some(e => e.includes('ZONE_NON_EXISTENT_FAKE')),
  `Candidate tham chiếu zone không tồn tại bị chặn thành công: [${fakeZoneRes.errors.filter(e => e.includes('ZONE_NON_EXISTENT_FAKE')).join('; ')}]`);

// 6. NEGATIVE: Evidence file deleted / missing is blocked
const missingFileCatalog = [
  {
    zone_id: 'ZONE_MISSING_FILE',
    zone_name: 'Missing File Zone',
    cluster_type: 'LIFESTYLE',
    district: 'Quận Thanh Khê',
    source_url: 'https://cgv.vn/site',
    location_evidence_ref: 'completely_non_existent_artifact_file.png',
    location_artifact_hash: '28451a062c63b942c51106f46d04682f9b484e828ac684cb46920f524585a706',
    status: 'LOCATION_EVIDENCED',
    coordinates: null
  }
];
const missingFileCand = JSON.parse(JSON.stringify(cand21Data));
missingFileCand.deals[0].zone = 'ZONE_MISSING_FILE';
const missingFileRes = validateCandidate(missingFileCand, { zoneCatalog: missingFileCatalog });
assertTest('ZONE_06_NEGATIVE_MISSING_PHYSICAL_FILE_BLOCKED', !missingFileRes.valid && missingFileRes.errors.some(e => e.includes('does not exist on disk')),
  `Zone có file bằng chứng không tồn tại trên đĩa bị chặn thành công: [${missingFileRes.errors.filter(e => e.includes('does not exist on disk')).join('; ')}]`);

// 7. NEGATIVE: Evidence file tampered / hash mismatch is blocked
const tamperedHashCatalog = [
  {
    zone_id: 'ZONE_TAMPERED_HASH',
    zone_name: 'Tampered Hash Zone',
    cluster_type: 'LIFESTYLE',
    district: 'Quận Thanh Khê',
    source_url: 'https://cgv.vn/site',
    location_evidence_ref: vinhTrungZone.location_evidence_ref,
    location_artifact_hash: '0000000000000000000000000000000000000000000000000000000000000000',
    status: 'LOCATION_EVIDENCED',
    coordinates: null
  }
];
const tamperedCand = JSON.parse(JSON.stringify(cand21Data));
tamperedCand.deals[0].zone = 'ZONE_TAMPERED_HASH';
const tamperedRes = validateCandidate(tamperedCand, { zoneCatalog: tamperedHashCatalog });
assertTest('ZONE_07_NEGATIVE_TAMPERED_HASH_BLOCKED', !tamperedRes.valid && tamperedRes.errors.some(e => e.includes('SHA-256 mismatch')),
  `Zone có mã băm sai lệch so với file thật bị chặn thành công: [${tamperedRes.errors.filter(e => e.includes('SHA-256 mismatch')).join('; ')}]`);

// 8. NEGATIVE: Insecure HTTP or unapproved domain in zone source_url is blocked
const badDomainCatalog = [
  {
    zone_id: 'ZONE_BAD_DOMAIN',
    zone_name: 'Bad Domain Zone',
    cluster_type: 'LIFESTYLE',
    district: 'Quận Thanh Khê',
    source_url: 'https://evil-unapproved-site.com/site',
    location_evidence_ref: vinhTrungZone.location_evidence_ref,
    location_artifact_hash: vinhTrungZone.location_artifact_hash,
    status: 'LOCATION_EVIDENCED',
    coordinates: null
  }
];
const badDomainCand = JSON.parse(JSON.stringify(cand21Data));
badDomainCand.deals[0].zone = 'ZONE_BAD_DOMAIN';
const badDomainRes = validateCandidate(badDomainCand, { zoneCatalog: badDomainCatalog });
assertTest('ZONE_08_NEGATIVE_UNAPPROVED_DOMAIN_BLOCKED', !badDomainRes.valid && badDomainRes.errors.some(e => e.includes('evil-unapproved-site.com')),
  `Zone dùng source_url có domain không được duyệt bị chặn thành công: [${badDomainRes.errors.filter(e => e.includes('evil-unapproved-site.com')).join('; ')}]`);

// 9. NEGATIVE: Path traversal in location_evidence_ref is blocked
const traversalCatalog = [
  {
    zone_id: 'ZONE_TRAVERSAL',
    zone_name: 'Path Traversal Zone',
    cluster_type: 'LIFESTYLE',
    district: 'Quận Thanh Khê',
    source_url: 'https://cgv.vn/site',
    location_evidence_ref: '../../../../etc/passwd',
    location_artifact_hash: '28451a062c63b942c51106f46d04682f9b484e828ac684cb46920f524585a706',
    status: 'LOCATION_EVIDENCED',
    coordinates: null
  }
];
const traversalCand = JSON.parse(JSON.stringify(cand21Data));
traversalCand.deals[0].zone = 'ZONE_TRAVERSAL';
const traversalRes = validateCandidate(traversalCand, { zoneCatalog: traversalCatalog });
assertTest('ZONE_09_NEGATIVE_PATH_TRAVERSAL_BLOCKED', !traversalRes.valid && traversalRes.errors.some(e => e.includes('path traversal')),
  `Zone có path traversal trong location_evidence_ref bị chặn thành công: [${traversalRes.errors.filter(e => e.includes('path traversal')).join('; ')}]`);

// 10. NEGATIVE: Contradicting district is blocked
const contraCand = JSON.parse(JSON.stringify(cand21Data));
contraCand.deals[0].zone = 'ZONE_HAI_CHAU_CBD'; // candidate address specifies Thanh Khê, but zone district is Hải Châu
const contraRes = validateCandidate(contraCand);
assertTest('ZONE_10_NEGATIVE_CONTRADICTING_DISTRICT_BLOCKED', !contraRes.valid && contraRes.errors.some(e => e.includes('District contradiction')),
  `Candidate mâu thuẫn quận/huyện giữa address và zone bị chặn thành công: [${contraRes.errors.filter(e => e.includes('District contradiction')).join('; ')}]`);

console.log(`\n🟢 [ZONE-CONTRACT-SUMMARY] Toàn bộ ${passedTests}/${totalTests} kiểm thử Zone Evidence Contract đã ĐẠT [PASS]!`);

if (passedTests !== totalTests) {
  process.exit(1);
} else {
  process.exit(0);
}
