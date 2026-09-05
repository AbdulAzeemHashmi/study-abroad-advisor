import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Study Abroad Advisor | AI Guidance for Pakistani Students',
  description:
    'AI-powered RAG platform providing personalized, up-to-date foreign university recommendations, realistic budget breakdowns in PKR, and visa pathways for Pakistani BS, MS, PhD & Postdoc candidates.',
  keywords: [
    'Study abroad Pakistan',
    'Pakistani students scholarships',
    'DAAD Germany block account',
    'Free universities in Europe',
    'Post-study work visa',
    'AI education advisor',
  ],
  authors: [{ name: 'Study Abroad Advisor' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Study Abroad Advisor | Zero-Cost AI Guidance',
    description:
      'Personalized foreign university recommendations, tuition estimates in PKR, and post-study work pathways for Pakistani students.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50/50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
