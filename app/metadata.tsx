import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.itcoder.ca'),
  title: {
    default: "IT CODER — Backend & AI Engineer for Hire in Calgary, AB",
    template: "%s | IT CODER",
  },
  description: "Senior backend engineer in Calgary. I build NestJS microservices, REST APIs, payment systems, and AI/LLM integrations for SaaS, fintech and crypto products — from architecture to production.",
  keywords: "backend developer Calgary, NestJS developer Calgary, microservices developer Canada, AI integration developer, LLM integration Calgary, fintech developer Calgary, crypto backend developer, payment systems developer, SaaS backend developer, backend engineer Calgary Alberta, REST API developer, hire backend developer Canada, Node.js developer Calgary, TypeScript developer Alberta, web3 backend developer",
  openGraph: {
    title: "IT CODER — Backend & AI Engineer for Hire in Calgary, AB",
    description: "Senior backend engineer in Calgary. NestJS microservices, REST APIs, payment systems, and AI/LLM integrations — built for SaaS, fintech and crypto. From architecture to production.",
    url: "https://www.itcoder.ca",
    siteName: "IT CODER",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT CODER — Backend & AI Engineer for Hire in Calgary, AB",
    description: "Senior backend engineer in Calgary. NestJS microservices, REST APIs, payment systems and AI integrations for SaaS, fintech and crypto products.",
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
};

// NOTE: each section page must define its own alternates.canonical
// to override this root value, otherwise Google sees them as duplicates.
