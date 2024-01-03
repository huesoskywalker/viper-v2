'use client'

import Link from 'next/link'
import { NavItem } from '../../_utils/get-nav-items'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

type TopNavItem = HTMLAttributes<HTMLAnchorElement> & { item: NavItem }

export const TopNavItem: React.FC<TopNavItem> = ({ item, ...props }) => {
   const LucideIcon = item.icon

   return (
      <>
         <Link
            data-test="nav-item"
            href={`/${item.slug}`}
            aria-label={item.description}
            className={cn(
               'flex w-full items-center justify-evenly gap-5 rounded-full p-3.5 transition-all duration-100 ease-in hover:bg-accent',
            )}
            {...props}
         >
            <div className="flex w-full flex-row items-center justify-start gap-3">
               <LucideIcon className="h-5 w-5 text-foreground sm:h-6 sm:w-6" strokeWidth={2} />
               <span
                  className={cn('flex text-lg font-semibold text-foreground sm:text-xl xl:block')}
               >
                  {item.name}
               </span>
            </div>
         </Link>
      </>
   )
}
