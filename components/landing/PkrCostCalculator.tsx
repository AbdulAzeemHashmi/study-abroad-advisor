'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  ArrowRight,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';

interface DestinationData {
  country: string;
  countryUr: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  rateToPkr: number;
  levels: {
    [key: string]: {
      tuitionForeign: number; // 0 for free
      tuitionNoteEn: string;
      tuitionNoteUr: string;
      livingForeignYear: number;
      minPartTimePkrMonth: number;
      pswDurationEn: string;
      pswDurationUr: string;
    };
  };
}

const destinationsData: DestinationData[] = [
  {
    country: 'Germany',
    countryUr: 'جرمنی',
    flag: '🇩🇪',
    currency: 'EUR',
    currencySymbol: '€',
    rateToPkr: 302,
    levels: {
      BS: { tuitionForeign: 0, tuitionNoteEn: 'Free tuition at public universities', tuitionNoteUr: 'پبلک یونیورسٹیوں میں 100% مفت ٹیوشن', livingForeignYear: 11208, minPartTimePkrMonth: 270000, pswDurationEn: '18 Months', pswDurationUr: '18 ماہ' },
      MS: { tuitionForeign: 0, tuitionNoteEn: 'Free tuition at public universities', tuitionNoteUr: 'پبلک یونیورسٹیوں میں 100% مفت ٹیوشن', livingForeignYear: 11208, minPartTimePkrMonth: 290000, pswDurationEn: '18 Months', pswDurationUr: '18 ماہ' },
      PhD: { tuitionForeign: 0, tuitionNoteEn: 'Salaried / Free position', tuitionNoteUr: 'تنخواہ کے ساتھ مفت پوزیشن', livingForeignYear: 0, minPartTimePkrMonth: 450000, pswDurationEn: '24 Months', pswDurationUr: '24 ماہ' },
    },
  },
  {
    country: 'Italy',
    countryUr: 'اٹلی',
    flag: '🇮🇹',
    currency: 'EUR',
    currencySymbol: '€',
    rateToPkr: 302,
    levels: {
      BS: { tuitionForeign: 1200, tuitionNoteEn: 'Income-adjusted (often €0 with DSU)', tuitionNoteUr: 'آمدنی کے مطابق (ڈی ایس یو کے ساتھ 0 یورو)', livingForeignYear: 7500, minPartTimePkrMonth: 180000, pswDurationEn: '12 Months', pswDurationUr: '12 ماہ' },
      MS: { tuitionForeign: 1000, tuitionNoteEn: 'Income-adjusted (€0 with DSU stipend)', tuitionNoteUr: 'ڈی ایس یو اسکالرشپ کے ساتھ مفت اور وظیفہ', livingForeignYear: 7000, minPartTimePkrMonth: 210000, pswDurationEn: '12 Months', pswDurationUr: '12 ماہ' },
      PhD: { tuitionForeign: 0, tuitionNoteEn: 'Funded scholarship position', tuitionNoteUr: 'مکمل فنڈڈ اسکالرشپ پوزیشن', livingForeignYear: 0, minPartTimePkrMonth: 380000, pswDurationEn: '12 Months', pswDurationUr: '12 ماہ' },
    },
  },
  {
    country: 'United Kingdom',
    countryUr: 'برطانیہ',
    flag: '🇬🇧',
    currency: 'GBP',
    currencySymbol: '£',
    rateToPkr: 360,
    levels: {
      BS: { tuitionForeign: 16000, tuitionNoteEn: 'Standard international fee', tuitionNoteUr: 'بین الاقوامی طلبہ کی معیاری فیس', livingForeignYear: 11000, minPartTimePkrMonth: 320000, pswDurationEn: '2 Years', pswDurationUr: '2 سال' },
      MS: { tuitionForeign: 15000, tuitionNoteEn: '1-Year Master programs', tuitionNoteUr: '1 سالہ فاسٹ ٹریک ماسٹرز', livingForeignYear: 12000, minPartTimePkrMonth: 340000, pswDurationEn: '2 Years', pswDurationUr: '2 سال' },
      PhD: { tuitionForeign: 18000, tuitionNoteEn: 'Scholarships available', tuitionNoteUr: 'ریسرچ اسکالرشپس دستیاب ہیں', livingForeignYear: 13000, minPartTimePkrMonth: 350000, pswDurationEn: '3 Years', pswDurationUr: '3 سال' },
    },
  },
  {
    country: 'Canada',
    countryUr: 'کینیڈا',
    flag: '🇨🇦',
    currency: 'CAD',
    currencySymbol: 'C$',
    rateToPkr: 206,
    levels: {
      BS: { tuitionForeign: 22000, tuitionNoteEn: 'Standard university tuition', tuitionNoteUr: 'معیاری یونیورسٹی فیس', livingForeignYear: 15000, minPartTimePkrMonth: 260000, pswDurationEn: '3 Years', pswDurationUr: '3 سال' },
      MS: { tuitionForeign: 18000, tuitionNoteEn: 'Thesis/Coursework MS', tuitionNoteUr: 'تھیسس یا کورس ورک ایم ایس', livingForeignYear: 14000, minPartTimePkrMonth: 280000, pswDurationEn: '3 Years', pswDurationUr: '3 سال' },
      PhD: { tuitionForeign: 9000, tuitionNoteEn: 'High funding & TA/RA support', tuitionNoteUr: 'ٹی اے / آر اے فنڈنگ کی سہولت', livingForeignYear: 10000, minPartTimePkrMonth: 380000, pswDurationEn: '3 Years', pswDurationUr: '3 سال' },
    },
  },
  {
    country: 'United States',
    countryUr: 'امریکہ',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    rateToPkr: 279,
    levels: {
      BS: { tuitionForeign: 25000, tuitionNoteEn: 'Public state universities', tuitionNoteUr: 'پبلک اسٹیٹ یونیورسٹیاں', livingForeignYear: 14000, minPartTimePkrMonth: 280000, pswDurationEn: '1-3 Years (STEM)', pswDurationUr: '1 تا 3 سال (STEM)' },
      MS: { tuitionForeign: 22000, tuitionNoteEn: 'Merit aid & assistantships', tuitionNoteUr: 'میرٹ اسکالرشپ اور اسسٹنٹ شپس', livingForeignYear: 13000, minPartTimePkrMonth: 310000, pswDurationEn: '3 Years (STEM OPT)', pswDurationUr: '3 سال (STEM OPT)' },
      PhD: { tuitionForeign: 0, tuitionNoteEn: 'Usually 100% tuition-waived + stipend', tuitionNoteUr: '100% مفت ٹیوشن مع ماہانہ وظیفہ', livingForeignYear: 0, minPartTimePkrMonth: 500000, pswDurationEn: '3 Years (STEM)', pswDurationUr: '3 سال (STEM)' },
    },
  },
  {
    country: 'Australia',
    countryUr: 'آسٹریلیا',
    flag: '🇦🇺',
    currency: 'AUD',
    currencySymbol: 'A$',
    rateToPkr: 184,
    levels: {
      BS: { tuitionForeign: 28000, tuitionNoteEn: 'Standard undergraduate rate', tuitionNoteUr: 'انڈرگریجویٹ فیس', livingForeignYear: 18000, minPartTimePkrMonth: 340000, pswDurationEn: '2-4 Years', pswDurationUr: '2 تا 4 سال' },
      MS: { tuitionForeign: 26000, tuitionNoteEn: 'Master by coursework', tuitionNoteUr: 'ماسٹرز کورس ورک', livingForeignYear: 18000, minPartTimePkrMonth: 360000, pswDurationEn: '3-5 Years', pswDurationUr: '3 تا 5 سال' },
      PhD: { tuitionForeign: 0, tuitionNoteEn: 'RTP scholarships available', tuitionNoteUr: 'آر ٹی پی فل فنڈڈ اسکالرشپ', livingForeignYear: 0, minPartTimePkrMonth: 420000, pswDurationEn: '4-6 Years', pswDurationUr: '4 تا 6 سال' },
    },
  },
  {
    country: 'Malaysia',
    countryUr: 'ملائیشیا',
    flag: '🇲🇾',
    currency: 'USD',
    currencySymbol: '$',
    rateToPkr: 279,
    levels: {
      BS: { tuitionForeign: 4500, tuitionNoteEn: 'Affordable top accredited unis', tuitionNoteUr: 'انتہائی مناسب فیس اور معیاری تعلیم', livingForeignYear: 4000, minPartTimePkrMonth: 90000, pswDurationEn: 'Employment pass', pswDurationUr: 'ایمپلائمنٹ پاس' },
      MS: { tuitionForeign: 4000, tuitionNoteEn: 'Low-cost English medium MS', tuitionNoteUr: 'کم خرچ انگریزی میڈیم ایم ایس', livingForeignYear: 4000, minPartTimePkrMonth: 100000, pswDurationEn: 'Employment pass', pswDurationUr: 'ایمپلائمنٹ پاس' },
      PhD: { tuitionForeign: 3000, tuitionNoteEn: 'High acceptance for Pakistani scholars', tuitionNoteUr: 'پاکستانی طلبہ کے لیے آسان داخلے', livingForeignYear: 3500, minPartTimePkrMonth: 120000, pswDurationEn: 'Research pass', pswDurationUr: 'ریسرچ پاس' },
    },
  },
];

