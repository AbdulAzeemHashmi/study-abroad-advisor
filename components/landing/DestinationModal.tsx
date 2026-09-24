'use client';

import React from 'react';
import Link from 'next/link';
import { X, GraduationCap, DollarSign, Briefcase, Globe, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface DestinationDetail {
  flag: string;
  name: string;
  avgTuitionPkr: string;
  blockAccountPkr: string;
  pswYears: string;
  ieltsRequirement: string;
  topUnis: string[];
  keyBenefit: string;
}

export const destinationDetailsMap: Record<string, DestinationDetail> = {
  Germany: {
    flag: '🇩🇪',
    name: 'Germany',
    avgTuitionPkr: 'Free (₨0 tuition at public universities)',
    blockAccountPkr: '€11,208 ≈ ₨33.8 Lakh (Sperrkonto)',
    pswYears: '18 Months Post-Study Work Visa',
    ieltsRequirement: '6.0 - 6.5 (Many accept English Proficiency Letters)',
    topUnis: ['TU Munich', 'RWTH Aachen', 'KIT Karlsruhe'],
    keyBenefit: 'World-class tuition-free engineering and IT programs with 18-month job search visa.',
  },
  'United Kingdom': {
    flag: '🇬🇧',
    name: 'United Kingdom',
    avgTuitionPkr: '₨45 Lakh - 65 Lakh / year (£13k-19k)',
    blockAccountPkr: '£9,207 - £12,006 in bank for 28 days',
    pswYears: '2 Years Graduate Route (3 Years for PhD)',
    ieltsRequirement: '6.0 - 6.5 (Internal test waivers available)',
    topUnis: ['Univ of Manchester', 'Univ of Sheffield', 'Univ of Leeds'],
    keyBenefit: '1-year fast-track Master degrees with 2-year guaranteed Graduate Route work visa.',
  },
  USA: {
    flag: '🇺🇸',
    name: 'USA',
    avgTuitionPkr: '₨50 Lakh - 85 Lakh / year (High merit aid)',
    blockAccountPkr: 'I-20 financial proof (1st year fees + living)',
    pswYears: '3 Years (12-mo OPT + 24-mo STEM extension)',
    ieltsRequirement: '6.5 - 7.0 (or TOEFL / Duolingo)',
    topUnis: ['Purdue University', 'UT Dallas', 'Arizona State Univ'],
    keyBenefit: 'Unmatched research funding (RA/TA assistantships) and 36 months of STEM OPT legal work.',
  },
  Canada: {
    flag: '🇨🇦',
    name: 'Canada',
    avgTuitionPkr: '₨35 Lakh - 55 Lakh / year (C$18k-26k)',
    blockAccountPkr: 'C$20,635 minimum living expenses proof',
    pswYears: 'Up to 3 Years PGWP (Work Permit)',
    ieltsRequirement: '6.5 overall (no band less than 6.0)',
    topUnis: ['Univ of Waterloo', 'Univ of Alberta', 'Univ of Ottawa'],
    keyBenefit: 'Generous Post-Graduation Work Permit (PGWP) and clear Express Entry PR points.',
  },
  Australia: {
    flag: '🇦🇺',
    name: 'Australia',
    avgTuitionPkr: '₨45 Lakh - 70 Lakh / year (A$25k-38k)',
    blockAccountPkr: 'A$29,710 annual living cost requirement',
    pswYears: '2 to 4 Years (Subclass 485 Post-Study)',
    ieltsRequirement: '6.0 - 6.5 (or PTE Academic)',
    topUnis: ['Univ of Melbourne', 'UNSW Sydney', 'Monash University'],
    keyBenefit: 'High minimum wage ($23.23/hr) and extended work permits in regional locations.',
  },
  Italy: {
    flag: '🇮🇹',
    name: 'Italy',
    avgTuitionPkr: '€0 to €1,500 (Free with DSU Scholarship)',
    blockAccountPkr: '€6,000 - €7,000 proof of funds',
    pswYears: '12 Months Job Seeker Permit',
    ieltsRequirement: '5.5 - 6.5 (Often waived with MOI letter)',
    topUnis: ['Politecnico di Milano', 'Sapienza Rome', 'Univ of Bologna'],
    keyBenefit: 'Regional DSU scholarships give 100% free tuition plus up to €7,000/year living stipend.',
  },
  Norway: {
    flag: '🇳🇴',
    name: 'Norway',
    avgTuitionPkr: '₨25 Lakh - 40 Lakh / year (EU low-tier)',
    blockAccountPkr: 'NOK 151,690 in university deposit account',
    pswYears: '12 Months Residence Permit for Job Search',
    ieltsRequirement: '6.5 overall',
    topUnis: ['Univ of Oslo', 'NTNU Trondheim', 'Univ of Bergen'],
    keyBenefit: 'Top living standard, high English fluency nationwide, and renewable job permits.',
  },
  Sweden: {
    flag: '🇸🇪',
    name: 'Sweden',
    avgTuitionPkr: '₨30 Lakh - 48 Lakh / year (SEK 110k-160k)',
    blockAccountPkr: 'SEK 10,314/month for visa duration',
    pswYears: '12 Months Post-Study Search Permit',
    ieltsRequirement: '6.5 (English 6 equivalent)',
    topUnis: ['KTH Royal Institute', 'Chalmers Univ', 'Lund University'],
    keyBenefit: 'Swedish Institute (SI) full scholarship covers 100% tuition, insurance & living.',
  },
  Netherlands: {
    flag: '🇳🇱',
    name: 'Netherlands',
    avgTuitionPkr: '₨35 Lakh - 55 Lakh / year (€11k-18k)',
    blockAccountPkr: '€12,500 proof of living funds',
    pswYears: '1 Year "Orientation Year" (Zoekjaar) Visa',
    ieltsRequirement: '6.5 overall',
    topUnis: ['TU Delft', 'Univ of Amsterdam', 'Eindhoven Tech'],
    keyBenefit: 'Orientation Year allows working in any job or startup without sponsorship.',
  },
  Turkey: {
    flag: '🇹🇷',
    name: 'Turkey',
    avgTuitionPkr: '₨8 Lakh - 20 Lakh / year ($3k-7k)',
    blockAccountPkr: 'Low living cost (approx $350/month)',
    pswYears: 'Work permit via employer sponsorship',
    ieltsRequirement: 'Often waived or English placement test',
    topUnis: ['METU Ankara', 'Bogazici University', 'Koc University'],
    keyBenefit: 'Extremely affordable tuition, easy visa process, and Turkiye Burslari full scholarships.',
  },
  Malaysia: {
    flag: '🇲🇾',
    name: 'Malaysia',
    avgTuitionPkr: '₨9 Lakh - 22 Lakh / year ($3.5k-8k)',
    blockAccountPkr: 'Low living cost (approx $400/month)',
    pswYears: 'Employment Pass (Category I/II)',
    ieltsRequirement: '5.5 - 6.0 (or English medium cert)',
    topUnis: ['Universiti Malaya (UM)', 'UTM', 'USM'],
    keyBenefit: 'Low cost of living, high Muslim-friendly comfort, and world top 100 QS universities.',
  },
  'South Korea': {
    flag: '🇰🇷',
    name: 'South Korea',
    avgTuitionPkr: '₨12 Lakh - 30 Lakh / year (GKS full funding)',
    blockAccountPkr: '$10,000 - $20,000 bank statement',
    pswYears: 'D-10 Job Seeker Visa (up to 2 years)',
    ieltsRequirement: '5.5 - 6.5 (or TOPIK)',
    topUnis: ['Seoul National Univ', 'KAIST', 'Yonsei University'],
    keyBenefit: 'Global Korea Scholarship (GKS) covers flights, tuition, and generous monthly stipend.',
  },
  Japan: {
    flag: '🇯🇵',
    name: 'Japan',
    avgTuitionPkr: '₨15 Lakh - 28 Lakh / year (MEXT funding)',
    blockAccountPkr: 'MEXT scholars get zero tuition + stipend',
    pswYears: 'Designated Activities Visa (up to 12 months)',
    ieltsRequirement: '6.0 - 6.5 (for English SGU programs)',
    topUnis: ['Univ of Tokyo', 'Kyoto University', 'Tokyo Tech'],
    keyBenefit: 'MEXT Scholarship is one of the world\'s most prestigious 100% fully-funded grants.',
  },
  France: {
    flag: '🇫🇷',
    name: 'France',
    avgTuitionPkr: '₨11 Lakh - 30 Lakh / year (€3.7k public)',
    blockAccountPkr: '€615/month for visa requirement',
    pswYears: '2 Years Post-Study Work Permit for Masters',
    ieltsRequirement: '6.0 - 6.5 (many English-taught MS)',
    topUnis: ['Sorbonne University', 'Ecole Polytechnique', 'Univ Paris-Saclay'],
    keyBenefit: 'State-subsidized tuition, CAF housing subsidy, and 2-year post-study work authorization.',
  },
  'Czech Republic': {
    flag: '🇨🇿',
    name: 'Czech Republic',
    avgTuitionPkr: '₨10 Lakh - 25 Lakh / year (€3k-8k)',
    blockAccountPkr: 'CZK 135,000 annual living proof',
    pswYears: '9 Months Post-Graduation Search Permit',
    ieltsRequirement: '5.5 - 6.5',
    topUnis: ['Charles University', 'Czech Tech Univ Prague (CTU)'],
    keyBenefit: 'Centrally located in EU Schengen, very affordable living, and high tech employment.',
  },
};

interface DestinationModalProps {
  country: string | null;
  onClose: () => void;
}

export default function DestinationModal({ country, onClose }: DestinationModalProps) {
  if (!country) return null;

  const detail = destinationDetailsMap[country] || {
    flag: '🌍',
    name: country,
    avgTuitionPkr: 'Available in Advisor report',
    blockAccountPkr: 'Country-specific requirement',
    pswYears: 'Available via AI consultant',
    ieltsRequirement: '6.0 - 6.5 standard',
    topUnis: ['Consult Advisor for list'],
    keyBenefit: 'Explore detailed admission pathways and visa guidelines with AI.',
  };

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
          className="absolute top-5 right-5 h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{detail.flag}</span>
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {detail.name}
            </h3>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Verified Study Destination
            </p>
          </div>
        </div>

        {/* Key Benefit banner */}
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-3.5 text-xs text-emerald-800 dark:text-emerald-300 font-medium mb-5">
          {detail.keyBenefit}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6 text-xs">
          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3.5">
            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
              Average Tuition in PKR
            </span>
            <span className="text-sm font-black text-slate-900 dark:text-white">
              {detail.avgTuitionPkr}
            </span>
          </div>

          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3.5">
            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
              Living / Block Account
            </span>
            <span className="text-sm font-black text-slate-900 dark:text-white">
              {detail.blockAccountPkr}
            </span>
          </div>

          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3.5">
            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
              Post-Study Work (PSW)
            </span>
            <span className="text-sm font-black text-violet-600 dark:text-violet-400">
              {detail.pswYears}
            </span>
          </div>

          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3.5">
            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
              IELTS / English Criteria
            </span>
            <span className="text-sm font-black text-slate-900 dark:text-white">
              {detail.ieltsRequirement}
            </span>
          </div>
        </div>

        {/* Top Universities */}
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Top Sample Public Universities:
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
            href={`/dashboard?q=${encodeURIComponent(`Give me full admission and visa guidance for Pakistani students targeting ${detail.name}, including free universities, scholarships, and block account.`)}`}
            className="w-full sm:flex-1"
          >
            <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold gap-2 shadow-md shadow-emerald-500/25">
              <span>Consult Advisor for {detail.name}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto font-semibold"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
