const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let js = fs.readFileSync(jsPath, 'utf8');

const messyChunkRegex = /\/\/ MAXIMUM 2: Vòng Quay Cứu Đói 1-Chạm[\s\S]*?\/\/ --- JAYT MASTER DIRECTIVE 2026: PURGED LEGACY ENGINES ---/;

const cleanMountTail = `
    // User Split Bill Calculator (Pure Local JS Math - Zero Commercial Presets)
    const userBillInput = document.getElementById('userBillInput');
    const userPeopleInput = document.getElementById('userPeopleCount');
    const userSplitDisplay = document.getElementById('userSplitResult');
    
    function updateUserSplit() {
      if (!userBillInput || !userPeopleInput || !userSplitDisplay) return;
      const bill = Math.max(0, parseInt(userBillInput.value, 10) || 0);
      const people = Math.max(1, parseInt(userPeopleInput.value, 10) || 1);
      const split = Math.round(bill / people);
      userSplitDisplay.innerText = split.toLocaleString('vi-VN') + '₫';
    }

    if (userBillInput) userBillInput.addEventListener('input', updateUserSplit);
    if (userPeopleInput) userPeopleInput.addEventListener('input', updateUserSplit);

    // District Filter on Verified Watchlist
    document.querySelectorAll('[data-action="filter-verified-district"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        playHapticTick();
        document.querySelectorAll('[data-action="filter-verified-district"]').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const district = e.currentTarget.getAttribute('data-district') || 'ALL';
        const grid = document.getElementById('verifiedLocationsGrid');
        if (!grid) return;
        const verifiedLocations = (state.fourLayerData && state.fourLayerData.layer_2_watchlist && state.fourLayerData.layer_2_watchlist.verified_locations) || [];
        const filtered = district === 'ALL' ? verifiedLocations : verifiedLocations.filter(loc => loc.district === district || (loc.locality && loc.locality.district === district));
        grid.innerHTML = filtered.filter(l => CanonicalRenderGate.validateLocation(l)).map(l => CanonicalRenderGate.renderLocationCard(l)).join('');
      });
    });

    document.querySelectorAll('[data-action="scroll-to-watchlist"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const el = document.getElementById('verifiedLocationsGrid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    });

    document.querySelectorAll('[data-action="scroll-to-calculator"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const el = document.getElementById('userBillInput');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  // --- JAYT MASTER DIRECTIVE 2026: PURGED LEGACY ENGINES ---`;

if (messyChunkRegex.test(js)) {
  js = js.replace(messyChunkRegex, cleanMountTail.trim());
  console.log('✅ Cleaned mount tail and event listeners');
}

fs.writeFileSync(jsPath, js, 'utf8');
