'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    category: 'Costs & Pricing',
    question: 'Is Study Abroad Advisor completely free for Pakistani students?',
    answer:
      'Yes, 100% free forever. There are zero consultancy fees, zero hidden file charges, and zero commissions. Our mission is to democratize education guidance so Pakistani aspirants can apply directly to top public universities without paying ₨50,000 to ₨250,000 to traditional agents.',
  },
  {
    category: 'Language Tests',
    question: 'Can I study abroad without taking IELTS?',
    answer:
      'Yes! Many universities across Germany, Italy, France, and Malaysia accept an English Proficiency Certificate (Medium of Instruction - MOI letter) issued by your Pakistani university (e.g. NUST, FAST, UET, COMSATS, LUMS, Punjab University) certifying your degree was taught entirely in English. Some UK and USA universities also offer internal test waivers or accept Duolingo English Test (DET), which is 4x cheaper than IELTS.',
  },
  {
    category: 'Block Account & Proof of Funds',
    question: 'How much is the German Blocked Account (Sperrkonto) in PKR?',
    answer:
      'For 2024/2025, the German Federal Foreign Office requires €11,208 per year (approx. ₨33.8 Lakh to ₨34 Lakh at current rates). This money is deposited into a regulated German bank account (like Expatrio, Coracle, or Fintiba) under your name. Once you arrive in Germany, €934 is released into your personal checking account every month to pay for your rent, food, and health insurance.',
  },
  {
    category: 'Spouse & Family',
    question: 'Can I bring my spouse or dependants on a student visa?',
    answer:
      'Yes, depending on the country and program level. In Germany, Master and PhD students can bring their spouse on a Family Reunion Visa (Familienzusammenführung) with full work rights. In the USA, spouses on F-2 visas cannot work, while J-2 spouses can apply for an EAD work permit. In Canada, spouses of Master’s and Doctoral degree students remain eligible for an Open Work Permit.',
  },
  {
    category: 'HEC Accreditation',
    question: 'Are degrees from HEC-recognized Pakistani universities recognized abroad?',
    answer:
      'Yes. Degrees from HEC-accredited Pakistani universities are widely evaluated as equivalent to European and North American degrees. In Germany, you can verify your institution on the official Anabin database (status H+ means recognized). For USA and Canada, credential evaluation services like WES (World Education Services) and ECE readily evaluate Pakistani 4-year BS and 2-year MS degrees.',
  },
  {
    category: 'Part-Time Work',
    question: 'Can I cover my living costs by working 20 hours per week part-time?',
    answer:
      'In countries like Germany, Australia, and the UK, legal student minimum wages range from €12.41/hr to A$23.23/hr and £11.44/hr. Working 20 hours per week typically brings in ₨200,000 to ₨350,000 per month, which is generally sufficient to cover shared student accommodation, groceries, mobile, and transport in non-capital cities.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative z-10 py-20 md:py-28 bg-slate-50/80 dark:bg-slate-900/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 px-4 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-4">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium">
            Everything Pakistani students need to know before applying abroad.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4 reveal">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 rounded-md px-2.5 py-1">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-emerald-500' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
