import { CreateProfileFormValues } from '@/app/(auth)/i/flow/signup/_hooks/profile/use-create-profile-form'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import React from 'react'
import UpdateAvatar from '../viper/update-avatar'
import { useFormContext } from 'react-hook-form'
import { EditViperFormValues } from '@/app/[username]/profile/_hooks/use-edit-viper-form'

type FormContextValues = CreateProfileFormValues | EditViperFormValues

const AvatarImageFormField = () => {
   const { control, getValues } = useFormContext<FormContextValues>()

   return (
      <FormField
         control={control}
         name="image"
         render={({ field }) => (
            <FormItem>
               <FormControl>
                  <UpdateAvatar imageSrc={getValues('image')} />
               </FormControl>
            </FormItem>
         )}
      />
   )
}

export default AvatarImageFormField
