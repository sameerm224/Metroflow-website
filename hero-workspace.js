(function () {
  const root = document.getElementById('mfWorkspace');
  if (!root) return;

  const STEPS = [
    { id: 'signin', label: 'Sign in' },
    { id: 'connect', label: 'Connect' },
    { id: 'sync', label: 'Sync' },
    { id: 'graph', label: 'Graph' },
    { id: 'workspace', label: 'Workspace' }
  ];

  const CONNECTORS = [
    { id: 'snowflake', name: 'Snowflake', desc: 'Schemas & tables', icon: '❄', syncLabel: 'Snowflake · information_schema' },
    { id: 'dbt', name: 'dbt Core', desc: 'Models & manifest', icon: '{ }', syncLabel: 'dbt · manifest.json + catalog' },
    { id: 'airflow', name: 'Airflow', desc: 'DAGs & task runs', icon: '◎', syncLabel: 'Airflow · DAG metadata' }
  ];

  const SYNTH = {
    tables: [
      { name: 'raw_stripe_charges', schema: 'raw', rows: 2401847, fresh: '2h ago', cols: ['charge_id', 'amount', 'customer_id', 'created_at'] },
      { name: 'stg_orders', schema: 'staging', rows: 890412, fresh: '1h ago', cols: ['order_id', 'customer_id', 'revenue', 'region'] },
      { name: 'fct_revenue', schema: 'analytics', rows: 412890, fresh: '45m ago', cols: ['order_id', 'revenue', 'segment', 'month'] },
      { name: 'dim_customers', schema: 'analytics', rows: 128440, fresh: '3h ago', cols: ['customer_id', 'segment', 'ltv', 'region'] }
    ],
    rows: {
      stg_orders: [
        ['ORD-1042', 'C-8821', '$249.00', 'US-West'],
        ['ORD-1043', 'C-3310', '$89.50', 'EU-North'],
        ['ORD-1044', 'C-8821', '$1,240.00', 'US-West'],
        ['ORD-1045', 'C-9902', '$56.00', 'APAC'],
        ['ORD-1046', 'C-4412', '$312.75', 'US-East']
      ],
      fct_revenue: [
        ['ORD-1042', '$249.00', 'Enterprise', '2026-07'],
        ['ORD-1043', '$89.50', 'SMB', '2026-07'],
        ['ORD-1044', '$1,240.00', 'Enterprise', '2026-07'],
        ['ORD-1045', '$56.00', 'Starter', '2026-07'],
        ['ORD-1046', '$312.75', 'Mid-Market', '2026-07']
      ],
      dim_customers: [
        ['C-8821', 'Enterprise', '$48,200', 'US-West'],
        ['C-3310', 'SMB', '$3,400', 'EU-North'],
        ['C-9902', 'Starter', '$890', 'APAC'],
        ['C-4412', 'Mid-Market', '$12,600', 'US-East']
      ]
    },
    recent: [
      { icon: '◈', title: 'stg_orders', sub: 'Previewed · 12 rows sampled', action: 'preview', table: 'stg_orders' },
      { icon: '◎', title: 'Lineage: fct_revenue', sub: 'Generated · 45m ago', action: 'prompt', key: 'lineage' },
      { icon: '{ }', title: 'dbt tests patch', sub: 'Suggested · 1h ago', action: 'prompt', key: 'dbt' },
      { icon: '⚡', title: 'Snowflake + dbt', sub: 'Connected · just now', action: 'catalog' }
    ],
    prompts: {
      lineage: {
        q: 'What depends on fct_revenue?',
        a: 'Tracing your synced graph… 3 downstream assets: exec_dashboard, churn_model, revenue_forecast. Upstream: raw_stripe_charges → stg_orders → fct_revenue.',
        code: 'SELECT downstream FROM mf.lineage\nWHERE source = \'fct_revenue\';\n-- 3 models · 1 dashboard · live synthetic data'
      },
      dbt: {
        q: 'Generate tests for stg_orders',
        a: 'From manifest… unique on order_id. Adding not_null customer_id + relationship to dim_customers. Sample data shows 5 rows — no nulls in customer_id.',
        code: '- name: stg_orders\n  tests:\n    - unique: order_id\n    - not_null: customer_id'
      },
      impact: {
        q: 'Impact if I drop the region column?',
        a: 'Schema diff… region in stg_orders used by region_report and exec_dashboard. 4 models fail on next run. Sample row ORD-1042 has region US-West.',
        code: 'impacted: stg_orders, fct_orders\nregion_report, exec_dashboard'
      },
      dag: {
        q: 'Why is daily_revenue stuck in retries?',
        a: 'Airflow logs… extract_charges up_for_retry 3/5. Stripe rate limit — pool has 2 slots. Raise to 5.',
        code: 'extract_charges: up_for_retry\npool: stripe_api (2→5)'
      },
      model: {
        q: 'Create a dbt model to calculate monthly recurring revenue',
        a: 'Drafting from fct_revenue synthetic data… 412K rows, segment column available. Suggest fct_mrr.sql with ref stg_orders + dim_customers.',
        code: '{{ config(materialized=\'table\') }}\nselect month, segment, sum(revenue) as mrr\nfrom {{ ref(\'fct_revenue\') }}\ngroup by 1, 2'
      }
    }
  };

  let stepIndex = 0;
  let selectedConnectors = new Set(['snowflake', 'dbt']);
  let typeTimer = null;
  let syncTimer = null;
  let workspaceView = 'home';
  let previewTable = null;
  let chatHistory = [];

  function logo(size) {
    return window.MFLogo ? window.MFLogo.svg(size, false) : '<span class="logo-gem">M</span>';
  }

  function shell(mainHtml, breadcrumb) {
    const step = STEPS[stepIndex];
    const onboarded = stepIndex >= STEPS.length - 1;
    return `
    <div class="dm-app">
      <aside class="dm-sidebar">
        <button class="dm-side-btn active" title="Home">⌂</button>
        <button class="dm-side-btn" title="Catalog">◈</button>
        <button class="dm-side-btn" title="Agent">◎</button>
        <button class="dm-side-btn" title="Lineage">⬡</button>
        <button class="dm-side-btn" title="Connectors">⚡</button>
        <div class="dm-side-spacer"></div>
        <button class="dm-side-btn" title="Settings">⚙</button>
      </aside>
      <div class="dm-main">
        <div class="dm-topbar">
          <span class="dm-top-left">⌂ ${breadcrumb || step.label}</span>
          <span class="dm-top-brand">${logo(22)}<span>metroflow</span></span>
        </div>
        ${onboarded ? '' : renderStepper()}
        <div class="dm-content" id="dmContent">${mainHtml}</div>
      </div>
    </div>`;
  }

  function renderStepper() {
    return `<div class="ws-stepper dm-stepper">
      ${STEPS.map((s, i) => {
        const state = i < stepIndex ? 'done' : i === stepIndex ? 'active' : '';
        return `<div class="ws-step ${state}"><span class="ws-step-dot">${i < stepIndex ? '✓' : i + 1}</span><span class="ws-step-label">${s.label}</span></div>${i < STEPS.length - 1 ? '<span class="ws-step-line"></span>' : ''}`;
      }).join('')}
    </div>`;
  }

  function getSyncJobs() {
    const jobs = CONNECTORS.filter(c => selectedConnectors.has(c.id)).map(c => ({ label: c.syncLabel }));
    jobs.push({ label: 'Building lineage edges' }, { label: 'Indexing semantic graph' });
    return jobs;
  }

  function statsForStep() {
    const n = selectedConnectors.size;
    const models = stepIndex >= 4 ? (n >= 3 ? 12 : n >= 2 ? 9 : 5) : stepIndex >= 2 ? (n * 3) : 0;
    const cov = stepIndex >= 4 ? (n >= 3 ? '98%' : '91%') : stepIndex >= 3 ? '88%' : '—';
    return { models, cov, agents: stepIndex >= 4 ? '4' : '—', conn: n };
  }

  function viewSignin() {
    return shell(`<div class="dm-welcome">
      <h2>Welcome to Metroflow</h2>
      <p class="dm-sub">Your intelligent workspace for data infrastructure</p>
      <div class="dm-prompt-wrap glow-border-dm">
        <div class="dm-prompt-inner">
          <div class="dm-prompt-top"><span>🔐 Sign in to continue</span></div>
          <p class="dm-signin-copy">Connect your stack in the next step — pick only the sources you use (1, 2, or all 3).</p>
          <div class="dm-auth-row">
            <button class="dm-auth-primary" id="wsSignIn"><span>Continue with GitHub</span></button>
            <button class="dm-auth-secondary" id="wsSignInGoogle"><span>Google</span></button>
          </div>
        </div>
      </div>
      <div class="dm-cards-row">
        <div class="dm-mini-card glow-card"><h4>Quick Start</h4><small>After sign-in</small><ul><li>Pick connectors</li><li>Sync metadata</li><li>Query lineage</li></ul></div>
        <div class="dm-mini-card glow-card"><h4>Synthetic data</h4><small>Pre-loaded demo</small><ul><li>5 sample tables</li><li>Live row previews</li><li>Working queries</li></ul></div>
        <div class="dm-mini-card glow-card"><h4>~2 min setup</h4><small>No warehouse needed</small><ul><li>Metadata only</li><li>SSO mock</li><li>Full workspace</li></ul></div>
      </div>
    </div>`, 'Sign in');
  }

  function viewConnect() {
    const n = selectedConnectors.size;
    return shell(`<div class="dm-welcome">
      <h2>Connect your stack</h2>
      <p class="dm-sub">Pick <strong>1 or more</strong> — only what you use. Demo works great with just Snowflake + dbt.</p>
      <div class="dm-conn-pick">
        ${CONNECTORS.map(c => `
          <button type="button" class="dm-conn-opt glow-card hover-pop ${selectedConnectors.has(c.id) ? 'on' : ''}" data-conn="${c.id}">
            <span class="dm-conn-ico">${c.icon}</span>
            <strong>${c.name}</strong>
            <small>${c.desc}</small>
            <span class="dm-conn-tick">${selectedConnectors.has(c.id) ? '✓' : '+'}</span>
          </button>`).join('')}
      </div>
      <p class="dm-conn-hint">${n === 0 ? 'Select at least one source' : `${n} selected — sync will crawl only these connectors`}</p>
      <button class="dm-send-btn" id="wsConnectBtn" ${n === 0 ? 'disabled' : ''}>Connect ${n || ''} source${n !== 1 ? 's' : ''} →</button>
    </div>`, 'Connect');
  }

  function viewSync() {
    const jobs = getSyncJobs();
    return shell(`<div class="dm-welcome">
      <h2>Syncing metadata</h2>
      <p class="dm-sub">Crawling ${selectedConnectors.size} connector${selectedConnectors.size !== 1 ? 's' : ''} into your semantic graph</p>
      <div class="ws-sync-list" id="wsSyncList">
        ${jobs.map((j, i) => `
          <div class="ws-sync-row"><div class="ws-sync-top"><span>${j.label}</span><span class="ws-sync-pct" id="syncPct${i}">0%</span></div>
          <div class="ws-sync-bar"><div class="ws-sync-fill" id="syncFill${i}" style="width:0%"></div></div></div>`).join('')}
      </div>
      <div class="ws-sync-status" id="wsSyncStatus"><span class="pulse-dot"></span> Syncing synthetic demo dataset…</div>
    </div>`, 'Sync');
  }

  function viewGraph() {
    return shell(`<div class="dm-welcome">
      <h2>Building lineage graph</h2>
      <p class="dm-sub">Linking tables across your ${selectedConnectors.size} connected source${selectedConnectors.size !== 1 ? 's' : ''}</p>
      <svg viewBox="0 0 520 200" class="ws-graph-svg" id="wsGraphSvg">
        <defs><linearGradient id="gline" x1="0%" x2="100%"><stop offset="0%" stop-color="#22E59A"/><stop offset="100%" stop-color="#8B5CF6"/></linearGradient></defs>
        <g class="g-edge" opacity="0"><path d="M70,45 L70,100 L260,100" stroke="url(#gline)" stroke-width="2" fill="none"/></g>
        <g class="g-edge" opacity="0"><path d="M70,155 L70,100" stroke="url(#gline)" stroke-width="2" fill="none"/></g>
        <g class="g-edge" opacity="0"><path d="M260,100 L450,100" stroke="url(#gline)" stroke-width="2" fill="none"/></g>
        <g class="g-node" opacity="0"><rect x="30" y="25" width="80" height="36" rx="8"/><text x="70" y="48" text-anchor="middle">raw_stripe</text></g>
        <g class="g-node" opacity="0"><rect x="30" y="135" width="80" height="36" rx="8"/><text x="70" y="158" text-anchor="middle">stg_orders</text></g>
        <g class="g-node" opacity="0"><rect x="220" y="82" width="80" height="36" rx="8"/><text x="260" y="105" text-anchor="middle">fct_revenue</text></g>
        <g class="g-node" opacity="0"><rect x="410" y="82" width="80" height="36" rx="8"/><text x="450" y="105" text-anchor="middle">exec_dash</text></g>
      </svg>
      <div class="ws-graph-stats"><span><strong id="gNodes">0</strong> nodes</span><span><strong id="gEdges">0</strong> edges</span><span><strong id="gCoverage">0%</strong> coverage</span></div>
      <button class="dm-send-btn" id="wsGraphDone" style="display:none">Open workspace →</button>
    </div>`, 'Graph');
  }

  function renderDataPreview(table) {
    const t = SYNTH.tables.find(x => x.name === table);
    const rows = SYNTH.rows[table];
    if (!t || !rows) return '';
    return `<div class="dm-preview glow-card">
      <div class="dm-preview-head"><strong>${t.name}</strong><span>${t.schema} · ${t.rows.toLocaleString()} rows · sample</span><button class="dm-preview-close" id="closePreview">✕</button></div>
      <div class="dm-table-wrap"><table class="dm-data-table"><thead><tr>${t.cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>
      <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    </div>`;
  }

  function viewWorkspace() {
    const st = statsForStep();
    const showPreview = previewTable ? renderDataPreview(previewTable) : '';

    if (workspaceView === 'catalog') {
      return shell(`<div class="dm-welcome dm-ws-view">
        <h2>Living catalog</h2>
        <p class="dm-sub">${SYNTH.tables.length} tables · click any row to preview synthetic data</p>
        ${showPreview}
        <div class="dm-catalog-list">
          ${SYNTH.tables.map(t => `
            <button class="dm-catalog-item glow-card hover-pop" data-preview="${t.name}">
              <span>◈</span><div><strong>${t.name}</strong><small>${t.schema} · ${t.rows.toLocaleString()} rows · ${t.fresh}</small></div>
              <em>preview →</em>
            </button>`).join('')}
        </div>
      </div>`, 'Catalog');
    }

    if (workspaceView === 'agent') {
      const last = chatHistory[chatHistory.length - 1];
      return shell(`<div class="dm-welcome dm-ws-view">
        <h2>Infrastructure agent</h2>
        <p class="dm-sub">Queries run against your synced synthetic graph</p>
        <div class="dm-chat-log">
          ${chatHistory.map(m => `<div class="dm-chat ${m.role}"><span class="dm-chat-label">${m.role === 'user' ? 'you' : 'agent'}</span>${m.text}${m.code ? `<pre class="ws-code ws-code-sm">${m.code}</pre>` : ''}</div>`).join('')}
          ${!last ? '<div class="dm-chat bot"><span class="dm-chat-label">agent</span>Try a recommended query — each returns real answers from the demo dataset.</div>' : ''}
        </div>
        <div class="dm-pills">${Object.keys(SYNTH.prompts).slice(0, 4).map(k => {
          const p = SYNTH.prompts[k];
          return `<button class="dm-pill hover-pop" data-prompt="${k}">${p.q}</button>`;
        }).join('')}</div>
        <div class="dm-input-row"><input id="wsInput" placeholder="Ask about lineage, dbt, impact…" /><button class="dm-send-sm" id="wsSend">Run →</button></div>
      </div>`, 'Agent');
    }

    return shell(`<div class="dm-welcome">
      <h2>Welcome to Metroflow</h2>
      <p class="dm-sub">Your intelligent workspace for data infrastructure &amp; analysis</p>
      <div class="dm-prompt-wrap glow-border-dm">
        <div class="dm-prompt-inner">
          <div class="dm-prompt-top"><span>◎ Metroflow Agent</span><span class="dm-model">stack-aware</span></div>
          <div class="dm-prompt-input" id="dmPromptDisplay">Create a dbt model to calculate monthly recurring revenue</div>
          <div class="dm-prompt-actions">
            <button class="dm-action-pill" data-go="agent" data-prompt="lineage">Lineage</button>
            <button class="dm-action-pill" data-go="agent" data-prompt="dbt">dbt Tests</button>
            <button class="dm-action-pill" data-go="catalog">Browse data</button>
          </div>
          <button class="dm-send-btn dm-send-corner" id="dmMainSend">Send ✦</button>
        </div>
      </div>
      ${showPreview}
      <div class="dm-cards-row">
        <div class="dm-mini-card glow-card hover-pop" data-go="catalog">
          <h4>Quick Start</h4><small>Explore synthetic data</small>
          <ul>
            <li data-preview="stg_orders">Preview stg_orders</li>
            <li data-go="agent" data-prompt="lineage">Ask lineage question</li>
            <li data-go="agent" data-prompt="dbt">Generate dbt tests</li>
            <li data-preview="fct_revenue">View fct_revenue</li>
          </ul>
        </div>
        <div class="dm-mini-card glow-card hover-pop" data-go="catalog">
          <h4>Getting Started</h4><small>${st.conn} connectors live</small>
          <ul>
            <li>Catalog · ${SYNTH.tables.length} tables</li>
            <li>Agent · 4 queries ready</li>
            <li>Lineage · ${st.cov} coverage</li>
            <li>${st.models} models indexed</li>
          </ul>
        </div>
        <div class="dm-mini-card glow-card">
          <h4>Recent Activity</h4><small>Your demo workspace</small>
          <ul class="dm-recent-list">
            ${SYNTH.recent.map((r, i) => `<li class="dm-recent-item hover-pop" data-recent="${i}"><span>${r.icon}</span><div><strong>${r.title}</strong><small>${r.sub}</small></div></li>`).join('')}
          </ul>
        </div>
      </div>
    </div>`, 'Home');
  }

  function render() {
    const views = [viewSignin, viewConnect, viewSync, viewGraph, viewWorkspace];
    const st = statsForStep();
    root.innerHTML = `
      <div class="ws-orb ws-orb-t"><div class="ws-orb-num">${st.models || '—'}</div><div class="ws-orb-lbl">models</div></div>
      <div class="ws-orb ws-orb-b"><div class="ws-orb-num">${st.conn}</div><div class="ws-orb-lbl">connectors</div></div>
      <div class="ws-card dm-shell-card">
        ${views[Math.min(stepIndex, views.length - 1)]()}
        <div class="ws-stats">
          <div class="ws-stat"><div class="ws-stat-num">${st.models || '—'}</div><div class="ws-stat-lbl">models</div></div>
          <div class="ws-stat"><div class="ws-stat-num accent">${st.cov}</div><div class="ws-stat-lbl">lineage</div></div>
          <div class="ws-stat"><div class="ws-stat-num">${st.agents}</div><div class="ws-stat-lbl">agents</div></div>
        </div>
      </div>`;
    bindEvents();
    if (STEPS[stepIndex].id === 'sync') runSync();
    if (STEPS[stepIndex].id === 'graph') runGraph();
  }

  function advance() {
    if (stepIndex < STEPS.length - 1) { stepIndex++; render(); }
  }

  function bindEvents() {
    const step = STEPS[stepIndex].id;

    if (step === 'signin') {
      ['wsSignIn', 'wsSignInGoogle'].forEach(id => {
        document.getElementById(id)?.addEventListener('click', e => {
          e.currentTarget.disabled = true;
          setTimeout(advance, 700);
        });
      });
    }

    if (step === 'connect') {
      root.querySelectorAll('[data-conn]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.conn;
          if (selectedConnectors.has(id)) selectedConnectors.delete(id);
          else selectedConnectors.add(id);
          render();
        });
      });
      document.getElementById('wsConnectBtn')?.addEventListener('click', advance);
    }

    document.getElementById('wsGraphDone')?.addEventListener('click', advance);

    if (step === 'workspace') bindWorkspace();
  }

  function runPrompt(key) {
    const p = SYNTH.prompts[key];
    if (!p) return;
    workspaceView = 'agent';
    chatHistory.push({ role: 'user', text: p.q });
    chatHistory.push({ role: 'bot', text: p.a, code: p.code });
    render();
  }

  function bindWorkspace() {
    document.getElementById('dmMainSend')?.addEventListener('click', () => runPrompt('model'));

    root.querySelectorAll('[data-go]').forEach(el => {
      el.addEventListener('click', e => {
        const go = el.dataset.go || el.closest('[data-go]')?.dataset.go;
        const prompt = el.dataset.prompt || el.closest('[data-prompt]')?.dataset.prompt;
        if (go === 'agent' && prompt) { runPrompt(prompt); return; }
        if (go === 'catalog') { workspaceView = 'catalog'; previewTable = null; render(); return; }
        if (go === 'agent') { workspaceView = 'agent'; render(); }
      });
    });

    root.querySelectorAll('[data-preview]').forEach(el => {
      el.addEventListener('click', e => {
        e.stopPropagation();
        previewTable = el.dataset.preview;
        render();
      });
    });

    root.querySelectorAll('[data-recent]').forEach(el => {
      el.addEventListener('click', () => {
        const r = SYNTH.recent[+el.dataset.recent];
        if (r.action === 'preview') { previewTable = r.table; workspaceView = 'home'; render(); }
        else if (r.action === 'prompt') runPrompt(r.key);
        else if (r.action === 'catalog') { workspaceView = 'catalog'; render(); }
      });
    });

    document.getElementById('closePreview')?.addEventListener('click', () => { previewTable = null; render(); });

    root.querySelectorAll('[data-prompt]').forEach(p => {
      p.addEventListener('click', () => runPrompt(p.dataset.prompt));
    });

    const send = document.getElementById('wsSend');
    const input = document.getElementById('wsInput');
    if (send && input) {
      const go = () => {
        const v = input.value.trim().toLowerCase();
        if (v.includes('test') || v.includes('dbt')) runPrompt('dbt');
        else if (v.includes('impact') || v.includes('region')) runPrompt('impact');
        else if (v.includes('dag') || v.includes('stuck')) runPrompt('dag');
        else if (v.includes('mrr') || v.includes('model')) runPrompt('model');
        else runPrompt('lineage');
        input.value = '';
      };
      send.addEventListener('click', go);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
    }

    root.querySelectorAll('.dm-catalog-item').forEach(item => {
      item.addEventListener('click', () => { previewTable = item.dataset.preview; render(); });
    });
  }

  function runSync() {
    const jobs = getSyncJobs();
    let job = 0;
    clearInterval(syncTimer);
    function tick(i, pct) {
      const f = document.getElementById('syncFill' + i);
      const l = document.getElementById('syncPct' + i);
      if (f) f.style.width = pct + '%';
      if (l) l.textContent = pct + '%';
    }
    function runJob() {
      if (job >= jobs.length) {
        document.getElementById('wsSyncStatus').innerHTML = `<span class="pulse-dot"></span> Done · ${SYNTH.tables.length} tables · ${statsForStep().models} models`;
        setTimeout(advance, 700);
        return;
      }
      let pct = 0;
      syncTimer = setInterval(() => {
        pct = Math.min(100, pct + 8 + Math.random() * 6);
        tick(job, Math.round(pct));
        if (pct >= 100) { clearInterval(syncTimer); job++; setTimeout(runJob, 200); }
      }, 60);
    }
    runJob();
  }

  function runGraph() {
    const nodes = root.querySelectorAll('.g-node');
    const edges = root.querySelectorAll('.g-edge');
    let n = 0, e = 0;
    const nt = setInterval(() => {
      if (n < nodes.length) {
        nodes[n].style.opacity = '1';
        document.getElementById('gNodes').textContent = n + 1;
        document.getElementById('gCoverage').textContent = Math.round(((n + 1) / nodes.length) * 88) + '%';
        n++;
      } else clearInterval(nt);
    }, 300);
    setTimeout(() => {
      const et = setInterval(() => {
        if (e < edges.length) {
          edges[e].style.opacity = '1';
          document.getElementById('gEdges').textContent = e + 1;
          e++;
        } else {
          clearInterval(et);
          const btn = document.getElementById('wsGraphDone');
          if (btn) btn.style.display = 'inline-flex';
        }
      }, 350);
    }, 1000);
  }

  render();
})();