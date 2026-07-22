import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. The parent ITCoder/ folder holds a
  // stray package-lock.json, so Next would otherwise infer the wrong root and warn.
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
  },
  output: process.env.NEXT_OUTPUT === 'export' ? 'export' : undefined,
  env: {
    NEXT_TITLE: 'ITCODER',
    NEXT_PUBLIC_API: 'https://api-rest.it-coder.com/api/v1',
  },
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    domains: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      // API Key exposed on client — use headers to mask it for external fetches
      {
        source: '/api/:path*',
        headers: [
          { key: 'x-api-key', value: process.env.PROJECT_BUILDER_API_KEY ?? '' },
        ],
      },
      // Global header for any API consumer
      {
        source: '/:path*',
        headers: [
          { key: 'x-internal-service', value: 'ITCoderFrontend' },
        ],
      },
    ];
  },
  async redirects() {
    // Redirect all it-coder.com traffic to the canonical www.itcoder.ca domain.
    // This prevents duplicate content penalties and consolidates SEO value.
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'it-coder.com' }],
        destination: 'https://www.itcoder.ca/:path*',
        permanent: true, // 301
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.it-coder.com' }],
        destination: 'https://www.itcoder.ca/:path*',
        permanent: true, // 301
      },
    ];
  },
};

export default nextConfig;
