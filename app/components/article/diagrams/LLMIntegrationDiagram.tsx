// Generated diagram — production LLM integration request flow.
// Pure SVG, site palette. Used by the sample blog article.
export default function LLMIntegrationDiagram() {
  return (
    <svg
      viewBox="0 0 760 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Production LLM flow: request validation, prompt assembly, model call with retries and timeout, structured-output parsing, and fallback handling"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <linearGradient id="llm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#5b21b6" />
        </linearGradient>
      </defs>

      {[
        { x: 20, label: 'Validate', sub: 'input + rate limit', fill: '#fff', tc: '#0f1724', sc: '#64748b' },
        { x: 165, label: 'Assemble', sub: 'prompt + context', fill: '#fff', tc: '#0f1724', sc: '#64748b' },
      ].map((s) => (
        <g key={s.label}>
          <rect x={s.x} y="60" width="120" height="58" rx="12" fill={s.fill} stroke="#cbd5e1" />
          <text x={s.x + 60} y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill={s.tc}>{s.label}</text>
          <text x={s.x + 60} y="103" textAnchor="middle" fontSize="9" fill={s.sc}>{s.sub}</text>
        </g>
      ))}

      {/* Model call */}
      <rect x="310" y="50" width="140" height="78" rx="12" fill="url(#llm)" />
      <text x="380" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Claude API</text>
      <text x="380" y="95" textAnchor="middle" fontSize="9" fill="#ddd6fe">timeout · retries</text>
      <text x="380" y="108" textAnchor="middle" fontSize="9" fill="#ddd6fe">tool / JSON mode</text>

      {/* Parse */}
      <rect x="475" y="60" width="120" height="58" rx="12" fill="#fff" stroke="#cbd5e1" />
      <text x="535" y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f1724">Parse</text>
      <text x="535" y="103" textAnchor="middle" fontSize="9" fill="#64748b">validate schema</text>

      {/* Deliver */}
      <rect x="620" y="60" width="120" height="58" rx="12" fill="#16A34A" />
      <text x="680" y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Deliver</text>
      <text x="680" y="103" textAnchor="middle" fontSize="9" fill="#dcfce7">typed result</text>

      {/* arrows */}
      {[140, 285, 450, 595].map((x, i) => (
        <line key={i} x1={x} y1="89" x2={x + 25} y2="89" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arr2)" />
      ))}

      {/* Fallback path */}
      <rect x="310" y="190" width="140" height="48" rx="12" fill="#fef2f2" stroke="#ef4444" strokeDasharray="5 4" />
      <text x="380" y="212" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">Fallback</text>
      <text x="380" y="227" textAnchor="middle" fontSize="9" fill="#dc2626">cached / default / queue</text>
      <line x1="380" y1="128" x2="380" y2="190" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="470" y="165" fontSize="9" fill="#b91c1c">on error / timeout</text>

      <defs>
        <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}
