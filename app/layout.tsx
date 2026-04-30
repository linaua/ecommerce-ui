import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',           // Lighthouse: font-display swap
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Élume Store',
    default: 'Élume — Curated Minimal Fashion',
  },
  description: 'Discover curated minimal fashion and lifestyle products.',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://elume-store.vercel.app',
    siteName: 'Élume Store',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-neutral-900 antialiased">
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
