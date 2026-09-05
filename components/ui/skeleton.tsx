import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-xl bg-slate-200/70 dark:bg-slate-800/70', className)}
      {...props}
    />
  );
}

export { Skeleton };
