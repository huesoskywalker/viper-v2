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
      'block rounded-full p-3 w-fit text-md font-medium text-secondary-foreground hover:bg-accent'

   // need to handle the opacity of the nav when scrolling on mobile and create the upper menu (avatar and settings wheel)
   return (
      <div className="fixed bottom-0 z-10 flex w-full flex-col justify-between bg-black py-2 md:top-0 md:w-24 md:items-center md:border-r md:border-gray-800 xl:w-72 ">
         <nav className="flex flex-col md:items-center">
            <div className="mx-8 flex flex-row justify-between py-2 sm:py-0 md:flex-col">
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
            <DropdownMenuTrigger asChild className="hidden rounded-full px-3 py-7 sm:mb-3 sm:flex">
               <Button variant="ghost" className="hover:bg-accent">
                  <div className="flex flex-row justify-between md:items-center xl:gap-2">
                     <Avatar>
                        <AvatarImage
                           width={40}
                           height={40}
                           className="h-8 w-8 rounded-full p-0 xl:h-10 xl:w-10"
                           src={'/default-user.png'}
                           alt="Profile preview"
                        />
                     </Avatar>
                     <div className="flex flex-col items-start justify-start text-sm">
                        <span className="hidden text-secondary-foreground xl:block">
                           {session?.user.name}
                        </span>
                        <span className="hidden text-muted-foreground xl:block">
                           <span className="align-text-top text-xs">@</span>
                           {session?.user.username}
                        </span>
                     </div>
                     <span className="hidden text-base font-semibold text-secondary-foreground xl:block">
                        ...
                     </span>
                  </div>
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-2 box-border w-60 border-none px-0 py-3 shadow-rounded">
               <DropdownMenuItem className="py-2 pl-3">
                  <Link
                     href="/"
                     onClick={() => signOut({ callbackUrl: '/' })}
                     className={'text-sm font-medium text-secondary-foreground'}
                  >
                     Log out <span className="align-text-top text-xs">@</span>
                     {session?.user.username}
                  </Link>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   )
}
