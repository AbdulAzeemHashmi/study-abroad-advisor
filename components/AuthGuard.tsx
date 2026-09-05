'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuthGuard({
  children,
  requireAuth = false,
}: {
  children: React.ReactNode;
  requireAuth?: boolean;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="flex h-[70vh] w-full flex-col items-center justify-center space-y-4 p-8">
        <Skeleton className="h-12 w-12 rounded-2xl" />
        <Skeleton className="h-6 w-48 rounded-lg" />
        <Skeleton className="h-4 w-72 rounded-lg" />
      </div>
    );
  }

  if (requireAuth && status === 'unauthenticated') {
    if (typeof window !== 'undefined') {
      router.push('/signin');
    }
    return null;
  }

  return <>{children}</>;
}
