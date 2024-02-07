import { AspectRatio } from '@/components/ui/aspect-ratio'
import dynamic from 'next/dynamic'
import React from 'react'
const Image = dynamic(() => import('next/image'))

const ViperBackgroundImage = ({ backgroundImage }: { backgroundImage: string }) => {
   return (
      <>
         <AspectRatio ratio={7 / 2} className="overflow-hidden">
            {backgroundImage ? (
               <Image
                  data-test="background-image"
                  alt={'Viper background image'}
                  src={backgroundImage}
                  width={600}
                  height={200}
                  loading="lazy"
                  fetchPriority="high"
                  className="-z-10 h-full w-full object-cover object-center"
               />
            ) : (
               <div className="-z-10 h-full w-full bg-vp-border-gradient object-cover object-center" />
            )}
         </AspectRatio>
      </>
   )
}

export default ViperBackgroundImage
