import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { useFormContext } from 'react-hook-form'
import { PasswordResetFormValues } from '../_hooks/use-password-reset-form'
import { useSendVerificationEmail } from '../../_hooks/use-send-verification-email'

const SendPasswordTokenButton = () => {
   const { getValues } = useFormContext<PasswordResetFormValues>()

   const { sendVerificationEmail } = useSendVerificationEmail()

   const [isPending, startTransition] = useTransition()

   return (
      <Button
         type="button"
         variant={'default'}
         size={'lg'}
         onClick={() => {
            startTransition(async () => {
               const email = getValues('email')
               const username = getValues('username')
               await sendVerificationEmail(email, username)
            })
         }}
         disabled={isPending}
      >
         Next
      </Button>
   )
}

export default SendPasswordTokenButton
