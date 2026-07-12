import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Box, Chip, Container, Divider, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BLOG_POSTS, getBlogPost } from '../content';
import ArticleRenderer from '@/app/components/article/ArticleRenderer';
import { palette } from '@/app/theme/tokens';

const BASE = 'https://www.itcoder.ca';

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getBlogPost(slug);
  if (!p) return {};
  const url = `${BASE}/blog/${p.slug}`;
  return {
    title: p.title,
    description: p.excerpt,
    keywords: p.tags.join(', '),
    alternates: { canonical: url },
    openGraph: {
      title: p.title,
      description: p.excerpt,
      url,
      siteName: 'IT CODER',
      locale: 'en_CA',
      type: 'article',
      publishedTime: p.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getBlogPost(slug);
  if (!p) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    author: { '@type': 'Person', name: 'Serhii Vladimirov', url: `${BASE}/about` },
    publisher: { '@type': 'Organization', name: 'IT CODER', url: BASE },
    mainEntityOfPage: `${BASE}/blog/${p.slug}`,
    keywords: p.tags.join(', '),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Box sx={{ backgroundColor: palette.slate[900], py: { xs: 6, md: 8 }, px: 2 }}>
        <Container maxWidth="md">
          <Link href="/blog" style={{ color: '#9fb4f5', textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <ArrowBackIcon sx={{ fontSize: 16 }} /> Back to blog
          </Link>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mt: 2, mb: 1.5, color: palette.slate[500], fontSize: '0.85rem' }}>
            <span>{formatDate(p.date)}</span>
            <span>·</span>
            <span>{p.readingMinutes} min read</span>
          </Box>
          <Typography variant="h3" component="h1" sx={{ color: '#fff', fontWeight: 800, mb: 2, lineHeight: 1.2 }}>
            {p.title}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {p.tags.map((t) => (
              <Chip key={t} label={t} size="small" sx={{ backgroundColor: 'rgba(79,142,247,0.15)', color: '#9fb4f5', fontWeight: 600, fontSize: '0.72rem' }} />
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 5, md: 7 } }}>
        <ArticleRenderer blocks={p.body} />

        <Divider sx={{ my: 5 }} />

        <Box sx={{ p: { xs: 3, sm: 4 }, borderRadius: '14px', backgroundColor: 'surfaceAlt', border: '1px solid', borderColor: 'hairline' }}>
          <Typography sx={{ color: 'heading', fontWeight: 800, fontSize: '1.15rem', mb: 1 }}>
            Working on something like this?
          </Typography>
          <Typography sx={{ color: 'bodyText', mb: 2.5, lineHeight: 1.7 }}>
            I build NestJS backends and AI integrations for SaaS, fintech and crypto products. Happy to talk through your architecture.
          </Typography>
          <Link href="/#contact" style={{ display: 'inline-block', backgroundColor: palette.brand[500], color: '#fff', fontWeight: 700, padding: '10px 22px', borderRadius: '8px', textDecoration: 'none' }}>
            Get in touch →
          </Link>
        </Box>
      </Container>
    </>
  );
}
