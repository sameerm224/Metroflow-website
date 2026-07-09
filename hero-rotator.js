(function () {
  const el = document.getElementById('heroRotatorText');
  if (!el) return;

  const lines = [
    'Build your Enterprise Brain.',
    'Unify your data.',
    'Standardize your metrics.',
    'Understand your business.'
  ];

  let index = 0;
  const INTERVAL = 3000;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setLine(next) {
    el.textContent = lines[next];
    el.dataset.line = String(next);
  }

  function cycle() {
    el.classList.add('is-out');
    setTimeout(() => {
      index = (index + 1) % lines.length;
      setLine(index);
      el.classList.remove('is-out');
      el.classList.add('is-in');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => el.classList.remove('is-in'));
      });
    }, prefersReduced ? 0 : 380);
  }

  if (!prefersReduced) {
    setInterval(cycle, INTERVAL);
  }
})();