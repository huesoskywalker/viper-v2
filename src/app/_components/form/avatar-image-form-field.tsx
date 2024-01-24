import { CreateProfileFormValues } from '@/app/(auth)/i/flow/signup/_hooks/profile/use-create-profile-form'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import React from 'react'
import UpdateAvatar from '../viper/update-avatar'
import { useFormContext } from 'react-hook-form'

type FormContextValues = CreateProfileFormValues

const AvatarImageFormField = () => {
   const { control } = useFormContext<FormContextValues>()

   return (
      <FormField
         control={control}
         name="image"
         render={({ field }) => (
            <FormItem>
               <FormControl>
                  <UpdateAvatar id={field.name} />
               </FormControl>
            </FormItem>
         )}
      />
   )
}

export default AvatarImageFormField
