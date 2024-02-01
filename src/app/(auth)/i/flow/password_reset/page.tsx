import React from 'react'
import DialogViperHeader from '../_components/dialog-viper-header'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import LoadingSpinner from '@/app/_components/loading/loading-spinner'
const PasswordReset = dynamic(() => import('./_components/password-reset'), {
   loading: () => <LoadingSpinner />,
})

const PasswordResetPage = () => {
   return (
      <>
         <DialogViperHeader className="self-center pt-3">
            <Image
               src={'/viper-small.png'}
               alt="Viper logo"
               width={40}
               height={40}
               loading="lazy"
               quality={100}
               className="invert-image"
            />
         </DialogViperHeader>
         <PasswordReset />
      </>
   )
}

export default PasswordResetPage
