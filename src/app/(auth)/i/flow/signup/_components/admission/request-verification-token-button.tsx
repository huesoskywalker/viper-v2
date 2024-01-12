'use client'
import { Button, ButtonProps } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { useSendVerificationEmail } from '../../../_hooks/use-send-verification-email'

const RequestVerificationTokenButton: React.FC<
   ButtonProps & { label: string; email: string; username?: string }
> = ({ variant, size, label, email, username, ...props }) => {
   const { sendVerificationEmail } = useSendVerificationEmail()

   const [isPending, startTransition] = useTransition()

   return (
      <>
         <Button
            type={'button'}
            variant={variant}
            size={size}
            onClick={() => {
               startTransition(async () => {
                  await sendVerificationEmail(email, username)
               })
            }}
            disabled={isPending}
            {...props}
         >
            {label}
         </Button>
      </>
   )
}

export default RequestVerificationTokenButton
