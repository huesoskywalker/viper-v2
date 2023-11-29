'use client'

import { useState, useTransition } from 'react'
import { deletePrevToken } from '../_utils/delete-prev-token'
import { SignInResponse, signIn } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'

type ResendTokenHookReturn = {
   handleResendEmail: () => void
   isPending: boolean
}

export const useResendToken = (email: string): ResendTokenHookReturn => {
   const { toast } = useToast()

   const [isPending, startTransition] = useTransition()

   const [retry, setRetry] = useState<boolean>(false)

   const handlePrevToken = async () => {
      if (!retry) {
         await deletePrevToken(email)
      }
   }

   const handleResendEmail = () => {
      startTransition(async () => {
         await handlePrevToken()

         const sendEmail: SignInResponse | undefined = await signIn('email', {
            redirect: false,
            email: email,
         })

         if (!sendEmail || !sendEmail.ok) {
            const errorMessage = sendEmail ? sendEmail.error : 'Something  went wrong'

            setRetry(true)

            toast({
               title: 'Something went wrong',
               description: errorMessage,
               action: (
                  <ToastAction altText="Try Again" onClick={handleResendEmail}>
                     Try Again
                  </ToastAction>
               ),
            })
         } else {
            toast({
               title: 'Email sent successfully!',
               description: 'Check you inbox for the confirmation email.',
            })
            if (retry === true) {
               setRetry(false)
            }
         }
      })
   }

   return { handleResendEmail, isPending }
}
