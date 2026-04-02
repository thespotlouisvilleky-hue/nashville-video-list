import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Nashville Videographers | Find the Right Videographer in Nashville',
  description:
    'Find Nashville videographers for weddings, brands, events, music videos, and more. Browse a curated list or get matched with the right videographer in Nashville.',
  keywords: [
    'Nashville videographers',
    'videographer Nashville',
    'find a videographer Nashville',
    'hire videographer Nashville',
    'wedding videographer Nashville',
    'brand videographer Nashville',
    'event videographer Nashville',
    'music video videographer Nashville',
  ],
  openGraph: {
    title: 'Nashville Videographers | Find the Right Videographer in Nashville',
    description:
      'Find Nashville videographers for weddings, brands, events, music videos, and more. Browse a curated list or get matched with the right videographer in Nashville.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nashville Videographers | Find the Right Videographer in Nashville',
    description:
      'Find Nashville videographers for weddings, brands, events, music videos, and more. Browse a curated list or get matched with the right videographer in Nashville.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
