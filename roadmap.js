(function () {
  document.querySelectorAll('.roadmap-card').forEach(card => {
    const toggle = card.querySelector('.roadmap-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const open = card.classList.contains('is-expanded');
      document.querySelectorAll('.roadmap-card.is-expanded').forEach(c => {
        c.classList.remove('is-expanded');
        c.querySelector('.roadmap-toggle')?.setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        card.classList.add('is-expanded');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();