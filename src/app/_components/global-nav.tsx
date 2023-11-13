'use client'

// import clsx from 'clsx'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { GlobalNavItem } from './global-nav-items'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Icons } from '../../components/ui/icons'
import { buttonVariants } from '@/components/ui/button'
import getNavItems from '../_utils/get-nav-items'

export function GlobalNav() {
   const { data: session, status } = useSession()
   const [isOpen, setIsOpen] = useState(false)
   const close = () => setIsOpen(false)

   const { navItems } = getNavItems()
   // hover:text-gray-200 hover:bg-gray-800
   // remove this class
   const linkClass =
      'block rounded-md px-3 py-2 text-sm font-medium text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
   return (
      <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-black lg:bottom-0 lg:z-auto lg:w-40 lg:border-b-0 lg:border-r lg:border-gray-800">
         <div className="flex h-14 items-center px-4 py-4 lg:h-auto">
            {' '}
            {/* use this pattern for the lInks 
            buttonVariants
            */}
            <Link href="/" className="group flex w-full items-center gap-x-2.5" onClick={close}>
               {/* Should add a logo in here */}
               <h3 className="font-semibold tracking-wide text-gray-300 group-hover:text-gray-50">
                  v<span className="text-yellow-200/80 hover:text-yellow-300">i</span>
                  per
               </h3>
            </Link>
         </div>
         <button
            type="button"
            className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
         >
            {isOpen ? (
               <Icons.close className="block h-6 w-6 text-gray-100 hover:text-gray-400" />
            ) : (
               <Icons.menu className="block h-6 w-6 text-gray-100 hover:text-gray-400" />
            )}
         </button>

         <div
            className={cn('overflow-y-auto lg:static lg:block', {
               'fixed inset-x-0 bottom-0 top-14 mt-px bg-black': isOpen,
               hidden: !isOpen,
            })}
         >
            <nav className="px-2 pb-24 mt-5">
               <div className="space-y-4">
                  {navItems.map((item) => (
                     <GlobalNavItem
                        key={item.slug}
                        item={item}
                        viperName={session?.user.name}
                        close={close}
                     />
                  ))}
                  {/* add the buttonVariants in here */}
                  <Link href="/" onClick={() => signOut()} className={linkClass}>
                     Sign out
                  </Link>
               </div>
            </nav>
         </div>
      </div>
   )
}
