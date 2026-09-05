'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { I18nProvider } from '@/lib/i18n';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <I18nProvider initialLocale="en">{children}</I18nProvider>
    </SessionProvider>
  );
}
