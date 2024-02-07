import { FormField, FormItem } from '@/components/ui/form'
import React from 'react'
import FormInput from './form-input'
import { useFormContext } from 'react-hook-form'
import { CreateProfileFormValues } from '@/app/(auth)/i/flow/signup/_hooks/profile/use-create-profile-form'
import { ProviderProfileFormValues } from '@/app/(auth)/i/flow/signup/_hooks/provider/use-provider-profile-form'
import { PasswordResetFormValues } from '@/app/(auth)/i/flow/password_reset/_hooks/use-password-reset-form'

type FormContextValues =
   | CreateProfileFormValues
   | ProviderProfileFormValues
   | PasswordResetFormValues

// TODO: <T extends FieldValues>
// <UsernameFormField<PasswordResetFormValues>>
function UsernameFormField({ checkbox }: { checkbox?: true }) {
   const { control } = useFormContext<FormContextValues>()

   return (
      <FormField
         control={control}
         name={'username'}
         render={({ field }) => (
            <FormItem className="relative">
               <FormInput
                  id={field.name}
                  type={'text'}
                  variant={'plain'}
                  label="Username"
                  checkbox={checkbox}
                  {...field}
               />
            </FormItem>
         )}
      />
   )
}

export default UsernameFormField
