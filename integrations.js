(function () {
  const grid = document.getElementById('intGrid');
  const search = document.getElementById('intSearch');
  const filters = document.getElementById('intFilters');
  if (!grid || !window.MF_INTEGRATIONS) return;

  const cats = ['All', ...new Set(window.MF_INTEGRATIONS.map(i => i.cat))];
  let activeCat = 'All';
  let query = '';

  function renderFilters() {
    if (!filters) return;
    filters.innerHTML = cats.map(c =>
      `<button class="int-filter hover-pop glow-card ${c === activeCat ? 'active' : ''}" data-cat="${c}">${c}</button>`
    ).join('');
    filters.querySelectorAll('.int-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCat = btn.dataset.cat;
        renderFilters();
        renderGrid();
      });
    });
  }

  function renderGrid() {
    const q = query.toLowerCase();
    const items = window.MF_INTEGRATIONS.filter(i => {
      const matchCat = activeCat === 'All' || i.cat === activeCat;
      const matchQ = !q || i.name.toLowerCase().includes(q) || i.cat.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q);
      return matchCat && matchQ;
    });

    const grouped = {};
    items.forEach(i => {
      if (!grouped[i.cat]) grouped[i.cat] = [];
      grouped[i.cat].push(i);
    });

    if (!items.length) {
      grid.innerHTML = '<div class="int-empty glow-card">No integrations match your search. <a href="contact.html" class="link-arrow">Request one →</a></div>';
      return;
    }

    grid.innerHTML = Object.entries(grouped).map(([cat, list]) => `
      <div class="int-category reveal in">
        <div class="int-category-head">
          <h3>${cat}</h3>
          <span>${list.length} connector${list.length > 1 ? 's' : ''}</span>
        </div>
        <div class="int-grid">
          ${list.map(i => `
            <div class="int-card-v2 glow-card hover-pop" data-name="${i.name}">
              <div class="int-card-head">
                ${window.MF_getIntegrationLogo ? window.MF_getIntegrationLogo(i.name) : `<div class="int-brand-mark"><span class="int-wm-name">${i.name}</span></div>`}
                <span class="int-wm-cat">${i.cat}</span>
              </div>
              <p>${i.desc}</p>
              <span class="int-meta">● connected · metadata sync</span>
            </div>`).join('')}
        </div>
      </div>`).join('');
  }

  if (search) {
    search.addEventListener('input', () => {
      query = search.value;
      renderGrid();
    });
  }

  renderFilters();
  renderGrid();
})();