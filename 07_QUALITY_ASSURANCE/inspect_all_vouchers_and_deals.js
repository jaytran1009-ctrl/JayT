const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const js = fs.readFileSync(jsPath, 'utf8');

// Find all voucher cards in JS
const voucherMatches = js.match(/<div class="voucher-ticket-neon[^>]*>[\s\S]*?<\/div>\s*<\/div>/g);
console.log('Total voucher cards rendered:', voucherMatches ? voucherMatches.length : 0);
if (voucherMatches) {
  voucherMatches.forEach((v, i) => {
    const text = v.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`Voucher ${i+1}: ${text.substring(0, 100)}...`);
  });
}

// Find all deals in daily supply feed
const feedPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/daily_supply_feed_126.json');
const feed = JSON.parse(fs.readFileSync(feedPath, 'utf8'));
console.log('\n--- DAILY SUPPLY FEED DEALS ---');
if (feed.limited_time_deals) {
  console.log('Limited Time Deals count:', feed.limited_time_deals.length);
  feed.limited_time_deals.forEach((d, i) => console.log(`  [LTD ${i+1}] ${d.title} | ${d.brand_name} | ${d.discount_badge}`));
}
if (feed.watchlist_deals) {
  console.log('Watchlist Deals count:', feed.watchlist_deals.length);
  feed.watchlist_deals.forEach((d, i) => console.log(`  [Watchlist ${i+1}] ${d.title} | ${d.brand_name} | ${d.discount_badge}`));
}
