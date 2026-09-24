'use client';

import React from 'react';
import { Star, CheckCircle2, Award } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const testimonialsEn = [
  {
    name: 'Hamza K.',
    originUni: 'FAST-NUCES Islamabad',
    targetUni: 'TU Darmstadt, Germany',
    program: 'M.Sc. Computer Science (Free Tuition)',
    flag: '🇩🇪',
    review:
      'Saved over ₨180,000 by not hiring an agent in Blue Area. The blocked account Sperrkonto breakdown and public university filter gave me the exact admission prerequisites for Darmstadt. Received my visa within 5 weeks!',
    rating: 5,
    year: 'Winter Intake 2024',
  },
  {
    name: 'Fatima Z.',
    originUni: 'NUST School of EE & CS',
    targetUni: 'Politecnico di Milano, Italy',
    program: 'M.Sc. Renewable Energy Systems',
    flag: '🇮🇹',
    review:
      'I was completely unaware of regional DSU scholarships until the Advisor recommended it. Not only was my tuition 100% free, I also received a €7,200 annual living grant. Best AI tool for Pakistani students.',
    rating: 5,
    year: 'Fall 2024 Scholar',
  },
  {
    name: 'Bilal A.',
    originUni: 'UET Lahore (Civil)',
    targetUni: 'University of Sheffield, UK',
    program: 'MSc Structural Engineering',
    flag: '🇬🇧',
    review:
      'The realistic PKR currency calculations prepared my family for the true tuition and maintenance costs. The visa requirement roadmap prevented major delays in CAS issuance and biometric appointment.',
    rating: 5,
    year: 'Graduate Route 2024',
  },
  {
    name: 'Ayesha N.',
    originUni: 'LUMS (Economics & Data)',
    targetUni: 'University of Waterloo, Canada',
    program: 'Master of Mathematics (Data Science)',
    flag: '🇨🇦',
    review:
      'Consultants in Lahore were pushing expensive private colleges. Study Abroad Advisor immediately matched me to top Canadian public research universities with full PGWP eligibility and TA funding.',
    rating: 5,
    year: 'Spring 2025 Scholar',
  },
];

const testimonialsUr = [
  {
    name: 'حمزہ کے.',
    originUni: 'فاسٹ یونیورسٹی اسلام آباد',
    targetUni: 'ٹی یو ڈارمسٹڈ، جرمنی',
    program: 'ایم ایس کمپیوٹر سائنس (مفت تعلیم)',
    flag: '🇩🇪',
    review:
      'اسلام آباد میں کسی ایجنٹ کو 180,000 روپے دیے بغیر خود اپلائی کیا۔ بلاک اکاؤنٹ کی تفصیلات اور پبلک یونیورسٹیوں کے فلٹر نے مجھے ڈارمسٹڈ کی بالکل درست شرائط بتائیں۔ ویزا صرف 5 ہفتوں میں موصول ہو گیا!',
    rating: 5,
    year: 'ونٹر سیشن 2024',
  },
  {
    name: 'فاطمہ زیڈ.',
    originUni: 'نسٹ یونیورسٹی (SEECS)',
    targetUni: 'پولی ٹیکنیکو دی میلانو، اٹلی',
    program: 'ایم ایس رینیوایبل انرجی',
    flag: '🇮🇹',
    review:
      'مجھے اٹلی کی ریجنل DSU اسکالرشپ کا بالکل علم نہیں تھا جب تک اس ایڈوائزر نے مجھے آگاہ نہیں کیا۔ نہ صرف میری ٹیوشن فیس 100% معاف ہوئی بلکہ سالانہ 7,200 یورو رہائشی وظیفہ بھی ملا۔',
    rating: 5,
    year: 'اسکالر فال 2024',
  },
  {
    name: 'بلال اے.',
    originUni: 'یو ای ٹی لاہور (سول انجینئرنگ)',
    targetUni: 'یونیورسٹی آف شیفیلڈ، برطانیہ',
    program: 'ایم ایس سی اسٹرکچرل انجینئرنگ',
    flag: '🇬🇧',
    review:
      'پاکستانی روپے میں فیس اور بینک اسٹیٹمنٹ کے درست حساب نے میرے گھر والوں کو کسی بھی اچانک مالی جھٹکے سے بچا لیا۔ بغیر کسی کنسلٹنٹ فیس کے مطلوبہ یونیورسٹی میں داخلہ لیا۔',
    rating: 5,
    year: 'گریجویٹ روٹ 2024',
  },
  {
    name: 'عائشہ این.',
    originUni: 'لمز یونیورسٹی (اکنامکس و ڈیٹا)',
    targetUni: 'یونیورسٹی آف واٹرلو، کینیڈا',
    program: 'ماسٹرز ان میتھمیٹکس و ڈیٹا سائنس',
    flag: '🇨🇦',
    review:
      'لاہور کے ایجنٹ مجھے پرائیویٹ مہنگے کالجز میں بھیجنے پر بضد تھے۔ اسٹڈی ابراڈ ایڈوائزر نے مجھے کینیڈا کی اعلیٰ ریسرچ یونیورسٹی میں ریسرچ اسسٹنٹ شپ اور 3 سالہ اوپن ورک پرمٹ کے ساتھ میچ کر دیا۔',
    rating: 5,
    year: 'اسپرنگ 2025 اسکالر',
  },
];

export default function TestimonialsSection() {
  const { locale } = useI18n();
  const isUr = locale === 'ur';
  const list = isUr ? testimonialsUr : testimonialsEn;

  return (
    <section className="relative z-10 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 px-4 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-4">
            <Award className="h-3.5 w-3.5" />
            <span>{isUr ? 'پاکستانی طلبہ کے تاثرات' : 'Pakistani Student Stories'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            {isUr ? (
              <>
                پاکستان سے <span className="gradient-text">عالمی جامعات تک</span>
              </>
            ) : (
              <>
                From Pakistan to <span className="gradient-text">Global Campuses</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium">
            {isUr
              ? 'ان طلبہ کے حقیقی تجربات جانیے جنہوں نے بغیر کسی ایجنٹ کو فیس دیے داخلے اور اسکالرشپس حاصل کیے۔'
              : 'Hear from students who navigated admissions, blocked accounts, and scholarships with zero agent fees.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {list.map((t, idx) => (
            <div
              key={idx}
              className="rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm hover:shadow-xl hover:border-emerald-400 dark:hover:border-emerald-700 transition-all flex flex-col justify-between reveal"
            >
              <div>
                {/* Rating & Flag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-2xl">{t.flag}</span>
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-6">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-extrabold text-slate-900 dark:text-white text-sm">
                    {t.name}
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {isUr ? `فارغ التحصیل: ${t.originUni}` : `Alum: ${t.originUni}`}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {t.targetUni}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {t.year}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
