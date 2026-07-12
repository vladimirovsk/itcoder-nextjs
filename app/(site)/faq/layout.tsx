import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "FAQ — Web Development Pricing & Process in Calgary",
  description: "Common questions about hiring IT CODER for web development in Calgary: pricing (starting at $500), timelines, what's included, and how the process works.",
  keywords: "web development pricing Calgary, how much does a website cost Canada, hire developer FAQ, freelance developer cost Alberta, web app development timeline, IT CODER questions",
  openGraph: {
    title: "FAQ — Web Development Pricing & Process | IT CODER Calgary",
    description: "Common questions about hiring IT CODER: pricing starting at $500, project timelines, and how the process works.",
    url: "https://www.itcoder.ca/faq",
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
    canonical: "https://www.itcoder.ca/faq",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
