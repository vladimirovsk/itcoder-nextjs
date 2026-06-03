import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: process.env.NEXT_OUTPUT === "export" ? "export" : undefined,
	env: {
		NEXT_TITLE: 'ITCODER',
		NEXT_PUBLIC_API: 'https://api-rest.it-coder.com/api/v1',
	},
	images: {
		unoptimized: true,
		domains: [],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	async redirects() {
		return [
			// Redirect all it-coder.com traffic to the canonical www.itcoder.ca domain.
			// This prevents duplicate content penalties and consolidates SEO value.
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
