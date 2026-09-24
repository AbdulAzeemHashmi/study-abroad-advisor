'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n, useTranslations } from '@/lib/i18n';

const suggestionPillsEn = [
  { label: '🇩🇪 Germany Free MS & Sperrkonto', query: 'I want free tuition MS Computer Science in Germany. What is the Sperrkonto blocked account requirement in PKR and admission criteria?' },
  { label: '🇮🇹 Italy Regional Scholarships (DSU)', query: 'How to get DSU regional scholarship in Italy for Pakistani students? Free tuition plus living stipend.' },
  { label: '🇬🇧 UK 2-Year Post-Study Work', query: 'Affordable Master programs in UK with 2-year Graduate Route post-study work visa and budget under ₨60 Lakh.' },
  { label: '🇨🇦 Canada PGWP & Express Entry', query: 'Canada public universities for MS with Post-Graduation Work Permit (PGWP) and PR pathways.' },
  { label: '🇳🇴 Low-Cost Nordic Universities', query: 'Low tuition English-taught Master programs in Norway, Sweden, and Finland for Pakistani students.' },
  { label: '🇺🇸 USA STEM OPT 3-Yr Extension', query: 'Fully-funded MS/PhD in USA with assistantships (RA/TA) and 36-month STEM OPT extension.' },
];

const suggestionPillsUr = [
  { label: '🇩🇪 جرمنی مفت ایم ایس اور بلاک اکاؤنٹ', query: 'جرمنی کی پبلک یونیورسٹیوں میں مفت ایم ایس، 11,208 یورو سالانہ بلاک اکاؤنٹ اور داخلے کے قواعد بتائیں۔' },
  { label: '🇮🇹 اٹلی ڈی ایس یو اسکالرشپ (مفت تعلیم)', query: 'اٹلی میں ڈی ایس یو اسکالرشپ کے ذریعے مفت تعلیم اور سالانہ 7,000 یورو وظیفہ حاصل کرنے کا طریقہ کیا ہے؟' },
  { label: '🇬🇧 برطانیہ 2 سالہ ورک ویزا (PSW)', query: 'برطانیہ میں کم خرچ ماسٹرز پروگرامز اور 2 سالہ گریجویٹ روٹ ورک ویزا کی شرائط کیا ہیں؟' },
  { label: '🇨🇦 کینیڈا پی جی ڈبلیو پی اور پی آر', query: 'کینیڈا میں ماسٹرز، پوسٹ گریجویشن ورک پرمٹ (PGWP) اور ایکسپریس انٹری پی آر کے راستے۔' },
  { label: '🇳🇴 کم خرچ یورپی جامعات', query: 'ناروے اور سویڈن میں انگریزی زبان میں ماسٹرز پروگرامز کی فیس اور ویزا کی تفصیلات۔' },
  { label: '🇺🇸 امریکہ فنڈڈ پی ایچ ڈی اور او پی ٹی', query: 'امریکہ میں مکمل فنڈڈ ماسٹرز یا پی ایچ ڈی (اسسٹنٹ شپ) اور 36 ماہ کے STEM OPT کے مواقع۔' },
];

export default function HeroPromptLauncher() {
  const router = useRouter();
  const { locale, dir } = useI18n();
  const t = useTranslations('landing');
  const [inputQuery, setInputQuery] = useState('');

  const pills = locale === 'ur' ? suggestionPillsUr : suggestionPillsEn;

  const handleLaunch = (queryToRun: string) => {
    const q = (queryToRun || inputQuery).trim();
    if (!q) {
      router.push('/dashboard');
      return;
    }
    router.push(`/dashboard?q=${encodeURIComponent(q)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLaunch(inputQuery);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto lg:mx-0 mt-8">
      {/* Interactive Input Bar */}
      <div className="relative rounded-2xl p-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 shadow-xl shadow-emerald-500/15 group transition-all duration-300 hover:shadow-emerald-500/25">
        <div className="flex items-center gap-2 rounded-xl bg-white dark:bg-slate-900 px-3 py-2 sm:px-4 sm:py-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('askAdvisorPlaceholder', 'Ask AI: e.g. Free MS in Germany with ₨40 Lakh budget, 3.2 CGPA...')}
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <Button
            type="button"
            onClick={() => handleLaunch(inputQuery)}
            size="sm"
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold gap-1.5 px-4 shadow-sm"
          >
            <span>{t('askAdvisor', 'Ask Advisor')}</span>
            <ArrowRight className={`h-4 w-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="mt-3.5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
          <Compass className="h-3.5 w-3.5" />
          <span>{t('popularQueries', 'Popular:')}</span>
        </span>
        {pills.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleLaunch(p.query)}
            className="rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all hover:scale-105 shadow-2xs cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
