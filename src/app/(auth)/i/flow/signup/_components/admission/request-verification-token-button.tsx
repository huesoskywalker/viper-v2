'use client'
import { Button, ButtonProps } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { useSendVerificationEmail } from '../../../_hooks/use-send-verification-email'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import { useFormContext } from 'react-hook-form'
import { PasswordResetFormValues } from '../../../password_reset/_hooks/use-password-reset-form'
import { AdmissionFormValues } from '../../_hooks/admission/use-admission-form'

const RequestVerificationTokenButton: React.FC<ButtonProps & { label: string }> = ({
   variant,
   size,
   label,
   ...props
}) => {
   const { sendVerificationEmail } = useSendVerificationEmail()

   const { nextStep } = useCreateAccountStore()

   const { getValues } = useFormContext<PasswordResetFormValues | AdmissionFormValues>()

   const [isPending, startTransition] = useTransition()

   const handleOnClick = () => {
      startTransition(async () => {
         const email = getValues('email')
         const username = getValues('username') ?? undefined

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
