(() => {
  'use strict';
  const groups = ['Tất cả','Y tế & Sức khỏe','Xe buýt & Giao thông','Học tập & Giáo dục','Dịch vụ công & Kỹ năng số','Tra cứu Chuyến bay','Văn hóa & Nghệ thuật'];
  const categories = [3,2,3,4,3,1,1,1,2,2,4,1,2,4,1,4,4,2,4,4,4,4,5,6];
  const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().trim();
  let query = '', category = 0, registry;
  function mount() {
    const cards = [...document.querySelectorAll('.t2-pilot-card-section')];
    if (cards.length !== 24 || document.getElementById('j328-search')) return;
    if (cards.some((c,i) => c.querySelector('a[href^="http"]')?.href !== registry.approved_entities[i].external_url)) return;
    const panel = document.createElement('section'); panel.id='j328-search'; panel.setAttribute('aria-label','Tìm và lọc tiện ích');
    panel.innerHTML='<label for="j328-query">Tìm tiện ích</label><input id="j328-query" type="search" placeholder="Tên tiện ích hoặc từ khóa" autocomplete="off"><div class="j328-chips" role="group" aria-label="Danh mục tiện ích"></div><button type="button" id="j328-clear">Xóa tìm kiếm</button><button type="button" id="j328-reset">Đặt lại tất cả</button><p id="j328-count" role="status" aria-live="polite"></p>';
    cards[0].before(panel);
    const chips=panel.querySelector('.j328-chips');
    groups.forEach((name,index)=>{const b=document.createElement('button'); b.type='button'; b.textContent=name+' ('+(index?categories.filter(c=>c===index).length:24)+')'; b.dataset.category=index; b.addEventListener('click',()=>{category=index; apply();});chips.append(b);});
    const input=panel.querySelector('input'); input.value=query;
    function apply(){
      let count=0; cards.forEach((card,i)=>{const show=(!category||categories[i]===category)&&normalize(card.textContent+' '+groups[categories[i]]).includes(normalize(query));card.hidden=!show;if(show)count++;});
      chips.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.category)===category)));
      panel.querySelector('#j328-count').textContent=count?`${count} / 24 tiện ích`:'Không có kết quả. Xóa tìm kiếm hoặc đặt lại tất cả.';
    }
    input.addEventListener('input',()=>{query=input.value;apply();});
    panel.querySelector('#j328-clear').onclick=()=>{query='';input.value='';apply();input.focus();};
    panel.querySelector('#j328-reset').onclick=()=>{query='';category=0;input.value='';apply();input.focus();};
    apply();
  }
  fetch('/registry.json').then(r=>r.json()).then(r=>{registry=r;mount();new MutationObserver(mount).observe(document.body,{childList:true,subtree:true});});
})();
