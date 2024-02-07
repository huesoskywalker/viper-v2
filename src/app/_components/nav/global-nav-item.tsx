'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { NavItem } from '../../_utils/get-nav-items'
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'

type GlobalNavItem = ComponentPropsWithoutRef<'a'> & { item: NavItem; username?: string }

export const GlobalNavItem: React.FC<GlobalNavItem> = ({ item, username, ...props }) => {
   const segment = useSelectedLayoutSegment()
   const isActive = item.slug === segment

   const itemSlug = item.slug === 'profile' ? `${username}` : item.slug

   const LucideIcon = item.icon

   return (
      <>
         <Link
            data-test="nav-item"
            href={`/${itemSlug}`}
            aria-label={item.description}
            className={cn(
               'transition-all w-fit items-center justify-center rounded-full duration-100 ease-in hover:bg-accent sm:flex sm:px-3 sm:py-2 xl:pr-7 ',
               {
                  'font-normal ': !isActive,
                  'font-semibold': isActive,
                  hidden: item?.hideOnMobile,
               },
            )}
            scroll={false}
            {...props}
         >
            <div className="flex w-full flex-row items-center justify-start gap-3">
               <LucideIcon className="text-foreground" strokeWidth={isActive ? 3 : 2} size={30} />
               <span className={'hidden text-foreground xl:block xl:text-lg'}>{item.name}</span>
            </div>
         </Link>
      </>
   )
}
