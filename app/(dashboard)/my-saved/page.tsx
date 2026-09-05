'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookmarkCheck, Trash2, Calendar, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslations, useI18n } from '@/lib/i18n';

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
  const tCommon = useTranslations('common');
  const [items, setItems] = useState<SavedItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch from API or localStorage
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
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t('subtitle', 'Access your past consultations, generated roadmaps, and university shortlists.')}
          </p>
        </div>

        <Link href="/dashboard">
          <Button variant="gradient" size="sm">
            New Consultation
          </Button>
        </Link>
      </div>

      {items.length === 0 ? (
        <Card className="p-12 text-center border-dashed">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 mb-3">
            <BookmarkCheck className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">
            No Saved Consultations Found
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-md mx-auto">
            {t('emptyNotice', 'Ask a question on the dashboard to save recommendations and roadmaps.')}
          </p>
          <Link href="/dashboard" className="inline-block mt-4">
            <Button variant="outline" size="sm">
              Go to Dashboard
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="border-slate-200/80 shadow-sm dark:border-slate-800">
              <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800/80 flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">
                      {item.degreeLevel || 'Consultation'}
                    </Badge>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
                    "{item.query}"
                  </CardTitle>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(item.id, item.response)}
                    title="Copy response"
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 transition-colors"
                  >
                    {copiedId === item.id ? (
                      <Check className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    title="Delete"
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm whitespace-pre-line leading-relaxed text-slate-700 dark:text-slate-300">
                  {item.response}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
