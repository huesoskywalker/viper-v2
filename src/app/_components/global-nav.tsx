'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { GlobalNavItem } from './global-nav-items'
import Link from 'next/link'
import getNavItems from '../_utils/get-nav-items'
import { Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'

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
               // <X   className="block h-6 w-6 text-gray-100 hover:text-gray-400" />
               <X size={6} className="block text-gray-100 hover:text-gray-400" />
            ) : (
               <Menu size={6} className="block text-gray-100 hover:text-gray-400" />
            )}
         </button>

         <div
            className={cn('overflow-y-auto lg:static lg:block', {
               'fixed inset-x-0 bottom-0 top-14 mt-px bg-black': isOpen,
               hidden: !isOpen,
            })}
         >
            <nav className="mt-5 px-2 pb-24">
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
                  <Link
                     href="/"
                     onClick={() => signOut({ callbackUrl: '/' })}
                     className={linkClass}
                  >
                     Sign out
                  </Link>
               </div>
            </nav>
         </div>
      </div>
   )
}
