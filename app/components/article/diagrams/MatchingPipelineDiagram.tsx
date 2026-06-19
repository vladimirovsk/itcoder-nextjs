// Generated diagram — AI matching engine funnel/pipeline.
// Pure SVG, site palette. Shows event ingestion → scoring → ranked output.
export default function MatchingPipelineDiagram() {
  return (
    <svg
      viewBox="0 0 760 340"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Matching pipeline: events feed a behavioral profile store, a scoring engine filters and ranks candidates into a top-N result"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <linearGradient id="stage" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B5BDB" />
          <stop offset="100%" stopColor="#2f49b0" />
        </linearGradient>
      </defs>

      {/* Event sources */}
      <text x="90" y="28" textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">EVENTS</text>
      {['accepted', 'confirmed', 'cancelled', 'completed'].map((e, i) => (
        <g key={e}>
          <rect x="30" y={44 + i * 40} width="120" height="30" rx="8" fill="#fff" stroke="#cbd5e1" />
          <text x="90" y={63 + i * 40} textAnchor="middle" fontSize="11" fill="#334155">{e}</text>
          <line x1="150" y1={59 + i * 40} x2="210" y2="120" stroke="#cbd5e1" strokeWidth="1.5" />
        </g>
      ))}

      {/* Profile store */}
      <rect x="210" y="92" width="150" height="56" rx="12" fill="#0f1724" />
      <text x="285" y="116" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Behavioral Profiles</text>
      <text x="285" y="133" textAnchor="middle" fontSize="9" fill="#9fb4f5">EMA scoring · geo index</text>

      {/* Scoring engine */}
      <rect x="410" y="84" width="150" height="72" rx="12" fill="url(#stage)" />
      <text x="485" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Scoring Engine</text>
      <text x="485" y="129" textAnchor="middle" fontSize="9" fill="#c7d2fe">hard filters → soft score</text>
      <text x="485" y="143" textAnchor="middle" fontSize="9" fill="#c7d2fe">+ LLM signal</text>
      <line x1="360" y1="120" x2="410" y2="120" stroke="#94a3b8" strokeWidth="2" />

      {/* Funnel numbers */}
      <text x="640" y="60" textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">FUNNEL</text>
      {[
        { y: 76, w: 150, label: 'candidate pool', tone: '#e2e8f0', tc: '#475569' },
        { y: 110, w: 110, label: 'within range', tone: '#c7d2fe', tc: '#3730a3' },
        { y: 144, w: 70, label: 'top matches', tone: '#3B5BDB', tc: '#fff' },
      ].map((f) => (
        <g key={f.label}>
          <rect x={640 - f.w / 2} y={f.y} width={f.w} height="26" rx="6" fill={f.tone} />
          <text x="640" y={f.y + 17} textAnchor="middle" fontSize="10" fontWeight="600" fill={f.tc}>{f.label}</text>
        </g>
      ))}
      <line x1="560" y1="120" x2="565" y2="120" stroke="#94a3b8" strokeWidth="2" />

      {/* Output */}
      <rect x="250" y="230" width="260" height="48" rx="12" fill="#F97316" opacity="0.12" stroke="#F97316" />
      <text x="380" y="252" textAnchor="middle" fontSize="12" fontWeight="700" fill="#c2410c">Ranked recommendations → notifications</text>
      <text x="380" y="268" textAnchor="middle" fontSize="9" fill="#9a3412">push · email · personalized copy (LLM)</text>
      <line x1="485" y1="156" x2="420" y2="230" stroke="#F97316" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* latency note */}
      <text x="380" y="312" textAnchor="middle" fontSize="11" fontStyle="italic" fill="#64748b">
        manual scheduling (hours) → automated match (sub-second)
      </text>
    </svg>
  );
}
