import { FormField, FormItem } from '@/components/ui/form'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import FormInput from './form-input'
import { EditViperFormValues } from '@/app/[username]/@editViper/(.settings)/profile/_hooks/use-edit-viper-form'

type FormContextValues = EditViperFormValues
const WebsiteFormField = () => {
   const { control } = useFormContext<FormContextValues>()
   return (
      <FormField
         control={control}
         name="website"
         render={({ field }) => (
            <FormItem className="relative">
               <FormInput
                  id={field.name}
                  type="text"
                  variant={'plain'}
                  label="Website"
                  {...field}
               />
            </FormItem>
         )}
      />
   )
}

export default WebsiteFormField
