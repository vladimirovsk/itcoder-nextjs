import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "IT CODER — Web & Software Development in Calgary",
    template: "%s | IT CODER",
  },
  description: "Custom web apps, REST APIs, mobile apps, and automation — designed and built from scratch for your business. Based in Calgary, AB. Get a detailed project plan within 24 hours.",
  keywords: "web development Calgary, custom software development, REST API development, mobile app development, NestJS developer, Next.js developer, full-stack developer Calgary, IT consulting Alberta, project builder, software solutions Canada",
  openGraph: {
    title: "IT CODER — Web & Software Development in Calgary",
    description: "Custom web apps, REST APIs, mobile apps and automation — from idea to launch. Based in Calgary, AB. Use the Project Builder to describe your idea in 3 steps.",
    url: "https://www.itcoder.ca",
    siteName: "IT CODER",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT CODER — Web & Software Development in Calgary",
    description: "Custom web apps, REST APIs, mobile apps and automation — from idea to launch. Based in Calgary, AB.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.itcoder.ca",
  },
  // Add Google Search Console verification when available:
  // verification: { google: "YOUR_VERIFICATION_CODE" },
};
