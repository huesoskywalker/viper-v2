'use client'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import { useCreateAccountStore } from '../signup/_stores/create-account-store'
import useHandleDialog from '@/app/_hooks/use-handle-dialog'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { PropsWithChildren, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import GlobalDialog from '@/app/_components/dialog/global-dialog-content'
import CreateAccountDialogHeader from './create-account-dialog-header'

export const CreateAccount = ({ children }: PropsWithChildren) => {
   const { data: session, status } = useSession()

   const { step, redirectStep } = useCreateAccountStore()

   const pathname = usePathname()
   const isPathnameLogin = pathname.endsWith('/i/flow/login')

   const { push } = useRouter()

   useEffect(() => {
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
   }, [status, isPathnameLogin])

   const { openDialog, closeDialog } = useHandleDialog()

   const handleOnOpen = !session && step <= 4 ? () => closeDialog('/') : undefined

   const stepIcon = !session && step <= 4 ? step : 'disabled'

   const handleAutoFocus = (e: Event) => {
      if (!session) {
         if (step === 2 || step === 3) e.preventDefault()
      } else {
         e.preventDefault()
      }
   }

   return (
      <>
         <GlobalDialog
            open={openDialog}
            onOpenChange={handleOnOpen}
            onOpenAutoFocus={handleAutoFocus}
            stepIcon={stepIcon}
         >
            <CreateAccountDialogHeader isPathnameLogin={isPathnameLogin} />

            {children}
         </GlobalDialog>
      </>
   )
}
