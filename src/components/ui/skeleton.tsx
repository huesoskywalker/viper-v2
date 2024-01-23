import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
   const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-muted-foreground/10 before:to-transparent`

   return (
      <div className={cn(`animate-pulse rounded-md bg-accent ${shimmer}`, className)} {...props} />
   )
}

export { Skeleton }
