// src/app/account/layout.tsx
import AccountSidebar from '@/components/account/AccountSidebar';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom section-padding">
        <div className="flex flex-col lg:flex-row gap-8">
          <AccountSidebar />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}