import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
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
      lastModified: new Date('2025-05-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
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
