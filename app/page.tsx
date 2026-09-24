'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  DollarSign,
  Briefcase,
  ShieldCheck,
  Award,
  FilterX,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { useTranslations, useI18n } from '@/lib/i18n';

export default function LandingPage() {
  const t = useTranslations('landing');
  const tCommon = useTranslations('common');
  const { dir } = useI18n();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-emerald-500 selection:text-white">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
      <div className="absolute top-80 left-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-10 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/25">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                {tCommon('appName', 'Study Abroad Advisor')}
              </span>
              <span className="hidden sm:block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {tCommon('tagline', 'AI Guidance for Pakistani Aspirants')}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3 md:gap-4">
            <LocaleSwitcher />
            <Link href="/signin">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex shadow-sm font-semibold">
                {tCommon('signIn', 'Sign In')}
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="gradient" size="sm" className="gap-2 shadow-md font-bold">
                <span>{tCommon('dashboard', 'Dashboard')}</span>
                <ArrowRight className={`h-4 w-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Target Audience Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50/90 px-4 py-1.5 text-xs font-bold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 shadow-sm mb-6 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t('badge', 'Designed for Pakistani Students (BS / MS / PhD / Postdoc)')}</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.18] max-w-4xl mx-auto">
            {t('heroTitle', 'Find Your Ideal Global University with Intelligent AI Guidance')}
          </h1>

          {/* Hero Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            {t(
              'heroSubtitle',
              'Up-to-date university rankings, realistic tuition & living costs in PKR, and settlement pathways tailored to your budget and academic profile.'
            )}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="gradient" className="w-full gap-2 shadow-xl shadow-emerald-600/25 font-bold">
                <span>{t('ctaStart', 'Start Free Consultation')}</span>
                <ArrowRight className={`h-5 w-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
            <Link href="/signin" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full shadow-md font-bold">
                {tCommon('signUp', 'Create Free Account')}
              </Button>
            </Link>
          </div>

          {/* Strict Exclusion & Safety Transparency Banner */}
          <div className="mt-12 inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl border-2 border-amber-300/90 bg-amber-50/80 p-4 text-left dark:border-amber-900/60 dark:bg-amber-950/40 text-xs sm:text-sm text-slate-800 dark:text-slate-200 max-w-3xl mx-auto shadow-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400">
              <FilterX className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white block sm:inline">
                {t('excludedBadge', 'Strict Quality Destination Filter Active')}:
              </span>{' '}
              {t(
                'excludedNote',
                'Only top, viable study destinations (Germany, UK, USA, Canada, Australia, Italy, Turkey, Malaysia, etc.) are recommended. Non-viable/restricted regions are strictly excluded.'
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon (100% Localized) */}
      <section className="relative z-10 border-y border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">$0</div>
              <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mt-1">
                {t('statCost', 'Cost to Use')}
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">500+</div>
              <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mt-1">
                {t('statUnis', 'Verified Global Universities')}
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">3-Way</div>
              <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mt-1">
                {t('statFailover', '3-Way AI Failover')}
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
              <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mt-1">
                {t('statBilingual', '100% Bilingual (English & Urdu RTL)')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {t('featuresTitle', 'Why Pakistani Students Choose Study Abroad Advisor')}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
              {t(
                'featuresSubtitle',
                'No biased agent commissions. Just pure data, AI-driven evaluation, and real student outcomes.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-7 shadow-sm transition-all hover:shadow-lg hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 mb-5 shadow-sm">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {t('feature1Title', 'Low-Cost & Scholarships')}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {t(
                    'feature1Desc',
                    'Discover tuition-free options in Germany, Italy, and low-cost Nordic universities with DAAD, Chevening, and Fulbright tips.'
                  )}
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-7 shadow-sm transition-all hover:shadow-lg hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400 mb-5 shadow-sm">
                  <DollarSign className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {t('feature2Title', 'PKR Currency Realities')}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {t(
                    'feature2Desc',
                    'Real-time conversion of tuition and block account costs into PKR with realistic part-time work viability.'
                  )}
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-7 shadow-sm transition-all hover:shadow-lg hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 mb-5 shadow-sm">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {t('feature3Title', 'Work & PR Pathways')}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {t(
                    'feature3Desc',
                    'Clear breakdown of post-graduation work visas (PSW), permanent residency points, and immigration laws.'
                  )}
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-7 shadow-sm transition-all hover:shadow-lg hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400 mb-5 shadow-sm">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {t('feature4Title', 'Multi-Provider Failover')}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {t(
                    'feature4Desc',
                    'Powered by a failover pipeline across Gemini, Grok, and Llama to ensure 100% uptime with zero service interruptions.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer Banner (100% Localized) */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 p-8 sm:p-14 text-white shadow-2xl text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              {t('ctaBannerTitle', 'Ready to Plan Your Foreign Education?')}
            </h2>
            <p className="mt-4 text-emerald-100 text-base sm:text-lg font-medium">
              {t('ctaBannerSubtitle', 'Ask your first question now. Free, instant, and customized for Pakistani degrees.')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-white text-emerald-900 hover:bg-slate-100 font-extrabold shadow-lg">
                  {t('ctaStart', 'Start Free Consultation')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 py-10 text-center text-xs text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} {tCommon('appName', 'Study Abroad Advisor')}. {t('footerNotice', 'Open source & free for Pakistani students worldwide.')}
          </div>
          <div className="flex items-center gap-6 font-semibold">
            <Link href="/dashboard" className="hover:underline">
              {tCommon('dashboard', 'Dashboard')}
            </Link>
            <Link href="/signin" className="hover:underline">
              {tCommon('signIn', 'Sign In')}
            </Link>
            <a href="https://github.com/AbdulAzeemHashmi/study-abroad-advisor" target="_blank" rel="noopener noreferrer" className="hover:underline">
              {t('githubRepo', 'GitHub Repository')}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
