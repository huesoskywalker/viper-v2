'use client'
import { Button, ButtonProps } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { useSendVerificationEmail } from '../../../_hooks/use-send-verification-email'
import { useCreateAccountStore } from '../../_stores/create-account-store'

const RequestVerificationTokenButton: React.FC<
   ButtonProps & { label: string; email: string; username?: string }
> = ({ variant, size, label, email, username, ...props }) => {
   const { sendVerificationEmail } = useSendVerificationEmail()
   const { nextStep } = useCreateAccountStore()

   const [isPending, startTransition] = useTransition()

   const handleOnClick = () => {
      startTransition(async () => {
         const sendEmail = await sendVerificationEmail(email, username)
         if (sendEmail.success) {
            nextStep()
         }
      })
   }

   return (
      <>
         <Button
            type={'button'}
            variant={variant}
            size={size}
            onClick={handleOnClick}
            disabled={isPending}
            {...props}
         >
            {label}
         </Button>
      </>
   )
}

export default RequestVerificationTokenButton
