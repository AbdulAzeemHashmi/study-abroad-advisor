'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookmarkCheck, Trash2, Calendar, Copy, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { useTranslations } from '@/lib/i18n';

interface SavedItem {
  id: string;
  query: string;
  response: string;
  createdAt: string;
  degreeLevel?: string;
  provider?: string;
}

export default function MySavedPage() {
  const t = useTranslations('saved');
  const [items, setItems] = useState<SavedItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const res = await fetch('/api/consult/saved');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setItems(data);
            return;
          }
        }
      } catch {
        // Fallback to local storage
      }

      const stored = localStorage.getItem('sa_saved_queries');
      if (stored) {
        try {
          setItems(JSON.parse(stored));
        } catch {
          setItems([]);
        }
      }
    };
    loadItems();
  }, []);

  const handleDelete = async (id: string) => {
    const filtered = items.filter((i) => i.id !== id);
    setItems(filtered);
    localStorage.setItem('sa_saved_queries', JSON.stringify(filtered));

    try {
      await fetch(`/api/consult/saved?id=${id}`, { method: 'DELETE' });
    } catch {
      // Ignored
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <BookmarkCheck className="h-6 w-6 text-emerald-600" />
            <span>{t('title', 'Saved Consultations & Bookmarks')}</span>
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {t('subtitle', 'Access your past consultations, generated roadmaps, and university shortlists.')}
          </p>
        </div>

        <Link href="/dashboard">
          <Button variant="gradient" size="sm" className="shadow-sm font-bold">
            {t('newConsultation', 'New Consultation')}
          </Button>
        </Link>
      </div>

      {items.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 mb-3 shadow-sm">
            <BookmarkCheck className="h-7 w-7" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {t('emptyTitle', 'No Saved Consultations Found')}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-md mx-auto">
            {t('emptyNotice', 'Ask a question on the dashboard to save recommendations and roadmaps.')}
          </p>
          <Link href="/dashboard" className="inline-block mt-4">
            <Button variant="outline" size="sm" className="shadow-sm font-semibold">
              {t('goToDashboard', 'Go to Dashboard')}
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="shadow-sm border-2">
              <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px] font-bold">
                      {item.degreeLevel || t('consultation', 'Consultation')}
                    </Badge>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
                    "{item.query}"
                  </CardTitle>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(item.id, item.response)}
                    title={t('copy', 'Copy response')}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm"
                  >
                    {copiedId === item.id ? (
                      <Check className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    title={t('delete', 'Delete')}
                    className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 transition-colors border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                <MarkdownRenderer content={item.response} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
