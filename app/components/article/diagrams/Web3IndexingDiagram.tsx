// Generated diagram — Web3 backend: on-chain event indexing + transaction signing.
// Pure SVG, site palette. Two ramps: blue = backend, green = on-chain.
export default function Web3IndexingDiagram() {
  return (
    <svg
      viewBox="0 0 760 370"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Web3 backend: EVM nodes stream contract events over WebSocket to a reorg-safe listener, which indexes them into a database exposed via REST and WebSocket APIs; a separate path builds, signs and broadcasts transactions back to the nodes"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <linearGradient id="svc3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B5BDB" />
          <stop offset="100%" stopColor="#2f49b0" />
        </linearGradient>
        <linearGradient id="chain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="arr3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" />
        </marker>
      </defs>

      {/* Legend */}
      <rect x="560" y="14" width="12" height="12" rx="3" fill="#16A34A" />
      <text x="578" y="24" fontSize="10" fill="#64748b">on-chain</text>
      <rect x="650" y="14" width="12" height="12" rx="3" fill="#3B5BDB" />
      <text x="668" y="24" fontSize="10" fill="#64748b">backend</text>

      {/* EVM nodes */}
      <rect x="30" y="70" width="130" height="76" rx="12" fill="url(#chain)" />
      <text x="95" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">EVM Nodes</text>
      <text x="95" y="116" textAnchor="middle" fontSize="10" fill="#bbf7d0">Ethereum · BSC</text>
      <text x="95" y="131" textAnchor="middle" fontSize="9" fill="#bbf7d0">WS + HTTP providers</text>

      {/* Contracts chip */}
      <rect x="40" y="160" width="110" height="30" rx="8" fill="#dcfce7" stroke="#16A34A" />
      <text x="95" y="180" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">Smart contracts</text>

      {/* Event listener */}
      <rect x="220" y="74" width="140" height="68" rx="12" fill="url(#svc3)" />
      <text x="290" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Event Listener</text>
      <text x="290" y="117" textAnchor="middle" fontSize="9" fill="#c7d2fe">reorg-safe · backfill</text>
      <text x="290" y="130" textAnchor="middle" fontSize="9" fill="#c7d2fe">idempotent</text>
      <line x1="160" y1="108" x2="220" y2="108" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arr3)" />
      <text x="190" y="100" textAnchor="middle" fontSize="8" fill="#64748b">events</text>

      {/* Indexed DB */}
      <rect x="420" y="78" width="120" height="60" rx="12" fill="#fff" stroke="#cbd5e1" />
      <text x="480" y="103" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f1724">Indexed DB</text>
      <text x="480" y="119" textAnchor="middle" fontSize="9" fill="#64748b">PostgreSQL</text>
      <line x1="360" y1="108" x2="420" y2="108" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arr3)" />

      {/* Web3 API */}
      <rect x="600" y="74" width="130" height="68" rx="12" fill="url(#svc3)" />
      <text x="665" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Web3 API</text>
      <text x="665" y="117" textAnchor="middle" fontSize="9" fill="#c7d2fe">REST (Swagger)</text>
      <text x="665" y="130" textAnchor="middle" fontSize="9" fill="#c7d2fe">+ WebSocket</text>
      <line x1="540" y1="108" x2="600" y2="108" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arr3)" />

      {/* Clients */}
      <rect x="600" y="200" width="130" height="40" rx="10" fill="#fff" stroke="#cbd5e1" />
      <text x="665" y="225" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0f1724">dApp / Clients</text>
      <line x1="665" y1="142" x2="665" y2="200" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arr3)" />

      {/* Write path — sign & broadcast */}
      <rect x="220" y="250" width="180" height="56" rx="12" fill="#FFF7ED" stroke="#F97316" strokeDasharray="5 4" />
      <text x="310" y="274" textAnchor="middle" fontSize="12" fontWeight="700" fill="#c2410c">Build · Sign · Broadcast</text>
      <text x="310" y="291" textAnchor="middle" fontSize="9" fill="#9a3412">key mgmt · signed tx</text>

      {/* API -> signer */}
      <line x1="600" y1="130" x2="400" y2="262" stroke="#F97316" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="470" y="210" fontSize="9" fill="#c2410c">withdraw / mint</text>

      {/* signer -> nodes */}
      <line x1="220" y1="278" x2="95" y2="146" stroke="#F97316" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arr3)" />
      <text x="120" y="250" fontSize="9" fill="#c2410c">signed tx</text>

      {/* footer */}
      <rect x="30" y="330" width="700" height="28" rx="8" fill="#f1f5f9" stroke="#e2e8f0" />
      <text x="380" y="349" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">
        Multi-network · provider failover · missed-block backfill — no event ever lost
      </text>
    </svg>
  );
}
