import { AdmissionFormValues } from '@/app/(auth)/i/flow/signup/_hooks/admission/use-admission-form'
import { FormField, FormItem } from '@/components/ui/form'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import FormInput from './form-input'
import { PasswordResetFormValues } from '@/app/(auth)/i/flow/password_reset/_hooks/use-password-reset-form'
import { LoginFormValues } from '@/app/(auth)/i/flow/login/_hooks/use-login-form'

type FormContextValues = AdmissionFormValues | PasswordResetFormValues | LoginFormValues

const PasswordFormField = ({
   fieldName,
   label,
}: {
   fieldName: 'password' | 'confirmPassword'
   label: string
}) => {
   const { control } = useFormContext<FormContextValues>()

   return (
      <FormField
         control={control}
         name={fieldName}
         render={({ field }) => (
            <FormItem className="relative">
               <FormInput
                  id={field.name}
                  type={'password'}
                  variant={'plain'}
                  label={label}
                  {...field}
               />
            </FormItem>
         )}
      />
   )
}

export default PasswordFormField
