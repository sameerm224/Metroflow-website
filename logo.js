(function () {
  const LOGO_SVG = (size, spin, uid) => {
    const id = uid || 'mf' + Math.random().toString(36).slice(2, 8);
    return `<svg class="mf-logo-svg${spin ? ' mf-logo-spin' : ''}" width="${size}" height="${size * 0.82}" viewBox="0 0 100 82" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="${id}g" x1="8" y1="72" x2="88" y2="8" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#022c22"/>
        <stop offset="40%" stop-color="#064e3b"/>
        <stop offset="75%" stop-color="#047857"/>
        <stop offset="100%" stop-color="#10b981"/>
      </linearGradient>
      <linearGradient id="${id}s" x1="52" y1="12" x2="92" y2="68" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#f8fafc"/>
        <stop offset="45%" stop-color="#cbd5e1"/>
        <stop offset="100%" stop-color="#64748b"/>
      </linearGradient>
      <linearGradient id="${id}h" x1="20" y1="8" x2="80" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#34d399" stop-opacity="0"/>
        <stop offset="50%" stop-color="#34d399" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#34d399" stop-opacity="0"/>
      </linearGradient>
      <filter id="${id}f" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.8" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <ellipse cx="50" cy="74" rx="34" ry="3" fill="url(#${id}h)" opacity="0.55"/>
    <path d="M14 70 C14 38 22 16 36 12 C46 9 50 18 52 30 C54 18 58 9 68 12 C82 16 90 38 90 70 L80 70 C80 44 74 30 64 26 C56 23 52 30 50 42 C48 30 44 23 36 26 C26 30 20 44 20 70 Z" fill="url(#${id}g)" filter="url(#${id}f)"/>
    <path d="M50 42 C54 26 62 16 74 14 C84 12 90 22 90 38 C90 48 88 58 84 66 L76 66 C78 58 80 48 80 40 C80 30 74 24 66 24 C58 24 52 30 50 40 Z" fill="url(#${id}s)" opacity="0.92"/>
    <path d="M36 26 C28 26 22 32 18 40" stroke="#10b981" stroke-width="1.2" stroke-linecap="round" opacity="0.45"/>
    <path d="M64 26 C72 26 78 32 82 40" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round" opacity="0.35"/>
  </svg>`;
  };

  const LOGO_MARK = (size) => `<span class="mf-logo-mark">${LOGO_SVG(size, false)}</span>`;

  const LOGO_BRAND = (size, showText) => `<span class="mf-logo-brand">${LOGO_SVG(size, false)}${showText !== false ? '<span class="mf-logo-text">Metroflow</span>' : ''}</span>`;

  window.MFLogo = { svg: LOGO_SVG, mark: LOGO_MARK, brand: LOGO_BRAND };

  document.querySelectorAll('[data-mf-logo]').forEach(el => {
    const size = parseInt(el.dataset.mfLogoSize || '32', 10);
    const spin = el.dataset.mfLogoSpin === 'true';
    const showText = el.dataset.mfLogoText !== 'false';
    const isMark = el.dataset.mfLogo === 'mark';
    const isBrand = el.dataset.mfLogo === 'brand';
    if (isBrand) {
      el.innerHTML = LOGO_SVG(size, spin) + (showText ? '<span class="mf-logo-text">Metroflow</span>' : '');
      el.classList.add('mf-logo-brand');
    } else {
      el.innerHTML = LOGO_SVG(size, spin) + (!isMark && showText ? '<span class="mf-logo-text">Metroflow</span>' : '');
      if (!isMark) el.classList.add('mf-logo-brand');
    }
    if (spin) el.querySelector('.mf-logo-svg')?.classList.add('mf-logo-spin');
  });
})();