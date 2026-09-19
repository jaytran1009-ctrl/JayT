const fs = require('fs');
const path = require('path');

const feedPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/daily_supply_feed_126.json');
const fourLayerPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/four_layer_dataset.json');
const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');

const feed = JSON.parse(fs.readFileSync(feedPath, 'utf8'));
const fourLayer = JSON.parse(fs.readFileSync(fourLayerPath, 'utf8'));
const js = fs.readFileSync(jsPath, 'utf8');

console.log('--- 1. DAILY SUPPLY FEED INSPECTION ---');
console.log('Feed date:', feed.date || feed.metadata?.date);
console.log('Feed generated at:', feed.generated_at || feed.metadata?.generated_at);
console.log('Top level keys in feed:', Object.keys(feed));
if (feed.deals) console.log('Deals count in feed:', feed.deals.length);
if (feed.flash_deals) console.log('Flash deals count in feed:', feed.flash_deals.length);

console.log('\n--- 2. FOUR LAYER DATASET INSPECTION ---');
console.log('Top level keys in fourLayer:', Object.keys(fourLayer));
if (fourLayer.verified_offers) console.log('Verified offers count:', fourLayer.verified_offers.length);
if (fourLayer.locations) console.log('Locations count:', fourLayer.locations.length);

console.log('\n--- 3. CHECKING HARDCODED DEALS IN JS ---');
// Check if Tier 2 or Tier 3 cards are hardcoded or dynamic
const tier2Idx = js.indexOf('apex-tier-2-hotnow');
console.log('Tier 2 snippet in JS:');
console.log(js.substring(tier2Idx, tier2Idx + 1200));
