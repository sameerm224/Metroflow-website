(function () {
  const KEY = 'mf-theme';
  const root = document.documentElement;

  function getTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(KEY, theme); } catch (_) {}
    window.dispatchEvent(new CustomEvent('mf-theme-change', { detail: { theme } }));
  }

  function toggleTheme() {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }

  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') setTheme(saved);
  } catch (_) {}

  window.MFTheme = { getTheme, setTheme, toggleTheme };

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#themeToggle, [data-theme-toggle]');
    if (btn) {
      e.preventDefault();
      toggleTheme();
    }
  });

  // Hide theme toggle on scroll down, show on scroll up
  let lastScrollY = window.scrollY;
  let scrollTicking = false;

  function updateThemeToggleVisibility() {
    const toggles = document.querySelectorAll('#themeToggle, #themeToggleFloat');
    if (!toggles.length) return;
    const y = window.scrollY;
    if (y <= 24) {
      toggles.forEach(t => t.classList.remove('is-scroll-hidden'));
    } else if (y > lastScrollY + 4) {
      toggles.forEach(t => t.classList.add('is-scroll-hidden'));
    } else if (y < lastScrollY - 4) {
      toggles.forEach(t => t.classList.remove('is-scroll-hidden'));
    }
    lastScrollY = y;
    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(updateThemeToggleVisibility);
    }
  }, { passive: true });
})();