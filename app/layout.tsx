import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import Headers from '@/app/(components)/header/page';
import Footer from '@/app/(components)/footers/page';
import ThemeProviderWrapper from '@/app/ThemeProviderWrapper';
import { Container } from '@mui/material';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import SchemaOrg from '@/app/components/SchemaOrg';
import EmotionCacheProvider from '@/app/EmotionCacheProvider';
import FloatingProjectCTA from '@/app/components/FloatingProjectCTA';

// Hero background images — imported here to get their final hashed paths for preloading.
// We will handle these via next/image with priority in the component for better LCP.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import titleImage from '@/public/it-coder-title.png';
import titleImageSmall from '@/app/(components)/header/images/titleImageSmall.png';
import { SpeedInsights } from "@vercel/speed-insights/next"

// Initialize the Inter font
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
      {/* Google Analytics */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-35P9NCQFSP" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-35P9NCQFSP');
        `}
      </Script>
      <SchemaOrg />
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>
      <EmotionCacheProvider>
        <ThemeProviderWrapper>
              <Headers/>
              <Container component="main" id="main-content" disableGutters className="containerPage">
                  {children}
                  <Analytics/>
              </Container>
              <Footer/>
              <FloatingProjectCTA />
        </ThemeProviderWrapper>
      </EmotionCacheProvider>
      <SpeedInsights />
      </body>
    </html>
  );
}
