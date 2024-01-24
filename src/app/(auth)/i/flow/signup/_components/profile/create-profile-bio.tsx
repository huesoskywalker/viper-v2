import React from 'react'
import { CreateProfileFormValues } from '../../_hooks/profile/use-create-profile-form'
import { ProviderProfileFormValues } from '../../_hooks/provider/use-provider-profile-form'
import { useFormContext } from 'react-hook-form'
import { DialogDescription } from '@/components/ui/dialog'
import { FormDescription, FormField, FormItem } from '@/components/ui/form'
import { FormTextarea } from '@/app/_components/form/form-textarea'

type FormContextValues = CreateProfileFormValues | ProviderProfileFormValues

const CreateProfileBio = () => {
   const { control } = useFormContext<FormContextValues>()

   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-foreground sm:text-3xl ">
            Describe yourself
         </DialogDescription>
         <FormDescription>
            What makes you special? Don&apos;t think too hard, just have fun with it.
         </FormDescription>
         <FormField
            control={control}
            name={'bio'}
            render={({ field }) => (
               <FormItem className="relative">
                  <FormTextarea
                     id={field.name}
                     label="Your bio"
                     className="resize-none"
                     {...field}
                  />
               </FormItem>
            )}
         />
      </>
   )
}

export default CreateProfileBio
