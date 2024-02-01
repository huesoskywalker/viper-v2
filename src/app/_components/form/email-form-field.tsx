'use client'
import { FormField, FormItem } from '@/components/ui/form'
import React from 'react'
import FormInput from './form-input'
import { useFormContext } from 'react-hook-form'
import { AdmissionFormValues } from '@/app/(auth)/i/flow/signup/_hooks/admission/use-admission-form'
import { PasswordResetFormValues } from '@/app/(auth)/i/flow/password_reset/_hooks/use-password-reset-form'

type FormContextValues = AdmissionFormValues | PasswordResetFormValues

const EmailFormField = ({
   checkbox,
   itemOnFocus,
}: {
   checkbox?: true
   itemOnFocus?: (e: React.FocusEvent<HTMLDivElement, Element>) => void
}) => {
   const { control } = useFormContext<FormContextValues>()

   return (
      <>
         <FormField
            control={control}
            name="email"
            render={({ field }) => (
               <FormItem className="relative" onFocus={itemOnFocus}>
                  <FormInput
                     id={field.name}
                     type="email"
                     variant={'plain'}
                     label="Email"
                     {...field}
                     checkbox={checkbox}
                  />
               </FormItem>
            )}
         />
      </>
   )
}

export default EmailFormField
