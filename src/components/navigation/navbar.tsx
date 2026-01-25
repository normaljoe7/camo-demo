// src/components/navigation/Navbar.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, MapPin, Phone, Calendar, User, LogIn, UserPlus, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import Button from '@/components/ui/button';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth(); // ADD THIS LINE - replace isLoggedIn with user
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(100); // Start at 100% (fully visible)
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'Expeditions', href: '/expeditions', id: 'expeditions' },
    { name: 'About Us', href: '/about', id: 'about' },
    { name: 'Team', href: '/team', id: 'team' },
    { name: 'Gallery', href: '/gallery', id: 'gallery' },
    { name: 'Contact', href: '/contact', id: 'contact' },
  ];

  // Initialize scroll position on mount
  useEffect(() => {
    setIsMounted(true);
    // Set initial scroll position
    const initialScrollY = window.scrollY;
    setLastScrollY(initialScrollY);

    // If at top of page, ensure navbar is fully visible
    if (initialScrollY < 10) {
      setScrollProgress(100);
    }

    // Add small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setScrollProgress(100); // Force navbar to be visible on load
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Enhanced scroll handler with smooth reveal
  const handleScroll = useCallback(() => {
    if (!isMounted) return;

    const currentScrollY = window.scrollY;
    const scrollDelta = lastScrollY - currentScrollY;

    // Detect scroll direction
    setIsScrollingUp(scrollDelta > 0);

    // Calculate reveal progress based on scroll up distance
    if (scrollDelta > 0) {
      // User is scrolling UP - reveal navbar gradually
      const revealProgress = Math.min(100, scrollDelta * 2);
      setScrollProgress(prev => Math.min(100, prev + revealProgress));
    } else if (scrollDelta < 0) {
      // User is scrolling DOWN - hide navbar gradually
      const hideProgress = Math.min(100, Math.abs(scrollDelta) * 2);
      setScrollProgress(prev => Math.max(0, prev - hideProgress));
    }

    // Always fully visible at top of page
    if (currentScrollY < 10) {
      setScrollProgress(100);
    }

    // Lock navbar in place when user stops scrolling (optional)
    if (Math.abs(scrollDelta) < 1) {
      // If progress is more than halfway, lock to fully visible
      if (scrollProgress > 50) {
        setScrollProgress(100);
      }
      // If progress is less than halfway, lock to fully hidden
      else if (scrollProgress < 50) {
        setScrollProgress(0);
      }
    }

    setLastScrollY(currentScrollY);
  }, [isMounted, lastScrollY, scrollProgress]);

  // Attach scroll listener
  useEffect(() => {
    if (!isMounted) return;

    let ticking = false;

    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    // Also trigger once to set initial state
    throttledHandleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [isMounted, handleScroll]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (isOpen && !target.closest('nav')) {
        setIsOpen(false);
      }

      if (userMenuOpen && !target.closest('.user-menu')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, userMenuOpen]);


  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <nav className="absolute top-0 left-0 w-full z-50">
        {/* Simplified loading navbar */}
        <div className="w-full px-6 py-4">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                <img
                  src="/logo.jpg"
                  alt="CamoScapes Logo"
                  className="w-12 h-12 rounded-lg object-cover shadow-lg"
                />
              </div>
              <div>
                <span className="text-2xl font-bold text-white block">CamoScapes</span>
                <span className="text-[15px] text-white/90 font-medium uppercase tracking-wider block -mt-1">
                  Wilderness, Up-Close
                </span>
              </div>
            </div>
            <div className="lg:hidden">
              <Menu className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { name?: string; href: string; id: string }) => {
    if (pathname === '/') {
      const element = document.getElementById(item.id);
      if (element) {
        e.preventDefault();
        setIsOpen(false);
        element.scrollIntoView({ behavior: 'smooth' });
        // Optional: Update URL hash without jump?
        // window.history.pushState(null, '', `#${item.id}`);
        // But for Home, we might just want to scroll to top if id is 'home'
        if (item.id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
    }
    // Default navigation behavior handled by Link
    setIsOpen(false);
    if (item.href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="absolute top-0 left-0 w-full z-50 bg-transparent"
    >
      <div className="w-full px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group" onClick={(e) => handleNavClick(e, { name: 'Home', href: '/', id: 'home' })}>
            <div className="flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img
                src="/logo.jpg"
                alt="CamoScapes Logo"
                className="w-12 h-12 rounded-lg shadow-lg"
              />
            </div>
            <div>
              <span className="text-2xl font-bold block text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-accent opacity-90 pb-0.5 leading-tight">
                CamoScapes
              </span>
              <span className="text-[11px] text-white/90 font-medium uppercase tracking-wider block -mt-1">
                Wilderness, Up-Close
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-white/90 transition-colors font-medium text-sm uppercase tracking-wide relative group"
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              {/* User Account Section */}
              <div className="relative user-menu">
                {user ? (
                  <>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-2 text-white hover:text-white/90 transition-colors"
                    >
                      <div className="p-2 bg-white/20 rounded-full">
                        <User className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
                    </button>

                    {/* User Dropdown Menu */}
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl py-2 z-50 animate-fade-in">
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          <p className="text-xs text-white/60">{user.email}</p>
                        </div>

                        <Link
                          href={user.role === 'admin' ? "/admin" : "/account/dashboard"}
                          className="flex items-center space-x-2 px-4 py-3 text-gray-300 hover:bg-white/10 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          <span>{user.role === 'admin' ? "Admin Dashboard" : "My Dashboard"}</span>
                        </Link>

                        <Link
                          href="/account/trips"
                          className="flex items-center space-x-2 px-4 py-3 text-gray-300 hover:bg-white/10 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Calendar className="h-4 w-4" />
                          <span>My Trips</span>
                        </Link>

                        <div className="border-t border-white/10 mt-2 pt-2">
                          <button
                            onClick={() => {
                              logout();
                              setUserMenuOpen(false);
                            }}
                            className="flex items-center space-x-2 px-4 py-3 text-red-400 hover:bg-red-500/10 w-full text-left transition-colors"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Log Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center space-x-3">
                    <AnimatedButton
                      variant="white"
                      size="sm"
                      icon={LogIn}
                      tooltipText="Sign in"
                      onClick={() => router.push('/auth/login')}
                    >
                      Log In
                    </AnimatedButton>
                    <AnimatedButton
                      variant="white"
                      size="sm"
                      icon={UserPlus}
                      tooltipText="Create account"
                      onClick={() => router.push('/auth/signup')}
                    >
                      Sign Up
                    </AnimatedButton>
                  </div>
                )}
              </div>

              <div className="group relative flex items-center">
                <Phone className="h-4 w-4 text-white/90 cursor-pointer transition-colors hover:text-white" />
                <span className="ml-2 text-sm font-medium text-white/90 opacity-0 max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:opacity-100 group-hover:max-w-xs group-hover:ml-2">
                  +91 7676784392
                </span>
              </div>

              <AnimatedButton
                variant="black"
                size="sm"
                icon={Calendar}
                tooltipText="Secure your adventure today!"
                onClick={() => router.push('/expeditions')}
              >
                Book Now
              </AnimatedButton>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-slide-up bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-white hover:bg-white/10 transition-colors py-3 px-4 rounded-lg font-medium"
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile User Section */}
              <div className="pt-4 border-t border-white/10">
                {user ? (
                  <>
                    <div className="mb-4 px-4">
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-white/70 text-sm">{user.email}</p>
                    </div>

                    <Link
                      href="/account/dashboard"
                      className="flex items-center space-x-3 text-white hover:bg-white/10 transition-colors py-3 px-4 rounded-lg font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>My Dashboard</span>
                    </Link>

                    <Link
                      href="/account/trips"
                      className="flex items-center space-x-3 text-white hover:bg-white/10 transition-colors py-3 px-4 rounded-lg font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <Calendar className="h-5 w-5" />
                      <span>My Trips</span>
                    </Link>

                    <Link
                      href="/account/settings"
                      className="flex items-center space-x-3 text-white hover:bg-white/10 transition-colors py-3 px-4 rounded-lg font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-3 text-red-400 hover:bg-red-500/10 transition-colors py-3 px-4 rounded-lg font-medium w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Log Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <AnimatedButton
                      variant="white"
                      size="sm"
                      icon={LogIn}
                      tooltipText="Sign in to your account"
                      className="w-full"
                      onClick={() => {
                        setIsOpen(false);
                        router.push('/auth/login');
                      }}
                    >
                      Log In
                    </AnimatedButton>

                    <AnimatedButton
                      variant="white"
                      size="sm"
                      icon={UserPlus}
                      tooltipText="Create your adventure account"
                      className="w-full mt-2"
                      onClick={() => {
                        setIsOpen(false);
                        router.push('/auth/signup');
                      }}
                    >
                      Sign Up
                    </AnimatedButton>
                  </>
                )}

                <div className="mt-4 border-t border-white/10 pt-4">
                  <div className="group relative flex items-center mb-4 px-4">
                    <Phone className="h-4 w-4 text-white/90 cursor-pointer transition-colors hover:text-white" />
                    <span className="ml-2 text-sm font-medium text-white/90 opacity-0 max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:opacity-100 group-hover:max-w-xs group-hover:ml-2">
                      +91 7676784392
                    </span>
                  </div>
                  <AnimatedButton
                    variant="black"
                    size="sm"
                    icon={Calendar}
                    tooltipText="Book your expedition!"
                    className="w-full"
                    onClick={() => {
                      setIsOpen(false);
                      router.push('/expeditions');
                    }}
                  >
                    Book Expedition
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}