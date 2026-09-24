'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Settings, Languages, GraduationCap, CheckCircle2, User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations, useI18n } from '@/lib/i18n';

export default function SettingsPage() {
  const { data: session } = useSession();
  const { locale, setLocale } = useI18n();
  const t = useTranslations('settings');

  const [fieldOfStudy, setFieldOfStudy] = useState('Computer Science');
  const [cgpa, setCgpa] = useState('3.4');
  const [degreeLevel, setDegreeLevel] = useState('BS');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      'sa_user_profile',
      JSON.stringify({ fieldOfStudy, cgpa, degreeLevel })
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="h-6 w-6 text-emerald-600" />
          <span>{t('title', 'Account & Preferences')}</span>
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {t('subtitle', 'Manage your language, target academic field, and account profile.')}
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 animate-fade-in shadow-sm">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span className="font-semibold">{t('savedSuccess', 'Preferences updated successfully!')}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Language Selection Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <CardTitle className="text-base flex items-center gap-2 text-slate-900 dark:text-white">
              <Languages className="h-5 w-5 text-emerald-600" />
              <span>{t('preferredLanguage', 'Interface Language')}</span>
            </CardTitle>
            <CardDescription>
              {t('langDesc', 'Toggle the application between English (LTR) and Urdu (اردو RTL).')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  locale === 'en'
                    ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="font-bold text-sm">{t('english', 'English (EN)')}</div>
                <div className="text-xs text-slate-500 mt-1">{t('englishSub', 'Left-to-Right layout')}</div>
              </button>

              <button
                type="button"
                onClick={() => setLocale('ur')}
                className={`p-4 rounded-2xl border-2 text-right transition-all ${
                  locale === 'ur'
                    ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="font-bold text-sm font-sans">{t('urdu', 'اردو (Urdu RTL)')}</div>
                <div className="text-xs text-slate-500 mt-1">{t('urduSub', 'دائیں سے بائیں لے آؤٹ')}</div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Academic Profile Form Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <CardTitle className="text-base flex items-center gap-2 text-slate-900 dark:text-white">
              <GraduationCap className="h-5 w-5 text-emerald-600" />
              <span>{t('academicProfile', 'Academic Profile')}</span>
            </CardTitle>
            <CardDescription>
              {t('profileDesc', 'Defaults applied when evaluating study options and scholarships')}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSave}>
            <CardContent className="pt-5 space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t('degreeLevelLabel', 'Current / Last Completed Degree')}
                  </label>
                  <select
                    value={degreeLevel}
                    onChange={(e) => setDegreeLevel(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="HSSC">{t('optHssc', 'FSc / A-Levels (Undergraduate Applicant)')}</option>
                    <option value="BS">{t('optBs', '16-Year BS / BSc (Hons)')}</option>
                    <option value="MS">{t('optMs', '18-Year MS / MPhil')}</option>
                    <option value="PhD">{t('optPhd', 'PhD (Postdoc Candidate)')}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t('cgpaLabel', 'Graduation CGPA or Percentage')}
                  </label>
                  <Input
                    type="text"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    placeholder="e.g. 3.4 / 4.0 or 80%"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {t('fieldLabel', 'Primary Academic Field')}
                </label>
                <Input
                  type="text"
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                  placeholder="e.g. Computer Science, AI, Mechanical Engineering"
                />
              </div>

              {session?.user && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {t('loggedInAs', 'Logged in as')} {session.user.name || session.user.email}
                    </div>
                    <div className="text-slate-500">{session.user.email}</div>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="border-t border-slate-100 dark:border-slate-800 py-4 flex justify-end">
              <Button type="submit" variant="gradient" className="font-bold shadow-md">
                {t('savePreferences', 'Save Preferences')}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
