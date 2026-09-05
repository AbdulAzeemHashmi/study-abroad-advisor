'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, User as UserIcon, Bell } from 'lucide-react';
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

  const getPageTitle = () => {
    if (pathname.includes('/dashboard')) return t('dashboard', 'Dashboard');
    if (pathname.includes('/compare')) return t('compare', 'Compare Universities');
    if (pathname.includes('/my-saved')) return t('mySaved', 'Saved Consultations');
    if (pathname.includes('/settings')) return t('settings', 'Settings');
    return t('appName', 'Study Abroad Advisor');
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/75 px-4 md:px-8 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/75">
      {/* Left side: Mobile menu toggle and current view title */}
      <div className="flex items-center gap-3">
        <MobileMenuButton onClick={onOpenMobileMenu} />
        <div>
          <h1 className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Right side: Language Switcher, Notifications, and User Session / Sign Out */}
      <div className="flex items-center gap-2.5 md:gap-4">
        {/* Locale Switcher */}
        <LocaleSwitcher />

        {/* User Session Profile & Sign Out */}
        {session?.user ? (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                {session.user.name || 'Student'}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                {session.user.email}
              </span>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-sm shadow-inner">
              {session.user.name ? session.user.name[0].toUpperCase() : <UserIcon className="h-4 w-4" />}
            </div>

            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              title={t('signOut', 'Sign Out')}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-red-950/40 dark:hover:text-red-400 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/signin">
              <Button variant="outline" size="sm">
                {t('signIn', 'Sign In')}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
