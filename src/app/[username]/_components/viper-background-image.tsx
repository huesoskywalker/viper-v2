import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import React from 'react'

const ViperBackgroundImage = ({ backgroundImage }: { backgroundImage: string }) => {
   return (
      <>
         {backgroundImage ? (
            <AspectRatio ratio={3 / 1}>
               <Image
                  data-test="background-image"
                  alt={'Viper background image'}
                  src={backgroundImage}
                  width={600}
                  height={200}
                  placeholder="blur"
                  loading="lazy"
                  blurDataURL={backgroundImage}
                  quality={100}
                  className="-z-10 h-full w-full object-cover object-center"
               />
            </AspectRatio>
         ) : (
            <AspectRatio ratio={3 / 1}>
               <div className="-z-10 h-full w-full bg-vp-border-gradient object-cover object-center"></div>
            </AspectRatio>
         )}
      </>
   )
}

export default ViperBackgroundImage
