import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { signIn } from 'next-auth/react'
import React, { useTransition } from 'react'
import { useCreateAccountStore } from '../../signup/_stores/create-account-store'
import { useFormContext } from 'react-hook-form'
import { PasswordResetFormValues } from '../_hooks/use-password-reset-form'

const SendPasswordTokenButton = () => {
   const { getValues } = useFormContext<PasswordResetFormValues>()

   const { nextStep } = useCreateAccountStore()
   const { toast } = useToast()

   const [isPending, startTransition] = useTransition()

   const sendVerificationToken = () => {
      startTransition(async () => {
         const sendEmail = await signIn('email', {
            email: getValues('email'),
            username: getValues('username'),
            redirect: false,
         })

         if (!sendEmail || !sendEmail.ok) {
            const errorMessage = sendEmail ? sendEmail.error : 'Something  went wrong'

            toast({
               title: 'Something went wrong',
               description: errorMessage,
               action: (
                  <ToastAction altText="Try Again" onClick={sendVerificationToken}>
                     Try Again
                  </ToastAction>
               ),
            })
         } else {
            nextStep()
         }
      })
   }
   return (
      <Button
         type="button"
         variant={'default'}
         size={'lg'}
         onClick={sendVerificationToken}
         disabled={isPending}
      >
         Next
      </Button>
   )
}

export default SendPasswordTokenButton
