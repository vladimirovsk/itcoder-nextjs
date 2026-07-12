import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Project Builder — Describe Your Project & Get a Quote",
  description: "Tell IT CODER what you need in 3 steps — project type, features, and timeline. A freelance web developer in Calgary will respond with a plan within 24 hours.",
  keywords: "web project quote Calgary, hire developer estimate Canada, project builder web app, get development quote Alberta, freelance developer project request Calgary, custom software estimate Canada",
  openGraph: {
    title: "Project Builder — Describe Your Project & Get a Quote | IT CODER",
    description: "Describe your project in 3 steps. A Calgary freelance developer will respond with a plan and quote within 24 hours.",
    url: "https://www.itcoder.ca/project-builder",
    siteName: "IT CODER",
    locale: "en_CA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://www.itcoder.ca/project-builder",
  },
};

export default function ProjectBuilderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
