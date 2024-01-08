import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useCreateAccountStore } from '../signup/_stores/create-account-store'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const CreateAccountDialogHeader = ({ isPathnameLogin }: { isPathnameLogin: boolean }) => {
   const { data: session } = useSession()
   const { step } = useCreateAccountStore()

   const getHeaderClass = () => {
      if (!session) {
         if (step < 5) {
            return 'pl-16'
         }
         if (step === 5) {
            return 'pl-4'
         }
         if (isPathnameLogin) {
            return 'self-center'
         }
      } else {
         return 'self-center'
      }
   }

   return (
      <DialogHeader className={cn('pt-3', getHeaderClass())}>
         {!session && step <= 5 && !isPathnameLogin && (
            <DialogTitle className={cn('text-base font-semibold text-foreground sm:text-lg')}>
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
   )
}

export default CreateAccountDialogHeader
