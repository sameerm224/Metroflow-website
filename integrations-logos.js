(function () {
  /* Official brand marks via Simple Icons CDN + brand typography */
  const BRANDS = {
    Airflow: { slug: 'apacheairflow', color: '017CEE' },
    Dagster: { slug: 'dagster', color: '553BFF' },
    Prefect: { slug: 'prefect', color: '2D6FF6' },
    'Apache Spark': { slug: 'apachespark', color: 'E25A1C' },
    dbt: { slug: 'dbt', color: 'FF694B' },
    SQLMesh: { slug: 'sqlmesh', color: '22E59A' },
    Dataform: { slug: 'googlecloud', color: '4285F4' },
    Coalesce: { slug: 'coalesce', color: '5B4FE8' },
    Snowflake: { slug: 'snowflake', color: '29B5E8' },
    BigQuery: { slug: 'googlebigquery', color: '669DF6' },
    Databricks: { slug: 'databricks', color: 'FF3621' },
    Redshift: { slug: 'amazonredshift', color: '8C4FFF' },
    'Amazon Athena': { slug: 'amazonaws', color: 'FF9900' },
    Postgres: { slug: 'postgresql', color: '4169E1' },
    Supabase: { slug: 'supabase', color: '3FCF8E' },
    MySQL: { slug: 'mysql', color: '4479A1' },
    MongoDB: { slug: 'mongodb', color: '47A248' },
    ClickHouse: { slug: 'clickhouse', color: 'FFCC01' },
    Fivetran: { slug: 'fivetran', color: '0073FF' },
    Airbyte: { slug: 'airbyte', color: '6554FF' },
    Stitch: { slug: 'talend', color: 'FF6D70' },
    Kafka: { slug: 'apachekafka', color: 'FFFFFF' },
    Confluent: { slug: 'confluent', color: '4299FF' },
    'Apache Flink': { slug: 'apacheflink', color: 'E6526F' },
    Looker: { slug: 'looker', color: '4285F4' },
    Tableau: { slug: 'tableau', color: 'E97627' },
    Metabase: { slug: 'metabase', color: '509EE3' },
    'Apache Atlas': { slug: 'apache', color: '00A4E4' },
    Collibra: { slug: 'collibra', color: '00B2A9' },
    'Monte Carlo': { slug: 'montecarlo', color: '6C2BD9' },
    'Great Expectations': { slug: 'greatexpectations', color: 'FF6310' },
    GitHub: { slug: 'github', color: 'FFFFFF' },
    GitLab: { slug: 'gitlab', color: 'FC6D26' },
    Kubernetes: { slug: 'kubernetes', color: '326CE5' },
    Docker: { slug: 'docker', color: '2496ED' },
    S3: { slug: 'amazons3', color: '569A31' },
    GCS: { slug: 'googlecloud', color: '4285F4' },
    'Azure Blob': { slug: 'microsoftazure', color: '0078D4' },
    Trino: { slug: 'trino', color: 'DD00A9' },
    Presto: { slug: 'presto', color: '5890FF' }
  };

  const FONT = {
    dbt: 'font-weight:700;font-size:17px;letter-spacing:-0.03em',
    Snowflake: 'font-weight:600;font-size:15px;letter-spacing:-0.02em',
    Fivetran: 'font-weight:700;font-size:15px',
    Databricks: 'font-weight:700;font-size:14px;letter-spacing:-0.02em',
    Tableau: 'font-weight:700;font-size:15px',
    Kafka: 'font-weight:600;font-size:14px',
    GitHub: 'font-weight:600;font-size:15px'
  };

  function brandRow(name, slug, color) {
    const hex = color.startsWith('#') ? color.slice(1) : color;
    const style = FONT[name] || 'font-weight:600;font-size:14px;letter-spacing:-0.02em';
    return `<div class="int-brand-row">
      <img class="int-brand-img" src="https://cdn.simpleicons.org/${slug}/${hex}" alt="" width="32" height="32" loading="lazy" decoding="async" onerror="this.style.display='none'"/>
      <span class="int-brand-name" style="color:#${hex};${style}">${name}</span>
    </div>`;
  }

  function fallback(name) {
    return `<div class="int-brand-row int-brand-fallback">
      <span class="int-brand-letter">${name.charAt(0)}</span>
      <span class="int-brand-name">${name}</span>
    </div>`;
  }

  window.MF_getIntegrationLogo = function (name) {
    const b = BRANDS[name];
    if (!b) return fallback(name);
    return brandRow(name, b.slug, b.color);
  };
})();