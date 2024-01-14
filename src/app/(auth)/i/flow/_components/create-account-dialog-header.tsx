import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useCreateAccountStore } from '../signup/_stores/create-account-store'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const CreateAccountDialogHeader = () => {
   const { data: session } = useSession()

   const pathname = usePathname()

   const { step } = useCreateAccountStore()

   const isPathnameLogin = pathname.endsWith('/i/flow/login')
   const isPathnamePassword = pathname.endsWith('/i/flow/password_reset')

   const getHeaderClass = () => {
      if (!session) {
         if (isPathnameLogin || isPathnamePassword) {
            if (step !== 7) {
               return 'self-center'
            }
            return 'self-center pt-16'
         }
         if (step < 5) {
            return 'pl-16'
         }
         if (step === 5) {
            return 'pl-4'
         }
      } else {
         return 'self-center'
      }
   }

   return (
      <DialogHeader className={cn('pt-3', getHeaderClass())}>
         {!session && step <= 5 && !isPathnameLogin && !isPathnamePassword && (
            <DialogTitle className={cn('text-base font-semibold text-foreground sm:text-lg')}>
               Step {step} of 5
            </DialogTitle>
         )}
         {(session || isPathnameLogin || isPathnamePassword) && (
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
   )
}

export default CreateAccountDialogHeader
