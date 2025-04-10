import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Headers from '@/app/(components)/header/page';
import Footer from '@/app/(components)/footers/page';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Headers/>
      {children}
      <Footer/>
      </body>
    </html>
  );
}
