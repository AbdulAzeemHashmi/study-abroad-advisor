'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  SlidersHorizontal,
  GraduationCap,
  DollarSign,
  Globe2,
  BookmarkPlus,
  CheckCircle2,
  ExternalLink,
  Layers,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslations, useI18n } from '@/lib/i18n';
import { formatCurrency, convertUSDToPKR } from '@/lib/utils';

export interface UniversityRecommendation {
  id: string;
  name: string;
  country: string;
  city?: string;
  ranking?: number;
  tuitionMin?: number;
  tuitionMax?: number;
  livingCost?: number;
  programs?: string[];
  website?: string;
  matchReason?: string;
}

export interface ConsultationResponse {
  answer: string;
  provider: 'Gemini' | 'Grok' | 'Llama' | 'Knowledge Base';
  universities: UniversityRecommendation[];
  excludedCheckPassed: boolean;
}

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const tCommon = useTranslations('common');
  const { locale, dir } = useI18n();

  // Consultation query states
  const [query, setQuery] = useState('');
  const [degreeLevel, setDegreeLevel] = useState('MS');
  const [maxBudget, setMaxBudget] = useState('15000');
  const [preferredRegion, setPreferredRegion] = useState('all');
  const [hasIELTS, setHasIELTS] = useState(true);

  // Results & UI states
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ConsultationResponse | null>(null);
  const [error, setError] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Quick sample queries
  const samplePrompts = [
    {
      label: 'Free/Low-Cost MS in Germany & Italy',
      text: 'I have a 3.2 CGPA in BS Computer Science. Looking for English-taught Master programs in Germany or Italy with low tuition and 18-month job seeker visa.',
    },
    {
      label: 'Funded PhD in USA / Canada',
      text: 'Completed MS in Electrical Engineering from NUST. Seeking fully-funded PhD positions (RA/TA) in USA or Canada with GRE waiver.',
    },
    {
      label: 'Affordable BS in Turkey or Malaysia',
      text: 'Completed FSc Pre-Engineering with 82%. My budget is $6,000/year for tuition and living. What are the best accredited universities in Turkey or Malaysia?',
    },
  ];

  const handleConsult = async (customQuery?: string) => {
    const activeQuery = customQuery || query;
    if (!activeQuery.trim()) return;

    setIsLoading(true);
    setError('');
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: activeQuery,
          degreeLevel,
          maxBudget: Number(maxBudget),
          preferredRegion,
          hasIELTS,
          locale,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to retrieve recommendations.');
      } else {
        setResult(data);
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveQuery = async () => {
    if (!result) return;
    try {
      const res = await fetch('/api/consult/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          response: result.answer,
          degreeLevel,
          targetRegion: preferredRegion,
        }),
      });
      if (res.ok) {
        setSavedSuccess(true);
      }
    } catch {
      // Offline fallback: save to localStorage
      const existing = JSON.parse(localStorage.getItem('sa_saved_queries') || '[]');
      existing.unshift({
        id: Date.now().toString(),
        query,
        response: result.answer,
        provider: result.provider,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('sa_saved_queries', JSON.stringify(existing));
      setSavedSuccess(true);
    }
  };

  const handleAddToCompare = (uni: UniversityRecommendation) => {
    const existing = JSON.parse(localStorage.getItem('sa_compare_unis') || '[]');
    if (!existing.some((item: any) => item.id === uni.id)) {
      existing.push(uni);
      localStorage.setItem('sa_compare_unis', JSON.stringify(existing));
      alert(`"${uni.name}" added to comparison table! Visit the Compare page.`);
    } else {
      alert(`"${uni.name}" is already in your comparison table.`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('welcome', 'Study Abroad AI Consultant')}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t('subtitle', 'Ask anything about degrees, budgets, visa rules, and universities.')}
            </p>
          </div>

          {/* Strict Exclusion & Live AI Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success" className="gap-1.5 py-1 px-3">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Quality Destination Filter Active</span>
            </Badge>
            <Badge variant="secondary" className="gap-1.5 py-1 px-3">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Failover: Gemini → Grok → Llama</span>
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Grid: Filters + Consultation Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Quick Consultation Filters */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-slate-200/80 shadow-md dark:border-slate-800">
            <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800/80">
              <CardTitle className="text-base flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
                <span>{t('quickFilters', 'Consultation Filters')}</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Refine recommendations for Pakistani degree profiles
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-5 space-y-4 text-sm">
              {/* Target Degree Level */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {t('degreeLevel', 'Target Program Level')}
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {['BS', 'MS', 'PhD', 'Postdoc'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setDegreeLevel(lvl)}
                      className={`rounded-xl py-2 text-xs font-semibold transition-all ${
                        degreeLevel === lvl
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Tuition Budget */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">
                    {t('maxBudget', 'Max Tuition Budget / Year')}
                  </span>
                  <span className="text-emerald-600 font-bold">
                    ${Number(maxBudget).toLocaleString()} (~{convertUSDToPKR(Number(maxBudget))})
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40000"
                  step="1000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Free ($0)</span>
                  <span>$20k</span>
                  <span>$40k+</span>
                </div>
              </div>

              {/* Preferred Region */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {t('preferredRegion', 'Preferred Region')}
                </label>
                <select
                  value={preferredRegion}
                  onChange={(e) => setPreferredRegion(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs font-medium dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">{t('allRegions', 'Any Recommended Destination')}</option>
                  <option value="europe">{t('europe', 'Europe (Germany, Italy, Nordic)')}</option>
                  <option value="uk">{t('uk', 'United Kingdom')}</option>
                  <option value="usaCanada">{t('usaCanada', 'USA & Canada')}</option>
                  <option value="australia">{t('australia', 'Australia & New Zealand')}</option>
                  <option value="asia">{t('asia', 'Asia (Turkey, Malaysia, South Korea, Japan)')}</option>
                </select>
              </div>

              {/* English Test Status */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  IELTS / PTE / TOEFL Ready?
                </span>
                <button
                  type="button"
                  onClick={() => setHasIELTS(!hasIELTS)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
                    hasIELTS ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform mt-1 ${
                      hasIELTS ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Sample Prompts */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Quick Suggestions
            </span>
            <div className="space-y-2">
              {samplePrompts.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setQuery(sample.text);
                    handleConsult(sample.text);
                  }}
                  className="w-full text-left p-3 rounded-xl border border-slate-200/80 bg-white/70 dark:border-slate-800 dark:bg-slate-900/70 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all text-xs group"
                >
                  <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 transition-colors">
                    {sample.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                    {sample.text}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Query Input & AI Consultation Results */}
        <div className="lg:col-span-8 space-y-6">
          {/* Query Box Card */}
          <Card className="border-slate-200/80 shadow-md dark:border-slate-800">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="relative">
                  <textarea
                    rows={4}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t(
                      'queryPlaceholder',
                      'e.g. I have 3.3 CGPA in BS CS, annual budget $12,000. Want European universities with post-study work visa and English-taught MS.'
                    )}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-800 dark:bg-slate-900/50 dark:focus:bg-slate-900 transition-all resize-none"
                    disabled={isLoading}
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Press Ask Advisor to query 500+ verified global universities.
                    </span>
                    <Button
                      onClick={() => handleConsult()}
                      disabled={isLoading || !query.trim()}
                      variant="gradient"
                      className="gap-2 px-6"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>{t('asking', 'Evaluating...')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('askButton', 'Ask Advisor')}</span>
                          <Send className={`h-4 w-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loading Skeleton */}
          {isLoading && (
            <Card className="border-slate-200/80 p-6 space-y-4 animate-pulse dark:border-slate-800">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <Skeleton className="h-32 rounded-2xl" />
                <Skeleton className="h-32 rounded-2xl" />
              </div>
            </Card>
          )}

          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* AI Consultation Response */}
          {result && !isLoading && (
            <div className="space-y-6 animate-fade-in">
              {/* Advisor Response Card */}
              <Card className="border-emerald-200/80 bg-gradient-to-b from-white to-emerald-50/20 shadow-lg dark:border-emerald-900/50 dark:from-slate-900 dark:to-emerald-950/10">
                <CardHeader className="pb-3 border-b border-emerald-100 dark:border-emerald-950/60 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base text-emerald-950 dark:text-emerald-200">
                        {t('recommendations', 'AI Consultation & Recommendation')}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-500">
                          Responded via:
                        </span>
                        <Badge variant="success" className="text-[10px] py-0 px-2">
                          {result.provider}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Save button */}
                  <Button
                    onClick={handleSaveQuery}
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    disabled={savedSuccess}
                  >
                    {savedSuccess ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="h-4 w-4" />
                        <span>Save Consultation</span>
                      </>
                    )}
                  </Button>
                </CardHeader>

                <CardContent className="pt-6">
                  {/* Formatted Markdown-like Text */}
                  <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200">
                    {result.answer}
                  </div>
                </CardContent>
              </Card>

              {/* Matched Universities Grid */}
              {result.universities && result.universities.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Globe2 className="h-5 w-5 text-emerald-600" />
                      <span>Matching International Institutions</span>
                    </h3>
                    <span className="text-xs text-slate-500">
                      {result.universities.length} institutions evaluated
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.universities.map((uni) => (
                      <Card
                        key={uni.id}
                        className="border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-300 dark:border-slate-800 dark:hover:border-emerald-700 transition-all flex flex-col justify-between"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <CardTitle className="text-base font-bold leading-snug">
                                {uni.name}
                              </CardTitle>
                              <CardDescription className="text-xs mt-0.5 flex items-center gap-1.5">
                                <span className="font-semibold text-slate-700 dark:text-slate-300">
                                  {uni.city ? `${uni.city}, ` : ''}{uni.country}
                                </span>
                              </CardDescription>
                            </div>
                            {uni.ranking && (
                              <Badge variant="secondary" className="shrink-0 text-xs font-mono">
                                #{uni.ranking} Global
                              </Badge>
                            )}
                          </div>
                        </CardHeader>

                        <CardContent className="pt-0 space-y-3 text-xs">
                          {/* Cost Grid */}
                          <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-2.5 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                            <div>
                              <span className="text-[10px] text-slate-400 block uppercase">
                                Tuition (Yearly)
                              </span>
                              <span className="font-bold text-slate-800 dark:text-slate-200">
                                {uni.tuitionMin === 0 ? 'Tuition Free / Nominal' : formatCurrency(uni.tuitionMin)}
                              </span>
                              {uni.tuitionMin !== undefined && (
                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-medium">
                                  ~{convertUSDToPKR(uni.tuitionMin)}
                                </span>
                              )}
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 block uppercase">
                                Living / Blocked Acc.
                              </span>
                              <span className="font-bold text-slate-800 dark:text-slate-200">
                                {formatCurrency(uni.livingCost)}
                              </span>
                              {uni.livingCost !== undefined && (
                                <span className="text-[10px] text-slate-500 block">
                                  ~{convertUSDToPKR(uni.livingCost)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Programs */}
                          {uni.programs && (
                            <div className="flex flex-wrap gap-1">
                              {uni.programs.slice(0, 3).map((prog, pIdx) => (
                                <span
                                  key={pIdx}
                                  className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                                >
                                  {prog}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Match Reason */}
                          {uni.matchReason && (
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 italic">
                              "{uni.matchReason}"
                            </p>
                          )}

                          {/* Card Actions */}
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => handleAddToCompare(uni)}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                            >
                              <Layers className="h-3.5 w-3.5" />
                              <span>Add to Compare</span>
                            </button>

                            {uni.website && (
                              <a
                                href={uni.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                              >
                                <span>Official Site</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
