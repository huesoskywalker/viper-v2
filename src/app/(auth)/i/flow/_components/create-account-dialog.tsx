'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import { useCreateAccountStore } from '../signup/_stores/create-account-store'
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

   if (status === 'authenticated') {
      if (step === 0) {
         const viperRole = session.user.role
         const isViper = viperRole === 'viper' || viperRole === 'admin'
         if (isViper) {
            push('/home')
         } else {
            redirectStep(1)
         }
      }
      if (isPathnameLogin) {
         push('/home')
      }
   }

   const { openDialog, closeDialog } = useHandleDialog()

   const handleOnOpen = !session && step <= 4 ? () => closeDialog('/') : undefined

   const handleStepIcon = !session && step <= 4 ? step : 'disabled'

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
               className="flex h-full max-w-sm flex-col items-start justify-center rounded-lg border-none md:h-[575px] md:max-w-[600px] xl:h-[650px] "
            >
               <DialogHeader
                  className={cn(
                     'pt-3',
                     !session && step < 5 && !isPathnameLogin && 'pl-16',
                     !session && step === 5 && 'pl-4',
                     (session || isPathnameLogin) && 'self-center',
                  )}
               >
                  {!session && step <= 5 && !isPathnameLogin && (
                     <DialogTitle
                        className={cn('text-base font-semibold text-foreground sm:text-lg')}
                     >
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
               </DialogHeader>
               {children}
            </DialogContent>
         </Dialog>
      </>
   )
}
