import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Box, Chip, Container, Divider, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CASE_STUDIES, getCaseStudy } from '../content';
import ArticleRenderer from '@/app/components/article/ArticleRenderer';
import { DIAGRAMS } from '@/app/components/article/diagrams';
import { palette } from '@/app/theme/tokens';

const BASE = 'https://www.itcoder.ca';

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  const url = `${BASE}/cases/${c.slug}`;
  return {
    // The cases/ layout exports a static string title, which resets the root
    // title.template for this nested segment — so the brand must be explicit here.
    title: `${c.title} — Case Study | IT CODER`,
    description: c.excerpt,
    keywords: c.tags.join(', '),
    alternates: { canonical: url },
    openGraph: {
      title: `${c.title} — Case Study | IT CODER`,
      description: c.excerpt,
      url,
      siteName: 'IT CODER',
      locale: 'en_CA',
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const HeroDiagram = c.heroDiagram ? DIAGRAMS[c.heroDiagram] : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    description: c.excerpt,
    datePublished: c.date,
    author: { '@type': 'Person', name: 'Serhii Vladimirov', url: `${BASE}/about` },
    publisher: { '@type': 'Organization', name: 'IT CODER', url: BASE },
    mainEntityOfPage: `${BASE}/cases/${c.slug}`,
    keywords: c.tags.join(', '),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <Box sx={{ backgroundColor: palette.slate[900], py: { xs: 6, md: 8 }, px: 2 }}>
        <Container maxWidth="md">
          <Link href="/cases" style={{ color: '#9fb4f5', textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <ArrowBackIcon sx={{ fontSize: 16 }} /> Back to cases
          </Link>
          <Typography variant="overline" sx={{ color: '#4f8ef7', letterSpacing: 3, fontWeight: 700, display: 'block', mt: 2 }}>
            Case Study
          </Typography>
          <Typography variant="h3" component="h1" sx={{ color: '#fff', fontWeight: 800, mt: 1, mb: 2, lineHeight: 1.2 }}>
            {c.title}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.7 }}>
            {c.excerpt}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 5, md: 7 } }}>
        {/* Meta bar */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mb: 4 }}>
          <Box>
            <Typography sx={{ color: 'muted', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, mb: 0.5 }}>
              Client
            </Typography>
            <Typography sx={{ color: 'heading', fontWeight: 600 }}>{c.client}</Typography>
          </Box>
          <Box>
            <Typography sx={{ color: 'muted', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, mb: 0.5 }}>
              My role
            </Typography>
            <Typography sx={{ color: 'heading', fontWeight: 600 }}>{c.role}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
          {c.stack.map((s) => (
            <Chip key={s} label={s} size="small" sx={{ backgroundColor: palette.brand[50], color: '#3730a3', fontWeight: 600 }} />
          ))}
        </Box>

        {HeroDiagram && (
          <Box sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: 'hairline', borderRadius: '14px', p: { xs: 2, sm: 3 }, mb: 5 }}>
            <HeroDiagram />
          </Box>
        )}

        <Divider sx={{ mb: 4 }} />

        <ArticleRenderer blocks={c.body} />

        {/* CTA */}
        <Box sx={{ mt: 6, p: { xs: 3, sm: 4 }, borderRadius: '14px', background: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)' }}>
          <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.25rem', mb: 1 }}>
            Need something similar built?
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.85)', mb: 2.5, lineHeight: 1.7 }}>
            I design and build backend systems like this from architecture to production. Tell me about your project.
          </Typography>
          <Link href="/#contact" style={{ display: 'inline-block', backgroundColor: '#fff', color: '#0284c7', fontWeight: 700, padding: '10px 22px', borderRadius: '8px', textDecoration: 'none' }}>
            Get in touch →
          </Link>
        </Box>
      </Container>
    </>
  );
}
