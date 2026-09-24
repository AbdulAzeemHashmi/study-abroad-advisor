'use client';

import React from 'react';
import { Check, X, ShieldAlert, Zap, Sparkles } from 'lucide-react';

const comparisonRows = [
  {
    feature: 'Cost to Student',
    advisor: '100% Free Forever (₨ 0)',
    advisorSub: 'No hidden consultation or file charges',
    advisorGood: true,
    agent: '₨ 50,000 to ₨ 250,000+',
    agentSub: 'Heavy upfront fees + file processing charges',
    agentGood: false,
  },
  {
    feature: 'University Selection',
    advisor: '500+ Verified Public & Top Universities',
    advisorSub: 'Unbiased matching based on your CGPA and budget',
    advisorGood: true,
    agent: 'Restricted to 5-10 Partner Colleges',
    agentSub: 'Pushed into private institutes offering commissions',
    agentGood: false,
  },
  {
    feature: 'Free/Low-Tuition Guidance (Germany/Italy)',
    advisor: 'Full Sperrkonto & DSU scholarship guidance',
    advisorSub: 'Promotes tuition-free programs in public universities',
    advisorGood: true,
    agent: 'Discouraged or Not Supported',
    agentSub: 'Agents make 0% commission on free public universities',
    agentGood: false,
  },
  {
    feature: 'Response Speed',
    advisor: 'Instant AI Matching in < 3 Seconds',
    advisorSub: '24/7 real-time answers to every question',
    advisorGood: true,
    agent: '2 to 4 Weeks for Initial Assessment',
    agentSub: 'Requires in-person appointments and office queues',
    agentGood: false,
  },
  {
    feature: 'Financial Realism in PKR',
    advisor: 'Actual PKR conversions + living cost math',
    advisorSub: 'Transparent block accounts and part-time viability',
    advisorGood: true,
    agent: 'Vague or Hidden Cost Estimates',
    agentSub: 'Downplays currency depreciation and block accounts',
    agentGood: false,
  },
  {
    feature: 'Language & Accessibility',
    advisor: 'Fluent English & 100% Urdu RTL',
    advisorSub: 'Accessible anytime from your phone or laptop',
    advisorGood: true,
    agent: 'Limited Office Hours Only',
    agentSub: 'Usually English-centric, requiring parents to visit offices',
    agentGood: false,
  },
];

export default function ComparisonTable() {
  return (
    <section id="compare" className="relative z-10 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 px-4 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Unbiased Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Why Students Switch from <span className="gradient-text">Traditional Agents</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium">
            Discover the difference between independent AI merit guidance and commission-driven educational consultants.
          </p>
        </div>

        {/* Table Card */}
        <div className="rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden reveal">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="p-5 sm:p-6 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/3">
                    Feature / Criteria
                  </th>
                  <th className="p-5 sm:p-6 text-base sm:text-lg font-black bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-x-2 border-emerald-500/20 w-1/3">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      Study Abroad Advisor
                    </div>
                  </th>
                  <th className="p-5 sm:p-6 text-base sm:text-lg font-bold text-slate-500 dark:text-slate-400 w-1/3">
                    Traditional Study Agents
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    {/* Feature */}
                    <td className="p-5 sm:p-6 font-bold text-slate-900 dark:text-white align-top">
                      {row.feature}
                    </td>

                    {/* Advisor */}
                    <td className="p-5 sm:p-6 bg-emerald-50/40 dark:bg-emerald-950/20 border-x-2 border-emerald-500/20 align-top">
                      <div className="flex items-start gap-2.5">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white mt-0.5 shadow-xs">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-900 dark:text-white">
                            {row.advisor}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {row.advisorSub}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Agent */}
                    <td className="p-5 sm:p-6 text-slate-500 dark:text-slate-400 align-top">
                      <div className="flex items-start gap-2.5">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-500 mt-0.5">
                          <X className="h-3 w-3 stroke-[3]" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-700 dark:text-slate-300">
                            {row.agent}
                          </div>
                          <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                            {row.agentSub}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
