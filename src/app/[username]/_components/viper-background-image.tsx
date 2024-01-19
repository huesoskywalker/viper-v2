import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import React from 'react'

const ViperBackgroundImage = ({ backgroundImage }: { backgroundImage: string }) => {
   return (
      <>
         {backgroundImage ? (
            <AspectRatio ratio={16 / 6}>
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
                  className="-z-10 h-full w-full object-cover object-center sm:rounded-xl"
               />
            </AspectRatio>
         ) : (
            <AspectRatio ratio={16 / 6}>
               <div className="-z-10 h-full w-full bg-vp-border-gradient object-cover object-center sm:rounded-xl"></div>
            </AspectRatio>
         )}
      </>
   )
}

export default ViperBackgroundImage
