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

  // Use case preview dropdown (homepage)
  const ucSelect = document.getElementById('ucPreviewSelect');
  if (ucSelect) {
    const panels = ucSelect.closest('.uc-preview-wrap')?.querySelectorAll('[data-uc-panel]');
    const showPanel = (id) => {
      panels?.forEach(p => p.classList.toggle('active', p.dataset.ucPanel === id));
    };
    ucSelect.addEventListener('change', () => showPanel(ucSelect.value));
    showPanel(ucSelect.value);
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