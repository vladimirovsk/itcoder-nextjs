import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT CODER - Professional Web Development & Software Solutions",
  description: "IT CODER provides expert web development, custom software solutions, and IT consulting services. Specializing in NextJS, Flutter, database management, and server setup for businesses of all sizes.",
  keywords: "IT CODER, web development, software development, custom applications, IT consulting, NextJS, Flutter, database management, server setup, professional web services",
  openGraph: {
    title: "IT CODER - Professional Web Development & Software Solutions",
    description: "IT CODER provides expert web development, custom software solutions, and IT consulting services. Specializing in NextJS, Flutter, database management, and server setup for businesses of all sizes.",
    url: "https://itcoder.ca",
    siteName: "IT CODER",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://itcoder.ca/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IT CODER - Professional Web Development & Software Solutions",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT CODER - Professional Web Development & Software Solutions",
    description: "IT CODER provides expert web development, custom software solutions, and IT consulting services.",
    images: ["https://itcoder.ca/twitter-image.jpg"],
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
    canonical: "https://itcoder.ca",
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code if available
  },
};
