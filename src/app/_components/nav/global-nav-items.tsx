'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { NavItem, navIcon } from '../../_utils/get-nav-items'
import { cn } from '@/lib/utils'

export function GlobalNavItem({ item, close }: { item: NavItem; close: () => false | void }) {
   const segment = useSelectedLayoutSegment()
   const isActive = item.slug === segment

   const IconComponent = navIcon.get(item.name)
   const hideIcon = ['Profile'].includes(item.name)

   return (
      <>
         <Link
            data-test="nav-item"
            onClick={close}
            href={`/${item.slug}`}
            className={cn('w-fit rounded-full  hover:bg-accent md:block md:p-3', {
               'font-normal text-gray-300': !isActive,
               'font-semibold text-white': isActive,
               hidden: hideIcon,
            })}
         >
            <div className="flex flex-row items-center justify-center gap-3">
               {IconComponent && (
                  <IconComponent
                     className="text-foreground"
                     strokeWidth={isActive ? 3 : 1.5}
                     size={30}
                  />
               )}
               <span className="hidden pr-3 text-xl text-foreground xl:block">{item.name}</span>
            </div>
         </Link>
      </>
   )
}
