'use client';

import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  // Split lines and parse basic Markdown
  const lines = content.split('\n');

  return (
    <div className="space-y-3 text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-2" />;
        }

        // H3 (### Header)
        if (trimmed.startsWith('### ')) {
          return (
            <h3
              key={idx}
              className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-3 pb-1 border-b border-emerald-100 dark:border-emerald-950 flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{formatInlineMarkdown(trimmed.replace('### ', ''))}</span>
            </h3>
          );
        }

        // H4 (#### Header)
        if (trimmed.startsWith('#### ')) {
          return (
            <h4
              key={idx}
              className="text-base sm:text-lg font-bold text-emerald-900 dark:text-emerald-300 pt-2"
            >
              {formatInlineMarkdown(trimmed.replace('#### ', ''))}
            </h4>
          );
        }

        // Bullet point (- or * )
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const bulletText = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-2 my-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
              <div className="flex-1 text-slate-700 dark:text-slate-300">
                {formatInlineMarkdown(bulletText)}
              </div>
            </div>
          );
        }

        // Numbered list (e.g. 1. 2. )
        const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numberedMatch) {
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-2 my-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold shrink-0 mt-0.5">
                {numberedMatch[1]}
              </span>
              <div className="flex-1 text-slate-800 dark:text-slate-200">
                {formatInlineMarkdown(numberedMatch[2])}
              </div>
            </div>
          );
        }

        // Normal paragraph
        return (
          <p key={idx} className="text-slate-700 dark:text-slate-300">
            {formatInlineMarkdown(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function formatInlineMarkdown(text: string): React.ReactNode {
  // Parse **bold** and *italic*
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-bold text-slate-900 dark:text-white">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={match.index} className="italic text-slate-800 dark:text-slate-200">
          {token.slice(1, -1)}
        </em>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
