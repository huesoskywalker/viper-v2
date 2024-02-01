'use client'
import React, { useEffect } from 'react'
import { PasswordResetFormValues } from '../_hooks/use-password-reset-form'
import { FormDescription } from '@/components/ui/form'
import { DialogDescription } from '@/components/ui/dialog'
import { useFormContext } from 'react-hook-form'
import EmailFormField from '@/app/_components/form/email-form-field'

const PasswordConfirmEmail = () => {
   const { setFocus } = useFormContext<PasswordResetFormValues>()

   useEffect(() => {
      void setFocus('email')
   }, [])

   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
            Confirm your email
         </DialogDescription>
         <FormDescription className="pb-3">
            Verify your identity by entering the email address associated with your Viper account.
         </FormDescription>
         <EmailFormField />
      </>
   )
}
export default PasswordConfirmEmail
