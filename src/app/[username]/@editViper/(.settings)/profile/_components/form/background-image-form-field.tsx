'use client'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { EditViperFormValues } from '../../_hooks/use-edit-viper-form'
import UpdateBackgroundImage from '../update-background-image'

const BackgroundImageFormField = () => {
   const { control, getValues } = useFormContext<EditViperFormValues>()
   return (
      <FormField
         control={control}
         name="backgroundImage"
         render={({ field }) => (
            <FormItem>
               <FormControl>
                  <UpdateBackgroundImage id={field.name} imageSrc={getValues('backgroundImage')} />
               </FormControl>
            </FormItem>
         )}
      />
   )
}

export default BackgroundImageFormField
