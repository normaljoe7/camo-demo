// src/app/auth/layout.tsx

import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070')] bg-cover bg-center opacity-10" />

      <div className="relative min-h-screen flex flex-col">
        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center py-8 px-4">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-6 px-6 text-center">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} Camoscapes. All rights reserved.
            {' '}
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            {' · '}
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}