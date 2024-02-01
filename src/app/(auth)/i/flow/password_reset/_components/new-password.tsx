import { DialogDescription } from '@/components/ui/dialog'
import { FormDescription } from '@/components/ui/form'
import React from 'react'
import PasswordFormField from '@/app/_components/form/password-form-field'

const NewPassword = () => {
   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-foreground sm:text-[36px] ">
            Choose a new password
         </DialogDescription>
         <FormDescription className="pb-3">
            Make sure your new password is 8 characters or more. Try including numbers, letters and
            punctuation marks for a <span className="text-viper-dodger-blue">strong password</span>
            .
            <br />
            <br />
            You&apos;ll be logged out of all active Viper sessions after your password is changed.
         </FormDescription>
         <PasswordFormField fieldName="password" label="Password" />
         <PasswordFormField fieldName="confirmPassword" label="Confirm Password " />
      </>
   )
}

export default NewPassword
