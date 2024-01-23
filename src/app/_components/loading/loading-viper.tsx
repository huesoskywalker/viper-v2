import Image from 'next/image'
import React from 'react'

const ViperLoading = () => {
   return (
      <div className="flex min-h-screen w-full items-center justify-center">
         <Image
            src={'/viper.png'}
            alt="Viper logo"
            width={200}
            height={250}
            quality={100}
            loading="eager"
            priority={true}
            className="invert-image"
         />
      </div>
   )
}

export default ViperLoading
