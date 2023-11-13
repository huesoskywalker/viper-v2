'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { NavItem } from '../_utils/get-nav-items'

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
      // add the icons based on the slug and fill solid, none based on the activeness
      <Link
         // add the button variant in here
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
