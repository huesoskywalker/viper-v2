import { GlobalNavItem } from './global-nav-items'
import Link from 'next/link'
import getNavItems from '../../_utils/get-nav-items'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { MoreNavMenu } from './more-nav-menu'
import MobileNavBar from './mobile-nav-bar'
import ViperNavMenu from './viper-nav-menu'

export function GlobalNav() {
   const { navItems } = getNavItems()

   const linkClass =
      'block rounded-full p-3 w-fit text-md font-medium text-foreground hover:bg-accent'

   //TODO: need to handle the opacity of the nav when scrolling on mobile and create the upper menu (avatar and settings wheel)
   return (
      <div className="fixed bottom-0 z-10 flex w-full flex-col justify-between bg-background py-2 sm:top-0 sm:w-24 sm:items-center sm:border-r sm:border-gray-800 xl:w-72 ">
         <nav className="flex flex-col sm:items-center">
            <MobileNavBar />
            <div className="mx-8 flex flex-row justify-between py-2 sm:flex-col sm:py-0">
               <Link href="/" className={cn(linkClass, 'hidden sm:block')}>
                  <Image
                     src={'/viper.png'}
                     width={30}
                     height={30}
                     loading="lazy"
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
         <ViperNavMenu />
      </div>
   )
}
