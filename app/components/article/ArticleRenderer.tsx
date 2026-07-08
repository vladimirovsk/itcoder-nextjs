import { Box, Typography } from '@mui/material';
import { palette } from '@/app/theme/tokens';
import { ArticleBlock } from './types';
import { DIAGRAMS } from './diagrams';

const CALLOUT_STYLES: Record<
  string,
  { bg: string; border: string; label: string; labelColor: string }
> = {
  challenge: { bg: '#FFF7ED', border: '#F97316', label: 'Challenge', labelColor: '#c2410c' },
  result: { bg: '#F0FDF4', border: '#16A34A', label: 'Result', labelColor: '#15803d' },
  note: { bg: '#F0F9FF', border: '#0284C7', label: 'Note', labelColor: '#0369a1' },
};

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'heading':
      return (
        <Typography
          variant="h5"
          component="h2"
          id={block.id}
          sx={{ fontWeight: 800, color: 'heading', mt: 5, mb: 2, letterSpacing: '-0.01em', scrollMarginTop: '90px' }}
        >
          {block.text}
        </Typography>
      );

    case 'paragraph':
      return (
        <Typography variant="body1" sx={{ color: 'bodyText', lineHeight: 1.85, mb: 2.5, fontSize: '1.05rem' }}>
          {block.text}
        </Typography>
      );

    case 'list':
      return (
        <Box
          component={block.ordered ? 'ol' : 'ul'}
          sx={{ pl: 3, mb: 3, '& li': { color: 'bodyText', lineHeight: 1.8, mb: 1, fontSize: '1.02rem' } }}
        >
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </Box>
      );

    case 'code':
      return (
        <Box
          component="pre"
          sx={{
            backgroundColor: palette.slate[900],
            color: palette.slate[200],
            borderRadius: '12px',
            p: 2.5,
            mb: 3,
            overflowX: 'auto',
            fontSize: '0.85rem',
            lineHeight: 1.65,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            border: '1px solid #1e293b',
          }}
        >
          {block.lang && (
            <Box component="span" sx={{ display: 'block', color: palette.slate[500], fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, mb: 1 }}>
              {block.lang}
            </Box>
          )}
          <code>{block.code}</code>
        </Box>
      );

    case 'quote':
      return (
        <Box sx={{ borderLeft: '4px solid #3B5BDB', pl: 3, py: 0.5, my: 3 }}>
          <Typography sx={{ color: 'bodyText', fontStyle: 'italic', fontSize: '1.15rem', lineHeight: 1.7 }}>
            {block.text}
          </Typography>
        </Box>
      );

    case 'callout': {
      const s = CALLOUT_STYLES[block.variant];
      return (
        <Box className={`callout callout-${block.variant}`} sx={{ backgroundColor: s.bg, borderLeft: `4px solid ${s.border}`, borderRadius: '0 10px 10px 0', p: 2.5, my: 3 }}>
          <Typography sx={{ color: s.labelColor, fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1.5, mb: 0.5 }}>
            {s.label}
          </Typography>
          <Typography sx={{ color: 'heading', fontWeight: 700, mb: 0.5 }}>{block.title}</Typography>
          <Typography sx={{ color: 'bodyText', lineHeight: 1.75 }}>{block.text}</Typography>
        </Box>
      );
    }

    case 'metrics':
      return (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: `repeat(${Math.min(block.items.length, 4)}, 1fr)` },
            gap: 2,
            my: 4,
          }}
        >
          {block.items.map((m) => (
            <Box key={m.label} sx={{ backgroundColor: 'surfaceAlt', border: '1px solid', borderColor: 'hairline', borderRadius: '12px', p: 2.5, textAlign: 'center' }}>
              <Typography sx={{ color: 'primary.main', fontWeight: 800, fontSize: '1.6rem', lineHeight: 1.1 }}>{m.value}</Typography>
              <Typography sx={{ color: 'muted', fontSize: '0.8rem', mt: 0.5 }}>{m.label}</Typography>
            </Box>
          ))}
        </Box>
      );

    case 'diagram': {
      const Diagram = DIAGRAMS[block.id];
      if (!Diagram) return null;
      return (
        <Box sx={{ my: 4 }}>
          <Box sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: 'hairline', borderRadius: '14px', p: { xs: 2, sm: 3 } }}>
            <Diagram />
          </Box>
          {block.caption && (
            <Typography sx={{ color: 'muted', fontSize: '0.82rem', textAlign: 'center', mt: 1.5, fontStyle: 'italic' }}>
              {block.caption}
            </Typography>
          )}
        </Box>
      );
    }

    default:
      return null;
  }
}

export default function ArticleRenderer({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </>
  );
}
