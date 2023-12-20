'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import { useCreateAccountStore } from '../_stores/create-account-store'
import useHandleDialog from '@/app/_hooks/use-handle-dialog'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { PropsWithChildren } from 'react'
import { useRouter } from 'next/navigation'

export const CreateAccountDialog = ({ children }: PropsWithChildren) => {
   const { data: session, status } = useSession()

   const { step } = useCreateAccountStore()

   const { push } = useRouter()
   if (status === 'authenticated' && step === 0) {
      push('/home')
   }

   const { openDialog, closeDialog } = useHandleDialog()

   const handleOnOpen = !session ? (step <= 4 ? () => closeDialog('/') : undefined) : undefined

   const handleStepIcon = !session ? (step <= 4 ? step : 'disabled') : 'disabled'

   const handleAutoFocus = (e: Event) => {
      if (!session) {
         if (step === 2 || step === 3) e.preventDefault()
      } else {
         e.preventDefault()
      }
   }
   return (
      <>
         <Dialog open={openDialog} onOpenChange={handleOnOpen}>
            <DialogContent
               onOpenAutoFocus={handleAutoFocus}
               steps={handleStepIcon}
               className="flex h-[650px] max-w-[610px] flex-col items-start justify-center rounded-lg border-none pt-2 "
            >
               <DialogHeader
                  className={cn(
                     !session && step < 5 && 'pl-16',
                     !session && step === 5 && 'pl-4',
                     session && 'self-center',
                  )}
               >
                  {!session && step <= 5 ? (
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
               {children}
            </DialogContent>
         </Dialog>
      </>
   )
}
