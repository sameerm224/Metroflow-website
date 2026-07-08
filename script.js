// ---------------- scroll reveal ----------------
(function () {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
})();

// ---------------- copy button (quickstart terminal) ----------------
(function () {
  const copyBtn = document.getElementById('copyBtn');
  if (!copyBtn) return;
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('git clone https://github.com/metroflow/metroflow.git && cd metroflow && docker compose up');
    copyBtn.textContent = 'copied';
    setTimeout(() => { copyBtn.textContent = 'copy'; }, 1500);
  });
})();

// ---------------- interactive hero workspace mockup ----------------
(function () {
  const frame = document.getElementById('mockupFrame');
  if (!frame) return;

  const scenarios = {
    snowflake: {
      breadcrumb: ['metroflow', 'customer_analytics', 'fct_revenue.sql'],
      user: "What depends on this table?",
      line: "Tracing lineage from fct_revenue... 3 downstream models and 1 dashboard depend on this table. stg_orders and raw_stripe are upstream.",
      code: '<span class="tok-kw">-- fct_revenue dependencies</span><br>downstream: <span class="tok-str">exec_dash, churn_model, revenue_report</span><br>upstream: <span class="tok-str">stg_orders, raw_stripe</span>',
      applyLabel: 'View lineage',
      toast: 'Lineage graph updated \u00b7 4 nodes highlighted',
      nodes: ['raw_stripe', 'stg_orders', 'fct_revenue', 'exec_dash'],
      issueIndex: 2
    },
    dbt: {
      breadcrumb: ['metroflow', 'analytics_eng', 'schema.yml'],
      user: "The nightly dbt test suite is failing on stg_customers.",
      line: "Checking dbt manifest... unique_key test on stg_customers is failing because of 340 duplicate rows introduced by yesterday's Fivetran resync.",
      code: '<span class="tok-kw">-- tests/stg_customers.yml</span><br>unique_key: <span class="tok-str">customer_id</span><br>failures: <span class="tok-str">340</span><br><span class="diff-add">fix: dedupe on max(_synced_at)</span>',
      applyLabel: 'Apply fix',
      toast: 'PR #483 opened \u00b7 dedupe-stg-customers',
      nodes: ['fivetran_raw', 'stg_customers', 'dim_customers', 'churn_model'],
      issueIndex: 1
    },
    airflow: {
      breadcrumb: ['metroflow', 'orchestration', 'daily_revenue_dag'],
      user: "Why is the daily_revenue DAG stuck in retries?",
      line: "Checking Airflow logs... the extract_charges task is timing out waiting on the Stripe API rate limit, retrying 3 of 5.",
      code: '<span class="tok-kw">-- daily_revenue_dag</span><br>task: <span class="tok-str">extract_charges</span><br>state: <span class="tok-str">up_for_retry (3/5)</span><br><span class="diff-add">fix: raise pool slots 2 \u2192 5</span>',
      applyLabel: 'Apply fix',
      toast: 'PR #484 opened \u00b7 raise-stripe-pool-slots',
      nodes: ['stripe_api', 'extract_charges', 'load_raw', 'daily_revenue'],
      issueIndex: 1
    },
    postgres: {
      breadcrumb: ['metroflow', 'app_db', 'orders_v2'],
      user: "Did last night's migration break anything downstream?",
      line: "Comparing schemas... orders_v2 dropped the region column that stg_orders still selects from. 4 downstream models will fail on next run.",
      code: '<span class="tok-kw">-- stg_orders.sql</span><br>missing column: <span class="tok-str">region</span><br>impacted models: <span class="tok-str">4</span><br><span class="diff-add">fix: left join dim_region on order_id</span>',
      applyLabel: 'Apply fix',
      toast: 'PR #485 opened \u00b7 restore-region-join',
      nodes: ['orders_v2', 'stg_orders', 'fct_orders', 'region_report'],
      issueIndex: 1
    },
    dagster: {
      breadcrumb: ['metroflow', 'orchestration', 'revenue_assets'],
      user: "Which assets depend on fct_revenue?",
      line: "Tracing Dagster asset lineage... 3 downstream assets and 1 job depend on fct_revenue. exec_dashboard_job reads directly from it.",
      code: '<span class="tok-kw">-- asset: fct_revenue</span><br>downstream: <span class="tok-str">3 assets</span><br>jobs: <span class="tok-str">exec_dashboard_job</span><br><span class="diff-add">impact: schema change affects 4 consumers</span>',
      applyLabel: 'View lineage',
      toast: 'Lineage graph updated \u00b7 4 downstream nodes',
      nodes: ['raw_orders', 'stg_revenue', 'fct_revenue', 'exec_dash'],
      issueIndex: 2
    }
  };

  const railItems = frame.querySelectorAll('.rail-item[data-conn]');
  const breadcrumbEl = frame.querySelector('#breadcrumbText');
  const userMsgEl = frame.querySelector('#chatUserMsg');
  const typedEl = frame.querySelector('#typedLine1');
  const codeReveal = frame.querySelector('#codeReveal');
  const codeBlockEl = frame.querySelector('#codeBlockInner');
  const applyBtn = frame.querySelector('#applyBtn');
  const applyNote = frame.querySelector('#applyNote');
  const toastEl = frame.querySelector('#toastMsg');
  const nodeEls = [0, 1, 2, 3].map(i => frame.querySelector('#lnode' + i + ' text'));
  const nodeRects = [0, 1, 2, 3].map(i => frame.querySelector('#lnode' + i + ' rect'));

  let typeTimer = null;
  let currentKey = 'snowflake';

  function renderLineage(scn) {
    nodeEls.forEach((el, i) => { if (el) el.textContent = scn.nodes[i]; });
    nodeRects.forEach((rect, i) => {
      if (!rect) return;
      rect.setAttribute('stroke', i === scn.issueIndex ? 'var(--accent)' : 'var(--border-strong)');
      rect.setAttribute('stroke-width', i === scn.issueIndex ? '1.8' : '1.2');
    });
  }

  function typeStep(text, cb) {
    let i = 0;
    clearInterval(typeTimer);
    typedEl.innerHTML = '<span class="typed-cursor"></span>';
    typeTimer = setInterval(() => {
      if (i <= text.length) {
        typedEl.innerHTML = text.slice(0, i) + '<span class="typed-cursor"></span>';
        i++;
      } else {
        clearInterval(typeTimer);
        typedEl.innerHTML = text;
        if (cb) cb();
      }
    }, 12);
  }

  function loadScenario(key, animate) {
    const scn = scenarios[key];
    if (!scn) return;
    currentKey = key;

    breadcrumbEl.innerHTML = scn.breadcrumb.map((s, i) =>
      i === scn.breadcrumb.length - 1 ? '<span class="seg-active">' + s + '</span>' : '<span>' + s + '</span>'
    ).join(' / ');
    userMsgEl.textContent = scn.user;
    codeBlockEl.innerHTML = scn.code;
    applyBtn.textContent = scn.applyLabel;
    applyNote.textContent = 'grounded in your actual metadata';
    codeReveal.style.display = 'none';
    toastEl.classList.remove('show');
    renderLineage(scn);

    railItems.forEach(item => item.classList.toggle('active', item.dataset.conn === key));

    if (animate) {
      typeStep(scn.line, () => { setTimeout(() => { codeReveal.style.display = 'block'; }, 250); });
    } else {
      typedEl.textContent = scn.line;
      codeReveal.style.display = 'block';
    }
  }

  railItems.forEach(item => {
    item.addEventListener('click', () => loadScenario(item.dataset.conn, true));
  });

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      applyNote.textContent = 'applying...';
      setTimeout(() => {
        toastEl.textContent = scenarios[currentKey].toast;
        toastEl.classList.add('show');
        applyNote.textContent = 'grounded in your actual metadata';
      }, 500);
    });
  }

  const mockupObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        loadScenario('snowflake', true);
        mockupObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  mockupObserver.observe(frame);
})();
