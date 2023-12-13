'use client'

import { useSession, signOut } from 'next-auth/react'
import { GlobalNavItem } from './global-nav-items'
import Link from 'next/link'
import getNavItems from '../_utils/get-nav-items'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function GlobalNav() {
   const { data: session } = useSession()
   const { navItems } = getNavItems()

   const linkClass =
      'block rounded-full px-3 py-3 w-fit text-md font-medium text-secondary-foreground hover:bg-accent'

   return (
      <div className="fixed bottom-0 z-10 flex w-full flex-col justify-between bg-black py-2 md:top-0 md:w-24 md:items-center md:border-r md:border-gray-800 md:pt-3 xl:w-72 ">
         <nav className="flex flex-col md:items-center">
            <div className="mx-4 flex flex-row justify-between md:mx-0 md:flex-col md:space-y-3">
               <Link href="/" className={cn(linkClass, 'hidden md:block')}>
                  <Image
                     src={'/viper.png'}
                     width={30}
                     height={30}
                     alt="V logo"
                     className="invert "
                  />
               </Link>
               {navItems.map((item) => (
                  <GlobalNavItem key={item.slug} item={item} close={close} />
               ))}
            </div>
         </nav>
         <DropdownMenu>
            <DropdownMenuTrigger asChild className="mb-8 rounded-full py-8">
               <Button variant="ghost" className="justify-between  hover:bg-accent">
                  <div className="hidden flex-row justify-between gap-3 sm:flex md:items-center">
                     <Avatar className={cn()}>
                        <AvatarImage
                           width={40}
                           height={40}
                           className="h-10 w-10 rounded-full"
                           src={'/default-user.png'}
                           alt="Profile preview"
                        />
                     </Avatar>
                     <div className="flex flex-col items-start justify-start text-base">
                        <span className="hidden text-secondary-foreground xl:block">
                           {session?.user.name}
                        </span>
                        <span className="hidden text-muted-foreground xl:block">
                           @{session?.user.username}
                        </span>
                     </div>
                     <span className="text-lg font-semibold text-secondary-foreground">...</span>
                  </div>
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="shadow-rounded box-border w-64 border-none px-0 py-3">
               <DropdownMenuItem className="py-2 pl-4">
                  <Link
                     href="/"
                     onClick={() => signOut({ callbackUrl: '/' })}
                     className={'px-0 text-base font-semibold text-secondary-foreground'}
                  >
                     Log out @{session?.user.username}
                  </Link>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   )
}
