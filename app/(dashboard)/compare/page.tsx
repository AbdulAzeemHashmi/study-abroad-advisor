'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layers, Trash2, Plus, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from '@/lib/i18n';
import { formatCurrency, convertUSDToPKR } from '@/lib/utils';
import { UniversityRecommendation } from '../dashboard/page';

export default function ComparePage() {
  const t = useTranslations('compare');
  const [unis, setUnis] = useState<UniversityRecommendation[]>([]);

  // Default curated universities for quick comparison if empty
  const sampleUniversities: UniversityRecommendation[] = [
    {
      id: 'tum-germany',
      name: 'Technical University of Munich (TUM)',
      country: 'Germany',
      city: 'Munich',
      ranking: 37,
      tuitionMin: 0,
      tuitionMax: 0,
      livingCost: 11208,
      programs: ['Computer Science', 'Data Engineering', 'Robotics'],
      website: 'https://www.tum.de',
    },
    {
      id: 'manchester-uk',
      name: 'University of Manchester',
      country: 'United Kingdom',
      city: 'Manchester',
      ranking: 32,
      tuitionMin: 28000,
      tuitionMax: 34000,
      livingCost: 14000,
      programs: ['Advanced Computer Science', 'AI', 'Biomedical Engineering'],
      website: 'https://www.manchester.ac.uk',
    },
    {
      id: 'melbourne-aus',
      name: 'University of Melbourne',
      country: 'Australia',
      city: 'Melbourne',
      ranking: 13,
      tuitionMin: 32000,
      tuitionMax: 46000,
      livingCost: 16500,
      programs: ['Software Engineering', 'Information Systems'],
      website: 'https://www.unimelb.edu.au',
    },
  ];

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sa_compare_unis');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setUnis(parsed);
          return;
        }
      }
      setUnis(sampleUniversities);
      localStorage.setItem('sa_compare_unis', JSON.stringify(sampleUniversities));
    } catch {
      setUnis(sampleUniversities);
    }
  }, []);

  const handleRemove = (id: string) => {
    const filtered = unis.filter((u) => u.id !== id);
    setUnis(filtered);
    localStorage.setItem('sa_compare_unis', JSON.stringify(filtered));
  };

  const handleResetDefaults = () => {
    setUnis(sampleUniversities);
    localStorage.setItem('sa_compare_unis', JSON.stringify(sampleUniversities));
  };

  // Country policy helper for Pakistani students (fully localized)
  const getCountryPolicies = (country: string) => {
    const c = country.toLowerCase();
    if (c.includes('germany')) {
      return {
        workRights: t('germanyWork', '140 full days (or 280 half days) per year'),
        postStudyVisa: t('germanyPSW', '18-month Job Seeker Visa'),
        prPathway: t('germanyPR', 'High (EU Blue Card PR after 21-27 months of work)'),
        blockAccount: t('germanyLiving', '€11,208 / year required (Blocked Account)'),
      };
    }
    if (c.includes('united kingdom') || c.includes('uk')) {
      return {
        workRights: t('ukWork', '20 hours / week during term-time'),
        postStudyVisa: t('ukPSW', '2-year Graduate Route (3 years for PhD)'),
        prPathway: t('ukPR', 'Moderate (Requires Skilled Worker visa sponsorship, 5-year route)'),
        blockAccount: t('ukLiving', 'Living funds per UKVI scale for 9 months'),
      };
    }
    if (c.includes('australia')) {
      return {
        workRights: t('australiaWork', '48 hours / fortnight during study'),
        postStudyVisa: t('australiaPSW', '2 to 4 years (Subclass 485 depending on location & degree)'),
        prPathway: t('australiaPR', 'Points-based (Subclass 189/190/491, regional points advantage)'),
        blockAccount: t('australiaLiving', 'AUD $24,505 annual living evidence'),
      };
    }
    if (c.includes('canada')) {
      return {
        workRights: t('canadaWork', '20 hours / week off-campus'),
        postStudyVisa: t('canadaPSW', 'Up to 3-year PGWP'),
        prPathway: t('canadaPR', 'Express Entry (CEC) / Provincial Nominee Programs (PNP)'),
        blockAccount: t('canadaLiving', 'CAD $20,635 minimum GIC certificate'),
      };
    }
    if (c.includes('italy')) {
      return {
        workRights: t('italyWork', '20 hours / week (max 1040 hrs/year)'),
        postStudyVisa: t('italyPSW', '12-month Permesso per ricerca lavoro'),
        prPathway: t('italyPR', 'Moderate (Convertible to subordinate work permit)'),
        blockAccount: t('italyLiving', 'Regional DSU scholarship covers tuition + living for many'),
      };
    }
    return {
      workRights: t('generalWork', '20 hours / week during academic semesters'),
      postStudyVisa: t('generalPSW', '12-24 months post-study stay back'),
      prPathway: t('generalPR', 'Country dependent work permit transition'),
      blockAccount: t('generalLiving', 'Standard national proof of living funds'),
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="h-6 w-6 text-emerald-600" />
            <span>{t('title', 'University Comparison Matrix')}</span>
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {t('subtitle', 'Analyze tuition fees, living costs, work rights, and rankings side by side.')}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" onClick={handleResetDefaults} className="shadow-sm">
            {t('loadPreset', 'Load Top 3 Preset')}
          </Button>
          <Link href="/dashboard">
            <Button variant="gradient" size="sm" className="gap-1.5 shadow-sm">
              <Plus className="h-4 w-4" />
              <span>{t('addFromDashboard', 'Add From Dashboard')}</span>
            </Button>
          </Link>
        </div>
      </div>

      {unis.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-2">
          <p className="text-slate-600 dark:text-slate-400 text-sm">{t('emptyNotice', 'No universities added to compare yet.')}</p>
          <Button onClick={handleResetDefaults} variant="outline" className="mt-4 shadow-sm">
            {t('loadPreset', 'Load Top 3 Preset')}
          </Button>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b-2 border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/80">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 w-48">
                  {t('metric', 'Metric')}
                </th>
                {unis.map((uni) => (
                  <th key={uni.id} className="p-4 text-sm font-bold text-slate-900 dark:text-white">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-extrabold text-base leading-snug">{uni.name}</div>
                        <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                          {uni.city ? `${uni.city}, ` : ''}{uni.country}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemove(uni.id)}
                        title="Remove"
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              {/* Ranking */}
              <tr>
                <td className="p-4 font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/40 dark:bg-slate-950/20">
                  {t('ranking', 'Global Ranking')}
                </td>
                {unis.map((uni) => (
                  <td key={uni.id} className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                    {uni.ranking ? `#${uni.ranking} ${t('worldwide', 'Worldwide')}` : 'Top 500'}
                  </td>
                ))}
              </tr>

              {/* Annual Tuition */}
              <tr>
                <td className="p-4 font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/40 dark:bg-slate-950/20">
                  {t('tuition', 'Estimated Tuition / Year')}
                </td>
                {unis.map((uni) => (
                  <td key={uni.id} className="p-4">
                    <div className="font-extrabold text-slate-900 dark:text-white">
                      {uni.tuitionMin === 0 ? t('freeAdminFee', 'Free / €0-€350 admin fee') : formatCurrency(uni.tuitionMin)}
                    </div>
                    {uni.tuitionMin !== undefined && uni.tuitionMin > 0 && (
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                        ~{convertUSDToPKR(uni.tuitionMin)}
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Living Cost & Proof of Funds */}
              <tr>
                <td className="p-4 font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/40 dark:bg-slate-950/20">
                  {t('living', 'Living Cost & Blocked Acc.')}
                </td>
                {unis.map((uni) => {
                  const policy = getCountryPolicies(uni.country);
                  return (
                    <td key={uni.id} className="p-4">
                      <div className="font-extrabold text-slate-900 dark:text-white">
                        {formatCurrency(uni.livingCost)} / yr
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 font-medium leading-relaxed">
                        {policy.blockAccount}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Work Rights for Pakistani Students */}
              <tr>
                <td className="p-4 font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/40 dark:bg-slate-950/20">
                  {t('workRights', 'Part-Time Work Rights')}
                </td>
                {unis.map((uni) => {
                  const policy = getCountryPolicies(uni.country);
                  return (
                    <td key={uni.id} className="p-4 text-slate-800 dark:text-slate-200 font-medium">
                      {policy.workRights}
                    </td>
                  );
                })}
              </tr>

              {/* Post-Study Work Visa */}
              <tr>
                <td className="p-4 font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/40 dark:bg-slate-950/20">
                  {t('postStudyVisa', 'Post-Study Work Visa')}
                </td>
                {unis.map((uni) => {
                  const policy = getCountryPolicies(uni.country);
                  return (
                    <td key={uni.id} className="p-4">
                      <Badge variant="success" className="font-semibold shadow-sm">
                        {policy.postStudyVisa}
                      </Badge>
                    </td>
                  );
                })}
              </tr>

              {/* PR / Settlement Pathway */}
              <tr>
                <td className="p-4 font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/40 dark:bg-slate-950/20">
                  {t('prPathway', 'Permanent Residency (PR)')}
                </td>
                {unis.map((uni) => {
                  const policy = getCountryPolicies(uni.country);
                  return (
                    <td key={uni.id} className="p-4 text-slate-800 dark:text-slate-200 font-medium">
                      {policy.prPathway}
                    </td>
                  );
                })}
              </tr>

              {/* Links */}
              <tr>
                <td className="p-4 font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/40 dark:bg-slate-950/20">
                  {t('admissionsWebsite', 'Admissions Website')}
                </td>
                {unis.map((uni) => (
                  <td key={uni.id} className="p-4">
                    {uni.website ? (
                      <a
                        href={uni.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 hover:underline"
                      >
                        <span>{t('visitPortal', 'Visit University Portal')}</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">N/A</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
