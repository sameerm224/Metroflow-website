(function () {
  document.querySelectorAll('.uc-tabs').forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll('[data-uc-tab]');
    const panels = tabGroup.parentElement.querySelectorAll('[data-uc-panel]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const id = tab.dataset.ucTab;
        tabs.forEach(t => t.classList.toggle('active', t === tab));
        panels.forEach(p => p.classList.toggle('active', p.dataset.ucPanel === id));
      });
    });
  });

  const ROLE_PANELS = new Set([
    'analytics-engineer', 'platform-engineer', 'head-of-data', 'finance-ops',
    'bi-lead', 'ml-engineer', 'product-manager', 'governance-lead'
  ]);
  const INDUSTRY_PANELS = new Set([
    'fintech', 'b2b-saas', 'ecommerce', 'healthcare', 'media', 'manufacturing'
  ]);

  function initUcSelect(root) {
    const scope = root.dataset.ucScope;
    const trigger = root.querySelector('.uc-custom-select-trigger');
    const menu = root.querySelector('.uc-custom-select-menu');
    const valueEl = root.querySelector('.uc-custom-select-value');
    const options = root.querySelectorAll('.uc-custom-select-option');
    const panels = root.closest('.uc-preview-wrap')?.querySelectorAll('[data-uc-panel]');
    const showPanel = (id) => {
      panels?.forEach(p => {
        const pid = p.dataset.ucPanel;
        const isRole = ROLE_PANELS.has(pid);
        const isIndustry = INDUSTRY_PANELS.has(pid);
        if (scope === 'role') {
          const show = pid === id;
          p.classList.toggle('active', show);
          p.style.display = isRole ? (show ? '' : 'none') : 'none';
        } else {
          const show = pid === id;
          p.classList.toggle('active', show);
          p.style.display = isIndustry ? (show ? '' : 'none') : 'none';
        }
      });
    };

    const setOpen = (open) => {
      root.classList.toggle('is-open', open);
      trigger?.setAttribute('aria-expanded', String(open));
      if (menu) menu.hidden = !open;
    };

    const selectOption = (opt) => {
      const id = opt.dataset.value;
      options.forEach(o => {
        const on = o === opt;
        o.classList.toggle('selected', on);
        o.setAttribute('aria-selected', String(on));
      });
      if (valueEl) valueEl.textContent = opt.textContent.trim();
      showPanel(id);
      setOpen(false);
    };

    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.uc-custom-select.is-open').forEach(el => {
        if (el !== root) {
          el.classList.remove('is-open');
          el.querySelector('.uc-custom-select-trigger')?.setAttribute('aria-expanded', 'false');
          const m = el.querySelector('.uc-custom-select-menu');
          if (m) m.hidden = true;
        }
      });
      setOpen(!root.classList.contains('is-open'));
    });

    options.forEach(opt => opt.addEventListener('click', () => selectOption(opt)));

    const initial = root.querySelector('.uc-custom-select-option.selected') || options[0];
    if (initial) {
      if (scope === 'role') selectOption(initial);
      else {
        options.forEach(o => {
          const on = o === initial;
          o.classList.toggle('selected', on);
          o.setAttribute('aria-selected', String(on));
        });
        if (valueEl) valueEl.textContent = initial.textContent.trim();
      }
    }
  }

  document.querySelectorAll('.uc-custom-select[data-uc-scope]').forEach(initUcSelect);

  document.addEventListener('click', () => {
    document.querySelectorAll('.uc-custom-select.is-open').forEach(el => {
      el.classList.remove('is-open');
      el.querySelector('.uc-custom-select-trigger')?.setAttribute('aria-expanded', 'false');
      const m = el.querySelector('.uc-custom-select-menu');
      if (m) m.hidden = true;
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.uc-custom-select.is-open').forEach(el => {
        el.classList.remove('is-open');
        el.querySelector('.uc-custom-select-trigger')?.setAttribute('aria-expanded', 'false');
        const m = el.querySelector('.uc-custom-select-menu');
        if (m) m.hidden = true;
      });
    }
  });

  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  document.querySelectorAll('.compare-col-mf').forEach(col => col.classList.add('highlight'));
})();