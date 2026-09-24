'use client';

import React from 'react';
import { Star, Quote, CheckCircle2, Award } from 'lucide-react';

const testimonials = [
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

export default function TestimonialsSection() {
  return (
    <section className="relative z-10 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 px-4 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-4">
            <Award className="h-3.5 w-3.5" />
            <span>Pakistani Student Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            From Pakistan to <span className="gradient-text">Global Campuses</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium">
            Hear from students who navigated admissions, blocked accounts, and scholarships with zero agent fees.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
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
                    Alum: {t.originUni}
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
