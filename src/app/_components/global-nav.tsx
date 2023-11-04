'use client'

import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import clsx from 'clsx'
import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { GlobalNavItem } from './global-nav-items'
import { getNavMenu } from '../_utils/getNavMenu'
import Link from 'next/link'

export function GlobalNav() {
   const { data: session, status } = useSession()
   const [isOpen, setIsOpen] = useState(false)
   const close = () => setIsOpen(false)

   const linkClass =
      'block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-200 text-gray-300 hover:bg-gray-800'
   // accidentally I've removed the data-test used in cypress
   return (
      <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-black lg:bottom-0 lg:z-auto lg:w-40 lg:border-b-0 lg:border-r lg:border-gray-800">
         <div className="flex h-14 items-center px-4 py-4 lg:h-auto">
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
               <CloseIcon className="block text-gray-100 hover:text-gray-400" />
            ) : (
               <MenuIcon className="block text-gray-100 hover:text-gray-400" />
            )}
         </button>

         <div
            className={clsx('overflow-y-auto lg:static lg:block', {
               'fixed inset-x-0 bottom-0 top-14 mt-px bg-black': isOpen,
               hidden: !isOpen,
            })}
         >
            {status !== 'unauthenticated' ? (
               <nav className="px-2 pb-24 mt-5">
                  <div className="space-y-4">
                     {getNavMenu().map((item) => (
                        <GlobalNavItem
                           key={item.slug}
                           item={item}
                           viperName={session?.user.name}
                           close={close}
                        />
                     ))}
                     <Link href="/" onClick={() => signOut()} className={linkClass}>
                        Sign out
                     </Link>
                  </div>
               </nav>
            ) : (
               <Link href="/" onClick={() => signIn()} className={linkClass}>
                  Sign in
               </Link>
            )}
         </div>
      </div>
   )
}
