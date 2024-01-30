'use client'
import { FormField, FormItem } from '@/components/ui/form'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import FormInput from './form-input'
import { EditViperFormValues } from '@/app/[username]/@editViper/(.settings)/profile/_hooks/use-edit-viper-form'

type FormContextValues = EditViperFormValues
const LocationFormField = () => {
   const { control } = useFormContext<FormContextValues>()
   return (
      <FormField
         control={control}
         name="location"
         render={({ field }) => (
            <FormItem className="relative">
               <FormInput
                  id={field.name}
                  type="text"
                  variant={'plain'}
                  label="Location"
                  {...field}
               />
            </FormItem>
         )}
      />
   )
}

export default LocationFormField
