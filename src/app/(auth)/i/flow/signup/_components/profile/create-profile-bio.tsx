import React from 'react'
import { CreateProfileFormValues } from '../../_hooks/profile/use-create-profile-form'
import { ProviderAdmissionFormValues } from '../../_hooks/provider-admission/use-provider-admission-form'
import { Control, FieldPath } from 'react-hook-form'
import { DialogDescription } from '@/components/ui/dialog'
import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { FormTextarea } from '@/app/_components/form/form-textarea'

const CreateProfileBio = <T extends CreateProfileFormValues | ProviderAdmissionFormValues>({
   formControl,
}: {
   formControl: Control<T>
}) => {
   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-foreground sm:text-3xl ">
            Describe yourself
         </DialogDescription>
         <FormDescription>
            What makes you special? Don&apos;t think too hard, just have fun with it.
         </FormDescription>
         <FormField
            control={formControl}
            name={'bio' as FieldPath<T>}
            render={({ field }) => (
               <FormItem className="relative">
                  <FormTextarea
                     id={field.name}
                     label="Your bio"
                     className="resize-none"
                     {...field}
                     value={field.value as string}
                  />
               </FormItem>
            )}
         />
      </>
   )
}

export default CreateProfileBio
