import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.itcoder.ca'),
  title: {
    default: "IT CODER — Hire a Freelance Web & IoT Developer in Calgary, AB",
    template: "%s | IT CODER",
  },
  description: "Hire a freelance full-stack developer in Calgary, Alberta. Custom web apps, REST APIs, mobile apps, IoT devices, and embedded firmware — built from scratch for your business. Starting at $500. Response within 24 hours.",
  keywords: "hire web developer Calgary, freelance developer Calgary, IoT developer Calgary, hardware developer Canada, embedded systems developer Calgary, PCB design Canada, LoRa development, find a coder Canada, web development Calgary Alberta, custom software development, REST API developer, full-stack developer for hire, IT consultant Calgary, mobile app developer Canada, NestJS developer, Next.js developer, web developer Alberta, SaaS development Canada",
  openGraph: {
    title: "IT CODER — Hire a Freelance Web & IoT Developer in Calgary, AB",
    description: "Hire a freelance full-stack developer in Calgary, AB. Custom web apps, REST APIs, mobile apps, IoT devices and embedded firmware — from idea to launch. Starting at $500. Use the Project Builder to describe your project in 3 steps.",
    url: "https://www.itcoder.ca",
    siteName: "IT CODER",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT CODER — Hire a Freelance Web & IoT Developer in Calgary, AB",
    description: "Hire a freelance full-stack developer in Calgary, AB. Custom web apps, REST APIs, mobile apps and IoT devices. Starting at $500.",
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
