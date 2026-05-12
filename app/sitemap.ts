import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.itcoder.ca',
      lastModified: new Date('2025-05-01'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.itcoder.ca/about',
      lastModified: new Date('2025-05-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
