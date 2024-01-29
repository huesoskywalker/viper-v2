import { FormField, FormItem } from '@/components/ui/form'
import React from 'react'
import { FormTextarea } from './form-textarea'
import { CreateProfileFormValues } from '@/app/(auth)/i/flow/signup/_hooks/profile/use-create-profile-form'
import { ProviderProfileFormValues } from '@/app/(auth)/i/flow/signup/_hooks/provider/use-provider-profile-form'
import { useFormContext } from 'react-hook-form'
import { EditViperFormValues } from '@/app/[username]/@editViper/(.settings)/profile/_hooks/use-edit-viper-form'

type FormContextValues = CreateProfileFormValues | ProviderProfileFormValues | EditViperFormValues

const BioFormField = ({ label }: { label: string }) => {
   const { control } = useFormContext<FormContextValues>()

   return (
      <FormField
         control={control}
         name={'bio'}
         render={({ field }) => (
            <FormItem className="relative">
               <FormTextarea id={field.name} label={label} className="resize-none" {...field} />
            </FormItem>
         )}
      />
   )
}

export default BioFormField
