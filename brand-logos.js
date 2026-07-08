(function () {
  const LOGOS = {
    snowflake: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l1.8 3.1-3.6 2.1 3.6 2.1L12 12.4l-1.8-3.1-3.6 2.1 3.6-2.1L12 2zm0 11.6l1.8 3.1 3.6-2.1-3.6-2.1 1.8-3.1-1.8 3.1-3.6-2.1 3.6 2.1z" fill="#29B5E8"/></svg>`,
    dbt: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="5" fill="#FF694B"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-size="9" font-weight="700" font-family="Inter,sans-serif">dbt</text></svg>`,
    airflow: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#017CEE"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-size="7" font-weight="700" font-family="Inter,sans-serif">AF</text></svg>`,
    dagster: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#553BFF"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-size="7" font-weight="700" font-family="Inter,sans-serif">DG</text></svg>`,
    bigquery: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="5" fill="#4285F4"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-size="7" font-weight="700" font-family="Inter,sans-serif">BQ</text></svg>`,
    kafka: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#231F20"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-size="6" font-weight="700" font-family="Inter,sans-serif">Kafka</text></svg>`,
    fivetran: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="5" fill="#0073FF"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-size="6" font-weight="700" font-family="Inter,sans-serif">5tr</text></svg>`,
    postgres: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#336791"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-size="7" font-weight="700" font-family="Inter,sans-serif">PG</text></svg>`,
    supabase: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="5" fill="#3ECF8E"/><text x="12" y="15" text-anchor="middle" fill="#000" font-size="6" font-weight="700" font-family="Inter,sans-serif">SB</text></svg>`,
    databricks: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="5" fill="#FF3621"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-size="6" font-weight="700" font-family="Inter,sans-serif">DB</text></svg>`
  };

  document.querySelectorAll('[data-brand]').forEach(el => {
    const key = el.dataset.brand;
    if (LOGOS[key]) el.innerHTML = LOGOS[key];
  });
})();