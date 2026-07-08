(function () {
  // Tabbed use cases
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

  // Use case preview custom dropdown (homepage)
  const ucCustom = document.getElementById('ucCustomSelect');
  if (ucCustom) {
    const trigger = document.getElementById('ucCustomSelectTrigger');
    const menu = document.getElementById('ucCustomSelectMenu');
    const valueEl = ucCustom.querySelector('.uc-custom-select-value');
    const options = ucCustom.querySelectorAll('.uc-custom-select-option');
    const panels = ucCustom.closest('.uc-preview-wrap')?.querySelectorAll('[data-uc-panel]');

    const showPanel = (id) => {
      panels?.forEach(p => p.classList.toggle('active', p.dataset.ucPanel === id));
    };

    const setOpen = (open) => {
      ucCustom.classList.toggle('is-open', open);
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

    trigger?.addEventListener('click', () => setOpen(!ucCustom.classList.contains('is-open')));

    options.forEach(opt => {
      opt.addEventListener('click', () => selectOption(opt));
    });

    document.addEventListener('click', (e) => {
      if (!ucCustom.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });

    const initial = ucCustom.querySelector('.uc-custom-select-option.selected') || options[0];
    if (initial) {
      selectOption(initial);
      setOpen(false);
    }
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  // Comparison table highlight
  document.querySelectorAll('.compare-col-mf').forEach(col => {
    col.classList.add('highlight');
  });
})();