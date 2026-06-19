// Generated architecture diagram — monolith → NestJS microservices.
// Pure SVG, no dependencies. Uses the site palette.
export default function MicroservicesDiagram() {
  return (
    <svg
      viewBox="0 0 760 360"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Microservices architecture: API gateway routing to independent NestJS services backed by their own databases and a message bus"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <linearGradient id="gw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2d5a" />
          <stop offset="100%" stopColor="#0f1724" />
        </linearGradient>
        <linearGradient id="svc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B5BDB" />
          <stop offset="100%" stopColor="#2f49b0" />
        </linearGradient>
      </defs>

      {/* Client */}
      <rect x="40" y="20" width="120" height="44" rx="10" fill="#fff" stroke="#cbd5e1" />
      <text x="100" y="47" textAnchor="middle" fontSize="14" fontWeight="600" fill="#0f1724">Clients</text>

      {/* Gateway */}
      <rect x="320" y="14" width="120" height="56" rx="12" fill="url(#gw)" />
      <text x="380" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">API Gateway</text>
      <text x="380" y="57" textAnchor="middle" fontSize="10" fill="#9fb4f5">auth · routing</text>

      {/* connector client -> gateway */}
      <line x1="160" y1="42" x2="320" y2="42" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arr)" />

      {/* Message bus */}
      <rect x="120" y="150" width="520" height="34" rx="8" fill="#F97316" opacity="0.12" stroke="#F97316" strokeDasharray="5 4" />
      <text x="380" y="172" textAnchor="middle" fontSize="12" fontWeight="700" fill="#c2410c">RabbitMQ — async settlement &amp; events</text>

      {/* Services */}
      {[
        { x: 60, label: 'Matching', db: 'in-memory' },
        { x: 250, label: 'Wallet', db: 'MariaDB' },
        { x: 440, label: 'Deposits', db: 'on-chain' },
        { x: 630, label: 'Market', db: 'Socket.IO' },
      ].map((s) => (
        <g key={s.label}>
          {/* gateway -> service */}
          <line x1="380" y1="70" x2={s.x + 35} y2="100" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x={s.x} y="100" width="90" height="46" rx="10" fill="url(#svc)" />
          <text x={s.x + 45} y="122" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">{s.label}</text>
          <text x={s.x + 45} y="137" textAnchor="middle" fontSize="9" fill="#c7d2fe">service</text>
          {/* service -> bus */}
          <line x1={s.x + 45} y1="146" x2={s.x + 45} y2="150" stroke="#F97316" strokeWidth="1.5" />
          {/* service -> db */}
          <line x1={s.x + 45} y1="184" x2={s.x + 45} y2="210" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
          <rect x={s.x + 2} y="210" width="86" height="34" rx="8" fill="#fff" stroke="#cbd5e1" />
          <text x={s.x + 45} y="231" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">{s.db}</text>
        </g>
      ))}

      {/* CI/CD footer */}
      <rect x="120" y="290" width="520" height="40" rx="10" fill="#f1f5f9" stroke="#e2e8f0" />
      <text x="380" y="315" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">
        CI/CD · containerized · independently deployable — zero-downtime cutover
      </text>

      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}
