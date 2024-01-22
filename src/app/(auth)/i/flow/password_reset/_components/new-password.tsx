import FormInput from '@/app/_components/form/form-input'
import { DialogDescription } from '@/components/ui/dialog'
import { FormDescription, FormField, FormItem } from '@/components/ui/form'
import { FormControlStep } from '@/types/forms/steps'
import React from 'react'
import { PasswordResetFormValues } from '../_hooks/use-password-reset-form'

const NewPassword: React.FC<FormControlStep<PasswordResetFormValues>> = ({ formControl }) => {
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
         <FormField
            control={formControl}
            name="password"
            render={({ field }) => (
               <FormItem className="relative">
                  <FormInput
                     id={field.name}
                     type={'password'}
                     variant={'plain'}
                     label="Password"
                     {...field}
                  />
               </FormItem>
            )}
         />
         <FormField
            control={formControl}
            name="confirmPassword"
            render={({ field }) => (
               <FormItem className="relative">
                  <FormInput
                     id={field.name}
                     type={'password'}
                     variant={'plain'}
                     label="Confirm password"
                     {...field}
                  />
               </FormItem>
            )}
         />
      </>
   )
}

export default NewPassword
