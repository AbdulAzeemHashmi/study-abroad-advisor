'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Layers,
  BookmarkCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Sparkles,
  X,
} from 'lucide-react';
import { useTranslations, useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('common');
  const { dir } = useI18n();

  const navItems = [
    {
      name: t('dashboard', 'Dashboard'),
      href: '/dashboard',
      icon: Compass,
    },
    {
      name: t('compare', 'Compare'),
      href: '/compare',
      icon: Layers,
    },
    {
      name: t('mySaved', 'Saved Consultations'),
      href: '/my-saved',
      icon: BookmarkCheck,
    },
    {
      name: t('settings', 'Settings'),
      href: '/settings',
      icon: Settings,
    },
  ];

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between p-4 bg-blue-950 text-slate-100 border-r border-blue-900">
      <div>
        {/* Logo & Brand Header */}
        <div className="flex items-center justify-between pb-6 border-b border-blue-900">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 overflow-hidden group"
            onClick={() => setIsMobileOpen(false)}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
              <GraduationCap className="h-6 w-6" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-white text-base leading-tight">
                  {t('appName', 'Study Abroad Advisor')}
                </span>
                <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1 mt-0.5">
                  <Sparkles className="h-3 w-3" />
                  {t('aiAdvisorBadge', 'AI Advisor (RAG)')}
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex h-7 w-7 items-center justify-center rounded-lg border border-blue-800 bg-blue-900 text-slate-300 hover:bg-blue-800 hover:text-white transition-colors"
            title={isCollapsed ? t('expandSidebar', 'Expand Sidebar') : t('collapseSidebar', 'Collapse Sidebar')}
          >
            {isCollapsed ? (
              dir === 'rtl' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            ) : (
              dir === 'rtl' ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-blue-900 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all group relative',
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold shadow-inner'
                    : 'text-slate-400 hover:bg-blue-900/80 hover:text-slate-200'
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon
                  className={cn(
                    'h-5 w-5 shrink-0 transition-transform group-hover:scale-110',
                    isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'
                  )}
                />
                {!isCollapsed && <span className="truncate">{item.name}</span>}

                {/* Active Indicator Bar */}
                {isActive && (
                  <div
                    className={cn(
                      'absolute inset-y-1.5 w-1 rounded-full bg-emerald-400',
                      dir === 'rtl' ? 'right-0' : 'left-0'
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Box */}
      {!isCollapsed && (
        <div className="rounded-xl border border-blue-900 bg-blue-950/70 p-3.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t('zeroCostGuarantee', '100% Free Guidance')}</span>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
            {t('zeroCostSub', 'Strict quality filter active. No agent commissions.')}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden md:flex flex-col border-r border-blue-900 bg-blue-950 transition-all duration-300 shrink-0 z-30 sticky top-0 h-screen',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-blue-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
          <div
            className={cn(
              'fixed inset-y-0 w-72 bg-blue-950 shadow-2xl transition-transform duration-300 z-50',
              dir === 'rtl' ? 'right-0' : 'left-0'
            )}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      aria-label="Open Navigation Menu"
    >
      <Compass className="h-5 w-5" />
    </button>
  );
}
