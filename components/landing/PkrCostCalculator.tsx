'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  DollarSign,
  TrendingDown,
  Briefcase,
  PiggyBank,
  ArrowRight,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DestinationData {
  country: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  rateToPkr: number;
  levels: {
    [key: string]: {
      tuitionForeign: number; // 0 for free
      tuitionNote: string;
      livingForeignYear: number;
      minPartTimePkrMonth: number;
      pswDuration: string;
    };
  };
}

const destinationsData: DestinationData[] = [
  {
    country: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR',
    currencySymbol: '€',
    rateToPkr: 302,
    levels: {
      BS: { tuitionForeign: 0, tuitionNote: 'Free tuition at public universities', livingForeignYear: 11208, minPartTimePkrMonth: 270000, pswDuration: '18 Months' },
      MS: { tuitionForeign: 0, tuitionNote: 'Free tuition at public universities', livingForeignYear: 11208, minPartTimePkrMonth: 290000, pswDuration: '18 Months' },
      PhD: { tuitionForeign: 0, tuitionNote: 'Salaried / Free position', livingForeignYear: 0, minPartTimePkrMonth: 450000, pswDuration: '24 Months' },
    },
  },
  {
    country: 'Italy',
    flag: '🇮🇹',
    currency: 'EUR',
    currencySymbol: '€',
    rateToPkr: 302,
    levels: {
      BS: { tuitionForeign: 1200, tuitionNote: 'Income-adjusted (often €0 with DSU)', livingForeignYear: 7500, minPartTimePkrMonth: 180000, pswDuration: '12 Months' },
      MS: { tuitionForeign: 1000, tuitionNote: 'Income-adjusted (€0 with DSU stipend)', livingForeignYear: 7000, minPartTimePkrMonth: 210000, pswDuration: '12 Months' },
      PhD: { tuitionForeign: 0, tuitionNote: 'Funded scholarship position', livingForeignYear: 0, minPartTimePkrMonth: 380000, pswDuration: '12 Months' },
    },
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    currencySymbol: '£',
    rateToPkr: 360,
    levels: {
      BS: { tuitionForeign: 16000, tuitionNote: 'Standard international fee', livingForeignYear: 11000, minPartTimePkrMonth: 320000, pswDuration: '2 Years' },
      MS: { tuitionForeign: 15000, tuitionNote: '1-Year Master programs', livingForeignYear: 12000, minPartTimePkrMonth: 340000, pswDuration: '2 Years' },
      PhD: { tuitionForeign: 18000, tuitionNote: 'Scholarships available', livingForeignYear: 13000, minPartTimePkrMonth: 350000, pswDuration: '3 Years' },
    },
  },
  {
    country: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    currencySymbol: 'C$',
    rateToPkr: 206,
    levels: {
      BS: { tuitionForeign: 22000, tuitionNote: 'Standard university tuition', livingForeignYear: 15000, minPartTimePkrMonth: 260000, pswDuration: '3 Years' },
      MS: { tuitionForeign: 18000, tuitionNote: 'Thesis/Coursework MS', livingForeignYear: 14000, minPartTimePkrMonth: 280000, pswDuration: '3 Years' },
      PhD: { tuitionForeign: 9000, tuitionNote: 'High funding & TA/RA support', livingForeignYear: 10000, minPartTimePkrMonth: 380000, pswDuration: '3 Years' },
    },
  },
  {
    country: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    rateToPkr: 279,
    levels: {
      BS: { tuitionForeign: 25000, tuitionNote: 'Public state universities', livingForeignYear: 14000, minPartTimePkrMonth: 280000, pswDuration: '1-3 Years (STEM)' },
      MS: { tuitionForeign: 22000, tuitionNote: 'Merit aid & assistantships', livingForeignYear: 13000, minPartTimePkrMonth: 310000, pswDuration: '3 Years (STEM OPT)' },
      PhD: { tuitionForeign: 0, tuitionNote: 'Usually 100% tuition-waived + stipend', livingForeignYear: 0, minPartTimePkrMonth: 500000, pswDuration: '3 Years (STEM)' },
    },
  },
  {
    country: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    currencySymbol: 'A$',
    rateToPkr: 184,
    levels: {
      BS: { tuitionForeign: 28000, tuitionNote: 'Standard undergraduate rate', livingForeignYear: 18000, minPartTimePkrMonth: 340000, pswDuration: '2-4 Years' },
      MS: { tuitionForeign: 26000, tuitionNote: 'Master by coursework', livingForeignYear: 18000, minPartTimePkrMonth: 360000, pswDuration: '3-5 Years' },
      PhD: { tuitionForeign: 0, tuitionNote: 'RTP scholarships available', livingForeignYear: 0, minPartTimePkrMonth: 420000, pswDuration: '4-6 Years' },
    },
  },
  {
    country: 'Malaysia',
    flag: '🇲🇾',
    currency: 'USD',
    currencySymbol: '$',
    rateToPkr: 279,
    levels: {
      BS: { tuitionForeign: 4500, tuitionNote: 'Affordable top accredited unis', livingForeignYear: 4000, minPartTimePkrMonth: 90000, pswDuration: 'Limited' },
      MS: { tuitionForeign: 4000, tuitionNote: 'Low-cost English medium MS', livingForeignYear: 4000, minPartTimePkrMonth: 100000, pswDuration: 'Employment pass' },
      PhD: { tuitionForeign: 3000, tuitionNote: 'High acceptance for Pakistani scholars', livingForeignYear: 3500, minPartTimePkrMonth: 120000, pswDuration: 'Research pass' },
    },
  },
];

