import { DialogDescription } from '@/components/ui/dialog'
import { FormDescription } from '@/components/ui/form'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { PasswordResetFormValues } from '../_hooks/use-password-reset-form'

const PasswordResetSuccess = () => {
   const { control } = useFormContext<PasswordResetFormValues>()

   control._updateValid(true)

   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-foreground sm:text-3xl ">
            You&apos;r all set
         </DialogDescription>
         <FormDescription>
            You&apos;ve successfully change your password.
            <br />
            <br />
            Add an extra layer of security to you account with{' '}
            <span className="text-viper-dodger-blue">two-factor authentication</span>. Enable it in
            your settings to make sure that you, and only you, can access your account.
         </FormDescription>
      </>
   )
}

export default PasswordResetSuccess
