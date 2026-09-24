'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  MessageSquare,
  Search,
  FileText,
  Github,
  Globe,
  CheckCircle2,
  ChevronRight,
  Zap,
  Users,
  TrendingUp,
  Sun,
  Moon,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { useTranslations, useI18n } from '@/lib/i18n';

// Interactive Components
import HeroPromptLauncher from '@/components/landing/HeroPromptLauncher';
import PkrCostCalculator from '@/components/landing/PkrCostCalculator';
import ComparisonTable from '@/components/landing/ComparisonTable';
import DestinationModal from '@/components/landing/DestinationModal';
import FaqSection from '@/components/landing/FaqSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import MobileNavDrawer from '@/components/landing/MobileNavDrawer';

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Count-Up Hook (Starts immediately, never stuck at 0) ─────────────────────
function useCountUp(target: number, duration = 1600) {
  const [count, setCount] = useState(target);

  useEffect(() => {
    let startTime: number | null = null;
    let animId: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [target, duration]);

  return count;
}

// ─── Stats Ribbon ─────────────────────────────────────────────────────────────
function StatsRibbon() {
  const { locale } = useI18n();
  const t = useTranslations('landing');
  const isUr = locale === 'ur';

  const unis = useCountUp(500, 1600);
  const countries = useCountUp(30, 1200);
  const students = useCountUp(1000, 2000);

  const stats = [
    { value: isUr ? '0 روپے' : '$0', label: t('statCost', 'Cost to Use'), color: 'text-emerald-500' },
    { value: `${unis}+`, label: t('statUnis', 'Verified Global Universities'), color: 'text-blue-500' },
    { value: `${countries}+`, label: t('statDestinations', 'Study Destinations'), color: 'text-violet-500' },
    { value: `${students}+`, label: t('statStudents', 'Students Guided'), color: 'text-amber-500' },
  ];

  return (
    <div className="relative z-10 border-y border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className={`text-3xl sm:text-4xl font-black ${s.color} tabular-nums`}>{s.value}</div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1.5 max-w-[130px] mx-auto leading-tight">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Destinations Strip List ──────────────────────────────────────────────────
const destinations = [
  { flag: '🇩🇪', name: 'Germany', nameUr: 'جرمنی' },
  { flag: '🇬🇧', name: 'United Kingdom', nameUr: 'برطانیہ' },
  { flag: '🇺🇸', name: 'USA', nameUr: 'امریکہ' },
  { flag: '🇨🇦', name: 'Canada', nameUr: 'کینیڈا' },
  { flag: '🇦🇺', name: 'Australia', nameUr: 'آسٹریلیا' },
  { flag: '🇮🇹', name: 'Italy', nameUr: 'اٹلی' },
  { flag: '🇳🇴', name: 'Norway', nameUr: 'ناروے' },
  { flag: '🇸🇪', name: 'Sweden', nameUr: 'سویڈن' },
  { flag: '🇳🇱', name: 'Netherlands', nameUr: 'نیدرلینڈز' },
  { flag: '🇹🇷', name: 'Turkey', nameUr: 'ترکی' },
  { flag: '🇲🇾', name: 'Malaysia', nameUr: 'ملائیشیا' },
  { flag: '🇰🇷', name: 'South Korea', nameUr: 'جنوبی کوریا' },
  { flag: '🇯🇵', name: 'Japan', nameUr: 'جاپان' },
  { flag: '🇫🇷', name: 'France', nameUr: 'فرانس' },
  { flag: '🇨🇿', name: 'Czech Republic', nameUr: 'چیک جمہوریہ' },
];

// ─── AI Mock Chat Card ────────────────────────────────────────────────────────
function HeroChatCard() {
  const { locale } = useI18n();
  const t = useTranslations('landing');
  const isUr = locale === 'ur';

  return (
    <div className="glass-card rounded-3xl shadow-2xl shadow-emerald-500/10 p-5 w-full max-w-sm animate-float border border-white/50 dark:border-slate-700/50">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-md">
          <GraduationCap className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900 dark:text-white">
            {t('chatTitle', 'Study Abroad AI')}
          </p>
          <p className="text-[10px] text-emerald-500 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            {t('chatOnline', 'Online · Powered by Gemini')}
          </p>
        </div>
      </div>

      {/* User message */}
      <div className="flex justify-end mb-3">
        <div className="bg-emerald-500 text-white rounded-2xl rounded-br-sm px-3.5 py-2.5 text-xs max-w-[85%] leading-relaxed shadow-sm">
          {t('chatUserMsg', 'I want to do MS Computer Science in Germany. Budget is ₨50 lakh. Is it possible?')}
        </div>
      </div>

      {/* AI response */}
      <div className="flex gap-2 mb-3">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-sm mt-0.5">
          <Sparkles className="h-3 w-3" />
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-[11px] text-slate-700 dark:text-slate-200 max-w-[90%] leading-relaxed">
          {t('chatAiMsg', 'Absolutely! Great news. Germany offers tuition-free MS programs at public universities. ₨50 lakh covers the required Sperrkonto (€11,208/yr blocked account) with room to spare for flights & visa.')}
        </div>
      </div>

      {/* Recommendation chips */}
      <div className="mt-3 space-y-1.5">
        {[
          { uni: 'TU Munich', field: isUr ? 'انفارمیٹکس' : 'Informatics', cost: t('chatFreeTuition', 'Free tuition') },
          { uni: 'KIT Karlsruhe', field: isUr ? 'سی ایس / اے آئی' : 'CS / AI', cost: t('chatFreeTuition', 'Free tuition') },
        ].map((r, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 px-3 py-2">
            <div>
              <p className="text-[11px] font-bold text-slate-800 dark:text-white">{r.uni}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{r.field}</p>
            </div>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 rounded-full px-2 py-0.5">
              {r.cost}
            </span>
          </div>
        ))}
      </div>

      {/* Typing indicator */}
      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-400">
        <div className="flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <span>{t('chatReady', 'AI is ready for your query…')}</span>
      </div>
    </div>
  );
}

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  const t = useTranslations('landing');
  const tCommon = useTranslations('common');
  const { locale, dir } = useI18n();
  const isUr = locale === 'ur';

  const [scrolled, setScrolled] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useScrollReveal();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDark(document.documentElement.classList.contains('dark'));
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const steps = [
    {
      icon: MessageSquare,
      number: '01',
      title: t('step1Title', 'Describe Your Profile'),
      desc: t('step1Desc', 'Tell the AI your degree level, budget, CGPA, and study field in English or Urdu.'),
      color: 'from-emerald-500 to-teal-500',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      icon: Search,
      number: '02',
      title: t('step2Title', 'AI Searches & Filters'),
      desc: t('step2Desc', 'Our RAG engine searches 500+ verified universities, calculates PKR costs, and excludes non-viable regions.'),
      color: 'from-blue-500 to-indigo-500',
      bg: 'bg-blue-50 dark:bg-blue-950/40',
    },
    {
      icon: FileText,
      number: '03',
      title: t('step3Title', 'Get Your Personalized Report'),
      desc: t('step3Desc', 'Receive ranked recommendations with tuition in PKR, PR pathways, scholarship tips, and visa guides.'),
      color: 'from-violet-500 to-purple-500',
      bg: 'bg-violet-50 dark:bg-violet-950/40',
    },
  ];

  const features = [
    {
      icon: Award,
      title: t('feature1Title', 'Low-Cost & Scholarships'),
      desc: t('feature1Desc', 'Discover tuition-free options in Germany, Italy, and low-cost Nordic universities with DAAD, Chevening, and Fulbright guidance.'),
      gradient: 'from-emerald-500 to-teal-500',
      glow: 'hover:shadow-emerald-500/10',
      border: 'hover:border-emerald-400',
    },
    {
      icon: DollarSign,
      title: t('feature2Title', 'PKR Currency Realities'),
      desc: t('feature2Desc', 'Real-time conversion of tuition and block account costs into PKR with realistic part-time work viability.'),
      gradient: 'from-amber-500 to-orange-500',
      glow: 'hover:shadow-amber-500/10',
      border: 'hover:border-amber-400',
    },
    {
      icon: Briefcase,
      title: t('feature3Title', 'Work & PR Pathways'),
      desc: t('feature3Desc', 'Clear breakdown of post-graduation work visas (PSW), permanent residency points, and immigration regulations.'),
      gradient: 'from-blue-500 to-indigo-500',
      glow: 'hover:shadow-blue-500/10',
      border: 'hover:border-blue-400',
    },
    {
      icon: ShieldCheck,
      title: t('feature4Title', 'Multi-Provider Failover'),
      desc: t('feature4Desc', 'Powered by Gemini → Grok → Llama failover pipeline ensuring 100% uptime with zero service interruptions.'),
      gradient: 'from-violet-500 to-purple-500',
      glow: 'hover:shadow-violet-500/10',
      border: 'hover:border-violet-400',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      {/* Background glows */}
      <div className="fixed inset-0 bg-grid-pattern opacity-100 pointer-events-none" />
      <div className="fixed -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none animate-orb-pulse" />
      <div className="fixed top-[60vh] left-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/8 blur-3xl pointer-events-none animate-orb-pulse" style={{ animationDelay: '2s' }} />
      <div className="fixed top-[30vh] right-0 h-[300px] w-[300px] rounded-full bg-blue-500/6 blur-3xl pointer-events-none" />

      {/* ── Navbar ────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? 'border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm h-16'
            : 'border-transparent bg-white/80 dark:bg-slate-950/60 backdrop-blur-sm h-20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className={`flex items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 group-hover:scale-105 ${scrolled ? 'h-9 w-9' : 'h-11 w-11'}`}>
              <GraduationCap className={`transition-all duration-300 ${scrolled ? 'h-5 w-5' : 'h-6 w-6'}`} />
            </div>
            <div>
              <span className={`font-black tracking-tight text-slate-900 dark:text-white block transition-all duration-300 ${scrolled ? 'text-base' : 'text-xl'}`}>
                {tCommon('appName', 'Study Abroad Advisor')}
              </span>
              {!scrolled && (
                <span className="hidden sm:block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {tCommon('tagline', 'AI Guidance for Pakistani Aspirants')}
                </span>
              )}
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {t('pkrCalculator', 'PKR Calculator')}
            </a>
            <a href="#destinations" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {t('destinations', 'Destinations')}
            </a>
            <a href="#how-it-works" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {t('howItWorks', 'How It Works')}
            </a>
            <a href="#compare" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {t('advisorVsAgents', 'Advisor vs Agents')}
            </a>
            <a href="#faq" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {t('faqs', 'FAQs')}
            </a>
          </nav>

          {/* Nav Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <LocaleSwitcher />

            <Link href="/signin">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900">
                {tCommon('signIn', 'Sign In')}
              </Button>
            </Link>

            <Link href="/signup">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex font-bold border-emerald-400 dark:border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40">
                {tCommon('signUp', 'Sign Up')}
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button variant="gradient" size="sm" className="gap-2 shadow-md font-bold">
                <span className="hidden sm:inline">{tCommon('dashboard', 'Dashboard')}</span>
                <span className="sm:hidden">{isUr ? 'شروع' : 'Start'}</span>
                <ArrowRight className={`h-4 w-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Button>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Navigation Drawer ───────────────────────────────────────── */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* ── Destination Details Modal ─────────────────────────────────────── */}
      <DestinationModal
        country={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />

      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <section className="relative z-10 pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

            {/* Left: Text & Interactive Prompt */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50/90 px-4 py-1.5 text-xs font-bold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 shadow-sm mb-6 animate-fade-in">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse-subtle" />
                <span>{t('badge', 'Designed for Pakistani Students — BS / MS / PhD / Postdoc')}</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] max-w-2xl mx-auto lg:mx-0 animate-fade-in">
                {t('heroHeadlinePart1', 'Find Your')}{' '}
                <span className="gradient-text">{t('heroHeadlineHighlight', 'Ideal Global University')}</span>{' '}
                {t('heroHeadlinePart2', 'with Intelligent AI')}
              </h1>

              {/* Sub */}
              <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium animate-fade-in">
                {t(
                  'heroSubtitle',
                  'Up-to-date university rankings, realistic tuition & living costs in PKR, and settlement pathways tailored to your budget and academic profile.'
                )}
              </p>

              {/* Interactive Prompt Launcher */}
              <div className="animate-fade-in">
                <HeroPromptLauncher />
              </div>

              {/* Trust signals */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 animate-fade-in">
                {[
                  t('trustNoSignup', 'No sign-up required'),
                  t('trustCompletelyFree', 'Completely free forever'),
                  t('trustBilingual', '100% Bilingual (EN/UR)'),
                ].map((text, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    {text}
                  </span>
                ))}
              </div>

              {/* Exclusion badge */}
              <div className="mt-8 inline-flex items-start gap-3 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 bg-amber-50/90 dark:bg-amber-950/40 p-4 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 animate-fade-in">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 mt-0.5">
                  <FilterX className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block mb-0.5">
                    {t('excludedBadge', 'Strict Quality Destination Filter Active')}
                  </span>
                  <span className="leading-relaxed text-slate-600 dark:text-slate-400">
                    {t('excludedDesc', 'Only top, viable destinations (Germany, UK, USA, Canada, Australia, Turkey, Malaysia…) — non-viable regions strictly excluded.')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Hero Chat Card */}
            <div className="flex-shrink-0 w-full max-w-sm mx-auto lg:mx-0 animate-slide-right">
              <HeroChatCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Ribbon ──────────────────────────────────────────────────── */}
      <StatsRibbon />

      {/* ── Destinations Strip ────────────────────────────────────────────── */}
      <section id="destinations" className="relative z-10 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 reveal">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
              {t('countryExplorerBadge', 'Interactive Country Explorer')}
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t('countryExplorerTitle', 'Top Study Destinations for Pakistani Students')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t('countryExplorerSubtitle', 'Click any country to explore tuition, blocked account requirements, and post-study work visas.')}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5 reveal reveal-delay-1">
            {destinations.map((d, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedDestination(d.name)}
                className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-600 dark:hover:text-emerald-400 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span className="text-lg">{d.flag}</span>
                <span>{isUr ? d.nameUr : d.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive PKR Cost Calculator ───────────────────────────────── */}
      <PkrCostCalculator />

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section id="how-it-works" className="relative z-10 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">
              {t('howItWorksBadge', 'How It Works')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('howItWorksTitle', 'From Question to Report in')}{' '}
              <span className="gradient-text">{t('howItWorksHighlight', 'Seconds')}</span>
            </h2>
            <p className="mt-4 text-base text-slate-500 dark:text-slate-400 font-medium">
              {t('howItWorksSubtitle', 'No sign-up needed. Just ask your question and get a detailed, personalized recommendation.')}
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector lines (desktop only) */}
            <div className="hidden md:block absolute top-10 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 opacity-30" />
            <div className="hidden md:block absolute top-10 left-2/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-400 to-violet-400 opacity-30" />

            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className={`reveal reveal-delay-${i + 1}`}>
                  <div className={`relative rounded-3xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group`}>
                    {/* Number badge */}
                    <div className={`absolute -top-4 -left-4 h-9 w-9 rounded-xl bg-gradient-to-br ${step.color} text-white text-sm font-black flex items-center justify-center shadow-md`}>
                      {step.number}
                    </div>
                    {/* Icon */}
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${step.bg} mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>

                    {i < steps.length - 1 && (
                      <div className="hidden md:block absolute top-10 -right-4 z-10">
                        <ChevronRight className={`h-6 w-6 text-slate-300 dark:text-slate-600 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Advisor vs Traditional Agents Comparison ─────────────────────── */}
      <ComparisonTable />

      {/* ── Features Grid ─────────────────────────────────────────────────── */}
      <section id="features" className="relative z-10 py-20 md:py-28 bg-slate-50/80 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">
              {t('featuresBadge', 'Platform Features')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('featuresTitle', 'Why Pakistani Students Choose Study Abroad Advisor')}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium">
              {t('featuresSubtitle', 'No biased agent commissions. Just pure data, AI-driven evaluation, and real student outcomes.')}
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className={`feature-card reveal reveal-delay-${i + 1} rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 shadow-sm hover:shadow-xl ${f.glow} ${f.border} flex flex-col`}
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${f.gradient} mb-5 shadow-md`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">{f.desc}</p>
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5" /> {t('builtInAndFree', 'Built-in & Free')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Student Testimonials ──────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── FAQ Section ───────────────────────────────────────────────────── */}
      <FaqSection />

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950 dark:from-slate-800 dark:via-blue-900 dark:to-emerald-900 p-10 sm:p-16 text-white shadow-2xl text-center relative overflow-hidden reveal">

          {/* Animated orbs behind */}
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl animate-orb-pulse pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl animate-orb-pulse pointer-events-none" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Social proof */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-bold text-emerald-300 mb-8">
              <Users className="h-3.5 w-3.5" />
              {t('socialProofStudents', 'Join 1,000+ Pakistani students who have already started their journey')}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              {t('ctaBannerTitle', 'Ready to Plan Your Foreign Education?')}
            </h2>
            <p className="mt-5 text-slate-300 text-base sm:text-lg font-medium leading-relaxed">
              {t('ctaBannerSubtitle', 'Ask your first question now. Free, instant, and customized for Pakistani degrees.')}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold shadow-lg shadow-emerald-500/25 gap-2 text-base px-10 border-0 cursor-pointer">
                  <Zap className="h-5 w-5" />
                  {t('startFreeConsultation', 'Start Free Consultation')}
                </Button>
              </Link>
              {/* FIXED CONTRAST: Solid white button with dark slate text so it is 100% visible in both light & dark mode */}
              <Link href="/signup" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto h-12 px-8 rounded-xl font-extrabold text-base bg-white text-slate-900 hover:bg-slate-100 shadow-xl transition-all cursor-pointer border-2 border-white"
                >
                  {t('createFreeAccount', 'Create Free Account')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="font-black text-slate-900 dark:text-white text-base">
                  {tCommon('appName', 'Study Abroad Advisor')}
                </span>
              </Link>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                {t('footerTagline', 'AI-powered platform helping Pakistani students navigate foreign university admissions. Free. Always.')}
              </p>
              <div className="flex gap-3">
                <a href="https://github.com/AbdulAzeemHashmi/study-abroad-advisor" target="_blank" rel="noopener noreferrer"
                   className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                   title="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a href="#" className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                   title="Website"
                >
                  <Globe className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Product links */}
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
                {t('product', 'Product')}
              </p>
              <ul className="space-y-2.5">
                {[
                  { label: t('pkrCalculator', 'PKR Cost Calculator'), href: '#calculator' },
                  { label: t('destinations', 'Destination Explorer'), href: '#destinations' },
                  { label: t('advisorVsAgents', 'Advisor vs Agents'), href: '#compare' },
                  { label: tCommon('dashboard', 'Dashboard'), href: '/dashboard' },
                  { label: tCommon('compare', 'Compare Universities'), href: '/compare' },
                ].map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
                {t('resources', 'Resources')}
              </p>
              <ul className="space-y-2.5">
                {[
                  { label: t('faqs', 'Frequently Asked Questions'), href: '#faq' },
                  { label: tCommon('signIn', 'Sign In'), href: '/signin' },
                  { label: tCommon('signUp', 'Create Account'), href: '/signup' },
                  { label: t('githubRepo', 'GitHub Repository'), href: 'https://github.com/AbdulAzeemHashmi/study-abroad-advisor' },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
                {t('topDestinations', 'Top Destinations')}
              </p>
              <ul className="space-y-2.5">
                {[
                  { label: isUr ? '🇩🇪 جرمنی (مفت تعلیم)' : '🇩🇪 Germany (Free Tuition)', country: 'Germany' },
                  { label: isUr ? '🇮🇹 اٹلی (DSU اسکالرشپ)' : '🇮🇹 Italy (DSU Stipend)', country: 'Italy' },
                  { label: isUr ? '🇬🇧 برطانیہ' : '🇬🇧 United Kingdom', country: 'United Kingdom' },
                  { label: isUr ? '🇨🇦 کینیڈا' : '🇨🇦 Canada', country: 'Canada' },
                  { label: isUr ? '🇺🇸 امریکہ (STEM OPT)' : '🇺🇸 USA (STEM OPT)', country: 'USA' },
                  { label: isUr ? '🇦🇺 آسٹریلیا' : '🇦🇺 Australia', country: 'Australia' },
                ].map((d) => (
                  <li key={d.country}>
                    <button
                      type="button"
                      onClick={() => setSelectedDestination(d.country)}
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors text-left cursor-pointer"
                    >
                      {d.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
            <div>
              © {new Date().getFullYear()} {tCommon('appName', 'Study Abroad Advisor')}.{' '}
              <span className="text-slate-400">{t('footerNotice', 'Open source & free for Pakistani students worldwide.')}</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              {t('footerAllSystemsOperational', 'All AI systems operational')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
