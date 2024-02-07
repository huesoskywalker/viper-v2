'use client'

import Link from 'next/link'
import { NavItem } from '../../_utils/get-nav-items'
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'

type TopNavItem = ComponentPropsWithoutRef<'a'> & { item: NavItem; username?: string }

export const TopNavItem: React.FC<TopNavItem> = ({ item, username, ...props }) => {
   const LucideIcon = item.icon

   const itemSlug = item.slug === 'profile' ? `${username}` : item.slug

   return (
      <>
         <Link
            data-test="nav-item"
            href={itemSlug}
            aria-label={item.description}
            className={cn(
               'transition-all flex w-full items-center justify-start gap-5 rounded-full p-2.5 duration-100 ease-in hover:bg-accent',
            )}
            {...props}
         >
            <div className="flex w-fit flex-row items-center justify-center gap-3 ">
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
