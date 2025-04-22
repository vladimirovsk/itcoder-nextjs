import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: process.env.NEXT_OUTPUT === "export" ? "export" : undefined,
	env: {
		NEXT_TITLE: 'IT Coder',
		NEXT_PUBLIC_API: 'https://api-rest.it-coder.com/api/v1',
	},
};

export default nextConfig;
