const fs = require('fs');
const path = require('path');
const { validateLocalityMap } = require('./validate_locality_map.js');
const { getContextualRecommendation } = require('./contextual_recommendation_engine.js');

const repoRoot = path.resolve(__dirname, '..');
const LOCALITY_MAP_PATH = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'danang_locality_map.json');

console.log('🧪 [JAYT-LOCALITY-TEST] Khởi chạy bộ kiểm thử Bản Đồ Giá Trị Địa Bàn Đà Nẵng & Negative Coordinate Gate (034A)...');

let allPassed = true;
function assertTest(name, condition, detail = '') {
  console.log(`  [${name}]: [${condition ? 'PASS' : 'FAIL'}]${detail ? ' - ' + detail : ''}`);
  if (!condition) allPassed = false;
}

const realLocalityMap = JSON.parse(fs.readFileSync(LOCALITY_MAP_PATH, 'utf8'));

// ---------------------------------------------------------------------------
// [LOC_01] Real Locality Map Passes Validation 100%
// ---------------------------------------------------------------------------
const res1 = validateLocalityMap(realLocalityMap);
assertTest(
  'LOC_01_REAL_LOCALITY_MAP_VALID',
  res1.valid === true,
  res1.valid ? 'Bản đồ thực tế hợp lệ 100%' : `Lỗi: ${res1.errors.join('; ')}`
);

// ---------------------------------------------------------------------------
// [LOC_02] Metiz Strictly Has Null Coordinates & LOCATION_UNVERIFIED
// ---------------------------------------------------------------------------
const metizLoc = realLocalityMap.layer_3_locations_registry.find(l => l.location_id === 'LOC_METIZ_HELIO');
assertTest(
  'LOC_02_METIZ_IS_UNVERIFIED_AND_NULL_COORDS',
  metizLoc &&
  metizLoc.coordinates === null &&
  metizLoc.verification_status === 'LOCATION_UNVERIFIED' &&
  metizLoc.reference_area === 'Khu vực Helio Center / Đường 2 Tháng 9',
  `Metiz status: ${metizLoc ? metizLoc.verification_status : 'NOT_FOUND'}, coords: ${metizLoc ? metizLoc.coordinates : 'N/A'}`
);

// ---------------------------------------------------------------------------
// [LOC_03] All Unverified Locations Use Reference Area (No Claim of Exact Address)
// ---------------------------------------------------------------------------
const unverifiedLocs = realLocalityMap.layer_3_locations_registry.filter(l => l.verification_status === 'LOCATION_UNVERIFIED');
const allHaveRefArea = unverifiedLocs.every(l => l.reference_area && l.coordinates === null);
assertTest(
  'LOC_03_ALL_UNVERIFIED_USE_REFERENCE_AREA',
  unverifiedLocs.length > 0 && allHaveRefArea,
  `Tất cả ${unverifiedLocs.length} địa điểm chưa xác minh đều dùng reference_area và coordinates: null.`
);

// ---------------------------------------------------------------------------
// [LOC_04] Honest Empty State Contextual Response
// ---------------------------------------------------------------------------
const res4 = getContextualRecommendation({
  persona: 'OFFICE_TECH',
  district: 'Hải Châu',
  time_trigger_id: 'TRIG_1730_AFTER_WORK_SCHOOL',
  use_auto_gps: false
});
const expectedMsg = "Bạn đang ở Hải Châu, tan ca lúc 17:30. Hôm nay chưa có deal nào được xác minh. Xem lịch đã kiểm chứng 7 ngày tới hoặc Deal Radar Online.";
assertTest(
  'LOC_04_CONTEXT_PROMPT_HONEST_EMPTY_STATE',
  res4.verified_deals_count === 0 &&
  res4.honest_message === expectedMsg,
  `Message: "${res4.honest_message}"`
);

// ---------------------------------------------------------------------------
// [LOC_05] Auto GPS Tracking Strictly Blocked
// ---------------------------------------------------------------------------
let privacyBlocked = false;
try {
  getContextualRecommendation({
    persona: 'STUDENT',
    district: 'Liên Chiểu',
    use_auto_gps: true
  });
} catch (e) {
  if (e.message.includes('PRIVACY_VIOLATION')) {
    privacyBlocked = true;
  }
}
assertTest(
  'LOC_05_AUTO_GPS_STRICTLY_PROHIBITED',
  privacyBlocked,
  `Attempting to use auto GPS threw PRIVACY_VIOLATION.`
);

