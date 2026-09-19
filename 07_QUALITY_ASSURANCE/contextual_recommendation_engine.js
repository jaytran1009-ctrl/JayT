const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const LOCALITY_MAP_PATH = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'danang_locality_map.json');
const DEALS_FEED_PATH = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');

function getContextualRecommendation(userContext, dealsFeedPath = DEALS_FEED_PATH, localityMapPath = LOCALITY_MAP_PATH) {
  const {
    persona = 'OFFICE_TECH',       // 'STUDENT' | 'OFFICE_TECH'
    district = 'Hải Châu',         // 'Hải Châu', 'Liên Chiểu', 'Ngũ Hành Sơn', 'Sơn Trà'
    time_trigger_id = 'TRIG_1730_AFTER_WORK_SCHOOL',
    use_auto_gps = false           // STRICT: MUST BE FALSE
  } = userContext;

  if (use_auto_gps) {
    throw new Error('PRIVACY_VIOLATION: Automatic GPS tracking is strictly prohibited in JayT.');
  }

  const localityMap = JSON.parse(fs.readFileSync(localityMapPath, 'utf8'));
  const liveFeed = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));

  // Find trigger
  const trigger = localityMap.layer_2_temporal_lifestyle_triggers.find(t => t.trigger_id === time_trigger_id) || {
    time_label: "17:30",
    name: "Tan ca, tan học"
  };

  // Find matched verified deals in live feed
  const verifiedDeals = liveFeed.filter(deal => {
    if (deal.district && deal.district !== district) return false;
    return true;
  });

  const timeLabel = trigger.time_label || '17:30';
  const contextSummary = `Bạn đang ở ${district}, tan ca lúc ${timeLabel}.`;

  let honestMessage = '';
  if (verifiedDeals.length === 0) {
    honestMessage = `${contextSummary} Hôm nay chưa có deal nào được xác minh. Xem lịch đã kiểm chứng 7 ngày tới hoặc Deal Radar Online.`;
  } else {
    honestMessage = `${contextSummary} Có ${verifiedDeals.length} ưu đãi địa phương đã xác minh cho bạn.`;
  }

  return {
    user_context: {
      persona,
      district,
      time_trigger_id,
      selected_time: timeLabel,
      gps_tracking_disabled: true
    },
    context_summary: contextSummary,
    verified_deals_count: verifiedDeals.length,
    verified_deals: verifiedDeals,
    honest_message: honestMessage,
    suggested_actions: [
      { action: "VIEW_7_DAY_CALENDAR", label: "Xem lịch đã kiểm chứng 7 ngày tới" },
      { action: "VIEW_ONLINE_RADAR", label: "Xem Deal Radar Online" }
    ]
  };
}

module.exports = { getContextualRecommendation };
