'use client'
import { FormField, FormItem } from '@/components/ui/form'
import React from 'react'
import FormInput from './form-input'
import { useFormContext } from 'react-hook-form'
import { AdmissionFormValues } from '@/app/(auth)/i/flow/signup/_hooks/admission/use-admission-form'
import { EditViperFormValues } from '@/app/[username]/@editViper/(.settings)/profile/_hooks/use-edit-viper-form'

type FormContextValues = AdmissionFormValues | EditViperFormValues

const NameFormField = ({
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
            name="name"
            render={({ field }) => (
               <FormItem className="relative" onFocus={itemOnFocus}>
                  <FormInput
                     id={field.name}
                     type="text"
                     variant={'plain'}
                     label="Name"
                     {...field}
                     checkbox={checkbox}
                  />
               </FormItem>
            )}
         />
      </>
   )
}

export default NameFormField
