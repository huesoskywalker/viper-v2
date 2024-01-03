'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { NavItem } from '../../_utils/get-nav-items'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

type GlobalNavItem = HTMLAttributes<HTMLAnchorElement> & { item: NavItem }

export const GlobalNavItem: React.FC<GlobalNavItem> = ({ item, ...props }) => {
   const segment = useSelectedLayoutSegment()
   const isActive = item.slug === segment

   const LucideIcon = item.icon

   return (
      <>
         <Link
            data-test="nav-item"
            href={`/${item.slug}`}
            aria-label={item.description}
            className={cn(
               'w-fit items-center justify-center rounded-full transition-all duration-100 ease-in hover:bg-accent sm:flex sm:p-3.5',
               {
                  'font-normal ': !isActive,
                  'font-semibold': isActive,
                  hidden: item?.hideOnMobile,
               },
            )}
            {...props}
         >
            <div className="flex w-full flex-row items-center justify-start gap-3">
               <LucideIcon className="text-foreground" strokeWidth={isActive ? 3 : 2} size={30} />
               <span className={cn('hidden text-lg text-foreground sm:text-xl xl:block', {})}>
                  {item.name}
               </span>
            </div>
         </Link>
      </>
   )
}
