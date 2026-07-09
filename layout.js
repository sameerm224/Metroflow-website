(function () {
  const GITHUB = 'https://github.com/metroflow/metroflow';
  const DISCORD = 'https://discord.gg/metroflow';
  const DOCS = 'https://docs.metroflow.dev';

  const GITHUB_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.4 7.86 10.94.58.1.79-.25.79-.56v-1.96c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.29-1.68-1.29-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.71 5.4-5.29 5.68.42.36.78 1.07.78 2.17v3.22c0 .31.21.67.8.56C20.71 21.39 24 17.1 24 12c0-6.35-5.15-11.5-12-11.5z"/></svg>`;

  const THEME_SVG = `<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`;
  const THEME_ICON = `<button class="theme-toggle theme-toggle-nav hover-pop" id="themeToggle" aria-label="Toggle theme">${THEME_SVG}</button>`;
  const THEME_FLOAT = `<button class="theme-toggle theme-toggle-float hover-pop" id="themeToggleFloat" aria-label="Toggle theme" data-theme-toggle>${THEME_SVG}</button>`;

  const navLinks = [
    { href: 'index.html', label: 'Home', id: 'home' },
    { href: 'integrations.html', label: 'Integrations', id: 'integrations' },
    { href: 'compare.html', label: 'Compare', id: 'compare' },
    { href: 'open-source.html', label: 'Open Source', id: 'open-source' },
    { href: 'docs.html', label: 'Docs', id: 'docs' }
  ];

  const FEATURE_PAGES = ['features', 'workspace', 'metrics-trust', 'ai-agents', 'guides'];

  const featuresMenu = [
    {
      title: 'Workspace',
      href: 'workspace.html',
      desc: 'The technical foundation for data teams',
      links: [
        { href: 'workspace.html#editors', label: 'Context-aware editors', sub: 'SQL, dbt, Python with live stack context' },
        { href: 'workspace.html#catalog', label: 'Living semantic catalog', sub: 'Lineage, schemas, ownership — always fresh' },
        { href: 'workspace.html#infrastructure', label: 'Infrastructure understanding', sub: 'DAGs, models, and dependencies unified' },
        { href: 'open-source.html#get-started', label: 'Self-host & local dev', sub: 'Docker, Apache 2.0, your infra' }
      ]
    },
    {
      title: 'Metrics & Trust Layer',
      href: 'metrics-trust.html',
      desc: 'Canonical KPIs for operators and leaders',
      links: [
        { href: 'metrics-trust.html#definitions', label: 'Canonical metric definitions', sub: 'One source of truth for every KPI' },
        { href: 'metrics-trust.html#standardization', label: 'KPI standardization', sub: 'Same numbers in every tool and dashboard' },
        { href: 'metrics-trust.html#trust', label: 'Define once. Trust everywhere.', sub: 'End metric drift across teams' },
        { href: 'metrics-trust.html#reconciliation', label: 'Reconciliation & governance', sub: 'Trusted business metrics with audit trail' }
      ]
    },
    {
      title: 'AI & Agents',
      href: 'ai-agents.html',
      desc: 'Reasoning over infrastructure and business context',
      links: [
        { href: 'ai-agents.html#infrastructure-ai', label: 'Infrastructure-aware AI', sub: 'Answers grounded in your actual metadata' },
        { href: 'ai-agents.html#enterprise-brain', label: 'Enterprise Brain', sub: 'Technical + business reasoning in one layer' },
        { href: 'ai-agents.html#specialized-agents', label: 'Specialized agents', sub: 'Document, test, debug, and orchestrate' },
        { href: 'ai-agents.html#nl-queries', label: 'NL queries over stack & metrics', sub: 'Ask in plain English, get cited answers' }
      ]
    },
    {
      title: 'In-Depth & How-To',
      href: 'guides.html',
      desc: 'Guides for engineers and decision-makers',
      links: [
        { href: 'guides.html#infrastructure-how', label: 'How Metroflow understands infrastructure', sub: 'Metadata crawl → semantic graph' },
        { href: 'guides.html#metrics-how', label: 'How canonical metrics work', sub: 'From definition to trusted KPI' },
        { href: 'quickstart.html', label: 'Getting started guides', sub: 'Connect, sync, query in minutes' },
        { href: 'use-cases.html', label: 'Use cases & playbooks', sub: 'For data teams and business leaders' },
        { href: 'docs.html', label: 'Full documentation →', sub: 'API reference, connectors, deployment' }
      ]
    }
  ];

  function navLink(link, active) {
    const cls = link.id === active ? ' class="active"' : '';
    return `<a href="${link.href}"${cls}>${link.label}</a>`;
  }

  const useCasesMenu = [
    {
      title: 'By Role',
      href: 'use-cases.html#by-role',
      desc: 'Specific workflows for your job title',
      links: [
        { href: 'use-cases.html#analytics-engineer', label: 'Analytics Engineer', sub: 'dbt PRs, lineage impact, test generation' },
        { href: 'use-cases.html#platform-engineer', label: 'Data Platform Engineer', sub: 'DAG debugging, connector health, ops' },
        { href: 'use-cases.html#head-of-data', label: 'Head of Data / VP', sub: 'Stack visibility, team onboarding, ROI' },
        { href: 'use-cases.html#ml-engineer', label: 'ML Engineer', sub: 'Feature lineage, drift, training pipelines' },
        { href: 'use-cases.html#bi-lead', label: 'BI & Analytics Lead', sub: 'Certified metrics, dashboard trust' },
        { href: 'use-cases.html#finance-ops', label: 'Finance & RevOps', sub: 'Reconciled MRR, board-ready KPIs' },
        { href: 'use-cases.html#product-manager', label: 'Product Manager', sub: 'Self-serve metrics without SQL tickets' },
        { href: 'use-cases.html#governance-lead', label: 'Data Governance Lead', sub: 'Policy, ownership, audit trails' }
      ]
    },
    {
      title: 'By Industry',
      href: 'use-cases.html#by-industry',
      desc: 'Sector-specific compliance and velocity',
      links: [
        { href: 'use-cases.html#fintech', label: 'Fintech & Banking', sub: 'Regulatory lineage, fraud metrics' },
        { href: 'use-cases.html#ecommerce', label: 'E-commerce & Retail', sub: 'Revenue attribution, inventory DAGs' },
        { href: 'use-cases.html#healthcare', label: 'Healthcare & Life Sciences', sub: 'HIPAA VPC, clinical data provenance' },
        { href: 'use-cases.html#b2b-saas', label: 'B2B SaaS', sub: 'Product analytics, churn, NRR' },
        { href: 'use-cases.html#media', label: 'Media & Gaming', sub: 'Real-time events, content metrics' },
        { href: 'use-cases.html#manufacturing', label: 'Manufacturing & Logistics', sub: 'IoT pipelines, supply chain KPIs' }
      ]
    },
    {
      title: 'Teams',
      href: 'use-cases.html#teams',
      desc: 'Cross-functional combos on one control plane',
      links: [
        { href: 'use-cases.html#team-data-pod', label: 'Data pod', sub: 'DBA · DE · DS · DA — shared lineage & metrics' },
        { href: 'use-cases.html#team-gtm', label: 'GTM squad', sub: 'BD · BA · Marketing — one funnel truth' },
        { href: 'use-cases.html#team-platform-analytics', label: 'Platform + Analytics', sub: 'Infra, dbt, and BI without handoffs' },
        { href: 'use-cases.html#team-exec-finance', label: 'Exec + Finance + Product', sub: 'Board metrics everyone trusts' }
      ]
    }
  ];

  function renderMegaDropdown(id, triggerId, menuId, label, isActive, menu, cols, headTitle, headSub, allHref) {
    const gridCls = cols === 3 ? 'nav-mega-grid cols-3' : cols === 2 ? 'nav-mega-grid cols-2' : 'nav-mega-grid';
    const menuCls = cols === 3 ? 'nav-mega-menu nav-mega-uc' : cols === 2 ? 'nav-mega-menu nav-mega-wide' : 'nav-mega-menu';
    return `<div class="nav-dropdown" id="${id}">
      <button type="button" class="nav-dropdown-trigger${isActive ? ' active' : ''}" id="${triggerId}" aria-expanded="false" aria-haspopup="true">
        ${label}
        <svg class="nav-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      <div class="${menuCls}" id="${menuId}" role="menu" aria-hidden="true">
        <div class="nav-mega-inner">
          <div class="nav-mega-head">
            <strong>${headTitle}</strong>
            <span>${headSub}</span>
            <a href="${allHref}" class="link-arrow">View all →</a>
          </div>
          <div class="${gridCls}">
            ${menu.map(col => `
              <div class="nav-mega-col">
                <div class="nav-mega-col-head">
                  <h4>${col.href ? `<a href="${col.href}" class="nav-mega-col-title hover-pop">${col.title}</a>` : col.title}</h4>
                  <p>${col.desc}</p>
                </div>
                <ul class="nav-mega-links">
                  ${col.links.map(l => `<li><a href="${l.href}" class="nav-mega-link hover-pop" role="menuitem"><span>${l.label}</span><small>${l.sub}</small></a></li>`).join('')}
                </ul>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
  }

  function renderFeaturesMega(active) {
    return renderMegaDropdown(
      'navFeaturesDropdown', 'navFeaturesTrigger', 'navMegaMenu', 'Features',
      FEATURE_PAGES.includes(active), featuresMenu, 4,
      'Explore Metroflow', 'Infrastructure intelligence + trusted metrics — available at launch', 'features.html'
    );
  }

  function renderUseCasesMega(active) {
    return renderMegaDropdown(
      'navUseCasesDropdown', 'navUseCasesTrigger', 'navUseCasesMenu', 'Use Cases',
      active === 'use-cases', useCasesMenu, 3,
      'Who is Metroflow for?', 'Playbooks by role, industry, and cross-functional teams', 'use-cases.html'
    );
  }

  function renderMobileDropdown(id, toggleId, panelId, label, menu, allHref, allLabel) {
    return `<div class="nav-mobile-features">
      <button type="button" class="nav-mobile-features-toggle" id="${toggleId}" aria-expanded="false">${label}</button>
      <div class="nav-mobile-features-panel" id="${panelId}" hidden>
        ${menu.map(col => `
          <div class="nav-mobile-feat-col">
            <h5>${col.href ? `<a href="${col.href}">${col.title}</a>` : col.title}</h5>
            ${col.links.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
          </div>`).join('')}
        <a href="${allHref}" class="nav-mobile-feat-all">${allLabel}</a>
      </div>
    </div>`;
  }

  function renderHeader(active) {
    return `<header class="nav">
  <div class="nav-inner">
    <a href="index.html" class="brand mf-logo-brand hover-pop" data-mf-logo="brand" data-mf-logo-size="28"></a>
    <nav class="nav-links" id="navLinks">
      ${renderFeaturesMega(active)}
      ${renderUseCasesMega(active)}
      ${navLinks.filter(l => l.id !== 'home').map(l => navLink(l, active)).join('')}
    </nav>
    <div class="nav-end">
      <div class="nav-right">
        <a href="${GITHUB}" class="btn btn-ghost btn-github hover-pop" target="_blank" rel="noopener">
          ${GITHUB_ICON}
          <span>Star on GitHub</span>
        </a>
        <a href="${DISCORD}" class="btn btn-ghost btn-discord hover-pop" target="_blank" rel="noopener">Join Discord</a>
        <a href="open-source.html#get-started" class="btn btn-primary hover-pop">Get Started</a>
        ${THEME_ICON}
      </div>
      <button class="nav-toggle hover-pop" id="navToggle" aria-label="Open menu" aria-expanded="false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>
</header>
${THEME_FLOAT}
<div class="nav-mobile-overlay" id="navOverlay"></div>
<nav class="nav-mobile" id="navMobile" aria-hidden="true">
  <a href="index.html"${active === 'home' ? ' class="active"' : ''}>Home</a>
  ${renderMobileDropdown('mf', 'mobileFeaturesToggle', 'mobileFeaturesPanel', 'Features', featuresMenu, 'features.html', 'All features →')}
  ${renderMobileDropdown('uc', 'mobileUseCasesToggle', 'mobileUseCasesPanel', 'Use Cases', useCasesMenu, 'use-cases.html', 'All use cases →')}
  ${navLinks.filter(l => l.id !== 'home').map(l => navLink(l, active)).join('')}
  <div class="nav-mobile-theme">
    <button class="theme-toggle hover-pop" data-theme-toggle aria-label="Toggle theme">
      <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
      <span>Toggle theme</span>
    </button>
  </div>
  <div class="nav-mobile-ctas">
    <a href="${GITHUB}" class="btn btn-ghost hover-pop" target="_blank" rel="noopener">${GITHUB_ICON} Star on GitHub</a>
    <a href="${DISCORD}" class="btn btn-ghost hover-pop" target="_blank" rel="noopener">Join Discord</a>
    <a href="open-source.html#get-started" class="btn btn-primary hover-pop">Get Started</a>
  </div>
</nav>`;
  }

  function renderFooter() {
    return `<footer>
  <div class="wrap">
    <div class="footer-top">
      <div class="footer-brand">
        <a href="index.html" class="brand mf-logo-brand hover-pop" data-mf-logo="brand" data-mf-logo-size="32"></a>
        <p>Enterprise Brain for your data stack — infrastructure intelligence and trusted metrics, from day one.</p>
      </div>
      <div class="footer-cols">
        <div class="footer-col">
          <h5>Product</h5>
          <a href="features.html" class="hover-pop">Features</a>
          <a href="use-cases.html" class="hover-pop">Use Cases</a>
          <a href="integrations.html" class="hover-pop">Integrations</a>
          <a href="compare.html" class="hover-pop">Compare</a>
          <a href="customers.html" class="hover-pop">Customers</a>
          <a href="vision.html" class="hover-pop">Vision &amp; Roadmap</a>
          <a href="open-source.html" class="hover-pop">Open Source</a>
        </div>
        <div class="footer-col">
          <h5>Resources</h5>
          <a href="docs.html" class="hover-pop">Docs</a>
          <a href="quickstart.html" class="hover-pop">Quickstart</a>
          <a href="blog.html" class="hover-pop">Blog</a>
          <a href="changelog.html" class="hover-pop">Changelog</a>
          <a href="community.html" class="hover-pop">Community</a>
        </div>
        <div class="footer-col">
          <h5>Company</h5>
          <a href="about.html" class="hover-pop">About</a>
          <a href="contact.html" class="hover-pop">Contact</a>
        </div>
      </div>
    </div>
    <div class="glow-line footer-divider" aria-hidden="true"></div>
    <div class="footer-bottom">
      <div class="footer-legal">
        <a href="privacy.html" class="hover-pop">Privacy</a>
        <span aria-hidden="true">·</span>
        <a href="terms.html" class="hover-pop">Terms</a>
        <span aria-hidden="true">·</span>
        <a href="security.html" class="hover-pop">Security</a>
      </div>
      <div class="footer-social">
        <a href="${GITHUB}" class="hover-pop" aria-label="GitHub" target="_blank" rel="noopener">${GITHUB_ICON}</a>
        <a href="${DISCORD}" class="hover-pop" aria-label="Discord" target="_blank" rel="noopener"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.3 4.4A19.9 19.9 0 0 0 15.6 3l-.24.48a13.9 13.9 0 0 1 4.2 1.7 15 15 0 0 0-15.1 0 13.9 13.9 0 0 1 4.2-1.7L8.4 3a19.9 19.9 0 0 0-4.7 1.4C1 8.9.3 13.3.6 17.6a20 20 0 0 0 5.9 3l1-1.6a13 13 0 0 1-2-1l.5-.4a14.4 14.4 0 0 0 12 0l.5.4a13 13 0 0 1-2 1l1 1.6a20 20 0 0 0 5.9-3c.4-4.9-.7-9.3-3.1-13.2zM9 15c-.9 0-1.6-.8-1.6-1.8S8 11.4 9 11.4s1.7.8 1.6 1.8S9.9 15 9 15zm6 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.7.8 1.6 1.8S15.9 15 15 15z"/></svg></a>
      </div>
    </div>
    <div class="footer-copy-row">
      <span class="footer-copy">© 2026 Metroflow. Built for data teams who want their stack to finally make sense.</span>
    </div>
  </div>
</footer>`;
  }

  const active = document.body.dataset.page || '';
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  function hydrateLogos() {
    if (!window.MFLogo) return;
    document.querySelectorAll('[data-mf-logo]').forEach(el => {
      if (el.dataset.mfLogoHydrated === 'true') return;
      const size = parseInt(el.dataset.mfLogoSize || '32', 10);
      const spin = el.dataset.mfLogoSpin === 'true';
      const showText = el.dataset.mfLogoText !== 'false';
      const isMark = el.dataset.mfLogo === 'mark';
      const isBrand = el.dataset.mfLogo === 'brand';
      if (isBrand) {
        el.innerHTML = window.MFLogo.svg(size, spin) + (showText ? '<span class="mf-logo-text">Metroflow</span>' : '');
        el.classList.add('mf-logo-brand');
      } else {
        el.innerHTML = window.MFLogo.svg(size, spin) + (!isMark && showText ? '<span class="mf-logo-text">Metroflow</span>' : '');
        if (!isMark) el.classList.add('mf-logo-brand');
      }
      if (spin) el.querySelector('.mf-logo-svg')?.classList.add('mf-logo-spin');
      el.dataset.mfLogoHydrated = 'true';
    });
  }

  function renderFinalCta() {
    const el = document.getElementById('site-final-cta');
    if (!el) return;
    const body = document.body;
    const title = el.dataset.ctaTitle || body.dataset.ctaTitle || 'Ready to stop fighting your stack?';
    const sub = el.dataset.ctaSub || body.dataset.ctaSub || 'Infrastructure intelligence and trusted metrics — one Enterprise Brain, open source, ready to self-host.';
    const pHref = el.dataset.ctaPrimaryHref || body.dataset.ctaPrimaryHref || 'open-source.html#get-started';
    const pLabel = el.dataset.ctaPrimaryLabel || body.dataset.ctaPrimaryLabel || 'Get Started — Open Source';
    const sHref = el.dataset.ctaSecondaryHref || body.dataset.ctaSecondaryHref || 'community.html';
    const sLabel = el.dataset.ctaSecondaryLabel || body.dataset.ctaSecondaryLabel || 'Join the Community';
    el.innerHTML = `<section class="final-cta">
  <div class="wrap">
    <div class="final-cta-box reveal glow-card hover-pop">
      <div class="mf-logo-final" data-mf-logo="mark" data-mf-logo-size="80" data-mf-logo-spin="true" data-mf-logo-text="false"></div>
      <h2>${title}</h2>
      ${sub && sub.trim() ? `<p class="final-cta-sub">${sub}</p>` : ''}
      <div class="final-ctas">
        <a href="${pHref}" class="btn btn-primary btn-lg hover-pop">${pLabel}</a>
        <a href="${sHref}" class="btn btn-ghost btn-lg hover-pop">${sLabel}</a>
      </div>
    </div>
  </div>
</section>`;
    hydrateLogos();
    el.querySelectorAll('.reveal').forEach(r => {
      if (typeof IntersectionObserver !== 'undefined') {
        const io = new IntersectionObserver((entries) => {
          entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
        }, { threshold: 0.15 });
        io.observe(r);
      } else {
        r.classList.add('in');
      }
    });
  }

  if (headerEl) headerEl.innerHTML = renderHeader(active);
  if (footerEl) footerEl.innerHTML = renderFooter();
  renderFinalCta();
  hydrateLogos();

  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  const overlay = document.getElementById('navOverlay');

  function setMobileOpen(open) {
    if (!mobile || !toggle) return;
    mobile.classList.toggle('is-open', open);
    overlay?.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobile.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (toggle && mobile) {
    toggle.addEventListener('click', () => setMobileOpen(!mobile.classList.contains('is-open')));
    overlay?.addEventListener('click', () => setMobileOpen(false));
    mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMobileOpen(false)));
  }

  const dropdowns = [
    { dropdown: 'navFeaturesDropdown', trigger: 'navFeaturesTrigger', menu: 'navMegaMenu' },
    { dropdown: 'navUseCasesDropdown', trigger: 'navUseCasesTrigger', menu: 'navUseCasesMenu' }
  ];

  function setDropdownOpen(id, open) {
    dropdowns.forEach(d => {
      const el = document.getElementById(d.dropdown);
      const trigger = document.getElementById(d.trigger);
      const menu = document.getElementById(d.menu);
      if (!el || !trigger || !menu) return;
      const shouldOpen = !!id && d.dropdown === id && open;
      el.classList.toggle('is-open', shouldOpen);
      trigger.setAttribute('aria-expanded', String(shouldOpen));
      menu.setAttribute('aria-hidden', String(!shouldOpen));
    });
  }

  function closeAllDropdowns() { setDropdownOpen(null, false); }

  dropdowns.forEach(d => {
    const el = document.getElementById(d.dropdown);
    const trigger = document.getElementById(d.trigger);
    const menu = document.getElementById(d.menu);
    if (!el || !trigger || !menu) return;
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = !el.classList.contains('is-open');
      closeAllDropdowns();
      if (open) setDropdownOpen(d.dropdown, true);
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeAllDropdowns));
  });

  document.addEventListener('click', (e) => {
    if (!dropdowns.some(d => document.getElementById(d.dropdown)?.contains(e.target))) closeAllDropdowns();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllDropdowns(); });

  [['mobileFeaturesToggle', 'mobileFeaturesPanel'], ['mobileUseCasesToggle', 'mobileUseCasesPanel']].forEach(([tid, pid]) => {
    const toggle = document.getElementById(tid);
    const panel = document.getElementById(pid);
    if (!toggle || !panel) return;
    toggle.addEventListener('click', () => {
      const open = panel.hidden;
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.classList.toggle('is-open', open);
    });
  });

  window.METROFLOW = { GITHUB, DISCORD, DOCS };

  hydrateLogos();
})();