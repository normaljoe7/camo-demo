'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, CreditCard, Bell, Settings, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/account/dashboard', icon: LayoutDashboard },
  { name: 'My Trips', href: '/account/trips', icon: Calendar },
  { name: 'Billing', href: '/account/billing', icon: CreditCard },
  { name: 'Notifications', href: '/account/notifications', icon: Bell },
  { name: 'Settings', href: '/account/settings', icon: Settings },
  { name: 'Support', href: '/account/support', icon: HelpCircle },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="lg:w-64 flex-shrink-0">
      <nav className="space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <item.icon className={cn('h-5 w-5', isActive ? 'text-white' : 'text-gray-400')} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
