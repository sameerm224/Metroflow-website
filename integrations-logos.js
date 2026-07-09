(function () {
  const BASE = 'assets/integrations/';

  /* Local SVG marks + brand typography — no CDN dependency */
  const BRANDS = {
    Airflow: { icon: 'apacheairflow.svg', color: '#017CEE', cls: 'brand-airflow' },
    Dagster: { icon: 'dagster.svg', color: '#4F43DD', cls: 'brand-dagster' },
    Prefect: { icon: 'prefect.svg', color: '#2D6FF6', cls: 'brand-prefect' },
    'Apache Spark': { icon: 'spark.svg', color: '#E25A1C', cls: 'brand-spark' },
    dbt: { wordmark: true, color: '#FF694B', cls: 'brand-dbt', label: 'dbt' },
    SQLMesh: { icon: 'sqlmesh.svg', color: '#22E59A', cls: 'brand-sqlmesh' },
    Dataform: { icon: 'dataform.svg', color: '#4285F4', cls: 'brand-dataform' },
    Coalesce: { icon: 'coalesce.svg', color: '#5B4FE8', cls: 'brand-coalesce' },
    Snowflake: { icon: 'snowflake.svg', color: '#29B5E8', cls: 'brand-snowflake' },
    BigQuery: { icon: 'bigquery.svg', color: '#669DF6', cls: 'brand-bigquery' },
    Databricks: { icon: 'databricks.svg', color: '#FF3621', cls: 'brand-databricks' },
    Redshift: { icon: 'redshift.svg', color: '#8C4FFF', cls: 'brand-redshift' },
    'Amazon Athena': { icon: 'athena.svg', color: '#FF9900', cls: 'brand-athena' },
    Postgres: { icon: 'postgres.svg', color: '#4169E1', cls: 'brand-postgres' },
    Supabase: { icon: 'supabase.svg', color: '#3FCF8E', cls: 'brand-supabase' },
    MySQL: { icon: 'mysql.svg', color: '#4479A1', cls: 'brand-mysql' },
    MongoDB: { icon: 'mongodb.svg', color: '#47A248', cls: 'brand-mongodb' },
    ClickHouse: { icon: 'clickhouse.svg', color: '#FFCC01', cls: 'brand-clickhouse' },
    Fivetran: { icon: 'fivetran.svg', color: '#0073FF', cls: 'brand-fivetran' },
    Airbyte: { icon: 'airbyte.svg', color: '#6554FF', cls: 'brand-airbyte' },
    Stitch: { icon: 'stitch.svg', color: '#FF6D70', cls: 'brand-stitch' },
    Kafka: { icon: 'kafka.svg', color: '#231F20', cls: 'brand-kafka', invertDark: true },
    Confluent: { icon: 'confluent.svg', color: '#4299FF', cls: 'brand-confluent' },
    'Apache Flink': { icon: 'flink.svg', color: '#E6526F', cls: 'brand-flink' },
    Looker: { icon: 'looker.svg', color: '#4285F4', cls: 'brand-looker' },
    Tableau: { icon: 'tableau.svg', color: '#E97627', cls: 'brand-tableau' },
    Metabase: { icon: 'metabase.svg', color: '#509EE3', cls: 'brand-metabase' },
    'Apache Atlas': { icon: 'atlas.svg', color: '#00A4E4', cls: 'brand-atlas' },
    Collibra: { icon: 'collibra.svg', color: '#00B2A9', cls: 'brand-collibra' },
    'Monte Carlo': { icon: 'montecarlo.svg', color: '#6C2BD9', cls: 'brand-montecarlo' },
    'Great Expectations': { icon: 'greatexpectations.svg', color: '#FF6310', cls: 'brand-gx' },
    GitHub: { icon: 'github.svg', color: '#181717', cls: 'brand-github', invertDark: true },
    GitLab: { icon: 'gitlab.svg', color: '#FC6D26', cls: 'brand-gitlab' },
    Kubernetes: { icon: 'k8s.svg', color: '#326CE5', cls: 'brand-k8s' },
    Docker: { icon: 'docker.svg', color: '#2496ED', cls: 'brand-docker' },
    S3: { icon: 's3.svg', color: '#569A31', cls: 'brand-s3' },
    GCS: { icon: 'gcs.svg', color: '#4285F4', cls: 'brand-gcs' },
    'Azure Blob': { icon: 'azure.svg', color: '#0078D4', cls: 'brand-azure' },
    Trino: { icon: 'trino.svg', color: '#DD00A9', cls: 'brand-trino' },
    Presto: { icon: 'presto.svg', color: '#5890FF', cls: 'brand-presto' }
  };

  function renderIcon(b) {
    const invert = b.invertDark ? ' int-icon-invert' : '';
    return `<img class="int-brand-img${invert}" src="${BASE}${b.icon}" alt="" width="32" height="32" loading="lazy" decoding="async"/>`;
  }

  function renderMark(name, b) {
    const label = b.label || name;
    const wordmarkOnly = b.wordmark;

    if (wordmarkOnly) {
      return `<div class="int-brand-mark wordmark-only">
        <span class="int-brand-name ${b.cls}">${label}</span>
      </div>`;
    }

    return `<div class="int-brand-mark">
      ${renderIcon(b)}
      <span class="int-brand-name ${b.cls}">${label}</span>
    </div>`;
  }

  function fallback(name) {
    return `<div class="int-brand-mark int-brand-fallback">
      <span class="int-brand-letter">${name.charAt(0)}</span>
      <span class="int-brand-name">${name}</span>
    </div>`;
  }

  window.MF_getIntegrationLogo = function (name) {
    const b = BRANDS[name];
    if (!b) return fallback(name);
    return renderMark(name, b);
  };
})();