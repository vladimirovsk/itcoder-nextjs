import type { Metadata } from "next";
import "./globals.css";
import Headers from '@/app/(components)/header/page';
import Footer from '@/app/(components)/footers/page';
import ThemeProviderWrapper from '@/app/ThemeProviderWrapper';

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
                {children}
            <Footer/>
      </ThemeProviderWrapper>
      </body>
    </html>
  );
}