function formatPkr(val: number): string {
  if (val === 0) return 'Free (₨ 0)';
  if (val >= 10000000) return `₨ ${(val / 10000000).toFixed(2)} Crore`;
  if (val >= 100000) return `₨ ${(val / 100000).toFixed(1)} Lakh`;
  return `₨ ${val.toLocaleString('en-PK')}`;
}

export default function PkrCostCalculator() {
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<'BS' | 'MS' | 'PhD'>('MS');

  const dest = destinationsData[selectedCountryIndex];
  const levelData = dest.levels[selectedLevel];

  const annualTuitionPkr = levelData.tuitionForeign * dest.rateToPkr;
  const annualLivingPkr = levelData.livingForeignYear * dest.rateToPkr;
  const totalAnnualCostPkr = annualTuitionPkr + annualLivingPkr;
  const annualPartTimePkr = levelData.minPartTimePkrMonth * 12;
  const netEstimatedPkr = Math.max(0, totalAnnualCostPkr - annualPartTimePkr);

  return (
    <section id="calculator" className="relative z-10 py-20 md:py-28 bg-slate-100/70 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 px-4 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-4 shadow-xs">
            <Calculator className="h-3.5 w-3.5" />
            <span>Interactive PKR Budget Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Realistic Costs in <span className="gradient-text">Pakistani Rupees</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
            No unrealistic agent promises. Calculate your actual tuition, block account requirement, and part-time earnings in PKR.
          </p>
        </div>

        {/* Calculator Container */}
        <div className="rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xl reveal">
          {/* Controls: Country & Degree */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8 border-b border-slate-100 dark:border-slate-800">
            {/* Country Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                1. Select Target Destination
              </label>
              <div className="flex flex-wrap gap-2">
                {destinationsData.map((d, idx) => (
                  <button
                    key={d.country}
                    type="button"
                    onClick={() => setSelectedCountryIndex(idx)}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition-all ${
                      selectedCountryIndex === idx
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25 scale-102'
                        : 'border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-emerald-300'
                    }`}
                  >
                    <span>{d.flag}</span>
                    <span>{d.country}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Degree Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                2. Select Program Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['BS', 'MS', 'PhD'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedLevel(level)}
                    className={`rounded-xl py-2.5 text-xs sm:text-sm font-bold transition-all text-center ${
                      selectedLevel === level
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                        : 'border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-emerald-300'
                    }`}
                  >
                    {level === 'BS' ? "Bachelor's (BS)" : level === 'MS' ? "Master's (MS)" : 'PhD / Doctorate'}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Info className="h-3.5 w-3.5 text-emerald-500" />
                Live exchange reference: 1 {dest.currency} ≈ ₨ {dest.rateToPkr} PKR
              </p>
            </div>
          </div>

          {/* Metrics Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
            {/* Card 1: Annual Tuition */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Annual Tuition Fee
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">
                {formatPkr(annualTuitionPkr)}
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                {levelData.tuitionForeign === 0
                  ? 'Zero Tuition (100% Free)'
                  : `≈ ${dest.currencySymbol}${levelData.tuitionForeign.toLocaleString()} / year`}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-tight">
                {levelData.tuitionNote}
              </p>
            </div>

            {/* Card 2: Living & Blocked Account */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Living / Blocked Account
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">
                {formatPkr(annualLivingPkr)}
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
                {levelData.livingForeignYear === 0
                  ? 'Covered by Stipend'
                  : `≈ ${dest.currencySymbol}${levelData.livingForeignYear.toLocaleString()} / year`}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-tight">
                {dest.country === 'Germany' ? 'Official Sperrkonto required for visa' : 'Estimated housing, food & insurance'}
              </p>
            </div>

            {/* Card 3: Part-Time Work Potential */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Part-Time Work Potential
              </span>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
                {formatPkr(levelData.minPartTimePkrMonth)} /mo
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                20 hrs/week @ legal minimum wage
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-tight">
                Covers approx {Math.min(100, Math.round((annualPartTimePkr / (annualLivingPkr || 1)) * 100))}% of living costs
              </p>
            </div>

            {/* Card 4: Post-Study Work Permit (PSW) */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Post-Study Work Visa (PSW)
              </span>
              <div className="text-2xl font-black text-violet-600 dark:text-violet-400 mt-1">
                {levelData.pswDuration}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                Full-time legal work rights after graduation
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-tight">
                Direct pathway towards permanent residency (PR)
              </p>
            </div>
          </div>

          {/* Summary Banner & Direct Action */}
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                <CheckCircle2 className="h-4 w-4" />
                <span>Estimated Net First-Year Outlay: {formatPkr(netEstimatedPkr)}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Calculations include visa proof of funds. Many Pakistani students in {dest.country} sustain living expenses via on-campus or legal student part-time jobs.
              </p>
            </div>
            <Link
              href={`/dashboard?q=${encodeURIComponent(`Give me a detailed step-by-step budget and admission breakdown for ${selectedLevel} in ${dest.country} for a Pakistani student`)}`}
              className="w-full md:w-auto shrink-0"
            >
              <Button size="lg" className="w-full md:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold gap-2 shadow-lg shadow-emerald-500/25">
                <span>Get Detailed {dest.country} Report</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
