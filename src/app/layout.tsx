// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navigation/navbar';
import Footer from '@/components/navigation/footer';
import { AuthProvider } from '@/contexts/AuthContext';
import Starfield from '@/components/ui/starfield';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Camoscapes | Adventure Awaits',
  description: 'Professional expedition services to the world\'s most remote locations',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen text-foreground`}>
        <AuthProvider>
          <Starfield />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}