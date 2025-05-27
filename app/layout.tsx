import type { Metadata, Viewport } from "next";
import "./globals.css";
import Headers from '@/app/(components)/header/page';
import Footer from '@/app/(components)/footers/page';
import ThemeProviderWrapper from '@/app/ThemeProviderWrapper';
import { Container } from '@mui/material';
import 'animate.css';
import { Inter } from 'next/font/google';

// Initialize the Inter font
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

// export const metadata: Metadata = {
//   title: "IT CODER",
//   description: "I suggest a solution to your problems",
// };

// Root metadata is now defined in metadata.tsx
// This function is no longer needed as we're using static metadata export
// export async function generateMetadata(): Promise<Metadata> {
//     return {
//         title: "IT CODER",
//         description: "I suggest a solution to your problems",
//     };
// }

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
      <ThemeProviderWrapper>
            <Headers/>
            <Container component="main" disableGutters className="containerPage">
                {children}
            </Container>
            <Footer/>
      </ThemeProviderWrapper>
      </body>
    </html>
  );
}
