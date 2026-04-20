import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: '--font-jakarta',
  weight: ['200', '300', '400', '500', '600', '700', '800']
});

const newsreader = Newsreader({ 
  subsets: ["latin"], 
  variable: '--font-newsreader',
  style: ['normal', 'italic'],
  weight: ['200', '300', '400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: "Aura Concierge | MSAJCE Intelligence",
  description: "Refined architectural intelligence for the modern student.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${newsreader.variable}`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" />
      </head>
      <body>{children}</body>
    </html>
  );
}
