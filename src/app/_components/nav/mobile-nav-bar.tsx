import React from 'react'
import Image from 'next/image'
import { ViperMobileNavMenu } from './viper-mobile-nav-menu'

const MobileNavBar = () => {
   return (
      <div className="fixed top-0 flex w-full items-center justify-between bg-background p-4 py-2 sm:hidden sm:h-fit sm:w-fit">
         <ViperMobileNavMenu />
         <Image
            src={'/viper.png'}
            width={25}
            height={25}
            loading="lazy"
            alt="V logo"
            className="block invert-image sm:hidden"
         />
      </div>
   )
}

export default MobileNavBar
