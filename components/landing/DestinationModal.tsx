'use client';

import React from 'react';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';

export interface DestinationDetail {
  flag: string;
  nameEn: string;
  nameUr: string;
  avgTuitionPkrEn: string;
  avgTuitionPkrUr: string;
  blockAccountPkrEn: string;
  blockAccountPkrUr: string;
  pswYearsEn: string;
  pswDurationUr: string;
  ieltsRequirementEn: string;
  ieltsRequirementUr: string;
  topUnis: string[];
  keyBenefitEn: string;
  keyBenefitUr: string;
}

export const destinationDetailsMap: Record<string, DestinationDetail> = {
  Germany: {
    flag: '🇩🇪',
    nameEn: 'Germany',
    nameUr: 'جرمنی',
    avgTuitionPkrEn: 'Free (₨0 tuition at public universities)',
    avgTuitionPkrUr: '100% مفت (پبلک یونیورسٹیوں میں 0 روپے فیس)',
    blockAccountPkrEn: '€11,208 ≈ ₨33.8 Lakh (Sperrkonto)',
    blockAccountPkrUr: '11,208 یورو ≈ 33.8 لاکھ روپے (سرکاری بلاک اکاؤنٹ)',
    pswYearsEn: '18 Months Post-Study Work Visa',
    pswDurationUr: '18 ماہ کا پوسٹ اسٹڈی جاب سرچ ویزا',
    ieltsRequirementEn: '6.0 - 6.5 (Many accept English Proficiency Letters)',
    ieltsRequirementUr: '6.0 - 6.5 (زیادہ تر MOI انگلش لیٹر قبول کرتی ہیں)',
    topUnis: ['TU Munich', 'RWTH Aachen', 'KIT Karlsruhe'],
    keyBenefitEn: 'World-class tuition-free engineering and IT programs with 18-month job search visa.',
    keyBenefitUr: 'دنیا کی بہترین بغیر ٹیوشن فیس انجینئرنگ و آئی ٹی ڈگریاں اور 18 ماہ کا جاب سرچ ویزا۔',
  },
  'United Kingdom': {
    flag: '🇬🇧',
    nameEn: 'United Kingdom',
    nameUr: 'برطانیہ',
    avgTuitionPkrEn: '₨45 Lakh - 65 Lakh / year (£13k-19k)',
    avgTuitionPkrUr: '45 تا 65 لاکھ روپے سالانہ (£13k-19k)',
    blockAccountPkrEn: '£9,207 - £12,006 in bank for 28 days',
    blockAccountPkrUr: '28 دن کے لیے بینک اکاؤنٹ میں £9,207 - £12,006',
    pswYearsEn: '2 Years Graduate Route (3 Years for PhD)',
    pswDurationUr: '2 سالہ گریجویٹ روٹ ورک ویزا (پی ایچ ڈی کے لیے 3 سال)',
    ieltsRequirementEn: '6.0 - 6.5 (Internal test waivers available)',
    ieltsRequirementUr: '6.0 - 6.5 (انٹرنل ٹیسٹ یا چھوٹ ممکن ہے)',
    topUnis: ['Univ of Manchester', 'Univ of Sheffield', 'Univ of Leeds'],
    keyBenefitEn: '1-year fast-track Master degrees with 2-year guaranteed Graduate Route work visa.',
    keyBenefitUr: '1 سالہ تیز رفتار ماسٹرز ڈگری اور اس کے بعد 2 سالہ گارنٹیڈ ورک پرمٹ۔',
  },
  USA: {
    flag: '🇺🇸',
    nameEn: 'USA',
    nameUr: 'امریکہ',
    avgTuitionPkrEn: '₨50 Lakh - 85 Lakh / year (High merit aid)',
    avgTuitionPkrUr: '50 تا 85 لاکھ روپے سالانہ (اعلیٰ وظائف دستیاب)',
    blockAccountPkrEn: 'I-20 financial proof (1st year fees + living)',
    blockAccountPkrUr: 'I-20 فنانشل پروف (پہلے سال کی فیس اور رہائش)',
    pswYearsEn: '3 Years (12-mo OPT + 24-mo STEM extension)',
    pswDurationUr: '3 سال (12 ماہ OPT اور 24 ماہ STEM ایکسٹینشن)',
    ieltsRequirementEn: '6.5 - 7.0 (or TOEFL / Duolingo)',
    ieltsRequirementUr: '6.5 - 7.0 (یا TOEFL / Duolingo ٹیسٹ)',
    topUnis: ['Purdue University', 'UT Dallas', 'Arizona State Univ'],
    keyBenefitEn: 'Unmatched research funding (RA/TA assistantships) and 36 months of STEM OPT legal work.',
    keyBenefitUr: 'بے مثال ریسرچ فنڈنگ (RA/TA) اور سائنس و آئی ٹی میں 36 ماہ کے قانونی کام کے حقوق۔',
  },
  Canada: {
    flag: '🇨🇦',
    nameEn: 'Canada',
    nameUr: 'کینیڈا',
    avgTuitionPkrEn: '₨35 Lakh - 55 Lakh / year (C$18k-26k)',
    avgTuitionPkrUr: '35 تا 55 لاکھ روپے سالانہ (C$18k-26k)',
    blockAccountPkrEn: 'C$20,635 minimum living expenses proof',
    blockAccountPkrUr: 'C$20,635 سالانہ رہائشی اخراجات کا ثبوت',
    pswYearsEn: 'Up to 3 Years PGWP (Work Permit)',
    pswDurationUr: '3 سال تک کا پوسٹ گریجویشن ورک پرمٹ (PGWP)',
    ieltsRequirementEn: '6.5 overall (no band less than 6.0)',
    ieltsRequirementUr: '6.5 اوور آل (کسی ماڈیول میں 6.0 سے کم نہ ہو)',
    topUnis: ['Univ of Waterloo', 'Univ of Alberta', 'Univ of Ottawa'],
    keyBenefitEn: 'Generous Post-Graduation Work Permit (PGWP) and clear Express Entry PR points.',
    keyBenefitUr: '3 سالہ اوپن ورک پرمٹ (PGWP) اور مستقل شہریت (PR) کے آسان پوائنٹس۔',
  },
  Australia: {
    flag: '🇦🇺',
    nameEn: 'Australia',
    nameUr: 'آسٹریلیا',
    avgTuitionPkrEn: '₨45 Lakh - 70 Lakh / year (A$25k-38k)',
    avgTuitionPkrUr: '45 تا 70 لاکھ روپے سالانہ (A$25k-38k)',
    blockAccountPkrEn: 'A$29,710 annual living cost requirement',
    blockAccountPkrUr: 'A$29,710 سالانہ فنانشل ثبوت برائے ویزا',
    pswYearsEn: '2 to 4 Years (Subclass 485 Post-Study)',
    pswDurationUr: '2 تا 4 سال (سب کلاس 485 پوسٹ اسٹڈی ورک)',
    ieltsRequirementEn: '6.0 - 6.5 (or PTE Academic)',
    ieltsRequirementUr: '6.0 - 6.5 (یا PTE اکیڈمک ٹیسٹ)',
    topUnis: ['Univ of Melbourne', 'UNSW Sydney', 'Monash University'],
    keyBenefitEn: 'High minimum wage ($23.23/hr) and extended work permits in regional locations.',
    keyBenefitUr: 'دنیا کی بلند ترین کم از کم اجرت ($23.23 فی گھنٹہ) اور ریجنل علاقوں میں اضافی ورک پرمٹ۔',
  },
  Italy: {
    flag: '🇮🇹',
    nameEn: 'Italy',
    nameUr: 'اٹلی',
    avgTuitionPkrEn: '€0 to €1,500 (Free with DSU Scholarship)',
    avgTuitionPkrUr: '0 تا 1,500 یورو (DSU اسکالرشپ کے ساتھ 100% مفت)',
    blockAccountPkrEn: '€6,000 - €7,000 proof of funds',
    blockAccountPkrUr: '6,000 تا 7,000 یورو بینک فنڈز کا ثبوت',
    pswYearsEn: '12 Months Job Seeker Permit',
    pswDurationUr: '12 ماہ کا جاب سرچ پرمٹ',
    ieltsRequirementEn: '5.5 - 6.5 (Often waived with MOI letter)',
    ieltsRequirementUr: '5.5 - 6.5 (انگلش پروفیشنسی لیٹر پر چھوٹ ممکن ہے)',
    topUnis: ['Politecnico di Milano', 'Sapienza Rome', 'Univ of Bologna'],
    keyBenefitEn: 'Regional DSU scholarships give 100% free tuition plus up to €7,000/year living stipend.',
    keyBenefitUr: 'ریجنل ڈی ایس یو اسکالرشپ سے 100% مفت تعلیم اور 7,000 یورو سالانہ وظیفہ۔',
  },
  Norway: {
    flag: '🇳🇴',
    nameEn: 'Norway',
    nameUr: 'ناروے',
    avgTuitionPkrEn: '₨25 Lakh - 40 Lakh / year (EU low-tier)',
    avgTuitionPkrUr: '25 تا 40 لاکھ روپے سالانہ',
    blockAccountPkrEn: 'NOK 151,690 in university deposit account',
    blockAccountPkrUr: 'NOK 151,690 یونیورسٹی ڈپازٹ اکاؤنٹ میں',
    pswYearsEn: '12 Months Residence Permit for Job Search',
    pswDurationUr: '12 ماہ کا جاب سرچ ریزیڈنس پرمٹ',
    ieltsRequirementEn: '6.5 overall',
    ieltsRequirementUr: '6.5 اوور آل',
    topUnis: ['Univ of Oslo', 'NTNU Trondheim', 'Univ of Bergen'],
    keyBenefitEn: 'Top living standard, high English fluency nationwide, and renewable job permits.',
    keyBenefitUr: 'اعلیٰ ترین معیار زندگی، انگریزی میں بول چال اور قابلِ تجدید ملازمت کا پرمٹ۔',
  },
  Sweden: {
    flag: '🇸🇪',
    nameEn: 'Sweden',
    nameUr: 'سویڈن',
    avgTuitionPkrEn: '₨30 Lakh - 48 Lakh / year (SEK 110k-160k)',
    avgTuitionPkrUr: '30 تا 48 لاکھ روپے سالانہ',
    blockAccountPkrEn: 'SEK 10,314/month for visa duration',
    blockAccountPkrUr: 'ویزا کی مدت کے لیے SEK 10,314 فی ماہ',
    pswYearsEn: '12 Months Post-Study Search Permit',
    pswDurationUr: '12 ماہ کا پوسٹ اسٹڈی جاب سرچ پرمٹ',
    ieltsRequirementEn: '6.5 (English 6 equivalent)',
    ieltsRequirementUr: '6.5 (انگلش 6 کے مساوی)',
    topUnis: ['KTH Royal Institute', 'Chalmers Univ', 'Lund University'],
    keyBenefitEn: 'Swedish Institute (SI) full scholarship covers 100% tuition, insurance & living.',
    keyBenefitUr: 'سوئیڈش انسٹی ٹیوٹ (SI) اسکالرشپ سے مفت ٹیوشن اور مکمل رہائشی وظیفہ۔',
  },
  Netherlands: {
    flag: '🇳🇱',
    nameEn: 'Netherlands',
    nameUr: 'نیدرلینڈز',
    avgTuitionPkrEn: '₨35 Lakh - 55 Lakh / year (€11k-18k)',
    avgTuitionPkrUr: '35 تا 55 لاکھ روپے سالانہ (€11k-18k)',
    blockAccountPkrEn: '€12,500 proof of living funds',
    blockAccountPkrUr: '12,500 یورو فنڈز کا ثبوت',
    pswYearsEn: '1 Year "Orientation Year" (Zoekjaar) Visa',
    pswDurationUr: '1 سال کا اورینٹیشن ایئر (Zoekjaar) ورک ویزا',
    ieltsRequirementEn: '6.5 overall',
    ieltsRequirementUr: '6.5 اوور آل',
    topUnis: ['TU Delft', 'Univ of Amsterdam', 'Eindhoven Tech'],
    keyBenefitEn: 'Orientation Year allows working in any job or startup without sponsorship.',
    keyBenefitUr: 'اورینٹیشن ایئر کے دوران بغیر اسپانسرشپ کسی بھی ملازمت یا اسٹارٹ اپ کی اجازت۔',
  },
  Turkey: {
    flag: '🇹🇷',
    nameEn: 'Turkey',
    nameUr: 'ترکی',
    avgTuitionPkrEn: '₨8 Lakh - 20 Lakh / year ($3k-7k)',
    avgTuitionPkrUr: '8 تا 20 لاکھ روپے سالانہ ($3k-7k)',
    blockAccountPkrEn: 'Low living cost (approx $350/month)',
    blockAccountPkrUr: 'انتہائی مناسب رہائشی خرچ (تقریباً $350 فی ماہ)',
    pswYearsEn: 'Work permit via employer sponsorship',
    pswDurationUr: 'آجر کی اسپانسرشپ کے ذریعے ورک پرمٹ',
    ieltsRequirementEn: 'Often waived or English placement test',
    ieltsRequirementUr: 'انگلش پلیسمنٹ ٹیسٹ یا استثنیٰ دستیاب',
    topUnis: ['METU Ankara', 'Bogazici University', 'Koc University'],
    keyBenefitEn: 'Extremely affordable tuition, easy visa process, and Turkiye Burslari full scholarships.',
    keyBenefitUr: 'کم ترین ٹیوشن فیس، آسان ویزا طریقہ کار اور ترکیہ برسلاری فل اسکالرشپ۔',
  },
  Malaysia: {
    flag: '🇲🇾',
    nameEn: 'Malaysia',
    nameUr: 'ملائیشیا',
    avgTuitionPkrEn: '₨9 Lakh - 22 Lakh / year ($3.5k-8k)',
    avgTuitionPkrUr: '9 تا 22 لاکھ روپے سالانہ ($3.5k-8k)',
    blockAccountPkrEn: 'Low living cost (approx $400/month)',
    blockAccountPkrUr: 'انتہائی مناسب رہائشی خرچ (تقریباً $400 فی ماہ)',
    pswYearsEn: 'Employment Pass (Category I/II)',
    pswDurationUr: 'ایمپلائمنٹ پاس کیٹگری I اور II',
    ieltsRequirementEn: '5.5 - 6.0 (or English medium cert)',
    ieltsRequirementUr: '5.5 - 6.0 (یا انگلش میڈیم سرٹیفکیٹ)',
    topUnis: ['Universiti Malaya (UM)', 'UTM', 'USM'],
    keyBenefitEn: 'Low cost of living, high Muslim-friendly comfort, and world top 100 QS universities.',
    keyBenefitUr: 'کم اخراجات، حلال و محفوظ ماحول اور دنیا کی ٹاپ 100 QS جامعات۔',
  },
  'South Korea': {
    flag: '🇰🇷',
    nameEn: 'South Korea',
    nameUr: 'جنوبی کوریا',
    avgTuitionPkrEn: '₨12 Lakh - 30 Lakh / year (GKS full funding)',
    avgTuitionPkrUr: '12 تا 30 لاکھ روپے سالانہ (GKS سے فل فنڈڈ)',
    blockAccountPkrEn: '$10,000 - $20,000 bank statement',
    blockAccountPkrUr: '$10,000 تا $20,000 بینک اسٹیٹمنٹ',
    pswYearsEn: 'D-10 Job Seeker Visa (up to 2 years)',
    pswDurationUr: 'D-10 جاب سرچ ویزا (2 سال تک)',
    ieltsRequirementEn: '5.5 - 6.5 (or TOPIK)',
    ieltsRequirementUr: '5.5 - 6.5 (یا ٹوپک ٹیسٹ)',
    topUnis: ['Seoul National Univ', 'KAIST', 'Yonsei University'],
    keyBenefitEn: 'Global Korea Scholarship (GKS) covers flights, tuition, and generous monthly stipend.',
    keyBenefitUr: 'جی کے ایس اسکالرشپ ٹکٹ، مفت تعلیم اور پرکشش ماہانہ وظیفہ فراہم کرتی ہے۔',
  },
  Japan: {
    flag: '🇯🇵',
    nameEn: 'Japan',
    nameUr: 'جاپان',
    avgTuitionPkrEn: '₨15 Lakh - 28 Lakh / year (MEXT funding)',
    avgTuitionPkrUr: '15 تا 28 لاکھ روپے سالانہ (میکسٹ اسکالرشپ)',
    blockAccountPkrEn: 'MEXT scholars get zero tuition + stipend',
    blockAccountPkrUr: 'میکسٹ اسکالرز کو مفت تعلیم اور وظیفہ ملتا ہے',
    pswYearsEn: 'Designated Activities Visa (up to 12 months)',
    pswDurationUr: 'مخصوص سرگرمیوں کا ویزا (12 ماہ تک)',
    ieltsRequirementEn: '6.0 - 6.5 (for English SGU programs)',
    ieltsRequirementUr: '6.0 - 6.5 (انگریزی ڈگریوں کے لیے)',
    topUnis: ['Univ of Tokyo', 'Kyoto University', 'Tokyo Tech'],
    keyBenefitEn: 'MEXT Scholarship is one of the world\'s most prestigious 100% fully-funded grants.',
    keyBenefitUr: 'میکسٹ اسکالرشپ دنیا کا معتبر ترین 100% فنڈڈ تعلیمی وظیفہ ہے۔',
  },
  France: {
    flag: '🇫🇷',
    nameEn: 'France',
    nameUr: 'فرانس',
    avgTuitionPkrEn: '₨11 Lakh - 30 Lakh / year (€3.7k public)',
    avgTuitionPkrUr: '11 تا 30 لاکھ روپے سالانہ (€3.7k پبلک)',
    blockAccountPkrEn: '€615/month for visa requirement',
    blockAccountPkrUr: '615 یورو فی ماہ ویزا کی شرط',
    pswYearsEn: '2 Years Post-Study Work Permit for Masters',
    pswDurationUr: 'ماسٹرز کے بعد 2 سال کا پوسٹ اسٹڈی ورک پرمٹ',
    ieltsRequirementEn: '6.0 - 6.5 (many English-taught MS)',
    ieltsRequirementUr: '6.0 - 6.5 (کئی انگریزی میڈیم پروگرامز)',
    topUnis: ['Sorbonne University', 'Ecole Polytechnique', 'Univ Paris-Saclay'],
    keyBenefitEn: 'State-subsidized tuition, CAF housing subsidy, and 2-year post-study work authorization.',
    keyBenefitUr: 'حکومتی سبسڈی والی فیس، ہاؤسنگ الاؤنس (CAF) اور 2 سالہ ورک ویزا۔',
  },
  'Czech Republic': {
    flag: '🇨🇿',
    nameEn: 'Czech Republic',
    nameUr: 'چیک جمہوریہ',
    avgTuitionPkrEn: '₨10 Lakh - 25 Lakh / year (€3k-8k)',
    avgTuitionPkrUr: '10 تا 25 لاکھ روپے سالانہ (€3k-8k)',
    blockAccountPkrEn: 'CZK 135,000 annual living proof',
    blockAccountPkrUr: 'سالانہ CZK 135,000 کا رہائشی ثبوت',
    pswYearsEn: '9 Months Post-Graduation Search Permit',
    pswDurationUr: '9 ماہ کا پوسٹ گریجویشن جاب سرچ پرمٹ',
    ieltsRequirementEn: '5.5 - 6.5',
    ieltsRequirementUr: '5.5 - 6.5',
    topUnis: ['Charles University', 'Czech Tech Univ Prague (CTU)'],
    keyBenefitEn: 'Centrally located in EU Schengen, very affordable living, and high tech employment.',
    keyBenefitUr: 'شنجن زون کا مرکز، سستی رہائش اور ٹیکنالوجی کی ملازمتوں کے وسیع مواقع۔',
  },
};

