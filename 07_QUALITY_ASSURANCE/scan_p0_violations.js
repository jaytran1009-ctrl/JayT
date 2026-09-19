const fs = require('fs');
const path = require('path');

const sotDir = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH');

const files = fs.readdirSync(sotDir);
console.log('--- SCANNING 03_SOURCE_OF_TRUTH FOR UNVERIFIED / SYNTHETIC DATA ---');

const patterns = [
  { name: 'Unsplash Images', regex: /unsplash\.com/g },
  { name: 'tel: protocol', regex: /tel:[0-9]+/g },
  { name: 'Fake phone 0905123456/0935/etc', regex: /0905\d{6}|0935\d{6}/g },
  { name: 'Freeship 0đ / Freeship Xtra', regex: /Freeship (0đ|Xtra|0d)/gi },
  { name: 'Trà đá + canh thêm / fake perks', regex: /Trà đá \+ Canh thêm|Suất no lâu|Miễn phí trà sâm dứa/gi },
  { name: 'Synthetic Shopee Gear IDs', regex: /quat_kep_ktx|den_led_ktx|noi_lau_mini|cap_sac_20w|o_cam_usb|binh_giu_nhiet/g },
  { name: 'Synthetic Klook IDs', regex: /bana_hills_aff|mikazuki_waterpark_aff/g },
  { name: 'Synthetic Fintech CPA', regex: /cake_vpbank|cake_vpbank_aff/g },
  { name: 'campusRescueDirectoryV9', regex: /campusRescueDirectoryV9/g }
];

for (const file of files) {
  const filePath = path.join(sotDir, file);
  if (fs.statSync(filePath).isFile()) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`\nChecking: ${file} (${content.length} chars)`);
    for (const p of patterns) {
      const matches = content.match(p.regex);
      if (matches) {
        console.log(`  ❌ FOUND ${p.name}: ${matches.length} occurrences (sample: ${matches.slice(0, 3).join(', ')})`);
      }
    }
  }
}
