'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import { useCreateAccountStore } from '../_stores/create-account-store'
import useHandleDialog from '@/app/_hooks/use-handle-dialog'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { PropsWithChildren } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export const CreateAccountDialog = ({ children }: PropsWithChildren) => {
   const { data: session, status } = useSession()

   const { step, redirectStep } = useCreateAccountStore()

   const pathname = usePathname()
   const isPathnameLogin = pathname.endsWith('/i/flow/login')

   const { push } = useRouter()

   if (status === 'authenticated' && step === 0) {
      const viperRole = session?.user.role
      const isViper = viperRole === 'viper' || viperRole === 'admin'
      if (isViper) {
         push('/home')
      } else {
         redirectStep(1)
      }
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
                     !session && step < 5 && !isPathnameLogin && 'pl-16',
                     !session && step === 5 && 'pl-4',
                     (session || isPathnameLogin) && 'self-center',
                  )}
               >
                  {!session && step <= 5 && !isPathnameLogin && (
                     <DialogTitle className={cn(' text-lg font-semibold text-foreground')}>
                        Step {step} of 5
                     </DialogTitle>
                  )}
                  {(session || isPathnameLogin) && (
                     <Image
                        src={'/viper.png'}
                        alt="Viper logo"
                        width={40}
                        height={50}
                        loading="lazy"
                        quality={100}
                        className="invert-image"
                     />
                  )}
                  {/* {!session && step <= 5 ? (
                     <DialogTitle className={cn(' text-lg font-semibold text-foreground')}>
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
                        className="invert-image"
                     />
                  )} */}
               </DialogHeader>
               {children}
            </DialogContent>
         </Dialog>
      </>
   )
}
