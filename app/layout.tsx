import type { Metadata, Viewport } from "next";
import "./globals.css";
import Headers from '@/app/(components)/header/page';
import Footer from '@/app/(components)/footers/page';
import ThemeProviderWrapper from '@/app/ThemeProviderWrapper';
import { Container } from '@mui/material';
import 'animate.css';

// export const metadata: Metadata = {
//   title: "IT CODER",
//   description: "I suggest a solution to your problems",
// };

export async function generateMetadata(): Promise<Metadata> {
    // const { title, description } = await import("./metadata.json");
    const title = "IT CODER";
    const description = "I suggest a solution to your problems"

    return {
        title,
        description,
    };
}

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
    <html lang="en">
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