// ---------------------------------------------------------------------------
// [LOC_06] NEGATIVE: Coordinates != null Without Evidence Ref FAILS
// ---------------------------------------------------------------------------
const badMapNoRef = JSON.parse(JSON.stringify(realLocalityMap));
badMapNoRef.layer_3_locations_registry[0].coordinates = { lat: 16.0354, lng: 108.2238 };
badMapNoRef.layer_3_locations_registry[0].verification_status = 'LOCATION_VERIFIED_VIA_OFFICIAL_CAPTURE';
// Missing coordinate_evidence_ref, coordinate_source_url, coordinate_artifact_hash
const res6 = validateLocalityMap(badMapNoRef);
assertTest(
  'LOC_06_NEGATIVE_COORDINATES_WITHOUT_EVIDENCE_REF_FAILS',
  res6.valid === false &&
  res6.errors.some(e => e.includes("lacks 'coordinate_evidence_ref'")),
  `Correctly rejected: ${res6.errors.find(e => e.includes('coordinate_evidence_ref'))}`
);

// ---------------------------------------------------------------------------
// [LOC_07] NEGATIVE: Coordinates != null With Invalid Hash FAILS
// ---------------------------------------------------------------------------
const badMapBadHash = JSON.parse(JSON.stringify(realLocalityMap));
badMapBadHash.layer_3_locations_registry[0].coordinates = { lat: 16.0354, lng: 108.2238 };
badMapBadHash.layer_3_locations_registry[0].verification_status = 'LOCATION_VERIFIED_VIA_OFFICIAL_CAPTURE';
badMapBadHash.layer_3_locations_registry[0].coordinate_evidence_ref = 'EVID_LOC_01';
badMapBadHash.layer_3_locations_registry[0].coordinate_source_url = 'https://metiz.vn/map';
badMapBadHash.layer_3_locations_registry[0].coordinate_artifact_hash = 'INVALID_SHORT_HASH'; // Not 64 hex chars
badMapBadHash.layer_3_locations_registry[0].coordinate_checked_at = '2026-08-22T00:00:00Z';
const res7 = validateLocalityMap(badMapBadHash);
assertTest(
  'LOC_07_NEGATIVE_COORDINATES_WITH_INVALID_HASH_FAILS',
  res7.valid === false &&
  res7.errors.some(e => e.includes("lacks valid 64-char SHA-256 'coordinate_artifact_hash'")),
  `Correctly rejected invalid hash: ${res7.errors.find(e => e.includes('coordinate_artifact_hash'))}`
);

// ---------------------------------------------------------------------------
// [LOC_08] NEGATIVE: Claiming Verified Status With Null Coordinates FAILS
// ---------------------------------------------------------------------------
const badMapNullCoordVerified = JSON.parse(JSON.stringify(realLocalityMap));
badMapNullCoordVerified.layer_3_locations_registry[0].verification_status = 'LOCATION_VERIFIED_VIA_OFFICIAL_CAPTURE';
badMapNullCoordVerified.layer_3_locations_registry[0].coordinates = null;
const res8 = validateLocalityMap(badMapNullCoordVerified);
assertTest(
  'LOC_08_NEGATIVE_UNVERIFIED_CLAIMING_EXACT_STATUS_FAILS',
  res8.valid === false &&
  res8.errors.some(e => e.includes('verification_status is not')),
  `Correctly rejected: ${res8.errors[0]}`
);

console.log('\n' + (allPassed ? '🟢' : '❌') + ' [LOCALITY-TEST-SUMMARY] Toàn bộ ' + (allPassed ? '8/8' : 'bài') + ' kiểm thử Bản Đồ Địa Bàn Đà Nẵng & Negative Coordinate Gate đã ' + (allPassed ? 'ĐẠT [PASS]' : 'THẤT BẠI [FAIL]') + '!');

if (!allPassed) {
  process.exit(1);
} else {
  process.exit(0);
}
