(function () {
  const MONO = 'JetBrains Mono, monospace';
  const DISPLAY = 'Sora, Inter, sans-serif';

  const DIAGRAMS = {
    'generic-vs-metroflow': () => `
      <span class="diagram-label">Generic AI vs Metroflow</span>
      <svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" aria-label="Comparison: generic copilot guesses vs Metroflow lineage">
        <rect width="560" height="320" fill="var(--bg)"/>
        <text class="illus-fade" style="--d:0.05s" x="140" y="36" text-anchor="middle" fill="#F59E0B" font-size="11" font-family="${MONO}">GENERIC COPILOT</text>
        <text class="illus-fade" style="--d:0.05s" x="420" y="36" text-anchor="middle" fill="#22E59A" font-size="11" font-family="${MONO}">METROFLOW</text>
        <line class="illus-fade" style="--d:0.1s" x1="280" y1="48" x2="280" y2="300" stroke="var(--border)" stroke-width="1"/>
        <g class="illus-fade" style="--d:0.15s">
          <rect x="36" y="56" width="208" height="108" rx="12" fill="rgba(245,158,11,0.06)" stroke="#F59E0B" stroke-opacity="0.4"/>
          <text x="140" y="88" text-anchor="middle" fill="var(--text-muted)" font-size="11">"What depends on fct_revenue?"</text>
          <text x="140" y="112" text-anchor="middle" fill="#F59E0B" font-size="10" font-family="${MONO}">→ guesses table names</text>
          <text x="140" y="134" text-anchor="middle" fill="var(--text-faint)" font-size="9" font-family="${MONO}">no manifest · no lineage</text>
          <text x="140" y="156" text-anchor="middle" fill="var(--text-faint)" font-size="9" font-family="${MONO}">hallucinated downstream list</text>
        </g>
        <g class="illus-fade" style="--d:0.25s">
          <rect x="316" y="56" width="208" height="228" rx="12" fill="rgba(34,229,154,0.05)" stroke="#22E59A" stroke-opacity="0.45"/>
          <circle cx="420" cy="96" r="24" fill="rgba(34,229,154,0.15)" stroke="#22E59A" stroke-width="1.5"/>
          <text x="420" y="101" text-anchor="middle" fill="#22E59A" font-size="14" font-weight="700" font-family="${DISPLAY}">M</text>
          <rect x="336" y="132" width="72" height="30" rx="7" class="illus-node" style="--d:0.45s" fill="var(--surface-2)" stroke="var(--border-strong)"/>
          <text x="372" y="151" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-family="${MONO}">stg_orders</text>
          <rect x="432" y="132" width="72" height="30" rx="7" class="illus-node" style="--d:0.55s" fill="rgba(34,229,154,0.12)" stroke="#22E59A"/>
          <text x="468" y="151" text-anchor="middle" fill="#22E59A" font-size="9" font-family="${MONO}">fct_revenue</text>
          <rect x="336" y="178" width="72" height="30" rx="7" class="illus-node" style="--d:0.65s" fill="var(--surface-2)" stroke="var(--border-strong)"/>
          <text x="372" y="197" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-family="${MONO}">raw_stripe</text>
          <rect x="432" y="178" width="72" height="30" rx="7" class="illus-node" style="--d:0.75s" fill="rgba(139,92,246,0.1)" stroke="#8B5CF6"/>
          <text x="468" y="197" text-anchor="middle" fill="#8B5CF6" font-size="9" font-family="${MONO}">exec_dash</text>
          <path class="illus-draw" style="--d:0.85s" d="M372 147 L432 147" stroke="#22E59A" stroke-width="1.8" fill="none"/>
          <path class="illus-draw" style="--d:0.95s" d="M372 193 L420 162" stroke="#22E59A" stroke-opacity="0.7" stroke-width="1.5" fill="none"/>
          <path class="illus-draw" style="--d:1.05s" d="M468 162 L468 178" stroke="#8B5CF6" stroke-width="1.5" fill="none"/>
          <text x="420" y="238" text-anchor="middle" fill="#22E59A" font-size="10" font-family="${MONO}">3 downstream · manifest-grounded</text>
        </g>
        <circle r="4" fill="#22E59A" opacity="0.9">
          <animateMotion dur="2.8s" repeatCount="indefinite" begin="indefinite" path="M372,193 L420,162 L468,162 L468,178"/>
        </circle>
      </svg>`,

    'metadata-flow': () => `
      <span class="diagram-label">Architecture · metadata flow</span>
      <svg viewBox="0 0 560 340" xmlns="http://www.w3.org/2000/svg" aria-label="Sources connect to Metroflow semantic graph and outputs">
        <defs><linearGradient id="mfHub" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#22E59A"/><stop offset="100%" stop-color="#10B981"/></linearGradient></defs>
        <rect width="560" height="340" fill="var(--bg)"/>
        <g class="illus-fade" style="--d:0.1s"><rect x="32" y="52" width="120" height="52" rx="9" fill="rgba(41,181,232,0.08)" stroke="#29B5E8" stroke-opacity="0.55"/><text x="92" y="76" text-anchor="middle" fill="#29B5E8" font-size="11" font-family="${MONO}">Snowflake</text><text x="92" y="92" text-anchor="middle" fill="var(--text-faint)" font-size="8" font-family="${MONO}">schemas</text></g>
        <g class="illus-fade" style="--d:0.2s"><rect x="32" y="132" width="120" height="52" rx="9" fill="rgba(255,105,75,0.08)" stroke="#FF694B" stroke-opacity="0.55"/><text x="92" y="156" text-anchor="middle" fill="#FF694B" font-size="11" font-family="${MONO}">dbt</text><text x="92" y="172" text-anchor="middle" fill="var(--text-faint)" font-size="8" font-family="${MONO}">manifest</text></g>
        <g class="illus-fade" style="--d:0.3s"><rect x="32" y="212" width="120" height="52" rx="9" fill="rgba(1,124,238,0.08)" stroke="#017CEE" stroke-opacity="0.55"/><text x="92" y="236" text-anchor="middle" fill="#017CEE" font-size="11" font-family="${MONO}">Airflow</text><text x="92" y="252" text-anchor="middle" fill="var(--text-faint)" font-size="8" font-family="${MONO}">DAGs</text></g>
        <g class="illus-fade" style="--d:0.45s"><rect x="210" y="118" width="140" height="104" rx="16" fill="rgba(34,229,154,0.1)" stroke="url(#mfHub)" stroke-width="2"/><text x="280" y="158" text-anchor="middle" fill="#22E59A" font-size="14" font-weight="700" font-family="${DISPLAY}">Metroflow</text><text x="280" y="178" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-family="${MONO}">semantic graph</text><text x="280" y="198" text-anchor="middle" fill="#22E59A" font-size="9" font-family="${MONO}">metadata only</text></g>
        <path class="illus-draw" style="--d:0.55s" d="M152 78 L210 155" stroke="#22E59A" stroke-opacity="0.55" stroke-width="1.6" fill="none"/>
        <path class="illus-draw" style="--d:0.65s" d="M152 158 L210 170" stroke="#22E59A" stroke-opacity="0.55" stroke-width="1.6" fill="none"/>
        <path class="illus-draw" style="--d:0.75s" d="M152 238 L210 185" stroke="#22E59A" stroke-opacity="0.55" stroke-width="1.6" fill="none"/>
        <g class="illus-fade" style="--d:0.85s"><rect x="400" y="56" width="128" height="40" rx="8" fill="var(--surface)" stroke="var(--border)"/><text x="464" y="81" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-family="${MONO}">Living catalog</text></g>
        <g class="illus-fade" style="--d:0.95s"><rect x="400" y="112" width="128" height="40" rx="8" fill="rgba(139,92,246,0.08)" stroke="#8B5CF6" stroke-opacity="0.45"/><text x="464" y="137" text-anchor="middle" fill="#8B5CF6" font-size="9" font-family="${MONO}">Lineage graph</text></g>
        <g class="illus-fade" style="--d:1.05s"><rect x="400" y="168" width="128" height="40" rx="8" fill="rgba(34,229,154,0.08)" stroke="#22E59A" stroke-opacity="0.45"/><text x="464" y="193" text-anchor="middle" fill="#22E59A" font-size="9" font-family="${MONO}">Stack-aware AI</text></g>
        <g class="illus-fade" style="--d:1.15s"><rect x="400" y="224" width="128" height="40" rx="8" fill="rgba(245,158,11,0.06)" stroke="#F59E0B" stroke-opacity="0.4"/><text x="464" y="249" text-anchor="middle" fill="#F59E0B" font-size="9" font-family="${MONO}">Canonical metrics</text></g>
        <path class="illus-draw" style="--d:1.25s" d="M350 155 L400 76" stroke="#22E59A" stroke-opacity="0.4" stroke-width="1.4" fill="none"/>
        <path class="illus-draw" style="--d:1.3s" d="M350 170 L400 132" stroke="#22E59A" stroke-opacity="0.4" stroke-width="1.4" fill="none"/>
        <path class="illus-draw" style="--d:1.35s" d="M350 185 L400 188" stroke="#22E59A" stroke-opacity="0.4" stroke-width="1.4" fill="none"/>
        <path class="illus-draw" style="--d:1.4s" d="M350 200 L400 244" stroke="#22E59A" stroke-opacity="0.4" stroke-width="1.4" fill="none"/>
        <text class="illus-fade" style="--d:1.5s" x="280" y="318" text-anchor="middle" fill="var(--text-faint)" font-size="9" font-family="${MONO}">connect → crawl → link → query · no data movement</text>
        <circle r="3.5" fill="#22E59A"><animateMotion dur="3.2s" repeatCount="indefinite" begin="indefinite" path="M152,158 L210,170 L350,170 L400,132"/></circle>
      </svg>`,

    'lineage-dag': () => `
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" aria-label="Lineage DAG from raw source to BI dashboard">
        <rect width="400" height="220" fill="transparent"/>
        <g class="illus-fade" style="--d:0.1s"><rect x="8" y="86" width="88" height="32" rx="7" fill="var(--surface-2)" stroke="var(--border-strong)"/><text x="52" y="106" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-family="${MONO}">raw_stripe</text></g>
        <g class="illus-fade" style="--d:0.25s"><rect x="128" y="86" width="88" height="32" rx="7" fill="var(--surface-2)" stroke="var(--border-strong)"/><text x="172" y="106" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-family="${MONO}">stg_orders</text></g>
        <g class="illus-fade" style="--d:0.4s"><rect x="248" y="86" width="88" height="32" rx="7" fill="rgba(34,229,154,0.12)" stroke="#22E59A" stroke-width="1.5"/><text x="292" y="106" text-anchor="middle" fill="#22E59A" font-size="9" font-family="${MONO}">fct_revenue</text></g>
        <g class="illus-fade" style="--d:0.55s"><rect x="328" y="86" width="64" height="32" rx="7" fill="rgba(139,92,246,0.1)" stroke="#8B5CF6"/><text x="360" y="106" text-anchor="middle" fill="#8B5CF6" font-size="9" font-family="${MONO}">exec_dash</text></g>
        <path class="illus-draw" style="--d:0.65s" d="M96 102 H128" stroke="#22E59A" stroke-width="1.6" fill="none"/>
        <path class="illus-draw" style="--d:0.75s" d="M216 102 H248" stroke="#22E59A" stroke-width="1.6" fill="none"/>
        <path class="illus-draw" style="--d:0.85s" d="M336 102 H328" stroke="#8B5CF6" stroke-width="1.6" fill="none"/>
        <text class="illus-fade" style="--d:1s" x="200" y="168" text-anchor="middle" fill="var(--text-faint)" font-size="9" font-family="${MONO}">auto-discovered · always current</text>
        <circle r="3" fill="#22E59A"><animateMotion dur="2.4s" repeatCount="indefinite" begin="indefinite" path="M96,102 L128,102 L216,102 L248,102 L336,102"/></circle>
      </svg>`,

    'self-host-vpc': () => `
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" aria-label="Self-hosted Metroflow inside your VPC">
        <rect width="400" height="220" fill="transparent"/>
        <rect class="illus-draw" style="--d:0.1s" x="40" y="24" width="320" height="172" rx="14" fill="none" stroke="#22E59A" stroke-opacity="0.5" stroke-width="1.5" stroke-dasharray="6 5"/>
        <text class="illus-fade" style="--d:0.2s" x="200" y="48" text-anchor="middle" fill="#22E59A" font-size="10" font-family="${MONO}">your VPC · metadata only</text>
        <g class="illus-fade" style="--d:0.35s"><rect x="72" y="78" width="120" height="40" rx="9" fill="rgba(34,229,154,0.1)" stroke="#22E59A"/><text x="132" y="103" text-anchor="middle" fill="#22E59A" font-size="11" font-family="${DISPLAY}">Metroflow</text></g>
        <g class="illus-fade" style="--d:0.5s"><rect x="228" y="78" width="120" height="40" rx="9" fill="var(--surface-2)" stroke="var(--border-strong)"/><text x="288" y="103" text-anchor="middle" fill="var(--text)" font-size="10" font-family="${MONO}">Warehouse</text></g>
        <path class="illus-draw" style="--d:0.65s" d="M192 98 H228" stroke="#22E59A" stroke-width="1.6" fill="none"/>
        <g class="illus-fade" style="--d:0.8s"><rect x="120" y="140" width="160" height="28" rx="7" fill="var(--surface)" stroke="var(--border)"/><text x="200" y="158" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-family="${MONO}">Apache 2.0 · Docker · audit logs</text></g>
        <circle r="3" fill="#22E59A"><animateMotion dur="2s" repeatCount="indefinite" begin="indefinite" path="M192,98 L228,98"/></circle>
      </svg>`
  };

  document.querySelectorAll('[data-diagram]').forEach(el => {
    const key = el.dataset.diagram;
    if (DIAGRAMS[key]) el.innerHTML = DIAGRAMS[key]();
  });

  document.querySelectorAll('[data-diagram-inline]').forEach(el => {
    const key = el.dataset.diagramInline;
    if (DIAGRAMS[key]) el.innerHTML = DIAGRAMS[key]();
  });
})();