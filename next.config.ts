import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: process.env.NEXT_OUTPUT === "export" ? "export" : undefined,
	env: {
		NEXT_TITLE: 'VICTIVA',
	},
	images: {
		unoptimized: true,
		domains: [], // Add domains for external images if needed
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
};

export default nextConfig;
