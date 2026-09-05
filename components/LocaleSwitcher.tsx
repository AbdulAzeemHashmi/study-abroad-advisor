'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { Languages } from 'lucide-react';

export default function LocaleSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useI18n();

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'ur' : 'en');
  };

  return (
    <button
      onClick={toggleLocale}
      type="button"
      className={`inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-all hover:bg-slate-100 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-emerald-400 ${className}`}
      title={locale === 'en' ? 'اردو میں تبدیل کریں' : 'Switch to English'}
    >
      <Languages className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      <span>{locale === 'en' ? 'اردو (Urdu)' : 'English (EN)'}</span>
    </button>
  );
}
