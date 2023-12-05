'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import React from 'react'
import { useCreateAccountStore } from '../_stores/create-account-store'
import useHandleDialog from '@/app/_hooks/use-handle-dialog'
import { cn } from '@/lib/utils'
import { CreateAccountForm } from './create-account-form'

export const CreateAccountDialog = () => {
   const { step } = useCreateAccountStore()

   const { openDialog, closeDialog } = useHandleDialog()

   const handleOnOpen = step <= 4 ? () => closeDialog('/') : undefined

   const handleIconSteps = step <= 4 ? step : 'disabled'

   const handleAutoFocus = (e: Event) => {
      if (step === 2 || step === 3) e.preventDefault()
   }
   return (
      <>
         <Dialog open={openDialog} onOpenChange={handleOnOpen}>
            <DialogContent
               onOpenAutoFocus={handleAutoFocus}
               steps={handleIconSteps}
               className="flex h-[650px] max-w-[610px] flex-col items-start justify-center rounded-lg border-none pt-2 "
            >
               <DialogHeader
                  className={cn(
                     step < 5 && 'pl-16',
                     step === 5 && 'pl-4',
                     step > 5 && 'self-center',
                  )}
               >
                  {step <= 5 ? (
                     <DialogTitle className={cn(' text-lg font-semibold text-gray-300')}>
                        Step {step} of 5
                     </DialogTitle>
                  ) : (
                     <Image
                        src={'/viper.png'}
                        alt="Viper logo"
                        width={40}
                        height={50}
                        loading="lazy"
                        quality={100}
                        className="invert filter"
                     />
                  )}
               </DialogHeader>
               <CreateAccountForm step={step} />
            </DialogContent>
         </Dialog>
      </>
   )
}
