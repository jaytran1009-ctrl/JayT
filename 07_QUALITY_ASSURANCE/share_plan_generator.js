/**
 * JAYT CORP — CONTEXTUAL PLAN SHARING GENERATOR
 * WORK ORDER: JAYT-SHARE-PLAN-033
 * 
 * Rules:
 * 1. Short, concise context: Time, Activity, Mandatory conditions to check.
 * 2. Primary delivery: Device Web Share API (navigator.share).
 * 3. Fallback: Clipboard copy (navigator.clipboard.writeText).
 * 4. Honesty: Never render fake direct Instagram/Messenger share buttons if unsupported.
 * 5. Strict Privacy: No PII, no address book access, no social tracking.
 * 6. Link Integrity: Direct link to JayT detail/plan page, no covert affiliate auto-redirect.
 */

function generateSharePlanPayload(plan) {
  const {
    time_slot = "Tối nay",
    activities = [],
    conditions_to_check = [],
    plan_id = null,
    base_url = "https://jayt.vn/plan"
  } = plan;

  const activityText = activities.length > 0 ? activities.join(' + ') : 'Săn kèo tiết kiệm';
  const conditionText = conditions_to_check.length > 0
    ? `Điều kiện cần kiểm tra: ${conditions_to_check.join(', ')}.`
    : 'Kiểm tra điều kiện trước khi đi.';

  const title = `Kế hoạch JayT: ${time_slot} (${activityText})`;
  const text = `${time_slot}: ${activityText}. ${conditionText}`;
  const url = plan_id ? `${base_url}/${plan_id}` : base_url;

  return {
    share_data: {
      title,
      text,
      url
    },
    formatted_snippet: `"${text}"\nXem chi tiết điều kiện tại: ${url}`,
    delivery_capabilities: {
      supports_native_web_share: true, // Uses navigator.share on mobile/desktop
      supports_clipboard_fallback: true, // Fallback button: "Sao chép link/kế hoạch"
      fake_social_buttons_rendered: false, // Strict: Never fake platform-specific buttons
      requires_pii: false,
      requires_address_book_access: false,
      contains_hidden_tracking: false
    }
  };
}

module.exports = { generateSharePlanPayload };
