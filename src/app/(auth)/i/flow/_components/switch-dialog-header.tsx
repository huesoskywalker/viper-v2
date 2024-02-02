import { auth } from '@/lib/auth'
import dynamic from 'next/dynamic'
import React from 'react'
const CreateAccountDialogHeader = dynamic(
   () => import('../_components/create-account-dialog-header'),
   { ssr: false },
)
const DialogViperHeader = dynamic(() => import('../_components/dialog-viper-header'))
const Image = dynamic(() => import('next/image'))

const SwitchDialogHeader = async () => {
   const session = await auth()
   return (
      <>
         {!session ? (
            <CreateAccountDialogHeader />
         ) : (
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
         )}
      </>
   )
}

export default SwitchDialogHeader
