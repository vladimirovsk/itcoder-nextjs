// Server Component — safe as a Suspense fallback for SSR streaming.
// No 'use client' needed: pure HTML/CSS, no hooks.

interface Props {
  cols?: number;
  cardHeight?: number;
  withTitle?: boolean;
}

export default function SectionSkeleton({ cols = 3, cardHeight = 220, withTitle = true }: Props) {
  return (
    <div style={{ padding: '2rem 0' }}>
      {withTitle && (
        <div
          className="skeleton-pulse"
          style={{ width: 180, height: 32, margin: '0 auto 2rem', borderRadius: 4 }}
        />
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: '1.5rem',
        }}
      >
        {Array.from({ length: cols }).map((_, i) => (
          <div
            key={i}
            className="skeleton-pulse"
            style={{ height: cardHeight, borderRadius: 12 }}
          />
        ))}
      </div>
    </div>
  );
}
