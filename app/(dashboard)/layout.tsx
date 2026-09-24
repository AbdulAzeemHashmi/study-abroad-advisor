'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import AuthGuard from '@/components/AuthGuard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="min-h-screen flex bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        {/* Deep Slate High-Contrast Sidebar */}
        <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Top Header */}
          <Header onOpenMobileMenu={() => setIsMobileOpen(true)} />

          {/* Page Content Viewport */}
          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
