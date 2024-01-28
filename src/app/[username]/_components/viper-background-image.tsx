import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import React from 'react'

const ViperBackgroundImage = ({ backgroundImage }: { backgroundImage: string }) => {
   return (
      <>
         {backgroundImage ? (
            <AspectRatio ratio={7 / 2}>
               <Image
                  data-test="background-image"
                  alt={'Viper background image'}
                  src={backgroundImage}
                  width={600}
                  height={200}
                  loading="lazy"
                  fetchPriority="high"
                  // -----------------need a base 64 encoded image of 10px
                  // placeholder="blur"
                  // blurDataURL={}
                  quality={100}
                  className="-z-10 h-full w-full object-cover object-center"
               />
            </AspectRatio>
         ) : (
            <AspectRatio ratio={7 / 2}>
               <div className="-z-10 h-full w-full bg-vp-border-gradient object-cover object-center"></div>
            </AspectRatio>
         )}
      </>
   )
}

export default ViperBackgroundImage
