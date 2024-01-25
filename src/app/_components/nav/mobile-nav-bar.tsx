'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ViperMobileNavMenu } from './viper-mobile-nav-menu'
import { cn } from '@/lib/utils'

// TODO: does not work in profile (CHECK where else)
// Also use a children for the for the middle search bar or logo
// at the right settings

const MobileNavBar = () => {
   const ref = useRef<HTMLElement>(null)
   const [isIntersecting, setIntersecting] = useState<boolean>(true)

   useEffect(() => {
      if (!ref.current) return
      const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting))

      observer.observe(ref.current)
      return () => observer.disconnect()
   }, [])

   return (
      <header ref={ref}>
         <nav
            className={cn(
               'fixed inset-x-0 top-0 flex w-full items-center justify-between bg-background p-4 py-2 backdrop-blur duration-200 sm:hidden sm:h-fit sm:w-fit',
               isIntersecting ? 'bg-background' : 'bg-background/80 ',
            )}
         >
            <ViperMobileNavMenu />
            <Image
               src={'/viper.png'}
               width={25}
               height={25}
               loading="lazy"
               alt="V logo"
               className="block invert-image sm:hidden"
            />
         </nav>
      </header>
   )
}

export default MobileNavBar
