'use client'
import { CreateProfileFormValues } from '@/app/(auth)/i/flow/signup/_hooks/profile/use-create-profile-form'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import UpdateAvatar from '../viper/update-avatar'
import { useFormContext } from 'react-hook-form'
import { EditViperFormValues } from '@/app/[username]/@editViper/(.settings)/profile/_hooks/use-edit-viper-form'

type FormContextValues = CreateProfileFormValues | EditViperFormValues

const AvatarImageFormField = ({ className }: { className?: string }) => {
   const { control, getValues } = useFormContext<FormContextValues>()

   return (
      <FormField
         control={control}
         name="image"
         render={({ field }) => (
            <FormItem className={className}>
               <FormControl>
                  <UpdateAvatar id={field.name} imageSrc={getValues('image')} />
               </FormControl>
            </FormItem>
         )}
      />
   )
}

export default AvatarImageFormField