function formatPkr(val: number, isUr: boolean): string {
  if (val === 0) return isUr ? 'مفت (0 روپے)' : 'Free (₨ 0)';
  if (val >= 10000000) {
    const num = (val / 10000000).toFixed(2);
    return isUr ? `${num} کروڑ روپے` : `₨ ${num} Crore`;
  }
  if (val >= 100000) {
    const num = (val / 100000).toFixed(1);
    return isUr ? `${num} لاکھ روپے` : `₨ ${num} Lakh`;
  }
  return isUr ? `${val.toLocaleString('ur-PK')} روپے` : `₨ ${val.toLocaleString('en-PK')}`;
}

export default function PkrCostCalculator() {
  const { locale, dir } = useI18n();
  const isUr = locale === 'ur';

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
            <span>
              {isUr ? 'پاکستانی روپے میں بجٹ کا تخمینہ' : 'Interactive PKR Budget Estimator'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            {isUr ? (
              <>
                پاکستانی روپے میں <span className="gradient-text">حقیقت پسندانہ اخراجات</span>
              </>
            ) : (
              <>
                Realistic Costs in <span className="gradient-text">Pakistani Rupees</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
            {isUr
              ? 'ایجنٹوں کے فرضی دعووں کے بغیر، اپنی حقیقی فیس، بلاک اکاؤنٹ اور پارٹ ٹائم کمائی کا درست حساب لگائیں۔'
              : 'No unrealistic agent promises. Calculate your actual tuition, block account requirement, and part-time earnings in PKR.'}
          </p>
        </div>

        {/* Calculator Container */}
        <div className="rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xl reveal">
          {/* Controls: Country & Degree */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8 border-b border-slate-100 dark:border-slate-800">
            {/* Country Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                {isUr ? '1. مطلوبہ تعلیمی ملک منتخب کریں' : '1. Select Target Destination'}
              </label>
              <div className="flex flex-wrap gap-2">
                {destinationsData.map((d, idx) => (
                  <button
                    key={d.country}
                    type="button"
                    onClick={() => setSelectedCountryIndex(idx)}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      selectedCountryIndex === idx
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25 scale-102'
                        : 'border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-emerald-300'
                    }`}
                  >
                    <span>{d.flag}</span>
                    <span>{isUr ? d.countryUr : d.country}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Degree Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                {isUr ? '2. تعلیمی سطح منتخب کریں' : '2. Select Program Level'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['BS', 'MS', 'PhD'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedLevel(level)}
                    className={`rounded-xl py-2.5 text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
                      selectedLevel === level
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                        : 'border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-emerald-300'
                    }`}
                  >
                    {level === 'BS'
                      ? (isUr ? 'بیچلر (BS)' : "Bachelor's (BS)")
                      : level === 'MS'
                      ? (isUr ? 'ماسٹرز (MS)' : "Master's (MS)")
                      : (isUr ? 'پی ایچ ڈی (PhD)' : 'PhD / Doctorate')}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Info className="h-3.5 w-3.5 text-emerald-500" />
                {isUr
                  ? `کرنسی کا موجودہ تخمینہ: 1 ${dest.currency} ≈ ${dest.rateToPkr} روپے`
                  : `Live exchange reference: 1 ${dest.currency} ≈ ₨ ${dest.rateToPkr} PKR`}
              </p>
            </div>
          </div>

          {/* Metrics Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
            {/* Card 1: Annual Tuition */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {isUr ? 'سالانہ ٹیوشن فیس' : 'Annual Tuition Fee'}
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">
                {formatPkr(annualTuitionPkr, isUr)}
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                {levelData.tuitionForeign === 0
                  ? (isUr ? 'کوئی ٹیوشن فیس نہیں (100% مفت)' : 'Zero Tuition (100% Free)')
                  : (isUr ? `تقریباً ${dest.currencySymbol}${levelData.tuitionForeign.toLocaleString()} سالانہ` : `≈ ${dest.currencySymbol}${levelData.tuitionForeign.toLocaleString()} / year`)}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-tight">
                {isUr ? levelData.tuitionNoteUr : levelData.tuitionNoteEn}
              </p>
            </div>

            {/* Card 2: Living & Blocked Account */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {isUr ? 'سالانہ رہائش و بلاک اکاؤنٹ' : 'Living / Blocked Account'}
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">
                {formatPkr(annualLivingPkr, isUr)}
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
                {levelData.livingForeignYear === 0
                  ? (isUr ? 'وظیفے میں شامل ہے' : 'Covered by Stipend')
                  : (isUr ? `تقریباً ${dest.currencySymbol}${levelData.livingForeignYear.toLocaleString()} سالانہ` : `≈ ${dest.currencySymbol}${levelData.livingForeignYear.toLocaleString()} / year`)}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-tight">
                {dest.country === 'Germany'
                  ? (isUr ? 'ویزا کے لیے سرکاری بلاک اکاؤنٹ (Sperrkonto) لازمی ہے' : 'Official Sperrkonto required for visa')
                  : (isUr ? 'رہائش، خوراک اور میڈیکل انشورنس کا تخمینہ' : 'Estimated housing, food & insurance')}
              </p>
            </div>

            {/* Card 3: Part-Time Work Potential */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {isUr ? 'پارٹ ٹائم جاب سے متوقع آمدنی' : 'Part-Time Work Potential'}
              </span>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
                {formatPkr(levelData.minPartTimePkrMonth, isUr)} {isUr ? '/ ماہ' : '/mo'}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                {isUr ? '20 گھنٹے فی ہفتہ قانونی کم از کم اجرت پر' : '20 hrs/week @ legal minimum wage'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-tight">
                {isUr
                  ? `رہائشی اخراجات کا تقریباً ${Math.min(100, Math.round((annualPartTimePkr / (annualLivingPkr || 1)) * 100))}% پورا کرتا ہے`
                  : `Covers approx ${Math.min(100, Math.round((annualPartTimePkr / (annualLivingPkr || 1)) * 100))}% of living costs`}
              </p>
            </div>

            {/* Card 4: Post-Study Work Permit (PSW) */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {isUr ? 'پوسٹ اسٹڈی ورک ویزا (PSW)' : 'Post-Study Work Visa (PSW)'}
              </span>
              <div className="text-2xl font-black text-violet-600 dark:text-violet-400 mt-1">
                {isUr ? levelData.pswDurationUr : levelData.pswDurationEn}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                {isUr ? 'ڈگری کے بعد فل ٹائم قانونی ملازمت کے حقوق' : 'Full-time legal work rights after graduation'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-tight">
                {isUr ? 'مستقل رہائش (PR) کی جانب براہِ راست راستہ' : 'Direct pathway towards permanent residency (PR)'}
              </p>
            </div>
          </div>

          {/* Summary Banner & Direct Action */}
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  {isUr
                    ? `پہلے سال کا متوقع خالص خرچ: ${formatPkr(netEstimatedPkr, isUr)}`
                    : `Estimated Net First-Year Outlay: ${formatPkr(netEstimatedPkr, false)}`}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                {isUr
                  ? `اس حساب میں ویزا کے لیے درکار فنڈز شامل ہیں۔ ${dest.countryUr} میں زیادہ تر پاکستانی طلبہ پارٹ ٹائم کام کے ذریعے اپنے اخراجات بخوبی خود پورے کرتے ہیں۔`
                  : `Calculations include visa proof of funds. Many Pakistani students in ${dest.country} sustain living expenses via on-campus or legal student part-time jobs.`}
              </p>
            </div>
            <Link
              href={`/dashboard?q=${encodeURIComponent(
                isUr
                  ? `پاکستانی طالب علم کے لیے ${dest.countryUr} میں ${selectedLevel} کے اخراجات، بلاک اکاؤنٹ اور داخلے کا مکمل پلان بتائیں۔`
                  : `Give me a detailed step-by-step budget and admission breakdown for ${selectedLevel} in ${dest.country} for a Pakistani student`
              )}`}
              className="w-full md:w-auto shrink-0"
            >
              <Button size="lg" className="w-full md:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold gap-2 shadow-lg shadow-emerald-500/25">
                <span>
                  {isUr ? `${dest.countryUr} کے بجٹ کی مکمل رپورٹ حاصل کریں` : `Get Detailed ${dest.country} Report`}
                </span>
                <ArrowRight className={`h-4 w-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
