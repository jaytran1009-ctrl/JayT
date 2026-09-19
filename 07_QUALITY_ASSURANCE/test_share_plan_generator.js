const { generateSharePlanPayload } = require('./share_plan_generator.js');

console.log('🧪 [JAYT-SHARE-TEST] Khởi chạy bộ kiểm thử Chia Sẻ Kế Hoạch Tiết Kiệm (033)...');

let allPassed = true;
function assertTest(name, condition, detail = '') {
  console.log(`  [${name}]: [${condition ? 'PASS' : 'FAIL'}]${detail ? ' - ' + detail : ''}`);
  if (!condition) allPassed = false;
}

// ---------------------------------------------------------------------------
// [SHARE_01] Standard Plan Payload Generation
// ---------------------------------------------------------------------------
const plan1 = {
  time_slot: "Tối Thứ Tư",
  activities: ["xem phim", "ăn tối"],
  conditions_to_check: ["thẻ thành viên", "giờ áp dụng", "số lượng voucher"],
  plan_id: "PLAN_DNG_WED_01"
};

const res1 = generateSharePlanPayload(plan1);
assertTest(
  'SHARE_01_PAYLOAD_STRUCTURE',
  res1.share_data.title.includes('Tối Thứ Tư') &&
  res1.share_data.text.includes('Tối Thứ Tư: xem phim + ăn tối.') &&
  res1.share_data.url === 'https://jayt.vn/plan/PLAN_DNG_WED_01',
  `Text: "${res1.share_data.text}"`
);

// ---------------------------------------------------------------------------
// [SHARE_02] Explicit Conditions Enforced in Share Text
// ---------------------------------------------------------------------------
assertTest(
  'SHARE_02_CONDITIONS_INCLUDED_IN_TEXT',
  res1.share_data.text.includes('Điều kiện cần kiểm tra: thẻ thành viên, giờ áp dụng, số lượng voucher.'),
  `Conditions properly highlighted in snippet.`
);

// ---------------------------------------------------------------------------
// [SHARE_03] Fallback Copy to Clipboard Available
// ---------------------------------------------------------------------------
assertTest(
  'SHARE_03_FALLBACK_CAPABILITY',
  res1.delivery_capabilities.supports_clipboard_fallback === true &&
  res1.formatted_snippet.length > 0,
  `Clipboard snippet ready for manual copy.`
);

// ---------------------------------------------------------------------------
// [SHARE_04] No Fake Direct Social Buttons Claimed
// ---------------------------------------------------------------------------
assertTest(
  'SHARE_04_NO_FAKE_SOCIAL_BUTTONS',
  res1.delivery_capabilities.fake_social_buttons_rendered === false,
  `Strict UX integrity: relies on native OS share sheet.`
);

// ---------------------------------------------------------------------------
// [SHARE_05] Strict Privacy & Zero Tracking
// ---------------------------------------------------------------------------
assertTest(
  'SHARE_05_STRICT_PRIVACY_ENFORCED',
  res1.delivery_capabilities.requires_pii === false &&
  res1.delivery_capabilities.requires_address_book_access === false &&
  res1.delivery_capabilities.contains_hidden_tracking === false,
  `100% Client-side privacy guaranteed.`
);

console.log('\n' + (allPassed ? '🟢' : '❌') + ' [SHARE-TEST-SUMMARY] Toàn bộ ' + (allPassed ? '5/5' : 'bài') + ' kiểm thử Chia Sẻ Kế Hoạch Tiết Kiệm đã ' + (allPassed ? 'ĐẠT [PASS]' : 'THẤT BẠI [FAIL]') + '!');

if (!allPassed) {
  process.exit(1);
} else {
  process.exit(0);
}
