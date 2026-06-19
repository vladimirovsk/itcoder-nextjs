import type { Metadata } from 'next';
import Link from 'next/link';
import { Box, Chip, Container, Typography } from '@mui/material';
import { BLOG_POSTS } from './content';
import { DIAGRAMS } from '@/app/components/article/diagrams';

const BASE = 'https://www.itcoder.ca';

export const metadata: Metadata = {
  title: 'Blog — Backend & AI Engineering Notes | IT CODER',
  description:
    'Practical articles on NestJS microservices, AI/LLM integration, event-driven architecture, and production backend engineering — written by a senior backend engineer in Calgary.',
  keywords:
    'NestJS blog, backend engineering articles, AI integration tutorial, LLM production, microservices architecture blog, Calgary developer blog',
  alternates: { canonical: `${BASE}/blog` },
  openGraph: {
    title: 'Blog — Backend & AI Engineering Notes | IT CODER',
    description:
      'Practical articles on NestJS microservices, AI/LLM integration, and production backend engineering.',
    url: `${BASE}/blog`,
    siteName: 'IT CODER',
    locale: 'en_CA',
    type: 'website',
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function BlogIndex() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'IT CODER Blog',
    url: `${BASE}/blog`,
    blogPost: BLOG_POSTS.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      url: `${BASE}/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Box sx={{ backgroundColor: '#0f1724', py: { xs: 6, md: 8 }, px: 2, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="overline" sx={{ color: '#4f8ef7', letterSpacing: 4, fontWeight: 700 }}>
            Blog
          </Typography>
          <Typography variant="h3" component="h1" sx={{ color: '#fff', fontWeight: 800, mt: 1, mb: 2, lineHeight: 1.2 }}>
            Backend &amp; AI Engineering Notes
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Practical write-ups on the things I build — NestJS microservices, AI/LLM integration, and shipping reliable backends to production.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {BLOG_POSTS.map((p) => {
            const Diagram = p.heroDiagram ? DIAGRAMS[p.heroDiagram] : null;
            return (
              <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '240px 1fr' },
                    gap: 3,
                    p: { xs: 2, sm: 3 },
                    border: '1px solid #F1F5F9',
                    borderRadius: '16px',
                    boxShadow: '0px 1px 4px rgba(0,0,0,0.06)',
                    transition: 'box-shadow 0.25s, transform 0.25s',
                    '&:hover': { boxShadow: '0px 8px 24px rgba(59,91,219,0.12)', transform: 'translateY(-3px)' },
                  }}
                >
                  {Diagram && (
                    <Box sx={{ backgroundColor: '#f8fafc', borderRadius: '12px', p: 1.5, display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
                      <Diagram />
                    </Box>
                  )}
                  <Box>
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 1, color: '#94a3b8', fontSize: '0.8rem' }}>
                      <span>{formatDate(p.date)}</span>
                      <span>·</span>
                      <span>{p.readingMinutes} min read</span>
                    </Box>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 800, color: '#0f1724', mb: 1, lineHeight: 1.3 }}>
                      {p.title}
                    </Typography>
                    <Typography sx={{ color: '#475569', lineHeight: 1.7, mb: 1.5 }}>{p.excerpt}</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {p.tags.map((t) => (
                        <Chip key={t} label={t} size="small" sx={{ backgroundColor: '#eef2ff', color: '#3730a3', fontWeight: 600, fontSize: '0.72rem' }} />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Link>
            );
          })}
        </Box>
      </Container>
    </>
  );
}
