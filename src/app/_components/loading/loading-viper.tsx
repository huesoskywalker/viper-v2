import Image from 'next/image'
import React from 'react'

const ViperLoading = () => {
   return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
         <Image
            src={'/viper.png'}
            alt="Viper logo"
            width={200}
            height={250}
            quality={100}
            loading="eager"
            fetchPriority="high"
            priority={true}
            className="invert-image"
         />
      </div>
   )
}

export default ViperLoading
