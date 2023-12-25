import { GlobalNavItem } from './global-nav-items'
import Link from 'next/link'
import getNavItems from '../../_utils/get-nav-items'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import ViperNavCard from './viper-nav-card'
import { MoreNavMenu } from './more-nav-menu'

export function GlobalNav() {
   const { navItems } = getNavItems()

   const linkClass =
      'block rounded-full p-3 w-fit text-md font-medium text-foreground hover:bg-accent'

   // need to handle the opacity of the nav when scrolling on mobile and create the upper menu (avatar and settings wheel)
   return (
      <div className="fixed bottom-0 z-10 flex w-full flex-col justify-between bg-background py-2 md:top-0 md:w-24 md:items-center md:border-r md:border-gray-800 xl:w-72 ">
         <nav className="flex flex-col md:items-center">
            <div className="mx-8 flex  flex-row justify-between py-2 sm:py-0 md:flex-col">
               <Link href="/" className={cn(linkClass, 'hidden md:block')}>
                  <Image
                     src={'/viper.png'}
                     width={30}
                     height={30}
                     alt="V logo"
                     className="invert-image"
                  />
               </Link>
               {navItems.map((item) => (
                  <GlobalNavItem key={item.slug} item={item} close={close} />
               ))}
               <MoreNavMenu />
            </div>
         </nav>
         <ViperNavCard />
      </div>
   )
}
