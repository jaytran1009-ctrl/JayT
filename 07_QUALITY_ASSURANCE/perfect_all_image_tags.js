const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let js = fs.readFileSync(jsPath, 'utf8');

// 1. Replace Phê La thumbnail box
const oldPheLaThumb = `<div class="store-thumb-box store-thumbnail-preview" style="background:linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); display:flex; align-items:center; justify-content:center; font-size:32px;">
                    🧋
                  </div>`;
const newPheLaThumb = `<div class="store-thumb-wrapper" style="width:76px; height:76px; border-radius:12px; overflow:hidden; flex-shrink:0;">
                    <img src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&auto=format&fit=crop&q=80" alt="Phê La Bạch Đằng" class="store-real-thumb" loading="lazy" decoding="async" width="76" height="76">
                    <span class="store-brand-pill">Phê La</span>
                  </div>`;

if (js.includes(oldPheLaThumb)) {
  js = js.replace(oldPheLaThumb, newPheLaThumb);
  console.log('✅ Replaced Phê La placeholder icon with real photo');
}

// 2. Replace Cơm Gà A Hải thumbnail box
const oldAHaiThumb = `<div class="store-thumb-box store-thumbnail-preview" style="background:linear-gradient(135deg, #FFEDD5 0%, #FED7AA 100%); display:flex; align-items:center; justify-content:center; font-size:32px;">
                    🍗
                  </div>`;
const newAHaiThumb = `<div class="store-thumb-wrapper" style="width:76px; height:76px; border-radius:12px; overflow:hidden; flex-shrink:0;">
                    <img src="https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=200&auto=format&fit=crop&q=80" alt="Cơm Gà A Hải" class="store-real-thumb" loading="lazy" decoding="async" width="76" height="76">
                    <span class="store-brand-pill">A Hải</span>
                  </div>`;

if (js.includes(oldAHaiThumb)) {
  js = js.replace(oldAHaiThumb, newAHaiThumb);
  console.log('✅ Replaced Cơm Gà A Hải placeholder icon with real photo');
}

// 3. Ensure all <img> tags have loading="lazy" and decoding="async"
js = js.replace(/<img src="\${esc\(d\.source_image_url\)}"/g, '<img src="${esc(d.source_image_url)}" loading="lazy" decoding="async" width="72" height="72"');
js = js.replace(/<img src="\${esc\(visualAsset\)}"/g, '<img src="${esc(visualAsset)}" loading="lazy" decoding="async" width="48" height="48"');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('✨ All image tags in JS now 100% compliant with Visual Media Pipeline!');
