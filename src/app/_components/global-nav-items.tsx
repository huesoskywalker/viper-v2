'use client'

import { NavItem } from '@/types/nav-menu'
import clsx from 'clsx'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export function GlobalNavItem({
   item,
   viperName,
   close,
}: {
   item: NavItem
   viperName: string | null | undefined
   close: () => false | void
}) {
   const segment = useSelectedLayoutSegment()
   const isActive = item.slug === segment

   const profileName = viperName ? viperName : 'Welcome'

   return (
      <Link
         data-test="nav-item"
         onClick={close}
         href={`/${item.slug}`}
         className={clsx('block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-200 ', {
            'text-gray-300 hover:bg-gray-800': !isActive,
            'text-white font-bold': isActive,
         })}
      >
         {item.name === 'Profile' ? profileName : item.name}
      </Link>
   )
}
