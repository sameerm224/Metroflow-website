(function () {
  const panels = document.querySelectorAll('.illus-anim');
  if (!panels.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  panels.forEach(panel => {
    if (prefersReduced) {
      panel.classList.add('illus-play', 'illus-done');
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          panel.classList.remove('illus-done');
          panel.classList.remove('illus-play');
          void panel.offsetWidth;
          panel.classList.add('illus-play');
          const svg = panel.querySelector('svg');
          if (svg) {
            svg.querySelectorAll('animate, animateMotion').forEach(el => {
              try { el.beginElement(); } catch (_) { /* SMIL */ }
            });
          }
        } else if (panel.classList.contains('illus-play')) {
          panel.classList.remove('illus-play');
          panel.classList.add('illus-done');
        }
      });
    }, { threshold: 0.32, rootMargin: '0px 0px -8% 0px' });

    observer.observe(panel);
  });
})();