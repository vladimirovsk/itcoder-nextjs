import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all crawlers, block internal/noise paths
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',       // server-side routes — no crawl value
          '/_next/',     // Next.js build assets
          '/static/',    // any static-only directories
        ],
      },
      // GPTBot (OpenAI) — allow full site content
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      // PerplexityBot — allow full site content
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://itcoder.ca/sitemap.xml',
  };
}
