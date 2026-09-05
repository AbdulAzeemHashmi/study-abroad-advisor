'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, AlertCircle, CheckCircle2, Mail } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations, useI18n } from '@/lib/i18n';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resetUrl, setResetUrl] = useState<string | null>(null);
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const { dir } = useI18n();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    setResetUrl(null);

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to process password reset request.');
      } else {
        setSuccess(data.message || 'If that email exists in our records, a reset link has been dispatched.');
        if (data.devResetUrl) {
          setResetUrl(data.devResetUrl);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-slate-200/80 shadow-xl dark:border-slate-800 animate-fade-in">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
          <Mail className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl font-bold">
          {t('resetTitle', 'Reset Your Password')}
        </CardTitle>
        <CardDescription>
          {t('resetSubtitle', "Enter your email address and we'll send a password recovery link")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 space-y-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>{success}</span>
            </div>
            {resetUrl && (
              <div className="mt-2 pt-2 border-t border-emerald-200/60 dark:border-emerald-800/60">
                <span className="font-semibold block text-[11px] text-emerald-900 dark:text-emerald-200">
                  Local Dev Direct Link:
                </span>
                <a
                  href={resetUrl}
                  className="break-all text-[11px] underline text-emerald-700 dark:text-emerald-400 font-mono"
                >
                  {resetUrl}
                </a>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t('emailLabel', 'Email Address')}
            </label>
            <Input
              type="email"
              placeholder="student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Button type="submit" variant="gradient" className="w-full gap-2" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending Recovery Email...</span>
              </>
            ) : (
              <span>{t('sendResetLink', 'Send Reset Link')}</span>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t border-slate-100 dark:border-slate-800 py-4 text-xs text-slate-500">
        <Link
          href="/signin"
          className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 hover:underline"
        >
          <ArrowLeft className={`h-3.5 w-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          <span>{t('backToLogin', 'Back to Sign In')}</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
