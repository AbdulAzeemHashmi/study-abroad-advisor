'use client';

import React, { createContext, useContext, useState, useEffect, useTransition } from 'react';
import en from '@/messages/en.json';
import ur from '@/messages/ur.json';

export type Locale = 'en' | 'ur';

const dictionaries: Record<Locale, any> = {
  en,
  ur,
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: 'ltr' | 'rtl';
  t: (keyPath: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  setLocale: () => {},
  dir: 'ltr',
  t: (keyPath: string) => keyPath,
});

export function I18nProvider({
  children,
  initialLocale = 'en',
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [, startTransition] = useTransition();

  useEffect(() => {
    // Check saved cookie or localStorage on initial client mount
    try {
      const saved = localStorage.getItem('sa_locale') as Locale | null;
      if (saved === 'en' || saved === 'ur') {
        setLocaleState(saved);
        document.documentElement.lang = saved;
        document.documentElement.dir = saved === 'ur' ? 'rtl' : 'ltr';
      }
    } catch {
      // Ignore in SSR / restricted storage environments
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    startTransition(() => {
      setLocaleState(newLocale);
      try {
        localStorage.setItem('sa_locale', newLocale);
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        document.documentElement.lang = newLocale;
        document.documentElement.dir = newLocale === 'ur' ? 'rtl' : 'ltr';
      } catch (err) {
        console.warn('Could not persist locale preference', err);
      }
    });
  };

  const dir = locale === 'ur' ? 'rtl' : 'ltr';

  const t = (keyPath: string, fallback?: string): string => {
    const keys = keyPath.split('.');
    let current = dictionaries[locale];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English if missing in Urdu
        let fallbackVal = dictionaries['en'];
        for (const fbKey of keys) {
          if (fallbackVal && typeof fallbackVal === 'object' && fbKey in fallbackVal) {
            fallbackVal = fallbackVal[fbKey];
          } else {
            return fallback || keyPath;
          }
        }
        return typeof fallbackVal === 'string' ? fallbackVal : fallback || keyPath;
      }
    }

    return typeof current === 'string' ? current : fallback || keyPath;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, dir, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export function useTranslations(namespace?: string) {
  const { t } = useI18n();
  return (key: string, fallback?: string) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return t(fullKey, fallback);
  };
}
