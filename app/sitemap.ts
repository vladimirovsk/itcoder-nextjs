import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from './blog/content';
import { CASE_STUDIES } from './(site)/cases/content';

export const dynamic = 'force-static';

const BASE = 'https://www.itcoder.ca';

export default function sitemap(): MetadataRoute.Sitemap {
  // Detail pages are generated from the content registries so the sitemap
  // stays in sync automatically when articles or case studies are added.
  const blogPosts: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const caseStudies: MetadataRoute.Sitemap = CASE_STUDIES.map((c) => ({
    url: `${BASE}/cases/${c.slug}`,
    lastModified: new Date(c.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://www.itcoder.ca',
      lastModified: new Date('2026-06-03'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.itcoder.ca/about',
      lastModified: new Date('2025-05-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.itcoder.ca/services',
      lastModified: new Date('2025-05-01'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://www.itcoder.ca/projects',
      lastModified: new Date('2026-06-03'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.itcoder.ca/skills',
      lastModified: new Date('2025-05-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.itcoder.ca/advantages',
      lastModified: new Date('2025-05-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.itcoder.ca/cases',
      lastModified: new Date('2026-06-18'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...caseStudies,
    {
      url: 'https://www.itcoder.ca/blog',
      lastModified: new Date('2026-06-18'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts,
    {
      url: 'https://www.itcoder.ca/contact',
      lastModified: new Date('2025-05-01'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://www.itcoder.ca/faq',
      lastModified: new Date('2025-05-01'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://www.itcoder.ca/project-builder',
      lastModified: new Date('2025-05-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
