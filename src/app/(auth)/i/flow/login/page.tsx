import React from 'react'
import { Toaster } from '@/components/ui/toaster'
import ViperLogin from './_components/viper-login'
import Image from 'next/image'
import DialogViperHeader from '../_components/dialog-viper-header'

const LogInPage = () => {
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
         <ViperLogin />
         <Toaster />
      </>
   )
}

export default LogInPage
