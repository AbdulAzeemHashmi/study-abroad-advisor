'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ArrowRight, Loader2, AlertCircle, Eye, EyeOff, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations, useI18n } from '@/lib/i18n';

function SignInContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [googleOAuthNotice, setGoogleOAuthNotice] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const { dir } = useI18n();

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      if (
        errorParam === 'OAuthCallback' ||
        errorParam === 'redirect_uri_mismatch' ||
        errorParam === 'Configuration'
      ) {
        setGoogleOAuthNotice(true);
      } else {
        setError(errorParam);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <Card className="border-2 border-slate-200 dark:border-slate-800 shadow-xl animate-fade-in bg-white dark:bg-slate-900">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
          {t('loginTitle', 'Welcome Back')}
        </CardTitle>
        <CardDescription>
          {t('loginSubtitle', 'Sign in to access your consultations and saved universities')}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Google OAuth Redirect URI notice */}
        {googleOAuthNotice && (
          <div className="mb-4 rounded-xl border-2 border-amber-300 bg-amber-50 p-3.5 text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-950/70 dark:text-amber-200 shadow-sm leading-relaxed">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
              <div>
                <span className="font-bold block mb-1">
                  Google OAuth Redirect URI Configuration:
                </span>
                <span>
                  Please add <code className="bg-amber-200/70 dark:bg-amber-900 px-1 py-0.5 rounded font-mono text-[11px]">http://localhost:3000/api/auth/callback/google</code> to your <strong>Authorized Redirect URIs</strong> in Google Cloud Console.
                </span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300 shadow-sm">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
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
              className="text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {t('passwordLabel', 'Password')}
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
              >
                {t('forgotPassword', 'Forgot Password?')}
              </Link>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="pr-10 text-slate-900 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" variant="gradient" className="w-full gap-2 mt-2 font-bold shadow-md" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{tCommon('loading', 'Signing In...')}</span>
              </>
            ) : (
              <>
                <span>{tCommon('signIn', 'Sign In')}</span>
                <ArrowRight className={`h-4 w-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </>
            )}
          </Button>
        </form>

        <div className="relative my-6 text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-slate-200 dark:after:border-slate-800">
          <span className="relative z-10 bg-white px-3 text-slate-500 dark:bg-slate-900 dark:text-slate-400 font-medium">
            {t('orContinueWith', 'Or continue with')}
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full gap-2 font-semibold shadow-sm"
          onClick={handleGoogleSignIn}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{t('googleSignIn', 'Continue with Google')}</span>
        </Button>
      </CardContent>

      <CardFooter className="justify-center border-t border-slate-100 dark:border-slate-800 py-4 text-xs text-slate-600 dark:text-slate-400">
        <span>{t('noAccount', "Don't have an account?")}</span>{' '}
        <Link
          href="/signup"
          className="ml-1.5 font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 hover:underline"
        >
          {tCommon('signUp', 'Create Account')}
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
