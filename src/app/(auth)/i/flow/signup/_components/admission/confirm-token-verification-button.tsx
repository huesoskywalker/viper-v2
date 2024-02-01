'use client'
import { Button, ButtonProps } from '@/components/ui/button'
import { useTransition } from 'react'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import { useFormContext } from 'react-hook-form'
import { PasswordResetFormValues } from '../../../password_reset/_hooks/use-password-reset-form'
import { AdmissionFormValues } from '../../_hooks/admission/use-admission-form'
import { PUBLIC_API_URL } from '@/config/env'

const ConfirmTokenVerificationButton: React.FC<ButtonProps> = ({
   variant,
   size,
   disabled,
   ...props
}) => {
   const { getValues } = useFormContext<PasswordResetFormValues | AdmissionFormValues>()

   const { nextStep } = useCreateAccountStore()

   const [isPending, startTransition] = useTransition()

   const handleOnClick = () => {
      startTransition(async () => {
         const token = getValues('token')
         const email = getValues('email')

         const magicLink = await fetch(
            `${PUBLIC_API_URL}/api/auth/callback/email?callbackUrl=%2F&token=${token}&email=${email}`,
         )
         if (!magicLink.ok) {
            const { error } = await magicLink.json()
            throw new Error(error)
         }
         nextStep()
      })
   }

   return (
      <>
         <Button
            type={'button'}
            variant={variant}
            size={size}
            onClick={handleOnClick}
            disabled={disabled || isPending}
            {...props}
         >
            Next
         </Button>
      </>
   )
}

export default ConfirmTokenVerificationButton
