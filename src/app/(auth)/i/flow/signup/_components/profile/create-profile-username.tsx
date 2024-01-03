import FormInput from '@/app/_components/form/form-input'
import { DialogDescription } from '@/components/ui/dialog'
import { FormDescription, FormField, FormItem } from '@/components/ui/form'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { Control, FieldPath, useFormContext } from 'react-hook-form'
import { ProviderAdmissionFormValues } from '../../_hooks/provider-admission/use-provider-admission-form'
import { CreateProfileFormValues } from '../../_hooks/profile/use-create-profile-form'
import AtSymbol from '@/app/_components/viper/at-symbol'

const CreateProfileUsername = <T extends CreateProfileFormValues | ProviderAdmissionFormValues>({
   formControl,
}: {
   formControl: Control<T>
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
         <DialogDescription className="mt-3 text-3xl font-bold text-foreground ">
            What should we call you?
         </DialogDescription>
         <FormDescription>
            Your
            <AtSymbol />
            always change it later.
         </FormDescription>
         <FormField
            control={formControl}
            name={'username' as FieldPath<T>}
            render={({ field }) => (
               <FormItem className="relative">
                  <FormInput
                     id={field.name}
                     type={'text'}
                     variant={'plain'}
                     label="Username"
                     checkbox={true}
                     {...field}
                     value={field.value as string}
                  />
               </FormItem>
            )}
         />
      </>
   )
}

export default CreateProfileUsername
