
import type { Metadata } from "next";
import { Inter, Pacifico } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
});

export const metadata: Metadata = {
  title: "Nifty Digital Solutions - Premium Digital Services & Elite Outsourcing",
  description: "Transform your business with cutting-edge digital solutions, AI-powered services, and professional outsourcing. Web development, mobile apps, design services, and virtual assistants.",
  keywords: "digital solutions, web development, mobile apps, AI services, virtual assistants, outsourcing, design services",
  authors: [{ name: "Nifty Digital Solutions" }],
  creator: "Nifty Digital Solutions",
  publisher: "Nifty Digital Solutions",
  robots: "index, follow",
  openGraph: {
    title: "Nifty Digital Solutions - Premium Digital Services",
    description: "Transform your business with cutting-edge digital solutions and professional outsourcing services.",
    type: "website",
    locale: "en_US",
    siteName: "Nifty Digital Solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nifty Digital Solutions - Premium Digital Services",
    description: "Transform your business with cutting-edge digital solutions and professional outsourcing services.",
    creator: "@NiftyDigital",
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link 
          href="https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css" 
          rel="stylesheet" 
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.variable} ${pacifico.variable} antialiased font-inter`}>
        {children}
      </body>
    </html>
  );
}