interface DestinationModalProps {
  country: string | null;
  onClose: () => void;
}

export default function DestinationModal({ country, onClose }: DestinationModalProps) {
  const { locale, dir } = useI18n();
  const isUr = locale === 'ur';

  if (!country) return null;

  const detail = destinationDetailsMap[country] || {
    flag: '🌍',
    nameEn: country,
    nameUr: country,
    avgTuitionPkrEn: 'Available in Advisor report',
    avgTuitionPkrUr: 'مشاورتی رپورٹ میں دستیاب ہے',
    blockAccountPkrEn: 'Country-specific requirement',
    blockAccountPkrUr: 'ملکی قوانین کے مطابق',
    pswYearsEn: 'Available via AI consultant',
    pswDurationUr: 'اے آئی رپورٹ میں شامل ہے',
    ieltsRequirementEn: '6.0 - 6.5 standard',
    ieltsRequirementUr: '6.0 - 6.5 معیاری سکور',
    topUnis: ['Consult Advisor for list'],
    keyBenefitEn: 'Explore detailed admission pathways and visa guidelines with AI.',
    keyBenefitUr: 'اے آئی کی مدد سے مکمل داخلے اور ویزا گائیڈ لائنز حاصل کریں۔',
  };

  const displayName = isUr ? detail.nameUr : detail.nameEn;
  const tuition = isUr ? detail.avgTuitionPkrUr : detail.avgTuitionPkrEn;
  const blockAccount = isUr ? detail.blockAccountPkrUr : detail.blockAccountPkrEn;
  const psw = isUr ? detail.pswDurationUr : detail.pswYearsEn;
  const ielts = isUr ? detail.ieltsRequirementUr : detail.ieltsRequirementEn;
  const benefit = isUr ? detail.keyBenefitUr : detail.keyBenefitEn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{detail.flag}</span>
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {displayName}
            </h3>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {isUr ? 'تصدیق شدہ تعلیمی ملک' : 'Verified Study Destination'}
            </p>
          </div>
        </div>

        {/* Key Benefit banner */}
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-3.5 text-xs text-emerald-800 dark:text-emerald-300 font-medium mb-5">
          {benefit}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6 text-xs">
          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3.5">
            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
              {isUr ? 'پاکستانی روپے میں اوسط ٹیوشن' : 'Average Tuition in PKR'}
            </span>
            <span className="text-sm font-black text-slate-900 dark:text-white">
              {tuition}
            </span>
          </div>

          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3.5">
            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
              {isUr ? 'رہائش اور بلاک اکاؤنٹ' : 'Living / Block Account'}
            </span>
            <span className="text-sm font-black text-slate-900 dark:text-white">
              {blockAccount}
            </span>
          </div>

          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3.5">
            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
              {isUr ? 'پوسٹ اسٹڈی ورک (PSW)' : 'Post-Study Work (PSW)'}
            </span>
            <span className="text-sm font-black text-violet-600 dark:text-violet-400">
              {psw}
            </span>
          </div>

          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3.5">
            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
              {isUr ? 'آئلٹس اور انگریزی کی شرائط' : 'IELTS / English Criteria'}
            </span>
            <span className="text-sm font-black text-slate-900 dark:text-white">
              {ielts}
            </span>
          </div>
        </div>

        {/* Top Universities */}
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            {isUr ? 'نمایاں پبلک یونیورسٹیاں:' : 'Top Sample Public Universities:'}
          </span>
          <div className="flex flex-wrap gap-2">
            {detail.topUnis.map((uni, i) => (
              <span
                key={i}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                {uni}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href={`/dashboard?q=${encodeURIComponent(
              isUr
                ? `پاکستانی طلبہ کے لیے ${displayName} میں مفت یونیورسٹیاں، وظائف اور بلاک اکاؤنٹ کی مکمل رہنمائی فراہم کریں۔`
                : `Give me full admission and visa guidance for Pakistani students targeting ${detail.nameEn}, including free universities, scholarships, and block account.`
            )}`}
            className="w-full sm:flex-1"
          >
            <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold gap-2 shadow-md shadow-emerald-500/25">
              <span>{isUr ? `${displayName} کے لیے اے آئی مشیر سے پوچھیں` : `Consult Advisor for ${detail.nameEn}`}</span>
              <ArrowRight className={`h-4 w-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </Button>
          </Link>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto font-semibold"
          >
            {isUr ? 'بند کریں' : 'Close'}
          </Button>
        </div>
      </div>
    </div>
  );
}
