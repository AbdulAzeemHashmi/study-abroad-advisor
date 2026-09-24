'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, User as UserIcon, Moon, Sun } from 'lucide-react';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { MobileMenuButton } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/lib/i18n';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export default function Header({ onOpenMobileMenu }: HeaderProps) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const t = useTranslations('common');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check current theme
    if (typeof window !== 'undefined') {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const getPageTitle = () => {
    if (pathname.includes('/dashboard')) return t('dashboard', 'Dashboard');
    if (pathname.includes('/compare')) return t('compare', 'Compare Universities');
    if (pathname.includes('/my-saved')) return t('mySaved', 'Saved Consultations');
    if (pathname.includes('/settings')) return t('settings', 'Settings');
    return t('appName', 'Study Abroad Advisor');
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 md:px-8 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95 shadow-sm">
      {/* Left side: Mobile menu toggle and current view title */}
      <div className="flex items-center gap-3">
        <MobileMenuButton onClick={onOpenMobileMenu} />
        <div>
          <h1 className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Right side: Language Switcher, Theme Switcher, and User Session / Sign Out */}
      <div className="flex items-center gap-2.5 md:gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-250 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors shadow-sm"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
        </button>

        {/* Locale Switcher */}
        <LocaleSwitcher />

        {/* User Session Profile & Sign Out */}
        {session?.user ? (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                {session.user.name || t('student', 'Student')}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                {session.user.email}
              </span>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md">
              {session.user.name ? session.user.name[0].toUpperCase() : <UserIcon className="h-4 w-4" />}
            </div>

            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              title={t('signOut', 'Sign Out')}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-250 bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-red-950/40 dark:hover:text-red-400 transition-colors shadow-sm"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/signin">
              <Button variant="outline" size="sm" className="font-semibold shadow-sm">
                {t('signIn', 'Sign In')}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
