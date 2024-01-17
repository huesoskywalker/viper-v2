import { PasswordResetFormValues } from '../_hooks/use-password-reset-form'
import { FormControlStep } from '@/types/forms/steps'
import { FormDescription, FormField, FormItem } from '@/components/ui/form'
import FormInput from '@/app/_components/form/form-input'
import { DialogDescription } from '@/components/ui/dialog'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'

const PasswordConfirmUsername: React.FC<FormControlStep<PasswordResetFormValues>> = ({
   formControl,
}) => {
   const { setFocus } = useFormContext<PasswordResetFormValues>()

   useEffect(() => {
      void setFocus('username')
   }, [])

   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
            Confirm your username
         </DialogDescription>
         <FormDescription className="pb-3">
            Verify your identity by entering the username associated with your Viper account.
         </FormDescription>
         <FormField
            control={formControl}
            name="username"
            render={({ field }) => (
               <FormItem className="relative">
                  <FormInput
                     id={field.name}
                     type="text"
                     variant={'plain'}
                     label="Username"
                     {...field}
                  />
               </FormItem>
            )}
         />
      </>
   )
}

export default PasswordConfirmUsername
