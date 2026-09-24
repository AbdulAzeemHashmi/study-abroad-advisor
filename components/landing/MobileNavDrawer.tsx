'use client';

import React from 'react';
import Link from 'next/link';
import { X, GraduationCap, Sun, Moon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LocaleSwitcher from '@/components/LocaleSwitcher';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function MobileNavDrawer({
  isOpen,
  onClose,
  isDark,
  onToggleTheme,
}: MobileNavDrawerProps) {
  if (!isOpen) return null;

  const navLinks = [
    { label: 'PKR Calculator', href: '#calculator' },
    { label: 'Top Destinations', href: '#destinations' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Advisor vs Agents', href: '#compare' },
    { label: 'Key Features', href: '#features' },
    { label: 'FAQs', href: '#faq' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-950 p-6 animate-fade-in md:hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-black text-slate-900 dark:text-white text-base">
            Study Abroad Advisor
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 overflow-y-auto space-y-4">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="block text-lg font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 py-1 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Bottom Controls & CTAs */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Preferences:
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              className="h-9 w-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <LocaleSwitcher />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link href="/signin" onClick={onClose} className="w-full">
            <Button variant="outline" className="w-full font-bold">
              Sign In
            </Button>
          </Link>
          <Link href="/signup" onClick={onClose} className="w-full">
            <Button variant="outline" className="w-full font-bold border-emerald-400 text-emerald-600 dark:text-emerald-400">
              Sign Up
            </Button>
          </Link>
        </div>

        <Link href="/dashboard" onClick={onClose} className="block w-full">
          <Button variant="gradient" className="w-full font-extrabold gap-2 shadow-md">
            <span>Launch AI Advisor</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
