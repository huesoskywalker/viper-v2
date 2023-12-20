import FormInput from '@/app/_components/form/form-input'
import { DialogDescription } from '@/components/ui/dialog'
import { FormDescription, FormField, FormItem, useFormField } from '@/components/ui/form'
import { FormControlSteps } from '@/types/forms/steps'
import { CreateProfileFormControl } from '../../_hooks/profile/use-create-profile-form'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const CreateProfileUsername: React.FC<FormControlSteps<CreateProfileFormControl>> = ({
   formControl,
}) => {
   const { trigger } = useFormContext()

   const { data: session } = useSession()

   const username = session?.user.username
   formControl._defaultValues['username'] = username

   useEffect(() => {
      trigger('username')
   }, [])

   return (
      <>
         <DialogDescription className="mt-3 text-3xl font-bold text-primary ">
            What should we call you?
         </DialogDescription>
         <FormDescription>
            Your @username is unique. You can always change it later.
         </FormDescription>
         <FormField
            control={formControl}
            name="username"
            render={({ field }) => (
               <FormItem className="relative">
                  <FormInput
                     id={field.name}
                     type={'text'}
                     variant={'viper'}
                     label="Username"
                     checkbox={true}
                     {...field}
                  />
               </FormItem>
            )}
         />
      </>
   )
}

export default CreateProfileUsername
