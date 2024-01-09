import React from 'react'
import { PasswordResetFormValues } from '../_hooks/use-password-reset-form'
import { FormControlStep } from '@/types/forms/steps'
import { FormDescription, FormField, FormItem } from '@/components/ui/form'
import FormInput from '@/app/_components/form/form-input'

const PasswordFindAccount: React.FC<FormControlStep<PasswordResetFormValues>> = ({
   formControl,
}) => {
   return (
      <>
         <FormDescription className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
            Find your V Account
         </FormDescription>
         <FormDescription className="pb-3">
            Enter the email or username associated with your account to change your password.
         </FormDescription>
         <FormField
            control={formControl}
            name="findBy"
            render={({ field }) => (
               <FormItem className="relative">
                  <FormInput
                     id={field.name}
                     type="text"
                     variant={'plain'}
                     label="Username or email"
                     {...field}
                  />
               </FormItem>
            )}
         />
      </>
   )
}

export default PasswordFindAccount
